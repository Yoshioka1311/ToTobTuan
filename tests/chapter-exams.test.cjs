const assert=require('node:assert/strict');
const {launch,go}=require('./browser-helpers.cjs');
(async()=>{
 const b=await launch();
 try{
  const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await go(p,'#/subject/itds211');
  assert.equal(await p.locator('.page-head a[href="#/exams/itds211"]').count(),1,'chapter exams need a separate entry');
  await p.locator('.page-head a[href="#/exams/itds211"]').click();
  assert.equal(await p.locator('.exam-chapter-card').count(),8);
  const chapters=await p.evaluate(()=>window.DESK.groups.filter(g=>g.subject==='itds211').map(g=>({id:g.id,count:window.DESK.topics.filter(t=>t.group===g.id).reduce((n,t)=>n+t.questions.length,0)})));
  for(const c of chapters){
   await go(p,'#/exam/'+c.id);
   assert.equal(await p.locator('.question').count(),c.count,c.id+' must combine every original set');
   const labels=await p.locator('.question-meta').allTextContents();assert.ok(labels.every((s,i)=>s.includes('ข้อ '+(i+1))&&!s.includes('ชุด')));
   assert.equal(await p.locator('#exam-scope option[value=itds211]').count(),0,'chapter mode must stay in one chapter');
   assert.equal(await p.locator('.back-to-exams').getAttribute('href'),'#/exams/itds211');
  }
  await go(p,'#/exam/ca01');
  const q=await p.evaluate(()=>window.DESK.topics.find(t=>t.id==='ca01').questions[0]);
  await p.locator('.question').first().locator('input').nth(q.correct).check();await p.locator('.question').first().locator('[data-action=check]').click();
  await go(p,'#/exams/itds211');assert.match(await p.locator('[data-chapter=ca01]').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  await go(p,'#/practice/ca01');assert.match(await p.locator('#exam-score').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  assert.ok((await p.locator('.question-meta').allTextContents()).every(s=>!s.includes('ชุด')));
  await go(p,'#/exam/ca01');await p.locator('#exam-scope').selectOption('ca02');await p.waitForURL(url=>url.hash==='#/exam/ca02');
  await p.locator('.chapter-next').click();await p.waitForURL(url=>url.hash==='#/exam/ca03');
  await go(p,'#/exams/itds241');assert.equal(await p.locator('.exam-chapter-card').count(),3);
  for(const width of [320,390,768]){
   await p.setViewportSize({width,height:900});
   for(const route of ['#/exams/itds211','#/exam/ca01']){await go(p,route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' at '+width);}
  }
  console.log('PASS separate chapter exam feature, combined sets, continuous numbering, saved progress and mobile navigation');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
