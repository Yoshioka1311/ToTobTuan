/* ==========================================================================
   โจทย์เขียนโค้ด ITDS241 บทที่ 3 (กลุ่ม 7: CSS Selectors & Properties) — ใช้กับ code-exercise.js
   ผู้เรียนเขียน HTML + <style> · checks อ่านกฎ CSS ผ่าน h.cssRules / h.cssValue (CSSOM parse)
   จึงไม่สนเรื่องช่องว่าง/ขึ้นบรรทัด และ h.sameColor ยอมรับชื่อสี, #hex หรือ rgb() ที่เป็นสีเดียวกัน
   ========================================================================== */
(() => {
  const hasStyle = (doc) => doc.querySelector("style") !== null;
  const px = (v, n) => v === `${n}px`;

  window.CODE_EXERCISE_SET = {
    id: "web-3",
    groups: [
      {
        title: "7. CSS Selectors & Properties พื้นฐาน",
        tasks: [
          {
            id: "7.1",
            title: "Element selector: h1 สีน้ำเงิน",
            level: 1,
            prompt: "<p>จงเขียน CSS selector ใน <code>&lt;style&gt;</code> ที่กำหนดให้<strong>ทุก <code>&lt;h1&gt;</code> ในหน้า</strong>มีสี (<code>color</code>) เป็น <strong>blue</strong></p><p>ใส่ <code>&lt;h1&gt;</code> ไว้ในหน้าอย่างน้อย 1 ตัวเพื่อดูผลลัพธ์ด้วย</p>",
            solution: `<style>
  h1 { color: blue; }
</style>
<h1>สวัสดี CSS</h1>`,
            checks: [
              { hint: "ยังไม่พบ `<style>` สำหรับเขียน CSS", test: (doc) => hasStyle(doc) },
              { hint: "ยังไม่พบกฎ CSS ที่เลือก h1 ทุกตัวด้วย element selector", test: (doc, code, h) => h.cssRules(doc).some((r) => r.selectors.includes("h1")) },
              { hint: "กฎของ h1 ยังไม่ได้กำหนดสีตัวอักษรตามโจทย์", test: (doc, code, h) => h.sameColor(h.cssValue(doc, "h1", "color"), "blue") },
              { hint: "ยังไม่มี `<h1>` ในหน้าให้เห็นผลลัพธ์", test: (doc) => doc.querySelector("h1") !== null },
            ],
          },
          {
            id: "7.2",
            title: "Class selector .highlight",
            level: 1,
            prompt: "<p>จงเขียน CSS <strong>class selector</strong> ชื่อ <code>.highlight</code> ที่กำหนด <code>background-color</code> เป็น <strong>yellow</strong> แล้วนำ class นี้ไปใช้กับ <code>&lt;p&gt;</code> <strong>อย่างน้อย 1 ตัว</strong>ใน <code>&lt;body&gt;</code></p>",
            solution: `<style>
  .highlight { background-color: yellow; }
</style>
<p class="highlight">ย่อหน้านี้ถูกไฮไลต์</p>
<p>ย่อหน้าธรรมดา</p>`,
            checks: [
              { hint: "ยังไม่พบ `<style>` สำหรับเขียน CSS", test: (doc) => hasStyle(doc) },
              { hint: "ยังไม่พบกฎของ class selector ชื่อ highlight — class selector ขึ้นต้นด้วยเครื่องหมายอะไร?", test: (doc, code, h) => h.cssRules(doc).some((r) => r.selectors.some((s) => /(^|[^\w-])\.highlight(?![\w-])/.test(s))) },
              { hint: "กฎของ .highlight ยังไม่ได้กำหนดสีพื้นหลังตามโจทย์", test: (doc, code, h) => h.sameColor(h.cssValue(doc, ".highlight", "background-color"), "yellow") },
              { hint: "ยังไม่มี `<p>` ที่ใช้ class นี้", test: (doc, code, h) => Array.from(doc.querySelectorAll("p")).some((p) => h.hasClass(p, "highlight")) },
            ],
          },
          {
            id: "7.3",
            title: "ID selector และ Grouping selector",
            level: 2,
            prompt: "<p>จงเขียนหน้าที่มี <code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code> และ <code>&lt;p id=\"intro\"&gt;</code> แล้วเขียน CSS ให้</p><ul><li>ย่อหน้าที่มี id <code>intro</code> มี <code>font-size</code> เป็น <strong>20px</strong> โดยใช้ <strong>ID selector</strong></li><li><code>&lt;h1&gt;</code> และ <code>&lt;h2&gt;</code> มีสี <strong>navy</strong> โดยเขียนไว้ใน<strong>กฎเดียว</strong> (grouping selector)</li></ul>",
            solution: `<style>
  #intro { font-size: 20px; }
  h1, h2 { color: navy; }
</style>
<h1>หัวข้อหลัก</h1>
<h2>หัวข้อรอง</h2>
<p id="intro">ย่อหน้าแนะนำ</p>`,
            checks: [
              { hint: "ยังไม่พบ `<p>` ที่มี id ตามโจทย์", test: (doc) => doc.querySelector("p#intro") !== null },
              { hint: "ยังไม่พบกฎที่ใช้ ID selector เลือกย่อหน้านี้", test: (doc, code, h) => h.cssRules(doc).some((r) => r.selectors.includes("#intro") || r.selectors.includes("p#intro")) },
              { hint: "ขนาดตัวอักษรของย่อหน้า intro ยังไม่ตรงกับโจทย์", test: (doc, code, h) => px(h.cssValue(doc, "#intro", "font-size"), 20) || px(h.cssValue(doc, "p#intro", "font-size"), 20) },
              { hint: "ยังไม่พบกฎเดียวที่เลือกทั้ง h1 และ h2 — ลองนึกถึงเครื่องหมายที่ใช้จัดกลุ่ม selector", test: (doc, code, h) => h.cssRules(doc).some((r) => r.selectors.includes("h1") && r.selectors.includes("h2")) },
              { hint: "กฎที่จัดกลุ่ม h1 กับ h2 ยังไม่ได้กำหนดสีตามโจทย์", test: (doc, code, h) => h.cssRules(doc).some((r) => r.selectors.includes("h1") && r.selectors.includes("h2") && h.sameColor(r.style.getPropertyValue("color"), "navy")) },
              { hint: "ยังไม่มี `<h1>` และ `<h2>` ครบในหน้า", test: (doc) => doc.querySelector("h1") !== null && doc.querySelector("h2") !== null },
            ],
          },
          {
            id: "7.4",
            title: "Specificity: ID ชนะ class และ element",
            level: 2,
            prompt: "<p>มีย่อหน้า <code>&lt;p id=\"p1\" class=\"clsSp\"&gt;</code> จงเขียน CSS <strong>3 กฎ</strong> ที่ชี้ย่อหน้านี้พร้อมกัน</p><ul><li>element selector <code>p</code> กำหนดสี <strong>gray</strong></li><li>class selector <code>.clsSp</code> กำหนดสี <strong>green</strong></li><li>ID selector <code>#p1</code> กำหนดสี <strong>red</strong></li></ul><p>ลองสลับลำดับกฎแล้วดูว่าสีที่แสดงยังเป็นสีของ selector ที่เฉพาะเจาะจงที่สุดหรือไม่</p>",
            solution: `<style>
  #p1    { color: red; }
  .clsSp { color: green; }
  p      { color: gray; }
</style>
<p id="p1" class="clsSp">ข้อความนี้เป็นสีแดงเพราะ ID เฉพาะเจาะจงที่สุด</p>`,
            checks: [
              { hint: "ยังไม่พบ `<p>` ที่มีทั้ง id และ class ตามโจทย์", test: (doc) => doc.querySelector('p#p1.clsSp') !== null },
              { hint: "ยังไม่พบกฎ element selector ของ p ที่กำหนดสีตามโจทย์", test: (doc, code, h) => h.sameColor(h.cssValue(doc, "p", "color"), "gray") },
              { hint: "ยังไม่พบกฎ class selector ที่กำหนดสีตามโจทย์", test: (doc, code, h) => h.sameColor(h.cssValue(doc, ".clsSp", "color"), "green") },
              { hint: "ยังไม่พบกฎ ID selector ที่กำหนดสีตามโจทย์", test: (doc, code, h) => h.sameColor(h.cssValue(doc, "#p1", "color"), "red") },
            ],
          },
          {
            id: "7.5",
            title: "Box model: padding, border, margin",
            level: 2,
            prompt: "<p>จงสร้าง <code>&lt;div class=\"box\"&gt;</code> ที่มีข้อความข้างใน แล้วเขียน CSS ให้ <code>.box</code> มี</p><ul><li><code>padding</code> <strong>20px</strong></li><li>เส้นขอบหนา <strong>5px</strong> แบบ <strong>solid</strong> สี <strong>gray</strong> (ลองใช้ shorthand property <code>border</code> บรรทัดเดียว)</li><li><code>margin</code> <strong>25px</strong></li><li><code>width</code> <strong>300px</strong></li></ul>",
            solution: `<style>
  .box {
    width: 300px;
    padding: 20px;
    border: 5px solid gray;
    margin: 25px;
  }
</style>
<div class="box">Content อยู่ในสุด</div>`,
            checks: [
              { hint: "ยังไม่พบ `<div>` ที่มี class ตามโจทย์", test: (doc, code, h) => Array.from(doc.querySelectorAll("div")).some((d) => h.hasClass(d, "box")) },
              { hint: "ระยะ padding ของ .box ยังไม่ตรงกับโจทย์ (ต้องครบทุกด้าน)", test: (doc, code, h) => ["top", "right", "bottom", "left"].every((s) => px(h.cssValue(doc, ".box", `padding-${s}`), 20)) },
              { hint: "ความหนาหรือรูปแบบของเส้นขอบยังไม่ตรงกับโจทย์", test: (doc, code, h) => ["top", "right", "bottom", "left"].every((s) => px(h.cssValue(doc, ".box", `border-${s}-width`), 5) && h.cssValue(doc, ".box", `border-${s}-style`) === "solid") },
              { hint: "สีของเส้นขอบยังไม่ตรงกับโจทย์", test: (doc, code, h) => ["top", "right", "bottom", "left"].every((s) => h.sameColor(h.cssValue(doc, ".box", `border-${s}-color`), "gray")) },
              { hint: "ระยะ margin ของ .box ยังไม่ตรงกับโจทย์ (ต้องครบทุกด้าน)", test: (doc, code, h) => ["top", "right", "bottom", "left"].every((s) => px(h.cssValue(doc, ".box", `margin-${s}`), 25)) },
              { hint: "ความกว้างของ .box ยังไม่ตรงกับโจทย์", test: (doc, code, h) => px(h.cssValue(doc, ".box", "width"), 300) },
            ],
          },
          {
            id: "7.6",
            title: "Navigation bar แนวตั้ง",
            level: 3,
            prompt: "<p>จงสร้างเมนูแนวตั้งด้วย <code>&lt;nav&gt;</code> ที่มีลิงก์ <code>&lt;a&gt;</code> <strong>อย่างน้อย 3 ลิงก์</strong> แล้วเขียน CSS ให้</p><ul><li>ใช้ <strong>descendant selector</strong> <code>nav a</code> ทำให้ลิงก์<strong>ขึ้นบรรทัดใหม่และกินพื้นที่เต็มความกว้าง</strong> และ<strong>ไม่มีขีดเส้นใต้</strong></li><li>ใช้ <strong>pseudo-class</strong> ทำให้ลิงก์ใน nav เปลี่ยน <code>background-color</code> <strong>ตอนเมาส์ชี้อยู่</strong> (สีอะไรก็ได้)</li><li>จัด <code>&lt;nav&gt;</code> ให้กว้าง <strong>80%</strong> และอยู่<strong>กึ่งกลางแนวนอน</strong></li></ul>",
            solution: `<style>
  nav { width: 80%; margin: auto; background-color: #333; }
  nav a { display: block; padding: 10px; color: white; text-decoration: none; }
  nav a:hover { background-color: coral; }
</style>
<nav>
  <a href="#">Home</a>
  <a href="#">News</a>
  <a href="#">Contact</a>
</nav>`,
            checks: [
              { hint: "ยังไม่พบ `<nav>` ที่มีลิงก์อย่างน้อย 3 ลิงก์", test: (doc) => doc.querySelectorAll("nav a").length >= 3 },
              { hint: "ยังไม่พบกฎที่เลือกลิงก์ภายใน nav ด้วย descendant selector", test: (doc, code, h) => h.cssRules(doc).some((r) => r.selectors.includes("nav a")) },
              { hint: "ลิงก์ใน nav ยังไม่ขึ้นบรรทัดใหม่เต็มความกว้าง — ตรวจสอบค่า display", test: (doc, code, h) => h.cssValue(doc, "nav a", "display") === "block" },
              { hint: "ลิงก์ใน nav ยังมีขีดเส้นใต้อยู่", test: (doc, code, h) => /^none\b/.test(h.cssValue(doc, "nav a", "text-decoration") || h.cssValue(doc, "nav a", "text-decoration-line")) },
              { hint: "ยังไม่พบกฎ pseudo-class สำหรับตอนเมาส์ชี้ลิงก์ใน nav ที่เปลี่ยนสีพื้นหลัง", test: (doc, code, h) => h.cssValue(doc, "nav a:hover", "background-color") !== "" },
              { hint: "ความกว้างของ nav ยังไม่ตรงกับโจทย์", test: (doc, code, h) => h.cssValue(doc, "nav", "width") === "80%" },
              { hint: "nav ยังไม่อยู่กึ่งกลางแนวนอน — ลองนึกถึงค่า margin ที่ให้ browser คำนวณเอง", test: (doc, code, h) => h.cssValue(doc, "nav", "margin-left") === "auto" && h.cssValue(doc, "nav", "margin-right") === "auto" },
            ],
          },
        ],
      },
    ],
  };
})();
