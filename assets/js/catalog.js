/* Shared view of the two curricula. Original JavaScript question keys stay stable. */
(() => {
 const js=window.STUDY;
 const architecture=[...(window.ARCH_CHAPTERS||[])].sort((a,b)=>a.number-b.number).map(chapter=>({...chapter,questions:[...chapter.questions,...(window.LECTURE_PRACTICE||[]).filter(q=>q.topic===chapter.id),...(window.DIRECT_PRACTICE||[]).filter(q=>q.topic===chapter.id),...(window.FOURTH_PRACTICE||[]).filter(q=>q.topic===chapter.id)]}));
 const subjects=[
  {id:'itds211',code:'ITDS211',title:'Computer Architecture',thai:'สถาปัตยกรรมคอมพิวเตอร์',mark:'01',description:'CPU · RISC-V · Memory · I/O · Parallelism'},
  {id:'itds241',code:'ITDS241',title:'JavaScript',thai:'เทคโนโลยีเว็บ',mark:'02',description:'พื้นฐานภาษา · DOM · ECMAScript'}
 ];
 const groups=[
  ...architecture.map(c=>({id:c.id,subject:'itds211',title:`บท ${String(c.number).padStart(2,'0')} · ${c.title}`,short:c.title,pdf:c.pdf,pages:c.pages,summary:`summaries/itds211/chapter${String(c.number).padStart(2,'0')}.md`})),
  ...js.sources.filter(s=>s.id!=='cheat').map(s=>({id:s.id,subject:'itds241',title:s.title,short:s.title,pdf:s.file,pages:s.pages,summary:s.summary}))
 ];
 const topics=[
  ...architecture.map(c=>({...c,subject:'itds211',group:c.id,from:1,to:c.pages,questions:c.questions.map(q=>({...q,bank:q.bank||(q.provenance?'lecture':'original'),answer:q.options[q.correct]}))})),
  ...js.topics.map(t=>({...t,subject:'itds241',group:t.source,pdf:js.sources.find(s=>s.id===t.source).file,pages:js.sources.find(s=>s.id===t.source).pages,questions:js.questions[t.id].map((q,i)=>({...q,id:t.id+':'+i,correct:q.options?.indexOf(q.answer),from:t.from,to:t.to,set:Math.floor(i/3)+1}))}))
 ];
 const items=topics.flatMap(t=>t.questions.map(q=>({key:q.id,source:t.group,topic:t.id,subject:t.subject,level:q.level,q,t})));
 window.DESK={subjects,groups,topics,items,convertedKeys:js.convertedQuestionKeys||[],reference:js.reference,cheatsheet:js.sources.find(s=>s.id==='cheat')};
})();
