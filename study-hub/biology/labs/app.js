(function(){'use strict';
const $=s=>document.querySelector(s),app=$('#app'),M=LEQ.MODES;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='le-labs-u3-v1';let st=null;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const MIX=[['labfocus','🔬 Lab focus (recommended)','Every lab: Unit 3 labs + Osmosis/Diffusion + Cells + Cell size. The Unit 2 test had many lab questions.',1],
 ['unit3','Unit 3 Test review (Wed 11/4)','Photosynthesis, respiration, fermentation, energy flow & cycles, labs'],
 ['unit2','Unit 2 labs review','Osmosis & Diffusion, Comparing Cells, Diffusion & Cell Size'],
 ['all','Everything mixed','All topics']];
function start(){
 let last=null;try{last=JSON.parse(localStorage.getItem(KEY))}catch(e){}
 const groups={};Object.keys(M).forEach(k=>{(groups[M[k].group]=groups[M[k].group]||[]).push(k)});
 const cnt=k=>LEQ.pool(k).s.length+(LEQ.pool(k).g.length?' + '+LEQ.pool(k).g.length+' calc':'');
 let h='<div class="card"><h2>Pick a practice set</h2>'+
 '<label>Questions: <select id="n"><option>10</option><option selected>15</option><option>20</option><option>30</option></select></label>';
 h+='<h3>Mixed sets</h3>'+MIX.map(m=>'<button class="mode'+(m[3]?' hl':'')+'" data-m="'+m[0]+'"><b>'+m[1]+'</b><small>'+m[2]+' · '+cnt(m[0])+'</small></button>').join('');
 Object.keys(groups).forEach(g=>{h+='<h3>'+esc(g)+'</h3>'+groups[g].map(k=>'<button class="mode" data-m="'+k+'"><b>'+esc(M[k].name)+'</b><small>'+esc(M[k].desc)+' · '+cnt(k)+'</small></button>').join('')});
 h+='</div>';
 if(last&&last.done)h+='<div class="card prog">Last result: '+last.score+'/'+last.qs.length+' ('+esc(last.label)+')</div>';
 app.innerHTML=h;
 app.querySelectorAll('.mode').forEach(b=>b.onclick=()=>{const m=b.dataset.m,n=+$('#n').value;const avail=LEQ.pool(m).s.length+(LEQ.pool(m).g.length?99:0);
  st={mode:m,label:(M[m]&&M[m].name)||MIX.find(x=>x[0]===m)[1],qs:LEQ.build(m,Math.min(n,avail),Math.floor(Math.random()*1e9)),i:0,res:[],score:0,done:false};save();show();});
}
function show(){
 const q=st.qs[st.i],a=st.res[st.i];
 let h='<div class="card"><div class="prog">Question '+(st.i+1)+' of '+st.qs.length+' · Score '+st.score+'</div><p><span class="tag">'+esc((M[q.mode]||{}).name||'')+'</span>'+(q.lab?'<span class="tag lab">Lab</span>':'')+'<span class="tag">'+esc(q.topic)+'</span></p><h2>'+esc(q.prompt)+'</h2>';
 if(q.kind==='mc')h+=q.choices.map((c,i)=>{let cl='ch';if(a){if(i===q.answer)cl+=' right';else if(i===a.pick)cl+=' wrong'}return '<button class="'+cl+'" data-i="'+i+'"'+(a?' disabled':'')+'>'+esc(c)+'</button>'}).join('');
 else h+='<input class="num" id="ans" inputmode="decimal" placeholder="Your answer" '+(a?'disabled value="'+esc(a.pick)+'"':'')+'> '+esc(q.unit||'')+(a?'':'<button class="btn" id="chk">Check</button>');
 if(a)h+='<div class="ex"><span class="'+(a.ok?'ok':'bad')+'">'+(a.ok?'✓ Correct':'✗ Not quite')+'</span>'+(a.ok?'':' — answer: <b>'+esc(q.kind==='mc'?q.choices[q.answer]:q.answer+' '+(q.unit||''))+'</b>')+'<br>'+esc(q.explain)+'</div><button class="btn" id="next">'+(st.i+1<st.qs.length?'Next':'See results')+'</button>';
 h+='<button class="btn sec" id="quit">Back to sets</button></div>';app.innerHTML=h;
 const rec=(pick,ok)=>{st.res[st.i]={pick,ok};if(ok)st.score++;save();show()};
 app.querySelectorAll('.ch').forEach(b=>b.onclick=()=>rec(+b.dataset.i,+b.dataset.i===q.answer));
 if($('#chk')){$('#chk').onclick=()=>{const v=$('#ans').value.trim();if(v)rec(v,LEQ.checkNum(q,v))};$('#ans').onkeydown=e=>{if(e.key==='Enter')$('#chk').click()};$('#ans').focus();}
 if($('#next'))$('#next').onclick=()=>{if(st.i+1<st.qs.length){st.i++;save();show();window.scrollTo(0,0)}else results()};
 $('#quit').onclick=start;
}
function results(){
 st.done=true;save();const by={};
 st.qs.forEach((q,i)=>{const k=((M[q.mode]||{}).name||'')+' — '+q.topic;by[k]=by[k]||{n:0,ok:0,lab:q.lab};by[k].n++;if(st.res[i]&&st.res[i].ok)by[k].ok++});
 const miss=Object.keys(by).filter(k=>by[k].ok<by[k].n);const labMiss=st.qs.filter((q,i)=>q.lab&&!st.res[i].ok).length,labN=st.qs.filter(q=>q.lab).length;
 const pct=Math.round(st.score/st.qs.length*100);
 let h='<div class="card"><h2>Score: '+st.score+' / '+st.qs.length+' ('+pct+'%)</h2><p class="prog">'+esc(st.label)+(labN?' · Lab questions: '+(labN-labMiss)+'/'+labN+' correct':'')+'</p>';
 h+='<h3>Review these topics</h3>'+(miss.length?miss.map(k=>'<div class="row"><span>'+(by[k].lab?'🔬 ':'')+esc(k)+'</span><span class="bad">'+by[k].ok+'/'+by[k].n+'</span></div>').join(''):'<p class="ok">Nothing missed — great job! 全对！</p>');
 h+='<button class="btn" id="again">Same set again (new questions)</button><button class="btn sec" id="home">Back to sets</button></div>';
 app.innerHTML=h;$('#home').onclick=start;$('#again').onclick=()=>{st={mode:st.mode,label:st.label,qs:LEQ.build(st.mode,st.qs.length,Math.floor(Math.random()*1e9)),i:0,res:[],score:0,done:false};save();show()};
}
start();})();
