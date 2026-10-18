const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
const {chromium}=require(process.env.STUDY_PLAYWRIGHT||path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const base=pathToFileURL(path.resolve(__dirname,'../index.html')).href;
(async()=>{
 const b=await chromium.launch({headless:true,channel:'msedge'});
 try{
  const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'#/practice/l06');
  const prompt=p.locator('.question h3').first();
  assert.ok(await prompt.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))>=32,'questions should be large by default');
  await p.locator('.question-size').selectOption('42');
  await p.reload();assert.equal(await prompt.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)),42);
  await p.goto(base+'#/train');await p.locator('#coach-source').selectOption('l06');await p.locator('#coach-topic').selectOption('variables');
  await p.locator('[data-action=coach-start]').click();
  assert.equal(await p.locator('.coach-prompt').count(),1);
  assert.equal(await p.locator('.coach-feedback').count(),0);
  assert.equal(await p.locator('[data-action=coach-reveal]').isDisabled(),true);
  assert.equal(await p.locator('#sidebar').isVisible(),false);
  assert.ok(await p.locator('.coach-prompt').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))>=42);
  await p.locator('#coach-answer').fill('ใช้ let เพราะต้องเปลี่ยนค่าได้');
  await p.locator('[data-action=coach-pause]').click();
  await p.reload();assert.match(await p.locator('.coach-paused').textContent(),/พัก/);
  await p.locator('[data-action=coach-resume]').click();assert.match(await p.locator('#coach-answer').inputValue(),/let/);
  await p.locator('[data-action=coach-reveal]').click();
  assert.match(await p.locator('.coach-feedback').textContent(),/let/);
  await p.locator('[data-action=coach-rate][data-rating=remembered]').click();
  await p.locator('[data-action=coach-hint]').click();
  await p.locator('#coach-answer').fill('ลองคิดแล้วแต่ใช้คำใบ้');
  await p.locator('[data-action=coach-reveal]').click();
  assert.equal(await p.locator('[data-rating=remembered]').isDisabled(),true);
  await p.locator('[data-rating=again]').click();
  await p.locator('[data-action=coach-skip]').click();
  await p.locator('[data-rating=again]').click();
  assert.match(await p.locator('.coach-summary').textContent(),/ครบ 3 ข้อ/);
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));
  assert.equal(Object.keys(saved.review).length,3);
  assert.equal(Object.values(saved.review).filter(r=>r.rating==='again').length,2);
  assert.equal(Object.keys(saved.answers).length,0,'recall self assessment must not overwrite exam grades');
  await p.reload();assert.match(await p.locator('.coach-summary').textContent(),/ครบ 3 ข้อ/);
  await p.locator('[data-action=coach-finish]').click();
  assert.equal(await p.locator('#coach-source').count(),1);
  for(const w of [320,390,768]){
   await p.setViewportSize({width:w,height:900});
   await p.locator('#coach-source').selectOption('l06');
   await p.locator('#coach-topic').selectOption('operators');
   await p.locator('[data-action=coach-start]').click();
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await p.screenshot({path:path.resolve(__dirname,'../.cache/coach-'+w+'.png')});
   await p.locator('[data-action=coach-skip]').click();await p.locator('[data-rating=again]').click();
   await p.locator('[data-action=coach-skip]').click();await p.locator('[data-rating=again]').click();
   await p.locator('[data-action=coach-skip]').click();await p.locator('[data-rating=again]').click();
   await p.locator('[data-action=coach-finish]').click();
  }
  assert.deepEqual(errors,[]);
  console.log('PASS large questions, recall-first flow, pause/reload, hints, review scheduling, separate progress and mobile layouts');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exit(1);});
