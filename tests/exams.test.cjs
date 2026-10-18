const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');
const {chromium}=require(process.env.STUDY_PLAYWRIGHT||path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root=path.resolve(__dirname,'..'),base=pathToFileURL(path.join(root,'index.html')).href;
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.STUDY_BROWSER?{executablePath:process.env.STUDY_BROWSER}:{channel:'msedge'})});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const go=async hash=>{await page.goto(base+hash);await page.waitForFunction(h=>document.querySelector('#main')?.dataset.route===h,hash);};
  for(const [group,count,sections] of [['l06',54,6],['l07',36,4],['es',63,7]]){
   await go('#/practice/'+group);
   assert.equal(await page.locator('.question').count(),count,group+' must show every question together');
   assert.equal(await page.locator('.exam-topic').count(),sections);
   assert.equal(await page.locator('.set-tabs').count(),0);
   const ids=await page.locator('.question').evaluateAll(els=>els.map(e=>e.id));
   assert.equal(new Set(ids).size,count,'question anchors must be unique across subtopics');
   const numbers=await page.locator('.question-number').allTextContents();
   assert.deepEqual(numbers,Array.from({length:count},(_,i)=>'QUESTION '+String(i+1).padStart(2,'0')));
  }
  console.log('PASS three complete exams: 54/36/63 questions, unique anchors and continuous numbering');
  await page.evaluate(()=>{
   const q=STUDY.questions.variables[0];
   const data={read:['variables'],bookmarks:[],notes:{variables:'keep my note'},drafts:{},last:'variables',theme:'paper',font:18,answers:{'variables:0':{response:q.answer,revealed:true,status:'correct'},'oop:0':{response:STUDY.questions.oop[0].answer,revealed:true,status:'correct'}}};
   localStorage.setItem('totobtuan.study.v2',JSON.stringify(data));
  });
  await page.reload();await go('#/practice/l06');
  assert.equal(await page.locator('[data-question="variables:0"] input:checked').count(),1);
  assert.match(await page.locator('#practice-count').textContent(),/ตรวจถูก 1\/36/);
  const card=page.locator('[data-question="collections:0"]');
  const correct=await page.evaluate(()=>STUDY.questions.collections[0].options.indexOf(STUDY.questions.collections[0].answer));
  await card.locator('input').nth(correct).check();
  await page.locator('[data-question="control:2"] textarea').fill('ตรวจขอบเขตและใช้ break outer เพื่อหยุดทั้งสองลูป');
  assert.match(await page.locator('#practice-count').textContent(),/ตอบแล้ว 3\/54/,'written drafts update progress immediately');
  await page.locator('[data-action=check-exam]').click();
  assert.match(await card.locator('.feedback').textContent(),/ตอบถูกแล้ว/);
  assert.equal(await page.locator('[data-question="runtime:1"] .feedback').count(),0,'unanswered questions stay unrevealed');
  await page.locator('[data-question="control:2"] [data-score=self-correct]').click();
  assert.match(await page.locator('#practice-count').textContent(),/เข้าใจ 1\/18/);
  await page.reload();
  assert.match(await page.locator('#practice-count').textContent(),/ตอบแล้ว 3\/54/);
  await page.locator('.exam-outline summary').click();
  await page.locator('[data-action=exam-section][data-id=builtins]').click();
  assert.ok(await page.locator('#exam-topic-builtins').evaluate(e=>Math.abs(e.getBoundingClientRect().top)<300));
  assert.equal(await card.locator('input:checked').count(),1);
  console.log('PASS existing saved answers, cross-topic grading, self assessment, reload and jump menu');
  await go('#/practice/variables/2');
  assert.equal(await page.locator('.question').count(),54,'old links still open the complete main-topic exam');
  await go('#/practice/l06/variables/1');
  await page.locator('[data-question="variables:1"] [data-action=question-lab]').click();
  await page.waitForFunction(()=>document.querySelector('.lab'));
  assert.match(await page.locator('.lab-task').textContent(),/ข้อ 11/,'code lab uses the same continuous question number');
  const back=await page.locator('.lab-task a').getAttribute('href');
  assert.equal(back,'#/practice/l06/variables/1');
  await page.locator('.lab-task a').click();
  await page.waitForFunction(()=>document.querySelectorAll('.question').length===54);
  await page.locator('[data-action=retry-exam]').click();
  await page.locator('[data-action=cancel-exam-reset]').click();
  assert.match(await page.locator('#practice-count').textContent(),/ตอบแล้ว 3\/54/);
  await page.locator('[data-action=retry-exam]').click();
  await page.locator('[data-action=confirm-exam-reset]').click();
  assert.match(await page.locator('#practice-count').textContent(),/ตอบแล้ว 0\/54/);
  const remaining=await page.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));
  assert.equal(remaining.answers['oop:0'].status,'correct');
  assert.equal(remaining.notes.variables,'keep my note');
  assert.deepEqual(remaining.read,['variables']);
  console.log('PASS old deep links, return from code lab and confirmed reset limited to one exam');
  for(const width of [320,390,768]){
   await page.setViewportSize({width,height:900});
   for(const group of ['l06','l07','es']){
    await go('#/practice/'+group);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'exam overflow '+width+' '+group);
   }
  }
  await page.setViewportSize({width:1440,height:1000});await go('#/practice/l06');
  fs.mkdirSync(path.join(root,'.cache'),{recursive:true});
  await page.screenshot({path:path.join(root,'.cache/exam-desktop.png')});
  await page.setViewportSize({width:390,height:844});await go('#/practice/es');
  await page.screenshot({path:path.join(root,'.cache/exam-mobile.png')});
  assert.deepEqual(errors,[]);
  console.log('PASS responsive exams at 320/390/768px and no page errors');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
