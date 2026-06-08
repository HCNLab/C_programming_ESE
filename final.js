// final.js — 기말고사 문제 모음
// - allowedUsers 있으면 해당 학생 + 교수/TA만 보임
// - allowedUsers 없으면 전체 공개
// - 시험 시작 시 allowedUsers 제거 후 푸시

// ── 테스트 문제 (삭제 예정) ──
PROBLEMS.push({
  final: true,
  allowedUsers: ['원경호'],
  id: 'ft1',
  week: '기말고사',
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
