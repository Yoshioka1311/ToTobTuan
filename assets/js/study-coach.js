/* A short, recall-first companion to the complete exam pages. */
window.createStudyCoach = ({data,getState,save,esc,icon,code,sizeControl,render,toast}) => {
 const M=window.StudyMemory;
 const items=data.topics.flatMap(t=>data.questions[t.id].map((q,i)=>({key:t.id+':'+i,source:t.source,topic:t.id,level:q.level,q,t})));
 const lookup=key=>items.find(item=>item.key===key);
 const groups=data.sources.filter(s=>s.id!=='cheat');
 let message='';
 const format=ms=>{
  if(!Number.isFinite(ms)||Math.abs(ms)>8.64e15)return 'ยังไม่มีเวลาทวน';
  return new Intl.DateTimeFormat('th-TH',{timeZone:'Asia/Bangkok',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(ms));
 };
 function preferences(requested){
  const pref=getState().coachPrefs;
  const source=groups.some(g=>g.id===requested)?requested:pref.source;
  const topic=source===pref.source&&(pref.topic==='all'||data.topics.some(t=>t.id===pref.topic&&t.source===source))?pref.topic:data.topics.find(t=>t.source===source)?.id||'variables';
  return {source,topic,size:pref.size===5?5:3};
 }
 function options(source,selected){
  return '<option value="all">ผสมหัวข้อในบทนี้</option>'+data.topics.filter(t=>t.source===source).map(t=>`<option value="${t.id}" ${selected===t.id?'selected':''}>${esc(t.title)}</option>`).join('');
 }
 function setup(requested){
  const pref=preferences(requested),s=getState();
  const due=items.filter(i=>i.source===pref.source&&Number.isFinite(s.review[i.key]?.dueAt)&&s.review[i.key].dueAt<=Date.now()).length;
  return `<section class="coach-setup"><div class="eyebrow">ONE QUESTION AT A TIME</div><h1>เริ่มแค่ 3 ข้อก็พอ</h1><p class="coach-lede">เลือกเรื่องเดียว ลองตอบจากความจำ แล้วค่อยเทียบเหตุผล ไม่จับเวลา และพักกลางรอบได้</p><div class="coach-plan"><span>1. ลองนึกเอง</span><span>2. เทียบคำตอบ</span><span>3. เก็บข้อที่ยังติดไว้ทวน</span></div><div class="coach-setup-card"><div class="coach-fields"><label>บทที่ฝึก<select id="coach-source">${groups.map(g=>`<option value="${g.id}" ${pref.source===g.id?'selected':''}>${g.title}</option>`).join('')}</select></label><label>เลือกเรื่องเดียวก่อน<select id="coach-topic">${options(pref.source,pref.topic)}</select></label><label>ความยาวรอบ<select id="coach-size"><option value="3" ${pref.size===3?'selected':''}>3 ข้อ · เริ่มสั้น ๆ</option><option value="5" ${pref.size===5?'selected':''}>5 ข้อ · เมื่อพร้อม</option></select></label>${sizeControl()}</div><p class="coach-due">${due?'มี '+due+' ข้อถึงเวลาทวนในบทนี้':'เริ่มจากข้อพื้นฐาน แล้วค่อยเชื่อมไปข้อที่ยากขึ้น'}</p><button class="button primary" data-action="coach-start">${icon('play')}เริ่มรอบสั้น ๆ</button>${message?`<div class="callout info coach-empty"><p>${esc(message)}</p><button class="button small" data-action="coach-start" data-early="true">ฝึกซ้ำก่อนกำหนด</button></div>`:''}</div><details class="coach-method"><summary>เว็บช่วยเลือกข้อและนัดทวนอย่างไร?</summary><p>เลือกข้อที่ถึงเวลาทวนก่อน ตามด้วยข้อที่เคยตอบผิด และข้อใหม่ ถ้าใช้คำใบ้หรือยังนึกไม่ออก จะนัดกลับมาทวนเร็วขึ้น</p><p>ระยะเริ่มต้นคือ 10 นาทีเมื่อยังติด และ 1, 3, 7 วันเมื่อดึงคำตอบได้เองตามรอบ การตอบซ้ำก่อนนัดไม่เพิ่มระยะทวน วันนัดแสดงเมื่อเปิดเว็บนี้ ไม่มีการส่งแจ้งเตือน</p><p>หลักการมาจากการฝึกเรียกคืนความรู้และการเว้นระยะ แต่ช่วงเวลาข้างต้นเป็นค่าตั้งต้นของเว็บ ไม่ใช่สูตรที่เหมาะกับทุกคน</p><div class="source-links"><a target="_blank" rel="noopener" href="https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/">งานวิจัยเรื่องการลองตอบจากความจำ</a><a target="_blank" rel="noopener" href="https://digitalcommons.usf.edu/psy_facpub/1766/">งานวิจัยเรื่องการเว้นระยะทวน</a></div></details><a class="text-link" href="#/practice/${pref.source}">เปิดข้อสอบรวมทั้งบท ${icon('arrow')}</a></section>`;
 }
 function summary(r){
  const records=r.keys.map(key=>({item:lookup(key),record:r.results[key]}));
  const again=records.filter(x=>x.record?.rating==='again').length;
  return `<section class="coach-summary"><div class="eyebrow">A SMALL ROUND, FINISHED</div><h1>ฝึกครบ ${r.keys.length} ข้อแล้ว</h1><p class="coach-lede">${again?'มี '+again+' ข้อที่ควรกลับมาลองอีกครั้ง เราเก็บไว้ให้แล้ว':'รอบนี้คุณประเมินว่าดึงคำตอบได้เอง ลองทวนตามนัดอีกครั้งเพื่อเช็กว่าจำข้ามวันได้ไหม'}</p><div class="coach-review-list">${records.map(({item,record})=>`<article><span class="coach-review-tag">${record?.rating==='remembered'?'นึกได้เอง':'กลับมาลองอีกครั้ง'}</span><h2>${esc(item.t.title)}</h2><p>${esc(item.q.prompt)}</p><small>ทวนครั้งถัดไป ${format(record?.dueAt)} · เวลาไทย</small></article>`).join('')}</div><p class="coach-small-note">ผลรอบนี้เป็นการประเมินตัวเอง แยกจากคะแนนข้อสอบ และไม่ได้หมายความว่าจะจำได้ถาวร</p><div class="button-row"><button class="button primary" data-action="coach-finish">จบรอบนี้ แล้วเลือกว่าจะพักหรือฝึกต่อ</button><a class="button" href="#/home">พักก่อน กลับห้องอ่าน</a></div></section>`;
 }
 function paused(r){
  return `<section class="coach-paused"><div class="eyebrow">YOUR PLACE IS SAVED</div><h1>พักก่อนได้ครับ</h1><p class="coach-lede">เก็บคำตอบกับตำแหน่งที่ทำไว้แล้ว กลับมาเมื่อพร้อม ไม่ต้องเริ่มใหม่</p><p>ทำไปแล้ว ${r.position} จาก ${r.keys.length} ข้อ</p><div class="button-row"><button class="button primary" data-action="coach-resume">ทำต่อจากที่พักไว้ ${icon('arrow')}</button><a class="button" href="#/home">กลับห้องอ่าน</a></div></section>`;
 }
 function round(r){
  if(r.phase==='summary')return summary(r);
  if(r.phase==='paused')return paused(r);
  const item=lookup(r.keys[r.position]);
  if(!item)return setup();
  const {q,t}=item,needsChoices=q.options&&q.prompt.includes('ข้อใด');
  const choices=q.options?`<ul class="coach-given-options">${q.options.map(op=>`<li>${esc(op)}</li>`).join('')}</ul>`:'';
  return `<section class="coach-round"><div class="coach-round-top"><a class="text-link" href="#/practice/${r.source}">กลับข้อสอบรวม</a><span>รอบนี้ ${r.position+1} / ${r.keys.length} ข้อ</span><button class="text-link" data-action="coach-pause">${icon('clock')}พักรอบนี้ไว้</button></div><progress class="coach-progress" value="${r.position}" max="${r.keys.length}" aria-label="ความคืบหน้ารอบสั้น"></progress><div class="coach-question-tools"><span class="eyebrow">${esc(t.title)}</span>${sizeControl()}</div><h1 class="coach-prompt" tabindex="-1">${esc(q.prompt)}</h1>${q.code?code(q.code):''}${needsChoices?choices:''}
  ${r.phase==='recall'?`<div class="coach-recall"><label for="coach-answer">ลองตอบด้วยคำของตัวเองสั้น ๆ ก่อน</label><textarea id="coach-answer" placeholder="คิดว่าได้อะไร หรือควรแก้อย่างไร เพราะอะไร..." rows="3">${esc(r.draft)}</textarea><div class="button-row"><button class="button primary" data-action="coach-reveal" ${r.draft.trim()?'':'disabled'}>เทียบคำตอบกับเหตุผล ${icon('arrow')}</button><button class="text-link" data-action="coach-skip">ยังนึกไม่ออก</button></div><div class="coach-help"><button class="text-link" data-action="coach-hint">ขอคำใบ้</button>${q.options&&!needsChoices?'<button class="text-link" data-action="coach-options">ดูตัวเลือกเป็นตัวช่วย</button>':''}</div>${r.usedHint?`<aside class="callout info"><p>${esc(q.hint)}</p>${r.showOptions?choices:''}</aside>`:''}</div>`:
  `<div class="coach-feedback"><section><div class="eyebrow">คำตอบที่คุณลองนึก</div><p class="coach-own-answer">${esc(r.draft||'รอบนี้ยังนึกคำตอบไม่ออก')}</p></section><section><h2>เทียบกับแนวคำตอบ</h2><p class="coach-correct-answer">${esc(q.answer)}</p><p>${esc(q.explanation)}</p></section><p class="coach-small-note">ไม่ตรวจข้อความอัตโนมัติ ให้เทียบเหตุผลก่อนประเมินตัวเอง ${r.usedHint||r.skipped?'รอบนี้ใช้ตัวช่วยหรือนึกไม่ออก จึงเก็บไว้ทวนเร็วขึ้น':''}</p><div class="coach-ratings"><button class="button primary" data-action="coach-rate" data-rating="remembered" ${r.usedHint||r.skipped?'disabled':''}>นึกได้เอง พร้อมเหตุผล</button><button class="button" data-action="coach-rate" data-rating="again">ยังติด / เดา / เหตุผลยังไม่ครบ</button></div><a class="text-link" href="#/lesson/${t.id}/short">กลับไปอ่านหลักของเรื่องนี้ ${icon('book')}</a></div>`}</section>`;
 }
 function view(requested){
  const r=getState().training;
  return `<div class="coach-page">${r?round(r):setup(requested)}</div>`;
 }
 function act(action,button){
  if(!action.startsWith('coach-'))return false;
  const s=getState(),r=s.training;
  if(action==='coach-start'){
   const source=document.querySelector('#coach-source').value,topic=document.querySelector('#coach-topic').value,size=Number(document.querySelector('#coach-size').value);
   s.coachPrefs={source,topic,size};
   const picked=M.selectRound({items,records:s.review,answers:s.answers,source,topic,limit:size,now:Date.now(),includeEarly:button.dataset.early==='true'});
   if(!picked.length){message='เรื่องที่เลือกยังไม่มีข้อถึงเวลาทวน ลองเลือกเรื่องใหม่ หรือฝึกซ้ำก่อนกำหนดได้';save();render();return true;}
   s.training={keys:picked.map(i=>i.key),source,topic,position:0,phase:'recall',draft:'',usedHint:false,showOptions:false,skipped:false,results:{}};message='';save();render();return true;
  }
  if(action==='coach-finish'){s.training=null;message='';save();render();return true;}
  if(!r)return true;
  if(action==='coach-pause'){r.resumePhase=r.phase;r.phase='paused';}
  else if(action==='coach-resume')r.phase=r.resumePhase==='feedback'?'feedback':'recall';
  else if(action==='coach-hint'||action==='coach-options'){if(r.phase!=='recall')return true;r.usedHint=true;if(action==='coach-options')r.showOptions=true;}
  else if(action==='coach-reveal'){if(r.phase!=='recall'||!r.draft.trim())return true;r.phase='feedback';}
  else if(action==='coach-skip'){if(r.phase!=='recall')return true;r.skipped=true;r.phase='feedback';}
  else if(action==='coach-rate'){
   if(r.phase!=='feedback')return true;
   const key=r.keys[r.position],record=M.scheduleReview(s.review[key],{rating:button.dataset.rating,usedHint:r.usedHint,skipped:r.skipped,now:Date.now()});
   s.review[key]=record;r.results[key]=record;r.position++;r.phase=r.position>=r.keys.length?'summary':'recall';r.draft='';r.usedHint=false;r.showOptions=false;r.skipped=false;
  }else return false;
  save();render();return true;
 }
 function input(target){
  if(target.id!=='coach-answer'||!getState().training)return false;
  getState().training.draft=target.value;save();document.querySelector('[data-action="coach-reveal"]').disabled=!target.value.trim();return true;
 }
 function change(target){
  if(target.id==='coach-source'){
   const selected=data.topics.find(t=>t.source===target.value).id;
   document.querySelector('#coach-topic').innerHTML=options(target.value,selected);return true;
  }
  return false;
 }
 return {view,act,input,change,items,knownKeys:items.map(i=>i.key)};
};
