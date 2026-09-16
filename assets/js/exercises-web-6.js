/* ==========================================================================
   โจทย์เขียนโค้ด ITDS241 บทที่ 6 (กลุ่ม 10: JavaScript function / OOP / DOM)
   mode "js": โค้ดผู้เรียนรันใน iframe sandbox (TotobWidgets.runJs) → checks ได้ r = { logs, errors, probe, html, ... }
   fixture = HTML ที่มีอยู่ในหน้าก่อนโค้ดผู้เรียนทำงาน (แสดงให้ผู้เรียนเห็นอัตโนมัติ)
   probe   = โค้ดของผู้สร้างโจทย์ที่รันต่อจากโค้ดผู้เรียนใน sandbox เดียวกัน (เรียก class/function หรืออ่าน DOM ที่ถูกแก้แล้ว)
   ========================================================================== */
(() => {
  const logsEqual = (r, expected) => Array.isArray(r.logs) && r.logs.length === expected.length && expected.every((v, i) => r.logs[i] === v);
  const probeOk = (r) => r && r.probe && typeof r.probe === "object";

  window.CODE_EXERCISE_SET = {
    id: "web-6",
    groups: [
      {
        title: "10. JavaScript function, OOP และ DOM",
        tasks: [
          {
            id: "10.1",
            title: "Arrow function และค่า default",
            level: 1,
            mode: "js",
            prompt: "<p>จงเขียน <strong>arrow function</strong> ชื่อ <code>greet</code> ที่รับ 2 parameter คือ <code>name</code> และ <code>msg</code> โดย <code>msg</code> มี<strong>ค่า default เป็น <code>\"no message\"</code></strong> และคืนค่าเป็นข้อความรูปแบบ <code>name + \": \" + msg</code></p><p>จากนั้น <code>console.log</code> ผลของ <code>greet(\"Ann\", \"เจอกันพรุ่งนี้\")</code> และ <code>greet(\"Ann\")</code> ตามลำดับ</p><p>ผลลัพธ์ที่ต้องได้: <code>Ann: เจอกันพรุ่งนี้</code> แล้วตามด้วย <code>Ann: no message</code></p>",
            solution: `const greet = (name, msg = "no message") => name + ": " + msg;

console.log(greet("Ann", "เจอกันพรุ่งนี้"));
console.log(greet("Ann"));`,
            probe: `return typeof greet === "function" ? { a: greet("Bee", "hi"), b: greet("Bee") } : null;`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "ยังไม่พบ function ชื่อ greet", test: (r) => probeOk(r) },
              { hint: "โจทย์ต้องการ arrow function (ใช้เครื่องหมาย `=>`) ไม่ใช่ `function` แบบเดิม", test: (r, code, h) => /=>/.test(h.jsCode(code)) && !/\bfunction\s+greet\b/.test(h.jsCode(code)) },
              { hint: "parameter ตัวที่สองยังไม่ได้ตั้งค่า default ไว้ในวงเล็บของ function", test: (r) => probeOk(r) && r.probe.b === "Bee: no message" },
              { hint: "รูปแบบข้อความที่คืนออกมายังไม่ตรง — ต้องเป็นชื่อ ตามด้วย `: ` แล้วตามด้วยข้อความ", test: (r) => probeOk(r) && r.probe.a === "Bee: hi" },
              { hint: "ผลใน console ยังไม่ครบหรือไม่เรียงลำดับตามโจทย์", test: (r) => logsEqual(r, ["Ann: เจอกันพรุ่งนี้", "Ann: no message"]) },
            ],
          },
          {
            id: "10.2",
            title: "High-order function: filter แล้ว map",
            level: 1,
            mode: "js",
            prompt: "<p>กำหนดให้มี array <code>nums = [1, 2, 3, 4, 5, 6]</code></p><p>จงใช้ <strong>high-order function</strong> 2 ตัวต่อกัน คือ <code>filter</code> เพื่อเก็บเฉพาะ<strong>เลขคู่</strong> แล้วต่อด้วย <code>map</code> เพื่อ<strong>ยกกำลังสอง</strong> เก็บผลไว้ในตัวแปร <code>result</code> แล้ว <code>console.log(result)</code></p><p>ผลลัพธ์ที่ต้องได้: <code>[4, 16, 36]</code></p>",
            starter: `const nums = [1, 2, 3, 4, 5, 6];
`,
            solution: `const nums = [1, 2, 3, 4, 5, 6];
const result = nums.filter((n) => n % 2 === 0).map((n) => n * n);
console.log(result);`,
            probe: `return typeof result !== "undefined" ? { r: result } : null;`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "โจทย์ต้องการให้ใช้ `filter`", test: (r, code, h) => /\.filter\s*\(/.test(h.jsCode(code)) },
              { hint: "โจทย์ต้องการให้ใช้ `map` ต่อจาก filter", test: (r, code, h) => /\.map\s*\(/.test(h.jsCode(code)) },
              { hint: "ยังไม่พบตัวแปรชื่อ result", test: (r) => probeOk(r) },
              { hint: "ค่าใน result ยังไม่ใช่เลขคู่ที่ถูกยกกำลังสอง", test: (r) => probeOk(r) && Array.isArray(r.probe.r) && r.probe.r.join() === "4,16,36" },
              { hint: "ต้อง console.log ผลลัพธ์ออกมาครั้งเดียว", test: (r) => logsEqual(r, ["[4, 16, 36]"]) },
            ],
          },
          {
            id: "10.3",
            title: "Class, constructor และ method",
            level: 2,
            mode: "js",
            prompt: "<p>จงสร้าง <strong>class</strong> ชื่อ <code>Student</code> ที่มี</p><ul><li><code>constructor</code> รับ <code>name</code> และ <code>year</code> แล้วเก็บไว้เป็น property <code>this.name</code> และ <code>this.year</code></li><li>method ชื่อ <code>intro()</code> ที่<strong>คืนค่า</strong>ข้อความรูปแบบ <code>\"ฉันชื่อ \" + name + \" ชั้นปีที่ \" + year</code></li></ul><p>จากนั้นสร้าง object จาก class นี้ด้วยชื่อ <code>\"Mana\"</code> ปี <code>2</code> แล้ว <code>console.log</code> ผลของ <code>intro()</code></p><p>ผลลัพธ์ที่ต้องได้: <code>ฉันชื่อ Mana ชั้นปีที่ 2</code></p>",
            solution: `class Student {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  intro() {
    return "ฉันชื่อ " + this.name + " ชั้นปีที่ " + this.year;
  }
}

const s = new Student("Mana", 2);
console.log(s.intro());`,
            probe: `if (typeof Student !== "function") return null;
var t = new Student("Piti", 4);
return { name: t.name, year: t.year, intro: typeof t.intro === "function" ? t.intro() : null };`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "ยังไม่พบ class ชื่อ Student — โจทย์ต้องการ `class` ไม่ใช่ constructor function", test: (r, code, h) => probeOk(r) && /\bclass\s+Student\b/.test(h.jsCode(code)) },
              { hint: "constructor ยังไม่ได้เก็บค่าลง property `this.name` และ `this.year`", test: (r) => probeOk(r) && r.probe.name === "Piti" && r.probe.year === 4 },
              { hint: "ยังไม่พบ method ชื่อ intro หรือ method ไม่ได้ `return` ข้อความออกมา", test: (r) => probeOk(r) && typeof r.probe.intro === "string" },
              { hint: "ข้อความที่ intro() คืนออกมายังไม่ตรงรูปแบบที่โจทย์กำหนด (ต้องใช้ค่าจาก property ไม่ใช่เขียนตายตัว)", test: (r) => probeOk(r) && r.probe.intro === "ฉันชื่อ Piti ชั้นปีที่ 4" },
              { hint: "ยังไม่ได้สร้าง object ด้วยค่าตามโจทย์แล้ว console.log ผลของ intro()", test: (r) => logsEqual(r, ["ฉันชื่อ Mana ชั้นปีที่ 2"]) },
            ],
          },
          {
            id: "10.4",
            title: "Inheritance ด้วย extends และ super",
            level: 3,
            mode: "js",
            prompt: "<p>โค้ดตั้งต้นมี class <code>Student</code> ให้แล้ว จงสร้าง <strong>subclass</strong> ชื่อ <code>GradStudent</code> ที่<strong>สืบทอดจาก <code>Student</code></strong> โดย</p><ul><li><code>constructor</code> รับ <code>name</code>, <code>year</code> และ <code>advisor</code> — สองตัวแรก<strong>ส่งต่อให้ superclass</strong> ส่วน <code>advisor</code> เก็บเป็น property ของ subclass</li><li>method เฉพาะของ subclass ชื่อ <code>getAdvisor()</code> คืนค่า <code>\"อาจารย์ที่ปรึกษาคือ \" + advisor</code></li></ul><p>จากนั้นสร้าง object ด้วย <code>\"Mana\"</code>, <code>5</code>, <code>\"อ.วุฒิชาติ\"</code> แล้ว <code>console.log</code> ผลของ <code>intro()</code> และ <code>getAdvisor()</code> ตามลำดับ</p>",
            starter: `class Student {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  intro() {
    return "ฉันชื่อ " + this.name + " ชั้นปีที่ " + this.year;
  }
}

`,
            solution: `class Student {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  intro() {
    return "ฉันชื่อ " + this.name + " ชั้นปีที่ " + this.year;
  }
}

class GradStudent extends Student {
  constructor(name, year, advisor) {
    super(name, year);
    this.advisor = advisor;
  }
  getAdvisor() {
    return "อาจารย์ที่ปรึกษาคือ " + this.advisor;
  }
}

const g = new GradStudent("Mana", 5, "อ.วุฒิชาติ");
console.log(g.intro());
console.log(g.getAdvisor());`,
            probe: `if (typeof GradStudent !== "function") return null;
var t = new GradStudent("Piti", 6, "อ.จิดาภา");
return {
  isSub: typeof Student === "function" && t instanceof Student,
  name: t.name, year: t.year, advisor: t.advisor,
  intro: typeof t.intro === "function" ? t.intro() : null,
  adv: typeof t.getAdvisor === "function" ? t.getAdvisor() : null,
};`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "ยังไม่พบ class ชื่อ GradStudent", test: (r) => probeOk(r) },
              { hint: "GradStudent ยังไม่ได้สืบทอดจาก Student — ใช้ keyword ที่โจทย์บอกไว้", test: (r, code, h) => probeOk(r) && r.probe.isSub === true && /\bextends\s+Student\b/.test(h.jsCode(code)) },
              { hint: "properties ที่มาจาก superclass ยังไม่ถูกส่งต่อ — ต้องเรียก `super(...)` ใน constructor", test: (r, code, h) => probeOk(r) && /\bsuper\s*\(/.test(h.jsCode(code)) && r.probe.name === "Piti" && r.probe.year === 6 },
              { hint: "ยังไม่ได้เก็บ advisor เป็น property ของ subclass", test: (r) => probeOk(r) && r.probe.advisor === "อ.จิดาภา" },
              { hint: "method intro() ที่สืบทอดมาจาก superclass ยังทำงานไม่ถูก", test: (r) => probeOk(r) && r.probe.intro === "ฉันชื่อ Piti ชั้นปีที่ 6" },
              { hint: "ยังไม่พบ method getAdvisor() หรือข้อความที่คืนออกมายังไม่ตรงรูปแบบ", test: (r) => probeOk(r) && r.probe.adv === "อาจารย์ที่ปรึกษาคือ อ.จิดาภา" },
              { hint: "ต้อง console.log ผลของ intro() แล้วตามด้วย getAdvisor() ของ object ที่สร้างตามค่าในโจทย์", test: (r) => logsEqual(r, ["ฉันชื่อ Mana ชั้นปีที่ 5", "อาจารย์ที่ปรึกษาคือ อ.วุฒิชาติ"]) },
            ],
          },
          {
            id: "10.5",
            title: "DOM: เข้าถึงและแก้ไข node",
            level: 2,
            mode: "js",
            prompt: "<p>จงเขียน JavaScript ที่ทำ 2 อย่างกับ HTML ที่มีอยู่แล้วด้านล่าง</p><ol><li>ใช้ <code>document.getElementById()</code> หา <code>&lt;h1&gt;</code> ที่ id เป็น <code>title</code> แล้วเปลี่ยน<strong>เนื้อความ</strong>เป็น <code>สวัสดี DOM</code></li><li>ใช้ <code>document.getElementsByClassName()</code> หา element ที่มี class <code>item</code> ทั้งหมด แล้วใส่ข้อความ <code>มี 3 รายการ</code> (โดยนับจาก <strong>ความยาวของ collection ที่ได้</strong> ไม่ใช่พิมพ์เลข 3 ลงไปตรงๆ) เป็นเนื้อความของ <code>&lt;div id=\"out\"&gt;</code></li></ol>",
            fixture: `<h1 id="title">ยังไม่เปลี่ยน</h1>
<p class="item">A</p>
<p class="item">B</p>
<p class="item">C</p>
<div id="out"></div>`,
            solution: `let titleNode = document.getElementById("title");
titleNode.textContent = "สวัสดี DOM";

let items = document.getElementsByClassName("item");
let out = document.getElementById("out");
out.textContent = "มี " + items.length + " รายการ";`,
            probe: `return {
  title: (document.getElementById("title") || {}).textContent,
  out: (document.getElementById("out") || {}).textContent,
  items: document.getElementsByClassName("item").length,
};`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "โจทย์ต้องการให้ใช้ `document.getElementById()`", test: (r, code, h) => /getElementById\s*\(/.test(h.jsCode(code)) },
              { hint: "เนื้อความของ <h1> ยังไม่ถูกเปลี่ยน", test: (r) => probeOk(r) && r.probe.title === "สวัสดี DOM" },
              { hint: "โจทย์ต้องการให้ใช้ `document.getElementsByClassName()` เพื่อหา element ที่มี class item", test: (r, code, h) => /getElementsByClassName\s*\(/.test(h.jsCode(code)) },
              { hint: "จำนวนที่นับต้องมาจากความยาวของ collection ที่ได้จาก getElementsByClassName ไม่ใช่เลขที่พิมพ์ลงไปเอง", test: (r, code, h) => /\.length\b/.test(h.jsCode(code)) },
              { hint: "ข้อความใน <div id=\"out\"> ยังไม่ตรงกับที่โจทย์กำหนด", test: (r) => probeOk(r) && r.probe.out === "มี 3 รายการ" },
              { hint: "ห้ามลบหรือเพิ่ม element ที่มี class item — ต้องเหลือ 3 ตัวเท่าเดิม", test: (r) => probeOk(r) && r.probe.items === 3 },
            ],
          },
          {
            id: "10.6",
            title: "DOM: สร้าง node ใหม่เมื่อเกิด event",
            level: 3,
            mode: "js",
            prompt: "<p>จงเขียน JavaScript ที่ผูก event <strong><code>click</code></strong> เข้ากับปุ่ม <code>#btn</code> ด้วย <strong><code>addEventListener</code></strong> (ห้ามใช้ attribute <code>onclick</code>) โดยทุกครั้งที่ปุ่มถูกกด ให้</p><ol><li>สร้าง element <code>&lt;li&gt;</code> ใหม่ด้วย <code>document.createElement()</code></li><li>สร้าง text node ข้อความ <code>รายการใหม่</code> ด้วย <code>document.createTextNode()</code> แล้วใส่เข้าไปใน <code>&lt;li&gt;</code></li><li>เพิ่ม <code>&lt;li&gt;</code> นั้นเป็นลูกตัวสุดท้ายของ <code>&lt;ul id=\"list\"&gt;</code> ด้วย <code>appendChild()</code></li></ol><p>กดปุ่มในกรอบผลลัพธ์เพื่อทดลองได้เลย</p>",
            fixture: `<button id="btn">เพิ่มรายการ</button>
<ul id="list"></ul>`,
            solution: `let btn = document.getElementById("btn");
let list = document.getElementById("list");

btn.addEventListener("click", function () {
  let li = document.createElement("li");
  let txt = document.createTextNode("รายการใหม่");
  li.appendChild(txt);
  list.appendChild(li);
});`,
            probe: `var b = document.getElementById("btn");
var ul = document.getElementById("list");
var before = ul ? ul.children.length : -1;
if (b) { b.click(); b.click(); }
return {
  before: before,
  after: ul ? ul.children.length : -1,
  tag: ul && ul.firstElementChild ? ul.firstElementChild.tagName : "",
  text: ul && ul.firstElementChild ? ul.firstElementChild.textContent : "",
};`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "โจทย์ต้องการให้ผูก event ด้วย `addEventListener`", test: (r, code, h) => /addEventListener\s*\(/.test(h.jsCode(code)) },
              { hint: "ต้องใช้ `document.createElement()` เพื่อสร้าง element ใหม่", test: (r, code, h) => /createElement\s*\(/.test(h.jsCode(code)) },
              { hint: "ต้องใช้ `document.createTextNode()` เพื่อสร้างข้อความ ไม่ใช่กำหนดผ่าน innerHTML", test: (r, code, h) => /createTextNode\s*\(/.test(h.jsCode(code)) },
              { hint: "ยังไม่ควรมีรายการใน <ul> ก่อนปุ่มถูกกด — โค้ดต้องรอ event ไม่ใช่เพิ่มทันที", test: (r) => probeOk(r) && r.probe.before === 0 },
              { hint: "กดปุ่ม 2 ครั้งแล้วจำนวนรายการใน <ul> ยังไม่เพิ่มเป็น 2", test: (r) => probeOk(r) && r.probe.after === 2 },
              { hint: "element ที่ถูกเพิ่มยังไม่ใช่ <li>", test: (r) => probeOk(r) && r.probe.tag === "LI" },
              { hint: "ข้อความในรายการที่เพิ่มยังไม่ตรงกับที่โจทย์กำหนด", test: (r) => probeOk(r) && r.probe.text === "รายการใหม่" },
            ],
          },
        ],
      },
    ],
  };
})();
