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

ลิงก์ตรงไปแต่ละแท็บได้ด้วย `network.html#content`, `#summary`, `#quiz` (ใช้กับทุกหน้าบท)

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
assets/
  css/  tokens.css · base.css · home.css · network.css · motion.css
  js/   network.js
  favicon.svg
```

## Deploy ด้วย GitHub Pages

เว็บนี้ serve จาก **root ของ branch `main`** ได้เลย (ไม่ต้องย้ายไป `/docs` เพราะไม่มีขั้นตอน build และไฟล์ทั้งหมดคือตัวเว็บ)

1. push repo ขึ้น GitHub
2. ไปที่ **Settings → Pages**
3. Source: **Deploy from a branch** → Branch: `main` / Folder: `/ (root)` → Save
4. รอสักครู่ เว็บจะอยู่ที่ `https://<username>.github.io/<repo>/`

ไฟล์ `.nojekyll` มีไว้บอก GitHub Pages ว่าไม่ต้องประมวลผลด้วย Jekyll
