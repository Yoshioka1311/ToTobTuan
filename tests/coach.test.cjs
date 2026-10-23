const assert=require('node:assert/strict');
const {launch,go}=require('./browser-helpers.cjs');
(async()=>{
 const b=await launch();
 try{
  const p=await b.newPage();await go(p,'#/train/l06');await p.locator('#coach-topic').selectOption('variables');await p.locator('#coach-size').selectOption('5');await p.locator('[data-action=start]').click();
  const key=await p.locator('.coach-round').getAttribute('data-question');const q=await p.evaluate(k=>window.DESK.items.find(i=>i.key===k).q,key);
  await p.locator('[data-action=hint]').click();await p.locator('.coach-round input').nth(q.correct).check();await p.locator('[data-action=coach-check]').click();
  const hinted=await p.evaluate(k=>JSON.parse(localStorage.getItem('totobtuan.study.v2')).review[k],key);assert.equal(hinted.rating,'again');assert.equal(hinted.stage,0);
  await go(p,'#/subject/itds211');await go(p,'#/train/ca01');await p.locator('[data-action=start]').click();
  const caKey=await p.locator('.coach-round').getAttribute('data-question');assert.ok(caKey.startsWith('ca01:'));
  await p.locator('[data-action=pause]').click();await go(p,'#/subject/itds241');await go(p,'#/train');assert.equal(await p.locator('.coach-feedback').count(),1);assert.equal(await p.locator('.coach-round').getAttribute('data-question'),key);
  await p.locator('[data-action=next]').click();
  for(let i=1;i<5;i++){await p.locator('[data-action=skip]').click();await p.locator('[data-action=next]').click();}
  assert.match(await p.locator('.coach-summary h1').textContent(),/\/ 5/);
  await go(p,'#/subject/itds211');await go(p,'#/train');assert.equal(await p.locator('.coach-paused').count(),1);await p.reload();await p.locator('[data-action=resume]').click();assert.equal(await p.locator('.coach-round').getAttribute('data-question'),caKey);
  const caQ=await p.evaluate(k=>window.DESK.items.find(i=>i.key===k).q,caKey);await p.locator('.coach-round input').nth(caQ.correct).check();await p.locator('[data-action=coach-check]').click();
  const before=await p.evaluate(k=>JSON.parse(localStorage.getItem('totobtuan.study.v2')).review[k],caKey);assert.equal(before.stage,1);
  await p.reload();const after=await p.evaluate(k=>JSON.parse(localStorage.getItem('totobtuan.study.v2')).review[k],caKey);assert.equal(after.attempts,1);assert.equal(after.dueAt,before.dueAt);
  console.log('PASS five-question rounds, hinted answers, independent subject sessions, paused reload and no duplicate review scheduling');
  await p.evaluate(()=>{
   const s=JSON.parse(localStorage.getItem('totobtuan.study.v2'));s.training=null;s.rounds={};const dueAt=Date.now()+86400000;
   for(const i of window.DESK.items.filter(x=>x.source==='ca01'))s.review[i.key]={stage:1,dueAt,attempts:1,rating:'remembered'};
   localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));
  });
  await p.reload();await p.locator('[data-action=start]').first().click();assert.equal(await p.locator('.coach-round').count(),0);assert.match(await p.locator('.empty-notice').textContent(),/ยังไม่ถึงเวลาทวน/);
  await p.locator('[data-action=start][data-early=true]').click();const earlyKey=await p.locator('.coach-round').getAttribute('data-question');const earlyQ=await p.evaluate(k=>window.DESK.items.find(i=>i.key===k).q,earlyKey);
  await p.locator('.coach-round input').nth(earlyQ.correct).check();await p.locator('[data-action=coach-check]').click();const early=await p.evaluate(k=>JSON.parse(localStorage.getItem('totobtuan.study.v2')).review[k],earlyKey);assert.equal(early.stage,1);assert.equal(early.attempts,2);
  console.log('PASS explicit early practice does not advance review stage');
  const history=await b.newPage();await go(history,'#/subject/itds241');
  await history.locator('#sidebar nav a').filter({hasText:'ฝึกทีละข้อ'}).click();
  await history.locator('[data-action=start]').click();const historyKey=await history.locator('.coach-round').getAttribute('data-question');
  await history.locator('#topbar a[href="#/home"]').click();await history.locator('[data-subject=itds211]').click();
  await history.goBack();await history.goBack();await history.locator('.coach-round').waitFor();
  assert.equal(await history.locator('.coach-round').getAttribute('data-question'),historyKey);
  assert.ok(history.url().endsWith('#/train/itds241'));
  console.log('PASS browser Back keeps the subject of a training link');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
