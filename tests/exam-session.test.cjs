const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function load(){const file=path.join(__dirname,'../assets/js/exam-session.js');assert.ok(fs.existsSync(file),'Exam sessions need an independent shuffle model');const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(file,'utf8'),c);return c.window.ExamSession;}
test('every restart moves every question and choice without losing their identities',()=>{
 const model=load(),items=Array.from({length:27},(_,i)=>({key:'q:'+i,optionCount:4}));
 let run=null,seed=17;const random=()=>((seed=(seed*16807)%2147483647)/2147483647);
 for(let n=0;n<80;n++){
  const before=run?JSON.stringify(run):null,next=model.create(items,run,random);
  assert.equal(new Set(next.order).size,27);assert.deepEqual([...next.order].sort(),items.map(i=>i.key).sort());
  for(const item of items){assert.deepEqual([...next.options[item.key]].sort(),[0,1,2,3]);if(run)assert.ok(next.options[item.key].every((v,i)=>v!==run.options[item.key][i]));}
  if(run){assert.ok(next.order.every((key,i)=>key!==run.order[i]));assert.equal(JSON.stringify(run),before,'do not mutate the saved run');}
  run=next;
 }
});
test('invalid saved order is repaired and the current question is bounded',()=>{
 const model=load(),items=[{key:'a',optionCount:4},{key:'b',optionCount:4}];
 const run=model.create(items,{order:['bad','bad'],options:{a:[0,0,0,0]},position:999},()=>0);
 assert.deepEqual([...run.order].sort(),['a','b']);assert.equal(run.position,1);assert.equal(new Set(run.options.a).size,4);
 const single=model.create([{key:'only',optionCount:1}],null,()=>0);assert.deepEqual([...single.order],['only']);assert.deepEqual([...single.options.only],[0]);
});
