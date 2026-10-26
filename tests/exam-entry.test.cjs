const assert=require('node:assert/strict'),path=require('node:path');
const {launch,go,currentQuestion,root}=require('./browser-helpers.cjs');
const order=p=>p.locator('.exam-number').evaluateAll(els=>els.map(e=>e.dataset.key));
async function switchSet(p,bank){await p.locator('.exam-set-switch [data-bank="'+bank+'"]').click();await p.waitForFunction(b=>document.querySelector('.exam-set-switch [aria-current=page]')?.dataset.bank===b,bank);}
(async()=>{const b=await launch();try{
 const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await go(p,'#/subject/itds211');assert.equal(await p.locator('#sidebar nav a[href^="#/exams/"]').count(),1);assert.equal(await p.locator('#sidebar nav a[href^="#/practice/"]').count(),0);
 assert.equal(await p.locator('.page-head a[href^="#/practice/"]').count(),0);
 await p.locator('.page-head a[href="#/exams/itds211"]').click();await p.locator('.exam-chapter-card').first().waitFor();
 assert.equal(await p.locator('.page-head h1').textContent(),'ข้อสอบ');
 for(const card of await p.locator('.exam-chapter-card').all()){
  assert.match(await card.locator('[data-bank=original]').textContent(),/ชุด 1/);assert.match(await card.locator('[data-bank=lecture]').textContent(),/ชุด 2/);
 }
 assert.equal(await p.locator('.exam-all-card [href="#/practice/itds211"]').count(),1);assert.equal(await p.locator('.exam-all-card [href="#/practice/itds211/lecture"]').count(),1);
 await p.screenshot({path:path.join(root,'.cache/exam-unified-hub-desktop.png'),fullPage:true});
 await p.locator('[data-chapter=ca01] [data-bank=lecture]').focus();await p.keyboard.press('Enter');await p.locator('.exam-set-switch').waitFor();
 assert.equal(await p.locator('.exam-set-switch [aria-current=page]').getAttribute('data-bank'),'lecture');assert.match(await p.locator('.exam-set-switch [aria-current=page]').textContent(),/ชุด 2/);
 const firstOrder=await order(p),q=await currentQuestion(p);await p.locator('.question input[value="'+q.correct+'"]').check();await p.locator('[data-action=check]').click();await p.locator('.exam-number').nth(3).click();
 await switchSet(p,'original');assert.equal((await order(p)).length,27);await switchSet(p,'lecture');assert.deepEqual(await order(p),firstOrder);assert.equal(await p.locator('.exam-number[aria-current]').textContent(),'4');assert.match(await p.locator('#exam-score').textContent(),/ถูก 1/);
 await p.locator('[data-action=reset-exam]').click();assert.match(await p.locator('#exam-reset-name').textContent(),/ชุด 2/);await p.locator('[data-action=cancel-exam-reset]').click();
 // Old route aliases use the same player and set labels.
 await go(p,'#/exam/ca01');const header=await p.locator('.exam-player .page-head').innerHTML();await go(p,'#/practice/ca01');assert.equal(await p.locator('.exam-player .page-head').innerHTML(),header);
 await go(p,'#/practice/itds211/lecture');assert.equal((await order(p)).length,72);await switchSet(p,'original');assert.equal((await order(p)).length,252);
 await go(p,'#/exam/l06');assert.equal(await p.locator('.exam-set-switch a').count(),1);assert.match(await p.locator('.exam-set-switch').textContent(),/ชุด 1/);
 for(const width of [320,390,768]){await p.setViewportSize({width,height:900});for(const route of ['#/exams/itds211','#/exam/ca01/lecture','#/practice/itds211','#/exams/itds241']){await go(p,route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+' '+route);}}
 await p.setViewportSize({width:390,height:844});await go(p,'#/exam/ca01/lecture');await p.locator('[data-action=theme]').click();await p.screenshot({path:path.join(root,'.cache/exam-unified-player-mobile.png'),fullPage:true});
 await go(p,'#/exams/itds211');await p.screenshot({path:path.join(root,'.cache/exam-unified-hub-mobile.png'),fullPage:true});assert.deepEqual(errors,[]);
 console.log('PASS one exam entry, clear numbered sets, shared player, set switching without lost progress, legacy links and responsive layouts');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
