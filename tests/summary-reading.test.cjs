const assert=require('node:assert/strict'),path=require('node:path');
const {launch,go,currentQuestion,root}=require('./browser-helpers.cjs');
(async()=>{
 const browser=await launch();
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await go(page,'#/exams/itds211');
  await page.screenshot({path:path.join(root,'.cache/summary-before.png')});
  assert.equal(await page.locator('#main a[href="#/summary/itds211"]').count(),1,'exam hub needs a visible summary entry');
  await go(page,'#/exam/ca01/direct');
  const q=await currentQuestion(page);
  await page.locator('.question input[value="'+q.correct+'"]').check();
  const answers=await page.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')).answers);
  await go(page,'#/summary/itds211');
  assert.equal(await page.locator('.summary-chapter').count(),8,'all chapters must be on the same page');
  assert.equal(await page.locator('#main details').count(),0,'reading must not require expanding headings');
  const expected=await page.evaluate(()=>window.DESK.topics.filter(t=>t.subject==='itds211').reduce((n,t)=>n+t.sections.length,0));
  assert.equal(await page.locator('.summary-concept').count(),expected,'keep every existing source-backed section');
  assert.equal(await page.locator('.summary-toc a').count(),8);
  assert.equal(await page.locator('.side-chapters a[href^="#/summary/itds211/"]').count(),8,'chapter sidebar must stay in the reading page');
  const invalidSources=await page.evaluate(()=>Object.entries(window.STUDY_READING_NOTES).flatMap(([id,notes])=>notes.filter(n=>{
   const pages=window.DESK.topics.find(t=>t.id===id).pages;
   return n.from<1||n.to<n.from||n.to>pages||(n.extraFrom&&(n.extraFrom<1||n.extraTo<n.extraFrom||n.extraTo>pages));
  }).map(n=>id+': '+n.title)));
  assert.deepEqual(invalidSources,[],'all supplementary notes must cite valid chapter pages');
  assert.ok(await page.locator('.summary-note').count()>=8,'include the reviewed formula and clarification notes');
  assert.match(await page.locator('#summary-ca05').textContent(),/8255A/);
  assert.match(await page.locator('#summary-ca05').textContent(),/8237A/);
  assert.match(await page.locator('#summary-ca06').textContent(),/N−2/);
  assert.match(await page.locator('#summary-ca03').textContent(),/subnormal/);
  await page.screenshot({path:path.join(root,'.cache/summary-reading-desktop.png')});
  await page.locator('.summary-toc a[href$="/ca05"]').click();
  await page.waitForFunction(()=>Math.abs(document.getElementById('summary-ca05').getBoundingClientRect().top)<100);
  assert.equal(await page.locator('.summary-chapter').count(),8,'jump must not leave the combined page');
  await page.reload();
  await page.waitForFunction(()=>Math.abs(document.getElementById('summary-ca05').getBoundingClientRect().top)<100);
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')).answers),answers,'reading must preserve exam answers');
  await page.emulateMedia({media:'print'});
  assert.equal(await page.locator('.summary-toc').isVisible(),false);
  assert.equal(await page.locator('#summary-ca08 .summary-concept').first().isVisible(),true);
  await page.emulateMedia({media:'screen'});
  for(const width of [320,390,768]){
   await page.setViewportSize({width,height:900});await go(page,'#/summary/itds211');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'summary overflow at '+width);
  }
  await page.setViewportSize({width:390,height:844});
  await page.locator('[data-action=theme]').click();
  await page.screenshot({path:path.join(root,'.cache/summary-reading-mobile.png')});
  await go(page,'#/summary/ca04');assert.equal(await page.locator('.summary-chapter').count(),1);
  await go(page,'#/summary/all');assert.equal(await page.locator('.summary-chapter').count(),8);
  await go(page,'#/subject/itds241');await go(page,'#/summary/all');
  assert.equal(await page.locator('.summary-list details').count(),17,'preserve JavaScript summary behavior');
  assert.deepEqual(errors,[]);
  console.log('PASS continuous eight-chapter summaries, reviewed notes, jumps/reload, print, mobile, and saved quiz answers');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
