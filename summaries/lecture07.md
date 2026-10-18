# JavaScript · Part 2 · สรุปภาษาไทย

ต้นฉบับ: ITDS241-Lecture07-JavaScript Part 2.pdf (69 หน้า)

เขียนสรุปใหม่เพื่อทบทวนส่วนตัว เลขหน้าอ้างอิงหน้า PDF ไม่ใช่เลขสไลด์ หมายเหตุเพิ่มเติมแยกจากคำอธิบายต้นฉบับ

## Functions, callbacks และ closures

ฟังก์ชันเป็นค่าที่ส่งต่อได้ และจดจำตัวแปรรอบตัวได้ด้วย ลองแยกคำถามว่า "ส่งฟังก์ชัน" หรือ "ส่งผลจากการเรียกฟังก์ชัน" ให้ชัด

อ้างอิง ITDS241-Lecture07-JavaScript Part 2.pdf หน้า 3–30

### หลักที่ควรจำ

- log แสดงผล ส่วน return ส่งค่ากลับ
- Default parameter แทน undefined แต่ไม่แทน null
- ส่ง callback ด้วยชื่อฟังก์ชัน ไม่ใช่ผลการเรียก
- Callback อาจ synchronous หรือ asynchronous
- Closure เก็บการเข้าถึงตัวแปร ไม่ใช่แค่ snapshot ของค่า

### Parameter, argument และ return

Parameter คือชื่อในตอนนิยาม ส่วน argument คือค่าที่ส่งตอนเรียก return ส่งค่ากลับและจบการทำงานทันที ถ้าไม่มี return จะได้ undefined console.log เป็นการแสดงผล ไม่ได้ส่งผลคำนวณกลับให้ผู้เรียก Default parameter ใช้เมื่อไม่ส่งค่าหรือส่ง undefined แต่ไม่ใช้เมื่อส่ง null

### Declaration, expression และ arrow

function add(a,b) {} เป็น declaration ส่วน const add = function(a,b) {} เป็น expression Arrow ที่มี expression เดียวคืนค่าได้ทันที แต่เมื่อใช้ { } ต้องเขียน return ถ้าจะคืน object literal แบบสั้นให้ครอบวงเล็บ เช่น () => ({done:true}) Arrow ไม่มี this ของตัวเองและใช้ new ไม่ได้ จึงไม่เหมาะแทน constructor function

### First-class, higher-order และ callback

First-class หมายถึงเก็บฟังก์ชันในตัวแปร array หรือ object ได้ ส่งเป็น argument และคืนจากฟังก์ชันได้ Higher-order function รับหรือคืนฟังก์ชัน Callback คือฟังก์ชันที่ส่งให้ตัวอื่นเรียก ไม่จำเป็นต้อง asynchronous เช่น map เรียก callback แบบ synchronous ส่วน setTimeout นัดเรียกภายหลัง ต้องส่ง greet แทน greet() ถ้าต้องการนัดฟังก์ชันไว้

### Lexical scope และ closure

การค้นหาชื่อเริ่มจาก scope ที่กำลังทำงานแล้วออกไปตามที่นิยามโค้ดไว้ var ก็ยังเป็น lexical scope ต่างจาก let/const ตรงขอบเขต function/block Closure คือฟังก์ชันพร้อมการเข้าถึง environment ที่ถูกสร้างมาด้วย จึงยังอ่านหรือเปลี่ยนตัวแปรนั้นได้หลังฟังก์ชันชั้นนอกจบแล้ว ตัวแปร local ไม่จำเป็นต้องหายทันทีถ้ายังมี closure อ้างถึง

```js
function createCounter() {
  let n = 0;
  return () => ++n;
}
const a = createCounter();
const b = createCounter();
console.log(a(), a(), b()); // 1 2 1
```

### Constructor function เป็นอีกวิธีสร้าง object

เรียก function Person(name) { this.name = name; } ด้วย new จะได้ object ใหม่ที่มี property name เมธอดที่เก็บบน this เข้าถึงได้จากภายนอก ส่วนตัวแปร let ภายใน constructor ไม่ได้เป็น property และอาจซ่อนผ่าน closure ได้ อย่าสับสน constructor function แบบนี้กับ Function constructor ที่สร้างโค้ดจากข้อความ

### จุดที่ควรอ่านให้ชัด

อายุของ local variable ไม่ได้จบเสมอเมื่อฟังก์ชัน return ถ้า closure ยังเข้าถึงมันได้ environment นั้นยังจำเป็นต่อโปรแกรม

### ตัวอย่าง: สมุดนับสองเล่มที่ไม่ใช้เลขร่วมกัน

```js
function makeCounter(start = 0) {
  let count = start;
  return () => ++count;
}
const js = makeCounter();
const dom = makeCounter(10);
console.log(js(), js(), dom());
```

ผลที่ควรสังเกต:

1 2 11

ลองทำ: เปลี่ยนให้ makeCounter คืน object ที่มี next() และ reset() โดย reset ต้องกลับไปที่ start เดิม

<details><summary>แนวทางทำโจทย์</summary>

```js
function makeCounter(start = 0) {
  let count = start;
  return {
    next: () => ++count,
    reset: () => { count = start; }
  };
}
const counter = makeCounter(5);
console.log(counter.next());
counter.reset();
console.log(counter.next());
```

</details>



---

## Class, object และ inheritance

Class เป็นแบบสำหรับสร้าง object หลายตัวที่ทำงานคล้ายกัน ส่วน inheritance ช่วยขยายพฤติกรรม แต่ต้องระวังข้อมูลที่แชร์กันโดยไม่ได้ตั้งใจ

อ้างอิง ITDS241-Lecture07-JavaScript Part 2.pdf หน้า 31–42

### หลักที่ควรจำ

- new เรียก constructor เพื่อสร้าง instance
- อ่าน property ที่ไม่มีได้ undefined แต่เรียกเป็นฟังก์ชันจะ error
- super ต้องมาก่อน this ใน constructor ของ subclass
- Override method เป็นตัวอย่าง polymorphism
- instance ใหม่อาจยังถือ array input ร่วมกับตัวอื่น

### แบบพิมพ์กับสิ่งที่สร้างจากแบบ

class รวม constructor และ methods ไว้ด้วยกัน constructor ทำงานตอน new และ this อ้างถึง instance ที่กำลังสร้าง property คือข้อมูล ส่วน method คือการทำงานของ object แต่ละ instance มี property ของตัวเองได้ ใน JavaScript class ทำงานบนกลไก prototype ไม่ได้เปลี่ยนภาษาให้เป็น class-based แบบเดียวกับ Java ทุกประการ

### เข้าถึง แก้ไข และเพิ่มสมาชิก

obj.name อ่าน property และ obj.name = value กำหนดค่าใหม่ อ่าน property ที่ไม่มีได้ undefined แต่เรียก method ที่ไม่มีจะเป็น TypeError ซึ่งหยุดโค้ดส่วนถัดไปถ้าไม่จับ error JavaScript เพิ่ม property ภายหลังได้ แต่ต้องระวังชื่อสะกดผิดจนกลายเป็นสร้าง property ใหม่โดยไม่รู้ตัว

### extends และ super

Subclass ใช้ extends เพื่อสืบทอด ถ้ามี constructor ของตัวเองต้องเรียก super(...) ก่อนใช้ this super เรียก constructor ของ superclass ถ้าจะขยาย method เดิมใช้ super.method() แล้วเพิ่มงานของลูกได้ การ override ให้ object ต่างชนิดตอบ method ชื่อเดียวกันด้วยพฤติกรรมต่างกันเป็นตัวอย่าง polymorphism การเพิ่ม property เฉย ๆ ยังไม่แสดงความหมายนี้ครบ

```js
class Note {
  constructor(title) { this.title = title; }
  label() { return this.title; }
}
class ExamNote extends Note {
  label() { return "สอบ: " + super.label(); }
}
console.log(new ExamNote("DOM").label());
```

### this กับการส่ง method ออกไป

สำหรับ method แบบปกติ this ขึ้นกับวิธีเรียก obj.method() ต่างจากดึง const fn = obj.method; แล้วเรียก fn() ถ้าส่งให้ callback ใช้ () => obj.method() หรือ bind(obj) และถ้า constructor รับ array มาเก็บตรง ๆ ทุกที่ที่ถือ array เดิมยังแก้ร่วมกันได้ อย่าสับสนระหว่างสร้าง instance ใหม่กับ clone ข้อมูล input

### จุดที่ควรอ่านให้ชัด

ตัวอย่างหน้า 42 เรียก sayMyName ก่อนนิยามจะ throw และโค้ดถัดไปไม่ทำงานเอง ต้องแก้ลำดับหรือจับ error ก่อนทดลองบรรทัดหลัง

### ตัวอย่าง: ขยายพฤติกรรมโดยใช้ method เดิม

```js
class Lesson {
  constructor(name) { this.name = name; }
  describe() { return this.name; }
}
class ExamLesson extends Lesson {
  describe() { return super.describe() + " • ทบทวนก่อนสอบ"; }
}
console.log(new ExamLesson("JavaScript").describe());
```

ผลที่ควรสังเกต:

JavaScript • ทบทวนก่อนสอบ

ลองทำ: เพิ่ม property minutes ให้ ExamLesson โดยเขียน constructor ที่เรียก super และให้ describe แสดงเวลาต่อท้าย

<details><summary>แนวทางทำโจทย์</summary>

```js
class Lesson {
  constructor(name) { this.name = name; }
  describe() { return this.name; }
}
class ExamLesson extends Lesson {
  constructor(name, minutes) {
    super(name);
    this.minutes = minutes;
  }
  describe() { return super.describe() + ": " + this.minutes + " นาที"; }
}
console.log(new ExamLesson("DOM", 15).describe());
```

</details>



---

## อ่านและแก้ไขหน้าเว็บด้วย DOM

เบราว์เซอร์แปลง HTML เป็นต้นไม้ของ nodes โค้ดจึงเลือก เพิ่ม ลบ และแก้ส่วนต่าง ๆ ได้โดยไม่ต้องโหลดหน้าใหม่

อ้างอิง ITDS241-Lecture07-JavaScript Part 2.pdf หน้า 43–61

### หลักที่ควรจำ

- querySelector อาจคืน null ต้องเช็กก่อนใช้
- querySelectorAll เป็น static แต่ HTMLCollection จาก getElementsBy* เป็น live
- childNodes รวม text และ comment
- textContent เป็นข้อความ ส่วน innerHTML แปล markup
- createElement อย่างเดียวยังไม่ปรากฏบนหน้า

### DOM tree ไม่ได้มีแค่ element

document เป็น document node แท็กเป็น element node ข้อความเป็น text node และ comment ก็เป็น node ความสัมพันธ์มี parent, child, sibling, ancestor และ descendant ช่องว่างหรือขึ้นบรรทัดระหว่างแท็กอาจเป็น text node จึงทำให้ firstChild ไม่ใช่ element แรกเสมอ เลือก firstElementChild หรือ children เมื่อสนใจเฉพาะ element และ attribute ไม่ใช่ child node ในโครง childNodes

### เลือกหนึ่งตัวหรือหลายตัว

getElementById("name") ไม่ใส่ # querySelector("#name") ใช้ CSS selector และคืนตัวแรก ทั้งคู่คืน null ถ้าไม่พบ querySelectorAll คืน static NodeList ส่วน getElementsByClassName และ getElementsByTagName คืน live HTMLCollection ที่เปลี่ยนตาม DOM ไม่ใช่ array จริง หากต้องใช้ array methods แปลงด้วย Array.from หรือ spread

### เปลี่ยนข้อความหรือแปล HTML

textContent ตั้งข้อความตามตัวอักษร innerHTML แปลข้อความเป็น markup จึงไม่ควรนำข้อมูลที่ผู้ใช้กรอกใส่โดยตรง การตั้ง innerHTML ใหม่สร้างลูกชุดใหม่และอาจทำให้ event listener ที่ผูกกับลูกเดิมหาย nodeValue ใช้กับ text node ได้ แต่บน element โดยทั่วไปเป็น null ส่วนค่าฟอร์มอ่านและเขียนด้วย .value ไม่ใช่ textContent

### สร้าง เพิ่ม ลบ และแก้ attributes

createElement สร้าง element ที่ยังไม่อยู่ในหน้า createTextNode สร้าง text node แล้ว appendChild จึงนำไปไว้ในต้นไม้ removeChild ต้องเป็นลูกโดยตรงของ parent ที่เรียก setAttribute เปลี่ยน attribute ส่วน classList.add/remove/toggle ช่วยจัด class แบบไม่ทับทั้งหมด ใช้ .style หรือ class เพื่อเปลี่ยนหน้าตา โดย class ทำให้แยก CSS ออกจาก logic ได้ชัดกว่า

### จุดที่ควรอ่านให้ชัด

ตารางใน PDF หน้า 51 เรียกผลจาก getElementsBy* ว่า NodeList แต่ API เหล่านี้คืน live HTMLCollection ควรจำความต่างพร้อมพฤติกรรมจริง

### ตัวอย่าง: สร้างรายการโดยไม่ต่อ HTML string

HTML เริ่มต้น:

```html
<h3>รายการทบทวน</h3><ul id="notes"></ul>
```

```js
const list = document.querySelector("#notes");
const item = document.createElement("li");
item.textContent = "ทบทวน DOM";
list.appendChild(item);
console.log(list.children.length);
```

ผลที่ควรสังเกต:

1 และมีรายการใหม่ในหน้าตัวอย่าง

ลองทำ: เพิ่มรายการ Operators อีกหนึ่งรายการ แล้วลบรายการแรก ผลต้องเหลือ Operators เพียงรายการเดียว

<details><summary>แนวทางทำโจทย์</summary>

```js
const list = document.querySelector("#notes");
for (const title of ["ทบทวน DOM", "Operators"]) {
  const item = document.createElement("li");
  item.textContent = title;
  list.appendChild(item);
}
list.removeChild(list.firstElementChild);
console.log(list.textContent);
```

</details>



---

## Events และ browser APIs

การตอบสนองต่อคลิกและการกรอกข้อมูลเริ่มจากผูก listener ให้ถูกจุด แล้วอ่าน event object แทนการเดาว่าผู้ใช้กดตรงไหน

อ้างอิง ITDS241-Lecture07-JavaScript Part 2.pdf หน้า 62–67

### หลักที่ควรจำ

- addEventListener ใช้ "click" ไม่ใช่ "onclick"
- target อาจเป็นลูกของปุ่ม ส่วน currentTarget คือที่ผูก listener
- preventDefault กับ stopPropagation ทำคนละอย่าง
- input เหมาะกับการอัปเดตระหว่างพิมพ์
- ฟังก์ชันใน timer ทำทีหลัง และ storage เก็บเป็น string

### ฟังเหตุการณ์โดยส่งฟังก์ชัน

addEventListener("click", handler) ใช้ชื่อ event ที่ไม่มี on ต่างจาก property onclick หรือ attribute onclick="..." การเขียน handler() เป็นการเรียกทันทีแล้วนำผลไปผูก ส่วน removeEventListener ต้องใช้ function reference เดิมและ capture ที่ตรงกัน input เกิดระหว่างแก้ค่า ส่วน change เกิดเมื่อยืนยันการเปลี่ยนตามชนิด control จึงไม่เหมาะแทน input สำหรับ live preview ทุกกรณี

### target, currentTarget และ propagation

event.target คือจุดกำเนิด เช่น span ในปุ่ม ส่วน currentTarget คือ element ที่กำลังรัน listener เหตุการณ์หลายชนิด bubble ขึ้น parent ได้ จึงใช้ event delegation กับรายการที่เพิ่มภายหลังได้ preventDefault ยกเลิกการทำงานปริยายถ้า event ยกเลิกได้ เช่น submit ส่วน stopPropagation หยุดการส่งต่อ ไม่ได้ยกเลิก default และไม่ได้หยุด listener อื่นบน element เดียวกันทั้งหมด

### รับค่าและตรวจข้อมูลก่อนแสดงผล

input.value เป็น string แม้ใช้ type="number" ต้องแปลงและตรวจว่าว่างหรือ NaN ก่อนบวก ถ้ารับ submit ของ form ให้ preventDefault เมื่อจะคำนวณในหน้า จับที่ form ทำให้กด Enter ได้ด้วย ใช้ keydown กับ event.key สำหรับคีย์บอร์ด ส่วน keypress และ keyCode เป็นแนวเก่าที่ไม่ควรใช้เริ่มโค้ดใหม่

### เครื่องมือใน window จาก cheatsheet

setTimeout นัดทำครั้งเดียว setInterval ทำซ้ำและต้อง clearInterval เมื่อไม่ใช้แล้ว เวลาที่กำหนดเป็นระยะรอขั้นต่ำ ไม่ได้รับประกันจังหวะเป๊ะ requestAnimationFrame เหมาะกับอัปเดตภาพก่อน repaint localStorage เก็บ string ข้ามการเปิดหน้า ส่วน sessionStorage ผูกกับ page session ของแท็บ การเขียน storage อาจล้มเหลวถ้าถูกบล็อก history/location/navigator เป็น browser API ไม่ใช่ส่วนภาษา ECMAScript โดยตรง

### จุดที่ควรอ่านให้ชัด

cheatsheet มี API เก่าและคำอธิบายคลาดเคลื่อน เช่น getModifierState คืน boolean ไม่ใช่ array เว็บนี้สรุปตัวที่ใช้บ่อย และเก็บเอกสารเต็มให้ค้นรายการที่เหลือได้

### ตัวอย่าง: ปุ่มที่มีข้อความซ้อนข้างใน

HTML เริ่มต้น:

```html
<button id="add"><span>อ่านเพิ่ม 1 บท</span></button><p id="count">0</p>
```

```js
let count = 0;
const button = document.querySelector("#add");
button.addEventListener("click", event => {
  count++;
  document.querySelector("#count").textContent = count;
  console.log(event.currentTarget.id, count);
});
```

ผลที่ควรสังเกต:

คลิกปุ่มแล้วตัวเลขเพิ่ม พร้อม log add และจำนวนครั้ง

ลองทำ: จำกัดจำนวนไว้ที่ 3 เมื่อครบให้ปุ่ม disabled และเปลี่ยนข้อความเป็น "ครบแล้ว"

<details><summary>แนวทางทำโจทย์</summary>

```js
let count = 0;
const button = document.querySelector("#add");
button.addEventListener("click", () => {
  if (count >= 3) return;
  count++;
  document.querySelector("#count").textContent = count;
  if (count === 3) {
    button.disabled = true;
    button.textContent = "ครบแล้ว";
  }
});
```

</details>
