// final.js — 기말고사 문제 모음
// - allowedUsers 있으면 해당 학생 + 교수/TA만 보임
// - allowedUsers 없으면 전체 공개
// - subjective: true → 주관식 (코드 에디터 X, 테스트 실행 X, 답안 텍스트만 제출)

// ══════════════════════════════════════════════════
// 카테고리 1: 코드 추적 (주관식)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true, subjective: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe1',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '[Trace] 포인터와 배열',
  desc: `다음 코드의 <b>정확한 출력</b>을 작성하시오.<br><br>
<pre style="background:var(--surface3);padding:.8rem;border-radius:6px;font-size:13px;overflow-x:auto">
int arr[] = {10, 20, 30, 40, 50};
int *p = arr + 1;
int *q = &arr[3];

printf("%d %d\\n", *p, *q);
printf("%d\\n", q - p);
printf("%d\\n", *(p + 2));

*p = *q + 5;
p++;
printf("%d %d\\n", *p, arr[1]);
</pre>
<br><b>주의:</b> 출력 형식을 정확히 맞추시오 (공백, 줄바꿈 포함). 줄 단위로 작성하시오.`,
});

// ══════════════════════════════════════════════════
// 카테고리 2: True / False (주관식)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true, subjective: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe2',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '[T/F] 포인터와 메모리',
  desc: `다음 각 문장이 참이면 <code>T</code>, 거짓이면 <code>F</code>를 작성하시오. 거짓인 경우 간단히 이유를 적으시오.<br><br>
<ol style="line-height:2.2">
<li><code>int a = 5; int *p = &a;</code> 에서 <code>sizeof(p)</code>의 값은 항상 <code>sizeof(int)</code>와 같다.</li>
<li><code>int arr[5]; int *p = arr;</code> 에서 <code>p + 3</code>은 <code>&arr[3]</code>과 같다.</li>
<li><code>char *s = "hello";</code> 에서 <code>s[0] = 'H';</code>는 정의되지 않은 동작(UB)이다.</li>
<li><code>int *p = malloc(sizeof(int));</code> 후 <code>free(p); *p = 10;</code>은 안전하다.</li>
<li><code>int arr[3] = {1, 2, 3};</code> 에서 <code>arr</code>과 <code>&arr[0]</code>의 값(주소)은 같다.</li>
</ol>
<br><b>형식 예시:</b><br>
<code>1. T</code><br>
<code>2. F — 이유: ...</code>`,
});

// ══════════════════════════════════════════════════
// 카테고리 3: 빈칸 채우기 (코딩 — 함수 완성)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe3',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '[빈칸] 문자열 뒤집기',
  desc: `아래 함수의 빈칸 (a)~(e)를 채워 문자열을 제자리에서 뒤집는 함수를 완성하시오.<br>
완성된 전체 프로그램을 제출하시오.<br><br>
<pre style="background:var(--surface3);padding:.8rem;border-radius:6px;font-size:13px;overflow-x:auto">
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

void reverse_str(char *s) {
    int left = 0;
    int right = _____(a)_____;
    while (_____(b)_____) {
        char temp = _____(c)_____;
        s[left] = _____(d)_____;
        s[right] = temp;
        left++;
        _____(e)_____;
    }
}

int main(void) {
    char str[101];
    scanf("%s", str);
    reverse_str(str);
    printf("%s\\n", str);
    return 0;
}
</pre>
<br><b>Hint:</b> (a) right의 초기값, (b) while 조건, (c)(d) swap 대상, (e) right 업데이트`,
  input_desc: '문자열 하나 (공백 없음, 최대 100자)',
  output_desc: '뒤집어진 문자열',
  ex_in: 'hello',
  ex_out: '',
  cases: [
    { id: 1, input: 'hello\n', expected: 'olleh\n', pts: 25 },
    { id: 2, input: 'a\n', expected: 'a\n', pts: 25 },
    { id: 3, input: 'abcdef\n', expected: 'fedcba\n', pts: 25 },
    { id: 4, input: 'racecar\n', expected: 'racecar\n', pts: 25 },
  ],
});

// ══════════════════════════════════════════════════
// 카테고리 4: 버그 찾기 (코딩)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe4',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '[Bug Fix] 구조체 배열 정렬',
  desc: `다음 프로그램은 학생 구조체 배열을 점수 기준 <b>내림차순</b>으로 정렬하여 출력해야 한다.<br>
버그가 <b>4개</b> 있다. 모두 수정하여 올바르게 동작하는 프로그램을 제출하시오.<br><br>
<pre style="background:var(--surface3);padding:.8rem;border-radius:6px;font-size:13px;overflow-x:auto">
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

struct Student {
    char name[20];
    int score;
};

void sort_students(struct Student arr, int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        for (int j = 0; j &lt; n - 1; j++) {
            if (arr[j].score &lt; arr[j+1].score) {
                struct Student temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int main(void) {
    int n;
    scanf("%d", &n);
    struct Student students[100];
    for (int i = 0; i &lt; n; i++) {
        scanf("%s %d", students[i].name, students[i].score);
    }
    sort_students(students, n);
    for (int i = 0; i &lt; n; i++) {
        printf("%s %d\\n", students[i].name, students[i].score);
    }
    return 0;
}
</pre>`,
  input_desc: '첫 줄: 학생 수 n<br>이후 n줄: 이름(공백 없음) 점수',
  output_desc: '점수 내림차순으로 "이름 점수" 형식으로 한 줄씩 출력',
  ex_in: '3\nAlice 85\nBob 92\nCharlie 78',
  ex_out: '',
  cases: [
    { id: 1, input: '3\nAlice 85\nBob 92\nCharlie 78\n', expected: 'Bob 92\nAlice 85\nCharlie 78\n', pts: 25 },
    { id: 2, input: '2\nKim 100\nLee 100\n', expected: 'Kim 100\nLee 100\n', pts: 25 },
    { id: 3, input: '1\nPark 50\n', expected: 'Park 50\n', pts: 25 },
    { id: 4, input: '4\nA 30\nB 90\nC 60\nD 80\n', expected: 'B 90\nD 80\nC 60\nA 30\n', pts: 25 },
  ],
});

// ══════════════════════════════════════════════════
// 카테고리 5: 함수 작성 (코딩)
// ══════════════════════════════════════════════════
PROBLEMS.push({
  final: true,
  allowedUsers: ['20251004_원경호'],
  id: 'fe5',
  week: '기말고사',
  deadline: '2026-06-30T23:59',
  title: '[코딩] 동적 배열 병합',
  desc: `두 개의 정렬된 정수 배열을 입력받아 <b>하나의 정렬된 배열로 병합</b>하여 출력하시오.<br><br>
<b>요구사항:</b>
<ul>
<li>결과 배열은 <code>malloc</code>으로 동적 할당할 것</li>
<li>두 배열 모두 오름차순 정렬 상태로 주어짐</li>
<li>결과도 오름차순으로 출력</li>
<li>사용 후 <code>free</code>할 것</li>
</ul>`,
  input_desc: '첫 줄: 배열1 크기 n<br>둘째 줄: 배열1의 n개 정수 (오름차순)<br>셋째 줄: 배열2 크기 m<br>넷째 줄: 배열2의 m개 정수 (오름차순)',
  output_desc: '병합된 배열을 공백으로 구분하여 한 줄에 출력',
  ex_in: '3\n1 3 5\n4\n2 4 6 8',
  ex_out: '',
  cases: [
    { id: 1, input: '3\n1 3 5\n4\n2 4 6 8\n', expected: '1 2 3 4 5 6 8\n', pts: 25 },
    { id: 2, input: '1\n10\n1\n5\n', expected: '5 10\n', pts: 25 },
    { id: 3, input: '4\n-3 -1 0 2\n3\n-2 1 3\n', expected: '-3 -2 -1 0 1 2 3\n', pts: 25 },
    { id: 4, input: '2\n1 1\n2\n1 1\n', expected: '1 1 1 1\n', pts: 25 },
  ],
});
