const assert=require('node:assert/strict');
const {launch,go}=require('./browser-helpers.cjs');
(async()=>{
 const b=await launch();try{
  const p=await b.newPage();await go(p,'#/home');
  const items=await p.evaluate(()=>['audio-adapted','style-transfer'].map(kind=>window.DESK.items.find(i=>i.q.provenance?.kind===kind)).filter(Boolean));
  assert.equal(items.length,2,'both source classes must reach the learner');
  for(const item of items){
   await go(p,'#/exam/'+item.source+'/lecture');await p.locator('.exam-number[data-key="'+item.key+'"]').click();
   assert.equal(await p.locator('.question-origin').count(),0,'source explanation appears after attempting');
   await p.locator('.question input[value="'+item.q.correct+'"]').check();await p.locator('[data-action=check]').click();
   assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);await p.locator('.question-origin summary').click();
   assert.match(await p.locator('.question-origin').textContent(),item.q.provenance.kind==='audio-adapted'?/อิงประเด็นคำถามในเสียง/:/โจทย์ประยุกต์แนวเดียวกัน/);
   assert.match(await p.locator('.question-origin').textContent(),/\d+:\d{2}/);
  }
  await go(p,'#/exam/ca01');
  await p.evaluate(()=>{
   const s=JSON.parse(localStorage.getItem('totobtuan.study.v2')),base=window.DESK.topics.find(t=>t.id==='ca01').questions.filter(q=>q.bank==='original'),old=base[0];
   s.answers[old.id]={response:old.options[old.correct],revealed:true,status:'correct'};
   s.examRuns.ca01={order:base.map(q=>q.id),position:26,options:Object.fromEntries(base.map(q=>[q.id,[0,1,2,3]]))};
   localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));
  });
  await p.reload();assert.equal(await p.locator('.exam-number').count(),27,'an old saved run must remain in the original bank');
  await p.locator('.exam-number[data-key="ca01:0"]').click();assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);
  const item=items[0];await p.evaluate(i=>{const s=JSON.parse(localStorage.getItem('totobtuan.study.v2'));s.training={subject:i.subject,source:i.source,topic:i.topic,keys:[i.key],position:0,phase:'question',selection:null,usedHint:false,results:{}};localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));},item);
  await p.reload();await go(p,'#/train/'+item.source);await p.locator('.coach-round input[value="'+item.q.correct+'"]').check();await p.locator('[data-action=coach-check]').click();assert.equal(await p.locator('.coach-feedback .question-origin').count(),1);
  console.log('PASS new lecture questions in exams/coach, distinct provenance and hidden explanations before attempts');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
