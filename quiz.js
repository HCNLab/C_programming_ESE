// quiz.js — 퀴즈 문제 모음
// 구조: PROBLEMS.push({ quiz: true, id, title, week, desc, input_desc, output_desc, ex_in, cases: [{id, input, pts}], ... })
// 퀴즈 탭에서만 표시, 출력 결과만 보임 (정답/점수 없음)
// 퀴즈마다 아래에 PROBLEMS.push(...) 블록을 추가 (누적 방식)

// ── 퀴즈 1 (예시 구조, 실제 시험 전 내용으로 교체) ──
// PROBLEMS.push(
//   {
//     quiz: true,
//     id: 'q1_1', title: '문제 제목', week: '퀴즈 1',
//     desc: '문제 설명', input_desc: '입력 형식', output_desc: '출력 형식',
//     ex_in: '예제 입력', ex_out: '',
//     cases: [
//       { id: 'tc1', input: '입력값', pts: 0 },
//     ],
//   },
// );
