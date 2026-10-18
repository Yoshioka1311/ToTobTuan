/* Simple local review rules. Intervals are product defaults, not a validated model. */
(() => {
 const DAY=86400000;
 function selectRound({items,records={},answers={},source,topic='all',limit=3,now=Date.now(),includeEarly=false}){
  const rank={easy:0,medium:1,hard:2};
  return items.filter(item=>item.source===source&&(topic==='all'||item.topic===topic))
   .filter(item=>!records[item.key]||!Number.isFinite(records[item.key].dueAt)||records[item.key].dueAt<=now||includeEarly)
   .map((item,order)=>{
    const record=records[item.key],due=Number.isFinite(record?.dueAt)&&record.dueAt<=now;
    return {...item,priority:due?0:['incorrect','review'].includes(answers[item.key]?.status)?1:record?3:2,order,dueAt:record?.dueAt||0};
   })
   .sort((a,b)=>a.priority-b.priority||(a.priority===0?a.dueAt-b.dueAt:0)||(rank[a.level]-rank[b.level])||a.order-b.order)
   .slice(0,Math.max(1,Math.min(5,Number(limit)||3)));
 }
 function scheduleReview(previous,{rating,now=Date.now(),usedHint=false,skipped=false}){
  const effective=rating==='remembered'&&!usedHint&&!skipped?'remembered':'again';
  const attempts=(Number(previous?.attempts)||0)+1;
  if(effective==='again')return {stage:0,dueAt:now+600000,lastAt:now,rating:effective,attempts};
  if(Number.isFinite(previous?.dueAt)&&now<previous.dueAt)return {...previous,lastAt:now,rating:effective,attempts};
  const stage=Math.min(3,Math.max(0,Number(previous?.stage)||0)+1);
  return {stage,dueAt:now+[1,3,7][stage-1]*DAY,lastAt:now,rating:effective,attempts};
 }
 function restoreRound(raw,knownKeys){
  if(!raw||!Array.isArray(raw.keys)||raw.keys.length<1||raw.keys.length>5)return null;
  const valid=new Set(knownKeys);
  if(raw.keys.some(k=>!valid.has(k))||new Set(raw.keys).size!==raw.keys.length)return null;
  if(!['l06','l07','es'].includes(raw.source))return null;
  const position=Math.max(0,Math.min(raw.keys.length,Math.floor(Number(raw.position)||0)));
  const phase=position===raw.keys.length?'summary':['recall','feedback','paused','summary'].includes(raw.phase)?raw.phase:'recall';
  const results={};
  if(raw.results&&typeof raw.results==='object')for(const key of raw.keys){if(['again','remembered'].includes(raw.results[key]?.rating))results[key]=raw.results[key];}
  return {keys:[...raw.keys],source:raw.source,topic:typeof raw.topic==='string'?raw.topic:'all',position,phase,resumePhase:raw.resumePhase==='feedback'?'feedback':'recall',draft:typeof raw.draft==='string'?raw.draft:'',usedHint:!!raw.usedHint,showOptions:!!raw.showOptions,skipped:!!raw.skipped,results};
 }
 window.StudyMemory={selectRound,scheduleReview,restoreRound};
})();
