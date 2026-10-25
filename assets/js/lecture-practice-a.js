// [EXAM PRACTICE] แบบฝึกใหม่จากหัวข้อคำถาม/แนวอธิบายที่อ่านได้ใน transcript ภายในเครื่อง
// audio-adapted = ดัดแปลงประเด็นที่กล่าวจริง; style-transfer = ประยุกต์รูปแบบถามกับโจทย์ใหม่
// เวลาต้นแบบอ้างรูปแบบการถาม ไม่ยืนยันว่าอาจารย์ถามโจทย์ใหม่นี้; คำตอบตรวจเทียบ PDF
// ไม่ใช่คำถอดเสียงคำต่อคำหรือการทำนายข้อสอบจริง และไม่มีข้อมูลส่วนตัวจากการบันทึก
window.LECTURE_PRACTICE = [...(window.LECTURE_PRACTICE || []), ...[
  {
    "topic": "ca01",
    "id": "ca01:27",
    "prompt": "ชุดใดเป็นองค์ประกอบภายใน CPU ทั้งหมด",
    "options": [
      "Control unit, ALU และ registers",
      "Input device, ALU และ disk",
      "Control unit, power supply และ keyboard",
      "Registers, motherboard และจอภาพ"
    ],
    "correct": 0,
    "explanation": "Control unit ควบคุมงาน, ALU คำนวณ และ registers เก็บค่าภายใน CPU ส่วนอุปกรณ์รับเข้า/แสดงผลและแหล่งจ่ายไฟเป็นองค์ประกอบระดับระบบ",
    "from": 13,
    "to": 14,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "roles",
      "audioFrom": 75.14,
      "audioTo": 88.1,
      "anchor": "องค์ประกอบที่อยู่ภายใน CPU",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca01",
    "id": "ca01:28",
    "prompt": "แบบจำลองหนึ่งทำ fetch → execute → decode → store จุดใดควรแก้ก่อนเพื่อให้ตรงวงรอบพื้นฐาน",
    "options": [
      "ย้าย store มาไว้ก่อน fetch เสมอ",
      "ย้าย decode มาไว้หลัง fetch และก่อน execute",
      "ย้าย fetch ไปไว้หลัง execute",
      "ตัด decode ออก เพราะ execute ต้องเดาคำสั่งเอง"
    ],
    "correct": 1,
    "explanation": "ต้องแปลความหมายคำสั่งก่อนลงมือทำ จึงเป็น fetch → decode → execute → store ในแบบจำลองที่บทใช้ แม้ CPU จริงอาจแบ่งขั้นย่อยต่างกัน",
    "from": 15,
    "to": 15,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "trace",
      "audioFrom": 119.06,
      "audioTo": 153.22,
      "anchor": "เรียงขั้นรับคำสั่ง แปล ทำงาน และเก็บผล",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca01",
    "id": "ca01:29",
    "prompt": "งานเดียวกัน A มี performance เป็น 1.6 เท่าของ B ถ้า A ใช้เวลา 3 s แล้ว B ใช้เวลากี่วินาที",
    "options": [
      "1.875 s",
      "3.6 s",
      "4.8 s",
      "0.625 s"
    ],
    "correct": 2,
    "explanation": "PerformanceA/PerformanceB = timeB/timeA จึง timeB = 1.6×3 = 4.8 s เครื่องที่ช้ากว่าต้องใช้เวลามากกว่า ไม่ใช่นำ 3 ไปหาร 1.6",
    "from": 36,
    "to": 36,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "calculate",
      "audioFrom": 275.22,
      "audioTo": 334.69,
      "anchor": "เปรียบเทียบความเร็วด้วยอัตราส่วนเวลากลับด้าน",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca01",
    "id": "ca01:30",
    "prompt": "ต้องเก็บสถานะว่า operation ล่าสุดเกิด overflow หรือผลเป็นลบ ควรใช้ register กลุ่มใด",
    "options": [
      "PC ที่ใช้ระบุที่อยู่คำสั่งถัดไป",
      "IR ที่ถือรหัสคำสั่งปัจจุบัน",
      "Register ที่เก็บ base address ของ array เท่านั้น",
      "Status/flags register"
    ],
    "correct": 3,
    "explanation": "Status/flags ใช้เก็บสถานะของการประมวลผล จึงต่างจาก PC ที่เก็บตำแหน่ง และ IR ที่เก็บคำสั่ง",
    "from": 16,
    "to": 16,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "roles",
      "audioFrom": 181.71,
      "audioTo": 211.79,
      "anchor": "หน้าที่ของ PC, IR และ register เก็บสถานะ",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca01",
    "id": "ca01:31",
    "prompt": "เพื่อนใช้ ISA เดียวกันเป็นเหตุผลว่าตัด instruction count ออกจากอัตราส่วนเวลา CPU สองโปรแกรมได้ทันที ข้อใดเป็นจุดที่ยังพิสูจน์ไม่พอ",
    "options": [
      "ยังไม่ทราบว่าทั้งสองกรณี execute คำสั่งจำนวนเท่ากันจริงหรือไม่",
      "ยังไม่ทราบว่าจอภาพมีจำนวนพิกเซลเท่ากันหรือไม่",
      "ยังไม่ทราบว่า RAM มีสีเดียวกันหรือไม่",
      "ยังไม่ทราบว่าโปรแกรมใช้ชื่อตัวแปรเหมือนกันหรือไม่"
    ],
    "correct": 0,
    "explanation": "การตัด IC ต้องมี IC เท่ากันจริง ISA เดียวกันไม่ได้รับประกันข้อนี้ เพราะโปรแกรมและ compiler มีผลต่อจำนวนคำสั่งที่ execute",
    "from": 41,
    "to": 42,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "cause",
      "audioFrom": 454.06,
      "audioTo": 485.39,
      "anchor": "เทียบเวลา CPU โดยคง IC เป็นตัวแปรแล้วตัดเมื่อเท่ากัน",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca01",
    "id": "ca01:32",
    "prompt": "โปรแกรม execute 1.5×10^9 คำสั่ง มี CPI เฉลี่ย 2 และใช้ CPU time 1.2 s ต้องมี clock rate เท่าไร",
    "options": [
      "0.4 GHz",
      "2.5 GHz",
      "1.25 GHz",
      "3.6 GHz"
    ],
    "correct": 1,
    "explanation": "Clock cycles = IC×CPI = 3×10^9 cycles ดังนั้น clock rate = cycles/time = 3×10^9/1.2 = 2.5×10^9 Hz ไม่ใช่นำเวลาไปคูณจำนวน cycles",
    "from": 39,
    "to": 41,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "calculate",
      "audioFrom": 393.02,
      "audioTo": 454.06,
      "anchor": "ใช้ IC, CPI และ cycle time หา CPU time",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca01",
    "id": "ca01:33",
    "prompt": "เรียงภาพรวมจากหน่วยเก็บข้อมูลที่เร็วและใกล้หน่วยคำนวณ ไปยังระดับที่ช้ากว่า ได้อย่างไร",
    "options": [
      "Main memory → cache → registers",
      "Cache → main memory → registers",
      "Registers → cache → main memory",
      "Registers → main memory → cache"
    ],
    "correct": 2,
    "explanation": "Registers อยู่ภายใน CPU ส่วน cache เป็นหน่วยความจำเล็กและเร็วที่ช่วยคั่นก่อนเข้าถึง main memory ลำดับนี้อธิบายภาพรวมในบท ไม่ใช่การรับประกันเวลาของทุก access",
    "from": 14,
    "to": 18,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "compare",
      "audioFrom": 211.79,
      "audioTo": 241.76,
      "anchor": "ลำดับความเร็ว registers, cache และ memory",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca01",
    "id": "ca01:34",
    "prompt": "งานเดิมใช้เวลา 10 s หลังปรับปรุงเหลือ 8 s performance ใหม่เป็นกี่เท่าของเดิม",
    "options": [
      "0.8 เท่า",
      "1.2 เท่า",
      "2 เท่า",
      "1.25 เท่า"
    ],
    "correct": 3,
    "explanation": "Performance แปรผกผันกับเวลา จึงได้ 10/8 = 1.25 เท่า เวลาลด 20% ไม่ได้แปลว่า performance เพิ่มเพียง 20%",
    "from": 36,
    "to": 36,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "calculate",
      "audioFrom": 305.01,
      "audioTo": 334.69,
      "anchor": "เครื่องเร็วขึ้นหมายถึงใช้เวลาน้อยลง",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca01",
    "id": "ca01:35",
    "prompt": "เมื่อเทียบรันงานเดิม: IC ใหม่เหลือ 75%, CPI ใหม่เป็น 120% และ clock rate ใหม่เหลือ 90% ของเดิม เวลา CPU ใหม่เป็นกี่เท่าของเดิม",
    "options": [
      "1 เท่า คือเวลาเท่าเดิม",
      "0.675 เท่า",
      "0.9 เท่า",
      "1.6 เท่า"
    ],
    "correct": 0,
    "explanation": "เวลาแปรตาม IC×CPI/clock rate จึงมีอัตราส่วน 0.75×1.20/0.90 = 1 การดูว่า IC ลดลงเพียงอย่างเดียวจึงยังสรุปว่าเร็วขึ้นไม่ได้",
    "from": 39,
    "to": 42,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "calculate",
      "audioFrom": 424.35,
      "audioTo": 485.39,
      "anchor": "เปรียบเทียบ CPU time จากหลายปัจจัยร่วมกัน",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:27",
    "prompt": "จับคู่หน้าที่ของ bus ทั้งสามประเภทได้ถูกต้องในข้อใด",
    "options": [
      "Address ส่งค่า, data ควบคุมจังหวะ, control ระบุตำแหน่ง",
      "Address ระบุตำแหน่ง, data ส่งค่า, control ควบคุมจังหวะและทิศทาง",
      "Address เก็บคำสั่ง, data เก็บ PC, control เก็บผล ALU",
      "Address ควบคุมจังหวะ, data ระบุตำแหน่ง, control ส่งข้อมูล payload"
    ],
    "correct": 1,
    "explanation": "Address บอกว่าจะคุยกับตำแหน่งใด ส่วน data ขนส่งค่าจริง และ control ประสานการเข้าถึงกับทิศทาง การระบุตำแหน่งไม่เท่ากับการส่งเนื้อหาข้อมูล",
    "from": 5,
    "to": 5,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "roles",
      "audioFrom": 807.03,
      "audioTo": 858.31,
      "anchor": "หน้าที่ address bus, data bus และ control bus",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:28",
    "prompt": "สมมติคำสั่งและข้อมูลใช้ช่องทาง memory เดียวที่รับได้หนึ่ง access ต่อจังหวะ หากแยกตามแนว Harvard จะลดการแข่งขันชนิดใดโดยตรง",
    "options": [
      "การแย่งตำแหน่งเดียวกันระหว่าง PC กับ IR ภายใน register เดียว",
      "การแย่งเวลาระหว่าง compiler กับ assembler ทุกกรณี",
      "การแย่งช่องทางระหว่างอ่านคำสั่งกับอ่าน/เขียนข้อมูล",
      "การแย่งไฟเลี้ยงระหว่าง keyboard กับ disk"
    ],
    "correct": 2,
    "explanation": "Harvard แยก memory และ bus ของ instructions กับ data จึงลดการแย่งช่องทางสองงานนี้ ภายใต้ข้อจำกัดหนึ่ง access ต่อจังหวะที่โจทย์กำหนด",
    "from": 3,
    "to": 4,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "cause",
      "audioFrom": 738.53,
      "audioTo": 807.03,
      "anchor": "เปรียบเทียบ memory ของ Von Neumann กับ Harvard",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:29",
    "prompt": "MARIE เริ่ม AC=99, M[20]=12 และ M[21]=5 รัน Load 20 → Subt 21 → Store 22 ตามลำดับ หลังจบ AC และ M[22] เป็นเท่าไร",
    "options": [
      "AC=17 และ M[22]=17",
      "AC=12 และ M[22]=7",
      "AC=99 และ M[22]=7",
      "AC=7 และ M[22]=7"
    ],
    "correct": 3,
    "explanation": "Load แทน AC ด้วย 12 ก่อน จากนั้น Subt ทำ 12−5=7 และ Store คัดลอก 7 ไป M[22] โดยไม่เปลี่ยน AC ต้องไม่บวกค่า AC=99 เดิมต่อหลัง Load",
    "from": 22,
    "to": 26,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "trace",
      "audioFrom": 1378.74,
      "audioTo": 1493.02,
      "anchor": "ไล่คำสั่งจาก opcode และติดตามค่า AC",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:30",
    "prompt": "เมื่อติดต่อ I/O อุปกรณ์หนึ่ง คู่ register ใดแยกหน้าที่ระบุอุปกรณ์กับพักข้อมูลได้ถูกต้อง",
    "options": [
      "I/OAR ระบุอุปกรณ์ และ I/OBR พักข้อมูลที่รับหรือส่ง",
      "I/OAR พักข้อมูล และ I/OBR ระบุอุปกรณ์",
      "PC ระบุอุปกรณ์ และ IR พักข้อมูล I/O ทุกครั้ง",
      "AC ระบุอุปกรณ์ และ status register พักข้อมูล I/O ทุกครั้ง"
    ],
    "correct": 0,
    "explanation": "I/O address register บอกอุปกรณ์ที่เลือก ส่วน I/O buffer register รับหรือส่งข้อมูล จึงมีบทบาทคล้ายการแยก address กับ data ของ MAR/MBR",
    "from": 10,
    "to": 11,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "roles",
      "audioFrom": 1320.19,
      "audioTo": 1378.16,
      "anchor": "แยก I/O address register ออกจาก I/O buffer register",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:31",
    "prompt": "Bus ใช้ daisy chain และอุปกรณ์ priority สูงขอใช้อย่างต่อเนื่อง เหตุใดอุปกรณ์ท้ายสายจึงอาจรอนาน",
    "options": [
      "เพราะอุปกรณ์ท้ายสายกลายเป็น address bus",
      "สิทธิ์ถูกส่งตามลำดับ priority จนอุปกรณ์ท้ายสายมีโอกาสได้รับน้อย",
      "เพราะ daisy chain อนุญาตให้ทุกอุปกรณ์ส่งพร้อมกันเสมอ",
      "เพราะ daisy chain ไม่มีกติกาให้สิทธิ์ใด ๆ"
    ],
    "correct": 1,
    "explanation": "Daisy chain จัดสิทธิ์ตามลำดับ จึงเกิดการรอของ priority ต่ำได้เมื่อ priority สูงใช้งานต่อเนื่อง นี่เป็นผลจากกติกาการให้สิทธิ์ ไม่ใช่การส่งข้อมูลชนกัน",
    "from": 7,
    "to": 7,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "cause",
      "audioFrom": 944.72,
      "audioTo": 972.39,
      "anchor": "priority สูงใช้ก่อนและอุปกรณ์ priority ต่ำอาจรอนาน",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:32",
    "prompt": "MARIE fetch คำสั่งจาก address 0x120 ได้ IR=0x91A0 และขยับ PC เป็น 0x121 ตาราง ISA ให้ opcode 9 คือ Jump X หลัง execute PC ควรเป็นค่าใด",
    "options": [
      "0x121",
      "0x91A0",
      "0x1A0",
      "0x1A1"
    ],
    "correct": 2,
    "explanation": "Opcode 9 สั่งนำ address X เข้า PC โดยตรง ดังนั้น X=0x1A0 คือจุด fetch ถัดไป ค่า 0x121 เป็นเพียงลำดับต่อเนื่องก่อน execute ส่วน 0x91A0 คือทั้งคำสั่ง",
    "from": 13,
    "to": 22,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "trace",
      "audioFrom": 1407.79,
      "audioTo": 1522.54,
      "anchor": "แยก opcode กับ address แล้วติดตามการเปลี่ยน register",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:33",
    "prompt": "ในคำสั่งเครื่องตัวอย่างที่แบ่งเป็น opcode กับ address สองส่วนนี้ตอบคำถามคนละเรื่องอย่างไร",
    "options": [
      "Opcode บอกตำแหน่ง ส่วน address บอกชนิด operation",
      "ทั้ง opcode และ address บอกเฉพาะความเร็ว CPU",
      "Opcode คือข้อมูลผลลัพธ์ ส่วน address คือค่าของ flags",
      "Opcode บอกทำอะไร ส่วน address ระบุตำแหน่งที่เกี่ยวข้อง"
    ],
    "correct": 3,
    "explanation": "Opcode ใช้ decode operation เช่น Load หรือ Store ส่วน address ชี้ตำแหน่งที่คำสั่งอ้างถึง การเอาสองส่วนสลับหน้าที่กันจะอ่านคำสั่งผิด",
    "from": 14,
    "to": 22,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "roles",
      "audioFrom": 1493.02,
      "audioTo": 1560.8,
      "anchor": "ความหมาย opcode เทียบกับ address ของ operand",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:34",
    "prompt": "โปรแกรมบันทึกเฉพาะ PC ก่อนเข้า ISR แต่ ISR เปลี่ยน AC เมื่อกลับมา PC ถูกต้องแต่ผลคำนวณต่อผิด สาเหตุใดตรงที่สุด",
    "options": [
      "ไม่ได้รักษาและคืนค่า AC ที่งานเดิมยังต้องใช้",
      "IR ต้องมีจำนวนบิตเท่ากับ AC เสมอจึงจะใช้ interrupt ได้",
      "PC ต้องถือข้อมูล operand แทน address",
      "ทุก ISR ต้องทำให้ผลคำนวณเดิมผิดโดยนิยาม"
    ],
    "correct": 0,
    "explanation": "คืนตำแหน่งกลับเพียงอย่างเดียวยังไม่พอ ถ้า handler เปลี่ยน register ที่งานเดิมพึ่งพา ต้องเก็บและคืนสถานะนั้นด้วยตามกลไกของระบบ",
    "from": 32,
    "to": 33,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "cause",
      "audioFrom": 1591.22,
      "audioTo": 1708.02,
      "anchor": "เก็บสถานะก่อนเข้า ISR แล้ว restore ก่อนทำงานเดิมต่อ",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca02",
    "id": "ca02:35",
    "prompt": "สมมติ interrupt แต่ละชั้น save/restore AC ถูกต้อง: user มี AC=5 → เข้า X แล้ว X เปลี่ยนเป็น 20 → Y แทรกและเปลี่ยนเป็น 99 → Y คืนค่า → X เปลี่ยนเป็น 21 แล้วคืน user ค่า AC หลัง Y กลับและหลังกลับ user เป็นคู่ใด",
    "options": [
      "99 และ 21",
      "20 และ 5",
      "20 และ 21",
      "5 และ 99"
    ],
    "correct": 1,
    "explanation": "Y ต้องคืนบริบทของ X จึงได้ 20 ก่อน X ทำงานต่อ ส่วน X ต้องคืนบริบทของ user จึงได้ 5 ตอนจบ ค่า 21 เป็นงานภายใน X ไม่ใช่สถานะของ user",
    "from": 32,
    "to": 44,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "trace",
      "audioFrom": 1708.02,
      "audioTo": 1793.5,
      "anchor": "nested interrupt ต้องคืนสถานะของแต่ละชั้นตามลำดับ",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:45",
    "prompt": "ทิศทางการย้ายข้อมูลของ load กับ store ต่างกันอย่างไร",
    "options": [
      "Load: register → memory; store: memory → register",
      "ทั้งสองย้ายข้อมูลจาก memory ไป memory เท่านั้น",
      "Load: memory → register; store: register → memory",
      "ทั้งสองใช้เปลี่ยน address ของ PC เท่านั้น"
    ],
    "correct": 2,
    "explanation": "Load นำค่าเข้ามาเพื่อใช้ใน register ส่วน store ส่งค่าจาก register ออกไปเก็บใน memory สองคำนี้จึงไม่ใช่ทิศทางเดียวกัน",
    "from": 49,
    "to": 51,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "roles",
      "audioFrom": 2077.1,
      "audioTo": 2106.48,
      "anchor": "ถามความหมายและทิศทางของ load กับ store",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:46",
    "prompt": "RISC-V: ก่อน add x9,x20,x21 มี x9=100, x20=3, x21=4 ข้อใดเป็นสถานะหลังคำสั่งนี้",
    "options": [
      "x21=103 โดย x9=100 และ x20=3 คงเดิม",
      "x9=107 โดย x20=3 และ x21=4 คงเดิม",
      "x20=104 โดย x9=100 และ x21=4 คงเดิม",
      "x9=7 โดย x20=3 และ x21=4 คงเดิม"
    ],
    "correct": 3,
    "explanation": "Destination อยู่ตัวแรก จึงเขียน 3+4=7 ทับ x9 เดิม ไม่ได้ใช้ x9=100 เป็น source และไม่ได้เขียนทับ source ตัวท้าย",
    "from": 43,
    "to": 47,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "trace",
      "audioFrom": 1960.88,
      "audioTo": 1988.94,
      "anchor": "อ่าน assembly สาม operands ว่าเอาค่าใดบวกแล้วเก็บที่ใด",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:47",
    "prompt": "ใช้ two’s complement 4 บิตคำนวณ 5−(−4) โดยเก็บเฉพาะ 4 บิตล่าง ข้อใดวินิจฉัยผลได้ถูกต้อง",
    "options": [
      "ได้ 1001 ซึ่งอ่านเป็น−7 และเกิด signed overflow เพราะคำตอบจริง 9 เกินช่วง",
      "ได้ 1001 ซึ่งแทน+9 ใน signed4 บิตได้ถูกต้อง",
      "ได้ 0111 ซึ่งแทน+7 และไม่มี overflow",
      "ได้ 0001 เพราะต้องนำ carry มาบวกวนกลับเสมอ"
    ],
    "correct": 0,
    "explanation": "เปลี่ยนการลบเป็น 5+4 ได้ 0101+0100=1001 แต่ signed4 บิตมีช่วง−8 ถึง 7 จึงเก็บคำตอบจริง 9 ไม่ได้ อย่าสับสนบิตผลลัพธ์กับคำตอบที่อยู่ในช่วงแทนค่า",
    "from": 18,
    "to": 22,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "calculate",
      "audioFrom": 1895.78,
      "audioTo": 1926.96,
      "anchor": "บวก/ลบ sign-magnitude และ two’s complement โดยระบุจำนวนบิต",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:48",
    "prompt": "ถ้า field opcode มี 7 บิต field นี้มีรูปแบบบิตได้กี่แบบ",
    "options": [
      "7 รูปแบบ",
      "128 รูปแบบ",
      "64 รูปแบบ",
      "256 รูปแบบ"
    ],
    "correct": 1,
    "explanation": "มี 2^7=128 รูปแบบบิต ข้อนี้นับเฉพาะ field ไม่ได้สรุปว่า ISA มีคำสั่งรวมเพียง128คำสั่ง เพราะ funct3/funct7 ยังช่วยจำแนก operation ได้",
    "from": 55,
    "to": 56,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "calculate",
      "audioFrom": 2168.75,
      "audioTo": 2196.54,
      "anchor": "ใช้จำนวนบิตของ opcode นับรูปแบบรหัส",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:49",
    "prompt": "add x5,x6,x4 กับ addi x5,x6,4 ให้ผลเท่ากันเสมอหรือไม่ (ไม่คิด overflow)",
    "options": [
      "เสมอ เพราะ x4 ต้องเก็บค่า 4 ตลอดเวลา",
      "เสมอ เพราะเลข 4 ใน add คือ immediate ด้วย",
      "ไม่เสมอ: add ใช้ค่าใน x4 ส่วน addi ใช้ค่าคงที่ 4",
      "ไม่เสมอ เพราะ addi เขียนผลลง x6 แทน x5"
    ],
    "correct": 2,
    "explanation": "x4 เป็นชื่อ register ไม่ใช่ตัวเลข 4 ถ้า x4 มีค่าอื่น ผลจึงต่างกัน ส่วน destination ของทั้งสองคำสั่งคือ x5 เหมือนกัน",
    "from": 43,
    "to": 52,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "compare",
      "audioFrom": 2107.25,
      "audioTo": 2136.93,
      "anchor": "แยก arithmetic ที่ใช้สอง registers จาก immediate operand",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:50",
    "prompt": "เริ่ม x5=3, x6=0 แล้ววน Loop: add x6,x6,x5 → addi x5,x5,−1 → bne x5,x0,Loop เมื่อออกจาก loop คู่ค่า x5,x6 เป็นเท่าไร",
    "options": [
      "0,3",
      "1,6",
      "−1,5",
      "0,6"
    ],
    "correct": 3,
    "explanation": "แต่ละรอบบวกค่า x5 ก่อนลดลง จึงสะสม 3+2+1=6 เมื่อลด x5 เป็น 0 bne ไม่เข้าเงื่อนไขและออก ไม่มีรอบบวก−1",
    "from": 65,
    "to": 67,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "trace",
      "audioFrom": 2757.26,
      "audioTo": 2814.19,
      "anchor": "อ่านเงื่อนไข branch แล้วติดตามว่าจะกระโดดหรือทำต่อ",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:51",
    "prompt": "IEEE 754 ใช้ exponent กี่บิตใน single precision และ double precision ตามลำดับ",
    "options": [
      "8 และ 11",
      "23 และ 52",
      "11 และ 8",
      "32 และ 64"
    ],
    "correct": 0,
    "explanation": "Single precision มี exponent8 บิต ส่วน double precision มี exponent11 บิต ตัวเลข 23/52 เป็นจำนวน fraction bits และ 32/64 เป็นความยาวข้อมูลทั้งชุด",
    "from": 27,
    "to": 28,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "compare",
      "audioFrom": 8201.65,
      "audioTo": 8329.89,
      "anchor": "ถามจำนวนบิต exponent ของ single และ double precision",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:52",
    "prompt": "สมมติช่องข้อมูล unsigned 8 บิตเก็บ 250 แล้ว logical shift left1 โดยทิ้งบิตล้น ค่าที่เก็บจริงเป็นเท่าไร",
    "options": [
      "500",
      "244",
      "125",
      "250"
    ],
    "correct": 1,
    "explanation": "250×2=500 แต่ช่อง 8 บิตเก็บเฉพาะ 8 บิตล่าง จึงเป็น 500 mod256=244 การบอกว่าเลื่อนซ้ายเท่ากับคูณต้องดูว่ามีบิตล้นหรือไม่",
    "from": 60,
    "to": 61,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "calculate",
      "audioFrom": 2700.59,
      "audioTo": 2757.26,
      "anchor": "การเลื่อนบิตสัมพันธ์กับคูณ/หารและต้องตรวจข้อจำกัด",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca03",
    "id": "ca03:53",
    "prompt": "กำหนดคำสั่ง R-format เป็น ADD และมี rd=00101₂, rs1=00110₂, rs2=00111₂ ก่อนทำมี x5=100, x6=9, x7=4 คำสั่งเขียนผลใด",
    "options": [
      "เขียน 109 ลง x7",
      "เขียน 109 ลง x5",
      "เขียน 13 ลง x5",
      "เขียน 104 ลง x6"
    ],
    "correct": 2,
    "explanation": "ถอดเลข register ได้ rd=5, rs1=6, rs2=7 จึงทำ x5←x6+x7=13 ต้องถอด field ก่อนเลือกค่าที่อ่านและตำแหน่งที่ถูกเขียน",
    "from": 55,
    "to": 56,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "roles",
      "audioFrom": 2226.3,
      "audioTo": 2255.38,
      "anchor": "อ่าน format เพื่อแยก destination กับ source registers",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:45",
    "prompt": "เมื่อเปรียบเทียบ SRAM กับ DRAM ตามภาพรวมของบท ข้อใดถูก",
    "options": [
      "SRAM ช้ากว่าและมีต้นทุนต่อ GB สูงกว่า",
      "SRAM เร็วกว่าและมีต้นทุนต่อ GB ต่ำกว่า",
      "ทั้งสองมีเวลาเข้าถึงเท่ากัน เพราะเป็น RAM เหมือนกัน",
      "SRAM เร็วกว่าและมีต้นทุนต่อ GB สูงกว่า"
    ],
    "correct": 3,
    "explanation": "SRAM เร็วกว่าแต่ต้นทุนต่อความจุสูงกว่า จึงใช้กับ cache ขนาดเล็ก ส่วน DRAM เหมาะกับ main memory ที่ต้องการความจุมากกว่า อย่านำคำว่า RAM เหมือนกันมาสรุปว่าความเร็วเท่ากัน",
    "from": 9,
    "to": 10,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "compare",
      "audioFrom": 8389.17,
      "audioTo": 8441.3,
      "anchor": "ถามว่า SRAM กับ DRAM ชนิดใดเร็วกว่า",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:46",
    "prompt": "Cache มี 8lines และขนาด block เท่าเดิม เปลี่ยนจาก direct-mapped เป็น 2-way set associative โดยความจุข้อมูลรวมคงที่ ข้อใดถูก",
    "options": [
      "มี 4sets แต่ละ set มี 2lines; ความจุรวมยังเท่าเดิม",
      "มี 8sets แต่ละ set มี 2lines; ความจุรวมจึงคงเดิม",
      "มี 2sets แต่ละ set มี 8lines; ความจุรวมจึงคงเดิม",
      "มี 16sets แต่ละ set มี 1line; จำนวน lines ยังเท่าเดิม"
    ],
    "correct": 0,
    "explanation": "จำนวน sets=lines/ways=8/2=4 การเพิ่ม ways ภายใต้ความจุคงที่เปลี่ยนทางเลือกการวาง ไม่ได้เพิ่มสำเนาข้อมูลจนความจุเพิ่มเอง",
    "from": 45,
    "to": 47,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "compare",
      "audioFrom": 3996.77,
      "audioTo": 4110.32,
      "anchor": "2-way และ 4-way หมายถึงจำนวน block ที่วางได้ภายในหนึ่ง set",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:47",
    "prompt": "Direct-mapped มี 8lines, block16byte และอ้าง address เป็น byte ถอด address หนึ่งได้ tag=5, index=3, offset=4 โดยตัวเลขเป็นฐานสิบ address เดิมคือเท่าไร",
    "options": [
      "688",
      "692",
      "84",
      "564"
    ],
    "correct": 1,
    "explanation": "Block address=tag×จำนวน lines+index=5×8+3=43 แล้ว byte address=43×16+4=692 ต้องประกอบทั้ง tag, index และ offset กลับตามหน่วย",
    "from": 32,
    "to": 32,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "calculate",
      "audioFrom": 3703.81,
      "audioTo": 3762.59,
      "anchor": "แปลง byte address เป็น block แล้วใช้ mod หา cache line",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:48",
    "prompt": "ใน direct-mapped cache คำอธิบาย index, tag และ offset ข้อใดถูก",
    "options": [
      "Index บอกข้อมูลทั้ง block, tag เลือก byte, offset เป็น valid bit",
      "Index เก็บผล ALU, tag ระบุ clock, offset บอกจำนวน cores",
      "Index เลือก line, tag แยกว่าเป็น memory block ใด, offset เลือกตำแหน่งใน block",
      "Index เลือก byte, tag เป็น dirty bit, offset เลือก set ทั้งหมด"
    ],
    "correct": 2,
    "explanation": "Index ลดขอบเขตการค้นเหลือ line ที่กำหนด แต่ต้องใช้ tag ยืนยันว่าเป็น block ที่ต้องการ ส่วน offset ใช้เลือกข้อมูลภายใน block",
    "from": 23,
    "to": 32,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "roles",
      "audioFrom": 3421.54,
      "audioTo": 3477.63,
      "anchor": "แยกบิต tag กับ index ในการหา block ใน cache",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:49",
    "prompt": "โปรแกรมจำลองเลือก line ได้ถูกต้องและพบ tag ตรงกัน แต่ valid=0 ก็ยังนับเป็น hit ควรแก้เงื่อนไขใด",
    "options": [
      "เปลี่ยน tag ทุก line ให้เท่ากัน",
      "ใช้ offset แทน valid แล้วไม่ต้องเทียบ tag",
      "ถือว่าทุก access ครั้งแรกเป็น hit เพื่อไม่ให้ cache ว่าง",
      "ต้องตรวจ valid=1 ร่วมกับ tag ตรงกันจึงนับ hit"
    ],
    "correct": 3,
    "explanation": "Tag ที่ตรงกันไม่มีความหมายถ้าช่องยังไม่ valid เช่นค่าค้างในช่องที่ยังไม่มี block ใช้งาน ต้องผ่านสองเงื่อนไขพร้อมกัน",
    "from": 24,
    "to": 25,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "cause",
      "audioFrom": 3645.09,
      "audioTo": 3703.81,
      "anchor": "ตรวจ tag และ valid เพื่อแยก hit กับ miss",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:50",
    "prompt": "Cache direct-mapped64byte, block16byte เริ่มว่าง อ่าน byte addresses0,4,64,0 ตามลำดับ โดยเติม block เมื่อ miss ผล hit/miss ตรงข้อใด",
    "options": [
      "Miss, hit, miss, miss",
      "Miss, miss, miss, hit",
      "Miss, hit, miss, hit",
      "Hit, hit, miss, miss"
    ],
    "correct": 0,
    "explanation": "0 กับ 4 อยู่ block0 เดียวกันจึง hit ครั้งที่สอง แต่ 64 อยู่ block4 และใช้ index0 เหมือน block0 จึงแทน block0 ออก พอกลับอ่าน 0 จึง miss อีก",
    "from": 23,
    "to": 33,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "trace",
      "audioFrom": 3477.63,
      "audioTo": 3673.84,
      "anchor": "ไล่ access เมื่อ cache ว่าง พบซ้ำ และถูกแทนด้วย block อื่น",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:51",
    "prompt": "คำว่า 2-way set associative หมายถึงอะไรสำหรับ memory block ที่ถูก map มา set หนึ่ง",
    "options": [
      "ต้องทำสำเนา block เดียวกันลง 2lines เสมอ",
      "เลือกวางได้หนึ่งใน 2lines ภายใน set นั้น",
      "หนึ่ง block เลือกได้ทุก line ของ cache โดยไม่มี set",
      "cache ทั้งระบบเก็บได้เพียง 2byte"
    ],
    "correct": 1,
    "explanation": "Way คือจำนวนทางเลือกภายใน set ไม่ใช่ข้อบังคับให้สำเนาข้อมูลซ้ำทั้งสองช่อง และไม่เท่ากับ fully associative ที่เลือกได้ทุก entry",
    "from": 45,
    "to": 47,
    "level": "easy",
    "set": 4,
    "provenance": {
      "kind": "audio-adapted",
      "pattern": "roles",
      "audioFrom": 4052.21,
      "audioTo": 4110.32,
      "anchor": "ความหมายของ way ใน set associative",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:52",
    "prompt": "Cache ทั้งคู่มี 8entries แบบ A เป็น 2-way ส่วนแบบ B เป็น fully associative เมื่อค้นหนึ่ง block ต้องพิจารณา tag ใน set ที่เลือกของ A เทียบกับทุก entry ของ B ได้กี่ตัวตามลำดับ",
    "options": [
      "4 และ 4",
      "8 และ 2",
      "2 และ 8",
      "1 และ 8"
    ],
    "correct": 2,
    "explanation": "A เลือกหนึ่ง set ก่อนแล้วค้นใน 2ways จึงเทียบได้ 2tags ส่วน fully associative ต้องพิจารณาทุก entry ทั้ง 8 เป็นเหตุผลหนึ่งที่ associativity สูงเพิ่มต้นทุนการค้น",
    "from": 45,
    "to": 47,
    "level": "medium",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "compare",
      "audioFrom": 3996.77,
      "audioTo": 4194.53,
      "anchor": "เปรียบเทียบทางเลือกการวางเมื่อเพิ่ม associativity",
      "recordingId": "lecture-2026-10-25"
    }
  },
  {
    "topic": "ca04",
    "id": "ca04:53",
    "prompt": "ใช้แบบจำลอง AMAT=hit time+miss rate×miss penalty โดย penalty เป็นเวลาที่เพิ่มจาก hit time ถ้า AMAT=3ns, hit time=1ns และ miss rate=10% จะได้ miss penalty เท่าไร",
    "options": [
      "2ns",
      "0.2ns",
      "30ns",
      "20ns"
    ],
    "correct": 3,
    "explanation": "จัดรูปเป็น penalty=(3−1)/0.10=20ns ต้องหัก hit time ก่อนและแปลง 10%เป็น 0.10 ไม่ใช่หารด้วย 10 ตรง ๆ",
    "from": 43,
    "to": 43,
    "level": "hard",
    "set": 4,
    "provenance": {
      "kind": "style-transfer",
      "pattern": "calculate",
      "audioFrom": 393.02,
      "audioTo": 485.39,
      "anchor": "จัดรูปสูตรเวลาและอัตราส่วนจากค่าที่กำหนด",
      "recordingId": "lecture-2026-10-25"
    }
  }
]];
