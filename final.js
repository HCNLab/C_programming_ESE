// final.js — 기말고사 문제 모음
// Firestore draft로 관리. 시험 당일 publish하여 공개.
// 문제 원본: _admin/_admin_seed_final.json
//
// ── 스타일링 가이드 ──
// - 코드 블록: <pre><code class="language-c">...</code></pre>
//   → Prism.js가 자동 하이라이팅 (흰 배경, 검은 테두리, Consolas)
//   → 다크모드 자동 대응 (index.html CSS)
// - final: true → 문제 desc 폰트 15px (final-desc 클래스), 레이아웃 좌문제/우답안
// - subjective: true → 코드 에디터 없이 텍스트 답안만 제출
// - allowedUsers: ['20251004_원경호'] → 교수/TA + 해당 학생만 보임
//   → 시험 당일 allowedUsers 제거 후 push하면 전체 공개
//
// ── 문제 유형 ──
// 1. 주관식 (Trace, T/F, 빈칸 채우기): subjective: true — 텍스트 답안 제출
// 2. 코딩 (버그 수정, 코드 작성):     subjective 없음 — 코드 에디터 + 테스트 실행
//
// ── 문제 추가 스켈레톤 ──
//
// /* ── 주관식 (Trace, T/F, 빈칸 채우기) ── */
// PROBLEMS.push({
//   final: true, subjective: true,
//   allowedUsers: ['20251004_원경호'],
//   id: 'fe__',
//   week: '기말고사',
//   deadline: '2026-06-30T23:59',
//   title: '문제 N. 제목',
//   desc: `
// <div style="border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem">
//   <b style="font-size:15px">문제 N. 제목</b>
//   <span style="float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px">??점</span>
// </div>
//
// <p>문제 설명</p>
//
// <pre><code class="language-c">// C 코드
// #include &lt;stdio.h&gt;
// </code></pre>
//
// <div style="margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px">
//   <b>답안 형식:</b><br>
//   <code>(a) ...</code><br>
//   <code>(b) ...</code>
// </div>`,
// });
//
// /* ── 코딩 (버그 수정, 코드 작성) ── */
// PROBLEMS.push({
//   final: true,
//   allowedUsers: ['20251004_원경호'],
//   id: 'fe__',
//   week: '기말고사',
//   deadline: '2026-06-30T23:59',
//   title: '문제 N. 제목',
//   desc: `
// <div style="border-left:4px solid #e05252;padding-left:12px;margin-bottom:1rem">
//   <b style="font-size:15px">문제 N. 제목</b>
//   <span style="float:right;background:#e05252;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px">??점</span>
// </div>
//
// <p>문제 설명</p>
//
// <pre><code class="language-c">// C 코드
// </code></pre>
//
// <div style="margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px">
//   <b>Hint:</b> ...
// </div>`,
//   input_desc: '입력 형식',
//   output_desc: '출력 형식',
//   ex_in: '예제 입력',
//   ex_out: '',
//   cases: [
//     { id: 1, input: '...\\n', expected: '...\\n', pts: 25 },
//     { id: 2, input: '...\\n', expected: '...\\n', pts: 25 },
//     { id: 3, input: '...\\n', expected: '...\\n', pts: 25 },
//     { id: 4, input: '...\\n', expected: '...\\n', pts: 25 },
//   ],
// });
//
// ── 색상 가이드 ──
// 주관식 (Trace/T-F):  #4a90d9 (파랑)
// 빈칸 채우기:         #e8a838 (노랑)
// 버그 수정:           #e05252 (빨강)
// 코드 작성:           #50c878 (초록)
//
// ── 현재 문제 구성 ──
// fe1: [주관식] 출력 추적 — 포인터 + 함수 + 문자열
// fe2: [주관식] T/F — 배열, 포인터, 문자열, 구조체, 메모리
// fe3: [주관식] 빈칸 채우기 — 이진 탐색 (a)~(e) 답안
// fe4: [코딩]   버그 수정 — 최빈 문자 (4개 버그)
// fe5: [코딩]   코드 작성 — 중복 제거 (malloc/free)
