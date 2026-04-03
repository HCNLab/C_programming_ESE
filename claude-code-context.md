# C 프로그래밍 과제 시스템 — Claude Code 컨텍스트

## 프로젝트 정보
- **담당**: 원경호 교수, 인천대학교 임베디드시스템공학과
- **과목**: C Programming (1), 1학년 대상, 수강생 약 55명
- **저장소**: https://github.com/HCNLab/C_programming_ESE
- **배포 URL**: https://HCNLab.github.io/C_programming_ESE
- **파일 구조**: `index.html` 단일 파일 + `grade.py` 로컬 채점 스크립트

---

## 시스템 개요
서버 없는 브라우저 기반 C 언어 과제 제출 시스템.

| 역할 | 구현 |
|------|------|
| 코드 에디터 | CodeMirror 5 (cdnjs CDN, C 문법 하이라이팅 + 줄번호) |
| 채점 (테스트) | Judge0 CE 공개 API (https://ce.judge0.com), language_id=50 |
| 제출 | Judge0 없이 코드를 Google Sheets에 저장 |
| 제출 기록 (교수) | Google Sheets + Apps Script 웹앱 |
| 이력 (학생) | localStorage (브라우저 종속, 기기 비공유) |
| 호스팅 | GitHub Pages |

---

## 파일 상단 설정 구역 (수정 포인트)

```javascript
const SHEETS_URL  = '';          // Google Sheets 웹앱 URL
const COURSE_NAME = 'C Programming (1)';
const PROBLEMS    = [ ... ];     // 문제 배열
```

---

## PROBLEMS 배열 스키마

```javascript
{
  id: 'p1',                        // 고유 ID (영문소문자+숫자)
  week: '5주차 Practice',          // 홈 화면 그룹 레이블 (같은 주차는 동일 문자열)
  title: 'Calculator with switch',
  desc: '문제 설명 (HTML 태그 허용)',
  input_desc: '입력 형식 설명',
  output_desc: '출력 형식 설명 (HTML 허용)',
  ex_in: '예제 입력',
  ex_out: '예제 출력',
  deadline: '2026-05-01',
  cases: [
    { id:1, input:'입력값', expected:'정확한 출력값', pts:25 },
    // 멀티라인 입력: input:'1\n2000'
    // pts 합계 = 100 권장
  ]
}
```

중요: 같은 주차 문제는 week 값을 반드시 동일하게 써야 홈에서 같은 행에 묶임.
예) '5주차 Practice' (O) vs '5주차 Practice 1', '5주차 Practice 2' (X)

---

## 현재 문제 목록

| ID | week | 제목 | 마감 |
|----|------|------|------|
| hw1 | 1주차 | A+B | 2026-04-10 |
| hw2 | 2주차 | 최솟값 출력 | 2026-04-17 |
| hw3 | 3주차 | 팩토리얼 | 2026-04-24 |
| p1 | 5주차 Practice | Calculator with switch | 2026-05-01 |
| p2 | 5주차 Practice | Season Finder | 2026-05-01 |
| p3 | 5주차 Practice | Vending Machine | 2026-05-01 |
| p4 | 5주차 Practice | Days in Month | 2026-05-01 |
| c1 | 5주차 Challenge | Tax Bracket Calculator | 2026-05-08 |
| c2 | 5주차 Challenge | Rock Paper Scissors | 2026-05-08 |
| c3 | 5주차 Challenge | Quadratic Equation Solver | 2026-05-08 |
| c4 | 5주차 Challenge | Date Validator | 2026-05-08 |
| c5 | 5주차 Challenge | Mini ATM System | 2026-05-08 |

---

## 주요 JS 함수

| 함수 | 역할 |
|------|------|
| renderHome(push?) | 홈 (문제 카드 그리드, 주차별 그룹) |
| renderProb(pid, push?) | 문제 페이지 (문제설명 + 에디터 한 페이지) |
| renderHistory(push?) | 학생 본인 제출 이력 페이지 |
| renderResults() | TC별 결과 렌더 |
| getCode() | CodeMirror 또는 textarea에서 코드 가져오기 |
| doTest() | TC 1번만 Judge0 채점 (서버 오류시 안내 메시지) |
| doSubmit() | 코드를 Sheets에 저장 + localStorage 이력 추가 |
| doReset() | 에디터 초기화 (STARTER 코드로) |
| runCase(tc, src) | Judge0 API 호출, polling, 결과 반환 |
| sendToSheets(payload) | Google Sheets POST |

---

## 스타터 코드

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main(void)
{

    return 0;
}
```

---

## UX 규칙
- 문제 클릭 시 문제 설명 + 에디터가 한 페이지에 함께 표시 (탭 없음)
- 버튼 순서: 제출 | 테스트 실행 | 초기화
- 테스트: Judge0로 TC1만 실행, 서버 오류 시 "IDE에서 확인 후 제출" 안내
- 제출: Judge0 없이 즉시 Sheets 저장 + "제출 완료 ✓" 표시 (점수 표시 없음)
- 홈 카드: 제출됨(초록) / 미제출(회색) — 점수 없음
- 이력 페이지: 점수 없이 "제출됨" + 시각만 표시
- 뒤로가기 버튼 지원 (History API pushState)
- CodeMirror fallback: CDN 실패 시 기존 textarea로 자동 전환
- Tab 키: 4칸 공백

---

## 에디터 (CodeMirror 5)

CDN (cdnjs만 허용):
- codemirror.min.css
- codemirror.min.js
- mode/clike/clike.min.js

설정:
- mode: text/x-csrc (C 문법)
- window._cm 으로 인스턴스 관리
- 코드 읽기: 반드시 getCode() 함수 사용

---

## Google Sheets Apps Script (최신 버전)

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const d = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['시각','학번_이름','주차','문제ID','문제명','코드']);
  }
  sheet.appendRow([
    new Date(d.ts), d.username, d.week,
    d.problemId || '', d.problem, d.code || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Sheets 컬럼 순서: 시각 / 학번_이름 / 주차 / 문제ID / 문제명 / 코드

---

## grade.py — 로컬 채점 스크립트

사용법:
```bash
python grade.py submissions.csv
python grade.py submissions.csv --problem hw1
python grade.py submissions.csv --student 202312345_홍길동
python grade.py submissions.csv --all
```

흐름: Google Sheets CSV 다운로드 → gcc 컴파일+실행 → TC별 비교 → 터미널 출력 + grade_result.csv

환경: Python 3.8+, gcc 필요 (Mac 기본, Windows는 MinGW or WSL)

지원 헤더: stdio.h, string.h, math.h(-lm 포함), stdlib.h, ctype.h 등 표준 라이브러리 전부

TC 매칭: stdout.rstrip() == expected.rstrip()

채점 시점: 마감 후 한 번 실행 (학생당 최신 제출 자동 필터링)

---

## Judge0 응답

status.id: 3=정답, 4=오답, 5=시간초과, 6=컴파일오류
d.time (초), d.memory (KB), d.stdout, d.stderr, d.compile_output

---

## 대문 구성 (renderHome)

1. course-header 카드: 학과/대학교, 과목명(대형), 과목코드, 교수/TA/이메일
2. how-to 박스: 이용방법 4단계 + 주의사항(localStorage, Ctrl+Shift+R)
3. 과제 목록 + userBar: 주차별 그룹 카드 그리드

---

## 스타일 가이드
- 배경: #f5f5f4 / 카드: #fff / 테두리: #e2e2e0
- 정답: #1D9E75 / #e1f5ee | 오답: #D85A30 / #faece7
- 폰트: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
- 코드: Menlo, Consolas, monospace
- 단일 HTML 파일 유지, 외부 CDN은 cdnjs만 허용

---

## 알려진 제약
- Judge0 CE: 동시 폭주 시 느려짐 (55명 비동시 제출이면 무방)
- localStorage: 기기/브라우저 비공유 → 교수 확인은 Sheets 필수
- GitHub Pages 캐시: 배포 후 Ctrl+Shift+R 필요
- 카톡 미리보기 캐시: https://developers.kakao.com/tool/debugger/sharing 에서 초기화

---

## 응답 스타일 (교수님 선호)
- 한국어로 응답
- 불필요한 설명 없이 직접적으로
- 코드 수정 시 변경된 부분만 간결하게
- 이모지 없음
