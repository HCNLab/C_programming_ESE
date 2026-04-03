#!/usr/bin/env python3
"""
C 프로그래밍 과제 채점 스크립트
=====================================================
사용법:
  1. Google Sheets → 파일 → 다운로드 → CSV 저장
  2. python grade.py submissions.csv
  3. 결과는 터미널 출력 + grade_result.csv 저장

옵션:
  python grade.py submissions.csv                      # 전체 채점
  python grade.py submissions.csv --problem hw1        # 특정 문제만
  python grade.py submissions.csv --latest             # 학생당 최신 제출만 (기본값)
  python grade.py submissions.csv --all                # 모든 제출 채점

필요 환경:
  - Python 3.8+
  - gcc (Mac: xcode-select --install / Windows: MinGW 또는 WSL)
"""

import subprocess, tempfile, os, sys, csv, platform, argparse
from datetime import datetime
from pathlib import Path

# ── 테스트케이스 (index.html과 동기화 필요) ────────────────────
PROBLEMS = {
    'hw1': {
        'title': 'A+B',
        'cases': [
            {'input': '1 2',   'expected': '3'},
            {'input': '3 4',   'expected': '7'},
            {'input': '9 1',   'expected': '10'},
            {'input': '5 5',   'expected': '10'},
        ]
    },
    'hw2': {
        'title': '최솟값 출력',
        'cases': [
            {'input': '3 1 2',         'expected': '1'},
            {'input': '-5 0 3',        'expected': '-5'},
            {'input': '7 7 7',         'expected': '7'},
            {'input': '1000 -1000 0',  'expected': '-1000'},
        ]
    },
    'hw3': {
        'title': '팩토리얼',
        'cases': [
            {'input': '0',   'expected': '1'},
            {'input': '1',   'expected': '1'},
            {'input': '5',   'expected': '120'},
            {'input': '10',  'expected': '3628800'},
        ]
    },
    'p1': {
        'title': 'Calculator with switch',
        'cases': [
            {'input': '5 + 3',  'expected': '8.00'},
            {'input': '10 - 4', 'expected': '6.00'},
            {'input': '10 / 3', 'expected': '3.33'},
            {'input': '5 / 0',  'expected': 'Division by zero'},
        ]
    },
    'p2': {
        'title': 'Season Finder',
        'cases': [
            {'input': '4',  'expected': 'Spring'},
            {'input': '7',  'expected': 'Summer'},
            {'input': '10', 'expected': 'Autumn'},
            {'input': '1',  'expected': 'Winter'},
        ]
    },
    'p3': {
        'title': 'Vending Machine',
        'cases': [
            {'input': '1\n2000', 'expected': 'Coffee dispensed. Change: 500 won'},
            {'input': '2\n1000', 'expected': 'Insufficient funds'},
            {'input': '3\n5000', 'expected': 'Juice dispensed. Change: 3000 won'},
            {'input': '5\n1000', 'expected': 'Invalid selection'},
        ]
    },
    'p4': {
        'title': 'Days in Month',
        'cases': [
            {'input': '1 2024', 'expected': '31'},
            {'input': '2 2024', 'expected': '29'},
            {'input': '2 2023', 'expected': '28'},
            {'input': '4 2024', 'expected': '30'},
        ]
    },
    'c1': {
        'title': 'Tax Bracket Calculator',
        'cases': [
            {'input': '14000000',  'expected': 'Tax: 840000 won'},
            {'input': '60000000',  'expected': 'Tax: 8640000 won'},
            {'input': '100000000', 'expected': 'Tax: 19560000 won'},
            {'input': '5000000',   'expected': 'Tax: 300000 won'},
        ]
    },
    'c2': {
        'title': 'Rock Paper Scissors',
        'cases': [
            {'input': 'R\nS', 'expected': 'Player 1 wins'},
            {'input': 'P\nR', 'expected': 'Player 1 wins'},
            {'input': 'R\nR', 'expected': 'Draw'},
            {'input': 's\nP', 'expected': 'Player 1 wins'},
        ]
    },
    'c3': {
        'title': 'Quadratic Equation Solver',
        'cases': [
            {'input': '1 -5 6', 'expected': 'x1 = 3.00, x2 = 2.00'},
            {'input': '1 -2 1', 'expected': 'x = 1.00'},
            {'input': '1 0 1',  'expected': 'No real roots'},
            {'input': '0 2 -4', 'expected': 'x = 2.00'},
        ]
    },
    'c4': {
        'title': 'Date Validator',
        'cases': [
            {'input': '2024 2 29', 'expected': 'Valid date'},
            {'input': '2023 2 29', 'expected': 'Invalid date: invalid day'},
            {'input': '2024 13 1', 'expected': 'Invalid date: invalid month'},
            {'input': '2024 4 31', 'expected': 'Invalid date: invalid day'},
        ]
    },
    'c5': {
        'title': 'Mini ATM System',
        'cases': [
            {'input': '9999\n1',         'expected': 'Wrong PIN'},
            {'input': '1234\n1',         'expected': 'Balance: 100000 won'},
            {'input': '1234\n2\n50000',  'expected': 'Deposited. Balance: 150000 won'},
            {'input': '1234\n3\n200000', 'expected': 'Insufficient funds'},
        ]
    },
}

POINTS_PER_CASE = 25
IS_WINDOWS = platform.system() == 'Windows'

# ── 컴파일 + 실행 ──────────────────────────────────────────────
def compile_and_run(source_code: str, stdin_data: str, timeout: int = 5) -> dict:
    """C 코드를 컴파일하고 실행한 결과를 반환."""
    with tempfile.TemporaryDirectory() as tmpdir:
        src_path = os.path.join(tmpdir, 'solution.c')
        exe_path = os.path.join(tmpdir, 'solution.exe' if IS_WINDOWS else 'solution')

        with open(src_path, 'w', encoding='utf-8') as f:
            f.write(source_code)

        # 컴파일
        compile_result = subprocess.run(
            ['gcc', src_path, '-o', exe_path, '-lm', '-w'],
            capture_output=True, text=True, timeout=15
        )
        if compile_result.returncode != 0:
            return {'status': 'compile_error', 'detail': compile_result.stderr.strip()[:300]}

        # 실행
        try:
            run_result = subprocess.run(
                [exe_path],
                input=stdin_data,
                capture_output=True, text=True,
                timeout=timeout
            )
            stdout = run_result.stdout.replace('\r', '').rstrip()
            return {'status': 'ok', 'stdout': stdout}
        except subprocess.TimeoutExpired:
            return {'status': 'timeout'}
        except Exception as e:
            return {'status': 'runtime_error', 'detail': str(e)}


def grade_submission(problem_id: str, source_code: str) -> dict:
    """한 제출을 채점하고 결과 반환."""
    if problem_id not in PROBLEMS:
        return {'score': 0, 'max': 100, 'details': [], 'error': f'알 수 없는 문제 ID: {problem_id}'}

    cases    = PROBLEMS[problem_id]['cases']
    details  = []
    score    = 0
    max_score = len(cases) * POINTS_PER_CASE

    for i, case in enumerate(cases):
        result = compile_and_run(source_code, case['input'])

        if result['status'] == 'compile_error':
            details.append({'tc': i+1, 'pass': False, 'reason': '컴파일 오류'})
            # 컴파일 오류면 나머지도 모두 실패
            for j in range(i+1, len(cases)):
                details.append({'tc': j+1, 'pass': False, 'reason': '컴파일 오류'})
            break

        if result['status'] == 'timeout':
            details.append({'tc': i+1, 'pass': False, 'reason': '시간 초과'})
            continue

        if result['status'] in ('runtime_error',):
            details.append({'tc': i+1, 'pass': False, 'reason': '런타임 오류'})
            continue

        actual   = result['stdout'].rstrip()
        expected = case['expected'].rstrip()
        passed   = actual == expected

        if passed:
            score += POINTS_PER_CASE
            details.append({'tc': i+1, 'pass': True})
        else:
            details.append({'tc': i+1, 'pass': False,
                            'reason': f'출력: {repr(actual)} / 기댓값: {repr(expected)}'})

    return {'score': score, 'max': max_score, 'details': details}


# ── CSV 읽기 ───────────────────────────────────────────────────
def load_submissions(csv_path: str) -> list[dict]:
    """
    Google Sheets에서 다운로드한 CSV를 읽음.
    예상 컬럼: 시각, 학번_이름, 주차, 문제ID, 문제명, 코드
    (Apps Script appendRow 순서와 일치)
    """
    submissions = []
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # 컬럼명 유연하게 처리
            sub = {
                'ts':         row.get('시각', row.get('ts', '')),
                'username':   row.get('학번_이름', row.get('username', '')),
                'week':       row.get('주차', row.get('week', '')),
                'problem_id': row.get('문제ID', row.get('problemId', '')),
                'problem':    row.get('문제명', row.get('problem', '')),
                'code':       row.get('코드', row.get('code', '')),
            }
            if sub['username'] and sub['code']:
                submissions.append(sub)
    return submissions


def filter_latest(submissions: list[dict]) -> list[dict]:
    """학생 × 문제당 최신 제출 하나만 남김."""
    latest = {}
    for sub in submissions:
        key = (sub['username'], sub['problem_id'])
        if key not in latest or sub['ts'] > latest[key]['ts']:
            latest[key] = sub
    return list(latest.values())


# ── 출력 ───────────────────────────────────────────────────────
def print_table(results: list[dict]):
    """터미널에 채점 결과 테이블 출력."""
    if not results:
        print("채점할 결과가 없습니다.")
        return

    # 컬럼 너비 계산
    w_user = max(len(r['username']) for r in results) + 2
    w_prob = max(len(r['problem'])  for r in results) + 2
    w_user = max(w_user, 12)
    w_prob = max(w_prob, 20)

    header = f"{'학번_이름':<{w_user}} {'문제':<{w_prob}} {'점수':>6}  {'TC결과'}"
    print()
    print(header)
    print('-' * len(header))

    for r in sorted(results, key=lambda x: (x['problem_id'], x['username'])):
        tc_icons = ''.join('O' if d['pass'] else 'X' for d in r['details'])
        score_str = f"{r['score']:>3}/{r['max']}"
        print(f"{r['username']:<{w_user}} {r['problem']:<{w_prob}} {score_str:>6}  {tc_icons}")
        if r.get('compile_error'):
            print(f"  {'':>{w_user}}  컴파일 오류: {r['compile_error'][:80]}")
    print()


def save_csv(results: list[dict], out_path: str):
    """채점 결과를 CSV로 저장."""
    with open(out_path, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow(['학번_이름', '주차', '문제ID', '문제명', '점수', '만점',
                         'TC1', 'TC2', 'TC3', 'TC4', '오류내용'])
        for r in sorted(results, key=lambda x: (x['problem_id'], x['username'])):
            tc_results = [('O' if d['pass'] else 'X') for d in r['details']]
            tc_results += [''] * (4 - len(tc_results))
            errors = '; '.join(d.get('reason','') for d in r['details'] if not d['pass'])
            writer.writerow([
                r['username'], r['week'], r['problem_id'], r['problem'],
                r['score'], r['max'], *tc_results, errors
            ])
    print(f"결과 저장: {out_path}")


# ── 메인 ───────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description='C 프로그래밍 과제 채점')
    parser.add_argument('csv', help='Google Sheets에서 다운로드한 CSV 파일 경로')
    parser.add_argument('--problem', help='특정 문제 ID만 채점 (예: hw1, p1, c2)')
    parser.add_argument('--student', help='특정 학생만 채점 (예: 202312345_홍길동)')
    parser.add_argument('--all', action='store_true', help='학생당 모든 제출 채점 (기본: 최신 1개)')
    args = parser.parse_args()

    print(f"\n📂 {args.csv} 읽는 중...")
    submissions = load_submissions(args.csv)
    print(f"   총 {len(submissions)}개 제출 로드됨")

    if not args.all:
        submissions = filter_latest(submissions)
        print(f"   최신 제출만 필터링 → {len(submissions)}개")

    if args.problem:
        submissions = [s for s in submissions if s['problem_id'] == args.problem]
        print(f"   문제 {args.problem} 필터링 → {len(submissions)}개")

    if args.student:
        submissions = [s for s in submissions if args.student in s['username']]
        print(f"   학생 {args.student} 필터링 → {len(submissions)}개")

    if not submissions:
        print("채점할 제출이 없습니다.")
        return

    print(f"\n🔨 채점 시작 ({len(submissions)}개)...\n")

    results = []
    for i, sub in enumerate(submissions, 1):
        pid = sub['problem_id']
        sys.stdout.write(f"\r  [{i:3}/{len(submissions)}] {sub['username']} / {sub['problem']}")
        sys.stdout.flush()

        grade = grade_submission(pid, sub['code'])

        # compile error 요약
        ce = next((d.get('detail','') for d in grade['details']
                   if d.get('reason','') == '컴파일 오류'), None)

        results.append({
            'username':   sub['username'],
            'week':       sub['week'],
            'problem_id': pid,
            'problem':    sub['problem'],
            'score':      grade['score'],
            'max':        grade['max'],
            'details':    grade['details'],
            'compile_error': ce,
        })

    sys.stdout.write('\r' + ' '*60 + '\r')
    print("채점 완료!\n")

    print_table(results)

    # CSV 저장
    out_name = f"grade_result_{datetime.now().strftime('%m%d_%H%M')}.csv"
    save_csv(results, out_name)

    # 요약 통계
    by_problem = {}
    for r in results:
        pid = r['problem_id']
        if pid not in by_problem:
            by_problem[pid] = {'title': r['problem'], 'scores': []}
        by_problem[pid]['scores'].append(r['score'])

    print("\n📊 문제별 요약")
    print(f"{'문제':<28} {'제출':>4}  {'평균':>5}  {'만점':>4}")
    print('-' * 50)
    for pid, info in sorted(by_problem.items()):
        scores = info['scores']
        avg  = sum(scores) / len(scores)
        full = sum(1 for s in scores if s == 100)
        print(f"{info['title']:<28} {len(scores):>4}명  {avg:>5.1f}점  {full:>4}명 만점")
    print()


if __name__ == '__main__':
    main()
