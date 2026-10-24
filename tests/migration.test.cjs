const assert=require('node:assert/strict');
const {launch,go}=require('./browser-helpers.cjs');
(async()=>{
 const b=await launch();
 try{
  const p=await b.newPage();await go(p,'#/practice/l06');
  await p.evaluate(()=>localStorage.setItem('totobtuan.study.v2',JSON.stringify({answers:{'operators:8':{response:'rawName ?? "guest"',revealed:true,status:'self-correct'}},notes:{variables:'my old note'}})));
  await p.reload();
  await p.locator('.exam-number[data-key="operators:8"]').click();
  assert.equal(await p.locator('#question-operators-8 input:checked').count(),0,'free text cannot become a choice without selecting it');
  assert.equal(await p.locator('#question-operators-8 .feedback').count(),0);
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));
  assert.equal(saved.legacyWrittenAnswers['operators:8'].response,'rawName ?? "guest"');assert.equal(saved.notes.variables,'my old note');
  await p.locator('#question-operators-8 input[value="1"]').check();await p.locator('#question-operators-8 [data-action=check]').click();
  const after=await p.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));assert.equal(after.legacyWrittenAnswers['operators:8'].response,'rawName ?? "guest"');assert.equal(after.answers['operators:8'].status,'correct');
  console.log('PASS legacy text matching an option is archived, never graded or overwritten');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
