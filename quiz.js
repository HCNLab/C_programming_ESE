// quiz.js — 퀴즈 문제 모음
// 구조: PROBLEMS.push({ quiz: true, id, title, week, desc, input_desc, output_desc, ex_in, cases: [{id, input, pts}], ... })
// 퀴즈 탭에서만 표시, 출력 결과만 보임 (정답/점수 없음)
// 퀴즈마다 아래에 PROBLEMS.push(...) 블록을 추가 (누적 방식)

// ── qc1: 택시 요금 (조건문, 8pts) ──
PROBLEMS.push({
  quiz: true,
  id: 'qc1', week: '퀴즈',
  title: 'Taxi Fare',
  desc: '이동 거리(km, 정수)를 입력받아 택시 요금을 계산하시오.<br><br><b>요금 규칙:</b><br>• 기본요금: 2 km 이하 → <b>4800</b>원<br>• 2 km 초과 ~ 10 km 이하: 추가 1 km당 <b>1000</b>원<br>• 10 km 초과: 추가 1 km당 <b>1200</b>원<br><br>예: 1 km → 4800원, 5 km → 7800원',
  input_desc: '양의 정수 하나 (거리, km 단위).',
  output_desc: '<code>(금액) won</code> 형식으로 출력. 예: <code>7800 won</code>',
  ex_in: '3', ex_out: '5800 won',
  deadline: '2026-05-14T17:40',
  cases: [
    { id: 1, input: '1\n',  pts: 2 },
    { id: 2, input: '5\n',  pts: 2 },
    { id: 3, input: '10\n', pts: 2 },
    { id: 4, input: '15\n', pts: 2 },
  ],
});

// ── qc2: 자릿수 합 (반복문, 8pts) ──
PROBLEMS.push({
  quiz: true,
  id: 'qc2', week: '퀴즈',
  title: 'Sum of Digits',
  desc: '양의 정수를 입력받아 각 자릿수의 합을 출력하시오.<br><br>예: 12345 → 1 + 2 + 3 + 4 + 5 = 15',
  input_desc: '양의 정수 n (1 ≤ n ≤ 999999).',
  output_desc: '<code>Sum: (값)</code> 형식으로 출력.',
  ex_in: '1234', ex_out: 'Sum: 10',
  deadline: '2026-05-14T17:40',
  cases: [
    { id: 1, input: '12345\n', pts: 2 },
    { id: 2, input: '9\n',     pts: 2 },
    { id: 3, input: '100\n',   pts: 2 },
    { id: 4, input: '9999\n',  pts: 2 },
  ],
});

// ── qc3: 약수 개수 (함수, 10pts) ──
PROBLEMS.push({
  quiz: true,
  id: 'qc3', week: '퀴즈',
  title: 'Count Divisors',
  desc: '양의 정수 n을 입력받아 약수의 개수를 출력하시오.<br><br>함수 원형: <code>int count_divisors(int n)</code><br><br>예: 12의 약수는 1, 2, 3, 4, 6, 12 → 6개',
  input_desc: '양의 정수 n (1 ≤ n ≤ 10000).',
  output_desc: '<code>Divisors: (값)</code> 형식으로 출력.',
  ex_in: '6', ex_out: 'Divisors: 4',
  deadline: '2026-05-14T17:40',
  cases: [
    { id: 1, input: '12\n', pts: 2 },
    { id: 2, input: '7\n',  pts: 3 },
    { id: 3, input: '17\n',  pts: 2 },
    { id: 4, input: '36\n', pts: 3 },
  ],
});

// ── qc4: 소인수분해 (반복문+조건문, 14pts) ──
PROBLEMS.push({
  quiz: true,
  id: 'qc4', week: '퀴즈',
  title: 'Prime Factorization',
  desc: '2 이상의 정수를 입력받아 소인수분해 결과를 오름차순으로 출력하시오.<br><br><b>소인수분해:</b> 작은 수부터 나누어 떨어질 때까지 반복해서 나누고, 안 되면 다음 수로 넘어간다.<br><br>예: 12 → 2로 두 번 나누고, 3으로 한 번 나누면 끝 → <code>2 2 3</code><br>예: 7 (소수) → <code>7</code><br>예: 100 → <code>2 2 5 5</code>',
  input_desc: '정수 n (2 ≤ n ≤ 100000).',
  output_desc: '소인수를 공백으로 구분하여 한 줄에 출력. 같은 소인수는 반복하여 출력한다.',
  ex_in: '8', ex_out: '2 2 2',
  deadline: '2026-05-14T17:40',
  cases: [
    { id: 1, input: '12\n',    pts: 3 },
    { id: 2, input: '7\n',     pts: 4 },
    { id: 3, input: '100\n',   pts: 3 },
    { id: 4, input: '72\n',    pts: 4 },
  ],
});

// ── qc5: Row Sum (2차원 배열, 12pts) ──
PROBLEMS.push({
  quiz: true,
  id: 'qc5', week: '퀴즈',
  title: 'Row Sum',
  desc: 'm×n 행렬을 입력받아 <b>각 행의 합</b>을 한 줄에 하나씩 출력하시오.',
  input_desc: '첫째 줄에 행의 수 m과 열의 수 n (1 ≤ m, n ≤ 10).<br>이후 m줄에 걸쳐 각 행의 n개의 정수가 공백으로 구분되어 주어진다.',
  output_desc: '각 행의 합을 한 줄에 하나씩 출력.',
  ex_in: '1 3\n4 5 6', ex_out: '15',
  deadline: '2026-05-14T17:40',
  cases: [
    { id: 1, input: '2 3\n1 2 3\n4 5 6\n',         pts: 3 },
    { id: 2, input: '3 2\n1 1\n2 2\n3 3\n',         pts: 3 },
    { id: 3, input: '1 4\n10 20 30 40\n',            pts: 3 },
    { id: 4, input: '2 2\n-1 5\n3 -2\n',             pts: 3 },
  ],
});

// ── qc6: Count Uppercase (문자열, 12pts) ──
PROBLEMS.push({
  quiz: true,
  id: 'qc6', week: '퀴즈',
  title: 'Count Uppercase',
  desc: '문자열을 입력받아 <b>대문자의 개수</b>를 출력하시오.',
  input_desc: '한 줄에 문자열 (길이 ≤ 100, 공백 포함 가능).',
  output_desc: '<code>Count: (값)</code> 형식으로 출력.',
  ex_in: 'Hello', ex_out: 'Count: 1',
  deadline: '2026-05-14T17:40',
  cases: [
    { id: 1, input: 'Hello World\n',   pts: 3 },
    { id: 2, input: 'ABCDE\n',         pts: 3 },
    { id: 3, input: 'hello\n',         pts: 3 },
    { id: 4, input: 'CpRoGrAmMiNg\n', pts: 3 },
  ],
});

// ── qc7: Reverse Array (포인터, 18pts) ──
PROBLEMS.push({
  quiz: true,
  id: 'qc7', week: '퀴즈',
  title: 'Reverse Array',
  desc: 'n개의 정수를 입력받아 <b>배열을 뒤집어서</b> 출력하시오.<br><br>다음 두 함수를 작성하시오.<br><code>void swap(int *a, int *b)</code> — 두 정수를 교환<br><code>void reverse(int *arr, int n)</code> — 양 끝에서 가운데로 이동하며 swap하여 뒤집기',
  input_desc: '첫째 줄에 정수의 개수 n (1 ≤ n ≤ 100).<br>둘째 줄에 n개의 정수 (공백 구분).',
  output_desc: '뒤집어진 배열을 공백으로 구분하여 한 줄에 출력.',
  ex_in: '3\n3 1 2', ex_out: '2 1 3',
  deadline: '2026-05-14T17:40',
  cases: [
    { id: 1, input: '5\n1 2 3 4 5\n',          pts: 4 },
    { id: 2, input: '4\n10 20 30 40\n',         pts: 5 },
    { id: 3, input: '1\n7\n',                   pts: 4 },
    { id: 4, input: '6\n-1 0 3 -2 5 4\n',       pts: 5 },
  ],
});

// ── qc8: Apply Function (함수 포인터, 18pts) ──
PROBLEMS.push({
  quiz: true,
  id: 'qc8', week: '퀴즈',
  title: 'Apply Function',
  desc: '정수 배열과 연산 번호를 입력받아, 해당 연산을 모든 원소에 적용한 결과를 출력하시오.<br><br>연산 번호: <b>1</b> = 제곱, <b>2</b> = 세제곱<br><br>다음 함수를 작성하시오.<br><code>int square(int x)</code> — x의 제곱을 반환<br><code>int cube(int x)</code> — x의 세제곱을 반환<br><code>void apply(int *arr, int n, int (*func)(int))</code> — 배열의 각 원소에 func를 적용하여 제자리 변환<br><br>연산 번호에 따라 적절한 함수를 <code>apply</code>에 전달하시오.',
  input_desc: '첫째 줄에 정수의 개수 n (1 ≤ n ≤ 50).<br>둘째 줄에 n개의 정수.<br>셋째 줄에 연산 번호 (1 또는 2).',
  output_desc: '변환된 배열을 공백으로 구분하여 한 줄에 출력.',
  ex_in: '2\n2 3\n2', ex_out: '8 27',
  deadline: '2026-05-14T17:40',
  cases: [
    { id: 1, input: '3\n1 2 3\n1\n',          pts: 4 },
    { id: 2, input: '4\n-1 2 -3 4\n2\n',      pts: 5 },
    { id: 3, input: '2\n5 10\n1\n',            pts: 4 },
    { id: 4, input: '3\n0 1 -2\n2\n',          pts: 5 },
  ],
});
