// final.js — 기말고사 문제 모음
// - allowedUsers 있으면 해당 학생 + 교수/TA만 보임
// - allowedUsers 없으면 전체 공개
// - subjective: true → 주관식 (코드 에디터 X, 테스트 실행 X, 답안 텍스트만 제출)

// ══════════════════════════════════════════════════
// 문제 1: 출력 추적 (주관식, 12점)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true, subjective: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe1',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '문제 1. 출력 추적',
  desc: `
<div style="border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem">
  <b style="font-size:15px">문제 1. 출력 추적</b>
  <span style="float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px">12점</span>
</div>

<p>다음 프로그램의 <b>정확한 출력</b>을 작성하시오.</p>

<pre style="background:#1e1e2e;color:#cdd6f4;padding:1rem;border-radius:8px;font-size:13px;line-height:1.6;overflow-x:auto">
#include &lt;stdio.h&gt;

int count(char *s, char c) {
    int n = 0;
    while (*s) {
        if (*s == c) n++;
        s++;
    }
    return n;
}

int main(void) {
    // (a)
    int a[] = {5, 10, 15, 20, 25};
    int *p = a + 2;
    printf("%d %d\\n", *p, p[-1]);

    // (b)
    char str[] = "banana";
    printf("%d\\n", count(str, 'a'));

    // (c)
    char *q = str;
    q[0] = 'B';
    printf("%s\\n", str);

    return 0;
}
</pre>

<div style="margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px">
  <b>답안 형식:</b> 출력 결과를 줄 단위로 작성. 공백과 줄바꿈을 정확히 맞출 것.<br>
  <code style="display:block;margin-top:6px;white-space:pre">첫째줄 출력
둘째줄 출력
...</code>
</div>`,
});

// ══════════════════════════════════════════════════
// 문제 2: 참/거짓 (주관식, 10점)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true, subjective: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe2',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '문제 2. 참/거짓',
  desc: `
<div style="border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem">
  <b style="font-size:15px">문제 2. 참/거짓 (T/F)</b>
  <span style="float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px">10점 (각 2점)</span>
</div>

<p>다음 각 문장이 참이면 <code>T</code>, 거짓이면 <code>F</code>를 쓰고, 거짓인 경우 <b>간단히 이유</b>를 적으시오.</p>

<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px">
<tr style="border-bottom:1px solid var(--border,#ddd)">
  <td style="padding:10px;width:30px;vertical-align:top"><b>(a)</b></td>
  <td style="padding:10px"><code>int a[5]; a = malloc(5 * sizeof(int));</code> — 배열 이름에 새로운 주소를 대입할 수 있다.</td>
</tr>
<tr style="border-bottom:1px solid var(--border,#ddd)">
  <td style="padding:10px;vertical-align:top"><b>(b)</b></td>
  <td style="padding:10px"><code>int a[3] = {1, 2, 3}; int *p = a;</code> 에서 <code>*(p + 2)</code>와 <code>a[2]</code>는 같은 값이다.</td>
</tr>
<tr style="border-bottom:1px solid var(--border,#ddd)">
  <td style="padding:10px;vertical-align:top"><b>(c)</b></td>
  <td style="padding:10px"><code>char s[] = "hello";</code> 에서 <code>s[0] = 'H';</code>는 정의되지 않은 동작(Undefined Behavior)이다.</td>
</tr>
<tr style="border-bottom:1px solid var(--border,#ddd)">
  <td style="padding:10px;vertical-align:top"><b>(d)</b></td>
  <td style="padding:10px"><code>struct A { int x; }; struct A a = {10}; struct A b = a;</code> 이후 <code>b.x</code>의 값은 10이다.</td>
</tr>
<tr>
  <td style="padding:10px;vertical-align:top"><b>(e)</b></td>
  <td style="padding:10px"><code>int *p = malloc(sizeof(int)); free(p);</code> 이후 <code>p</code>의 값은 자동으로 <code>NULL</code>이 된다.</td>
</tr>
</table>

<div style="margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px">
  <b>답안 형식:</b><br>
  <code>(a) T</code><br>
  <code>(b) F — 이유: ...</code>
</div>`,
});

// ══════════════════════════════════════════════════
// 문제 3: 빈칸 채우기 — 이진 탐색 (코딩, 15점)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe3',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '문제 3. 빈칸 채우기',
  desc: `
<div style="border-left:4px solid #e8a838;padding-left:12px;margin-bottom:1rem">
  <b style="font-size:15px">문제 3. 빈칸 채우기 — 이진 탐색</b>
  <span style="float:right;background:#e8a838;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px">15점</span>
</div>

<p>아래 이진 탐색 함수의 빈칸 <b>(a)~(e)</b>를 채워 완성하시오.<br>
정렬된 배열에서 <code>target</code>의 인덱스를 반환하고, 없으면 <code>-1</code>을 반환한다.</p>

<pre style="background:#1e1e2e;color:#cdd6f4;padding:1rem;border-radius:8px;font-size:13px;line-height:1.6;overflow-x:auto">
#include &lt;stdio.h&gt;

int binary_search(int arr[], int n, int target) {
    int left = 0;
    int right = _____(a)_____;
    while (_____(b)_____) {
        int mid = _____(c)_____;
        if (arr[mid] == target)
            return _____(d)_____;
        else if (arr[mid] &lt; target)
            _____(e)_____;
        else
            right = mid - 1;
    }
    return -1;
}

int main(void) {
    int n, target;
    scanf("%d", &amp;n);
    int arr[100];
    for (int i = 0; i &lt; n; i++)
        scanf("%d", &amp;arr[i]);
    scanf("%d", &amp;target);

    int result = binary_search(arr, n, target);
    printf("%d\\n", result);
    return 0;
}
</pre>

<div style="margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px">
  <b>Hint:</b><br>
  (a) right의 초기값&emsp;(b) 탐색 계속 조건&emsp;(c) 중간 인덱스 계산<br>
  (d) 찾았을 때 반환값&emsp;(e) 왼쪽 경계 업데이트
</div>`,
  input_desc: '첫 줄: 배열 크기 n<br>둘째 줄: n개 정수 (오름차순)<br>셋째 줄: 탐색할 값 target',
  output_desc: 'target의 인덱스 (없으면 -1)',
  ex_in: '5\n1 3 5 7 9\n5',
  ex_out: '',
  cases: [
    { id: 1, input: '5\n1 3 5 7 9\n5\n', expected: '2\n', pts: 25 },
    { id: 2, input: '5\n1 3 5 7 9\n4\n', expected: '-1\n', pts: 25 },
    { id: 3, input: '1\n42\n42\n', expected: '0\n', pts: 25 },
    { id: 4, input: '7\n2 4 6 8 10 12 14\n14\n', expected: '6\n', pts: 25 },
  ],
});

// ══════════════════════════════════════════════════
// 문제 4: 버그 수정 — 최빈 문자 (코딩, 15점)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe4',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '문제 4. 버그 수정',
  desc: `
<div style="border-left:4px solid #e05252;padding-left:12px;margin-bottom:1rem">
  <b style="font-size:15px">문제 4. 버그 수정 — 최빈 문자 찾기</b>
  <span style="float:right;background:#e05252;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px">15점</span>
</div>

<p>다음 프로그램은 입력 문자열에서 <b>가장 많이 등장하는 소문자 알파벳</b>과 그 횟수를 출력해야 한다.<br>
빈도가 같으면 알파벳 순서가 앞선 것을 출력한다. 버그가 <b>4개</b> 있다. 모두 찾아 수정하시오.</p>

<pre style="background:#1e1e2e;color:#cdd6f4;padding:1rem;border-radius:8px;font-size:13px;line-height:1.6;overflow-x:auto">
#include &lt;stdio.h&gt;
#include &lt;ctype.h&gt;

int main(void) {
    char str[201];
    fgets(str, 201, stdin);

    int freq[26];                          // ← 여기 주목

    for (int i = 0; str[i]; i++) {
        char c = tolower(str[i]);
        if (c &gt;= 'a' &amp;&amp; c &lt;= 'z') {
            freq[c]++;                     // ← 여기 주목
        }
    }

    int max_i = 0;
    for (int i = 1; i &lt;= 26; i++) {       // ← 여기 주목
        if (freq[i] &gt; freq[max_i])
            max_i = i;
    }

    printf("%c %d\\n", max_i, freq[max_i]); // ← 여기 주목
    return 0;
}
</pre>

<div style="margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px">
  <b>Hint:</b> 초기화, 배열 인덱싱, 반복 범위, 문자 출력을 각각 확인하시오.
</div>`,
  input_desc: '문자열 한 줄 (최대 200자, 공백 포함 가능)',
  output_desc: '가장 빈도 높은 소문자 알파벳과 횟수 (예: l 3)',
  ex_in: 'Hello World',
  ex_out: '',
  cases: [
    { id: 1, input: 'Hello World\n', expected: 'l 3\n', pts: 25 },
    { id: 2, input: 'aaa\n', expected: 'a 3\n', pts: 25 },
    { id: 3, input: 'Programming\n', expected: 'g 2\n', pts: 25 },
    { id: 4, input: 'ABCABC\n', expected: 'a 2\n', pts: 25 },
  ],
});

// ══════════════════════════════════════════════════
// 문제 5: 코드 작성 — 중복 제거 (코딩, 18점)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe5',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '문제 5. 코드 작성',
  desc: `
<div style="border-left:4px solid #50c878;padding-left:12px;margin-bottom:1rem">
  <b style="font-size:15px">문제 5. 코드 작성 — 중복 제거</b>
  <span style="float:right;background:#50c878;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px">18점</span>
</div>

<p>정수 배열을 입력받아, <b>중복을 제거</b>하고 <b>처음 등장한 순서대로</b> 출력하는 프로그램을 작성하시오.</p>

<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px">
<tr style="border-bottom:1px solid var(--border,#ddd)">
  <td style="padding:8px;width:80px"><b>입력</b></td>
  <td style="padding:8px">첫 줄: 배열 크기 <code>n</code> (1 ≤ n ≤ 100)<br>둘째 줄: <code>n</code>개의 정수</td>
</tr>
<tr style="border-bottom:1px solid var(--border,#ddd)">
  <td style="padding:8px"><b>출력</b></td>
  <td style="padding:8px">첫 줄: 중복 제거된 값들 (공백 구분, 첫 등장 순서)<br>둘째 줄: 고유 원소의 개수</td>
</tr>
</table>

<div style="background:var(--surface2,#f5f5f5);padding:12px;border-radius:6px;margin:1rem 0;font-size:13px">
<b>예시)</b><br>
<code style="display:inline-block;margin-top:4px">입력: 7<br>&emsp;&emsp;&emsp;3 1 4 1 5 3 2</code><br><br>
<code>출력: 3 1 4 5 2<br>&emsp;&emsp;&emsp;5</code>
</div>

<p><b>요구사항:</b></p>
<ul style="font-size:13.5px;line-height:1.8">
<li>결과 배열은 <code>malloc</code>으로 동적 할당할 것</li>
<li>원래 배열의 등장 순서를 유지할 것</li>
<li>사용 후 <code>free</code>할 것</li>
</ul>`,
  input_desc: '첫 줄: 배열 크기 n<br>둘째 줄: n개의 정수',
  output_desc: '첫 줄: 중복 제거된 값들 (공백 구분)<br>둘째 줄: 고유 원소의 개수',
  ex_in: '7\n3 1 4 1 5 3 2',
  ex_out: '',
  cases: [
    { id: 1, input: '7\n3 1 4 1 5 3 2\n', expected: '3 1 4 5 2\n5\n', pts: 25 },
    { id: 2, input: '5\n1 1 1 1 1\n', expected: '1\n1\n', pts: 25 },
    { id: 3, input: '4\n4 3 2 1\n', expected: '4 3 2 1\n4\n', pts: 25 },
    { id: 4, input: '6\n-1 2 -1 3 2 -1\n', expected: '-1 2 3\n3\n', pts: 25 },
  ],
});
