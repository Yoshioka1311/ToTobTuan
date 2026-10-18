const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js/study-memory.js'),'utf8'),context);
const M=context.window.StudyMemory,now=Date.UTC(2026,9,18,3),day=86400000;
test('due reviews come before mistakes and new items; future reviews wait',()=>{
 const items=[{key:'new:0',source:'l06',topic:'new',level:'easy'},{key:'wrong:0',source:'l06',topic:'wrong',level:'medium'},{key:'due:0',source:'l06',topic:'due',level:'hard'},{key:'later:0',source:'l06',topic:'later',level:'easy'},{key:'other:0',source:'es',topic:'other',level:'easy'}];
 const queue=M.selectRound({items,records:{'due:0':{dueAt:now-1},'later:0':{dueAt:now+day}},answers:{'wrong:0':{status:'incorrect'}},source:'l06',topic:'all',limit:5,now});
 assert.deepEqual(Array.from(queue,x=>x.key),['due:0','wrong:0','new:0']);
});
test('recall schedules start at one day, expand on due retrieval, and do not advance early',()=>{
 const first=M.scheduleReview(null,{rating:'remembered',now});assert.equal(first.stage,1);assert.equal(first.dueAt,now+day);
 const early=M.scheduleReview(first,{rating:'remembered',now:now+1000});assert.equal(early.stage,1);assert.equal(early.dueAt,first.dueAt);
 const next=M.scheduleReview(first,{rating:'remembered',now:first.dueAt});assert.equal(next.stage,2);assert.equal(next.dueAt,first.dueAt+3*day);
 const third=M.scheduleReview(next,{rating:'remembered',now:next.dueAt});assert.equal(third.stage,3);assert.equal(third.dueAt,next.dueAt+7*day);
});
test('hints, skipping or not recalling lead to a short review instead of a remembered result',()=>{
 for(const attempt of [{rating:'again'},{rating:'remembered',usedHint:true},{rating:'remembered',skipped:true}]){
  const result=M.scheduleReview({stage:3,attempts:5},{...attempt,now});assert.equal(result.stage,0);assert.equal(result.rating,'again');assert.equal(result.dueAt,now+600000);assert.equal(result.attempts,6);
 }
});
test('restored sessions only contain known questions and bounded rounds',()=>{
 assert.equal(M.restoreRound({keys:['missing:0'],position:0},['valid:0']),null);
 const round=M.restoreRound({keys:['valid:0'],position:0,source:'l06',topic:'all',phase:'feedback',draft:'hello',usedHint:true},['valid:0']);
 assert.equal(round.keys[0],'valid:0');assert.equal(round.draft,'hello');assert.equal(round.phase,'feedback');
 assert.equal(M.restoreRound({keys:Array(6).fill('valid:0'),position:0},['valid:0']),null);
});
