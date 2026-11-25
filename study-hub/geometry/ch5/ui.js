(function () {
'use strict';
const C = GeoQ.ch5, KEY = 'geo5-state-v1', $ = s => document.querySelector(s), app = $('#app');
const params = new URLSearchParams(location.search);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let st = null, qs = null;
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } };
const newSeed = () => Math.floor(Math.random() * 900000) + 100000;
const SECNAMES = { '5.1': 'Angles of Triangles', '5.2': 'Congruent Polygons', '5.3': 'SAS', '5.4': 'Isosceles', '5.5': 'SSS & HL', '5.6': 'ASA & AAS', '5.7': 'CPCTC proofs', '5.8': 'Coordinate proofs', '6.1': '⊥ & angle bisectors', '6.2': 'Circumcenter & incenter', '6.3': 'Medians & centroid' };
const HINT = { num: 'Enter a number (fractions like 7/2 OK).', approx: 'Exact (like 2√5 or 2sqrt5) or a decimal to the hundredth.', point: 'Enter a point like (−2, 5).' };

function start(seed, sec) { st = { seed, sec: sec || '', ans: {}, done: {} }; qs = C.generate(seed, st.sec || undefined); save(); render(); scrollTo(0, 0); }
function renderStart() {
  $('#bar').classList.add('hidden');
  const sv = load(), resume = sv && sv.seed && Object.keys(sv.done || {}).length < (sv.sec ? 5 : C.QN);
  app.innerHTML = '<div class="card start"><h2>Chapter 5 Test (10 Q / 40 pts)</h2>' +
    '<button id="go" class="btn big primary">Start Chapter 5 Test (10 Q)</button>' + (resume ? '<div style="height:10px"></div><button id="res" class="btn big">Resume quiz in progress</button>' : '') + '</div>' +
    '<div class="card"><h3 style="margin:0 0 8px">Practice by section</h3><div class="secgrid">' + Object.keys(SECNAMES).map(s => '<button class="btn" data-sec="' + s + '">' + s + ' ' + SECNAMES[s] + '</button>').join('') + '</div></div>';
  $('#go').onclick = () => start(newSeed());
  if (resume) $('#res').onclick = () => { st = sv; qs = C.generate(st.seed, st.sec || undefined); render(); };
  app.querySelectorAll('[data-sec]').forEach(b => b.onclick = () => start(newSeed(), b.dataset.sec));
}
const k = (qi, pi) => qi + '-' + pi;
function partHTML(qi, p, pi, done) {
  const key = k(qi, pi), v = st.ans[key];
  let h = '<div class="part">';
  if (p.type === 'select' || p.type === 'mc') {
    if (p.type === 'mc') h += '<div class="plabel">' + p.label + '</div>';
    h += '<div class="choices">' + p.choices.map((c, ci) => { let cl = 'choice' + (v === ci ? ' sel' : ''); if (done) { if (ci === p.answer) cl += ' right'; else if (v === ci) cl += ' wrong'; } return '<button type="button" class="' + cl + '" data-k="' + key + '" data-c="' + ci + '"' + (done ? ' disabled' : '') + '><span class="dotc"></span><span>' + c + '</span></button>'; }).join('') + '</div>';
  } else {
    h += '<div class="plabel">' + p.label + '</div><div class="inrow"><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-k="' + key + '" value="' + esc(v || '') + '" placeholder="' + (p.type === 'point' ? '(x, y)' : 'Number') + '"' + (done ? ' disabled' : '') + '>' + (p.unit ? '<span>' + p.unit + '</span>' : '') + '</div>' + (done ? '' : '<div class="hint">' + (p.approx ? HINT.approx : HINT[p.type]) + '</div>');
  }
  if (done) { const r = C.grade(p, v); h += '<div class="result ' + (r ? 'ok' : 'bad') + '">' + (r ? '✓ Correct' : '✗ Correct answer: <b>' + p.answerHTML + '</b>') + '</div>'; }
  return h + '</div>';
}
function qHTML(q, qi) {
  const done = !!st.done[qi], got = done ? q.parts.filter((p, pi) => C.grade(p, st.ans[k(qi, pi)])).length : 0;
  let h = '<article class="card q' + (done ? (got === 4 ? ' got' : got === 0 ? ' miss' : ' partial') : '') + '" id="q' + qi + '"><div class="qhead"><span class="qnum">' + q.n + '.</span><span class="sec">' + q.section + '</span>' + (done ? '<span class="mark ' + (got === 4 ? 'ok' : got === 0 ? 'bad' : 'part') + '">' + got + '/4</span>' : '') + '<span class="pts">4 pts</span></div><div class="prompt">' + q.prompt + '</div>';
  if (q.svg) h += '<div class="figwrap">' + q.svg + '</div>';
  if (q.proof) {
    h += '<div class="gp"><div><b>Given:</b> ' + q.proof.given + '</div><div><b>Prove:</b> ' + q.proof.prove + '</div></div><table class="proof"><thead><tr><th>Statements</th><th>Reasons</th></tr></thead><tbody>';
    q.proof.table.forEach((r, i) => { h += '<tr><td data-h="Statement"><span class="sn">' + (i + 1) + '.</span> ' + r.s + '</td><td data-h="Reason">' + (typeof r.r === 'object' ? selHTML(qi, q.parts[r.r.part], r.r.part, done) : r.r) + '</td></tr>'; });
    h += '</tbody></table>' + partHTML(qi, q.parts[3], 3, done);
  } else if (q.tid === 'thmPick') q.parts.forEach((p, pi) => { h += '<div class="part"><div class="plabel">' + p.label + '</div>' + selHTML(qi, p, pi, done) + '</div>'; });
  else q.parts.forEach((p, pi) => { h += partHTML(qi, p, pi, done); });
  h += done ? '<div class="solution"><b>Worked solution</b>' + q.explanation + '</div>' : '<button class="btn primary qcheck" data-check="' + qi + '">Check question ' + q.n + '</button>';
  return h + '</article>';
}
function selHTML(qi, p, pi, done) {
  const key = k(qi, pi), v = st.ans[key], r = done && C.grade(p, v);
  let h = '<span class="selwrap' + (done ? (r ? ' ok' : ' bad') : '') + '"><select data-k="' + key + '"' + (done ? ' disabled' : '') + '><option value="">— choose —</option>' + p.choices.map((c, ci) => '<option value="' + ci + '"' + (v === ci ? ' selected' : '') + '>' + esc(c.replace(/<[^>]+>/g, '')) + '</option>').join('') + '</select>';
  if (done) h += r ? '<span class="selmark ok">✓</span>' : '<span class="selmark bad">✗</span><span class="selans">Correct: <b>' + p.choices[p.answer] + '</b></span>';
  return h + '</span>';
}
function render() {
  $('#bar').classList.remove('hidden');
  const nd = Object.keys(st.done).length, NQ = qs.length;
  $('#progress').textContent = (st.sec ? 'Section ' + st.sec + ' practice' : 'Ch 5 Test') + ' · ' + nd + ' / ' + NQ + ' checked';
  let h = qs.map(qHTML).join('');
  if (nd === NQ) {
    let tot = 0; const miss = {};
    qs.forEach((q, qi) => q.parts.forEach((p, pi) => { if (C.grade(p, st.ans[k(qi, pi)])) tot++; else miss[q.section] = (miss[q.section] || 0) + 1; }));
    const ms = Object.keys(miss);
    h += '<div class="card"><h2 style="margin:0 0 6px">Score: ' + tot + ' / ' + (NQ * 4) + ' (' + Math.round(tot * 100 / (NQ * 4)) + '%)</h2>' + (ms.length ? '<b>Review these topics:</b><ul>' + ms.map(s => '<li>' + s + ' — missed ' + miss[s] + ' pt' + (miss[s] > 1 ? 's' : '') + '</li>').join('') + '</ul>' : '<p>Perfect score! 🎉</p>') +
      '<div class="row"><button id="again" class="btn primary">New quiz (new numbers)</button><button id="home" class="btn">Back to start</button></div></div>';
  }
  app.innerHTML = h;
  app.querySelectorAll('input[data-k]').forEach(i => i.oninput = () => { st.ans[i.dataset.k] = i.value; save(); });
  app.querySelectorAll('select[data-k]').forEach(s => s.onchange = () => { st.ans[s.dataset.k] = s.value === '' ? null : +s.value; save(); });
  app.querySelectorAll('button[data-c]').forEach(b => b.onclick = () => { st.ans[b.dataset.k] = +b.dataset.c; save(); b.parentNode.querySelectorAll('.choice').forEach(x => x.classList.toggle('sel', x === b)); });
  app.querySelectorAll('[data-check]').forEach(b => b.onclick = () => { const qi = +b.dataset.check; st.done[qi] = 1; save(); const y = scrollY; render(); scrollTo(0, y); });
  if ($('#again')) { $('#again').onclick = () => start(newSeed(), st.sec); $('#home').onclick = renderStart; }
}
$('#newq').onclick = () => { if (confirm('Start a new set with new numbers?')) start(newSeed(), st && st.sec); };
const sec = params.get('sec');
if (params.get('start') === '1' || sec) start(+params.get('seed') || newSeed(), sec && C.SECTIONS[sec] ? sec : '');
else renderStart();
})();
