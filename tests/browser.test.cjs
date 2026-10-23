const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {launch,go,root}=require('./browser-helpers.cjs');
(async()=>{
 const b=await launch();
 try{
  const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[],remote=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/^https?:/.test(r.url()))remote.push(r.url());});
  await go(p,'#/home');const topics=await p.evaluate(()=>window.DESK.topics.map(t=>({id:t.id,sections:t.sections.length})));
  assert.equal(topics.length,25);
  for(const t of topics){
   await go(p,'#/lesson/'+t.id+'/short');assert.ok(await p.locator('.takeaways li').count()>=3,t.id);
   assert.equal(await p.locator('.concept-list details').count(),t.sections);
   assert.equal(await p.locator('textarea').count(),0);
   await go(p,'#/lesson/'+t.id+'/read');assert.equal(await p.locator('.reading-section').count(),t.sections);
  }
  console.log('PASS all 25 lessons, short summaries and full explanations');
  await go(p,'#/subject/itds211');await go(p,'#/library');assert.equal(await p.locator('.document-list article').count(),8);
  const sources=await p.locator('.document-list a').evaluateAll(els=>els.map(e=>e.getAttribute('href')));
  for(const file of sources)assert.ok(fs.existsSync(path.join(root,file)),file);
  await go(p,'#/subject/itds241');await go(p,'#/library');assert.equal(await p.locator('.document-list article').count(),4);
  await go(p,'#/reference');assert.equal(await p.locator('.reference-list details').count(),12);
  await p.locator('.reference-list details').first().locator('summary').click();assert.ok(await p.locator('.reference-list table').first().isVisible());
  console.log('PASS 12 source PDFs and summaries, separate cheatsheet');
  await go(p,'#/lesson/ca01');await p.locator('[data-action=bookmark]').click();await p.locator('[data-action=read]').click();await p.reload();
  assert.equal(await p.locator('[data-action=bookmark]').getAttribute('aria-pressed'),'true');assert.equal(await p.locator('[data-action=read]').getAttribute('aria-pressed'),'true');
  await p.locator('[data-action=theme]').click();await p.reload();assert.equal(await p.locator('body').getAttribute('data-theme'),'night');
  await p.locator('[data-action=search]').click();await p.locator('#search-input').fill('cache');
  const hrefs=await p.locator('.search-result').evaluateAll(els=>els.map(e=>e.getAttribute('href')));
  assert.ok(hrefs.length);assert.ok(hrefs.every(h=>h.includes('/ca')),'search must stay in architecture');
  await p.keyboard.press('Escape');await go(p,'#/subject/itds241');await p.keyboard.press('Control+k');await p.locator('#search-input').fill('closure');
  assert.ok(await p.locator('.search-result').count()>0);assert.ok((await p.locator('.search-result').evaluateAll(els=>els.map(e=>e.getAttribute('href')))).every(h=>!h.includes('/ca')));
  await p.keyboard.press('Escape');
  console.log('PASS saved reading/bookmarks/theme and subject-scoped keyboard search');
  for(const width of [320,390,768]){
   await p.setViewportSize({width,height:900});
   for(const route of ['#/home','#/subject/itds211','#/lesson/ca03/read','#/summary/ca04','#/library','#/reference','#/train/ca01']){
    await go(p,route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+' '+route);
   }
  }
  await p.setViewportSize({width:390,height:844});await go(p,'#/home');await p.screenshot({path:path.join(root,'.cache/home-mobile.png'),fullPage:true});
  await p.locator('[data-action=menu]').click();assert.ok(await p.locator('body').evaluate(e=>e.classList.contains('nav-open')));await p.keyboard.press('Escape');
  await go(p,'#/subject/itds211');await p.screenshot({path:path.join(root,'.cache/architecture-mobile.png'),fullPage:true});
  await p.setViewportSize({width:1440,height:1000});await go(p,'#/home');await p.screenshot({path:path.join(root,'.cache/home-desktop.png'),fullPage:true});
  assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);
  console.log('PASS responsive pages, keyboard menu, zero page errors or external requests');
  const blocked=await b.newContext();await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw Error('blocked');}}));
  const bp=await blocked.newPage();await go(bp,'#/lesson/ca01');await bp.locator('[data-action=read]').click();assert.equal(await bp.locator('[data-action=read]').getAttribute('aria-pressed'),'true');
  await go(bp,'#/train/ca01');await bp.locator('[data-action=start]').click();await bp.locator('.coach-round input[type=radio]').first().check();await bp.locator('[data-action=coach-check]').click();assert.equal(await bp.locator('.coach-feedback').count(),1);
  await blocked.close();console.log('PASS blocked storage still permits reading and choice practice');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
