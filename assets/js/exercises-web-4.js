/* ==========================================================================
   โจทย์เขียนโค้ด ITDS241 บทที่ 4 (กลุ่ม 8: CSS Layout ด้วย Flexbox) — ใช้กับ code-exercise.js
   checks อ่านกฎ CSS ผ่าน h.cssValue(doc, selector, property, media) (CSSOM parse รวม @media)
   ========================================================================== */
(() => {
  const hasStyle = (doc) => doc.querySelector("style") !== null;
  const byClass = (doc, cls) => Array.from(doc.querySelectorAll(`.${cls}`));
  const directChildren = (el) => (el ? Array.from(el.children) : []);

  window.CODE_EXERCISE_SET = {
    id: "web-4",
    groups: [
      {
        title: "8. CSS Layout ด้วย Flexbox",
        tasks: [
          {
            id: "8.1",
            title: "เปิดใช้งาน flex container",
            level: 1,
            prompt: "<p>จงสร้าง <code>&lt;div class=\"container\"&gt;</code> ที่มี <code>&lt;div&gt;</code> ลูก<strong>อย่างน้อย 3 ตัว</strong> แล้วเขียน CSS ให้ <code>.container</code> เป็น <strong>flex container</strong> (ลูกทุกตัวจะกลายเป็น flex items และเรียงต่อกันในแถวเดียว)</p>",
            solution: `<style>
  .container { display: flex; background-color: gainsboro; }
  .container div { margin: 8px; padding: 16px; background-color: lightskyblue; }
</style>
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`,
            checks: [
              { hint: "ยังไม่พบ `<style>` สำหรับเขียน CSS", test: (doc) => hasStyle(doc) },
              { hint: "ยังไม่พบ element ที่มี class ตามโจทย์", test: (doc) => byClass(doc, "container").length > 0 },
              { hint: "container ยังมีลูกโดยตรงไม่ครบ 3 ตัว", test: (doc) => byClass(doc, "container").some((c) => directChildren(c).length >= 3) },
              { hint: "container ยังไม่เป็น flex container — property นี้ต้องกำหนดที่ element แม่", test: (doc, code, h) => h.cssValue(doc, ".container", "display") === "flex" },
            ],
          },
          {
            id: "8.2",
            title: "flex-direction: เรียงแนวตั้ง",
            level: 1,
            prompt: "<p>จงสร้าง flex container <code>.menu</code> ที่มีลิงก์ <code>&lt;a&gt;</code> <strong>3 ลิงก์</strong> เป็นลูก แล้วเขียน CSS ให้ flex items <strong>เรียงตามแนวตั้งจากบนลงล่าง</strong></p>",
            solution: `<style>
  .menu { display: flex; flex-direction: column; }
  .menu a { padding: 8px; }
</style>
<nav class="menu">
  <a href="#">Home</a>
  <a href="#">News</a>
  <a href="#">Contact</a>
</nav>`,
            checks: [
              { hint: "ยังไม่พบ element ที่มี class `menu` ที่มีลิงก์เป็นลูกอย่างน้อย 3 ลิงก์", test: (doc) => byClass(doc, "menu").some((m) => directChildren(m).filter((c) => c.tagName === "A").length >= 3) },
              { hint: ".menu ยังไม่เป็น flex container", test: (doc, code, h) => h.cssValue(doc, ".menu", "display") === "flex" },
              { hint: "ทิศทางการเรียงยังไม่ใช่แนวตั้งจากบนลงล่าง — ตรวจสอบ flex-direction", test: (doc, code, h) => h.cssValue(doc, ".menu", "flex-direction") === "column" },
            ],
          },
          {
            id: "8.3",
            title: "flex-wrap + justify-content",
            level: 2,
            prompt: "<p>จงสร้าง flex container <code>.gallery</code> ที่มี <code>&lt;div class=\"card\"&gt;</code> <strong>อย่างน้อย 6 ใบ</strong> แต่ละใบกว้าง <strong>150px</strong> แล้วเขียน CSS ให้ <code>.gallery</code></p><ul><li>ให้ item <strong>ตัดขึ้นบรรทัดใหม่</strong>เมื่อพื้นที่ไม่พอ</li><li><strong>กระจายพื้นที่ว่างระหว่าง item เท่าๆ กัน</strong>ด้วยค่า <code>space-evenly</code></li></ul>",
            solution: `<style>
  .gallery { display: flex; flex-wrap: wrap; justify-content: space-evenly; }
  .card { width: 150px; margin: 8px 0; padding: 20px 0; text-align: center; background-color: lightskyblue; }
</style>
<div class="gallery">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
  <div class="card">4</div>
  <div class="card">5</div>
  <div class="card">6</div>
</div>`,
            checks: [
              { hint: "ยังไม่พบ .gallery ที่มี .card เป็นลูกอย่างน้อย 6 ใบ", test: (doc, code, h) => byClass(doc, "gallery").some((g) => directChildren(g).filter((c) => h.hasClass(c, "card")).length >= 6) },
              { hint: ".gallery ยังไม่เป็น flex container", test: (doc, code, h) => h.cssValue(doc, ".gallery", "display") === "flex" },
              { hint: "item ยังไม่ตัดขึ้นบรรทัดใหม่เมื่อพื้นที่ไม่พอ", test: (doc, code, h) => h.cssValue(doc, ".gallery", "flex-wrap") === "wrap" },
              { hint: "การกระจายพื้นที่ว่างตามแนวหลักยังไม่ตรงกับโจทย์", test: (doc, code, h) => h.cssValue(doc, ".gallery", "justify-content") === "space-evenly" },
              { hint: "ความกว้างของ .card ยังไม่ตรงกับโจทย์", test: (doc, code, h) => h.cssValue(doc, ".card", "width") === "150px" || h.cssValue(doc, ".gallery .card", "width") === "150px" },
            ],
          },
          {
            id: "8.4",
            title: "จัดกึ่งกลางด้วย flexbox",
            level: 2,
            prompt: "<p>จงสร้าง <code>&lt;div class=\"hero\"&gt;</code> สูง <strong>200px</strong> ที่มีปุ่ม <code>&lt;button&gt;</code> อยู่ข้างใน แล้วใช้ flexbox จัดปุ่มให้อยู่<strong>กึ่งกลาง</strong>ทั้งตามแนวหลัก (<code>justify-content</code>) และตำแหน่งของ item (<code>align-items</code>)</p>",
            solution: `<style>
  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: gainsboro;
  }
</style>
<div class="hero">
  <button>เริ่มต้นใช้งาน</button>
</div>`,
            checks: [
              { hint: "ยังไม่พบ .hero ที่มี `<button>` อยู่ข้างใน", test: (doc) => byClass(doc, "hero").some((el) => el.querySelector("button")) },
              { hint: ".hero ยังไม่เป็น flex container", test: (doc, code, h) => h.cssValue(doc, ".hero", "display") === "flex" },
              { hint: "ปุ่มยังไม่อยู่กึ่งกลางตามแนวหลัก", test: (doc, code, h) => h.cssValue(doc, ".hero", "justify-content") === "center" },
              { hint: "ตำแหน่งของ item ยังไม่อยู่กึ่งกลาง", test: (doc, code, h) => h.cssValue(doc, ".hero", "align-items") === "center" },
              { hint: "ความสูงของ .hero ยังไม่ตรงกับโจทย์", test: (doc, code, h) => h.cssValue(doc, ".hero", "height") === "200px" },
            ],
          },
          {
            id: "8.5",
            title: "Media query: จอเล็กเปลี่ยนเป็นแนวตั้ง",
            level: 3,
            prompt: "<p>จงสร้าง <code>.row</code> ที่มี <code>&lt;div class=\"column\"&gt;</code> <strong>3 คอลัมน์</strong> แล้วเขียน CSS ให้</p><ul><li>ค่าเริ่มต้น: <code>.row</code> เป็น flex container เรียง<strong>แนวนอน</strong> (<code>row</code>)</li><li>เมื่อหน้าจอ<strong>กว้างไม่เกิน 768px</strong> (<code>screen</code>): <code>.row</code> เปลี่ยนเป็นเรียง<strong>แนวตั้ง</strong> (<code>column</code>) — เขียนด้วย <code>@media</code></li></ul><p>ลองย่อความกว้างของกรอบผลลัพธ์ (หรือหน้าต่าง browser) เพื่อดูการเปลี่ยนแปลง</p>",
            solution: `<style>
  .row { display: flex; flex-direction: row; }
  .column { flex: 1; padding: 16px; background-color: lightskyblue; border: 1px solid white; }
  @media screen and (max-width: 768px) {
    .row { flex-direction: column; }
  }
</style>
<div class="row">
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
  <div class="column">Column 3</div>
</div>`,
            checks: [
              { hint: "ยังไม่พบ .row ที่มี .column ครบ 3 คอลัมน์", test: (doc, code, h) => byClass(doc, "row").some((r) => directChildren(r).filter((c) => h.hasClass(c, "column")).length === 3) },
              { hint: ".row ยังไม่เป็น flex container ในค่าเริ่มต้น (นอก @media)", test: (doc, code, h) => h.cssValue(doc, ".row", "display") === "flex" },
              { hint: "ค่าเริ่มต้นของ .row ยังไม่เรียงแนวนอน", test: (doc, code, h) => ["row", ""].includes(h.cssValue(doc, ".row", "flex-direction")) && h.cssRules(doc).some((r) => !r.media && r.selectors.includes(".row")) },
              { hint: "ยังไม่พบ `@media` สำหรับหน้าจอกว้างไม่เกิน 768px", test: (doc, code, h) => h.cssMediaRules(doc).some((r) => /max-width:\s*768px/.test(r.media)) },
              { hint: "ใน media query ยังไม่ได้เปลี่ยนทิศทางของ .row เป็นแนวตั้ง", test: (doc, code, h) => h.cssValue(doc, ".row", "flex-direction", "max-width: 768px") === "column" },
              { hint: "media query ควรระบุ mediatype เป็น screen ตามโจทย์", test: (doc, code, h) => h.cssMediaRules(doc).some((r) => /screen/.test(r.media) && /max-width:\s*768px/.test(r.media)) },
            ],
          },
          {
            id: "8.6",
            title: "หน้าเว็บ responsive ครบชุด",
            level: 3,
            prompt: "<p>จงเขียนหน้าเว็บ<strong>สมบูรณ์</strong> (มี <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code>) ที่</p><ul><li>มี <code>&lt;meta&gt;</code> <strong>viewport</strong> สำหรับ RWD (<code>width=device-width</code> และ <code>initial-scale=1.0</code>)</li><li>มี <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code> ที่มีลิงก์อย่างน้อย 2 ลิงก์ และ <code>&lt;footer&gt;</code></li><li>มี <code>&lt;section class=\"row\"&gt;</code> ที่มี <code>&lt;article&gt;</code> 3 ตัว</li><li><code>nav</code> และ <code>.row</code> เป็น flex container · <code>.row</code> ให้ item <strong>ตัดขึ้นบรรทัดใหม่</strong>และกระจายด้วย <code>space-between</code></li><li>เมื่อจอกว้าง<strong>ไม่เกิน 768px</strong>: <code>nav</code> เรียงลิงก์<strong>แนวตั้ง</strong></li></ul>",
            solution: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Page</title>
  <style>
    header, footer { background-color: #f1f1f1; text-align: center; padding: 3px; }
    nav { display: flex; background-color: darkblue; }
    nav a { padding: 14px 16px; color: white; text-decoration: none; }
    .row { display: flex; flex-wrap: wrap; justify-content: space-between; }
    .row article { width: 32%; background-color: lightskyblue; }
    @media screen and (max-width: 768px) {
      nav { flex-direction: column; }
    }
  </style>
</head>
<body>
  <header><h1>My Page</h1></header>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
  </nav>
  <section class="row">
    <article><p>Article 1</p></article>
    <article><p>Article 2</p></article>
    <article><p>Article 3</p></article>
  </section>
  <footer><p>Footer</p></footer>
</body>
</html>`,
            checks: [
              { hint: "บรรทัดแรกของไฟล์ต้องเป็นการประกาศชนิดเอกสาร", test: (doc, code, h) => h.doctypeFirst(code) },
              { hint: "ยังไม่ได้เขียน `<head>` และ `<body>` ให้ครบ", test: (doc, code, h) => h.tagInSource(code, "head") && h.tagInSource(code, "body") },
              { hint: "ยังไม่พบ `<meta>` viewport ที่มีทั้ง width=device-width และ initial-scale=1.0", test: (doc) => { const m = doc.querySelector('meta[name="viewport" i]'); const c = m ? (m.getAttribute("content") || "").replace(/\s+/g, "") : ""; return /width=device-width/i.test(c) && /initial-scale=1(\.0)?(,|$)/i.test(c); } },
              { hint: "ยังขาด semantic element บางตัว (header / nav / footer)", test: (doc) => ["header", "nav", "footer"].every((t) => doc.querySelector(t)) },
              { hint: "nav ต้องมีลิงก์อย่างน้อย 2 ลิงก์", test: (doc) => doc.querySelectorAll("nav a").length >= 2 },
              { hint: "ยังไม่พบ `<section>` ที่มี class row และมี `<article>` 3 ตัว", test: (doc) => Array.from(doc.querySelectorAll("section.row")).some((s) => directChildren(s).filter((c) => c.tagName === "ARTICLE").length === 3) },
              { hint: "nav ยังไม่เป็น flex container", test: (doc, code, h) => h.cssValue(doc, "nav", "display") === "flex" },
              { hint: ".row ยังไม่เป็น flex container", test: (doc, code, h) => h.cssValue(doc, ".row", "display") === "flex" || h.cssValue(doc, "section.row", "display") === "flex" },
              { hint: ".row ยังไม่ให้ item ตัดขึ้นบรรทัดใหม่", test: (doc, code, h) => h.cssValue(doc, ".row", "flex-wrap") === "wrap" || h.cssValue(doc, "section.row", "flex-wrap") === "wrap" },
              { hint: "การกระจายพื้นที่ของ .row ยังไม่ตรงกับโจทย์", test: (doc, code, h) => h.cssValue(doc, ".row", "justify-content") === "space-between" || h.cssValue(doc, "section.row", "justify-content") === "space-between" },
              { hint: "ยังไม่ได้เขียน media query ที่ทำให้ nav เรียงแนวตั้งบนจอกว้างไม่เกิน 768px", test: (doc, code, h) => h.cssValue(doc, "nav", "flex-direction", "max-width: 768px") === "column" },
            ],
          },
        ],
      },
    ],
  };
})();
