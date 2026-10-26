const assert=require('node:assert/strict');
const {launch,go,currentQuestion,root}=require('./browser-helpers.cjs');
const path=require('node:path');
(async()=>{const b=await launch();try{
 const p=await b.newPage({viewport:{width:390,height:844}});await go(p,'#/exam/ca01/lecture');
 const q=await currentQuestion(p);assert.equal(await p.locator('.choice-reasons').count(),0,'keep reasoning hidden before an attempt');
 await p.locator('.question input[value="'+((q.correct+1)%4)+'"]').check();await p.locator('[data-action=check]').click();
 const reasons=p.locator('.choice-reasons');assert.equal(await reasons.count(),1);await reasons.locator('summary').click();
 assert.equal(await reasons.locator('li').count(),3);
 for(let i=0;i<4;i++)if(i!==q.correct){assert.ok((await reasons.textContent()).includes(q.options[i]));assert.ok((await reasons.textContent()).includes(q.optionExplanations[i]));}
 await p.reload();await p.locator('.exam-number[data-key="'+q.id+'"]').click();assert.equal(await p.locator('.feedback').count(),1,'new attempts survive refresh');
 await p.locator('.choice-reasons summary').click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.screenshot({path:path.join(root,'.cache/plain-practice-feedback-mobile.png'),fullPage:true});
 await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('totobtuan.study.v2'));delete s.practiceRevisions;s.answers['ca01:27']={response:'old answer',revealed:true};s.answers['ca01:0']={response:'original answer',revealed:true};s.review['ca01:27']={dueAt:100};s.notes.ca01='keep this note';localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));});
 await p.reload();const s=await p.evaluate(()=>JSON.parse(localStorage.getItem('totobtuan.study.v2')));
 assert.equal(s.answers['ca01:27'],undefined);assert.equal(s.answers['ca01:0'].response,'original answer');assert.equal(s.notes.ca01,'keep this note');assert.equal(s.practiceHistory.at(-1).answers['ca01:27'].response,'old answer');
 const item=await p.evaluate(()=>window.DESK.items.find(i=>i.q.revision===2));
 await p.evaluate(i=>{const s=JSON.parse(localStorage.getItem('totobtuan.study.v2'));s.training={subject:i.subject,source:i.source,topic:i.topic,keys:[i.key],position:0,phase:'question',selection:null,usedHint:false,results:{}};localStorage.setItem('totobtuan.study.v2',JSON.stringify(s));},item);
 await p.reload();await go(p,'#/train/'+item.source);assert.equal(await p.locator('.choice-reasons').count(),0);await p.locator('.coach-round input[value="'+item.q.correct+'"]').check();await p.locator('[data-action=coach-check]').click();assert.equal(await p.locator('.coach-feedback .choice-reasons').count(),1);
 console.log('PASS plain quiz feedback after attempting, canonical distractor reasons after shuffle, mobile, saved new answers and archived previous revision');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
