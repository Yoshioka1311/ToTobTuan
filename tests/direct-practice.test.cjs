const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function load(){const c={window:{}};vm.createContext(c);const run=name=>vm.runInContext(fs.readFileSync(path.join(root,'assets/js',name+'.js'),'utf8'),c);
 for(const name of ['content','questions','javascript-choices','reference','architecture-a','architecture-b','lecture-practice-a','lecture-practice-b'])run(name);
 const original=JSON.stringify(c.window.ARCH_CHAPTERS),lecture=JSON.stringify(c.window.LECTURE_PRACTICE);
 run('direct-practice');assert.equal(JSON.stringify(c.window.ARCH_CHAPTERS),original);assert.equal(JSON.stringify(c.window.LECTURE_PRACTICE),lecture);run('catalog');return c.window;
}
test('set three adds exactly thirty concise source-backed questions across all eight chapters',()=>{
 const w=load(),qs=w.DIRECT_PRACTICE;assert.equal(qs.length,30);
 assert.equal(new Set(qs.map(q=>q.topic)).size,8);
 const all=w.DESK.items,ids=all.map(i=>i.key);assert.equal(ids.length,new Set(ids).size,'new questions must not reuse saved-answer identities');
 const oldPrompts=new Set([...w.ARCH_CHAPTERS.flatMap(c=>c.questions),...w.LECTURE_PRACTICE].map(q=>q.prompt));
 for(const q of qs){const chapter=w.ARCH_CHAPTERS.find(c=>c.id===q.topic);assert.ok(chapter);assert.ok(!oldPrompts.has(q.prompt),q.id);assert.ok(q.prompt.length<=150,q.id+' should ask one short direct question');assert.equal(q.bank,'direct');assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.correct>=0&&q.correct<4&&Number.isInteger(q.correct));assert.equal(q.optionExplanations.length,4);assert.ok(q.optionExplanations.every(x=>x.length>10));assert.ok(q.explanation);assert.ok(q.from>=1&&q.to>=q.from&&q.to<=chapter.pages);}
 assert.equal(all.filter(i=>i.subject==='itds211'&&i.q.bank==='original').length,252);
 assert.equal(all.filter(i=>i.q.bank==='lecture').length,72);assert.equal(all.filter(i=>i.q.bank==='direct').length,30);
 assert.equal(all.filter(i=>i.subject==='itds241').length,153);
});
