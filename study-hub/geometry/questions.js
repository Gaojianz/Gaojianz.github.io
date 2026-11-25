/* Geometry Ch 3–4 Practice Test — question generators + grader.
   Works in the browser (window.GeoQ) and in Node (module.exports). No dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GeoQ = factory();
})(typeof self !== 'undefined' ? self : this, function () {
'use strict';

/* ------------------------------------------------------------------ RNG */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeRng(seed) {
  const r = mulberry32(seed >>> 0);
  const R = {
    next: r,
    int(a, b) { return a + Math.floor(r() * (b - a + 1)); },
    pick(arr) { return arr[Math.floor(r() * arr.length)]; },
    shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; },
    intNZ(a, b) { let v; do { v = R.int(a, b); } while (v === 0); return v; },
    chance(p) { return r() < p; }
  };
  return R;
}

/* ------------------------------------------------------------ fractions */
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
function Fr(n, d) { if (d === undefined) d = 1; if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; }
const fadd = (a, b) => Fr(a.n * b.d + b.n * a.d, a.d * b.d);
const fsub = (a, b) => Fr(a.n * b.d - b.n * a.d, a.d * b.d);
const fmul = (a, b) => Fr(a.n * b.n, a.d * b.d);
const fdiv = (a, b) => Fr(a.n * b.d, a.d * b.n);
const fnum = f => f.n / f.d;

/* ----------------------------------------------------------- formatting */
const MINUS = '\u2212', PRIME = '\u2032', DPRIME = '\u2033';
function sn(n) { return n < 0 ? MINUS + Math.abs(n) : String(n); }
function fracHTML(f) {
  if (f.d === 1) return sn(f.n);
  return (f.n < 0 ? MINUS : '') + '<span class="frac"><span>' + Math.abs(f.n) + '</span><span>' + f.d + '</span></span>';
}
function fracText(f) { return f.d === 1 ? sn(f.n) : (f.n < 0 ? MINUS : '') + Math.abs(f.n) + '/' + f.d; }
function pt(p) { return '(' + sn(p[0]) + ', ' + sn(p[1]) + ')'; }
function vec(v) { return '\u27E8' + sn(v[0]) + ', ' + sn(v[1]) + '\u27E9'; }
function lineEq(m, b, html) {
  const F = html ? fracHTML : fracText;
  const X = html ? '<i>x</i>' : 'x';
  let s = (html ? '<i>y</i>' : 'y') + ' = ';
  if (m.n === 0) return s + F(b);
  if (m.d === 1 && Math.abs(m.n) === 1) s += (m.n < 0 ? MINUS : '') + X;
  else s += F(m) + X;
  if (b.n !== 0) s += (b.n < 0 ? ' ' + MINUS + ' ' : ' + ') + F(Fr(Math.abs(b.n), b.d));
  return s;
}
// "(5x − 17)°", "3x°", "x°"
function linExpr(a, b, v) {
  const core = (a === 1 ? '' : String(a)) + v;
  if (b === 0) return core + '\u00B0';
  return '(' + core + (b < 0 ? ' ' + MINUS + ' ' + (-b) : ' + ' + b) + ')\u00B0';
}
function deg(n) { return n + '\u00B0'; }
function simplifyRadical(n) { let k = 1, r = n; for (let f = 2; f * f <= r; f++) { while (r % (f * f) === 0) { r /= f * f; k *= f; } } return [k, r]; }
function radText(k, r) { if (r === 1) return String(k); return (k === 1 ? '' : k) + '\u221A' + r; }
function moveText(v) {
  const p = [];
  if (v[0]) p.push(Math.abs(v[0]) + ' unit' + (Math.abs(v[0]) === 1 ? '' : 's') + (v[0] > 0 ? ' right' : ' left'));
  if (v[1]) p.push(Math.abs(v[1]) + ' unit' + (Math.abs(v[1]) === 1 ? '' : 's') + (v[1] > 0 ? ' up' : ' down'));
  return p.join(' and ');
}
const tri = n => '\u25B3' + n;
const ln = s => '<span class="ln">' + s + '</span>';
const ang = s => '\u2220' + s;

/* --------------------------------------------------- parsing & grading */
function normalize(s) {
  return String(s == null ? '' : s).toLowerCase()
    .replace(/[\u2212\u2013\u2014\u2012\uFE63\uFF0D]/g, '-')
    .replace(/[\u00D7\u00B7\u22C5]/g, '*').replace(/\u00F7/g, '/')
    .replace(/\u221A/g, 'sqrt').replace(/[\u27E8\u2329\u3008]/g, '<').replace(/[\u27E9\u232A\u3009]/g, '>')
    .replace(/[\u00B0\u00BA]/g, '')
    .replace(/\b(degrees?|deg|units?|cm|centimeters?|inches|inch|in|ft|feet|times)\b\.?/g, '')
    .replace(/(^|[^\d.\/])(\d+)\s+(\d+)\s*\/\s*(\d+)(?![\d.])/g, '$1($2+$3/$4)') // mixed numbers: 5 1/2 -> (5+1/2)
    .replace(/\s+/g, '');
}
function tokenize(s) {
  const t = []; let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const str = s.slice(i, j);
      if (str === '.' || (str.match(/\./g) || []).length > 1) throw new Error('num');
      t.push({ k: 'n', v: parseFloat(str) }); i = j; continue;
    }
    if (s.startsWith('sqrt', i)) { t.push({ k: 'f' }); i += 4; continue; }
    if (c === 'x' || c === 'y') { t.push({ k: 'v', v: c }); i++; continue; }
    if ('+-*/^()='.indexOf(c) >= 0) { t.push({ k: c }); i++; continue; }
    throw new Error('tok');
  }
  return t;
}
const LV = (c, x, y) => ({ c: c, x: x || 0, y: y || 0 });
const isC = v => Math.abs(v.x) < 1e-12 && Math.abs(v.y) < 1e-12;
const ladd = (a, b) => LV(a.c + b.c, a.x + b.x, a.y + b.y);
const lsc = (a, k) => LV(a.c * k, a.x * k, a.y * k);
function lmul(a, b) { if (isC(a)) return lsc(b, a.c); if (isC(b)) return lsc(a, b.c); throw new Error('nonlinear'); }
function ldiv(a, b) { if (!isC(b) || Math.abs(b.c) < 1e-15) throw new Error('div'); return lsc(a, 1 / b.c); }
function parseLinear(tokens) {
  let p = 0;
  const eat = k => { if (tokens[p] && tokens[p].k === k) { p++; return true; } return false; };
  function expr() { let v = term(); for (;;) { if (eat('+')) v = ladd(v, term()); else if (eat('-')) v = ladd(v, lsc(term(), -1)); else return v; } }
  function term() {
    let v = unary();
    for (;;) {
      const t = tokens[p]; if (!t) return v;
      if (t.k === '*') { p++; v = lmul(v, unary()); }
      else if (t.k === '/') { p++; v = ldiv(v, unary()); }
      else if (t.k === 'n' || t.k === 'v' || t.k === 'f' || t.k === '(') v = lmul(v, power());
      else return v;
    }
  }
  function unary() { if (eat('-')) return lsc(unary(), -1); if (eat('+')) return unary(); return power(); }
  function power() { let b = atom(); if (eat('^')) { const e = unary(); if (!isC(b) || !isC(e)) throw new Error('pow'); b = LV(Math.pow(b.c, e.c)); } return b; }
  function atom() {
    const t = tokens[p++]; if (!t) throw new Error('eof');
    if (t.k === 'n') return LV(t.v);
    if (t.k === 'v') return t.v === 'x' ? LV(0, 1, 0) : LV(0, 0, 1);
    if (t.k === 'f') { const a = atom(); if (!isC(a) || a.c < 0) throw new Error('sqrt'); return LV(Math.sqrt(a.c)); }
    if (t.k === '(') { const v = expr(); if (!eat(')')) throw new Error(')'); return v; }
    throw new Error('atom');
  }
  const v = expr(); if (p !== tokens.length) throw new Error('trailing'); return v;
}
function parseNumber(s) {
  try {
    let n = normalize(s); if (!n) return NaN;
    n = n.replace(/^[a-z]+=/, m => (m === 'sqrt=' ? m : ''));
    const t = tokenize(n); if (t.some(k => k.k === 'v' || k.k === '=')) return NaN;
    const v = parseLinear(t); return isFinite(v.c) ? v.c : NaN;
  } catch (e) { return NaN; }
}
function parsePoint(s) {
  let n = normalize(s); if (!n) return null;
  n = n.replace(/^[a-z'`\u2032\u2033"]+(?=[(<\[=])/, '').replace(/^=/, '');
  const open = n[0], close = n[n.length - 1];
  if ((open === '(' && close === ')') || (open === '<' && close === '>') || (open === '[' && close === ']')) n = n.slice(1, -1);
  let parts = n.split(','); if (parts.length !== 2) parts = n.split(';');
  if (parts.length !== 2) return null;
  const a = parseNumber(parts[0]), b = parseNumber(parts[1]);
  if (isNaN(a) || isNaN(b)) return null;
  return [a, b];
}
function parseEquation(s) {
  try {
    const n = normalize(s); if (!n) return null;
    const sides = n.split('=');
    let L, R;
    if (sides.length === 1) { if (n.indexOf('x') < 0) return null; L = LV(0, 0, 1); R = parseLinear(tokenize(sides[0])); }
    else if (sides.length === 2) { if (!sides[0] || !sides[1]) return null; L = parseLinear(tokenize(sides[0])); R = parseLinear(tokenize(sides[1])); }
    else return null;
    const d = ladd(L, lsc(R, -1));
    if (Math.abs(d.x) < 1e-12 && Math.abs(d.y) < 1e-12) return null;
    return { a: d.x, b: d.y, c: d.c };
  } catch (e) { return null; }
}
function near(a, b, tol) { return Math.abs(a - b) <= tol; }
// A typed decimal with d >= 2 places is accepted if it is the correctly rounded value (e.g. 0.33 for 1/3).
function decPlaces(raw) { const m = normalize(raw).replace(/^[a-z]+=/, '').match(/^[-+]?\d*\.(\d+)$/); return m ? m[1].length : 0; }
function numOK(raw, v, ans) {
  if (near(v, ans, 1e-6 * Math.max(1, Math.abs(ans)))) return true;
  const d = decPlaces(raw);
  return d >= 2 && Math.abs(v - ans) <= 0.5 * Math.pow(10, -d) * 1.0001 + 1e-12;
}
function splitPoint(s) {
  let n = normalize(s); if (!n) return null;
  n = n.replace(/^[a-z'`\u2032\u2033"]+(?=[(<\[=])/, '').replace(/^=/, '');
  const open = n[0], close = n[n.length - 1];
  if ((open === '(' && close === ')') || (open === '<' && close === '>') || (open === '[' && close === ']')) n = n.slice(1, -1);
  let parts = n.split(','); if (parts.length !== 2) parts = n.split(';');
  return parts.length === 2 ? parts : null;
}
function grade(part, raw) {
  if (part.type === 'mc' || part.type === 'select') return raw === part.answer;
  if (raw == null || String(raw).trim() === '') return false;
  if (part.type === 'num') {
    const v = parseNumber(raw); if (isNaN(v)) return false;
    if (part.approx) return near(v, part.answer, 0.051);
    return numOK(raw, v, part.answer);
  }
  if (part.type === 'point' || part.type === 'vector') {
    const p = parsePoint(raw); if (!p) return false;
    const sp = splitPoint(raw);
    return numOK(sp[0], p[0], part.answer[0]) && numOK(sp[1], p[1], part.answer[1]);
  }
  if (part.type === 'line') {
    const e = parseEquation(raw); if (!e) return false;
    const A = fnum(part.answer.m), B = -1, C = fnum(part.answer.b);
    const sc = Math.max(Math.abs(e.a), Math.abs(e.b), Math.abs(e.c), 1) * Math.max(Math.abs(A), 1, Math.abs(C));
    const eps = 1e-9 * sc;
    return Math.abs(e.a * B - e.b * A) < eps && Math.abs(e.a * C - e.c * A) < eps && Math.abs(e.b * C - e.c * B) < eps;
  }
  return false;
}

/* ------------------------------------------------------------- SVG kit */
const r1 = v => Math.round(v * 10) / 10;
function svgOpen(w, h, extra) { return '<svg class="fig" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg" role="img" ' + (extra || '') + '>'; }
function line(x1, y1, x2, y2, st) { return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" ' + (st || 'class="ln-main"') + '/>'; }
function text(x, y, s, st) { return '<text x="' + r1(x) + '" y="' + r1(y) + '" ' + (st || '') + '>' + s + '</text>'; }
function chevron(x, y) { return '<path d="M' + (x - 5) + ' ' + (y - 5) + ' L' + (x + 1) + ' ' + y + ' L' + (x - 5) + ' ' + (y + 5) + '" class="chev"/>'; }

/* Two horizontal lines cut by a transversal, drawn to scale (acute angle = theta).
   Positions: i=0 top line, i=1 bottom line; p in TL,TR,BL,BR. dir 1 = "/", -1 = "\" */
function transversalSVG(o) {
  const W = 360, H = 250, ys = [75, 175];
  const th = o.theta * Math.PI / 180;
  const dxPer = (ys[1] - ys[0]) / Math.tan(th);
  const xs = o.dir === 1 ? [W / 2 + dxPer / 2, W / 2 - dxPer / 2] : [W / 2 - dxPer / 2, W / 2 + dxPer / 2];
  const ext = 58, ex = ext / Math.tan(th);
  let s = svgOpen(W, H, 'aria-label="two lines cut by a transversal"');
  s += line(8, ys[0], W - 8, ys[0]) + line(8, ys[1], W - 8, ys[1]);
  s += line(xs[0] + o.dir * ex, ys[0] - ext, xs[1] - o.dir * ex, ys[1] + ext);
  if (o.arrows) s += chevron(W - 48, ys[0]) + chevron(W - 48, ys[1]);
  if (o.names) { s += text(W - 14, ys[0] - 9, o.names[0], 'class="lname"') + text(W - 14, ys[1] - 9, o.names[1], 'class="lname"'); }
  if (o.tname) s += text(xs[0] + o.dir * ex + 8, ys[0] - ext + 12, o.tname, 'class="lname"');
  const phi = o.dir === 1 ? th : Math.PI - th;
  const regions = { TR: [phi / 2, phi], TL: [(phi + Math.PI) / 2, Math.PI - phi], BL: [Math.PI + phi / 2, phi], BR: [(phi + Math.PI) / 2 + Math.PI, Math.PI - phi] };
  Object.keys(o.labels || {}).forEach(k => {
    const i = +k[0], p = k.slice(1), lab = o.labels[k];
    const reg = regions[p], beta = reg[0], width = reg[1];
    const small = o.numbered;
    let r = (small ? 15 : 21) / Math.sin(width / 2); r = Math.max(small ? 15 : 24, Math.min(small ? 34 : 50, r));
    const x = xs[i] + r * Math.cos(beta), y = ys[i] - r * Math.sin(beta);
    const c = Math.cos(beta);
    const anchor = small ? 'middle' : (c > 0.35 ? 'start' : c < -0.35 ? 'end' : 'middle');
    s += text(x, y, lab, 'class="' + (small ? 'anum' : 'alab') + '" text-anchor="' + anchor + '" dominant-baseline="middle"');
  });
  return s + '</svg>';
}

/* Coordinate grid */
function gridSVG(o) {
  let maxAbs = 4;
  (o.polys || []).forEach(P => P.pts.forEach(q => { maxAbs = Math.max(maxAbs, Math.abs(q[0]), Math.abs(q[1])); }));
  (o.points || []).forEach(P => { maxAbs = Math.max(maxAbs, Math.abs(P.p[0]), Math.abs(P.p[1])); });
  (o.vlines || []).concat(o.hlines || []).forEach(L => { maxAbs = Math.max(maxAbs, Math.abs(L.k)); });
  const R = Math.min(11, maxAbs + 1);
  const S = 320, pad = 16, u = (S - 2 * pad) / (2 * R);
  const X = x => pad + (x + R) * u, Y = y => pad + (R - y) * u;
  let s = svgOpen(S, S, 'aria-label="coordinate grid"');
  for (let k = -R; k <= R; k++) s += line(X(k), Y(-R), X(k), Y(R), 'class="gridln"') + line(X(-R), Y(k), X(R), Y(k), 'class="gridln"');
  s += line(X(-R), Y(0), X(R), Y(0), 'class="axis"') + line(X(0), Y(-R), X(0), Y(R), 'class="axis"');
  s += text(X(R) - 4, Y(0) - 6, 'x', 'class="axlab" text-anchor="end"') + text(X(0) + 6, Y(R) + 12, 'y', 'class="axlab"');
  const step = R > 7 ? 4 : 2;
  for (let k = -R + 1; k < R; k++) if (k !== 0 && k % step === 0) {
    s += text(X(k), Y(0) + 13, sn(k), 'class="tick" text-anchor="middle"') + text(X(0) - 4, Y(k) + 4, sn(k), 'class="tick" text-anchor="end"');
  }
  const dash = (lab, x1, y1, x2, y2, lx, ly, anchor) => line(X(x1), Y(y1), X(x2), Y(y2), 'class="mirror"') + (lab ? text(X(lx), Y(ly), lab, 'class="mlab" text-anchor="' + (anchor || 'start') + '"') : '');
  (o.vlines || []).forEach(L => { s += dash(L.label, L.k, -R, L.k, R, L.k + 0.25, R - 0.8); });
  (o.hlines || []).forEach(L => { s += dash(L.label, -R, L.k, R, L.k, R - 0.3, L.k + 0.35, 'end'); });
  (o.diags || []).forEach(L => { s += dash(L.label, -R, -R * L.m, R, R * L.m, L.m > 0 ? R - 1.6 : -R + 1.6, R - 0.9, L.m > 0 ? 'end' : 'start'); });
  (o.polys || []).forEach(P => {
    const cx = P.pts.reduce((a, q) => a + q[0], 0) / P.pts.length, cy = P.pts.reduce((a, q) => a + q[1], 0) / P.pts.length;
    const cls = P.cls || 'pre';
    s += '<polygon points="' + P.pts.map(q => r1(X(q[0])) + ',' + r1(Y(q[1]))).join(' ') + '" class="poly ' + cls + '"/>';
    P.pts.forEach((q, i) => {
      let dx = q[0] - cx, dy = q[1] - cy; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
      s += '<circle cx="' + r1(X(q[0])) + '" cy="' + r1(Y(q[1])) + '" r="3" class="dot ' + cls + '"/>';
      s += text(X(q[0]) + dx * 13, Y(q[1]) - dy * 13 + 5, P.names[i], 'class="vlab ' + cls + '" text-anchor="middle"');
    });
  });
  (o.points || []).forEach(P => {
    s += '<circle cx="' + r1(X(P.p[0])) + '" cy="' + r1(Y(P.p[1])) + '" r="4" class="dot ' + (P.cls || 'pre') + '"/>';
    s += text(X(P.p[0]) + 7, Y(P.p[1]) - 7, P.name, 'class="vlab ' + (P.cls || 'pre') + '"');
  });
  return s + '</svg>';
}

/* --------------------------------------------------------- angle stuff */
const ALL8 = [];
[0, 1].forEach(i => ['TL', 'TR', 'BL', 'BR'].forEach(p => ALL8.push({ i: i, p: p })));
const pkey = q => q.i + q.p;
const same = (a, b) => a.i === b.i && a.p === b.p;
function relation(a, b) {
  if (same(a, b)) return null;
  if (a.i === b.i) return (a.p[0] !== b.p[0] && a.p[1] !== b.p[1]) ? 'vertical' : 'linear';
  if (a.p === b.p) return 'corresponding';
  const top = a.i === 0 ? a : b, bot = a.i === 0 ? b : a;
  const sameSide = top.p[1] === bot.p[1];
  if (top.p[0] === 'B' && bot.p[0] === 'T') return sameSide ? 'consecInterior' : 'altInterior';
  if (top.p[0] === 'T' && bot.p[0] === 'B') return sameSide ? 'consecExterior' : 'altExterior';
  return null;
}
const USABLE = { vertical: 1, linear: 1, corresponding: 1, altInterior: 1, altExterior: 1, consecInterior: 1 };
const RELNAME = { vertical: 'vertical angles', linear: 'a linear pair', corresponding: 'corresponding angles', altInterior: 'alternate interior angles', altExterior: 'alternate exterior angles', consecInterior: 'consecutive interior angles' };
const THM = { vertical: 'Vertical Angles Congruence Theorem', linear: 'Linear Pair Postulate', corresponding: 'Corresponding Angles Theorem', altInterior: 'Alternate Interior Angles Theorem', altExterior: 'Alternate Exterior Angles Theorem', consecInterior: 'Consecutive Interior Angles Theorem' };
const CONV = { corresponding: 'Corresponding Angles Converse', altInterior: 'Alternate Interior Angles Converse', altExterior: 'Alternate Exterior Angles Converse', consecInterior: 'Consecutive Interior Angles Converse' };
const CONG = { vertical: true, corresponding: true, altInterior: true, altExterior: true, linear: false, consecInterior: false };
function angleVal(q, dir, A) { const acute = dir === 1 ? (q.p === 'TR' || q.p === 'BL') : (q.p === 'TL' || q.p === 'BR'); return acute ? A : 180 - A; }
function relSentence(rel, aName, bName) {
  return aName + ' and ' + bName + ' are ' + RELNAME[rel] + ', so by the <b>' + THM[rel] + '</b> they are ' + (CONG[rel] ? 'congruent' : 'supplementary') + '.';
}
const stripDeg = s => s.replace(/\u00B0/g, '');

/* ======================================================== TEMPLATES ==== */
const T = [];

/* 3.1 prism ----------------------------------------------------------- */
const PRISM_V = { A: [0, 0, 1], B: [1, 0, 1], C: [1, 1, 1], D: [0, 1, 1], E: [0, 0, 0], F: [1, 0, 0], G: [1, 1, 0], H: [0, 1, 0] };
const PRISM_E = ['AB', 'BC', 'CD', 'DA', 'EF', 'FG', 'GH', 'HE', 'AE', 'BF', 'CG', 'DH'];
const PRISM_F = [['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], ['A', 'B', 'F', 'E'], ['D', 'C', 'G', 'H'], ['A', 'D', 'H', 'E'], ['B', 'C', 'G', 'F']];
function edgeDir(e) { const a = PRISM_V[e[0]], b = PRISM_V[e[1]]; return [b[0] - a[0], b[1] - a[1], b[2] - a[2]]; }
function edgeRel(e1, e2) {
  if (e1 === e2) return 'same';
  if (e1[0] === e2[0] || e1[0] === e2[1] || e1[1] === e2[0] || e1[1] === e2[1]) return 'perpendicular';
  const d1 = edgeDir(e1), d2 = edgeDir(e2);
  return d1.every((v, i) => Math.abs(v) === Math.abs(d2[i])) ? 'parallel' : 'skew';
}
function prismSVG() {
  const P = v => { const c = PRISM_V[v]; return [70 + c[0] * 160 + c[1] * 75, 210 - c[2] * 120 - c[1] * 62]; };
  let s = svgOpen(330, 240, 'aria-label="rectangular prism"');
  s += '<polygon points="' + ['A', 'B', 'F', 'E'].map(v => P(v).map(r1).join(',')).join(' ') + '" class="face"/>';
  PRISM_E.forEach(e => { const a = P(e[0]), b = P(e[1]); s += line(a[0], a[1], b[0], b[1], e.indexOf('H') >= 0 ? 'class="ln-hid"' : 'class="ln-main"'); });
  const OFF = { A: [-14, 5], B: [-12, 21], C: [10, -6], D: [-10, -6], E: [-12, 17], F: [8, 19], G: [13, 6], H: [11, -6] };
  Object.keys(PRISM_V).forEach(v => { const p = P(v); s += text(p[0] + OFF[v][0], p[1] + OFF[v][1], v, 'class="vlab pre" text-anchor="middle"'); });
  return s + '</svg>';
}
T.push({ id: 'prism', section: '3.1', gen(rng) {
  const kind = rng.pick(['parallel', 'skew', 'perpendicular', 'plane']);
  if (kind === 'plane') {
    const fi = rng.int(0, 5), f = PRISM_F[fi], opp = fi % 2 === 0 ? fi + 1 : fi - 1;
    const nm = F => F.slice(0, 3).join('');
    const others = rng.shuffle([0, 1, 2, 3, 4, 5].filter(k => k !== fi && k !== opp)).slice(0, 3);
    const opts = rng.shuffle([opp].concat(others));
    return {
      prompt: 'Think of each segment in the figure as part of a line or plane. Which plane appears <b>parallel</b> to plane ' + nm(f) + '?',
      svg: prismSVG(),
      parts: [{ type: 'mc', choices: opts.map(k => 'Plane ' + nm(PRISM_F[k])), answer: opts.indexOf(opp) }],
      explanation: 'Parallel planes never intersect. Plane ' + nm(PRISM_F[opp]) + ' is the face opposite plane ' + nm(f) + '; each of the other faces shares an edge with plane ' + nm(f) + '.',
      params: { kind: kind, face: nm(f), choices: opts.map(k => nm(PRISM_F[k])) }
    };
  }
  const e = rng.pick(PRISM_E);
  const good = PRISM_E.filter(x => edgeRel(e, x) === kind);
  const bad = PRISM_E.filter(x => x !== e && edgeRel(e, x) !== kind);
  const ans = rng.pick(good);
  const opts = rng.shuffle([ans].concat(rng.shuffle(bad).slice(0, 3)));
  const why = {
    parallel: ln(ans) + ' and ' + ln(e) + ' are in the same plane and never intersect, so they are <b>parallel</b>.',
    skew: ln(ans) + ' and ' + ln(e) + ' do not intersect and are not in the same plane, so they are <b>skew</b>.',
    perpendicular: ln(ans) + ' and ' + ln(e) + ' intersect at a vertex of the box and form right angles, so they are <b>perpendicular</b>. (Lines that do not intersect cannot be perpendicular.)'
  }[kind];
  return {
    prompt: 'Think of each segment in the figure as part of a line. Which line appears <b>' + kind + '</b> to ' + ln(e) + '?',
    svg: prismSVG(),
    parts: [{ type: 'mc', choices: opts.map(ln), answer: opts.indexOf(ans) }],
    explanation: why,
    params: { kind: kind, edge: e, choices: opts }
  };
} });

/* 3.1 angle pair names ------------------------------------------------- */
const NUMBERING = { '0TL': 1, '0TR': 2, '0BL': 3, '0BR': 4, '1TL': 5, '1TR': 6, '1BL': 7, '1BR': 8 };
T.push({ id: 'anglePairName', section: '3.1', gen(rng) {
  const names = ['corresponding', 'altInterior', 'altExterior', 'consecInterior'];
  const want = rng.pick(names);
  let a, b;
  do { a = rng.pick(ALL8); b = rng.pick(ALL8); } while (relation(a, b) !== want);
  if (NUMBERING[pkey(a)] > NUMBERING[pkey(b)]) { const t = a; a = b; b = t; }
  const labels = {}; ALL8.forEach(q => { labels[pkey(q)] = String(NUMBERING[pkey(q)]); });
  const dir = rng.pick([1, -1]), theta = rng.int(52, 72);
  const disp = { corresponding: 'Corresponding angles', altInterior: 'Alternate interior angles', altExterior: 'Alternate exterior angles', consecInterior: 'Consecutive interior angles' };
  const defs = {
    corresponding: 'they are in the same relative position at each intersection.',
    altInterior: 'they lie between the two lines on opposite sides of the transversal.',
    altExterior: 'they lie outside the two lines on opposite sides of the transversal.',
    consecInterior: 'they lie between the two lines on the same side of the transversal.'
  };
  const na = NUMBERING[pkey(a)], nb = NUMBERING[pkey(b)];
  return {
    prompt: 'Line <i>t</i> is a transversal. Classify the pair of angles ' + ang(na) + ' and ' + ang(nb) + '.',
    svg: transversalSVG({ dir: dir, theta: theta, labels: labels, numbered: true, tname: 't' }),
    parts: [{ type: 'mc', choices: names.map(n => disp[n]), answer: names.indexOf(want) }],
    explanation: ang(na) + ' and ' + ang(nb) + ' are <b>' + disp[want].toLowerCase() + '</b> because ' + defs[want],
    params: { a: pkey(a), b: pkey(b), want: want }
  };
} });

/* 3.2 find x and y (numbers) ------------------------------------------- */
T.push({ id: 'xyBasic', section: '3.2', gen(rng) {
  const dir = rng.pick([1, -1]), A = rng.int(40, 78);
  const g = rng.pick(ALL8);
  const xp = rng.pick(ALL8.filter(q => q.i !== g.i && USABLE[relation(g, q)]));
  const yp = rng.pick(ALL8.filter(q => !same(q, g) && !same(q, xp) && USABLE[relation(xp, q)]));
  const gv = angleVal(g, dir, A), xv = angleVal(xp, dir, A), yv = angleVal(yp, dir, A);
  const labels = {}; labels[pkey(g)] = deg(gv); labels[pkey(xp)] = 'x\u00B0'; labels[pkey(yp)] = 'y\u00B0';
  const ra = relation(g, xp), rb = relation(xp, yp);
  return {
    prompt: 'The two horizontal lines are parallel. Find the values of <i>x</i> and <i>y</i>. Know which theorem you used.',
    svg: transversalSVG({ dir: dir, theta: A, labels: labels, arrows: true }),
    parts: [{ label: 'x =', type: 'num', answer: xv }, { label: 'y =', type: 'num', answer: yv }],
    explanation: relSentence(ra, 'x\u00B0', deg(gv)) + ' So x = ' + xv + '.<br>' + relSentence(rb, 'y\u00B0', 'x\u00B0') + ' So y = ' + (CONG[rb] ? xv : '180 ' + MINUS + ' ' + xv + ' = ' + yv) + '.',
    params: { dir: dir, A: A, given: [pkey(g), gv], x: pkey(xp), y: pkey(yp) }
  };
} });

/* 3.2 one expression + y ----------------------------------------------- */
function pickCoefConst(rng, target, opts) { // [a, b, x] with a*x + b = target, x integer
  opts = opts || {};
  const bmax = opts.bmax || 45;
  for (let tries = 0; tries < 200; tries++) {
    const a = rng.int(opts.amin || 2, opts.amax || 9);
    const lo = Math.max(opts.xmin || 3, Math.ceil((target - bmax) / a)), hi = Math.floor((target + bmax) / a);
    if (lo > hi) continue;
    const x = rng.int(lo, hi), b = target - a * x;
    if (b === 0 && !opts.allowZero) continue;
    return [a, b, x];
  }
  return null;
}
function eqText(rel, expr, gv) { return CONG[rel] ? stripDeg(expr) + ' = ' + gv : stripDeg(expr) + ' + ' + gv + ' = 180'; }
T.push({ id: 'xyExpr', section: '3.2', gen(rng) {
  for (;;) {
    const dir = rng.pick([1, -1]), A = rng.int(40, 78);
    const g = rng.pick(ALL8);
    const e = rng.pick(ALL8.filter(q => q.i !== g.i && USABLE[relation(g, q)]));
    const yp = rng.pick(ALL8.filter(q => !same(q, g) && !same(q, e) && USABLE[relation(g, q)]));
    const gv = angleVal(g, dir, A), ev = angleVal(e, dir, A), yv = angleVal(yp, dir, A);
    const abx = pickCoefConst(rng, ev); if (!abx) continue;
    const a = abx[0], b = abx[1], x = abx[2];
    const lab = linExpr(a, b, 'x');
    const labels = {}; labels[pkey(g)] = deg(gv); labels[pkey(e)] = lab; labels[pkey(yp)] = 'y\u00B0';
    const rx = relation(g, e), ry = relation(g, yp);
    return {
      prompt: 'The two horizontal lines are parallel. Find the values of <i>x</i> and <i>y</i>.',
      svg: transversalSVG({ dir: dir, theta: A, labels: labels, arrows: true }),
      parts: [{ label: 'x =', type: 'num', answer: x }, { label: 'y =', type: 'num', answer: yv }],
      explanation: relSentence(rx, lab, deg(gv)) + ' Solve ' + eqText(rx, lab, gv) + ' \u2192 x = ' + x + '.<br>' + relSentence(ry, 'y\u00B0', deg(gv)) + ' So y = ' + yv + '.',
      params: { dir: dir, A: A, given: [pkey(g), gv], expr: [pkey(e), a, b], y: pkey(yp) }
    };
  }
} });

/* 3.2 two expressions (x and y) ---------------------------------------- */
T.push({ id: 'xyTwoExpr', section: '3.2', gen(rng) {
  for (;;) {
    const dir = rng.pick([1, -1]), A = rng.int(40, 78);
    const g = rng.pick(ALL8);
    const p1 = rng.pick(ALL8.filter(q => USABLE[relation(g, q)]));
    const p2 = rng.pick(ALL8.filter(q => !same(q, p1) && USABLE[relation(g, q)] && (q.i !== g.i || p1.i !== g.i)));
    const gv = angleVal(g, dir, A), v1 = angleVal(p1, dir, A), v2 = angleVal(p2, dir, A);
    const s1 = pickCoefConst(rng, v1, { bmax: 40 }), s2 = pickCoefConst(rng, v2, { bmax: 40 });
    if (!s1 || !s2) continue;
    const ly = linExpr(s1[0], s1[1], 'y'), lx = linExpr(s2[0], s2[1], 'x');
    const labels = {}; labels[pkey(g)] = deg(gv); labels[pkey(p1)] = ly; labels[pkey(p2)] = lx;
    const ra = relation(g, p2), rb = relation(g, p1);
    return {
      prompt: 'The two horizontal lines are parallel. Find the values of <i>x</i> and <i>y</i>.',
      svg: transversalSVG({ dir: dir, theta: A, labels: labels, arrows: true }),
      parts: [{ label: 'x =', type: 'num', answer: s2[2] }, { label: 'y =', type: 'num', answer: s1[2] }],
      explanation: relSentence(ra, lx, deg(gv)) + ' ' + eqText(ra, lx, gv) + ' \u2192 x = ' + s2[2] + '.<br>' + relSentence(rb, ly, deg(gv)) + ' ' + eqText(rb, ly, gv) + ' \u2192 y = ' + s1[2] + '.',
      params: { dir: dir, A: A, given: [pkey(g), gv], exprY: [pkey(p1), s1[0], s1[1]], exprX: [pkey(p2), s2[0], s2[1]] }
    };
  }
} });

/* 3.3 converse, congruent pair ----------------------------------------- */
T.push({ id: 'converseCong', section: '3.3', gen(rng) {
  for (;;) {
    const dir = rng.pick([1, -1]), A = rng.int(40, 78);
    const rel = rng.pick(['corresponding', 'altInterior', 'altExterior']);
    let p1, p2; do { p1 = rng.pick(ALL8.filter(q => q.i === 0)); p2 = rng.pick(ALL8.filter(q => q.i === 1)); } while (relation(p1, p2) !== rel);
    const V = angleVal(p1, dir, A);
    const x = rng.int(4, 30), a1 = rng.int(2, 9), a2 = rng.int(1, 8);
    if (a1 === a2) continue;
    const b1 = V - a1 * x, b2 = V - a2 * x;
    if (Math.abs(b1) > 90 || Math.abs(b2) > 90 || (b1 === 0 && b2 === 0)) continue;
    const e1 = linExpr(a1, b1, 'x'), e2 = linExpr(a2, b2, 'x');
    const labels = {}; labels[pkey(p1)] = e1; labels[pkey(p2)] = e2;
    return {
      prompt: 'Find the value of <i>x</i> that makes <i>m</i> \u2225 <i>n</i>. Then find the measure of each labeled angle.',
      svg: transversalSVG({ dir: dir, theta: A, labels: labels, names: ['m', 'n'] }),
      parts: [{ label: 'x =', type: 'num', answer: x }, { label: 'Each angle =', type: 'num', answer: V, unit: '\u00B0' }],
      explanation: 'The angles are ' + RELNAME[rel] + '. By the <b>' + CONV[rel] + '</b>, <i>m</i> \u2225 <i>n</i> when they are congruent: ' + stripDeg(e1) + ' = ' + stripDeg(e2) + ' \u2192 x = ' + x + '. Each angle = ' + deg(V) + '.',
      params: { dir: dir, A: A, e1: [pkey(p1), a1, b1], e2: [pkey(p2), a2, b2], rel: rel }
    };
  }
} });

/* 3.3 converse, consecutive interior ----------------------------------- */
T.push({ id: 'converseSupp', section: '3.3', gen(rng) {
  for (;;) {
    const dir = rng.pick([1, -1]), A = rng.int(40, 78);
    const side = rng.pick(['L', 'R']);
    const p1 = { i: 0, p: 'B' + side }, p2 = { i: 1, p: 'T' + side };
    const swap = rng.chance(0.5);
    const P1 = swap ? p2 : p1, P2 = swap ? p1 : p2;
    const V1 = angleVal(P1, dir, A), V2 = 180 - V1;
    const s1 = pickCoefConst(rng, V1, { bmax: 40 }); if (!s1) continue;
    const plain = rng.chance(0.35);
    let a2 = 0, b2 = V2;
    if (!plain) { a2 = rng.int(1, 6); b2 = V2 - a2 * s1[2]; if (Math.abs(b2) > 60 || a2 === s1[0]) continue; }
    const e1 = linExpr(s1[0], s1[1], 'x'), e2 = plain ? deg(V2) : linExpr(a2, b2, 'x');
    const labels = {}; labels[pkey(P1)] = e1; labels[pkey(P2)] = e2;
    return {
      prompt: 'Find the value of <i>x</i> that makes <i>m</i> \u2225 <i>n</i>. Then find the measure of the angle labeled ' + e1 + '.',
      svg: transversalSVG({ dir: dir, theta: A, labels: labels, names: ['m', 'n'] }),
      parts: [{ label: 'x =', type: 'num', answer: s1[2] }, { label: 'Angle =', type: 'num', answer: V1, unit: '\u00B0' }],
      explanation: 'The angles are consecutive interior angles. By the <b>Consecutive Interior Angles Converse</b>, <i>m</i> \u2225 <i>n</i> when they are supplementary: ' + stripDeg(e1) + ' + ' + stripDeg(e2) + ' = 180 \u2192 x = ' + s1[2] + '. The angle is ' + s1[0] + '(' + s1[2] + ')' + (s1[1] < 0 ? ' ' + MINUS + ' ' + (-s1[1]) : ' + ' + s1[1]) + ' = ' + deg(V1) + '.',
      params: { dir: dir, A: A, e1: [pkey(P1), s1[0], s1[1]], e2: [pkey(P2), a2, b2] }
    };
  }
} });

/* 3.1/3.3/3.4 postulates & theorems ------------------------------------ */
const THEOREMS = [
  ['Parallel Postulate', 'If there is a line and a point not on the line, then there is exactly one line through the point <b>parallel</b> to the given line.', '3.1'],
  ['Perpendicular Postulate', 'If there is a line and a point not on the line, then there is exactly one line through the point <b>perpendicular</b> to the given line.', '3.1'],
  ['Transitive Property of Parallel Lines', 'If two lines are parallel to the same line, then they are parallel to each other.', '3.3'],
  ['Alternate Interior Angles Converse', 'If two lines are cut by a transversal so the alternate interior angles are congruent, then the lines are parallel.', '3.3'],
  ['Consecutive Interior Angles Converse', 'If two lines are cut by a transversal so the consecutive interior angles are supplementary, then the lines are parallel.', '3.3'],
  ['Linear Pair Perpendicular Theorem', 'If two lines intersect to form a linear pair of congruent angles, then the lines are perpendicular.', '3.4'],
  ['Perpendicular Transversal Theorem', 'In a plane, if a transversal is perpendicular to one of two parallel lines, then it is perpendicular to the other line.', '3.4'],
  ['Lines Perpendicular to a Transversal Theorem', 'In a plane, if two lines are perpendicular to the same line, then they are parallel to each other.', '3.4']
];
T.push({ id: 'theoremId', section: '3.1\u20133.4', gen(rng) {
  const i = rng.int(0, THEOREMS.length - 1);
  const others = rng.shuffle(THEOREMS.map((t, k) => k).filter(k => k !== i)).slice(0, 3);
  const opts = rng.shuffle([i].concat(others));
  return {
    prompt: 'Which postulate or theorem is stated below?<blockquote>' + THEOREMS[i][1] + '</blockquote>',
    parts: [{ type: 'mc', choices: opts.map(k => THEOREMS[k][0]), answer: opts.indexOf(i) }],
    explanation: 'This is the <b>' + THEOREMS[i][0] + '</b> (Section ' + THEOREMS[i][2] + ').',
    params: { idx: i, choices: opts }
  };
} });

/* 3.4 which lines must be parallel ------------------------------------ */
function closurePar(marks) {
  const perp = new Set(marks), par = new Set();
  let changed = true;
  while (changed) {
    changed = false;
    const add = (S, k) => { if (!S.has(k)) { S.add(k); changed = true; } };
    ['c', 'd'].forEach(v => { if (perp.has('a' + v) && perp.has('b' + v)) add(par, 'ab'); });
    ['a', 'b'].forEach(h => { if (perp.has(h + 'c') && perp.has(h + 'd')) add(par, 'cd'); });
    if (par.has('ab')) ['c', 'd'].forEach(v => { if (perp.has('a' + v)) add(perp, 'b' + v); if (perp.has('b' + v)) add(perp, 'a' + v); });
    if (par.has('cd')) ['a', 'b'].forEach(h => { if (perp.has(h + 'c')) add(perp, h + 'd'); if (perp.has(h + 'd')) add(perp, h + 'c'); });
  }
  return { perp: perp, par: par };
}
T.push({ id: 'mustParallel', section: '3.4', gen(rng) {
  const twos = [['ac', 'bc'], ['ad', 'bd'], ['ac', 'ad'], ['bc', 'bd'], ['ac', 'bd'], ['ad', 'bc']];
  const threes = [['ac', 'ad', 'bc'], ['ac', 'ad', 'bd'], ['ac', 'bc', 'bd'], ['ad', 'bc', 'bd']];
  const marks = rng.chance(0.25) ? rng.pick(threes) : rng.pick(twos);
  const cl = closurePar(marks);
  const ab = cl.par.has('ab'), cd = cl.par.has('cd');
  const ans = ab && cd ? 2 : ab ? 0 : cd ? 1 : 3;
  // drawing: unforced lines are tilted so the picture never "proves" more than the marks do
  const hB = ab ? 0 : 8;
  const angOf = v => cl.perp.has('a' + v) ? 90 : cl.perp.has('b' + v) ? 90 + hB : 101;
  const Ls = { a: [180, 70, 0], b: [180, 162, hB], c: [125, 116, angOf('c')], d: [240, 116, angOf('d')] };
  const dirv = L => { const t = L[2] * Math.PI / 180; return [Math.cos(t), -Math.sin(t)]; };
  let s = svgOpen(360, 230, 'aria-label="lines a, b, c, d"');
  Object.keys(Ls).forEach(k => { const L = Ls[k], d = dirv(L); s += line(L[0] - d[0] * 300, L[1] - d[1] * 300, L[0] + d[0] * 300, L[1] + d[1] * 300); });
  const inter = (h, v) => { const P = Ls[h], Q = Ls[v], u = dirv(P), w = dirv(Q); const den = u[0] * w[1] - u[1] * w[0]; const t = ((Q[0] - P[0]) * w[1] - (Q[1] - P[1]) * w[0]) / den; return [P[0] + u[0] * t, P[1] + u[1] * t]; };
  marks.forEach(m => {
    const P = inter(m[0], m[1]), u = dirv(Ls[m[0]]); let w = dirv(Ls[m[1]]); if (w[1] > 0) w = [-w[0], -w[1]];
    const z = 11;
    s += '<path d="M' + r1(P[0] + u[0] * z) + ' ' + r1(P[1] + u[1] * z) + ' L' + r1(P[0] + u[0] * z + w[0] * z) + ' ' + r1(P[1] + u[1] * z + w[1] * z) + ' L' + r1(P[0] + w[0] * z) + ' ' + r1(P[1] + w[1] * z) + '" class="rmark"/>';
  });
  const yAt = (L, x) => { const d = dirv(L); return L[1] + d[1] * (x - L[0]) / d[0]; };
  const xAt = (L, y) => { const d = dirv(L); return L[0] + d[0] * (y - L[1]) / d[1]; };
  s += text(348, yAt(Ls.a, 348) - 8, 'a', 'class="lname" text-anchor="end"') + text(348, yAt(Ls.b, 348) - 8, 'b', 'class="lname" text-anchor="end"');
  s += text(xAt(Ls.c, 16) + 8, 16, 'c', 'class="lname"') + text(xAt(Ls.d, 16) + 8, 16, 'd', 'class="lname"');
  s += '</svg>';
  const choices = ['<i>a</i> \u2225 <i>b</i> only', '<i>c</i> \u2225 <i>d</i> only', 'Both <i>a</i> \u2225 <i>b</i> and <i>c</i> \u2225 <i>d</i>', 'Neither pair must be parallel'];
  const reasons = [];
  ['c', 'd'].forEach(v => { if (marks.indexOf('a' + v) >= 0 && marks.indexOf('b' + v) >= 0) reasons.push('<i>a</i> and <i>b</i> are both perpendicular to <i>' + v + '</i>, so <i>a</i> \u2225 <i>b</i>'); });
  ['a', 'b'].forEach(h => { if (marks.indexOf(h + 'c') >= 0 && marks.indexOf(h + 'd') >= 0) reasons.push('<i>c</i> and <i>d</i> are both perpendicular to <i>' + h + '</i>, so <i>c</i> \u2225 <i>d</i>'); });
  let expl;
  if (ans === 3) expl = 'Each marked right angle involves a different pair of lines, so no two lines are known to be perpendicular to the <i>same</i> line. The <b>Lines Perpendicular to a Transversal Theorem</b> does not apply, so neither pair must be parallel.';
  else {
    expl = reasons.join('; ') + ' (<b>Lines Perpendicular to a Transversal Theorem</b>).';
    if (ans === 2 && reasons.length < 2) expl += ' Then the <b>Perpendicular Transversal Theorem</b> gives another right angle, so the other pair is parallel too.';
    if (ans !== 2) expl += ' The other pair has no common perpendicular, so it does not have to be parallel.';
  }
  return {
    prompt: 'Use only the marked right angles. Which lines <b>must</b> be parallel?',
    svg: s,
    parts: [{ type: 'mc', choices: choices, answer: ans }],
    explanation: expl,
    params: { marks: marks }
  };
} });

/* 3.5 parallel & perpendicular lines ----------------------------------- */
function lineThrough(rng, m) {
  for (;;) {
    const x0 = rng.int(-6, 6), y0 = rng.int(-8, 8);
    if ((m.n * x0) % m.d !== 0) continue;
    const b = fsub(Fr(y0), fmul(m, Fr(x0)));
    if (b.d !== 1 || Math.abs(b.n) > 20) continue;
    return { P: [x0, y0], b: b };
  }
}
T.push({ id: 'parallelLine', section: '3.5', gen(rng) {
  const m = rng.pick([Fr(2), Fr(3), Fr(-2), Fr(-3), Fr(1), Fr(-1), Fr(1, 2), Fr(-1, 2), Fr(1, 3), Fr(-2, 3), Fr(3, 4), Fr(-4)]);
  let L, b0;
  do { L = lineThrough(rng, m); b0 = rng.int(-9, 9); } while (b0 === L.b.n);
  return {
    prompt: 'Write an equation of the line that passes through ' + pt(L.P) + ' and is <b>parallel</b> to ' + lineEq(m, Fr(b0), true) + '.',
    parts: [{ label: 'Equation:', type: 'line', answer: { m: m, b: L.b } }],
    explanation: 'Parallel lines have the <b>same slope</b>, so <i>m</i> = ' + fracHTML(m) + '. Substitute ' + pt(L.P) + ' into <i>y</i> = <i>mx</i> + <i>b</i>: ' + sn(L.P[1]) + ' = ' + fracHTML(m) + '(' + sn(L.P[0]) + ') + <i>b</i>, so <i>b</i> = ' + sn(L.b.n) + '.',
    params: { m: m, b0: b0, P: L.P }
  };
} });
T.push({ id: 'perpLine', section: '3.5', gen(rng) {
  const m = rng.pick([Fr(2), Fr(-2), Fr(3), Fr(-3), Fr(1, 2), Fr(-1, 2), Fr(1, 3), Fr(-1, 3), Fr(2, 3), Fr(-3, 2), Fr(1), Fr(-1), Fr(4), Fr(-1, 4)]);
  const mp = fdiv(Fr(-1), m);
  const L = lineThrough(rng, mp), b0 = rng.int(-9, 9);
  return {
    prompt: 'Write an equation of the line that passes through ' + pt(L.P) + ' and is <b>perpendicular</b> to ' + lineEq(m, Fr(b0), true) + '.',
    parts: [{ label: 'Equation:', type: 'line', answer: { m: mp, b: L.b } }],
    explanation: 'Slopes of perpendicular lines multiply to ' + MINUS + '1, so use the negative reciprocal of ' + fracHTML(m) + ': <i>m</i> = ' + fracHTML(mp) + '. Substitute ' + pt(L.P) + ': ' + sn(L.P[1]) + ' = ' + fracHTML(mp) + '(' + sn(L.P[0]) + ') + <i>b</i>, so <i>b</i> = ' + sn(L.b.n) + '.',
    params: { m: m, b0: b0, P: L.P }
  };
} });
T.push({ id: 'slopeClassify', section: '3.5', gen(rng) {
  for (;;) {
    const kind = rng.pick(['parallel', 'perpendicular', 'neither']);
    const d = rng.pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, -2], [2, -1], [1, -3], [3, -2], [1, 1], [1, -1]]);
    const P1 = [rng.int(-6, 6), rng.int(-6, 6)], k1 = rng.pick([1, 2, -1]);
    const P2 = [P1[0] + k1 * d[0], P1[1] + k1 * d[1]];
    let d2;
    if (kind === 'parallel') d2 = d;
    else if (kind === 'perpendicular') d2 = [-d[1], d[0]];
    else d2 = rng.pick([[d[1], d[0]], [d[0], -d[1]], [d[0] + 1, d[1]], [-d[1], -d[0]]]);
    const cross = d[0] * d2[1] - d[1] * d2[0], dot = d[0] * d2[0] + d[1] * d2[1];
    if (kind === 'neither' && (cross === 0 || dot === 0)) continue;
    if (d2[0] === 0) continue;
    const P3 = [rng.int(-6, 6), rng.int(-6, 6)], k2 = rng.pick([1, 2, -1]);
    const P4 = [P3[0] + k2 * d2[0], P3[1] + k2 * d2[1]];
    if ([P2, P4].some(p => Math.abs(p[0]) > 9 || Math.abs(p[1]) > 9)) continue;
    if (kind === 'parallel' && ((P3[0] - P1[0]) * d[1] - (P3[1] - P1[1]) * d[0]) === 0) continue;
    const s1 = Fr(P2[1] - P1[1], P2[0] - P1[0]), s2 = Fr(P4[1] - P3[1], P4[0] - P3[0]);
    return {
      prompt: 'Line 1 passes through ' + pt(P1) + ' and ' + pt(P2) + '. Line 2 passes through ' + pt(P3) + ' and ' + pt(P4) + '. Are the lines parallel, perpendicular, or neither?',
      parts: [{ type: 'mc', choices: ['Parallel', 'Perpendicular', 'Neither'], answer: ['parallel', 'perpendicular', 'neither'].indexOf(kind) }],
      explanation: 'Slope of line 1 = ' + fracHTML(s1) + '; slope of line 2 = ' + fracHTML(s2) + '. ' + (kind === 'parallel' ? 'Equal slopes (and different lines) \u2192 <b>parallel</b>.' : kind === 'perpendicular' ? 'The product of the slopes is ' + MINUS + '1 \u2192 <b>perpendicular</b>.' : 'The slopes are not equal and their product is not ' + MINUS + '1 \u2192 <b>neither</b>.'),
      params: { P: [P1, P2, P3, P4] }
    };
  }
} });
T.push({ id: 'distance', section: '3.5', gen(rng) {
  for (;;) {
    const pq = rng.pick([[1, 1], [-1, 1], [2, 1], [-2, 1], [1, 2], [-1, 2], [3, 1], [-3, 1]]);
    const p = pq[0], q = pq[1], m = Fr(p, q);
    const Fx = q * rng.int(-3, 3), Fy = rng.int(-5, 5);
    const b = fsub(Fr(Fy), fmul(m, Fr(Fx)));
    if (b.d !== 1 || b.n === 0) continue;
    const t = rng.pick(Math.abs(p) === 1 && q === 1 ? [-3, -2, 2, 3] : [-2, -1, 1, 2]);
    const A = [Fx - t * p, Fy + t * q];
    if (Math.abs(A[0]) > 9 || Math.abs(A[1]) > 9) continue;
    const n2 = t * t * (p * p + q * q), rad = simplifyRadical(n2), dist = Math.sqrt(n2);
    const mp = fdiv(Fr(-1), m);
    return {
      prompt: 'Find the distance from point <i>A</i>' + pt(A) + ' to the line ' + lineEq(m, b, true) + '.<br><small>(a) First find the point on the line closest to <i>A</i>. (b) Then find the distance (exact radical or rounded to the nearest hundredth).</small>',
      parts: [{ label: '(a) Closest point:', type: 'point', answer: [Fx, Fy] }, { label: '(b) Distance:', type: 'num', answer: dist, approx: rad[1] !== 1, display: radText(rad[0], rad[1]) + (rad[1] !== 1 ? ' \u2248 ' + dist.toFixed(2) : ''), key: radText(rad[0], rad[1]) }],
      explanation: 'The distance from a point to a line is the length of the <b>perpendicular segment</b>. The perpendicular through <i>A</i> has slope ' + fracHTML(mp) + ' (negative reciprocal); it meets the line at ' + pt([Fx, Fy]) + '. Distance Formula: \u221A((' + sn(A[0]) + ' ' + MINUS + ' ' + sn(Fx) + ')\u00B2 + (' + sn(A[1]) + ' ' + MINUS + ' ' + sn(Fy) + ')\u00B2) = \u221A' + n2 + ' = ' + radText(rad[0], rad[1]) + '.',
      params: { A: A, m: m, b: b }
    };
  }
} });
T.push({ id: 'partition', section: '3.5', gen(rng) {
  for (;;) {
    const r = rng.pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 4], [3, 4]]);
    const s = r[0] + r[1];
    const A = [rng.int(-8, 4), rng.int(-8, 8)], u = rng.intNZ(-3, 3), v = rng.intNZ(-3, 3);
    const B = [A[0] + s * u, A[1] + s * v];
    if (Math.abs(B[0]) > 12 || Math.abs(B[1]) > 12) continue;
    const P = [A[0] + r[0] * u, A[1] + r[0] * v];
    return {
      prompt: 'Find the coordinates of point <i>P</i> along the directed line segment <i>AB</i>, from <i>A</i>' + pt(A) + ' to <i>B</i>' + pt(B) + ', so that the ratio of <i>AP</i> to <i>PB</i> is ' + r[0] + ' to ' + r[1] + '.',
      parts: [{ label: 'P =', type: 'point', answer: P }],
      explanation: 'P is ' + r[0] + '/' + s + ' of the way from A to B. Run = ' + sn(B[0] - A[0]) + ', rise = ' + sn(B[1] - A[1]) + '. P = (' + sn(A[0]) + ' + ' + r[0] + '/' + s + '\u00B7' + sn(B[0] - A[0]) + ', ' + sn(A[1]) + ' + ' + r[0] + '/' + s + '\u00B7' + sn(B[1] - A[1]) + ') = ' + pt(P) + '.',
      params: { A: A, B: B, r: r }
    };
  }
} });

/* ----------------------------------------------------- Ch 4 helpers --- */
function randTri(rng, lo, hi, mult) {
  mult = mult || 1;
  for (;;) {
    const P = [0, 1, 2].map(() => [rng.int(lo, hi) * mult, rng.int(lo, hi) * mult]);
    const a2 = Math.abs((P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[1][1] - P[0][1]) * (P[2][0] - P[0][0]));
    const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
    if (a2 < 6 * mult * mult) continue;
    if (Math.min(d(P[0], P[1]), d(P[1], P[2]), d(P[0], P[2])) < 2 * mult) continue;
    return P;
  }
}
const inR = (pts, R) => pts.every(p => Math.abs(p[0]) <= R && Math.abs(p[1]) <= R);
const z0 = p => [p[0] + 0, p[1] + 0];
const REFL = {
  x: { name: 'the <i>x</i>-axis', f: p => [p[0], -p[1]], rule: '(<i>a</i>, <i>b</i>) \u2192 (<i>a</i>, ' + MINUS + '<i>b</i>)' },
  y: { name: 'the <i>y</i>-axis', f: p => [-p[0], p[1]], rule: '(<i>a</i>, <i>b</i>) \u2192 (' + MINUS + '<i>a</i>, <i>b</i>)' },
  yx: { name: 'the line <i>y</i> = <i>x</i>', f: p => [p[1], p[0]], rule: '(<i>a</i>, <i>b</i>) \u2192 (<i>b</i>, <i>a</i>)' },
  ynx: { name: 'the line <i>y</i> = ' + MINUS + '<i>x</i>', f: p => [-p[1], -p[0]], rule: '(<i>a</i>, <i>b</i>) \u2192 (' + MINUS + '<i>b</i>, ' + MINUS + '<i>a</i>)' }
};
const ROT = {
  90: { f: p => [-p[1], p[0]], rule: '(<i>a</i>, <i>b</i>) \u2192 (' + MINUS + '<i>b</i>, <i>a</i>)' },
  180: { f: p => [-p[0], -p[1]], rule: '(<i>a</i>, <i>b</i>) \u2192 (' + MINUS + '<i>a</i>, ' + MINUS + '<i>b</i>)' },
  270: { f: p => [p[1], -p[0]], rule: '(<i>a</i>, <i>b</i>) \u2192 (<i>b</i>, ' + MINUS + '<i>a</i>)' }
};
function ruleText(v) { return '(<i>x</i>, <i>y</i>) \u2192 (<i>x</i> ' + (v[0] < 0 ? MINUS + ' ' + (-v[0]) : '+ ' + v[0]) + ', <i>y</i> ' + (v[1] < 0 ? MINUS + ' ' + (-v[1]) : '+ ' + v[1]) + ')'; }

/* 4.1 translation vector from graph ------------------------------------ */
T.push({ id: 'translateGraph', section: '4.1', gen(rng) {
  for (;;) {
    const P = randTri(rng, -6, 6), v = [rng.intNZ(-6, 6), rng.intNZ(-6, 6)];
    const Q = P.map(p => [p[0] + v[0], p[1] + v[1]]);
    if (!inR(Q, 9)) continue;
    return {
      prompt: tri('ABC') + ' (blue) is translated to ' + tri('A' + PRIME + 'B' + PRIME + 'C' + PRIME) + ' (red). Write the translation vector \u27E8<i>a</i>, <i>b</i>\u27E9, so the rule is (<i>x</i>, <i>y</i>) \u2192 (<i>x</i> + <i>a</i>, <i>y</i> + <i>b</i>).',
      svg: gridSVG({ polys: [{ pts: P, names: ['A', 'B', 'C'] }, { pts: Q, names: ['A' + PRIME, 'B' + PRIME, 'C' + PRIME], cls: 'img' }] }),
      parts: [{ label: 'Vector:', type: 'vector', answer: v }],
      explanation: 'Compare a vertex with its image: A' + pt(P[0]) + ' \u2192 A' + PRIME + pt(Q[0]) + ' moves ' + moveText(v) + '. Vector ' + vec(v) + '; rule ' + ruleText(v) + '.',
      params: { P: P, Q: Q }
    };
  }
} });
T.push({ id: 'translateCompose', section: '4.1', gen(rng) {
  for (;;) {
    const P = [rng.intNZ(-6, 6), rng.intNZ(-6, 6)];
    const v1 = [rng.intNZ(-5, 5), rng.intNZ(-5, 5)], v2 = [rng.intNZ(-5, 5), rng.intNZ(-5, 5)];
    const v = [v1[0] + v2[0], v1[1] + v2[1]], Q = [P[0] + v[0], P[1] + v[1]];
    if (!inR([Q, [P[0] + v1[0], P[1] + v1[1]]], 10) || v[0] === 0 || v[1] === 0) continue;
    return {
      prompt: 'Point <i>P</i>' + pt(P) + ' is translated using ' + ruleText(v1) + ', and then its image is translated using ' + ruleText(v2) + '.<br>(a) Find the final image <i>P</i>' + DPRIME + '. (b) Write one translation vector that does the same thing.',
      parts: [{ label: '(a) P' + DPRIME + ' =', type: 'point', answer: Q }, { label: '(b) Vector:', type: 'vector', answer: v }],
      explanation: 'A composition of translations is a translation: add the vectors. ' + vec(v1) + ' + ' + vec(v2) + ' = ' + vec(v) + ', so <i>P</i>' + DPRIME + ' = ' + pt(Q) + '.',
      params: { P: P, v1: v1, v2: v2 }
    };
  }
} });

/* 4.2 reflection of a triangle ----------------------------------------- */
T.push({ id: 'reflectTri', section: '4.2', gen(rng) {
  for (;;) {
    const kind = rng.pick(['x', 'y', 'yx', 'ynx', 'xk', 'yk']);
    const P = randTri(rng, -6, 6);
    let f, name, rule, k = 0;
    const gopt = {};
    if (REFL[kind]) {
      f = REFL[kind].f; name = REFL[kind].name; rule = REFL[kind].rule;
      if (kind === 'yx') gopt.diags = [{ m: 1, label: 'y = x' }];
      if (kind === 'ynx') gopt.diags = [{ m: -1, label: 'y = ' + MINUS + 'x' }];
    } else if (kind === 'xk') {
      k = rng.intNZ(-4, 4); f = p => [2 * k - p[0], p[1]]; name = 'the line <i>x</i> = ' + sn(k);
      rule = '(<i>a</i>, <i>b</i>) \u2192 (2(' + sn(k) + ') ' + MINUS + ' <i>a</i>, <i>b</i>)'; gopt.vlines = [{ k: k, label: 'x = ' + sn(k) }];
    } else {
      k = rng.intNZ(-4, 4); f = p => [p[0], 2 * k - p[1]]; name = 'the line <i>y</i> = ' + sn(k);
      rule = '(<i>a</i>, <i>b</i>) \u2192 (<i>a</i>, 2(' + sn(k) + ') ' + MINUS + ' <i>b</i>)'; gopt.hlines = [{ k: k, label: 'y = ' + sn(k) }];
    }
    const Q = P.map(f).map(z0);
    if (!inR(Q, 9)) continue;
    if (Q.slice(0, 2).some((q, i) => q[0] === P[i][0] && q[1] === P[i][1])) continue; // no fixed A or B
    gopt.polys = [{ pts: P, names: ['A', 'B', 'C'] }];
    return {
      prompt: 'Reflect ' + tri('ABC') + ' in ' + name + '. Find the coordinates of <i>A</i>' + PRIME + ' and <i>B</i>' + PRIME + '.',
      svg: gridSVG(gopt),
      parts: [{ label: 'A' + PRIME + ' =', type: 'point', answer: Q[0] }, { label: 'B' + PRIME + ' =', type: 'point', answer: Q[1] }],
      explanation: 'Reflection in ' + name + ': ' + rule + '. A' + pt(P[0]) + ' \u2192 ' + pt(Q[0]) + ', B' + pt(P[1]) + ' \u2192 ' + pt(Q[1]) + '. Each image is the same distance from the line as its preimage.',
      params: { kind: kind, k: k, P: P }
    };
  }
} });

/* 4.2/4.3 compositions (glide reflection, reflect then rotate) ---------- */
T.push({ id: 'composeRigid', section: '4.2\u20134.3', gen(rng) {
  for (;;) {
    const P = [rng.intNZ(-6, 6), rng.intNZ(-6, 6)];
    if (rng.chance(0.5)) {
      const v = rng.chance(0.5) ? [rng.intNZ(-6, 6), 0] : [0, rng.intNZ(-6, 6)];
      const ax = v[1] === 0 ? 'x' : 'y'; // glide: translation is parallel to the line of reflection
      const P1 = [P[0] + v[0], P[1] + v[1]], Q = z0(REFL[ax].f(P1));
      if (!inR([P1, Q], 10)) continue;
      return {
        prompt: 'Find the image of <i>P</i>' + pt(P) + ' after this <b>glide reflection</b>.<br>Translation: ' + ruleText(v) + '<br>Reflection: in ' + REFL[ax].name,
        parts: [{ label: 'P' + DPRIME + ' =', type: 'point', answer: Q }],
        explanation: 'Translate first: ' + pt(P) + ' \u2192 ' + pt(P1) + '. Then reflect in ' + REFL[ax].name + ' using ' + REFL[ax].rule + ': ' + pt(P1) + ' \u2192 ' + pt(Q) + '.',
        params: { type: 'glide', P: P, v: v, ax: ax }
      };
    }
    const ax = rng.pick(['x', 'y']), a = rng.pick([90, 180, 270]);
    const P1 = z0(REFL[ax].f(P)), Q = z0(ROT[a].f(P1));
    return {
      prompt: 'Point <i>P</i>' + pt(P) + ' is reflected in ' + REFL[ax].name + ' and then rotated ' + a + '\u00B0 counterclockwise about the origin. Find the final image <i>P</i>' + DPRIME + '.',
      parts: [{ label: 'P' + DPRIME + ' =', type: 'point', answer: Q }],
      explanation: 'Reflect: ' + REFL[ax].rule + ' gives ' + pt(P1) + '. Rotate ' + a + '\u00B0: ' + ROT[a].rule + ' gives ' + pt(Q) + '.',
      params: { type: 'reflrot', P: P, ax: ax, a: a }
    };
  }
} });

/* 4.2/4.3 symmetry ------------------------------------------------------ */
function regPoly(n, r, r2) {
  const pts = [], m = r2 ? 2 * n : n;
  for (let i = 0; i < m; i++) { const t = Math.PI / 2 + 2 * Math.PI * i / m; const rr = r2 && i % 2 ? r2 : r; pts.push([rr * Math.cos(t), -rr * Math.sin(t)]); }
  return pts;
}
const SHAPES = [
  { name: 'equilateral triangle', pts: () => regPoly(3, 85).map(p => [p[0], p[1] + 15]), lines: 3, rot: 120 },
  { name: 'square', pts: () => [[-65, -65], [65, -65], [65, 65], [-65, 65]], lines: 4, rot: 90 },
  { name: 'regular pentagon', pts: () => regPoly(5, 85), lines: 5, rot: 72 },
  { name: 'regular hexagon', pts: () => regPoly(6, 85), lines: 6, rot: 60 },
  { name: 'regular octagon', pts: () => regPoly(8, 85), lines: 8, rot: 45 },
  { name: 'rectangle (not a square)', pts: () => [[-95, -50], [95, -50], [95, 50], [-95, 50]], lines: 2, rot: 180 },
  { name: 'rhombus (not a square)', pts: () => [[-95, 0], [0, -58], [95, 0], [0, 58]], lines: 2, rot: 180 },
  { name: 'parallelogram (not a rectangle or rhombus)', pts: () => [[-95, 45], [45, 45], [95, -45], [-45, -45]], lines: 0, rot: 180 },
  { name: 'isosceles trapezoid', pts: () => [[-95, 45], [95, 45], [50, -45], [-50, -45]], lines: 1, rot: 0 },
  { name: 'kite', pts: () => [[0, -75], [55, -25], [0, 85], [-55, -25]], lines: 1, rot: 0 },
  { name: 'isosceles triangle (not equilateral)', pts: () => [[0, -80], [55, 70], [-55, 70]], lines: 1, rot: 0 },
  { name: 'regular five-pointed star', pts: () => regPoly(5, 92, 37).map(p => [p[0], p[1] + 8]), lines: 5, rot: 72 },
  { name: 'regular six-pointed star', pts: () => regPoly(6, 92, 50), lines: 6, rot: 60 }
];
T.push({ id: 'symmetry', section: '4.2\u20134.3', gen(rng) {
  const si = rng.int(0, SHAPES.length - 1), S = SHAPES[si], P = S.pts();
  const svg = svgOpen(260, 210, 'aria-label="' + S.name + '"') + '<polygon points="' + P.map(p => r1(p[0] + 130) + ',' + r1(p[1] + 105)).join(' ') + '" class="shape"/></svg>';
  const pool = [45, 60, 72, 90, 120, 180].filter(a => a !== S.rot);
  const opts = rng.shuffle(rng.shuffle(pool).slice(0, S.rot ? 3 : 4).concat(S.rot ? [S.rot] : [])).concat([0]);
  const lab = a => a ? a + '\u00B0' : 'No rotational symmetry';
  const short = S.name.replace(/ \(.*\)/, '');
  return {
    prompt: 'The figure is a <b>' + S.name + '</b>.<br>(a) How many lines of symmetry does it have? (b) What is the <i>smallest</i> angle of rotation (less than 360\u00B0) that maps it onto itself?',
    svg: svg,
    parts: [{ label: '(a) Lines of symmetry:', type: 'num', answer: S.lines }, { label: '(b)', type: 'mc', choices: opts.map(lab), answer: opts.indexOf(S.rot) }],
    explanation: 'A' + (/^[aeiou]/.test(short) ? 'n ' : ' ') + short + ' has ' + S.lines + ' line' + (S.lines === 1 ? '' : 's') + ' of symmetry. ' + (S.rot ? 'It has <b>rotational symmetry</b>: a rotation of ' + S.rot + '\u00B0 (360\u00B0 \u00F7 ' + (360 / S.rot) + ') and its multiples map it onto itself.' : 'No rotation of less than 360\u00B0 maps it onto itself, so it has <b>no rotational symmetry</b>.'),
    params: { si: si, pts: P, choices: opts }
  };
} });

/* 4.3 rotation of a triangle ------------------------------------------- */
T.push({ id: 'rotateTri', section: '4.3', gen(rng) {
  const a = rng.pick([90, 180, 270]);
  let P; do { P = randTri(rng, -6, 6); } while (P.slice(0, 2).some(p => p[0] === 0 && p[1] === 0));
  const Q = P.map(ROT[a].f).map(z0);
  return {
    prompt: 'Rotate ' + tri('ABC') + ' ' + a + '\u00B0 counterclockwise about the origin. Find <i>A</i>' + PRIME + ' and <i>B</i>' + PRIME + '.',
    svg: gridSVG({ polys: [{ pts: P, names: ['A', 'B', 'C'] }] }),
    parts: [{ label: 'A' + PRIME + ' =', type: 'point', answer: Q[0] }, { label: 'B' + PRIME + ' =', type: 'point', answer: Q[1] }],
    explanation: 'Rotation of ' + a + '\u00B0 about the origin: ' + ROT[a].rule + '. A' + pt(P[0]) + ' \u2192 ' + pt(Q[0]) + ', B' + pt(P[1]) + ' \u2192 ' + pt(Q[1]) + '.',
    params: { a: a, P: P }
  };
} });

/* 4.4 reflections in parallel lines ------------------------------------ */
T.push({ id: 'reflParallel', section: '4.4', gen(rng) {
  for (;;) {
    const vert = rng.chance(0.5);
    const k1 = rng.int(-4, 4), k2 = k1 + rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
    const P = [rng.int(-6, 6), rng.int(-6, 6)];
    let P1, P2;
    if (vert) { P1 = [2 * k1 - P[0], P[1]]; P2 = [2 * k2 - P1[0], P[1]]; } else { P1 = [P[0], 2 * k1 - P[1]]; P2 = [P[0], 2 * k2 - P1[1]]; }
    if (!inR([P1, P2], 10) || Math.abs(k2) > 8) continue;
    if ((vert ? P[0] : P[1]) === k1) continue;
    const v = vert ? 'x' : 'y', d = 2 * Math.abs(k2 - k1);
    const g = { points: [{ p: P, name: 'P' }] };
    g[vert ? 'vlines' : 'hlines'] = [{ k: k1, label: 'k' }, { k: k2, label: 'm' }];
    return {
      prompt: 'Point <i>P</i>' + pt(P) + ' is reflected in line <i>k</i>: <i>' + v + '</i> = ' + sn(k1) + ', and then its image is reflected in line <i>m</i>: <i>' + v + '</i> = ' + sn(k2) + '.<br>(a) Find <i>P</i>' + DPRIME + '. (b) The composition is the same as a translation of how many units?',
      svg: gridSVG(g),
      parts: [{ label: '(a) P' + DPRIME + ' =', type: 'point', answer: P2 }, { label: '(b) Units:', type: 'num', answer: d }],
      explanation: 'P \u2192 P' + PRIME + pt(P1) + ' \u2192 P' + DPRIME + pt(P2) + '. By the <b>Reflections in Parallel Lines Theorem</b>, this equals a translation of <b>twice</b> the distance between the lines: 2 \u00D7 ' + Math.abs(k2 - k1) + ' = ' + d + ' units, perpendicular to the lines.',
      params: { vert: vert, k1: k1, k2: k2, P: P }
    };
  }
} });

/* 4.4 reflections in intersecting lines -------------------------------- */
T.push({ id: 'reflIntersect', section: '4.4', gen(rng) {
  const a = 5 * rng.int(4, 17);
  const W = 300, H = 200, C = [110, 135];
  const t = a * Math.PI / 180;
  let s = svgOpen(W, H, 'aria-label="intersecting lines k and m"');
  s += line(C[0] - 100, C[1], C[0] + 180, C[1]);
  const up = Math.min(170, (C[1] - 10) / Math.sin(t)), dn = Math.min(150, (H - C[1] - 8) / Math.sin(t));
  s += line(C[0] - dn * Math.cos(t), C[1] + dn * Math.sin(t), C[0] + up * Math.cos(t), C[1] - up * Math.sin(t));
  const ra = 34;
  s += '<path d="M' + (C[0] + ra) + ' ' + C[1] + ' A' + ra + ' ' + ra + ' 0 0 0 ' + r1(C[0] + ra * Math.cos(t)) + ' ' + r1(C[1] - ra * Math.sin(t)) + '" class="arc"/>';
  s += text(C[0] + (ra + 8) * Math.cos(t / 2), C[1] - (ra + 8) * Math.sin(t / 2), a + '\u00B0', 'class="alab" dominant-baseline="middle"');
  s += text(C[0] + 180, C[1] - 8, 'k', 'class="lname" text-anchor="end"') + text(C[0] + up * Math.cos(t) + 8, C[1] - up * Math.sin(t) + 12, 'm', 'class="lname"');
  s += '<circle cx="' + C[0] + '" cy="' + C[1] + '" r="3" class="dot pre"/>' + text(C[0] - 8, C[1] + 18, 'P', 'class="vlab pre" text-anchor="end"');
  s += '</svg>';
  return {
    prompt: 'Lines <i>k</i> and <i>m</i> intersect at point <i>P</i> and form a ' + a + '\u00B0 angle. A figure is reflected in line <i>k</i> and then in line <i>m</i>. The result is the same as a rotation about <i>P</i> of how many degrees?',
    svg: s,
    parts: [{ label: 'Rotation:', type: 'num', answer: 2 * a, unit: '\u00B0' }],
    explanation: 'By the <b>Reflections in Intersecting Lines Theorem</b>, the composition is a rotation about <i>P</i> of <b>twice</b> the angle between the lines: 2 \u00D7 ' + a + '\u00B0 = ' + (2 * a) + '\u00B0.',
    params: { a: a }
  };
} });

/* 4.4 / 4.6 transformation-description MC ------------------------------- */
const BASES = {
  T: { f: p => p, d: '' },
  Rx: { f: REFL.x.f, d: 'a reflection in the <i>x</i>-axis' },
  Ry: { f: REFL.y.f, d: 'a reflection in the <i>y</i>-axis' },
  R90: { f: ROT[90].f, d: 'a rotation of 90\u00B0 counterclockwise about the origin' },
  R180: { f: ROT[180].f, d: 'a rotation of 180\u00B0 about the origin' },
  R270: { f: ROT[270].f, d: 'a rotation of 270\u00B0 counterclockwise about the origin' }
};
function applySpec(spec, p) { // dilation k (about origin) -> base motion -> translation v
  const k = spec.k || Fr(1);
  let q = [p[0] * k.n / k.d, p[1] * k.n / k.d];
  q = BASES[spec.base].f(q);
  return z0([q[0] + spec.v[0], q[1] + spec.v[1]]);
}
function describeSpec(spec) {
  const parts = [];
  if (spec.k && !(spec.k.n === 1 && spec.k.d === 1)) parts.push('a dilation with center at the origin and <i>k</i> = ' + fracHTML(spec.k));
  if (spec.base !== 'T') parts.push(BASES[spec.base].d);
  if (spec.v[0] || spec.v[1]) parts.push('a translation ' + moveText(spec.v));
  if (!parts.length) return 'No transformation';
  let s = parts[0]; for (let i = 1; i < parts.length; i++) s += ', followed by ' + parts[i];
  return s.charAt(0).toUpperCase() + s.slice(1);
}
const sameList = (A, B) => A.every((p, i) => Math.abs(p[0] - B[i][0]) < 1e-9 && Math.abs(p[1] - B[i][1]) < 1e-9);
function buildSpecMC(rng, P, truth, distractor) {
  const Q = P.map(p => applySpec(truth, p));
  const specs = [truth], seen = new Set([describeSpec(truth)]);
  let guard = 0;
  while (specs.length < 4 && guard++ < 500) {
    const d = distractor(Q);
    const img = P.map(p => applySpec(d, p)), desc = describeSpec(d);
    if (desc === 'No transformation' || seen.has(desc) || sameList(img, Q) || !img.every(q => Number.isInteger(q[0]) && Number.isInteger(q[1]))) continue;
    seen.add(desc); specs.push(d);
  }
  if (specs.length < 4) return null;
  const order = rng.shuffle([0, 1, 2, 3]);
  return { Q: Q, specs: order.map(i => specs[i]), answer: order.indexOf(0) };
}
T.push({ id: 'congruenceMap', section: '4.4', gen(rng) {
  for (;;) {
    const P = randTri(rng, -5, 5);
    const base = rng.pick(['T', 'Rx', 'Ry', 'R90', 'R180', 'R270']);
    const v = [rng.int(-5, 5), rng.int(-5, 5)];
    if (base === 'T' && (v[0] === 0 || v[1] === 0)) continue;
    if (base !== 'T' && v[0] === 0 && v[1] === 0) continue;
    const truth = { base: base, v: v };
    const mc = buildSpecMC(rng, P, truth, Q => {
      const b = rng.pick(['T', 'Rx', 'Ry', 'R90', 'R180', 'R270']);
      const img0 = BASES[b].f(P[0]);
      const vv = rng.chance(0.6) ? [Q[0][0] - img0[0], Q[0][1] - img0[1]] : [v[0] + rng.int(-2, 2), v[1] + rng.int(-2, 2)];
      return { base: b, v: vv };
    });
    if (!mc || !inR(mc.Q, 9)) continue;
    const names = ['D', 'E', 'F'], inames = ['J', 'K', 'L'];
    return {
      prompt: tri('DEF') + ' (blue) has vertices ' + names.map((n, i) => n + pt(P[i])).join(', ') + '. ' + tri('JKL') + ' (red) has vertices ' + inames.map((n, i) => n + pt(mc.Q[i])).join(', ') + '. Which congruence transformation maps ' + tri('DEF') + ' to ' + tri('JKL') + ' (D\u2192J, E\u2192K, F\u2192L)?',
      svg: gridSVG({ polys: [{ pts: P, names: names }, { pts: mc.Q, names: inames, cls: 'img' }] }),
      parts: [{ type: 'mc', choices: mc.specs.map(describeSpec), answer: mc.answer }],
      explanation: describeSpec(truth) + ' maps D' + pt(P[0]) + ' \u2192 J' + pt(mc.Q[0]) + ', E' + pt(P[1]) + ' \u2192 K' + pt(mc.Q[1]) + ', F' + pt(P[2]) + ' \u2192 L' + pt(mc.Q[2]) + '. Rigid motions preserve size and shape, so this is a <b>congruence transformation</b>. Tip: check every vertex — some choices work for D only.',
      params: { P: P, Q: mc.Q, specs: mc.specs }
    };
  }
} });

/* 4.5 dilation of points ---------------------------------------------- */
T.push({ id: 'dilate', section: '4.5', gen(rng) {
  for (;;) {
    const k = rng.pick([Fr(2), Fr(3), Fr(-2), Fr(-3), Fr(1, 2), Fr(-1, 2), Fr(1, 3), Fr(3, 2), Fr(-1, 3), Fr(1, 4)]);
    const lim = Math.floor(Math.min(9, 10 / Math.abs(fnum(k))) / k.d);
    const P = randTri(rng, -lim, lim, k.d);
    const Q = P.map(p => z0([p[0] * k.n / k.d, p[1] * k.n / k.d]));
    if (Q.slice(0, 2).some(q => q[0] === 0 && q[1] === 0)) continue;
    const big = Math.abs(fnum(k)) > 1;
    return {
      prompt: tri('ABC') + ' has vertices <i>A</i>' + pt(P[0]) + ', <i>B</i>' + pt(P[1]) + ', <i>C</i>' + pt(P[2]) + '. Find <i>A</i>' + PRIME + ' and <i>B</i>' + PRIME + ' after a dilation with center at the origin and scale factor <i>k</i> = ' + fracHTML(k) + '.',
      parts: [{ label: 'A' + PRIME + ' =', type: 'point', answer: Q[0] }, { label: 'B' + PRIME + ' =', type: 'point', answer: Q[1] }],
      explanation: 'Dilation centered at the origin: (<i>x</i>, <i>y</i>) \u2192 (<i>kx</i>, <i>ky</i>). Multiply each coordinate by ' + fracHTML(k) + ': A' + PRIME + pt(Q[0]) + ', B' + PRIME + pt(Q[1]) + '. Since |<i>k</i>| ' + (big ? '> 1, it is an <b>enlargement</b>' : '< 1, it is a <b>reduction</b>') + (k.n < 0 ? '; a negative <i>k</i> puts the image on the opposite side of the center (like an extra 180\u00B0 rotation).' : '.'),
      params: { k: k, P: P }
    };
  }
} });

/* 4.5 scale factor word problems --------------------------------------- */
function dec(x) { return String(Math.round(x * 1000) / 1000); }
T.push({ id: 'scaleWord', section: '4.5', gen(rng) {
  const variant = rng.int(0, 2);
  const ER = ['Enlargement', 'Reduction'];
  if (variant === 0) {
    const k = rng.pick([4, 5, 6, 8, 10]), actual = rng.int(11, 29) / 10, image = Math.round(k * actual * 100) / 100;
    const k2 = rng.pick([2, 3, 4, 5, 6, 8, 10, 12].filter(z => z !== k)), image2 = Math.round(k2 * actual * 100) / 100;
    const bug = rng.pick(['ladybug', 'ant', 'beetle', 'spider', 'bee']);
    return {
      prompt: 'A magnifying glass shows an image that is ' + k + ' times the actual size of an object. The image of a ' + bug + ' is ' + dec(image) + ' centimeters long.<br>(a) How long is the actual ' + bug + '? (b) Through a different magnifying glass, the image of the same ' + bug + ' is ' + dec(image2) + ' cm long. What is that glass\u2019s scale factor?',
      parts: [{ label: '(a) Length (cm):', type: 'num', answer: actual }, { label: '(b) Scale factor:', type: 'num', answer: k2 }],
      explanation: 'Image length = <i>k</i> \u00D7 actual length. (a) Actual = ' + dec(image) + ' \u00F7 ' + k + ' = ' + dec(actual) + ' cm. (b) <i>k</i> = image \u00F7 actual = ' + dec(image2) + ' \u00F7 ' + dec(actual) + ' = ' + k2 + ' (an enlargement, since <i>k</i> > 1).',
      params: { variant: 0, k: k, image: image, image2: image2 }
    };
  }
  if (variant === 1) {
    const w = rng.pick([4, 5, 6, 8]), h = w + rng.pick([2, 3, 4]), k = rng.pick([Fr(1, 2), Fr(3, 2), Fr(2), Fr(1, 4), Fr(5, 2)]);
    const nh = h * fnum(k);
    return {
      prompt: 'A photograph is ' + w + ' inches by ' + h + ' inches. It is dilated by a scale factor of ' + fracHTML(k) + '.<br>(a) What is the length of the longer side of the new photo, in inches? (b) Is the dilation an enlargement or a reduction?',
      parts: [{ label: '(a) Longer side:', type: 'num', answer: nh }, { label: '(b)', type: 'mc', choices: ER, answer: fnum(k) > 1 ? 0 : 1 }],
      explanation: 'Multiply each length by <i>k</i>: ' + h + ' \u00D7 ' + fracText(k) + ' = ' + dec(nh) + ' in. Since <i>k</i> ' + (fnum(k) > 1 ? '> 1, it is an <b>enlargement</b>.' : '< 1, it is a <b>reduction</b>.'),
      params: { variant: 1, w: w, h: h, k: k }
    };
  }
  const pre = rng.pick([4, 6, 8, 10, 12]);
  const k = rng.pick([Fr(1, 2), Fr(3, 2), Fr(5, 2), Fr(1, 4), Fr(3, 4), Fr(3), Fr(2)]);
  const img = pre * fnum(k);
  return {
    prompt: 'A side of a triangle is ' + pre + ' cm long. After a dilation, the corresponding side of the image is ' + dec(img) + ' cm long.<br>(a) Find the scale factor <i>k</i>. (b) Is the dilation an enlargement or a reduction?',
    parts: [{ label: '(a) k =', type: 'num', answer: fnum(k), display: fracText(k) + (k.d !== 1 ? ' = ' + dec(fnum(k)) : ''), key: fracText(k) }, { label: '(b)', type: 'mc', choices: ER, answer: fnum(k) > 1 ? 0 : 1 }],
    explanation: '<i>k</i> = image length \u00F7 preimage length = ' + dec(img) + ' \u00F7 ' + pre + ' = ' + fracText(k) + '. ' + (fnum(k) > 1 ? '<i>k</i> > 1, so it is an <b>enlargement</b>.' : '0 < <i>k</i> < 1, so it is a <b>reduction</b>.'),
    params: { variant: 2, pre: pre, img: img }
  };
} });

/* 4.6 similarity transformation ----------------------------------------- */
T.push({ id: 'similarity', section: '4.6', gen(rng) {
  for (;;) {
    const congruent = rng.chance(0.25);
    const k = congruent ? Fr(1) : rng.pick([Fr(2), Fr(3), Fr(-2), Fr(-3), Fr(1, 2), Fr(-1, 2)]);
    const P = randTri(rng, -3, 3, k.d);
    const base = congruent ? rng.pick(['Rx', 'Ry', 'R90', 'R180']) : rng.pick(['T', 'T', 'Rx', 'Ry', 'R90']);
    const v = congruent || rng.chance(0.4) ? [rng.int(-3, 3), rng.int(-3, 3)] : [0, 0];
    const truth = { k: k, base: base, v: v };
    const ks = [Fr(2), Fr(3), Fr(-2), Fr(-3), Fr(1, 2), Fr(-1, 2), Fr(1, 3), Fr(-1, 3), Fr(1)];
    const mc = buildSpecMC(rng, P, truth, () => {
      const kk = rng.chance(0.5) ? fmul(k, Fr(-1)) : rng.pick(ks);
      const b = rng.pick(['T', 'Rx', 'Ry', 'R90', 'R180']);
      const vv = rng.chance(0.5) ? v.slice() : [rng.int(-3, 3), rng.int(-3, 3)];
      return { k: kk, base: b, v: vv };
    });
    if (!mc || !inR(mc.Q, 10) || !inR(P, 9)) continue;
    return {
      prompt: tri('ABC') + ' has vertices <i>A</i>' + pt(P[0]) + ', <i>B</i>' + pt(P[1]) + ', <i>C</i>' + pt(P[2]) + '. ' + tri('RST') + ' has vertices <i>R</i>' + pt(mc.Q[0]) + ', <i>S</i>' + pt(mc.Q[1]) + ', <i>T</i>' + pt(mc.Q[2]) + '.<br>(a) Which transformation maps ' + tri('ABC') + ' to ' + tri('RST') + ' (A\u2192R, B\u2192S, C\u2192T)? (b) Are the triangles congruent, or similar but not congruent?',
      parts: [{ label: '(a)', type: 'mc', choices: mc.specs.map(describeSpec), answer: mc.answer }, { label: '(b)', type: 'mc', choices: ['Congruent', 'Similar but not congruent'], answer: congruent ? 0 : 1 }],
      explanation: describeSpec(truth) + ' maps A' + pt(P[0]) + ' \u2192 R' + pt(mc.Q[0]) + ', B \u2192 S, C \u2192 T (check all three). ' + (congruent ? 'Only rigid motions are used, so the triangles are <b>congruent</b>.' : 'A <b>similarity transformation</b> is a dilation combined with rigid motions. Side lengths are multiplied by |<i>k</i>| = ' + fracHTML(Fr(Math.abs(k.n), k.d)) + ', so the triangles are <b>similar but not congruent</b>.'),
      params: { P: P, Q: mc.Q, specs: mc.specs, congruent: congruent }
    };
  }
} });

/* -------------------------------------------------------- answer keys */
function keyText(part) { // plain-text correct answer (also a valid typed answer)
  if (part.key) return part.key;
  if (part.type === 'num') return Number.isInteger(part.answer) ? sn(part.answer) : String(part.answer);
  if (part.type === 'point') return pt(part.answer);
  if (part.type === 'vector') return vec(part.answer);
  if (part.type === 'line') return lineEq(part.answer.m, part.answer.b, false);
  return '';
}
function answerHTML(part) {
  if (part.type === 'mc' || part.type === 'select') return part.choices[part.answer];
  if (part.type === 'line') return lineEq(part.answer.m, part.answer.b, true);
  if (part.type === 'num') return (part.display || keyText(part)) + (part.unit || '');
  return keyText(part);
}

/* --------------------------------------------------------- test build */
function generateTest(seed) {
  const rng = makeRng(seed);
  return T.map((t, i) => {
    const q = t.gen(rng);
    q.tid = t.id; q.section = t.section; q.n = i + 1;
    q.parts.forEach(p => { p.keyText = keyText(p); p.answerHTML = answerHTML(p); });
    q.points = q.parts.length;
    return q;
  });
}

return {
  generateTest: generateTest, grade: grade, templates: T, makeRng: makeRng,
  parseNumber: parseNumber, parsePoint: parsePoint, parseEquation: parseEquation,
  Fr: Fr, fnum: fnum, closurePar: closurePar, SHAPES: SHAPES, THEOREMS: THEOREMS,
  PRISM_V: PRISM_V, PRISM_F: PRISM_F, keyText: keyText, describeSpec: describeSpec, answerHTML: answerHTML,
  lib: { makeRng, gcd, Fr, fadd, fsub, fmul, fdiv, fnum, MINUS, PRIME, DPRIME, sn, fracHTML, fracText, pt, vec, lineEq, linExpr, deg,
    simplifyRadical, radText, moveText, tri, ln, ang, r1, svgOpen, line, text, chevron, transversalSVG, gridSVG, ALL8, pkey, same, relation,
    RELNAME, THM, CONV, CONG, angleVal, NUMBERING, randTri, inR, z0, REFL, ROT, regPoly, ruleText, keyText, answerHTML, normalize }
};
});
