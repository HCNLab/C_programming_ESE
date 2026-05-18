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

const _MAKEUP = ['202601532_박강민'];

// ── qm1: 입장료 계산 (조건문, 8pts) ──
PROBLEMS.push({
  quiz: true, allowedUsers: _MAKEUP,
  id: 'qm1', week: '대체 퀴즈',
  title: 'Ticket Price',
  desc: '나이를 입력받아 놀이공원 입장료를 출력하시오.<br><br><b>요금표:</b><br>• 3세 미만: <code>Free</code><br>• 3세 이상 13세 미만: <code>5000 won</code><br>• 13세 이상 65세 미만: <code>10000 won</code><br>• 65세 이상: <code>3000 won</code>',
  input_desc: '정수 하나 (나이, 0 이상).',
  output_desc: '해당하는 입장료를 위 형식 그대로 출력.',
  ex_in: '5', ex_out: '5000 won',
  deadline: '2026-05-18T11:40',
  cases: [
    { id: 1, input: '2\n',  pts: 2 },
    { id: 2, input: '10\n', pts: 2 },
    { id: 3, input: '30\n', pts: 2 },
    { id: 4, input: '70\n', pts: 2 },
  ],
});

// ── qm2: 자릿수 곱 (반복문, 8pts) ──
PROBLEMS.push({
  quiz: true, allowedUsers: _MAKEUP,
  id: 'qm2', week: '대체 퀴즈',
  title: 'Product of Digits',
  desc: '양의 정수를 입력받아 각 자릿수의 곱을 출력하시오.<br><br>예: 123 → 1 × 2 × 3 = 6',
  input_desc: '양의 정수 n (1 ≤ n ≤ 999999).',
  output_desc: '<code>Product: (값)</code> 형식으로 출력.',
  ex_in: '123', ex_out: 'Product: 6',
  deadline: '2026-05-18T11:40',
  cases: [
    { id: 1, input: '234\n',  pts: 2 },
    { id: 2, input: '5\n',    pts: 2 },
    { id: 3, input: '102\n',  pts: 2 },
    { id: 4, input: '999\n',  pts: 2 },
  ],
});

// ── qm3: 약수의 합 (함수, 10pts) ──
PROBLEMS.push({
  quiz: true, allowedUsers: _MAKEUP,
  id: 'qm3', week: '대체 퀴즈',
  title: 'Sum of Divisors',
  desc: '양의 정수 n을 입력받아 n의 모든 약수의 합을 출력하시오.<br><br>함수 원형: <code>int sum_divisors(int n)</code><br><br>예: 10의 약수는 1, 2, 5, 10 → 합 = 18',
  input_desc: '양의 정수 n (1 ≤ n ≤ 10000).',
  output_desc: '<code>Sum: (값)</code> 형식으로 출력.',
  ex_in: '6', ex_out: 'Sum: 12',
  deadline: '2026-05-18T11:40',
  cases: [
    { id: 1, input: '12\n', pts: 2 },
    { id: 2, input: '7\n',  pts: 3 },
    { id: 3, input: '1\n',  pts: 2 },
    { id: 4, input: '28\n', pts: 3 },
  ],
});

// ── qm4: 소수 나열 (반복문+조건문, 14pts) ──
PROBLEMS.push({
  quiz: true, allowedUsers: _MAKEUP,
  id: 'qm4', week: '대체 퀴즈',
  title: 'List Primes',
  desc: '양의 정수 n을 입력받아 2 이상 n 이하의 모든 소수를 오름차순으로 출력하시오.<br><br>함수 원형: <code>int is_prime(int x)</code> — x가 소수이면 1, 아니면 0을 반환<br><br>예: n = 15 → <code>2 3 5 7 11 13</code>',
  input_desc: '양의 정수 n (2 ≤ n ≤ 1000).',
  output_desc: '소수를 공백으로 구분하여 한 줄에 출력.',
  ex_in: '15', ex_out: '2 3 5 7 11 13',
  deadline: '2026-05-18T11:40',
  cases: [
    { id: 1, input: '10\n', pts: 3 },
    { id: 2, input: '2\n',  pts: 4 },
    { id: 3, input: '20\n', pts: 3 },
    { id: 4, input: '30\n', pts: 4 },
  ],
});

// ── qm5: Column Sum (2차원 배열, 12pts) ──
PROBLEMS.push({
  quiz: true, allowedUsers: _MAKEUP,
  id: 'qm5', week: '대체 퀴즈',
  title: 'Column Sum',
  desc: 'm×n 행렬을 입력받아 <b>각 열의 합</b>을 한 줄에 하나씩 출력하시오.',
  input_desc: '첫째 줄에 행의 수 m과 열의 수 n (1 ≤ m, n ≤ 10).<br>이후 m줄에 걸쳐 각 행의 n개의 정수가 공백으로 구분되어 주어진다.',
  output_desc: '각 열의 합을 한 줄에 하나씩 출력.',
  ex_in: '2 2\n1 3\n2 4', ex_out: '3\n7',
  deadline: '2026-05-18T11:40',
  cases: [
    { id: 1, input: '2 3\n1 2 3\n4 5 6\n',         pts: 3 },
    { id: 2, input: '3 2\n1 1\n2 2\n3 3\n',         pts: 3 },
    { id: 3, input: '1 4\n10 20 30 40\n',            pts: 3 },
    { id: 4, input: '2 2\n-1 5\n3 -2\n',             pts: 3 },
  ],
});

// ── qm6: Count Lowercase (문자열, 12pts) ──
PROBLEMS.push({
  quiz: true, allowedUsers: _MAKEUP,
  id: 'qm6', week: '대체 퀴즈',
  title: 'Count Lowercase',
  desc: '문자열을 입력받아 <b>소문자의 개수</b>를 출력하시오.',
  input_desc: '한 줄에 문자열 (길이 ≤ 100, 공백 포함 가능).',
  output_desc: '<code>Count: (값)</code> 형식으로 출력.',
  ex_in: 'Hello World', ex_out: 'Count: 8',
  deadline: '2026-05-18T11:40',
  cases: [
    { id: 1, input: 'Programming Fun\n', pts: 3 },
    { id: 2, input: 'abcde\n',           pts: 3 },
    { id: 3, input: 'HELLO\n',           pts: 3 },
    { id: 4, input: 'AbCdEfG\n',         pts: 3 },
  ],
});

// ── qm7: Swap Adjacent (포인터, 18pts) ──
PROBLEMS.push({
  quiz: true, allowedUsers: _MAKEUP,
  id: 'qm7', week: '대체 퀴즈',
  title: 'Swap Adjacent',
  desc: 'n개의 정수를 입력받아, <b>인접한 두 원소씩 짝지어 교환</b>하여 출력하시오. n이 홀수이면 마지막 원소는 그대로 둔다.<br><br>다음 함수를 작성하시오.<br><code>void swap(int *a, int *b)</code> — 두 정수를 교환<br><br>예: [3, 1, 4, 2] → [1, 3, 2, 4]<br>예: [5, 8, 3] → [8, 5, 3] (마지막 3은 그대로)',
  input_desc: '첫째 줄에 정수의 개수 n (1 ≤ n ≤ 100).<br>둘째 줄에 n개의 정수 (공백 구분).',
  output_desc: '교환된 배열을 공백으로 구분하여 한 줄에 출력.',
  ex_in: '4\n3 1 4 2', ex_out: '1 3 2 4',
  deadline: '2026-05-18T11:40',
  cases: [
    { id: 1, input: '6\n1 2 3 4 5 6\n',     pts: 4 },
    { id: 2, input: '5\n1 2 3 4 5\n',        pts: 5 },
    { id: 3, input: '1\n7\n',                 pts: 4 },
    { id: 4, input: '4\n10 20 30 40\n',       pts: 5 },
  ],
});

// ── qm8: Apply Function — 절대값/부호반전 (함수 포인터, 18pts) ──
PROBLEMS.push({
  quiz: true, allowedUsers: _MAKEUP,
  id: 'qm8', week: '대체 퀴즈',
  title: 'Apply Function',
  desc: '정수 배열과 연산 번호를 입력받아, 해당 연산을 모든 원소에 적용한 결과를 출력하시오.<br><br>연산 번호: <b>1</b> = 절대값, <b>2</b> = 부호 반전<br><br>다음 함수를 작성하시오.<br><code>int abs_val(int x)</code> — x의 절대값을 반환<br><code>int negate(int x)</code> — x의 부호를 반전하여 반환<br><code>void apply(int *arr, int n, int (*func)(int))</code> — 배열의 각 원소에 func를 적용하여 제자리 변환<br><br>연산 번호에 따라 적절한 함수를 <code>apply</code>에 전달하시오.',
  input_desc: '첫째 줄에 정수의 개수 n (1 ≤ n ≤ 50).<br>둘째 줄에 n개의 정수.<br>셋째 줄에 연산 번호 (1 또는 2).',
  output_desc: '변환된 배열을 공백으로 구분하여 한 줄에 출력.',
  ex_in: '2\n-4 3\n1', ex_out: '4 3',
  deadline: '2026-05-18T11:40',
  cases: [
    { id: 1, input: '3\n-1 2 -3\n1\n',        pts: 4 },
    { id: 2, input: '4\n1 -2 3 -4\n2\n',      pts: 5 },
    { id: 3, input: '2\n0 5\n1\n',             pts: 4 },
    { id: 4, input: '3\n-3 0 3\n2\n',          pts: 5 },
  ],
});
