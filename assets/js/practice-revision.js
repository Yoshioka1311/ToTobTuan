/* Revised questions need a fresh attempt; retain previous work in local backups. */
(() => {
 function migrate(state,questions){
  const revisions=state.practiceRevisions&&typeof state.practiceRevisions==='object'&&!Array.isArray(state.practiceRevisions)?state.practiceRevisions:{};
  const changed=new Set(questions.filter(q=>(q.revision||1)>(Number(revisions[q.id])||1)).map(q=>q.id));
  if(!changed.size)return false;
  const history={revisions:{},answers:{},review:{},rounds:{}};
  for(const q of questions)if(changed.has(q.id)){
   history.revisions[q.id]=Number(revisions[q.id])||1;
   for(const field of ['answers','review'])if(state[field]?.[q.id]){history[field][q.id]=state[field][q.id];delete state[field][q.id];}
   revisions[q.id]=q.revision;
  }
  const affected=round=>Array.isArray(round?.keys)&&round.keys.some(key=>changed.has(key));
  if(affected(state.training)){history.training=state.training;state.training=null;}
  for(const [id,round] of Object.entries(state.rounds||{}))if(affected(round)){history.rounds[id]=round;delete state.rounds[id];}
  if(history.training||['answers','review','rounds'].some(field=>Object.keys(history[field]).length)){
   state.practiceHistory=Array.isArray(state.practiceHistory)?state.practiceHistory:[];
   state.practiceHistory.push(history);
  }
  state.practiceRevisions=revisions;
  return true;
 }
 window.PracticeRevision={migrate};
})();
