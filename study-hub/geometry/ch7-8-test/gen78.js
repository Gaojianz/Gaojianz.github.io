/* Chapter 7 & 8 Test Prep generator. Every number and every worked solution is generated together, fresh each attempt.
   Part types: {t:'num',l,a} number · {t:'pt',l,a:[x,y]} point · {t:'mc',l,c:[choices],a:index} */
(function(root){
'use strict';
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[ri(0,a.length-1)];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=ri(0,i);[a[i],a[j]]=[a[j],a[i]]}return a}
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
function fr(v){if(Number.isInteger(v))return String(v).replace('-','−');for(let d=2;d<=200;d++){const n=Math.round(v*d);if(Math.abs(n/d-v)<1e-9){return (n<0?'−':'')+Math.abs(n)+'/'+d}}return String(+v.toFixed(3))}
const P=(x,y)=>'('+fr(x)+', '+fr(y)+')';
// polynomial string a x² + b x + c
function poly(a,b,c){let s='';const term=(k,v,first)=>{if(k===0)return '';const sg=k<0?(first?'−':' − '):(first?'':' + ');const m=Math.abs(k);return sg+(v&&m===1?'':m)+v};
 s+=term(a,'x²',true);s+=term(b,'x',s==='');s+=term(c,'',s==='');return s||'0'}
const lin=(a,b)=>poly(0,a,b);
const num=(l,a)=>({t:'num',l,a});
const pt=(l,a)=>({t:'pt',l,a});
function mcp(l,correct,wrong){const c=shuffle([correct,...wrong]);return {t:'mc',l,c,a:c.indexOf(correct)}}
// roots of x² + bx + c
function roots(b,c){const D=b*b-4*c;if(D<0)return [];const s=Math.sqrt(D);return [(-b+s)/2,(-b-s)/2]}
function retry(f){for(let i=0;i<5000;i++){const q=f();if(q)return q}throw Error('generator failed')}

/* ---------- A. Fourth vertex: all three possibilities (weak spot) ---------- */
function fourthVertex(){return retry(()=>{
 const A=[ri(-6,6),ri(-6,6)],B=[ri(-6,6),ri(-6,6)],C=[ri(-6,6),ri(-6,6)];
 const cross=(B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]);if(Math.abs(cross)<6)return null;
 const L=pick([['A','B','C','D'],['P','Q','R','S'],['J','K','L','M'],['W','X','Y','Z']]);const [a,b,c,d]=L;
 const D1=[A[0]+C[0]-B[0],A[1]+C[1]-B[1]],D2=[B[0]+C[0]-A[0],B[1]+C[1]-A[1]],D3=[A[0]+B[0]-C[0],A[1]+B[1]-C[1]];
 const area=Math.abs(cross);
 return {s:'Ch 7 · Parallelogram: all possible 4th vertices',w:1,
  p:`Three vertices of a parallelogram are ${a}${P(...A)}, ${b}${P(...B)} and ${c}${P(...C)}. The fourth vertex ${d} is <b>not</b> specified, so there are <b>three</b> possible locations. Find all three, then find the area (it is the same for all three). Enter points like <code>3, −2</code>.`,
  parts:[pt(`${d}₁ so that ${a}${b}${c}${d}₁ is a parallelogram (diagonals ${a}${c} and ${b}${d}₁)`,D1),pt(`${d}₂ so that ${a}${b}${d}₂${c} is a parallelogram (diagonals ${a}${d}₂ and ${b}${c})`,D2),pt(`${d}₃ so that ${a}${d}₃${b}${c} is a parallelogram (diagonals ${a}${b} and ${c}${d}₃)`,D3),num('Area of each parallelogram',area)],
  e:[`Key idea: in a parallelogram the diagonals bisect each other, so the two vertices on one diagonal add up to the same point as the two on the other diagonal. The missing vertex can be opposite ${a}, opposite ${b}, or opposite ${c} — that is why there are 3 answers. Writing only one loses points.`,
   `Opposite ${b} (${a}${b}${c}${d}₁): ${d}₁ = ${a} + ${c} − ${b} = ${P(A[0]+C[0],A[1]+C[1])} − ${P(...B)} = <b>${P(...D1)}</b>. Check: midpoint of ${a}${c} = ${P((A[0]+C[0])/2,(A[1]+C[1])/2)} = midpoint of ${b}${d}₁.`,
   `Opposite ${a} (${a}${b}${d}₂${c}): ${d}₂ = ${b} + ${c} − ${a} = <b>${P(...D2)}</b>.`,
   `Opposite ${c} (${a}${d}₃${b}${c}): ${d}₃ = ${a} + ${b} − ${c} = <b>${P(...D3)}</b>.`,
   `Area: each parallelogram is two copies of △${a}${b}${c}. Using vectors ${a}${b} = ${P(B[0]-A[0],B[1]-A[1])} and ${a}${c} = ${P(C[0]-A[0],C[1]-A[1])}: area = |(${B[0]-A[0]})(${C[1]-A[1]}) − (${B[1]-A[1]})(${C[0]-A[0]})| = <b>${area}</b>.`]}})}

/* ---------- B. Two-column proofs: pick the correct reason (weak spot) ---------- */
const R={given:'Given',base:'Base Angles Theorem (if two sides of a △ are ≅, the angles opposite them are ≅)',isoDef:'Definition of isosceles triangle',baseConv:'Converse of the Base Angles Theorem',bis:'Definition of angle bisector',mid:'Definition of midpoint',trans:'Transitive Property of Congruence',refl:'Reflexive Property of Congruence',sym:'Symmetric Property of Congruence',aiaConv:'Alternate Interior Angles Converse',aia:'Alternate Interior Angles Theorem',corr:'Corresponding Angles Theorem',corrConv:'Corresponding Angles Converse',vert:'Vertical Angles Congruence Theorem',sas:'SAS Congruence Theorem',asa:'ASA Congruence Theorem',sss:'SSS Congruence Theorem',cpctc:'Corresponding parts of ≅ triangles are ≅ (CPCTC)',trapDef:'Definition of trapezoid (exactly one pair of parallel sides)',pgDef:'Definition of parallelogram (both pairs of opposite sides parallel)',pgSides:'Parallelogram Opposite Sides Theorem',notPar:'If both pairs were parallel, it would be a parallelogram with opposite sides ≅ — contradicts the given',aa:'AA Similarity Theorem',sasSim:'SAS Similarity Theorem',sssSim:'SSS Similarity Theorem',simSides:'Corresponding sides of similar triangles are proportional',pgOppConv:'Parallelogram Opposite Sides Converse',ssp:'Consecutive Interior Angles Theorem'};
const PROOFS=[
 // quiz-style trapezoid
 (V)=>{const [A,B,C,D]=V;return {title:`Given: ${A}${B} ≅ ${B}${C}, ${A}${C} bisects ∠${B}${A}${D}, ${A}${B} ≇ ${C}${D}.<br>Prove: ${A}${B}${C}${D} is a trapezoid.`,
  steps:[[`${A}${B} ≅ ${B}${C}`,'given',[]],[`∠${B}${A}${C} ≅ ∠${B}${C}${A}`,'base',['isoDef','baseConv','refl']],[`${A}${C} bisects ∠${B}${A}${D}`,'given',[]],[`∠${B}${A}${C} ≅ ∠${C}${A}${D}`,'bis',['mid','vert','sym']],[`∠${B}${C}${A} ≅ ∠${C}${A}${D}`,'trans',['refl','sym','cpctc']],[`${B}${C} ∥ ${A}${D}`,'aiaConv',['aia','corrConv','pgDef']],[`${A}${B} ∦ ${C}${D}`,'notPar',['given','aiaConv','pgSides']],[`${A}${B}${C}${D} is a trapezoid`,'trapDef',['pgDef','pgOppConv','base']]],
  ask:[1,3,4,5,6,7],extra:mcp(`Why is step "${A}${B} ∦ ${C}${D}" needed at all?`,'A trapezoid needs exactly one pair of parallel sides, so you must rule out the second pair',['It proves the base angles are congruent','It is needed to use the Alternate Interior Angles Converse','It is not needed; one parallel pair is enough to be a trapezoid'])}},
 // one pair parallel and congruent -> parallelogram
 (V)=>{const [A,B,C,D]=V;return {title:`Given: ${A}${B} ∥ ${C}${D}, ${A}${B} ≅ ${C}${D}.<br>Prove: ${A}${B}${C}${D} is a parallelogram.`,
  steps:[[`${A}${B} ∥ ${C}${D}`,'given',[]],[`∠${B}${A}${C} ≅ ∠${D}${C}${A}`,'aia',['aiaConv','corr','vert']],[`${A}${B} ≅ ${C}${D}`,'given',[]],[`${A}${C} ≅ ${C}${A}`,'refl',['sym','trans','given']],[`△${B}${A}${C} ≅ △${D}${C}${A}`,'sas',['asa','sss','aa']],[`∠${B}${C}${A} ≅ ∠${D}${A}${C}`,'cpctc',['aia','trans','base']],[`${B}${C} ∥ ${A}${D}`,'aiaConv',['aia','corrConv','cpctc']],[`${A}${B}${C}${D} is a parallelogram`,'pgDef',['trapDef','pgOppConv','sas']]],
  ask:[1,3,4,5,6,7],extra:mcp(`Which pair of angles proves ${B}${C} ∥ ${A}${D}?`,`∠${B}${C}${A} and ∠${D}${A}${C} (alternate interior angles for transversal ${A}${C})`,[`∠${B}${A}${C} and ∠${D}${C}${A}`,`∠${A}${B}${C} and ∠${C}${D}${A}`,`∠${B}${A}${D} and ∠${B}${C}${D}`])}},
 // diagonals bisect each other -> parallelogram
 (V)=>{const [A,B,C,D]=V,E=V[4];return {title:`Given: Diagonals ${A}${C} and ${B}${D} intersect at ${E}; ${E} is the midpoint of ${A}${C} and of ${B}${D}.<br>Prove: ${A}${B}${C}${D} is a parallelogram.`,
  steps:[[`${E} is the midpoint of ${A}${C} and ${B}${D}`,'given',[]],[`${A}${E} ≅ ${C}${E}, ${B}${E} ≅ ${D}${E}`,'mid',['bis','given','refl']],[`∠${A}${E}${B} ≅ ∠${C}${E}${D}`,'vert',['aia','corr','refl']],[`△${A}${E}${B} ≅ △${C}${E}${D}`,'sas',['asa','sss','sasSim']],[`∠${B}${A}${E} ≅ ∠${D}${C}${E}`,'cpctc',['vert','aia','trans']],[`${A}${B} ∥ ${C}${D}`,'aiaConv',['aia','corrConv','pgDef']],[`${A}${D} ∥ ${B}${C} (same steps with △${A}${E}${D} ≅ △${C}${E}${B})`,'aiaConv',['aia','given','pgDef']],[`${A}${B}${C}${D} is a parallelogram`,'pgDef',['trapDef','pgSides','sas']]],
  ask:[1,2,3,4,5,7],extra:mcp(`In step 4, which three congruences are used, in order?`,`${A}${E} ≅ ${C}${E}, ∠${A}${E}${B} ≅ ∠${C}${E}${D}, ${B}${E} ≅ ${D}${E} (side–included angle–side)`,[`${A}${B} ≅ ${C}${D}, ${A}${E} ≅ ${C}${E}, ${B}${E} ≅ ${D}${E}`,`∠${B}${A}${E} ≅ ∠${D}${C}${E}, ${A}${E} ≅ ${C}${E}, ∠${A}${E}${B} ≅ ∠${C}${E}${D}`,`${A}${E} ≅ ${B}${E}, ∠${A}${E}${B} ≅ ∠${C}${E}${D}, ${C}${E} ≅ ${D}${E}`])}},
 // isosceles legs + parallel -> base angles of isosceles trapezoid style: Given AB∥DC, AD≅BC... use similarity proof instead
 (V)=>{const [A,B,C,D,E]=V;return {title:`Given: In △${A}${B}${C}, ${D} is on ${A}${B} and ${E} is on ${A}${C} with ${D}${E} ∥ ${B}${C}.<br>Prove: ${A}${D}/${A}${B} = ${A}${E}/${A}${C}.`,
  steps:[[`${D}${E} ∥ ${B}${C}`,'given',[]],[`∠${A}${D}${E} ≅ ∠${A}${B}${C}`,'corr',['aia','corrConv','vert']],[`∠${A} ≅ ∠${A}`,'refl',['sym','vert','given']],[`△${A}${D}${E} ~ △${A}${B}${C}`,'aa',['sasSim','sssSim','asa']],[`${A}${D}/${A}${B} = ${A}${E}/${A}${C}`,'simSides',['cpctc','given','trans']]],
  ask:[1,2,3,4],extra:mcp(`Why is AA used here instead of SAS Similarity?`,'We know two pairs of congruent angles, but no side lengths are given in proportion',['AA is the only similarity theorem','SAS Similarity needs two pairs of angles','The triangles are congruent, so AA is required'])}},
 // isosceles trapezoid base angles: Given ABCD parallelogram-free: Given AB∥CD, AD ≅ BC with E on AB, CE ∥ AD ... keep compact: rhombus diagonal bisects angle
 (V)=>{const [A,B,C,D]=V;return {title:`Given: ${A}${B}${C}${D} is a rhombus.<br>Prove: ${A}${C} bisects ∠${B}${A}${D}.`,
  steps:[[`${A}${B}${C}${D} is a rhombus`,'given',[]],[`${A}${B} ≅ ${A}${D}, ${C}${B} ≅ ${C}${D}`,'rhDef',['pgSides','given','mid']],[`${A}${C} ≅ ${A}${C}`,'refl',['sym','trans','given']],[`△${A}${B}${C} ≅ △${A}${D}${C}`,'sss',['sas','asa','sssSim']],[`∠${B}${A}${C} ≅ ∠${D}${A}${C}`,'cpctc',['base','aia','vert']],[`${A}${C} bisects ∠${B}${A}${D}`,'bis',['mid','cpctc','trans']]],
  ask:[1,2,3,4,5],extra:mcp(`Why can't you use the Base Angles Theorem to get step 5?`,`∠${B}${A}${C} and ∠${D}${A}${C} are in two different triangles, not opposite two congruent sides of one triangle`,['The Base Angles Theorem only works for right triangles','Rhombus sides are not congruent','You can; Base Angles Theorem is also correct here'])}}
];
R.rhDef='Definition of rhombus (four congruent sides)';
function proof(exclude){
 const ids=[0,1,2,3,4].filter(i=>i!==exclude);const id=pick(ids.concat(ids.includes(0)?[0]:[]));
 const V=pick([['A','B','C','D','E'],['P','Q','R','S','T'],['J','K','L','M','N'],['W','X','Y','Z','V'],['E','F','G','H','K']]);
 const pf=PROOFS[id](V);
 const ask=shuffle(pf.ask).slice(0,id===3?3:4).sort((a,b)=>a-b);
 const parts=ask.map(i=>{const s=pf.steps[i];return mcp(`Reason for step ${i+1}: "${s[0]}"`,R[s[1]],shuffle(s[2]).slice(0,3).map(k=>R[k]))});
 parts.push(pf.extra);
 const tbl='<table class="proof"><thead><tr><th>Statement</th><th>Reason</th></tr></thead><tbody>'+pf.steps.map((s,i)=>`<tr><td><span class="sn">${i+1}.</span> ${s[0]}</td><td data-h="Reason">${ask.includes(i)?`<b>(step ${i+1} — choose below)</b>`:R[s[1]]}</td></tr>`).join('')+'</tbody></table>';
 const full='<table class="proof"><tbody>'+pf.steps.map((s,i)=>`<tr><td><span class="sn">${i+1}.</span> ${s[0]}</td><td data-h="Reason">${R[s[1]]}</td></tr>`).join('')+'</tbody></table>';
 const tips={base:'Two congruent SIDES of one triangle → the angles opposite them are congruent: that is the Base Angles Theorem, not the definition of isosceles triangle (the definition only gives you the sides).',bis:'"Bisects" gives two congruent angles by the definition of angle bisector.',trans:'Two angles each congruent to the same angle → Transitive Property.',aiaConv:'Congruent alternate interior angles → lines parallel is the CONVERSE (the theorem goes the other way: parallel → congruent angles).',notPar:'A trapezoid has EXACTLY one pair of parallel sides, so you must show the other pair is not parallel (use the given non-congruent sides).',aia:'Parallel lines → congruent alternate interior angles is the theorem (not the converse).',cpctc:'After proving triangles congruent, matching parts are congruent by CPCTC.',sas:'Check that the angle is BETWEEN the two sides for SAS.',aa:'Two pairs of congruent angles → AA Similarity.',corr:'Parallel lines → congruent corresponding angles.',mid:'Midpoint → two congruent segments (definition of midpoint).',vert:'Angles formed by two intersecting diagonals across from each other are vertical angles.',sss:'Three pairs of congruent sides → SSS.'};
 const used=[...new Set(pf.steps.map(s=>s[1]))].filter(k=>tips[k]);
 return {s:'Proof reasons · '+['prove a trapezoid','prove a parallelogram (one pair ∥ and ≅)','prove a parallelogram (diagonals bisect)','similar triangles (AA)','rhombus diagonal bisects angle'][id],w:1,p:`<div class="gp">${pf.title}</div>${tbl}Choose the correct reason for each highlighted step, then answer the last question.`,parts,
  e:['Complete proof:'+full,...used.map(k=>tips[k])],pid:id};
}

/* ---------- C. 7.1 Polygon angles ---------- */
const POLY=[
 ()=>{const n=pick([5,6,8,9,10,12,15,18,20,24,36]),e=360/n,I=180-e,Pt=180-2*e;return retry(()=>{const x=ri(4,25),a=ri(1,5),c=ri(1,6);if(a===2*c)return null;const b=Pt-a*x,d=I-c*x;
  return {s:'7.1 Polygon angles (extended sides)',p:`Each side of a regular n-gon is extended until it meets the extension of the next-but-one side, forming a star with a triangle on every side. Each star point angle is (${lin(a,b)})° and each interior angle of the n-gon is (${lin(c,d)})°. Find x, n, and the polygon's interior angle sum.`,
   parts:[num('x',x),num('n (sides)',n),num('Interior angle sum (°)',(n-2)*180)],
   e:[`Each star-point triangle has base angles equal to the polygon's exterior angles. Exterior = 180 − interior, so point = 180 − 2(180 − interior) = 2·interior − 180.`,`${lin(a,b)} = 2(${lin(c,d)}) − 180 → ${lin(a,b)} = ${lin(2*c,2*d-180)} → ${a-2*c}x = ${2*d-180-b} → x = ${x}.`,`Interior = ${c}(${x}) ${d<0?'−':'+'} ${Math.abs(d)} = ${I}°, exterior = ${e}°, so n = 360/${e} = ${n}. (Check: point = ${Pt}° = 180 − 2·${e}.)`,`Sum = (${n} − 2)·180 = ${(n-2)*180}°.`]}})},
 ()=>retry(()=>{const n=pick([5,6,8,9,10,12,15,18,20]),e=360/n,I=180-e,r=ri(3,14),p=ri(-12,6),m=ri(2,9);const ex=r*r+p*r;const q=e-ex;const c=I-m*r;
  // exterior = x²+px+q ; interior = mx + c ; sum = 180 → x² + (p+m)x + (q+c-180)=0
  const rs=roots(p+m,q+c-180).map(v=>Math.round(v*1e9)/1e9);const valid=rs.filter(v=>{const E=v*v+p*v+q,II=m*v+c;return E>0&&II>0&&E<180&&II<180});
  if(valid.length!==1||Math.abs(valid[0]-r)>1e-9||rs.length<2||Math.abs(rs[0]-rs[1])<1e-9)return null;const t=rs.find(v=>Math.abs(v-r)>1e-9);
  const Et=t*t+p*t+q,It=m*t+c;
  return {s:'7.1 Polygon angles (quadratic)',p:`In a regular polygon, each exterior angle is (${poly(1,p,q)})° and each interior angle is (${lin(m,c)})°. Find x, the number of sides, and the interior angle sum.`,
   parts:[num('x',r),num('n (sides)',n),num('Interior angle sum (°)',(n-2)*180)],
   e:[`An interior angle and its exterior angle form a linear pair: ${poly(1,p,q)} + ${lin(m,c)} = 180 → ${poly(1,p+m,q+c-180)} = 0.`,`Solve: x = ${fr(r)} or x = ${fr(t)}.`,`Test x = ${fr(t)}: exterior = ${fr(Et)}°, interior = ${fr(It)}° — ${Et<=0||It<=0?'an angle ≤ 0° is impossible':'an angle ≥ 180° is impossible in a convex regular polygon'}, so reject it. x = ${r}.`,`Exterior = ${r}² ${p<0?'−':'+'} ${Math.abs(p)}(${r}) ${q<0?'−':'+'} ${Math.abs(q)} = ${e}°, so n = 360/${e} = ${n}.`,`Sum = (${n} − 2)·180 = ${(n-2)*180}°.`]}}),
 ()=>{const n=pick([3,4,5,6,9,10,12,15,18,20]),d=180/n;const Ip=180-360/n,Iq=180-180/n;
  return {s:'7.1 Polygon angles (two regular polygons)',p:`Regular polygon Q has twice as many sides as regular polygon P. Each interior angle of Q is ${fr(d)}° larger than each interior angle of P. Find the number of sides of P, each interior angle of Q, and the interior angle sum of Q.`,
   parts:[num('Sides of P',n),num('Interior angle of Q (°)',Iq),num('Interior sum of Q (°)',(2*n-2)*180)],
   e:[`Let P have n sides: interior P = 180 − 360/n, interior Q = 180 − 360/(2n) = 180 − 180/n.`,`Difference = 360/n − 180/n = 180/n = ${fr(d)} → n = ${n}.`,`Q has ${2*n} sides: interior = 180 − 180/${n} = ${fr(Iq)}° (P: ${fr(Ip)}°).`,`Sum Q = (${2*n} − 2)·180 = ${(2*n-2)*180}°.`]}},
 ()=>retry(()=>{const n=pick([5,6,7,8]),S=(n-2)*180,k=ri(2,3),x=ri(20,60),a=ri(1,3),b=ri(1,3);const known=[];const rest=n-2;// two angles are (a x)° and (b x + c)°
  const c=ri(-20,20);const remain=S-(a*x)-(b*x+c);if(remain%rest)return null;const each=remain/rest;if(each<=60||each>=180||a*x>=180||b*x+c>=180||b*x+c<=0)return null;const ext=180-a*x;
  return {s:'7.1 Polygon angles (exterior angle)',p:`A convex polygon with ${n} sides has two angles measuring ${a===1?'':a}x° and (${lin(b,c)})°; the other ${rest} interior angles each measure ${fr(each)}°. Find x, the angle (${lin(b,c)})°, and the exterior angle next to the ${a===1?'':a}x° angle.`,
   parts:[num('x',x),num(`(${lin(b,c)})° angle`,b*x+c),num('Exterior angle (°)',ext)],
   e:[`Interior sum = (${n} − 2)·180 = ${S}°.`,`${a===1?'':a}x + ${lin(b,c)} + ${rest}(${fr(each)}) = ${S} → ${a+b}x = ${S-rest*each-c} → x = ${x}.`,`(${lin(b,c)}) = ${b*x+c}°. Exterior next to ${a*x}° = 180 − ${a*x} = ${ext}°.`]}})
];

/* ---------- D. 7.2–7.3 Parallelograms ---------- */
// L1 = p1 x + q1 y + ..., R1 = a1 x + b1 y + ...; reduced equation (p1−a1)x + (q1−b1)y = const. Require both reduced rows nonzero and independent.
function sys2(p1,q1,p2,q2){return retry(()=>{const x=ri(2,12),y=ri(1,10),a1=ri(1,5),b1=ri(-3,4),a2=ri(1,5),b2=ri(-3,4);const r1=[p1-a1,q1-b1],r2=[p2-a2,q2-b2];
 if((r1[0]===0&&r1[1]===0)||(r2[0]===0&&r2[1]===0))return null;if(r1[0]*r2[1]-r2[0]*r1[1]===0)return null;if(b1===0&&b2===0)return null;return {x,y,a1,b1,a2,b2}})}
const PG=[
 ()=>{const s=sys2(2,1,1,2);const {x,y}=s;const AE=s.a1*x+s.b1*y+ri(1,8),BE=s.a2*x+s.b2*y+ri(1,8);if(AE<=0||BE<=0)return PG[0]();const c1=AE-(2*x+y),c2=BE-(x+2*y);
  // AE = 2x + y + c1 , EC = a1 x + b1 y + k1 ; BE = x + 2y + c2, ED = a2 x + b2 y + k2
  const k1=AE-s.a1*x-s.b1*y,k2=BE-s.a2*x-s.b2*y;const ex=(a,b,c)=>[a?(a===1?'':a===-1?'−':a)+'x':'',b?((b>0&&a?' + ':b<0?' − ':'')+(Math.abs(b)===1?'':Math.abs(b))+'y'):'',c?(c>0?' + ':' − ')+Math.abs(c):''].join('');
    return {s:'7.2 Parallelogram properties (system)',p:`Parallelogram ABCD has diagonals that intersect at E. AE = ${ex(2,1,c1)}, EC = ${ex(s.a1,s.b1,k1)}, BE = ${ex(1,2,c2)}, ED = ${ex(s.a2,s.b2,k2)}. Find x, y, AC and BD.`,
   parts:[num('x',x),num('y',y),num('AC',2*AE),num('BD',2*BE)],
   e:[`Diagonals of a parallelogram bisect each other: AE = EC and BE = ED.`,`${ex(2,1,c1)} = ${ex(s.a1,s.b1,k1)} → ${ex(2-s.a1,1-s.b1,0)||'0'} = ${k1-c1}.`,`${ex(1,2,c2)} = ${ex(s.a2,s.b2,k2)} → ${ex(1-s.a2,2-s.b2,0)||'0'} = ${k2-c2}.`,`Solve the system (substitution/elimination): x = ${x}, y = ${y}.`,`AE = ${AE}, so AC = ${2*AE}; BE = ${BE}, so BD = ${2*BE}.`]}},
 ()=>retry(()=>{const r=ri(3,15),t=-ri(1,15),m=ri(2,12),c=ri(-20,30);// ∠A = x²+px+q ; ∠C = m x + c ; equal
  const p=m-(r+t),q=c+r*t;const A=r*r+p*r+q;if(A<=20||A>=160)return null;const At=t*t+p*t+q;const okT=At>0&&At<180&&m*t+c>0;if(okT)return null;
  return {s:'7.2 Parallelogram properties (quadratic angle)',p:`In parallelogram ABCD, ∠A = (${poly(1,p,q)})° and ∠C = (${lin(m,c)})°. Find x, ∠A and ∠B.`,
   parts:[num('x',r),num('∠A (°)',A),num('∠B (°)',180-A)],
   e:[`Opposite angles of a parallelogram are congruent: ${poly(1,p,q)} = ${lin(m,c)} → ${poly(1,p-m,q-c)} = 0.`,`Factor: (x − ${r})(x + ${-t}) = 0 → x = ${r} or x = ${t}.`,`x = ${t} gives ∠C = ${m*t+c}°, ${m*t+c<=0?'not a positive angle':'and ∠A = '+fr(At)+'°, impossible'} → reject. x = ${r}.`,`∠A = ${A}°. Consecutive angles are supplementary: ∠B = 180 − ${A} = ${180-A}°.`]}}),
 ()=>{const s=sys2(3,-1,1,1);const {x,y}=s;const k1=ri(1,9),k2=ri(1,9);const AB=s.a1*x+s.b1*y+k1,AD=s.a2*x+s.b2*y+k2;if(AB<=2||AD<=2)return PG[2]();
  const ex=(a,b,c)=>[a?(a===1?'':a===-1?'−':a)+'x':'',b?((b>0&&a?' + ':b<0?' − ':'')+(Math.abs(b)===1?'':Math.abs(b))+'y'):'',c?(c>0?' + ':' − ')+Math.abs(c):''].join('')||'0';
  const c1=AB-(3*x-y),c2=AD-(x+y);
  return {s:'7.3 Proving a parallelogram (opposite sides)',p:`In quadrilateral ABCD, AB = ${ex(s.a1,s.b1,k1)}, CD = ${ex(3,-1,c1)}, AD = ${ex(s.a2,s.b2,k2)}, BC = ${ex(1,1,c2)}. For what values of x and y must ABCD be a parallelogram? Then find its perimeter.`,
   parts:[num('x',x),num('y',y),num('Perimeter',2*(AB+AD))],
   e:[`Parallelogram Opposite Sides Converse: if both pairs of opposite sides are congruent, the quadrilateral is a parallelogram. Set AB = CD and AD = BC.`,`${ex(s.a1,s.b1,k1)} = ${ex(3,-1,c1)} and ${ex(s.a2,s.b2,k2)} = ${ex(1,1,c2)}.`,`Rearranged: ${ex(s.a1-3,s.b1+1,0)} = ${c1-k1} and ${ex(s.a2-1,s.b2-1,0)} = ${c2-k2}. Solving: x = ${x}, y = ${y}.`,`AB = CD = ${AB}, AD = BC = ${AD}. Perimeter = 2(${AB} + ${AD}) = ${2*(AB+AD)}.`]}}
];

/* ---------- E. 7.4–7.5 Special parallelograms, trapezoids, kites (+ ASN at normal frequency) ---------- */
const ASNPOOL=[['A rhombus is a square.','S','Only when its angles are right angles.'],['A square is a rhombus.','A','A square has four congruent sides.'],['A parallelogram is a rectangle.','S','Only when it has a right angle.'],['A trapezoid is a parallelogram.','N','A trapezoid has exactly one pair of parallel sides.'],['A kite is a parallelogram.','N','A kite\'s opposite sides are not congruent.'],['The diagonals of a rectangle are congruent.','A','Rectangle Diagonals Theorem.'],['The diagonals of a rhombus are congruent.','S','Only when the rhombus is a square.'],['The diagonals of a parallelogram are perpendicular.','S','Only for rhombuses/squares.'],['The diagonals of a kite are perpendicular.','A','Kite Diagonals Theorem.'],['The diagonals of a trapezoid bisect each other.','N','Then it would be a parallelogram.'],['Consecutive angles of a parallelogram are congruent.','S','They are supplementary, so congruent only when each is 90°.'],['Opposite angles of a trapezoid are supplementary.','S','True for isosceles trapezoids, not other trapezoids.'],['A quadrilateral with congruent diagonals that bisect each other is a rectangle.','A','Bisecting → parallelogram; congruent diagonals → rectangle.'],['A rhombus with a right angle is a square.','A','Four congruent sides + right angle.'],['The legs of a trapezoid are congruent.','S','Only for isosceles trapezoids.'],['The diagonals of a rectangle bisect its angles.','S','Only when the rectangle is a square.'],['A quadrilateral with one pair of parallel sides and one pair of congruent sides is a parallelogram.','S','It could be an isosceles trapezoid.'],['A parallelogram is a kite.','N','Parallelogram opposite sides are congruent; a kite\'s are not.'],['The diagonals of an isosceles trapezoid are congruent.','A','Isosceles Trapezoid Diagonals Theorem.']];
const SPEC=[
 ()=>retry(()=>{const [a,b,c]=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10]]);const k=ri(1,3);const AE=a*k,BE=b*k,AB=c*k;const r=ri(2,9),t=-ri(1,9);// AE = x² + p x + q ; with AE = AE at x=r ; BE = x + d (reject t)
  const p=-(r+t)+0,q=r*t+AE;const d=BE-r;if(t+d>0)return null;const val=r*r+p*r+q;if(val!==AE)return null;
  return {s:'7.4 Rhombus diagonals',p:`In rhombus ABCD the diagonals intersect at E. AE = ${poly(1,p,q)} and AC = ${2*AE}. Also BE = ${lin(1,d)}. Find x, BD, side AB and the perimeter.`,
   parts:[num('x',r),num('BD',2*BE),num('AB',AB),num('Perimeter',4*AB)],
   e:[`Diagonals bisect each other: AE = AC/2 = ${AE} → ${poly(1,p,q-AE)} = 0 → x = ${r} or ${t}.`,`x = ${t} makes BE = ${t+d} ≤ 0, impossible → x = ${r}.`,`BE = ${BE}, so BD = ${2*BE}.`,`Rhombus diagonals are perpendicular: AB² = ${AE}² + ${BE}² = ${AB*AB} → AB = ${AB}. Perimeter = ${4*AB}.`]}}),
 ()=>retry(()=>{const r=ri(3,12),t=-ri(1,9);const a=ri(6,20),b=a+2*ri(3,10),m=(a+b)/2;// base1 = x²+px+q equals a at r ; midsegment = m given ; base2 = b
  const p=-(r+t),q=r*t+a;const k=ri(1,4);const leg=k*r-ri(0,3);const legc=leg-k*r;if(leg<=0||k*t+legc>0)return null;
  return {s:'7.5 Trapezoid midsegment',p:`Trapezoid ABCD has bases AB = ${poly(1,p,q)} and CD = ${b}, midsegment MN = ${m}, and leg AD = ${lin(k,legc)}. Find x, AB and AD.`,
   parts:[num('x',r),num('AB',a),num('AD',leg)],
   e:[`Trapezoid Midsegment Theorem: MN = ½(AB + CD) → ${m} = ½(${poly(1,p,q)} + ${b}) → ${poly(1,p,q)} = ${2*m-b}.`,`${poly(1,p,q-a)} = 0 → x = ${r} or x = ${t}.`,`x = ${t} makes AD = ${k*t+legc} ≤ 0, impossible → x = ${r}.`,`AB = ${a}, AD = ${k}(${r}) ${legc<0?'−':'+'} ${Math.abs(legc)} = ${leg}.`]}}),
 ()=>retry(()=>{const A=ri(50,110),C=ri(40,120),B=(360-A-C)/2;if(!Number.isInteger(B)||B<=C/2||B>=170)return null;const r=ri(3,13),t=-ri(1,10),m=ri(2,9);const c=B-m*r;const p=m-(r+t),q=c+r*t;
  const Bt=m*t+c;if(Bt>0&&Bt<180)return null;
  return {s:'7.5 Kite angles',p:`ABCD is a kite with AB ≅ AD and CB ≅ CD. ∠A = ${A}°, ∠C = ${C}°, ∠B = (${poly(1,p,q)})° and ∠D = (${lin(m,c)})°. Find x, ∠B and ∠D.`,
   parts:[num('x',r),num('∠B (°)',B),num('∠D (°)',B)],
   e:[`Kite Opposite Angles Theorem: the angles between the non-congruent sides are congruent, so ∠B ≅ ∠D.`,`${poly(1,p,q)} = ${lin(m,c)} → ${poly(1,p-m,q-c)} = 0 → x = ${r} or ${t}.`,`x = ${t} gives ∠D = ${Bt}°, impossible → x = ${r}.`,`∠B = ∠D = ${m}(${r}) ${c<0?'−':'+'} ${Math.abs(c)} = ${B}°. Check: ${A} + ${C} + 2(${B}) = 360 ✓.`]}}),
 ()=>retry(()=>{const r=ri(3,12),t=-ri(1,10);const D=ri(10,40);const m=ri(2,7),c=D-m*r,p=-(r+t)+m,q=r*t+c;const ab=ri(2,5),abc=ri(1,9)-ab*r+ri(10,20);const ABv=ab*r+abc;if(ABv<=0||m*t+c>0)return null;
  return {s:'7.4 Rectangle diagonals',p:`ABCD is a rectangle with diagonals intersecting at E. AC = ${poly(1,p,q)} and BD = ${lin(m,c)}. AB = ${lin(ab,abc)}. Find x, AE, and AB.`,
   parts:[num('x',r),num('AE',D/2),num('AB',ABv)],
   e:[`Rectangle diagonals are congruent: ${poly(1,p,q)} = ${lin(m,c)} → ${poly(1,p-m,q-c)} = 0 → x = ${r} or ${t}.`,`x = ${t} makes BD = ${m*t+c} ≤ 0 → reject. x = ${r}.`,`AC = BD = ${D}; diagonals bisect each other so AE = ${fr(D/2)}.`,`AB = ${ab}(${r}) ${abc<0?'−':'+'} ${Math.abs(abc)} = ${ABv}.`]}}),
 ()=>{const four=shuffle(ASNPOOL).slice(0,4);const lab={A:'Always',S:'Sometimes',N:'Never'};
  return {s:'7.4–7.5 Always / Sometimes / Never',p:'Answer <b>each</b> statement Always, Sometimes, or Never.',parts:four.map((s,i)=>{const c=['Always','Sometimes','Never'];return {t:'mc',l:String.fromCharCode(97+i)+') '+s[0],c,a:c.indexOf(lab[s[1]])}}),
   e:four.map((s,i)=>`${String.fromCharCode(97+i)}) <b>${lab[s[1]]}</b> — ${s[2]}`)}}
];

/* ---------- F. 7.x Coordinate geometry ---------- */
function classify(Q){const v=(i,j)=>[Q[j][0]-Q[i][0],Q[j][1]-Q[i][1]],cr=(a,b)=>a[0]*b[1]-a[1]*b[0],dt=(a,b)=>a[0]*b[0]+a[1]*b[1],L=a=>dt(a,a);
 const AB=v(0,1),BC=v(1,2),CD=v(2,3),DA=v(3,0);const p1=cr(AB,CD)===0,p2=cr(BC,DA)===0;
 if(p1&&p2){const rh=L(AB)===L(BC),rt=dt(AB,BC)===0;return rh&&rt?'Square':rh?'Rhombus':rt?'Rectangle':'Parallelogram (only)'}
 if(p1||p2){const legs=p1?[BC,DA]:[AB,CD];return L(legs[0])===L(legs[1])?'Isosceles trapezoid':'Trapezoid (not isosceles)'}
 if((L(AB)===L(BC)&&L(CD)===L(DA)&&L(AB)!==L(CD))||(L(AB)===L(DA)&&L(BC)===L(CD)&&L(AB)!==L(BC)))return 'Kite';return 'None of these'}
const KINDS=['Square','Rectangle','Rhombus','Parallelogram (only)','Isosceles trapezoid','Trapezoid (not isosceles)','Kite'];
const COORD=[
 ()=>retry(()=>{const kind=pick(['sq','rect','rh','pg','it','kite','tr']);const A=[ri(-6,3),ri(-6,3)];let a=ri(-4,4),b=ri(-4,4);if(!a||!b)return null;let pts;const add=(p,u,k=1)=>[p[0]+k*u[0],p[1]+k*u[1]];
  if(kind==='sq'){const u=[a,b],w=[-b,a];pts=[A,add(A,u),add(add(A,u),w),add(A,w)]}
  else if(kind==='rect'){const u=[a,b],w=[-2*b,2*a];pts=[A,add(A,u),add(add(A,u),w),add(A,w)]}
  else if(kind==='rh'){if(Math.abs(a)===Math.abs(b))return null;const u=[a,b],w=[b,a];pts=[A,add(A,u),add(add(A,u),w),add(A,w)]}
  else if(kind==='pg'){const u=[a,b],w=[ri(-4,4),ri(-4,4)];pts=[A,add(A,u),add(add(A,u),w),add(A,w)]}
  else if(kind==='it'){const w=[a,b],n=[-b,a],L=ri(3,4),c=1,h=ri(1,2)*(Math.random()<.5?1:-1);pts=[A,add(A,w,L),add(add(A,w,L-c),n,h),add(add(A,w,c),n,h)]}
  else if(kind==='tr'){const w=[a,b],n=[-b,a],L=ri(3,4),h=ri(1,2);pts=[A,add(A,w,L),add(add(A,w,L-1-ri(0,1)),n,h),add(A,n,h)]}
  else {const w=[a,b],n=[-b,a],s=ri(3,4),t=1,h=1;pts=[A,add(add(A,w,t),n,h),add(A,w,s),add(add(A,w,t),n,-h)]}
  if(pts.some(p=>Math.abs(p[0])>14||Math.abs(p[1])>14))return null;{const sg=new Set();for(let i=0;i<4;i++){const p0=pts[i],p1=pts[(i+1)%4],p2=pts[(i+2)%4];sg.add(Math.sign((p1[0]-p0[0])*(p2[1]-p1[1])-(p1[1]-p0[1])*(p2[0]-p1[0])))}if(sg.size!==1||sg.has(0))return null}
  const ans=classify(pts);if(ans==='None of these')return null;const sl=(i,j)=>{const dx=pts[j][0]-pts[i][0];return dx===0?null:(pts[j][1]-pts[i][1])/dx};
  if([sl(0,1),sl(1,2),sl(2,3),sl(3,0)].some(s=>s===null))return null;
  const d2=(i,j)=>(pts[j][0]-pts[i][0])**2+(pts[j][1]-pts[i][1])**2;const S=['AB','BC','CD','DA'].map((n,i)=>[n,sl(i,(i+1)%4),d2(i,(i+1)%4)]);
  const wrong=shuffle(KINDS.filter(k=>k!==ans)).slice(0,4);
  return {s:'7.x Coordinate proof / classification',p:`Quadrilateral ABCD has vertices A${P(...pts[0])}, B${P(...pts[1])}, C${P(...pts[2])}, D${P(...pts[3])}. Use slopes and distances to classify it as specifically as possible. (Fractions OK.)`,
   parts:[num('Slope of AB',S[0][1]),num('Slope of CD',S[2][1]),num('Slope of BC',S[1][1]),num('AB² (squared length)',S[0][2]),num('BC²',S[1][2]),mcp('Most specific name',ans,wrong)],
   e:[...S.map(s=>`${s[0]}: slope ${fr(s[1])}, length² ${s[2]}`),`Diagonals: AC² = ${d2(0,2)}, BD² = ${d2(1,3)}.`,`Parallel sides have equal slopes; perpendicular sides have slopes whose product is −1. ${ans==='Kite'?'Two pairs of consecutive congruent sides with opposite sides not congruent → kite.':ans.startsWith('Isos')?'Exactly one pair parallel and the legs are congruent → isosceles trapezoid.':ans.startsWith('Trap')?'Exactly one pair of parallel sides, legs not congruent.':'Both pairs of opposite sides parallel → parallelogram; '+(ans==='Square'?'all sides congruent AND a right angle → square.':ans==='Rhombus'?'all sides congruent but no right angle → rhombus.':ans==='Rectangle'?'right angle but adjacent sides not congruent → rectangle.':'no right angle and adjacent sides not congruent → just a parallelogram.')}`,`Answer: <b>${ans}</b>.`]}}),
 ()=>retry(()=>{const A=[ri(-6,4),ri(-6,4)],a=ri(-4,4),b=ri(-4,4);if(!a||!b)return null;const B=[A[0]+a,A[1]+b];const s=pick([2,3,-2]);const C=[B[0]-s*b,B[1]+s*a];const D=[A[0]-s*b,A[1]+s*a];
  const AB2=a*a+b*b,BC2=s*s*AB2;
  return {s:'7.x Coordinate proof (find k)',p:`Rectangle ABCD has A${P(...A)}, B${P(...B)}, and C(k, ${fr(C[1])}). Find k (use ∠B = 90°), the coordinates of D, and the rectangle's area.`,
   parts:[num('k',C[0]),pt('D',D),num('Area',Math.sqrt(AB2*BC2))],
   e:[`Slope AB = ${b}/${a} = ${fr(b/a)}. BC ⟂ AB, so slope BC = ${fr(-a/b)} (negative reciprocal).`,`(${fr(C[1])} − ${fr(B[1])}) / (k − ${fr(B[0])}) = ${fr(-a/b)} → k − ${fr(B[0])} = ${fr((C[1]-B[1])*(-b/a))} → k = ${fr(C[0])}.`,`D = A + C − B = ${P(...D)} (diagonals of a parallelogram share a midpoint).`,`AB = √${AB2}, BC = √${BC2}; area = √(${AB2}·${BC2}) = ${Math.sqrt(AB2*BC2)}.`]}})
];

/* ---------- G. 8.1 Similar polygons / similarity transformations ---------- */
const SIMP=[
 ()=>retry(()=>{const p=ri(2,5),q=ri(2,6);if(p===q||gcd(p,q)!==1)return null;const m=ri(2,5),x=ri(2,9),a=ri(1,5),c=ri(1,5);if(p*a===q*c)return null;const b=q*m-a*x,d=p*m-c*x;const M=ri(3,9),N=ri(2,6);
  return {s:'8.1 Similar polygons',p:`ABCD ~ EFGH. AB = ${q*3}, EF = ${p*3}, BC = ${lin(a,b)}, FG = ${lin(c,d)}. The perimeter of ABCD is ${q*M*3} and its area is ${q*q*N*9}. Find x, FG, and the perimeter and area of EFGH.`,
   parts:[num('x',x),num('FG',p*m),num('Perimeter EFGH',p*M*3),num('Area EFGH',p*p*N*9)],
   e:[`Scale factor EFGH : ABCD = EF/AB = ${p*3}/${q*3} = ${p}/${q}.`,`FG/BC = ${p}/${q} → ${q}(${lin(c,d)}) = ${p}(${lin(a,b)}) → ${q*c-p*a}x = ${p*b-q*d} → x = ${x}.`,`FG = ${p*m} (BC = ${q*m}).`,`Perimeters scale by ${p}/${q}: ${q*M*3}·${p}/${q} = ${p*M*3}. Areas scale by (${p}/${q})² = ${p*p}/${q*q}: ${q*q*N*9}·${p*p}/${q*q} = ${p*p*N*9}.`]}}),
 ()=>retry(()=>{const r=ri(3,12),a=ri(1,6),Pd=r*(r+a);const fs=[];for(let m=2;m<Pd;m++)if(Pd%m===0&&m!==r&&m!==r+a)fs.push(m);if(!fs.length)return null;const m=pick(fs),n=Pd/m;const t=-(r+a);
  return {s:'8.1 Similar polygons (quadratic)',p:`△ABC ~ △DEF. AB = x + ${a}, DE = ${m}, BC = ${n}, EF = x. Find x, AB, and the scale factor of △ABC to △DEF.`,
   parts:[num('x',r),num('AB',r+a),num('Scale factor ABC:DEF',(r+a)/m)],
   e:[`Corresponding sides are proportional: AB/DE = BC/EF → (x + ${a})/${m} = ${n}/x.`,`Cross-multiply: x(x + ${a}) = ${Pd} → ${poly(1,a,-Pd)} = 0 → (x − ${r})(x + ${r+a}) = 0.`,`x = ${t} is a negative length → reject. x = ${r}.`,`AB = ${r+a}; scale factor = ${r+a}/${m} = ${fr((r+a)/m)}.`]}}),
 ()=>retry(()=>{const k=pick([2,3,1/2]);const pts=[[ri(-4,4)*2,ri(-4,4)*2],[ri(-4,4)*2,ri(-4,4)*2],[ri(-4,4)*2,ri(-4,4)*2]];const cr=(pts[1][0]-pts[0][0])*(pts[2][1]-pts[0][1])-(pts[1][1]-pts[0][1])*(pts[2][0]-pts[0][0]);if(cr===0)return null;
  const T=pick([['reflected in the line y = x',p=>[p[1],p[0]],'(x, y) → (y, x)'],['rotated 90° counterclockwise about the origin',p=>[-p[1],p[0]],'(x, y) → (−y, x)'],['reflected in the x-axis',p=>[p[0],-p[1]],'(x, y) → (x, −y)'],['rotated 180° about the origin',p=>[-p[0],-p[1]],'(x, y) → (−x, −y)']]);const tx=ri(-5,5),ty=ri(-5,5);
  const img=pts.map(p=>{const d=[k*p[0],k*p[1]];const r=T[1](d);return [r[0]+tx,r[1]+ty]});
  return {s:'8.x Similarity transformations (composition)',p:`△ABC has A${P(...pts[0])}, B${P(...pts[1])}, C${P(...pts[2])}. It is dilated by scale factor ${fr(k)} centered at the origin, then ${T[0]}, then translated ${P(tx,ty)}. Find A‴ and B‴, and the ratio of the image's area to the original area.`,
   parts:[pt('A‴',img[0]),pt('B‴',img[1]),num('Area ratio (image : original)',k*k)],
   e:[`Dilation: (x, y) → (${fr(k)}x, ${fr(k)}y): A′${P(k*pts[0][0],k*pts[0][1])}, B′${P(k*pts[1][0],k*pts[1][1])}.`,`Then ${T[2]}: A″${P(...T[1]([k*pts[0][0],k*pts[0][1]]))}, B″${P(...T[1]([k*pts[1][0],k*pts[1][1]]))}.`,`Translate by ${P(tx,ty)}: A‴${P(...img[0])}, B‴${P(...img[1])}.`,`Rigid motions keep size; only the dilation changes it. The image is similar (not congruent) to △ABC, and areas scale by k² = ${fr(k*k)}.`]}})
];

/* ---------- H. 8.2–8.3 Triangle similarity ---------- */
const TRI=[
 ()=>retry(()=>{const r=ri(3,12);const AC0=ri(6,20),k=pick([2,3,1/2,3/2,2/3]);const CE0=AC0/k;if(!Number.isInteger(CE0))return null;const BC0=ri(5,18),CD0=BC0/k;if(!Number.isInteger(CD0))return null;const b=AC0-r,d=CD0-r;const DE=ri(4,15),AB=k*DE;if(!Number.isInteger(AB))return null;
  // (x+b)(x+d)=CE0*BC0 ; x² + (b+d)x + bd - CE0*BC0
  const rs=roots(b+d,b*d-CE0*BC0);const other=rs.find(v=>Math.abs(v-r)>1e-9);if(other===undefined)return null;if(other+b>0&&other+d>0)return null;
  return {s:'8.2 AA similarity (hourglass)',p:`Segments AE and BD intersect at C, and AB ∥ DE. AC = ${lin(1,b)}, CE = ${CE0}, BC = ${BC0}, CD = ${lin(1,d)}, DE = ${DE}. Find x, AC and AB.`,
   parts:[mcp('Why is △ABC ~ △EDC?','AA: ∠ACB ≅ ∠ECD (vertical) and ∠A ≅ ∠E (alternate interior, AB ∥ DE)',['SSS Similarity: all sides proportional','SAS Similarity: AC/CE = BC/CD with included angle','They are congruent by ASA']),num('x',r),num('AC',AC0),num('AB',AB)],
   e:[`∠ACB ≅ ∠ECD (vertical angles); AB ∥ DE → ∠BAC ≅ ∠DEC (alternate interior). AA → △ABC ~ △EDC.`,`AC/EC = BC/DC → (${lin(1,b)})(${lin(1,d)}) = ${CE0}·${BC0} = ${CE0*BC0}.`,`${poly(1,b+d,b*d-CE0*BC0)} = 0 → x = ${r} or x = ${fr(other)}. x = ${fr(other)} makes a side ≤ 0 → reject.`,`AC = ${AC0}; scale factor = AC/EC = ${fr(k)}; AB = ${fr(k)}·DE = ${AB}.`]}}),
 ()=>retry(()=>{const a=ri(3,9),b=ri(3,9),c=ri(3,9);if(a+b<=c||a+c<=b||b+c<=a||(a===b&&b===c))return null;const k=pick([2,3,3/2,5/2]);const s=[a,b,c].map(v=>v*k);if(s.some(v=>!Number.isInteger(v)))return null;
  const sim=Math.random()<.65;const t=sim?s.slice():[s[0],s[1],s[2]+1];// DE, EF, FD correspond to AB, BC, CA in some permutation
  const perm=pick([[0,1,2],[1,2,0],[2,0,1],[0,2,1]]);// tri DEF sides labelled
  const names=['DE','EF','FD'];const sideOf=[t[perm[0]],t[perm[1]],t[perm[2]]];
  // find correspondence for similar: which DEF side matches AB etc.
  const vert={'DE':['D','E'],'EF':['E','F'],'FD':['F','D']};
  let corr='Not similar';if(sim){const ab=names[perm.indexOf(0)],bc=names[perm.indexOf(1)];const A_=vert[ab].find(v=>!vert[bc].includes(v)),B_=vert[ab].find(v=>vert[bc].includes(v)),C_=vert[bc].find(v=>v!==B_);corr='△ABC ~ △'+A_+B_+C_+' (SSS)'}
  const allC=['△ABC ~ △DEF (SSS)','△ABC ~ △EFD (SSS)','△ABC ~ △FDE (SSS)','△ABC ~ △DFE (SSS)','△ABC ~ △FED (SSS)','△ABC ~ △EDF (SSS)'];
  const choices=[corr,...shuffle(allC.filter(x=>x!==corr)).slice(0,3)];if(sim)choices.push('Not similar');
  const ratios=[a,b,c].map((v,i)=>{const j=perm.indexOf(i);return `${names[j]}/${['AB','BC','CA'][i]} = ${sideOf[j]}/${v} = ${fr(sideOf[j]/v)}`});
  return {s:'8.3 SSS similarity',p:`△ABC has AB = ${a}, BC = ${b}, CA = ${c}. △DEF has DE = ${sideOf[0]}, EF = ${sideOf[1]}, FD = ${sideOf[2]}. Are the triangles similar? If so, which correspondence is correct? Then give the ratio of the perimeters (DEF : ABC).`,
   parts:[mcp('Similarity statement',corr,choices.slice(1)),num('Perimeter ratio DEF : ABC',(sideOf[0]+sideOf[1]+sideOf[2])/(a+b+c))],
   e:[`Match shortest to shortest, middle to middle, longest to longest: ${ratios.join('; ')}.`,sim?`All three ratios equal ${fr(k)} → similar by SSS. Corresponding vertices follow the matched sides: <b>${corr}</b>.`:`The ratios are not all equal → <b>not similar</b>.`,`Perimeter ratio = ${sideOf[0]+sideOf[1]+sideOf[2]}/${a+b+c} = ${fr((sideOf[0]+sideOf[1]+sideOf[2])/(a+b+c))}${sim?' (equals the scale factor)':''}.`]}}),
 ()=>retry(()=>{const a=ri(3,10),b=ri(2,10),k=(a+b)/a;const c=ri(2,9)*a/gcd(a,1);const d=c*b/a;if(!Number.isInteger(d))return null;const DE=ri(4,14);const BC=DE*k;if(!Number.isInteger(BC*2))return null;const x=ri(2,9),m=ri(2,4),n=BC-m*x;
  return {s:'8.3 SAS similarity / converse',p:`In △ABC, D is on AB and E is on AC with AD = ${a}, DB = ${b}, AE = ${c}, EC = ${d}. DE = ${DE} and BC = ${lin(m,n)}. Which theorem proves △ADE ~ △ABC? Find x and BC.`,
   parts:[mcp('Similarity reason','SAS Similarity: AD/AB = AE/AC and ∠A is shared',['AA Similarity: two pairs of angles','SSS Similarity: all three sides given proportional','ASA Congruence']),num('x',x),num('BC',BC)],
   e:[`AD/AB = ${a}/${a+b}, AE/AC = ${c}/${c+d} = ${fr(c/(c+d))} — equal, and ∠A is the included angle → SAS Similarity (so DE ∥ BC too, by the Triangle Proportionality Converse).`,`BC/DE = AB/AD = ${a+b}/${a} → BC = ${DE}·${a+b}/${a} = ${fr(BC)}.`,`${lin(m,n)} = ${fr(BC)} → x = ${x}.`]}})
];

/* ---------- I. 8.4 Proportionality theorems ---------- */
const PROP=[
 ()=>retry(()=>{const r=ri(3,12),p=ri(-2,6),s=ri(-2,8);const AD=r+p,EC=r+s;if(AD<=0||EC<=0)return null;const prod=AD*EC;const fs=[];for(let q=2;q<prod;q++)if(prod%q===0)fs.push(q);if(!fs.length)return null;const DB=pick(fs),AE=prod/DB;
  const rs=roots(p+s,p*s-prod);const other=rs.find(v=>Math.abs(v-r)>1e-9);if(other===undefined||(other+p>0&&other+s>0))return null;const BC=(AD+DB)*ri(1,3);const DE=BC*AD/(AD+DB);
  return {s:'8.4 Triangle Proportionality (side splitter)',p:`In △ABC, DE ∥ BC with D on AB and E on AC. AD = ${lin(1,p)}, DB = ${DB}, AE = ${AE}, EC = ${lin(1,s)}, BC = ${BC}. Find x, AC and DE.`,
   parts:[num('x',r),num('AC',AE+EC),num('DE',DE)],
   e:[`Triangle Proportionality Theorem: AD/DB = AE/EC → (${lin(1,p)})(${lin(1,s)}) = ${DB}·${AE} = ${prod}.`,`${poly(1,p+s,p*s-prod)} = 0 → x = ${r} or x = ${fr(other)}; ${fr(other)} makes a length ≤ 0 → reject.`,`EC = ${EC}, AC = ${AE} + ${EC} = ${AE+EC}.`,`DE is NOT found with AD/DB — use the whole triangle: DE/BC = AD/AB = ${AD}/${AD+DB} → DE = ${fr(DE)}.`]}}),
 ()=>retry(()=>{const b=ri(2,7),c=ri(2,7);if(b===c||gcd(b,c)!==1)return null;const u=ri(2,4),t=ri(1,u-1)||1;if(t>=u)return null;const AB=c*u,AC=b*u,BD=c*t,DC=b*t,BC=(b+c)*t;if(Math.abs(AB-AC)>=BC)return null;const m=ri(2,4),x=ri(2,9),n=BD-m*x;
  return {s:'8.4 Triangle Angle Bisector Theorem',p:`In △ABC, AD bisects ∠A and meets BC at D. AB = ${AB}, AC = ${AC}, BC = ${BC}, BD = ${lin(m,n)}. Find BD, DC and x.`,
   parts:[num('BD',BD),num('DC',DC),num('x',x)],
   e:[`Angle Bisector Theorem: BD/DC = AB/AC = ${AB}/${AC} = ${c}/${b}.`,`Let BD = ${c}k, DC = ${b}k: ${c+b}k = ${BC} → k = ${t}. BD = ${BD}, DC = ${DC}.`,`${lin(m,n)} = ${BD} → x = ${x}.`]}}),
 ()=>retry(()=>{const a=ri(3,12),b=ri(3,12),k=pick([2,3,3/2,5/2,1/2]);const c=a*k,d=b*k;if(!Number.isInteger(c)||!Number.isInteger(d)||a===b)return null;const x=ri(2,9),y=ri(2,9),m1=ri(2,4),m2=ri(1,3);const e1=a-m1*x,e2=b-m2*y;
  return {s:'8.4 Three Parallel Lines Theorem',p:`Three parallel lines cut transversal t at A, B, C and transversal u at D, E, F (in that order). AB = ${lin(m1,e1)}, BC = ${poly(0,m2,e2).replace('x','y')}, AC = ${a+b}, DE = ${c}, EF = ${d}. Find x, y, and DF.`,
   parts:[num('x',x),num('y',y),num('DF',c+d)],
   e:[`Three Parallel Lines Theorem: AB/BC = DE/EF = ${c}/${d} = ${fr(a/b)}.`,`AB + BC = AC = ${a+b}, and AB : BC = ${c} : ${d}, so AB = ${a+b}·${c}/${c+d} = ${a} and BC = ${b}.`,`${lin(m1,e1)} = ${a} → x = ${x}. ${poly(0,m2,e2).replace('x','y')} = ${b} → y = ${y}.`,`DF = DE + EF = ${c+d}.`]}})
];

const SLOTS=[
 {g:()=>fourthVertex(),k:'A'},{g:()=>proof(),k:'B'},{g:()=>pick(POLY)(),k:'C'},{g:()=>pick(PG)(),k:'D'},{g:()=>pick(SPEC)(),k:'E'},{g:()=>pick(COORD)(),k:'F'},{g:()=>pick(SIMP)(),k:'G'},{g:()=>pick(TRI)(),k:'H'},{g:()=>pick(PROP)(),k:'I'}
];
function generate(){const out=SLOTS.map(s=>s.g());const pf=out[1].pid;const p2=proof(pf);out.push(p2);
 // order: Ch 7 first then Ch 8; second proof in the middle
 const order=[0,2,3,4,1,5,6,7,8,9];const qs=order.map(i=>out[i]);const tidy=t=>t.replace(/\+ −/g,'− ').replace(/(^|[\s(=\[,·])-(?=[\dxy])/g,'$1−').replace(/− −(\d+)/g,'+ $1').replace(/(^|[\s(→=])1x\b/g,'$1x').replace(/−1x\b/g,'−x').replace(/ [+−] 0\(−?\d+\)/g,'').replace(/\) [+−] 0(?![\d.\/(])/g,')');qs.forEach(q=>{q.p=tidy(q.p);q.e=q.e.map(tidy);q.parts.forEach(p=>{p.l=tidy(p.l)})});return qs}
root.Geo78={generate,classify};
})(typeof window==='undefined'?globalThis:window);
