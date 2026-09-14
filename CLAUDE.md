# CLAUDE.md — โต๊ะทบทวน

อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง และ **อัปเดตส่วน "สถานะล่าสุด" / "สิ่งที่ยังไม่ได้ทำ" ก่อนจบทุก session**

## ภาพรวม

เว็บส่วนตัวสำหรับทบทวนเนื้อหาก่อนสอบ (นักศึกษา ICT มหิดล ภาคเรียน 1/2569) เป็น **static site ล้วน**
HTML/CSS/JS ไม่มี framework ไม่มี build tool — ห้ามเพิ่มถ้าไม่จำเป็นจริง ถ้าจำเป็นให้ถามผู้ใช้ก่อน

| หน้า | หน้าที่ |
| --- | --- |
| `index.html` | หน้าแรก: hero, ticker คำศัพท์, grid การ์ดรายวิชา (ลิงก์ไปหน้าวิชา), ช่อง placeholder "เพิ่มวิชาใหม่" |
| `network.html` | ITDS231 Computer Networks — 3 แท็บ: **เนื้อหา** (accordion 1 อันต่อ 1 ไฟล์สไลด์) · **สรุป** (cheat sheet 13 การ์ด) · **แบบฝึกหัด** (quiz 20 ข้อ) |

การ์ด "การออกแบบฐานข้อมูล (7-Eleven Schema)" ใน index เป็นเนื้อหาเดิมของผู้ใช้ ยังไม่มีหน้าของตัวเอง

### ⚠️ กฎเรื่องเนื้อหา (สำคัญ)
- เนื้อหาวิชา, คำถาม quiz 20 ข้อ, ตัวเลือก, คำตอบ (`data-answer`) และคำอธิบายใน `network.html` **ห้ามแก้/ลบ** เมื่อทำงานด้าน UI — ปรับได้แค่ markup/class/ดีไซน์/interaction
- เนื้อหาสรุปมาจาก PDF 3 ไฟล์ของผู้ใช้ (อยู่ใน `C:\Users\bossz\Downloads\`, ไม่ได้อยู่ใน repo และ `*.pdf` ถูก gitignore):
  `Chapter_1_Intro_rev1.pdf` (117 หน้า, ส่วนใหญ่มี text), `ITDS231_Internet_Architecture_rev1.pdf` (20 หน้า) และ `ITDS231_Network_Topography.pdf` (15 หน้า) — สองไฟล์หลังเป็น **รูปภาพล้วน** ต้อง render เป็น PNG แล้วอ่าน (ใช้ PyMuPDF ติดตั้งแบบ `pip install --target <scratchpad>`; เครื่องนี้ไม่มี poppler)
- ค่าความเร็วสัญญาณ: Chapter 1 ใช้ ~2×10⁸ m/s, สไลด์ Architecture เขียน ~2.5×10⁸ m/s แต่โจทย์ใช้ 2×10⁸ — หน้าเว็บระบุทั้งสองแบบไว้แล้ว
- quiz: เฉลยกระจาย A/B/C/D อย่างละ 5 ข้อ

## โครงสร้างไฟล์

```
index.html              หน้าแรก
network.html            หน้าวิชา ITDS231 (เนื้อหาทั้งหมดอยู่ใน HTML ไฟล์นี้)
assets/
  favicon.svg           โลโก้ (3 โหนดเชื่อมกัน) ใช้เป็น favicon + wordmark
  css/
    tokens.css          design tokens (สี ฟอนต์ ระยะ radius เงา motion) — แก้สีที่นี่ที่เดียว
    base.css            reset, typography, header, .btn, .chip, .card, .table-scroll, .formula, footer
    home.css            เฉพาะ index.html (hero, ticker, subject cards)
    network.css         หน้าวิชา: tabs, accordion, topic content, cheat sheet, quiz (สถานะคงที่เท่านั้น)
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
- [ ] ยังไม่ได้ push (ยังไม่มี remote)

## สิ่งที่ยังไม่ได้ทำ / แผนต่อไป

- push ขึ้น GitHub + เปิด Pages (ผู้ใช้ทำเอง ดูขั้นตอนใน README)
- เพิ่มหน้าวิชาอื่น (เช่น วิชาฐานข้อมูลที่มีการ์ดรออยู่แล้ว — ใน Downloads มีสไลด์ชื่อ ITDS222 ERDiagram แต่ยังไม่ได้ยืนยันกับผู้ใช้ว่าเป็นวิชาเดียวกัน) — ดู "วิธีเพิ่มวิชาใหม่" ด้านล่าง
- ITDS231 สัปดาห์ 2–8 (Data & Signals, Application layer/HTTP, Data Link, MAC/Ethernet/VLAN, STP) ยังไม่มีสไลด์ในเว็บ — เพิ่มเป็น accordion item ใหม่เมื่อผู้ใช้ให้ไฟล์
- ไอเดีย (ยังไม่ได้ขอ): จำคำตอบ quiz ด้วย localStorage, ธีมสว่าง, สุ่มลำดับคำถาม, แยก JS ส่วน tabs/accordion เป็นไฟล์กลางเมื่อมีหน้าวิชาที่ 2

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
