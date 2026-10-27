const assert=require('node:assert/strict'),path=require('node:path');
const {launch,go,currentQuestion,root}=require('./browser-helpers.cjs');
(async()=>{const b=await launch();try{
 const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await go(p,'#/exams/itds211');
 const cards=p.locator('.exam-chapter-card');assert.equal(await cards.count(),8);
 for(const card of await cards.all())for(const bank of ['direct','recap'])assert.match(await card.locator('[data-bank='+bank+'] .exam-set-count').textContent(),/^30 ข้อ$/);
 for(const chapter of ['ca01','ca02','ca03','ca04','ca05','ca06','ca07','ca08'])for(const bank of ['direct','recap']){
  await go(p,'#/exam/'+chapter+'/'+bank);assert.equal(await p.locator('.question').count(),1);assert.equal(await p.locator('.exam-number').count(),30);
  const correctScope=await p.locator('.exam-number').evaluateAll((els,{chapter,bank})=>els.every(e=>{const i=window.DESK.items.find(i=>i.key===e.dataset.key);return i.topic===chapter&&i.q.bank===bank;}),{chapter,bank});assert.ok(correctScope,chapter+' '+bank);
 }
 await go(p,'#/exam/ca01/direct');await p.locator('.exam-number[data-key="ca01:36"]').click();const direct=await currentQuestion(p);await p.locator('.question input[value="'+direct.correct+'"]').check();await p.locator('[data-action=check]').click();
 await p.locator('.exam-set-switch [data-bank=recap]').click();await p.waitForFunction(()=>document.querySelector('.exam-set-switch [aria-current]')?.dataset.bank==='recap');const recap=await currentQuestion(p);await p.locator('.question input[value="'+recap.correct+'"]').check();await p.locator('[data-action=check]').click();
 await p.locator('[data-action=reset-exam]').click();assert.match(await p.locator('#exam-reset-name').textContent(),/ชุด 4/);await p.locator('[data-action=confirm-exam-reset]').click();assert.equal(await p.locator('.exam-number.answered').count(),0);
 await p.locator('.exam-set-switch [data-bank=direct]').click();await p.waitForFunction(()=>document.querySelector('.exam-set-switch [aria-current]')?.dataset.bank==='direct');assert.match(await p.locator('#exam-score').textContent(),/ถูก 1/);
 // Previous version had four questions in ca01. Its saved response remains valid as the bank grows.
 await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('totobtuan.study.v2')),keys=['ca01:36','ca01:37','ca01:38','ca01:39'];s.examRuns['ca01:direct']={order:keys,position:3,options:Object.fromEntries(keys.map(k=>[k,[0,1,2,3]]))};localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));});
 await p.reload();assert.equal(await p.locator('.exam-number').count(),30);await p.locator('.exam-number[data-key="'+direct.id+'"]').click();assert.match(await p.locator('.feedback').textContent(),/ถูกต้อง/);
 for(const bank of ['direct','recap']){await go(p,'#/practice/itds211/'+bank);assert.equal(await p.locator('.exam-number').count(),240);}
 for(const width of [320,390,768]){await p.setViewportSize({width,height:900});for(const route of ['#/exams/itds211','#/exam/ca01/direct','#/exam/ca08/recap']){await go(p,route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+' '+route);}}
 await p.setViewportSize({width:390,height:844});await go(p,'#/exam/ca01/recap');await p.locator('[data-action=theme]').click();await p.screenshot({path:path.join(root,'.cache/four-sets-mobile.png'),fullPage:true});assert.deepEqual(errors,[]);
 console.log('PASS every chapter has 30 questions in sets 3/4, independent scores/reset, expanded saved runs, aggregate totals and mobile controls');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
