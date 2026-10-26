/* Offline subject navigation and choice-only practice. No account or backend. */
(() => {
 'use strict';
 const D=window.DESK,M=window.StudyMemory,KEY='totobtuan.study.v2';
 const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const lookup=new Map(D.items.map(i=>[i.key,i]));
 const subject=id=>D.subjects.find(s=>s.id===id),group=id=>D.groups.find(g=>g.id===id),topic=id=>D.topics.find(t=>t.id===id);
 const levels={easy:'ง่าย',medium:'กลาง',hard:'ยาก'};
 const defaults=()=>({choiceVersion:1,read:[],bookmarks:[],answers:{},notes:{},drafts:{},review:{},training:null,last:'runtime',theme:'paper',font:18,questionFont:34,activeSubject:'itds211',coachPrefs:{source:'ca01',topic:'all',size:3}});
 let state=defaults(),storageOK=true,route={},notice='',resetScope=null,timer,lastRenderedHash=null;
 const openedExams=new Set();
 try{
  const saved=JSON.parse(localStorage.getItem(KEY)||'null');
  if(saved&&typeof saved==='object'&&!Array.isArray(saved)){
   state={...state,...saved};
   for(const key of ['answers','notes','drafts','review'])if(!state[key]||typeof state[key]!=='object'||Array.isArray(state[key]))state[key]={};
   if(!state.examRuns||typeof state.examRuns!=='object'||Array.isArray(state.examRuns))state.examRuns={};
   if(saved.choiceVersion!==1){
    state.legacyWrittenAnswers=state.legacyWrittenAnswers&&typeof state.legacyWrittenAnswers==='object'&&!Array.isArray(state.legacyWrittenAnswers)?state.legacyWrittenAnswers:{};
    state.legacyReview=state.legacyReview&&typeof state.legacyReview==='object'&&!Array.isArray(state.legacyReview)?state.legacyReview:{};
    for(const key of D.convertedKeys){
     if(state.answers[key]){state.legacyWrittenAnswers[key]=state.answers[key];delete state.answers[key];}
     if(state.review[key]){state.legacyReview[key]=state.review[key];delete state.review[key];}
    }
    state.choiceVersion=1;
   }
   for(const key of ['read','bookmarks'])state[key]=Array.isArray(state[key])?state[key].filter(id=>topic(id)):[];
   if(!subject(state.activeSubject))state.activeSubject='itds211';
   state.questionFont=Number.isFinite(state.questionFont)?Math.max(24,Math.min(52,state.questionFont)):34;
   if(!['paper','night'].includes(state.theme))state.theme='paper';
   if(!state.coachPrefs||!group(state.coachPrefs.source))state.coachPrefs={source:'ca01',topic:'all',size:3};
   for(const [key,r] of Object.entries(state.review))if(!lookup.has(key)||!Number.isFinite(r?.dueAt))delete state.review[key];
   if(!state.rounds||typeof state.rounds!=='object'||Array.isArray(state.rounds))state.rounds={};
   for(const [id,r] of Object.entries(state.rounds))if(!subject(id)||!validRound(r)||r.subject!==id)delete state.rounds[id];
   if(!validRound(state.training)){if(state.training)state.legacyTraining=state.training;state.training=null;}
  }
 }catch{storageOK=false;}
 if(window.PracticeRevision.migrate(state,window.LECTURE_PRACTICE||[]))save();
 function validRound(r){
  if(!r||!Array.isArray(r.keys)||r.keys.length<1||r.keys.length>5||new Set(r.keys).size!==r.keys.length)return false;
  if(!Number.isInteger(r.position)||r.position<0||r.position>r.keys.length)return false;
  if(!['question','feedback','paused','summary'].includes(r.phase))return false;
  if(!r.keys.every(key=>lookup.get(key)?.subject===r.subject&&lookup.get(key)?.source===r.source))return false;
  if(!r.results||typeof r.results!=='object')return false;
  if(r.position===r.keys.length&&r.phase!=='summary')return false;
  return r.position===r.keys.length||r.phase!=='summary';
 }
 function save(){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;toast('บันทึกไม่ได้ ข้อมูลจะอยู่จนปิดหน้านี้');}}
 function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>$('#toast').classList.remove('visible'),3000);}
 function settings(){document.body.dataset.theme=state.theme;document.documentElement.style.setProperty('--question-size',state.questionFont+'px');}
 function active(){return subject(state.activeSubject);}
 function activate(id){
  if(state.activeSubject===id)return;
  state.rounds=state.rounds||{};
  if(state.training)state.rounds[state.training.subject]=state.training;
  state.training=validRound(state.rounds[id])?state.rounds[id]:null;
  delete state.rounds[id];state.activeSubject=id;
 }
 function scopedTopics(){return D.topics.filter(t=>t.subject===active().id);}
 function sizeControl(){return `<label class="question-size-label">ขนาดคำถาม <select class="question-size" aria-label="ขนาดคำถาม">${[...new Set([28,34,42,50,state.questionFont])].sort((a,b)=>a-b).map(n=>`<option value="${n}" ${n===state.questionFont?'selected':''}>${n}px</option>`).join('')}</select></label>`;}
 function pdfLink(t,from=t.from||1,to=t.to||from){return `<a class="source-link" href="${esc(t.pdf)}#page=${from}" target="_blank" rel="noopener">PDF หน้า ${from}${to!==from?'–'+to:''} ↗</a>`;}
 function code(value){return value?`<pre class="code-block"><code>${esc(value)}</code></pre>`:'';}
 function shell(){
  const s=active(),quiet=['exam','practice'].includes(route.kind)||(route.kind==='train'&&state.training?.subject===s.id);
  document.body.classList.toggle('quiet',quiet);
  $('#sidebar').innerHTML=`<a class="brand" href="#/home"><img src="assets/favicon.svg" width="34" height="34" alt=""><span>โต๊ะทบทวน</span></a><a class="subject-switch" href="#/home">← เปลี่ยนวิชา</a><div class="side-subject"><small>${s.code}</small><strong>${s.title}</strong></div><nav aria-label="เมนูวิชา"><a href="#/subject/${s.id}" ${route.kind==='subject'?'aria-current="page"':''}>บทเรียน</a><a href="#/train/${s.id}" ${route.kind==='train'?'aria-current="page"':''}>ฝึกทีละข้อ</a><a href="#/exams/${s.id}" ${['exam','exams'].includes(route.kind)?'aria-current="page"':''}>ข้อสอบรายบท</a><a href="#/practice/${s.id}" ${route.kind==='practice'?'aria-current="page"':''}>ข้อสอบรวม</a>${s.id==='itds241'?'<a href="#/reference">Cheatsheet</a>':''}<a href="#/library/${s.id}">เอกสาร</a></nav><div class="side-chapters">${D.groups.filter(g=>g.subject===s.id).map(g=>`<a href="#/exam/${g.id}">${esc(g.short)}</a>`).join('')}</div><div class="storage-note">${storageOK?'บันทึกในเครื่อง':'บันทึกชั่วคราว'}</div>`;
  $('#topbar').innerHTML=`<div class="top-location"><button class="icon-button mobile-menu" data-action="menu" aria-label="เปิดเมนู" aria-expanded="false">☰</button><a href="#/home">โต๊ะทบทวน</a><span>/</span><a href="#/subject/${s.id}">${s.code}</a></div><div class="top-tools"><button class="icon-button" data-action="search" aria-label="ค้นหา">⌕</button><button class="icon-button" data-action="theme" aria-label="สลับโหมดกลางคืน">${state.theme==='night'?'☀':'☾'}</button></div>`;
  $('.footer').innerHTML=`<span>โต๊ะทบทวน · ${s.code}</span><button class="text-button" data-action="export">สำรองบันทึก ↓</button>`;
 }
 function home(){
  return `<section class="home-head"><span class="eyebrow">THE STUDY DESK</span><h1>วันนี้ทบทวนวิชาไหน?</h1></section><div class="subject-grid">${D.subjects.map(s=>{
   const ts=D.topics.filter(t=>t.subject===s.id),count=ts.reduce((n,t)=>n+t.questions.length,0);
   return `<a class="subject-card ${s.id==='itds211'?'architecture':'javascript'}" data-subject="${s.id}" href="#/subject/${s.id}"><div class="subject-mark">${s.mark}<span>${s.code}</span></div><div class="subject-card-body"><h2>${s.title}</h2><p>${s.thai}</p><div class="subject-card-bottom"><span>${ts.length} บทเรียน · ${count} ข้อ</span><b aria-hidden="true">↗</b></div></div></a>`;
  }).join('')}</div>`;
 }
 function subjectView(s){
  const groups=D.groups.filter(g=>g.subject===s.id);
  return `<header class="page-head"><span class="eyebrow">${s.code}</span><h1>${s.title}</h1><div class="button-row"><a class="button primary" href="#/train/${s.id}">ฝึก 3 ข้อ →</a><a class="button" href="#/exams/${s.id}">ทำข้อสอบรายบท</a><a class="button" href="#/practice/${s.id}">ข้อสอบรวม</a></div></header><div class="chapter-grid">${groups.map((g,i)=>{
   const ts=D.topics.filter(t=>t.group===g.id),count=ts.reduce((n,t)=>n+t.questions.length,0);
   const hasLecture=ts.some(t=>t.questions.some(q=>q.provenance));
   return `<article class="chapter-card"><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><div><h2>${esc(g.short)}</h2><p>${count} ข้อ · PDF ${g.pages} หน้า</p><div class="chapter-links"><a href="${ts.length===1?'#/lesson/'+ts[0].id:'#/summary/'+g.id}">อ่านสรุป</a><a href="#/exam/${g.id}">${hasLecture?'ข้อสอบเดิม':'ทำข้อสอบ'} →</a>${hasLecture?`<a href="#/exam/${g.id}/lecture">แนวคาบทบทวน →</a>`:''}</div></div></article>`;
  }).join('')}</div>`;
 }
 function chapterExams(){
  const s=active(),chapters=D.groups.filter(g=>g.subject===s.id);
  return `<header class="page-head"><span class="eyebrow">${s.code}</span><h1>ข้อสอบรายบท</h1></header><div class="chapter-grid">${chapters.map((g,i)=>{
   const banks=[scopeFor(g.id),scopeFor(g.id,'lecture')].filter(scope=>scope.topics.length);
   return `<article class="chapter-card exam-chapter-card" data-chapter="${g.id}"><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><div class="chapter-exam-body"><h2>${esc(g.short)}</h2>${banks.map(scope=>`<section class="exam-bank" data-bank="${scope.bank}"><div class="exam-bank-heading"><h3>${banks.length>1?bankLabel(scope):'ข้อสอบ'}</h3><span class="chapter-exam-count">${scope.topics.reduce((n,t)=>n+t.questions.length,0)} ข้อ</span></div><p class="chapter-exam-score">${score(scope)}</p><a class="button ${scope.bank==='lecture'?'':'primary '}small" href="#/exam/${g.id}${scope.bank==='lecture'?'/lecture':''}">เริ่มข้อสอบ →</a></section>`).join('')}</div></article>`;
  }).join('')}</div>`;
 }
 function lesson(t,full=false){
  const body=full?t.sections.map((s,i)=>`<section class="reading-section"><h2>${esc(s.title)}</h2><p>${esc(s.body)}</p>${code(s.code)}${s.from?pdfLink(t,s.from,s.to):''}</section>`).join(''):`<ul class="takeaways">${t.takeaways.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="concept-list">${t.sections.map(s=>`<details><summary>${esc(s.title)}</summary><p>${esc(s.body)}</p>${code(s.code)}${s.from?pdfLink(t,s.from,s.to):''}</details>`).join('')}</div>`;
  return `<header class="page-head"><span class="eyebrow">${active().code} · ${esc(t.english)}</span><h1>${esc(t.title)}</h1><div class="lesson-tools">${pdfLink(t)}<button class="text-button" data-action="bookmark" data-id="${t.id}" aria-pressed="${state.bookmarks.includes(t.id)}">${state.bookmarks.includes(t.id)?'★ เก็บไว้แล้ว':'☆ เก็บไว้อ่าน'}</button></div></header><nav class="tabs" aria-label="เนื้อหาบทเรียน"><a href="#/lesson/${t.id}/short" ${!full?'aria-current="page"':''}>สรุป</a><a href="#/lesson/${t.id}/read" ${full?'aria-current="page"':''}>เนื้อหา</a><a href="#/exam/${t.group}/${t.id}">ข้อสอบ</a></nav><article class="reading">${body}${full&&t.example?`<details class="example"><summary>${esc(t.example.title)}</summary>${code(t.example.code)}<p>${esc(t.example.expected)}</p></details>`:''}${t.pitfall?`<details class="source-note"><summary>จุดที่ควรระวัง</summary><p>${esc(t.pitfall)}</p></details>`:''}<div class="lesson-bottom"><button class="button" data-action="read" data-id="${t.id}" aria-pressed="${state.read.includes(t.id)}">${state.read.includes(t.id)?'✓ อ่านแล้ว':'ทำเครื่องหมายอ่านแล้ว'}</button><a class="button primary" href="#/train/${t.group}">ฝึก 3 ข้อ →</a></div></article>`;
 }
 function summaries(id){
  const ts=scopedTopics().filter(t=>!id||id==='all'||t.group===id||t.id===id);
  return `<header class="page-head"><span class="eyebrow">${active().code}</span><h1>สรุปก่อนสอบ</h1><button class="text-button" data-action="print">พิมพ์ / PDF ↓</button></header><div class="summary-list">${ts.map(t=>`<details><summary>${esc(t.title)}</summary><ul>${t.takeaways.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><a href="#/lesson/${t.id}">อ่านต่อ →</a></details>`).join('')}</div>`;
 }
 function bankLabel(scope){return scope.bank==='lecture'?'แนวคาบทบทวน':'ข้อสอบเดิม';}
 function scopeFor(id,bank='original'){
  const t=topic(id),g=group(id),s=subject(id);
  const selected=s||active();
  const base=t?{id:t.group,subject:t.subject,title:group(t.group).title,topics:D.topics.filter(x=>x.group===t.group)}:g?{...g,topics:D.topics.filter(x=>x.group===g.id)}:{id:selected.id,subject:selected.id,title:'ทุกบท · '+selected.code,topics:D.topics.filter(x=>x.subject===selected.id)};
  return {...base,baseId:base.id,bank,id:base.id+(bank==='lecture'?':lecture':''),topics:base.topics.map(t=>({...t,questions:t.questions.filter(q=>Boolean(q.provenance)===(bank==='lecture'))})).filter(t=>t.questions.length)};
 }
 function feedback(q,a){
  if(!a?.revealed||!q.options.includes(a.response))return '';
  const correct=a.response===q.options[q.correct];
  return `<div class="feedback ${correct?'correct':'incorrect'}" role="status"><strong>${correct?'✓ ถูกต้อง':'ยังไม่ตรง'}</strong>${correct?'':`<p>คำตอบ: ${esc(q.options[q.correct])}</p>`}<p>${esc(q.explanation)}</p>${choiceReasons(q)}${originNote(q)}</div>`;
 }
 function originNote(q){
  const p=q.provenance;if(!p)return '';
  const clock=value=>{const n=Math.floor(value);return `${Math.floor(n/3600)}:${String(Math.floor(n/60)%60).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;};
  const label=p.kind==='audio-adapted'?'อิงประเด็นคำถามในเสียง':'โจทย์ประยุกต์แนวเดียวกัน';
  return `<details class="question-origin"><summary>ที่มาของแนวคำถาม</summary><p>${label}<br>${p.kind==='style-transfer'?'ต้นแบบในเสียง':'ช่วงเสียง'} ${clock(p.audioFrom)}–${clock(p.audioTo)}<br>${esc(p.anchor)}</p></details>`;
 }
 function choiceReasons(q){
  if(!Array.isArray(q.optionExplanations)||q.optionExplanations.length!==q.options.length)return '';
  return `<details class="choice-reasons"><summary>ทำไมตัวเลือกอื่นไม่ใช่?</summary><ul>${q.options.map((option,i)=>i===q.correct?'':`<li><strong>${esc(option)}</strong><p>${esc(q.optionExplanations[i])}</p></li>`).join('')}</ul></details>`;
 }
 function choices(q,value,name,disabled=false,order=q.options.map((_,i)=>i)){return `<div class="options">${order.map((index,i)=>`<label class="option"><input type="radio" name="${esc(name)}" value="${index}" ${value===q.options[index]?'checked':''} ${disabled?'disabled':''}><span class="choice-letter">${'ABCD'[i]}</span><span>${esc(q.options[index])}</span></label>`).join('')}</div>`;}
 function question(q,t,number,optionOrder){
  const a=state.answers[q.id]||{};
  return `<section class="question" data-question="${q.id}" id="question-${t.id}-${q.id.split(':')[1]}"><div class="question-meta"><span>ข้อ ${number}</span><span class="difficulty ${q.level}">${levels[q.level]}</span></div><fieldset><legend class="question-prompt">${esc(q.prompt)}</legend>${code(q.code)}${choices(q,a.response,q.id,false,optionOrder)}</fieldset><div class="question-actions"><button class="button primary" data-action="check" data-key="${q.id}" ${q.options.includes(a.response)?'':'disabled'}>ตอบข้อนี้</button>${pdfLink(t,q.from,q.to)}</div>${feedback(q,a)}</section>`;
 }
 function score(scope){
  const qs=scope.topics.flatMap(t=>t.questions),checked=qs.filter(q=>state.answers[q.id]?.revealed&&q.options.includes(state.answers[q.id]?.response)),correct=checked.filter(q=>state.answers[q.id].response===q.options[q.correct]);
  return `ถูก ${correct.length} / ตรวจแล้ว ${checked.length} · ทั้งหมด ${qs.length} ข้อ`;
 }
 function examRun(scope,restart=false){
  state.examRuns=state.examRuns||{};
  if(restart||!openedExams.has(scope.id)){
   const items=scope.topics.flatMap(t=>t.questions.map(q=>({key:q.id,optionCount:q.options.length})));
   state.examRuns[scope.id]=window.ExamSession.create(items,state.examRuns[scope.id]);
   if(restart)state.examRuns[scope.id].position=0;
   openedExams.add(scope.id);save();
  }
  return state.examRuns[scope.id];
 }
 function questionNumbers(scope){
  const run=examRun(scope);
  return run.order.map((key,i)=>{
   const item=lookup.get(key),a=state.answers[key],answered=item.q.options.includes(a?.response),checked=answered&&a.revealed,current=i===run.position;
   const status=checked?(a.response===item.q.answer?'correct':'incorrect'):answered?'answered':'';
   return `<button class="exam-number ${answered?'answered':''} ${status}" data-action="exam-go" data-position="${i}" data-key="${key}" ${current?'aria-current="step"':''} aria-label="ข้อ ${i+1}${current?' กำลังทำ':''}${checked?' ตรวจแล้ว':answered?' ตอบแล้ว':' ยังไม่ตอบ'}">${i+1}</button>`;
  }).join('');
 }
 function examProgress(scope){const run=examRun(scope),answered=run.order.filter(key=>lookup.get(key).q.options.includes(state.answers[key]?.response)).length;return `ข้อ ${run.position+1} / ${run.order.length} · ตอบแล้ว ${answered} ข้อ`;}
 function updateExamStatus(){
  $('#exam-score').textContent=score(route.scope);$('#exam-progress').textContent=examProgress(route.scope);$('#exam-number-grid').innerHTML=questionNumbers(route.scope);
  revealExamNumber();
 }
 function revealExamNumber(){
  const grid=$('#exam-number-grid'),button=$('.exam-number[aria-current=step]');if(!grid||!button)return;
  const box=grid.getBoundingClientRect(),item=button.getBoundingClientRect();
  if(item.top<box.top+4)grid.scrollTop-=box.top+4-item.top;
  else if(item.bottom>box.bottom-4)grid.scrollTop+=item.bottom-box.bottom+4;
 }
 function exams(scope,chapterMode=false){
  if(!scope.topics.length)return `<header class="page-head"><a class="back-to-exams" href="#/exams/${active().id}">← เลือกบทข้อสอบ</a><h1>ยังไม่มี${bankLabel(scope)}ในบทนี้</h1></header>`;
  const run=examRun(scope),item=lookup.get(run.order[run.position]);
  return `<section class="exam-player"><header class="page-head"><a class="back-to-exams" href="#/exams/${active().id}">← เลือกบทข้อสอบ</a><span class="eyebrow">${active().code} · ${chapterMode?'ข้อสอบรายบท':'ข้อสอบรวม'}${scope.subject==='itds211'?' · '+bankLabel(scope):''}</span><h1>${esc(scope.title)}</h1></header><div class="player-tools"><span id="exam-progress" role="status">${examProgress(scope)}</span>${sizeControl()}<button class="text-button" data-action="reset-exam">เริ่มใหม่ ↻</button></div><div class="exam-player-layout"><div class="exam-current">${question(item.q,item.t,run.position+1,run.options[item.key])}<nav class="exam-step-controls" aria-label="เปลี่ยนข้อ"><button class="button" data-action="exam-prev" ${run.position===0?'disabled':''}>← ข้อก่อนหน้า</button><button class="button primary" data-action="exam-next" ${run.position===run.order.length-1?'disabled':''}>ข้อถัดไป →</button></nav><div class="exam-toolbar"><span id="exam-score" role="status">${score(scope)}</span><button class="text-button" data-action="check-all">ตรวจข้อที่ตอบแล้ว</button></div></div><aside class="exam-question-map"><h2>เลขข้อ</h2><nav id="exam-number-grid" class="exam-number-grid" aria-label="เลือกข้อสอบ">${questionNumbers(scope)}</nav><p>● ตอบแล้ว <span>○ ยังไม่ตอบ</span></p></aside></div></section>`;
 }
 function trainingSetup(requested){
  const fallback=D.groups.find(g=>g.subject===active().id),pref=state.coachPrefs||{},selected=group(requested)?.subject===active().id?group(requested):group(pref.source)?.subject===active().id?group(pref.source):fallback;
  const ts=D.topics.filter(t=>t.group===selected.id),due=D.items.filter(i=>i.subject===active().id&&Number.isFinite(state.review[i.key]?.dueAt)&&state.review[i.key].dueAt<=Date.now()).length;
  return `<section class="coach-setup"><header class="page-head"><span class="eyebrow">${active().code}</span><h1>ฝึกทีละข้อ</h1></header><div class="setup-card"><label>บท<select id="coach-source">${D.groups.filter(g=>g.subject===active().id).map(g=>`<option value="${g.id}" ${g.id===selected.id?'selected':''}>${esc(g.title)}</option>`).join('')}</select></label><label>หัวข้อ<select id="coach-topic"><option value="all">ทุกหัวข้อในบท</option>${ts.length>1?ts.map(t=>`<option value="${t.id}" ${pref.topic===t.id?'selected':''}>${esc(t.title)}</option>`).join(''):''}</select></label><div class="setup-bottom"><label>รอบละ<select id="coach-size"><option value="3" ${pref.size!==5?'selected':''}>3 ข้อ</option><option value="5" ${pref.size===5?'selected':''}>5 ข้อ</option></select></label>${sizeControl()}</div>${due?`<p class="muted">ถึงเวลาทวน ${due} ข้อในวิชานี้</p>`:''}<button class="button primary" data-action="start">เริ่ม →</button>${notice?`<div class="empty-notice"><p>${esc(notice)}</p><button class="text-button" data-action="start" data-early="true">ฝึกซ้ำก่อนกำหนด →</button></div>`:''}</div><details class="method-note"><summary>การบันทึกและนัดทวน</summary><p>ตอบผิด ใช้คำใบ้ หรือข้าม จะนัดทวนใน 10 นาที ตอบถูกเองเว้น 1, 3, 7 วันตามรอบ นี่เป็นค่าเริ่มต้นของเว็บ ไม่ใช่การรับรองว่าจะจำได้ ไม่มีการแจ้งเตือนเบื้องหลัง ผลฝึกแยกจากคะแนนข้อสอบ</p></details></section>`;
 }
 function training(requested){
  const r=state.training;
  if(!r||r.subject!==active().id)return trainingSetup(requested);
  if(r.phase==='paused')return `<section class="coach-paused"><h1>พักไว้แล้ว</h1><p>ข้อ ${Math.min(r.position+1,r.keys.length)} / ${r.keys.length}</p><button class="button primary" data-action="resume">ทำต่อ →</button><a href="#/subject/${r.subject}">กลับบทเรียน</a></section>`;
  if(r.phase==='summary'){
   const correct=Object.values(r.results).filter(x=>x.correct).length;
   return `<section class="coach-summary"><span class="eyebrow">จบรอบนี้</span><h1>ถูก ${correct} / ${r.keys.length} ข้อ</h1><div class="review-list">${r.keys.map(key=>{
    const i=lookup.get(key),result=r.results[key];
    return `<article><span>${result?.correct?'✓':'↻'}</span><div><h2>${esc(i.q.prompt)}</h2><small>ทวน ${formatDate(result?.dueAt)} · เวลาไทย</small></div></article>`;
   }).join('')}</div><div class="button-row"><button class="button primary" data-action="finish">จบรอบ →</button><a class="button" href="#/subject/${r.subject}">พักก่อน</a></div></section>`;
  }
  const item=lookup.get(r.keys[r.position]),q=item.q,checked=r.phase==='feedback',result=r.results[q.id];
  return `<section class="coach-round" data-question="${q.id}"><div class="round-bar"><a href="#/subject/${r.subject}">← บทเรียน</a><span>${r.position+1} / ${r.keys.length}</span><button class="text-button" data-action="pause">พักไว้</button></div><progress value="${r.position}" max="${r.keys.length}" aria-label="ความคืบหน้ารอบ"></progress><div class="round-tools"><span>${esc(item.t.title)} · ${levels[q.level]}</span>${sizeControl()}</div><fieldset><legend class="coach-prompt question-prompt">${esc(q.prompt)}</legend>${code(q.code)}${choices(q,r.selection,'coach-choice',checked)}</fieldset>${checked?`<div class="coach-feedback feedback ${result.correct?'correct':'incorrect'}" role="status"><strong>${result.correct?'✓ ถูกต้อง':'ยังไม่ตรง'}</strong>${result.correct?'':`<p>คำตอบ: ${esc(q.options[q.correct])}</p>`}<p>${esc(q.explanation)}</p>${choiceReasons(q)}${originNote(q)}${pdfLink(item.t,q.from,q.to)}</div><button class="button primary" data-action="next">${r.position+1===r.keys.length?'ดูผลรอบนี้':'ข้อถัดไป'} →</button>`:`<div class="round-actions"><button class="button primary" data-action="coach-check" ${q.options.includes(r.selection)?'':'disabled'}>ตรวจคำตอบ</button><button class="text-button" data-action="skip">ข้าม</button>${q.hint?'<button class="text-button" data-action="hint">คำใบ้</button>':''}</div>${r.usedHint?`<aside class="hint-note">${esc(q.hint||'ลองกลับไปทวนหลักของเรื่องนี้')}</aside>`:''}`}</section>`;
 }
 function formatDate(ms){if(!Number.isFinite(ms)||Math.abs(ms)>8.64e15)return 'ยังไม่มีนัด';return new Intl.DateTimeFormat('th-TH',{timeZone:'Asia/Bangkok',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(ms);}
 function library(){
  const sources=D.groups.filter(g=>g.subject===active().id);
  if(active().id==='itds241')sources.push({...D.cheatsheet,pdf:D.cheatsheet.file});
  return `<header class="page-head"><span class="eyebrow">${active().code}</span><h1>เอกสาร</h1></header><div class="document-list">${sources.map(g=>`<article><div><h2>${esc(g.title)}</h2><small>${g.pages} หน้า</small></div><div><a href="${esc(g.pdf)}" target="_blank" rel="noopener">PDF เต็ม ↗</a><a href="${esc(g.summary)}" download>สรุป ↓</a></div></article>`).join('')}</div><details class="method-note"><summary>ย้ายไปเครื่องอื่น</summary><p>นำโฟลเดอร์ materials ไปพร้อมเว็บ PDF ต้นฉบับเก็บเฉพาะในเครื่อง ไม่รวมใน GitHub</p></details>`;
 }
 function reference(){return `<header class="page-head"><span class="eyebrow">ITDS241</span><h1>Cheatsheet</h1><a href="${D.cheatsheet.file}" target="_blank" rel="noopener">PDF เต็ม ↗</a></header><div class="reference-list">${D.reference.map(r=>`<details><summary>${esc(r.title)}</summary><div class="table-scroll"><table><tbody>${r.rows.map(row=>`<tr>${row.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${code(r.example)}<small>PDF หน้า ${esc(r.pages)}</small></details>`).join('')}</div>`;}
 function render(){
  if($('#search-dialog').open)$('#search-dialog').close();
  const applyAnchor=lastRenderedHash!==location.hash;lastRenderedHash=location.hash;
  const parts=location.hash.replace(/^#\/?/,'').split('/'),kind=parts[0]||'home',id=parts[1];route={kind,id};
  const linkedSubject=subject(id)||group(id)&&subject(group(id).subject)||topic(id)&&subject(topic(id).subject);
  if(linkedSubject){activate(linkedSubject.id);save();}
  if(kind==='reference'){activate('itds241');save();}
  let html,title;
  if(kind==='home'){html=home();title='เลือกวิชา';}
  else if(kind==='subject'){html=subjectView(active());title=active().title;}
  else if(kind==='exams'){html=chapterExams();title='ข้อสอบรายบท';}
  else if(kind==='exam'&&(group(id)||topic(id))){route.scope=scopeFor(id,parts[2]==='lecture'?'lecture':'original');html=exams(route.scope,true);title='ข้อสอบรายบท · '+route.scope.title;}
  else if(kind==='lesson'&&topic(id)){html=lesson(topic(id),parts[2]==='read');title=topic(id).title;}
  else if(kind==='practice'){route.scope=scopeFor(id,parts[2]==='lecture'?'lecture':'original');html=exams(route.scope);title='ข้อสอบ · '+route.scope.title;}
  else if(kind==='train'){html=training(id);title='ฝึกทีละข้อ';}
  else if(kind==='summary'||kind==='topics'){html=summaries(id);title='สรุปก่อนสอบ';}
  else if(kind==='library'){html=library();title='เอกสาร';}
  else if(kind==='reference'){html=reference();title='Cheatsheet';}
  else{html='<h1>ไม่พบหน้านี้</h1><a href="#/home">กลับเลือกวิชา →</a>';title='ไม่พบหน้า';}
  settings();shell();$('#main').innerHTML=`<div class="page">${html}</div>`;$('#main').dataset.route=location.hash;document.title=title+' · โต๊ะทบทวน';
  document.body.classList.remove('nav-open');window.scrollTo({top:0,behavior:'instant'});$('#main').focus({preventScroll:true});
  if((kind==='practice'||kind==='exam')&&route.scope?.topics.length){
   let anchor=parts[parts[2]==='lecture'?3:2];
   if(topic(id)&&!group(id)){anchor=id;if(/^\d+$/.test(parts[2]||''))anchor='question-'+id+'-'+Math.max(0,(Number(parts[2])-1)*3);}
   if(anchor&&applyAnchor){
    const run=examRun(route.scope),prefix='question-';
    const key=anchor.startsWith(prefix)?anchor.slice(prefix.length).replace(/-(\d+)$/,':$1'):null;
    const at=key?run.order.indexOf(key):run.order.findIndex(k=>lookup.get(k).t.id===anchor);
    if(at>=0&&at!==run.position){run.position=at;save();$('#main').innerHTML=`<div class="page">${exams(route.scope,kind==='exam')}</div>`;}
   }
   revealExamNumber();
  }
 }
 function gradeExam(q){
  const a=state.answers[q.id];if(!a||!q.options.includes(a.response))return;
  a.revealed=true;a.status=a.response===q.options[q.correct]?'correct':'incorrect';
 }
 function finishChoice(skipped=false){
  const r=state.training;if(!r||r.phase!=='question')return;
  const item=lookup.get(r.keys[r.position]),q=item.q;if(!skipped&&!q.options.includes(r.selection))return;
  const correct=!skipped&&r.selection===q.options[q.correct],record=M.scheduleReview(state.review[q.id],{rating:correct?'remembered':'again',usedHint:r.usedHint,skipped,now:Date.now()});
  state.review[q.id]=record;r.results[q.id]={...record,correct,response:r.selection,skipped};r.phase='feedback';save();render();
 }
 function start(button){
  const source=$('#coach-source').value,topicId=$('#coach-topic').value,size=Number($('#coach-size').value);
  const picked=M.selectRound({items:D.items,records:state.review,answers:state.answers,source,topic:topicId,limit:size,includeEarly:button.dataset.early==='true'});
  state.coachPrefs={source,topic:topicId,size};
  if(!picked.length){notice='ข้อในหัวข้อนี้ยังไม่ถึงเวลาทวน';save();render();return;}
  if(state.training&&state.training.subject!==active().id){state.rounds=state.rounds||{};state.rounds[state.training.subject]=state.training;}
  state.training={subject:active().id,source,topic:topicId,keys:picked.map(i=>i.key),position:0,phase:'question',selection:null,usedHint:false,results:{}};notice='';save();render();
 }
 document.addEventListener('click',event=>{
  const b=event.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;
  if(a==='menu'){const open=document.body.classList.toggle('nav-open');b.setAttribute('aria-expanded',String(open));return;}
  if(a==='theme'){state.theme=state.theme==='night'?'paper':'night';save();settings();shell();return;}
  if(a==='jump'){event.preventDefault();document.getElementById('exam-topic-'+b.dataset.id)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  if(a==='check'){const item=lookup.get(b.dataset.key);if(!item)return;gradeExam(item.q);save();const card=b.closest('.question');card.querySelector('.feedback')?.remove();card.insertAdjacentHTML('beforeend',feedback(item.q,state.answers[item.key]));updateExamStatus();return;}
  if(['exam-go','exam-prev','exam-next'].includes(a)){
   const run=examRun(route.scope),at=a==='exam-go'?Number(b.dataset.position):run.position+(a==='exam-next'?1:-1);
   if(Number.isInteger(at)&&at>=0&&at<run.order.length){run.position=at;save();render();}return;
  }
  if(a==='check-all'){route.scope.topics.flatMap(t=>t.questions).forEach(gradeExam);save();const y=scrollY;render();window.scrollTo(0,y);return;}
  if(a==='reset-exam'){resetScope=route.scope;$('#exam-reset-name').textContent=route.scope.title;$('#exam-reset-dialog').showModal();return;}
  if(a==='cancel-exam-reset'){$('#exam-reset-dialog').close();return;}
  if(a==='confirm-exam-reset'){if(resetScope){resetScope.topics.flatMap(t=>t.questions).forEach(q=>delete state.answers[q.id]);examRun(resetScope,true);}resetScope=null;$('#exam-reset-dialog').close();save();render();return;}
  if(a==='bookmark'||a==='read'){const key=a==='read'?'read':'bookmarks',i=state[key].indexOf(b.dataset.id);if(i<0)state[key].push(b.dataset.id);else state[key].splice(i,1);save();const y=scrollY;render();window.scrollTo(0,y);return;}
  if(a==='start'){start(b);return;}
  const r=state.training;
  if(a==='pause'&&r){r.resumePhase=r.phase;r.phase='paused';save();render();return;}
  if(a==='resume'&&r){r.phase=r.resumePhase==='feedback'?'feedback':'question';save();render();return;}
  if(a==='coach-check'){finishChoice();return;}
  if(a==='skip'){finishChoice(true);return;}
  if(a==='hint'&&r&&r.phase==='question'){r.usedHint=true;save();render();return;}
  if(a==='next'&&r&&r.phase==='feedback'){r.position++;r.phase=r.position===r.keys.length?'summary':'question';r.selection=null;r.usedHint=false;save();render();return;}
  if(a==='finish'){state.training=null;save();render();return;}
  if(a==='search'){$('#search-dialog').showModal();$('#search-input').value='';search('');$('#search-input').focus();return;}
  if(a==='close-search'){$('#search-dialog').close();return;}
  if(a==='export'){const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download='totobtuan-backup.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return;}
  if(a==='print')window.print();
 });
 document.addEventListener('change',event=>{
  const e=event.target;
  if(e.matches('.question-size')){state.questionFont=Math.max(24,Math.min(52,Number(e.value)||34));save();settings();return;}
  if(e.id==='exam-scope'){location.hash='#/'+(route.kind==='exam'?'exam':'practice')+'/'+e.value;return;}
  if(e.id==='coach-source'){
   const ts=D.topics.filter(t=>t.group===e.value);$('#coach-topic').innerHTML='<option value="all">ทุกหัวข้อในบท</option>'+(ts.length>1?ts.map(t=>`<option value="${t.id}">${esc(t.title)}</option>`).join(''):'');return;
  }
  if(e.matches('.question input[type=radio]')){
   const card=e.closest('.question'),item=lookup.get(card.dataset.question);state.answers[item.key]={response:item.q.options[Number(e.value)],revealed:false,status:'draft'};card.querySelector('.feedback')?.remove();card.querySelector('[data-action=check]').disabled=false;save();updateExamStatus();return;
  }
  if(e.matches('.coach-round input[type=radio]')&&state.training?.phase==='question'){
   const q=lookup.get(state.training.keys[state.training.position]).q;state.training.selection=q.options[Number(e.value)];save();$('[data-action=coach-check]').disabled=false;
  }
 });
 function search(query){
  const value=query.trim().toLocaleLowerCase();
  const found=scopedTopics().filter(t=>!value||JSON.stringify([t.title,t.english,t.sections,t.takeaways,t.questions]).toLocaleLowerCase().includes(value));
  $('#search-results').innerHTML=found.length?found.map(t=>`<a class="search-result" href="#/lesson/${t.id}"><strong>${esc(t.title)}</strong><small>${esc(t.english)}</small></a>`).join(''):'<p class="empty-notice">ไม่พบหัวข้อนี้</p>';
 }
 document.addEventListener('input',event=>{if(event.target.id==='search-input')search(event.target.value);});
 document.addEventListener('click',event=>{if(event.target.closest('.search-result'))$('#search-dialog').close();});
 document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#search-dialog').showModal();search('');$('#search-input').focus();}if(event.key==='Escape'){document.body.classList.remove('nav-open');document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());}});
 $('#mobile-shade').addEventListener('click',()=>document.body.classList.remove('nav-open'));
 window.addEventListener('hashchange',render);
 render();
})();
