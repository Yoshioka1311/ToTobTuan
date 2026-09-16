# CLAUDE.md — โต๊ะทบทวน

อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง และ **อัปเดตส่วน "สถานะล่าสุด" / "สิ่งที่ยังไม่ได้ทำ" ก่อนจบทุก session**

## Safety Rules

กฎเข้มงวดจากผู้ใช้ ต้องทำตามทุกครั้ง ไม่มีข้อยกเว้น

**ขอบเขตการเข้าถึงไฟล์**
- ทำงานเฉพาะภายในโฟลเดอร์โปรเจกต์นี้เท่านั้น ห้ามอ่าน แก้ไข ลบ หรือย้ายไฟล์ใดๆ นอกโฟลเดอร์นี้ (ไฟล์ระบบ, ไฟล์ส่วนตัว, Documents/Desktop ที่ไม่เกี่ยวข้อง) — ไฟล์ชั่วคราวของงานให้เก็บใน `.cache/` ในโปรเจกต์ (ถูก gitignore) แล้วลบเมื่อเสร็จ
  - ข้อยกเว้นเดียว: ไฟล์ที่ผู้ใช้ระบุ path ให้เองในข้อความ (เช่น PDF สไลด์ใน Downloads) และสั่งให้ใช้
- ห้ามรันคำสั่งที่มีผลกับระบบปฏิบัติการหรือทั้งเครื่อง เช่น `sudo`, `rm -rf` ที่ไม่ระบุ path ชัดเจน, แก้ system settings, ติดตั้งซอฟต์แวร์ระดับ global/system-wide
- ห้ามดาวน์โหลดหรือรันสคริปต์/โปรแกรมจากแหล่งที่ไม่รู้จักหรือผู้ใช้ไม่ได้ระบุ โดยไม่ถามก่อน

**ต้องขออนุญาตก่อนเสมอ** (แม้จะดูสมเหตุสมผล)
- คำสั่ง git ที่ทำลายประวัติหรือย้อนกลับไม่ได้: `git push --force`, `git reset --hard`, `git clean -fdx`, ลบ branch, rewrite history (`rebase`, `commit --amend` ของ commit ที่มีอยู่, `filter-branch`)
- ลบไฟล์ใดๆ ที่ไม่ใช่ไฟล์ชั่วคราวที่สร้างเองในงานนั้น
- เปลี่ยนแปลงไฟล์นอกขอบเขตงานที่ผู้ใช้ระบุ
- ติดตั้ง dependency/package ใหม่ที่ผู้ใช้ไม่ได้ระบุ

**ความโปร่งใส**
- ก่อนรันคำสั่งเสี่ยง (ลบ/เขียนทับ/force) อธิบายก่อนว่าจะทำอะไร แล้วรอผู้ใช้ยืนยัน ห้ามรันเงียบๆ แล้วบอกทีหลัง
- ไม่แน่ใจว่าคำสั่งปลอดภัยหรือย้อนกลับได้ไหม → ถามก่อนเสมอ ความไม่แน่ใจไม่ใช่เหตุผลให้ลองทำ

**ข้อมูลอ่อนไหว**
- ห้าม commit ไฟล์ที่มีรหัสผ่าน, token, API key หรือข้อมูลส่วนตัวขึ้น git เด็ดขาด — เช็ค `.gitignore` ก่อน commit ทุกครั้ง
- ห้ามพิมพ์หรือ log credential ใดๆ ออกเทอร์มินัล

## ภาพรวม

เว็บส่วนตัวสำหรับทบทวนเนื้อหาก่อนสอบ (นักศึกษา ICT มหิดล ภาคเรียน 1/2569) เป็น **static site ล้วน**
HTML/CSS/JS ไม่มี framework ไม่มี build tool — ห้ามเพิ่มถ้าไม่จำเป็นจริง ถ้าจำเป็นให้ถามผู้ใช้ก่อน

| หน้า | หน้าที่ |
| --- | --- |
| `index.html` | หน้าแรก: hero, ticker คำศัพท์, grid การ์ดรายวิชา (ลิงก์ไปหน้าวิชา), ช่อง placeholder "เพิ่มวิชาใหม่" |
| `network.html` | ITDS231 **บทที่ 1: Intro & Topology** — 3 แท็บ: **เนื้อหา** (accordion 1 อันต่อ 1 ไฟล์สไลด์) · **สรุป** (cheat sheet 13 การ์ด) · **แบบฝึกหัด** (quiz 20 ข้อ) |
| `network-application-layer.html` | ITDS231 **บทที่ 2: Application Layer** (Lecture 3 & 4) — โครง 3 แท็บเดียวกัน: accordion 2 การ์ด · cheat sheet 7 การ์ด · quiz 20 ข้อ |
| `network-data-link-layer.html` | ITDS231 **บทที่ 3: Data Link Layer** (Lecture 5.0–5.2) — accordion 3 การ์ด · cheat sheet 6 การ์ด · quiz 20 ข้อ |
| `network-mac-ethernet.html` | ITDS231 **บทที่ 4: MAC + Ethernet** (Lecture 6.1–6.2) — accordion 2 การ์ด · cheat sheet 8 การ์ด · quiz 20 ข้อ |
| `web-intro-html-basics.html` | ITDS241 **บทที่ 1: Internet & HTML Basics** — **4 แท็บ**: เนื้อหา (accordion 5 การ์ด) · สรุป (6 การ์ด) · แบบฝึกหัด (quiz 20 ข้อ) · **เขียนโค้ด** (24 ข้อ กลุ่ม 1–4) |
| `web-media-forms-semantic.html` | ITDS241 **บทที่ 2: Media, Forms & Semantic** — 4 แท็บ: accordion 4 การ์ด · สรุป 6 การ์ด · quiz 20 ข้อ · เขียนโค้ด (12 ข้อ กลุ่ม 5–6) |
| `web-css-fundamentals.html` | ITDS241 **บทที่ 3: CSS Fundamentals** — 4 แท็บ: accordion 4 การ์ด · สรุป 6 การ์ด · quiz 20 ข้อ · เขียนโค้ด (6 ข้อ กลุ่ม 7) |
| `web-css-layout-responsive.html` | ITDS241 **บทที่ 4: CSS Layout & Responsive** — 4 แท็บ: accordion 4 การ์ด · สรุป 6 การ์ด · quiz 20 ข้อ · เขียนโค้ด (6 ข้อ กลุ่ม 8) |
| `web-js-fundamentals.html` | ITDS241 **บทที่ 5: JavaScript Fundamentals** (Lecture 06) — 4 แท็บ: accordion 5 การ์ด · สรุป 6 การ์ด · quiz 20 ข้อ · เขียนโค้ด (6 ข้อ กลุ่ม 9, mode js) |
| `web-js-functions-oop-dom.html` | ITDS241 **บทที่ 6: Functions, OOP & DOM** (Lecture 07) — 4 แท็บ: accordion 5 การ์ด · สรุป 6 การ์ด · quiz 20 ข้อ · เขียนโค้ด (6 ข้อ กลุ่ม 10, mode js + fixture) |
| `web-ecmascript-features.html` | ITDS241 **บทที่ 7: ECMAScript Features** (ES6 → ES2026) — **3 แท็บ** (ไม่มีแท็บเขียนโค้ด): accordion 5 การ์ด · สรุป 6 การ์ด · quiz 20 ข้อ |
| `se-foundation-pm.html` | ITDS261 **บทที่ 1: SE Foundation & Project Management** (L1) — 3 แท็บ: accordion 5 การ์ด · สรุป 7 การ์ด · quiz 20 ข้อ |
| `se-process-models.html` | ITDS261 **บทที่ 2: Software Process Models** (L2) — accordion 5 การ์ด · สรุป 7 การ์ด · quiz 20 ข้อ |
| `se-requirement-engineering.html` | ITDS261 **บทที่ 3: Requirement Engineering** (L3) — accordion 5 การ์ด · สรุป 7 การ์ด · quiz 20 ข้อ |
| `se-use-case-modeling.html` | ITDS261 **บทที่ 4: Use Case Modeling** (L4 + In-class Zoo Ticketing) — accordion 5 การ์ด · สรุป 7 การ์ด · quiz 20 ข้อ |
| `se-flow-behavior-modeling.html` | ITDS261 **บทที่ 5: Flow & Behavior Modeling (DFD)** (L6 + L7) — accordion 6 การ์ด · สรุป 7 การ์ด · quiz 20 ข้อ |
| `se-ui-design.html` | ITDS261 **บทที่ 6: User Interface Design** (L8) — accordion 4 การ์ด · สรุป 6 การ์ด · quiz 20 ข้อ |

3 วิชา: **Network 4 บท · Web 7 บท · SE 6 บท** — การ์ดใน index ลิงก์ไปบทที่ 1 ของแต่ละวิชา (`network.html`, `web-intro-html-basics.html`, `se-foundation-pm.html`) · ทุกหน้าบทมี **course nav** ต้นหน้า: ปุ่มเลือกวิชา (Network / Web / SE) แล้วตามด้วยลิงก์บทของวิชานั้น
- การ์ด "การออกแบบฐานข้อมูล (7-Eleven Schema)" **ถูกลบแล้ว (session 6)** ตามที่ผู้ใช้สั่ง — เป็นการ์ดตัวอย่างของคอร์สที่เลิกเรียนแล้ว คำใน ticker ที่มาจากคอร์สนั้นถูกแทนด้วยคำจาก 3 วิชาปัจจุบัน · hero SVG (รูปกล่อง 1–N) ยังคงไว้เป็นภาพตกแต่ง

### ⚠️ กฎเรื่องเนื้อหา (สำคัญ) — content lock
- เนื้อหาวิชา, คำถาม quiz 20 ข้อ, ตัวเลือก, คำตอบ (`data-answer`) และคำอธิบายใน **ทุกหน้าบท: `network.html`, `network-application-layer.html`, `network-data-link-layer.html`, `network-mac-ethernet.html`, `web-intro-html-basics.html`, `web-media-forms-semantic.html`, `web-css-fundamentals.html`, `web-css-layout-responsive.html`, `web-js-fundamentals.html`, `web-js-functions-oop-dom.html`, `web-ecmascript-features.html`, `se-foundation-pm.html`, `se-process-models.html`, `se-requirement-engineering.html`, `se-use-case-modeling.html`, `se-flow-behavior-modeling.html`, `se-ui-design.html`** **ห้ามแก้/ลบ** เมื่อทำงานด้าน UI — ปรับได้แค่ markup/class/ดีไซน์/interaction (เช่น course nav)
- **SE ITDS261 บทที่ 1–6 (session 6, lock แล้ว)**: เนื้อหาและ quiz มาจาก**สรุปที่ผู้ใช้พิมพ์ให้ในแชท** + ตรวจทานกับ PDF ต้นฉบับ (ดึงข้อความด้วย `.cache/pdftext.mjs` — ไม่ได้ render ภาพ จึงอ่านได้เฉพาะข้อความ ภาพในสไลด์อ่านไม่ได้) · คำถาม/ตัวเลือก/เฉลยตรงตัวตามผู้ใช้ (ก=a ข=b ค=c ง=d) — **ห้ามเปลี่ยนเฉลยหรือสลับตัวเลือก** · `.q-explain` เขียนโดย Claude อ้างจากสไลด์/เนื้อหาที่ผู้ใช้ให้
  - ไฟล์ต้นฉบับใน Downloads: `2026 - ITDS261 - L1 - SE foundation SPM.pdf` (บท 1) · `L2- Process models.pdf` (บท 2) · `L3 - Requirement Engineering.pdf` (บท 3) · `L4 - Use case modeling.pdf` + `In-class - Use case modeling (Zoo Ticketing System).pdf` (บท 4) · `L6 - Requirements Modeling Flow and Behavior I.pdf` + `L7 - … II.pdf` (บท 5) · `L8 - User Interface Design.pdf` (บท 6) — ทุกไฟล์ขึ้นต้นด้วย `2026 - ITDS261 - `
  - เฉลยบทที่ 1 = `bbbbabbabaaabbbbbaba` · บทที่ 2 = `bbbbbabbbabaabbbaaaa` · บทที่ 3 = `aaabbaabaaaaaabaaaaa` · บทที่ 4 = `babbbaabbbbbababbaba` · บทที่ 5 = `babbbabbbbabbbbabbaa` · บทที่ 6 = `abbaaaabbbbbababaaab`
  - **Zoo Ticketing System (บท 4 การ์ด 05, บท 5 การ์ด 06) = บริบทอ้างอิงเท่านั้น** — เอกสารต้นฉบับเป็นแบบฝึกหัดเปล่าไม่มีเฉลย **ห้ามวาด use case diagram / เขียน narrative / วาด DFD ของระบบนี้** · user story + acceptance criteria ของการซื้อตั๋วสวนสัตว์ในบท 3 มาจากสไลด์ 3-43/3-44 จริง (ไม่ใช่ส่วนของแบบฝึกหัด)
  - ตัวอย่างที่ Claude สร้างขึ้นและติดป้ายไว้ชัดเจนว่า "ไม่ได้มาจากสไลด์": use case diagram + narrative ระบบยืม-คืนหนังสือ (บท 4) · decision table ที่แปลงจาก PDL Analyze Triangle (บท 5) · ภาพ low vs high fidelity (บท 6) · แผนภาพ inheritance ใช้ชื่อสมมติ X/Y · แผนภาพ balancing และ "Don't break DFD rules" วาดใหม่อย่างย่อ
  - สิ่งที่สไลด์เป็นภาพล้วนจึง**ไม่ได้วาด**: DFD ของ Library Query System (6-35–6-37), decision table ตัวอย่าง (7-18), Structured English constructs (7-15/16), ตาราง Spotify vs HealthCare (2-30) · ตัวอย่าง context diagram ใช้ "digital video processor" (6-21) แทน เพราะมีข้อความครบ
  - ตาราง Agile vs Traditional: สไลด์แยก Complexity กับ Overhead เป็น 2 แถว (ค่าเหมือนกัน) — หน้าเว็บรวมเป็นแถวเดียวให้ครบ "6 มิติ" ตามที่ผู้ใช้ระบุ พร้อมหมายเหตุ
  - Initial Schedule Estimate (บท 1) — จับคู่ task/คน/เวลาจากลำดับข้อความในสไลด์ 1-72 และตรวจเวลาแล้วตรงกับตัวเลขในแผนภาพ PERT 1-71
- **แท็บ "แบบฝึกหัด" (quiz) ห้ามแตะเด็ดขาด** ทุกหน้า — ถ้าต้องแก้แท็บเนื้อหาให้ใช้วิธี splice เฉพาะ `<section id="content">` แล้วตรวจว่าส่วนสรุป + quiz เหมือนเดิมทุกไบต์
- **ขยายแท็บเนื้อหา Network บทที่ 1–4 (session 4, ผู้ใช้อนุญาต)**: เนื้อหาในแท็บ "เนื้อหา" ถูกเขียนเพิ่มจาก **PDF ต้นฉบับโดยตรง** (อ่านด้วย PyMuPDF, หน้าที่เป็นรูปถูก render แล้วอ่านภาพ) — กฎคือ **ห้ามเพิ่มข้อมูลที่ไม่ได้มาจากสไลด์** (รวมถึง "เหตุผล" ที่สไลด์ไม่ได้เขียน) ตัวอย่างตัวเลขต้องมีวิธีทำทีละขั้น · แท็บสรุปและ quiz ไม่ได้แก้
  - บทที่ 2: สไลด์ HTTP พื้นฐานจริงอยู่ใน `chapter2_application layer_1-1.pdf` (slide 28–47) ไม่ใช่ไฟล์ Lecture4 — ป้ายไฟล์ของการ์ดถูกแก้ให้ตรงแล้ว
  - เครื่องคิด transmission/propagation delay อยู่ในบทที่ 1 (สูตรเป็นของบทที่ 1) แม้ผู้ใช้จะเขียนว่าบทที่ 2
  - บทที่ 4 หน้าเนื้อหาตอนนี้แสดง Type = 2 ไบต์ และ CRC = 4 ไบต์ เพราะมีในสไลด์ Lecture 6.2 หน้า 16 (18 bytes of header and trailer)
- **บทที่ 3 และ 4 (lock แล้ว)**: เนื้อหาเดิม + quiz มาจากสรุปที่ผู้ใช้พิมพ์ให้ในแชท (สกัดจาก `ITDS231-Lecture5.0-DLP-Foundation-2026.pdf`, `ITDS231-Lecture5.1-Error-Detection-2026.pdf`, `ITDS231-Lecture5.2-Flow-Control-2026.pdf`, `ITDS231-Lecture6.1-MAC-n-2026.pdf`, `ITDS231-Lecture6.2-Ethernet-2026.pdf` ใน Downloads) คำถาม/ตัวเลือก/เฉลยตรงตัวตามผู้ใช้
  - เฉลยบทที่ 3 = `bbbbbbbbbbbbbbabbabb` (ข้อ 15=A, 18=A, ที่เหลือ B)
  - เฉลยบทที่ 4 = `cbbbbbbbbbbbcbbbbbba` (ข้อ 1=C, 13=C, 20=A, ที่เหลือ B)
  - `.q-explain` ของบทที่ 3–4 เขียนโดย Claude อ้างจากเนื้อหาที่ผู้ใช้ให้เท่านั้น
  - cheat sheet บทที่ 4 การ์ด 06: ขนาด Type (2 ไบต์) และ CRC (4 ไบต์) ติดเครื่องหมาย * พร้อมหมายเหตุไว้ (ตอนนั้นยังไม่ได้อ่านสไลด์ — ภายหลังยืนยันจากสไลด์แล้ว)
  - ข้อสังเกตจากต้นฉบับ (คงไว้): บทที่ 3 ระบุ Ethernet 802.3 เป็น "LLC/SNAP+MAC" แต่บทที่ 4 ระบุว่า Ethernet "ไม่มี LLC" · บทที่ 4 กลุ่มแรกของ multiple access สไลด์เรียกทั้ง "Random access" และ "Contention-based"
- **Web ITDS241 บทที่ 1–2 (lock แล้ว)**: เนื้อหามาจากไฟล์ที่ผู้ใช้ให้ · quiz ใช้คำตอบที่ผู้ใช้กำหนดตรงตัว (ส่วนใหญ่เป็น B — ห้ามสลับตัวเลือกถ้าผู้ใช้ไม่ขอ)
  - เฉลย Web บทที่ 1 = `bbbcbbccbbbcbbbbabbb` · เฉลย Web บทที่ 2 = `bbcbbbbbcbbbbbbbbbbc`
  - โจทย์เขียนโค้ด 36 ข้อ (6 กลุ่มตามที่ผู้ใช้กำหนด) — ไม่มีกลุ่ม audio/video/iframe เพราะไม่อยู่ใน 6 กลุ่มของผู้ใช้
- **Web ITDS241 บทที่ 3–7 (session 5, lock แล้ว)**: เนื้อหา cheat sheet และ quiz เขียนจาก **PDF ต้นฉบับโดยตรง** (PyMuPDF) — กฎเดียวกับ Network: **ห้ามเพิ่มข้อมูลที่ไม่ได้มาจากสไลด์** · ตัวอย่างตัวเลข/ผลลัพธ์ต้องไล่ทีละขั้นได้ · quiz 20 ข้อของบท 3–7 เขียนโดย Claude จากสไลด์ (ผู้ใช้ไม่ได้กำหนดเฉลยมา) จึงกระจาย A–D
  - ไฟล์ต้นฉบับใน Downloads: `69-2-ITDS241-Lecture03-CSS-Part1.pdf` (บทที่ 3) · `69-1-ITDS241-Lecture04-CSS-Part2.pdf` (บทที่ 4) · `ITDS241-Lecture06-JavaScript Part 1.pdf` (บทที่ 5) · `ITDS241-Lecture07-JavaScript Part 2.pdf` (บทที่ 6) · `ITDS241-ECMAScript Version_Updated_2026Aug06.pdf` (บทที่ 7)
  - เฉลยบทที่ 3 = `abbbbbbbbbbbbdbbbbbb` · บทที่ 4 = `bbbbbbbbbbbcbabcabaa` · บทที่ 5 = `bbababbbaababbcbabbb` · บทที่ 6 = `bcbdacbdacbdacdadbba` · บทที่ 7 = `cbdacdabcdabcdabcdab`
  - บทที่ 7 ไม่มีแท็บเขียนโค้ด (ตามที่ผู้ใช้กำหนด) · ฟีเจอร์ที่สไลด์ระบุว่ายังไม่รองรับในเบราว์เซอร์ (pipeline operator, Records/Tuples, Decorators, Temporal API, `Math.sumPrecise`) เขียนเป็นโค้ดตัวอย่างที่**ไม่มี `data-run`** พร้อม callout เตือนไว้
- **บทที่ 2 (lock แล้ว)**: เนื้อหามาจากสรุปที่ผู้ใช้พิมพ์ให้ในแชท (สกัดจาก `chapter2_application layer_1-1.pdf` และ `chapter2_Lecture4_application layer_rev2-1.pdf` ใน Downloads) คำถาม/ตัวเลือก/เฉลยใช้ตามที่ผู้ใช้กำหนดตรงตัว
  - เฉลยบทที่ 2 = `b b b b b b d b b b b b b b b b b a c b` (ข้อ 7=D, 18=A, 19=C, ที่เหลือ B) — **ไม่ได้กระจาย A–D** เพราะผู้ใช้สั่งห้ามเปลี่ยนเฉลย ห้ามสลับลำดับตัวเลือกเองถ้าผู้ใช้ไม่ขอ
  - ข้อความใน `.q-explain` ของบทที่ 2 เขียนโดย Claude โดยอ้างจากเนื้อหาที่ผู้ใช้ให้เท่านั้น (ผู้ใช้ไม่ได้ให้คำอธิบายมา)
- เนื้อหาสรุปมาจาก PDF 3 ไฟล์ของผู้ใช้ (อยู่ใน `C:\Users\bossz\Downloads\`, ไม่ได้อยู่ใน repo และ `*.pdf` ถูก gitignore):
  `Chapter_1_Intro_rev1.pdf` (117 หน้า, ส่วนใหญ่มี text), `ITDS231_Internet_Architecture_rev1.pdf` (20 หน้า) และ `ITDS231_Network_Topography.pdf` (15 หน้า) — สองไฟล์หลังเป็น **รูปภาพล้วน** ต้อง render เป็น PNG แล้วอ่าน (ใช้ PyMuPDF ติดตั้งแบบ `pip install --target .cache/pylib` หลังขออนุญาต; เครื่องนี้ไม่มี poppler)
- ค่าความเร็วสัญญาณ: Chapter 1 ใช้ ~2×10⁸ m/s, สไลด์ Architecture เขียน ~2.5×10⁸ m/s แต่โจทย์ใช้ 2×10⁸ — หน้าเว็บระบุทั้งสองแบบไว้แล้ว
- quiz บทที่ 1: เฉลยกระจาย A/B/C/D อย่างละ 5 ข้อ

## โครงสร้างไฟล์

```
index.html                       หน้าแรก
network.html                     ITDS231 บทที่ 1 (เนื้อหาทั้งหมดอยู่ใน HTML ไฟล์นี้)
network-application-layer.html   ITDS231 บทที่ 2 (ใช้ network.css / network.js ร่วมกันทุกบท)
network-data-link-layer.html     ITDS231 บทที่ 3
network-mac-ethernet.html        ITDS231 บทที่ 4
web-intro-html-basics.html       ITDS241 บทที่ 1 (4 แท็บ รวมเขียนโค้ด)
web-media-forms-semantic.html    ITDS241 บทที่ 2
web-css-fundamentals.html        ITDS241 บทที่ 3
web-css-layout-responsive.html   ITDS241 บทที่ 4
web-js-fundamentals.html         ITDS241 บทที่ 5
web-js-functions-oop-dom.html    ITDS241 บทที่ 6
web-ecmascript-features.html     ITDS241 บทที่ 7 (3 แท็บ ไม่มีเขียนโค้ด)
se-foundation-pm.html            ITDS261 บทที่ 1 (3 แท็บ · data-theme="se")
se-process-models.html           ITDS261 บทที่ 2
se-requirement-engineering.html  ITDS261 บทที่ 3
se-use-case-modeling.html        ITDS261 บทที่ 4
se-flow-behavior-modeling.html   ITDS261 บทที่ 5
se-ui-design.html                ITDS261 บทที่ 6
assets/
  favicon.svg           โลโก้ (3 โหนดเชื่อมกัน) ใช้เป็น favicon + wordmark
  css/
    tokens.css          design tokens (palette 3 วิชา + semantic tokens + ธีมต่อวิชา, ฟอนต์ ระยะ radius เงา motion) — แก้สีที่นี่ที่เดียว
    base.css            reset, typography, header, .btn, .chip, .card, .table-scroll, .formula, footer, [hidden]
    home.css            เฉพาะ index.html (hero, ticker, subject cards)
    network.css         หน้าบททุกวิชา: course nav, tabs, accordion, topic content (.frame, callout, diagram/dg-*, code-block, render-preview),
                        widget ทุกตัว (demo-box, calc-steps, rtt-*, arq-*, bit-row, long-division, bo-*), cheat sheet, quiz
    exercise.css        เฉพาะแท็บเขียนโค้ด (cx-*) ของหน้า Web
    motion.css          keyframes + transition ของ component ทั้งหมด + prefers-reduced-motion (โหลดเป็นไฟล์สุดท้าย)
  js/
    network.js          tabs (ARIA, arrow keys, #hash), accordion, quiz — ใช้กับหน้า Web ด้วย
    widgets.js          course nav + widget ที่ประกาศด้วย data-widget (ดูหัวข้อ Widgets) · expose window.TotobWidgets
    code-exercise.js    engine แท็บเขียนโค้ด (ดูหัวข้อ Code exercise)
    exercises-web-1.js  โจทย์กลุ่ม 1–4 (window.CODE_EXERCISE_SET id "web-1")
    exercises-web-2.js  โจทย์กลุ่ม 5–6 (id "web-2")
    exercises-web-3.js  โจทย์กลุ่ม 7 — CSS selectors & properties (id "web-3")
    exercises-web-4.js  โจทย์กลุ่ม 8 — CSS layout ด้วย flexbox (id "web-4")
    exercises-web-5.js  โจทย์กลุ่ม 9 — JS ตัวแปร / operator / control flow (id "web-5", mode js)
    exercises-web-6.js  โจทย์กลุ่ม 10 — JS function / OOP / DOM (id "web-6", mode js + fixture)
README.md               คำอธิบายสั้น + วิธี deploy
.nojekyll               ให้ GitHub Pages ไม่ประมวลผล Jekyll
.gitignore
```

ลำดับการโหลด CSS: `tokens → base → (home | network [+ exercise]) → motion` · ธีมเลือกด้วย `<html data-theme="network|web|se">` · JS: `widgets.js → network.js [→ exercises-web-N.js → code-exercise.js]` (defer ทั้งหมด)

## Widgets และแผนภาพ (assets/js/widgets.js)

ทุก widget เป็น progressive enhancement: เนื้อหาต้องอ่านได้ครบโดยไม่มี JS · ตัวเลขทุกค่าต้องมาจากสไลด์
| data-widget | หน้า | markup ที่ต้องมี |
| --- | --- | --- |
| `url-anatomy`, `layout-demo`, `pattern-tester`, `validation-demo` (form) | Web บทที่ 1–2 | ดูตัวอย่างในหน้า Web |
| `selector-lab` | Web บทที่ 3 | `template.sel-source` (HTML ตัวอย่าง มี `data-i` ทุก element), `.sel-node[data-i]`, `button[data-selector]`, `.demo-status` |
| `flex-lab` | Web บทที่ 4 | `.flex-stage`, `.flex-code code`, `button[data-prop][data-value]` (flex-direction/flex-wrap/justify-content/align-items) |
| `mq-lab` | Web บทที่ 4 | `input[type=range]`, `output`, `.mq-frame` (iframe ที่เปลี่ยนความกว้างได้ = จำลอง viewport), `.demo-status` |
| `delay-calc` | Network บทที่ 1 | `[data-input=l/lu/r/d/s/proc/queue]`, ปุ่ม `[data-preset=q1/q2/q3]`, `.demo-status`, `ol.calc-steps` |
| `http-timeline` | บทที่ 2 | `[data-input=objects/rtt/tx]`, `[data-row=non/per] .rtt-track/.rtt-total`, `button[data-mode=both/non/per]`, `.demo-status` |
| `cache-calc` | บทที่ 2 | `[data-input=link/rate/rtt/size/hit]`, `[data-output=hit]`, `.calc-steps` |
| `arq-window` | บทที่ 3 | `button[data-proto=gbn/sr]`, `[data-strip=s/r]`, `.arq-caption`, `.arq-step`, `[data-step=prev/next]` (สถานการณ์ m=3, Frame 1 หาย) |
| `hamming` | บทที่ 3 | `input` (7 บิต d7→d1), `.bit-row`, `.demo-status`, `.calc-steps` |
| `crc-calc` | บทที่ 3 | `[data-input=data/divisor]`, `pre.long-division`, `.calc-steps` |
| `backoff-sim` | บทที่ 4 | `[data-input=tprop]`, `[data-action=collide/example/reset]`, `.demo-status`, `.calc-steps` (Kmax = 15 → abort) |
| `comm-paths` | SE บทที่ 1 | `button[data-people=2/4/6]` (เฉพาะจำนวนคนที่สไลด์ 1-35 ยกตัวอย่าง), `.cp-stage svg`, `.demo-status` — วาดเส้นทุกคู่แล้วนับ (1 / 6 / 15) |
| `triangle-pspec` | SE บทที่ 5 | `[data-input=a/b/c]`, `.demo-status`, `ol.calc-steps` — เดินตาม PDL Analyze Triangle สไลด์ 7-13 (ติดลบ → error, ด้านยาวสุด ≥ ผลรวม → type 0) |
- `ul.pct-bars` (SE บทที่ 1): แถบเปอร์เซ็นต์ `li > span + .pct-track > .pct-fill[style=--pct] + .pct-val` — ต้องมีตัวเลขกำกับเสมอ

- โค้ดตัวอย่าง HTML: `pre.code-block[data-lang=html]` ถูก highlight อัตโนมัติ · ใส่ `data-render` จะมี iframe `sandbox=""` srcdoc แสดงผล (ไม่ใช้ lazy loading — เคยทำให้ว่าง)
- โค้ดตัวอย่าง CSS/JS: `data-lang=css|js` highlight ได้เหมือนกัน · `pre.code-block[data-lang=js][data-run]` จะมีปุ่ม "▶ รันโค้ดนี้" + กล่อง `.run-output` (รันใน iframe sandbox ผ่าน `TotobWidgets.runJs`, มีตัวกันลูปไม่รู้จบและ timeout) · `data-wait="<ms>"` ใช้กับโค้ดที่มี `setTimeout` เพื่อรอผลก่อนสรุป · `data-fixture="<template id>"` ใส่ HTML ตั้งต้นให้กล่องนั้น
- SVG แผนภาพ: `figure.diagram > .diagram-scroll > svg[role=img]` + `<title>/<desc>` + `figcaption` บอกสไลด์ที่มา · class `dg-box(--accent|ok|bad|warn)`, `dg-line(--accent|ok|bad|warn|dash)`, `dg-text(--sm|ok|bad)`, `dg-mono(--sm|warn)` · marker `#arr #arr-muted #arr-ok #arr-bad` ต้องมี `svg.dg-defs` 1 ชุดต่อหน้า (ต่อจาก skip-link) · ห้ามใช้ glyph ที่ฟอนต์ไม่มี (เช่น ①)
- callout: `.callout.callout--def|--warn|--why` + `span.callout-label`

## Code exercise (แท็บ "เขียนโค้ด" เฉพาะหน้า Web)

- panel `#code` (tablist ใช้ `.tabs--4`) มี `#code-exercise` · โหลด `exercise.css`, ไฟล์โจทย์ แล้ว `code-exercise.js`
- รูปแบบข้อมูล `window.CODE_EXERCISE_SET = { id, groups: [{ title, tasks: [{ id, title, level: 1|2|3, mode?: "html"|"js", prompt (HTML), starter?, solution, fixture?, probe?, wait?, checks: [{ hint, test }] }] }] }`
- **mode `"html"` (ค่าเริ่มต้น, ใช้กับโจทย์ HTML และ CSS)**: `DOMParser` parse โค้ด แล้วรัน checks `test: (doc, code, h) => boolean` ตามลำดับ
- **mode `"js"` (บทที่ 5–6)**: โค้ดผู้เรียนรันใน iframe sandbox ผ่าน `TotobWidgets.runJs` แล้ว checks เป็น `test: (r, code, h) => boolean` โดย `r = { logs[], errors[], probe, probeError, loopLimit, timeout, html }`
  - `fixture` = HTML ที่มีอยู่ในหน้าก่อนโค้ดผู้เรียนทำงาน (engine แสดงให้ผู้เรียนเห็นอัตโนมัติ และ preview จะโชว์ผลจริง)
  - `probe` = โค้ดของผู้ออกโจทย์ที่รัน**ต่อจาก**โค้ดผู้เรียนใน sandbox เดียวกัน · ค่าที่ `return` ไปอยู่ใน `r.probe` (ต้อง JSON-serializable) — ใช้เรียกฟังก์ชัน/คลาสของผู้เรียนด้วยค่าทดสอบอื่น หรือ `.click()` ปุ่มเพื่อทดสอบ event
  - `wait` = ms ที่รอก่อนรัน probe (ใส่เฉพาะโจทย์ที่ใช้ `setTimeout`)
- ไม่ผ่าน = แสดง hint ของ check แรกที่ตก + "และยังมีอีก N จุด" (ห้ามให้ hint บอกเฉลยตรงๆ · backtick ใน hint แสดงเป็นโค้ด) · ปุ่ม "ดูเฉลย" แยกต่างหาก
- helpers `h`: `norm`, `text`, `tagInSource`, `doctypeFirst`, `comments`, `commentNodes`, `before`, `ownText`, `outsideForm`, `labelFor`, `attr`, `hasClass` · CSS: `cssRules`, `cssValue`, `cssAppliesTo`, `cssMediaRules`, `sameColor` · JS: `jsCode` (ตัด comment/string ออกก่อนหา keyword), `logs`, `noErrors`
- state: `localStorage["totobtuan:code-exercise:v1:<set id>"] = { current, tasks: { "<id>": { code, status: "pass"|"fail" } } }` (ห่อ try/catch) — ถ้าเปลี่ยนรูปแบบให้ขึ้น `v2`
- editor: Tab/Shift+Tab ย่อหน้า (กด Esc แล้ว Tab เพื่อออกจากช่อง), Enter คงระดับย่อหน้า, Ctrl+Enter ตรวจ, live preview, รีเซ็ตข้อ/ทั้งหมด (confirm)
- ทดสอบ: `window.TotobCodeExercise.validate(id, code)` (async) — ทุก solution ต้องผ่าน · โค้ดว่างต้องไม่ผ่าน · `starter` ต้องไม่ผ่าน · ควรทดสอบ "เฉลยปลอม" (hardcode ค่า / ใช้วิธีที่โจทย์ห้าม) ว่าไม่ผ่านด้วย

## Design system — 3 ธีมประจำวิชา บนพื้นมืดแบบเดียวกัน

พื้นหลังทุกวิชาเป็นโทนมืดเกือบดำ ต่างกันแค่ undertone · **accent** (ปุ่ม ลิงก์ ขอบ active ไฮไลต์ tab) แยกสีตามวิชา

| วิชา | ธีม | `data-theme` | พื้น (surface-900) | accent-400 | tint (accent-900) |
| --- | --- | --- | --- | --- | --- |
| Network ITDS231 | **Blueprint** — ink-navy + amber | `network` | `#0f151c` | amber `#e8a33d` | navy blueprint `#15304c` |
| Web ITDS241 | **Iris & Graphite** — graphite อมม่วง + iris (จงใจไม่ใช้ม่วง Tailwind) | `web` (= ค่าเริ่มต้น, ใช้กับ index ด้วย) | `#17151a` | iris `#ab92e6` | `#241d33` |
| SE ITDS261 | **Moss & Charcoal** — charcoal อมเขียว + sage/มอส (ไม่ใช่เขียว Tailwind) | `se` | `#121815` | sage `#7fae8f` | `#1c2a22` |

**โครงสร้าง token (tokens.css)**
- **Palette** ต่อวิชา: `--graphite-*`/`--iris-*` (Web) · `--ink-*`/`--amber-*`/`--blueprint-800|900` (Network) · `--moss-*`/`--sage-*` (SE) — ห้ามใช้ palette ตรงๆ ใน component
- **Semantic tokens** ที่ component ใช้: `--surface-950/900/850/800/750` · `--accent-200/300/400/500/600/800/900` · `--text`, `--text-muted`, `--text-faint`, `--text-on-accent` · `--border-subtle/--border/--border-strong` · สำหรับ rgba ใช้ `rgba(var(--accent-500-rgb), a)` (มี `--accent-300/400/500/600-rgb`, `--surface-950/900/850-rgb`)
- `:root` = ธีม Web · `:root[data-theme="network"]` และ `:root[data-theme="se"]` map semantic tokens ไป palette ของวิชานั้น (รวม text/border ที่อม undertone)
- **สีประจำวิชา** ใช้ได้ทุกหน้า: `--subject-network` / `--subject-web` / `--subject-se` — ใช้กับแถบซ้าย + chip รหัส + ลิงก์ของการ์ดวิชาใน index (`.subject-card--network|web|se`, ผสมพื้นด้วย `color-mix`) และจุดสีในปุ่มเลือกวิชา (`.subject-btn::before`) · พื้นการ์ดทุกใบเหมือนกัน
- หน้าบทใส่ `<html lang="th" data-theme="…">` และ `<meta name="theme-color">` = surface-900 ของวิชา (build.mjs ใส่ให้จาก `.cache/course.mjs`)
- สิ่งที่ยังเป็นสีตายตัว: semantic success/danger/warn (เหมือนกันทุกธีม), favicon และ hero SVG ใน index (ม่วง — เป็นโลโก้ของเว็บ)

**Contrast (WCAG) — ตรวจด้วย `.cache/contrast.mjs`, ผ่าน AA ทุกธีม**
| คู่สี | Web | Network | SE |
| --- | --- | --- | --- |
| text / surface-900 | 15.0 | 15.6 | 15.1 |
| text-muted / surface-900 · surface-800 | 7.4 · 6.5 | 8.4 · 7.2 | 8.0 · 6.9 |
| text-faint / surface-900 · surface-800 | 5.5 · 4.8 | 6.3 · 5.4 | 5.9 · 5.1 |
| text-on-accent / accent-400 | 7.0 | 8.5 | 7.5 |
| accent-300 / surface-850 (ลิงก์) | 9.1 | 10.1 | 9.6 |
| accent-200 / accent-900 (chip, ตัวเลือกที่เลือก) | 11.2 | 10.1 | 11.4 |
| accent-500 / surface-850 (ใช้แค่ bullet marker = non-text, เกณฑ์ 3:1) | 4.5 | 5.9 | 5.2 |

**Semantic (เฉลย quiz)**: success `#7fcfa6` บน `#17271f` (ขอบ `#3c6e55`) · danger `#ef9a9a` บน `#2c1a1d` (ขอบ `#7a3c43`) · warn `#e6c27a` (ข้อที่ยังไม่ตอบ, tag "Shared") — ใช้เหมือนกันทุกธีม · ข้อควรรู้: ในธีม SE สี success (เขียวมิ้นต์) ใกล้ accent sage และในธีม Network สี warn ใกล้ accent amber — แยกได้ด้วยไอคอน/ข้อความที่มากับสถานะเสมอ

**ฟอนต์** (Google Fonts)
- หัวข้อ: `Bricolage Grotesque` (ละติน) + `IBM Plex Sans Thai` (ไทย, แบบไม่มีหัว)
- เนื้อหา: `IBM Plex Sans Thai Looped` (ไทยแบบมีหัว อ่านย่อหน้ายาวง่ายกว่า)
- mono/สูตร/label: `IBM Plex Mono` (fallback ไทย → Plex Sans Thai)
- line-height เนื้อหา 1.75 (สระบน-ล่างภาษาไทย)

**หลักการ**
1. สีทุกค่าต้องมาจาก **semantic token** (`--surface-*`, `--accent-*`, `--text-*`, `--border-*`) — ห้าม hardcode hex หรืออ้าง palette ของวิชาใดวิชาหนึ่งใน component (ยกเว้น SVG ตกแต่งใน index) ไม่อย่างนั้นธีมวิชาอื่นจะเพี้ยน
2. ข้อความเล็กต้องผ่าน WCAG AA (≥ 4.5:1)
3. Animation ต้อง "บอกอะไร" (สถานะเปลี่ยน/ทิศทาง/ผลลัพธ์) ไม่ใส่ตกแต่ง — ไม่ animate ตอนโหลดหน้า; การ์ดที่คลิกไม่ได้ (cheat sheet) ไม่มี hover lift
4. เคารพ `prefers-reduced-motion` เสมอ (motion.css ตัดเหลือ 1ms, JS เช็ค `matchMedia` ก่อนนับคะแนน/เลื่อนแบบ smooth)
5. Progressive enhancement: ไม่มี JS ต้องอ่านได้ครบ (ใช้ class `.js` บน `<html>` ก่อนซ่อน panel/accordion)
6. มือถือ: ตารางอยู่ใน `.table-scroll` เสมอ, tap target ≥ 44px, ห้ามหน้าเลื่อนแนวนอน (ทดสอบที่ 390px แล้ว)

**Motion tokens**: `--ease-out: cubic-bezier(0.22,1,0.36,1)`, `--dur-fast 140ms`, `--dur 220ms`, `--dur-slow 360ms`

## สถานะล่าสุด

**Session 1 (2026-09-15)**
- [x] git init (branch `main`), commit แยกตามงาน
- [x] ออกแบบ token system ใหม่ "Iris & Graphite" แทนธีม blueprint เดิม (น้ำเงิน + amber)
- [x] redesign `index.html` + เพิ่มการ์ด ITDS231 ลิงก์ไป `network.html`; ปุ่ม "เพิ่มวิชาใหม่" เดิมที่กดแล้วไม่ทำอะไร เปลี่ยนเป็น placeholder ที่ไม่ใช่ปุ่ม; ticker หยุดเมื่อ hover (เดิมเปลี่ยนความเร็วทำให้กระโดด)
- [x] **สร้าง `network.html` ใหม่จาก PDF 3 ไฟล์** (ตอนเริ่ม session ไม่มีไฟล์นี้อยู่ ผู้ใช้เลือกให้สร้างจากสไลด์)
- [x] motion: tab indicator เลื่อน + panel fade-up, accordion ยุบ/ขยายนุ่ม, quiz: pop ตอนเลือก, สั่นเมื่อผิด, วงแหวนเมื่อถูก, ไอคอนขีด, คำอธิบายขยาย, คะแนนนับขึ้น, เตือนข้อที่ยังไม่ตอบ
- [x] README, .gitignore, .nojekyll — พร้อม deploy GitHub Pages จาก `main` / root
- [x] ทดสอบด้วย headless Edge (CDP): ตรวจคะแนน, ข้อที่ไม่ตอบ, กรองข้อผิด, รีเซ็ต, reduced motion, deep link, ไม่มี horizontal scroll ที่ 390px

**Session 2 (2026-09-15)**
- [x] ติดตั้ง plugin ระดับผู้ใช้ (`~/.claude/settings.json`): skill-creator, frontend-design, และจาก `anthropics/knowledge-work-plugins`: design, engineering, productivity, product-management, marketing, pdf-viewer
- [x] สร้าง `network-application-layer.html` (บทที่ 2: Application Layer) จากสรุปที่ผู้ใช้ให้ — accordion 2 การ์ด, cheat sheet 7 การ์ด, quiz 20 ข้อ
- [x] chapter switcher (`.chapter-nav`) ต้นหน้าทั้ง 2 บท · ปรับการ์ด ITDS231 ใน index เป็น "2 บท" (ลิงก์ `network.html` มีอยู่แล้วตั้งแต่ session 1)
- [x] เพิ่มหัวข้อ Safety Rules ใน CLAUDE.md · เพิ่ม pattern ไฟล์ความลับใน `.gitignore`
- [x] ทดสอบ headless Edge: คะแนนเต็ม 20, ตอบผิด/ข้าม, reduced motion, ไม่มี horizontal scroll ที่ 390px ทั้ง 2 บท, เฉลยบทที่ 1 ไม่เปลี่ยน, ไม่มี JS error
- [x] เพิ่ม remote `origin` = `https://github.com/Yoshioka1311/ToTobTuan.git` (repo public) และ `git push -u origin main` สำเร็จ — ผู้ใช้ยืนยันให้ push ด้วยอีเมล commit เดิม (violetar1311@gmail.com)
- [x] GitHub Pages — ผู้ใช้เปิดเองแล้ว (API `has_pages: true` ณ session 3) · URL: https://yoshioka1311.github.io/ToTobTuan/ · `gh` บนเครื่องนี้ token หมดอายุ (`gh auth login` ก่อนถ้าจะให้ Claude จัดการ Pages/repo ผ่าน gh)

**Session 3 (2026-09-15)**
- [x] สร้าง `network-data-link-layer.html` (บทที่ 3) และ `network-mac-ethernet.html` (บทที่ 4) จากสรุปที่ผู้ใช้ให้ — เฉลยตรงตามผู้ใช้ (ดู content lock)
- [x] component ใหม่ `.frame` / `.frame-scroll` (แผนภาพลำดับฟิลด์ในเฟรม) ใน network.css
- [x] chapter switcher ครบ 4 บทในทุกหน้า · มือถือแสดงเป็น grid 2×2 · การ์ด ITDS231 ใน index เป็น "4 บท"
- [x] ทดสอบ headless Edge ทั้ง 4 บท: เฉลยตรงกับที่กำหนด, คะแนนเต็ม 20, ไม่มี id ซ้ำ, ลิงก์ toc ไม่เสีย, aria-current ถูกหน้า, ไม่มี horizontal scroll ที่ 390px ทุกแท็บ, reduced motion, ไม่มี JS error
- [x] commit แยกต่อบท แล้ว push `origin/main`

**Session 4 (2026-09-15)** — prompt 3 ส่วน (ลำดับทำ 2 → 3 → 1)
- [x] **Web ITDS241**: สร้าง `web-intro-html-basics.html` และ `web-media-forms-semantic.html` (เนื้อหาละเอียด + widget + render preview + quiz ตามเฉลยผู้ใช้) · course nav (เลือกวิชา → บท) ทุกหน้าบท · การ์ด Web ใน index
- [x] **แท็บเขียนโค้ด** (เฉพาะหน้า Web): `code-exercise.js` + โจทย์ 36 ข้อ ตรวจด้วย DOMParser, ไม่เฉลยตรง, ปุ่มดูเฉลย, บันทึก localStorage — ทดสอบแล้วว่าทุก solution ผ่าน / โค้ดว่างไม่ผ่าน
- [x] **ขยายแท็บเนื้อหา Network บทที่ 1–4** จาก PDF ต้นฉบับ (commit แยกต่อบท): บทที่ 2 เขียนการ์ดใหม่ 5 ใบ (+ HTTP objects diagram, http-timeline, cache-calc, HOL/DNS/mail diagram) · บทที่ 3 เขียนใหม่ทั้งแท็บ (+ crc-calc, hamming, arq-window) · บทที่ 4 เขียนใหม่ทั้งแท็บ (+ ผัง CSMA/CD, ผัง switch MAC learning, backoff-sim) · บทที่ 1 เพิ่มแผนภาพ ISP/IXP (วาดตามสไลด์ 1-57), delay-calc, วิธีทำทีละขั้น และ callout
- [x] เพิ่ม `[hidden] { display: none !important; }` ใน base.css (แก้ปุ่ม/ผล quiz ที่ควรซ่อนแต่ยังแสดง)
- [x] ทดสอบ headless Edge ทุกหน้า: เฉลย quiz ไม่เปลี่ยน, ไม่มี id ซ้ำ, ลิงก์ toc ครบ, widget คำนวณตรงกับตัวอย่างในสไลด์, ไม่มี horizontal scroll ที่ 390px, ไม่มี JS error
- เครื่องมือชั่วคราว (PyMuPDF ใน `.cache/pylib`, สคริปต์ CDP `.cache/shoot.mjs`, `.cache/splice.mjs`) ถูกลบเมื่อจบงานตาม Safety Rules — ถ้าต้องอ่าน PDF อีกให้ขออนุญาตติดตั้ง PyMuPDF ลง `.cache/` ใหม่

**Session 5 (2026-09-16) — เพิ่ม Web บทที่ 3–7 + code exercise กลุ่ม 7–10 (เสร็จครบ)**
- [x] engine: JS sandbox runner (`TotobWidgets.runJs`), highlight CSS/JS, code block `data-run`, validate แบบ async + mode `js`, CSS helpers (`cssRules`, `cssValue`, `sameColor`)
- [x] บทที่ 3 `web-css-fundamentals.html` + `exercises-web-3.js` (กลุ่ม 7 · selector-lab)
- [x] บทที่ 4 `web-css-layout-responsive.html` + `exercises-web-4.js` (กลุ่ม 8 · flex-lab, mq-lab)
- [x] บทที่ 5 `web-js-fundamentals.html` + `exercises-web-5.js` (กลุ่ม 9, mode js)
- [x] บทที่ 6 `web-js-functions-oop-dom.html` + `exercises-web-6.js` (กลุ่ม 10, mode js + fixture) — accordion 5 การ์ด, แผนภาพ class instantiation + DOM tree, โค้ด `data-run` 16 กล่อง, `data-render` 8 กล่อง
- [x] บทที่ 7 `web-ecmascript-features.html` (ไม่มีแท็บเขียนโค้ด) — ES6 → ES2026 จากสไลด์ ECMAScript Version ทั้ง 124 หน้า
- [x] course nav ครบ 7 บทในทุกหน้าบททุกวิชา (sync ด้วยสคริปต์ชั่วคราว `.cache/nav.mjs` ที่แทนที่เฉพาะบล็อก `<nav class="course-nav">`) · การ์ด ITDS241 ใน index เป็น "7 บท" · README + CLAUDE.md อัปเดตครบ
- [x] ทดสอบ headless Edge บทที่ 5–7: quiz 20/20 ตรงเฉลย, ไม่มี id ซ้ำ, ลิงก์ toc ครบ, `aria-current` ถูกหน้า, ไม่มี horizontal scroll ที่ 390px ทุกแท็บ, ไม่มี JS error, ทุก solution ของ code exercise ผ่าน / โค้ดว่าง + starter + "เฉลยปลอม" ไม่ผ่าน, รันโค้ดทุกกล่อง `data-run` แล้วผลตรงกับคอมเมนต์ในโค้ด (error 3 กล่องเป็นการสาธิต ReferenceError / TypeError โดยตั้งใจ)
- **เครื่องมือที่เก็บไว้ใน `.cache/` (gitignore, ผู้ใช้อนุญาตให้เก็บ)**: `build.mjs` สร้างหน้าบทจาก config (`node .cache/build.mjs w7` อ่าน `w7.mjs` + `w7-content.html` + `w7-summary.html`) · `nav.mjs` sync `<nav class="course-nav">` ให้ทุกหน้าบทตรงกัน (แก้ลำดับบทที่ `NETWORK`/`WEB` ในไฟล์นี้ไฟล์เดียว) · `shoot.mjs` ทดสอบด้วย headless Edge + CDP (`node .cache/shoot.mjs <plan.json>`) · `plan-all.json` plan ตรวจทั้งเว็บ (quiz answers, id ซ้ำ, toc, nav, aria-current) · `pdf.py` อ่าน PDF · `w3.mjs`–`w7.mjs` config ของแต่ละบท (quiz + metadata)
- ไฟล์ `wN-content.html` / `wN-summary.html` ถูกลบหลัง build แล้ว — ถ้าจะแก้เนื้อหาบทเดิมให้แก้ที่ไฟล์ `.html` ของบทนั้นโดยตรง (ระวัง content lock) · PyMuPDF ถูกลบออกจาก `.cache/pylib` แล้ว ถ้าต้องอ่าน PDF อีกให้ขออนุญาตติดตั้งใหม่ (`pip install --target .cache/pylib pymupdf`)

**Session 6 (2026-09-16) — ลบการ์ดเก่า + ระบบสี 3 วิชา + วิชา SE ITDS261 6 บท (เสร็จครบ)**
- สถานะตอนเริ่ม: working tree clean, `main` = `origin/main` → ไม่มีงานค้างจาก session ก่อน (ส่วนที่ 3 ของ prompt จึงไม่มีอะไรต้องทำ) · ผู้ใช้เข้าใจว่า Network ยังใช้ธีม blueprint แต่จริงๆ ถูกแทนด้วย Iris & Graphite ตั้งแต่ session 1 — session นี้จึง**นำ blueprint (navy + amber) กลับมาเป็นธีมของ Network** บนพื้นมืด
- [x] ลบการ์ด "การออกแบบฐานข้อมูล (7-Eleven Schema)" + CSS `.subject-card--pending` + คำ ticker ของคอร์สนั้น
- [x] ระบบสี 3 ธีม: refactor CSS ทุกไฟล์ให้ใช้ semantic tokens (`--surface-*`/`--accent-*` + `*-rgb`) แทน `--graphite-*`/`--iris-*` → `data-theme` บน `<html>` ของทุกหน้าบท · การ์ด index มีแถบสีซ้าย/chip/ลิงก์ตามวิชา · ปุ่มเลือกวิชามีจุดสีประจำวิชา · contrast ผ่าน AA ทุกธีม (ตารางในหัวข้อ Design system)
- [x] SE บทที่ 1–6 (`se-*.html`) + การ์ด ITDS261 ใน index + course nav 3 วิชาในทุกหน้าบท 17 หน้า (มือถือ: ปุ่มวิชาเป็น grid 3 คอลัมน์) · ช่อง "เพิ่มวิชาใหม่" เป็นแถบเต็มแถว
- [x] widget ใหม่: `comm-paths`, `triangle-pspec` · component ใหม่ `.pct-bars`
- [x] ตรวจ content lock: หน้าเดิม 11 หน้าเปลี่ยนเฉพาะบล็อก course nav + `<html data-theme>` (+ theme-color ของ Network) · panel `#summary` และ `#quiz` เหมือนก่อน session ทุกไบต์ (เทียบ md5 กับ `c14deba`)
- [x] ทดสอบ headless Edge ทั้ง 18 หน้า: quiz SE ทุกบทได้ 20/20 ตามเฉลยผู้ใช้, ไม่มี id ซ้ำ, toc ครบ, nav 4/7/6 + aria-current/aria-pressed ถูก, ไม่มี JS error, SE ไม่มี horizontal scroll ที่ 390px ทุกแท็บ · widget: comm-paths ได้ 1/6/15, triangle-pspec ถูกทุกกรณี (equilateral/isosceles/scalene/type 0/error)
- **อ่าน PDF โดยไม่ต้องติดตั้งอะไร**: `.cache/pdftext.mjs` (zlib ในตัว Node + ToUnicode CMap) → `node .cache/pdftext.mjs "<pdf>" [from] [to]` ได้ข้อความทีละหน้า · ใช้ได้กับ PDF ที่ export จาก macOS/PowerPoint ที่มี text · **อ่านภาพไม่ได้** (Read tool render PDF ไม่ได้เพราะไม่มี poppler และ PDF viewer ของ Edge headless ไม่ render)
- **เครื่องมือใน `.cache/` (เพิ่ม/เปลี่ยน)**: `course.mjs` = รายชื่อวิชา/บท/ธีม + `navHtml()` ที่เดียว (ใช้โดย `build.mjs` และ `nav.mjs`) · `build.mjs` เลือก subject/theme/footer จาก course.mjs ตามชื่อไฟล์ · `se1.mjs`–`se6.mjs` config quiz ของ SE · `se-plan.mjs` สร้าง plan ทดสอบหน้าบท (`node .cache/se-plan.mjs <file> <prefix> [selector…] > plan.json` แล้วรัน shoot.mjs) · `contrast.mjs` ตรวจ contrast 3 ธีม · ไฟล์ `seN-content.html` / `seN-summary.html`, ภาพ screenshot และข้อความที่ดึงจาก PDF ถูกลบหลังจบงาน

## สิ่งที่ยังไม่ได้ทำ / แผนต่อไป

- (ถ้าผู้ใช้ต้องการ) สลับลำดับตัวเลือก quiz บทที่ 2 ให้เฉลยกระจาย A–D — ต้องได้รับอนุญาตก่อน เพราะเปลี่ยนตัวอักษรของเฉลย
- เพิ่มหน้าวิชาอื่นเมื่อผู้ใช้ให้เนื้อหา — ดู "วิธีเพิ่มวิชาใหม่" ด้านล่าง (วิชาฐานข้อมูล 7-Eleven Schema ผู้ใช้แจ้งว่าเลิกเรียนแล้ว ไม่ต้องทำ)
- **พบใน session 6 (มีมาก่อน ไม่ใช่ regression)**: ที่ 390px หน้า Web บางแท็บเลื่อนแนวนอนได้เล็กน้อย — `web-intro-html-basics.html` แท็บแบบฝึกหัด (scrollWidth 485), `web-media-forms-semantic.html` แท็บสรุป (392), `web-ecmascript-features.html` ทุกแท็บ (405) · ค่าเท่ากันเป๊ะกับ commit `c14deba` ก่อน session · ยังไม่ได้หาสาเหตุ (แก้ได้ด้วย CSS โดยไม่แตะเนื้อหา)
- (ถ้าผู้ใช้ต้องการ) SE: ยังไม่มี widget/แบบฝึกวาดไดอะแกรม · ภาพที่อยู่ในสไลด์ (เช่น DFD Library Query System, Structured English constructs) ยังไม่ได้ใส่เพราะอ่านได้แค่ข้อความ
- ITDS231 หัวข้อที่ยังไม่มีในเว็บ: Data & Signals, VLAN, STP — เพิ่มเป็นหน้าบทใหม่ตาม pattern หลายบทเมื่อผู้ใช้ให้เนื้อหา
- (ถ้าผู้ใช้ต้องการ) โจทย์เขียนโค้ดของบทที่ 7 (ECMAScript) — ตอนนี้ไม่มีตามที่ผู้ใช้กำหนด
- (ถ้าผู้ใช้ต้องการ) สลับลำดับตัวเลือก quiz บทที่ 3–4 และ Web บทที่ 1–2 ให้เฉลยกระจาย A–D (ตอนนี้ส่วนใหญ่เป็น B) — ต้องขออนุญาตก่อน
- (ถ้าผู้ใช้ต้องการ) โจทย์เขียนโค้ดกลุ่ม media (audio/video/iframe) — ตอนนี้ไม่มีเพราะไม่อยู่ใน 6 กลุ่มที่ผู้ใช้กำหนด
- course nav: 3 วิชา (4/7/6 บท) — desktop ยังพอดีแบบ wrap, มือถือปุ่มวิชา 3 คอลัมน์ + บทเรียง 2 คอลัมน์ · ถ้าเพิ่มวิชา/บทอีกควรเปลี่ยนเป็น dropdown หรือ scroll แนวนอน
- ไอเดีย (ยังไม่ได้ขอ): จำคำตอบ quiz ด้วย localStorage, ธีมสว่าง, สุ่มลำดับคำถาม

## วิธีเพิ่มบทใหม่ในวิชาเดิม (pattern หลายบท)

วิชาเดียว = หลายไฟล์ .html (1 ไฟล์ต่อ 1 บท) ใช้ `network.css` + `widgets.js` + `network.js` ร่วมกัน ไม่ต้องแก้ JS (Network ใช้ prefix `network-` · Web ใช้ `web-` · SE ใช้ `se-`)
- ทางลัด: เพิ่มบทใน `.cache/course.mjs` → เขียน `.cache/<key>.mjs` (metadata + quiz 20 ข้อ + `answers`) + `<key>-content.html` + `<key>-summary.html` → `node .cache/build.mjs <key>` → `node .cache/nav.mjs` (sync nav ทุกหน้า)
1. ตั้งชื่อ `<subject>-<topic>.html` (lowercase, คั่นด้วย `-`) เช่น `network-transport-layer.html` · บทที่ 1 คงชื่อ `network.html` ไว้เพราะมีลิงก์จาก index และ deep link เดิม
2. คัดลอกโครงจากหน้าบทล่าสุด: header, `.course-hero`, tabbar, 3 panel (`#content` / `#summary` / `#quiz`), `quiz-result`, `quiz-bar` — id เหล่านี้ JS ใช้ ห้ามเปลี่ยนชื่อ
3. **course nav**: `nav.course-nav` มี `.subject-switch` (ปุ่ม `.subject-btn[data-subject]`) และ `.chapter-nav[data-subject]` ต่อวิชา — เพิ่ม `<a class="chapter-link">` ของบทใหม่ใน `.chapter-nav` ของวิชานั้นใน**ทุกหน้าบททุกวิชา** (ลำดับเดียวกัน) และใส่ `aria-current="page"` เฉพาะลิงก์ของหน้าตัวเอง · ปุ่มวิชาของหน้านั้นต้อง `aria-pressed="true"`
4. id ของหัวข้อย่อยใช้ prefix ต่อบท (บทที่ 2 `app-*` `http-*` · บทที่ 3 `dl-*` `err-*` `fc-*` · บทที่ 4 `mac-*` `eth-*` · Web ดูในไฟล์) เพื่อไม่ชนกันเวลาลิงก์ข้ามหน้า
   - SE: บท 1 `sef-*` `pm-*` · บท 2 `proc-*` · บท 3 `re-*` · บท 4 `uc-*` · บท 5 `dfd-*` · บท 6 `ui-*`
   - cheat sheet grid 3 คอลัมน์: จัดให้ (จำนวนการ์ดกว้าง × 2 + การ์ดปกติ) หาร 3 ลงตัว จะไม่มีช่องว่างท้าย
5. การ์ดใน index ชี้บทที่ 1 ของวิชา — อัปเดตแค่ chip จำนวนบทและ `card-sub`
6. เพิ่มแถวในตารางหน้าใน CLAUDE.md + README และบันทึกว่าเนื้อหาบทใหม่ถูก lock

## วิธีเพิ่มวิชาใหม่

1. คัดลอก `network.html` เป็น `<subject>.html` (lowercase, ไม่มีช่องว่าง — GitHub Pages แยกตัวพิมพ์เล็ก/ใหญ่) แล้วเปลี่ยนเนื้อหาใน 3 แท็บ
2. ใช้ `assets/css/network.css` + `assets/js/widgets.js` + `assets/js/network.js` ได้เลย · เพิ่มวิชาใน `.cache/course.mjs` แล้วรัน `nav.mjs` (เพิ่มปุ่มวิชาและ `.chapter-nav` ในทุกหน้าบท) · ถ้าปุ่มวิชาเกิน 3 ต้องปรับ grid มือถือของ `.subject-switch` (ถ้าไม่มี quiz ต้องปรับ JS ให้ข้ามส่วน quiz เมื่อไม่มี `#quiz-form`)
3. **ธีมสี**: เพิ่ม palette + บล็อก `:root[data-theme="<key>"]` ใน tokens.css (map `--surface-*`, `--accent-*`, `*-rgb`, text, border) และ `--subject-<key>` · ตรวจ contrast ด้วย `.cache/contrast.mjs` · เพิ่ม `.subject-card--<key>` ใน home.css และ `.subject-btn[data-subject="<key>"]` (จุดสี) ใน network.css
4. เพิ่มการ์ด `<a class="subject-card subject-card--<key>" href="<subject>.html">` ใน `index.html`
5. ลิงก์ทุกอันต้องเป็น relative path (ไม่ขึ้นต้นด้วย `/`) เพราะ Pages อยู่ใต้ `/<repo>/`

## คำสั่งที่ใช้บ่อย

```bash
# เปิดดูบนเครื่อง (หรือดับเบิลคลิก index.html)
python -m http.server 8000        # แล้วเปิด http://localhost:8000

git log --oneline
```

- **Commit บน Windows PowerShell 5.1**: ข้อความที่มี `"` จะถูกตัดเป็น pathspec — เขียนข้อความลงไฟล์แล้วใช้ `git commit -F <file>`
- git identity ตั้งไว้เฉพาะ repo นี้ (`git config user.name/user.email`)
- ทดสอบ UI: headless Edge อยู่ที่ `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` ใช้ `--headless=new --remote-debugging-port` + Node 24 (มี `WebSocket` ในตัว) ส่งคำสั่ง CDP เพื่อคลิก/ถ่าย screenshot ได้โดยไม่ต้องติดตั้งอะไรเพิ่ม
