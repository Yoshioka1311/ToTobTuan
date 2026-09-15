/* ==========================================================================
   โจทย์เขียนโค้ด ITDS241 บทที่ 1 (กลุ่ม 1–4) — ใช้กับ code-exercise.js
   check.test(doc, code, h): doc = DOMParser document, code = ข้อความดิบ, h = helpers
   hint: ห้ามบอกเฉลยตรงๆ ใช้ `...` ครอบชื่อ tag เพื่อแสดงเป็นโค้ด
   ========================================================================== */
window.CODE_EXERCISE_SET = {
  id: "web-1",
  groups: [
    /* ------------------------------------------------------------------ */
    {
      title: "1. โครงสร้างพื้นฐาน + Heading / Paragraph",
      tasks: [
        {
          id: "1.1",
          title: "Heading กับ Paragraph",
          level: 1,
          prompt: "<p>จงเขียน HTML ที่มี heading ระดับ 1 (<code>&lt;h1&gt;</code>) ข้อความว่า <strong>สวัสดีเว็บ</strong> และย่อหน้า (<code>&lt;p&gt;</code>) ตามด้วยข้อความอะไรก็ได้อย่างน้อย 1 ย่อหน้า</p>",
          solution: `<h1>สวัสดีเว็บ</h1>
<p>นี่คือหน้าเว็บแรกของฉัน</p>`,
          checks: [
            { hint: "ยังไม่พบ `<h1>` ในโค้ด", test: (doc) => doc.querySelector("h1") !== null },
            { hint: "ตรวจสอบข้อความใน `<h1>` ให้ตรงกับโจทย์", test: (doc, code, h) => h.text(doc.querySelector("h1")) === "สวัสดีเว็บ" },
            { hint: "ยังไม่พบย่อหน้า `<p>`", test: (doc) => doc.querySelector("p") !== null },
            { hint: "ย่อหน้า `<p>` ยังไม่มีข้อความ", test: (doc, code, h) => h.text(doc.querySelector("p")).length > 0 },
          ],
        },
        {
          id: "1.2",
          title: "โครงสร้างเอกสารครบถ้วน",
          level: 1,
          prompt: "<p>จงเขียนโครงสร้างเอกสาร HTML ให้ครบตามหลักการ ต้องมี <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> ที่มี <code>&lt;title&gt;</code> ข้อความว่า <strong>ประวัติย่อของฉัน</strong> และ <code>&lt;body&gt;</code> ที่มีข้อความอะไรก็ได้อย่างน้อย 1 อย่าง</p>",
          solution: `<!DOCTYPE html>
<html lang="th">
  <head>
    <title>ประวัติย่อของฉัน</title>
  </head>
  <body>
    สวัสดีครับ ผมเป็นนักศึกษาคณะ ICT
  </body>
</html>`,
          checks: [
            { hint: "ตรวจสอบบรรทัดแรกของไฟล์ — การประกาศชนิดเอกสารต้องมาก่อนสิ่งอื่นทั้งหมด", test: (doc, code, h) => h.doctypeFirst(code) },
            { hint: "ยังไม่พบ tag `<html>`", test: (doc, code, h) => h.tagInSource(code, "html") },
            { hint: "ยังไม่พบ tag `<head>`", test: (doc, code, h) => h.tagInSource(code, "head") },
            { hint: "ยังไม่พบ `<title>` ภายใน `<head>`", test: (doc) => doc.querySelector("head title") !== null },
            { hint: "ตรวจสอบข้อความใน `<title>` ให้ตรงกับโจทย์", test: (doc, code, h) => h.text(doc.querySelector("head title")) === "ประวัติย่อของฉัน" },
            { hint: "ยังไม่พบ tag `<body>`", test: (doc, code, h) => h.tagInSource(code, "body") },
            { hint: "`<body>` ยังไม่มีเนื้อหาที่แสดงบนหน้าเว็บ", test: (doc, code, h) => h.text(doc.body).length > 0 },
          ],
        },
        {
          id: "1.3",
          title: "Heading ครบ 6 ระดับ",
          level: 2,
          prompt: "<p>จงเขียน heading ครบทั้ง 6 ระดับ ตั้งแต่ <code>&lt;h1&gt;</code> ถึง <code>&lt;h6&gt;</code> อย่างละ 1 ตัว <strong>เรียงจากใหญ่ที่สุดไปเล็กที่สุด</strong> แต่ละตัวมีข้อความอะไรก็ได้</p>",
          solution: `<h1>This is a heading h1</h1>
<h2>This is a heading h2</h2>
<h3>This is a heading h3</h3>
<h4>This is a heading h4</h4>
<h5>This is a heading h5</h5>
<h6>This is a heading h6</h6>`,
          checks: [
            {
              hint: "ยังมี heading บางระดับที่ขาดไป — ต้องมีตั้งแต่ `<h1>` ถึง `<h6>`",
              test: (doc) => ["h1", "h2", "h3", "h4", "h5", "h6"].every((t) => doc.querySelector(t)),
            },
            {
              hint: "ตรวจสอบจำนวนและลำดับของ heading — ต้องมีระดับละ 1 ตัว เรียงจากใหญ่ไปเล็ก",
              test: (doc) => Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((e) => e.tagName).join() === "H1,H2,H3,H4,H5,H6",
            },
            { hint: "มี heading บางตัวที่ยังไม่มีข้อความ", test: (doc, code, h) => Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6")).every((e) => h.text(e)) },
          ],
        },
        {
          id: "1.4",
          title: "ขึ้นบรรทัดใหม่ด้วย <br>",
          level: 2,
          prompt: "<p>จงเขียน <strong>ย่อหน้า <code>&lt;p&gt;</code> เพียงย่อหน้าเดียว</strong> ที่แสดงข้อความ 3 บรรทัดดังนี้ โดยต้องขึ้นบรรทัดใหม่บนหน้าเว็บจริง</p><ul><li>บรรทัด 1: มหาวิทยาลัยมหิดล</li><li>บรรทัด 2: คณะ ICT</li><li>บรรทัด 3: ศาลายา</li></ul>",
          solution: `<p>มหาวิทยาลัยมหิดล<br>คณะ ICT<br>ศาลายา</p>`,
          checks: [
            { hint: "ตรวจสอบจำนวนย่อหน้า — โจทย์ต้องการ `<p>` เพียง 1 ย่อหน้า", test: (doc) => doc.querySelectorAll("p").length === 1 },
            { hint: "ข้อความยังไม่ขึ้นบรรทัดใหม่บนหน้าเว็บ — การกด Enter ในโค้ดเฉยๆ ไม่มีผลต่อการแสดงผล", test: (doc) => doc.querySelectorAll("p br").length >= 2 },
            {
              hint: "ตรวจสอบข้อความของแต่ละบรรทัดให้ตรงกับโจทย์ และให้มีการขึ้นบรรทัดใหม่ระหว่างบรรทัดเท่านั้น",
              test: (doc, code, h) => {
                const p = doc.querySelector("p");
                const lines = [""];
                p.childNodes.forEach((n) => {
                  if (n.nodeName === "BR") lines.push("");
                  else lines[lines.length - 1] += ` ${n.textContent}`;
                });
                return lines.map(h.norm).filter(Boolean).join("|") === "มหาวิทยาลัยมหิดล|คณะ ICT|ศาลายา"
                  && lines.map(h.norm).join("|") === "มหาวิทยาลัยมหิดล|คณะ ICT|ศาลายา";
              },
            },
          ],
        },
        {
          id: "1.5",
          title: "เขียน Comment",
          level: 2,
          prompt: "<p>จงเขียนย่อหน้า <code>&lt;p&gt;</code> ที่มีข้อความอะไรก็ได้ 1 ย่อหน้า และเพิ่ม <strong>comment</strong> ที่มีข้อความว่า <strong>TODO: เพิ่มรูปภาพ</strong> ไว้<strong>ก่อน</strong>ย่อหน้านั้น comment ต้องไม่แสดงบนหน้าเว็บ</p>",
          solution: `<!-- TODO: เพิ่มรูปภาพ -->
<p>ยินดีต้อนรับสู่หน้าเว็บของฉัน</p>`,
          checks: [
            { hint: "ยังไม่พบย่อหน้า `<p>` ที่มีข้อความ", test: (doc, code, h) => h.text(doc.querySelector("p")).length > 0 },
            { hint: "ข้อความ TODO ยังแสดงอยู่บนหน้าเว็บ — แปลว่ายังไม่ได้อยู่ใน comment ที่เขียนถูกรูปแบบ", test: (doc) => !doc.body.textContent.includes("TODO") },
            { hint: "ยังไม่พบ comment ที่มีข้อความตามโจทย์ — ตรวจสอบรูปแบบการเปิด-ปิด comment", test: (doc, code, h) => h.comments(doc).includes("TODO: เพิ่มรูปภาพ") },
            {
              hint: "ตรวจสอบตำแหน่งของ comment — ต้องอยู่ก่อนย่อหน้า",
              test: (doc, code, h) => {
                const c = h.commentNodes(doc).find((n) => h.norm(n.nodeValue) === "TODO: เพิ่มรูปภาพ");
                return h.before(c, doc.querySelector("p"));
              },
            },
          ],
        },
        {
          id: "1.6",
          title: "เอกสารแนะนำตัวแบบสมบูรณ์",
          level: 3,
          prompt: "<p>จงเขียนเอกสาร HTML สมบูรณ์ 1 ไฟล์ที่มีครบทุกข้อต่อไปนี้</p><ul><li>บรรทัดแรกประกาศ <code>&lt;!DOCTYPE html&gt;</code></li><li><code>&lt;html&gt;</code> ระบุภาษาของหน้าเป็นภาษาไทย (<code>th</code>) ด้วย attribute</li><li><code>&lt;head&gt;</code> มี <code>&lt;title&gt;</code> ข้อความ <strong>หน้าแนะนำตัว</strong></li><li><code>&lt;body&gt;</code> มี <code>&lt;h1&gt;</code> 1 ตัว และ <code>&lt;p&gt;</code> อย่างน้อย 2 ย่อหน้า</li><li>ย่อหน้าที่ 2 มีการขึ้นบรรทัดใหม่ด้วย <code>&lt;br&gt;</code> อย่างน้อย 1 ครั้ง</li><li>มี comment อย่างน้อย 1 จุด</li></ul>",
          solution: `<!DOCTYPE html>
<html lang="th">
  <head>
    <title>หน้าแนะนำตัว</title>
  </head>
  <body>
    <!-- ส่วนหัวของหน้า -->
    <h1>สวัสดีครับ</h1>
    <p>ผมชื่อโต๊ะ เป็นนักศึกษาคณะ ICT</p>
    <p>งานอดิเรก:<br>อ่านหนังสือ<br>เขียนโปรแกรม</p>
  </body>
</html>`,
          checks: [
            { hint: "ตรวจสอบบรรทัดแรกของไฟล์", test: (doc, code, h) => h.doctypeFirst(code) },
            { hint: "ยังไม่พบ tag `<html>` ในโค้ด", test: (doc, code, h) => h.tagInSource(code, "html") },
            { hint: "ตรวจสอบ attribute ที่ระบุภาษาของ `<html>`", test: (doc, code, h) => h.attr(doc.documentElement, "lang").toLowerCase() === "th" },
            { hint: "ยังไม่พบ tag `<head>` ในโค้ด", test: (doc, code, h) => h.tagInSource(code, "head") },
            { hint: "ตรวจสอบ `<title>` ภายใน `<head>` และข้อความของมัน", test: (doc, code, h) => h.text(doc.querySelector("head title")) === "หน้าแนะนำตัว" },
            { hint: "ยังไม่พบ tag `<body>` ในโค้ด", test: (doc, code, h) => h.tagInSource(code, "body") },
            { hint: "ตรวจสอบจำนวน `<h1>` — โจทย์ต้องการ 1 ตัวที่มีข้อความ", test: (doc, code, h) => doc.querySelectorAll("body h1").length === 1 && h.text(doc.querySelector("body h1")) },
            { hint: "ย่อหน้ายังไม่ครบตามจำนวนที่โจทย์กำหนด", test: (doc) => doc.querySelectorAll("body p").length >= 2 },
            { hint: "ย่อหน้าที่ 2 ยังไม่มีการขึ้นบรรทัดใหม่", test: (doc) => { const p = doc.querySelectorAll("body p")[1]; return Boolean(p && p.querySelector("br")); } },
            { hint: "ยังไม่พบ comment ในเอกสาร", test: (doc, code, h) => h.comments(doc).length >= 1 },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      title: "2. Hyperlinks + Lists",
      tasks: [
        {
          id: "2.1",
          title: "ลิงก์แบบ Absolute path",
          level: 1,
          prompt: "<p>จงสร้างลิงก์ด้วย <code>&lt;a&gt;</code> ที่พาไปยัง URL แบบเต็ม <strong>https://mycourses.ict.mahidol.ac.th/</strong> โดยข้อความที่คลิกได้คือ <strong>MyCourses</strong></p>",
          solution: `<a href="https://mycourses.ict.mahidol.ac.th/">MyCourses</a>`,
          checks: [
            { hint: "ยังไม่พบลิงก์ `<a>`", test: (doc) => doc.querySelector("a") !== null },
            { hint: "ลิงก์ยังไม่มีปลายทาง — ตรวจสอบ attribute ที่ใช้ระบุปลายทาง", test: (doc) => doc.querySelector("a").hasAttribute("href") },
            { hint: "ตรวจสอบปลายทางของลิงก์ให้ตรงกับ URL ในโจทย์ทุกตัวอักษร", test: (doc, code, h) => h.attr(doc.querySelector("a"), "href") === "https://mycourses.ict.mahidol.ac.th/" },
            { hint: "ตรวจสอบข้อความที่คลิกได้ของลิงก์", test: (doc, code, h) => h.text(doc.querySelector("a")) === "MyCourses" },
          ],
        },
        {
          id: "2.2",
          title: "Relative path และลิงก์อีเมล",
          level: 1,
          prompt: "<p>จงสร้างลิงก์ 2 ลิงก์</p><ul><li>ลิงก์แรกไปยังไฟล์ <strong>about.html</strong> ที่อยู่ในโฟลเดอร์เดียวกัน (relative path) ข้อความ <strong>เกี่ยวกับฉัน</strong></li><li>ลิงก์ที่สองเป็นลิงก์ส่งอีเมลไปที่ <strong>abc@example.com</strong> ข้อความ <strong>Send Email</strong></li></ul>",
          solution: `<a href="about.html">เกี่ยวกับฉัน</a>
<a href="mailto:abc@example.com">Send Email</a>`,
          checks: [
            { hint: "ยังไม่พบลิงก์ที่ใช้ relative path ไปยังไฟล์ตามโจทย์", test: (doc) => Array.from(doc.querySelectorAll("a")).some((a) => ["about.html", "./about.html"].includes((a.getAttribute("href") || "").trim())) },
            {
              hint: "ตรวจสอบข้อความของลิงก์ที่ไปยัง about.html",
              test: (doc, code, h) => Array.from(doc.querySelectorAll("a")).some((a) => ["about.html", "./about.html"].includes(h.attr(a, "href")) && h.text(a) === "เกี่ยวกับฉัน"),
            },
            { hint: "ยังไม่พบลิงก์อีเมล — ตรวจสอบคำนำหน้าที่ต้องใส่ก่อนที่อยู่อีเมลใน href", test: (doc, code, h) => Array.from(doc.querySelectorAll("a")).some((a) => h.attr(a, "href") === "mailto:abc@example.com") },
            { hint: "ตรวจสอบข้อความของลิงก์อีเมล", test: (doc, code, h) => Array.from(doc.querySelectorAll("a")).some((a) => h.attr(a, "href") === "mailto:abc@example.com" && h.text(a) === "Send Email") },
          ],
        },
        {
          id: "2.3",
          title: "Unordered list",
          level: 1,
          prompt: "<p>จงสร้างลิสต์แบบ <strong>bullet point</strong> แสดงงานอดิเรก <strong>3 รายการ</strong> (ข้อความอะไรก็ได้)</p>",
          solution: `<ul>
  <li>Cooking</li>
  <li>Gaming</li>
  <li>Gardening</li>
</ul>`,
          checks: [
            { hint: "ยังไม่พบลิสต์ที่แสดงเป็น bullet point", test: (doc) => doc.querySelector("ul") !== null },
            { hint: "ลิสต์นี้ไม่ควรเป็นแบบมีตัวเลขลำดับ", test: (doc) => doc.querySelector("ol") === null },
            { hint: "ตรวจสอบจำนวนรายการ `<li>` ในลิสต์", test: (doc) => doc.querySelectorAll("ul > li").length === 3 },
            { hint: "มีบางรายการที่ยังไม่มีข้อความ", test: (doc, code, h) => Array.from(doc.querySelectorAll("ul > li")).every((li) => h.text(li)) },
          ],
        },
        {
          id: "2.4",
          title: "Ordered list ตามลำดับ",
          level: 2,
          prompt: "<p>จงสร้างลิสต์แบบ<strong>มีตัวเลขลำดับ</strong> แสดงชื่อ search engine 5 อันดับ เรียงตามนี้: <strong>Google, Bing, Baidu, Yahoo!, Yandex</strong></p>",
          solution: `<ol>
  <li>Google</li>
  <li>Bing</li>
  <li>Baidu</li>
  <li>Yahoo!</li>
  <li>Yandex</li>
</ol>`,
          checks: [
            { hint: "ยังไม่พบลิสต์แบบมีตัวเลขลำดับ", test: (doc) => doc.querySelector("ol") !== null },
            { hint: "ตรวจสอบจำนวนรายการในลิสต์", test: (doc) => doc.querySelectorAll("ol > li").length === 5 },
            { hint: "ตรวจสอบข้อความและลำดับของแต่ละรายการ", test: (doc, code, h) => Array.from(doc.querySelectorAll("ol > li")).map(h.text).join("|") === "Google|Bing|Baidu|Yahoo!|Yandex" },
          ],
        },
        {
          id: "2.5",
          title: "Nested list",
          level: 3,
          prompt: "<p>จงสร้างลิสต์แบบ bullet point <strong>2 รายการ</strong> คือ <strong>ผลไม้</strong> และ <strong>ผัก</strong> โดยแต่ละรายการมี<strong>ลิสต์แบบมีตัวเลขลำดับซ้อนอยู่ข้างใน</strong> อย่างน้อย 2 รายการ (ข้อความอะไรก็ได้)</p>",
          solution: `<ul>
  <li>ผลไม้
    <ol>
      <li>มะม่วง</li>
      <li>ทุเรียน</li>
    </ol>
  </li>
  <li>ผัก
    <ol>
      <li>คะน้า</li>
      <li>กะหล่ำ</li>
    </ol>
  </li>
</ul>`,
          checks: [
            { hint: "ยังไม่พบลิสต์แม่แบบ bullet point", test: (doc) => Array.from(doc.querySelectorAll("ul")).some((ul) => !ul.closest("li")) },
            { hint: "ลิสต์ย่อยต้องอยู่ภายใน `<li>` ของรายการแม่ (ก่อนปิด `</li>`) ไม่ใช่อยู่ติดกับ `<li>`", test: (doc) => doc.querySelector("ul > ol") === null },
            {
              hint: "ตรวจสอบรายการของลิสต์แม่ — ต้องมี 2 รายการตามโจทย์ เรียงตามลำดับ",
              test: (doc, code, h) => {
                const ul = Array.from(doc.querySelectorAll("ul")).find((u) => !u.closest("li"));
                return Array.from(ul.children).filter((c) => c.tagName === "LI").map(h.ownText).join("|") === "ผลไม้|ผัก";
              },
            },
            {
              hint: "ยังมีรายการแม่ที่ไม่มีลิสต์แบบมีตัวเลขลำดับซ้อนอยู่ครบ 2 รายการ",
              test: (doc) => {
                const ul = Array.from(doc.querySelectorAll("ul")).find((u) => !u.closest("li"));
                return Array.from(ul.children).filter((c) => c.tagName === "LI").every((li) => {
                  const ol = Array.from(li.children).find((c) => c.tagName === "OL");
                  return ol && ol.querySelectorAll(":scope > li").length >= 2;
                });
              },
            },
          ],
        },
        {
          id: "2.6",
          title: "Definition list พร้อมลิงก์",
          level: 3,
          prompt: "<p>จงสร้าง <strong>definition list</strong> ที่มี 2 คู่ เรียงตามนี้</p><ul><li><strong>HTML</strong> → Hypertext Markup Language</li><li><strong>CSS</strong> → Cascading Style Sheets</li></ul><p>โดย<strong>คำ</strong> (HTML และ CSS) ทั้งสองคำต้องเป็นลิงก์ (ปลายทางอะไรก็ได้)</p>",
          solution: `<dl>
  <dt><a href="https://www.w3schools.com/html/">HTML</a></dt>
  <dd>Hypertext Markup Language</dd>
  <dt><a href="https://www.w3schools.com/css/">CSS</a></dt>
  <dd>Cascading Style Sheets</dd>
</dl>`,
          checks: [
            { hint: "ยังไม่พบ definition list", test: (doc) => doc.querySelector("dl") !== null },
            { hint: "ตรวจสอบลำดับภายในลิสต์ — แต่ละคู่ต้องเป็นคำตามด้วยคำอธิบาย", test: (doc) => Array.from(doc.querySelector("dl").children).map((c) => c.tagName).join() === "DT,DD,DT,DD" },
            { hint: "ตรวจสอบข้อความของคำ (term) ทั้งสองคำ", test: (doc, code, h) => Array.from(doc.querySelectorAll("dl > dt")).map(h.text).join("|") === "HTML|CSS" },
            { hint: "ตรวจสอบข้อความของคำอธิบายทั้งสองรายการ", test: (doc, code, h) => Array.from(doc.querySelectorAll("dl > dd")).map(h.text).join("|") === "Hypertext Markup Language|Cascading Style Sheets" },
            { hint: "คำใน definition list ยังไม่เป็นลิงก์ครบทั้งสองคำ", test: (doc, code, h) => Array.from(doc.querySelectorAll("dl > dt")).every((dt) => { const a = dt.querySelector("a"); return a && h.attr(a, "href"); }) },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      title: "3. Images + Character Entities",
      tasks: [
        {
          id: "3.1",
          title: "รูปภาพพร้อม alt",
          level: 1,
          prompt: "<p>จงเขียน <code>&lt;img&gt;</code> ที่ <code>src</code> ชี้ไปที่ <strong>cat.jpg</strong> และมี attribute <code>alt</code> อธิบายรูปว่า <strong>แมวกำลังนอนหลับ</strong></p>",
          solution: `<img src="cat.jpg" alt="แมวกำลังนอนหลับ">`,
          checks: [
            { hint: "ยังไม่พบ `<img>`", test: (doc) => doc.querySelector("img") !== null },
            { hint: "ตรวจสอบค่า `src` ของรูปภาพ", test: (doc, code, h) => h.attr(doc.querySelector("img"), "src") === "cat.jpg" },
            { hint: "ตรวจสอบคำอธิบายรูปภาพสำหรับ accessibility", test: (doc, code, h) => h.attr(doc.querySelector("img"), "alt") === "แมวกำลังนอนหลับ" },
          ],
        },
        {
          id: "3.2",
          title: "แสดงเครื่องหมาย < และ >",
          level: 1,
          prompt: "<p>จงเขียน HTML ที่แสดงผลเครื่องหมาย<strong>น้อยกว่า (&lt;)</strong> และ<strong>มากกว่า (&gt;)</strong> บนหน้าเว็บ โดยใช้ <strong>character entity</strong> (ห้ามพิมพ์เครื่องหมาย &lt; &gt; ตรงๆ ในเนื้อหา เพราะจะถูกตีความเป็น tag)</p>",
          solution: `<p>5 &lt; 10 และ 10 &gt; 5</p>`,
          checks: [
            { hint: "ยังไม่พบ character entity ของเครื่องหมายน้อยกว่า", test: (doc, code) => /&lt;|&#60;/.test(code) },
            { hint: "ยังไม่พบ character entity ของเครื่องหมายมากกว่า", test: (doc, code) => /&gt;|&#62;/.test(code) },
            { hint: "เครื่องหมายยังไม่แสดงบนหน้าเว็บครบ — ตรวจสอบว่า entity เขียนถูกและอยู่ใน body", test: (doc) => doc.body.textContent.includes("<") && doc.body.textContent.includes(">") },
          ],
        },
        {
          id: "3.3",
          title: "รูปภาพที่คลิกได้",
          level: 2,
          prompt: "<p>จงทำให้รูปภาพ <strong>usagi.gif</strong> (มี <code>alt</code> อธิบายรูปอะไรก็ได้ที่ไม่ว่าง) <strong>คลิกได้</strong> และพาไปยังไฟล์ <strong>gallery.html</strong></p>",
          solution: `<a href="gallery.html">
  <img src="usagi.gif" alt="กระต่ายกำลังปรบมือ">
</a>`,
          checks: [
            { hint: "ยังไม่พบรูปภาพ `usagi.gif`", test: (doc, code, h) => Array.from(doc.querySelectorAll("img")).some((i) => h.attr(i, "src") === "usagi.gif") },
            { hint: "รูปภาพยังไม่มีคำอธิบาย (alt) หรือคำอธิบายว่างอยู่", test: (doc, code, h) => { const i = Array.from(doc.querySelectorAll("img")).find((x) => h.attr(x, "src") === "usagi.gif"); return h.attr(i, "alt").length > 0; } },
            { hint: "รูปภาพยังคลิกไม่ได้ — ต้องอยู่ภายในลิงก์", test: (doc, code, h) => { const i = Array.from(doc.querySelectorAll("img")).find((x) => h.attr(x, "src") === "usagi.gif"); return Boolean(i.closest("a")); } },
            { hint: "ตรวจสอบปลายทางของลิงก์ที่ครอบรูปภาพ", test: (doc, code, h) => { const i = Array.from(doc.querySelectorAll("img")).find((x) => h.attr(x, "src") === "usagi.gif"); return h.attr(i.closest("a"), "href") === "gallery.html"; } },
          ],
        },
        {
          id: "3.4",
          title: "สัญลักษณ์ลิขสิทธิ์",
          level: 2,
          prompt: "<p>จงเขียนย่อหน้า <code>&lt;p&gt;</code> ที่แสดงข้อความ <strong>© 2569 โต๊ะทบทวน</strong> โดยสัญลักษณ์ © ต้องเขียนด้วย character entity (ใช้แบบชื่อหรือแบบหมายเลขก็ได้)</p>",
          solution: `<p>&copy; 2569 โต๊ะทบทวน</p>`,
          checks: [
            { hint: "ยังไม่พบ character entity ของสัญลักษณ์ลิขสิทธิ์ในโค้ด", test: (doc, code) => /&copy;|&#169;/.test(code) },
            { hint: "ยังไม่พบย่อหน้า `<p>`", test: (doc) => doc.querySelector("p") !== null },
            { hint: "ตรวจสอบข้อความที่แสดงในย่อหน้าให้ตรงกับโจทย์ (entity เป็น case sensitive)", test: (doc, code, h) => Array.from(doc.querySelectorAll("p")).some((p) => h.text(p) === "© 2569 โต๊ะทบทวน") },
          ],
        },
        {
          id: "3.5",
          title: "แสดงชื่อ tag เป็นตัวอักษร",
          level: 3,
          prompt: "<p>จงเขียนย่อหน้าที่แสดงข้อความนี้บนหน้าเว็บ <strong>ตรงตัวทุกตัวอักษร</strong> ให้ผู้อ่านเห็นคำว่า &lt;br&gt; จริงๆ (ไม่ใช่ขึ้นบรรทัดใหม่)</p><p><code>&lt;br&gt; คือ tag ขึ้นบรรทัดใหม่</code></p>",
          solution: `<p>&lt;br&gt; คือ tag ขึ้นบรรทัดใหม่</p>`,
          checks: [
            { hint: "browser ยังตีความ `<br>` เป็นการขึ้นบรรทัดใหม่ — ต้องทำให้แสดงเป็นตัวอักษร", test: (doc) => doc.querySelector("br") === null },
            { hint: "ตรวจสอบข้อความที่แสดงบนหน้าเว็บให้ตรงกับโจทย์", test: (doc, code, h) => h.text(doc.body).includes("<br> คือ tag ขึ้นบรรทัดใหม่") },
          ],
        },
        {
          id: "3.6",
          title: "ค่า attribute ที่มีเครื่องหมายคำพูด",
          level: 3,
          prompt: "<p>จงเขียน <code>&lt;img&gt;</code> ที่ <code>src</code> คือ <strong>sign.png</strong> และ <code>alt</code> มีค่าเป็นข้อความนี้ตรงตัว (รวมเครื่องหมาย double quote ด้วย)</p><p><code>ป้าย \"ห้ามจอด\"</code></p>",
          solution: `<img src="sign.png" alt='ป้าย "ห้ามจอด"'>`,
          checks: [
            { hint: "ยังไม่พบ `<img>`", test: (doc) => doc.querySelector("img") !== null },
            { hint: "ตรวจสอบค่า `src` ของรูปภาพ", test: (doc, code, h) => h.attr(doc.querySelector("img"), "src") === "sign.png" },
            { hint: "ค่า `alt` ยังไม่ตรง — เครื่องหมายคำพูดข้างในอาจไปปิดค่า attribute ก่อนเวลา ลองนึกถึงกฎเรื่อง quote styles", test: (doc) => (doc.querySelector("img").getAttribute("alt") || "") === "ป้าย \"ห้ามจอด\"" },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      title: "4. HTML Table",
      tasks: [
        {
          id: "4.1",
          title: "ตาราง 2 × 2",
          level: 1,
          prompt: "<p>จงสร้างตารางขนาด <strong>2 แถว × 2 หลัก</strong> โดยทุกเซลล์เป็น <code>&lt;td&gt;</code> ที่มีข้อความอะไรก็ได้</p>",
          solution: `<table>
  <tr>
    <td>A1</td>
    <td>B1</td>
  </tr>
  <tr>
    <td>A2</td>
    <td>B2</td>
  </tr>
</table>`,
          checks: [
            { hint: "ยังไม่พบ `<table>`", test: (doc) => doc.querySelector("table") !== null },
            { hint: "ตรวจสอบจำนวนแถวของตาราง", test: (doc) => doc.querySelector("table").rows.length === 2 },
            { hint: "ตรวจสอบจำนวนหลักในแต่ละแถว — ทุกเซลล์ต้องเป็น `<td>`", test: (doc) => Array.from(doc.querySelector("table").rows).every((r) => r.cells.length === 2 && r.querySelectorAll("td").length === 2) },
            { hint: "มีเซลล์ที่ยังไม่มีข้อความ", test: (doc, code, h) => Array.from(doc.querySelectorAll("table td")).every((td) => h.text(td)) },
          ],
        },
        {
          id: "4.2",
          title: "หัวตารางด้วย <th>",
          level: 1,
          prompt: "<p>จงสร้างตารางที่แถวแรกเป็น<strong>หัวตาราง</strong> 3 เซลล์ ข้อความ <strong>States</strong>, <strong>Abbr.</strong>, <strong>Capital</strong> และมีแถวข้อมูลอย่างน้อย 2 แถว แถวละ 3 เซลล์ (ข้อมูลอะไรก็ได้)</p>",
          solution: `<table>
  <tr>
    <th>States</th>
    <th>Abbr.</th>
    <th>Capital</th>
  </tr>
  <tr>
    <td>Pennsylvania</td>
    <td>PA</td>
    <td>Harrisburg</td>
  </tr>
  <tr>
    <td>New York</td>
    <td>NY</td>
    <td>Albany</td>
  </tr>
</table>`,
          checks: [
            { hint: "ยังไม่พบ `<table>`", test: (doc) => doc.querySelector("table") !== null },
            { hint: "แถวแรกยังไม่เป็นเซลล์หัวตารางครบ 3 เซลล์", test: (doc) => { const r = doc.querySelector("table").rows[0]; return r && r.cells.length === 3 && r.querySelectorAll("th").length === 3; } },
            { hint: "ตรวจสอบข้อความของหัวตาราง", test: (doc, code, h) => Array.from(doc.querySelector("table").rows[0].cells).map(h.text).join("|") === "States|Abbr.|Capital" },
            { hint: "แถวข้อมูลยังไม่ครบตามโจทย์ — ต้องมีอย่างน้อย 2 แถว แถวละ 3 เซลล์ข้อมูล", test: (doc) => { const rows = Array.from(doc.querySelector("table").rows).slice(1); return rows.length >= 2 && rows.every((r) => r.querySelectorAll("td").length === 3); } },
          ],
        },
        {
          id: "4.3",
          title: "เซลล์ว่าง",
          level: 2,
          prompt: "<p>จงสร้างตาราง 2 × 2 (ใช้ <code>&lt;td&gt;</code> ทั้งหมด) ที่<strong>เซลล์ขวาล่างเป็นเซลล์ว่าง</strong> ตามวิธีในสไลด์ ส่วนเซลล์อื่นมีข้อความอะไรก็ได้</p>",
          solution: `<table>
  <tr>
    <td>ชื่อ</td>
    <td>คะแนน</td>
  </tr>
  <tr>
    <td>โต๊ะ</td>
    <td>&nbsp;</td>
  </tr>
</table>`,
          checks: [
            { hint: "ตรวจสอบขนาดตาราง — ต้องเป็น 2 แถว แถวละ 2 `<td>`", test: (doc) => { const t = doc.querySelector("table"); return t && t.rows.length === 2 && Array.from(t.rows).every((r) => r.querySelectorAll("td").length === 2); } },
            { hint: "ยังไม่พบ character entity ที่ใช้สร้างเซลล์ว่างในโค้ด", test: (doc, code) => /&nbsp;|&#160;/.test(code) },
            { hint: "ตรวจสอบเซลล์ขวาล่าง — ต้องมีแค่ entity สำหรับเซลล์ว่าง ไม่มีข้อความอื่น", test: (doc) => doc.querySelector("table").rows[1].cells[1].textContent === " " },
            { hint: "เซลล์อื่นนอกจากขวาล่างควรมีข้อความ", test: (doc, code, h) => { const r = doc.querySelector("table").rows; return [r[0].cells[0], r[0].cells[1], r[1].cells[0]].every((c) => h.text(c).replace(/ /g, "")); } },
          ],
        },
        {
          id: "4.4",
          title: "colspan",
          level: 2,
          prompt: "<p>จงสร้างตาราง 2 แถว</p><ul><li>แถวแรกมี<strong>หัวตารางเพียงเซลล์เดียว</strong> ข้อความ <strong>ตารางเรียน</strong> ที่<strong>กว้างเท่ากับ 3 หลัก</strong></li><li>แถวที่สองมี <code>&lt;td&gt;</code> 3 เซลล์ ข้อความ <strong>จันทร์</strong>, <strong>อังคาร</strong>, <strong>พุธ</strong></li></ul>",
          solution: `<table>
  <tr>
    <th colspan="3">ตารางเรียน</th>
  </tr>
  <tr>
    <td>จันทร์</td>
    <td>อังคาร</td>
    <td>พุธ</td>
  </tr>
</table>`,
          checks: [
            { hint: "ตรวจสอบแถวแรก — ต้องมีหัวตาราง `<th>` เพียงเซลล์เดียว", test: (doc) => { const t = doc.querySelector("table"); return t && t.rows[0] && t.rows[0].cells.length === 1 && t.rows[0].cells[0].tagName === "TH"; } },
            { hint: "หัวตารางยังไม่กว้างเท่ากับ 3 หลัก — ตรวจสอบ attribute ที่ใช้ขยายเซลล์ในแนวนอน", test: (doc, code, h) => h.attr(doc.querySelector("table").rows[0].cells[0], "colspan") === "3" },
            { hint: "ตรวจสอบข้อความของหัวตาราง", test: (doc, code, h) => h.text(doc.querySelector("table").rows[0].cells[0]) === "ตารางเรียน" },
            { hint: "ตรวจสอบแถวที่สอง — ต้องมี `<td>` 3 เซลล์ตามข้อความในโจทย์", test: (doc, code, h) => { const r = doc.querySelector("table").rows[1]; return r && r.querySelectorAll("td").length === 3 && Array.from(r.cells).map(h.text).join("|") === "จันทร์|อังคาร|พุธ"; } },
          ],
        },
        {
          id: "4.5",
          title: "rowspan",
          level: 3,
          prompt: "<p>จงสร้างตาราง 2 แถวที่<strong>เซลล์แรกของแถวแรกสูงเท่ากับ 2 แถว</strong> ข้อความ <strong>ICT</strong></p><ul><li>แถวแรก: เซลล์ ICT และอีก 1 เซลล์ ข้อความ <strong>ปี 1</strong></li><li>แถวที่สอง: มีเซลล์ข้อความ <strong>ปี 2</strong> เพียงเซลล์เดียว (เพราะหลักแรกถูกเซลล์ ICT ครอบไว้แล้ว)</li></ul><p>ใช้ <code>&lt;td&gt;</code> ทุกเซลล์</p>",
          solution: `<table>
  <tr>
    <td rowspan="2">ICT</td>
    <td>ปี 1</td>
  </tr>
  <tr>
    <td>ปี 2</td>
  </tr>
</table>`,
          checks: [
            { hint: "ตรวจสอบจำนวนแถวของตาราง", test: (doc) => { const t = doc.querySelector("table"); return t && t.rows.length === 2; } },
            { hint: "ตรวจสอบเซลล์แรกของแถวแรก — ข้อความและความสูงที่ต้องครอบคลุม 2 แถว", test: (doc, code, h) => { const c = doc.querySelector("table").rows[0].cells[0]; return h.text(c) === "ICT" && h.attr(c, "rowspan") === "2"; } },
            { hint: "ตรวจสอบแถวแรก — ต้องมี 2 เซลล์ และเซลล์ที่สองเป็นข้อความตามโจทย์", test: (doc, code, h) => { const r = doc.querySelector("table").rows[0]; return r.cells.length === 2 && h.text(r.cells[1]) === "ปี 1"; } },
            { hint: "ตรวจสอบแถวที่สอง — ต้องมีเพียงเซลล์เดียว", test: (doc, code, h) => { const r = doc.querySelector("table").rows[1]; return r.cells.length === 1 && h.text(r.cells[0]) === "ปี 2"; } },
            { hint: "ใช้ `<td>` ทุกเซลล์ตามโจทย์", test: (doc) => doc.querySelectorAll("table th").length === 0 },
          ],
        },
        {
          id: "4.6",
          title: "ตารางโปรไฟล์ตัวละคร (rowspan + colspan)",
          level: 3,
          prompt: "<p>จงสร้างตารางโปรไฟล์ตัวละครตามโครงนี้ (คล้ายตัวอย่าง Usagi ในสไลด์)</p><ul><li><strong>แถว 1:</strong> เซลล์ <code>&lt;td&gt;</code> ที่<strong>สูง 3 แถว</strong> ภายในมี <code>&lt;img&gt;</code> (มี alt ที่ไม่ว่าง) และเซลล์หัวตาราง <code>&lt;th&gt;</code> ที่<strong>กว้าง 3 หลัก</strong> ภายในมี <code>&lt;h1&gt;</code> ชื่อตัวละคร</li><li><strong>แถว 2:</strong> <code>&lt;th&gt;</code> 3 เซลล์ ข้อความ <strong>Color</strong>, <strong>Type</strong>, <strong>Best friends</strong></li><li><strong>แถว 3:</strong> <code>&lt;td&gt;</code> 3 เซลล์ ข้อมูลอะไรก็ได้</li></ul>",
          solution: `<table>
  <tr>
    <td rowspan="3">
      <img src="Usagi_Tired.gif" alt="Picture of a Usagi">
    </td>
    <th colspan="3">
      <h1>Character: Usagi</h1>
    </th>
  </tr>
  <tr>
    <th>Color</th>
    <th>Type</th>
    <th>Best friends</th>
  </tr>
  <tr>
    <td>Light Pink</td>
    <td>Rabbit</td>
    <td>Piske</td>
  </tr>
</table>`,
          checks: [
            { hint: "ตรวจสอบจำนวนแถวของตาราง — ต้องมี 3 แถว", test: (doc) => { const t = doc.querySelector("table"); return t && t.rows.length === 3; } },
            { hint: "ตรวจสอบเซลล์แรกของแถว 1 — ต้องเป็น `<td>` ที่สูง 3 แถว", test: (doc, code, h) => { const c = doc.querySelector("table").rows[0].cells[0]; return c && c.tagName === "TD" && h.attr(c, "rowspan") === "3"; } },
            { hint: "เซลล์ที่สูง 3 แถวยังไม่มีรูปภาพที่มีคำอธิบาย", test: (doc, code, h) => { const img = doc.querySelector("table").rows[0].cells[0].querySelector("img"); return Boolean(img && h.attr(img, "src") && h.attr(img, "alt")); } },
            { hint: "ตรวจสอบเซลล์ที่สองของแถว 1 — ต้องเป็นหัวตารางที่กว้าง 3 หลัก", test: (doc, code, h) => { const c = doc.querySelector("table").rows[0].cells[1]; return c && c.tagName === "TH" && h.attr(c, "colspan") === "3"; } },
            { hint: "หัวตารางแถว 1 ยังไม่มี `<h1>` ชื่อตัวละคร", test: (doc, code, h) => h.text(doc.querySelector("table").rows[0].cells[1].querySelector("h1")).length > 0 },
            { hint: "ตรวจสอบแถว 2 — ต้องเป็นหัวตาราง 3 เซลล์ตามข้อความในโจทย์", test: (doc, code, h) => { const r = doc.querySelector("table").rows[1]; return r.cells.length === 3 && r.querySelectorAll("th").length === 3 && Array.from(r.cells).map(h.text).join("|") === "Color|Type|Best friends"; } },
            { hint: "ตรวจสอบแถว 3 — ต้องมี `<td>` 3 เซลล์ที่มีข้อมูล", test: (doc, code, h) => { const r = doc.querySelector("table").rows[2]; return r.cells.length === 3 && r.querySelectorAll("td").length === 3 && Array.from(r.cells).every((c) => h.text(c)); } },
          ],
        },
      ],
    },
  ],
};
