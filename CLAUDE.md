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

การ์ด "การออกแบบฐานข้อมูล (7-Eleven Schema)" ใน index เป็นเนื้อหาเดิมของผู้ใช้ ยังไม่มีหน้าของตัวเอง
การ์ด ITDS231 ใน index ลิงก์ไป `network.html` (บทที่ 1) ที่เดียว แล้วสลับบทด้วย chapter switcher ต้นหน้า

### ⚠️ กฎเรื่องเนื้อหา (สำคัญ) — content lock
- เนื้อหาวิชา, คำถาม quiz 20 ข้อ, ตัวเลือก, คำตอบ (`data-answer`) และคำอธิบายใน **`network.html` และ `network-application-layer.html`** **ห้ามแก้/ลบ** เมื่อทำงานด้าน UI — ปรับได้แค่ markup/class/ดีไซน์/interaction
- **บทที่ 2 (lock แล้ว)**: เนื้อหามาจากสรุปที่ผู้ใช้พิมพ์ให้ในแชท (สกัดจาก `chapter2_application layer_1-1.pdf` และ `chapter2_Lecture4_application layer_rev2-1.pdf` ใน Downloads — ไม่ได้อ่าน PDF เอง) คำถาม/ตัวเลือก/เฉลยใช้ตามที่ผู้ใช้กำหนดตรงตัว
  - เฉลยบทที่ 2 = `b b b b b b d b b b b b b b b b b a c b` (ข้อ 7=D, 18=A, 19=C, ที่เหลือ B) — **ไม่ได้กระจาย A–D** เพราะผู้ใช้สั่งห้ามเปลี่ยนเฉลย ห้ามสลับลำดับตัวเลือกเองถ้าผู้ใช้ไม่ขอ
  - ข้อความใน `.q-explain` ของบทที่ 2 เขียนโดย Claude โดยอ้างจากเนื้อหาที่ผู้ใช้ให้เท่านั้น (ผู้ใช้ไม่ได้ให้คำอธิบายมา)
- เนื้อหาสรุปมาจาก PDF 3 ไฟล์ของผู้ใช้ (อยู่ใน `C:\Users\bossz\Downloads\`, ไม่ได้อยู่ใน repo และ `*.pdf` ถูก gitignore):
  `Chapter_1_Intro_rev1.pdf` (117 หน้า, ส่วนใหญ่มี text), `ITDS231_Internet_Architecture_rev1.pdf` (20 หน้า) และ `ITDS231_Network_Topography.pdf` (15 หน้า) — สองไฟล์หลังเป็น **รูปภาพล้วน** ต้อง render เป็น PNG แล้วอ่าน (ใช้ PyMuPDF ติดตั้งแบบ `pip install --target <scratchpad>`; เครื่องนี้ไม่มี poppler)
- ค่าความเร็วสัญญาณ: Chapter 1 ใช้ ~2×10⁸ m/s, สไลด์ Architecture เขียน ~2.5×10⁸ m/s แต่โจทย์ใช้ 2×10⁸ — หน้าเว็บระบุทั้งสองแบบไว้แล้ว
- quiz บทที่ 1: เฉลยกระจาย A/B/C/D อย่างละ 5 ข้อ

## โครงสร้างไฟล์

```
index.html                       หน้าแรก
network.html                     ITDS231 บทที่ 1 (เนื้อหาทั้งหมดอยู่ใน HTML ไฟล์นี้)
network-application-layer.html   ITDS231 บทที่ 2 (ใช้ network.css / network.js ร่วมกัน)
assets/
  favicon.svg           โลโก้ (3 โหนดเชื่อมกัน) ใช้เป็น favicon + wordmark
  css/
    tokens.css          design tokens (สี ฟอนต์ ระยะ radius เงา motion) — แก้สีที่นี่ที่เดียว
    base.css            reset, typography, header, .btn, .chip, .card, .table-scroll, .formula, footer
    home.css            เฉพาะ index.html (hero, ticker, subject cards)
    network.css         หน้าวิชา: chapter switcher, tabs, accordion, topic content, cheat sheet, quiz (สถานะคงที่เท่านั้น)
    motion.css          keyframes + transition ของ component ทั้งหมด + prefers-reduced-motion (โหลดเป็นไฟล์สุดท้าย)
  js/
    network.js          tabs (ARIA, arrow keys, #hash), accordion, quiz (ตรวจ/คะแนน/รีเซ็ต/กรองข้อผิด)
README.md               คำอธิบายสั้น + วิธี deploy
.nojekyll               ให้ GitHub Pages ไม่ประมวลผล Jekyll
.gitignore
```

ลำดับการโหลด CSS: `tokens → base → (home | network) → motion`

## Design system — "Iris & Graphite"

ธีมมืด: graphite ที่มี undertone ม่วง + ม่วง iris อมฝุ่น (จงใจไม่ใช้ม่วง Tailwind เช่น #8b5cf6/#7c3aed)

**Base (graphite)** — ลึก → ยก
| token | hex | ใช้กับ |
| --- | --- | --- |
| `--graphite-950` | `#121015` | inset, formula block, tab track |
| `--graphite-900` | `#17151a` | พื้นหลังหน้า |
| `--graphite-850` | `#1d1a21` | การ์ด, accordion, คำถาม quiz |
| `--graphite-800` | `#242028` | hover, หัวตาราง, compare box |
| `--graphite-750` | `#2c2731` | track ของ progress/ring |

**Accent (iris)**
| token | hex | ใช้กับ |
| --- | --- | --- |
| `--iris-200` | `#ddd1f7` | ข้อความเน้น, หัวข้อย่อย |
| `--iris-300` | `#c6b3ef` | ลิงก์, ตัวเลข, eyebrow |
| `--iris-400` | `#ab92e6` | ปุ่มหลัก, tab indicator, focus ring, radio ที่เลือก |
| `--iris-500` | `#8e71d3` | เส้นขอบ active, marker |
| `--iris-600` | `#6e55ae` | hover border |
| `--iris-800` | `#372b52` | ขอบของพื้น tint |
| `--iris-900` | `#241d33` | พื้น tint (ตัวเลือกที่เลือก, chip accent) |

**Text / Border**
| token | hex | contrast บน graphite-900 |
| --- | --- | --- |
| `--text` | `#ece8f1` | 15.0:1 |
| `--text-muted` | `#aaa2b4` | 7.4:1 |
| `--text-faint` | `#918a9b` | 5.5:1 (4.8:1 บน graphite-800) |
| `--text-on-accent` | `#16131b` | 7.0:1 บน iris-400 |
| `--border-subtle` / `--border` / `--border-strong` | `#2a2630` / `#37323e` / `#4b4455` | — |

**Semantic (เฉลย quiz)**: success `#7fcfa6` บน `#17271f` (ขอบ `#3c6e55`) · danger `#ef9a9a` บน `#2c1a1d` (ขอบ `#7a3c43`) · warn `#e6c27a` (ข้อที่ยังไม่ตอบ, tag "Shared")

**ฟอนต์** (Google Fonts)
- หัวข้อ: `Bricolage Grotesque` (ละติน) + `IBM Plex Sans Thai` (ไทย, แบบไม่มีหัว)
- เนื้อหา: `IBM Plex Sans Thai Looped` (ไทยแบบมีหัว อ่านย่อหน้ายาวง่ายกว่า)
- mono/สูตร/label: `IBM Plex Mono` (fallback ไทย → Plex Sans Thai)
- line-height เนื้อหา 1.75 (สระบน-ล่างภาษาไทย)

**หลักการ**
1. สีทุกค่าต้องมาจาก token — ห้าม hardcode hex ใน component (ยกเว้น SVG ตกแต่งใน index)
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
- remote `origin` = `https://github.com/Yoshioka1311/ToTobTuan.git` — ดูผลการ push/Pages ในสถานะด้านล่าง

## สิ่งที่ยังไม่ได้ทำ / แผนต่อไป

- ITDS231 บทที่ 2 ส่วนที่เหลือของสไลด์ (Email/SMTP/IMAP, DNS, video streaming/CDN, socket programming) ยังไม่มีในเว็บ — มีแค่ในหัวข้อภาพรวม
- เพิ่มหน้าวิชาอื่น (เช่น วิชาฐานข้อมูลที่มีการ์ดรออยู่แล้ว — ใน Downloads มีสไลด์ชื่อ ITDS222 ERDiagram แต่ยังไม่ได้ยืนยันกับผู้ใช้ว่าเป็นวิชาเดียวกัน) — ดู "วิธีเพิ่มวิชาใหม่" ด้านล่าง
- ITDS231 สัปดาห์ 2–8 (Data & Signals, Application layer/HTTP, Data Link, MAC/Ethernet/VLAN, STP) ยังไม่มีสไลด์ในเว็บ — เพิ่มเป็น accordion item ใหม่เมื่อผู้ใช้ให้ไฟล์
- ไอเดีย (ยังไม่ได้ขอ): จำคำตอบ quiz ด้วย localStorage, ธีมสว่าง, สุ่มลำดับคำถาม, แยก JS ส่วน tabs/accordion เป็นไฟล์กลางเมื่อมีหน้าวิชาที่ 2

## วิธีเพิ่มบทใหม่ในวิชาเดิม (pattern หลายบท)

วิชาเดียว = หลายไฟล์ .html (1 ไฟล์ต่อ 1 บท) ใช้ `network.css` + `network.js` ร่วมกัน ไม่ต้องแก้ JS
1. ตั้งชื่อ `<subject>-<topic>.html` (lowercase, คั่นด้วย `-`) เช่น `network-transport-layer.html` · บทที่ 1 คงชื่อ `network.html` ไว้เพราะมีลิงก์จาก index และ deep link เดิม
2. คัดลอกโครงจากหน้าบทล่าสุด: header, `.course-hero`, tabbar, 3 panel (`#content` / `#summary` / `#quiz`), `quiz-result`, `quiz-bar` — id เหล่านี้ JS ใช้ ห้ามเปลี่ยนชื่อ
3. **chapter switcher**: เพิ่ม `<a class="chapter-link">` ของบทใหม่ใน `.chapter-nav` ของ**ทุกหน้าบท** (ลำดับเดียวกันทุกหน้า) และใส่ `aria-current="page"` เฉพาะลิงก์ของหน้าตัวเอง
4. id ของหัวข้อย่อยใช้ prefix ต่อบท (บทที่ 2 ใช้ `app-*`, `http-*`) เพื่อไม่ชนกันเวลาลิงก์ข้ามหน้า
5. การ์ดใน index ยังชี้ `network.html` — อัปเดตแค่ chip จำนวนบทและ `card-sub`
6. เพิ่มแถวในตารางหน้าใน CLAUDE.md + README และบันทึกว่าเนื้อหาบทใหม่ถูก lock

## วิธีเพิ่มวิชาใหม่

1. คัดลอก `network.html` เป็น `<subject>.html` (lowercase, ไม่มีช่องว่าง — GitHub Pages แยกตัวพิมพ์เล็ก/ใหญ่) แล้วเปลี่ยนเนื้อหาใน 3 แท็บ
2. ใช้ `assets/css/network.css` + `assets/js/network.js` ได้เลย (ถ้าไม่มี quiz ต้องปรับ JS ให้ข้ามส่วน quiz เมื่อไม่มี `#quiz-form`)
3. เพิ่มการ์ด `<a class="subject-card" href="<subject>.html">` ใน `index.html`
4. ลิงก์ทุกอันต้องเป็น relative path (ไม่ขึ้นต้นด้วย `/`) เพราะ Pages อยู่ใต้ `/<repo>/`

## คำสั่งที่ใช้บ่อย

```bash
# เปิดดูบนเครื่อง (หรือดับเบิลคลิก index.html)
python -m http.server 8000        # แล้วเปิด http://localhost:8000

git log --oneline
```

- **Commit บน Windows PowerShell 5.1**: ข้อความที่มี `"` จะถูกตัดเป็น pathspec — เขียนข้อความลงไฟล์แล้วใช้ `git commit -F <file>`
- git identity ตั้งไว้เฉพาะ repo นี้ (`git config user.name/user.email`)
- ทดสอบ UI: headless Edge อยู่ที่ `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` ใช้ `--headless=new --remote-debugging-port` + Node 24 (มี `WebSocket` ในตัว) ส่งคำสั่ง CDP เพื่อคลิก/ถ่าย screenshot ได้โดยไม่ต้องติดตั้งอะไรเพิ่ม
