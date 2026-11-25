/* Geometry Ch 3–4 Practice Test — UI */
(function () {
'use strict';
const KEY = 'geo34-state-v1';
const LIMIT_MS = 50 * 60 * 1000;
const $ = s => document.querySelector(s);
const app = $('#app');
let state = null, test = null, tick = null, filter = 'all';

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ } }
function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
function newSeed() { return (Math.floor(Math.random() * 900000) + 100000); }
const isHard = () => state && (state.mode === 'hard' || state.mode === 'real');
const isReal = () => state && state.mode === 'real';
const gen = (seed, mode) => mode === 'real' ? GeoQ.generateRealTest(seed) : mode === 'hard' ? GeoQ.generateHardTest(seed) : GeoQ.generateTest(seed);
const MODES = ['real', 'hard', 'standard'];
const MODE_LABEL = { real: 'Real Test (10 Q / 40 pts)', standard: 'Standard', hard: 'Hard mix' };
const params = new URLSearchParams(location.search);
const totalPts = () => test.reduce((a, q) => a + q.points, 0);
const akey = (qi, pi) => qi + '-' + pi;
function answered() { let n = 0; test.forEach((q, qi) => q.parts.forEach((p, pi) => { const v = state.answers[akey(qi, pi)]; if (v !== undefined && v !== null && String(v).trim() !== '') n++; })); return n; }

const HINTS = {
  num: 'Enter a number (fractions like 3/2 are OK).',
  numrad: 'Exact (like 3√5 or 3sqrt5) or a decimal to the hundredth.',
  point: 'Enter a point like (−2, 5).',
  vector: 'Enter like ⟨3, −2⟩ or (3, −2).',
  line: 'Any equivalent equation, e.g. y = 2x − 3 or y = −1/2x + 4.'
};
const PH = { num: 'Number', point: '(x, y)', vector: '⟨a, b⟩', line: 'y = mx + b' };

/* ---------------------------------------------------------- start */
function renderStart() {
  stopTimer();
  $('#bar').classList.add('hidden');
  const saved = load();
  const resume = saved && !saved.submitted && saved.seed;
  const last = saved && saved.submitted;
  const lastMode = 'real'; // Real Test is the default: same 10 question types as the actual Ch 3–4 test
  app.innerHTML =
    '<section class="card start">' +
    
    '<div class="modes" role="radiogroup" aria-label="Test mode">' +
    '<label class="mode hardm' + (lastMode === 'real' ? ' on' : '') + '"><input type="radio" name="mode" value="real"' + (lastMode === 'real' ? ' checked' : '') + '><span><b>Real Test (10 Q / 40 pts)</b> <span class="rec">Recommended</span><br><small>Same 10 questions as the actual Ch 3\u20134 test, new numbers every time \u00B7 each 4 pts, all multi-step: perpendicular bisector, similarity from a graph (negative-k trap), translation vector with 4 unknowns, perpendicular line + distance, two reflections = rotation, rotation + reflection, dilation + translation, scale factor, parallel lines with a quadratic, shortest path AC + BC</small></span></label>' +
    '<label class="mode' + (lastMode === 'hard' ? ' on' : '') + '"><input type="radio" name="mode" value="hard"' + (lastMode === 'hard' ? ' checked' : '') + '><span><b>Hard mix</b> (proofs + more topics)<br><small>13 questions \u00B7 40 pts \u00B7 two-column proofs, angle algebra, line equations + distance, compositions, dilations, similarity</small></span></label>' +
    '<label class="mode' + (lastMode === 'standard' ? ' on' : '') + '"><input type="radio" name="mode" value="standard"' + (lastMode === 'standard' ? ' checked' : '') + '><span><b>Standard</b> (warm-up)<br><small>26 questions \u00B7 40 pts \u00B7 one skill per question</small></span></label>' +
    '</div>' +
    '<label class="field" for="nm">Your name (optional)</label>' +
    '<input id="nm" type="text" autocomplete="given-name" placeholder="e.g. Alex" value="' + esc((saved && saved.name) || '') + '">' +
    '<label class="check"><input id="tm" type="checkbox"' + (saved && saved.timer ? ' checked' : '') + '> Use a 50-minute timer</label>' +
    '<button id="go" class="btn primary big">Start a new test</button>' +
    (resume ? '<div style="height:10px"></div><button id="resume" class="btn big">Resume ' + (MODE_LABEL[saved.mode] || 'Standard') + ' test in progress</button>' : '') +
    (last ? '<div style="height:10px"></div><button id="lastres" class="btn big">See last results (' + (MODE_LABEL[saved.mode] || 'Standard') + ')</button>' : '') +
    '</section>';
  app.querySelectorAll('input[name=mode]').forEach(r => r.addEventListener('change', () => app.querySelectorAll('.mode').forEach(l => l.classList.toggle('on', l.querySelector('input').checked))));
  const mode = () => (app.querySelector('input[name=mode]:checked') || {}).value || 'real';
  $('#go').onclick = () => startTest(+params.get('seed') || newSeed(), $('#nm').value.trim(), $('#tm').checked, mode());
  if (resume) $('#resume').onclick = () => { state = saved; test = gen(state.seed, state.mode); renderTest(); };
  if (last) $('#lastres').onclick = () => { state = saved; test = gen(state.seed, state.mode); renderResults(); };
}

function startTest(seed, name, timer, mode) {
  mode = MODES.indexOf(mode) >= 0 ? mode : 'real';
  state = { seed: seed, mode: mode, name: name || '', timer: !!timer, started: Date.now(), deadline: timer ? Date.now() + LIMIT_MS : null, answers: {}, submitted: false };
  test = gen(seed, mode);
  save(); filter = 'all';
  renderTest();
  window.scrollTo(0, 0);
}

/* ----------------------------------------------------------- test */
function partHTML(q, qi, p, pi, done) {
  const k = akey(qi, pi), val = state.answers[k];
  let h = '<div class="part">' + (p.label ? '<div class="plabel">' + p.label + '</div>' : '');
  if (p.type === 'mc' || p.type === 'select') {
    h += '<div class="choices" role="radiogroup">';
    p.choices.forEach((c, ci) => {
      let cls = 'choice' + (val === ci ? ' sel' : '');
      if (done) { if (ci === p.answer) cls += ' right'; else if (val === ci) cls += ' wrong'; }
      h += '<button type="button" role="radio" aria-checked="' + (val === ci) + '" class="' + cls + '" data-k="' + k + '" data-c="' + ci + '"' + (done ? ' disabled' : '') + '><span class="dotc"></span><span>' + c + '</span></button>';
    });
    h += '</div>';
  } else {
    const hint = p.type === 'num' && p.approx ? HINTS.numrad : HINTS[p.type];
    h += '<div class="inrow"><input type="text" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-k="' + k + '" placeholder="' + PH[p.type] + '" value="' + esc(val || '') + '"' + (done ? ' disabled' : '') + '>' +
      (p.unit ? '<span>' + p.unit + '</span>' : '') +
      (!done && p.type === 'num' && p.approx ? '<button type="button" class="ins" data-ins="√" data-for="' + k + '" aria-label="insert square root">√</button>' : '') +
      '</div>' + (done ? '' : '<div class="hint">' + hint + '</div>');
  }
  if (done) {
    const right = GeoQ.grade(p, val);
    h += '<div class="result ' + (right ? 'ok' : 'bad') + '">' + (right ? '✓ Correct' : '✗ ' + (val === undefined || val === '' ? 'No answer' : 'Not quite') + ' — correct answer: <b>' + p.answerHTML + '</b>') + '</div>';
  }
  return h + '</div>';
}
function selectHTML(qi, p, pi, done) {
  const k = akey(qi, pi), val = state.answers[k];
  const right = done && GeoQ.grade(p, val);
  let h = '<span class="selwrap' + (done ? (right ? ' ok' : ' bad') : '') + '"><select data-k="' + k + '" aria-label="' + esc(p.label || 'choose') + '"' + (done ? ' disabled' : '') + '>' +
    '<option value=""' + (val === undefined || val === null || val === '' ? ' selected' : '') + '>— choose —</option>';
  p.choices.forEach((c, ci) => { h += '<option value="' + ci + '"' + (val === ci ? ' selected' : '') + '>' + esc(c.replace(/<[^>]+>/g, '')) + '</option>'; });
  h += '</select>';
  if (done) h += right ? '<span class="selmark ok">✓</span>' : '<span class="selmark bad">✗</span><span class="selans">Correct: <b>' + p.choices[p.answer] + '</b></span>';
  return h + '</span>';
}
function proofHTML(q, qi, done) {
  const P = q.proof;
  let h = '<div class="gp"><div><b>Given:</b> ' + P.given + '</div><div><b>Prove:</b> ' + P.prove + '</div></div>';
  h += '<table class="proof"><thead><tr><th>Statements</th><th>Reasons</th></tr></thead><tbody>';
  const cell = c => (c && typeof c === 'object') ? (c.pre ? '<span class="pre">' + c.pre + '</span>' : '') + selectHTML(qi, q.parts[c.part], c.part, done) : c;
  P.table.forEach((row, i) => {
    if (row.wide) { // long choices: show as tappable options across the whole row
      const pi = row.r.part;
      h += '<tr><td colspan="2" class="wide"><span class="sn">' + (i + 1) + '.</span> ' + row.s + ' \u2014 choose the reason:' + partHTML(q, qi, q.parts[pi], pi, done) + '</td></tr>';
      return;
    }
    h += '<tr><td data-h="Statement"><span class="sn">' + (i + 1) + '.</span> ' + cell(row.s) + '</td><td data-h="Reason">' + cell(row.r) + '</td></tr>';
  });
  return h + '</tbody></table>';
}
function questionHTML(q, qi, done, res) {
  let cls = 'card q';
  if (done) cls += res.got === res.total ? ' got' : res.got === 0 ? ' miss' : ' partial';
  let mark = '';
  if (done) mark = '<span class="mark ' + (res.got === res.total ? 'ok' : res.got === 0 ? 'bad' : 'part') + '">' + res.got + '/' + res.total + '</span>';
  let h = '<article class="' + cls + '" id="q' + qi + '"><div class="qhead"><span class="qnum">' + q.n + '.</span><span class="sec">' + q.section + '</span>' + mark + '<span class="pts">' + q.points + ' pt' + (q.points > 1 ? 's' : '') + '</span></div>';
  if (q.blocks) { // one multi-part question made of Part A, Part B, ... (answers are numbered across the whole question)
    q.blocks.forEach(b => {
      h += '<div class="block"><div class="blkhead">Part ' + b.letter + ' <span class="hint">(' + b.points + ' pt' + (b.points > 1 ? 's' : '') + ')</span></div><div class="prompt">' + b.prompt + '</div>';
      if (b.svg) h += '<div class="figwrap">' + b.svg + '</div>';
      b.parts.forEach((p, j) => { h += partHTML(q, qi, p, b.partOffset + j, done); });
      h += '</div>';
    });
  } else {
    h += '<div class="prompt">' + q.prompt + '</div>';
    if (q.svg) h += '<div class="figwrap">' + q.svg + '</div>';
    if (q.proof) h += proofHTML(q, qi, done);
    else q.parts.forEach((p, pi) => { h += partHTML(q, qi, p, pi, done); });
  }
  if (done) h += '<div class="expl"><b>Why:</b> ' + q.explanation + '</div>';
  return h + '</article>';
}
function renderTest() {
  $('#bar').classList.remove('hidden');
  $('#barSubmit').classList.remove('hidden');
  let h = '<div class="card' + (isHard() ? ' hardhead' : '') + '"><b>' + (state.name ? esc(state.name) + '\u2019s ' : '') + (isReal() ? 'Real Test (10 Q / 40 pts)' : (isHard() ? 'Hard ' : '') + 'Practice Test') + '</b> <span class="hint">(version #' + state.seed + ')</span><br><span class="hint">Answer every question, then tap Submit at the bottom. Your answers are saved on this device if the page reloads.' + (isReal() ? ' <b>Show ALL work for FULL credit</b> \u2014 work each problem on paper first, then enter each part (each part = 1 pt, 4 pts per question). Fractions like \u221215/4 are fine anywhere; lines can be in any equivalent form.' : isHard() ? ' For proofs, pick each missing statement or reason from the drop-down menu. Fractions like 11/2 are fine anywhere.' : '') + '</span></div>';
  test.forEach((q, qi) => { h += questionHTML(q, qi, false); });
  h += '<button id="submit" class="btn primary big">Submit test</button>';
  h += '<div style="height:10px"></div><button id="quit" class="btn big">Back to start</button>';
  app.innerHTML = h;
  app.querySelectorAll('input[data-k]').forEach(inp => inp.addEventListener('input', () => { state.answers[inp.dataset.k] = inp.value; save(); updateProgress(); }));
  app.querySelectorAll('select[data-k]').forEach(sel => sel.addEventListener('change', () => { state.answers[sel.dataset.k] = sel.value === '' ? undefined : +sel.value; save(); updateProgress(); }));
  app.querySelectorAll('button.choice').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.k, c = +b.dataset.c;
    state.answers[k] = c; save(); updateProgress();
    b.parentNode.querySelectorAll('.choice').forEach(x => { const on = x === b; x.classList.toggle('sel', on); x.setAttribute('aria-checked', on); });
  }));
  app.querySelectorAll('button.ins').forEach(b => b.addEventListener('click', () => {
    const inp = app.querySelector('input[data-k="' + b.dataset.for + '"]');
    const s = inp.selectionStart != null ? inp.selectionStart : inp.value.length, e = inp.selectionEnd != null ? inp.selectionEnd : s;
    inp.value = inp.value.slice(0, s) + b.dataset.ins + inp.value.slice(e);
    inp.focus(); inp.setSelectionRange(s + 1, s + 1);
    inp.dispatchEvent(new Event('input'));
  }));
  $('#submit').onclick = () => trySubmit(false);
  $('#barSubmit').onclick = () => trySubmit(false);
  $('#quit').onclick = () => { if (confirm('Leave this test? Your answers stay saved, and you can resume from the start screen.')) renderStart(); };
  updateProgress();
  startTimer();
}
function updateProgress() { $('#progress').textContent = answered() + ' / ' + totalPts() + ' answered'; }

/* ---------------------------------------------------------- timer */
function stopTimer() { if (tick) clearInterval(tick); tick = null; $('#timer').classList.add('hidden'); }
function startTimer() {
  stopTimer();
  if (!state.deadline) return;
  const el = $('#timer'); el.classList.remove('hidden');
  const upd = () => {
    const left = state.deadline - Date.now();
    if (left <= 0) { el.textContent = '0:00'; stopTimer(); trySubmit(true); return; }
    const m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60;
    el.textContent = m + ':' + String(s).padStart(2, '0');
    el.classList.toggle('low', left < 5 * 60000);
  };
  upd(); tick = setInterval(upd, 1000);
}

/* --------------------------------------------------------- submit */
function trySubmit(timeUp) {
  if (state.submitted) return;
  const left = totalPts() - answered();
  if (!timeUp && left > 0 && !confirm(left + ' answer' + (left > 1 ? 's are' : ' is') + ' still blank. Submit anyway?')) return;
  state.submitted = true; state.submittedAt = Date.now(); state.timeUp = !!timeUp;
  save(); stopTimer();
  if (timeUp) alert('Time\u2019s up! Your test has been submitted.');
  filter = 'all';
  renderResults();
  window.scrollTo(0, 0);
}
function scoreAll() {
  return test.map((q, qi) => { const got = q.parts.reduce((a, p, pi) => a + (GeoQ.grade(p, state.answers[akey(qi, pi)]) ? 1 : 0), 0); return { got: got, total: q.points }; });
}
function renderResults() {
  stopTimer();
  $('#bar').classList.add('hidden');
  const res = scoreAll();
  const got = res.reduce((a, r) => a + r.got, 0), total = totalPts(), pct = Math.round(100 * got / total);
  const missed = res.filter(r => r.got < r.total).length;
  const msg = pct >= 90 ? 'Excellent — you\u2019re ready! 🎉' : pct >= 80 ? 'Great job! Review the few you missed.' : pct >= 70 ? 'Good work. Go over the mistakes, then try a new test.' : 'Keep going — review the explanations, then take a new test.';
  const mins = state.submittedAt && state.started ? Math.round((state.submittedAt - state.started) / 60000) : null;
  const bySec = {};
  test.forEach((q, i) => { const s = q.section; bySec[s] = bySec[s] || [0, 0]; bySec[s][0] += res[i].got; bySec[s][1] += res[i].total; });
  let h = '<section class="card score">' + (state.name ? '<div><b>' + esc(state.name) + '</b></div>' : '') +
    '<div class="big">' + got + ' / ' + total + '</div><div class="pct">' + pct + '%</div>' +
    '<div class="msg">' + msg + (mins !== null ? '<br>Time used: ' + mins + ' min' + (state.timeUp ? ' (time ran out)' : '') : '') + ' · ' + MODE_LABEL[state.mode || 'standard'] + ' mode · version #' + state.seed + '</div>' +
    '<div class="secs">' + Object.keys(bySec).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map(s => { const v = bySec[s]; return '<span class="' + (v[0] === v[1] ? 'full' : v[0] === 0 ? 'none' : 'some') + '">' + s + ': ' + v[0] + '/' + v[1] + '</span>'; }).join('') + '</div>' +
    '<div class="row"><button id="newt" class="btn primary">New test</button><button id="retake" class="btn">Retake this version</button></div></section>';
  h += '<div class="filter"><button class="btn small' + (filter === 'all' ? ' on' : '') + '" data-f="all">Show all (' + test.length + ')</button><button class="btn small' + (filter === 'miss' ? ' on' : '') + '" data-f="miss">Review mistakes (' + missed + ')</button></div>';
  let shown = 0;
  test.forEach((q, qi) => { if (filter === 'miss' && res[qi].got === res[qi].total) return; shown++; h += questionHTML(q, qi, true, res[qi]); });
  if (!shown) h += '<div class="card">No mistakes to review — perfect score! 🎉</div>';
  h += '<div class="row" style="margin-top:6px"><button id="newt2" class="btn primary">New test</button><button id="home" class="btn">Start screen</button></div>';
  app.innerHTML = h;
  const nt = () => startTest(newSeed(), state.name, state.timer, state.mode);
  $('#newt').onclick = nt; $('#newt2').onclick = nt;
  $('#retake').onclick = () => startTest(state.seed, state.name, state.timer, state.mode);
  $('#home').onclick = renderStart;
  app.querySelectorAll('.filter .btn').forEach(b => b.onclick = () => { filter = b.dataset.f; renderResults(); });
}

/* ---------------------------------------------------- local self-test */
function selfTest(mode) { // only on localhost: fills answers automatically (used for automated checks/screenshots)
  startTest(+params.get('seed') || 424242, 'Student', false, params.get('mode'));
  let i = 0;
  test.forEach((q, qi) => q.parts.forEach((p, pi) => {
    i++;
    const wrong = mode === 'mix' && i % 6 === 0;
    if (mode === 'blank') return;
    if (p.type === 'mc' || p.type === 'select') state.answers[akey(qi, pi)] = wrong ? (p.answer + 1) % p.choices.length : p.answer;
    else state.answers[akey(qi, pi)] = wrong ? '7' : p.keyText.replace(/\u2212/g, '-');
  }));
  state.started = Date.now() - 37 * 60000;
  state.submitted = true; state.submittedAt = Date.now(); save();
  renderResults();
  const res = scoreAll();
  document.title = 'SELFTEST ' + res.reduce((a, r) => a + r.got, 0) + '/' + totalPts();
  if (params.get('filter') === 'miss') { filter = 'miss'; renderResults(); }
}

const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
if (local && params.get('selftest')) selfTest(params.get('selftest'));
else if (params.get('start') === '1') startTest(+params.get('seed') || newSeed(), params.get('name') || '', params.get('timer') === '1', params.get('mode'));
else renderStart();
})();
