/* Multiple-choice replacements for the original JavaScript written questions. */
(() => {
  const overrides = {
    'runtime:2': {
      prompt: 'Restart แล้วหน้าจอว่างแต่คลิกต่อไม่ได้ ควรรีเซ็ตและตรวจอย่างไร?',
      options: ['ล้างข้อความในช่องแล้วถือว่าเสร็จ', 'รีเซ็ต board, ผู้เล่น, active และสถานะ แล้วลองเล่นช่องเดิม', 'ตั้ง currentPlayer เป็น X โดยเก็บ board เดิม', 'สร้าง listener เพิ่มทุกครั้งที่ Restart'],
      answer: 'รีเซ็ต board, ผู้เล่น, active และสถานะ แล้วลองเล่นช่องเดิม',
      explanation: 'ต้องรีเซ็ต state ภายในและแสดงผลใหม่ การลองเล่นต่อช่วยตรวจว่าเกมกลับมาพร้อมจริง'
    },
    'runtime:5': {
      prompt: 'canPlay ต้องไม่แก้ board และรับเฉพาะ index จำนวนเต็มในช่วง ลำดับใดถูก?',
      options: ['ล้าง board[index] แล้วตรวจ active', 'ตรวจเพียง board[index] ไม่ใช่ undefined', 'ตรวจ active → integer → ช่วง index → ช่องว่าง', 'ตรวจช่องว่างแล้วแปลง index ทุกชนิดเป็นเลข'],
      answer: 'ตรวจ active → integer → ช่วง index → ช่องว่าง',
      explanation: 'ตรวจ active, Number.isInteger และ 0 ≤ index < board.length ก่อนอ่านช่อง แล้วคืนว่าช่องเป็น "" หรือไม่'
    },
    'runtime:8': {
      prompt: 'ลำดับใดป้องกันการคลิกช่องเดิมซ้ำแล้วสลับผู้เล่นสองครั้ง?',
      options: ['สลับผู้เล่น → ตรวจช่อง → เขียน state', 'render → สลับผู้เล่น → ตรวจ active', 'เขียนเครื่องหมายทุกคลิก → ตรวจชนะ', 'ปฏิเสธ move ที่ใช้ไม่ได้ → เขียน state → ตรวจผล → สลับถ้ายังไม่จบ → render'],
      answer: 'ปฏิเสธ move ที่ใช้ไม่ได้ → เขียน state → ตรวจผล → สลับถ้ายังไม่จบ → render',
      explanation: 'คลิกที่ใช้ไม่ได้ต้อง return ก่อนแก้ board หรือผู้เล่น ส่วน move ที่ถูกต้องต้องบันทึกก่อนตรวจผล'
    },
    'variables:2': {
      prompt: 'รหัสนักศึกษา "00123" ไม่ใช้คำนวณ ควรเก็บแบบใด?',
      options: ['String เพื่อรักษาศูนย์นำหน้าและหลักของรหัส', 'Number เพราะเป็นตัวเลขทุกตัว', 'Boolean เพราะแค่ตรวจว่ามีรหัส', 'Number แล้วเติมศูนย์หนึ่งตัวเสมอ'],
      answer: 'String เพื่อรักษาศูนย์นำหน้าและหลักของรหัส',
      explanation: 'รหัสเป็นตัวระบุ Number("00123") เหลือ 123 และรหัสยาวมากอาจเกินความแม่นยำของ Number'
    },
    'variables:5': {
      prompt: 'ต้องการ attempts นอก block เป็น 8 ใน block เป็น 3 โดยใช้ชื่อเดิม ควรทำอย่างไร?',
      options: ['ใช้ var ประกาศทั้งสองตำแหน่ง', 'ใช้ let ประกาศทั้งสองตำแหน่งให้เกิด binding คนละ scope', 'ประกาศ let ด้านนอกแล้วเขียน attempts = 3 ด้านใน', 'ใช้ const ด้านนอกแล้วกำหนด attempts = 3 ด้านใน'],
      answer: 'ใช้ let ประกาศทั้งสองตำแหน่งให้เกิด binding คนละ scope',
      explanation: 'let ที่ประกาศใน block สร้าง binding ใหม่บังชื่อด้านนอก จึงไม่เปลี่ยนค่า 8 ของด้านนอก'
    },
    'variables:8': {
      prompt: 'จะแยกคะแนนที่ยังไม่กรอก, ยกเว้น และคะแนน 0 อย่างชัดเจนได้อย่างไร?',
      options: ['ใช้ 0 แทนทั้งสามกรณี', 'ใช้ if (score) แยกทุกกรณี', 'ใช้ undefined, null และ 0 แล้วตรวจด้วย ===', 'แปลงทุกค่าเป็น Boolean ก่อนบันทึก'],
      answer: 'ใช้ undefined, null และ 0 แล้วตรวจด้วย ===',
      explanation: 'กำหนด undefined = ยังไม่กรอก, null = ยกเว้น และ 0 = คะแนนจริง ทั้งสามเป็น falsy จึงใช้ if(score) แยกไม่ได้'
    },
    'operators:2': {
      prompt: 'รับจำนวนตั๋วเป็น string ให้ได้จำนวนเต็ม 1–6 และห้ามว่าง ควรตรวจอย่างไร?',
      options: ['ใช้ parseInt แล้วรับทุกค่าที่ไม่ใช่ NaN', 'ใช้ raw.length > 0 อย่างเดียว', 'แปลง Number แล้วตรวจ n <= 6 อย่างเดียว', 'ตรวจ trim ไม่ว่าง → Number → integer และช่วง 1–6'],
      answer: 'ตรวจ trim ไม่ว่าง → Number → integer และช่วง 1–6',
      explanation: 'ตรวจว่างก่อนแปลง แล้วใช้ Number.isInteger(n) && n >= 1 && n <= 6 เพื่อกันทศนิยมและค่านอกช่วง'
    },
    'operators:5': {
      prompt: 'ทำไม 0 < score < 100 จึงยอมให้ score = 200 ผ่าน และควรแก้อย่างไร?',
      options: ['0 < 200 ได้ true แล้ว 1 < 100; ใช้ score > 0 && score < 100', 'JavaScript สลับ 200 เป็น 20; ใช้ == แทน <', '100 ถูกแปลงเป็น string; ใช้ || แทน <', 'เงื่อนไขถูกแล้ว ควรเปลี่ยนข้อมูลทดสอบเป็น 50'],
      answer: '0 < 200 ได้ true แล้ว 1 < 100; ใช้ score > 0 && score < 100',
      explanation: 'การเทียบต่อกันนำ boolean มาเทียบเป็นตัวเลข ต้องเชื่อมสองเงื่อนไขด้วย && และทดสอบขอบ 0, 100 ด้วย'
    },
    'operators:8': {
      prompt: 'ต้องแทนชื่อด้วย "guest" เฉพาะ null/undefined แต่คง "" ไว้ ใช้ข้อใด?',
      options: ['rawName || "guest"', 'rawName ?? "guest"', 'rawName && "guest"', 'Boolean(rawName) ? rawName : "guest"'],
      answer: 'rawName ?? "guest"',
      explanation: '?? ใช้ fallback เฉพาะ null/undefined ส่วน || และการตรวจ truthy จะเปลี่ยนชื่อว่างด้วย'
    },
    'control:2': {
      prompt: 'พบคู่ที่บวกได้ 10 ในลูปซ้อนแล้วต้องหยุดทั้งสองชั้น วิธีใดถูก?',
      options: ['ใช้ continue ในลูปชั้นใน', 'ใช้ break ปกติในลูปชั้นใน', 'ใช้ break outer เมื่อ outer เป็น label ของลูปนอก', 'ตั้ง result แล้วให้ทั้งสองลูปวนต่อ'],
      answer: 'ใช้ break outer เมื่อ outer เป็น label ของลูปนอก',
      explanation: 'break ปกติออกเพียงลูปใน แต่ break ที่ระบุ label ของลูปนอกหยุดได้ทั้งสองชั้น หรือ return จากฟังก์ชันที่ครอบลูป'
    },
    'control:5': {
      prompt: 'คะแนน ≥80 ได้ A, ≥50 ได้ D นอกนั้น F ควรเรียงเงื่อนไขและทดสอบอย่างไร?',
      options: ['ตรวจ ≥50 ก่อน ≥80; ทดสอบ 60, 70', 'ตรวจ ≥80 ก่อน ≥50; ทดสอบเฉพาะ 90', 'ตรวจ ≥50 ก่อน ≥80; ทดสอบ 49, 50, 79, 80', 'ตรวจ ≥80 ก่อน ≥50; ทดสอบ 49, 50, 79, 80'],
      answer: 'ตรวจ ≥80 ก่อน ≥50; ทดสอบ 49, 50, 79, 80',
      explanation: 'else if เลือกสาขาแรกที่จริง จึงต้องตรวจช่วงสูงก่อน และทดสอบสองข้างของแต่ละจุดตัด'
    },
    'control:8': {
      prompt: 'รวมค่าก่อน sentinel -1 โดยบาง array ไม่มี -1 ลูปใดจบได้อย่างปลอดภัย?',
      options: ['for...of แล้ว break เมื่อพบ -1 ก่อนบวกรวม', 'while (items[i] !== -1) โดยไม่ตรวจขอบเขต', 'บวกทุกค่าก่อนตรวจว่าเป็น -1', 'อ่านสมาชิกแรกเสมอแม้ array ว่าง'],
      answer: 'for...of แล้ว break เมื่อพบ -1 ก่อนบวกรวม',
      explanation: 'for...of จบเมื่อข้อมูลหมดและไม่อ่านรายการว่าง ทดสอบ [], [-1], [3,4] และ [3,-1,99]'
    },
    'collections:2': {
      prompt: 'เรียง students จากคะแนนมากไปน้อยโดยคงลำดับเดิม ข้อใดอธิบายถูก?',
      options: ['students.sort(...) ไม่เปลี่ยน students', '[...students].sort((a,b)=>b.score-a.score) แยก array แต่ยังแชร์ object', '[...students].sort() เรียงคะแนนเป็นตัวเลขให้อัตโนมัติ', '[...students] คัดลอก object ซ้อนทั้งหมดแล้ว'],
      answer: '[...students].sort((a,b)=>b.score-a.score) แยก array แต่ยังแชร์ object',
      explanation: 'spread คัดลอกชั้น array เท่านั้น การแก้ชื่อใน object ยังกระทบต้นฉบับ หากต้องแยกให้คัดลอกสมาชิกด้วย'
    },
    'collections:5': {
      prompt: 'แปลง [" JS ","dom","JS"] เป็น ["js","dom"] ควรเรียงขั้นตอนอย่างไร?',
      options: ['Set → trim → toLowerCase', 'sort → Set โดยไม่แก้ข้อความ', 'trim และ toLowerCase ทุกค่า → Set → array', 'filter ค่าว่าง → reverse → array'],
      answer: 'trim และ toLowerCase ทุกค่า → Set → array',
      explanation: 'ต้อง normalize ก่อนตัดซ้ำ มิฉะนั้นค่าที่เขียนต่างกันจะกลายเป็นค่าซ้ำหลังแปลง Set รักษาลำดับที่พบครั้งแรก'
    },
    'collections:8': {
      prompt: 'ทุกคนต้องได้คะแนน ≥50 และรายการว่างต้องไม่ผ่าน ใช้ข้อใด?',
      options: ['students.every(s => s.score >= 50)', 'students.some(s => s.score >= 50)', 'students.length > 0 || students.every(s => s.score >= 50)', 'students.length > 0 && students.every(s => s.score >= 50)'],
      answer: 'students.length > 0 && students.every(s => s.score >= 50)',
      explanation: 'every บน array ว่างเป็น true จึงต้องตรวจว่ามีสมาชิกด้วย หากใครคะแนนต่ำกว่า 50 every จะเป็น false'
    },
    'builtins:2': {
      prompt: 'Math.floor(Math.random()*6)+1 ให้หน้าลูกเต๋าครบ 1–6 เพราะอะไร?',
      options: ['random อยู่ใน [0,1); floor หลังคูณ 6 ได้ 0–5 แล้วบวก 1', 'random อาจได้ 1 พอดี จึงคูณ 6 ได้ครบ', 'floor ปัดขึ้นเมื่อคูณแล้วเกิน 5', 'คูณ 5 ก็ให้ช่วง 1–6 เหมือนกัน'],
      answer: 'random อยู่ใน [0,1); floor หลังคูณ 6 ได้ 0–5 แล้วบวก 1',
      explanation: 'คูณ 6 แล้วได้ [0,6) จึง floor เป็น 0–5 ถ้าคูณ 5 จะได้เพียง 1–5 หลังบวก 1'
    },
    'builtins:5': {
      prompt: 'Number.isNaN("oops") เป็น false จะตรวจ input ตัวเลขอย่างไรให้ถูก?',
      options: ['สรุปว่า "oops" เป็นเลขที่ใช้ได้', 'ตรวจว่าง → Number(raw) → Number.isFinite(n)', 'ใช้ typeof raw === "string" เป็นเกณฑ์ผ่าน', 'รับทุกค่าที่ Number.isNaN(raw) เป็น false'],
      answer: 'ตรวจว่าง → Number(raw) → Number.isFinite(n)',
      explanation: 'Number.isNaN ไม่แปลง string จึงยังไม่บอกว่าเป็นตัวเลข ต้องแปลงก่อนและใช้ isFinite กัน NaN รวมถึง Infinity'
    },
    'builtins:8': {
      prompt: 'วันสอบ "2026-10-18" เป็นวันปฏิทิน ควรเก็บอย่างไรเพื่อไม่เลื่อนวันตาม timezone?',
      options: ['แปลงเป็น instant แล้วแสดง local time ทุกประเทศเสมอ', 'เก็บ timestamp แล้วลบหนึ่งวันทุกครั้ง', 'เก็บ date-only string และแยกจาก timestamp ของเหตุการณ์', 'เก็บเฉพาะเลข 18 โดยตัดเดือนและปี'],
      answer: 'เก็บ date-only string และแยกจาก timestamp ของเหตุการณ์',
      explanation: 'วันปฏิทินไม่ใช่จุดเวลา การ parse เป็น instant แล้วแสดง local time อาจทำให้วันที่เปลี่ยนในบางเขตเวลา'
    },
    'functions:2': {
      prompt: 'makeBudget(limit) ควรให้ spend จำยอดและไม่แก้ยอดเมื่อใช้เกินอย่างไร?',
      options: ['ตั้ง used = 0 ใน spend ทุกครั้ง', 'เก็บ used ใน global ร่วมกันทุก budget', 'เพิ่ม used ก่อนแล้วคืน false เมื่อเกิน', 'เก็บ used ใน closure ตรวจ amount และยอดใหม่ก่อนเพิ่ม'],
      answer: 'เก็บ used ใน closure ตรวจ amount และยอดใหม่ก่อนเพิ่ม',
      explanation: 'closure ของแต่ละ makeBudget เก็บยอดแยกกัน ตรวจจำนวนและ limit ก่อน mutation ทำให้รายการที่ถูกปฏิเสธไม่เปลี่ยนยอด'
    },
    'functions:5': {
      prompt: 'ทำไม () => { done: true } ไม่คืน object และแก้อย่างไร?',
      options: ['braces เป็น function body; ใช้ () => ({done:true}) หรือ return object', 'object ใช้กับ arrow ไม่ได้; เปลี่ยนเป็น array เท่านั้น', 'done ต้องเป็น string; เปลี่ยนเป็น {"done":true} ก็พอ', 'ต้องเติม async แล้วจะคืน object อัตโนมัติ'],
      answer: 'braces เป็น function body; ใช้ () => ({done:true}) หรือ return object',
      explanation: 'รูปเดิมอ่าน done: เป็น label ใน block และไม่มี return ใช้วงเล็บครอบ object หรือ return {done:true} ใน body'
    },
    'functions:8': {
      prompt: 'callback จาก for(var i=0;i<3;i++) อ่าน i สุดท้ายเหมือนกัน จะแยกให้คืน 0,1,2 อย่างไร?',
      options: ['เพิ่ม global i อีกตัวให้ทุก callback ใช้', 'ใช้ for(let i=0;i<3;i++) เพื่อมี binding แยกต่อรอบ', 'ใช้ const แทน var ในรูป for เดิมทั้งชุด', 'เรียก callback หลังจบลูปนานขึ้น'],
      answer: 'ใช้ for(let i=0;i<3;i++) เพื่อมี binding แยกต่อรอบ',
      explanation: 'var แชร์ binding เดียวกัน แต่ let ใน for แบบนี้สร้าง binding ต่อรอบ จึงจำ 0,1,2 ได้เมื่อเรียกภายหลัง'
    },
    'oop:2': {
      prompt: 'Playlist เก็บ this.songs = songs แล้วเปลี่ยนตาม array เดิม จะแยกลำดับสมาชิกอย่างไร?',
      options: ['ใช้ this.songs = songs เหมือนเดิมแต่เปลี่ยนชื่อ parameter', 'ใช้ Object.freeze(this) เพื่อคัดลอกเพลง', 'ใช้ this.songs = [...songs] โดยรู้ว่า object เพลงยังแชร์ได้', 'ใช้ new Playlist(songs) แล้ว array จะถูก clone เอง'],
      answer: 'ใช้ this.songs = [...songs] โดยรู้ว่า object เพลงยังแชร์ได้',
      explanation: 'การกำหนดเดิมอ้าง array เดียวกัน spread สร้าง container ใหม่ แต่หากจะแก้ object เพลงต้องคัดลอกเพิ่มตามระดับ'
    },
    'oop:5': {
      prompt: 'ส่ง user.sayHello เป็น listener แล้ว this ไม่ใช่ user วิธีใดแก้ได้ทั้งคู่?',
      options: ['user.sayHello() และ user.sayHello', '() => user.sayHello และ user.sayHello()', 'user.sayHello.bind(null) และ user.sayHello', '() => user.sayHello() และ user.sayHello.bind(user)'],
      answer: '() => user.sayHello() และ user.sayHello.bind(user)',
      explanation: 'wrapper เรียกผ่าน user ส่วน bind กำหนด this ไว้ หากต้องถอด listener ให้เก็บ function reference เดิมไว้ใช้'
    },
    'oop:8': {
      prompt: 'TimedTask extends Task เพิ่ม minutes และให้ render เรียก describe() เหมือนกัน ควรทำอย่างไร?',
      options: ['constructor เรียก super(title) ก่อน this.minutes และ override describe()', 'ตั้ง this.minutes ก่อน super(title) แล้วไม่ต้องมี describe()', 'สร้าง method ชื่อ describeTimed() อย่างเดียวแทน describe()', 'เรียก Task(title) แทน super(title) ในคลาสลูก'],
      answer: 'constructor เรียก super(title) ก่อน this.minutes และ override describe()',
      explanation: 'constructor ลูกต้องเรียก super ก่อนใช้ this และ method ชื่อเดิมทำให้ render เรียกได้เหมือนกัน โดยลูกใช้ super.describe() ต่อได้'
    },
    'dom:2': {
      prompt: 'ต้องแสดงข้อความผู้ใช้ <b>สอบ</b> ทุกตัวอักษรโดยไม่ตีความ HTML ควรใช้ข้อใด?',
      options: ['element.innerHTML = raw เพราะจะแสดงแท็กเป็นข้อความ', 'element.textContent = raw เพื่อแสดงข้อความตามตัวอักษร', 'element.outerHTML = raw เพื่อเก็บ node เดิม', 'document.write(raw) เพื่อไม่ให้ parse HTML'],
      answer: 'element.textContent = raw เพื่อแสดงข้อความตามตัวอักษร',
      explanation: 'textContent แสดงข้อความ literal ส่วน innerHTML parse เป็น markup ทำให้เกิด element b และไม่เหมาะกับข้อความที่ไม่เชื่อถือ'
    },
    'dom:5': {
      prompt: 'ลบสมาชิกจาก live HTMLCollection ด้วย i++ แล้วบางตัวรอด ควรแก้อย่างไร?',
      options: ['เพิ่ม i ทีละ 2 เพื่อข้ามสมาชิกที่เลื่อน', 'ใช้ลูปเดิมแต่บันทึก length เดิมไว้', 'สร้าง snapshot ด้วย [...items] แล้วลบแต่ละ node', 'รอให้ collection หยุดอัปเดตก่อน i++'],
      answer: 'สร้าง snapshot ด้วย [...items] แล้วลบแต่ละ node',
      explanation: 'live collection หดและเลื่อน index ทันทีเมื่อ node ถูกลบ snapshot จึงช่วยให้วนลบครบ หรือใช้ while(items.length) ลบตัวแรก'
    },
    'dom:8': {
      prompt: 'renderNotes เรียกซ้ำต้องไม่ซ้ำรายการ และ title เป็นข้อความผู้ใช้ วิธีใดเหมาะ?',
      options: ['append node เพิ่มทุกครั้งโดยไม่ล้าง', 'ต่อ title ลง innerHTML ทุกครั้ง', 'ล้างเฉพาะเมื่อ notes มีมากกว่าหนึ่งรายการ', 'replaceChildren แล้วสร้าง li ตั้ง textContent และ append'],
      answer: 'replaceChildren แล้วสร้าง li ตั้ง textContent และ append',
      explanation: 'ล้างผลเก่าก่อนวาด state ปัจจุบันและใช้ textContent กับ title จึงไม่สะสมรายการหรือ parse ข้อความเป็น HTML'
    },
    'events:2': {
      prompt: 'ปุ่มลบถูกเพิ่มภายหลังและมี icon ข้างใน จะผูก listener ครั้งเดียวอย่างไร?',
      options: ['ฟังที่ container หา closest ปุ่มลบ ตรวจขอบเขต แล้วลบ item ของปุ่ม', 'ผูก listener ให้เฉพาะปุ่มที่มีตอนโหลดหน้า', 'คลิกที่ใดใน container ก็ลบ container', 'ตรวจ event.target เป็น button เท่านั้นโดยไม่ดู ancestor'],
      answer: 'ฟังที่ container หา closest ปุ่มลบ ตรวจขอบเขต แล้วลบ item ของปุ่ม',
      explanation: 'event delegation รับคลิกของลูกที่เพิ่มใหม่ได้ closest ช่วยเมื่อกด icon และต้องตรวจว่าเป้าหมายอยู่ใน container ก่อนลบ item'
    },
    'events:5': {
      prompt: 'ส่งฟอร์มได้ทั้งคลิกและ Enter พร้อมตรวจจำนวนก่อนคำนวณ ควรฟัง event ใด?',
      options: ['click ที่ปุ่มเท่านั้น แล้วคำนวณทันที', 'submit ที่ form แล้ว preventDefault ตรวจว่างและเลข finite', 'keydown ทุกปุ่มแล้วคำนวณทุกครั้ง', 'change ที่ input แล้วส่งฟอร์มโดยไม่ตรวจค่า'],
      answer: 'submit ที่ form แล้ว preventDefault ตรวจว่างและเลข finite',
      explanation: 'submit รับการส่งจากทั้งเมาส์และคีย์บอร์ด preventDefault กันพฤติกรรมส่งปกติ แล้วตรวจค่าก่อนแสดงผลหรือ error'
    },
    'events:8': {
      prompt: 'เข้าออกบทหลายครั้งแล้วตัวนับเร็วขึ้น ควรจัดการ interval อย่างไร?',
      options: ['สร้าง interval ใหม่ทุก render เพื่อให้ตรงหน้า', 'ลด delay ลงทุกครั้งที่เข้าใหม่', 'เก็บ id ล้างตัวเก่าก่อนเริ่มและตอนออก ใช้ timestamp เมื่อต้องการเวลาจริง', 'ตั้ง id เป็น null อย่างเดียวโดยไม่ clearInterval'],
      answer: 'เก็บ id ล้างตัวเก่าก่อนเริ่มและตอนออก ใช้ timestamp เมื่อต้องการเวลาจริง',
      explanation: 'interval ที่ไม่ล้างจะสะสมหลายตัว ต้อง clearInterval ด้วย id เดิม และ interval อาจถูกหน่วงจึงไม่รับประกันเวลาตรง'
    },
    'es6:2': {
      prompt: 'เก็บ metadata ของ DOM node ที่อาจถูกนำออก โดยไม่ต้องวน key ควรเลือกอะไร?',
      options: ['Map เพราะไม่เก็บ reference ของ key', 'WeakMap เพราะอ่าน size และวน key ได้', 'Set เพราะเก็บ key-value ของแต่ละ node ได้', 'WeakMap เพราะไม่ยึด node ด้วย key แต่ไม่มี size หรือการวน key'],
      answer: 'WeakMap เพราะไม่ยึด node ด้วย key แต่ไม่มี size หรือการวน key',
      explanation: 'WeakMap เหมาะเมื่อไม่ต้อง enumerate และไม่ต้องการให้ metadata ยึด node ไว้ หากต้องแสดงทุกรายการใช้ Map และจัดการลบเอง'
    },
    'es6:5': {
      prompt: 'หา max ของ [-8,-3] แต่เริ่ม max=0 แล้วผิด ควรแก้อย่างไรและจัดการ array ว่าง?',
      options: ['กำหนดกรณีว่างก่อน แล้วเริ่ม max จากสมาชิกแรกหรือ -Infinity', 'เริ่ม max=0 เหมือนเดิมแล้วใช้ Math.abs ทุกค่า', 'เริ่ม max=Infinity แล้วตรวจค่าที่มากกว่า', 'ใช้สมาชิกแรกเสมอโดยไม่ตรวจรายการว่าง'],
      answer: 'กำหนดกรณีว่างก่อน แล้วเริ่ม max จากสมาชิกแรกหรือ -Infinity',
      explanation: '0 ไม่ใช่ขอบล่างของค่าติดลบทั้งหมด ต้องได้ -3 และระบุสัญญารายการว่าง เช่น คืน null หรือ throw'
    },
    'es6:8': {
      prompt: 'วน Map.set(item.id,item) เพื่อตัด id ซ้ำแล้วอ่าน values ผลเป็นอย่างไร?',
      options: ['เก็บค่าตัวแรกและย้าย key ทุกครั้งที่ซ้ำ', 'เก็บค่าตัวสุดท้าย แต่ key ยังเรียงตามครั้งแรกที่พบ', 'เก็บค่าทุกตัวที่มี id เดียวกันใน array อัตโนมัติ', 'เก็บค่าตัวสุดท้ายและเรียงตามครั้งสุดท้ายเสมอ'],
      answer: 'เก็บค่าตัวสุดท้าย แต่ key ยังเรียงตามครั้งแรกที่พบ',
      explanation: 'set ทับ value ของ key เดิมโดยไม่ย้ายลำดับ หากต้องเรียงตามครั้งสุดท้ายให้ delete ก่อน set หรือจัดลำดับเพิ่ม'
    },
    'async:2': {
      prompt: 'ต้องอัปโหลดไฟล์ตามลำดับและแสดง done หลังครบ ใช้วิธีใด?',
      options: ['await files.forEach(async file => upload(file))', 'files.map(upload); แสดง done ทันที', 'for (const file of files) { await upload(file); } แล้วแสดง done', 'await Promise.all(files.map(upload)) เพื่อบังคับให้เริ่มทีละไฟล์'],
      answer: 'for (const file of files) { await upload(file); } แล้วแสดง done',
      explanation: 'for...of รอแต่ละงานก่อนเริ่มถัดไป forEach ไม่รอ Promise ของ callback ส่วน Promise.all เริ่มงานพร้อมกันได้'
    },
    'async:5': {
      prompt: 'A และ B ทำพร้อมกันผ่าน Promise.all ถ้า B reject ควรเข้าใจและปิด spinner อย่างไร?',
      options: ['A ถูกยกเลิกเสมอ ปิด spinner เฉพาะ then', 'all รอให้ทุกงานสำเร็จจึงแจ้ง error', 'A เริ่มใหม่อัตโนมัติ ปิด spinner ใน catch เท่านั้น', 'all reject แต่ไม่ cancel A; catch error และปิด spinner ใน finally'],
      answer: 'all reject แต่ไม่ cancel A; catch error และปิด spinner ใน finally',
      explanation: 'rejection ของตัวรวมไม่ยกเลิกงานต้นทาง finally ทำ cleanup ได้ทั้งสำเร็จและล้มเหลว หากต้องดูผลทุกงานใช้ allSettled'
    },
    'async:8': {
      prompt: 'ต้อง log start → 7 → done โดย 7 มาจาก Promise ข้อใดรับประกันลำดับ?',
      options: ['ใน async function: log start → await Promise.resolve(7) → log ค่า → log done', 'เรียก async function แล้ว log done ข้างนอกทันที', 'log start → log Promise.resolve(7) → log done', 'ตั้ง timeout ให้ done เป็น 0 แล้ว log Promise โดยไม่ await'],
      answer: 'ใน async function: log start → await Promise.resolve(7) → log ค่า → log done',
      explanation: 'งานหลัง await ในฟังก์ชันเดียวกันรอค่าก่อน จึงเรียงได้ตามต้องการ หาก log done ที่ caller ต้อง await การเรียกด้วย'
    },
    'es2016:2': {
      prompt: 'แปลง {A:0,B:20,C:5} เป็น {B:40,C:10} โดยไม่แก้ input ควรทำอย่างไร?',
      options: ['Object.values → map คูณสอง แล้วได้ object พร้อม key เดิม', 'Object.entries → filter ยอด >0 → map คู่ [key,ยอด*2] → Object.fromEntries', 'Object.keys → filter key >0 → Object.fromEntries', 'Object.entries → map คูณ key สองเท่า → Object.fromEntries'],
      answer: 'Object.entries → filter ยอด >0 → map คู่ [key,ยอด*2] → Object.fromEntries',
      explanation: 'คงรูปคู่ key-value ระหว่างกรองและแปลง แล้ว fromEntries สร้าง object ใหม่โดยตัดยอด 0 และคูณเฉพาะ value'
    },
    'es2016:5': {
      prompt: 'ต้องคัด own property พร้อม getter และ writable flag วิธีใดเหมาะกว่าการ spread?',
      options: ['Object.assign({}, obj) เพราะคัด descriptors ทั้งหมด', 'JSON.parse(JSON.stringify(obj)) เพราะเก็บ getter ได้', 'Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))', '{...obj} เพราะคัด prototype และ flags ทุกตัว'],
      answer: 'Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))',
      explanation: 'descriptors เก็บ accessor และ flags ส่วน spread อ่านค่าเป็น data property ใหม่ วิธีนี้ยังเป็น shallow และไม่คัด prototype อัตโนมัติ'
    },
    'es2016:8': {
      prompt: 'fromEntries([["x",1],["x",2]]) ได้อะไร และจะเก็บทั้งสองค่าอย่างไร?',
      options: ['ได้ {x:1}; ใช้ key ซ้ำต่อไปเพื่อเก็บทั้งคู่', 'ได้ {x:[1,2]} โดยไม่ต้องเปลี่ยนอะไร', 'เกิด SyntaxError; ต้องเปลี่ยน key เป็นตัวเลข', 'ได้ {x:2}; หากต้องเก็บทุกค่าให้สะสมเป็น {x:[1,2]}'],
      answer: 'ได้ {x:2}; หากต้องเก็บทุกค่าให้สะสมเป็น {x:[1,2]}',
      explanation: 'key เดียวมี value เดียว คู่หลังจึงทับคู่ก่อน หากต้องรักษาหลายค่าต่อ key ต้องออกแบบ value เป็น array เอง'
    },
    'es2020:2': {
      prompt: 'settings มีอยู่แล้ว ต้องใช้ค่า quota=0 ได้และ default 100 เมื่อขาด account/quota ใช้ข้อใด?',
      options: ['settings.account?.quota ?? 100', 'settings.account?.quota || 100', 'settings.account.quota ?? 100', 'settings.account && settings.account.quota || 100'],
      answer: 'settings.account?.quota ?? 100',
      explanation: 'account เป็น null หรือ quota เป็น undefined จะได้ 100 แต่ quota=0 ยังได้ 0 โดย settings ต้องประกาศอยู่แล้ว'
    },
    'es2020:5': {
      prompt: 'toSorted สร้าง array ใหม่ แต่แก้ชื่อสมาชิกแล้วต้นฉบับเปลี่ยนด้วย เพราะอะไร?',
      options: ['toSorted แก้ลำดับ array เดิมเสมอ', 'array ใหม่ยังแชร์ object; ต้องคัดลอกสมาชิกตามระดับที่จะแก้', 'toSorted เปลี่ยน object ทุกตัวเป็น global', 'const ของต้นฉบับใช้ไม่ได้กับ array ที่เรียงแล้ว'],
      answer: 'array ใหม่ยังแชร์ object; ต้องคัดลอกสมาชิกตามระดับที่จะแก้',
      explanation: 'toSorted เป็น shallow copy จึงแยก container แต่ไม่แยก object ใช้ map(item=>({...item})) และคัดข้อมูลซ้อนเพิ่มเมื่อจำเป็น'
    },
    'es2020:8': {
      prompt: 'ID 9007199254740993 ต้องส่งผ่าน JSON โดยรักษาหลัก ควรเลือกแบบใด?',
      options: ['เก็บเป็น Number แล้ว stringify จะคืนหลักเดิม', 'เก็บ BigInt แล้ว stringify ได้ตามปกติโดยไม่แปลง', 'เก็บ string; ถ้าต้องคำนวณใช้ BigInt ภายในแล้วแปลงกลับตาม schema', 'เก็บ Number แล้วเติม .0 เพื่อเพิ่มความแม่นยำ'],
      answer: 'เก็บ string; ถ้าต้องคำนวณใช้ BigInt ภายในแล้วแปลงกลับตาม schema',
      explanation: 'ID ไม่จำเป็นต้องคำนวณ string รักษาหลักได้ ส่วน Number อาจปัด และ JSON.stringify ปกติไม่รองรับ BigInt โดยตรง'
    },
    'es2024:2': {
      prompt: 'หัวข้อใต้สไลด์ ES2024 จะรันได้ทั้งหมดหรือไม่ ควรตรวจจากหลักฐานใด?',
      options: ['ชื่อหน้าสไลด์เพียงอย่างเดียว', 'จำนวนตัวอย่างในสไลด์เพียงอย่างเดียว', 'คำว่า modern โดยไม่ทดสอบ runtime', 'สิ่งที่สไลด์ระบุ / สถานะมาตรฐานพร้อมแหล่ง / runtime ที่ทดสอบ'],
      answer: 'สิ่งที่สไลด์ระบุ / สถานะมาตรฐานพร้อมแหล่ง / runtime ที่ทดสอบ',
      explanation: 'แยกเอกสาร มาตรฐาน และการรองรับ เช่น toWellFormed อยู่ ES2024, top-level await อยู่ ES2022 และ |> เป็น proposal'
    },
    'es2024:5': {
      prompt: 'จำลอง pipeline โดยไม่ใช้ |> ข้อใดให้ pipe(3,n=>n+1,n=>n*2) ได้ 8?',
      options: ['function pipe(value,...fns){ return fns.reduce((v,fn)=>fn(v),value); }', 'function pipe(value,...fns){ return fns.map(fn=>fn(value)); }', 'function pipe(value,...fns){ return fns.reduce((v,fn)=>fn(value),value); }', 'function pipe(value,...fns){ return fns.reverse().reduce((v,fn)=>fn(v),value); }'],
      answer: 'function pipe(value,...fns){ return fns.reduce((v,fn)=>fn(v),value); }',
      explanation: 'reduce ส่งผลก่อนหน้าให้ฟังก์ชันถัดไป จึงคำนวณ (3+1)*2 ได้ 8 เป็นแนวคิด pipeline ด้วย syntax ที่มีอยู่แล้ว'
    },
    'es2024:8': {
      prompt: 'ไม่มี toWellFormed แล้ว fallback คืนข้อความเดิม ควรแจ้งสัญญา API อย่างไร?',
      options: ['บอกว่าซ่อม Unicode สำเร็จเสมอ', 'บอกว่าไม่ได้รับประกัน well-formed และคืนสถานะ เช่น normalized:false', 'เปลี่ยนชื่อ fallback แล้วถือว่าคุณสมบัติเท่ากัน', 'ซ่อนข้อจำกัดเพื่อให้ caller ไม่ต้องตัดสินใจ'],
      answer: 'บอกว่าไม่ได้รับประกัน well-formed และคืนสถานะ เช่น normalized:false',
      explanation: 'การคืนข้อความเดิมไม่ใช่การซ่อม ต้องบอกข้อจำกัดให้ caller เลือกยอมรับหรือปฏิเสธข้อมูลตามงาน'
    },
    'es2025:2': {
      prompt: 'ต้องการเลขคู่ยกกำลังสอง 3 ตัวแรกจาก array ล้านค่า lazy iterator ช่วยอย่างไร?',
      options: ['คืนหน่วยความจำ array ต้นทางที่สร้างไว้แล้วทั้งหมด', 'รับประกันว่าอ่าน input เพียงสามค่าทุกกรณี', 'หยุดแปลงเมื่อได้สามผล ลด array กลาง แต่ input เดิมยังใช้พื้นที่', 'แปลงครบล้านค่าก่อนเสมอเพื่อให้ได้ผลถูก'],
      answer: 'หยุดแปลงเมื่อได้สามผล ลด array กลาง แต่ input เดิมยังใช้พื้นที่',
      explanation: 'filter/map/take แบบ lazy ลดงานที่ไม่จำเป็นได้ แต่ต้องอ่านจนพบสามค่าที่ผ่าน และไม่ย้อนลบต้นทุน input ที่สร้างแล้ว'
    },
    'es2025:5': {
      prompt: 'fallback ของ Promise.try ที่รับ throw เป็น rejection ได้ ข้อใดอธิบาย timing ถูก?',
      options: ['Promise.resolve(fn()) จับ throw ก่อนเรียก fn ได้', 'Promise.resolve().then(fn) เรียก fn ทันทีใน call เดียวกัน', 'fn() แล้วค่อยสร้าง Promise ทำให้ทุก throw อยู่ใน chain', 'Promise.resolve().then(fn) จับ throw ได้ แต่เริ่ม fn ใน microtask'],
      answer: 'Promise.resolve().then(fn) จับ throw ได้ แต่เริ่ม fn ใน microtask',
      explanation: 'then รับ callback จึงจับ throw เป็น rejection แต่เริ่มช้ากว่า Promise.try หากต้องเรียกทันทีใช้ new Promise(resolve=>resolve(fn()))'
    },
    'es2025:8': {
      prompt: 'สต็อกต้องเป็นจำนวนเต็มใหญ่ที่แม่นยำ ควรประเมินข้อเสนอให้ใช้ Float16 อย่างไร?',
      options: ['ตรวจช่วงค่า เลือกชนิดจำนวนเต็มหรือ BigInt ที่รองรับ และทดสอบ overflow', 'ใช้ Float16 เสมอเพราะเก็บจำนวนเต็มทุกขนาดได้', 'ปัดทุกค่าทิ้งก่อนเก็บเพื่อให้ตรงต้นฉบับ', 'เลือกชนิดที่กินพื้นที่น้อยสุดโดยไม่ต้องดูช่วง'],
      answer: 'ตรวจช่วงค่า เลือกชนิดจำนวนเต็มหรือ BigInt ที่รองรับ และทดสอบ overflow',
      explanation: 'ความแม่นยำและช่วงค่าต้องตรงข้อกำหนด Float16 ไม่เก็บจำนวนเต็มทุกขนาดได้ เลือกชนิดพร้อมสัญญาการส่งข้อมูล'
    },
    'es2026:2': {
      prompt: 'computeDefault แพงและ key x อาจมีแล้ว วิธีใดคำนวณเฉพาะเมื่อไม่มี key?',
      options: ['map.getOrInsert("x", computeDefault())', 'map.getOrInsertComputed("x", () => computeDefault())', 'map.set("x", computeDefault())', 'map.get("x") ?? computeDefault() เพื่อแยก key ที่มี undefined ได้'],
      answer: 'map.getOrInsertComputed("x", () => computeDefault())',
      explanation: 'arguments ถูกคำนวณก่อน call แต่ callback ของ Computed ใช้เมื่อขาด key หรือใช้ if(!map.has("x")) ก่อนคำนวณและ set'
    },
    'es2026:5': {
      prompt: 'rawJSON ส่ง ID ใหญ่ครบหลัก แต่ JSON.parse ปกติอาจปัด ควรตกลง schema อย่างไร?',
      options: ['ส่งเป็น JSON number ต่อ เพราะ rawJSON ซ่อมฝั่งรับให้', 'ส่งเป็นเลขทศนิยมที่เติม .0', 'ส่ง ID เป็น string แล้วแปลง BigInt ภายหลังเมื่อจำเป็น', 'แปลงเป็น Number ก่อนส่งเพื่อรักษาทุกหลัก'],
      answer: 'ส่ง ID เป็น string แล้วแปลง BigInt ภายหลังเมื่อจำเป็น',
      explanation: 'JSON.parse ปกติอ่าน JSON number เป็น Number ซึ่งอาจเสียหลักเกิน safe integer การใช้ string รักษาข้อมูลทั้งสองฝั่ง'
    },
    'es2026:8': {
      prompt: 'แปลงข้อความไทยเป็น Base64 แล้วคืนข้อความเดิมด้วย Uint8Array ควรเรียงขั้นตอนใด?',
      options: ['btoa(text) → TextEncoder → atob', 'TextDecoder → toBase64 → TextEncoder', 'toBase64 บน string → fromBase64 → String(bytes)', 'TextEncoder → bytes.toBase64(); กลับด้วย fromBase64 → TextDecoder'],
      answer: 'TextEncoder → bytes.toBase64(); กลับด้วย fromBase64 → TextDecoder',
      explanation: 'แปลงข้อความเป็น UTF-8 bytes ก่อนทำ Base64 และ decode bytes กลับเป็นข้อความ ตรวจ method support และรับมือ input ผิดด้วย Base64 ไม่ใช่การเข้ารหัสลับ'
    }
  };

  window.STUDY.convertedQuestionKeys = Object.keys(overrides);
  for (const [key, replacement] of Object.entries(overrides)) {
    const [topicId, index] = key.split(':');
    Object.assign(window.STUDY.questions[topicId][Number(index)], replacement);
  }
})();
