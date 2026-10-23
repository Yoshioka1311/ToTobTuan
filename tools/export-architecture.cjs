const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),context={window:{}};vm.createContext(context);
for(const file of ['architecture-a.js','architecture-b.js'])vm.runInContext(fs.readFileSync(path.join(root,'assets/js',file),'utf8'),context);
const out=path.join(root,'summaries/itds211');fs.mkdirSync(out,{recursive:true});
for(const chapter of context.window.ARCH_CHAPTERS){
 const text=[`# ITDS211 · บท ${chapter.number}: ${chapter.title}`,`\n${chapter.english}`,`\nสรุปเรียบเรียงจากเอกสารที่ผู้ใช้ให้ เลขอ้างอิงคือหน้า PDF จากทั้งหมด ${chapter.pages} หน้า ไม่ใช่เลขหน้าหนังสือ โจทย์ในเว็บเขียนขึ้นเพื่อฝึก ไม่ใช่การคาดการณ์ข้อสอบจริง`, '\n## หลักที่ควรจำ',...chapter.takeaways.map(x=>'- '+x),...chapter.sections.flatMap(s=>[`\n## ${s.title}`,`\n${s.body}`,`\nอ้างอิง PDF หน้า ${s.from}${s.to!==s.from?'–'+s.to:''}`])].join('\n')+'\n';
 fs.writeFileSync(path.join(out,`chapter${String(chapter.number).padStart(2,'0')}.md`),text);
}
console.log('Exported eight ITDS211 chapter summaries.');
