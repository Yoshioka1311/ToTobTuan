(() => {
'use strict';
const D=window.STUDY, topics=D.topics, KEY='totobtuan.study.v2';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const paths={home:'M3 10 12 3l9 7v10H3z M9 20v-7h6v7',book:'M3 4h6q3 0 3 3v14q-2-3-5-3H3z M21 4h-6q-3 0-3 3v14q2-3 5-3h4z',list:'M8 5h13M8 12h13M8 19h13M3 5h.1M3 12h.1M3 19h.1',pen:'m14 4 6 6M4 20l4-1L21 6l-3-3L5 16z',code:'m8 5-6 7 6 7m8-14 6 7-6 7m-3-17-3 20',file:'M5 2h9l5 5v15H5z M14 2v6h5M8 13h8M8 17h6',search:'M20 20l-5-5 M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',arrow:'M4 12h16m-6-6 6 6-6 6',bookmark:'M6 3h12v18l-6-4-6 4z',check:'m5 12 4 4L19 6',sun:'M12 3v-2m0 22v-2M3 12H1m22 0h-2M5 5 3 3m18 18-2-2M5 19l-2 2M21 3l-2 2 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',moon:'M21 14A9 9 0 0 1 10 3a9 9 0 1 0 11 11',focus:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',menu:'M4 6h16M4 12h16M4 18h16',download:'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4',print:'M6 8V3h12v5M6 17H3V8h18v9h-3M6 14h12v8H6z',clock:'M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',chevron:'m9 5 7 7-7 7',play:'m7 4 14 8-14 8z',stop:'M5 5h14v14H5z'};
const icon=n=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[n]||paths.book}"/></svg>`;
const blank=()=>({read:[],bookmarks:[],answers:{},notes:{},drafts:{},last:'runtime',theme:'paper',font:18});
let state=blank(), storageOK=true, refQuery='', pendingLab=null, currentTopic=null, routeKind='home', currentExamSource=null, pendingExamReset=null, toastTimer;
try{
 const saved=JSON.parse(localStorage.getItem(KEY)||'null');
 if(saved&&typeof saved==='object'){
  for(const k of ['read','bookmarks'])if(Array.isArray(saved[k]))state[k]=saved[k].filter(id=>topics.some(t=>t.id===id));
  for(const k of ['answers','notes','drafts'])if(saved[k]&&typeof saved[k]==='object'&&!Array.isArray(saved[k]))state[k]=saved[k];
  if(topics.some(t=>t.id===saved.last))state.last=saved.last;
  if(saved.theme==='night')state.theme='night';
  if(Number.isFinite(saved.font))state.font=Math.max(16,Math.min(24,saved.font));
 }
}catch{storageOK=false;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;toast('เบราว์เซอร์บล็อกการบันทึก ข้อมูลรอบนี้จะอยู่จนปิดหน้า');}}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3200);}
function settings(){document.body.dataset.theme=state.theme;document.documentElement.style.setProperty('--reading-size',state.font+'px');}
const source=t=>D.sources.find(s=>s.id===t.source);
const index=t=>topics.findIndex(x=>x.id===t.id)+1;
const url=(t,tab='read')=>`#/lesson/${typeof t==='string'?t:t.id}/${tab}`;
const practiceURL=(t,i)=>`#/practice/${t.source}/${t.id}${Number.isInteger(i)?'/'+i:''}`;
const examNumber=(t,i)=>topics.filter(x=>x.source===t.source).slice(0,topics.filter(x=>x.source===t.source).findIndex(x=>x.id===t.id)).reduce((n,x)=>n+D.questions[x.id].length,0)+i+1;
const pdf=t=>`${source(t).file}#page=${t.from}`;
const external=(href,label,cls='text-link')=>`<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`;
const code=s=>`<pre class="code-block"><code>${esc(s)}</code></pre>`;
const empty=(title,desc)=>`<div class="empty-state"><h2>${title}</h2><p>${desc}</p></div>`;
const heading=(tag,title,desc)=>`<div class="page-heading"><div class="eyebrow">${tag}</div><h1>${title}</h1><p>${desc}</p></div>`;
function shell(){
 const nav=[['home','home','ห้องอ่าน',''],['summary','list','สรุปก่อนสอบ','17'],['practice','pen','แบบฝึกหัด','153'],['reference','code','Cheatsheet',''],['library','file','เอกสารต้นฉบับ','4']];
 const groups=[['l06','01 / JavaScript พื้นฐาน'],['l07','02 / Functions, OOP & DOM'],['es','03 / ECMAScript']];
 const opens=[...document.querySelectorAll('.chapter-group[open]')].map(e=>e.dataset.group);
 $('#sidebar').innerHTML=`<a href="#/home" class="brand"><img src="assets/favicon.svg" alt="" width="35" height="35"><span><strong>โต๊ะทบทวน</strong><small>THE STUDY DESK</small></span></a><div class="side-scroll"><nav class="main-nav">${nav.map(([k,i,label,n])=>`<a class="nav-link ${routeKind===k?'active':''}" href="#/${k}" ${routeKind===k?'aria-current="page"':''}>${icon(i)}${label}${n?`<span class="nav-count">${n}</span>`:''}</a>`).join('')}</nav><span class="side-label">บทเรียนของคุณ</span>${groups.map(([k,label],i)=>`<details class="chapter-group" data-group="${k}" ${(currentTopic?.source===k||opens.includes(k)||(!currentTopic&&!opens.length&&i===0))?'open':''}><summary>${label}</summary>${topics.filter(t=>t.source===k).map(t=>`<a href="${url(t)}" class="${currentTopic?.id===t.id?'active':''}" ${currentTopic?.id===t.id?'aria-current="page"':''}><span class="num">${pad(index(t))}</span><span>${esc(t.title)}</span>${state.read.includes(t.id)?'<span class="done-dot" aria-label="อ่านแล้ว">✓</span>':''}</a>`).join('')}</details>`).join('')}</div><div class="side-bottom"><span class="storage-label"><span class="status-dot"></span>${storageOK?'บันทึกในเครื่องนี้':'บันทึกชั่วคราวในรอบนี้'}</span><progress max="17" value="${state.read.length}" aria-label="ความคืบหน้าบทเรียน"></progress><span>อ่านแล้ว ${state.read.length} / 17 หัวข้อ</span><div class="mobile-font-tools"><span>ขนาดข้อความบทเรียน</span><button class="icon-button" data-action="font-down" aria-label="ลดขนาดตัวอักษร">A−</button><button class="icon-button" data-action="font-up" aria-label="เพิ่มขนาดตัวอักษร">A+</button></div></div>`;
 const labels={home:'ห้องอ่าน',summary:'สรุปก่อนสอบ',practice:'แบบฝึกหัด',reference:'Cheatsheet',library:'เอกสารต้นฉบับ',lesson:source(currentTopic||topics[0]).title,topics:'บทเรียนทั้งหมด'};
 const focus=document.body.classList.contains('focus-mode');
 $('#topbar').innerHTML=`<div class="breadcrumb"><button class="icon-button mobile-menu" data-action="menu" aria-label="เปิดสารบัญ" aria-expanded="${document.body.classList.contains('nav-open')}">${icon('menu')}</button><span class="crumb-home">โต๊ะทบทวน</span><span class="divider">/</span><b>${labels[routeKind]||'ห้องอ่าน'}</b></div><div class="top-actions"><button class="search-trigger" data-action="search" aria-label="ค้นหาบทเรียน">${icon('search')}<span>ค้นหาเรื่องที่อยากทบทวน</span><kbd class="key">Ctrl K</kbd></button><button class="icon-button font-tools" data-action="font-down" aria-label="ลดขนาดตัวอักษร">A−</button><button class="icon-button font-tools" data-action="font-up" aria-label="เพิ่มขนาดตัวอักษร">A+</button><span class="tool-divider"></span><button class="icon-button" data-action="theme" aria-label="${state.theme==='night'?'ใช้พื้นสีกระดาษ':'ใช้โหมดกลางคืน'}">${icon(state.theme==='night'?'sun':'moon')}</button><button class="icon-button" data-action="focus" aria-pressed="${focus}" aria-label="${focus?'ออกจากโหมดโฟกัส':'เปิดโหมดโฟกัส'}" title="โหมดโฟกัส">${icon('focus')}</button></div>`;
}
function home(){
 const last=topics.find(t=>t.id===state.last)||topics[0];
 return `<section class="hero"><div><span class="course-pill"><span class="dot"></span>ITDS241 · JAVASCRIPT</span><h1><span class="serif">JavaScript,</span>อ่านให้<em>เข้าใจจริง.</em></h1><p class="intro">จัดระเบียบความรู้ก่อนสอบ ค่อย ๆ อ่านสรุป<br>ลองเขียนโค้ด แล้วฝึกคิดให้ไกลกว่าการจำ</p><div class="button-row"><a class="button primary" href="${url(last)}">${icon('book')}${state.last==='runtime'&&!state.read.length?'เริ่มอ่านบทแรก':'กลับไปอ่านต่อ'} ${icon('arrow')}</a><a class="button ghost" href="#/summary">เปิดสรุปก่อนสอบ</a></div></div><div class="code-thought"><div class="thought-top"><span>ONE SMALL QUESTION</span><span class="thought-dot"><i></i><i></i><i></i></span></div><div class="thought-body"><p class="caption">เหมือนกันแค่หน้าตา หรือเหมือนกันจริง?</p><pre><span class="syntax-key">const</span> a = [<span class="syntax-str">1, 2, 3</span>];
<span class="syntax-key">const</span> b = [...a];

console.log(a === b);
<span class="syntax-comment">// คุณคิดว่าจะได้อะไร?</span></pre><div class="thought-foot"><span>ลองคิดก่อนดูคำตอบ</span><button data-action="hero-answer" aria-expanded="false">ดูเหตุผล ${icon('arrow')}</button></div><p class="thought-answer" id="thought-answer" hidden>false · spread สร้าง array ตัวใหม่ ทั้งสองจึงมีค่าข้างในเหมือนกัน แต่ไม่ใช่ object ตัวเดียวกัน</p></div></div></section><div class="home-stats"><span><strong>17</strong> หัวข้อให้อ่าน</span><span><strong>153</strong> ข้อให้ลองคิด</span><span><strong>4</strong> เอกสารต้นฉบับ</span><span class="local-note">${icon('bookmark')}เรียนตามจังหวะของตัวเอง</span></div><div class="continue-card"><div class="continue-icon">${icon('book')}</div><div class="continue-info"><div class="eyebrow">${state.read.length?'YOUR READING PLACE':'A GOOD PLACE TO START'}</div><h3>${pad(index(last))} · ${esc(last.title)}</h3><p>${esc(source(last).title)} · ${last.minutes} นาที · มีตัวอย่างให้ลองรัน</p></div><a class="button" href="${url(last)}">เปิดบทเรียน ${icon('arrow')}</a></div><div class="section-heading"><h2>เส้นทางการอ่าน</h2><a class="text-link" href="#/topics">ดูทั้ง 17 หัวข้อ ${icon('arrow')}</a></div><div class="course-grid">${D.sources.slice(0,3).map((s,i)=>{const ts=topics.filter(t=>t.source===s.id);return `<article class="course-card"><a class="course-cover" href="${url(ts[0])}" aria-label="เริ่ม ${s.title}"><span class="cover-number">${pad(i+1)}</span><span class="cover-index">STUDY NOTES</span><span class="cover-code">${['const · if · for','function · class · DOM','ES2015 → ES2026'][i]}</span></a><div class="course-card-body"><div class="eyebrow">${['LECTURE 06','LECTURE 07','ECMASCRIPT'][i]}</div><h3>${['เริ่มจากพื้นฐาน','ต่อยอดให้เว็บทำงาน','อ่านภาษารุ่นใหม่'][i]}</h3><p>${esc(s.subtitle)}</p><div class="card-footer"><span>${ts.length} หัวข้อ · ${ts.length*9} แบบฝึกหัด</span><a href="${url(ts[0])}">เริ่มอ่าน ${icon('arrow')}</a></div></div></article>`;}).join('')}</div><div class="reference-banner"><div class="reference-badge">{ }</div><div class="banner-info"><h3>ลืม syntax? เปิด Cheatsheet ข้างโต๊ะ</h3><p>รวมคำสั่งที่ใช้บ่อย แยกจากบทเรียน ค้นหาได้ทันที</p></div><a class="text-link" href="#/reference">เปิดดูคำสั่ง ${icon('arrow')}</a></div>`;
}
function lessonHead(t,tab){
 const saved=state.bookmarks.includes(t.id);
 return `<div class="lesson-head"><div class="eyebrow"><a href="#/topics">บทเรียนทั้งหมด</a><span>/</span><span>${source(t).title} · ${pad(index(t))}</span></div><h1>${esc(t.title)}</h1><div class="lesson-english">${esc(t.english)}</div><p>${esc(t.intro)}</p><div class="lesson-meta"><span>${icon('clock')} ${t.minutes} นาที</span>${external(pdf(t),`PDF หน้า ${t.from}–${t.to}`)}<span>9 ข้อในข้อสอบรวมบท</span><button class="text-link bookmark" data-action="bookmark" data-id="${t.id}" aria-pressed="${saved}">${icon('bookmark')}${saved?'บันทึกไว้แล้ว':'เก็บไว้อ่านซ้ำ'}</button></div></div><nav class="tabs" aria-label="รูปแบบบทเรียน">${[['read','book','อ่านบทเรียน'],['short','list','สรุปย่อ'],['lab','code','ลองเขียนโค้ด'],['practice','pen','แบบฝึกหัด']].map(([k,i,label])=>`<a class="tab ${tab===k?'active':''}" href="${k==='practice'?practiceURL(t):url(t,k)}" ${tab===k?'aria-current="page"':''}>${icon(i)}${label}</a>`).join('')}</nav>`;
}
function example(t){return `<section class="inline-example"><div class="example-head"><span>${esc(t.example.title)}</span><a class="text-link" href="${url(t,'lab')}">ลองแก้โค้ด ${icon('arrow')}</a></div>${code(t.example.code)}<div class="expected"><span class="eyebrow">สิ่งที่ควรสังเกต</span>${esc(t.example.expected)}</div><div class="example-task"><div class="eyebrow">YOUR TURN</div><p>${esc(t.example.task)}</p><a class="button small" href="${url(t,'lab')}">${icon('play')}เปิดพื้นที่ทดลอง</a></div></section>`;}
function read(t,short){
 const next=topics[index(t)];
 const sections=short?`<div class="takeaways"><div class="eyebrow">KEEP THESE IN MIND</div><h2>จำหลักคิด แล้วค่อยจำ syntax</h2><ul>${t.takeaways.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:t.sections.map((s,i)=>`<section class="reading-section" id="section-${i}"><h2><span class="section-number">${pad(i+1)}</span>${esc(s.title)}</h2><p>${esc(s.body)}</p>${s.code?code(s.code):''}</section>`).join('');
 return lessonHead(t,short?'short':'read')+`<div class="reading-layout"><article class="reading">${sections}<aside class="callout"><h3>จุดที่ควรอ่านให้ชัด</h3><p>${esc(t.pitfall)}</p></aside>${example(t)}${t.links?`<div class="source-links">${t.links.map(([label,href])=>external(href,esc(label))).join('')}</div>`:''}<div class="notes"><label for="topic-note">${icon('pen')}จดไว้ด้วยคำของตัวเอง</label><textarea id="topic-note" data-topic="${t.id}" placeholder="ลองอธิบายแนวคิดนี้ให้ตัวเองในอนาคตอ่าน...">${esc(state.notes[t.id]||'')}</textarea><small id="note-status">บันทึกอัตโนมัติในเบราว์เซอร์เครื่องนี้</small></div><div class="lesson-bottom"><button class="button ${state.read.includes(t.id)?'':'primary'}" data-action="read-done" data-id="${t.id}" aria-pressed="${state.read.includes(t.id)}">${icon('check')}${state.read.includes(t.id)?'อ่านแล้ว · ยกเลิกเครื่องหมาย':'ทำเครื่องหมายว่าอ่านแล้ว'}</button>${next?`<a class="next-lesson" href="${url(next)}">บทถัดไป ${icon('arrow')}</a>`:`<a class="next-lesson" href="${practiceURL(t)}">ทดสอบความเข้าใจ ${icon('arrow')}</a>`}</div></article><aside class="reading-rail"><div class="eyebrow">ON THIS PAGE</div>${short?'<span>สรุปหลักคิดของบทนี้</span>':t.sections.map((s,i)=>`<a href="#" data-action="section" data-index="${i}">${esc(s.title)}</a>`).join('')}<div class="rail-source"><div class="eyebrow">BACK TO THE SOURCE</div>${external(pdf(t),`${icon('file')}เอกสารเต็ม<br>หน้า ${t.from}–${t.to}`)}<a href="${source(t).summary}" download>${icon('download')} ไฟล์สรุปของเอกสาร</a></div></aside></div>`;
}
function topicRows(list){return `<div class="topic-list">${list.map(t=>`<a class="topic-row" href="${url(t)}"><span class="topic-index">${pad(index(t))}</span><div class="topic-name"><h3>${esc(t.title)} ${state.read.includes(t.id)?'✓':''}</h3><p>${esc(t.english)}</p></div><span class="topic-meta">${t.minutes} MIN</span>${icon('chevron')}</a>`).join('')}</div>`;}
function allTopics(filter='all'){
 const list=topics.filter(t=>filter==='all'||(filter==='saved'?state.bookmarks.includes(t.id):t.source===filter));
 return heading('THE READING LIST','บทเรียนทั้งหมด','อ่านตามลำดับจากพื้นฐาน หรือเลือกเรื่องที่ยังไม่มั่นใจ ทุกหัวข้อมีสรุป ตัวอย่าง และแบบฝึกหัดของตัวเอง')+`<div class="filter-row">${[['all','ทั้งหมด'],['l06','Part 1'],['l07','Part 2'],['es','ECMAScript'],['saved','เก็บไว้อ่านซ้ำ']].map(([k,label])=>`<a class="filter-chip ${k===filter?'active':''}" href="#/topics/${k}">${label}</a>`).join('')}</div>`+(list.length?topicRows(list):empty('ยังไม่มีหัวข้อที่เก็บไว้','กด “เก็บไว้อ่านซ้ำ” ที่หัวบทเรียน แล้วกลับมาหาจากที่นี่ได้'));
}
function summary(filter='all'){
 const list=topics.filter(t=>filter==='all'||t.source===filter);
 return `<div class="summary-intro">${heading('THE LAST-MINUTE NOTES','สรุปก่อนสอบ','ทวนหลักคิดจากเอกสารทั้งสามบท อ่านสั้นให้เห็นภาพ แล้วกลับไปลองโค้ดในเรื่องที่ยังติด ส่วน cheatsheet แยกไว้อีกหน้า')}<div class="button-row"><button class="button small" data-action="print">${icon('print')}พิมพ์ / บันทึก PDF</button><a class="button small" href="summaries/all-notes.md" download>${icon('download')}สรุปทั้งหมด</a></div></div><div class="filter-row">${[['all','ทั้งหมด'],['l06','Part 1'],['l07','Part 2'],['es','ECMAScript']].map(([k,label])=>`<a class="filter-chip ${k===filter?'active':''}" href="#/summary/${k}">${label}</a>`).join('')}</div><div class="summary-grid">${list.map(t=>`<article class="summary-card"><div class="eyebrow">${pad(index(t))} / ${source(t).title}</div><h2>${esc(t.title)}</h2><ul>${t.takeaways.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="summary-actions"><a class="text-link" href="${url(t)}">อ่านอธิบาย ${icon('arrow')}</a><a class="text-link" href="${practiceURL(t)}">ทำข้อสอบรวมบท ${icon('pen')}</a></div></article>`).join('')}</div>`;
}
function library(){return heading('THE SOURCE SHELF','เอกสารบนโต๊ะ','PDF ต้นฉบับทั้ง 4 ไฟล์อยู่ครบ แยกคู่กับไฟล์สรุปภาษาไทย เปิดเอกสารเต็มเพื่อตรวจภาพ ตาราง และรายละเอียดของสไลด์ได้เสมอ')+`<div class="library-grid">${D.sources.map((s,i)=>`<article class="document-card ${s.id==='cheat'?'cheat-document':''}"><div class="doc-icon">${icon('file')}</div><div class="eyebrow">${s.id==='cheat'?'SEPARATE REFERENCE':`SOURCE ${pad(i+1)}`} · ${s.pages} PAGES</div><h2>${s.title}</h2><p>${esc(s.subtitle)}</p><div class="doc-filename">${esc(s.original)}</div><div class="button-row">${external(s.file,`${icon('file')}เปิด PDF เต็ม`,'button small')}<a class="button small" href="${s.summary}" download>${icon('download')}ไฟล์สรุป</a><a class="text-link" href="${s.id==='cheat'?'#/reference':`#/summary/${s.id}`}">อ่านสรุปในเว็บ ${icon('arrow')}</a></div></article>`).join('')}</div><aside class="callout info"><h3>อ่านเอกสารอย่างมีบริบท</h3><p>สรุปและโจทย์เขียนขึ้นใหม่เพื่อใช้ทบทวน อ้างอิงเลขหน้า PDF ซึ่งอาจต่างจากเลขสไลด์ บท ECMAScript มีหมายเหตุแก้จุดคลาดเคลื่อนและลิงก์ตรวจสอบ ส่วน cheatsheet สรุปหมวดคำสั่งทั้งหมดโดยเว้นหน้าโฆษณาท้ายเล่ม</p></aside><section class="storage-tools"><h2>บันทึกการอ่านของคุณ</h2><p>ความคืบหน้า คำตอบ โค้ด และโน้ตอยู่ในเบราว์เซอร์นี้ ไม่มีบัญชีหรือระบบหลังบ้าน การย้ายไฟล์เว็บไม่ได้ย้ายบันทึกให้อัตโนมัติ</p><div class="button-row"><button class="button" data-action="export">${icon('download')}ดาวน์โหลดบันทึกส่วนตัว</button><button class="button danger" data-action="reset">ล้างบันทึกของเว็บนี้</button></div></section>`;}
function reference(){return heading('A REFERENCE, NOT A LECTURE','JavaScript cheatsheet','เปิดหาคำสั่งเมื่อจำ syntax ไม่ได้ แยกตาม 12 หมวด พร้อมหมายเหตุแก้จุดที่ชวนสับสนใน PDF ต้นฉบับ')+`<div class="reference-tools"><input class="reference-search" id="reference-search" type="search" aria-label="ค้นหาคำสั่งใน cheatsheet" placeholder="ค้นหาคำสั่ง เช่น slice, event, Math..." value="${esc(refQuery)}">${external('materials/cheatsheet.pdf',`${icon('file')}เปิดเอกสารเต็ม`,'button small')}<a class="button small" href="summaries/cheatsheet.md" download>${icon('download')}ไฟล์สรุป</a></div><div id="reference-list">${referenceList(refQuery)}</div>`;}
function referenceList(query){
 const q=query.trim().toLocaleLowerCase();
 const list=D.reference.map((r,i)=>({r,i})).filter(({r})=>JSON.stringify(r).toLocaleLowerCase().includes(q));
 return list.length?list.map(({r,i})=>`<details class="reference-section" id="ref-${i}" ${q||i===0?'open':''}><summary><span>${esc(r.title)}</span><small>PDF ${r.pages}</small></summary><table class="reference-table"><caption class="sr-only">${esc(r.title)}</caption><tbody>${r.rows.map(([syntax,desc])=>`<tr><th scope="row">${esc(syntax)}</th><td>${esc(desc)}</td></tr>`).join('')}</tbody></table>${code(r.example)}<div class="reference-footer"><span>อ้างอิง PDF หน้า ${r.pages}</span><button class="text-link" data-action="reference-lab" data-ref="${i}">ลองโค้ดนี้ ${icon('arrow')}</button></div></details>`).join(''):empty('ยังไม่พบคำสั่งนี้','ลองคำสั้นลง หรือค้นชื่อกลุ่ม เช่น array, string, events');
}
function lab(t){
 const d=state.drafts[t.id];
 const start=pendingLab?.topic===t.id?pendingLab:{code:d?.code??t.example.code,html:d?.html??t.example.fixture??'',mode:d?.mode??t.example.mode,origin:d?.origin??'',back:d?.back??''};pendingLab=null;
 const task=start.origin?'ลองทายผลก่อนรัน แล้วเปลี่ยนค่าหรือคำสั่งเพื่อทดสอบเหตุผลของคุณ':t.example.task;
 return lessonHead(t,'lab')+`<div class="lab-task"><div class="eyebrow">${esc(start.origin||t.example.title)}</div><h2>ลองเปลี่ยน แล้วสังเกตผล</h2><p>${esc(task)}</p>${start.back?`<a class="text-link" href="${esc(start.back)}">กลับไปยังตัวอย่างที่เปิดมา ${icon('arrow')}</a>`:''}</div><div class="lab" data-topic="${t.id}" data-origin="${esc(start.origin||'')}" data-back="${esc(start.back||'')}"><div class="lab-toolbar"><span class="label">TRY IT YOURSELF / ${pad(index(t))}</span><label for="lab-mode" class="muted" style="font-size:11px">โหมด</label><select id="lab-mode"><option value="js" ${start.mode==='js'?'selected':''}>JavaScript · Console</option><option value="dom" ${start.mode==='dom'?'selected':''}>HTML + JavaScript</option></select><button class="button small" data-action="lab-reset">เริ่มตัวอย่างใหม่</button><button class="button primary small" id="run-code" data-action="run">${icon('play')}รันโค้ด</button><button class="icon-button" data-action="stop" aria-label="หยุดโค้ด">${icon('stop')}</button></div><div class="lab-panes"><div class="editor-side"><div id="fixture-wrap" ${start.mode==='dom'?'':'hidden'}><label class="editor-label" for="html-editor">HTML / เนื้อหาใน body</label><textarea id="html-editor" class="code-editor fixture-editor" spellcheck="false" aria-label="แก้ไข HTML">${esc(start.html)}</textarea></div><label class="editor-label" for="code-editor"><span>JAVASCRIPT</span><span>Ctrl + Enter เพื่อรัน</span></label><textarea id="code-editor" class="code-editor" spellcheck="false" aria-label="แก้ไข JavaScript">${esc(start.code)}</textarea></div><div class="result-side"><div class="result-head"><span>ผลลัพธ์</span><span class="result-status" id="run-status" role="status">พร้อมให้ลอง</span></div><iframe class="dom-preview" id="dom-preview" title="หน้าตัวอย่าง HTML ที่ทดลอง" sandbox="allow-scripts" ${start.mode==='dom'?'':'hidden'}></iframe><div class="result-head"><span>CONSOLE</span><button class="text-link" data-action="clear-console">ล้างผล</button></div><pre class="console-output" id="console-output" role="log" aria-live="polite">กดรันโค้ดเพื่อดูผลลัพธ์</pre></div></div><div class="lab-foot">โค้ดที่แก้บันทึกในเครื่อง · JavaScript หยุดอัตโนมัติเมื่อเกิน 2 วินาที · ตัวอย่าง HTML ใช้ iframe แยกจากหน้าอ่าน</div></div><div class="expected" ${start.origin?'hidden':''} style="margin-top:20px;border-radius:6px"><span class="eyebrow">ผลของตัวอย่างตั้งต้น</span>${esc(t.example.expected)}</div><details class="solution" ${start.origin?'hidden':''}><summary>ดูแนวทางทำโจทย์นี้ หลังลองด้วยตัวเอง</summary>${code(t.example.solution)}<div class="example-task"><button class="button small" data-action="use-solution">นำแนวทางไปลองรัน</button></div></details>`;
}
function feedback(q,a,id,i){
 if(!a?.revealed)return '';
 const open=!q.options;
 return `<div class="feedback ${a.status==='incorrect'?'incorrect':''}"><h3>${open?'แนวคำตอบสำหรับเทียบด้วยตัวเอง':a.status==='correct'?'ตอบถูกแล้ว':'ลองดูเหตุผลของข้อนี้'}</h3><div class="answer-key">${esc(q.answer)}</div><p>${esc(q.explanation)}</p>${open?`<div class="rubric">คำตอบอาจเขียนต่างจากตัวอย่างได้ ให้ดูว่าเหตุผลและเงื่อนไขครบหรือไม่ ระบบไม่ได้ตรวจข้อความนี้อัตโนมัติ</div><div class="self-score"><small>ประเมินคำตอบตัวเอง</small><button class="button small ${a.status==='self-correct'?'primary':''}" data-action="self-score" data-id="${id}" data-index="${i}" data-score="self-correct">เข้าใจครบ</button><button class="button small ${a.status==='review'?'primary':''}" data-action="self-score" data-id="${id}" data-index="${i}" data-score="review">ยังต้องทวน</button></div>`:''}</div>`;
}
function question(t,q,i,number=i+1){
 const key=`${t.id}:${i}`,a=state.answers[key]||{};
 return `<section class="question" data-question="${key}" id="question-${t.id}-${i}"><div class="question-meta"><span class="question-number">QUESTION ${pad(number)}</span><span class="difficulty ${q.level}">${{easy:'เริ่มคิด · ง่าย',medium:'เชื่อมโยง · กลาง',hard:'ออกแบบ · ยาก'}[q.level]}</span><span>${q.options?'เลือกคำตอบเดียว':'เขียนอธิบาย'}</span></div><h3>${esc(q.prompt)}</h3>${q.code?code(q.code):''}${q.options?`<fieldset><legend>${esc(q.prompt)}</legend><div class="options">${q.options.map((op,n)=>`<label class="option"><input type="radio" name="${key}" value="${n}" ${a.response===op?'checked':''} data-index="${i}"><span>${esc(op)}</span></label>`).join('')}</div></fieldset>`:`<textarea class="answer-text" aria-label="คำตอบข้อ ${number}" placeholder="เขียนวิธีคิด เงื่อนไขที่ต้องตรวจ หรือโค้ดที่เสนอ..." data-index="${i}">${esc(a.response||'')}</textarea>`}<div class="question-actions"><button class="button ${a.revealed?'':'primary'} small" data-action="check-answer" data-id="${t.id}" data-index="${i}">${q.options?(a.revealed?'ตรวจอีกครั้ง':'ตรวจคำตอบ'):'เทียบแนวคำตอบ'}</button>${q.code?`<button class="text-link question-tools" data-action="question-lab" data-id="${t.id}" data-index="${i}">ลองโค้ดนี้ ${icon('code')}</button>`:''}</div><details class="hint"><summary>ขอคำใบ้ก่อน</summary><p>${esc(q.hint)}</p></details><div class="feedback-slot">${feedback(q,a,t.id,i)}</div></section>`;
}
function examStats(group){
 const ts=topics.filter(t=>t.source===group.id);
 let total=0, choices=0, written=0, answered=0, correct=0, self=0;
 for(const t of ts)D.questions[t.id].forEach((q,i)=>{
  total++;if(q.options)choices++;else written++;
  const a=state.answers[t.id+':'+i];
  if(a&&typeof a.response==='string'&&a.response.trim())answered++;
  if(a?.revealed&&a.status==='correct')correct++;
  if(a?.revealed&&a.status==='self-correct')self++;
 });
 return {total,choices,written,answered,correct,self};
}
function examCount(group){
 const a=examStats(group);
 return `ตอบแล้ว ${a.answered}/${a.total} · ตรวจถูก ${a.correct}/${a.choices} · ประเมินเองว่าเข้าใจ ${a.self}/${a.written}`;
}
function practice(group){
 const ts=topics.filter(t=>t.source===group.id),a=examStats(group);
 const groups=D.sources.filter(s=>s.id!=='cheat'),next=groups[groups.indexOf(group)+1];
 let number=0;
 return `<div class="page-heading exam-head"><div class="eyebrow">ONE TOPIC / ONE EXAM</div><h1>แบบฝึกหัด · ${group.title}</h1><p>รวมทุกชุดและทุกหัวข้อย่อยของบทนี้ไว้ในหน้าเดียว ทำต่อเนื่องได้โดยไม่ต้องเปลี่ยนชุด คำใบ้และเฉลยยังเปิดแยกตามข้อได้</p><div class="lesson-meta"><span>${ts.length} หัวข้อย่อย</span><span>${a.total} ข้อ · ง่าย กลาง ยาก</span>${external(group.file,icon('file')+' เอกสารต้นฉบับ')}</div></div>
 <nav class="filter-row exam-groups" aria-label="เลือกบทข้อสอบ">${groups.map(g=>`<a class="filter-chip ${g.id===group.id?'active':''}" href="#/practice/${g.id}" ${g.id===group.id?'aria-current="page"':''}>${g.title} <span>${topics.filter(t=>t.source===g.id).length*9} ข้อ</span></a>`).join('')}</nav>
 <details class="exam-outline"><summary>ไปยังหัวข้อย่อย <span>${ts.length} หัวข้ออยู่ในหน้านี้</span></summary><nav aria-label="สารบัญข้อสอบ">${ts.map((t,i)=>`<a class="text-link" href="${practiceURL(t)}" data-action="exam-section" data-id="${t.id}">${pad(i+1)} · ${esc(t.title)} <small>ข้อ ${i*9+1}–${(i+1)*9}</small></a>`).join('')}</nav></details>
 <div class="exam-toolbar"><div><span class="eyebrow">YOUR PROGRESS</span><p id="practice-count" role="status">${examCount(group)}</p></div><button class="button primary small" data-action="check-exam">${icon('check')}ตรวจข้อที่ตอบแล้ว</button></div>
 <div class="exam-questions">${ts.map((t,i)=>`<section class="exam-topic" id="exam-topic-${t.id}"><div class="exam-topic-head"><div><div class="eyebrow">SECTION ${pad(i+1)} / ${pad(ts.length)}</div><h2>${esc(t.title)}</h2><p>9 ข้อ · ง่าย กลาง ยาก</p></div><a class="text-link" href="${url(t)}">ทวนแนวคิด ${icon('book')}</a></div>${D.questions[t.id].map((q,j)=>question(t,q,j,++number)).join('')}</section>`).join('')}</div>
 <div class="lesson-bottom"><button class="text-link" data-action="retry-exam" data-source="${group.id}">เริ่มทำบทนี้ใหม่</button>${next?`<a class="button" href="#/practice/${next.id}">บทถัดไป · ${next.title} ${icon('arrow')}</a>`:`<a class="button" href="#/summary/es">กลับไปทวนสรุป ${icon('book')}</a>`}</div>`;
}
function render(){
 window.StudyRunner.stop();document.body.classList.remove('nav-open');
 const parts=location.hash.replace(/^#\/?/,'').split('/'),kind=parts[0]||'home',id=parts[1],detail=parts[2];
 routeKind=kind;currentTopic=null;currentExamSource=null;let html,questionAnchor=null;
 if(kind==='lesson'){
  currentTopic=topics.find(t=>t.id===id);
  if(currentTopic){state.last=currentTopic.id;save();html=detail==='lab'?lab(currentTopic):read(currentTopic,detail==='short');}
 }else if(kind==='practice'){
  const legacy=topics.find(t=>t.id===id);
  currentExamSource=id?(D.sources.find(g=>g.id===id&&g.id!=='cheat')||(legacy?source(legacy):null)):source(topics.find(t=>t.id===state.last)||topics[0]);
  if(currentExamSource){
   const target=legacy||topics.find(t=>t.id===detail&&t.source===currentExamSource.id);
   currentTopic=target||topics.find(t=>t.source===currentExamSource.id);
   html=practice(currentExamSource);
   if(target){const qi=legacy?(Math.max(1,Math.min(3,Number(detail)||1))-1)*3:Number(parts[3]);questionAnchor=Number.isInteger(qi)&&qi>=0&&qi<9?'question-'+target.id+'-'+qi:'exam-topic-'+target.id;}
  }
 }
 if(html===undefined){
  if(kind==='home')html=home();
  else if(kind==='topics')html=allTopics(['all','l06','l07','es','saved'].includes(id)?id:'all');
  else if(kind==='summary')html=summary(['all','l06','l07','es'].includes(id)?id:'all');
  else if(kind==='library')html=library();
  else if(kind==='reference')html=reference();
  else html=empty('ไม่พบหน้านี้','กลับไปเลือกบทเรียนจากสารบัญ หรือใช้ช่องค้นหาด้านบน');
 }
 settings();shell();$('#main').innerHTML=`<div class="page">${html}</div>`;$('#main').dataset.route=location.hash;
 document.title=`${currentExamSource?'แบบฝึกหัด · '+currentExamSource.title:currentTopic?.title||({home:'ห้องอ่าน',topics:'บทเรียนทั้งหมด',summary:'สรุปก่อนสอบ',reference:'Cheatsheet',library:'เอกสารต้นฉบับ'}[kind]||'ไม่พบหน้า')} · โต๊ะทบทวน`;
 window.scrollTo({top:0,behavior:'instant'});$('#main').focus({preventScroll:true});
 if(questionAnchor)document.getElementById(questionAnchor)?.scrollIntoView({behavior:'instant',block:'start'});
}
function saveDraft(){if(!$('#code-editor')||!currentTopic)return;state.drafts[currentTopic.id]={code:$('#code-editor').value,html:$('#html-editor').value,mode:$('#lab-mode').value,origin:$('.lab').dataset.origin,back:$('.lab').dataset.back};save();}
let runErrors=false,runLogs=0;
function runEvent(e){
 const box=$('#console-output'),status=$('#run-status');if(!box)return;
 if(e.type==='clear'){box.textContent='';runLogs=0;return;}
 if(e.type==='log'||e.type==='error'){if(runLogs===0)box.textContent='';if(runLogs++>=200)return;box.textContent+=(box.textContent?'\n':'')+(e.text??'');if(e.type==='error'){runErrors=true;box.classList.add('error');status.textContent='พบข้อผิดพลาด';}}
 if(e.type==='done'){status.textContent=runErrors?'พบข้อผิดพลาด':'รันแล้ว · ลองเปลี่ยนค่าได้';$('#run-code').disabled=false;if(!box.textContent)box.textContent='รันแล้ว ไม่มี console output';}
}
function runCode(){saveDraft();runErrors=false;runLogs=0;$('#console-output').textContent='';$('#console-output').classList.remove('error');$('#run-status').textContent='กำลังรัน…';$('#run-code').disabled=true;const s=$('#code-editor').value;if($('#lab-mode').value==='dom')window.StudyRunner.runDOM(s,$('#html-editor').value,$('#dom-preview'),runEvent);else window.StudyRunner.runJS(s,runEvent);}
function refreshCounter(){if(currentExamSource&&$('#practice-count'))$('#practice-count').textContent=examCount(currentExamSource);}
function gradeQuestion(t,i,card){
 const q=D.questions[t.id][i],input=q.options?card.querySelector('input:checked'):card.querySelector('textarea');
 if(!input||!input.value.trim())return false;
 const key=t.id+':'+i,response=q.options?q.options[Number(input.value)]:input.value,previous=state.answers[key];
 state.answers[key]={response,revealed:true,status:q.options?(response===q.answer?'correct':'incorrect'):(previous?.revealed&&previous.response===response?previous.status:'unscored')};
 card.querySelector('.feedback-slot').innerHTML=feedback(q,state.answers[key],t.id,i);
 const button=card.querySelector('[data-action="check-answer"]');button.classList.remove('primary');if(q.options)button.textContent='ตรวจอีกครั้ง';
 return true;
}
function openSearch(){$('#search-dialog').showModal();$('#search-input').value='';search('');$('#search-input').focus();}
function search(query){
 const q=query.trim().toLocaleLowerCase(),results=[];
 if(q){
  for(const t of topics){
   if(JSON.stringify([t.title,t.english,t.intro,t.sections,t.takeaways,t.pitfall]).toLocaleLowerCase().includes(q))results.push({url:url(t),title:t.title,desc:`บทเรียน ${pad(index(t))} · ${source(t).title}`});
   const found=D.questions[t.id].findIndex(x=>(x.prompt+' '+(x.code||'')).toLocaleLowerCase().includes(q));if(found>=0)results.push({url:practiceURL(t,found),title:D.questions[t.id][found].prompt,desc:`แบบฝึกหัด · ${t.title} · ข้อ ${examNumber(t,found)}`});
  }
  D.reference.forEach(r=>{if(JSON.stringify(r).toLocaleLowerCase().includes(q))results.push({url:'#/reference',title:r.title,desc:'Cheatsheet · '+r.pages,ref:q});});
 }else topics.slice(0,5).forEach(t=>results.push({url:url(t),title:t.title,desc:source(t).title}));
 $('#search-results').innerHTML=results.length?results.slice(0,18).map(r=>`<a class="search-result" href="${r.url}" ${r.ref?`data-ref-query="${esc(r.ref)}"`:''}><strong>${esc(r.title)}</strong><small>${esc(r.desc)}</small></a>`).join(''):empty('ยังไม่พบเรื่องนี้','ลองชื่อแนวคิดหรือคำสั่งสั้น ๆ อีกครั้ง');
}
document.addEventListener('click',event=>{
 const result=event.target.closest('.search-result');
 if(result){if(result.dataset.refQuery)refQuery=result.dataset.refQuery;$('#search-dialog').close();if(location.hash===result.getAttribute('href'))render();return;}
 const b=event.target.closest('[data-action]');if(!b)return;const action=b.dataset.action;
 if(action==='section'){event.preventDefault();$('#section-'+b.dataset.index)?.scrollIntoView({behavior:'smooth'});return;}
 if(action==='menu'){document.body.classList.toggle('nav-open');b.setAttribute('aria-expanded',document.body.classList.contains('nav-open'));return;}
 if(action==='search'){openSearch();return;}
 if(action==='close-search'){$('#search-dialog').close();return;}
 if(action==='theme'){state.theme=state.theme==='night'?'paper':'night';save();settings();shell();return;}
 if(action==='focus'){document.body.classList.toggle('focus-mode');shell();toast(document.body.classList.contains('focus-mode')?'โหมดโฟกัส · กดไอคอนเดิมเพื่อกลับ':'กลับสู่มุมอ่านปกติ');return;}
 if(action==='font-up'||action==='font-down'){state.font=Math.max(16,Math.min(24,state.font+(action==='font-up'?1:-1)));save();settings();toast(`ขนาดข้อความบทเรียน ${state.font}px`);return;}
 if(action==='hero-answer'){const a=$('#thought-answer');a.hidden=!a.hidden;b.setAttribute('aria-expanded',!a.hidden);b.innerHTML=`${a.hidden?'ดูเหตุผล':'ซ่อนคำตอบ'} ${icon('arrow')}`;return;}
 if(action==='bookmark'||action==='read-done'){
  const list=action==='bookmark'?state.bookmarks:state.read,id=b.dataset.id,i=list.indexOf(id);if(i<0)list.push(id);else list.splice(i,1);save();shell();b.setAttribute('aria-pressed',i<0);
  b.innerHTML=action==='bookmark'?`${icon('bookmark')}${i<0?'บันทึกไว้แล้ว':'เก็บไว้อ่านซ้ำ'}`:`${icon('check')}${i<0?'อ่านแล้ว · ยกเลิกเครื่องหมาย':'ทำเครื่องหมายว่าอ่านแล้ว'}`;
  if(action==='read-done')b.classList.toggle('primary',i>=0);toast(action==='bookmark'?(i<0?'เก็บหัวข้อนี้ไว้อ่านซ้ำแล้ว':'นำออกจากรายการอ่านซ้ำแล้ว'):(i<0?'บันทึกว่าอ่านแล้ว':'ยกเลิกเครื่องหมายอ่านแล้ว'));return;
 }
 if(action==='print'){window.print();return;}
 if(action==='run'){runCode();return;}
 if(action==='stop'){window.StudyRunner.stop();$('#run-code').disabled=false;$('#run-status').textContent='หยุดแล้ว';return;}
 if(action==='clear-console'){$('#console-output').textContent='';$('#console-output').classList.remove('error');return;}
 if(action==='lab-reset'){delete state.drafts[currentTopic.id];save();render();return;}
 if(action==='use-solution'){$('#code-editor').value=currentTopic.example.solution;saveDraft();toast('ใส่แนวทางในช่องโค้ดแล้ว กดรันเพื่อดูผล');return;}
 if(action==='question-lab'||action==='reference-lab'){
  const t=action==='question-lab'?topics.find(x=>x.id===b.dataset.id):topics.find(x=>x.id===['variables','operators','functions','control','collections','collections','collections','builtins','builtins','events','events','events'][Number(b.dataset.ref)]);
  pendingLab={topic:t.id,code:action==='question-lab'?D.questions[t.id][Number(b.dataset.index)].code:D.reference[Number(b.dataset.ref)].example,html:'',mode:'js',origin:action==='question-lab'?'แบบฝึกหัด · ข้อ '+examNumber(t,Number(b.dataset.index)):'Cheatsheet · '+D.reference[Number(b.dataset.ref)].title,back:action==='question-lab'?practiceURL(t,Number(b.dataset.index)):'#/reference'};location.hash=url(t,'lab');return;
 }
 if(action==='check-answer'){
  const t=topics.find(x=>x.id===b.dataset.id),i=Number(b.dataset.index),card=b.closest('.question');
  if(!gradeQuestion(t,i,card)){toast(D.questions[t.id][i].options?'เลือกคำตอบก่อนตรวจ':'ลองเขียนวิธีคิดก่อนเปิดแนวคำตอบ');card.querySelector('input,textarea')?.focus();return;}
  save();refreshCounter();return;
 }
 if(action==='check-exam'){
  let checked=0;document.querySelectorAll('.question').forEach(card=>{const [id,i]=card.dataset.question.split(':');if(gradeQuestion(topics.find(t=>t.id===id),Number(i),card))checked++;});
  save();refreshCounter();toast(checked?'เปิดผลและแนวคำตอบของ '+checked+' ข้อที่ตอบแล้ว':'ลองตอบอย่างน้อยหนึ่งข้อก่อนตรวจ');return;
 }
 if(action==='exam-section'){
  event.preventDefault();history.replaceState(null,'',b.getAttribute('href'));$('#main').dataset.route=location.hash;document.getElementById('exam-topic-'+b.dataset.id)?.scrollIntoView({behavior:'instant',block:'start'});return;
 }
 if(action==='retry-exam'){pendingExamReset=b.dataset.source;$('#exam-reset-name').textContent=D.sources.find(g=>g.id===pendingExamReset).title;$('#exam-reset-dialog').showModal();return;}
 if(action==='cancel-exam-reset'){$('#exam-reset-dialog').close();pendingExamReset=null;return;}
 if(action==='confirm-exam-reset'){
  for(const t of topics.filter(t=>t.source===pendingExamReset))D.questions[t.id].forEach((_,i)=>delete state.answers[t.id+':'+i]);
  save();$('#exam-reset-dialog').close();pendingExamReset=null;render();toast('เริ่มทำบทนี้ใหม่แล้ว บันทึกของบทอื่นยังอยู่');return;
 }
 if(action==='self-score'){
  const key=`${b.dataset.id}:${b.dataset.index}`;if(state.answers[key])state.answers[key].status=b.dataset.score;save();
  const card=b.closest('.question'),q=D.questions[b.dataset.id][Number(b.dataset.index)];card.querySelector('.feedback-slot').innerHTML=feedback(q,state.answers[key],b.dataset.id,Number(b.dataset.index));refreshCounter();return;
 }
 if(action==='reset'){$('#reset-dialog').showModal();return;}
 if(action==='cancel-reset'){$('#reset-dialog').close();return;}
 if(action==='confirm-reset'){state=blank();save();$('#reset-dialog').close();render();toast('ล้างบันทึกของโต๊ะทบทวนแล้ว');return;}
 if(action==='export'){const blob=new Blob([JSON.stringify({app:'โต๊ะทบทวน',exportedAt:new Date().toISOString(),data:state},null,2)],{type:'application/json'}),href=URL.createObjectURL(blob),a=document.createElement('a');a.href=href;a.download='study-desk-personal-notes.json';a.click();setTimeout(()=>URL.revokeObjectURL(href),1000);}
});
$('#mobile-shade').addEventListener('click',()=>document.body.classList.remove('nav-open'));
document.addEventListener('input',event=>{
 const e=event.target;
 if(e.id==='search-input'){search(e.value);return;}
 if(e.id==='reference-search'){refQuery=e.value;$('#reference-list').innerHTML=referenceList(refQuery);return;}
 if(e.id==='topic-note'){state.notes[e.dataset.topic]=e.value;save();$('#note-status').textContent=storageOK?'บันทึกแล้วในเครื่องนี้':'ยังบันทึกไม่ได้ ข้อความอยู่ในรอบนี้';return;}
 if(e.id==='code-editor'||e.id==='html-editor'){saveDraft();return;}
 if(e.matches('.answer-text')){const key=e.closest('.question').dataset.question,previous=state.answers[key];state.answers[key]={response:e.value,revealed:false,status:'draft'};save();if(previous?.revealed)e.closest('.question').querySelector('.feedback-slot').innerHTML='';refreshCounter();}
});
document.addEventListener('change',event=>{
 const e=event.target;
 if(e.id==='lab-mode'){window.StudyRunner.stop();$('#fixture-wrap').hidden=e.value!=='dom';$('#dom-preview').hidden=e.value!=='dom';$('#run-code').disabled=false;$('#run-status').textContent='พร้อมให้ลอง';saveDraft();}
 if(e.matches('.option input')){const card=e.closest('.question'),id=card.dataset.question.split(':')[0],q=D.questions[id][Number(e.dataset.index)];state.answers[card.dataset.question]={response:q.options[Number(e.value)],revealed:false,status:'draft'};card.querySelector('.feedback-slot').innerHTML='';save();refreshCounter();}
});
document.addEventListener('keydown',event=>{
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(!$('#search-dialog').open)openSearch();}
 if((event.ctrlKey||event.metaKey)&&event.key==='Enter'&&$('#code-editor')){event.preventDefault();runCode();}
 if(event.key==='Escape')document.body.classList.remove('nav-open');
 if((event.ctrlKey||event.metaKey)&&event.key===']'&&event.target.matches('.code-editor')){event.preventDefault();const e=event.target;e.setRangeText('  ',e.selectionStart,e.selectionEnd,'end');saveDraft();}
});
window.addEventListener('hashchange',render);
window.addEventListener('beforeunload',()=>{saveDraft();window.StudyRunner.stop();});
settings();render();
})();
