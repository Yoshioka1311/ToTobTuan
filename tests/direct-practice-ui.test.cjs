const assert=require('node:assert/strict'),path=require('node:path');
const {launch,go,currentQuestion,root}=require('./browser-helpers.cjs');
const order=p=>p.locator('.exam-number').evaluateAll(els=>els.map(e=>e.dataset.key));
(async()=>{const b=await launch();try{
 const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await go(p,'#/exams/itds211');const button=p.locator('.exam-all-card [data-bank=direct]');assert.equal(await button.count(),1);assert.match(await button.textContent(),/ชุด 3/);assert.match(await button.textContent(),/30 ข้อ/);
 await button.click();await p.waitForFunction(()=>document.querySelector('.exam-set-switch [aria-current]')?.dataset.bank==='direct');
 assert.equal(await p.locator('.question').count(),1);assert.equal((await order(p)).length,30);assert.equal(await p.locator('.choice-reasons').count(),0);
 const first=await order(p),q=await currentQuestion(p);await p.locator('.question input[value="'+q.correct+'"]').check();await p.locator('[data-action=check]').click();assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);assert.equal(await p.locator('.choice-reasons').count(),1);
 await p.reload();const second=await order(p);assert.ok(second.every((key,i)=>key!==first[i]));await p.locator('.exam-number[data-key="'+q.id+'"]').click();assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);
 await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('totobtuan.study.v2'));for(const key of ['ca01:0','ca01:27']){const q=window.DESK.items.find(i=>i.key===key).q;s.answers[key]={response:q.options[q.correct],revealed:true,status:'correct'};}localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));});
 await p.reload();await p.locator('[data-action=reset-exam]').click();assert.match(await p.locator('#exam-reset-name').textContent(),/ชุด 3/);await p.locator('[data-action=confirm-exam-reset]').click();assert.equal(await p.locator('.exam-number.answered').count(),0);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));assert.ok(saved.answers['ca01:0']);assert.ok(saved.answers['ca01:27']);
 for(const [bank,count] of [['original',252],['lecture',72],['direct',30]]){await p.locator('.exam-set-switch [data-bank='+bank+']').click();await p.waitForFunction(n=>document.querySelectorAll('.exam-number').length===n,count);assert.equal((await order(p)).length,count);}
 await go(p,'#/exam/ca01/direct');assert.equal((await order(p)).length,4);assert.equal(await p.locator('.exam-set-switch [aria-current]').getAttribute('data-bank'),'direct');
 await go(p,'#/exams/itds241');assert.equal(await p.locator('[data-bank=direct]').count(),0);
 for(const width of [320,390,768]){await p.setViewportSize({width,height:900});for(const route of ['#/exams/itds211','#/practice/itds211/direct']){await go(p,route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+' '+route);}}
 await p.setViewportSize({width:390,height:844});await go(p,'#/practice/itds211/direct');await p.screenshot({path:path.join(root,'.cache/direct-practice-mobile.png'),fullPage:true});assert.deepEqual(errors,[]);
 console.log('PASS third set with 30 questions, distinct banks, saved grades, isolated restart, shuffle and mobile layouts');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
