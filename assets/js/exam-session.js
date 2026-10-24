/* Permute identities, never question content or the meaning of a saved answer. */
(() => {
 function validOrder(order,values){return Array.isArray(order)&&order.length===values.length&&new Set(order).size===values.length&&order.every(x=>values.includes(x));}
 function shuffled(values,previous,random){
  const out=[...values],before=validOrder(previous,values)?previous:values;
  for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
  if(out.length>1){
   const fixed=out.map((x,i)=>x===before[i]?i:-1).filter(i=>i>=0);
   if(fixed.length>1){const first=out[fixed[0]];for(let i=0;i<fixed.length-1;i++)out[fixed[i]]=out[fixed[i+1]];out[fixed[fixed.length-1]]=first;}
   else if(fixed.length===1){const i=fixed[0],j=(i+1+Math.floor(random()*(out.length-1)))%out.length;[out[i],out[j]]=[out[j],out[i]];}
  }
  return out;
 }
 function create(items,previous,random=Math.random){
  const keys=items.map(i=>i.key),options={};
  for(const item of items)options[item.key]=shuffled(Array.from({length:item.optionCount},(_,i)=>i),previous?.options?.[item.key],random);
  const position=Math.max(0,Math.min(keys.length-1,Math.trunc(Number(previous?.position)||0)));
  return {order:shuffled(keys,previous?.order,random),options,position};
 }
 window.ExamSession={create};
})();
