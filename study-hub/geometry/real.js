/* Geometry Ch 3–4 — REAL TEST mode (10 questions × 4 pts = 40 pts).
   Mirrors an Accelerated Geo/A2T Chapter 3–4 Test question by question, with fresh numbers every time.
   Depends on questions.js + hard.js. No dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./hard.js'));
  else factory(root.GeoQ);
})(typeof self !== 'undefined' ? self : this, function (G) {
'use strict';
const L = G.lib;
const { makeRng, gcd, Fr, fadd, fsub, fmul, fdiv, fnum, MINUS, PRIME, DPRIME, sn, fracHTML, fracText, pt, vec, lineEq, gridSVG, transversalSVG, simplifyRadical, keyText, answerHTML } = L;
const DEG = '\u00B0', ANG = '\u2220', TRI = '\u25B3';
const P1 = PRIME, P2 = DPRIME;
const F = (n, d) => Fr(n, d === undefined ? 1 : d);
const fz = f => f.n === 0;
const fneg = f => Fr(-f.n, f.d);
const fT = f => fracText(f), fH = f => fracHTML(f);
const fptT = p => '(' + fT(p[0]) + ', ' + fT(p[1]) + ')';
const fptH = p => '(' + fH(p[0]) + ', ' + fH(p[1]) + ')';
const fvecT = p => '\u27E8' + fT(p[0]) + ', ' + fT(p[1]) + '\u27E9';
const num2 = p => [fnum(p[0]), fnum(p[1])];
const FP = p => [F(p[0]), F(p[1])];
const ii = s => '<i>' + s + '</i>';
const ol = s => '<span style="text-decoration:overline">' + s + '</span>';
const steps = arr => '<ol class="steps">' + arr.map(s => '<li>' + s + '</li>').join('') + '</ol>';
const inBox = (pts, r) => pts.every(p => Math.abs(p[0]) <= r && Math.abs(p[1]) <= r);
// "3x + 1", "8y − 1", "3z", "−x + 4"
function expr(c, v, k) {
  const core = (c === 1 ? '' : c === -1 ? MINUS : String(c).replace('-', MINUS)) + v;
  return k === 0 ? core : core + (k < 0 ? ' ' + MINUS + ' ' + (-k) : ' + ' + k);
}
function radKey(sq) { // exact text for sqrt(sq) and its HTML
  const [k, r] = simplifyRadical(sq);
  return r === 1 ? String(k) : (k === 1 ? '' : k) + '\u221A' + r;
}
function radFracKey(N, s) { // N / sqrt(s), N>0 integer -> exact simplified text like "7√5/5"
  const [k, r] = simplifyRadical(s);
  if (r === 1) return fT(F(N, k));
  const c = F(N, k * r); // N/(k√r) = N√r/(k r)
  return (c.n === 1 ? '' : c.n) + '\u221A' + r + (c.d === 1 ? '' : '/' + c.d);
}
const mcFrom = (rng, correct, wrongs) => { const o = rng.shuffle([correct].concat(wrongs)); return { choices: o, answer: o.indexOf(correct) }; };
// rigid motions about the origin (exact on [Fr,Fr])
const MOT = {
  rx: { t: 'a reflection in the <i>x</i>-axis', r: 'x,-y', f: p => [p[0], fneg(p[1])] },
  ry: { t: 'a reflection in the <i>y</i>-axis', r: '-x,y', f: p => [fneg(p[0]), p[1]] },
  ryx: { t: 'a reflection in the line <i>y</i> = <i>x</i>', r: 'y,x', f: p => [p[1], p[0]] },
  rynx: { t: 'a reflection in the line <i>y</i> = ' + MINUS + '<i>x</i>', r: '-y,-x', f: p => [fneg(p[1]), fneg(p[0])] },
  r90: { t: 'a rotation of 90' + DEG + ' counterclockwise about the origin', r: '-y,x', f: p => [fneg(p[1]), p[0]] },
  r180: { t: 'a rotation of 180' + DEG + ' about the origin', r: '-x,-y', f: p => [fneg(p[0]), fneg(p[1])] },
  r270: { t: 'a rotation of 270' + DEG + ' counterclockwise about the origin', r: 'y,-x', f: p => [p[1], fneg(p[0])] }
};
const ruleOf = f => { const a = f([F(2), F(3)]); return a.map(fnum).join(','); };
function motKey(f) { const s = ruleOf(f); return Object.keys(MOT).filter(k => ruleOf(MOT[k].f) === s)[0]; }
const ruleHTML = r => '(' + ii('x') + ', ' + ii('y') + ') \u2192 (' + r.split(',').map(s => s.replace('-', MINUS).replace(/([xy])/, '<i>$1</i>')).join(', ') + ')';
const T = [];

/* 1 ─ reflection: find line c (perpendicular bisector), then use it */
T.push({ id: 'perpBisector', section: '4.2 Reflections', gen(rng) {
  for (;;) {
    const M = [rng.int(-5, 5), rng.int(-5, 5)], h = [rng.intNZ(-3, 3), rng.intNZ(-3, 3)];
    if (Math.abs(h[0]) === Math.abs(h[1]) && rng.chance(0.7)) continue;
    const B = [M[0] - h[0], M[1] - h[1]], Bp = [M[0] + h[0], M[1] + h[1]];
    const m = F(-h[0], h[1]), b = fsub(F(M[1]), fmul(m, F(M[0])));
    const g = gcd(h[0], h[1]), u = [-h[1] / g, h[0] / g], w = [h[0] / g, h[1] / g];
    const j = rng.intNZ(-2, 2), s = rng.pick([-2, -1, 1, 2]);
    const P = [M[0] + j * u[0] + s * w[0], M[1] + j * u[1] + s * w[1]], Pp = [M[0] + j * u[0] - s * w[0], M[1] + j * u[1] - s * w[1]];
    if (!inBox([B, Bp, P, Pp], 10) || (P[0] === B[0] && P[1] === B[1]) || (P[0] === Bp[0] && P[1] === Bp[1])) continue;
    const sBB = F(h[1], h[0]);
    return {
      prompt: ii('B') + P1 + pt(Bp) + ' is the image of ' + ii('B') + pt(B) + ' after a reflection in line ' + ii('c') + '.<br>(a) Find the point of ' + ol('BB' + P1) + ' that must lie on line ' + ii('c') + '. (b) Find the slope of line ' + ii('c') + '. (c) Write an equation for line ' + ii('c') + '. (d) Find the image of ' + ii('P') + pt(P) + ' after a reflection in line ' + ii('c') + '.',
      parts: [
        { label: '(a) point on <i>c</i>', type: 'point', answer: M },
        { label: '(b) slope of <i>c</i>', type: 'num', answer: fnum(m), key: fT(m) },
        { label: '(c) line <i>c</i>', type: 'line', answer: { m: m, b: b } },
        { label: '(d) <i>P</i>' + P1, type: 'point', answer: Pp }],
      explanation: steps([
        'In a reflection, the line of reflection is the <b>perpendicular bisector</b> of ' + ol('BB' + P1) + '. So line ' + ii('c') + ' passes through the midpoint: (' + fH(F(B[0] + Bp[0], 2)) + ', ' + fH(F(B[1] + Bp[1], 2)) + ') = <b>' + pt(M) + '</b>.',
        'Slope of ' + ol('BB' + P1) + ' = (' + sn(Bp[1]) + ' ' + MINUS + ' ' + (B[1] < 0 ? '(' + sn(B[1]) + ')' : B[1]) + ') / (' + sn(Bp[0]) + ' ' + MINUS + ' ' + (B[0] < 0 ? '(' + sn(B[0]) + ')' : B[0]) + ') = ' + fH(sBB) + '. Line ' + ii('c') + ' is perpendicular, so its slope is the negative reciprocal: <b>' + fH(m) + '</b>.',
        'Point-slope through ' + pt(M) + ': ' + ii('y') + ' ' + MINUS + ' ' + sn(M[1]) + ' = ' + fH(m) + '(' + ii('x') + ' ' + MINUS + ' ' + sn(M[0]) + ') \u2192 <b>' + lineEq(m, b, true) + '</b>.',
        ii('PP') + P1 + ' must also be perpendicular to ' + ii('c') + ' (slope ' + fH(sBB) + ') with its midpoint on ' + ii('c') + '. Moving from ' + ii('P') + pt(P) + ' to line ' + ii('c') + ' along slope ' + fH(sBB) + ' takes ' + Math.abs(s) + ' step' + (Math.abs(s) > 1 ? 's' : '') + ' of \u27E8' + sn(-Math.sign(s) * w[0]) + ', ' + sn(-Math.sign(s) * w[1]) + '\u27E9, reaching ' + pt([M[0] + j * u[0], M[1] + j * u[1]]) + ' on ' + ii('c') + '. Go the same distance again: <b>' + ii('P') + P1 + pt(Pp) + '</b>. (Check: the midpoint of ' + ol('PP' + P1) + ' satisfies ' + lineEq(m, b, true) + '.)'
      ]),
      params: { B, Bp, P, Pp, m, b, M }
    };
  }
} });

/* 2 ─ similarity transformation from a graph (dilation + reflection; negative-k trap) */
T.push({ id: 'simGraph', section: '4.6 Similarity', gen(rng) {
  for (;;) {
    const k = rng.pick([F(1, 2), F(1, 3), F(2), F(3), F(1, 3), F(1, 2)]);
    const mk = rng.pick(['rx', 'ry', 'ryx']);
    const step = k.d, lim = k.d === 1 ? Math.floor(10 / k.n) : 10;
    const coord = () => step * rng.intNZ(-Math.floor(lim / step), Math.floor(lim / step));
    const W = [[coord(), coord()], [coord(), coord()], [coord(), coord()]];
    const area = (W[1][0] - W[0][0]) * (W[2][1] - W[0][1]) - (W[2][0] - W[0][0]) * (W[1][1] - W[0][1]);
    if (Math.abs(area) < 6 * step * step) continue;
    const dil = p => [fmul(k, F(p[0])), fmul(k, F(p[1]))];
    const A = W.map(p => num2(MOT[mk].f(dil(p))));
    if (!inBox(W, 10) || !inBox(A, 10)) continue;
    // the image must not overlap a vertex of the pre-image
    if (A.some(a => W.some(p => p[0] === a[0] && p[1] === a[1]))) continue;
    // no other listed motion may also work
    const others = Object.keys(MOT).filter(x => x !== mk && W.every((p, i) => { const q = num2(MOT[x].f(dil(p))); return q[0] === A[i][0] && q[1] === A[i][1]; }));
    if (others.length) continue;
    const Qp = [coord(), coord()]; const Qi = num2(MOT[mk].f(dil(Qp)));
    if (W.some(p => p[0] === Qp[0] && p[1] === Qp[1])) continue;
    const negk = fneg(k);
    const W0neg = [fmul(negk, F(W[0][0])), fmul(negk, F(W[0][1]))];
    const kT = fT(k);
    const mcB = mcFrom(rng, cap(MOT[mk].t), ['rx', 'ry', 'ryx', 'r180', 'r90'].filter(x => x !== mk).slice(0, 4).map(x => cap(MOT[x].t)));
    const trapC = 'No \u2014 a dilation with k = ' + fT(negk) + ' is the same as k = ' + kT + ' followed by a 180' + DEG + ' rotation, so W' + pt(W[0]) + ' would go to ' + fptT(W0neg) + ', not A' + pt(A[0]) + '.';
    const mcC = mcFrom(rng, trapC, [
      'Yes \u2014 a negative scale factor flips the figure, which is the same as ' + MOT[mk].t.replace(/<[^>]+>/g, '') + '.',
      'Yes \u2014 the sign of k does not matter; only |k| = ' + kT + ' affects the image.',
      'No \u2014 a dilation can never be part of a similarity transformation that includes a reflection.']);
    return {
      prompt: 'Describe the similarity transformation that maps ' + TRI + 'WXY to ' + TRI + 'ABC (W\u2192A, X\u2192B, Y\u2192C). Use a dilation centered at the origin followed by a rigid motion.<br><small>W' + pt(W[0]) + ', X' + pt(W[1]) + ', Y' + pt(W[2]) + ' and A' + pt(A[0]) + ', B' + pt(A[1]) + ', C' + pt(A[2]) + '</small><br>(a) Scale factor <i>k</i> (k &gt; 0). (b) The rigid motion that follows the dilation. (c) A classmate says the whole mapping is just a dilation with scale factor ' + fT(negk) + '. Is that correct? (d) Using the same similarity transformation, find the image of Q' + pt(Qp) + '.',
      svg: gridSVG({ polys: [{ pts: W, names: ['W', 'X', 'Y'] }, { pts: A, names: ['A', 'B', 'C'], cls: 'img' }] }),
      parts: [
        { label: '(a) <i>k</i>', type: 'num', answer: fnum(k), key: kT },
        { label: '(b) rigid motion', type: 'mc', choices: mcB.choices, answer: mcB.answer },
        { label: '(c) negative k?', type: 'mc', choices: mcC.choices, answer: mcC.answer },
        { label: '(d) Q' + P2, type: 'point', answer: Qi }],
      explanation: steps([
        'Compare side lengths: every side of ' + TRI + 'ABC is ' + kT + ' times as long as the matching side of ' + TRI + 'WXY, so <b>k = ' + fH(k) + '</b>. Dilate W first: W' + pt(W[0]) + ' \u2192 ' + fptH(dil(W[0])) + '.',
        'Now ' + fptH(dil(W[0])) + ' must land on A' + pt(A[0]) + '. That is <b>' + MOT[mk].t + '</b>, rule ' + ruleHTML(MOT[mk].r) + '. Check X: ' + pt(W[1]) + ' \u2192 ' + fptH(dil(W[1])) + ' \u2192 ' + pt(A[1]) + ' = B \u2713, and Y \u2192 ' + pt(A[2]) + ' = C \u2713.',
        '<b>Trap:</b> a dilation with a negative scale factor multiplies <i>both</i> coordinates by a negative number, which is a 180' + DEG + ' rotation, not a reflection. With k = ' + fT(negk) + ', W would go to ' + fptH(W0neg) + ' \u2260 A' + pt(A[0]) + '. So the classmate is wrong.',
        'Q' + pt(Qp) + ' \u2192 dilate: ' + fptH(dil(Qp)) + ' \u2192 ' + MOT[mk].t.replace(/^a /, '') + ': <b>' + pt(Qi) + '</b>.'
      ]),
      params: { W, A, k, mk, Qp, Qi }
    };
  }
} });
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/* 3 ─ translation vector with four unknowns */
T.push({ id: 'vectorUnknowns', section: '4.1 Translations', gen(rng) {
  for (;;) {
    const v = [rng.intNZ(-6, 6), rng.intNZ(-6, 6)];
    const givenPQ = rng.chance(0.4);
    const P = [rng.int(-6, 6), rng.int(-6, 6)], Q = [P[0] + v[0], P[1] + v[1]];
    if (givenPQ && !inBox([P, Q], 9)) continue;
    const ia = rng.int(0, 1), ib = rng.int(0, 1);       // which coordinate of A holds w; which coordinate of B holds the y-expression
    const Aknown = rng.int(-8, 8), w = rng.int(-7, 7);
    const A = [0, 0]; A[ia] = w; A[1 - ia] = Aknown;
    const Ap = [A[0] + v[0], A[1] + v[1]];
    const cx = rng.int(2, 5), c0 = rng.int(-6, 6), x = F(Ap[1 - ia] - c0, cx);
    const Bknown = rng.int(-8, 8), cy = rng.int(2, 8), c1 = rng.int(-6, 6), Bunk = rng.int(-8, 8);
    const B = [0, 0]; B[ib] = Bunk; B[1 - ib] = Bknown;
    const Bp = [B[0] + v[0], B[1] + v[1]];
    const y = F(B[ib] - c1, cy);
    const cz = rng.int(2, 5), z = F(Bp[1 - ib], cz);
    const ans = [F(w), x, y, z];
    if (ans.filter(a => a.d > 1).length < 2 || fz(z) || fz(x)) continue;
    if (Math.abs(Ap[ia]) > 14 || Math.abs(Bp[ib]) > 14) continue;
    const Atxt = ia === 0 ? 'A(<i>w</i>, ' + sn(A[1]) + ')' : 'A(' + sn(A[0]) + ', <i>w</i>)';
    const Axe = expr(cx, '<i>x</i>', c0), Bye = expr(cy, '<i>y</i>', c1), Bze = expr(cz, '<i>z</i>', 0);
    const Aptxt = ia === 0 ? 'A' + P1 + '(' + sn(Ap[0]) + ', ' + Axe + ')' : 'A' + P1 + '(' + Axe + ', ' + sn(Ap[1]) + ')';
    const Btxt = ib === 0 ? 'B(' + Bye + ', ' + sn(B[1]) + ')' : 'B(' + sn(B[0]) + ', ' + Bye + ')';
    const Bptxt = ib === 0 ? 'B' + P1 + '(' + sn(Bp[0]) + ', ' + Bze + ')' : 'B' + P1 + '(' + Bze + ', ' + sn(Bp[1]) + ')';
    const vtxt = givenPQ ? 'The vector ' + ol('PQ') + ' with P' + pt(P) + ' and Q' + pt(Q) : 'The vector ' + ol('PQ') + ' = ' + vec(v);
    const C = ['x', 'y'];
    return {
      prompt: vtxt + ' describes the translation of ' + Atxt + ' onto ' + Aptxt + ' and ' + Btxt + ' onto ' + Bptxt + '. Find the values of <i>w</i>, <i>x</i>, <i>y</i>, and <i>z</i>.',
      parts: ['w', 'x', 'y', 'z'].map((n, i) => ({ label: '<i>' + n + '</i> =', type: 'num', answer: fnum(ans[i]), key: fT(ans[i]) })),
      explanation: steps([
        (givenPQ ? ol('PQ') + ' = \u27E8' + sn(Q[0]) + ' ' + MINUS + ' ' + (P[0] < 0 ? '(' + sn(P[0]) + ')' : P[0]) + ', ' + sn(Q[1]) + ' ' + MINUS + ' ' + (P[1] < 0 ? '(' + sn(P[1]) + ')' : P[1]) + '\u27E9 = ' + vec(v) + '. ' : '') + 'A translation by ' + vec(v) + ' adds ' + sn(v[0]) + ' to every <i>x</i>-coordinate and ' + sn(v[1]) + ' to every <i>y</i>-coordinate: (pre-image) + vector = (image). Do not reverse it!',
        C[ia] + ': <i>w</i> + (' + sn(v[ia]) + ') = ' + sn(Ap[ia]) + ' \u2192 <b><i>w</i> = ' + sn(w) + '</b>.',
        C[1 - ia] + ': ' + sn(A[1 - ia]) + ' + (' + sn(v[1 - ia]) + ') = ' + Axe + ' \u2192 ' + sn(Ap[1 - ia]) + ' = ' + Axe + ' \u2192 ' + cx + '<i>x</i> = ' + sn(Ap[1 - ia] - c0) + ' \u2192 <b><i>x</i> = ' + fH(x) + '</b>.',
        C[ib] + ': (' + Bye + ') + (' + sn(v[ib]) + ') = ' + sn(Bp[ib]) + ' \u2192 ' + cy + '<i>y</i> = ' + sn(Bp[ib] - v[ib] - c1) + ' \u2192 <b><i>y</i> = ' + fH(y) + '</b>.',
        C[1 - ib] + ': ' + sn(B[1 - ib]) + ' + (' + sn(v[1 - ib]) + ') = ' + Bze + ' \u2192 ' + sn(Bp[1 - ib]) + ' = ' + Bze + ' \u2192 <b><i>z</i> = ' + fH(z) + '</b>.'
      ]),
      params: { v, A, Ap, B, Bp, ia, ib, cx, c0, cy, c1, cz, ans, P, Q, givenPQ }
    };
  }
} });

/* 4 ─ perpendicular / parallel lines, foot of perpendicular, distance */
T.push({ id: 'perpLineDist', section: '3.5 Equations & distance', gen(rng) {
  for (;;) {
    const p = rng.int(1, 9), q = rng.int(1, 9);
    if (gcd(p, q) !== 1 || p === q || p * p + q * q > 100) continue;
    const sg = rng.pick([1, -1]); const a = sg * p;      // line: a x + q y = c  -> slope -a/q
    const b0 = rng.int(-9, 9), c = q * b0;
    const X0 = [rng.int(-8, 8), rng.int(-8, 8)];
    const N = a * X0[0] + q * X0[1] - c;
    if (N === 0) continue;
    const s = a * a + q * q;
    const m = F(-a, q), mp = F(q, a);
    const bp = fsub(F(X0[1]), fmul(mp, F(X0[0]))), bpar = fsub(F(X0[1]), fmul(m, F(X0[0])));
    const foot = [fsub(F(X0[0]), F(a * N, s)), fsub(F(X0[1]), F(q * N, s))];
    if (foot[0].d > 20 || foot[1].d > 20) continue;
    const std = rng.chance(0.5);
    const lineTxt = std ? (a === 1 ? '' : a === -1 ? MINUS : sn(a)) + '<i>x</i> + ' + (q === 1 ? '' : q) + '<i>y</i> = ' + sn(c) : lineEq(m, F(b0), true);
    const dist = Math.abs(N) / Math.sqrt(s), dkey = radFracKey(Math.abs(N), s);
    return {
      prompt: 'Line ' + ii('k') + ': ' + lineTxt + '. Point ' + ii('R') + pt(X0) + '.<br>(a) Write an equation of the line passing through ' + ii('R') + ' that is <b>perpendicular</b> to ' + ii('k') + '. (b) Write an equation of the line through ' + ii('R') + ' that is <b>parallel</b> to ' + ii('k') + '. (c) Find the point where the perpendicular line from (a) intersects ' + ii('k') + '. (d) Find the distance from ' + ii('R') + ' to line ' + ii('k') + ' (exact, or a decimal to the hundredth).',
      parts: [
        { label: '(a) perpendicular', type: 'line', answer: { m: mp, b: bp } },
        { label: '(b) parallel', type: 'line', answer: { m: m, b: bpar } },
        { label: '(c) intersection', type: 'point', answer: num2(foot), key: fptT(foot) },
        { label: '(d) distance', type: 'num', approx: true, answer: dist, key: dkey }],
      explanation: steps([
        (std ? 'Solve for <i>y</i>: ' + (q === 1 ? '' : q) + '<i>y</i> = ' + sn(-a) + '<i>x</i> + ' + sn(c) + ' \u2192 ' + lineEq(m, F(b0), true) + '. ' : '') + 'Slope of ' + ii('k') + ' = ' + fH(m) + '. Perpendicular slope = negative reciprocal = ' + fH(mp) + '. Through ' + pt(X0) + ': ' + sn(X0[1]) + ' = ' + fH(mp) + '(' + sn(X0[0]) + ') + <i>b</i> \u2192 <i>b</i> = ' + fH(bp) + ', so <b>' + lineEq(mp, bp, true) + '</b>.',
        'Parallel keeps the same slope ' + fH(m) + ': ' + sn(X0[1]) + ' = ' + fH(m) + '(' + sn(X0[0]) + ') + <i>b</i> \u2192 <b>' + lineEq(m, bpar, true) + '</b>.',
        'Set the two equations equal: ' + fH(mp) + '<i>x</i> + ' + fH(bp) + ' = ' + fH(m) + '<i>x</i> + ' + fH(F(b0)) + '. Solving gives <i>x</i> = ' + fH(foot[0]) + ', then <i>y</i> = ' + fH(foot[1]) + '. Intersection <b>' + fptH(foot) + '</b>.',
        'Distance from a point to a line = distance from ' + ii('R') + ' to that intersection point: \u221A[(' + fH(fsub(F(X0[0]), foot[0])) + ')\u00B2 + (' + fH(fsub(F(X0[1]), foot[1])) + ')\u00B2] = <b>' + dkey + ' \u2248 ' + dist.toFixed(2) + '</b>.'
      ]),
      params: { a, q, c, X0, m, mp, bp, bpar, foot, dist, std, b0 }
    };
  }
} });

/* 5 ─ two reflections over intersecting lines = rotation (direction + order traps) */
const LANG = { x: 0, yx: 45, y: 90, ynx: 135 };
const LNAME = { x: 'the <i>x</i>-axis', yx: 'the line <i>y</i> = <i>x</i>', y: 'the <i>y</i>-axis', ynx: 'the line <i>y</i> = ' + MINUS + '<i>x</i>' };
const ROTF = { 90: MOT.r90.f, 180: MOT.r180.f, 270: MOT.r270.f };
const rotName = a => a === 180 ? 'Rotation of 180' + DEG + ' about the origin' : 'Rotation of ' + a + DEG + ' counterclockwise about the origin';
T.push({ id: 'twoReflRot', section: '4.3 Rotations', gen(rng) {
  for (;;) {
    const abstract = rng.chance(0.5);
    let rot, prompt0, whyA;
    if (abstract) {
      const th = rng.pick([45, 45, 90, 135]), ccw = rng.chance(0.6);
      rot = ccw ? 2 * th % 360 : (360 - 2 * th) % 360;
      if (rot === 0) continue;
      prompt0 = 'A point is reflected twice, in a <b>' + (ccw ? 'counterclockwise' : 'clockwise') + '</b> direction, over two lines that intersect at the origin and have an angle of ' + th + DEG + ' between them (measured ' + (ccw ? 'counterclockwise' : 'clockwise') + ' from the first line to the second).';
      whyA = 'Reflecting in two intersecting lines = a rotation about their intersection by <b>twice</b> the angle between them, in the direction from the first line to the second: 2 \u00D7 ' + th + DEG + ' = ' + (2 * th) + DEG + ' ' + (ccw ? 'counterclockwise' : 'clockwise') + (ccw ? '' : ' = ' + rot + DEG + ' counterclockwise') + '.';
    } else {
      const ks = rng.shuffle(Object.keys(LANG)), l1 = ks[0], l2 = ks[1];
      const d = LANG[l2] - LANG[l1];
      rot = ((2 * d) % 360 + 360) % 360;
      prompt0 = 'A point is reflected in ' + LNAME[l1] + ', and then its image is reflected in ' + LNAME[l2] + '.';
      whyA = 'Going from ' + LNAME[l1] + ' (' + LANG[l1] + DEG + ') to ' + LNAME[l2] + ' (' + LANG[l2] + DEG + ') is ' + d + DEG + (d < 0 ? ' (that is, ' + (-d) + DEG + ' clockwise)' : ' counterclockwise') + '. Two reflections in intersecting lines = a rotation by twice that angle: 2 \u00D7 ' + d + DEG + ' = ' + 2 * d + DEG + ' \u2192 <b>' + rot + DEG + ' counterclockwise</b>.';
    }
    const half = rot === 90 ? 45 : rot === 270 ? 135 : 90;
    const wrongRots = [half, 360 - rot, 45, 90, 180, 270, 315].filter((a, i, arr) => a !== rot && arr.indexOf(a) === i).slice(0, 3);
    const mcA = mcFrom(rng, rotName(rot), wrongRots.map(rotName));
    const fr = ROTF[rot], rr = MOT[rot === 90 ? 'r90' : rot === 180 ? 'r180' : 'r270'].r;
    const allR = ['-y,x', 'y,-x', '-x,-y', '-x,y', 'y,x'].filter(r => r !== rr);
    const mcB = mcFrom(rng, ruleHTML(rr), rng.shuffle(allR).slice(0, 3).map(ruleHTML));
    const A = [rng.int(1, 9), rng.int(1, 9)];
    if (A[0] === A[1]) continue;
    const App = num2(fr(FP(A))), rev = (360 - rot) % 360, Arev = num2(ROTF[rev](FP(A)));
    return {
      prompt: prompt0 + '<br>(a) What single transformation is this composition equal to? (b) A point ' + ii('A') + '(' + ii('x') + ', ' + ii('y') + ') in the 1st quadrant is moved this way. What are the coordinates of ' + ii('A') + P2 + '? (c) Find ' + ii('A') + P2 + ' when ' + ii('A') + ' is ' + pt(A) + '. (d) Find ' + ii('A') + P2 + ' for ' + ii('A') + pt(A) + ' if the two reflections are done in the <b>opposite order</b>.',
      parts: [
        { label: '(a) single transformation', type: 'mc', choices: mcA.choices, answer: mcA.answer },
        { label: '(b) <i>A</i>' + P2, type: 'mc', choices: mcB.choices, answer: mcB.answer },
        { label: '(c) <i>A</i>' + P2, type: 'point', answer: App },
        { label: '(d) opposite order', type: 'point', answer: Arev }],
      explanation: steps([
        whyA + ' <b>Trap:</b> the rotation is 2\u00D7 the angle, not the angle itself' + (abstract ? '' : '') + '.',
        'Rule for a ' + rot + DEG + ' counterclockwise rotation about the origin: <b>' + ruleHTML(rr) + '</b>.',
        pt(A) + ' \u2192 <b>' + pt(App) + '</b>.',
        'Reversing the order reverses the direction of the rotation: ' + rot + DEG + ' clockwise = ' + rev + DEG + ' counterclockwise, rule ' + ruleHTML(MOT[rev === 90 ? 'r90' : rev === 180 ? 'r180' : 'r270'].r) + ', so ' + pt(A) + ' \u2192 <b>' + pt(Arev) + '</b>' + (rev === rot ? ' (180' + DEG + ' is the same either way)' : '') + '.'
      ]),
      params: { rot, A, App, Arev, rr }
    };
  }
} });

/* 6 ─ composition: rotation + reflection of a segment */
const RLINE = { rx: 'the <i>x</i>-axis', ry: 'the <i>y</i>-axis', ryx: 'the line <i>y</i> = <i>x</i>', rynx: 'the line <i>y</i> = ' + MINUS + '<i>x</i>' };
T.push({ id: 'rotReflSeg', section: '4.3 Compositions', gen(rng) {
  for (;;) {
    const S = [rng.intNZ(-6, 6), rng.intNZ(-6, 6)], Tt = [rng.intNZ(-6, 6), rng.intNZ(-6, 6)];
    if (S[0] === Tt[0] && S[1] === Tt[1]) continue;
    if (Math.abs(S[0]) === Math.abs(S[1]) || Math.abs(Tt[0]) === Math.abs(Tt[1])) continue;
    const ang = rng.pick([90, 180, 270]), ccw = rng.chance(0.6);
    const eff = ccw ? ang : (360 - ang) % 360;
    const rf = ROTF[eff];
    const rl = rng.pick(['rx', 'ry', 'ryx', 'rynx']);
    const rotFirst = rng.chance(0.65);
    const f1 = rotFirst ? rf : MOT[rl].f, f2 = rotFirst ? MOT[rl].f : rf;
    const Sp = f1(FP(S)), Spp = f2(Sp), Tp = f1(FP(Tt)), Tpp = f2(Tp);
    const comp = p => f2(f1(p));
    const ck = motKey(comp);
    const rotTxt = 'Rotation: ' + ang + DEG + ' ' + (ccw ? 'counterclockwise' : 'clockwise') + ' about the origin';
    const refTxt = 'Reflection: in ' + RLINE[rl];
    const mcD = mcFrom(rng, cap(MOT[ck].t), [rl].concat(rng.shuffle(['rx', 'ry', 'ryx', 'rynx', 'r90', 'r270'].filter(x => x !== ck && x !== rl)).slice(0, 2)).map(x => cap(MOT[x].t)));
    return {
      prompt: 'Graph ' + ol('ST') + ' with endpoints ' + ii('S') + pt(S) + ' and ' + ii('T') + pt(Tt) + ' and its image after the composition (in this order):<br><b>' + (rotFirst ? rotTxt + '<br>' + refTxt : refTxt + '<br>' + rotTxt) + '</b><br>(a) ' + ii('S') + P1 + ' after the first transformation. (b) ' + ii('S') + P2 + '. (c) ' + ii('T') + P2 + '. (d) Which single transformation maps ' + ol('ST') + ' directly onto ' + ol('S' + P2 + 'T' + P2) + '?',
      svg: gridSVG({ polys: [{ pts: [S, Tt], names: ['S', 'T'] }] }),
      parts: [
        { label: '(a) <i>S</i>' + P1, type: 'point', answer: num2(Sp) },
        { label: '(b) <i>S</i>' + P2, type: 'point', answer: num2(Spp) },
        { label: '(c) <i>T</i>' + P2, type: 'point', answer: num2(Tpp) },
        { label: '(d) single transformation', type: 'mc', choices: mcD.choices, answer: mcD.answer }],
      explanation: steps([
        'Rules: ' + ang + DEG + ' ' + (ccw ? 'counterclockwise' : 'clockwise') + (ccw ? '' : ' = ' + eff + DEG + ' counterclockwise') + ': ' + ruleHTML(MOT[eff === 90 ? 'r90' : eff === 180 ? 'r180' : 'r270'].r) + '; reflection in ' + RLINE[rl] + ': ' + ruleHTML(MOT[rl].r) + '. <b>Watch the direction</b> \u2014 270' + DEG + ' counterclockwise is 90' + DEG + ' clockwise.',
        'First ' + (rotFirst ? 'rotate' : 'reflect') + ': ' + ii('S') + pt(S) + ' \u2192 <b>' + ii('S') + P1 + fptH(Sp) + '</b>, ' + ii('T') + pt(Tt) + ' \u2192 ' + ii('T') + P1 + fptH(Tp) + '.',
        'Then ' + (rotFirst ? 'reflect' : 'rotate') + ': ' + ii('S') + P1 + ' \u2192 <b>' + ii('S') + P2 + fptH(Spp) + '</b>, ' + ii('T') + P1 + ' \u2192 <b>' + ii('T') + P2 + fptH(Tpp) + '</b>. Graph ' + ol('ST') + ' and ' + ol('S' + P2 + 'T' + P2) + '.',
        'Combine the rules: (' + ii('x') + ', ' + ii('y') + ') ends at ' + ruleHTML(MOT[ck].r).split('\u2192')[1] + ', which is <b>' + MOT[ck].t + '</b>. (A rotation followed by a reflection is always a single reflection.)'
      ]),
      params: { S, T: Tt, ang, ccw, rl, rotFirst, Sp, Spp, Tpp, ck }
    };
  }
} });

/* 7 ─ similarity transformation from coordinates (dilation + translation; order trap) */
T.push({ id: 'simCoords', section: '4.6 Similarity', gen(rng) {
  for (;;) {
    const k = rng.pick([F(2), F(3), F(-2), F(1, 2), F(-1, 2), F(2), F(3)]);
    const st = k.d;
    const P = [[st * rng.int(-3, 3), st * rng.int(-3, 3)], [st * rng.int(-3, 3), st * rng.int(-3, 3)], [st * rng.int(-3, 3), st * rng.int(-3, 3)]];
    const ar = (P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1]);
    if (ar === 0) continue;
    const v = [rng.intNZ(-10, 10), rng.intNZ(-10, 10)];
    const img = p => [fadd(fmul(k, F(p[0])), F(v[0])), fadd(fmul(k, F(p[1])), F(v[1]))];
    const Q = P.map(img);
    if (!inBox(Q.map(num2), 14)) continue;
    const vk = [fdiv(F(v[0]), k), fdiv(F(v[1]), k)];
    const G0 = [st * rng.int(-4, 4), st * rng.int(-4, 4)], Gi = img(G0);
    if (P.some(p => p[0] === G0[0] && p[1] === G0[1])) continue;
    if (vk[0].d > 1 && vk[1].d > 1 && k.d === 1 && rng.chance(0.3)) continue;
    const A0 = [fmul(k, F(P[0][0])), fmul(k, F(P[0][1]))];
    return {
      prompt: 'Describe a similarity transformation that maps the first triangle to the second: <b>a dilation centered at the origin followed by a translation</b>.<br>A' + pt(P[0]) + ', B' + pt(P[1]) + ', C' + pt(P[2]) + ' and D' + fptT(Q[0]) + ', E' + fptT(Q[1]) + ', F' + fptT(Q[2]) + ' (A\u2192D, B\u2192E, C\u2192F)<br>(a) Scale factor <i>k</i> of the dilation. (b) Translation vector after the dilation. (c) If you <b>translate first</b> and then dilate by the same <i>k</i>, what translation vector is needed? (d) Under the same similarity transformation, find the image of G' + pt(G0) + '.',
      parts: [
        { label: '(a) <i>k</i>', type: 'num', answer: fnum(k), key: fT(k) },
        { label: '(b) vector', type: 'vector', answer: v },
        { label: '(c) vector (translate first)', type: 'vector', answer: num2(vk), key: fvecT(vk) },
        { label: '(d) G' + P1, type: 'point', answer: num2(Gi), key: fptT(Gi) }],
      explanation: steps([
        'Compare a side: AB has length ' + Math.hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]).toFixed(2).replace(/\.00$/, '') + ' and DE has length ' + Math.hypot(fnum(Q[1][0]) - fnum(Q[0][0]), fnum(Q[1][1]) - fnum(Q[0][1])).toFixed(2).replace(/\.00$/, '') + ', so |<i>k</i>| = ' + fH(F(Math.abs(k.n), k.d)) + '. ' + (k.n < 0 ? 'The triangle is also turned upside down (B is to the ' + (P[1][0] > P[0][0] ? 'right' : 'left') + ' of A, but E is to the ' + (P[1][0] > P[0][0] ? 'left' : 'right') + ' of D), so <b><i>k</i> = ' + fH(k) + '</b> (a negative scale factor = dilate and rotate 180' + DEG + ').' : 'Orientation is the same, so <b><i>k</i> = ' + fH(k) + '</b>.'),
        'Dilate A: ' + pt(P[0]) + ' \u2192 ' + fptH(A0) + '. To reach D' + fptH(Q[0]) + ' add \u27E8' + sn(v[0]) + ', ' + sn(v[1]) + '\u27E9. Check B and C give E and F. <b>Translation ' + vec(v) + '</b>.',
        'Translating first: <i>k</i>(<i>p</i> + <b>u</b>) = <i>kp</i> + <i>k</i><b>u</b> must equal <i>kp</i> + ' + vec(v) + ', so <b>u</b> = ' + vec(v) + ' \u00F7 ' + fH(k) + ' = <b>\u27E8' + fH(vk[0]) + ', ' + fH(vk[1]) + '\u27E9</b>. (Translating by ' + vec(v) + ' first would be wrong \u2014 order matters.)',
        'G' + pt(G0) + ' \u2192 dilate: ' + fptH([fmul(k, F(G0[0])), fmul(k, F(G0[1]))]) + ' \u2192 translate: <b>' + fptH(Gi) + '</b>.'
      ]),
      params: { P, Q, k, v, vk, G0, Gi }
    };
  }
} });

/* 8 ─ scale factor word problem (units + chained dilations) */
const CTX = [
  { who: 'celebrity', what: 'promotional billboard', feat: 'face' },
  { who: 'basketball player', what: 'stadium banner', feat: 'arm' },
  { who: 'singer', what: 'concert billboard', feat: 'face' },
  { who: 'soccer player', what: 'building-side poster', feat: 'leg' }];
T.push({ id: 'scaleWord', section: '4.5 Dilations', gen(rng) {
  for (;;) {
    const c = rng.pick(CTX);
    const h = rng.pick([5, 6, 6, 4]), k = rng.pick([F(5, 2), F(3), F(7, 2), F(4), F(9, 2), F(5), F(5, 3), F(8, 3), F(7, 3)]);
    const H = fmul(F(h), k);
    if (H.d !== 1) continue;
    const realIn = rng.pick([8, 9, 10, 12, 15, 18]);       // real feature, inches
    const boardIn = fmul(F(realIn), k);
    const flyerIn = rng.pick([4, 5, 6, 8, 9, 10, 12]);     // person on the flyer, inches
    const k2 = F(flyerIn, 12 * H.n), kt = F(flyerIn, 12 * h);
    const shownBoard = boardIn.d === 1 ? String(boardIn.n) : (fnum(boardIn)).toString();
    if (!/^\d+(\.\d{1,2})?$/.test(shownBoard)) continue;
    return {
      prompt: 'An image of a ' + c.who + ' is going to be used on a ' + c.what + '. The person is ' + h + ' feet tall in real life and ' + H.n + ' feet tall on the ' + c.what.split(' ').pop() + '.<br>(a) What is the scale factor of this dilation? (b) On the ' + c.what.split(' ').pop() + ', the person\u2019s ' + c.feat + ' is ' + shownBoard + ' inches long. How long is it in real life, in inches? (c) The ' + c.what.split(' ').pop() + ' image is then shrunk to make a flyer on which the person is ' + flyerIn + ' inches tall. What is the scale factor from the ' + c.what.split(' ').pop() + ' to the flyer? (d) What is the scale factor from the real person to the flyer?',
      parts: [
        { label: '(a) <i>k</i>', type: 'num', answer: fnum(k), key: fT(k) },
        { label: '(b) real ' + c.feat, type: 'num', answer: realIn, unit: ' in.' },
        { label: '(c) board \u2192 flyer', type: 'num', answer: fnum(k2), key: fT(k2) },
        { label: '(d) real \u2192 flyer', type: 'num', answer: fnum(kt), key: fT(kt) }],
      explanation: steps([
        '<i>k</i> = image \u00F7 original = ' + H.n + ' \u00F7 ' + h + ' = <b>' + fH(k) + '</b>' + (k.d > 1 ? ' (= ' + (+fnum(k).toFixed(3)) + ')' : '') + '. Image over original \u2014 not the other way around.',
        'Real length = image length \u00F7 <i>k</i> = ' + shownBoard + ' \u00F7 ' + fH(k) + ' = <b>' + realIn + ' in.</b>',
        'Use the same units! ' + H.n + ' ft = ' + 12 * H.n + ' in. Scale factor = ' + flyerIn + ' \u00F7 ' + 12 * H.n + ' = <b>' + fH(k2) + '</b> (a reduction, so 0 &lt; <i>k</i> &lt; 1).',
        'Composing dilations multiplies the scale factors: ' + fH(k) + ' \u00D7 ' + fH(k2) + ' = <b>' + fH(kt) + '</b>. Check: ' + flyerIn + ' in. \u00F7 ' + 12 * h + ' in. = ' + fH(kt) + ' \u2713'
      ]),
      params: { h, H: H.n, k, realIn, boardIn, flyerIn, k2, kt }
    };
  }
} });

/* 9 ─ parallel lines + quadratic: pick the valid root */
const POS = ['TL', 'TR', 'BL', 'BR'];
const clsOf = p => (p === 'TR' || p === 'BL') ? 0 : 1;
function relOf(a, b) { // a on line 0 (top), b on line 1
  if (a === b) return 'corresponding';
  const sameSide = a[1] === b[1];
  if (a[0] === 'B' && b[0] === 'T') return sameSide ? 'consecInterior' : 'altInterior';
  if (a[0] === 'T' && b[0] === 'B') return sameSide ? 'consecExterior' : 'altExterior';
  return null;
}
const RELN = { corresponding: 'corresponding angles', altInterior: 'alternate interior angles', altExterior: 'alternate exterior angles', consecInterior: 'consecutive interior angles', consecExterior: 'consecutive exterior angles' };
function quadTxt(a, b, c) {
  let s = (a === 1 ? '' : a) + 'x\u00B2';
  if (b) s += (b < 0 ? ' ' + MINUS + ' ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x';
  if (c) s += (c < 0 ? ' ' + MINUS + ' ' : ' + ') + Math.abs(c);
  return '(' + s + ')' + DEG;
}
function linTxt(m, n) { return '(' + (m === 1 ? '' : m) + 'x' + (n ? (n < 0 ? ' ' + MINUS + ' ' : ' + ') + Math.abs(n) : '') + ')' + DEG; }
T.push({ id: 'parallelQuad', section: '3.2 Parallel lines & transversals', gen(rng) {
  for (;;) {
    const rel = rng.pick(['altExterior', 'altExterior', 'altInterior', 'corresponding', 'consecInterior']);
    const pairs = [];
    POS.forEach(a => POS.forEach(b => { if (relOf(a, b) === rel) pairs.push([a, b]); }));
    const [pa, pb] = rng.pick(pairs);
    const equal = rel !== 'consecInterior' && rel !== 'consecExterior';
    const a = rng.pick([2, 3, 4, 6, 8, 10, 12]);
    const dens = [1, 2, 3, 4, 6].filter(d => a % d === 0);
    const d1 = rng.chance(0.6) ? 1 : rng.pick(dens), d2 = rng.pick(dens.filter(d => d > 1).concat([1]));
    const r1 = F(rng.intNZ(1, 12 * d1), d1);   // valid root (positive here, but validity is by angle)
    const r2 = F(rng.intNZ(-12 * d2, 12 * d2), d2);
    if (r1.n === r2.n && r1.d === r2.d) continue;
    const m = d1 * rng.int(Math.ceil(3 / d1), Math.floor(16 / d1) || 1);
    if (m === 0) continue;
    const Lv = r1v => fadd(fmul(F(m), r1v), F(0));
    const n = rng.int(-60, 60);
    const L1 = fnum(Lv(r1)) + n;
    if (!Number.isInteger(L1) || L1 < 25 || L1 > 155 || L1 === 90) continue;
    const L2 = fnum(r2) * m + n;
    if (L2 > 0 && L2 < 180) continue;                  // second root must give an impossible angle
    const sum = fadd(r1, r2), prod = fmul(r1, r2);
    const qa = a, qbF = equal ? fsub(F(m), fmul(F(a), sum)) : fsub(F(-m), fmul(F(a), sum)), qcF = equal ? fadd(F(n), fmul(F(a), prod)) : fadd(F(180 - n), fmul(F(a), prod));
    if (qbF.d !== 1 || qcF.d !== 1) continue;
    const qb = qbF.n, qc = qcF.n;
    if (Math.abs(qb) > 60 || Math.abs(qc) > 250 || qb === 0) continue;
    const Qv = x => qa * x * x + qb * x + qc;
    const Q1 = Qv(fnum(r1));
    if (Math.abs(Q1 - (equal ? L1 : 180 - L1)) > 1e-6) continue;
    const linOnTop = rng.chance(0.5);
    const posL = linOnTop ? '0' + pa : '1' + pb, posQ = linOnTop ? '1' + pb : '0' + pa;
    const val = key => (clsOf(key.slice(1)) === clsOf(posL.slice(1))) ? L1 : 180 - L1;
    const free = [];
    [0, 1].forEach(i => POS.forEach(p => { const k = i + p; if (k !== posL && k !== posQ) free.push(k); }));
    const c1 = rng.pick(free), c2 = rng.pick(free.filter(k => k !== c1 && val(k) !== val(c1)));
    if (!c2) continue;
    const c0 = val('0TR');                // measure at TR positions
    const dir = c0 < 90 ? 1 : -1, theta = Math.max(38, Math.min(78, c0 < 90 ? c0 : 180 - c0));
    const labels = {}; labels[posL] = linTxt(m, n); labels[posQ] = quadTxt(qa, qb, qc); labels[c1] = '1'; labels[c2] = '2';
    const svg = transversalSVG({ dir: dir, theta: theta, labels: labels, arrows: true, names: ['m', 'n'], tname: 't' });
    const root2txt = fT(r2);
    return {
      prompt: 'Given: <i>m</i> \u2225 <i>n</i>. Diagram is not drawn to scale.<br>(a) Solve for <i>x</i> \u2014 enter the value of <i>x</i> that works in the diagram. (b) Enter the other solution of your equation, the one that must be rejected. (c) Find m' + ANG + '1. (d) Find m' + ANG + '2.',
      svg: svg,
      parts: [
        { label: '(a) <i>x</i> =', type: 'num', answer: fnum(r1), key: fT(r1) },
        { label: '(b) rejected <i>x</i> =', type: 'num', answer: fnum(r2), key: root2txt },
        { label: '(c) m' + ANG + '1', type: 'num', answer: val(c1), unit: DEG },
        { label: '(d) m' + ANG + '2', type: 'num', answer: val(c2), unit: DEG }],
      explanation: steps([
        'The two labeled angles are <b>' + RELN[rel] + '</b>, so they are ' + (equal ? '<b>congruent</b>' : '<b>supplementary</b>') + ': ' + (equal ? quadTxt(qa, qb, qc).replace(/[()\u00B0]/g, '') + ' = ' + linTxt(m, n).replace(/[()\u00B0]/g, '') : quadTxt(qa, qb, qc).replace(/[()\u00B0]/g, '') + ' + ' + linTxt(m, n).replace(/[()\u00B0]/g, '') + ' = 180') + '.',
        'Move everything to one side: ' + quadTxt(qa, qb - (equal ? m : -m), equal ? qc - n : qc + n - 180).replace(/[()\u00B0]/g, '') + ' = 0. Factor (or use the quadratic formula): <i>x</i> = ' + fH(r1) + ' or <i>x</i> = ' + fH(r2) + '.',
        'Test both in the diagram. <i>x</i> = ' + fH(r2) + ' makes ' + linTxt(m, n).replace(/[()\u00B0]/g, '') + ' = ' + fH(F(Math.round(L2 * 12), 12)) + DEG + (L2 <= 0 ? ' \u2264 0' + DEG : ' \u2265 180' + DEG) + ', which is impossible, so <b>reject ' + fH(r2) + '</b>. <i>x</i> = <b>' + fH(r1) + '</b> gives ' + L1 + DEG + (equal ? ' for both angles' : ' and ' + (180 - L1) + DEG) + ' \u2713',
        ANG + '1 is ' + (val(c1) === L1 ? 'congruent' : 'supplementary') + ' to the ' + linTxt(m, n) + ' angle (vertical / linear-pair / parallel-line angle relationships): <b>m' + ANG + '1 = ' + val(c1) + DEG + '</b>. ' + ANG + '2 is ' + (val(c2) === L1 ? 'congruent' : 'supplementary') + ' to it: <b>m' + ANG + '2 = ' + val(c2) + DEG + '</b>.'
      ]),
      params: { rel, posL, posQ, m, n, qa, qb, qc, r1, r2, L1, L2, c1, c2, equal, dir, theta }
    };
  }
} });

/* 10 ─ minimize AC + BC with C on a line (reflect one point) */
const MIR = {
  yx: { t: '<i>y</i> = <i>x</i>', f: p => [p[1], p[0]], side: p => p[1] - p[0], meet: (P, Q) => { /* intersection of PQ with y=x */ const t = (P[1] - P[0]) / ((P[1] - P[0]) - (Q[1] - Q[0])); return t; } },
  ynx: { t: '<i>y</i> = ' + MINUS + '<i>x</i>', f: p => [-p[1], -p[0]], side: p => p[1] + p[0] },
  xa: { t: 'the <i>x</i>-axis', f: p => [p[0], -p[1]], side: p => p[1] },
  ya: { t: 'the <i>y</i>-axis', f: p => [-p[0], p[1]], side: p => p[0] }
};
T.push({ id: 'minDistance', section: '4.2 Reflections', gen(rng) {
  for (;;) {
    const mk = rng.pick(['yx', 'yx', 'yx', 'ynx', 'xa', 'ya']), M = MIR[mk];
    const A = [rng.int(-12, 12), rng.int(-12, 12)], B = [rng.int(-12, 12), rng.int(-12, 12)];
    const sa = M.side(A), sb = M.side(B);
    if (sa === 0 || sb === 0 || Math.sign(sa) !== Math.sign(sb)) continue;
    if (Math.hypot(A[0] - B[0], A[1] - B[1]) < 6) continue;
    const Bp = M.f(B);
    if (Bp[0] === A[0]) continue;                       // vertical AB' (no slope form)
    const t = sa / (sa - M.side(Bp));                 // side() is linear -> zero crossing
    const C = [fadd(F(A[0]), fmul(F(sa, sa - M.side(Bp)), F(Bp[0] - A[0]))), fadd(F(A[1]), fmul(F(sa, sa - M.side(Bp)), F(Bp[1] - A[1])))];
    if (C[0].d > 12 || C[1].d > 12 || (C[0].d === 1 && C[1].d === 1 && rng.chance(0.6))) continue;
    const sl = F(Bp[1] - A[1], Bp[0] - A[0]), bb = fsub(F(A[1]), fmul(sl, F(A[0])));
    const d2 = (Bp[0] - A[0]) ** 2 + (Bp[1] - A[1]) ** 2;
    // the tempting wrong answer: where line AB itself meets the mirror (if it does)
    return {
      prompt: 'Given point ' + ii('A') + pt(A) + ' and point ' + ii('B') + pt(B) + '. Point ' + ii('C') + ' lies on ' + M.t + ' so that ' + ii('AC') + ' + ' + ii('BC') + ' is a minimum.<br>(a) Find ' + ii('B') + P1 + ', the reflection of ' + ii('B') + ' in ' + M.t + '. (b) Write an equation of line ' + ii('AB') + P1 + '. (c) Find the coordinates of ' + ii('C') + '. (d) Find the minimum value of ' + ii('AC') + ' + ' + ii('BC') + ' (exact, or a decimal to the hundredth).',
      parts: [
        { label: '(a) <i>B</i>' + P1, type: 'point', answer: Bp },
        { label: '(b) line <i>AB</i>' + P1, type: 'line', answer: { m: sl, b: bb } },
        { label: '(c) <i>C</i>', type: 'point', answer: num2(C), key: fptT(C) },
        { label: '(d) minimum', type: 'num', approx: true, answer: Math.sqrt(d2), key: radKey(d2) }],
      explanation: steps([
        ii('A') + ' and ' + ii('B') + ' are on the <b>same side</b> of ' + M.t + ', so the segment ' + ol('AB') + ' never touches the line \u2014 you cannot just use line ' + ii('AB') + ' or the midpoint. Reflect ' + ii('B') + ': <b>' + ii('B') + P1 + pt(Bp) + '</b>. Every point ' + ii('C') + ' on the line has ' + ii('CB') + ' = ' + ii('CB') + P1 + ', so ' + ii('AC') + ' + ' + ii('CB') + ' = ' + ii('AC') + ' + ' + ii('CB') + P1 + ', which is shortest when ' + ii('A') + ', ' + ii('C') + ', ' + ii('B') + P1 + ' are collinear.',
        'Slope of ' + ii('AB') + P1 + ' = (' + sn(Bp[1]) + ' ' + MINUS + ' ' + (A[1] < 0 ? '(' + sn(A[1]) + ')' : A[1]) + ') / (' + sn(Bp[0]) + ' ' + MINUS + ' ' + (A[0] < 0 ? '(' + sn(A[0]) + ')' : A[0]) + ') = ' + fH(sl) + ' \u2192 <b>' + lineEq(sl, bb, true) + '</b>.',
        'Intersect with ' + M.t + ': <b>' + ii('C') + fptH(C) + '</b>.',
        'Minimum = ' + ii('AB') + P1 + ' = \u221A[(' + sn(Bp[0] - A[0]) + ')\u00B2 + (' + sn(Bp[1] - A[1]) + ')\u00B2] = \u221A' + d2 + ' = <b>' + radKey(d2) + ' \u2248 ' + Math.sqrt(d2).toFixed(2) + '</b>.'
      ]),
      params: { mk, A, B, Bp, C, sl, bb, d2 }
    };
  }
} });

/* ------------------------------------------------------------ build */
const REAL_ORDER = ['perpBisector', 'simGraph', 'vectorUnknowns', 'perpLineDist', 'twoReflRot', 'rotReflSeg', 'simCoords', 'scaleWord', 'parallelQuad', 'minDistance'];
function generateRealTest(seed) {
  const rng = makeRng((seed ^ 0x2c1b3c6d) >>> 0);
  return REAL_ORDER.map((id, i) => {
    const t = T.filter(z => z.id === id)[0];
    const q = t.gen(rng);
    q.tid = t.id; q.section = t.section; q.hard = true; q.real = true; q.n = i + 1;
    q.parts.forEach(p => { p.keyText = keyText(p); p.answerHTML = answerHTML(p); });
    q.points = q.parts.length;
    return q;
  });
}
G.generateRealTest = generateRealTest;
G.realTemplates = T;
G.REAL_ORDER = REAL_ORDER;
return G;
});
