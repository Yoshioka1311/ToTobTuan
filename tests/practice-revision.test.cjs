const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function api(){const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js/practice-revision.js'),'utf8'),c);return c.window.PracticeRevision;}
test('rewritten questions archive earlier attempts without changing original exams or notes',()=>{
 const {migrate}=api(),old={response:'old choice',revealed:true},original={response:'original choice'},review={dueAt:100};
 const round={keys:['ca01:0','ca01:27'],phase:'paused'},jsRound={keys:['variables:0']};
 const s={answers:{'ca01:27':old,'ca01:0':original},review:{'ca01:27':review,'ca01:0':{dueAt:200}},training:round,rounds:{itds241:jsRound},notes:{ca01:'my note'},examRuns:{ca01:{position:4}}};
 assert.equal(migrate(s,[{id:'ca01:27',revision:2}]),true);
 assert.equal(s.answers['ca01:27'],undefined);assert.equal(s.review['ca01:27'],undefined);assert.equal(s.training,null);
 assert.equal(s.answers['ca01:0'],original);assert.equal(s.review['ca01:0'].dueAt,200);assert.equal(s.rounds.itds241,jsRound);
 assert.equal(s.notes.ca01,'my note');assert.equal(s.examRuns.ca01.position,4);
 assert.equal(s.practiceHistory.length,1);assert.equal(s.practiceHistory[0].answers['ca01:27'],old);assert.equal(s.practiceHistory[0].review['ca01:27'],review);assert.equal(s.practiceHistory[0].training,round);
 s.answers['ca01:27']={response:'new choice'};
 assert.equal(migrate(s,[{id:'ca01:27',revision:2}]),false);assert.equal(s.answers['ca01:27'].response,'new choice');assert.equal(s.practiceHistory.length,1);
});
test('fresh question revisions do not erase a round that only uses unchanged questions',()=>{
 const s={answers:{},review:{},training:{keys:['ca01:0']},rounds:{itds211:{keys:['ca02:27']}}};
 api().migrate(s,[{id:'ca01:27',revision:2},{id:'ca02:27',revision:2}]);
 assert.equal(s.training.keys[0],'ca01:0');assert.equal(s.rounds.itds211,undefined);
 assert.equal(s.practiceHistory[0].rounds.itds211.keys[0],'ca02:27');
});
