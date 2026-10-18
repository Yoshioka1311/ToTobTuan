# โต๊ะทบทวน · JavaScript

เขียนสรุปใหม่เพื่อทบทวนส่วนตัว เลขหน้าอ้างอิงหน้า PDF ไม่ใช่เลขสไลด์ หมายเหตุเพิ่มเติมแยกจากคำอธิบายต้นฉบับ

Cheatsheet แยกไว้ใน cheatsheet.md

## JavaScript ทำให้เว็บทำงานอย่างไร

เริ่มจากปุ่มหนึ่งปุ่ม แล้วค่อยเชื่อมโค้ด เหตุการณ์ และข้อมูลเข้าด้วยกัน อ่านตัวอย่างเกมในสไลด์ให้ออกว่าแต่ละส่วนรับผิดชอบอะไร

อ้างอิง ITDS241-Lecture06-JavaScript Part 1.pdf หน้า 3–24

### หลักที่ควรจำ

- ไฟล์ .js มีเฉพาะโค้ด ไม่ต้องครอบด้วย <script>
- console.log ใช้ดูค่า ส่วน DOM ใช้เปลี่ยนหน้าเว็บ
- ตรวจ move ก่อนแก้ข้อมูล และตรวจชนะก่อนเสมอ
- restart ต้องรีเซ็ต state และ UI ให้ตรงกัน

### HTML เป็นโครง CSS เป็นหน้าตา JavaScript เป็นพฤติกรรม

เบราว์เซอร์รับไฟล์จากเว็บเซิร์ฟเวอร์แล้วสร้างหน้าเว็บ HTML กำหนดว่ามีปุ่มหรือช่องไหน CSS กำหนดการจัดวาง ส่วน JavaScript รับคลิก คำนวณ ตรวจข้อมูล และเปลี่ยนข้อความบนหน้าได้ เว็บแบบ static ก็มี JavaScript และปฏิสัมพันธ์ได้ โดยไม่ต้องมีฐานข้อมูล

### วางโค้ดให้ถูกที่ แล้วสังเกตผล

เขียนในแท็ก <script> หรือแยกเป็นไฟล์ .js แล้วอ้างด้วย src ก็ได้ ภายในไฟล์ .js ไม่ต้องใส่แท็ก script หากโค้ดต้องอ่าน DOM ให้วางหลัง element หรือใช้ defer กับไฟล์ภายนอก console.log ส่งข้อความไป console สำหรับดูค่าระหว่างทำงาน ไม่ได้เปลี่ยนข้อความในหน้าเว็บ

```html
<button id="go">เริ่ม</button>
<script src="app.js" defer></script>
<!-- ใน app.js เขียน JavaScript ได้เลย -->
```

### อ่านเกม Tic Tac Toe เป็นวงจรของ state

ใน Lecture 06 เกมมี gameState เก็บ 9 ช่อง currentPlayer บอกคนเล่น และ gameActive บอกว่าเกมจบหรือยัง เมื่อคลิกให้ตรวจความถูกต้องก่อน เปลี่ยน state แล้วตรวจชนะก่อนตรวจเสมอ จากนั้นจึงเปลี่ยนคนเล่นและอัปเดต UI ถ้าชนะในช่องสุดท้ายก็ต้องได้ผลว่าชนะ ไม่ใช่เสมอ การ restart ต้องรีเซ็ตทั้งข้อมูลและหน้าจอ

### แยกข้อมูลออกจากสิ่งที่ผู้ใช้เห็น

สมมติหน้าจอแสดงว่าอ่านแล้ว 2 บท แต่ตัวแปร count ยังเป็น 0 นั่นคือ UI กับ state ไม่ตรงกัน ลองเขียนลำดับ รับเหตุการณ์ → ตรวจเงื่อนไข → เปลี่ยนข้อมูล → แสดงผล การแยกหน้าที่ช่วยให้หาบั๊กได้ว่าพังตอนรับคลิก ตอนคำนวณ หรือตอนแสดงผล

### จุดที่ควรอ่านให้ชัด

คำอธิบายว่า JavaScript เป็น interpreted language ในสไลด์เป็นภาพรวม เครื่องยนต์สมัยใหม่อาจใช้ JIT compilation ด้วย สิ่งที่ต้องแยกให้ออกคือโค้ดทำงานใน runtime ใดและเข้าถึง API อะไรได้

### ตัวอย่าง: รับเฉพาะการเดินที่ถูกต้อง

```js
const board = ["X", "", ""];
let player = "O";
function play(index) {
  if (board[index] !== "") return "ช่องนี้มีคนเล่นแล้ว";
  board[index] = player;
  return board.join("|");
}
console.log(play(0));
console.log(play(1));
```

ผลที่ควรสังเกต:

ช่องนี้มีคนเล่นแล้ว
X|O|

ลองทำ: เพิ่มตัวแปร active = false และแก้ play ให้คืน "เกมจบแล้ว" โดยไม่แก้ board เมื่อเกมไม่ active

<details><summary>แนวทางทำโจทย์</summary>

```js
const board = ["X", "", ""];
let active = false;
function play(index) {
  if (!active) return "เกมจบแล้ว";
  if (board[index] !== "") return "ช่องนี้มีคนเล่นแล้ว";
  board[index] = "O";
  return board.join("|");
}
console.log(play(1));
console.log(board.join("|"));
```

</details>



---

## ตัวแปร ชนิดข้อมูล และขอบเขต

ตัวแปรเป็นชื่อที่อ้างถึงค่า ก่อนทายผลโค้ดให้ถามว่าชื่อนี้อยู่ใน scope ไหน และค่าปัจจุบันมีชนิดอะไร

อ้างอิง ITDS241-Lecture06-JavaScript Part 1.pdf หน้า 25–41

### หลักที่ควรจำ

- const ล็อก binding แต่ไม่ได้ freeze object
- let/const มี block scope ส่วน var มี function scope
- undefined คือยังไม่มีค่าที่กำหนด ส่วน null คือจงใจระบุว่าไม่มี
- typeof null เป็น "object" และ typeof [] ก็เป็น "object"
- Number.MAX_SAFE_INTEGER เป็นขอบเขตความแม่นยำของจำนวนเต็ม

### ประกาศ กำหนดค่า และเปลี่ยนค่า เป็นคนละขั้น

let score; ประกาศชื่อแต่ยังไม่มีค่าที่กำหนด จึงอ่านได้ undefined หลัง score = 10 จึงมีค่า 10 เครื่องหมาย = คือการนำค่าด้านขวาไปผูกกับชื่อด้านซ้าย ไม่ใช่การตั้งสมการ ชื่อแยกตัวพิมพ์เล็กใหญ่ ห้ามใช้ reserved word และห้ามเริ่มด้วยตัวเลข ตามไวยากรณ์จริงยังใช้ _ และ $ รวมถึง Unicode identifier ได้ แม้สไลด์จะยกกฎแบบย่อ

### เลือก const ก่อน เมื่อไม่ต้อง reassign

const ต้องมีค่าเริ่มต้นและห้ามกำหนดค่าผูกใหม่ let เปลี่ยนค่าได้ ทั้งสองมี block scope ส่วน var มี function scope หรือ global scope ใน classic script จึงทะลุ if และ for ได้ แต่ไม่ได้ทะลุฟังก์ชัน ทุกแบบยังอยู่ภายใต้ lexical scope การประกาศชื่อซ้ำใน block ลูกด้วย let เป็น shadowing ไม่ใช่การแก้ตัวแปรข้างนอก

```js
let count = 2;
{ let count = 9; }
console.log(count); // 2
const task = { done: false };
task.done = true;   // ทำได้: ไม่ได้เปลี่ยน binding
```

### ชนิดของค่าเปลี่ยนได้ แต่ต้องคิดให้ทัน

ตัวแปร let ที่เคยเก็บ Number เปลี่ยนไปเก็บ String ได้ Primitive ในภาษาปัจจุบันมี undefined, null, boolean, number, bigint, string และ symbol ส่วน object รวม array และ function ด้วย typeof null ได้ "object" เป็นพฤติกรรมเก่าของภาษา ตรวจ null ด้วย === null และตรวจ array ด้วย Array.isArray

### ไม่ใช่ทุกชื่อที่อ่านก่อนประกาศได้

var ถูกยกการประกาศขึ้นและเริ่มด้วย undefined ส่วน let และ const อยู่ใน temporal dead zone ก่อนบรรทัดประกาศ ถ้าอ่านก่อนถึงบรรทัดนั้นจะเป็น ReferenceError แม้อยู่ใน scope เดียวกัน Number มีทั้งทศนิยม Infinity และ NaN ช่วง ±(2^53−1) ในสไลด์คือช่วงจำนวนเต็มที่แทนได้อย่างปลอดภัย ไม่ใช่ขอบเขตของ Number ทุกค่า

### จุดที่ควรอ่านให้ชัด

ตัวอย่าง for ที่ใช้ let j ใน PDF หน้า 32 มีการอ้าง i ในส่วนเพิ่มค่าและ console อย่านำไปใช้ตรง ๆ ควรเป็น j++ และตรวจชื่อที่ต้องการพิมพ์ให้ตรงกัน

### ตัวอย่าง: ชื่อเหมือนกัน ไม่ได้หมายถึงตัวเดียวกัน

```js
let pages = 12;
{
  let pages = 3;
  console.log("ข้างใน", pages);
}
console.log("ข้างนอก", pages);
const note = { pages: 12 };
note.pages += 3;
console.log(note.pages);
```

ผลที่ควรสังเกต:

ข้างใน 3
ข้างนอก 12
15

ลองทำ: เปลี่ยน let pages ภายใน block ให้เป็นการแก้ pages เดิม แล้วทำให้ทั้งข้างในและข้างนอกแสดง 15

<details><summary>แนวทางทำโจทย์</summary>

```js
let pages = 12;
{
  pages += 3;
  console.log("ข้างใน", pages);
}
console.log("ข้างนอก", pages);
```

</details>



---

## Operators และการแปลงชนิด

บั๊กเล็ก ๆ มักเริ่มจาก "5" กับ 5 ดูคล้ายกัน ฝึกไล่ค่าพร้อมชนิดของทุกนิพจน์ก่อนตัดสินใจว่าเงื่อนไขจริงหรือเท็จ

อ้างอิง ITDS241-Lecture06-JavaScript Part 1.pdf หน้า 49–56

### หลักที่ควรจำ

- input.value เป็น string ต้องแปลงก่อนบวก
- ใช้ === เมื่อไม่ต้องการ coercion
- [] เป็น truthy แม้ไม่มีสมาชิก
- && และ || คืน operand และหยุดประเมินได้
- x++ คืนค่าเก่า แต่ ++x คืนค่าใหม่

### บวกเลขกับต่อข้อความ ใช้สัญลักษณ์เดียวกัน

ถ้า operand ของ + หลังแปลง primitive มี string จะต่อข้อความ แต่ - * / จะพยายามแปลงเป็นตัวเลข "5" + 2 ได้ "52" ส่วน "5" - 2 ได้ 3 ค่าใน input.value เป็น string จึงควรแปลงก่อนคำนวณ ระวัง Number("") ได้ 0 แต่ parseFloat("") ได้ NaN ตรวจข้อมูลว่างให้ชัดก่อนแปลง

### เทียบค่าและชนิดให้ตรงความต้องการ

=== ไม่แปลงชนิด จึงเหมาะกับการตรวจทั่วไป ส่วน == มีกฎแปลงชนิด เช่น 0 == false เป็น true object เทียบกันด้วย identity ไม่ใช่เนื้อหาข้างใน NaN !== NaN จึงใช้ Number.isNaN เพื่อตรวจ และอย่าเขียน 0 < score < 100 แบบคณิตศาสตร์ ให้ใช้ score > 0 && score < 100

### Truthy และ short circuit

ค่าที่ falsy ได้แก่ false, 0, -0, 0n, "", null, undefined และ NaN ส่วน [] กับ {} เป็น truthy โดย && คืนค่าฝั่งแรกที่ falsy หรือค่าฝั่งสุดท้าย และ || คืนค่าฝั่งแรกที่ truthy หรือค่าฝั่งสุดท้าย ไม่ได้คืนแค่ boolean ทั้งคู่หยุดคำนวณทันทีเมื่อรู้ผลแล้ว ถ้าจะใช้ default เฉพาะ null/undefined ให้ใช้ ?? ซึ่งอยู่ใน ES2020

### ลำดับและผลข้างเคียง

คูณ หาร และเศษมาก่อนบวก ลองใส่วงเล็บเมื่อเงื่อนไขซับซ้อน x++ คืนค่าเก่าก่อนเพิ่ม ส่วน ++x เพิ่มแล้วคืนค่าใหม่ การเขียนหลาย increment ในบรรทัดเดียวทำให้อ่านยาก % คือเศษจากการหาร จึงอาจติดลบตามตัวตั้งได้ ไม่ใช่ mathematical modulo เสมอไป

```js
let n = 2;
const before = n++;
const after = ++n;
console.log(before, after, n); // 2 4 4
console.log(0 || 10, 0 ?? 10); // 10 0
```

### จุดที่ควรอ่านให้ชัด

อย่าใช้ if (value) เพื่อแยก "ไม่มีค่า" หาก 0 เป็นข้อมูลที่ถูกต้อง และอย่าสรุปว่า logical operator คืน boolean เสมอ

### ตัวอย่าง: ยอดรวมที่กลายเป็นข้อความ

```js
const price = "80";
const shipping = 20;
console.log(price + shipping);
console.log(Number(price) + shipping);
console.log("" === 0, "" == 0);
```

ผลที่ควรสังเกต:

8020
100
false true

ลองทำ: สร้างฟังก์ชัน total(raw) คืน "ข้อมูลไม่ถูกต้อง" เมื่อ raw ว่างหรือไม่ใช่ตัวเลข มิฉะนั้นคืน Number(raw) + 20 โดยต้องรับ "0" ได้

<details><summary>แนวทางทำโจทย์</summary>

```js
function total(raw) {
  if (raw.trim() === "") return "ข้อมูลไม่ถูกต้อง";
  const price = Number(raw);
  return Number.isFinite(price) ? price + 20 : "ข้อมูลไม่ถูกต้อง";
}
console.log(total("0"));
console.log(total(" "));
console.log(total("abc"));
```

</details>



---

## เงื่อนไข ลูป และการหยุดให้ถูกจังหวะ

เลือกเส้นทางด้วย if และ switch แล้วควบคุมจำนวนรอบด้วยลูป จุดสำคัญคือรู้ว่าข้อมูลเปลี่ยนเมื่อไร และอะไรทำให้หยุด

อ้างอิง ITDS241-Lecture06-JavaScript Part 1.pdf หน้า 57–77

### หลักที่ควรจำ

- else if เลือกสาขาแรกที่จริง ต้องเรียงเงื่อนไขให้ถูก
- switch ใช้ strict comparison และระวัง fall-through
- do...while อย่างน้อย 1 รอบ
- continue ใน while อาจข้ามบรรทัดเพิ่มค่าจนวนไม่จบ
- for...of อ่านค่า ส่วน for...in อ่าน key

### เลือก if, ternary หรือ switch

if/else if ตรวจตามลำดับและเข้าเพียงสาขาแรกที่จริง ใช้ช่วงคะแนนจากมากไปน้อยช่วยลดเงื่อนไขซ้ำ ternary เป็น expression ที่เลือกคืนค่า ส่วน switch ใช้ strict comparison เทียบกับ case ถ้าไม่ใส่ break จะไหลไปคำสั่งของ case ถัดไปได้ จัดหลาย case ร่วมกันได้เมื่ออยากให้ทำงานเหมือนกันจริง ๆ

### for, while และ do...while

for เหมาะเมื่อมีตัวนับชัด เริ่มต้นครั้งเดียว → ตรวจ → ทำ → เพิ่มค่า → ตรวจใหม่ while ตรวจเงื่อนไขก่อน จึงอาจทำ 0 รอบ do...while ทำก่อนตรวจ จึงอย่างน้อย 1 รอบ เลือกใช้จากความหมายของงาน ไม่ใช่เพียงเพราะ syntax สั้นกว่า

### Counter กับ sentinel

Counter-controlled loop หยุดเมื่อจำนวนรอบถึงเป้า Sentinel-controlled loop หยุดเมื่อพบค่าสัญญาณ เช่น -1 จบรายการ ควรตรวจ sentinel ก่อนนำไปบวกรวม ต้องออกแบบทั้งกรณีพบ sentinel ทันที กรณีไม่พบ และกรณีข้อมูลหมด เพื่อไม่ให้ลูปไม่มีวันหยุด

### break, continue และ nested loop

break ออกจากลูปปัจจุบัน ส่วน continue ข้ามงานที่เหลือของรอบนั้น for ยังไปทำส่วนเพิ่มค่า แต่ while ไม่ได้เพิ่มค่าให้เอง label ใช้ระบุลูปชั้นนอกให้ break หรือ continue กระโดดไปได้ for...of อ่านค่าใน iterable ส่วน for...in อ่านชื่อ property แบบ enumerable จึงไม่ควรใช้แทนลูปค่า array โดยไม่คิดเรื่อง key และ prototype

```js
const scores = [0, 7, -1, 9];
let sum = 0;
for (const score of scores) {
  if (score === -1) break;
  if (score === 0) continue;
  sum += score;
}
console.log(sum); // 7
```

### จุดที่ควรอ่านให้ชัด

เงื่อนไข score >= 50 ก่อน score >= 80 ทำให้คะแนน 90 เข้าสาขาแรกแล้ว ไม่ถึง A ต้องเรียงจากช่วงที่เฉพาะกว่า หรือระบุขอบเขตครบ

### ตัวอย่าง: อ่านรายการจนเจอจุดหยุด

```js
const minutes = [10, 0, 15, -1, 100];
let total = 0;
for (const value of minutes) {
  if (value === -1) break;
  total += value;
}
console.log(total);
```

ผลที่ควรสังเกต:

25

ลองทำ: ข้ามค่าที่ต่ำกว่า 0 ทั้งหมด แต่ให้ -1 เป็นจุดหยุดเหมือนเดิม ลองข้อมูล [10, -3, 15, -1, 100] ผลต้องเป็น 25

<details><summary>แนวทางทำโจทย์</summary>

```js
const minutes = [10, -3, 15, -1, 100];
let total = 0;
for (const value of minutes) {
  if (value === -1) break;
  if (value < 0) continue;
  total += value;
}
console.log(total);
```

</details>



---

## Objects, arrays และ strings

เลือกวิธีเก็บและแปลงข้อมูลให้ตรงงาน พร้อมแยกให้ออกว่าคัดลอกค่าจริงหรือแค่คัดลอกการอ้างอิง

อ้างอิง ITDS241-Lecture06-JavaScript Part 1.pdf หน้า 40–48

### หลักที่ควรจำ

- b = a ไม่ได้ clone object
- slice ไม่แก้ต้นฉบับ แต่ splice แก้
- map คืน array ส่วน forEach คืน undefined
- sort ตัวเลขต้องมี comparator
- Spread คัดลอกชั้นเดียว ส่วน string methods คืนค่าใหม่

### Object เก็บข้อมูลด้วย key

เข้าถึงชื่อ property ที่รู้ล่วงหน้าด้วย obj.name หรือใช้ obj[key] เมื่อ key มาจากตัวแปร ชื่อที่มีช่องว่างต้องใช้ bracket การกำหนด b = a สำหรับ object ทำให้ทั้งสองชี้ไปยัง object เดียวกัน แก้ผ่าน b แล้ว a เห็นผลด้วย ไม่ได้มีสำเนาใหม่เกิดขึ้น

### Array เริ่ม index ที่ศูนย์

push/pop เพิ่มท้ายและลบท้าย shift/unshift ทำด้านหน้า slice(start, end) คัดบางช่วงโดยไม่รวม end ส่วน splice(start, count, ...items) แก้ต้นฉบับแล้วคืนสมาชิกที่ถูกลบ length คือความยาว ไม่ใช่ index สุดท้าย new Array(5) สร้างช่องว่าง 5 ช่อง ไม่ใช่ [5] ใช้ Array.isArray ตรวจว่าเป็น array

### เลือก method จากผลลัพธ์ที่ต้องการ

map แปลงแต่ละตัวแล้วคืน array ใหม่ filter เก็บตัวที่ผ่านเงื่อนไข reduce สะสมเป็นค่าเดียวและควรระบุค่าเริ่มต้น forEach ใช้ทำผลข้างเคียงและคืน undefined some ถามว่ามีอย่างน้อยหนึ่งตัวผ่านไหม every ถามว่าผ่านทุกตัวไหม find คืนค่าตัวแรก findIndex คืน index หรือ -1 sort และ reverse แก้ต้นฉบับ sort ปกติเทียบแบบข้อความ ถ้าจะเรียงเลขใช้ (a,b) => a-b

```js
const scores = [10, 2, 8];
console.log([...scores].sort((a, b) => a - b));
console.log(scores.filter(n => n >= 8).map(n => n * 2));
console.log(scores.reduce((sum, n) => sum + n, 0));
```

### String เปลี่ยนข้อความเดิมโดยตรงไม่ได้

charAt และ [index] อ่านตัวอักษร split แยกเป็น array join รวม array เป็นข้อความ substring กับ slice ใช้ตัดช่วง ส่วน trim ตัด whitespace หัวท้าย replace แบบ string แทนจุดแรก และ replaceAll แทนทั้งหมด การแปลงตัวพิมพ์เล็กใหญ่คืน string ใหม่ Escape เช่น \n, \t และ \\ ใช้แทนอักขระพิเศษ ความยาว string นับ UTF-16 code units จึงอาจไม่ตรงจำนวนตัวอักษรที่ตาเห็น

### Spread เป็น shallow copy

[...a] สร้าง array ใหม่ แต่ object ที่ซ้อนอยู่ยังเป็นตัวเดิม {...obj} ก็เช่นกัน หากต้องแยก object ลูกให้คัดลอกชั้นนั้นเพิ่ม ใน cheatsheet หน้า 34 ใช้ JSON round-trip เพื่อ clone ซึ่งเหมาะกับข้อมูลที่รองรับ JSON เท่านั้น ไม่รักษา Date, undefined, function, BigInt หรือวงจรอ้างอิงทั้งหมด ใช้ structuredClone สำหรับชนิดข้อมูลที่มันรองรับเมื่อต้องการ deep copy

### จุดที่ควรอ่านให้ชัด

การสร้าง array ใหม่ด้วย map ไม่ได้รับประกันว่า object ข้างในเป็นสำเนาใหม่ ถ้า callback คืน object เดิมก็ยังอ้างอิงร่วมกันอยู่

### ตัวอย่าง: สำเนาที่เปลี่ยนต้นฉบับด้วย

```js
const notes = [{ title: "DOM", read: false }];
const copy = [...notes];
copy[0].read = true;
console.log(notes[0].read);
console.log(notes === copy);
```

ผลที่ควรสังเกต:

true
false

ลองทำ: คัดลอกให้การตั้ง copy[0].read = true ไม่ทำให้ notes[0].read เปลี่ยน ใช้ map และ object spread

<details><summary>แนวทางทำโจทย์</summary>

```js
const notes = [{ title: "DOM", read: false }];
const copy = notes.map(note => ({ ...note }));
copy[0].read = true;
console.log(notes[0].read);
console.log(copy[0].read);
```

</details>



---

## Number, Math และ Date

เครื่องมือพื้นฐานช่วยลดโค้ด แต่ต้องรู้หน่วย ช่วงค่า และความหมายของค่าที่คืนมา โดยเฉพาะข้อมูลจากฟอร์มกับวันเวลา

อ้างอิง ITDS241-Lecture06-JavaScript Part 1.pdf หน้า 42–48

### หลักที่ควรจำ

- Number กับ parseInt ยอมรับข้อมูลต่างกัน
- floor กับ trunc ให้ผลต่างกันเมื่อค่าติดลบ
- Math.random() < 1 เสมอ
- getDate คือวันที่ แต่ getDay คือวันในสัปดาห์
- Date ใช้มิลลิวินาที และ getMonth เริ่ม 0

### แปลงตัวเลขและตรวจผล

Number("12px") ได้ NaN แต่ Number.parseInt("12px", 10) ได้ 12 เพราะอ่าน prefix ที่เป็นเลข Number.parseFloat อ่านทศนิยม Number.isInteger ตรวจว่าเป็นจำนวนเต็ม Number.isNaN ตรวจเฉพาะ NaN และ Number.isFinite ไม่ยอมแปลง string ให้ก่อน โดยทั่วไปใช้ primitive ผ่าน Number(value) แทน new Number(value) เพราะ wrapper เป็น object และเทียบต่างกัน

### ปัดเลข สุ่มค่า และยกกำลัง

Math ไม่ต้อง new ใช้ Math.PI, Math.pow หรือ ** ได้ตรง ๆ floor ปัดลงไปทางลบ ceil ปัดขึ้น trunc ตัดทศนิยมเข้าหาศูนย์ round ปัดใกล้ที่สุด เช่น floor(-1.8) เป็น -2 แต่ trunc(-1.8) เป็น -1 Math.random ได้ค่าตั้งแต่ 0 แต่ต่ำกว่า 1 สุ่มจำนวนเต็ม 1–6 ด้วย floor(random()*6)+1 ห้ามใช้เป็นแหล่งสุ่มรหัสลับ

### Date มี timestamp แต่การแสดงผลมีเขตเวลา

Date เก็บเวลาจาก epoch เป็นมิลลิวินาที getDate คือวันที่ 1–31 ส่วน getDay คือวันในสัปดาห์ 0–6 เริ่มอาทิตย์ getMonth ได้ 0–11 Date.now คืน timestamp ใช้หาผลต่างเวลาได้ ต้องหาร 1000 ถ้าต้องการวินาที ใช้ ISO string พร้อม Z หรือ offset เมื่อหมายถึงเวลาแน่นอน อย่าอาศัยรูปแบบวันที่กำกวม

### เวลา local กับ UTC

getHours อ่านตามเขตเวลาของเครื่อง getUTCHours อ่าน UTC ของ instant เดียวกัน new Date(year, monthIndex, ...) ใช้เดือนเริ่มที่ 0 และตีความเป็น local time ส่วน Date.UTC คืนตัวเลข timestamp ที่ตีความองค์ประกอบเป็น UTC การเพิ่ม 24 ชั่วโมงเป็นมิลลิวินาทีอาจต่างจากการเลื่อนวันปฏิทินในพื้นที่ที่มี daylight saving

### จุดที่ควรอ่านให้ชัด

cheatsheet อธิบาย Math.sinh เป็น square root ซึ่งไม่ถูกต้อง sinh คือ hyperbolic sine ส่วนรากที่สองคือ Math.sqrt และ Math.sign คืน 0 ไม่ใช่ null สำหรับศูนย์

### ตัวอย่าง: แปลงหน่วยเวลาก่อนคำนวณ

```js
const start = new Date("2026-10-18T02:00:00Z");
const end = new Date("2026-10-18T02:45:00Z");
console.log((end - start) / 60000);
console.log(start.getUTCHours());
console.log(Math.floor(-1.8), Math.trunc(-1.8));
```

ผลที่ควรสังเกต:

45
2
-2 -1

ลองทำ: เขียน minutesBetween(a,b) รับ ISO strings แล้วคืนผลต่างเป็นนาที ถ้าวันที่ไม่ถูกต้องให้คืน "invalid"

<details><summary>แนวทางทำโจทย์</summary>

```js
function minutesBetween(a, b) {
  const start = Date.parse(a);
  const end = Date.parse(b);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return "invalid";
  return (end - start) / 60000;
}
console.log(minutesBetween("2026-10-18T02:00:00Z", "2026-10-18T02:45:00Z"));
console.log(minutesBetween("bad", "bad"));
```

</details>



---

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



---

## ES6: syntax และ collections

ECMAScript คือมาตรฐานของภาษา ส่วน JavaScript เป็น implementation ที่เราใช้ ES6 กับ ES2015 หมายถึงรุ่นเดียวกัน เริ่มจากเครื่องมือที่พบในโค้ดสมัยใหม่ทุกวัน

อ้างอิง ITDS241-ECMAScript Version_Updated_2026Aug06 (1).pdf หน้า 4–33

### หลักที่ควรจำ

- ES6 = ES2015
- Rest รวบค่า ส่วน spread กระจายค่า
- Object spread เป็น ES2018 และยังเป็น shallow copy
- Set ตัดค่าซ้ำโดย identity สำหรับ object
- WeakMap ไม่ enumerate และไม่มี size

### จำฟีเจอร์เป็นกลุ่มแทนท่องรายชื่อ

ES2015 เพิ่ม let/const, arrow, classes, Promise, template literals, default parameter, rest/spread สำหรับ iterable, destructuring, for...of, Map และ Set ES2016 เป็นต้นมาออกรายปี ES4 ไม่เคยออกเป็นมาตรฐานสำเร็จ ส่วน object rest/spread เป็น ES2018 แม้สไลด์จะพูด object spread รวมอยู่ในหัวข้อ ES6

### Template literals และ destructuring

Backtick สร้างข้อความหลายบรรทัดและแทรก expression ด้วย ${...} Tagged template ส่งส่วนข้อความกับค่าที่แทรกให้ฟังก์ชัน tag จัดการ Destructuring ดึงค่าจาก array ตามตำแหน่ง หรือ object ตามชื่อ key เปลี่ยนชื่อได้ด้วย {name: nickname} ค่า default ของ destructuring ใช้เฉพาะเมื่อค่าที่ดึงเป็น undefined

### Rest รวบ Spread กระจาย

Rest ใน parameter รวบ argument ที่เหลือเป็น array และต้องอยู่ท้ายสุด Spread กระจาย iterable เป็น argument หรือสมาชิก array เช่น Math.max(...values) เมื่อใช้กับ object จะคัด own enumerable properties แบบตื้น ลำดับการกระจายมีผล key ที่มาทีหลังชนะ จึงใช้ {...defaults, ...input} เมื่อให้ input ทับ default

### Map, Set และ WeakMap

Map เก็บ key-value ที่ key เป็นค่าได้หลายชนิด มี get/set/has/size และวนได้ Set เก็บค่าที่ไม่ซ้ำกัน ใช้ [...new Set(items)] ตัดค่าซ้ำได้แต่ object ที่หน้าตาเหมือนกันยังเป็นคนละ identity WeakMap ในบริบท ES6 ใช้ object เป็น key ไม่ enumerate และไม่มี size ใน ES2023 เพิ่ม non-registered symbol keys ด้วย อย่าจำว่าตัวหนึ่งเร็วกว่าอีกตัวเสมอ เลือกจากความต้องการเรื่อง key และ lifetime

### Methods ที่ช่วยหาและเปรียบเทียบ

find คืนสมาชิกแรกที่ผ่านเงื่อนไข ส่วน findIndex คืน index หรือ -1 String.repeat ทำซ้ำข้อความ Object.is คล้าย === แต่ถือ NaN เท่ากับตัวเองและแยก +0/-0 การใช้ for...of บน array อ่านค่าและ break ได้ ต่างจาก forEach ที่ return ภายใน callback ไม่ได้ออกจากฟังก์ชันชั้นนอก

### จุดที่ควรอ่านให้ชัด

ตัวอย่าง findMax ในสไลด์เริ่ม max = 0 ทำให้ข้อมูลติดลบทั้งหมดได้คำตอบผิด ควรเริ่มจาก -Infinity หรือสมาชิกแรก และกำหนดพฤติกรรมสำหรับ input ว่าง

### ตัวอย่าง: ค่า default ที่ยอมให้ผู้ใช้เลือกเอง

```js
const defaults = { theme: "paper", fontSize: 18 };
const user = { fontSize: 20 };
const settings = { ...defaults, ...user };
const { theme, fontSize: size } = settings;
console.log(`${theme}: ${size}px`);
console.log([...new Set(["JS", "DOM", "JS"])]);
```

ผลที่ควรสังเกต:

paper: 20px
["JS","DOM"]

ลองทำ: เขียน max(...values) ที่หาค่ามากสุดของเลขติดลบได้ และคืน null เมื่อไม่ได้รับตัวเลขเลย

<details><summary>แนวทางทำโจทย์</summary>

```js
function max(...values) {
  if (values.length === 0) return null;
  let result = -Infinity;
  for (const value of values) if (value > result) result = value;
  return result;
}
console.log(max(-9, -2, -5));
console.log(max());
```

</details>



---

## Promises และ async/await

เวลาที่เขียนโค้ดกับเวลาที่งานเสร็จเป็นคนละเรื่อง ฝึกแยกลำดับ synchronous, microtask และ timer ก่อนเลือกวิธีรอผล

อ้างอิง ITDS241-ECMAScript Version_Updated_2026Aug06 (1).pdf หน้า 10–50

### หลักที่ควรจำ

- Executor ทำทันที แต่ then callback ทำทีหลัง
- then ต้อง return งานต่อเพื่อให้ chain รอ
- async function คืน Promise แม้ return ค่าเรียบง่าย
- await ไม่บล็อกทั้งหน้าเว็บ
- forEach ไม่รอ async callback ให้ครบ

### Promise เป็นตัวแทนผลที่จะทราบภายหลัง

สถานะมี pending, fulfilled และ rejected จาก pending ไป settled ได้ครั้งเดียว executor ของ new Promise ทำงานทันทีแบบ synchronous ส่วน callback ใน then/catch ทำงานเป็น microtask หลังโค้ด synchronous ปัจจุบันจบแล้ว resolve รับค่าหรือรับ promise ที่ต้องตามสถานะต่อได้ ไม่ใช่ทุก resolve จะหมายถึง fulfilled ทันที

### ต่อผลด้วย then และจับ error ด้วย catch

then คืน promise ใหม่ และค่าที่ return จะส่งต่อไป then ถัดไป ถ้า throw หรือคืน promise ที่ reject จะไปทาง rejection catch ช่วยรับ error ก่อนหน้าใน chain finally ใช้เก็บกวาดและโดยปกติส่งค่า/เหตุผลเดิมผ่านต่อ ไม่ใช่ที่แปลงผลลัพธ์ หาก finally เอง throw หรือ reject ก็เปลี่ยน chain ให้ reject ได้

### async คืน Promise เสมอ

async function ที่ return 2 จะคืน promise ที่ fulfilled ด้วย 2 await พักเฉพาะการทำงานต่อของ async function นั้น ไม่ได้หยุดทั้งหน้าเว็บ ใช้ try/catch รับ rejection เมื่อ await อย่าลืม return หรือ await งานที่ต้องการรอ ไม่เช่นนั้น caller อาจคิดว่างานจบแล้วทั้งที่ยังทำอยู่

### ทีละงานหรือทำพร้อมกัน

for...of กับ await ในลูปเหมาะกับงานที่ต้องทำตามลำดับ Promise.all รอหลายงานและคืนผลเรียงตาม input แม้เสร็จคนละลำดับ ถ้ามีงาน reject จะ reject โดยไม่ได้ยกเลิกงานอื่นที่เริ่มไปแล้ว forEach ไม่รอ promise จาก callback จึงไม่ควรใช้ await items.forEach(async...) แล้วคาดว่ารอครบ

### for await...of รอสิ่งที่ iteration ให้มา

for await...of ใช้อ่าน async iterable และอ่าน iterable ปกติที่ให้ promises ได้ แต่มันไม่ได้รอทุก async operation ที่ยิงทิ้งใน body โดยอัตโนมัติ ต้อง await งานนั้นด้วย ตัวอย่างหน้า 50 ที่ใช้ then ภายใน body อาจทำให้เข้าใจผิดเรื่องการรับประกันลำดับ ให้เขียน await calMultiply(...) ใน body เมื่อต้องการรอผลชัดเจน

### จุดที่ควรอ่านให้ชัด

setTimeout(..., 0) ไม่ได้แปลว่าแทรกมาทำทันที โค้ด synchronous และ microtasks ที่พร้อมอยู่จะทำก่อน timer callback ตามลำดับของ event loop

### ตัวอย่าง: ทายลำดับก่อนรัน

```js
console.log("A");
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("B");
```

ผลที่ควรสังเกต:

A
B
promise
timer

ลองทำ: เขียน async function ที่รอ Promise.resolve(5) แล้วพิมพ์ 10 และให้คำว่า start ถูกพิมพ์ก่อน 10

<details><summary>แนวทางทำโจทย์</summary>

```js
async function study() {
  const value = await Promise.resolve(5);
  console.log(value * 2);
}
study();
console.log("start");
```

</details>



---

## ES2016–2019: แปลงข้อมูลให้อ่านง่าย

ฟีเจอร์กลุ่มนี้ช่วยลดขั้นตอนวนลูปและแปลง object/array แต่ต้องแยกให้ได้ว่าแต่ละ method คืนโครงสร้างแบบไหน

อ้างอิง ITDS241-ECMAScript Version_Updated_2026Aug06 (1).pdf หน้า 34–56

### หลักที่ควรจำ

- includes คืน boolean และหา NaN ได้
- entries คือ array ของคู่ ส่วน fromEntries ทำย้อนกลับ
- padStart ระบุความยาวรวม
- Object spread และ finally เป็น ES2018
- flatMap คลายได้หนึ่งระดับ

### ES2016: includes และ exponentiation

includes ถามว่ามีค่านี้ไหมและคืน boolean ต่างจาก indexOf ที่คืน index หรือ -1 includes หา NaN เจอ แต่ indexOf หาไม่เจอ ** เป็นเลขยกกำลัง เช่น 2 ** 3 ได้ 8 ระวังการตีความเครื่องหมายลบกับยกกำลัง ให้เขียน -(2 ** 2) หรือ (-2) ** 2 ให้ชัด

### ES2017: อ่าน object และจัดข้อความ

Object.values คืน array ของ own enumerable string-keyed values Object.entries คืนคู่ [key,value] ใช้ getOwnPropertyDescriptors เมื่อต้องรักษารายละเอียด property เช่น getter และ writable แทนการ copy ค่าอย่างเดียว padStart/padEnd เติมข้อความจนถึง targetLength ไม่ใช่เติมตามจำนวนที่ระบุ เช่น "7".padStart(3,"0") เป็น "007" Trailing commas ใน parameter/call ช่วยแก้บรรทัดได้ง่าย ไม่ได้เพิ่ม argument เปล่า

### ES2018: object rest/spread และ async iteration

const {password, ...safe} = user แยก property ที่ไม่ต้องการออกโดยไม่ลบจาก user ส่วน {...a,...b} รวมแบบ shallow โดย b ทับ key ซ้ำ Promise.finally และ for await...of อยู่ในรุ่นนี้ด้วย อ่านรายละเอียดลำดับเวลาในหัวข้อ async ก่อนนำไปใช้

### ES2019: flat, flatMap และ fromEntries

flat() คลาย array หนึ่งระดับโดย default flat(2) คลายสองระดับ flatMap ทำ map แล้ว flat หนึ่งระดับเท่านั้น Object.fromEntries แปลงคู่ key-value กลับเป็น object และคู่ key ซ้ำที่มาทีหลังจะชนะ trimStart/trimEnd ตัด whitespace ด้านเดียว ไม่ได้เปลี่ยน string ต้นฉบับ

```js
const entries = Object.entries({ JS: 20, DOM: 15 });
const doubled = entries.map(([name, n]) => [name, n * 2]);
console.log(Object.fromEntries(doubled));
console.log([1, 2].flatMap(n => [n, n * 10]));
```

### จุดที่ควรอ่านให้ชัด

Object.fromEntries(Object.entries(obj)) สร้าง object ชั้นนอกใหม่ แต่ object ลูกยังแชร์กัน และ descriptor ไม่ได้คงเดิมเหมือนคัดลอกด้วย getOwnPropertyDescriptors

### ตัวอย่าง: หนึ่งคำขยายเป็นหลายป้าย

```js
const titles = ["JS DOM", "OOP"];
const tags = titles.flatMap(title => title.split(" "));
console.log(tags);
console.log("7".padStart(3, "0"));
console.log([NaN].includes(NaN), [NaN].indexOf(NaN));
```

ผลที่ควรสังเกต:

["JS","DOM","OOP"]
007
true -1

ลองทำ: แปลง {JS: 20, DOM: 0, OOP: 15} ให้เหลือ object ที่มีค่า > 0 โดยใช้ entries, filter และ fromEntries

<details><summary>แนวทางทำโจทย์</summary>

```js
const minutes = { JS: 20, DOM: 0, OOP: 15 };
const result = Object.fromEntries(
  Object.entries(minutes).filter(([, value]) => value > 0)
);
console.log(result);
```

</details>



---

## ES2020–2023: ค่าที่หายและข้อมูลที่ไม่ควรถูกแก้

ข้อมูลจริงอาจขาดบาง property มีค่า 0 ที่ถูกต้อง หรือมีเลขใหญ่มาก เลือกเครื่องมือให้รักษาความหมายของข้อมูลเหล่านี้ได้

อ้างอิง ITDS241-ECMAScript Version_Updated_2026Aug06 (1).pdf หน้า 57–81

### หลักที่ควรจำ

- ?? เก็บ 0, false และ "" ไว้
- ?. ป้องกัน nullish ใน chain แต่ไม่แก้ตัวแปรที่ไม่ประกาศ
- at(-1) คือตัวสุดท้าย
- Object.hasOwn ตรวจการมี key ไม่ใช่ truthiness ของค่า
- toSorted ไม่แก้ array เดิม แต่สมาชิก object ยังแชร์

### ES2020: BigInt, ??, ?. และ matchAll

BigInt เขียน 123n ใช้คำนวณจำนวนเต็มใหญ่โดยไม่ผสมกับ Number ใน arithmetic ตรง ๆ ?? ใช้ fallback เมื่อ null/undefined เท่านั้น ?. หยุด chain เมื่อค่าก่อนหน้าเป็น nullish แล้วคืน undefined แต่ไม่ช่วยกับตัวแปรที่ยังไม่เคยประกาศ String.matchAll คืน iterator ของผล regex หลาย match เมื่อส่ง RegExp ต้องมี flag g

### ES2021: logical assignment และ weak references

x ||= y กำหนดเมื่อ x เป็น falsy x &&= y กำหนดเมื่อ x เป็น truthy x ??= y กำหนดเมื่อ nullish จึงต้องเลือกตามความหมาย Numeric separator เช่น 1_000_000 ช่วยอ่าน literal แต่ string "1_000" ไม่กลายเป็นเลข 1000 ผ่าน Number replaceAll แทนทุกจุด WeakRef และ FinalizationRegistry เกี่ยวกับ garbage collection ซึ่งเวลาเกิดไม่แน่นอน ห้ามใช้เป็นกลไกหลักของงานที่ต้องเกิดแน่นอน

### ES2022: at, hasOwn, error cause และ top-level await

at(-1) อ่านตัวท้ายของ array/string Object.hasOwn ตรวจว่ามี property ของตัวเองจริง แม้ค่าเป็น false หรือ undefined ไม่เหมือน obj.key !== undefined และไม่เหมือน in ที่รวม inherited properties new Error(message,{cause}) ช่วยต่อเหตุผลเดิม Top-level await ใช้ใน module ซึ่งมี scope แยกจาก classic script ไม่ได้ใช้ใน classic script ทั่วไป

### ES2023: ค้นจากท้ายและเปลี่ยนโดย copy

findLast กับ findLastIndex เริ่มค้นจากท้าย toSorted/toReversed/toSpliced/with สร้าง array ใหม่แทนแก้ต้นฉบับ แต่ยัง shallow เหมือนเดิม with(index,value) เปลี่ยนค่าในสำเนาและอาจ throw RangeError ถ้า index นอกช่วง ส่วน WeakMap รองรับ non-registered symbols เพิ่มจาก object keys อย่าใช้ Symbol.for เป็น weak key

### จุดที่ควรอ่านให้ชัด

Top-level await อยู่ใน ES2022 แม้มีหัวข้อซ้ำใต้ ES2024 ในสไลด์ และ ?? ไม่สามารถเขียนปน || หรือ && โดยไม่ใส่วงเล็บแยกตามไวยากรณ์

### ตัวอย่าง: ศูนย์ไม่ใช่ข้อมูลที่หาย

```js
const progress = { done: 0, profile: null };
console.log(progress.done || 10);
console.log(progress.done ?? 10);
console.log(progress.profile?.name ?? "ยังไม่มีชื่อ");
const scores = [30, 5, 20];
console.log(scores.toSorted((a,b) => a-b));
console.log(scores);
```

ผลที่ควรสังเกต:

10
0
ยังไม่มีชื่อ
[5,20,30]
[30,5,20]

ลองทำ: อ่าน settings.user?.volume ให้ใช้ค่าเริ่มต้น 50 เฉพาะเมื่อไม่มีข้อมูล โดยต้องเก็บ volume = 0 ไว้ได้

<details><summary>แนวทางทำโจทย์</summary>

```js
function volume(settings) {
  return settings.user?.volume ?? 50;
}
console.log(volume({ user: { volume: 0 } }));
console.log(volume({}));
```

</details>



---

## ES2024 และข้อเสนอทดลองในสไลด์

หัวข้อนี้ต้องอ่านสองชั้น คือสิ่งที่เอกสารจัดหมวดไว้ และสิ่งที่มาตรฐานรับรองจริง การอยู่ใต้หัวข้อปีหนึ่งในสไลด์ไม่ได้แปลว่ารันได้ทุกอย่าง

อ้างอิง ITDS241-ECMAScript Version_Updated_2026Aug06 (1).pdf หน้า 82–100

### หลักที่ควรจำ

- toWellFormed แก้ lone surrogate ไม่ใช่จำนวน grapheme
- ไม่มี Atomics.waitSync ใน standard API
- Top-level await เป็น ES2022
- Pipeline และ records/tuples ในสไลด์ไม่ใช่ ES2024 syntax
- แยกปีของมาตรฐาน สถานะ proposal และ browser support

### Unicode ที่ well-formed

isWellFormed ตรวจว่ามี lone surrogate หรือไม่ toWellFormed คืน string ที่แทน lone surrogate ด้วย U+FFFD ไม่ได้แปลภาษา ไม่ได้ normalize รูปอักษร และไม่ได้ทำให้ string.length ตรงจำนวนตัวอักษรที่ตาเห็น จัดอยู่ในฟีเจอร์มาตรฐาน ES2024

### แก้ชื่อ Atomics และปีของ await

สไลด์หน้า 86–87 ใช้ Atomics.waitSync ซึ่งไม่ใช่ชื่อ API มาตรฐาน มี Atomics.wait สำหรับรอแบบบล็อกในบริบทที่อนุญาต และ Atomics.waitAsync สำหรับรอแบบไม่บล็อก งาน shared memory ต้องมี SharedArrayBuffer และเงื่อนไข runtime ที่เหมาะสม ไม่ควรคัดลอกตัวอย่างนั้นไปรันบนหน้า UI ตรง ๆ ส่วน top-level await มาจาก ES2022 ไม่ใช่ ES2024

### Pipeline, records/tuples และ decorators

Pipeline |> กับ records/tuples syntax แบบ #{}/#[] ในเอกสารไม่ใช่ไวยากรณ์มาตรฐาน ES2024 อย่านำไปวางในเบราว์เซอร์ปกติแล้วคาดหวังว่าจะรันได้ Decorators ก็เป็นข้อเสนอแยกจากตัวมาตรฐาน ES2024 และตัวอย่าง legacy decorators ของ TypeScript ไม่ได้มี signature เดียวกับ proposal เสมอ ให้แยกความเข้าใจแนวคิดออกจากโค้ดที่ runtime รองรับ

### Temporal และการเช็กสถานะ

Temporal แยกวันปฏิทิน เวลา local instant และ time zone ได้ละเอียดกว่า Date แต่การจัดไว้ใต้ ES2024 ในสไลด์ไม่ได้ทำให้มันเป็นส่วน ES2024 ให้ดูเอกสาร TC39/MDN และตรวจ typeof Temporal ก่อนทดลอง เนื้อหาหน้านี้ใช้เป็นหมายเหตุประกอบสไลด์ ไม่ใช้ท่องว่าทุกหัวข้อเป็นฟีเจอร์ที่ประกาศในปี 2024

### จุดที่ควรอ่านให้ชัด

การเช็ก feature ที่เป็น syntax ใหม่ต้องแยกจากการเช็ก method: typeof ใช้ได้กับชื่อ property แต่ syntax ที่ parser ไม่รู้จักทำให้ทั้ง script parse ไม่ผ่านก่อนจะถึง if

### ตัวอย่าง: ตรวจความพร้อมโดยไม่ใช้ syntax ทดลอง

```js
const text = "JS\uD800";
console.log(text.isWellFormed());
console.log(text.toWellFormed());
console.log(typeof Atomics.waitSync);
console.log(typeof Atomics.waitAsync);
```

ผลที่ควรสังเกต:

false
JS�
undefined
function ใน runtime ที่รองรับ waitAsync

ลองทำ: เขียน safeText(value) ให้ใช้ toWellFormed เมื่อมี method นี้ และคืนข้อความเดิมพร้อม log คำว่า fallback เมื่อไม่มี

<details><summary>แนวทางทำโจทย์</summary>

```js
function safeText(value) {
  if (typeof value.toWellFormed === "function") return value.toWellFormed();
  console.log("fallback");
  return value;
}
console.log(safeText("JS\uD800"));
```

</details>

แหล่งตรวจประกอบ:

- [TC39: ข้อเสนอที่เสร็จแล้ว](https://github.com/tc39/proposals/blob/main/finished-proposals.md)
- [TC39: ข้อเสนอที่กำลังพัฒนา](https://github.com/tc39/proposals)
- [MDN: Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)


---

## ES2025: iterators, sets และเครื่องมือใหม่

รุ่นนี้เพิ่มเครื่องมือทำงานกับข้อมูลเป็นลำดับ เซต regular expression และตัวเลขขนาดเล็ก เลือกจากพฤติกรรมที่ต้องการก่อนจำชื่อ method

อ้างอิง ITDS241-ECMAScript Version_Updated_2026Aug06 (1).pdf หน้า 101–109

### หลักที่ควรจำ

- Iterator helpers เป็น lazy และถูก consume ได้
- difference มีทิศทาง A−B ไม่จำเป็นต้องเท่า B−A
- RegExp.escape ใช้เมื่ออยากค้นข้อความตรงตัว
- Promise.try ครอบ synchronous throw ได้
- Float16 ประหยัดพื้นที่แลกกับความแม่นยำ

### Import attributes และ JSON modules

import config from "./config.json" with {type:"json"} ระบุว่าทรัพยากรเป็น JSON และ dynamic import ใช้ options {with:{type:"json"}} ได้ ตัวอย่างนี้ต้องอยู่ใน module และมีไฟล์จริงพร้อมสภาพแวดล้อมที่รองรับ จึงไม่เหมือน JSON.parse ของ string ที่มีอยู่แล้ว การเปิด file:// อาจมีข้อจำกัดในการโหลด module

### Iterator helpers ประเมินเมื่อถูกขอ

Iterator.from(data).filter(...).map(...).take(2) สร้าง pipeline แบบ lazy งานเกิดเมื่อมีการดึงค่า เช่น toArray หรือ for...of ต่างจาก Array.map ที่ทำครบและสร้าง array ทันที take ช่วยหยุดเมื่อได้จำนวนที่ต้องการ iterator ที่ใช้หมดแล้วนำกลับมาใช้ไม่เหมือน array ต้องสร้างใหม่หากจะวนซ้ำ

### Set operations และ RegExp

union รวม intersection เอาส่วนร่วม difference เอาที่มีในตัวตั้งแต่ไม่มีในอีกเซต symmetricDifference เอาที่อยู่เพียงฝั่งเดียว isSubsetOf/isSupersetOf/isDisjointFrom คืน boolean RegExp.escape ทำให้ input ถูกค้นเป็น literal ไม่กลายเป็น regex pattern รุ่นนี้ยังมี inline modifiers เช่น (?i:...) และอนุญาตชื่อกลุ่มซ้ำข้าม alternatives ภายใต้เงื่อนไขไวยากรณ์ ไม่ใช่ซ้ำได้ทุกตำแหน่ง

### Promise.try และ Float16

Promise.try(fn) เรียก fn และเปลี่ยนทั้งผลธรรมดา promise หรือ synchronous throw ให้ตามต่อด้วย promise chain ได้ ต่างจาก Promise.resolve(fn()) ที่ fn อาจ throw ก่อน resolve ถูกเรียก Float16Array เก็บ float แบบ 16 บิต ประหยัดหน่วยความจำกว่า 32/64 บิตแต่ความละเอียดและช่วงค่าลดลง DataView มี getFloat16/setFloat16 สำหรับอ่านเขียน binary ด้วย ไม่เหมาะเก็บจำนวนเงินเมื่อยอมเสียความแม่นยำไม่ได้

### จุดที่ควรอ่านให้ชัด

เช็ก method ก่อนรันในเบราว์เซอร์เก่า โดยเฉพาะ Iterator helpers, RegExp.escape และ Float16 ตัวอย่าง import JSON ต้องลองใน module จริง จึงแสดงเป็นเนื้อหาอธิบายแทนการ import ไฟล์ที่ไม่มี

### ตัวอย่าง: อ่านเฉพาะค่าที่ต้องใช้

```js
if (typeof Iterator !== "undefined" && typeof Iterator.from === "function") {
  const result = Iterator.from([1, 2, 3, 4, 5])
    .filter(n => n % 2 === 0)
    .map(n => n * n)
    .take(2).toArray();
  console.log(result);
} else {
  console.log("runtime นี้ยังไม่มี Iterator helpers");
}
```

ผลที่ควรสังเกต:

[4,16] เมื่อรองรับ หรือข้อความแจ้งเมื่อไม่รองรับ

ลองทำ: ใช้ Set หาหัวข้อที่อยู่ใน ["JS","DOM","OOP"] แต่ไม่อยู่ใน ["DOM"] โดยมี fallback สำหรับ runtime ที่ไม่มี difference

<details><summary>แนวทางทำโจทย์</summary>

```js
const all = new Set(["JS", "DOM", "OOP"]);
const done = new Set(["DOM"]);
const left = typeof all.difference === "function"
  ? all.difference(done)
  : new Set([...all].filter(topic => !done.has(topic)));
console.log([...left]);
```

</details>



---

## ES2026: ผลรวม แมป JSON และ binary

อ่านว่า API ใหม่แก้ปัญหาไหน และยังมีข้อจำกัดอะไร อย่าจำคำว่า precise ว่าหมายถึงแก้ทุกปัญหาของ floating point

อ้างอิง ITDS241-ECMAScript Version_Updated_2026Aug06 (1).pdf หน้า 110–123

### หลักที่ควรจำ

- sumPrecise ช่วยผลรวม แต่ยังคืน Number
- Error.isError ทำงานข้าม realm ได้
- Array.fromAsync คืน Promise ของ array
- getOrInsert รับค่า ส่วน getOrInsertComputed รับ callback
- rawJSON รักษาข้อความตอน stringify ไม่แก้การ parse ฝั่งผู้รับ

### Math.sumPrecise กับ Error.isError

Math.sumPrecise ลดความคลาดเคลื่อนจากการบวกต่อเนื่อง เช่น [1e16,1,-1e16] ได้ 1 แทน 0 แต่ผลสุดท้ายยังเป็น Number ที่ถูกปัด ไม่ทำให้เลขฐานสิบทุกตัวแทนได้ตรงทั้งหมด และไม่ใช่ตัวแทนระบบเลขเงินแบบ decimal Error.isError ตรวจ Error ข้าม realm ได้ ต่างจาก instanceof Error ซึ่งอาจไม่รู้จัก Error ที่สร้างจาก iframe อีก realm

### Array.fromAsync

สร้าง array จาก async iterable, iterable หรือ array-like โดยคืน Promise ไม่ใช่ array ทันที ต้อง await ผล การอ่านและ mapping เป็นแบบรอตามลำดับ ไม่ใช่สั่งทุกงานพร้อมกันเหมือนภาพการใช้ Promise.all กับ promises ที่สร้างไว้แล้ว เลือกให้เหมาะกับแหล่งข้อมูลและลำดับที่ต้องการ

### Map upsert มีสองรูปแบบที่ต้องแยก

map.getOrInsert(key, defaultValue) คืนค่าเดิมเมื่อมี key มิฉะนั้นแทรก defaultValue แล้วคืนค่านั้น มันรับค่า ไม่ได้เรียก callback ให้เอง map.getOrInsertComputed(key, callback) จึงเหมาะเมื่ออยากคำนวณเฉพาะกรณีไม่มี key ถ้ามี key ที่ค่าเป็น undefined ก็ยังถือว่ามีอยู่ ไม่ควรแทนด้วย get(key) ?? default ถ้าต้องรักษาความหมายนี้

### JSON.rawJSON ไม่ได้กู้ตัวเลขที่ปัดไปแล้ว

JSON.rawJSON("9007199254740993") ช่วยให้ stringify ปล่อยเลขจาก raw text อย่างแม่นตรงตามข้อความ แต่ถ้าเขียน Number literal ที่เกิน safe integer ก่อน ข้อมูลอาจปัดไปแล้ว rawJSON ไม่ทำให้ JSON.parse ฝั่งผู้รับรักษาเลขใหญ่เป็น Number ได้เอง ควรตกลง schema เก็บ ID เป็น string หรือมีกลไก parse ที่รักษาข้อมูลจากข้อความต้นทาง

### Uint8Array กับ Base64/hex

bytes.toBase64() และ toHex() แปลงข้อมูลไบต์เป็นข้อความ ส่วน Uint8Array.fromBase64/fromHex แปลงกลับ Base64 เป็น encoding ไม่ใช่ encryption และไม่ใช่การแปลง Unicode string เป็นไบต์โดยอัตโนมัติ ใช้ TextEncoder เมื่อเริ่มจากข้อความ การรองรับ method ใหม่ขึ้นกับ runtime จึงเช็กก่อนใช้ได้โดยไม่ต้องโหลด polyfill ภายนอก

### จุดที่ควรอ่านให้ชัด

ไม่โหลด polyfill ตามแท็กในสไลด์โดยอัตโนมัติ เว็บนี้ทำงานออฟไลน์และจะแจ้งเมื่อ browser ไม่มี API แทน หมายเหตุของบทนี้ตรวจเทียบเอกสารทางการวันที่ 18 ต.ค. 2026

### ตัวอย่าง: ใส่ default เมื่อยังไม่มี key เท่านั้น

```js
const visits = new Map([["JS", 0]]);
function getOrInsert(map, key, value) {
  if (!map.has(key)) map.set(key, value);
  return map.get(key);
}
console.log(getOrInsert(visits, "JS", 99));
console.log(getOrInsert(visits, "DOM", 1));
console.log([...visits]);
```

ผลที่ควรสังเกต:

0
1
[["JS",0],["DOM",1]]

ลองทำ: เปลี่ยน helper ให้รับ callback และเรียก callback เฉพาะตอนยังไม่มี key ลองนับจำนวนครั้งที่ callback ถูกเรียก

<details><summary>แนวทางทำโจทย์</summary>

```js
const map = new Map();
let calls = 0;
function getOrInsertComputed(map, key, compute) {
  if (!map.has(key)) map.set(key, compute(key));
  return map.get(key);
}
const build = () => { calls++; return 10; };
getOrInsertComputed(map, "JS", build);
getOrInsertComputed(map, "JS", build);
console.log(calls);
```

</details>

แหล่งตรวจประกอบ:

- [MDN: Math.sumPrecise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise)
- [MDN: Map.getOrInsert](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/getOrInsert)
- [MDN: JSON.rawJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/rawJSON)
