// final.js — 기말고사 14문제 (마스터: _admin/_admin_seed_final.json + gen_seed.py)
// 전체 공개 배포본. (비공개 검토는 Firebase 드래프트에서) · 마감: 2026-06-11 18:00.
// 코딩문제(fe4/fe9/fe11/fe12): cases=정적 폴백(GEN 미로드시) + 아래 GEN=실행마다 랜덤 입력.
// ⚠ 배포 후 Firestore drafts에 같은 id가 남아있으면 중복 표시 → removeAllDrafts()로 정리.
// ════════════════════════════════════════════════════════════

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe1",
  "subjective": true,
  "title": "문제 1. 출력 추적",
  "desc": "\n<div style=\"border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 1. 출력 추적</b>\n  <span style=\"float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">6점 (각 2점)</span>\n</div>\n\n<p>다음 프로그램의 출력을 작성하시오.</p>\n\n<pre><code class=\"language-c\">#define _CRT_SECURE_NO_WARNINGS\n#include &lt;stdio.h&gt;\n\nvoid swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\n\nint main(void) {\n    int a[] = {30, 10, 50, 20, 40};\n    int n = 5;\n\n    int min_i = 0;\n    for (int i = 1; i &lt; n; i++)\n        if (a[i] &lt; a[min_i]) min_i = i;\n    swap(&amp;a[0], &amp;a[min_i]);\n    printf(\"%d %d\\n\", a[0], a[1]);        // (a)\n\n    int *p = a + 3;\n    printf(\"%d %d\\n\", *p, p[-2]);          // (b)\n\n    return 0;\n}</code></pre>\n\n<p><b>(c)</b> 위 코드의 <code>return 0;</code> 직전에 아래 두 줄을 추가하면 출력은?</p>\n<pre><code class=\"language-c\">swap(a, p);\nprintf(\"%d %d %d\\n\", a[0], a[3], *p);</code></pre>\n\n<div style=\"margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px\">\n  <b>답안 형식:</b><br>\n  <code>(a) ...</code><br>\n  <code>(b) ...</code><br>\n  <code>(c) ...</code>\n</div>",
  "template": "(a) \n(b) \n(c) "
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe2",
  "subjective": true,
  "title": "문제 2. 참/거짓",
  "desc": "\n<div style=\"border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 2. 참/거짓 (T/F)</b>\n  <span style=\"float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">6점 (각 2점)</span>\n</div>\n\n<p>다음 각 문장이 참이면 <code>T</code>, 거짓이면 <code>F</code>를 쓰시오.<br>\n<b>거짓인 경우 반드시 이유를 한 문장으로 적으시오.</b> (이유 없으면 0점)</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;width:30px;vertical-align:top\"><b>(a)</b></td>\n  <td style=\"padding:10px\">다음 코드에서 <code>*(p + 2)</code>의 값은 <b>30</b>이다.<br>\n<pre><code class=\"language-c\">int arr[] = {10, 20, 30, 40};\nint *p = arr;\np++;</code></pre></td>\n</tr>\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;vertical-align:top\"><b>(b)</b></td>\n  <td style=\"padding:10px\"><code>realloc(NULL, n * sizeof(int))</code>은 <code>malloc(n * sizeof(int))</code>과 동일하게 동작한다.</td>\n</tr>\n<tr>\n  <td style=\"padding:10px;vertical-align:top\"><b>(c)</b></td>\n  <td style=\"padding:10px\">다음 코드 실행 후 <code>strlen(s)</code>의 값은 <b>5</b>이다.<br>\n<pre><code class=\"language-c\">char s[10] = \"Hello\";\ns[5] = '!';</code></pre></td>\n</tr>\n</table>\n\n<div style=\"margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px\">\n  <b>답안 형식:</b><br>\n  <code>(a) F — 이유: ...</code><br>\n  <code>(b) T</code>\n</div>",
  "template": "(a) \n(b) \n(c) "
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe3",
  "subjective": true,
  "title": "문제 3. 빈칸 채우기 (동적 배열)",
  "desc": "\n<div style=\"border-left:4px solid #e8a838;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 3. 빈칸 채우기 — 동적 배열 확장</b>\n  <span style=\"float:right;background:#e8a838;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">6점</span>\n</div>\n\n<p>아래 프로그램은 정수를 계속 입력받아 배열에 저장하다가, <code>-1</code>이 입력되면 종료한다.<br>\n배열이 꽉 차면 <code>realloc</code>으로 2배로 확장한다. 빈칸 <b>(a)~(e)</b>를 채우시오.</p>\n\n<pre><code class=\"language-c\">#define _CRT_SECURE_NO_WARNINGS\n#include &lt;stdio.h&gt;\n#include &lt;stdlib.h&gt;\n\nint main(void) {\n    int cap = 2;\n    int *arr = (int *)malloc(_____(a)_____);\n    int size = 0, val;\n\n    while (scanf(\"%d\", &amp;val) == 1 &amp;&amp; val != -1) {\n        if (_____(b)_____) {\n            cap *= 2;\n            int *tmp = (int *)realloc(arr, _____(c)_____);\n            if (_____(d)_____) { free(arr); return 1; }\n            arr = _____(e)_____;\n        }\n        arr[size++] = val;\n    }\n\n    for (int i = 0; i &lt; size; i++)\n        printf(\"%d \", arr[i]);\n    printf(\"\\n%d\\n\", size);\n    free(arr);\n    return 0;\n}</code></pre>\n\n<div style=\"margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px\">\n  <b>답안 형식:</b><br>\n  <code>(a) ...</code><br>\n  <code>(b) ... — 이유: ...</code><br>\n  <code>(c) ...</code><br>\n  <code>(d) ...</code><br>\n  <code>(e) ...</code><br><br>\n※ <b>(b)</b>는 코드와 함께 <b>이 조건이 필요한 이유</b>를 한 문장으로 쓰시오.\n</div>",
  "template": "(a) \n(b) \n    이유: \n(c) \n(d) \n(e) "
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe4",
  "title": "문제 4. 코드 작성 (상품 재고)",
  "desc": "\n<div style=\"border-left:4px solid #50c878;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 4. 코드 작성 — 상품 재고 처리</b>\n  <span style=\"float:right;background:#50c878;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">10점</span>\n</div>\n\n<p>상품 N개의 이름, 단가, 수량을 입력받아:<br>\n각 상품의 <b>총액</b>(단가×수량)을 출력하고,<br>\n총액이 가장 큰 상품과 전체 합계를 출력하시오.<br>\n총액이 같으면 먼저 입력된 상품을 출력한다.</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:8px;width:80px\"><b>입력</b></td>\n  <td style=\"padding:8px\">첫 줄: 상품 수 N (1 ≤ N ≤ 100)<br>이후 N줄: 이름 단가 수량</td>\n</tr>\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:8px\"><b>출력</b></td>\n  <td style=\"padding:8px\">각 상품: <code>이름 총액</code> (한 줄씩)<br>\n  <code>Max: 이름 총액</code><br>\n  <code>Total: 합계</code></td>\n</tr>\n</table>\n\n<div style=\"background:var(--surface2,#f5f5f5);padding:12px;border-radius:6px;margin:1rem 0;font-size:13px\">\n<b>예시)</b><br>\n<code style=\"display:inline-block;margin-top:4px\">입력: 3<br>&emsp;&emsp;&emsp;Apple 1500 3<br>&emsp;&emsp;&emsp;Banana 800 5<br>&emsp;&emsp;&emsp;Cherry 3000 1</code><br><br>\n<code>출력: Apple 4500<br>&emsp;&emsp;&emsp;Banana 4000<br>&emsp;&emsp;&emsp;Cherry 3000<br>&emsp;&emsp;&emsp;Max: Apple 4500<br>&emsp;&emsp;&emsp;Total: 11500</code>\n</div>\n\n<p><b>요구사항:</b> 구조체를 정의하여 사용할 것</p>",
  "input_desc": "첫 줄: N<br>이후 N줄: 이름 단가 수량",
  "output_desc": "각 상품 총액, Max 줄, Total 줄",
  "ex_in": "3\nApple 1500 3\nBanana 800 5\nCherry 3000 1",
  "ex_out": "Apple 4500\nBanana 4000\nCherry 3000\nMax: Apple 4500\nTotal: 11500",
  "cases": [
    {
      "id": 1,
      "pts": 25,
      "input": "4\nApple 1500 3\nBanana 800 5\nCherry 3000 1\nDate 600 8\n",
      "expected": "Apple 4500\nBanana 4000\nCherry 3000\nDate 4800\nMax: Date 4800\nTotal: 16300\n"
    },
    {
      "id": 2,
      "pts": 25,
      "input": "1\nA 100 1\n",
      "expected": "A 100\nMax: A 100\nTotal: 100\n"
    },
    {
      "id": 3,
      "pts": 25,
      "input": "2\nX 500 2\nY 300 4\n",
      "expected": "X 1000\nY 1200\nMax: Y 1200\nTotal: 2200\n"
    },
    {
      "id": 4,
      "pts": 25,
      "input": "3\nA 100 10\nB 200 5\nC 50 20\n",
      "expected": "A 1000\nB 1000\nC 1000\nMax: A 1000\nTotal: 3000\n"
    }
  ]
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe5",
  "subjective": true,
  "title": "문제 5. 개념 (구조체·union 메모리)",
  "desc": "\n<div style=\"border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 5. 개념 (구조체·union 메모리)</b>\n  <span style=\"float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">6점 (각 2점)</span>\n</div>\n\n<p>다음 각 물음에 답하시오.</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;width:30px;vertical-align:top\"><b>(a)</b></td>\n  <td style=\"padding:10px\">다음 두 선언에서 <code>sizeof(s)</code>가 <code>sizeof(u)</code>보다 큰 이유를 설명하시오.<br>\n<pre><code class=\"language-c\">struct S { int i; double d; char c; };\nunion  U { int i; double d; char c; };</code></pre>(단, <code>sizeof(int)=4</code>, <code>sizeof(double)=8</code>, <code>sizeof(char)=1</code>)</td>\n</tr>\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;vertical-align:top\"><b>(b)</b></td>\n  <td style=\"padding:10px\">프로그램에서 <b>‘원’</b>과 <b>‘사각형’</b> 두 종류의 도형을 하나의 배열로 관리하려 한다.<br>\n&bull; 원: 반지름 <code>double radius</code><br>\n&bull; 사각형: 가로 <code>double w</code>, 세로 <code>double h</code><br><br>\n<code>struct</code>와 <code>union</code>을 활용한 <b>tagged union</b> 방식으로 도형 구조체를 정의하시오.<br>\n(<code>int type</code> 필드로 종류를 구분. C 코드로 작성)</td>\n</tr>\n<tr>\n  <td style=\"padding:10px;vertical-align:top\"><b>(c)</b></td>\n  <td style=\"padding:10px\">다음 코드의 출력은? 결과와 함께 <b>이유</b>를 union의 메모리 공유 관점에서 설명하시오.<br>\n<pre><code class=\"language-c\">union { int i; char c; } d;\nd.i = 66;\nprintf(\"%c\\n\", d.c);</code></pre><br>\n[참고] ASCII 테이블 (일부):<br>\n<table style=\"display:inline-block;border-collapse:collapse;font-size:12px;margin:4px 0\">\n<tr><td style=\"padding:2px 8px;border:1px solid #ccc\"><b>문자</b></td><td style=\"padding:2px 8px;border:1px solid #ccc\"><code>A</code></td><td style=\"padding:2px 8px;border:1px solid #ccc\"><code>B</code></td><td style=\"padding:2px 8px;border:1px solid #ccc\"><code>a</code></td><td style=\"padding:2px 8px;border:1px solid #ccc\"><code>0</code></td></tr>\n<tr><td style=\"padding:2px 8px;border:1px solid #ccc\"><b>코드</b></td><td style=\"padding:2px 8px;border:1px solid #ccc\">65</td><td style=\"padding:2px 8px;border:1px solid #ccc\">66</td><td style=\"padding:2px 8px;border:1px solid #ccc\">97</td><td style=\"padding:2px 8px;border:1px solid #ccc\">48</td></tr>\n</table></td>\n</tr>\n</table>",
  "template": "(a) \n(b) \n(c) "
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe6",
  "subjective": true,
  "title": "문제 6. 오류 분석 (동적 메모리)",
  "desc": "\n<div style=\"border-left:4px solid #e05252;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 6. 오류 분석 (동적 메모리)</b>\n  <span style=\"float:right;background:#e05252;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">6점 (각 2점)</span>\n</div>\n\n<p>다음 각 코드 조각에 메모리 관련 <b>오류가 있으면</b> 오류의 이름과 <b>실행 시 발생할 수 있는 결과</b>를 서술하시오.<br>\n<b>오류가 없으면</b> ‘정상’이라고 쓰고 이유를 간단히 설명하시오.</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;width:30px;vertical-align:top\"><b>(a)</b></td>\n  <td style=\"padding:10px\"><pre><code class=\"language-c\">int *p = (int *)malloc(5 * sizeof(int));\nfor (int i = 0; i &lt;= 5; i++)\n    p[i] = i;\nfree(p);</code></pre></td>\n</tr>\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;vertical-align:top\"><b>(b)</b></td>\n  <td style=\"padding:10px\"><pre><code class=\"language-c\">int *p = (int *)malloc(5 * sizeof(int));\nint *tmp = (int *)realloc(p, 10 * sizeof(int));\nif (tmp != NULL) p = tmp;\np[7] = 42;\nfree(p);</code></pre></td>\n</tr>\n<tr>\n  <td style=\"padding:10px;vertical-align:top\"><b>(c)</b></td>\n  <td style=\"padding:10px\"><pre><code class=\"language-c\">void process(void) {\n    int *data = (int *)malloc(100 * sizeof(int));\n    data[0] = 1;\n    if (data[0] == 1) return;\n    free(data);\n}</code></pre></td>\n</tr>\n</table>\n\n<div style=\"margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px\">\n  <b>답안 형식:</b><br>\n  <code>(a) 오류: 배열 범위 초과 — p[5]는 할당 범위 밖이므로 쓰레기값 쓰기/segfault 가능</code><br>\n  <code>(b) 정상 — 이유: ...</code>\n</div>",
  "template": "(a) \n(b) \n(c) "
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe7",
  "subjective": true,
  "title": "문제 7. 빈칸 채우기 (파일 입출력)",
  "desc": "\n<div style=\"border-left:4px solid #e8a838;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 7. 빈칸 채우기 — 파일 입출력</b>\n  <span style=\"float:right;background:#e8a838;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">6점</span>\n</div>\n\n<p>아래 프로그램은 <code>scores.txt</code>에서 학생 이름과 점수를 읽어,<br>\n평균 이상인 학생만 <code>pass.txt</code>에 기록한다. 빈칸 <b>(a)~(e)</b>를 채우시오.</p>\n\n<div style=\"border:1px solid #999;padding:10px;font-family:Consolas,monospace;font-size:13px;background:#fff;color:#000;display:inline-block;border-radius:4px;margin:0.8rem 0\">\n  <b style=\"font-size:11px;color:#666\">scores.txt</b><br>\n  Alice 85<br>\n  Bob 92<br>\n  Carol 78<br>\n  Dave 60\n</div>\n\n<pre><code class=\"language-c\">#define _CRT_SECURE_NO_WARNINGS\n#include &lt;stdio.h&gt;\n\nint main(void) {\n    FILE *fin = fopen(\"scores.txt\", _____(a)_____);\n    if (_____(b)_____) {\n        perror(\"open\");\n        return 1;\n    }\n\n    char name[50];\n    int score, sum = 0, n = 0;\n    while (fscanf(fin, \"%s %d\", name, &amp;score) == _____(c)_____) {\n        sum += score;\n        n++;\n    }\n    double avg = (double)sum / n;\n    _____(d)_____;\n\n    FILE *fout = fopen(\"pass.txt\", \"w\");\n    while (fscanf(fin, \"%s %d\", name, &amp;score) == 2) {\n        if (score &gt;= avg)\n            _____(e)_____;\n    }\n    fclose(fin);\n    fclose(fout);\n    return 0;\n}</code></pre>\n\n<div style=\"margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px\">\n  <b>답안 형식:</b><br>\n  <code>(a) ...</code><br>\n  <code>(b) ...</code><br>\n  <code>(c) ...</code><br>\n  <code>(d) ... — 이 호출이 필요한 이유: ...</code><br>\n  <code>(e) ...</code><br><br>\n※ <b>(d)</b>는 코드와 함께 <b>이 함수 호출이 필요한 이유</b>를 한 문장으로 쓰시오.\n</div>",
  "template": "(a) \n(b) \n(c) \n(d) \n    이유: \n(e) "
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe8",
  "subjective": true,
  "title": "문제 8. 개념 (메모리·비트필드)",
  "desc": "\n<div style=\"border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 8. 개념 (메모리 + 비트필드)</b>\n  <span style=\"float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">6점</span>\n</div>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;width:30px;vertical-align:top\"><b>(a)</b><br><span style=\"font-size:11px;color:#888\">2점</span></td>\n  <td style=\"padding:10px\">지역 변수는 <code>_____</code> 영역에, <code>malloc</code>으로 할당한 메모리는 <code>_____</code> 영역에 저장된다.</td>\n</tr>\n<tr>\n  <td style=\"padding:10px;vertical-align:top\"><b>(b)</b><br><span style=\"font-size:11px;color:#888\">4점</span></td>\n  <td style=\"padding:10px\">다음 코드 실행 후 <code>s.reg</code>의 값을 <b>16진수</b>로 답하시오.<br>\n<b>bit 위치별 계산 과정</b>도 함께 쓰시오.<br><br>\n<pre><code class=\"language-c\">typedef struct {\n    unsigned char ready : 1;   // bit 0\n    unsigned char err   : 1;   // bit 1\n    unsigned char mode  : 3;   // bits 2~4\n    unsigned char rsv   : 3;   // bits 5~7\n} StatusBits;\n\ntypedef union {\n    StatusBits bits;\n    unsigned char reg;\n} StatusReg;\n\nStatusReg s;\ns.reg = 0;\ns.bits.ready = 1;\ns.bits.err = 0;\ns.bits.mode = 3;</code></pre></td>\n</tr>\n</table>",
  "template": "(a) _____, _____\n(b) 0x__\n    계산: "
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe9",
  "title": "문제 9. 코드 작성 (문자열 압축)",
  "desc": "\n<div style=\"border-left:4px solid #50c878;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 9. 코드 작성 — 문자열 압축 (RLE)</b>\n  <span style=\"float:right;background:#50c878;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">10점</span>\n</div>\n\n<p>문자열을 입력받아 <b>Run-Length Encoding</b>으로 압축하여 출력하시오.<br>\n연속된 같은 문자를 <code>문자+횟수</code>로 변환한다.</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:8px;width:80px\"><b>입력</b></td>\n  <td style=\"padding:8px\">한 줄의 문자열 (영문 소문자, 최대 100자, 공백 없음)</td>\n</tr>\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:8px\"><b>출력</b></td>\n  <td style=\"padding:8px\">압축된 문자열</td>\n</tr>\n</table>\n\n<div style=\"background:var(--surface2,#f5f5f5);padding:12px;border-radius:6px;margin:1rem 0;font-size:13px\">\n<b>예시)</b><br>\n<code>입력: aaabbc</code><br>\n<code>출력: a3b2c1</code><br><br>\n<code>입력: abcd</code><br>\n<code>출력: a1b1c1d1</code>\n</div>",
  "input_desc": "한 줄의 문자열 (소문자, 공백 없음)",
  "output_desc": "RLE 압축된 문자열",
  "ex_in": "aaabbc",
  "ex_out": "a3b2c1",
  "cases": [
    {
      "id": 1,
      "pts": 25,
      "input": "aaabbc\n",
      "expected": "a3b2c1\n"
    },
    {
      "id": 2,
      "pts": 25,
      "input": "abcd\n",
      "expected": "a1b1c1d1\n"
    },
    {
      "id": 3,
      "pts": 25,
      "input": "aaa\n",
      "expected": "a3\n"
    },
    {
      "id": 4,
      "pts": 25,
      "input": "aabbbcccc\n",
      "expected": "a2b3c4\n"
    }
  ]
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe10",
  "subjective": true,
  "title": "문제 10. 버그 수정 (학생 성적 처리)",
  "desc": "\n<div style=\"border-left:4px solid #e05252;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 10. 버그 수정 — 학생 성적 처리</b>\n  <span style=\"float:right;background:#e05252;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">6점</span>\n</div>\n\n<p>다음 프로그램은 학생 이름과 점수를 입력받아 <b>최고 득점자</b>와 <b>평균 점수</b>를 출력해야 한다.<br>\n이 코드에는 <b>컴파일 에러, 논리 에러, 런타임 에러</b>가 섞여 있다. 모든 버그를 찾아 수정하시오.</p>\n\n<pre><code class=\"language-c\">#define _CRT_SECURE_NO_WARNINGS\n#include &lt;stdio.h&gt;\n#include &lt;string.h&gt;\n\ntypedef struct {\n    char name[50];\n    int score;\n} Student;\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &amp;n);\n    Student list[100];\n    for (int i = 0; i &lt; n; i++)\n        scanf(\"%s %d\", list[i].name, list[i].score);\n    int best = 0;\n    for (int i = 1; i &lt;= n; i++) {\n        if (list[i].score &gt; list[best].score)\n            best = i;\n    }\n    printf(\"Best: %s %d\\n\", list[best].name, list[best].score);\n    int sum;\n    for (int i = 0; i &lt; n; i++)\n        sum += list[i].score;\n    double avg = sum / n;\n    printf(\"Average: %.1f\\n\", avg);\n    return 0;\n}</code></pre>\n\n<div style=\"margin-top:1rem;padding:10px;background:var(--surface2,#f0f0f0);border-radius:6px;font-size:13px\">\n  <b>답안 형식:</b> 각 버그에 대해 <b>줄 번호</b>, <b>문제점</b>, <b>프로그램에 미치는 영향</b>, <b>수정 코드</b>를 작성하시오.<br>\n  <code>버그: 줄 __, 문제: ...</code><br>\n  <code>  영향: ...</code><br>\n  <code>  수정: ...</code>\n</div>",
  "template": "버그: 줄 __, 문제: \n  영향: \n  수정: \n\n버그: 줄 __, 문제: \n  영향: \n  수정: \n\n버그: 줄 __, 문제: \n  영향: \n  수정: \n\n... (필요시 추가)"
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe11",
  "title": "문제 11. 코드 작성 (빈도 분석)",
  "desc": "\n<div style=\"border-left:4px solid #50c878;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 11. 코드 작성 — 빈도 분석</b>\n  <span style=\"float:right;background:#50c878;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">12점</span>\n</div>\n\n<p>정수 배열을 입력받아, 각 고유 값의 <b>등장 횟수</b>를 <b>처음 등장한 순서대로</b> 출력하고,<br>\n<b>가장 많이 등장한 값</b>(최빈값)을 출력하시오. (동률이면 먼저 등장한 값)</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:8px;width:80px\"><b>입력</b></td>\n  <td style=\"padding:8px\">첫 줄: 배열 크기 <code>n</code> (1 ≤ n ≤ 100)<br>둘째 줄: <code>n</code>개의 정수</td>\n</tr>\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:8px\"><b>출력</b></td>\n  <td style=\"padding:8px\">첫 줄: <code>값:횟수</code> 쌍을 공백으로 구분 (처음 등장 순서)<br>둘째 줄: 최빈값</td>\n</tr>\n</table>\n\n<div style=\"background:var(--surface2,#f5f5f5);padding:12px;border-radius:6px;margin:1rem 0;font-size:13px\">\n<b>예시)</b><br>\n<code style=\"display:inline-block;margin-top:4px\">입력: 6<br>&emsp;&emsp;&emsp;3 1 2 1 3 1</code><br><br>\n<code>출력: 3:2 1:3 2:1<br>&emsp;&emsp;&emsp;1</code>\n</div>\n\n<p><b>요구사항:</b></p>\n<ul style=\"font-size:13.5px;line-height:1.8\">\n<li>고유값 배열과 카운트 배열을 <code>malloc</code>으로 동적 할당할 것</li>\n<li>사용 후 <code>free</code>할 것</li>\n</ul>",
  "input_desc": "첫 줄: 배열 크기 n<br>둘째 줄: n개의 정수",
  "output_desc": "첫 줄: 값:횟수 (공백 구분, 등장순)<br>둘째 줄: 최빈값",
  "ex_in": "6\n3 1 2 1 3 1",
  "ex_out": "3:2 1:3 2:1\n1",
  "cases": [
    {
      "id": 1,
      "pts": 25,
      "input": "6\n3 1 2 1 3 1\n",
      "expected": "3:2 1:3 2:1\n1\n"
    },
    {
      "id": 2,
      "pts": 25,
      "input": "5\n1 1 1 1 1\n",
      "expected": "1:5\n1\n"
    },
    {
      "id": 3,
      "pts": 25,
      "input": "4\n4 3 2 1\n",
      "expected": "4:1 3:1 2:1 1:1\n4\n"
    },
    {
      "id": 4,
      "pts": 25,
      "input": "8\n1 2 3 2 1 2 3 3\n",
      "expected": "1:2 2:3 3:3\n2\n"
    }
  ]
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe12",
  "title": "문제 12. 코드 작성 (좌표 필터+정렬)",
  "desc": "\n<div style=\"border-left:4px solid #50c878;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 12. 코드 작성 — 좌표 필터링 및 정렬</b>\n  <span style=\"float:right;background:#50c878;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">12점</span>\n</div>\n\n<p>2D 좌표 N개를 입력받고, 원점으로부터의 <b>맨해튼 거리</b>(<code>|x| + |y|</code>)가<br>\n기준값 D <b>이하</b>인 점만 골라, <b>거리 오름차순</b>으로 정렬하여 출력하시오.<br>\n거리가 같으면 <b>x좌표 오름차순</b>으로 정렬한다.</p>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:8px;width:80px\"><b>입력</b></td>\n  <td style=\"padding:8px\">첫 줄: 점의 개수 N (1 ≤ N ≤ 100)<br>이후 N줄: 정수 좌표 <code>x y</code><br>마지막 줄: 기준값 D (정수)</td>\n</tr>\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:8px\"><b>출력</b></td>\n  <td style=\"padding:8px\">조건을 만족하는 점 <code>x y</code> (거리 오름차순, 한 줄씩)<br>마지막 줄: 해당 점의 개수<br>해당하는 점이 없으면 <code>0</code>만 출력</td>\n</tr>\n</table>\n\n<div style=\"background:var(--surface2,#f5f5f5);padding:12px;border-radius:6px;margin:1rem 0;font-size:13px\">\n<b>예시)</b> D = 7<br>\n<code style=\"display:inline-block;margin-top:4px\">입력: 5<br>&emsp;&emsp;&emsp;3 4<br>&emsp;&emsp;&emsp;1 1<br>&emsp;&emsp;&emsp;6 8<br>&emsp;&emsp;&emsp;-2 2<br>&emsp;&emsp;&emsp;0 5<br>&emsp;&emsp;&emsp;7</code><br><br>\n<code>출력: 1 1<br>&emsp;&emsp;&emsp;-2 2<br>&emsp;&emsp;&emsp;0 5<br>&emsp;&emsp;&emsp;3 4<br>&emsp;&emsp;&emsp;4</code><br>\n<span style=\"font-size:12px;color:#666\">(거리: 2, 4, 5, 7 순)</span>\n</div>\n\n<p><b>요구사항:</b></p>\n<ul style=\"font-size:13.5px;line-height:1.8\">\n<li>좌표를 저장할 <b>구조체</b>를 정의할 것</li>\n<li>배열은 <code>malloc</code>으로 동적 할당할 것</li>\n<li>정렬은 bubble sort 또는 selection sort 사용</li>\n<li>사용 후 <code>free</code>할 것</li>\n</ul>",
  "input_desc": "첫 줄: N<br>N줄: x y<br>마지막: 기준값 D",
  "output_desc": "조건 만족 점들 (거리순) + 개수",
  "ex_in": "5\n3 4\n1 1\n6 8\n-2 2\n0 5\n7",
  "ex_out": "1 1\n-2 2\n0 5\n3 4\n4",
  "cases": [
    {
      "id": 1,
      "pts": 25,
      "input": "5\n3 4\n1 1\n6 8\n-2 2\n0 5\n7\n",
      "expected": "1 1\n-2 2\n0 5\n3 4\n4\n"
    },
    {
      "id": 2,
      "pts": 25,
      "input": "2\n0 0\n1 1\n0\n",
      "expected": "0 0\n1\n"
    },
    {
      "id": 3,
      "pts": 25,
      "input": "3\n1 2\n-3 -4\n2 1\n10\n",
      "expected": "1 2\n2 1\n-3 -4\n3\n"
    },
    {
      "id": 4,
      "pts": 25,
      "input": "4\n5 5\n-5 -5\n1 0\n0 1\n2\n",
      "expected": "0 1\n1 0\n2\n"
    }
  ]
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe13",
  "subjective": true,
  "title": "문제 13. 포인터 심화",
  "desc": "\n<div style=\"border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 13. 포인터 심화 (이중 포인터·함수 포인터)</b>\n  <span style=\"float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">4점 (각 2점)</span>\n</div>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;width:30px;vertical-align:top\"><b>(a)</b></td>\n  <td style=\"padding:10px\">다음 코드의 출력은? <b>이유</b>를 이중 포인터 관점에서 간단히 설명하시오.<br>\n<pre><code class=\"language-c\">void set(int **pp, int *target) {\n    *pp = target;\n}\n\nint main(void) {\n    int a = 10, b = 20;\n    int *p = &amp;a;\n    set(&amp;p, &amp;b);\n    printf(\"%d\\n\", *p);   // 출력은?\n    return 0;\n}</code></pre></td>\n</tr>\n<tr>\n  <td style=\"padding:10px;vertical-align:top\"><b>(b)</b></td>\n  <td style=\"padding:10px\">다음 코드의 출력은? <code>ops[0](3,4)</code>와 <code>ops[1](2,5)</code> 각각의 결과를 쓰시오.<br>\n<pre><code class=\"language-c\">int add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\nint main(void) {\n    int (*ops[2])(int, int) = {add, mul};\n    int x = ops[0](3, 4) + ops[1](2, 5);\n    printf(\"%d\\n\", x);   // 출력은?\n    return 0;\n}</code></pre></td>\n</tr>\n</table>",
  "template": "(a) 출력: \n    이유: \n(b) ops[0](3,4)= , ops[1](2,5)= , 출력: "
});

PROBLEMS.push({
  "week": "기말고사",
  "final": true,
  "deadline": "2026-06-11T18:00",
  "id": "fe14",
  "subjective": true,
  "title": "문제 14. 문자열 함수",
  "desc": "\n<div style=\"border-left:4px solid #4a90d9;padding-left:12px;margin-bottom:1rem\">\n  <b style=\"font-size:15px\">문제 14. 문자열 함수</b>\n  <span style=\"float:right;background:#4a90d9;color:#fff;padding:2px 10px;border-radius:4px;font-size:12px\">4점 (각 2점)</span>\n</div>\n\n<table style=\"width:100%;border-collapse:collapse;margin:1rem 0;font-size:13.5px\">\n<tr style=\"border-bottom:1px solid var(--border,#ddd)\">\n  <td style=\"padding:10px;width:30px;vertical-align:top\"><b>(a)</b></td>\n  <td style=\"padding:10px\">다음 코드의 출력은? <b>strtok가 원본 문자열을 어떻게 변경하는지</b> 설명하시오.<br>\n<pre><code class=\"language-c\">#include &lt;string.h&gt;\n\nchar str[] = \"2026-06-15\";\nstrtok(str, \"-\");\nprintf(\"%d\\n\", (int)str[4]);   // 출력은?</code></pre></td>\n</tr>\n<tr>\n  <td style=\"padding:10px;vertical-align:top\"><b>(b)</b></td>\n  <td style=\"padding:10px\">다음 코드의 출력은?<br>\n<pre><code class=\"language-c\">#include &lt;string.h&gt;\n\nchar *words[] = {\"banana\", \"apple\", \"cherry\"};\nfor (int i = 0; i &lt; 2; i++)\n    if (strcmp(words[i], words[i+1]) &gt; 0)\n        printf(\"%s &gt; %s\\n\", words[i], words[i+1]);</code></pre></td>\n</tr>\n</table>",
  "template": "(a) 출력: \n    설명: \n(b) "
});


// ════ GEN (랜덤 테스트케이스 생성기) ════
(function () {
  if (typeof GEN === 'undefined') { return; }
  const NAMES = ['Apple', 'Banana', 'Cherry', 'Date', 'Egg', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Pear', 'Plum'];
  function shuf(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = ri(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  GEN.fe4 = (slot) => {
    let n;
    if (slot === 2) n = 1; else if (slot === 1) n = ri(3, 4); else if (slot === 3) n = ri(3, 4); else n = ri(4, 5);
    const pool = shuf(NAMES).slice(0, n);
    let items = [];
    for (let i = 0; i < n; i++) {
      let price, qty;
      if (slot === 4) { price = ri(500, 5000); qty = ri(5, 50); } else { price = ri(100, 2000); qty = ri(1, 10); }
      items.push({ name: pool[i], price, qty });
    }
    if (slot === 3) {
      const T = ri(8000, 12000);
      items[0] = { name: pool[0], price: T, qty: 1 };
      items[1] = { name: pool[1], price: T, qty: 1 };
      for (let i = 2; i < n; i++) { items[i].price = ri(100, 500); items[i].qty = ri(1, 5); }
    }
    let input = `${n}\n`, total = 0, maxT = -1, maxName = '';
    const lines = [];
    for (const it of items) {
      input += `${it.name} ${it.price} ${it.qty}\n`;
      const t = it.price * it.qty;
      lines.push(`${it.name} ${t}`);
      total += t;
      if (t > maxT) { maxT = t; maxName = it.name; }
    }
    lines.push(`Max: ${maxName} ${maxT}`);
    lines.push(`Total: ${total}`);
    return { input, expected: lines.join('\n') };
  };

  GEN.fe9 = (slot) => {
    let s = '';
    if (slot === 2) {
      const k = ri(4, 8); let prev = '';
      for (let i = 0; i < k; i++) { let c; do { c = String.fromCharCode(97 + ri(0, 25)); } while (c === prev); s += c; prev = c; }
    } else if (slot === 3) {
      const c = String.fromCharCode(97 + ri(0, 25)); s = c.repeat(ri(3, 9));
    } else {
      const groups = slot === 4 ? ri(4, 6) : ri(2, 4); let prev = '';
      for (let g = 0; g < groups; g++) { let c; do { c = String.fromCharCode(97 + ri(0, 25)); } while (c === prev); prev = c; s += c.repeat(ri(1, slot === 4 ? 5 : 4)); }
    }
    let exp = '', i = 0;
    while (i < s.length) { const ch = s[i]; let cnt = 0; while (i < s.length && s[i] === ch) { cnt++; i++; } exp += ch + cnt; }
    return { input: `${s}\n`, expected: exp };
  };

  GEN.fe11 = (slot) => {
    let arr = [];
    if (slot === 2) { const v = ri(1, 9); const n = ri(4, 7); arr = Array(n).fill(v); }
    else if (slot === 3) { const n = ri(4, 6); arr = shuf([...Array(20).keys()].map(x => x + 1)).slice(0, n); }
    else if (slot === 4) { const a = ri(1, 9); let b; do { b = ri(1, 9); } while (b === a); arr = ri(2, 3) === 3 ? [a, b, a, b, a, b] : [a, b, a, b]; }
    else { const n = ri(6, 8); for (let i = 0; i < n; i++) arr.push(ri(1, 5)); }
    const n = arr.length; const vals = [], cnts = [];
    for (const x of arr) { const idx = vals.indexOf(x); if (idx < 0) { vals.push(x); cnts.push(1); } else cnts[idx]++; }
    const line1 = vals.map((v, i) => `${v}:${cnts[i]}`).join(' ');
    let mi = 0; for (let i = 1; i < vals.length; i++) if (cnts[i] > cnts[mi]) mi = i;
    return { input: `${n}\n${arr.join(' ')}\n`, expected: `${line1}\n${vals[mi]}` };
  };

  GEN.fe12 = (slot) => {
    const rc = () => ri(-6, 6);
    let pts = [], D;
    const used = new Set();
    const tryAdd = p => { const k = (Math.abs(p[0]) + Math.abs(p[1])) + ',' + p[0]; if (used.has(k)) return false; used.add(k); pts.push(p); return true; };
    if (slot === 2) { D = 0; tryAdd([0, 0]); const n = ri(3, 4); let g = 0; while (pts.length < n && g++ < 500) { const p = [rc(), rc()]; if (p[0] === 0 && p[1] === 0) continue; tryAdd(p); } }
    else if (slot === 4) { D = ri(1, 2); const n = ri(3, 4); let g = 0; while (pts.length < n && g++ < 500) { const p = [rc(), rc()]; if (Math.abs(p[0]) + Math.abs(p[1]) <= D) continue; tryAdd(p); } }
    else if (slot === 3) { D = ri(6, 10); const n = ri(4, 5); let g = 0; while (pts.length < n && g++ < 500) tryAdd([rc(), rc()]); }
    else { D = ri(4, 8); const n = ri(5, 6); let g = 0; while (pts.length < n && g++ < 500) tryAdd([rc(), rc()]); }
    const dist = p => Math.abs(p[0]) + Math.abs(p[1]);
    let res = pts.filter(p => dist(p) <= D); res.sort((a, b) => dist(a) - dist(b) || a[0] - b[0]);
    let exp = res.length === 0 ? '0' : res.map(p => `${p[0]} ${p[1]}`).join('\n') + '\n' + res.length;
    let input = `${pts.length}\n` + pts.map(p => `${p[0]} ${p[1]}`).join('\n') + `\n${D}\n`;
    return { input, expected: exp };
  };
})();
