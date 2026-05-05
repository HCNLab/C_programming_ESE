function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const d = JSON.parse(e.postData.contents);

  // ── rating / first submit → Ratings 시트 ──
  if (d.type === 'rating') {
    const rs = ss.getSheetByName('Ratings') || ss.insertSheet('Ratings');
    if (rs.getLastRow() === 0) rs.appendRow(['문제ID','score']);
    rs.appendRow([d.problemId, d.score]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  }
  if (d.type === 'first') {
    const rs = ss.getSheetByName('Ratings') || ss.insertSheet('Ratings');
    if (rs.getLastRow() === 0) rs.appendRow(['문제ID','score']);
    rs.appendRow([d.problemId, 'first:' + d.name]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  }

  // ── 퀴즈 제출 → 퀴즈제출 시트 ──
  if (d.type === 'quiz') {
    const qs = ss.getSheetByName('퀴즈제출') || ss.insertSheet('퀴즈제출');
    if (qs.getLastRow() === 0) {
      qs.appendRow(['시각','학번_이름','문제ID','문제명','TC출력','코드']);
    }
    qs.appendRow([
      new Date(d.ts), d.username,
      d.problemId || '', d.problem || '',
      d.outputs || '',
      d.code || '',
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  }

  // ── 일반 제출 → 첫 번째 시트 ──
  const sheet = ss.getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['시각','학번_이름','주차','문제ID','문제명','점수','만점','TC결과','코드','타입']);
  }
  sheet.appendRow([
    new Date(d.ts), d.username, d.week,
    d.problemId || '', d.problem,
    d.score !== null && d.score !== undefined ? d.score : '',
    d.max   !== null && d.max   !== undefined ? d.max   : '',
    d.tc || '',
    d.code || '',
    d.type || 'assignment'
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mode = (e && e.parameter && e.parameter.mode) || '';
  const key  = (e && e.parameter && e.parameter.key) || '';
  const SECRET = 'h0vBgzOeEvfvK0WQYqXdDw';

  // admin/ratings 모드는 키 필요
  if ((mode === 'admin' || mode === 'ratings') && key !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'unauthorized' })).setMimeType(ContentService.MimeType.JSON);
  }

  // ── ratings 모드: Ratings 시트에서 집계 ──
  if (mode === 'ratings') {
    const rs = ss.getSheetByName('Ratings');
    const ratings = {};
    if (rs && rs.getLastRow() > 1) {
      const rows = rs.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        const pid = String(rows[i][0] || '').trim();
        const val = rows[i][1];
        if (!pid) continue;
        if (typeof val === 'string' && val.startsWith('first:')) {
          if (!ratings[pid]) ratings[pid] = { sum:0, count:0 };
          if (!ratings[pid].firstSubmitter) ratings[pid].firstSubmitter = val.slice(6);
        } else {
          if (!ratings[pid]) ratings[pid] = { sum:0, count:0 };
          ratings[pid].sum += Number(val) || 0;
          ratings[pid].count += 1;
        }
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ ratings })).setMimeType(ContentService.MimeType.JSON);
  }

  // ── 기존 제출 통계 ──
  const sheet = ss.getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  const EXCLUDE = ['원경호'];

  const header = rows[0] || [];
  const typeCol = header.indexOf('타입');

  const counts = {};
  const seenPid = new Set();
  const userProbs = {};
  const seenUser = new Set();
  const submissions = [];

  for (let i = 1; i < rows.length; i++) {
    const user = String(rows[i][1] || '').trim();
    const pid  = String(rows[i][3] || '').trim();
    if (!user || !pid) continue;

    const isExcluded = EXCLUDE.some(name => user.includes(name));
    if (isExcluded) continue;

    const score = rows[i][5];
    const max   = rows[i][6];
    const ts    = rows[i][0] ? new Date(rows[i][0]).toLocaleString('ko-KR') : '';

    const keyPid = user + '|' + pid;
    if (!seenPid.has(keyPid)) {
      seenPid.add(keyPid);
      counts[pid] = (counts[pid] || 0) + 1;
    }

    const keyUser = user + '|' + pid;
    if (!seenUser.has(keyUser)) {
      seenUser.add(keyUser);
      userProbs[user] = (userProbs[user] || 0) + 1;
    }

    if (mode === 'admin') {
      submissions.push({ username: user, pid: pid, score: score, max: max, ts: ts });
    }
  }

  const leaderboard = Object.entries(userProbs)
      .map(([full, count]) => ({ name: full, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  // 24시간 시간대별 제출 수
  const now = new Date();
  const hourly = new Array(24).fill(0);
  for (let i = 1; i < rows.length; i++) {
    const ts = rows[i][0] ? new Date(rows[i][0]) : null;
    if (!ts) continue;
    const diffMs = now - ts;
    if (diffMs < 0 || diffMs > 24 * 3600 * 1000) continue;
    const hoursAgo = Math.floor(diffMs / 3600000);
    hourly[23 - hoursAgo]++;
  }

  const result = { counts, leaderboard, hourly };
  if (mode === 'admin') result.submissions = submissions;

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── 자동 백업 (월/수/금 새벽 실행) ──
// 설정법: Apps Script 에디터 → 트리거(시계 아이콘) → 함수: backupSheet → 시간 기반 → 매일 → 오전 3~4시
// 함수 내부에서 월/수/금만 실행하므로 매일 트리거 걸어도 OK
function backupSheet() {
  const day = new Date().getDay(); // 0=일, 1=월, 3=수, 5=금
  if (day !== 1 && day !== 3 && day !== 5) return;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = ss.getName() + '_backup_' + Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
  ss.copy(name);
}
