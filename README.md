# โต๊ะทบทวน

เว็บส่วนตัวสำหรับทบทวนเนื้อหาก่อนสอบ รวมสรุปสไลด์แต่ละวิชาไว้ที่เดียว
เป็น static site ล้วน (HTML / CSS / JavaScript) ไม่มี framework และไม่ต้อง build

## หน้าในเว็บ

| หน้า | ไฟล์ | รายละเอียด |
| --- | --- | --- |
| หน้าแรก | `index.html` | รายการวิชา + คำศัพท์ที่กำลังทบทวน |
| ITDS231 บทที่ 1: Intro & Topology | `network.html` | 3 แท็บ: **เนื้อหา** (accordion สรุปแต่ละไฟล์สไลด์) · **สรุป** (cheat sheet) · **แบบฝึกหัด** (quiz 20 ข้อ ตรวจให้คะแนนพร้อมเฉลย) |
| ITDS231 บทที่ 2: Application Layer | `network-application-layer.html` | โครง 3 แท็บเดียวกัน · สลับบทได้ที่ต้นหน้า |
| ITDS231 บทที่ 3: Data Link Layer | `network-data-link-layer.html` | framing, error detection, flow control / ARQ, HDLC |
| ITDS231 บทที่ 4: MAC + Ethernet | `network-mac-ethernet.html` | ALOHA, CSMA/CD, CSMA/CA, channelization, เฟรม Ethernet, switch |
| ITDS241 บทที่ 1: Internet & HTML Basics | `web-intro-html-basics.html` | 4 แท็บ: เนื้อหา · สรุป · แบบฝึกหัด · **เขียนโค้ด** (ตรวจโค้ด HTML อัตโนมัติ 24 ข้อ) |
| ITDS241 บทที่ 2: Media, Forms & Semantic | `web-media-forms-semantic.html` | media, forms + validation, semantic layout · เขียนโค้ด 12 ข้อ |
| ITDS241 บทที่ 3: CSS Fundamentals | `web-css-fundamentals.html` | selector, box model, text/color, specificity · เขียนโค้ด 6 ข้อ |
| ITDS241 บทที่ 4: CSS Layout & Responsive | `web-css-layout-responsive.html` | display, position, flexbox, media query, responsive · เขียนโค้ด 6 ข้อ |
| ITDS241 บทที่ 5: JavaScript Fundamentals | `web-js-fundamentals.html` | var/let/const, data types, built-in objects, operator, control flow · เขียนโค้ด 6 ข้อ |
| ITDS241 บทที่ 6: Functions, OOP & DOM | `web-js-functions-oop-dom.html` | function ทุกแบบ, scope/closure, class + inheritance, DOM และ events · เขียนโค้ด 6 ข้อ |
| ITDS241 บทที่ 7: ECMAScript Features | `web-ecmascript-features.html` | ES6 → ES2026 · 3 แท็บ (ไม่มีแท็บเขียนโค้ด) |
| ITDS261 บทที่ 1: SE Foundation & Project Management | `se-foundation-pm.html` | ซอฟต์แวร์และ SE, บทบาทในโปรเจกต์, 4P's, triple constraint, POMA, WBS / PERT / Gantt |
| ITDS261 บทที่ 2: Software Process Models | `se-process-models.html` | Code and Fix, Waterfall, Incremental, Spiral, Agile/Scrum, กรณีศึกษา |
| ITDS261 บทที่ 3: Requirement Engineering | `se-requirement-engineering.html` | ประเภท requirement, elicitation, specification, user story, validation, requirements management |
| ITDS261 บทที่ 4: Use Case Modeling | `se-use-case-modeling.html` | สัญลักษณ์ use case, includes / extends, use case narrative |
| ITDS261 บทที่ 5: Flow & Behavior Modeling | `se-flow-behavior-modeling.html` | DFD, context diagram, balancing, consistency rules, PSPEC, control flow |
| ITDS261 บทที่ 6: User Interface Design | `se-ui-design.html` | ประเภท UI, design process, Golden Rules, low / high fidelity prototype |

ทุกหน้าบทเลือกวิชา (Network / Web / SE) และบทได้ที่ต้นหน้า · แต่ละวิชามีสีประจำวิชาของตัวเอง (Network = amber บนพื้น navy, Web = ม่วง iris, SE = เขียว sage) บนพื้นมืดแบบเดียวกัน · ลิงก์ตรงไปแต่ละแท็บได้ด้วย `#content`, `#summary`, `#quiz` (หน้า Web มี `#code` เพิ่ม)

แท็บเนื้อหามีแผนภาพ SVG และตัวช่วยคำนวณแบบ interactive เช่น delay calculator (Network บทที่ 1), HTTP timeline และ web cache (บทที่ 2), CRC / Hamming / sliding window (บทที่ 3), binary exponential backoff (บทที่ 4) · ฝั่ง SE มีตัวนับเส้นทางการสื่อสารในทีม (บทที่ 1) และตัวรัน PSPEC Analyze Triangle (บทที่ 5) · ฝั่ง Web มี URL anatomy, layout demo, pattern tester, flexbox lab และ media query lab · โค้ดตัวอย่าง JavaScript กดรันได้ในกล่อง sandbox และโค้ด HTML บางกล่องแสดงผลจริงในกรอบ preview
ความคืบหน้าของแท็บเขียนโค้ดเก็บใน localStorage ของเบราว์เซอร์เท่านั้น

## เปิดดูบนเครื่อง

ดับเบิลคลิก `index.html` ก็เปิดได้เลย หรือถ้าอยากรันผ่าน local server:

```bash
# Python
python -m http.server 8000
# หรือ Node
npx serve .
```

แล้วเปิด <http://localhost:8000>

## โครงสร้าง

```
index.html
network.html                     ITDS231 บทที่ 1
network-application-layer.html   ITDS231 บทที่ 2
network-data-link-layer.html     ITDS231 บทที่ 3
network-mac-ethernet.html        ITDS231 บทที่ 4
web-intro-html-basics.html       ITDS241 บทที่ 1
web-media-forms-semantic.html    ITDS241 บทที่ 2
web-css-fundamentals.html        ITDS241 บทที่ 3
web-css-layout-responsive.html   ITDS241 บทที่ 4
web-js-fundamentals.html         ITDS241 บทที่ 5
web-js-functions-oop-dom.html    ITDS241 บทที่ 6
web-ecmascript-features.html     ITDS241 บทที่ 7
se-foundation-pm.html            ITDS261 บทที่ 1
se-process-models.html           ITDS261 บทที่ 2
se-requirement-engineering.html  ITDS261 บทที่ 3
se-use-case-modeling.html        ITDS261 บทที่ 4
se-flow-behavior-modeling.html   ITDS261 บทที่ 5
se-ui-design.html                ITDS261 บทที่ 6
assets/
  css/  tokens.css · base.css · home.css · network.css · exercise.css · motion.css
  js/   network.js · widgets.js · code-exercise.js · exercises-web-1.js … exercises-web-6.js
  favicon.svg
```

## Deploy ด้วย GitHub Pages

เว็บนี้ serve จาก **root ของ branch `main`** ได้เลย (ไม่ต้องย้ายไป `/docs` เพราะไม่มีขั้นตอน build และไฟล์ทั้งหมดคือตัวเว็บ)

1. push repo ขึ้น GitHub
2. ไปที่ **Settings → Pages**
3. Source: **Deploy from a branch** → Branch: `main` / Folder: `/ (root)` → Save
4. รอสักครู่ เว็บจะอยู่ที่ `https://<username>.github.io/<repo>/`

ไฟล์ `.nojekyll` มีไว้บอก GitHub Pages ว่าไม่ต้องประมวลผลด้วย Jekyll
