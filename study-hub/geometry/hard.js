/* Geometry Ch 3–4 Practice Test — HARD MODE generators (20 questions, 40 points).
   Depends on questions.js (window.GeoQ / require('./questions.js')). No dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./questions.js'));
  else factory(root.GeoQ);
})(typeof self !== 'undefined' ? self : this, function (G) {
'use strict';
const L = G.lib;
const { makeRng, gcd, Fr, fadd, fsub, fmul, fdiv, fnum, MINUS, PRIME, DPRIME, sn, fracHTML, fracText, pt, lineEq, linExpr, deg,
  simplifyRadical, radText, moveText, tri, ang, r1, svgOpen, line, text, chevron, transversalSVG, gridSVG, ALL8, pkey, same, relation,
  RELNAME, THM, CONV, CONG, angleVal, NUMBERING, randTri, inR, z0, REFL, ROT, regPoly, keyText, answerHTML } = L;
const H = [];
const DEG = '\u00B0', CONGS = '\u2245', PAR = '\u2225', PERP = '\u22A5', ANG = '\u2220', SIM = '\u223C';
const stripTags = s => String(s).replace(/<[^>]+>/g, '');
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* -------------------------------------------------------------- numbers */
function toFr(v) { for (let d = 1; d <= 1000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return Fr(n, d); } return Fr(Math.round(v * 1000), 1000); }
const fT = v => fracText(toFr(v));             // plain "−11/2"
const fH = v => fracHTML(toFr(v));             // stacked fraction HTML
const fpt = p => '(' + fT(p[0]) + ', ' + fT(p[1]) + ')';
const fptH = p => '(' + fH(p[0]) + ', ' + fH(p[1]) + ')';
const isInt = v => Math.abs(v - Math.round(v)) < 1e-9;
const eqP = (a, b) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9;
const sameList = (A, B) => A.length === B.length && A.every((p, i) => eqP(p, B[i]));
function stdForm(a, b, c, html) { // "3x − 4y = 12"
  const X = html ? '<i>x</i>' : 'x', Y = html ? '<i>y</i>' : 'y';
  const t1 = (a === 1 ? '' : a === -1 ? MINUS : sn(a)) + X;
  const t2 = (b < 0 ? ' ' + MINUS + ' ' : ' + ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + Y;
  return t1 + t2 + ' = ' + sn(c);
}
function radStr(coef, r) { // coef (number, maybe fraction) * sqrt(r), plain text
  const c = toFr(coef);
  if (r === 1) return fracText(c);
  const core = (c.n === 1 ? '' : String(c.n)) + '\u221A' + r;
  return c.d === 1 ? core : core + '/' + c.d;
}

/* ------------------------------------------------------- label layout */
const CW = 8.3, LH = 15;   // approx glyph width/height of a 15px semibold label
function labelBox(x, y, s, anchor) {
  const w = stripTags(s).length * CW, x0 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2;
  return [x0 - 1, y - LH / 2, x0 + w + 1, y + LH / 2];
}
const boxHit = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
function segHitsBox(s, b) { // segment [x1,y1,x2,y2] vs box
  const inside = (x, y) => x >= b[0] && x <= b[2] && y >= b[1] && y <= b[3];
  if (inside(s[0], s[1]) || inside(s[2], s[3])) return true;
  const E = [[b[0], b[1], b[2], b[1]], [b[2], b[1], b[2], b[3]], [b[2], b[3], b[0], b[3]], [b[0], b[3], b[0], b[1]]];
  const cr = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  return E.some(e => {
    const d1 = cr(s[0], s[1], s[2], s[3], e[0], e[1]), d2 = cr(s[0], s[1], s[2], s[3], e[2], e[3]);
    const d3 = cr(e[0], e[1], e[2], e[3], s[0], s[1]), d4 = cr(e[0], e[1], e[2], e[3], s[2], s[3]);
    return d1 * d2 < 0 && d3 * d4 < 0;
  });
}

/* ================================================================ PROOFS */
const ST = {
  cong: f => ANG + f.a + ' ' + CONGS + ' ' + ANG + f.b,
  supp: f => ANG + f.a + ' and ' + ANG + f.b + ' are supplementary',
  lp: f => ANG + f.a + ' and ' + ANG + f.b + ' are a linear pair',
  par: f => f.a + ' ' + PAR + ' ' + f.b,
  perp: f => f.a + ' ' + PERP + ' ' + f.b,
  meq: f => 'm' + ANG + f.a + ' = m' + ANG + f.b,
  sum180: f => 'm' + ANG + f.a + ' + m' + ANG + f.b + ' = 180' + DEG,
  dbl: f => 'm' + ANG + f.a + ' + m' + ANG + f.a + ' = 180' + DEG,
  two: f => '2(m' + ANG + f.a + ') = 180' + DEG,
  m90: f => 'm' + ANG + f.a + ' = 90' + DEG,
  right: f => ANG + f.a + ' is a right angle'
};
const stmt = f => ST[f.t](f);
const F = (t, a, b) => ({ t: t, a: a, b: b });
const R = {
  given: 'Given', vact: 'Vertical Angles Congruence Theorem', lpp: 'Linear Pair Postulate', deflp: 'Definition of linear pair',
  transC: 'Transitive Property of Congruence', transP: 'Transitive Property of Parallel Lines',
  corrT: 'Corresponding Angles Theorem', corrC: 'Corresponding Angles Converse', aiT: 'Alternate Interior Angles Theorem', aiC: 'Alternate Interior Angles Converse',
  aeT: 'Alternate Exterior Angles Theorem', aeC: 'Alternate Exterior Angles Converse', ciT: 'Consecutive Interior Angles Theorem', ciC: 'Consecutive Interior Angles Converse',
  csupp: 'Congruent Supplements Theorem', defcong: 'Definition of congruent angles', defsupp: 'Definition of supplementary angles', subst: 'Substitution Property of Equality',
  lppt: 'Linear Pair Perpendicular Theorem', ptt: 'Perpendicular Transversal Theorem', lptt: 'Lines Perpendicular to a Transversal Theorem',
  defperp: 'Definition of perpendicular lines', defright: 'Definition of right angle', div: 'Division Property of Equality', simp: 'Simplify (combine like terms)',
  rac: 'Right Angles Congruence Theorem', parpost: 'Parallel Postulate', perppost: 'Perpendicular Postulate'
};
const THM_R = { corresponding: R.corrT, altInterior: R.aiT, altExterior: R.aeT, consecInterior: R.ciT };
const CONV_R = { corresponding: R.corrC, altInterior: R.aiC, altExterior: R.aeC, consecInterior: R.ciC };
// plausible wrong reasons for each correct reason (each is checked as invalid by verify.js)
const DIST = {};
DIST[R.vact] = [R.lpp, R.corrT, R.transC, R.aiT, R.csupp];
DIST[R.transC] = [R.transP, R.vact, R.csupp, R.corrT, R.aiT];
DIST[R.deflp] = [R.lpp, R.vact, R.defsupp, R.csupp];
DIST[R.lpp] = [R.deflp, R.csupp, R.ciT, R.vact, R.ciC];
DIST[R.csupp] = [R.transC, R.lpp, R.vact, R.ciT];
DIST[R.defcong] = [R.defsupp, R.subst, R.transC, R.lpp];
DIST[R.defsupp] = [R.defcong, R.subst, R.csupp, R.transC];
DIST[R.subst] = [R.transC, R.defsupp, R.defcong, R.div];
DIST[R.lppt] = [R.lpp, R.ptt, R.lptt, R.vact];
DIST[R.lptt] = [R.ptt, R.lppt, R.transP, R.perppost];
DIST[R.transP] = [R.lptt, R.transC, R.ptt, R.parpost];
DIST[R.simp] = [R.subst, R.div, R.defright, R.defsupp];
DIST[R.div] = [R.subst, R.simp, R.defright, R.defsupp];
DIST[R.defright] = [R.defperp, R.div, R.lppt, R.rac];
DIST[R.defperp] = [R.defright, R.lpp, R.ptt, R.lptt];
DIST[R.given] = [R.transP, R.lptt, R.ptt, R.lppt];
['corresponding', 'altInterior', 'altExterior', 'consecInterior'].forEach(k => {
  const others = Object.keys(THM_R).filter(j => j !== k);
  DIST[THM_R[k]] = [CONV_R[k], THM_R[others[0]], THM_R[others[1]], THM_R[others[2]], R.vact];
  DIST[CONV_R[k]] = [THM_R[k], CONV_R[others[0]], CONV_R[others[1]], CONV_R[others[2]], R.transP];
});

/* rows: [{f, r, alts?}] ; alts = wrong statements for a statement blank. Picks `nb` blanks (one cell per row). */
function buildProof(rng, rows, nb, meta) {
  const cand = rows.map((r, i) => i).filter(i => i > 0);
  const pick = rng.shuffle(cand).slice(0, nb).sort((a, b) => a - b);
  const parts = [], table = [];
  rows.forEach((row, i) => {
    const cell = { s: stmt(row.f), r: row.r };
    if (pick.indexOf(i) >= 0) {
      const uniq = (row.alts || []).filter((a, j, arr) => stmt(a) !== stmt(row.f) && arr.findIndex(b => stmt(b) === stmt(a)) === j);
      const useStmt = uniq.length >= 3 && rng.chance(0.4);
      if (useStmt) {
        const opts = rng.shuffle([row.f].concat(rng.shuffle(uniq).slice(0, 3)));
        parts.push({ type: 'select', label: 'Statement ' + (i + 1), choices: opts.map(stmt), answer: opts.indexOf(row.f), optFacts: opts, row: i, cell: 's' });
        cell.s = { part: parts.length - 1 };
      } else {
        const opts = rng.shuffle([row.r].concat(rng.shuffle(DIST[row.r].filter(d => !(row.noDist || []).includes(d))).slice(0, 4)));
        parts.push({ type: 'select', label: 'Reason ' + (i + 1), choices: opts, answer: opts.indexOf(row.r), row: i, cell: 'r' });
        cell.r = { part: parts.length - 1 };
      }
    }
    table.push(cell);
  });
  const expl = '<ol class="proofexp">' + rows.map(r => '<li>' + stmt(r.f) + ' \u2014 <b>' + r.r + '</b></li>').join('') + '</ol>';
  return { parts: parts, table: table, expl: expl, rows: rows.map(r => ({ f: r.f, r: r.r })) };
}
const vertOf = q => ({ i: q.i, p: (q.p[0] === 'T' ? 'B' : 'T') + (q.p[1] === 'L' ? 'R' : 'L') });
const nbrs = q => [{ i: q.i, p: (q.p[0] === 'T' ? 'B' : 'T') + q.p[1] }, { i: q.i, p: q.p[0] + (q.p[1] === 'L' ? 'R' : 'L') }];
const num = q => NUMBERING[pkey(q)];
const byNum = n => ALL8.filter(q => num(q) === n)[0];
const cls = q => (q.p === 'TR' || q.p === 'BL') ? 0 : 1; // same class <=> congruent when lines are parallel
const CONGREL = { corresponding: 1, altInterior: 1, altExterior: 1 };

/* 3.3 proof with parallel lines ----------------------------------------- */
H.push({ id: 'proofPar', section: '3.3', gen(rng) {
  const kind = rng.pick(['S1', 'S2', 'S3']);
  const dir = rng.pick([1, -1]), theta = rng.int(55, 70);
  const tops = ALL8.filter(q => q.i === 0), bots = ALL8.filter(q => q.i === 1);
  let rows, given, prove, arrows = false, idea;
  if (kind === 'S1') {
    const rt = rng.pick(['altInterior', 'altExterior']);
    let a, b; do { a = rng.pick(tops); b = rng.pick(bots); } while (relation(a, b) !== rt);
    const useA = rng.chance(0.5), c = useA ? vertOf(a) : vertOf(b);
    let e, f;
    do { e = rng.pick(tops); f = rng.pick(bots); } while (!THM_R[relation(e, f)] || [[a, b], [a, c], [c, b]].some(pr => (same(pr[0], e) && same(pr[1], f))));
    const ef = relation(e, f) === 'consecInterior' ? F('supp', num(e), num(f)) : F('cong', num(e), num(f));
    const A = num(a), B = num(b), C = num(c);
    const s2 = useA ? F('cong', A, C) : F('cong', B, C);
    const s3 = useA ? F('cong', C, B) : F('cong', A, C);
    const corrPair = useA ? [c, b] : [a, c];
    const wrongV = (x, y) => nbrs(x).concat([{ i: 1 - x.i, p: x.p }]).filter(z => !same(z, y)).map(z => F('cong', num(x), num(z)));
    const outside = ALL8.filter(z => [a, b, c].every(w => !same(w, z)));
    rows = [
      { f: F('cong', A, B), r: R.given },
      { f: s2, r: R.vact, alts: wrongV(useA ? a : b, c) },
      { f: s3, r: R.transC, alts: outside.map(z => F('cong', s3.a, num(z))).concat(outside.map(z => F('cong', num(z), s3.b))) },
      { f: F('par', 'm', 'n'), r: R.corrC, alts: [F('perp', 'm', 't'), F('perp', 'n', 't'), F('par', 'm', 't')], noDist: [CONV_R[rt]] },
      { f: ef, r: THM_R[relation(e, f)], alts: ALL8.filter(z => z.i === 1 && !same(z, f)).map(z => F(ef.t, num(e), num(z))) }
    ];
    given = ANG + A + ' ' + CONGS + ' ' + ANG + B; prove = stmt(ef);
    idea = 'First prove <i>m</i> ' + PAR + ' <i>n</i> with a <b>converse</b> (' + ANG + num(corrPair[0]) + ' and ' + ANG + num(corrPair[1]) + ' are corresponding angles). Only after the lines are known to be parallel can you use the <b>' + THM_R[relation(e, f)] + '</b>.';
  } else if (kind === 'S2') {
    let a, b, c;
    for (;;) {
      a = rng.pick(tops); b = rng.pick(bots);
      if (cls(a) === cls(b)) continue;
      c = rng.pick(nbrs(b)); if (CONGREL[relation(a, c)]) break;
    }
    const A = num(a), B = num(b), C = num(c), other = nbrs(b).filter(z => !same(z, c))[0];
    const rel = relation(a, c);
    const outside = ALL8.filter(z => [a, b, c].every(w => !same(w, z)));
    rows = [
      { f: F('supp', A, B), r: R.given },
      { f: F('lp', B, C), r: R.deflp, alts: [F('lp', B, num(vertOf(b))), F('lp', A, B), F('lp', A, C), F('lp', B, num({ i: 0, p: b.p }))].filter(x => !(x.a === B && x.b === num(other))) },
      { f: F('supp', B, C), r: R.lpp, alts: [F('supp', B, num(vertOf(b))), F('supp', A, C), F('supp', C, num({ i: 0, p: c.p }))].concat(outside.filter(z => z.i === 0).map(z => F('supp', C, num(z)))).filter(x => !(x.a === C && x.b === A)) },
      { f: F('cong', A, C), r: R.csupp, alts: [F('cong', A, B), F('cong', B, C)].concat(outside.map(z => F('cong', A, num(z)))) },
      { f: F('par', 'm', 'n'), r: CONV_R[rel], alts: [F('perp', 'm', 't'), F('perp', 'n', 't'), F('par', 'm', 't')], noDist: relation(a, b) === 'consecInterior' ? [R.ciC] : [] }
    ];
    given = ANG + A + ' and ' + ANG + B + ' are supplementary'; prove = '<i>m</i> ' + PAR + ' <i>n</i>';
    idea = ANG + C + ' forms a linear pair with ' + ANG + B + ', so ' + ANG + A + ' and ' + ANG + C + ' are supplements of the same angle and are congruent. ' + ANG + A + ' and ' + ANG + C + ' are ' + RELNAME[rel] + ', so the <b>' + CONV_R[rel] + '</b> proves <i>m</i> ' + PAR + ' <i>n</i>.';
  } else {
    let a, b, c;
    for (;;) {
      a = rng.pick(tops); b = rng.pick(bots);
      if (cls(a) === cls(b) || relation(a, b) === 'consecInterior') continue;
      c = rng.pick(nbrs(b)); if (CONGREL[relation(a, c)]) break;
    }
    arrows = true;
    const A = num(a), B = num(b), C = num(c), rel = relation(a, c);
    const outside = ALL8.filter(z => [a, b, c].every(w => !same(w, z)));
    rows = [
      { f: F('par', 'm', 'n'), r: R.given },
      { f: F('cong', A, C), r: THM_R[rel], alts: ALL8.filter(z => z.i === 1 && !same(z, c) && !THM_R[relation(a, z)]).map(z => F('cong', A, num(z))).concat([F('cong', A, B)]) },
      { f: F('supp', C, B), r: R.lpp, alts: [F('supp', C, num(vertOf(c))), F('supp', A, B), F('supp', A, C)] },
      { f: F('meq', A, C), r: R.defcong, alts: [F('meq', A, B), F('meq', C, B), F('sum180', A, C)] },
      { f: F('sum180', C, B), r: R.defsupp, alts: [F('sum180', A, C), F('sum180', A, B), F('meq', C, B)] },
      { f: F('sum180', A, B), r: R.subst, alts: [F('sum180', A, C), F('meq', A, B), F('sum180', C, C)].concat(outside.slice(0, 2).map(z => F('sum180', A, num(z)))) },
      { f: F('supp', A, B), r: R.defsupp, alts: [F('cong', A, B), F('supp', A, C), F('lp', A, B)] }
    ];
    given = '<i>m</i> ' + PAR + ' <i>n</i>'; prove = ANG + A + ' and ' + ANG + B + ' are supplementary';
    idea = 'Because <i>m</i> ' + PAR + ' <i>n</i> is <b>given</b>, use a <b>theorem</b> (not a converse): ' + ANG + A + ' and ' + ANG + C + ' are ' + RELNAME[rel] + '. Then the Linear Pair Postulate and Substitution finish it.';
  }
  const labels = {}; ALL8.forEach(q => { labels[pkey(q)] = String(num(q)); });
  const P = buildProof(rng, rows, 4);
  return {
    prompt: 'Complete the two-column proof. Choose the missing statements and reasons.',
    svg: transversalSVG({ dir: dir, theta: theta, labels: labels, numbered: true, tname: 't', names: ['m', 'n'], arrows: arrows }),
    proof: { given: given, prove: prove, table: P.table },
    parts: P.parts,
    explanation: idea + P.expl,
    params: { kind: kind, dir: dir, theta: theta, rows: P.rows, givens: rows.filter(r => r.r === R.given).map(r => r.f), lines: { m: 'm', n: 'n', t: 't' } }
  };
} });

/* 3.4 proof with perpendicular lines ------------------------------------ */
const QUAD = { TL: [-1, 1], TR: [1, 1], BL: [-1, -1], BR: [1, -1] };
const ADJ = [['TL', 'TR'], ['BL', 'BR'], ['TL', 'BL'], ['TR', 'BR']];
function numAt(V, p, n) { const d = QUAD[p]; return text(V[0] + d[0] * 17, V[1] - d[1] * 17, String(n), 'class="anum" text-anchor="middle" dominant-baseline="middle"'); }
function rmarkAt(V, p) { const d = QUAD[p], z = 11; return '<path d="M' + (V[0] + d[0] * z) + ' ' + V[1] + ' L' + (V[0] + d[0] * z) + ' ' + (V[1] - d[1] * z) + ' L' + V[0] + ' ' + (V[1] - d[1] * z) + '" class="rmark"/>'; }
H.push({ id: 'proofPerp', section: '3.4', gen(rng) {
  const kind = rng.pick(['S1', 'S3', 'S4']);
  let rows, given, prove, svg, idea, meta = {};
  if (kind === 'S1') {
    const pa = rng.pick(ADJ), pb = rng.pick(ADJ), Va = [180, 70], Vb = [180, 170];
    svg = svgOpen(360, 230, 'aria-label="lines a, b and t"') + line(20, 70, 340, 70) + line(20, 170, 340, 170) + line(180, 15, 180, 220) +
      text(340, 62, 'a', 'class="lname" text-anchor="end"') + text(340, 162, 'b', 'class="lname" text-anchor="end"') + text(188, 28, 't', 'class="lname"') +
      numAt(Va, pa[0], 1) + numAt(Va, pa[1], 2) + numAt(Vb, pb[0], 3) + numAt(Vb, pb[1], 4) + '</svg>';
    rows = [
      { f: F('cong', 1, 2), r: R.given },
      { f: F('perp', 'a', 't'), r: R.lppt, alts: [F('par', 'a', 't'), F('perp', 'a', 'b'), F('perp', 'b', 't')] },
      { f: F('cong', 3, 4), r: R.given, alts: [F('cong', 1, 3), F('cong', 2, 4), F('cong', 1, 4)] },
      { f: F('perp', 'b', 't'), r: R.lppt, alts: [F('par', 'b', 't'), F('perp', 'a', 'b'), F('par', 'a', 'b')] },
      { f: F('par', 'a', 'b'), r: R.lptt, alts: [F('perp', 'a', 'b'), F('par', 'a', 't'), F('par', 'b', 't')] }
    ];
    given = ANG + '1 ' + CONGS + ' ' + ANG + '2, ' + ANG + '3 ' + CONGS + ' ' + ANG + '4'; prove = '<i>a</i> ' + PAR + ' <i>b</i>';
    idea = 'Each pair of congruent angles is a linear pair, so the <b>Linear Pair Perpendicular Theorem</b> gives <i>a</i> ' + PERP + ' <i>t</i> and <i>b</i> ' + PERP + ' <i>t</i>. Two lines perpendicular to the same line are parallel (<b>Lines Perpendicular to a Transversal Theorem</b>).';
  } else if (kind === 'S3') {
    const order = rng.shuffle(['a', 'b', 'c']), ys = [55, 125, 195], Y = {}; order.forEach((n, i) => { Y[n] = ys[i]; });
    svg = svgOpen(360, 240, 'aria-label="lines a, b, c and t"');
    ['a', 'b', 'c'].forEach(n => { svg += line(20, Y[n], 340, Y[n]) + text(340, Y[n] - 8, n, 'class="lname" text-anchor="end"'); });
    svg += line(150, 12, 150, 232) + text(158, 24, 't', 'class="lname"');
    svg += rmarkAt([150, Y.a], rng.pick(['TR', 'BR', 'TL', 'BL'])) + rmarkAt([150, Y.b], rng.pick(['TR', 'BR', 'TL', 'BL']));
    svg += chevron(285, Y.b) + chevron(285, Y.c) + '</svg>';
    rows = [
      { f: F('perp', 'a', 't'), r: R.given },
      { f: F('perp', 'b', 't'), r: R.given, alts: [F('par', 'a', 'b'), F('perp', 'c', 't'), F('perp', 'a', 'b')] },
      { f: F('par', 'a', 'b'), r: R.lptt, alts: [F('perp', 'a', 'b'), F('par', 'a', 't'), F('par', 'b', 't')] },
      { f: F('par', 'b', 'c'), r: R.given, alts: [F('par', 'a', 'c'), F('perp', 'c', 't'), F('perp', 'b', 'c')] },
      { f: F('par', 'a', 'c'), r: R.transP, alts: [F('perp', 'a', 'c'), F('par', 'a', 't'), F('perp', 'c', 't')] }
    ];
    given = '<i>a</i> ' + PERP + ' <i>t</i>, <i>b</i> ' + PERP + ' <i>t</i>, <i>b</i> ' + PAR + ' <i>c</i>'; prove = '<i>a</i> ' + PAR + ' <i>c</i>';
    idea = '<i>a</i> and <i>b</i> are both perpendicular to <i>t</i>, so <i>a</i> ' + PAR + ' <i>b</i> (<b>Lines Perpendicular to a Transversal Theorem</b>). Since <i>b</i> ' + PAR + ' <i>c</i> too, the <b>Transitive Property of Parallel Lines</b> gives <i>a</i> ' + PAR + ' <i>c</i>.';
    meta.order = order;
  } else {
    const p = rng.pick(ADJ), V = [180, 120];
    svg = svgOpen(360, 240, 'aria-label="lines g and h"') + line(30, 120, 330, 120) + line(180, 15, 180, 225) +
      text(330, 112, 'g', 'class="lname" text-anchor="end"') + text(188, 28, 'h', 'class="lname"') + numAt(V, p[0], 1) + numAt(V, p[1], 2) + '</svg>';
    rows = [
      { f: F('cong', 1, 2), r: R.given },
      { f: F('meq', 1, 2), r: R.defcong, alts: [F('sum180', 1, 2), F('right', 1), F('m90', 1)] },
      { f: F('lp', 1, 2), r: R.given, alts: [F('supp', 1, 2), F('m90', 1), F('right', 1)] },
      { f: F('supp', 1, 2), r: R.lpp, alts: [F('sum180', 1, 2), F('m90', 1), F('right', 1)] },
      { f: F('sum180', 1, 2), r: R.defsupp, alts: [F('dbl', 1), F('m90', 1), F('meq', 1, 2)] },
      { f: F('dbl', 1), r: R.subst, alts: [F('m90', 1), F('two', 1), F('right', 1)] },
      { f: F('two', 1), r: R.simp, alts: [F('m90', 1), F('right', 1), F('sum180', 1, 2)] },
      { f: F('m90', 1), r: R.div, alts: [F('right', 1), F('two', 2), F('perp', 'g', 'h')] },
      { f: F('right', 1), r: R.defright, alts: [F('m90', 2), F('perp', 'g', 'h'), F('right', 2)] },
      { f: F('perp', 'g', 'h'), r: R.defperp, alts: [F('par', 'g', 'h'), F('right', 2), F('m90', 2)] }
    ];
    given = ANG + '1 ' + CONGS + ' ' + ANG + '2; ' + ANG + '1 and ' + ANG + '2 are a linear pair'; prove = '<i>g</i> ' + PERP + ' <i>h</i>';
    idea = 'This is the proof of the <b>Linear Pair Perpendicular Theorem</b>: a linear pair adds to 180' + DEG + ', and if the two angles are equal, each is 90' + DEG + '.';
  }
  const P = buildProof(rng, rows, 4);
  return {
    prompt: 'Complete the two-column proof. Choose the missing statements and reasons.',
    svg: svg, proof: { given: given, prove: prove, table: P.table }, parts: P.parts,
    explanation: idea + P.expl,
    params: Object.assign({ kind: kind, rows: P.rows, givens: rows.filter(r => r.r === R.given).map(r => r.f) }, meta)
  };
} });

/* ---------------------------------------------- transformation chains */
const MAT = { Rx: [1, 0, 0, -1], Ry: [-1, 0, 0, 1], Ryx: [0, 1, 1, 0], Rynx: [0, -1, -1, 0], R90: [0, -1, 1, 0], R180: [-1, 0, 0, -1], R270: [0, 1, -1, 0] };
const BNAME = {
  Rx: 'a reflection in the <i>x</i>-axis', Ry: 'a reflection in the <i>y</i>-axis', Ryx: 'a reflection in the line <i>y</i> = <i>x</i>', Rynx: 'a reflection in the line <i>y</i> = ' + MINUS + '<i>x</i>',
  R90: 'a rotation of 90' + DEG + ' counterclockwise about the origin', R180: 'a rotation of 180' + DEG + ' about the origin', R270: 'a rotation of 270' + DEG + ' counterclockwise about the origin'
};
function stepApply(s, p) {
  if (s.t === 'dil') { const k = fnum(s.k), c = s.c || [0, 0]; return [c[0] + k * (p[0] - c[0]), c[1] + k * (p[1] - c[1])]; }
  if (s.t === 'base') { const m = MAT[s.b]; return [m[0] * p[0] + m[1] * p[1], m[2] * p[0] + m[3] * p[1]]; }
  if (s.t === 'tr') return [p[0] + s.v[0], p[1] + s.v[1]];
  throw new Error('step');
}
const chainApply = (ch, p) => z0(ch.reduce((q, s) => stepApply(s, q), p));
function stepDesc(s) {
  if (s.t === 'dil') return 'a dilation with center ' + (s.c && (s.c[0] || s.c[1]) ? pt(s.c) : 'at the origin') + ' and <i>k</i> = ' + fracHTML(s.k);
  if (s.t === 'base') return BNAME[s.b];
  return 'a translation ' + moveText(s.v);
}
function chainDesc(ch) { return cap(ch.map(stepDesc).join(', followed by ')); }
// plain-text version of a step (dilation fraction written as a/b)
function stepPlain(s) { if (s.t === 'dil') return 'a dilation with center ' + (s.c && (s.c[0] || s.c[1]) ? pt(s.c) : 'at the origin') + ' and k = ' + fracText(s.k); return stripTags(stepDesc(s)); }

/* 4.4 / 4.6 justification "proof" ---------------------------------------- */
H.push({ id: 'proofTransform', section: '4.4', gen(rng) {
  for (;;) {
    const similar = rng.chance(0.5);
    let s1, s2, P;
    if (!similar) {
      P = randTri(rng, -5, 5);
      s1 = { t: 'base', b: rng.pick(Object.keys(MAT)) };
      s2 = { t: 'tr', v: [rng.intNZ(-5, 5), rng.intNZ(-5, 5)] };
    } else {
      const k = rng.pick([Fr(2), Fr(3), Fr(1, 2), Fr(-2), Fr(-1, 2), Fr(3, 2)]);
      P = randTri(rng, -4, 4, k.d);
      s1 = { t: 'dil', k: k };
      s2 = rng.chance(0.5) ? { t: 'base', b: rng.pick(Object.keys(MAT)) } : { t: 'tr', v: [rng.intNZ(-4, 4), rng.intNZ(-4, 4)] };
    }
    const P1 = P.map(p => chainApply([s1], p)), Q = P1.map(p => chainApply([s2], p));
    if (!inR(P1, 10) || !inR(Q, 9) || !inR(P, 9)) continue;
    // options for each step
    let o1;
    if (s1.t === 'base') o1 = [s1].concat(rng.shuffle(Object.keys(MAT).filter(b => b !== s1.b)).slice(0, 3).map(b => ({ t: 'base', b: b })));
    else { const k = s1.k, c = [fmul(k, Fr(-1)), fdiv(Fr(1), k), fmul(k, Fr(2)), fdiv(Fr(-1), k)]; const seen = new Set([fracText(k)]); o1 = [s1]; c.forEach(x => { if (!seen.has(fracText(x)) && o1.length < 4) { seen.add(fracText(x)); o1.push({ t: 'dil', k: x }); } }); }
    let o2;
    if (s2.t === 'base') o2 = [s2].concat(rng.shuffle(Object.keys(MAT).filter(b => b !== s2.b)).slice(0, 3).map(b => ({ t: 'base', b: b })));
    else { const v = s2.v, c = rng.shuffle([[v[1], v[0]], [-v[0], -v[1]], [v[0], -v[1]], [-v[0], v[1]]]); const seen = new Set([v.join()]); o2 = [s2]; c.forEach(x => { if (!seen.has(x.join()) && o2.length < 4) { seen.add(x.join()); o2.push({ t: 'tr', v: x }); } }); }
    if (o1.length < 4 || o2.length < 4) continue;
    // each option must give a different image (so exactly one choice works)
    if (o1.some((o, i) => i > 0 && sameList(P.map(p => chainApply([o], p)), P1))) continue;
    if (o2.some((o, i) => i > 0 && sameList(P1.map(p => chainApply([o], p)), Q))) continue;
    o1 = rng.shuffle(o1); o2 = rng.shuffle(o2);
    const concl = [
      tri('ABC') + ' ' + CONGS + ' ' + tri('DEF') + ', because a composition of rigid motions is a rigid motion (a congruence transformation).',
      tri('ABC') + ' ' + SIM + ' ' + tri('DEF') + ' but not ' + CONGS + ', because a dilation followed by a rigid motion is a similarity transformation.',
      tri('ABC') + ' ' + CONGS + ' ' + tri('DEF') + ', because a dilation followed by a rigid motion is a congruence transformation.',
      tri('ABC') + ' ' + SIM + ' ' + tri('DEF') + ' but not ' + CONGS + ', because reflections and rotations change the size of a figure.'
    ];
    const cOrd = rng.shuffle([0, 1, 2, 3]);
    const A1 = ['A' + PRIME, 'B' + PRIME, 'C' + PRIME];
    const parts = [
      { type: 'select', label: 'Statement 1', choices: o1.map(o => cap(stepPlain(o))), answer: o1.indexOf(s1) },
      { type: 'select', label: 'Statement 2', choices: o2.map(o => cap(stepPlain(o))), answer: o2.indexOf(s2) },
      null,
      { type: 'select', label: 'Reason 4', choices: cOrd.map(i => concl[i]), answer: cOrd.indexOf(similar ? 1 : 0) }
    ];
    // side ratio DE / AB (lengths are positive; distractors: signed k, reciprocal, 1 or 2|k|)
    const kk = similar ? Fr(Math.abs(s1.k.n), s1.k.d) : Fr(1);
    const rOpts = [kk]; [similar && s1.k.n < 0 ? s1.k : Fr(-kk.n, kk.d), fdiv(Fr(1), kk), similar ? Fr(1) : Fr(2), fmul(kk, Fr(2)), Fr(1, 2)].forEach(x => { if (rOpts.length < 4 && !rOpts.some(y => fracText(y) === fracText(x))) rOpts.push(x); });
    const rSh = rng.shuffle(rOpts.slice());
    parts[2] = { type: 'select', label: 'Statement 3', choices: rSh.map(x => fracText(x)), answer: rSh.indexOf(kk) };
    const table = [
      { s: { part: 0 }, r: 'maps ' + tri('ABC') + ' to ' + tri(A1.join('')) + ': ' + A1.map((n, i) => n + fpt(P1[i])).join(', ') },
      { s: { part: 1 }, r: 'maps ' + tri(A1.join('')) + ' to ' + tri('DEF') + ': D' + pt(Q[0]) + ', E' + pt(Q[1]) + ', F' + pt(Q[2]) },
      { s: { part: 2, pre: '<i>DE</i> \u00F7 <i>AB</i> = ' }, r: 'Distance Formula (compare corresponding side lengths)' },
      { s: 'Conclusion', r: { part: 3 }, wide: true }
    ];
    return {
      section: similar ? '4.6' : '4.4',
      prompt: tri('ABC') + ' (blue) has vertices A' + pt(P[0]) + ', B' + pt(P[1]) + ', C' + pt(P[2]) + '. ' + tri('DEF') + ' (red) has vertices D' + pt(Q[0]) + ', E' + pt(Q[1]) + ', F' + pt(Q[2]) + '. Complete the justification (A\u2192D, B\u2192E, C\u2192F).',
      svg: gridSVG({ polys: [{ pts: P, names: ['A', 'B', 'C'] }, { pts: Q, names: ['D', 'E', 'F'], cls: 'img' }] }),
      proof: { given: tri('ABC') + ' and ' + tri('DEF') + ' as shown', prove: similar ? 'Describe a similarity transformation that maps ' + tri('ABC') + ' to ' + tri('DEF') : 'Describe a congruence transformation that maps ' + tri('ABC') + ' to ' + tri('DEF'), table: table },
      parts: parts,
      explanation: chainDesc([s1, s2]) + ' maps ' + tri('ABC') + ' to ' + tri('DEF') + ' (check every vertex). Side lengths: <i>DE</i> \u00F7 <i>AB</i> = ' + fracHTML(kk) + ' (a length ratio is never negative). ' + (similar ? 'A <b>similarity transformation</b> is a dilation combined with rigid motions; |<i>k</i>| = ' + fracHTML(Fr(Math.abs(s1.k.n), s1.k.d)) + ' \u2260 1 changes the size, so the triangles are <b>similar but not congruent</b>.' : 'Reflections, rotations, and translations are <b>rigid motions</b>, and a composition of rigid motions is a rigid motion (<b>Composition Theorem</b>), so the triangles are <b>congruent</b>.'),
      params: { P: P, P1: P1, Q: Q, o1: o1, o2: o2, s1: s1, s2: s2, similar: similar, concl: cOrd.map(i => concl[i]) }
    };
  }
} });

/* 3.2 multi-step: parallel lines + triangle ----------------------------- */
// Sectors (math degrees, counterclockwise, y up). P is on line m (top); Q and R are on line n (bottom).
function triSectors(al, be) {
  const ga = 180 - al - be;
  return {
    P1: { v: 'P', a0: 0, a1: al, val: al, side: 'L', pos: 'TR', i: 0 },
    P2: { v: 'P', a0: al, a1: 180 - be, val: ga, apex: true },
    P3: { v: 'P', a0: 180 - be, a1: 180, val: be, side: 'R', pos: 'TL', i: 0 },
    P4: { v: 'P', a0: 180, a1: 180 + al, val: al, side: 'L', pos: 'BL', i: 0 },
    P5: { v: 'P', a0: 180 + al, a1: 360 - be, val: ga, apex: true, inside: true },
    P6: { v: 'P', a0: 360 - be, a1: 360, val: be, side: 'R', pos: 'BR', i: 0 },
    Q1: { v: 'Q', a0: 0, a1: al, val: al, side: 'L', pos: 'TR', i: 1, inside: true },
    Q2: { v: 'Q', a0: al, a1: 180, val: 180 - al, side: 'L', pos: 'TL', i: 1 },
    Q3: { v: 'Q', a0: 180, a1: 180 + al, val: al, side: 'L', pos: 'BL', i: 1 },
    Q4: { v: 'Q', a0: 180 + al, a1: 360, val: 180 - al, side: 'L', pos: 'BR', i: 1 },
    R1: { v: 'R', a0: 0, a1: 180 - be, val: 180 - be, side: 'R', pos: 'TR', i: 1 },
    R2: { v: 'R', a0: 180 - be, a1: 180, val: be, side: 'R', pos: 'TL', i: 1, inside: true },
    R3: { v: 'R', a0: 180, a1: 360 - be, val: 180 - be, side: 'R', pos: 'BL', i: 1 },
    R4: { v: 'R', a0: 360 - be, a1: 360, val: be, side: 'R', pos: 'BR', i: 1 }
  };
}
function triSVG(al, be, labels) { // labels: {sectorId: text}; returns null if labels collide
  const h = 130, yM = 70, yN = yM + h, W = 440;
  const dq = h / Math.tan(al * Math.PI / 180), dr = h / Math.tan(be * Math.PI / 180);
  const Px = Math.round(W / 2 + (dq - dr) / 2);
  const V = { P: [Px, yM], Q: [Px - dq, yN], R: [Px + dr, yN] };
  const ext = (A, B, e1, e2) => { const L = Math.hypot(B[0] - A[0], B[1] - A[1]), u = [(B[0] - A[0]) / L, (B[1] - A[1]) / L]; return [A[0] - u[0] * e1, A[1] - u[1] * e1, B[0] + u[0] * e2, B[1] + u[1] * e2]; };
  const segs = [[12, yM, W - 12, yM], [12, yN, W - 12, yN], ext(V.Q, V.P, 38, 48), ext(V.R, V.P, 38, 48)];
  const S = triSectors(al, be);
  let s = svgOpen(W, 250, 'aria-label="parallel lines m and n with a triangle"');
  segs.forEach(g => { s += line(g[0], g[1], g[2], g[3]); });
  s += chevron(W - 60, yM) + chevron(W - 60, yN) + text(W - 14, yM - 9, 'm', 'class="lname" text-anchor="end"') + text(W - 14, yN - 9, 'n', 'class="lname" text-anchor="end"');
  const boxes = [];
  for (const id of Object.keys(labels)) {
    const sec = S[id], lab = labels[id], O = V[sec.v];
    let x, y, anchor;
    if (id === 'P5') { const d = 0.42 * h; x = Px + (d / Math.tan(be * Math.PI / 180) - d / Math.tan(al * Math.PI / 180)) / 2; y = yM + d; anchor = 'middle'; }
    else {
      const mid = (sec.a0 + sec.a1) / 2 * Math.PI / 180, wdt = (sec.a1 - sec.a0) * Math.PI / 180;
      const small = /^\d$/.test(lab);
      let r = (small ? 14 : 20) / Math.sin(wdt / 2); r = Math.max(small ? 16 : 24, Math.min(small ? 34 : 52, r));
      x = O[0] + r * Math.cos(mid); y = O[1] - r * Math.sin(mid);
      const c = Math.cos(mid); anchor = small ? 'middle' : (c > 0.35 ? 'start' : c < -0.35 ? 'end' : 'middle');
    }
    const b = labelBox(x, y, lab, anchor);
    if (b[0] < 2 || b[2] > W - 2 || b[1] < 2 || b[3] > 248) return null;
    if (boxes.some(o => boxHit(o, b)) || segs.some(g => segHitsBox(g, b))) return null;
    boxes.push(b);
    s += text(x, y, lab, 'class="' + (/^\d$/.test(lab) ? 'anum' : 'alab') + '" text-anchor="' + anchor + '" dominant-baseline="middle"');
  }
  return s + '</svg>';
}
const exPlain = (a, b, v) => linExpr(a, b, v).replace(/\u00B0/g, '');
H.push({ id: 'angleTriangle', section: '3.2', gen(rng) {
  for (let guard = 0; ; guard++) {
    const al = rng.int(42, 74), be = rng.int(42, 74), ga = 180 - al - be;
    if (ga < 58) continue;
    const S = triSectors(al, be), xs = rng.pick(['L', 'R']), os = xs === 'L' ? 'R' : 'L';
    const ids = Object.keys(S);
    const bottomX = xs === 'L' ? 'Q' : 'R', bottomO = xs === 'L' ? 'R' : 'Q';
    const gId = rng.pick(ids.filter(k => S[k].v === bottomO));
    const x1 = rng.pick(ids.filter(k => S[k].v === 'P' && S[k].side === xs));
    const x2 = rng.pick(ids.filter(k => S[k].v === bottomX));
    const yId = rng.pick(['P2', 'P5']);
    const tId = rng.pick(ids.filter(k => S[k].v === bottomX && k !== x2));
    // the region below n between the two extended sides holds Q4 and R3; never label both (it would be ambiguous)
    if ([gId, x2, tId].indexOf('Q4') >= 0 && [gId, x2, tId].indexOf('R3') >= 0) continue;
    const v1 = S[x1].val, v2 = S[x2].val, gv = S[gId].val;
    const x = rng.int(6, 24), a1 = rng.int(2, 9), a2 = rng.int(2, 9);
    const b1 = v1 - a1 * x, b2 = v2 - a2 * x;
    const isCong = v1 === v2;
    if (isCong && a1 === a2) continue;
    if (Math.abs(b1) > 70 || Math.abs(b2) > 70 || b1 === 0 || b2 === 0) continue;
    const yv = rng.int(5, 25), a3 = rng.int(2, 7), b3 = ga - a3 * yv;
    if (Math.abs(b3) > 70 || b3 === 0) continue;
    const E1 = linExpr(a1, b1, 'x'), E2 = linExpr(a2, b2, 'x'), E3 = linExpr(a3, b3, 'y');
    const labels = {}; labels[gId] = deg(gv); labels[x1] = E1; labels[x2] = E2; labels[yId] = E3; labels[tId] = '1';
    const svg = triSVG(al, be, labels);
    if (!svg) continue;
    const rel = relation({ i: 0, p: S[x1].pos }, { i: 1, p: S[x2].pos });
    const pairName = rel ? RELNAME[rel] : null;
    const thName = rel ? THM[rel] : null;
    const bVal = xs === 'L' ? al : be, oVal = xs === 'L' ? be : al;
    const eq1 = isCong ? exPlain(a1, b1, 'x') + ' = ' + exPlain(a2, b2, 'x') : exPlain(a1, b1, 'x') + ' + ' + exPlain(a2, b2, 'x') + ' = 180';
    let why1;
    if (rel && (rel !== 'consecExterior')) why1 = 'The angles labeled ' + E1 + ' and ' + E2 + ' are ' + pairName + ' for the parallel lines, so by the <b>' + thName + '</b> they are ' + (isCong ? 'congruent' : 'supplementary') + ': ';
    else why1 = 'The angles labeled ' + E1 + ' and ' + E2 + ' are not a named pair. One of them forms a <b>linear pair</b> (Linear Pair Postulate) with an angle that pairs with the other (Corresponding/Alternate Angles Theorem), so they are ' + (isCong ? 'congruent' : 'supplementary') + ': ';
    const angT = S[tId].val;
    return {
      prompt: '<i>m</i> ' + PAR + ' <i>n</i>. Find the values of <i>x</i> and <i>y</i>. Then find m' + ANG + '1.',
      svg: svg,
      parts: [{ label: 'x =', type: 'num', answer: x }, { label: 'y =', type: 'num', answer: yv }, { label: 'm' + ANG + '1 =', type: 'num', answer: angT, unit: DEG }],
      explanation: why1 + eq1 + ' \u2192 <i>x</i> = ' + x + ', so that angle is ' + deg(v1) + '.<br>The ' + deg(gv) + ' angle tells you the triangle\u2019s other base angle is ' + deg(oVal) + ' (Linear Pair / Vertical Angles / Alternate Interior Angles). The angles at the vertex on <i>m</i> form a straight angle (or use the <b>Triangle Sum</b>): ' + exPlain(a3, b3, 'y') + ' = 180 ' + MINUS + ' ' + bVal + ' ' + MINUS + ' ' + oVal + ' = ' + ga + ' \u2192 <i>y</i> = ' + yv + '.<br>' + ANG + '1 is at the same vertex as ' + E2 + ' (vertical angles or a linear pair with it), so m' + ANG + '1 = ' + deg(angT) + '.',
      params: { al: al, be: be, labels: labels, sectors: { g: gId, x1: x1, x2: x2, y: yId, t: tId }, e1: [a1, b1], e2: [a2, b2], e3: [a3, b3] }
    };
  }
} });

/* 3.3 find x that makes m ∥ n — angles not directly paired ------------- */
H.push({ id: 'converseHard', section: '3.3', gen(rng) {
  for (;;) {
    const dir = rng.pick([1, -1]), A = rng.int(42, 75);
    const tops = ALL8.filter(q => q.i === 0), bots = ALL8.filter(q => q.i === 1);
    let p1 = rng.pick(tops), p2 = rng.pick(bots);
    const rl = relation(p1, p2);
    if (!(rl === null || rl === 'consecExterior')) continue;
    if (rng.chance(0.5)) { const t = p1; p1 = p2; p2 = t; }
    const V1 = angleVal(p1, dir, A), V2 = angleVal(p2, dir, A);
    if (V1 + V2 !== 180) continue;
    const x = rng.int(5, 25), a1 = rng.int(2, 9), a2 = rng.int(2, 9);
    const b1 = V1 - a1 * x, b2 = V2 - a2 * x;
    if (Math.abs(b1) > 60 || Math.abs(b2) > 60 || b1 === 0 || b2 === 0) continue;
    const E1 = linExpr(a1, b1, 'x'), E2 = linExpr(a2, b2, 'x');
    const c = nbrs(p2).filter(z => CONGREL[relation(p1, z)])[0];
    const rel = relation(p1, c);
    const labels = {}; labels[pkey(p1)] = E1; labels[pkey(p2)] = E2;
    return {
      prompt: 'Find the value of <i>x</i> that makes <i>m</i> ' + PAR + ' <i>n</i>. Then find the measure of the angle labeled ' + E1 + '.',
      svg: transversalSVG({ dir: dir, theta: A, labels: labels, names: ['m', 'n'] }),
      parts: [{ label: 'x =', type: 'num', answer: x }, { label: 'Angle =', type: 'num', answer: V1, unit: DEG }],
      explanation: 'The two labeled angles are <b>not</b> a corresponding, alternate, or consecutive interior pair, so first use a <b>linear pair</b>: the angle next to ' + E2 + ' on the same line measures 180' + DEG + ' ' + MINUS + ' ' + E2 + ' (<b>Linear Pair Postulate</b>). That angle and ' + E1 + ' are ' + RELNAME[rel] + ', so by the <b>' + CONV[rel] + '</b>, <i>m</i> ' + PAR + ' <i>n</i> when ' + exPlain(a1, b1, 'x') + ' = 180 ' + MINUS + ' ' + exPlain(a2, b2, 'x').replace(/^\((.*)\)$/, '($1)') + ', i.e. ' + exPlain(a1, b1, 'x') + ' + ' + exPlain(a2, b2, 'x') + ' = 180 \u2192 ' + (a1 + a2) + '<i>x</i> = ' + (180 - b1 - b2) + ' \u2192 <i>x</i> = ' + x + '. The angle is ' + a1 + '(' + x + ')' + (b1 < 0 ? ' ' + MINUS + ' ' + (-b1) : ' + ' + b1) + ' = ' + deg(V1) + '.',
      params: { dir: dir, A: A, e1: [pkey(p1), a1, b1], e2: [pkey(p2), a2, b2] }
    };
  }
} });

/* 3.5 parallel & perpendicular to a line in standard form ---------------- */
H.push({ id: 'lineStandard', section: '3.5', gen(rng) {
  for (;;) {
    const AB = rng.pick([[3, -4], [2, 3], [4, 5], [5, -2], [1, -3], [3, 2], [2, -5], [4, 3], [1, 4], [3, 5], [2, -3], [5, 3]]);
    const sg = rng.pick([1, -1]), a = AB[0] * sg, b = AB[1] * sg, c = rng.intNZ(-15, 15);
    const x0 = rng.chance(0.6) ? Fr(rng.intNZ(-9, 9), rng.pick([2, 3])) : Fr(rng.intNZ(-6, 6));
    const y0 = x0.d === 1 ? Fr(rng.intNZ(-9, 9), 2) : Fr(rng.int(-8, 8));
    if (x0.d === 1 && y0.d === 1) continue;
    const m = Fr(-a, b), mp = Fr(b, a);
    const bp = fsub(y0, fmul(m, x0)), bq = fsub(y0, fmul(mp, x0));
    if (fnum(fadd(fmul(Fr(a), x0), fmul(Fr(b), y0))) === c) continue; // point on the line
    if (bp.d > 12 || bq.d > 12 || Math.abs(fnum(bp)) > 20 || Math.abs(fnum(bq)) > 20) continue;
    const P = '(' + fracHTML(x0) + ', ' + fracHTML(y0) + ')';
    const bInt = Fr(c, b);
    return {
      prompt: 'Write an equation of the line that passes through <i>P</i>' + P + ' and is (a) <b>parallel</b> to and (b) <b>perpendicular</b> to the line ' + stdForm(a, b, c, true) + '.',
      parts: [{ label: '(a) Parallel:', type: 'line', answer: { m: m, b: bp } }, { label: '(b) Perpendicular:', type: 'line', answer: { m: mp, b: bq } }],
      explanation: 'First solve for <i>y</i>: ' + sn(b) + '<i>y</i> = ' + sn(-a) + '<i>x</i> + ' + sn(c) + ' \u2192 ' + lineEq(m, bInt, true) + '. The slope is ' + fracHTML(m) + '.<br>(a) Parallel lines have the <b>same slope</b>: ' + fracHTML(y0) + ' = ' + fracHTML(m) + '(' + fracHTML(x0) + ') + <i>b</i> \u2192 <i>b</i> = ' + fracHTML(bp) + ', so ' + lineEq(m, bp, true) + '.<br>(b) Perpendicular slopes are <b>negative reciprocals</b> (product ' + MINUS + '1): ' + fracHTML(mp) + '. ' + fracHTML(y0) + ' = ' + fracHTML(mp) + '(' + fracHTML(x0) + ') + <i>b</i> \u2192 <i>b</i> = ' + fracHTML(bq) + ', so ' + lineEq(mp, bq, true) + '.',
      params: { a: a, b: b, c: c, P: [fnum(x0), fnum(y0)] }
    };
  }
} });

/* 3.5 distance from a point to a line (must find the intersection) ------- */
H.push({ id: 'distHard', section: '3.5', gen(rng) {
  for (;;) {
    const half = rng.chance(0.45);
    const nrm = half ? rng.pick([[1, 1], [1, 3], [3, 1], [1, -1], [1, -3], [3, -1]]) : rng.pick([[3, 4], [4, 3], [1, 2], [2, 1], [1, -2], [2, -1], [3, -4], [4, -3], [1, 3], [3, -1]]);
    const a = nrm[0], b = nrm[1];
    const t = half ? rng.pick([-3 / 2, -1 / 2, 1 / 2, 3 / 2]) : rng.pick([-2, -1, 1, 2]);
    const A = [rng.int(-7, 7), rng.int(-7, 7)];
    const Fp = [A[0] - t * a, A[1] - t * b];
    const c = a * Fp[0] + b * Fp[1];
    if (!isInt(c) || c === 0 || !inR([Fp], 10)) continue;
    const n2 = a * a + b * b, rad = simplifyRadical(n2), dist = Math.abs(t) * Math.sqrt(n2);
    const useSI = rng.chance(0.4);
    const m = Fr(-a, b), bi = Fr(c, b);
    const lineTxt = useSI ? lineEq(m, bi, true) : stdForm(a, b, c, true);
    const key = radStr(Math.abs(t) * rad[0], rad[1]);
    return {
      prompt: 'Find the distance from point <i>A</i>' + pt(A) + ' to the line ' + lineTxt + '.<br><small>(a) Find the point where the perpendicular through <i>A</i> meets the line. (b) Find the distance (exact, or rounded to the nearest hundredth).</small>',
      parts: [{ label: '(a) Intersection point:', type: 'point', answer: Fp, key: fpt(Fp) }, { label: '(b) Distance:', type: 'num', answer: dist, approx: rad[1] !== 1, key: key, display: key + (rad[1] !== 1 ? ' \u2248 ' + dist.toFixed(2) : '') }],
      explanation: 'The distance from a point to a line is the length of the <b>perpendicular segment</b>. The line has slope ' + fracHTML(m) + ', so the perpendicular through <i>A</i> has slope ' + fracHTML(fdiv(Fr(-1), m)) + ' (negative reciprocal): ' + lineEq(fdiv(Fr(-1), m), fsub(Fr(A[1]), fmul(fdiv(Fr(-1), m), Fr(A[0]))), true) + '. Solve the system to get the intersection ' + fptH(Fp) + '. Distance Formula: \u221A((' + sn(A[0]) + ' ' + MINUS + ' ' + fT(Fp[0]) + ')\u00B2 + (' + sn(A[1]) + ' ' + MINUS + ' ' + fT(Fp[1]) + ')\u00B2) = ' + key + (rad[1] !== 1 ? ' \u2248 ' + dist.toFixed(2) : '') + '.',
      params: { A: A, a: a, b: b, c: c }
    };
  }
} });

/* 3.5 multi-step: parallel & perpendicular through A, foot, distance ------- */
H.push({ id: 'lineDist', section: '3.5', gen(rng) {
  for (;;) {
    const half = rng.chance(0.5);
    const nrm = half ? rng.pick([[1, 1], [1, 3], [3, 1], [1, -1], [1, -3], [3, -1], [3, 5], [5, 3], [1, 5], [5, -1]]) : rng.pick([[3, 4], [4, 3], [1, 2], [2, 1], [1, -2], [2, -1], [3, -4], [4, -3], [1, 3], [3, -1], [2, 3], [3, -2]]);
    const a = nrm[0], b = nrm[1]; // leading coefficient positive, like the textbook
    const t = half ? rng.pick([-3 / 2, -1 / 2, 1 / 2, 3 / 2]) : rng.pick([-2, -1, 1, 2]);
    let A, Fp;
    if (half && rng.chance(0.7)) { Fp = [rng.int(-6, 6), rng.int(-6, 6)]; A = [Fp[0] + t * a, Fp[1] + t * b]; } // A has fraction coordinates
    else { A = [rng.int(-7, 7), rng.int(-7, 7)]; Fp = [A[0] - t * a, A[1] - t * b]; }
    const c = a * Fp[0] + b * Fp[1];
    if (!isInt(c) || c === 0 || !inR([Fp, A], 9)) continue;
    const Af = A.map(toFr), m = Fr(-a, b), mp = Fr(b, a);
    const bp = fsub(Af[1], fmul(m, Af[0])), bq = fsub(Af[1], fmul(mp, Af[0]));
    if (bp.d > 12 || bq.d > 12 || Math.abs(fnum(bp)) > 25 || Math.abs(fnum(bq)) > 25) continue;
    const n2 = a * a + b * b, rad = simplifyRadical(n2), dist = Math.abs(t) * Math.sqrt(n2);
    const key = radStr(Math.abs(t) * rad[0], rad[1]);
    const L = stdForm(a, b, c, true);
    return {
      prompt: 'Point <i>A</i>' + fptH(A) + ' and the line ' + L + '.<br>(a) Write an equation of the line through <i>A</i> that is <b>parallel</b> to ' + L + '.<br>(b) Write an equation of the line through <i>A</i> that is <b>perpendicular</b> to ' + L + '.<br>(c) Find the point where your perpendicular line meets ' + L + '.<br>(d) Find the distance from <i>A</i> to the line (exact, or rounded to the nearest hundredth).',
      parts: [
        { label: '(a) Parallel line:', type: 'line', answer: { m: m, b: bp } },
        { label: '(b) Perpendicular line:', type: 'line', answer: { m: mp, b: bq } },
        { label: '(c) Intersection point:', type: 'point', answer: Fp, key: fpt(Fp) },
        { label: '(d) Distance:', type: 'num', answer: dist, approx: rad[1] !== 1, key: key, display: key + (rad[1] !== 1 ? ' \u2248 ' + dist.toFixed(2) : '') }
      ],
      explanation: 'Solve for <i>y</i>: ' + lineEq(m, Fr(c, b), true) + ', so the slope is ' + fracHTML(m) + '.<br>(a) Parallel lines have the <b>same slope</b>: <i>b</i> = ' + fracHTML(Af[1]) + ' ' + MINUS + ' (' + fracHTML(m) + ')(' + fracHTML(Af[0]) + ') = ' + fracHTML(bp) + ' \u2192 ' + lineEq(m, bp, true) + '.<br>(b) Perpendicular slopes are <b>negative reciprocals</b> (product ' + MINUS + '1): slope ' + fracHTML(mp) + ', <i>b</i> = ' + fracHTML(bq) + ' \u2192 ' + lineEq(mp, bq, true) + '.<br>(c) Solve the system of the given line and the perpendicular line: ' + fptH(Fp) + '.<br>(d) The distance from a point to a line is the length of the <b>perpendicular segment</b>. Distance Formula from <i>A</i> to ' + fptH(Fp) + ': ' + key + (rad[1] !== 1 ? ' \u2248 ' + dist.toFixed(2) : '') + '.',
      params: { A: A, a: a, b: b, c: c }
    };
  }
} });

/* 3.5 partition a directed segment ---------------------------------------- */
H.push({ id: 'partitionHard', section: '3.5', gen(rng) {
  for (;;) {
    const r = rng.pick([[3, 5], [5, 3], [2, 3], [3, 2], [1, 4], [4, 1], [3, 4], [4, 3], [2, 5], [5, 2], [1, 7], [3, 7], [7, 3], [1, 3], [3, 1]]);
    const s = r[0] + r[1];
    const A = [rng.int(-9, 6), rng.int(-9, 9)], B = [rng.int(-6, 9), rng.int(-9, 9)];
    if (A[0] === B[0] || A[1] === B[1]) continue;
    if ([A[0], A[1], B[0], B[1]].filter(v => v < 0).length < 2) continue;
    const P = [A[0] + r[0] * (B[0] - A[0]) / s, A[1] + r[0] * (B[1] - A[1]) / s];
    const fr = P.map(toFr);
    if (fr.filter(f => f.d !== 1).length > 1 || fr.some(f => [1, 2, 4, 5, 8].indexOf(f.d) < 0)) continue;
    if (fr.every(f => f.d === 1) && rng.chance(0.5)) continue;
    return {
      prompt: 'Find the coordinates of point <i>P</i> along the directed line segment <i>JK</i> from <i>J</i>' + pt(A) + ' to <i>K</i>' + pt(B) + ' so that the ratio of <i>JP</i> to <i>PK</i> is ' + r[0] + ' to ' + r[1] + '.',
      parts: [{ label: 'P =', type: 'point', answer: P, key: fpt(P) }],
      explanation: '<i>JP</i> : <i>PK</i> = ' + r[0] + ' : ' + r[1] + ' means <i>P</i> is ' + r[0] + '/' + s + ' of the way from <i>J</i> to <i>K</i> (part \u00F7 whole = ' + r[0] + '/(' + r[0] + ' + ' + r[1] + ')). Run = ' + sn(B[0] - A[0]) + ', rise = ' + sn(B[1] - A[1]) + '. <i>P</i> = (' + sn(A[0]) + ' + ' + r[0] + '/' + s + '\u00B7(' + sn(B[0] - A[0]) + '), ' + sn(A[1]) + ' + ' + r[0] + '/' + s + '\u00B7(' + sn(B[1] - A[1]) + ')) = ' + fptH(P) + (fr.some(f => f.d !== 1) ? ' = (' + P.map(v => sn(+v.toFixed(3))).join(', ') + ')' : '') + '.',
      params: { A: A, B: B, r: r }
    };
  }
} });

/* 3.5 quadrilateral from coordinates: parallel / perpendicular sides ------ */
H.push({ id: 'quadSides', section: '3.5', gen(rng) {
  for (;;) {
    const kind = rng.pick(['pgram', 'rect', 'trap', 'rtrap', 'none', 'none1']);
    const u0 = rng.pick([[1, 2], [2, 1], [1, -2], [3, 1], [1, 3], [2, 3], [3, -2], [1, 1], [2, -1], [1, -3]]);
    const A = [rng.int(-7, 2), rng.int(-7, 2)];
    let Q;
    const g = rng.int(1, 3), u = [u0[0] * g, u0[1] * g];
    if (kind === 'pgram' || kind === 'rect') {
      const w = kind === 'rect' ? (k => [-u0[1] * k, u0[0] * k])(rng.pick([1, 2, -1, -2])) : [rng.int(-4, 4), rng.int(-4, 4)];
      Q = [A, [A[0] + u[0], A[1] + u[1]], [A[0] + u[0] + w[0], A[1] + u[1] + w[1]], [A[0] + w[0], A[1] + w[1]]];
    } else if (kind === 'trap' || kind === 'rtrap') {
      const w = kind === 'rtrap' ? (k => [-u0[1] * k, u0[0] * k])(rng.pick([1, 2, -1, -2])) : [rng.int(-4, 4), rng.int(-4, 4)];
      let c = rng.int(1, 5); if (c === g) c = g + 1;
      const D = [A[0] + w[0], A[1] + w[1]];
      Q = [A, [A[0] + u[0], A[1] + u[1]], [D[0] + c * u0[0], D[1] + c * u0[1]], D];
    } else if (kind === 'none1') {
      const w = (k => [-u0[1] * k, u0[0] * k])(rng.pick([1, 2, -1, -2]));
      const B = [A[0] + u[0], A[1] + u[1]];
      Q = [A, B, [B[0] + w[0], B[1] + w[1]], [A[0] + rng.int(-3, 3) + w[0], A[1] + rng.int(-3, 3) + w[1] + rng.pick([-2, 2])]];
    } else Q = [A, [A[0] + rng.int(2, 7), A[1] + rng.int(-3, 3)], [A[0] + rng.int(2, 8), A[1] + rng.int(3, 8)], [A[0] + rng.int(-3, 2), A[1] + rng.int(2, 7)]];
    if (!inR(Q, 9)) continue;
    // must be a convex quadrilateral with vertices in order
    const crs = Q.map((p, i) => { const a = Q[(i + 1) % 4], b = Q[(i + 2) % 4]; return (a[0] - p[0]) * (b[1] - a[1]) - (a[1] - p[1]) * (b[0] - a[0]); });
    if (!(crs.every(v => v > 0) || crs.every(v => v < 0))) continue;
    const side = i => [Q[(i + 1) % 4][0] - Q[i][0], Q[(i + 1) % 4][1] - Q[i][1]];
    const S4 = [0, 1, 2, 3].map(side);
    const par = (p, q) => p[0] * q[1] - p[1] * q[0] === 0, perp = (p, q) => p[0] * q[0] + p[1] * q[1] === 0;
    if (S4.some(v => v[0] === 0)) continue; // avoid undefined slopes
    const ab = par(S4[0], S4[2]), bc = par(S4[1], S4[3]);
    const rights = [0, 1, 2, 3].filter(i => perp(S4[i], S4[(i + 1) % 4])).length;
    const want = { pgram: [1, 1, 0], rect: [1, 1, 4], trap: [1, 0, 0], rtrap: [1, 0, 2], none: [0, 0, 0], none1: [0, 0, 1] }[kind];
    if ((ab ? 1 : 0) !== want[0] || (bc ? 1 : 0) !== want[1] || rights !== want[2]) continue;
    const names = ['A', 'B', 'C', 'D'];
    const order = rng.chance(0.5) ? [0, 1, 2, 3] : [1, 2, 3, 0];
    const QQ = order.map(i => Q[i]);
    const S = [0, 1, 2, 3].map(i => [QQ[(i + 1) % 4][0] - QQ[i][0], QQ[(i + 1) % 4][1] - QQ[i][1]]);
    const p02 = par(S[0], S[2]), p13 = par(S[1], S[3]);
    const ans = p02 && p13 ? 2 : p02 ? 0 : p13 ? 1 : 3;
    const slope = v => fracHTML(Fr(v[1], v[0]));
    const segN = ['AB', 'BC', 'CD', 'DA'];
    const ov = s => '<span style="text-decoration:overline">' + s + '</span>';
    return {
      prompt: 'Quadrilateral <i>ABCD</i> has vertices ' + QQ.map((p, i) => names[i] + pt(p)).join(', ') + '.<br>(a) Which pairs of opposite sides are parallel? (b) How many right angles does <i>ABCD</i> have?',
      parts: [{ label: '(a)', type: 'mc', choices: [ov('AB') + ' ' + PAR + ' ' + ov('CD') + ' only', ov('BC') + ' ' + PAR + ' ' + ov('DA') + ' only', 'Both pairs', 'Neither pair'], answer: ans }, { label: '(b) Right angles:', type: 'num', answer: rights }],
      explanation: 'Slopes: ' + S.map((v, i) => segN[i] + ': ' + slope(v)).join(', ') + '. Equal slopes \u2192 <b>parallel</b>; slopes with product ' + MINUS + '1 \u2192 <b>perpendicular</b> (a right angle). ' + (ans === 3 ? 'No opposite sides have equal slopes.' : '') + ' Right angles: ' + rights + '.',
      params: { Q: QQ }
    };
  }
} });

/* ======================================================= ERROR ANALYSIS */
function mcFrom(rng, correct, wrongs) { const opts = rng.shuffle([correct].concat(wrongs)); return { choices: opts.map(o => o.t), answer: opts.indexOf(correct), tags: opts.map(o => o.tag) }; }
H.push({ id: 'errorCh3', section: '3.x', gen(rng) {
  const v = rng.pick(['perp', 'slope', 'consec', 'partition']);
  for (;;) {
    if (v === 'perp') {
      const nm = rng.pick([['j', 'k', '\u2113'], ['p', 'q', 'r'], ['a', 'b', 'c']]);
      const [j, k, l] = nm, I = s => '<i>' + s + '</i>';
      const topK = rng.chance(0.5), yk = topK ? 75 : 165, yl = topK ? 165 : 75;
      const svg = svgOpen(360, 230, 'aria-label="lines ' + nm.join(', ') + '"') + line(20, 75, 340, 75) + line(20, 165, 340, 165) + line(160, 15, 160, 220) +
        text(340, yk - 8, k, 'class="lname" text-anchor="end"') + text(340, yl - 8, l, 'class="lname" text-anchor="end"') + text(168, 28, j, 'class="lname"') +
        rmarkAt([160, yk], rng.pick(['TR', 'BR', 'TL', 'BL'])) + '</svg>';
      const mc = mcFrom(rng, { t: 'That ' + I(k) + ' ' + PAR + ' ' + I(l) + '. Then the Perpendicular Transversal Theorem would give ' + I(j) + ' ' + PERP + ' ' + I(l) + '.', tag: 'ptt' }, [
        { t: 'That ' + I(j) + ' ' + PAR + ' ' + I(k) + '. Then the Lines Perpendicular to a Transversal Theorem would give ' + I(j) + ' ' + PERP + ' ' + I(l) + '.', tag: 'lptt' },
        { t: 'That ' + I(k) + ' ' + PERP + ' ' + I(l) + '. Then the Linear Pair Perpendicular Theorem would give ' + I(j) + ' ' + PERP + ' ' + I(l) + '.', tag: 'lppt' },
        { t: 'Nothing is missing: the right angle at line ' + I(k) + ' proves ' + I(j) + ' ' + PERP + ' ' + I(l) + ' by the Vertical Angles Congruence Theorem.', tag: 'none' }]);
      return { section: '3.4', prompt: 'A student says, \u201CBecause ' + I(j) + ' ' + PERP + ' ' + I(k) + ', ' + I(j) + ' ' + PERP + ' ' + I(l) + '.\u201D What missing information is the student assuming from the diagram, and which theorem is the student trying to use?', svg: svg,
        parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
        explanation: 'Lines that <i>look</i> parallel are not known to be parallel. Only one right angle is marked, so the student is assuming ' + I(k) + ' ' + PAR + ' ' + I(l) + '. With that, the <b>Perpendicular Transversal Theorem</b> (a transversal perpendicular to one of two parallel lines is perpendicular to the other) would give ' + I(j) + ' ' + PERP + ' ' + I(l) + '.',
        params: { v: v, names: nm, yk: yk, tags: mc.tags } };
    }
    if (v === 'slope') {
      const a = rng.pick([2, 3, 4, 5, -2, -3, -5]), b = rng.pick([2, 3, 4, 5, -2, -3, -4, -5]), c = rng.intNZ(-12, 12);
      if (gcd(a, b) !== 1) continue;
      const m = Fr(-a, b), mp = Fr(b, a), stud = Fr(-1, a), w1 = Fr(-1, b);
      const vals = [fracText(mp), fracText(stud), fracText(w1), fracText(Fr(a))];
      if (new Set(vals).size < 4) continue;
      const mc = mcFrom(rng, { t: 'The student did not solve for <i>y</i> first. The slope of the line is ' + fracHTML(m) + ', so a perpendicular line has slope ' + fracHTML(mp) + '.', tag: 'ok' }, [
        { t: 'Perpendicular lines have the same slope, so the perpendicular slope should be ' + fracHTML(Fr(a)) + '.', tag: 'same' },
        { t: 'The student should take the negative reciprocal of the <i>y</i>-coefficient, so the perpendicular slope is ' + fracHTML(w1) + '.', tag: 'ycoef' },
        { t: 'The student is correct: the perpendicular slope is ' + fracHTML(stud) + '.', tag: 'correct' }]);
      return { section: '3.5', prompt: 'A student is writing a line perpendicular to ' + stdForm(a, b, c, true) + '. The student says, \u201CThe slope of this line is ' + sn(a) + ', the coefficient of <i>x</i>, so the perpendicular slope is ' + fracHTML(stud) + '.\u201D What is the error?',
        parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
        explanation: 'In standard form the coefficient of <i>x</i> is <b>not</b> the slope. Solve for <i>y</i>: ' + lineEq(m, Fr(c, b), true) + ', so the slope is ' + fracHTML(m) + '. Perpendicular slopes are negative reciprocals, so the perpendicular slope is ' + fracHTML(mp) + '.',
        params: { v: v, a: a, b: b, c: c, mp: fnum(mp), tags: mc.tags } };
    }
    if (v === 'consec') {
      const dir = rng.pick([1, -1]), A = rng.int(45, 75), side = rng.pick(['L', 'R']);
      const p1 = { i: 0, p: 'B' + side }, p2 = { i: 1, p: 'T' + side };
      const V1 = angleVal(p1, dir, A), V2 = 180 - V1;
      const x = rng.int(6, 22), a1 = rng.int(2, 8), a2 = rng.int(2, 8);
      if (a1 === a2) continue;
      const b1 = V1 - a1 * x, b2 = V2 - a2 * x;
      if (Math.abs(b1) > 60 || Math.abs(b2) > 60 || b1 === 0 || b2 === 0) continue;
      const fx = Fr(b2 - b1, a1 - a2), x90 = Fr(90 - b1 - b2, a1 + a2);
      if (fnum(fx) <= 0 || fnum(fx) === x || fnum(x90) === x || fnum(x90) === fnum(fx) || fnum(x90) <= 0) continue;
      const E1 = linExpr(a1, b1, 'x'), E2 = linExpr(a2, b2, 'x'), e1 = exPlain(a1, b1, 'x'), e2 = exPlain(a2, b2, 'x');
      const labels = {}; labels[pkey(p1)] = E1; labels[pkey(p2)] = E2;
      const mc = mcFrom(rng, { t: 'No. The angles are consecutive interior angles, so <i>m</i> ' + PAR + ' <i>n</i> when they are <b>supplementary</b>: ' + e1 + ' + ' + e2 + ' = 180, so <i>x</i> = ' + x + '.', tag: 'ok' }, [
        { t: 'Yes. Alternate interior angles are congruent, so <i>x</i> = ' + fracHTML(fx) + '.', tag: 'friend' },
        { t: 'No. The angles are corresponding angles, so they are congruent, and <i>x</i> = ' + fracHTML(fadd(fx, Fr(1))) + '.', tag: 'corr' },
        { t: 'No. The angles are vertical angles, so ' + e1 + ' + ' + e2 + ' = 90 and <i>x</i> = ' + fracHTML(x90) + '.', tag: 'vert' }]);
      return { section: '3.3', prompt: 'Your friend says, \u201CBy the Alternate Interior Angles Converse, <i>m</i> ' + PAR + ' <i>n</i> when ' + e1 + ' = ' + e2 + ', so <i>x</i> = ' + fracHTML(fx) + '.\u201D Is your friend correct? Explain.',
        svg: transversalSVG({ dir: dir, theta: A, labels: labels, names: ['m', 'n'] }),
        parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
        explanation: 'Both angles are between <i>m</i> and <i>n</i> on the <b>same side</b> of the transversal, so they are <b>consecutive interior angles</b>. By the <b>Consecutive Interior Angles Converse</b>, the lines are parallel when the angles are supplementary: ' + e1 + ' + ' + e2 + ' = 180 \u2192 ' + (a1 + a2) + '<i>x</i> = ' + (180 - b1 - b2) + ' \u2192 <i>x</i> = ' + x + '.',
        params: { v: v, dir: dir, A: A, e1: [pkey(p1), a1, b1], e2: [pkey(p2), a2, b2], x: x, tags: mc.tags } };
    }
    // partition
    const r = rng.pick([[2, 3], [3, 2], [1, 3], [3, 5], [1, 4], [2, 5], [3, 4]]), s = r[0] + r[1];
    const Ap = [rng.int(-8, 4), rng.int(-8, 8)], d = [rng.intNZ(-2, 2) * s, rng.intNZ(-2, 2) * s];
    const Bp = [Ap[0] + d[0], Ap[1] + d[1]];
    if (!inR([Bp], 12)) continue;
    const good = [Ap[0] + r[0] * d[0] / s, Ap[1] + r[0] * d[1] / s], bad = [Ap[0] + r[0] * d[0] / r[1], Ap[1] + r[0] * d[1] / r[1]];
    const fromB = [Bp[0] - r[0] * d[0] / s, Bp[1] - r[0] * d[1] / s], mid = [(Ap[0] + Bp[0]) / 2, (Ap[1] + Bp[1]) / 2];
    if ([bad, fromB, mid].some(p => eqP(p, good)) || eqP(fromB, mid) || eqP(bad, fromB) || eqP(bad, mid)) continue;
    const mc = mcFrom(rng, { t: 'The student used ' + r[0] + '/' + r[1] + '. <i>P</i> should be ' + r[0] + '/' + s + ' of the way from <i>A</i> to <i>B</i> (part \u00F7 whole), so <i>P</i> = ' + fptH(good) + '.', tag: 'ok' }, [
      { t: 'The student should have started at <i>B</i>: <i>P</i> = ' + fptH(fromB) + '.', tag: 'fromB' },
      { t: 'A ratio always means the midpoint, so <i>P</i> = ' + fptH(mid) + '.', tag: 'mid' },
      { t: 'The student is correct: <i>P</i> = ' + fptH(bad) + '.', tag: 'correct' }]);
    return { section: '3.5', prompt: 'To find point <i>P</i> on the directed segment from <i>A</i>' + pt(Ap) + ' to <i>B</i>' + pt(Bp) + ' so that <i>AP</i> : <i>PB</i> = ' + r[0] + ' : ' + r[1] + ', a student writes <i>P</i> = <i>A</i> + ' + r[0] + '/' + r[1] + '\u00B7(<i>B</i> ' + MINUS + ' <i>A</i>) = ' + fptH(bad) + '. What is the error?',
      parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
      explanation: 'A ratio of ' + r[0] + ' : ' + r[1] + ' splits the segment into ' + s + ' equal parts, and <i>P</i> is ' + r[0] + ' of them from <i>A</i>. So use the fraction ' + r[0] + '/' + s + ': <i>P</i> = ' + pt(Ap) + ' + ' + r[0] + '/' + s + '\u00B7' + vecT(d) + ' = ' + fptH(good) + '.',
      params: { v: 'partition', A: Ap, B: Bp, r: r, good: good, tags: mc.tags } };
  }
} });
const vecT = v => '\u27E8' + sn(v[0]) + ', ' + sn(v[1]) + '\u27E9';

H.push({ id: 'errorCh4', section: '4.x', gen(rng) {
  const v = rng.pick(['rot', 'dil', 'parrefl', 'rect', 'congsim']);
  for (;;) {
    if (v === 'rot') {
      const a = rng.intNZ(-7, 7), b = rng.intNZ(-7, 7); if (Math.abs(a) === Math.abs(b)) continue;
      const P = [a, b], stud = z0([b, -a]), good = z0([-b, a]);
      const mc = mcFrom(rng, { t: 'The student used the rule for a 270' + DEG + ' counterclockwise (90' + DEG + ' clockwise) rotation. The image should be ' + pt(good) + '.', tag: 'ok' }, [
        { t: 'The student used the rule for a 180' + DEG + ' rotation. The image should be ' + pt(z0([-a, -b])) + '.', tag: 'r180' },
        { t: 'The student reflected in the line <i>y</i> = <i>x</i>. The image should be ' + pt([b, a]) + '.', tag: 'yx' },
        { t: 'The student is correct.', tag: 'correct' }]);
      return { section: '4.3', prompt: 'A student rotates <i>P</i>' + pt(P) + ' 90' + DEG + ' <b>counterclockwise</b> about the origin and says the image is <i>P</i>' + PRIME + pt(stud) + '. What is the error?',
        parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
        explanation: 'Rotation of 90' + DEG + ' counterclockwise about the origin: (<i>a</i>, <i>b</i>) \u2192 (' + MINUS + '<i>b</i>, <i>a</i>). The rule (<i>a</i>, <i>b</i>) \u2192 (<i>b</i>, ' + MINUS + '<i>a</i>) is for 270' + DEG + ' counterclockwise. Correct image: ' + pt(good) + '.',
        params: { v: v, P: P, good: good, tags: mc.tags } };
    }
    if (v === 'dil') {
      const k = rng.pick([2, 3]), C = [rng.intNZ(-4, 4), rng.intNZ(-4, 4)], P = [rng.int(-5, 5), rng.int(-5, 5)];
      const good = [C[0] + k * (P[0] - C[0]), C[1] + k * (P[1] - C[1])], stud = [k * P[0], k * P[1]], add = [P[0] + k, P[1] + k];
      if (!inR([good, stud], 14) || eqP(good, stud) || eqP(good, add) || eqP(P, C)) continue;
      const mc = mcFrom(rng, { t: 'The center is not the origin. Multiply the distances from the center: <i>P</i>' + PRIME + ' = <i>C</i> + ' + k + '(<i>P</i> ' + MINUS + ' <i>C</i>) = ' + pt(good) + '.', tag: 'ok' }, [
        { t: 'A dilation adds the scale factor to each coordinate, so <i>P</i>' + PRIME + ' = ' + pt(add) + '.', tag: 'add' },
        { t: 'The student should have dilated the center instead: ' + pt([k * C[0], k * C[1]]) + '.', tag: 'center' },
        { t: 'The student is correct: dilations always multiply the coordinates by <i>k</i>.', tag: 'correct' }]);
      return { section: '4.5', prompt: 'A student dilates <i>P</i>' + pt(P) + ' using center <i>C</i>' + pt(C) + ' and scale factor ' + k + ', and says the image is <i>P</i>' + PRIME + pt(stud) + '. What is the error?',
        parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
        explanation: '(<i>x</i>, <i>y</i>) \u2192 (<i>kx</i>, <i>ky</i>) only works when the center is the <b>origin</b>. Here, the vector from <i>C</i> to <i>P</i> is ' + vecT([P[0] - C[0], P[1] - C[1]]) + '; multiply it by ' + k + ' and add it to <i>C</i>: ' + pt(good) + '.',
        params: { v: v, k: k, C: C, P: P, good: good, tags: mc.tags } };
    }
    if (v === 'parrefl') {
      const k1 = rng.int(-4, 3), k2 = k1 + rng.pick([-4, -3, -2, 2, 3, 4]), d = k2 - k1, ax = rng.pick(['x', 'y']);
      const dirW = ax === 'x' ? (d > 0 ? 'right' : 'left') : (d > 0 ? 'up' : 'down'), opp = { right: 'left', left: 'right', up: 'down', down: 'up' }[dirW];
      const mc = mcFrom(rng, { t: 'No. It is a translation of ' + (2 * Math.abs(d)) + ' units ' + dirW + ' \u2014 twice the distance between the lines.', tag: 'ok' }, [
        { t: 'No. It is a translation of ' + Math.abs(d) + ' units ' + opp + '.', tag: 'opp' },
        { t: 'Yes. The translation distance equals the distance between the lines.', tag: 'friend' },
        { t: 'No. Reflecting in two lines is always a rotation of 180' + DEG + '.', tag: 'rot' }]);
      return { section: '4.4', prompt: 'A figure is reflected in the line <i>' + ax + '</i> = ' + sn(k1) + ' and then in the line <i>' + ax + '</i> = ' + sn(k2) + '. Your friend says the result is a translation of ' + Math.abs(d) + ' units ' + dirW + '. Is your friend correct?',
        parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
        explanation: 'By the <b>Reflections in Parallel Lines Theorem</b>, the composition is a translation perpendicular to the lines, of <b>twice</b> the distance between them: 2 \u00D7 ' + Math.abs(d) + ' = ' + (2 * Math.abs(d)) + ' units ' + dirW + ' (from the first line toward the second).',
        params: { v: v, k1: k1, k2: k2, ax: ax, tags: mc.tags } };
    }
    if (v === 'rect') {
      const sym = rng.chance(0.5), p = rng.int(1, 5), r = sym ? p : p + rng.pick([-1, 1, 2, 3]), q = rng.int(1, 5), s = rng.int(1, 5);
      if (r <= 0 && !sym) continue;
      const Wp = [-p, q], Xp = [r, q], Yp = [r, -s], Zp = [-p, -s];
      const img = [Wp, Xp, Yp, Zp].map(t => z0([-t[0], t[1]]));
      const mc = mcFrom(rng, sym ? { t: 'Yes. The rectangle is symmetric about the <i>y</i>-axis, so its image covers exactly the same points (W' + PRIME + ' lands on X, X' + PRIME + ' on W, and so on).', tag: 'yes-sym' } : { t: 'No. The rectangle is not centered on the <i>y</i>-axis, so the image is in a different place: W' + PRIME + pt(img[0]) + ', X' + PRIME + pt(img[1]) + ', Y' + PRIME + pt(img[2]) + ', Z' + PRIME + pt(img[3]) + '.', tag: 'no-shift' }, [
        sym ? { t: 'No. The rectangle is not centered on the <i>y</i>-axis, so the image is in a different place.', tag: 'no-shift' } : { t: 'Yes. The rectangle is symmetric about the <i>y</i>-axis, so its image covers exactly the same points.', tag: 'yes-sym' },
        { t: 'Yes. A reflection never changes the position of a figure.', tag: 'never' },
        { t: 'No. The image is a 90' + DEG + ' rotation of the rectangle.', tag: 'rot' }]);
      return { section: '4.2', prompt: 'A rectangle has vertices W' + pt(Wp) + ', X' + pt(Xp) + ', Y' + pt(Yp) + ', and Z' + pt(Zp) + '. It is reflected in the <i>y</i>-axis. Your friend says that the image, rectangle W' + PRIME + 'X' + PRIME + 'Y' + PRIME + 'Z' + PRIME + ', is exactly the same as the preimage. Is your friend correct?',
        parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
        explanation: 'Reflection in the <i>y</i>-axis: (<i>a</i>, <i>b</i>) \u2192 (' + MINUS + '<i>a</i>, <i>b</i>). Images: ' + img.map((t, i) => 'WXYZ'[i] + PRIME + pt(t)).join(', ') + '. ' + (sym ? 'These are the same four points as the preimage (the rectangle has the <i>y</i>-axis as a <b>line of symmetry</b>), so your friend is correct.' : 'These are not the same four points, so your friend is not correct.'),
        params: { v: v, W: [Wp, Xp, Yp, Zp], sym: sym, tags: mc.tags } };
    }
    const k = rng.pick([2, 3, Fr(1, 2)].map(z => typeof z === 'number' ? Fr(z) : z)), mot = rng.pick(['a reflection in the <i>x</i>-axis', 'a rotation of 90' + DEG + ' about the origin', 'a translation 3 units left']);
    const mc = mcFrom(rng, { t: 'No. A dilation with <i>k</i> = ' + fracHTML(k) + ' changes every side length, so the triangles are <b>similar</b>, not congruent.', tag: 'ok' }, [
      { t: 'Yes. Dilations and reflections are both rigid motions.', tag: 'rigid' },
      { t: 'No. The triangles are neither congruent nor similar, because ' + mot.replace(/^a /, 'a ') + ' changes angle measures.', tag: 'neither' },
      { t: 'Yes. Congruent figures have the same angle measures, and dilations keep the angle measures.', tag: 'angles' }]);
    return { section: '4.6', prompt: 'Your friend says, \u201C' + tri('ABC') + ' ' + CONGS + ' ' + tri('DEF') + ', because a dilation with center at the origin and <i>k</i> = ' + fracHTML(k) + ' followed by ' + mot + ' maps ' + tri('ABC') + ' to ' + tri('DEF') + '.\u201D Is your friend correct?',
      parts: [{ type: 'mc', choices: mc.choices, answer: mc.answer }],
      explanation: 'Rigid motions (translations, reflections, rotations) preserve size. A dilation with |<i>k</i>| \u2260 1 does not: it multiplies every length by ' + fracHTML(k) + ' but keeps angle measures. A dilation followed by a rigid motion is a <b>similarity transformation</b>, so the triangles are similar, not congruent.',
      params: { v: 'congsim', k: k, tags: mc.tags } };
  }
} });

/* ====================================================== TRANSFORMATIONS */
const BKEYS = Object.keys(MAT);
function identifyBase(f) { const t = [[1, 2], [-3, 1]]; for (const b of BKEYS) { if (t.every(p => eqP(stepApply({ t: 'base', b: b }, p), f(p)))) return b; } return null; }
const REFL_BASE = { x: 'Rx', y: 'Ry', yx: 'Ryx', ynx: 'Rynx' }, ROT_BASE = { 90: 'R90', 180: 'R180', 270: 'R270' };
H.push({ id: 'composeThree', section: '4.1\u20134.3', gen(rng) {
  for (;;) {
    const Lk = rng.pick(['x', 'y', 'yx', 'ynx']), a = rng.pick([90, 180, 270]), v = [rng.intNZ(-5, 5), rng.intNZ(-5, 5)];
    const P = [rng.intNZ(-6, 6), rng.intNZ(-6, 6)];
    if (Math.abs(P[0]) === Math.abs(P[1])) continue;
    const f = p => ROT[a].f(REFL[Lk].f(p));
    const P1 = z0(REFL[Lk].f(P)), P2 = z0(ROT[a].f(P1)), P3 = [P2[0] + v[0], P2[1] + v[1]];
    if (!inR([P3], 11)) continue;
    const eq = identifyBase(f);
    const pool = [REFL_BASE[Lk], ROT_BASE[a]].filter(b => b !== eq).concat(rng.shuffle(BKEYS.filter(b => b !== eq && b !== REFL_BASE[Lk] && b !== ROT_BASE[a])));
    const opts = rng.shuffle([eq].concat(pool.slice(0, 3)));
    return {
      prompt: 'Point <i>P</i>' + pt(P) + ' is reflected in ' + REFL[Lk].name + ', then rotated ' + a + DEG + ' counterclockwise about the origin, then translated using ' + L.ruleText(v) + '.<br>(a) Find the final image <i>P</i>' + PRIME + PRIME + PRIME + '. (b) Which <b>single</b> transformation is the same as the reflection followed by the rotation?',
      parts: [{ label: '(a) P' + PRIME + PRIME + PRIME + ' =', type: 'point', answer: P3 }, { label: '(b)', type: 'mc', choices: opts.map(b => cap(BNAME[b])), answer: opts.indexOf(eq) }],
      explanation: 'Reflect (' + REFL[Lk].rule + '): ' + pt(P) + ' \u2192 ' + pt(P1) + '. Rotate ' + a + DEG + ' (' + ROT[a].rule + '): \u2192 ' + pt(P2) + '. Translate: \u2192 ' + pt(P3) + '.<br>(b) Follow a general point (<i>a</i>, <i>b</i>) through both rules: it ends at the image given by <b>' + BNAME[eq] + '</b>. (A reflection followed by a rotation is always a single reflection.)',
      params: { P: P, L: Lk, a: a, v: v, opts: opts }
    };
  }
} });

H.push({ id: 'glideImage', section: '4.2', gen(rng) {
  for (;;) {
    const horiz = rng.chance(0.5), k = rng.int(-3, 3), s = rng.intNZ(-5, 5);
    const P = randTri(rng, -6, 6);
    const tv = horiz ? [s, 0] : [0, s];
    const f = p => { const q = [p[0] + tv[0], p[1] + tv[1]]; return horiz ? [q[0], 2 * k - q[1]] : [2 * k - q[0], q[1]]; };
    const Q = P.map(f);
    if (!inR(Q, 10) || P.some(p => (horiz ? p[1] : p[0]) === k)) continue;
    const g = { polys: [{ pts: P, names: ['A', 'B', 'C'] }] };
    g[horiz ? 'hlines' : 'vlines'] = [{ k: k, label: (horiz ? 'y' : 'x') + ' = ' + sn(k) }];
    return {
      prompt: 'Find <i>A</i>' + DPRIME + ' and <i>B</i>' + DPRIME + ' after this <b>glide reflection</b> of ' + tri('ABC') + '.<br>Translation: ' + L.ruleText(tv).replace(/ \+ 0\)/, ')').replace(/ \+ 0,/, ',') + '<br>Reflection: in the line <i>' + (horiz ? 'y' : 'x') + '</i> = ' + sn(k),
      svg: gridSVG(g),
      parts: [{ label: 'A' + DPRIME + ' =', type: 'point', answer: Q[0] }, { label: 'B' + DPRIME + ' =', type: 'point', answer: Q[1] }],
      explanation: 'A <b>glide reflection</b> is a translation followed by a reflection in a line parallel to the translation. Translate, then reflect: each image is the same distance from <i>' + (horiz ? 'y' : 'x') + '</i> = ' + sn(k) + ' as the translated point, on the other side (' + (horiz ? '(<i>a</i>, <i>b</i>) \u2192 (<i>a</i>, 2(' + sn(k) + ') ' + MINUS + ' <i>b</i>)' : '(<i>a</i>, <i>b</i>) \u2192 (2(' + sn(k) + ') ' + MINUS + ' <i>a</i>, <i>b</i>)') + '). A' + pt(P[0]) + ' \u2192 ' + pt([P[0][0] + tv[0], P[0][1] + tv[1]]) + ' \u2192 ' + pt(Q[0]) + '; B' + pt(P[1]) + ' \u2192 ' + pt([P[1][0] + tv[0], P[1][1] + tv[1]]) + ' \u2192 ' + pt(Q[1]) + '.',
      params: { P: P, horiz: horiz, k: k, tv: tv }
    };
  }
} });

H.push({ id: 'symmetryHard', section: '4.2\u20134.3', gen(rng) {
  for (;;) {
    const n = rng.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]), base = 360 / n;
    const j = rng.int(1, n - 1), ansA = base * j;
    if (!isInt(ansA)) continue;
    const pool = [];
    for (let a = 10; a < 360; a += 5) if ((a * n) % 360 !== 0) pool.push(a);
    const near = pool.filter(a => [5, 6, 8, 9, 10, 12, 15, 18, 20].some(m => m !== n && (a * m) % 360 === 0));
    const wr = rng.shuffle(near).slice(0, 3);
    const opts = rng.shuffle([ansA].concat(wr));
    const svg = svgOpen(240, 210, 'aria-label="regular ' + n + '-gon"') + '<polygon points="' + regPoly(n, 90).map(p => r1(p[0] + 120) + ',' + r1(p[1] + 105)).join(' ') + '" class="shape"/></svg>';
    return {
      prompt: 'The figure is a <b>regular ' + n + '-gon</b>. Which rotation about its center maps the figure onto itself?',
      svg: svg,
      parts: [{ type: 'mc', choices: opts.map(a => 'A rotation of ' + a + DEG), answer: opts.indexOf(ansA) }],
      explanation: 'A regular <i>n</i>-gon has rotational symmetry for every multiple of 360' + DEG + ' \u00F7 <i>n</i>. Here 360' + DEG + ' \u00F7 ' + n + ' = ' + base + DEG + ', and ' + ansA + DEG + ' = ' + j + ' \u00D7 ' + base + DEG + '. The other angles are not multiples of ' + base + DEG + '.',
      params: { n: n, opts: opts }
    };
  }
} });

function specText(s) {
  if (s.t === 'tr') return 'A translation ' + moveText(s.v);
  if (s.t === 'rot') return 'A rotation of ' + (s.a === 180 ? '180' + DEG : (s.a === 90 || s.a === 45 ? s.a + DEG + ' counterclockwise' : (360 - s.a) + DEG + ' clockwise')) + ' about ' + (s.c[0] || s.c[1] ? fpt(s.c) : 'the origin');
  if (s.t === 'reflk') return 'A reflection in the line <i>' + s.ax + '</i> = ' + fT(s.k);
  return '';
}
H.push({ id: 'reflTwoLines', section: '4.4', gen(rng) {
  for (;;) {
    const kind = rng.pick(['par', 'perp']);
    const P = [rng.int(-6, 6), rng.int(-6, 6)];
    if (kind === 'par') {
      const ax = rng.pick(['x', 'y']), k1 = rng.int(-4, 4), k2 = k1 + rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]), d = k2 - k1;
      const r1v = ax === 'x' ? [2 * k1 - P[0], P[1]] : [P[0], 2 * k1 - P[1]], P2 = ax === 'x' ? [2 * k2 - r1v[0], P[1]] : [P[0], 2 * k2 - r1v[1]];
      if (!inR([r1v, P2], 10) || (ax === 'x' ? P[0] : P[1]) === k1) continue;
      const vv = ax === 'x' ? [2 * d, 0] : [0, 2 * d], v1 = ax === 'x' ? [d, 0] : [0, d], vm = ax === 'x' ? [-2 * d, 0] : [0, -2 * d];
      const truth = { t: 'tr', v: vv };
      const opts = rng.shuffle([truth, { t: 'tr', v: v1 }, { t: 'tr', v: vm }, { t: 'reflk', ax: ax, k: (k1 + k2) / 2 }]);
      const g = { points: [{ p: P, name: 'P' }] }; g[ax === 'x' ? 'vlines' : 'hlines'] = [{ k: k1, label: 'k' }, { k: k2, label: 'm' }];
      return {
        prompt: 'Point <i>P</i>' + pt(P) + ' is reflected in line <i>k</i>: <i>' + ax + '</i> = ' + sn(k1) + ', and then in line <i>m</i>: <i>' + ax + '</i> = ' + sn(k2) + '.<br>(a) Find <i>P</i>' + DPRIME + '. (b) Which single transformation maps <i>every</i> point the same way as this composition?',
        svg: gridSVG(g),
        parts: [{ label: '(a) P' + DPRIME + ' =', type: 'point', answer: P2 }, { label: '(b)', type: 'mc', choices: opts.map(specText), answer: opts.indexOf(truth) }],
        explanation: 'P \u2192 P' + PRIME + pt(r1v) + ' \u2192 P' + DPRIME + pt(P2) + '. By the <b>Reflections in Parallel Lines Theorem</b>, the composition is a translation perpendicular to the lines, <b>twice</b> the distance between them (2 \u00D7 ' + Math.abs(d) + ' = ' + (2 * Math.abs(d)) + ' units), in the direction from <i>k</i> to <i>m</i>.',
        params: { kind: kind, P: P, ax: ax, k1: k1, k2: k2, opts: opts }
      };
    }
    const h = rng.intNZ(-4, 4), k = rng.intNZ(-4, 4), first = rng.pick(['x', 'y']);
    const r1v = first === 'x' ? [2 * h - P[0], P[1]] : [P[0], 2 * k - P[1]];
    const P2 = [2 * h - P[0], 2 * k - P[1]];
    if (!inR([r1v, P2], 10) || eqP(P, [h, k]) || P[0] === h || P[1] === k) continue;
    const truth = { t: 'rot', c: [h, k], a: 180 };
    const opts = rng.shuffle([truth, { t: 'rot', c: [h, k], a: 90 }, { t: 'rot', c: [0, 0], a: 180 }, { t: 'tr', v: [2 * h, 2 * k] }]);
    const g = { points: [{ p: P, name: 'P' }], vlines: [{ k: h, label: 'x = ' + sn(h) }], hlines: [{ k: k, label: 'y = ' + sn(k) }] };
    const l1 = first === 'x' ? '<i>x</i> = ' + sn(h) : '<i>y</i> = ' + sn(k), l2 = first === 'x' ? '<i>y</i> = ' + sn(k) : '<i>x</i> = ' + sn(h);
    return {
      prompt: 'Point <i>P</i>' + pt(P) + ' is reflected in the line ' + l1 + ', and then in the line ' + l2 + '.<br>(a) Find <i>P</i>' + DPRIME + '. (b) Which single transformation maps <i>every</i> point the same way as this composition?',
      svg: gridSVG(g),
      parts: [{ label: '(a) P' + DPRIME + ' =', type: 'point', answer: P2 }, { label: '(b)', type: 'mc', choices: opts.map(specText), answer: opts.indexOf(truth) }],
      explanation: 'P \u2192 ' + pt(r1v) + ' \u2192 P' + DPRIME + pt(P2) + '. The lines are perpendicular and meet at ' + pt([h, k]) + '. By the <b>Reflections in Intersecting Lines Theorem</b>, the composition is a rotation about the intersection point of <b>twice</b> the angle between the lines: 2 \u00D7 90' + DEG + ' = 180' + DEG + ' about ' + pt([h, k]) + '.',
      params: { kind: kind, P: P, h: h, k: k, first: first, opts: opts }
    };
  }
} });

const LINE_ANG = { x: 0, yx: 45, y: 90, ynx: 135 };
const LNAME = { x: 'the <i>x</i>-axis', y: 'the <i>y</i>-axis', yx: 'the line <i>y</i> = <i>x</i>', ynx: 'the line <i>y</i> = ' + MINUS + '<i>x</i>' };
H.push({ id: 'reflIntersectHard', section: '4.4', gen(rng) {
  const ks = rng.shuffle(['x', 'y', 'yx', 'ynx']), L1 = ks[0], L2 = ks[1];
  const rot = (((2 * (LINE_ANG[L2] - LINE_ANG[L1])) % 360) + 360) % 360;
  const all = [90, 270, 180, 45, 315].filter(a => a !== rot);
  const opts = rng.shuffle([rot].concat(rng.shuffle(all).slice(0, 3)));
  const specs = opts.map(a => ({ t: 'rot', c: [0, 0], a: a }));
  const between = Math.abs(LINE_ANG[L2] - LINE_ANG[L1]), acute = Math.min(between, 180 - between);
  return {
    prompt: 'A figure is reflected in ' + LNAME[L1] + ' and then in ' + LNAME[L2] + '. Which single transformation is the same as this composition?',
    parts: [{ type: 'mc', choices: specs.map(specText), answer: opts.indexOf(rot) }],
    explanation: 'The lines intersect at the origin and form a ' + acute + DEG + ' angle. By the <b>Reflections in Intersecting Lines Theorem</b>, the composition is a rotation about the origin of <b>twice</b> that angle. Turning from ' + LNAME[L1] + ' to ' + LNAME[L2] + ' is ' + ((LINE_ANG[L2] - LINE_ANG[L1] + 180) % 180) + DEG + ' counterclockwise, so the rotation is ' + rot + DEG + ' counterclockwise' + (rot === 270 ? ' (= 90' + DEG + ' clockwise)' : '') + '. Check with a point: (1, 2) \u2192 ' + pt(z0(REFL[L1].f([1, 2]))) + ' \u2192 ' + pt(z0(REFL[L2].f(REFL[L1].f([1, 2])))) + '.',
    params: { L1: L1, L2: L2, opts: specs }
  };
} });

H.push({ id: 'dilateCenter', section: '4.5', gen(rng) {
  for (;;) {
    const k = rng.pick([Fr(2), Fr(3), Fr(1, 2), Fr(-1), Fr(-2), Fr(3, 2), Fr(-1, 2)]);
    const C = [rng.intNZ(-4, 4), rng.intNZ(-4, 4)];
    const P = randTri(rng, -6, 6);
    if (P.some(p => eqP(p, C))) continue;
    const Q = P.map(p => z0([C[0] + fnum(k) * (p[0] - C[0]), C[1] + fnum(k) * (p[1] - C[1])]));
    if (!inR(Q, 11)) continue;
    const anyFrac = Q.slice(0, 2).some(q => !isInt(q[0]) || !isInt(q[1]));
    if (k.d === 2 && !anyFrac && rng.chance(0.6)) continue;
    return {
      prompt: tri('JKL') + ' has vertices <i>J</i>' + pt(P[0]) + ', <i>K</i>' + pt(P[1]) + ', <i>L</i>' + pt(P[2]) + '. Find <i>J</i>' + PRIME + ' and <i>K</i>' + PRIME + ' after a dilation with <b>center <i>P</i>' + pt(C) + '</b> and scale factor <i>k</i> = ' + fracHTML(k) + '.',
      svg: gridSVG({ polys: [{ pts: P, names: ['J', 'K', 'L'] }], points: [{ p: C, name: 'P', cls: 'img' }] }),
      parts: [{ label: 'J' + PRIME + ' =', type: 'point', answer: Q[0], key: fpt(Q[0]) }, { label: 'K' + PRIME + ' =', type: 'point', answer: Q[1], key: fpt(Q[1]) }],
      explanation: 'The center is not the origin, so work with vectors from the center: image = <i>P</i> + <i>k</i>(vertex ' + MINUS + ' <i>P</i>). J: ' + pt(P[0]) + ' ' + MINUS + ' ' + pt(C) + ' = ' + vecT([P[0][0] - C[0], P[0][1] - C[1]]) + '; \u00D7 ' + fracHTML(k) + ' \u2192 add to <i>P</i>: ' + fptH(Q[0]) + '. K: ' + vecT([P[1][0] - C[0], P[1][1] - C[1]]) + ' \u2192 ' + fptH(Q[1]) + '.' + (k.n < 0 ? ' A negative scale factor puts the image on the opposite side of the center.' : ''),
      params: { k: k, C: C, P: P }
    };
  }
} });

H.push({ id: 'findCenterScale', section: '4.5', gen(rng) {
  for (;;) {
    const k = rng.pick([Fr(2), Fr(3), Fr(1, 2), Fr(-1, 2), Fr(-2), Fr(-1), Fr(3, 2), Fr(1, 3)]);
    const C = [rng.intNZ(-4, 4), rng.intNZ(-4, 4)];
    const d = k.d;
    const P = randTri(rng, -3, 3, d).map(p => [p[0] + C[0], p[1] + C[1]]);
    if (P.some(p => eqP(p, C))) continue;
    const Q = P.map(p => z0([C[0] + fnum(k) * (p[0] - C[0]), C[1] + fnum(k) * (p[1] - C[1])]));
    if (!inR(Q, 10) || !inR(P, 10) || Q.some(q => !isInt(q[0]) || !isInt(q[1]))) continue;
    return {
      prompt: tri('ABC') + ' (blue) is dilated to ' + tri('A' + PRIME + 'B' + PRIME + 'C' + PRIME) + ' (red). <i>A</i>' + pt(P[0]) + ', <i>B</i>' + pt(P[1]) + ', <i>C</i>' + pt(P[2]) + '; <i>A</i>' + PRIME + pt(Q[0]) + ', <i>B</i>' + PRIME + pt(Q[1]) + ', <i>C</i>' + PRIME + pt(Q[2]) + '.<br>(a) Find the center of dilation. (b) Find the scale factor <i>k</i>.',
      svg: gridSVG({ polys: [{ pts: P, names: ['A', 'B', 'C'] }, { pts: Q, names: ['A' + PRIME, 'B' + PRIME, 'C' + PRIME], cls: 'img' }] }),
      parts: [{ label: '(a) Center =', type: 'point', answer: C }, { label: '(b) k =', type: 'num', answer: fnum(k), key: fracText(k) }],
      explanation: 'Draw lines through each vertex and its image (<i>A</i><i>A</i>' + PRIME + ', <i>B</i><i>B</i>' + PRIME + ', ...). They all meet at the <b>center</b> ' + pt(C) + '. The scale factor compares distances from the center: <i>A</i>' + PRIME + ' ' + MINUS + ' center = ' + vecT([Q[0][0] - C[0], Q[0][1] - C[1]]) + ' and <i>A</i> ' + MINUS + ' center = ' + vecT([P[0][0] - C[0], P[0][1] - C[1]]) + ', so <i>k</i> = ' + fracHTML(k) + (k.n < 0 ? ' (negative: the image is on the opposite side of the center)' : '') + '.',
      params: { k: k, C: C, P: P, Q: Q }
    };
  }
} });

H.push({ id: 'similarityHard', section: '4.6', gen(rng) {
  for (;;) {
    const k = rng.pick([Fr(2), Fr(3), Fr(1, 2), Fr(-2), Fr(-1, 2), Fr(3, 2)]);
    const P = randTri(rng, -3, 3, k.d);
    const b = rng.pick([null, 'Rx', 'Ry', 'R90', 'R270', 'Ryx']);
    const v = rng.chance(b ? 0.6 : 1) ? [rng.intNZ(-4, 4), rng.intNZ(-4, 4)] : null;
    const truth = [{ t: 'dil', k: k }].concat(b ? [{ t: 'base', b: b }] : []).concat(v ? [{ t: 'tr', v: v }] : []);
    const Q = P.map(p => chainApply(truth, p));
    if (!inR(Q, 10) || !inR(P, 9)) continue;
    const SW = { Rx: 'Ry', Ry: 'Rx', R90: 'R270', R270: 'R90', Ryx: 'Rynx', Rynx: 'Ryx' };
    const cands = [];
    cands.push(truth.map(s => s.t === 'dil' ? { t: 'dil', k: fmul(s.k, Fr(-1)) } : s));
    cands.push(truth.map(s => s.t === 'dil' ? { t: 'dil', k: fdiv(Fr(1), s.k) } : s));
    if (v) cands.push([{ t: 'tr', v: v }].concat(truth.filter(s => s.t !== 'tr')));
    if (b) cands.push(truth.map(s => s.t === 'base' ? { t: 'base', b: SW[b] } : s));
    if (v) cands.push(truth.map(s => s.t === 'tr' ? { t: 'tr', v: [-s.v[0], -s.v[1]] } : s));
    if (v) cands.push(truth.map(s => s.t === 'tr' ? { t: 'tr', v: [s.v[1], s.v[0]] } : s));
    if (!b) cands.push(truth.slice(0, 1).concat([{ t: 'base', b: rng.pick(['Rx', 'Ry']) }]).concat(truth.slice(1)));
    const seen = new Set([chainDesc(truth)]), wrong = [];
    rng.shuffle(cands).forEach(c => { const d = chainDesc(c); if (wrong.length < 3 && !seen.has(d) && !sameList(P.map(p => chainApply(c, p)), Q)) { seen.add(d); wrong.push(c); } });
    if (wrong.length < 3) continue;
    const opts = rng.shuffle([truth].concat(wrong));
    const ak = Fr(Math.abs(k.n), k.d);
    return {
      prompt: tri('ABC') + ' (blue) has vertices <i>A</i>' + pt(P[0]) + ', <i>B</i>' + pt(P[1]) + ', <i>C</i>' + pt(P[2]) + '. ' + tri('DEF') + ' (red) has vertices <i>D</i>' + fpt(Q[0]) + ', <i>E</i>' + fpt(Q[1]) + ', <i>F</i>' + fpt(Q[2]) + '.<br>(a) Which similarity transformation maps ' + tri('ABC') + ' to ' + tri('DEF') + ' (A\u2192D, B\u2192E, C\u2192F)? Order matters! (b) <i>DE</i> \u00F7 <i>AB</i> = ?',
      svg: gridSVG({ polys: [{ pts: P, names: ['A', 'B', 'C'] }, { pts: Q, names: ['D', 'E', 'F'], cls: 'img' }] }),
      parts: [{ label: '(a)', type: 'mc', choices: opts.map(chainDesc), answer: opts.indexOf(truth) }, { label: '(b) DE \u00F7 AB =', type: 'num', answer: fnum(ak), key: fracText(ak) }],
      explanation: chainDesc(truth) + ' maps A' + pt(P[0]) + ' \u2192 D' + fpt(Q[0]) + ', B \u2192 E, C \u2192 F. Watch the details: a negative <i>k</i> also turns the figure 180' + DEG + '; translating <i>before</i> dilating moves the figure a different amount; and the wrong axis or turn direction gives a different image. Every length is multiplied by |<i>k</i>| = ' + fracHTML(ak) + ', so <i>DE</i> \u00F7 <i>AB</i> = ' + fracHTML(ak) + '.',
      params: { P: P, Q: Q, opts: opts, k: k }
    };
  }
} });

H.push({ id: 'congSimilar', section: '4.4\u20134.6', gen(rng) {
  for (;;) {
    const kind = rng.pick(['cong', 'sim', 'neither']);
    const base = randTri(rng, -4, 4); const P = base.concat([[base[0][0] + base[2][0] - base[1][0] + rng.pick([-1, 1]), base[0][1] + base[2][1] - base[1][1]]]);
    const crs = P.map((p, i) => { const a = P[(i + 1) % 4], c = P[(i + 2) % 4]; return (a[0] - p[0]) * (c[1] - a[1]) - (a[1] - p[1]) * (c[0] - a[0]); });
    if (!(crs.every(x => x > 0) || crs.every(x => x < 0)) || !inR(P, 6)) continue;
    let Q, truth, opts;
    const v = [rng.intNZ(-5, 5), rng.intNZ(-5, 5)];
    const say = { cong: 'Congruent: ', sim: 'Similar but not congruent: ', neither: 'Neither: ' };
    const NEI = 'Neither: corresponding side lengths are not proportional, so no similarity transformation maps one onto the other.';
    if (kind === 'cong') {
      truth = [{ t: 'base', b: rng.pick(BKEYS) }, { t: 'tr', v: v }];
      Q = P.map(p => chainApply(truth, p));
      const wrongR = [{ t: 'base', b: rng.pick(BKEYS.filter(x => x !== truth[0].b)) }, { t: 'tr', v: v }];
      opts = [{ verdict: 'cong', chain: truth }, { verdict: 'sim', chain: [{ t: 'dil', k: Fr(2) }].concat(truth) }, { verdict: 'neither' }, { verdict: 'cong', chain: wrongR }];
    } else if (kind === 'sim') {
      const k = rng.pick([Fr(2), Fr(3), Fr(-2), Fr(1, 2)]);
      const Pk = k.d > 1 ? P.map(p => [p[0] * 2, p[1] * 2]) : P;
      truth = [{ t: 'dil', k: k }, { t: 'tr', v: v }];
      Q = Pk.map(p => chainApply(truth, p));
      if (!inR(Pk, 10)) continue;
      P.splice(0, 4, ...Pk);
      opts = [{ verdict: 'sim', chain: truth }, { verdict: 'cong', chain: [{ t: 'tr', v: v }] }, { verdict: 'sim', chain: [{ t: 'dil', k: fdiv(Fr(1), k) }, { t: 'tr', v: v }] }, { verdict: 'neither' }];
    } else {
      const st = rng.pick([[2, 1], [1, 2], [3, 2], [2, 3]]);
      Q = P.map(p => [st[0] * p[0] + v[0], st[1] * p[1] + v[1]]);
      opts = [{ verdict: 'neither' }, { verdict: 'sim', chain: [{ t: 'dil', k: Fr(st[0]) }, { t: 'tr', v: v }] }, { verdict: 'sim', chain: [{ t: 'dil', k: Fr(st[1]) }, { t: 'tr', v: v }] }, { verdict: 'cong', chain: [{ t: 'tr', v: v }] }];
      if (st[0] === 1 || st[1] === 1) opts[st[0] === 1 ? 1 : 2] = { verdict: 'sim', chain: [{ t: 'dil', k: Fr(3) }, { t: 'tr', v: v }] };
    }
    if (!inR(Q, 12)) continue;
    const text0 = o => o.verdict === 'neither' ? NEI : say[o.verdict] + chainDesc(o.chain).replace(/^A/, 'a') + ' maps QRST onto WXYZ.';
    const texts = opts.map(text0);
    if (new Set(texts).size < 4) continue;
    const ord = rng.shuffle([0, 1, 2, 3]);
    const o2 = ord.map(i => opts[i]);
    const W = ['W', 'X', 'Y', 'Z'], N = ['Q', 'R', 'S', 'T'];
    return {
      prompt: 'Determine whether the polygons with the given vertices are congruent or similar. Use transformations to explain your reasoning.<br>' + N.map((n, i) => n + pt(P[i])).join(', ') + ' and ' + W.map((n, i) => n + pt(Q[i])).join(', '),
      parts: [{ type: 'mc', choices: o2.map(text0), answer: ord.indexOf(0) }],
      explanation: kind === 'neither' ? 'Compare corresponding sides: the horizontal stretch and the vertical stretch are different, so the side lengths are <b>not proportional</b> (and the angles change). No similarity transformation works, so the polygons are neither congruent nor similar.' : chainDesc(truth) + ' maps Q\u2192W, R\u2192X, S\u2192Y, T\u2192Z (check all four). ' + (kind === 'cong' ? 'Only <b>rigid motions</b> are used, so the polygons are <b>congruent</b>.' : 'It includes a dilation with |<i>k</i>| \u2260 1, so the polygons are <b>similar</b> but not congruent.'),
      params: { P: P, Q: Q, kind: kind, opts: o2 }
    };
  }
} });

/* ------------------------------------------------------------ build */
const ORDER_V1 = ['angleTriangle', 'converseHard', 'proofPar', 'proofPerp', 'errorCh3', 'lineStandard', 'distHard', 'partitionHard', 'quadSides',
  'composeThree', 'glideImage', 'symmetryHard', 'reflTwoLines', 'reflIntersectHard', 'proofTransform', 'congSimilar', 'errorCh4', 'dilateCenter', 'findCenterScale', 'similarityHard'];
// Real-test shape: 13 questions / 40 pts. Only 3 quick ones (1–2 pts); everything else is a 3–5 pt multi-step problem.
// An array entry = one question built from several parts (Part A, Part B). '|' = pick one at random.
const LAYOUT = ['angleTriangle', 'converseHard', 'proofPar', 'proofPerp', 'lineDist', ['quadSides', 'partitionHard'],
  ['composeThree', 'glideImage'], 'symmetryHard', ['reflTwoLines', 'reflIntersectHard'], 'proofTransform',
  ['dilateCenter', 'findCenterScale'], ['congSimilar', 'similarityHard'], 'errorCh3|errorCh4'];
function mkOne(rng, id) {
  const t = H.filter(z => z.id === id)[0];
  const q = t.gen(rng);
  q.tid = t.id; q.section = q.section || t.section; q.hard = true;
  q.parts.forEach(p => { p.keyText = keyText(p); p.answerHTML = answerHTML(p); });
  q.points = q.parts.length;
  return q;
}
function secSpan(list) { // ['4.1–4.3', '4.2'] -> '4.1–4.3'
  const nums = []; list.forEach(s => s.split('\u2013').forEach(x => { if (/^\d\.\d$/.test(x)) nums.push(x); }));
  if (!nums.length) return list[0];
  nums.sort(); return nums[0] === nums[nums.length - 1] ? nums[0] : nums[0] + '\u2013' + nums[nums.length - 1];
}
function generateHardTest(seed) {
  const rng = makeRng((seed ^ 0x5bd1e995) >>> 0);
  return LAYOUT.map((spec, i) => {
    let q;
    if (Array.isArray(spec)) {
      const blocks = spec.map(id => mkOne(rng, id)), parts = [];
      blocks.forEach((b, j) => { b.letter = 'ABCD'[j]; b.partOffset = parts.length; parts.push.apply(parts, b.parts); });
      q = { tid: spec.join('+'), blocks: blocks, parts: parts, prompt: '', hard: true, section: secSpan(blocks.map(b => b.section)),
        explanation: blocks.map(b => '<div class="blkexp"><b>Part ' + b.letter + ':</b> ' + b.explanation + '</div>').join(''), points: parts.length };
    } else {
      const ids = spec.split('|');
      q = mkOne(rng, ids.length > 1 ? rng.pick(ids) : ids[0]);
    }
    q.n = i + 1;
    q.quick = q.points <= 2;
    return q;
  });
}
const ORDER = LAYOUT;
G.generateHardTest = generateHardTest;
G.hardTemplates = H;
G.hardLib = { stmt: stmt, R: R, MAT: MAT, chainApply: chainApply, chainDesc: chainDesc, stepPlain: stepPlain, specText: specText, triSectors: triSectors, toFr: toFr, fpt: fpt, ORDER: ORDER };
return G;
});
