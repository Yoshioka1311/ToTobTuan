/* Rebuild the readable Markdown companions after editing lesson data. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const writeText = (file, text, encoding) => fs.writeFileSync(file, text.trimEnd() + '\n', encoding);
const context = { window: {} };
vm.createContext(context);
for (const file of ['content.js','reference.js']) vm.runInContext(fs.readFileSync(path.join(root,'assets/js',file),'utf8'),context);
const data=context.window.STUDY;
const preamble='เขียนสรุปใหม่เพื่อทบทวนส่วนตัว เลขหน้าอ้างอิงหน้า PDF ไม่ใช่เลขสไลด์ หมายเหตุเพิ่มเติมแยกจากคำอธิบายต้นฉบับ\n';
function topic(t){return `## ${t.title}\n\n${t.intro}\n\nอ้างอิง ${data.sources.find(s=>s.id===t.source).original} หน้า ${t.from}–${t.to}\n\n### หลักที่ควรจำ\n\n${t.takeaways.map(s=>'- '+s).join('\n')}\n\n${t.sections.map(s=>`### ${s.title}\n\n${s.body}\n${s.code?'\n```'+(s.code.startsWith('<')?'html':'js')+'\n'+s.code+'\n```\n':''}`).join('\n')}\n### จุดที่ควรอ่านให้ชัด\n\n${t.pitfall}\n\n### ตัวอย่าง: ${t.example.title}\n\n${t.example.fixture?'HTML เริ่มต้น:\n\n```html\n'+t.example.fixture+'\n```\n\n':''}\`\`\`js\n${t.example.code}\n\`\`\`\n\nผลที่ควรสังเกต:\n\n${t.example.expected}\n\nลองทำ: ${t.example.task}\n\n<details><summary>แนวทางทำโจทย์</summary>\n\n\`\`\`js\n${t.example.solution}\n\`\`\`\n\n</details>\n${t.links?'\nแหล่งตรวจประกอบ:\n\n'+t.links.map(([label,url])=>`- [${label}](${url})`).join('\n'):''}\n\n`;}
fs.mkdirSync(path.join(root,'summaries'),{recursive:true});
for(const source of data.sources.filter(s=>s.id!=='cheat')){
 const text=`# ${source.title} · สรุปภาษาไทย\n\nต้นฉบับ: ${source.original} (${source.pages} หน้า)\n\n${preamble}\n${data.topics.filter(t=>t.source===source.id).map(topic).join('\n---\n\n')}`;
 writeText(path.join(root,source.summary),text,'utf8');
}
const ref=`# JavaScript cheatsheet · สรุปแยกจากบทเรียน\n\nต้นฉบับ js-cheatsheet.pdf 100 หน้า สรุปหมวดความรู้หน้า 5–98 หน้า 99–100 เป็นโฆษณาและไม่ได้ใช้เป็นเนื้อหาเรียน\n\n${preamble}\n${data.reference.map(r=>`## ${r.title}\n\nPDF หน้า ${r.pages}\n\n| คำสั่ง | ความหมายและสิ่งที่ต้องระวัง |\n| --- | --- |\n${r.rows.map(row=>'| '+row.map(s=>s.replaceAll('|','\\|')).join(' | ')+' |').join('\n')}\n\n\`\`\`js\n${r.example}\n\`\`\`\n`).join('\n')}\n## หมายเหตุเพิ่มเติมจากต้นฉบับ\n\n- ใช้ Math.sqrt สำหรับรากที่สอง ไม่ใช่ Math.sinh\n- Math.sign(0) คืน 0 ไม่ใช่ null\n- getModifierState คืน boolean ไม่ใช่ array\n- timeStamp ของ Event โดยทั่วไปอิง time origin ไม่ใช่ Unix epoch เสมอ\n- JSON round-trip ไม่ใช่ deep clone ที่รักษาทุก data type\n- API เก่า เช่น keypress, keyCode และ which ไม่ควรเป็นตัวเลือกเริ่มต้นในโค้ดใหม่\n`;
writeText(path.join(root,'summaries/cheatsheet.md'),ref,'utf8');
writeText(path.join(root,'summaries/all-notes.md'),'# โต๊ะทบทวน · JavaScript\n\n'+preamble+'\nCheatsheet แยกไว้ใน cheatsheet.md\n\n'+data.topics.map(topic).join('\n---\n\n'),'utf8');
console.log('Exported 4 source summaries + combined study notes.');
