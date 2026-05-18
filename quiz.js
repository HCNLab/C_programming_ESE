// quiz.js — 퀴즈 문제 모음
// 구조: PROBLEMS.push({ quiz: true, id, title, week, desc, input_desc, output_desc, ex_in, cases: [{id, input, pts}], ... })
// 퀴즈 탭에서만 표시, 출력 결과만 보임 (정답/점수 없음)
// 퀴즈마다 아래에 PROBLEMS.push(...) 블록을 추가 (누적 방식)


// SECTION B: 대체 퀴즈 — 8문제 100점
// 채점 기준:
//   qm1 (8pts):  TC1→"Free"               TC2→"5000 won"         TC3→"10000 won"    TC4→"3000 won"
//   qm2 (8pts):  TC1→"Product: 24"         TC2→"Product: 5"       TC3→"Product: 0"   TC4→"Product: 729"
//   qm3 (10pts): TC1→"Sum: 28"             TC2→"Sum: 8"           TC3→"Sum: 1"       TC4→"Sum: 56"
//   qm4 (14pts): TC1→"2 3 5 7"             TC2→"2"                TC3→"2 3 5 7 11 13 17 19"  TC4→"2 3 5 7 11 13 17 19 23 29"
//   qm5 (12pts): TC1→"5\n7\n9"             TC2→"6\n6"             TC3→"10\n20\n30\n40"  TC4→"2\n3"
//   qm6 (12pts): TC1→"Count: 12"           TC2→"Count: 5"         TC3→"Count: 0"     TC4→"Count: 3"
//   qm7 (18pts): TC1→"2 1 4 3 6 5"         TC2→"2 1 4 3 5"       TC3→"7"            TC4→"20 10 40 30"
//   qm8 (18pts): TC1→"1 2 3"               TC2→"-1 2 -3 4"       TC3→"0 5"          TC4→"3 0 -3"
// ────────────────────────────────────────────────────────────
