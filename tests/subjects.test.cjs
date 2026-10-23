const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function load(){
 const context={window:{}};vm.createContext(context);
 for(const name of ['content.js','questions.js','reference.js','javascript-choices.js','architecture-a.js','architecture-b.js','catalog.js']){
  const file=path.join(root,'assets/js',name);
  assert.ok(fs.existsSync(file),'Subject catalog requires '+name);
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:name});
 }
 return context.window.DESK;
}
test('subjects expose independent source-backed chapter and question collections',()=>{
 const data=load();
 assert.equal(data.subjects.length,2);
 assert.equal(data.topics.filter(t=>t.subject==='itds241').length,17);
 const arch=data.topics.filter(t=>t.subject==='itds211');
 assert.equal(arch.length,8);
 assert.equal(arch.reduce((n,t)=>n+t.pages,0),510);
 for(const topic of arch){
  assert.ok(fs.existsSync(path.join(root,topic.pdf)),topic.pdf);
  assert.ok(topic.sections.length>=8,topic.id+' needs more than a title summary');
  assert.ok(topic.questions.length>=27,topic.id);
  for(const part of [...topic.sections,...topic.questions]){
   assert.ok(part.from>=1&&part.to>=part.from&&part.to<=topic.pages,topic.id+' PDF range');
  }
 }
});
test('every exam item has four unique choices and exactly one usable answer',()=>{
 const data=load(),keys=new Set();
 for(const t of data.topics)for(const q of t.questions){
  assert.ok(!keys.has(q.id),q.id);keys.add(q.id);
  assert.equal(q.options.length,4,q.id);
  assert.equal(new Set(q.options).size,4,q.id);
  assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4,q.id);
  assert.ok(q.explanation&&q.prompt,q.id);
 }
 const js=data.topics.filter(t=>t.subject==='itds241');
 assert.equal(js.reduce((n,t)=>n+t.questions.length,0),153);
 assert.equal(js.find(t=>t.id==='variables').questions[0].id,'variables:0');
});
test('new architecture questions vary their correct position and include three levels in each set',()=>{
 const data=load();
 for(const t of data.topics.filter(t=>t.subject==='itds211')){
  assert.ok(new Set(t.questions.map(q=>q.correct)).size>=3,t.id);
  for(const set of [1,2,3])assert.equal(new Set(t.questions.filter(q=>q.set===set).map(q=>q.level)).size,3,t.id+' set '+set);
 }
});
