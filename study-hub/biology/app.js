/* Living Earth Biology Practice Quiz — UI (Cells & Mitosis · Test Review Guide) */
(function () {
'use strict';
const KEY = 'living-earth-quiz-v3';
const LIMIT_MS = 45 * 60 * 1000;
const $ = s => document.querySelector(s);
const app = $('#app');
let state = null, test = null, tick = null, filter = 'all';

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ } }
function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
function newSeed() { return (Math.floor(Math.random() * 900000) + 100000); }
function total() {
  if (test) return test.length;
  if (state && state.mode === 'full') return BioQ.FULL_SIZE;
  return BioQ.SHORT_SIZE;
}
function gen(seed, mode) { return BioQ.generateTest(seed, mode === 'full' ? 'full' : 'short'); }
function answered() {
  let n = 0;
  for (let i = 0; i < test.length; i++) {
    const v = state.answers[i];
    if (v !== undefined && v !== null) n++;
  }
  return n;
}
const MODE_LABEL = { short: 'Short (25)', full: 'Full' };

/* ---------------------------------------------------------- start */
function renderStart() {
  stopTimer();
  $('#bar').classList.add('hidden');
  const saved = load();
  const resume = saved && !saved.submitted && saved.seed;
  const last = saved && saved.submitted;
  const lastMode = (saved && saved.mode) || 'short';
  const topics = [
    'Osmosis & Tonicity', 'Transport', 'Cell Membrane', 'Endo/Exocytosis',
    'Prokaryotes & Eukaryotes', 'Organelles', 'Microscope',
    'SA:V & Cell Size', 'Mitosis & Cell Cycle', 'Stem Cells & Cancer'
  ];
  app.innerHTML =
    '<section class="card start">' +
    '<div class="topics">' + topics.map(t => '<span>' + esc(t) + '</span>').join('') + '</div>' +
    '<div class="modes" role="radiogroup" aria-label="Quiz mode">' +
    '<label class="mode' + (lastMode !== 'full' ? ' on' : '') + '"><input type="radio" name="mode" value="short"' + (lastMode !== 'full' ? ' checked' : '') + '><span><b>Short (25)</b> — default<br><small>' + BioQ.SHORT_SIZE + ' multiple-choice · based on the short practice test (fill-ins converted to MC)</small></span></label>' +
    '<label class="mode' + (lastMode === 'full' ? ' on' : '') + '"><input type="radio" name="mode" value="full"' + (lastMode === 'full' ? ' checked' : '') + '><span><b>Full</b><br><small>' + BioQ.FULL_SIZE + ' multiple-choice · Part A plus converted Part B/C items from the full practice test</small></span></label>' +
    '</div>' +
    '<label class="field" for="nm">Your name (optional)</label>' +
    '<input id="nm" type="text" autocomplete="given-name" placeholder="e.g. Alex" value="' + esc((saved && saved.name) || '') + '">' +
    '<label class="check"><input id="tm" type="checkbox"' + (saved && saved.timer ? ' checked' : '') + '> Use a 45-minute timer</label>' +
    '<button id="go" class="btn primary big">Start a new test</button>' +
    (resume ? '<div style="height:10px"></div><button id="resume" class="btn big">Resume ' + (saved.mode === 'full' ? 'Full ' : 'Short ') + 'test in progress</button>' : '') +
    (last ? '<div style="height:10px"></div><button id="lastres" class="btn big">See last results (' + (saved.score != null ? saved.score + '/' + (saved.mode === 'full' ? BioQ.FULL_SIZE : BioQ.SHORT_SIZE) : 'submitted') + (saved.mode === 'full' ? ', Full' : ', Short') + ')</button>' : '') +
    '</section>';
  const params = new URLSearchParams(location.search);
  app.querySelectorAll('input[name=mode]').forEach(r => r.addEventListener('change', () => {
    app.querySelectorAll('.mode').forEach(l => l.classList.toggle('on', l.querySelector('input').checked));
  }));
  const mode = () => (app.querySelector('input[name=mode]:checked') || {}).value || 'short';
  $('#go').onclick = () => startTest(+params.get('seed') || newSeed(), $('#nm').value.trim(), $('#tm').checked, mode());
  if (resume) $('#resume').onclick = () => { state = saved; test = gen(state.seed, state.mode); renderTest(); };
  if (last) $('#lastres').onclick = () => { state = saved; test = gen(state.seed, state.mode); renderResults(); };
}

function startTest(seed, name, timer, mode) {
  mode = mode === 'full' ? 'full' : 'short';
  state = {
    seed: seed,
    mode: mode,
    name: name || '',
    timer: !!timer,
    started: Date.now(),
    deadline: timer ? Date.now() + LIMIT_MS : null,
    answers: {},
    submitted: false,
    score: null
  };
  test = gen(seed, mode);
  save();
  filter = 'all';
  renderTest();
  window.scrollTo(0, 0);
}

/* ----------------------------------------------------------- test */
function questionHTML(q, qi, done) {
  const val = state.answers[qi];
  const correct = done && val === q.answer;
  const missed = done && val !== q.answer;
  let cls = 'card q';
  if (done) cls += correct ? ' got' : ' miss';
  let mark = '';
  if (done) mark = '<span class="mark ' + (correct ? 'ok' : 'bad') + '">' + (correct ? '✓' : '✗') + '</span>';
  let h = '<article class="' + cls + '" id="q' + qi + '">' +
    '<div class="qhead"><span class="qnum">' + q.n + '.</span><span class="sec">' + esc(q.topic) + '</span>' + mark + '</div>' +
    '<div class="prompt">' + esc(q.prompt) + '</div>' +
    '<div class="choices" role="radiogroup" aria-label="Question ' + q.n + '">';
  q.choices.forEach((c, ci) => {
    let ccls = 'choice' + (val === ci ? ' sel' : '');
    if (done) {
      if (ci === q.answer) ccls += ' right';
      else if (val === ci) ccls += ' wrong';
    }
    h += '<button type="button" role="radio" aria-checked="' + (val === ci) + '" class="' + ccls + '" data-qi="' + qi + '" data-c="' + ci + '"' + (done ? ' disabled' : '') + '>' +
      '<span class="dotc"></span><span>' + esc(c) + '</span></button>';
  });
  h += '</div>';
  if (done) {
    if (correct) {
      h += '<div class="result ok">✓ Correct</div>';
    } else {
      h += '<div class="result bad">✗ ' + (val === undefined || val === null ? 'No answer' : 'Not quite') +
        ' — correct answer: <b>' + esc(q.choices[q.answer]) + '</b></div>';
      h += '<div class="expl"><b>Why:</b> ' + esc(q.explain) + '</div>';
    }
  }
  return h + '</article>';
}

function renderTest() {
  $('#bar').classList.remove('hidden');
  $('#barSubmit').classList.remove('hidden');
  const T = total();
  let h = '<div class="card"><b>' + (state.name ? esc(state.name) + '\u2019s ' : '') + 'Living Earth Practice Quiz</b> ' +
    '<span class="hint">(' + MODE_LABEL[state.mode || 'short'] + ' · version #' + state.seed + ')</span><br>' +
    '<span class="hint">Answer every question, then tap Submit. Progress is saved on this device if the page reloads.</span></div>';
  test.forEach((q, qi) => { h += questionHTML(q, qi, false); });
  h += '<button id="submit" class="btn primary big">Submit quiz</button>';
  h += '<div style="height:10px"></div><button id="quit" class="btn big">Back to start</button>';
  app.innerHTML = h;
  app.querySelectorAll('button.choice').forEach(b => b.addEventListener('click', () => {
    const qi = +b.dataset.qi, c = +b.dataset.c;
    state.answers[qi] = c;
    save();
    updateProgress();
    b.parentNode.querySelectorAll('.choice').forEach(x => {
      const on = x === b;
      x.classList.toggle('sel', on);
      x.setAttribute('aria-checked', on);
    });
  }));
  $('#submit').onclick = () => trySubmit(false);
  $('#barSubmit').onclick = () => trySubmit(false);
  $('#quit').onclick = () => {
    if (confirm('Leave this quiz? Your answers stay saved, and you can resume from the start screen.')) renderStart();
  };
  updateProgress();
  startTimer();
}

function updateProgress() {
  const n = answered();
  const T = total();
  $('#progress').textContent = n + ' / ' + T + ' answered';
  const fill = $('#pfill');
  if (fill) fill.style.width = Math.round(100 * n / T) + '%';
}

/* ---------------------------------------------------------- timer */
function stopTimer() {
  if (tick) clearInterval(tick);
  tick = null;
  $('#timer').classList.add('hidden');
}
function startTimer() {
  stopTimer();
  if (!state.deadline) return;
  const el = $('#timer');
  el.classList.remove('hidden');
  const upd = () => {
    const left = state.deadline - Date.now();
    if (left <= 0) { el.textContent = '0:00'; stopTimer(); trySubmit(true); return; }
    const m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60;
    el.textContent = m + ':' + String(s).padStart(2, '0');
    el.classList.toggle('low', left < 5 * 60000);
  };
  upd();
  tick = setInterval(upd, 1000);
}

/* --------------------------------------------------------- submit */
function trySubmit(timeUp) {
  if (state.submitted) return;
  const T = total();
  const left = T - answered();
  if (!timeUp && left > 0 && !confirm(left + ' answer' + (left > 1 ? 's are' : ' is') + ' still blank. Submit anyway?')) return;
  let got = 0;
  test.forEach((q, qi) => { if (state.answers[qi] === q.answer) got++; });
  state.submitted = true;
  state.submittedAt = Date.now();
  state.timeUp = !!timeUp;
  state.score = got;
  save();
  stopTimer();
  if (timeUp) alert('Time\u2019s up! Your quiz has been submitted.');
  filter = 'all';
  renderResults();
  window.scrollTo(0, 0);
}

function renderResults() {
  stopTimer();
  $('#bar').classList.add('hidden');
  const T = total();
  const got = state.score != null ? state.score : test.reduce((a, q, qi) => a + (state.answers[qi] === q.answer ? 1 : 0), 0);
  const pct = Math.round(100 * got / T);
  const missed = test.filter((q, qi) => state.answers[qi] !== q.answer).length;
  const msg = pct >= 90 ? 'Excellent — you\u2019re ready! 🎉' :
    pct >= 80 ? 'Great job! Review the few you missed.' :
    pct >= 70 ? 'Good work. Go over the mistakes, then try a new quiz.' :
    'Keep going — review the explanations, then take a new quiz.';
  const mins = state.submittedAt && state.started ? Math.round((state.submittedAt - state.started) / 60000) : null;
  const byTopic = {};
  test.forEach((q, qi) => {
    const t = q.topic;
    byTopic[t] = byTopic[t] || [0, 0];
    byTopic[t][1]++;
    if (state.answers[qi] === q.answer) byTopic[t][0]++;
  });
  let h = '<section class="card score">' + (state.name ? '<div><b>' + esc(state.name) + '</b></div>' : '') +
    '<div class="big">' + got + ' / ' + T + '</div><div class="pct">' + pct + '%</div>' +
    '<div class="msg">' + msg + (mins !== null ? '<br>Time used: ' + mins + ' min' + (state.timeUp ? ' (time ran out)' : '') : '') +
    ' · ' + MODE_LABEL[state.mode || 'short'] + ' · version #' + state.seed + '</div>' +
    '<div class="secs">' + Object.keys(byTopic).sort().map(t => {
      const v = byTopic[t];
      return '<span class="' + (v[0] === v[1] ? 'full' : v[0] === 0 ? 'none' : 'some') + '">' + esc(t) + ': ' + v[0] + '/' + v[1] + '</span>';
    }).join('') + '</div>' +
    '<div class="row"><button id="newt" class="btn primary">New quiz</button><button id="retake" class="btn">Retake this version</button></div></section>';
  h += '<div class="filter"><button class="btn small' + (filter === 'all' ? ' on' : '') + '" data-f="all">Show all (' + T + ')</button>' +
    '<button class="btn small' + (filter === 'miss' ? ' on' : '') + '" data-f="miss">Review mistakes (' + missed + ')</button></div>';
  let shown = 0;
  test.forEach((q, qi) => {
    if (filter === 'miss' && state.answers[qi] === q.answer) return;
    shown++;
    h += questionHTML(q, qi, true);
  });
  if (!shown) h += '<div class="card">No mistakes to review — perfect score! 🎉</div>';
  h += '<div class="row" style="margin-top:6px"><button id="newt2" class="btn primary">New quiz</button><button id="home" class="btn">Start screen</button></div>';
  app.innerHTML = h;
  const nt = () => startTest(newSeed(), state.name, state.timer, state.mode);
  $('#newt').onclick = nt;
  $('#newt2').onclick = nt;
  $('#retake').onclick = () => startTest(state.seed, state.name, state.timer, state.mode);
  $('#home').onclick = renderStart;
  app.querySelectorAll('.filter .btn').forEach(b => {
    b.onclick = () => { filter = b.dataset.f; renderResults(); };
  });
}

/* ---------------------------------------------------- local self-test */
function selfTest(mode) {
  const quizMode = new URLSearchParams(location.search).get('mode') || 'short';
  startTest(+new URLSearchParams(location.search).get('seed') || 424242, 'Student', false, quizMode);
  const T = total();
  test.forEach((q, qi) => {
    const wrong = mode === 'mix' && (qi + 1) % 6 === 0;
    if (mode === 'blank') return;
    state.answers[qi] = wrong ? (q.answer + 1) % 4 : q.answer;
  });
  state.started = Date.now() - 28 * 60000;
  let got = 0;
  test.forEach((q, qi) => { if (state.answers[qi] === q.answer) got++; });
  state.submitted = true;
  state.submittedAt = Date.now();
  state.score = got;
  save();
  renderResults();
  document.title = 'SELFTEST ' + got + '/' + T;
  if (new URLSearchParams(location.search).get('filter') === 'miss') { filter = 'miss'; renderResults(); }
}

const params = new URLSearchParams(location.search);
const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
if (local && params.get('selftest')) selfTest(params.get('selftest'));
else if (params.get('start') === '1') startTest(+params.get('seed') || newSeed(), params.get('name') || '', params.get('timer') === '1', params.get('mode'));
else renderStart();
})();
