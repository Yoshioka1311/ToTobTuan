const assert=require('node:assert/strict'),path=require('node:path');
const {launch,go,root}=require('./browser-helpers.cjs');
const order=p=>p.locator('.exam-number').evaluateAll(els=>els.map(e=>e.dataset.key));
(async()=>{
 const b=await launch();
 try{
  const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await go(p,'#/exam/ca01');
  assert.equal(await p.locator('.question').count(),1,'only the current question should be on screen');
  assert.equal(await p.locator('.exam-number').count(),27);assert.equal(await p.locator('.exam-number[aria-current=step]').textContent(),'1');
  assert.equal(await p.locator('#exam-scope').count(),0);
  const initial=await order(p);assert.equal(new Set(initial).size,27);
  await p.locator('.exam-number').nth(6).click();assert.equal(await p.locator('.question').getAttribute('data-question'),initial[6]);
  assert.equal(await p.locator('.exam-number[aria-current=step]').textContent(),'7');
  const key=initial[6],q=await p.evaluate(k=>window.DESK.items.find(i=>i.key===k).q,key);
  const optionOrder=await p.locator('.question input').evaluateAll(els=>els.map(e=>Number(e.value)));
  await p.locator('.question input[value="'+q.correct+'"]').check();await p.locator('[data-action=check]').click();assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);
  await p.locator('.exam-number').first().click();await p.locator('.exam-number').nth(6).click();assert.equal(await p.locator('.question input:checked').getAttribute('value'),String(q.correct));
  await p.locator('[data-action=theme]').click();assert.deepEqual(await order(p),initial,'theme cannot reshuffle a running exam');
  await p.reload();const refreshed=await order(p);assert.ok(refreshed.every((v,i)=>v!==initial[i]),'refresh must move every question');
  await p.locator('.exam-number').nth(refreshed.indexOf(key)).click();assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);
  const nextOptions=await p.locator('.question input').evaluateAll(els=>els.map(e=>Number(e.value)));assert.ok(nextOptions.every((v,i)=>v!==optionOrder[i]));
  assert.equal(await p.locator('.question input:checked').getAttribute('value'),String(q.correct),'saved answer stays with the same choice');
  await p.locator('[data-action=exam-next]').click();assert.equal(await p.locator('.exam-number[aria-current=step]').count(),1);
  await p.locator('[data-action=reset-exam]').click();await p.locator('[data-action=confirm-exam-reset]').click();const restarted=await order(p);assert.ok(restarted.every((v,i)=>v!==refreshed[i]));assert.equal(await p.locator('.exam-number[aria-current=step]').textContent(),'1');
  assert.equal(await p.locator('.exam-number.answered').count(),0);assert.match(await p.locator('#exam-score').textContent(),/ตรวจแล้ว 0/);
  await go(p,'#/practice/itds211');assert.equal(await p.locator('.question').count(),1);assert.equal(await p.locator('.exam-number').count(),252);
  await go(p,'#/exam/ca01');await p.locator('.question-size').selectOption('50');
  for(const width of [320,390,768]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);}
  await p.setViewportSize({width:320,height:844});await p.locator('.exam-number').last().click();
  const visible=await p.evaluate(()=>{const b=document.querySelector('.exam-number[aria-current]')?.getBoundingClientRect(),g=document.querySelector('#exam-number-grid')?.getBoundingClientRect();return b.top>=g.top-1&&b.bottom<=g.bottom+1;});assert.ok(visible,'current number must be visible inside its scrolling map');
  const lastQ=await p.evaluate(()=>{const key=document.querySelector('.question').dataset.question;return window.DESK.items.find(i=>i.key===key).q;});
  const radio=p.locator('.question input[value="'+lastQ.correct+'"]');await radio.scrollIntoViewIfNeeded();const beforeChoice=await p.evaluate(()=>scrollY);await radio.check();const afterChoice=await p.evaluate(()=>scrollY);assert.ok(Math.abs(afterChoice-beforeChoice)<5,'selecting an answer must not scroll the page back to the number map');
  await p.setViewportSize({width:390,height:844});await p.screenshot({path:path.join(root,'.cache/exam-player-mobile.png'),fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS single-question exam, numbered navigation, refresh/restart shuffle, option identity, saved grading and mobile layouts');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
