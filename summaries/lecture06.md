# JavaScript · Part 1 · สรุปภาษาไทย

ต้นฉบับ: ITDS241-Lecture06-JavaScript Part 1.pdf (78 หน้า)

เขียนสรุปใหม่เพื่อทบทวนส่วนตัว เลขหน้าอ้างอิงหน้า PDF ไม่ใช่เลขสไลด์ หมายเหตุเพิ่มเติมแยกจากคำอธิบายต้นฉบับ

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
