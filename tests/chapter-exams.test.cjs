const assert=require('node:assert/strict');
const {launch,go,currentQuestion}=require('./browser-helpers.cjs');
(async()=>{
 const b=await launch();
 try{
  const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await go(p,'#/subject/itds211');assert.equal(await p.locator('.page-head a[href="#/exams/itds211"]').count(),1);
  await p.locator('.page-head a[href="#/exams/itds211"]').click();await p.locator('.exam-chapter-card').first().waitFor();assert.equal(await p.locator('.exam-chapter-card').count(),8);
  const chapters=await p.evaluate(()=>window.DESK.groups.filter(g=>g.subject==='itds211').map(g=>({id:g.id,keys:window.DESK.items.filter(i=>i.source===g.id&&i.q.bank==='original').map(i=>i.key)})));
  for(const c of chapters){
   await go(p,'#/exam/'+c.id);assert.equal(await p.locator('.question').count(),1);
   const keys=await p.locator('.exam-number').evaluateAll(els=>els.map(e=>e.dataset.key));assert.deepEqual(keys.sort(),c.keys.sort(),c.id+' must include all original sets');
   assert.ok(!(await p.locator('.question-meta').textContent()).includes('ชุด'));
   assert.equal(await p.locator('.back-to-exams').getAttribute('href'),'#/exams/itds211');
   await p.locator('.exam-number').last().click();assert.equal(await p.locator('.exam-number[aria-current=step]').textContent(),String(c.keys.length));assert.equal(await p.locator('[data-action=exam-next]').isDisabled(),true);
  }
  await go(p,'#/exam/ca01');const q=await currentQuestion(p);
  await p.locator('.question input[value="'+q.correct+'"]').check();await p.locator('.question [data-action=check]').click();
  await go(p,'#/exams/itds211');assert.match(await p.locator('[data-chapter=ca01]').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  await go(p,'#/practice/ca01');assert.match(await p.locator('#exam-score').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  await go(p,'#/exams/itds241');assert.equal(await p.locator('.exam-chapter-card').count(),3);
  for(const width of [320,390,768]){
   await p.setViewportSize({width,height:900});for(const route of ['#/exams/itds211','#/exam/ca01']){await go(p,route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' at '+width);}
  }
  console.log('PASS all chapter banks, numbered boundaries, shared grades and mobile navigation');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
