// final.js — 기말고사 문제 모음
// 구조: PROBLEMS.push({ final: true, id, title, week, desc, input_desc, output_desc, ex_in, cases: [{id, input, expected, pts}], ... })
// 기말 탭에서만 표시, 출력 결과만 보임 (정답/오답 여부 X), 컴파일 에러는 표시
// 기말고사 문제는 아래에 addFinal({...}) 로 추가 (누적 방식)

// ★ 시험 공개 스위치 — false면 교수/TA만 보임, 시험 시작 시 true로 변경
const FINAL_OPEN = false;

// 문제 추가 헬퍼: FINAL_OPEN=false면 자동으로 _isDraft=true 부여
function addFinal(prob) {
  prob.final = true;
  if (!FINAL_OPEN) prob._isDraft = true;
  PROBLEMS.push(prob);
}

// ── 테스트 문제 (삭제 예정) ──
addFinal({
  id: 'ft1',
  week: 'Final Exam',
  deadline: '2026-06-30T23:59',
  title: '[테스트] 두 수의 합',
  desc: '두 정수를 입력받아 합을 출력하시오.',
  input_desc: '두 정수 A, B (공백 구분)',
  output_desc: '합을 한 줄에 출력',
  ex_in: '3 5',
  ex_out: '',
  cases: [
    { id: 1, input: '3 5\n', expected: '8\n', pts: 25 },
    { id: 2, input: '0 0\n', expected: '0\n', pts: 25 },
    { id: 3, input: '-10 20\n', expected: '10\n', pts: 25 },
    { id: 4, input: '100 200\n', expected: '300\n', pts: 25 },
  ],
});
