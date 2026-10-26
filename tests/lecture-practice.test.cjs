const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function data(){
 const c={window:{}};vm.createContext(c);
 for(const name of ['content','questions','reference','javascript-choices','architecture-a','architecture-b'])vm.runInContext(fs.readFileSync(path.join(root,'assets/js',name+'.js'),'utf8'),c);
 const original=JSON.stringify(c.window.ARCH_CHAPTERS);
 for(const name of ['lecture-practice-a','lecture-practice-b']){const file=path.join(root,'assets/js',name+'.js');assert.ok(fs.existsSync(file),'Missing source-grounded lecture practice: '+name);vm.runInContext(fs.readFileSync(file,'utf8'),c);}
 assert.equal(JSON.stringify(c.window.ARCH_CHAPTERS),original,'new practice must not overwrite old questions');
 vm.runInContext(fs.readFileSync(path.join(root,'assets/js/catalog.js'),'utf8'),c);
 return c.window;
}
test('lecture practice appends nine questions per chapter without changing existing identities',()=>{
 const w=data(),bank=w.LECTURE_PRACTICE;assert.equal(bank.length,72);
 for(const base of w.ARCH_CHAPTERS){
  const extra=bank.filter(q=>q.topic===base.id),merged=w.DESK.topics.find(t=>t.id===base.id);
  assert.equal(extra.length,9);assert.equal(merged.questions.length,base.questions.length+9);
  assert.ok(extra.every(q=>Number(q.id.split(':')[1])>=base.questions.length));
  const prompts=new Set(base.questions.map(q=>q.prompt));
  for(const q of extra){
   assert.ok(!prompts.has(q.prompt));prompts.add(q.prompt);
   assert.equal(new Set(q.options).size,4);assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4);
   assert.ok(q.from>=1&&q.to>=q.from&&q.to<=base.pages);assert.ok(q.explanation);
  }
 }
});
test('audio adaptations and new style transfers have distinct traceable evidence',()=>{
 const bank=data().LECTURE_PRACTICE;
 assert.ok(bank.filter(q=>q.provenance.kind==='audio-adapted').length>=8);
 assert.ok(bank.filter(q=>q.provenance.kind==='style-transfer').length>=8);
 for(const q of bank){
  const p=q.provenance;assert.ok(['audio-adapted','style-transfer'].includes(p.kind));
  assert.ok(p.audioFrom>=0&&p.audioTo>p.audioFrom&&p.audioTo<=9249.65,q.id);
  assert.ok(p.anchor&&p.recordingId==='lecture-2026-10-25');assert.ok(['roles','compare','trace','cause','calculate'].includes(p.pattern));
 }
});
test('revised lecture practice asks for understanding and explains each possible choice',()=>{
 const bank=data().LECTURE_PRACTICE;
 for(const q of bank){
  assert.equal(q.revision,2,q.id+' must mark rewritten content for saved-attempt migration');
  assert.ok(['understand','apply','reason'].includes(q.skill),q.id+' needs a thinking objective');
  assert.ok(q.focus&&q.focus.length<100,q.id);
  assert.notEqual(q.provenance.pattern,'calculate',q.id+' should not require arithmetic');
  assert.ok(q.prompt.length<=340,q.id+' prompt should stay concise');
  assert.equal(q.optionExplanations?.length,4,q.id+' all choices need a reason');
  assert.ok(q.optionExplanations.every(x=>typeof x==='string'&&x.length>=12),q.id);
 }
 for(const topic of new Set(bank.map(q=>q.topic))){
  const questions=bank.filter(q=>q.topic===topic);
  for(const level of ['easy','medium','hard'])assert.equal(questions.filter(q=>q.level===level).length,3,topic+' difficulty mix');
  assert.ok(questions.filter(q=>q.skill!=='understand').length>=6,topic+' should go beyond recall');
 }
});
