const assert=require('node:assert/strict');
const {launch,go}=require('./browser-helpers.cjs');
(async()=>{
 const b=await launch();
 try{
  const p=await b.newPage();
  for(const [id,count,sections] of [['l06',54,6],['l07',36,4],['es',63,7]]){
   await go(p,'#/practice/'+id);assert.equal(await p.locator('.question').count(),count);assert.equal(await p.locator('.exam-topic').count(),sections);assert.equal(await p.locator('textarea').count(),0);
  }
  await go(p,'#/practice/itds211');assert.equal(await p.locator('.exam-topic').count(),8);
  const expected=await p.evaluate(()=>window.DESK.topics.filter(t=>t.subject==='itds211').reduce((n,t)=>n+t.questions.length,0));assert.equal(await p.locator('.question').count(),expected);
  console.log('PASS combined exams for all JavaScript groups and all eight architecture chapters');
  await go(p,'#/practice/ca01');const q=await p.evaluate(()=>window.DESK.topics.find(t=>t.id==='ca01').questions[0]);
  const first=p.locator('.question').first();assert.equal(await first.locator('[data-action=check]').isDisabled(),true);
  await first.locator('input').nth((q.correct+1)%4).check();await first.locator('[data-action=check]').click();assert.match(await first.locator('.feedback').textContent(),/ยังไม่ตรง/);
  await first.locator('input').nth(q.correct).check();assert.equal(await first.locator('.feedback').count(),0);
  await p.locator('[data-action=check-all]').click();assert.match(await p.locator('#exam-score').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  await go(p,'#/practice/l06');const jq=await p.evaluate(()=>window.DESK.topics.find(t=>t.id==='runtime').questions[0]);await p.locator('.question').first().locator('input').nth(jq.correct).check();await p.locator('[data-action=check-all]').click();
  await go(p,'#/practice/ca01');await p.locator('[data-action=reset-exam]').click();await p.locator('[data-action=cancel-exam-reset]').click();assert.match(await p.locator('#exam-score').textContent(),/ถูก 1/);
  await p.locator('[data-action=reset-exam]').click();await p.locator('[data-action=confirm-exam-reset]').click();assert.match(await p.locator('#exam-score').textContent(),/ถูก 0 \/ ตรวจแล้ว 0/);
  await go(p,'#/practice/l06');assert.match(await p.locator('#exam-score').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  console.log('PASS grading only attempted answers, changing a choice, and reset isolated by subject');
  await go(p,'#/practice/variables/2');assert.ok(await p.locator('#question-variables-3').evaluate(e=>Math.abs(e.getBoundingClientRect().top)<60));
  await p.evaluate(()=>{
   const s=JSON.parse(localStorage.getItem('totobtuan.study.v2'));s.notes={variables:'old private note'};s.drafts={variables:{code:'old code'}};
   s.answers['variables:2']={response:'old written response',revealed:true,status:'review'};localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));
  });
  await p.reload();await go(p,'#/practice/l06');assert.equal(await p.locator('#question-variables-2 input:checked').count(),0);assert.equal(await p.locator('#question-variables-2 .feedback').count(),0);
  const retained=await p.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));assert.equal(retained.notes.variables,'old private note');assert.equal(retained.drafts.variables.code,'old code');assert.equal(retained.answers['variables:2'].response,'old written response');
  console.log('PASS legacy question links and preservation of old written answers, notes and drafts');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
