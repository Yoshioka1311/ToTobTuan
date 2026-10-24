const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
const {chromium}=require(process.env.STUDY_PLAYWRIGHT||path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const base=pathToFileURL(path.resolve(__dirname,'../index.html')).href;
const {go}=require('./browser-helpers.cjs');
const {currentQuestion}=require('./browser-helpers.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const p=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await go(p,'#/home');
  assert.equal(await p.locator('.subject-card').count(),2,'home should choose a subject');
  await p.locator('[data-subject="itds211"]').first().click();
  await p.locator('.chapter-card').first().waitFor();
  assert.equal(await p.locator('.chapter-card').count(),8);
  await go(p,'#/practice/ca01');
  assert.equal(await p.locator('textarea').count(),0);
  assert.equal(await p.locator('.question').count(),1);assert.equal(await p.locator('.exam-number').count(),27);
  const first=p.locator('.question').first();
  assert.equal(await first.locator('input[type=radio]').count(),4);
  await p.locator('.question-size').selectOption('50');
  assert.equal(await first.locator('.question-prompt').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)),50);
  const q=await currentQuestion(p);
  await first.locator('input[type=radio][value="'+q.correct+'"]').check();
  await first.locator('[data-action=check]').click();
  assert.match(await first.locator('.feedback').textContent(),/ถูกต้อง/);
  await p.reload();await p.locator('.exam-number[data-key="'+q.id+'"]').click();assert.match(await p.locator('.question').first().locator('.feedback').textContent(),/ถูกต้อง/);
  await go(p,'#/train/ca01');
  await p.locator('[data-action=start]').click();
  assert.equal(await p.locator('.coach-prompt').count(),1);
  assert.equal(await p.locator('textarea').count(),0);
  await p.locator('.coach-round input[type=radio]').first().check();
  await p.locator('[data-action=pause]').click();await p.reload();
  await p.locator('[data-action=resume]').click();
  assert.equal(await p.locator('.coach-round input:checked').count(),1);
  await p.locator('[data-action=coach-check]').click();
  await p.locator('[data-action=pause]').click();await p.reload();await p.locator('[data-action=resume]').click();
  assert.equal(await p.locator('.coach-feedback').count(),1);
  for(let i=0;i<3;i++){
   if(i){await p.locator('.coach-round input[type=radio]').first().check();await p.locator('[data-action=coach-check]').click();}
   await p.locator('[data-action=next]').click();
  }
  assert.equal(await p.locator('.coach-summary').count(),1);
  await p.reload();assert.equal(await p.locator('.coach-summary').count(),1);
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));
  assert.equal(Object.keys(saved.answers).length,1,'coach must not overwrite exams');
  assert.equal(Object.keys(saved.review).length,3);
  await go(p,'#/subject/itds241');assert.equal(await p.locator('.chapter-card').count(),3);
  await go(p,'#/practice/l06');assert.equal(await p.locator('.question').count(),1);assert.equal(await p.locator('.exam-number').count(),54);
  assert.equal(await p.locator('textarea').count(),0);
  for(const width of [320,390,768]){
   await p.setViewportSize({width,height:900});await go(p,'#/practice/ca01');
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow at '+width);
   await p.screenshot({path:path.resolve(__dirname,'../.cache/subjects-'+width+'.png')});
  }
  assert.deepEqual(errors,[]);
  console.log('PASS subject selection, choice grading, large text, saved answers, pause/resume, separate review and mobile layouts');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
