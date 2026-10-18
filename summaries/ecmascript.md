# ECMAScript · ES6–2026 · สรุปภาษาไทย

ต้นฉบับ: ITDS241-ECMAScript Version_Updated_2026Aug06 (1).pdf (124 หน้า)

เขียนสรุปใหม่เพื่อทบทวนส่วนตัว เลขหน้าอ้างอิงหน้า PDF ไม่ใช่เลขสไลด์ หมายเหตุเพิ่มเติมแยกจากคำอธิบายต้นฉบับ

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
