const assert=require('node:assert/strict');
const {launch,go,currentQuestion}=require('./browser-helpers.cjs');
(async()=>{
 const b=await launch();
 try{
  const p=await b.newPage();
  for(const [id,count] of [['l06',54],['l07',36],['es',63]]){
   await go(p,'#/practice/'+id);assert.equal(await p.locator('.question').count(),1);assert.equal(await p.locator('.exam-number').count(),count);assert.equal(await p.locator('textarea').count(),0);
   assert.equal(new Set(await p.locator('.exam-number').evaluateAll(els=>els.map(e=>e.dataset.key))).size,count);
  }
  await go(p,'#/practice/itds211');assert.equal(await p.locator('.exam-number').count(),324);
  console.log('PASS complete exam banks remain available through one-question navigation');
  await go(p,'#/practice/ca01');const q=await currentQuestion(p);
  const card=p.locator('.question');assert.equal(await card.locator('[data-action=check]').isDisabled(),true);
  await card.locator('input[value="'+((q.correct+1)%4)+'"]').check();await card.locator('[data-action=check]').click();assert.match(await card.locator('.feedback').textContent(),/ยังไม่ตรง/);
  await card.locator('input[value="'+q.correct+'"]').check();assert.equal(await card.locator('.feedback').count(),0);
  await p.locator('[data-action=check-all]').click();assert.match(await p.locator('#exam-score').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  await go(p,'#/practice/l06');const jq=await currentQuestion(p);await p.locator('.question input[value="'+jq.correct+'"]').check();await p.locator('[data-action=check-all]').click();
  await go(p,'#/practice/ca01');await p.locator('[data-action=reset-exam]').click();await p.locator('[data-action=cancel-exam-reset]').click();assert.match(await p.locator('#exam-score').textContent(),/ถูก 1/);
  await p.locator('[data-action=reset-exam]').click();await p.locator('[data-action=confirm-exam-reset]').click();assert.match(await p.locator('#exam-score').textContent(),/ถูก 0 \/ ตรวจแล้ว 0/);
  await go(p,'#/practice/l06');assert.match(await p.locator('#exam-score').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  console.log('PASS grading canonical choices after shuffle and reset isolation');
  await go(p,'#/practice/variables/2');assert.equal(await p.locator('.question').getAttribute('data-question'),'variables:3');
  await p.locator('[data-action=exam-next]').click();assert.notEqual(await p.locator('.question').getAttribute('data-question'),'variables:3','deep links must not pin every navigation to the same question');
  await p.evaluate(()=>{
   const s=JSON.parse(localStorage.getItem('totobtuan.study.v2'));s.notes={variables:'old private note'};s.drafts={variables:{code:'old code'}};
   s.answers['variables:2']={response:'old written response',revealed:true,status:'review'};localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));
  });
  await p.reload();await go(p,'#/practice/l06');await p.locator('.exam-number[data-key="variables:2"]').click();
  assert.equal(await p.locator('.question input:checked').count(),0);assert.equal(await p.locator('.question .feedback').count(),0);
  const retained=await p.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));assert.equal(retained.notes.variables,'old private note');assert.equal(retained.drafts.variables.code,'old code');assert.equal(retained.answers['variables:2'].response,'old written response');
  console.log('PASS legacy links and old notes, written responses and drafts');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
