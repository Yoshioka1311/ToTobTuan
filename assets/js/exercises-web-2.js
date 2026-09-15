/* ==========================================================================
   โจทย์เขียนโค้ด ITDS241 บทที่ 2 (กลุ่ม 5–6) — ใช้กับ code-exercise.js
   ========================================================================== */
window.CODE_EXERCISE_SET = {
  id: "web-2",
  groups: [
    /* ------------------------------------------------------------------ */
    {
      title: "5. Forms + Form Elements",
      tasks: [
        {
          id: "5.1",
          title: "ช่องกรอกชื่อพร้อม label",
          level: 1,
          prompt: "<p>จงสร้าง <code>&lt;form&gt;</code> ที่มี <code>&lt;input type=\"text\"&gt;</code> สำหรับกรอกชื่อ พร้อม <code>&lt;label&gt;</code> ที่<strong>ผูกกับช่องกรอกด้วย for / id ให้ถูกต้อง</strong></p>",
          solution: `<form>
  <label for="txtName">Name</label>
  <input type="text" id="txtName">
</form>`,
          checks: [
            { hint: "ยังไม่พบ `<form>`", test: (doc) => doc.querySelector("form") !== null },
            { hint: "ยังไม่พบช่องกรอกข้อความบรรทัดเดียวตามโจทย์", test: (doc) => doc.querySelector('input[type="text" i]') !== null },
            { hint: "ยังไม่พบ `<label>`", test: (doc) => doc.querySelector("label") !== null },
            { hint: "ช่องกรอกยังไม่มี id ให้ label อ้างถึง", test: (doc, code, h) => h.attr(doc.querySelector('input[type="text" i]'), "id").length > 0 },
            { hint: "label ยังไม่ได้ผูกกับช่องกรอก — ตรวจสอบค่า `for` ให้ตรงกับ id", test: (doc, code, h) => h.attr(doc.querySelector("label"), "for") === h.attr(doc.querySelector('input[type="text" i]'), "id") },
            { hint: "form element ทุกตัวต้องอยู่ภายใน `<form>`", test: (doc, code, h) => h.outsideForm(doc).length === 0 },
          ],
        },
        {
          id: "5.2",
          title: "Radio button กลุ่มเดียวกัน",
          level: 1,
          prompt: "<p>จงสร้าง <strong>radio button 3 ตัวเลือก</strong> (เช่น เล็ก / กลาง / ใหญ่) ที่อยู่<strong>กลุ่มเดียวกัน</strong> (เลือกได้ทีละตัวเลือกเท่านั้น) และมี<strong> 1 ตัวเลือกถูกเลือกไว้เป็นค่าเริ่มต้น</strong></p>",
          solution: `<input type="radio" name="size" value="S" checked>เล็ก<br>
<input type="radio" name="size" value="M">กลาง<br>
<input type="radio" name="size" value="L">ใหญ่<br>`,
          checks: [
            { hint: "ตรวจสอบจำนวน radio button — โจทย์ต้องการ 3 ตัวเลือก", test: (doc) => doc.querySelectorAll('input[type="radio" i]').length === 3 },
            {
              hint: "radio button ยังไม่อยู่กลุ่มเดียวกัน — ลองนึกว่า browser ใช้ attribute ไหนจัดกลุ่ม",
              test: (doc) => {
                const radios = Array.from(doc.querySelectorAll('input[type="radio" i]'));
                const name = radios[0].getAttribute("name");
                return Boolean(name) && radios.every((r) => r.getAttribute("name") === name);
              },
            },
            { hint: "ตรวจสอบค่าเริ่มต้น — ต้องมีตัวเลือกที่ถูกเลือกไว้ 1 ตัวพอดี", test: (doc) => Array.from(doc.querySelectorAll('input[type="radio" i]')).filter((r) => r.hasAttribute("checked")).length === 1 },
          ],
        },
        {
          id: "5.3",
          title: "Checkbox เลือกได้หลายข้อ",
          level: 2,
          prompt: "<p>จงสร้าง form ถามว่า \"What should I have for lunch?\" ที่มี <strong>checkbox 3 ตัวเลือก</strong> คือ Sandwich, Fried Chicken, Hamburger</p><ul><li>ทั้ง 3 ตัวอยู่กลุ่มเดียวกันด้วย name <strong>food</strong></li><li>แต่ละตัวมี <code>value</code> (อะไรก็ได้ที่ไม่ว่าง)</li><li><strong>เลือกไว้ล่วงหน้า 2 ตัว</strong></li></ul>",
          solution: `<form>
  What should I have for lunch? <br>
  <input type="checkbox" name="food" value="SW" checked>Sandwich<br>
  <input type="checkbox" name="food" value="FC" checked>Fried Chicken<br>
  <input type="checkbox" name="food" value="HB">Hamburger<br>
</form>`,
          checks: [
            { hint: "ยังไม่พบ `<form>`", test: (doc) => doc.querySelector("form") !== null },
            { hint: "ตรวจสอบจำนวน checkbox — โจทย์ต้องการ 3 ตัวเลือก", test: (doc) => doc.querySelectorAll('input[type="checkbox" i]').length === 3 },
            { hint: "checkbox ยังไม่อยู่กลุ่มเดียวกันตามชื่อที่โจทย์กำหนด", test: (doc) => Array.from(doc.querySelectorAll('input[type="checkbox" i]')).every((c) => c.getAttribute("name") === "food") },
            { hint: "มี checkbox ที่ยังไม่มี value", test: (doc, code, h) => Array.from(doc.querySelectorAll('input[type="checkbox" i]')).every((c) => h.attr(c, "value")) },
            { hint: "ตรวจสอบจำนวนตัวเลือกที่ถูกเลือกไว้ล่วงหน้า", test: (doc) => Array.from(doc.querySelectorAll('input[type="checkbox" i]')).filter((c) => c.hasAttribute("checked")).length === 2 },
            { hint: "form element ทุกตัวต้องอยู่ภายใน `<form>`", test: (doc, code, h) => h.outsideForm(doc).length === 0 },
          ],
        },
        {
          id: "5.4",
          title: "เบอร์โทรพร้อม validation",
          level: 2,
          prompt: "<p>จงสร้าง <code>&lt;form&gt;</code> ที่มีช่องกรอกเบอร์โทรศัพท์ (type <strong>tel</strong>, name <strong>mobile</strong>) โดยใช้ HTML5 form attributes ให้ครบ</p><ul><li>บังคับรูปแบบ XXX-XXX-XXXX ด้วย regular expression <code>[0-9]{3}-[0-9]{3}-[0-9]{4}</code></li><li>มีคำอธิบายรูปแบบให้ผู้ใช้ (ใช้คู่กับ pattern)</li><li>มีข้อความ hint ในช่องก่อนพิมพ์</li><li>บังคับว่าต้องกรอกก่อน submit</li><li>มีปุ่ม submit</li></ul>",
          solution: `<form>
  Mobile:
  <input type="tel" name="mobile"
         pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
         title="Mobile: XXX-XXX-XXXX"
         placeholder="081-234-5678"
         required>
  <button type="submit">Submit</button>
</form>`,
          checks: [
            { hint: "ยังไม่พบ `<form>`", test: (doc) => doc.querySelector("form") !== null },
            { hint: "ยังไม่พบช่องกรอกเบอร์โทรศัพท์ตามชนิดที่โจทย์กำหนด", test: (doc) => doc.querySelector('input[type="tel" i]') !== null },
            { hint: "ตรวจสอบ name ของช่องเบอร์โทร", test: (doc, code, h) => h.attr(doc.querySelector('input[type="tel" i]'), "name") === "mobile" },
            { hint: "ตรวจสอบ regular expression ที่ใช้บังคับรูปแบบ", test: (doc, code, h) => h.attr(doc.querySelector('input[type="tel" i]'), "pattern") === "[0-9]{3}-[0-9]{3}-[0-9]{4}" },
            { hint: "ยังไม่มีคำอธิบายรูปแบบสำหรับผู้ใช้", test: (doc, code, h) => h.attr(doc.querySelector('input[type="tel" i]'), "title").length > 0 },
            { hint: "ยังไม่มีข้อความ hint ในช่องกรอก", test: (doc, code, h) => h.attr(doc.querySelector('input[type="tel" i]'), "placeholder").length > 0 },
            { hint: "ช่องนี้ยังไม่ถูกบังคับให้กรอกก่อน submit", test: (doc) => doc.querySelector('input[type="tel" i]').hasAttribute("required") },
            { hint: "ยังไม่พบปุ่ม submit ภายใน form", test: (doc) => doc.querySelector('form button[type="submit" i], form input[type="submit" i]') !== null || Array.from(doc.querySelectorAll("form button")).some((b) => !b.hasAttribute("type")) },
            { hint: "form element ทุกตัวต้องอยู่ภายใน `<form>`", test: (doc, code, h) => h.outsideForm(doc).length === 0 },
          ],
        },
        {
          id: "5.5",
          title: "Drop-down list และ textarea",
          level: 3,
          prompt: "<p>จงสร้าง <code>&lt;form&gt;</code> ที่มี 2 ส่วน</p><ul><li><strong>Major:</strong> drop-down list name <strong>majors</strong> มี 4 ตัวเลือก value <strong>CS, CE, IS, IT</strong> (ข้อความที่แสดงอะไรก็ได้) โดย<strong>ตัวเลือก IT เป็นค่าเริ่มต้น</strong></li><li><strong>Address:</strong> กล่องข้อความหลายบรรทัดขนาด <strong>3 แถว × 20 คอลัมน์</strong></li></ul>",
          solution: `<form>
  Major:
  <select name="majors">
    <option value="CS">Comp.Sci.</option>
    <option value="CE">Comp.Eng.</option>
    <option value="IS">Info.Sci.</option>
    <option value="IT" selected>Info.Tech.</option>
  </select>
  <br>
  Address:<br>
  <textarea rows="3" cols="20"></textarea>
</form>`,
          checks: [
            { hint: "ยังไม่พบ `<form>`", test: (doc) => doc.querySelector("form") !== null },
            { hint: "ยังไม่พบ drop-down list ตามชื่อที่โจทย์กำหนด", test: (doc, code, h) => Array.from(doc.querySelectorAll("select")).some((s) => h.attr(s, "name") === "majors") },
            { hint: "ตรวจสอบตัวเลือกใน drop-down — ต้องมี 4 ตัวตาม value ในโจทย์", test: (doc, code, h) => { const s = doc.querySelector('select[name="majors"]'); return Array.from(s.querySelectorAll("option")).map((o) => h.attr(o, "value")).sort().join() === "CE,CS,IS,IT"; } },
            { hint: "ตรวจสอบค่าเริ่มต้นของ drop-down", test: (doc) => { const selected = Array.from(doc.querySelectorAll('select[name="majors"] option')).filter((o) => o.hasAttribute("selected")); return selected.length === 1 && selected[0].getAttribute("value") === "IT"; } },
            { hint: "ยังไม่พบกล่องข้อความหลายบรรทัด", test: (doc) => doc.querySelector("textarea") !== null },
            { hint: "ตรวจสอบขนาดของกล่องข้อความหลายบรรทัด", test: (doc, code, h) => { const t = doc.querySelector("textarea"); return h.attr(t, "rows") === "3" && h.attr(t, "cols") === "20"; } },
            { hint: "form element ทุกตัวต้องอยู่ภายใน `<form>`", test: (doc, code, h) => h.outsideForm(doc).length === 0 },
          ],
        },
        {
          id: "5.6",
          title: "[EX2] Sign-Up Form",
          level: 3,
          prompt: "<p>ต่อยอดแบบฝึกหัด EX2 ในสไลด์: จงสร้าง Sign-up Form ที่มีครบทุกข้อ</p><ul><li><code>&lt;form&gt;</code> ส่งข้อมูลไปที่ <strong>register.html</strong> ด้วย method <strong>POST</strong></li><li>จัดกลุ่มช่องกรอกทั้งหมดในกรอบที่มีหัวข้อ (caption) ข้อความ <strong>Sign Up</strong></li><li>ช่องชื่อนักศึกษา (type text) — <strong>บังคับกรอก</strong></li><li>ช่องอีเมล (type email) — <strong>บังคับกรอก</strong></li><li>ช่องรหัสผ่าน (ตัวอักษรถูกปิดบัง)</li><li>ช่องวันที่แบบปฏิทิน ที่<strong>เลือกได้ไม่เกินวันที่ 1 มกราคม 2565</strong> (ค.ศ. 2022)</li><li>ช่องกรอกทุกช่องมี <code>&lt;label&gt;</code> ผูกด้วย for / id</li><li>ปุ่ม <strong>submit</strong> และปุ่ม <strong>reset</strong></li></ul>",
          solution: `<form action="register.html" method="POST">
  <fieldset>
    <legend>Sign Up</legend>
    <label for="txtName">Student name</label><br>
    <input type="text" id="txtName" name="name" required><br>
    <label for="txtEmail">Email</label><br>
    <input type="email" id="txtEmail" name="email" required><br>
    <label for="txtPwd">Password</label><br>
    <input type="password" id="txtPwd" name="password"><br>
    <label for="cldEnd">Date</label><br>
    <input type="date" id="cldEnd" name="date" max="2022-01-01"><br>
    <button type="submit">Submit</button>
    <button type="reset">Clear</button>
  </fieldset>
</form>`,
          checks: [
            { hint: "ยังไม่พบ `<form>`", test: (doc) => doc.querySelector("form") !== null },
            { hint: "ตรวจสอบปลายทางที่ form จะส่งข้อมูลไป", test: (doc, code, h) => h.attr(doc.querySelector("form"), "action") === "register.html" },
            { hint: "ตรวจสอบวิธีการส่งข้อมูลของ form", test: (doc, code, h) => h.attr(doc.querySelector("form"), "method").toLowerCase() === "post" },
            { hint: "ยังไม่มีกรอบจัดกลุ่มพร้อมหัวข้อตามโจทย์", test: (doc, code, h) => { const fs = doc.querySelector("form fieldset"); return Boolean(fs && h.text(fs.querySelector("legend")) === "Sign Up"); } },
            { hint: "ยังไม่พบช่องชื่อนักศึกษาที่บังคับกรอก", test: (doc) => Array.from(doc.querySelectorAll('input[type="text" i]')).some((i) => i.hasAttribute("required")) },
            { hint: "ยังไม่พบช่องอีเมลที่บังคับกรอก", test: (doc) => Array.from(doc.querySelectorAll('input[type="email" i]')).some((i) => i.hasAttribute("required")) },
            { hint: "ยังไม่พบช่องรหัสผ่านที่ปิดบังตัวอักษร", test: (doc) => doc.querySelector('input[type="password" i]') !== null },
            { hint: "ยังไม่พบช่องวันที่ หรือช่องวันที่ยังไม่ได้จำกัดวันสุดท้ายตามโจทย์ (รูปแบบวันที่ YYYY-MM-DD)", test: (doc, code, h) => Array.from(doc.querySelectorAll('input[type="date" i]')).some((i) => h.attr(i, "max") === "2022-01-01") },
            {
              hint: "มีช่องกรอกบางช่องที่ยังไม่มี label ผูกด้วย for / id",
              test: (doc, code, h) => Array.from(doc.querySelectorAll('input:not([type="submit" i]):not([type="reset" i]):not([type="button" i])')).every((i) => h.labelFor(doc, i)),
            },
            { hint: "ยังไม่พบปุ่ม submit", test: (doc) => doc.querySelector('button[type="submit" i], input[type="submit" i]') !== null },
            { hint: "ยังไม่พบปุ่ม reset", test: (doc) => doc.querySelector('button[type="reset" i], input[type="reset" i]') !== null },
            { hint: "form element ทุกตัวต้องอยู่ภายใน `<form>`", test: (doc, code, h) => h.outsideForm(doc).length === 0 },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      title: "6. Semantic Elements + Layout",
      tasks: [
        {
          id: "6.1",
          title: "ส่วนหัวและส่วนท้าย",
          level: 1,
          prompt: "<p>จงสร้าง<strong>ส่วนหัวของเอกสาร</strong>ที่มี <code>&lt;h1&gt;</code> ข้อความอะไรก็ได้ และ<strong>ส่วนท้ายของเอกสาร</strong>ที่มี <code>&lt;p&gt;</code> ข้อมูลติดต่ออะไรก็ได้ โดยใช้ semantic elements และส่วนหัวต้องมาก่อนส่วนท้าย</p>",
          solution: `<header>
  <h1>This is Header Part</h1>
</header>
<footer>
  <p>Contact information: jidapa.kra[AT]mahidol.edu</p>
</footer>`,
          checks: [
            { hint: "ยังไม่พบ semantic element สำหรับส่วนหัวของเอกสาร", test: (doc) => doc.querySelector("header") !== null },
            { hint: "ส่วนหัวยังไม่มี `<h1>` ที่มีข้อความ", test: (doc, code, h) => h.text(doc.querySelector("header h1")).length > 0 },
            { hint: "ยังไม่พบ semantic element สำหรับส่วนท้ายของเอกสาร", test: (doc) => doc.querySelector("footer") !== null },
            { hint: "ส่วนท้ายยังไม่มี `<p>` ที่มีข้อความ", test: (doc, code, h) => h.text(doc.querySelector("footer p")).length > 0 },
            { hint: "ตรวจสอบลำดับ — ส่วนหัวต้องมาก่อนส่วนท้าย", test: (doc, code, h) => h.before(doc.querySelector("header"), doc.querySelector("footer")) },
            { hint: "ไม่ต้องใช้ `<div>` ในข้อนี้", test: (doc) => doc.querySelector("div") === null },
          ],
        },
        {
          id: "6.2",
          title: "เมนูนำทาง",
          level: 1,
          prompt: "<p>จงสร้าง<strong>เมนูนำทาง</strong>ด้วย semantic element ที่มีลิงก์ 4 ลิงก์ ข้อความ <strong>HTML</strong>, <strong>HTML5</strong>, <strong>CSS</strong>, <strong>JavaScript</strong> ตามลำดับ (ปลายทางอะไรก็ได้ที่ไม่ว่าง)</p>",
          solution: `<nav>
  <a href="/html/">HTML</a> |
  <a href="/html5/">HTML5</a> |
  <a href="/css/">CSS</a> |
  <a href="/js/">JavaScript</a>
</nav>`,
          checks: [
            { hint: "ยังไม่พบ semantic element สำหรับลิงก์นำทาง", test: (doc) => doc.querySelector("nav") !== null },
            { hint: "ตรวจสอบจำนวนลิงก์ภายในเมนูนำทาง", test: (doc) => doc.querySelectorAll("nav a").length === 4 },
            { hint: "ตรวจสอบข้อความและลำดับของลิงก์", test: (doc, code, h) => Array.from(doc.querySelectorAll("nav a")).map(h.text).join("|") === "HTML|HTML5|CSS|JavaScript" },
            { hint: "มีลิงก์ที่ยังไม่มีปลายทาง", test: (doc, code, h) => Array.from(doc.querySelectorAll("nav a")).every((a) => h.attr(a, "href")) },
          ],
        },
        {
          id: "6.3",
          title: "Article ซ้อน Article",
          level: 2,
          prompt: "<p>จงสร้าง article ใหญ่หัวข้อ <code>&lt;h2&gt;</code> <strong>Famous Cities</strong> ที่ภายในมี <strong>article เล็ก 3 ชิ้น</strong> (London, Paris, Tokyo) แต่ละชิ้นมี <code>&lt;h2&gt;</code> ชื่อเมือง และ <code>&lt;p&gt;</code> คำอธิบายอะไรก็ได้</p>",
          solution: `<article>
  <h2>Famous Cities</h2>
  <article>
    <h2>London</h2>
    <p>London is the capital city of England.</p>
  </article>
  <article>
    <h2>Paris</h2>
    <p>Paris is the capital and most populous city of France.</p>
  </article>
  <article>
    <h2>Tokyo</h2>
    <p>Tokyo is the capital of Japan.</p>
  </article>
</article>`,
          checks: [
            { hint: "ยังไม่พบ article ใหญ่ที่อยู่ชั้นนอกสุด", test: (doc) => Array.from(doc.querySelectorAll("article")).some((a) => !a.parentElement.closest("article")) },
            {
              hint: "ตรวจสอบหัวข้อของ article ใหญ่",
              test: (doc, code, h) => {
                const outer = Array.from(doc.querySelectorAll("article")).find((a) => !a.parentElement.closest("article"));
                const h2 = Array.from(outer.children).find((c) => c.tagName === "H2");
                return h.text(h2) === "Famous Cities";
              },
            },
            {
              hint: "ตรวจสอบ article เล็ก — ต้องอยู่ภายใน article ใหญ่ 3 ชิ้น ตามลำดับเมืองในโจทย์",
              test: (doc, code, h) => {
                const outer = Array.from(doc.querySelectorAll("article")).find((a) => !a.parentElement.closest("article"));
                const inner = Array.from(outer.children).filter((c) => c.tagName === "ARTICLE");
                return inner.length === 3 && inner.map((a) => h.text(a.querySelector("h2"))).join("|") === "London|Paris|Tokyo";
              },
            },
            {
              hint: "article เล็กบางชิ้นยังไม่มีย่อหน้าคำอธิบาย",
              test: (doc, code, h) => {
                const outer = Array.from(doc.querySelectorAll("article")).find((a) => !a.parentElement.closest("article"));
                return Array.from(outer.children).filter((c) => c.tagName === "ARTICLE").every((a) => h.text(a.querySelector("p")));
              },
            },
          ],
        },
        {
          id: "6.4",
          title: "แปลง <div> เป็น semantic",
          level: 2,
          prompt: "<p>โค้ดตั้งต้นในช่องแก้ไขเป็นหน้าเว็บแบบเก่าที่ใช้ <code>&lt;div class=\"...\"&gt;</code> ทั้งหมด (จากสไลด์ \"Before Semantic Elements\") จงแก้ให้เป็น semantic elements ที่ความหมายตรงกับ class เดิม</p><ul><li>คงข้อความเดิมทุกส่วนไว้</li><li>ส่วน section ต้องมี article 2 ชิ้นอยู่ข้างในเหมือนเดิม</li><li><strong>ห้ามเหลือ <code>&lt;div&gt;</code></strong></li></ul>",
          starter: `<body>
<div class="header">Header</div>
<div class="menubar">Menu Bar/Navigation Bar</div>
<div class="section">
  <div class="article">Content Article 1</div>
  <div class="article">Content Article 2</div>
</div>
<div class="footer">Document Footer</div>
</body>`,
          solution: `<body>
<header>Header</header>
<nav>Menu Bar/Navigation Bar</nav>
<section>
  <article>Content Article 1</article>
  <article>Content Article 2</article>
</section>
<footer>Document Footer</footer>
</body>`,
          checks: [
            { hint: "ยังมี `<div>` เหลืออยู่ในโค้ด", test: (doc) => doc.querySelector("div") === null },
            { hint: "ส่วน Header ยังไม่ได้ใช้ semantic element ที่ตรงความหมาย", test: (doc, code, h) => h.text(doc.querySelector("header")) === "Header" },
            { hint: "ส่วนเมนูยังไม่ได้ใช้ semantic element ที่ตรงความหมาย", test: (doc, code, h) => h.text(doc.querySelector("nav")) === "Menu Bar/Navigation Bar" },
            { hint: "ส่วน section ยังไม่ได้ใช้ semantic element ที่ตรงความหมาย", test: (doc) => doc.querySelector("section") !== null },
            { hint: "ตรวจสอบเนื้อหาภายใน section — ต้องมี article 2 ชิ้นพร้อมข้อความเดิม", test: (doc, code, h) => Array.from(doc.querySelectorAll("section > article")).map(h.text).join("|") === "Content Article 1|Content Article 2" },
            { hint: "ส่วนท้ายยังไม่ได้ใช้ semantic element ที่ตรงความหมาย", test: (doc, code, h) => h.text(doc.querySelector("footer")) === "Document Footer" },
            {
              hint: "ตรวจสอบลำดับของส่วนต่างๆ ให้เหมือนโค้ดเดิม",
              test: (doc, code, h) => ["header", "nav", "section", "footer"].map((t) => doc.querySelector(t)).every((e, i, arr) => i === 0 || h.before(arr[i - 1], e)),
            },
          ],
        },
        {
          id: "6.5",
          title: "เนื้อหาหลักกับ sidebar",
          level: 3,
          prompt: "<p>จงสร้างหน้าที่มี 2 ส่วนเรียงกัน</p><ul><li><strong>section</strong> เนื้อหาหลัก มี <code>&lt;h2&gt;</code> และ <code>&lt;p&gt;</code> (ข้อความอะไรก็ได้)</li><li>ตามด้วย<strong>เนื้อหาข้างเคียง (sidebar)</strong> ที่เกี่ยวข้องกับเนื้อหาหลัก มี <code>&lt;h2&gt;</code> ข้อความอะไรก็ได้ — ใช้ semantic element ที่ตรงความหมาย และ<strong>ไม่ซ้อนอยู่ใน section</strong></li></ul>",
          solution: `<section>
  <h2>Lyrics</h2>
  <p>Here's to the ones that we got<br>
     Cheers to the wish you were here,...</p>
</section>
<aside>
  <h2>This content should be related<br>
      to the surrounding content.</h2>
</aside>`,
          checks: [
            { hint: "ยังไม่พบ section เนื้อหาหลัก", test: (doc) => doc.querySelector("section") !== null },
            { hint: "section ยังไม่มีทั้ง `<h2>` และ `<p>` ที่มีข้อความ", test: (doc, code, h) => Boolean(h.text(doc.querySelector("section h2")) && h.text(doc.querySelector("section p"))) },
            { hint: "ยังไม่พบ semantic element สำหรับเนื้อหาข้างเคียง", test: (doc) => doc.querySelector("aside") !== null },
            { hint: "เนื้อหาข้างเคียงยังไม่มี `<h2>` ที่มีข้อความ", test: (doc, code, h) => h.text(doc.querySelector("aside h2")).length > 0 },
            { hint: "เนื้อหาข้างเคียงต้องไม่ซ้อนอยู่ภายใน section", test: (doc) => !doc.querySelector("section aside") },
            { hint: "ตรวจสอบลำดับ — section ต้องมาก่อนเนื้อหาข้างเคียง", test: (doc, code, h) => h.before(doc.querySelector("section"), doc.querySelector("aside")) },
          ],
        },
        {
          id: "6.6",
          title: "HTML Layout 3 คอลัมน์",
          level: 3,
          prompt: "<p>จงสร้างโครง HTML layout ตามตัวอย่างในสไลด์ด้วย semantic elements (ไม่ต้องมี CSS) เรียงจากบนลงล่าง</p><ul><li>ส่วนหัว มี <code>&lt;h1&gt;</code> ข้อความ <strong>Header</strong></li><li>เมนูนำทาง มีลิงก์ 3 ลิงก์ ข้อความ <strong>Link1, Link2, Link3</strong></li><li><code>&lt;article class=\"row\"&gt;</code> ที่ภายในมี <code>&lt;article class=\"column\"&gt;</code> 3 ชิ้น แต่ละชิ้นมี <code>&lt;h2&gt;</code> ข้อความ <strong>Column1, Column2, Column3</strong> และ <code>&lt;p&gt;</code> ข้อความอะไรก็ได้</li><li>ส่วนท้าย มี <code>&lt;h1&gt;</code> ข้อความ <strong>Footer</strong></li><li><strong>ห้ามใช้ <code>&lt;div&gt;</code></strong></li></ul>",
          solution: `<header>
  <h1>Header</h1>
</header>
<nav>
  <a href="#">Link1</a>
  <a href="#">Link2</a>
  <a href="#">Link3</a>
</nav>
<article class="row">
  <article class="column">
    <h2>Column1</h2>
    <p>Lorem ipsum dolor sit amet …</p>
  </article>
  <article class="column">
    <h2>Column2</h2>
    <p>Lorem ipsum dolor sit amet …</p>
  </article>
  <article class="column">
    <h2>Column3</h2>
    <p>Lorem ipsum dolor sit amet …</p>
  </article>
</article>
<footer>
  <h1>Footer</h1>
</footer>`,
          checks: [
            { hint: "ห้ามใช้ `<div>` ในข้อนี้", test: (doc) => doc.querySelector("div") === null },
            { hint: "ตรวจสอบส่วนหัวและหัวข้อของมัน", test: (doc, code, h) => h.text(doc.querySelector("header h1")) === "Header" },
            { hint: "ตรวจสอบเมนูนำทาง — ต้องมี 3 ลิงก์ตามข้อความในโจทย์", test: (doc, code, h) => Array.from(doc.querySelectorAll("nav a")).map(h.text).join("|") === "Link1|Link2|Link3" },
            { hint: "ยังไม่พบ article ที่มี class ตามโจทย์สำหรับครอบคอลัมน์", test: (doc) => doc.querySelector("article.row") !== null },
            { hint: "ตรวจสอบคอลัมน์ภายใน — ต้องเป็น article ที่มี class ตามโจทย์ 3 ชิ้น อยู่ภายในตัวครอบโดยตรง", test: (doc) => doc.querySelectorAll("article.row > article.column").length === 3 },
            { hint: "ตรวจสอบหัวข้อของแต่ละคอลัมน์และลำดับ", test: (doc, code, h) => Array.from(doc.querySelectorAll("article.row > article.column")).map((a) => h.text(a.querySelector("h2"))).join("|") === "Column1|Column2|Column3" },
            { hint: "คอลัมน์บางชิ้นยังไม่มีย่อหน้าข้อความ", test: (doc, code, h) => Array.from(doc.querySelectorAll("article.row > article.column")).every((a) => h.text(a.querySelector("p"))) },
            { hint: "ตรวจสอบส่วนท้ายและหัวข้อของมัน", test: (doc, code, h) => h.text(doc.querySelector("footer h1")) === "Footer" },
            {
              hint: "ตรวจสอบลำดับจากบนลงล่าง: ส่วนหัว → เมนู → คอลัมน์ → ส่วนท้าย",
              test: (doc, code, h) => [doc.querySelector("header"), doc.querySelector("nav"), doc.querySelector("article.row"), doc.querySelector("footer")].every((e, i, arr) => i === 0 || h.before(arr[i - 1], e)),
            },
          ],
        },
      ],
    },
  ],
};
