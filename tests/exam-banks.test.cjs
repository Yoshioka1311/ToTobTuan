const assert=require('node:assert/strict');
const {launch,go,currentQuestion,root}=require('./browser-helpers.cjs');
const path=require('node:path');
const order=p=>p.locator('.exam-number').evaluateAll(els=>els.map(e=>e.dataset.key));
(async()=>{
 const b=await launch();try{
  const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await go(p,'#/exams/itds211');
  assert.equal(await p.locator('.exam-bank[data-bank=original]').count(),8);
  assert.equal(await p.locator('.exam-bank[data-bank=lecture]').count(),8);
  const chapters=await p.evaluate(()=>window.DESK.groups.filter(g=>g.subject==='itds211').map(g=>({id:g.id,old:window.DESK.items.filter(i=>i.source===g.id&&i.q.bank==='original').map(i=>i.key),fresh:window.DESK.items.filter(i=>i.source===g.id&&i.q.provenance).map(i=>i.key)})));
  for(const c of chapters){
   await go(p,'#/exam/'+c.id);assert.deepEqual((await order(p)).sort(),c.old.sort());
   await go(p,'#/exam/'+c.id+'/lecture');assert.deepEqual((await order(p)).sort(),c.fresh.sort());
   assert.match(await p.locator('.exam-set-switch [aria-current=page]').textContent(),/แนวคาบทบทวน/);
  }
  await go(p,'#/exam/ca01');const old=await currentQuestion(p),oldOrder=await order(p);
  await p.locator('.question input[value="'+old.correct+'"]').check();await p.locator('[data-action=check]').click();
  await p.locator('.exam-number').nth(4).click();
  await go(p,'#/exam/ca01/lecture');assert.match(await p.locator('#exam-score').textContent(),/ตรวจแล้ว 0/);
  const fresh=await currentQuestion(p),freshOrder=await order(p);
  await p.locator('.question input[value="'+fresh.correct+'"]').check();await p.locator('[data-action=check]').click();
  await p.locator('.exam-number').nth(2).click();
  await go(p,'#/exam/ca01');assert.deepEqual(await order(p),oldOrder);assert.equal(await p.locator('.exam-number[aria-current]').textContent(),'5');assert.match(await p.locator('#exam-score').textContent(),/ถูก 1 \/ ตรวจแล้ว 1/);
  await go(p,'#/exam/ca01/lecture');assert.deepEqual(await order(p),freshOrder);assert.equal(await p.locator('.exam-number[aria-current]').textContent(),'3');
  await p.reload();const shuffled=await order(p);assert.ok(shuffled.every((k,i)=>k!==freshOrder[i]));
  await p.locator('[data-action=reset-exam]').click();await p.locator('[data-action=confirm-exam-reset]').click();assert.match(await p.locator('#exam-score').textContent(),/ตรวจแล้ว 0/);
  await go(p,'#/exam/ca01');await p.locator('.exam-number[data-key="'+old.id+'"]').click();assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);
  // Repair previously mixed runs without deleting answers from either bank.
  await p.evaluate(fresh=>{const s=JSON.parse(localStorage.getItem('totobtuan.study.v2')),qs=window.DESK.topics.find(t=>t.id==='ca01').questions;s.answers[fresh.id]={response:fresh.options[fresh.correct],revealed:true,status:'correct'};s.examRuns.ca01={order:qs.map(q=>q.id),options:Object.fromEntries(qs.map(q=>[q.id,[0,1,2,3]])),position:35};localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));},fresh);
  await p.reload();assert.equal((await order(p)).length,27);assert.equal(await p.locator('.question').count(),1);
  await go(p,'#/exam/ca01/lecture');await p.locator('.exam-number[data-key="'+fresh.id+'"]').click();assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);
  await go(p,'#/practice/itds211');assert.equal((await order(p)).length,252);
  await go(p,'#/practice/itds211/lecture');assert.equal((await order(p)).length,72);
  await go(p,'#/exam/ca01/lecture/question-ca01-27');assert.equal(await p.locator('.question').getAttribute('data-question'),'ca01:27');
  await go(p,'#/exams/itds241');assert.equal(await p.locator('.exam-bank[data-bank=lecture]').count(),0);
  await go(p,'#/exam/l06/lecture');assert.equal(await p.locator('.question').count(),0);assert.match(await p.locator('#main').textContent(),/ยังไม่มี/);
  await go(p,'#/practice/variables/2');assert.equal(await p.locator('.question').getAttribute('data-question'),'variables:3');
  for(const width of [320,768]){await p.setViewportSize({width,height:900});for(const route of ['#/exams/itds211','#/exam/ca01/lecture']){await go(p,route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}}
  await p.screenshot({path:path.join(root,'.cache/exam-banks-mobile.png'),fullPage:true});assert.deepEqual(errors,[]);
  console.log('PASS separate original/lecture banks, chapter coverage, saved answers, isolated resets, shuffle, legacy links and mobile layout');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
