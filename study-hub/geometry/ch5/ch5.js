/* Geometry Ch 5 (Congruent Triangles) quiz generators. Browser: window.GeoQ.ch5; Node: module.exports. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('../questions.js'));
  else root.GeoQ.ch5 = factory(root.GeoQ);
})(typeof self !== 'undefined' ? self : this, function (G) {
'use strict';
const L = G.lib, MINUS = L.MINUS, makeRng = L.makeRng;
const DEG = '\u00B0', ANG = '\u2220', TRI = '\u25B3', CONG = '\u2245';
const ii = s => '<i>' + s + '</i>';
const ol = s => '<span style="text-decoration:overline">' + s + '</span>';
const steps = a => '<ol class="steps">' + a.map(s => '<li>' + s + '</li>').join('') + '</ol>';
const sn = n => n < 0 ? MINUS + (-n) : String(n);
function expr(c, v, k) { const core = (c === 1 ? '' : c === -1 ? MINUS : sn(c)) + v; return k === 0 ? core : core + (k < 0 ? ' ' + MINUS + ' ' + (-k) : ' + ' + k); }
const mc = (rng, correct, wrongs) => { const o = rng.shuffle([correct].concat(wrongs)); return { choices: o, answer: o.indexOf(correct) }; };
const num = (label, answer, extra) => Object.assign({ label, type: 'num', answer, key: String(answer) }, extra || {});
function radKey(sq) { const kr = L.simplifyRadical(sq); return kr[1] === 1 ? String(kr[0]) : (kr[0] === 1 ? '' : kr[0]) + '\u221A' + kr[1]; }
// expression pair a1*v+b1 = a2*v+b2 at integer v, both equal to target
function eqPair(rng, v, target, cmax) {
  for (let t = 0; ; t++) { const a1 = rng.int(2, cmax), a2 = rng.int(1, cmax); if (a1 === a2) continue; const b1 = target - a1 * v, b2 = target - a2 * v; if (t < 200 && (Math.abs(b1) > 60 || Math.abs(b2) > 60)) continue; return [a1, b1, a2, b2]; }
}
/* ---- simple triangle SVG: pts in a 320x210 box; opts: ang[i]=label, side[[i,j,label]], ticks[[i,j,n]], arcs[i]=n, ext {i, dir point}, right[i] */
function triSVG(P, names, o) {
  o = o || {}; const W = o.w || 320, H = o.h || 210;
  let s = L.svgOpen(W, H, 'aria-label="triangle figure"');
  const cx = (P[0][0] + P[1][0] + P[2][0]) / 3, cy = (P[0][1] + P[1][1] + P[2][1]) / 3;
  s += '<polygon points="' + P.map(p => p.join(',')).join(' ') + '" fill="#eff6ff" stroke="#111" stroke-width="2"/>';
  if (o.ext) { const e = o.ext; s += L.line(P[e.i][0], P[e.i][1], e.to[0], e.to[1], 'stroke="#111" stroke-width="2"'); }
  P.forEach((p, i) => { let dx = p[0] - cx, dy = p[1] - cy; const d = Math.hypot(dx, dy); s += L.text(p[0] + dx / d * 16, p[1] + dy / d * 16 + 5, names[i], 'font-weight="700" font-size="16" text-anchor="middle"'); });
  (o.ang || []).forEach((t, i) => { if (!t) return; const p = P[i]; s += L.text(p[0] + (cx - p[0]) * 0.33, p[1] + (cy - p[1]) * 0.33 + 5, t, 'font-size="13" fill="#1d4ed8" text-anchor="middle"'); });
  (o.ticks || []).forEach(t => { const a = P[t[0]], b = P[t[1]], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; let ux = b[0] - a[0], uy = b[1] - a[1]; const d = Math.hypot(ux, uy); ux /= d; uy /= d;
    for (let k = 0; k < t[2]; k++) { const off = (k - (t[2] - 1) / 2) * 5; s += L.line(mx + ux * off - uy * 6, my + uy * off + ux * 6, mx + ux * off + uy * 6, my + uy * off - ux * 6, 'stroke="#dc2626" stroke-width="2"'); } });
  (o.side || []).forEach(t => { const a = P[t[0]], b = P[t[1]], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; let dx = mx - cx, dy = my - cy; const d = Math.hypot(dx, dy) || 1; s += L.text(mx + dx / d * 16, my + dy / d * 16 + 5, t[2], 'font-size="13" fill="#065f46" text-anchor="middle"'); });
  if (o.extLabel) s += L.text(o.extLabel[0], o.extLabel[1], o.extLabel[2], 'font-size="13" fill="#b91c1c" text-anchor="middle"');
  return s + '</svg>';
}
const T = {};

/* 5.1 exterior angle theorem with algebra */
T.ext = { section: '5.1 Angles of Triangles', gen(rng) {
  for (;;) {
    const x = rng.int(4, 18), a1 = rng.int(1, 5), a2 = rng.int(1, 5), b1 = rng.int(-20, 30), b2 = rng.int(-20, 30);
    const A = a1 * x + b1, B = a2 * x + b2, E = A + B;
    if (A < 20 || B < 20 || E > 165) continue;
    const a3 = a1 + a2 + rng.pick([-2, -1, 1, 2, 3]); if (a3 < 1) continue;
    const b3 = E - a3 * x; if (Math.abs(b3) > 80) continue;
    const C = 180 - E;
    const ex = expr(a3, 'x', b3), ea = expr(a1, 'x', b1), eb = expr(a2, 'x', b2);
    const svg = triSVG([[40, 175], [150, 30], [220, 175]], ['A', 'B', 'C'], { ang: ['(' + ea + ')' + DEG, '(' + eb + ')' + DEG, ''], ext: { i: 2, to: [305, 175] }, extLabel: [262, 165, '(' + ex + ')' + DEG] });
    return {
      prompt: 'In ' + TRI + 'ABC, side ' + ol('AC') + ' is extended past ' + ii('C') + ' to point ' + ii('D') + '. m' + ANG + 'A = (' + ea + ')' + DEG + ', m' + ANG + 'B = (' + eb + ')' + DEG + ', and the exterior angle m' + ANG + 'BCD = (' + ex + ')' + DEG + '.<br>(a) Solve for ' + ii('x') + '. (b) Find m' + ANG + 'BCD. (c) Find m' + ANG + 'A. (d) Find m' + ANG + 'ACB.',
      svg, parts: [num('(a) <i>x</i>', x), num('(b) m' + ANG + 'BCD', E, { unit: DEG }), num('(c) m' + ANG + 'A', A, { unit: DEG }), num('(d) m' + ANG + 'ACB', C, { unit: DEG })],
      explanation: steps(['<b>Exterior Angle Theorem:</b> an exterior angle equals the sum of the two <i>remote</i> interior angles: ' + ex + ' = (' + ea + ') + (' + eb + ').',
        'Combine: ' + ex + ' = ' + expr(a1 + a2, 'x', b1 + b2) + ' \u2192 ' + ii('x') + ' = <b>' + x + '</b>.',
        'm' + ANG + 'BCD = ' + a3 + '(' + x + ') ' + (b3 < 0 ? MINUS + ' ' + (-b3) : '+ ' + b3) + ' = <b>' + E + DEG + '</b>; m' + ANG + 'A = <b>' + A + DEG + '</b> (and m' + ANG + 'B = ' + B + DEG + ', check ' + A + ' + ' + B + ' = ' + E + ' \u2713).',
        ANG + 'ACB and ' + ANG + 'BCD are a linear pair: 180 ' + MINUS + ' ' + E + ' = <b>' + C + DEG + '</b>. Check the Triangle Sum: ' + A + ' + ' + B + ' + ' + C + ' = 180 \u2713.']),
      check: { sum: A + B + C, ext: E, angles: [A, B, C] }
    };
  }
} };

/* 5.2 congruent polygons: corresponding parts + third angles */
T.congPoly = { section: '5.2 Congruent Polygons', gen(rng) {
  for (;;) {
    const perm = rng.shuffle([0, 1, 2]), D2 = ['D', 'E', 'F'];
    const nm = ['A', 'B', 'C'], img = perm.map(i => D2[i]); // A->img[0]...
    const A = rng.int(30, 90), B = rng.int(30, 100), C = 180 - A - B; if (C < 20) continue;
    const x = rng.int(3, 15), pr = eqPair(rng, x, A, 6);
    const side = rng.int(6, 25), y = rng.int(2, 9), q = eqPair(rng, y, side, 5);
    const corrC = ANG + img[2], wr = [ANG + img[0], ANG + img[1], ANG + 'C'].filter(s => s !== corrC);
    const m = mc(rng, corrC, wr);
    const second = TRI + img.join('');
    return {
      prompt: TRI + 'ABC ' + CONG + ' ' + second + '. m' + ANG + 'A = (' + expr(pr[0], 'x', pr[1]) + ')' + DEG + ', m' + ANG + img[0] + ' = (' + expr(pr[2], 'x', pr[3]) + ')' + DEG + ', m' + ANG + img[1] + ' = ' + B + DEG + ', AB = ' + expr(q[0], 'y', q[1]) + ', and ' + img[0] + img[1] + ' = ' + expr(q[2], 'y', q[3]) + '.<br>(a) Which angle corresponds to ' + ANG + 'C? (b) Solve for ' + ii('x') + '. (c) Solve for ' + ii('y') + '. (d) Find m' + ANG + img[2] + '.',
      parts: [{ label: '(a) corresponds to ' + ANG + 'C', type: 'mc', choices: m.choices, answer: m.answer }, num('(b) <i>x</i>', x), num('(c) <i>y</i>', y), num('(d) m' + ANG + img[2], C, { unit: DEG })],
      explanation: steps(['Order matters: in ' + TRI + 'ABC ' + CONG + ' ' + second + ', A\u2194' + img[0] + ', B\u2194' + img[1] + ', C\u2194' + img[2] + '. So ' + ANG + 'C corresponds to <b>' + corrC + '</b>.',
        ANG + 'A ' + CONG + ' ' + ANG + img[0] + ': ' + expr(pr[0], 'x', pr[1]) + ' = ' + expr(pr[2], 'x', pr[3]) + ' \u2192 ' + ii('x') + ' = <b>' + x + '</b> (each angle = ' + A + DEG + ').',
        ol('AB') + ' ' + CONG + ' ' + ol(img[0] + img[1]) + ': ' + expr(q[0], 'y', q[1]) + ' = ' + expr(q[2], 'y', q[3]) + ' \u2192 ' + ii('y') + ' = <b>' + y + '</b> (each side = ' + side + ').',
        '<b>Third Angles Theorem</b> / Triangle Sum: m' + ANG + img[2] + ' = 180 ' + MINUS + ' ' + A + ' ' + MINUS + ' ' + B + ' = <b>' + C + DEG + '</b>.']),
      check: { sum: A + B + C, angles: [A, B, C] }
    };
  }
} };

/* 5.3 SAS with algebra */
T.sas = { section: '5.3 SAS', gen(rng) {
  for (;;) {
    const x = rng.int(2, 10), s1 = rng.int(8, 30), p = eqPair(rng, x, s1, 6);
    const y = rng.int(3, 20), ang = rng.int(35, 130), q = eqPair(rng, y, ang, 6);
    const s2 = rng.int(5, 30);
    const m = mc(rng, 'SAS', ['SSS', 'ASA', 'AAS', 'Not enough information (SSA)']);
    const svgs = triSVG([[30, 170], [70, 40], [150, 170]], ['A', 'B', 'C'], { w: 160, h: 200, ticks: [[0, 1, 1], [1, 2, 2]], ang: ['', '?', ''] }) + ' ' + triSVG([[30, 170], [70, 40], [150, 170]], ['D', 'E', 'F'], { w: 160, h: 200, ticks: [[0, 1, 1], [1, 2, 2]], ang: ['', '?', ''] });
    return {
      prompt: 'In ' + TRI + 'ABC and ' + TRI + 'DEF: AB = ' + expr(p[0], 'x', p[1]) + ', DE = ' + expr(p[2], 'x', p[3]) + ', m' + ANG + 'B = (' + expr(q[0], 'y', q[1]) + ')' + DEG + ', m' + ANG + 'E = (' + expr(q[2], 'y', q[3]) + ')' + DEG + ', and BC = EF = ' + s2 + '.<br>(a) Find the value of ' + ii('x') + ' that makes ' + ol('AB') + ' ' + CONG + ' ' + ol('DE') + '. (b) Find the value of ' + ii('y') + ' that makes ' + ANG + 'B ' + CONG + ' ' + ANG + 'E. (c) With those values, which theorem proves ' + TRI + 'ABC ' + CONG + ' ' + TRI + 'DEF? (d) Find AB.',
      svg: svgs,
      parts: [num('(a) <i>x</i>', x), num('(b) <i>y</i>', y), { label: '(c) theorem', type: 'mc', choices: m.choices, answer: m.answer }, num('(d) AB', s1)],
      explanation: steps([expr(p[0], 'x', p[1]) + ' = ' + expr(p[2], 'x', p[3]) + ' \u2192 ' + ii('x') + ' = <b>' + x + '</b>.',
        expr(q[0], 'y', q[1]) + ' = ' + expr(q[2], 'y', q[3]) + ' \u2192 ' + ii('y') + ' = <b>' + y + '</b> (each angle = ' + ang + DEG + ').',
        ANG + 'B is between sides ' + ol('AB') + ' and ' + ol('BC') + ' (the <i>included</i> angle), and ' + ANG + 'E is between ' + ol('DE') + ' and ' + ol('EF') + '. Two sides and the included angle \u2192 <b>SAS</b>.',
        'AB = ' + p[0] + '(' + x + ') ' + (p[1] < 0 ? MINUS + ' ' + (-p[1]) : '+ ' + p[1]) + ' = <b>' + s1 + '</b>.']),
      check: { angles: [ang] }
    };
  }
} };

/* 5.4 isosceles: base angles + legs */
T.iso = { section: '5.4 Isosceles Triangles', gen(rng) {
  for (;;) {
    const variant = rng.chance(0.5) ? 'base' : 'vertex';
    const base = rng.int(25, 80), V = 180 - 2 * base; if (V < 15) continue;
    const x = rng.int(3, 16);
    const leg = rng.int(7, 30), y = rng.int(2, 9), q = eqPair(rng, y, leg, 5);
    let prompt, parts, ex1;
    if (variant === 'base') {
      const p = eqPair(rng, x, base, 6);
      prompt = 'In ' + TRI + 'ABC, ' + ol('AB') + ' ' + CONG + ' ' + ol('AC') + '. m' + ANG + 'B = (' + expr(p[0], 'x', p[1]) + ')' + DEG + ' and m' + ANG + 'C = (' + expr(p[2], 'x', p[3]) + ')' + DEG + '. AB = ' + expr(q[0], 'y', q[1]) + ' and AC = ' + expr(q[2], 'y', q[3]) + '.<br>(a) Solve for ' + ii('x') + '. (b) Find m' + ANG + 'B. (c) Find m' + ANG + 'A. (d) Solve for ' + ii('y') + '.';
      ex1 = '<b>Base Angles Theorem:</b> AB = AC, so the angles opposite them are congruent: ' + ANG + 'B ' + CONG + ' ' + ANG + 'C. ' + expr(p[0], 'x', p[1]) + ' = ' + expr(p[2], 'x', p[3]) + ' \u2192 ' + ii('x') + ' = <b>' + x + '</b>.';
    } else {
      const a = rng.int(2, 6), b = V - a * x; if (Math.abs(b) > 70) continue;
      const c = rng.int(1, 3), d = base - c * x;
      prompt = 'In ' + TRI + 'ABC, ' + ol('AB') + ' ' + CONG + ' ' + ol('AC') + '. The vertex angle m' + ANG + 'A = (' + expr(a, 'x', b) + ')' + DEG + ' and m' + ANG + 'B = (' + expr(c, 'x', d) + ')' + DEG + '. AB = ' + expr(q[0], 'y', q[1]) + ' and AC = ' + expr(q[2], 'y', q[3]) + '.<br>(a) Solve for ' + ii('x') + '. (b) Find m' + ANG + 'B. (c) Find m' + ANG + 'A. (d) Solve for ' + ii('y') + '.';
      ex1 = '<b>Base Angles Theorem:</b> ' + ANG + 'C ' + CONG + ' ' + ANG + 'B, so the Triangle Sum gives (' + expr(a, 'x', b) + ') + 2(' + expr(c, 'x', d) + ') = 180 \u2192 ' + expr(a + 2 * c, 'x', b + 2 * d) + ' = 180 \u2192 ' + ii('x') + ' = <b>' + x + '</b>.';
    }
    parts = [num('(a) <i>x</i>', x), num('(b) m' + ANG + 'B', base, { unit: DEG }), num('(c) m' + ANG + 'A', V, { unit: DEG }), num('(d) <i>y</i>', y)];
    return { prompt, parts,
      svg: triSVG([[160, 25], [60, 185], [260, 185]], ['A', 'B', 'C'], { ticks: [[0, 1, 1], [0, 2, 1]] }),
      explanation: steps([ex1, 'm' + ANG + 'B = m' + ANG + 'C = <b>' + base + DEG + '</b>.', 'm' + ANG + 'A = 180 ' + MINUS + ' 2(' + base + ') = <b>' + V + DEG + '</b>. Check: ' + V + ' + ' + base + ' + ' + base + ' = 180 \u2713.', 'Legs are congruent: ' + expr(q[0], 'y', q[1]) + ' = ' + expr(q[2], 'y', q[3]) + ' \u2192 ' + ii('y') + ' = <b>' + y + '</b> (each leg = ' + leg + ').']),
      check: { sum: V + 2 * base, angles: [V, base, base] } };
  }
} };

/* 5.5 / 5.6 choose the theorem (programmatically classified) */
const SIDES = [['AB', 'DE', 'A', 'B'], ['BC', 'EF', 'B', 'C'], ['AC', 'DF', 'A', 'C']];
const ANGS = [['A', 'D'], ['B', 'E'], ['C', 'F']];
const THM = ['SSS', 'SAS', 'ASA', 'AAS', 'HL', 'Not enough information'];
function classify(sides, angs, right) { // sides: indices into SIDES, angs: indices into ANGS, right: index of right angle or -1
  const S = sides.map(i => SIDES[i]), A = angs.map(i => ANGS[i][0]);
  if (sides.length === 3) return 'SSS';
  if (sides.length === 2 && angs.length === 1) {
    const a = A[0]; const incl = S.every(s => s[2] === a || s[3] === a);
    if (incl) return 'SAS';
    if (right === angs[0]) { const hyp = SIDES.filter(s => s[2] !== ANGS[right][0] && s[3] !== ANGS[right][0])[0][0]; if (S.some(s => s[0] === hyp)) return 'HL'; }
    return 'Not enough information';
  }
  if (sides.length === 1 && angs.length === 2) { const s = S[0]; return (A.indexOf(s[2]) >= 0 && A.indexOf(s[3]) >= 0) ? 'ASA' : 'AAS'; }
  return 'Not enough information';
}
function scenario(rng, want) {
  for (;;) {
    const kind = rng.pick(['SSS', 'SSA', 'SSA', 'SAA', 'SAA', 'AAA']);
    let sides = [], angs = [], right = -1;
    if (kind === 'SSS') sides = [0, 1, 2];
    else if (kind === 'AAA') angs = [0, 1, 2];
    else if (kind === 'SSA') { sides = rng.shuffle([0, 1, 2]).slice(0, 2); angs = [rng.int(0, 2)]; if (rng.chance(0.45)) right = angs[0]; }
    else { sides = [rng.int(0, 2)]; angs = rng.shuffle([0, 1, 2]).slice(0, 2); }
    const ans = classify(sides, angs, right);
    if (want && ans !== want) continue;
    const facts = sides.map(i => ol(SIDES[i][0]) + ' ' + CONG + ' ' + ol(SIDES[i][1])).concat(angs.map(i => ANG + ANGS[i][0] + ' ' + CONG + ' ' + ANG + ANGS[i][1] + (right === i ? ' (both right angles)' : '')));
    return { text: rng.shuffle(facts).join(', '), ans, sides, angs, right };
  }
}
const WHY = { SSS: 'all three pairs of sides', SAS: 'two sides and the angle <i>between</i> them', ASA: 'two angles and the side <i>between</i> them', AAS: 'two angles and a side that is <i>not</i> between them', HL: 'right triangles with the hypotenuse and a leg', 'Not enough information': 'SSA (angle not between the sides, not a right-triangle hypotenuse case) or AAA, which do not guarantee congruence' };
T.thmPick = { section: '5.5 SSS & HL / 5.6 ASA & AAS', gen(rng) {
  const wants = rng.shuffle(['Not enough information', rng.pick(['HL', 'SSS']), rng.pick(['ASA', 'AAS']), rng.pick(['SAS', 'AAS', 'Not enough information', 'HL'])]);
  const sc = wants.map(w => scenario(rng, w));
  return {
    prompt: 'For each part, ' + TRI + 'ABC and ' + TRI + 'DEF have the given congruent parts (A\u2194D, B\u2194E, C\u2194F). Which theorem, if any, proves ' + TRI + 'ABC ' + CONG + ' ' + TRI + 'DEF?<br>' + sc.map((s, i) => '(' + 'abcd'[i] + ') ' + s.text).join('<br>'),
    parts: sc.map((s, i) => ({ label: '(' + 'abcd'[i] + ') ' + s.text, type: 'select', choices: THM.slice(), answer: THM.indexOf(s.ans) })),
    explanation: steps(sc.map((s, i) => '(' + 'abcd'[i] + ') <b>' + s.ans + '</b> \u2014 ' + WHY[s.ans] + '.')),
    check: { scen: sc }
  };
} };

/* 5.6 ASA/AAS with algebra */
T.aas = { section: '5.6 ASA & AAS', gen(rng) {
  for (;;) {
    const A = rng.int(30, 90), B = rng.int(30, 90), C = 180 - A - B; if (C < 20) continue;
    const x = rng.int(3, 15), p = eqPair(rng, x, A, 6);
    const incl = rng.chance(0.5), s = rng.int(6, 28), y = rng.int(2, 9), q = eqPair(rng, y, s, 5);
    const sd = incl ? ['AB', 'DE'] : ['BC', 'EF'];
    const m = mc(rng, incl ? 'ASA' : 'AAS', [incl ? 'AAS' : 'ASA', 'SAS', 'SSA \u2014 not enough information']);
    return {
      prompt: 'In ' + TRI + 'ABC and ' + TRI + 'DEF: m' + ANG + 'A = (' + expr(p[0], 'x', p[1]) + ')' + DEG + ', m' + ANG + 'D = (' + expr(p[2], 'x', p[3]) + ')' + DEG + ', m' + ANG + 'B = m' + ANG + 'E = ' + B + DEG + ', ' + sd[0] + ' = ' + expr(q[0], 'y', q[1]) + ', and ' + sd[1] + ' = ' + expr(q[2], 'y', q[3]) + '. Assume the expressions are equal.<br>(a) Solve for ' + ii('x') + '. (b) Find m' + ANG + 'C. (c) Which theorem proves ' + TRI + 'ABC ' + CONG + ' ' + TRI + 'DEF? (d) Find ' + sd[0] + '.',
      parts: [num('(a) <i>x</i>', x), num('(b) m' + ANG + 'C', C, { unit: DEG }), { label: '(c) theorem', type: 'mc', choices: m.choices, answer: m.answer }, num('(d) ' + sd[0], s)],
      explanation: steps([expr(p[0], 'x', p[1]) + ' = ' + expr(p[2], 'x', p[3]) + ' \u2192 ' + ii('x') + ' = <b>' + x + '</b>, so m' + ANG + 'A = m' + ANG + 'D = ' + A + DEG + '.',
        'Triangle Sum: m' + ANG + 'C = 180 ' + MINUS + ' ' + A + ' ' + MINUS + ' ' + B + ' = <b>' + C + DEG + '</b>.',
        ol(sd[0]) + (incl ? ' is between ' + ANG + 'A and ' + ANG + 'B (included side) \u2192 <b>ASA</b>.' : ' is NOT between ' + ANG + 'A and ' + ANG + 'B (non-included side) \u2192 <b>AAS</b>.'),
        expr(q[0], 'y', q[1]) + ' = ' + expr(q[2], 'y', q[3]) + ' \u2192 ' + ii('y') + ' = ' + y + ', so ' + sd[0] + ' = <b>' + s + '</b>.']),
      check: { sum: A + B + C, angles: [A, B, C] }
    };
  }
} };

/* 5.7 two-column proofs with CPCTC */
const R = { given: 'Given', mid: 'Definition of midpoint', vert: 'Vertical Angles Congruence Theorem', refl: 'Reflexive Property of Congruence', alt: 'Alternate Interior Angles Theorem', bis: 'Definition of angle bisector', rt: 'Right Angles Congruence Theorem', perp: 'Definition of perpendicular lines', SAS: 'SAS Congruence Theorem', SSS: 'SSS Congruence Theorem', ASA: 'ASA Congruence Theorem', AAS: 'AAS Congruence Theorem', cpctc: 'Corresponding parts of congruent triangles are congruent' };
const PROOFS = [
  { given: 'M is the midpoint of ' + ol('AD') + ' and of ' + ol('BC') + '.', prove: ol('AB') + ' ' + CONG + ' ' + ol('DC'),
    rows: [['M is the midpoint of ' + ol('AD') + ' and ' + ol('BC'), 'given'], [ol('AM') + ' ' + CONG + ' ' + ol('DM') + ', ' + ol('BM') + ' ' + CONG + ' ' + ol('CM'), 'mid'], [ANG + 'AMB ' + CONG + ' ' + ANG + 'DMC', 'vert'], [TRI + 'AMB ' + CONG + ' ' + TRI + 'DMC', 'SAS'], [ol('AB') + ' ' + CONG + ' ' + ol('DC'), 'cpctc']] },
  { given: ol('AB') + ' ' + CONG + ' ' + ol('CD') + ', ' + ol('AB') + ' \u2225 ' + ol('CD') + ' (quadrilateral ABCD with diagonal ' + ol('AC') + ')', prove: ol('BC') + ' ' + CONG + ' ' + ol('DA'),
    rows: [[ol('AB') + ' ' + CONG + ' ' + ol('CD') + ', ' + ol('AB') + ' \u2225 ' + ol('CD'), 'given'], [ANG + 'BAC ' + CONG + ' ' + ANG + 'DCA', 'alt'], [ol('AC') + ' ' + CONG + ' ' + ol('CA'), 'refl'], [TRI + 'BAC ' + CONG + ' ' + TRI + 'DCA', 'SAS'], [ol('BC') + ' ' + CONG + ' ' + ol('DA'), 'cpctc']] },
  { given: ol('BD') + ' bisects ' + ANG + 'ABC, ' + ol('BD') + ' \u22A5 ' + ol('AC') + ' (D on ' + ol('AC') + ')', prove: ol('AD') + ' ' + CONG + ' ' + ol('CD'),
    rows: [[ol('BD') + ' bisects ' + ANG + 'ABC, ' + ol('BD') + ' \u22A5 ' + ol('AC'), 'given'], [ANG + 'ABD ' + CONG + ' ' + ANG + 'CBD', 'bis'], [ANG + 'ADB and ' + ANG + 'CDB are right angles', 'perp'], [ANG + 'ADB ' + CONG + ' ' + ANG + 'CDB', 'rt'], [ol('BD') + ' ' + CONG + ' ' + ol('BD'), 'refl'], [TRI + 'ABD ' + CONG + ' ' + TRI + 'CBD', 'ASA'], [ol('AD') + ' ' + CONG + ' ' + ol('CD'), 'cpctc']] },
  { given: ol('AB') + ' ' + CONG + ' ' + ol('CB') + ', ' + ol('AD') + ' ' + CONG + ' ' + ol('CD') + ' (kite ABCD with diagonal ' + ol('BD') + ')', prove: ANG + 'A ' + CONG + ' ' + ANG + 'C',
    rows: [[ol('AB') + ' ' + CONG + ' ' + ol('CB') + ', ' + ol('AD') + ' ' + CONG + ' ' + ol('CD'), 'given'], [ol('BD') + ' ' + CONG + ' ' + ol('BD'), 'refl'], [TRI + 'ABD ' + CONG + ' ' + TRI + 'CBD', 'SSS'], [ANG + 'A ' + CONG + ' ' + ANG + 'C', 'cpctc']] },
  { given: ANG + 'A ' + CONG + ' ' + ANG + 'D, ' + ol('BC') + ' ' + CONG + ' ' + ol('EC') + ' (segments ' + ol('AE') + ' and ' + ol('BD') + ' meet at C)', prove: ol('AC') + ' ' + CONG + ' ' + ol('DC'),
    rows: [[ANG + 'A ' + CONG + ' ' + ANG + 'D, ' + ol('BC') + ' ' + CONG + ' ' + ol('EC'), 'given'], [ANG + 'ACB ' + CONG + ' ' + ANG + 'DCE', 'vert'], [TRI + 'ACB ' + CONG + ' ' + TRI + 'DCE', 'AAS'], [ol('AC') + ' ' + CONG + ' ' + ol('DC'), 'cpctc']] }
];
T.proof = { section: '5.7 Using Congruent Triangles (CPCTC)', gen(rng) {
  const pi = rng.int(0, PROOFS.length - 1), P = PROOFS[pi];
  const idx = P.rows.map((r, i) => i).filter(i => i > 0);
  const triRow = P.rows.findIndex(r => r[0].indexOf(TRI) === 0);
  let blanks = rng.shuffle(idx.filter(i => i !== triRow)).slice(0, 2).concat([triRow]);
  const pool = Object.keys(R);
  const parts = [];
  blanks = blanks.sort((a, b) => a - b);
  const table = P.rows.map((r, i) => {
    if (blanks.indexOf(i) < 0) return { s: r[0], r: R[r[1]] };
    const wrong = rng.shuffle(pool.filter(k => k !== r[1] && k !== 'given')).slice(0, 4).map(k => R[k]);
    if (r[1] in { SAS: 1, SSS: 1, ASA: 1, AAS: 1 }) { ['SAS', 'SSS', 'ASA', 'AAS'].filter(k => k !== r[1]).forEach(k => { if (wrong.indexOf(R[k]) < 0) wrong[wrong.length] = R[k]; }); }
    const m = mc(rng, R[r[1]], wrong.slice(0, 5));
    parts.push({ label: 'Reason ' + (i + 1), type: 'select', choices: m.choices, answer: m.answer });
    return { s: r[0], r: { part: parts.length - 1 } };
  });
  // ordering part: which step must come right before the CPCTC step?
  const last = P.rows.length - 1;
  const m = mc(rng, 'Prove the triangles congruent (step ' + (triRow + 1) + ') first, then use CPCTC', ['Use CPCTC first, then prove the triangles congruent', 'CPCTC can be used without proving the triangles congruent', 'The Reflexive Property must always be the last step']);
  parts.push({ label: 'Order: why is step ' + (last + 1) + ' last?', type: 'mc', choices: m.choices, answer: m.answer });
  return {
    prompt: 'Complete the two-column proof by choosing each missing reason.', proof: { given: P.given, prove: P.prove, table }, parts,
    explanation: '<ol class="steps">' + P.rows.map(r => '<li>' + r[0] + ' \u2014 <b>' + R[r[1]] + '</b></li>').join('') + '</ol><p>CPCTC can only be used <b>after</b> the triangles are proved congruent.</p>',
    check: { proof: pi, blanks }
  };
} };

/* 5.8 coordinate proof: distances + SSS */
T.coord = { section: '5.8 Coordinate Proofs', gen(rng) {
  for (;;) {
    const A = [rng.int(-7, -1), rng.int(-6, 6)], B = [A[0] + rng.intNZ(-4, 4), A[1] + rng.intNZ(-5, 5)], C = [A[0] + rng.intNZ(-4, 5), A[1] + rng.intNZ(-5, 5)];
    const area = (B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1]); if (Math.abs(area) < 8) continue;
    const mot = rng.pick(['ry', 'tr', 'r180']), v = [rng.int(2, 8), rng.int(-4, 4)];
    const f = mot === 'ry' ? p => [-p[0], p[1]] : mot === 'r180' ? p => [-p[0], -p[1]] : p => [p[0] + v[0], p[1] + v[1]];
    const D = f(A), E = f(B), F2 = f(C);
    const all = [A, B, C, D, E, F2]; if (!L.inR(all, 9)) continue;
    if ((C[0] - A[0]) % 2 || (C[1] - A[1]) % 2) continue; // integer midpoint
    const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
    const ab = d2(A, B), de = d2(D, E), bc = d2(B, C), ac = d2(A, C);
    const M = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
    const m = mc(rng, 'Yes, by SSS: AB = DE, BC = EF, AC = DF', ['Yes, by SAS: the slopes of ' + ol('AB') + ' and ' + ol('DE') + ' are equal', 'No, because the triangles are in different quadrants', 'Not enough information: you need an angle measure']);
    return {
      prompt: TRI + 'ABC has vertices A' + L.pt(A) + ', B' + L.pt(B) + ', C' + L.pt(C) + '. ' + TRI + 'DEF has vertices D' + L.pt(D) + ', E' + L.pt(E) + ', F' + L.pt(F2) + '.<br>(a) Find AB (exact or to the hundredth). (b) Find DE. (c) Find the midpoint of ' + ol('AC') + '. (d) After also checking BC = EF and AC = DF, what can you conclude?',
      svg: L.gridSVG({ polys: [{ pts: [A, B, C], names: ['A', 'B', 'C'] }, { pts: [D, E, F2], names: ['D', 'E', 'F'], cls: 'img' }] }),
      parts: [num('(a) AB', Math.sqrt(ab), { approx: true, key: radKey(ab) }), num('(b) DE', Math.sqrt(de), { approx: true, key: radKey(de) }), { label: '(c) midpoint of ' + ol('AC'), type: 'point', answer: M, key: L.pt(M) }, { label: '(d) conclusion', type: 'mc', choices: m.choices, answer: m.answer }],
      explanation: steps(['Distance Formula: AB = \u221A[(' + sn(B[0] - A[0]) + ')\u00B2 + (' + sn(B[1] - A[1]) + ')\u00B2] = \u221A' + ab + ' = <b>' + radKey(ab) + ' \u2248 ' + Math.sqrt(ab).toFixed(2) + '</b>.',
        'DE = \u221A[(' + sn(E[0] - D[0]) + ')\u00B2 + (' + sn(E[1] - D[1]) + ')\u00B2] = \u221A' + de + ' = <b>' + radKey(de) + '</b>. Same as AB.',
        'Midpoint Formula: ((' + sn(A[0]) + ' + ' + sn(C[0]) + ')/2, (' + sn(A[1]) + ' + ' + sn(C[1]) + ')/2) = <b>' + L.pt(M) + '</b>.',
        'Likewise BC = EF = \u221A' + bc + ' and AC = DF = \u221A' + ac + '. All three pairs of sides are congruent \u2192 <b>SSS</b>. (Slopes alone don\u2019t prove congruence.)']),
      check: { ab, de, bc, ef: d2(E, F2), ac, df: d2(D, F2), area }
    };
  }
} };


/* 5.5 HL with algebra */
T.hl = { section: '5.5 SSS & HL', gen(rng) {
  for (;;) {
    const tr = rng.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10]]), k = rng.int(1, 3);
    const leg1 = tr[0] * k, leg2 = tr[1] * k, hyp = tr[2] * k; if (hyp > 60) continue;
    const swap = rng.chance(0.5), given = swap ? leg2 : leg1, other = swap ? leg1 : leg2;
    const x = rng.int(2, 12), p = eqPair(rng, x, hyp, 6), y = rng.int(2, 9), q = eqPair(rng, y, other, 5);
    const m = mc(rng, 'HL', ['SAS', 'SSS', 'Not enough information (SSA)']);
    return {
      prompt: TRI + 'ABC and ' + TRI + 'DEF are right triangles with right angles at ' + ii('C') + ' and ' + ii('F') + '. Hypotenuse AB = ' + expr(p[0], 'x', p[1]) + ', hypotenuse DE = ' + expr(p[2], 'x', p[3]) + ', and legs AC = DF = ' + given + '.<br>(a) Solve for ' + ii('x') + ' so the hypotenuses are congruent. (b) Which theorem proves ' + TRI + 'ABC ' + CONG + ' ' + TRI + 'DEF? (c) Find BC. (d) EF = ' + expr(q[0], 'y', q[1]) + ' and BC = ' + expr(q[2], 'y', q[3]) + '. Solve for ' + ii('y') + '.',
      svg: triSVG([[40, 180], [40, 40], [250, 180]], ['C', 'A', 'B'], { right: 0, ticks: [[0, 1, 1], [1, 2, 2]] }),
      parts: [num('(a) <i>x</i>', x), { label: '(b) theorem', type: 'mc', choices: m.choices, answer: m.answer }, num('(c) BC', other), num('(d) <i>y</i>', y)],
      explanation: steps([expr(p[0], 'x', p[1]) + ' = ' + expr(p[2], 'x', p[3]) + ' \u2192 ' + ii('x') + ' = <b>' + x + '</b>, so AB = DE = ' + hyp + '.',
        'Right triangles with a congruent hypotenuse and a congruent leg \u2192 <b>HL</b> (it looks like SSA, but HL works only for right triangles).',
        'Pythagorean Theorem: BC = \u221A(' + hyp + '\u00B2 ' + MINUS + ' ' + given + '\u00B2) = \u221A' + (hyp * hyp - given * given) + ' = <b>' + other + '</b>.',
        'EF = BC (CPCTC): ' + expr(q[0], 'y', q[1]) + ' = ' + expr(q[2], 'y', q[3]) + ' \u2192 ' + ii('y') + ' = <b>' + y + '</b>.']),
      check: { pyth: given * given + other * other === hyp * hyp }
    };
  }
} };

/* 5.7 indirect measurement across a lake */
T.indirect = { section: '5.7 Indirect Measurement', gen(rng) {
  for (;;) {
    const N = rng.int(40, 180), ac = rng.int(20, 90), y = rng.int(3, 15), q = eqPair(rng, y, ac, 6);
    const angC = rng.int(40, 120);
    const m1 = mc(rng, 'SAS', ['SSS', 'ASA', 'AAS']);
    const m2 = mc(rng, 'Vertical Angles Congruence Theorem', ['Alternate Interior Angles Theorem', 'Linear Pair Postulate', 'Third Angles Theorem']);
    return {
      prompt: 'To find the distance AB across a lake, a surveyor walks from ' + ii('A') + ' through point ' + ii('C') + ' to ' + ii('D') + ' so that AC = CD, and from ' + ii('B') + ' through ' + ii('C') + ' to ' + ii('E') + ' so that BC = CE. She measures DE = ' + N + ' m and m' + ANG + 'ACB = ' + angC + DEG + '.<br>(a) Which theorem proves ' + TRI + 'ACB ' + CONG + ' ' + TRI + 'DCE? (b) Which reason gives ' + ANG + 'ACB ' + CONG + ' ' + ANG + 'DCE? (c) Find AB (m). (d) AC = (' + expr(q[0], 'y', q[1]) + ') m and CD = (' + expr(q[2], 'y', q[3]) + ') m. Solve for ' + ii('y') + '.',
      svg: (function () { let s = L.svgOpen(320, 200, 'aria-label="lake figure"'); s += '<ellipse cx="80" cy="100" rx="55" ry="70" fill="#bfdbfe"/>'; const P = { A: [70, 30], B: [70, 170], C: [160, 100], D: [250, 170], E: [250, 30] };
        s += L.line(70, 30, 250, 170, 'stroke="#111" stroke-width="2"') + L.line(70, 170, 250, 30, 'stroke="#111" stroke-width="2"') + L.line(70, 30, 70, 170, 'stroke="#111" stroke-dasharray="5 4"') + L.line(250, 30, 250, 170, 'stroke="#111" stroke-width="2"');
        Object.keys(P).forEach(k => { s += L.text(P[k][0] + (P[k][0] < 160 ? -14 : P[k][0] > 160 ? 14 : 0), P[k][1] + (k === 'C' ? -10 : 5), k, 'font-weight="700" font-size="16" text-anchor="middle"'); });
        return s + L.text(268, 105, N + ' m', 'font-size="13" fill="#065f46"') + '</svg>'; })(),
      parts: [{ label: '(a) theorem', type: 'mc', choices: m1.choices, answer: m1.answer }, { label: '(b) reason', type: 'mc', choices: m2.choices, answer: m2.answer }, num('(c) AB', N, { unit: 'm' }), num('(d) <i>y</i>', y)],
      explanation: steps(['AC ' + CONG + ' CD and BC ' + CONG + ' CE are given; the angle between them at ' + ii('C') + ' is included \u2192 <b>SAS</b>.', ANG + 'ACB and ' + ANG + 'DCE are formed by two intersecting lines \u2192 <b>Vertical Angles Congruence Theorem</b>.', 'Corresponding parts of congruent triangles are congruent: AB = DE = <b>' + N + ' m</b>. (The ' + angC + DEG + ' angle is not needed.)', expr(q[0], 'y', q[1]) + ' = ' + expr(q[2], 'y', q[3]) + ' \u2192 ' + ii('y') + ' = <b>' + y + '</b> (AC = ' + ac + ' m).']),
      check: {}
    };
  }
} };

/* ---- Chapter 6.1–6.3 (bisectors, medians, altitudes) ---- */
const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15]];
/* 6.1 perpendicular bisector + angle bisector theorems */
T.perpBis = { section: '6.1 Perpendicular & Angle Bisectors', gen(rng) {
  const x = rng.int(2, 12), PA = rng.int(10, 45), p = eqPair(rng, x, PA, 6);
  const y = rng.int(2, 10), DE = rng.int(6, 35), q = eqPair(rng, y, DE, 5);
  let s = L.svgOpen(320, 200, 'aria-label="perpendicular bisector figure"');
  s += L.line(40, 170, 280, 170, 'stroke="#111" stroke-width="2"') + L.line(160, 20, 160, 185, 'stroke="#1d4ed8" stroke-width="2" stroke-dasharray="5 4"');
  s += L.line(160, 50, 40, 170, 'stroke="#111" stroke-width="1.5"') + L.line(160, 50, 280, 170, 'stroke="#111" stroke-width="1.5"');
  s += '<rect x="160" y="158" width="12" height="12" fill="none" stroke="#111"/>';
  s += L.text(32, 188, 'A', 'font-weight="700" font-size="16"') + L.text(282, 188, 'B', 'font-weight="700" font-size="16"') + L.text(150, 45, 'P', 'font-weight="700" font-size="16"') + L.text(148, 192, 'M', 'font-weight="700" font-size="16"');
  s += '</svg>';
  return {
    prompt: 'Line ' + ii('PM') + ' is the perpendicular bisector of ' + ol('AB') + '. PA = ' + expr(p[0], 'x', p[1]) + ' and PB = ' + expr(p[2], 'x', p[3]) + '.<br>Separately, point ' + ii('D') + ' lies on the bisector of ' + ANG + 'XYZ. The distance from D to ray YX is DE = ' + expr(q[0], 'y', q[1]) + ' and to ray YZ is DF = ' + expr(q[2], 'y', q[3]) + ' (both measured perpendicular).<br>(a) Solve for ' + ii('x') + '. (b) Find PA. (c) Solve for ' + ii('y') + '. (d) Find DE.',
    svg: s, parts: [num('(a) <i>x</i>', x), num('(b) PA', PA), num('(c) <i>y</i>', y), num('(d) DE', DE)],
    explanation: steps(['<b>Perpendicular Bisector Theorem:</b> any point on the perpendicular bisector is equidistant from the endpoints, so PA = PB: ' + expr(p[0], 'x', p[1]) + ' = ' + expr(p[2], 'x', p[3]) + ' \u2192 ' + ii('x') + ' = <b>' + x + '</b>.', 'PA = ' + p[0] + '(' + x + ') ' + (p[1] < 0 ? MINUS + ' ' + (-p[1]) : '+ ' + p[1]) + ' = <b>' + PA + '</b>.', '<b>Angle Bisector Theorem:</b> a point on an angle bisector is equidistant from the two sides (perpendicular distance): DE = DF \u2192 ' + ii('y') + ' = <b>' + y + '</b>.', 'DE = <b>' + DE + '</b>.']),
    check: { eq: [[p, x, PA], [q, y, DE]] } };
} };
/* 6.2 circumcenter (equidistant from vertices) + incenter (equidistant from sides, Pythagorean) */
T.triBis = { section: '6.2 Bisectors of Triangles', gen(rng) {
  const x = rng.int(2, 12), R = rng.int(8, 40), p = eqPair(rng, x, R, 6);
  const tr = rng.pick(TRIPLES), sw = rng.chance(0.5), r = sw ? tr[1] : tr[0], t = sw ? tr[0] : tr[1], h = tr[2];
  const y = rng.int(2, 9), q = eqPair(rng, y, r, 5);
  const m = mc(rng, 'circumcenter', ['incenter', 'centroid', 'orthocenter']);
  return {
    prompt: 'Point ' + ii('P') + ' is where the <b>perpendicular bisectors</b> of the sides of ' + TRI + 'ABC meet. PA = ' + expr(p[0], 'x', p[1]) + ' and PB = ' + expr(p[2], 'x', p[3]) + '.<br>In a different triangle, point ' + ii('I') + ' is where the <b>angle bisectors</b> meet. The perpendicular distances from I to two sides are ID = ' + expr(q[0], 'y', q[1]) + ' and IE = ' + expr(q[2], 'y', q[3]) + '. Point D is on side ' + ol('JK') + ' with JD = ' + t + '.<br>(a) Point P is called the … (b) Solve for ' + ii('x') + ' and find PC. Enter PC. (c) Solve for ' + ii('y') + '. (d) Find IJ.',
    parts: [{ label: '(a) P is the', type: 'mc', choices: m.choices, answer: m.answer }, num('(b) PC', R), num('(c) <i>y</i>', y), num('(d) IJ', h)],
    explanation: steps(['Perpendicular bisectors meet at the <b>circumcenter</b>, which is equidistant from the three <i>vertices</i> (it is the center of the circle through A, B, C).', 'PA = PB: ' + expr(p[0], 'x', p[1]) + ' = ' + expr(p[2], 'x', p[3]) + ' \u2192 ' + ii('x') + ' = ' + x + ', so PA = PB = PC = <b>' + R + '</b>.', 'Angle bisectors meet at the <b>incenter</b>, equidistant from the three <i>sides</i>: ID = IE \u2192 ' + ii('y') + ' = <b>' + y + '</b>, so ID = ' + r + '.', ANG + 'IDJ is a right angle, so IJ\u00B2 = ID\u00B2 + JD\u00B2 = ' + r + '\u00B2 + ' + t + '\u00B2 = ' + (h * h) + ' \u2192 IJ = <b>' + h + '</b>. (Common mistake: IJ is NOT the distance to a side.)']),
    check: { eq: [[p, x, R], [q, y, r]], pyth: r * r + t * t === h * h } };
} };
/* 6.3 centroid (2:1) + coordinate centroid */
T.median = { section: '6.3 Medians & Altitudes', gen(rng) {
  for (;;) {
    const x = rng.int(2, 10), PD = rng.int(3, 18), AP = 2 * PD;
    const a = rng.int(2, 6), b = AP - a * x, c = rng.int(1, 4), d = PD - c * x; if (Math.abs(b) > 40 || Math.abs(d) > 40 || a === 2 * c) continue;
    const V = [0, 1, 2].map(() => [rng.int(-8, 10), rng.int(-8, 10)]);
    const sx = V[0][0] + V[1][0] + V[2][0], sy = V[0][1] + V[1][1] + V[2][1];
    const area = (V[1][0] - V[0][0]) * (V[2][1] - V[0][1]) - (V[2][0] - V[0][0]) * (V[1][1] - V[0][1]);
    if (sx % 3 || sy % 3 || Math.abs(area) < 12) continue;
    const pt = v => '(' + sn(v[0]) + ', ' + sn(v[1]) + ')', G2 = [sx / 3, sy / 3];
    return {
      prompt: 'In ' + TRI + 'ABC, ' + ol('AD') + ' is a median and ' + ii('P') + ' is the centroid. AP = ' + expr(a, 'x', b) + ' and PD = ' + expr(c, 'x', d) + '.<br>(a) Solve for ' + ii('x') + '. (b) Find AP. (c) Find AD.<br>(d) A different triangle has vertices ' + pt(V[0]) + ', ' + pt(V[1]) + ', ' + pt(V[2]) + '. Find its centroid.',
      parts: [num('(a) <i>x</i>', x), num('(b) AP', AP), num('(c) AD', 3 * PD), { label: '(d) centroid', type: 'point', answer: G2, key: pt(G2) }],
      explanation: steps(['<b>Centroid Theorem:</b> the centroid is 2/3 of the way from a vertex to the midpoint of the opposite side, so AP = 2\u00B7PD: ' + expr(a, 'x', b) + ' = 2(' + expr(c, 'x', d) + ') \u2192 ' + ii('x') + ' = <b>' + x + '</b>.', 'PD = ' + PD + ', AP = <b>' + AP + '</b>.', 'AD = AP + PD = <b>' + (3 * PD) + '</b> (common mistake: answering AD = AP).', 'Centroid = average of the vertices: ((' + sx + ')/3, (' + sy + ')/3) = <b>' + pt(G2) + '</b>.']),
      check: { ap: AP, pd: PD, a, b, c, d, x, V, G: G2 } };
  }
} };

const SECTIONS = { '5.1': ['ext'], '5.2': ['congPoly'], '5.3': ['sas'], '5.4': ['iso'], '5.5': ['hl', 'thmPick'], '5.6': ['aas', 'thmPick'], '5.7': ['proof', 'indirect'], '5.8': ['coord'], '6.1': ['perpBis'], '6.2': ['triBis'], '6.3': ['median'] };
const QUIZ = [['ext'], ['congPoly'], ['sas'], ['iso'], ['hl'], ['aas'], ['thmPick'], ['proof'], ['indirect', 'proof'], ['coord']];
const QN = QUIZ.length;
function finish(q, id, i) { q.tid = id; q.section = T[id].section; q.n = i + 1; q.points = q.parts.length;
  q.parts.forEach(p => { if (p.type === 'mc' || p.type === 'select') p.answerHTML = p.choices[p.answer]; else p.answerHTML = (p.key || String(p.answer)) + (p.approx ? ' \u2248 ' + p.answer.toFixed(2) : ''); }); return q; }
function generate(seed, sec) {
  const rng = makeRng((seed ^ 0x5c0ffee5) >>> 0);
  if (sec && SECTIONS[sec]) return [0, 1, 2, 3, 4].map(i => { const id = SECTIONS[sec][i % SECTIONS[sec].length]; return finish(T[id].gen(rng), id, i); });
  let lastProof = -1;
  return QUIZ.map((opts, i) => { const id = rng.pick(opts); if (id === 'proof') { let q; do { q = T.proof.gen(rng); } while (q.check.proof === lastProof); lastProof = q.check.proof; return finish(q, id, i); } return finish(T[id].gen(rng), id, i); });
}
return { QN, generate, templates: T, SECTIONS, classify, grade: G.grade, PROOFS, R };
});
