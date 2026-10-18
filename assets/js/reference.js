window.STUDY.reference = [
  { title: 'ตัวแปรและชนิดข้อมูล', pages: '5–7', tags: 'var let const typeof primitive bigint symbol', rows: [
    ['const / let / var', 'เลือก const ถ้าไม่ reassign; let ถ้าเปลี่ยนค่า; var มี function scope'],
    ['typeof value', 'ตรวจชนิดแบบย่อ ระวัง typeof null และ array ได้ "object"'],
    ['Array.isArray(value)', 'ตรวจ array โดยตรง'],
    ['value === null', 'แยก null ที่ระบุว่าไม่มีค่าออกจาก undefined'],
    ['BigInt / Symbol', 'BigInt ใช้จำนวนเต็มใหญ่ Symbol ใช้ค่าเอกลักษณ์ ทั้งคู่เป็น primitive']
  ], example: 'const note = { read: false };\nnote.read = true; // เปลี่ยน property ได้\nconsole.log(typeof null, Array.isArray([]));' },
  { title: 'Operators และ truthiness', pages: '8–17', tags: 'comparison bitwise logical truthy falsy coercion', rows: [
    ['+ - * / % **', 'บวก ลบ คูณ หาร เศษ และยกกำลัง + อาจต่อ string'],
    ['=== / !==', 'เทียบโดยไม่แปลงชนิด; object ใช้ identity'],
    ['&& / || / !', 'short circuit และคืน operand; ! คืน boolean'],
    ['?? / ?.', 'เสริมจาก ES2020: default เฉพาะ nullish และเข้าถึง chain อย่างปลอดภัย'],
    ['& | ^ ~ << >> >>>', 'Bitwise สำหรับ Number ใช้การแทนจำนวนเต็ม 32 บิตเป็นหลัก ไม่ใช่ตัวแทน Math ทั่วไป'],
    ['falsy', 'false, 0, -0, 0n, "", null, undefined, NaN; [] กับ {} เป็น truthy'],
    ['condition ? a : b', 'เลือก expression หนึ่งค่าจากเงื่อนไข']
  ], example: 'console.log("5" + 2, "5" - 2);\nconsole.log(0 || 9, 0 ?? 9);\nconsole.log(Boolean([]));' },
  { title: 'Functions', pages: '12', tags: 'arrow function return declaration expression parameter argument callback', rows: [
    ['function f(a = 1) {}', 'default ใช้กับ undefined ไม่ใช่ null; ไม่มี return ได้ undefined'],
    ['x => x * 2', 'expression body คืนค่าอัตโนมัติ; block body ต้อง return'],
    ['const f = function(x) { return x; }', 'function expression เก็บฟังก์ชันไว้เป็นค่าในตัวแปร'],
    ['fn / fn()', 'ส่งตัวฟังก์ชันให้เรียกภายหลัง / เรียกตอนนี้แล้วส่งผลลัพธ์']
  ], example: 'function double(n) { return n * 2; }\nconst values = [2, 3].map(double);\nconsole.log(values);' },
  { title: 'เงื่อนไขและ loops', pages: '13–16, 26–31', tags: 'conditional if switch ternary for while do forEach map filter reduce', rows: [
    ['if / else if / else', 'เลือกสาขาแรกที่เงื่อนไขจริง จัดลำดับการตรวจให้ตรงโจทย์'],
    ['switch / case / default', 'เทียบแบบ strict; ใส่ break เมื่อต้องการหยุดไม่ให้ไหลต่อ'],
    ['for / while / do...while', 'ตัวนับ / ตรวจเงื่อนไขก่อน / ทำก่อนอย่างน้อยหนึ่งครั้ง'],
    ['for...of / for...in', 'อ่าน value จาก iterable / อ่าน enumerable property keys'],
    ['map / filter / reduce', 'แปลงทุกตัว / เลือกบางตัว / สะสมเป็นค่าเดียว'],
    ['some / every / forEach', 'มีสักตัวผ่าน / ทุกตัวผ่าน / ทำงานแต่ไม่รวบรวมผล'],
    ['break / continue', 'ออกจากลูป / ข้ามงานที่เหลือของรอบปัจจุบัน']
  ], example: 'const total = [2, 4, 6].reduce((sum, n) => sum + n, 0);\nconsole.log(total);' },
  { title: 'String methods และ escapes', pages: '18–22', tags: 'string slice substring split trim replace includes escape charAt substr', rows: [
    ['length / [i] / charAt(i)', 'อ่านความยาว UTF-16 และตำแหน่ง code unit'],
    ['split(separator) / join(separator)', 'แยก string เป็น array / รวม array เป็น string'],
    ['slice(start,end) / substring(start,end)', 'ตัดช่วงไม่รวม end; slice รองรับ index ติดลบ'],
    ['includes / indexOf / lastIndexOf', 'มีข้อความไหม / index แรก / index สุดท้าย; ไม่พบ index เป็น -1'],
    ['toLowerCase / toUpperCase / trim', 'คืนข้อความใหม่ที่เปลี่ยน case หรือตัด whitespace หัวท้าย'],
    ['replace / replaceAll', 'แทนจุดแรกเมื่อ pattern เป็น string / แทนทุกจุด'],
    ['\\n / \\t / \\\\ / \\" / \\\'', 'newline / tab / backslash / quote สองแบบ'],
    ['substr(start,length)', 'syntax เก่าใน cheatsheet เลือก slice ในโค้ดใหม่แทน']
  ], example: 'const input = "  JS DOM  ";\nconsole.log(input.trim().toLowerCase().split(" "));\nconsole.log("บรรทัดแรก\\nบรรทัดสอง");' },
  { title: 'Array methods', pages: '23–31', tags: 'array push pop shift unshift splice slice sort reverse find every some', rows: [
    ['push / pop / unshift / shift', 'เพิ่มท้าย / ลบท้าย / เพิ่มหน้า / ลบหน้า ทั้งหมดแก้ array เดิม'],
    ['slice / splice', 'คัดช่วงโดยไม่แก้ / ลบและแทรกโดยแก้ต้นฉบับ'],
    ['concat / join / includes', 'รวมเป็น array ใหม่ / รวมเป็น string / ตรวจสมาชิก'],
    ['sort((a,b)=>a-b) / reverse()', 'เรียงเลข / กลับด้าน ทั้งคู่แก้ต้นฉบับ'],
    ['find / findIndex', 'คืนตัวแรกที่ผ่าน / index แรก; ไม่พบเป็น undefined / -1'],
    ['reduceRight', 'สะสมจากท้ายมาหน้า; ระบุ initial value เมื่อเหมาะสม'],
    ['toSorted / toReversed / toSpliced / with', 'เสริมจาก ES2023: คืน array ใหม่แบบ shallow']
  ], example: 'const a = [10, 2, 1];\nconsole.log([...a].sort((x, y) => x - y));\nconsole.log(a);' },
  { title: 'Value, reference และการคัดลอก', pages: '32–34', tags: 'copy shallow deep clone reference structuredClone JSON', rows: [
    ['b = a', 'ถ้าเป็น object ทั้งสองอ้าง object เดียวกัน'],
    ['[...a] / {...obj}', 'สำเนาชั้นนอกใหม่ แต่ข้อมูลซ้อนยังอ้างร่วมกัน'],
    ['items.map(x => ({...x}))', 'คัดทั้ง array และ object สมาชิกอีกหนึ่งระดับ'],
    ['structuredClone(value)', 'deep clone ของชนิดที่รองรับ เช่น object/array/Date แต่ไม่ใช่ function และ DOM node'],
    ['JSON.parse(JSON.stringify(x))', 'ใช้ได้จำกัดกับข้อมูล JSON; ไม่รักษาทุกชนิดและไม่รองรับวงจรทั่วไป']
  ], example: 'const a = [{ read: false }];\nconst b = a.map(item => ({ ...item }));\nb[0].read = true;\nconsole.log(a[0].read, b[0].read);' },
  { title: 'Math และ Number', pages: '36–40', tags: 'math random floor ceil trunc abs sqrt sinh sign parseInt number', rows: [
    ['Math.abs / sign / min / max', 'ค่าสัมบูรณ์ / เครื่องหมาย -1,0,1 / ค่าน้อยสุด / มากสุด'],
    ['Math.floor / ceil / round / trunc', 'ลง / ขึ้น / ใกล้สุด / ตัดทศนิยมเข้าหาศูนย์'],
    ['Math.pow / sqrt / cbrt / exp / log', 'ยกกำลัง / รากสอง / รากสาม / e ยกกำลัง / log ฐาน e'],
    ['Math.random()', '0 ≤ x < 1; สุ่มเต็มช่วง [min,max] ด้วย floor(x*(max-min+1))+min'],
    ['sin cos tan / asin acos atan atan2', 'ตรีโกณมิติและผกผัน ใช้เรเดียน'],
    ['sinh cosh tanh / asinh acosh atanh', 'ฟังก์ชัน hyperbolic และผกผัน; sinh ไม่ใช่ square root'],
    ['Number / parseInt / parseFloat', 'แปลงทั้งข้อความ / อ่าน prefix เป็นจำนวนเต็ม / อ่าน prefix ทศนิยม'],
    ['Number.isNaN / isFinite / isInteger', 'ตรวจ NaN / จำนวน finite / จำนวนเต็ม โดยไม่ coercion']
  ], example: 'console.log(Math.floor(-1.8), Math.trunc(-1.8));\nconsole.log(Number("12px"), Number.parseInt("12px", 10));' },
  { title: 'Date และเวลา', pages: '41–47', tags: 'date timestamp UTC timezone getMonth getDay getDate ISO', rows: [
    ['new Date() / new Date(iso)', 'เวลาปัจจุบัน / instant จาก ISO string ที่ควรระบุ Z หรือ offset'],
    ['new Date(year, monthIndex, ...)', 'ประกอบ local date; monthIndex เริ่ม 0'],
    ['Date.now / Date.parse / getTime', 'timestamp ปัจจุบัน / parse string เป็น timestamp / timestamp ของ Date'],
    ['getFullYear / getMonth / getDate / getDay', 'ปี / เดือน 0–11 / วันที่ 1–31 / วันในสัปดาห์ 0–6'],
    ['getHours / getMinutes / getSeconds / getMilliseconds', 'องค์ประกอบเวลา local; แบบ UTC เติม UTC หลัง get'],
    ['setFullYear / setMonth / setDate / setHours / setTime', 'แก้ Date เดิม; ระวังการล้นเดือนและเขตเวลา'],
    ['toISOString()', 'คืนข้อความแบบ UTC; invalid date ทำให้ throw ได้']
  ], example: 'const date = new Date("2026-10-18T02:00:00Z");\nconsole.log(date.toISOString());\nconsole.log(date.getUTCMonth(), date.getUTCDate());' },
  { title: 'Window methods และ properties', pages: '49–59', tags: 'window alert confirm prompt timer storage navigator location history requestAnimationFrame', rows: [
    ['alert / confirm / prompt', 'dialog ข้อความ / ยืนยัน / กรอกค่า เป็น API แบบบล็อกที่ควรใช้เท่าที่จำเป็น'],
    ['setTimeout / clearTimeout / setInterval / clearInterval', 'นัดครั้งเดียว / ยกเลิก / นัดซ้ำ / ยกเลิกซ้ำ ใช้หน่วย ms'],
    ['requestAnimationFrame / cancelAnimationFrame', 'นัดอัปเดตภาพก่อน repaint / ยกเลิก'],
    ['innerWidth / innerHeight / scrollX / scrollY', 'ขนาด viewport และตำแหน่ง scroll หน่วย CSS pixels'],
    ['location / history / navigator', 'URL ปัจจุบัน / ประวัติ navigation / ข้อมูล browser และ capabilities'],
    ['localStorage / sessionStorage', 'เก็บ string ใน origin ข้าม session / ใน page session ของแท็บ'],
    ['open / close / moveTo / resizeTo / print / scrollTo', 'ขึ้นกับสิทธิ์และข้อจำกัด browser; popup อาจถูกบล็อก'],
    ['atob / btoa', 'Base64 บน binary string ไม่ใช่ Unicode encoder โดยตรง'],
    ['getComputedStyle(element)', 'อ่านค่ารูปแบบที่คำนวณแล้ว'],
    ['document / frames / parent / top / self / screen', 'อ้าง document, frame hierarchy และข้อมูลหน้าจอ; ข้าม origin มีข้อจำกัด']
  ], example: 'console.log("เวลาไม่หยุดรอ");\nsetTimeout(() => console.log("ทำภายหลัง"), 50);\nconsole.log("ทำต่อได้");' },
  { title: 'Input, mouse และ event families', pages: '61–81', tags: 'events input change submit focus key mouse pointer touch drag media animation storage', rows: [
    ['input / change / submit / reset', 'แก้ค่า / ยืนยันการเปลี่ยน / ส่งฟอร์ม / รีเซ็ตฟอร์ม'],
    ['focus / blur / focusin / focusout', 'เข้า/ออก focus; focusin/out bubble'],
    ['keydown / keyup', 'กด / ปล่อย; เลี่ยง keypress ในโค้ดใหม่'],
    ['click / dblclick / contextmenu', 'คลิก / ดับเบิลคลิก / เมนูบริบท'],
    ['mousedown / mouseup / mousemove', 'กด / ปล่อย / เคลื่อนเมาส์; พิจารณา pointer events สำหรับหลายอุปกรณ์'],
    ['mouseenter/leave / mouseover/out', 'เข้าออกขอบ element / เข้าออกที่อาจเกิดจากการขยับระหว่างลูก'],
    ['dragstart / dragover / drop / touchstart / touchmove', 'ลากวางและสัมผัส; default action กับ passive listener มีผล'],
    ['load / error / online / offline / storage / hashchange', 'โหลด resource / ผิดพลาด / สถานะเครือข่าย / storage เปลี่ยน / hash เปลี่ยน'],
    ['play / pause / ended / timeupdate / loadedmetadata', 'เหตุการณ์ media ที่พบบ่อย'],
    ['animationstart/end / transitionend / scroll / wheel', 'animation, transition และการเลื่อน; อย่าทำ handler หนัก']
  ], example: '// ตัวอย่าง DOM ลองในบท Events\n// form.addEventListener("submit", event => {\n//   event.preventDefault();\n// });\nconsole.log("ชื่อ event ไม่มี prefix on เมื่อใช้ addEventListener");' },
  { title: 'Event object และการควบคุมเหตุการณ์', pages: '82–98', tags: 'target currentTarget preventDefault stopPropagation event key coordinates timestamp', rows: [
    ['target / currentTarget / type', 'จุดกำเนิด / element ของ listener ปัจจุบัน / ชื่อ event'],
    ['preventDefault / defaultPrevented / cancelable', 'ยกเลิก default / ถูกยกเลิกแล้วหรือไม่ / ยกเลิกได้หรือไม่'],
    ['stopPropagation / stopImmediatePropagation', 'หยุดการส่งต่อ / หยุด listener ที่เหลือในจุดเดียวกันด้วย'],
    ['key / code / altKey / ctrlKey / shiftKey / metaKey', 'คีย์ตามความหมาย / ตำแหน่งกายภาพ / modifier flags'],
    ['getModifierState("CapsLock")', 'คืน boolean ว่า modifier active หรือไม่ ไม่ใช่ array ตามคำอธิบายที่ผิดใน PDF'],
    ['clientX/Y / pageX/Y / screenX/Y / offsetX/Y', 'พิกัดเทียบ viewport / document / screen / ขอบ target'],
    ['bubbles / composed / eventPhase / isTrusted', 'การ bubble / ข้าม shadow boundary / phase / สร้างจาก user agent หรือ script'],
    ['timeStamp / detail / data / inputType', 'เวลาอ้างอิง time origin โดยทั่วไป / รายละเอียด / ข้อมูล input / ชนิดการแก้ไข'],
    ['dataTransfer / clipboardData / touches / deltaY', 'ข้อมูล drag / clipboard / touch points / การเลื่อน wheel'],
    ['keyCode / charCode / which', 'API เก่าที่ควรหลีกเลี่ยง เลือก key และ code ตามเจตนา']
  ], example: 'console.log("target: จุดกำเนิด");\nconsole.log("currentTarget: จุดที่ฟัง");\nconsole.log("preventDefault ไม่ได้หยุด propagation");' }
];
