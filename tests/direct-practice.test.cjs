const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function load(){const c={window:{}};vm.createContext(c);const run=name=>vm.runInContext(fs.readFileSync(path.join(root,'assets/js',name+'.js'),'utf8'),c);
 for(const name of ['content','questions','javascript-choices','reference','architecture-a','architecture-b','lecture-practice-a','lecture-practice-b'])run(name);
 const original=JSON.stringify(c.window.ARCH_CHAPTERS),lecture=JSON.stringify(c.window.LECTURE_PRACTICE);
 run('direct-practice');const seeds=JSON.stringify(c.window.DIRECT_PRACTICE);
 for(const name of ['practice-expansion-a','practice-expansion-b','practice-expansion-c'])run(name);
 assert.equal(JSON.stringify(c.window.DIRECT_PRACTICE.slice(0,30)),seeds,'existing third-set attempts keep the same questions');
 assert.equal(JSON.stringify(c.window.ARCH_CHAPTERS),original);assert.equal(JSON.stringify(c.window.LECTURE_PRACTICE),lecture);run('catalog');return c.window;
}
test('sets three and four each contain thirty concise source-backed questions per chapter',()=>{
 const w=load(),qs=[...w.DIRECT_PRACTICE,...w.FOURTH_PRACTICE];assert.equal(qs.length,480);
 for(const bank of ['direct','recap'])for(const chapter of w.ARCH_CHAPTERS)assert.equal(qs.filter(q=>q.bank===bank&&q.topic===chapter.id).length,30,bank+' '+chapter.id);
 const all=w.DESK.items,ids=all.map(i=>i.key);assert.equal(ids.length,new Set(ids).size,'new questions must not reuse saved-answer identities');
 const normalize=text=>text.replace(/[\s?？.,!]/g,'').toLowerCase();
 const oldPrompts=new Set([...w.ARCH_CHAPTERS.flatMap(c=>c.questions),...w.LECTURE_PRACTICE].map(q=>normalize(q.prompt)));
 const newPrompts=new Set();
 for(const q of qs){const chapter=w.ARCH_CHAPTERS.find(c=>c.id===q.topic);assert.ok(chapter);const normalized=normalize(q.prompt);assert.ok(!oldPrompts.has(normalized),q.id+' duplicates an older question');assert.ok(!newPrompts.has(normalized),q.id+' repeats another new question');newPrompts.add(normalized);assert.ok(q.prompt.length<=180,q.id+' should ask one short direct question');assert.ok(['direct','recap'].includes(q.bank));assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.correct>=0&&q.correct<4&&Number.isInteger(q.correct));assert.equal(q.optionExplanations.length,4);assert.ok(q.optionExplanations.every(x=>x.length>10));assert.ok(q.explanation);assert.ok(q.from>=1&&q.to>=q.from&&q.to<=chapter.pages);}
 assert.equal(all.filter(i=>i.subject==='itds211'&&i.q.bank==='original').length,252);
 assert.equal(all.filter(i=>i.q.bank==='lecture').length,72);assert.equal(all.filter(i=>i.q.bank==='direct').length,240);assert.equal(all.filter(i=>i.q.bank==='recap').length,240);
 assert.equal(all.filter(i=>i.subject==='itds241').length,153);
});
