const {spawnSync}=require('node:child_process');
const path=require('node:path');
const cwd=path.resolve(__dirname,'..');
const commands=[['--test','tests/content.test.cjs','tests/study-memory.test.cjs','tests/subjects.test.cjs','tests/exam-session.test.cjs'],...['browser','exams','chapter-exams','exam-player','coach','desk','migration'].map(name=>[`tests/${name}.test.cjs`])];
for(const args of commands){
 const result=spawnSync(process.execPath,args,{cwd,stdio:'inherit'});
 if(result.status!==0){process.exitCode=result.status||1;break;}
}
