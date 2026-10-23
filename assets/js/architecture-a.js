// สรุปอ้างอิงจากเอกสารเรียนที่ให้มา; เลข from/to คือหน้า PDF จริง (นับจาก 1)
// คำถามทุกข้อเป็น [EXAM PRACTICE] ที่สร้างใหม่; คำอธิบายประยุกต์หลักจากหน้าที่ระบุ
// ไม่มีการคัดลอกไฟล์ PDF หรืออัปโหลดเอกสารจากไฟล์ข้อมูลนี้
window.ARCH_CHAPTERS = [...(window.ARCH_CHAPTERS || []), ...[
  {
    "id": "ca01",
    "number": 1,
    "title": "รู้จักคอมพิวเตอร์และวัดความเร็ว",
    "english": "Computer Components & Architecture",
    "pdf": "materials/itds211/chapter01.pdf",
    "pages": 43,
    "sections": [
      {
        "title": "Architecture กับ Organization",
        "body": "Architecture คือสิ่งที่โปรแกรมเมอร์มองเห็น เช่น ชุดคำสั่ง ชนิดข้อมูล และ addressing modes ส่วน Organization คือวิธีทำให้สิ่งเหล่านั้นเกิดขึ้นจริง เช่น cache, pipeline และการเชื่อมวงจร การออกแบบต้องพิจารณาประสิทธิภาพร่วมกับราคา พลังงาน และความพร้อมใช้งาน",
        "to": 4,
        "from": 3
      },
      {
        "title": "ประเภทเครื่องและบริการ Cloud",
        "body": "Supercomputer เน้นงานคำนวณวิทยาศาสตร์ขนาดใหญ่ ส่วน embedded computer เป็นส่วนหนึ่งของผลิตภัณฑ์และมีข้อจำกัดด้านพลังงาน ราคา หรือเวลา Cloud เปิดให้ใช้ทรัพยากรร่วมผ่านเครือข่าย: IaaS ให้โครงสร้างพื้นฐาน, PaaS ให้แพลตฟอร์มรันแอป และ SaaS ให้ซอฟต์แวร์สำเร็จรูป",
        "to": 8,
        "from": 5
      },
      {
        "title": "จากโปรแกรมสู่ฮาร์ดแวร์",
        "body": "ภาษา high-level ช่วยสื่อปัญหาและพัฒนาโปรแกรม ส่วน assembly เป็นข้อความแทนคำสั่งเครื่อง Compiler แปลภาษาระดับสูง และ assembler แปลง assembly เป็นรหัสเครื่อง ระบบปฏิบัติการดูแล I/O หน่วยความจำ การจัดเก็บ และการแบ่งใช้ทรัพยากร",
        "to": 12,
        "from": 9
      },
      {
        "title": "CPU และวงรอบคำสั่ง",
        "body": "ระบบมี input, output, CPU, หน่วยความจำ และที่เก็บข้อมูล ภายใน CPU มี control unit ควบคุมงาน, ALU คำนวณ และ registers เก็บข้อมูลใกล้หน่วยคำนวณ วงรอบพื้นฐานคือ fetch → decode → execute → store; PC ใช้ติดตามตำแหน่งคำสั่ง ส่วน IR ถือคำสั่งที่นำมาแล้ว",
        "to": 16,
        "from": 13
      },
      {
        "title": "Cache, Core และ Thread",
        "body": "Cache เล็กและเร็วกว่า main memory โดย L1 อยู่ใกล้ core ที่สุด และมี L2/L3 ช่วยรองรับข้อมูลถัดไป Multicore เพิ่มหน่วยประมวลผลทางกายภาพ ส่วน hardware multithreading ช่วยให้ core เดียวจัดการหลาย thread จึงไม่ควรนับ thread เพิ่มเป็น core ทางกายภาพ",
        "to": 23,
        "from": 17
      },
      {
        "title": "จาก Silicon สู่ชิป",
        "body": "กระบวนการผลิตเริ่มจาก silicon ingot ตัดเป็น wafer สร้างลวดลายวงจร ทดสอบ ตัดเป็น die และบรรจุแพ็กเกจ Yield คือสัดส่วน die ที่ทำงานได้บน wafer กราฟในบทแสดงแนวโน้มประสิทธิภาพ single processor ในอดีต ไม่ใช่การรับประกันว่า clock หรือความเร็วจะเพิ่มในอัตราคงที่ตลอดไป",
        "to": 26,
        "from": 24
      },
      {
        "title": "RISC, CISC และ Embedded",
        "body": "RISC ย่อจาก Reduced Instruction Set Computing และ CISC ย่อจาก Complex Instruction Set Computing ARM เป็นตัวอย่างตระกูลที่ใช้แนวคิด RISC และพบในระบบ embedded ระบบ embedded มักผูกกับสภาพแวดล้อมและอาจต้องตอบสนองภายในข้อจำกัด real-time; Cortex-M เป็นตัวอย่างที่เน้นพลังงานต่ำและการจัดการ interrupt",
        "to": 31,
        "from": 27
      },
      {
        "title": "Parallelism และ Flynn",
        "body": "Data-level parallelism ทำงานแบบเดียวกันกับข้อมูลหลายชิ้น ส่วน task-level parallelism ทำหลายงานที่แยกกัน สถาปัตยกรรมรองรับได้ด้วย ILP, vector/GPU, thread และ request parallelism Flynn แบ่งตาม instruction stream และ data stream: SISD, SIMD, MISD และ MIMD",
        "to": 33,
        "from": 32
      },
      {
        "title": "แนวคิดออกแบบและรูปแบบระบบ",
        "body": "แนวคิดสำคัญรวม abstraction, ทำกรณีที่พบบ่อยให้เร็ว, parallelism, pipelining, prediction, memory hierarchy และ redundancy รูปแบบระดับระบบมี monolithic, client-server และ distributed systems ส่วน microservices คือการแยกบริการที่นำไปติดตั้งได้อิสระเป็นหลักในระดับซอฟต์แวร์",
        "to": 34,
        "from": 10
      },
      {
        "title": "วัดความเร็วด้วยเวลา",
        "body": "สำหรับงานเดียวกัน Performance = 1 / execution time ถ้า X เร็วกว่า Y เป็น n เท่า จะได้ n = timeY / timeX Elapsed time รวมการรอ I/O และงานระบบ ส่วน CPU time นับเวลาที่ CPU ประมวลผลงานนั้น จึงต้องเลือกเวลาให้ตรงกับสิ่งที่ต้องการเปรียบเทียบ",
        "to": 37,
        "from": 35
      },
      {
        "title": "Clock และ CPU Time",
        "body": "Clock rate มีหน่วย cycles/s หรือ Hz ส่วน cycle time เป็นวินาทีต่อ cycle และเท่ากับ 1 / clock rate CPU time = clock cycles / clock rate = clock cycles × cycle time การเพิ่ม GHz อาจมาพร้อมจำนวน cycle ที่มากขึ้น จึงต้องพิจารณาทั้งคู่",
        "to": 40,
        "from": 38
      },
      {
        "title": "Instruction Count และ CPI",
        "body": "CPU time = instruction count × CPI / clock rate โดย CPI คือจำนวน cycle เฉลี่ยต่อคำสั่ง ถ้ามีหลายกลุ่มคำสั่ง ให้เฉลี่ย CPI ตามสัดส่วนคำสั่งจริง เปรียบเทียบจาก CPI หรือ GHz เพียงค่าเดียวไม่ได้ และตัวอย่างที่ตัด instruction count ออกต้องสมมติให้จำนวนคำสั่งเท่ากัน",
        "to": 42,
        "from": 41
      }
    ],
    "takeaways": [
      "Architecture คือข้อกำหนดที่โปรแกรมเห็น; Organization คือวิธีสร้างให้ทำงานจริง",
      "CPU มี control unit, ALU และ registers; PC กับ IR มีหน้าที่ต่างกัน",
      "Cache ใช้ความใกล้และความเร็วช่วยลดเวลาเข้าถึงข้อมูล",
      "Multicore และ multithreading เป็นคนละแนวคิด",
      "SIMD ใช้ instruction stream เดียวกับข้อมูลหลาย stream; MIMD ใช้หลายทั้งคู่",
      "CPU time = IC × CPI / clock rate; เปรียบเทียบงานและสมมติฐานให้เหมือนกัน"
    ],
    "questions": [
      {
        "id": "ca01:0",
        "prompt": "ข้อใดเป็นตัวอย่างของ Architecture ที่โปรแกรมเมอร์มองเห็น",
        "options": [
          "ชุดคำสั่งและ addressing modes",
          "ความจุ cache ภายในรุ่นหนึ่ง",
          "วัสดุระบายความร้อนของเครื่อง",
          "การวางตำแหน่งพัดลม"
        ],
        "correct": 0,
        "explanation": "ISA และวิธีอ้างตำแหน่ง operand กระทบการเขียนโปรแกรมโดยตรง ส่วนรายละเอียด cache จัดเป็น Organization ในการแบ่งของบทนี้",
        "to": 4,
        "level": "easy",
        "set": 1,
        "from": 3
      },
      {
        "id": "ca01:1",
        "prompt": "CPU สองรุ่นใช้ ISA เดียวกัน แต่ขนาด cache ต่างกัน สิ่งที่ต่างกันตรงกับข้อใด",
        "options": [
          "ต้องเป็นภาษาเครื่องคนละ ISA เสมอ",
          "Organization",
          "รูปแบบไฟล์ข้อความต้นฉบับ",
          "ชนิดภาษา high-level ของผู้ใช้เท่านั้น"
        ],
        "correct": 1,
        "explanation": "การเปลี่ยน cache เป็นวิธีจัดระบบภายใน ไม่ได้บังคับให้เปลี่ยนชุดคำสั่งที่โปรแกรมเห็น",
        "to": 4,
        "level": "medium",
        "set": 1,
        "from": 3
      },
      {
        "id": "ca01:2",
        "prompt": "ทีมต้องการรันแอปของตนเองบนแพลตฟอร์มที่ผู้ให้บริการดูแล runtime และ OS ตามภาพบริการในบท ควรเลือกอะไร",
        "options": [
          "SaaS ที่ใช้แอปสำเร็จรูปอย่างเดียว",
          "IaaS ที่ลูกค้าต้องดูแล runtime เอง",
          "PaaS",
          "Embedded CPU ที่ไม่มีบริการเครือข่าย"
        ],
        "correct": 2,
        "explanation": "PaaS ให้แพลตฟอร์มรองรับแอป ส่วน SaaS ส่งมอบแอปสำเร็จและ IaaS เหลือภาระส่วนซอฟต์แวร์ให้ลูกค้ามากกว่า",
        "to": 8,
        "level": "hard",
        "set": 1,
        "from": 6
      },
      {
        "id": "ca01:3",
        "prompt": "หน่วยใดทำการคำนวณเลขและตรรกะใน CPU",
        "options": [
          "PC",
          "Power supply",
          "Storage controller",
          "ALU"
        ],
        "correct": 3,
        "explanation": "ALU ประมวลผลเลขและตรรกะ; PC เก็บตำแหน่งคำสั่ง ไม่ใช่หน่วยคำนวณหลัก",
        "to": 16,
        "level": "easy",
        "set": 1,
        "from": 14
      },
      {
        "id": "ca01:4",
        "prompt": "หลัง fetch คำสั่งมาแล้ว ควรเก็บคำสั่งนั้นไว้ในอะไรเพื่อ decode",
        "options": [
          "Instruction Register (IR)",
          "Program Counter (PC)",
          "Output device",
          "Power supply"
        ],
        "correct": 0,
        "explanation": "IR ถือคำสั่งที่ดึงมา ส่วน PC ใช้ติดตามตำแหน่งคำสั่งถัดไป จึงสลับหน้าที่กันไม่ได้",
        "to": 16,
        "level": "medium",
        "set": 1,
        "from": 15
      },
      {
        "id": "ca01:5",
        "prompt": "เครื่องมี 4 physical cores และแต่ละ core รองรับ 2 hardware threads คำอธิบายใดรัดกุมที่สุด",
        "options": [
          "มี 8 physical cores แน่นอน",
          "มี 4 cores และรองรับ 8 hardware threads; ความเร็วไม่จำเป็นต้องเพิ่ม 8 เท่า",
          "มี ALU เพียงหนึ่งชุดทั้งเครื่องเสมอ",
          "ทุกโปรแกรมต้องเร็วขึ้น 2 เท่าเพราะมี 2 threads ต่อ core"
        ],
        "correct": 1,
        "explanation": "Thread เพิ่มช่องทางจัดการงานใน core ไม่ได้เพิ่ม core ทางกายภาพ และผลเร็วขึ้นขึ้นกับงานกับทรัพยากรที่ใช้ร่วมกัน",
        "to": 21,
        "level": "hard",
        "set": 1,
        "from": 19
      },
      {
        "id": "ca01:6",
        "prompt": "Cache ระดับใดอยู่ใกล้ core และมีขนาดเล็กที่สุดตามภาพรวมในบท",
        "options": [
          "L3",
          "Main memory",
          "L1",
          "Disk"
        ],
        "correct": 2,
        "explanation": "บทเรียง cache จาก L1 ใกล้ core ไปยังระดับที่ไกลและใหญ่ขึ้น; disk อยู่ต่ำกว่าหน่วยความจำหลัก",
        "to": 18,
        "level": "easy",
        "set": 1,
        "from": 17
      },
      {
        "id": "ca01:7",
        "prompt": "โปรแกรมวนอ่านข้อมูลเดิมบ่อย ๆ การมี cache ช่วยด้วยเหตุผลใด",
        "options": [
          "แปลงทุกคำสั่งเป็นภาษา high-level",
          "ทำให้ main memory ไม่ต้องมีข้อมูลอีกเลย",
          "ทำให้ทุกการอ่าน disk ใช้เวลาเป็นศูนย์",
          "นำข้อมูลที่น่าจะใช้อีกมาไว้ในหน่วยความจำเล็กและเร็วใกล้ CPU"
        ],
        "correct": 3,
        "explanation": "Cache เก็บสำเนาข้อมูลที่คาดว่าจะใช้เร็ว ๆ นี้ การมี cache ไม่ได้กำจัดการรอหรือแทนหน่วยความจำหลักทั้งหมด",
        "to": 18,
        "level": "medium",
        "set": 1,
        "from": 17
      },
      {
        "id": "ca01:8",
        "prompt": "ถ้า die บน wafer มี 240 ชิ้น ทดสอบผ่าน 180 ชิ้น Yield เป็นเท่าไร",
        "options": [
          "75%",
          "25%",
          "60%",
          "133.3%"
        ],
        "correct": 0,
        "explanation": "Yield = die ที่ทำงานได้ / die ทั้งหมด = 180/240 = 0.75 ต้องใช้จำนวนที่ผ่านเป็นตัวตั้ง",
        "to": 25,
        "level": "hard",
        "set": 1,
        "from": 24
      },
      {
        "id": "ca01:9",
        "prompt": "Compiler มีบทบาทใดในลำดับโปรแกรมที่บทอธิบาย",
        "options": [
          "จ่ายไฟให้ ALU",
          "แปลโปรแกรมภาษาระดับสูงไปสู่รหัสสำหรับเครื่อง",
          "เก็บคำสั่งปัจจุบันแทน IR",
          "เพิ่มจำนวน physical core ขณะรัน"
        ],
        "correct": 1,
        "explanation": "Compiler เป็น system software ที่แปลโปรแกรม; การควบคุมไฟฟ้าและวงจรเป็นหน้าที่ฮาร์ดแวร์",
        "to": 12,
        "level": "easy",
        "set": 2,
        "from": 11
      },
      {
        "id": "ca01:10",
        "prompt": "การเพิ่มความเร็ว I/O อาจช่วย elapsed time มากกว่า CPU time เพราะอะไร",
        "options": [
          "CPU time รวมเวลารอ disk ทุกช่วงเสมอ",
          "Elapsed time นับเฉพาะจำนวนคำสั่ง",
          "Elapsed time รวมการรอ I/O แต่ CPU time เน้นเวลาประมวลผลของงาน",
          "I/O ไม่เกี่ยวกับเวลารันโปรแกรมเลย"
        ],
        "correct": 2,
        "explanation": "Elapsed time รวมการรอและ overhead จึงไวต่อการปรับ I/O; CPU time ไม่รวมเวลารอ I/O โดยตรงแบบเดียวกัน",
        "to": 37,
        "level": "medium",
        "set": 2,
        "from": 9
      },
      {
        "id": "ca01:11",
        "prompt": "งานเดียวกันใช้เวลา A = 8 s และ B = 12 s A มี performance เป็นกี่เท่าของ B",
        "options": [
          "0.67 เท่า",
          "4 เท่า",
          "20 เท่า",
          "1.5 เท่า"
        ],
        "correct": 3,
        "explanation": "PerformanceA/PerformanceB = timeB/timeA = 12/8 = 1.5 การหารกลับทิศจะได้อัตราส่วนที่ผิด",
        "to": 36,
        "level": "hard",
        "set": 2,
        "from": 36
      },
      {
        "id": "ca01:12",
        "prompt": "SIMD หมายถึงข้อใด",
        "options": [
          "หนึ่ง instruction stream ทำงานกับหลาย data streams",
          "หลาย instruction streams กับหนึ่ง data stream",
          "หนึ่ง instruction stream กับหนึ่ง data stream",
          "หลาย instruction streams กับหลาย data streams"
        ],
        "correct": 0,
        "explanation": "SIMD ย่อจาก Single Instruction Multiple Data; หากหลายทั้งคำสั่งและข้อมูลจะเป็น MIMD",
        "to": 33,
        "level": "easy",
        "set": 2,
        "from": 33
      },
      {
        "id": "ca01:13",
        "prompt": "ปรับความสว่างภาพโดยบวกค่าเดียวกันให้พิกเซลจำนวนมาก แนวคิด parallelism ใดตรงที่สุด",
        "options": [
          "การเปลี่ยน opcode ของ ISA ทุกครั้ง",
          "Data-level parallelism",
          "เพิ่มเวลารอ I/O",
          "Serial execution ที่ห้ามแบ่งข้อมูล"
        ],
        "correct": 1,
        "explanation": "ข้อมูลหลายพิกเซลทำ operation แบบเดียวกัน จึงเหมาะกับ DLP และอาจใช้ vector/GPU ตามแนวคิดในบท",
        "to": 33,
        "level": "medium",
        "set": 2,
        "from": 32
      },
      {
        "id": "ca01:14",
        "prompt": "เครื่อง A และ B รันจำนวนคำสั่งเท่ากัน A มี CPI 2 และ cycle time 250 ps; B มี CPI 1.2 และ cycle time 500 ps ข้อใดถูก",
        "options": [
          "B เร็วกว่า A เพราะ CPI ต่ำกว่าเสมอ",
          "A เร็วกว่า B 2 เท่า",
          "A เร็วกว่า B 1.2 เท่า",
          "ทั้งสองใช้เวลาเท่ากัน"
        ],
        "correct": 2,
        "explanation": "เวลาต่อคำสั่งของ A = 500 ps และ B = 600 ps เมื่อ IC เท่ากัน อัตราเร็ว A/B = 600/500 = 1.2",
        "to": 42,
        "level": "hard",
        "set": 2,
        "from": 41
      },
      {
        "id": "ca01:15",
        "prompt": "ข้อใดเป็นคุณลักษณะที่บทเน้นของ embedded system",
        "options": [
          "ต้องเป็น supercomputer เท่านั้น",
          "ต้องมี keyboard แยกเสมอ",
          "ต้องใช้พลังงานโดยไม่มีข้อจำกัด",
          "คอมพิวเตอร์ที่รวมอยู่ในผลิตภัณฑ์และอาจมีข้อจำกัด real-time"
        ],
        "correct": 3,
        "explanation": "Embedded system มักผูกกับสิ่งแวดล้อมของผลิตภัณฑ์และถูกจำกัดราคา พลังงาน และเวลาตอบสนอง",
        "to": 31,
        "level": "easy",
        "set": 2,
        "from": 28
      },
      {
        "id": "ca01:16",
        "prompt": "ข้อใดเป็นตัวอย่างของ client-server",
        "options": [
          "เครื่องลูกส่งคำขอไปยังเครื่องให้บริการ",
          "ทุกงานต้องอยู่ใน core เดียวและห้ามใช้เครือข่าย",
          "ALU บวกเลขใน register",
          "Die ถูกตัดออกจาก wafer"
        ],
        "correct": 0,
        "explanation": "Client-server แบ่งบทบาทผู้ร้องขอและผู้ให้บริการ เป็นรูปแบบระดับระบบ ไม่ใช่การผลิตชิป",
        "to": 34,
        "level": "medium",
        "set": 2,
        "from": 34
      },
      {
        "id": "ca01:17",
        "prompt": "โปรแกรมใช้ 1×10^9 คำสั่ง CPI เฉลี่ย 2 บน CPU 2 GHz สมมติไม่มีเวลานอก CPU เพิ่ม CPU time เท่าไร",
        "options": [
          "0.5 วินาที",
          "1 วินาที",
          "2 วินาที",
          "4 วินาที"
        ],
        "correct": 1,
        "explanation": "CPU time = 10^9 × 2 / (2×10^9) = 1 s ต้องแปลง GHz เป็น cycles/s",
        "to": 41,
        "level": "hard",
        "set": 2,
        "from": 39
      },
      {
        "id": "ca01:18",
        "prompt": "RISC ย่อมาจากอะไร",
        "options": [
          "Random Instruction Storage Cache",
          "Register Integrated Software Compiler",
          "Reduced Instruction Set Computing",
          "Repeated Input System Control"
        ],
        "correct": 2,
        "explanation": "ชื่อ RISC อ้างแนวทางชุดคำสั่ง ส่วน CISC ย่อจาก Complex Instruction Set Computing",
        "to": 27,
        "level": "easy",
        "set": 3,
        "from": 27
      },
      {
        "id": "ca01:19",
        "prompt": "การทำกรณีที่พบบ่อยให้เร็วเป็นแนวคิดใดของบท",
        "options": [
          "ทำทุกเส้นทางให้ซับซ้อนเท่ากัน",
          "เพิ่มเวลาของทุกคำสั่ง",
          "ลบ memory hierarchy ออกจากระบบ",
          "Make the common case fast"
        ],
        "correct": 3,
        "explanation": "ลงทุนกับกรณีที่เกิดบ่อยจะส่งผลต่อเวลารวมมาก เป็นหนึ่งใน Great Ideas ของสถาปัตยกรรม",
        "to": 10,
        "level": "medium",
        "set": 3,
        "from": 9
      },
      {
        "id": "ca01:20",
        "prompt": "A ใช้ 10 s ที่ 2 GHz; B ใช้ cycle มากกว่า A 20% แต่ต้องเสร็จใน 6 s ต้องมี clock rate เท่าไร",
        "options": [
          "4 GHz",
          "2.4 GHz",
          "3.33 GHz",
          "6 GHz"
        ],
        "correct": 0,
        "explanation": "A ใช้ 20×10^9 cycles; B ต้องใช้ 24×10^9 cycles จึงต้องมี clock = 24×10^9/6 = 4 GHz",
        "to": 40,
        "level": "hard",
        "set": 3,
        "from": 39
      },
      {
        "id": "ca01:21",
        "prompt": "Clock rate 4 GHz มี cycle time เท่าไร",
        "options": [
          "4 ns",
          "0.25 ns",
          "0.25 s",
          "4 ms"
        ],
        "correct": 1,
        "explanation": "Cycle time = 1/(4×10^9) s = 0.25×10^-9 s หรือ 0.25 ns",
        "to": 39,
        "level": "easy",
        "set": 3,
        "from": 38
      },
      {
        "id": "ca01:22",
        "prompt": "ถ้าเปลี่ยน algorithm จนจำนวน operations ลดลง จุดใดใน performance stack เปลี่ยนโดยตรงที่สุด",
        "options": [
          "จำนวน die บน wafer",
          "แรงดันของ power supply ที่กำหนดคงที่",
          "ปริมาณงานที่โปรแกรมต้องทำ",
          "ชนิดขั้วต่อจอภาพ"
        ],
        "correct": 2,
        "explanation": "Algorithm กำหนดจำนวน operations ส่วนภาษา compiler และ ISA กำหนดจำนวนคำสั่งต่อ operation อีกชั้นหนึ่ง",
        "to": 9,
        "level": "medium",
        "set": 3,
        "from": 9
      },
      {
        "id": "ca01:23",
        "prompt": "โปรแกรมมีคำสั่ง 60% CPI 1 และ 40% CPI 3 บน CPU 2 GHz ถ้ามี 10^9 คำสั่ง CPU time เท่าไร",
        "options": [
          "0.5 วินาที",
          "1.5 วินาที",
          "1.8 วินาที",
          "0.9 วินาที"
        ],
        "correct": 3,
        "explanation": "CPI เฉลี่ย = 0.6×1 + 0.4×3 = 1.8; เวลา = 10^9×1.8/(2×10^9) = 0.9 s",
        "to": 42,
        "level": "hard",
        "set": 3,
        "from": 41
      },
      {
        "id": "ca01:24",
        "prompt": "MIMD หมายถึงข้อใด",
        "options": [
          "หลาย instruction streams และหลาย data streams",
          "หนึ่ง instruction stream และหลาย data streams",
          "หลาย instruction streams และหนึ่ง data stream",
          "หนึ่ง instruction stream และหนึ่ง data stream"
        ],
        "correct": 0,
        "explanation": "MIMD คือ Multiple Instruction Multiple Data ต่างจาก SIMD ซึ่งมี instruction stream เดียว",
        "to": 33,
        "level": "easy",
        "set": 3,
        "from": 32
      },
      {
        "id": "ca01:25",
        "prompt": "ระบบแยกบริการย่อยให้แต่ละบริการติดตั้งได้อิสระ ตรงกับรูปแบบใด",
        "options": [
          "Instruction register",
          "Microservices",
          "Yield",
          "Clock period"
        ],
        "correct": 1,
        "explanation": "Microservices เป็นรูปแบบการแยกบริการในซอฟต์แวร์ระดับระบบ ไม่ใช่ส่วนประกอบภายใน CPU",
        "to": 34,
        "level": "medium",
        "set": 3,
        "from": 34
      },
      {
        "id": "ca01:26",
        "prompt": "เครื่องเดิมทำงาน 10 s โดยใช้ CPU 4 s และรอ I/O 6 s ถ้าลดเฉพาะ CPU time ลงครึ่งหนึ่ง เวลารวมใหม่เท่าไร (สมมติไม่ซ้อนทับงาน)",
        "options": [
          "5 วินาที",
          "2 วินาที",
          "8 วินาที",
          "3 วินาที"
        ],
        "correct": 2,
        "explanation": "CPU เหลือ 2 s แต่ I/O ยัง 6 s จึงรวม 8 s การเร็วขึ้นของ CPU ไม่ทำให้เวลารอหายไป",
        "to": 39,
        "level": "hard",
        "set": 3,
        "from": 37
      }
    ]
  },
  {
    "id": "ca02",
    "number": 2,
    "title": "วงรอบคำสั่งและ Interrupt",
    "english": "Computer Functions & Processor Structure",
    "pdf": "materials/itds211/chapter02.pdf",
    "pages": 46,
    "sections": [
      {
        "title": "Von Neumann และ Harvard",
        "body": "Von Neumann ใช้แนวคิด stored program โดยคำสั่งและข้อมูลอยู่ในหน่วยความจำร่วมกันและอ้างด้วย address Harvard แยกหน่วยความจำกับ bus สำหรับคำสั่งและข้อมูล จึงลดการแข่งขันช่องทางแต่เพิ่มความซับซ้อน บางระบบผสมทั้งสอง เช่น แยกที่ L1 แต่ใช้ main memory ร่วม",
        "to": 4,
        "from": 3
      },
      {
        "title": "Bus และการแย่งสิทธิ์",
        "body": "Bus ประกอบด้วย data lines ส่งข้อมูล, address lines ระบุตำแหน่ง และ control lines ควบคุมทิศทางกับจังหวะ Multipoint bus เป็นทรัพยากรร่วมจึงต้องมี arbitration เมื่อมีหลาย master วิธีในบทมี daisy chain, centralized parallel, distributed self-detection และ collision-detection",
        "to": 7,
        "from": 5
      },
      {
        "title": "Hardware ทำตาม Software",
        "body": "Software คือชุดคำสั่งที่ฮาร์ดแวร์แปลเป็น control signals เพื่อใช้งานหน่วยคำนวณทั่วไป การเปลี่ยนโปรแกรมจึงเปลี่ยนลำดับรหัสได้โดยไม่ต้องเดินวงจรใหม่ CPU, memory และ I/O เชื่อมกันผ่านระบบ bus",
        "to": 11,
        "from": 8
      },
      {
        "title": "Register ที่ต้องแยกหน้าที่",
        "body": "PC ถือ address ของคำสั่งที่จะ fetch และ IR ถือคำสั่งที่อ่านมาแล้ว MAR ระบุ address สำหรับอ่านหรือเขียน memory ส่วน MBR ถือข้อมูลที่รับหรือส่ง I/OAR ระบุอุปกรณ์และ I/OBR เป็น buffer แลกข้อมูลกับ I/O",
        "to": 13,
        "from": 10
      },
      {
        "title": "Fetch, Decode, Execute",
        "body": "เริ่มจากนำ PC ไปใช้หา address ของคำสั่ง อ่านคำสั่งเข้า IR แล้วขยับ PC ไปคำสั่งลำดับถัดไป Decode ระบุ operation และ operand; ถ้าต้องอ่าน operand จาก memory จึงค่อยนำเข้ามา การ execute อาจคำนวณ เก็บผล หรือเปลี่ยนเส้นทางควบคุม จึงไม่ใช่ทุกคำสั่งต้องผ่านการอ่านข้อมูลแบบเดียวกัน",
        "to": 15,
        "from": 12
      },
      {
        "title": "MARIE เป็นเครื่องตัวอย่าง",
        "body": "MARIE มี AC และ MBR 16 บิต, MAR และ PC 12 บิต รวมถึง InREG/OutREG 8 บิต Address 12 บิตอ้างได้ 4096 ตำแหน่ง คำสั่ง 16 บิตแบ่ง opcode 4 บิตและ address 12 บิต; ต้องใช้ opcode ของ MARIE แยกจากเครื่องสมมติในหน้า 14",
        "to": 24,
        "from": 17
      },
      {
        "title": "RTL และ Microoperations",
        "body": "คำสั่งหนึ่งประกอบด้วย microoperations หลายขั้นซึ่งเขียนด้วย register transfer language ได้ M[X] หมายถึงข้อมูลใน memory address X และลูกศร ← หมายถึงการย้ายค่า LOAD X ทำ MAR ← X, MBR ← M[MAR], AC ← MBR; ADD X ต่างที่ขั้นสุดท้ายเป็น AC ← AC + MBR",
        "to": 29,
        "from": 25
      },
      {
        "title": "SKIPCOND และจุดพิมพ์ผิด",
        "body": "SKIPCOND ตรวจค่า AC แล้วอาจข้ามคำสั่งถัดไป โดยเพิ่ม PC อีก 1 ตำแหน่งจากค่าหลัง fetch ตัวอย่างหน้า 24 ใช้บิตเงื่อนไข 10 สำหรับ AC > 0 แต่ RTL หน้า 27 พิมพ์เป็น 11 จึงใช้ค่า 10 ตามตัวอย่างบิต ในตารางหน้า 35 คำว่า Store 106 ไม่สอดคล้องกับรหัส 4106; ตาราง ISA หน้า 22 กำหนด Store เป็น opcode 2",
        "to": 35,
        "from": 22
      },
      {
        "title": "Interrupt และ ISR",
        "body": "Interrupt เปิดทางให้ CPU หยุดลำดับงานชั่วคราวไปจัดการเหตุการณ์ เช่น I/O, timer หรือข้อผิดพลาด CPU เก็บสถานะที่จำเป็น หา address ของ Interrupt Service Routine (ISR) แล้วโอนการควบคุมไป เมื่อทำเสร็จต้องคืนสถานะและกลับไปทำงานเดิมให้ถูกจุด",
        "to": 33,
        "from": 30
      },
      {
        "title": "Maskable และ Programmed I/O",
        "body": "Maskable interrupt สามารถระงับด้วยกลไกควบคุม interrupt ได้ ส่วน nonmaskable ใช้กับเหตุการณ์สำคัญที่ต้องรับมือ ในแบบ MARIE อย่างง่าย CPU polling InREG จนมีข้อมูลแล้วคัดลอกเข้า AC และส่ง output ผ่าน OutREG การ polling กับ interrupt-driven I/O จึงใช้เวลาของ CPU ต่างกัน",
        "to": 37,
        "from": 33
      },
      {
        "title": "Interrupt ลดการรออย่างไร",
        "body": "ขณะอุปกรณ์ I/O ทำงาน CPU อาจกลับไปทำส่วนอื่นของโปรแกรม แล้วค่อยรับ interrupt เมื่ออุปกรณ์เสร็จ ถ้างานอิสระหมดก่อน I/O เสร็จ CPU ก็ยังต้องรอได้ จึงไม่ควรสรุปว่า interrupt ทำให้ I/O เร็วขึ้นหรือทำให้เวลา idle หายไปทุกกรณี",
        "to": 43,
        "from": 38
      },
      {
        "title": "หลาย Interrupt",
        "body": "Sequential interrupt processing จัดการ handler หนึ่งให้จบก่อนรับตัวถัดไป ส่วน nested processing ยอมให้ handler ที่เหมาะสม เช่น priority สูงกว่า แทรก handler ที่กำลังทำงานได้ ต้องเก็บและคืนสถานะเป็นลำดับเพื่อกลับไปทำ handler เดิมก่อนกลับ user program",
        "to": 45,
        "from": 44
      }
    ],
    "takeaways": [
      "Von Neumann ใช้หน่วยความจำคำสั่ง/ข้อมูลร่วม; Harvard แยกช่องทาง",
      "Data bus ส่งค่า, address bus ระบุตำแหน่ง, control bus ควบคุมจังหวะ",
      "PC ไม่ใช่ IR; MAR ไม่ใช่ MBR",
      "MARIE: คำสั่ง 16 บิต = opcode 4 + address 12; อย่าปน opcode กับเครื่องตัวอย่างอื่น",
      "Interrupt ต้องรักษาสถานะก่อนเข้า ISR และคืนสถานะเมื่อกลับ",
      "Interrupt ช่วยซ้อนทับงาน CPU กับ I/O แต่ไม่ได้ลดเวลาของอุปกรณ์โดยตรง"
    ],
    "questions": [
      {
        "id": "ca02:0",
        "prompt": "รูปแบบใดเก็บคำสั่งและข้อมูลในหน่วยความจำร่วมตาม stored-program concept",
        "options": [
          "Harvard แบบแยก memory อย่างสมบูรณ์",
          "Von Neumann",
          "Daisy chain",
          "Interrupt vector table"
        ],
        "correct": 1,
        "explanation": "Von Neumann ใช้ memory ร่วมสำหรับคำสั่งและข้อมูล ส่วน Harvard แยกทั้ง memory และ bus ของสองส่วน",
        "to": 4,
        "level": "easy",
        "set": 1,
        "from": 3
      },
      {
        "id": "ca02:1",
        "prompt": "แยก instruction cache และ data cache ที่ L1 แต่ใช้ main memory ร่วม ควรอธิบายอย่างไร",
        "options": [
          "เป็นไปไม่ได้ในคอมพิวเตอร์",
          "เป็น Harvard ทุกระดับอย่างเดียว",
          "เป็นแนวทางผสม Harvard ที่ L1 กับ Von Neumann ที่ main memory",
          "แปลว่าไม่มี stored program"
        ],
        "correct": 2,
        "explanation": "บทระบุ hybrid approach นี้โดยตรง การจัด memory แต่ละระดับไม่จำเป็นต้องเหมือนกัน",
        "to": 4,
        "level": "medium",
        "set": 1,
        "from": 3
      },
      {
        "id": "ca02:2",
        "prompt": "หลายอุปกรณ์ขอเป็น bus master พร้อมกันบน multipoint bus สิ่งใดจำเป็นที่สุด",
        "options": [
          "เพิ่ม IR ให้เป็น address register ของทุกอุปกรณ์",
          "ให้ทุกอุปกรณ์ขับ data lines พร้อมกันเสมอ",
          "ห้ามมี control lines",
          "กลไก arbitration เพื่อเลือกผู้ใช้ bus ในขณะนั้น"
        ],
        "correct": 3,
        "explanation": "Bus ที่แชร์กันต้องตัดสินสิทธิ์ ไม่เช่นนั้นอาจส่งข้อมูลชนกัน การมีหลาย master จึงต้องมี arbitration",
        "to": 7,
        "level": "hard",
        "set": 1,
        "from": 5
      },
      {
        "id": "ca02:3",
        "prompt": "Address lines ใช้ทำอะไร",
        "options": [
          "ระบุตำแหน่งต้นทางหรือปลายทางของข้อมูล",
          "คำนวณบวกใน ALU",
          "เก็บค่า AC ถาวร",
          "แปลภาษา C เป็น binary"
        ],
        "correct": 0,
        "explanation": "Address lines ระบุตำแหน่ง; data lines จึงค่อยส่งข้อมูล และ control lines กำหนดจังหวะกับทิศทาง",
        "to": 6,
        "level": "easy",
        "set": 1,
        "from": 5
      },
      {
        "id": "ca02:4",
        "prompt": "อุปกรณ์ได้รับสิทธิ์ bus ต่อกันจากลำดับสูงไปต่ำ ตรงกับวิธีใด",
        "options": [
          "Centralized parallel",
          "Daisy chain",
          "Distributed collision-detection",
          "Fetch-decode-execute"
        ],
        "correct": 1,
        "explanation": "Daisy chain ส่งสิทธิ์เป็นสายตามลำดับ ส่วน centralized parallel ต่อทุกอุปกรณ์เข้าวงจรตัดสินโดยตรง",
        "to": 7,
        "level": "medium",
        "set": 1,
        "from": 7
      },
      {
        "id": "ca02:5",
        "prompt": "ถ้า CPU ตั้ง MAR = 0x120 และอ่าน memory ได้ค่า 0xABCD ข้อใดถูกหลังการอ่าน",
        "options": [
          "MAR ต้องกลายเป็น 0xABCD และ MBR เป็น 0x120",
          "IR ต้องเก็บ address0x120 เสมอ",
          "MBR ถือ 0xABCD ขณะที่ MAR ระบุตำแหน่ง 0x120",
          "PC ต้องเท่ากับ 0xABCD เสมอ"
        ],
        "correct": 2,
        "explanation": "MAR ใช้บอกว่าจะอ่านที่ใด ส่วน MBR รับค่าที่อ่านได้ ข้อมูลไม่ได้บังคับให้เปลี่ยน PC หรือ IR",
        "to": 11,
        "level": "hard",
        "set": 1,
        "from": 10
      },
      {
        "id": "ca02:6",
        "prompt": "Register ใดถือ address ของคำสั่งที่จะ fetch ถัดไป",
        "options": [
          "IR",
          "MBR",
          "OutREG",
          "PC"
        ],
        "correct": 3,
        "explanation": "PC คือ program counter; IR ถือเนื้อหาคำสั่ง ส่วน MBR เป็น buffer ข้อมูล memory",
        "to": 17,
        "level": "easy",
        "set": 1,
        "from": 13
      },
      {
        "id": "ca02:7",
        "prompt": "คำสั่งที่ไม่ต้องอ่าน operand จาก memory จำเป็นต้องมีขั้นอ่าน operand เข้า MBR เสมอหรือไม่",
        "options": [
          "ไม่จำเป็น เพราะขั้นดังกล่าวขึ้นกับชนิดคำสั่ง",
          "จำเป็นเพราะทุกคำสั่งเป็น LOAD",
          "ไม่จำเป็นต้อง fetch คำสั่งด้วย",
          "จำเป็นเพราะ PC คือข้อมูล operand"
        ],
        "correct": 0,
        "explanation": "แผนภาพ decode แยกเส้นทางตามว่าคำสั่งต้องใช้ operand จาก memory หรือไม่ แต่ยังต้อง fetch และ decode คำสั่ง",
        "to": 29,
        "level": "medium",
        "set": 1,
        "from": 28
      },
      {
        "id": "ca02:8",
        "prompt": "MARIE มี MAR 12 บิต แต่ละ address ระบุหนึ่งตำแหน่ง memory จะอ้างได้กี่ตำแหน่ง",
        "options": [
          "12 ตำแหน่ง",
          "4096 ตำแหน่ง",
          "2048 ตำแหน่ง",
          "65536 ตำแหน่ง"
        ],
        "correct": 1,
        "explanation": "12 บิตมีรูปแบบได้ 2^12 = 4096 ค่า ตั้งแต่ 0 ถึง 4095 อย่านำความกว้างข้อมูล 16 บิตมาแทนความกว้าง address",
        "to": 18,
        "level": "hard",
        "set": 1,
        "from": 17
      },
      {
        "id": "ca02:9",
        "prompt": "คำสั่ง MARIE 16 บิตแบ่ง opcode และ address อย่างไร",
        "options": [
          "Opcode 8 บิต + address 8 บิต",
          "Opcode 12 บิต + address 4 บิต",
          "Opcode 4 บิต + address 12 บิต",
          "Opcode 5 บิต + address 11 บิต"
        ],
        "correct": 2,
        "explanation": "ภาพ format กำหนด opcode ที่บิต 15–12 และ address ที่บิต 11–0",
        "to": 23,
        "level": "easy",
        "set": 2,
        "from": 22
      },
      {
        "id": "ca02:10",
        "prompt": "LOAD X และ ADD X ของ MARIE ต่างกันตรงผลที่ AC อย่างไร",
        "options": [
          "LOAD และ ADD ล้าง AC เป็นศูนย์เหมือนกัน",
          "ADD แทนค่า AC โดยไม่อ่านค่าเดิม",
          "LOAD เพิ่ม PC ตามค่า AC",
          "LOAD แทนค่า AC ด้วย M[X]; ADD บวก M[X] เข้ากับค่า AC เดิม"
        ],
        "correct": 3,
        "explanation": "ทั้งคู่ตั้ง MAR และอ่านผ่าน MBR แต่ LOAD ทำ AC←MBR ส่วน ADD ทำ AC←AC+MBR",
        "to": 26,
        "level": "medium",
        "set": 2,
        "from": 25
      },
      {
        "id": "ca02:11",
        "prompt": "กำหนด AC=7, M[20]=5 เมื่อรัน LOAD 20 แล้ว ADD 20 ของ MARIE จะได้ AC เท่าไร",
        "options": [
          "10",
          "12",
          "5",
          "17"
        ],
        "correct": 0,
        "explanation": "LOAD ทำ AC=5 แทนค่า 7 ก่อน แล้ว ADD เพิ่ม 5 จึงได้ 10; การนำ 7 มาบวกต่อแสดงว่าสับสน LOAD กับ ADD",
        "to": 26,
        "level": "hard",
        "set": 2,
        "from": 26
      },
      {
        "id": "ca02:12",
        "prompt": "ใน RTL สัญลักษณ์ M[X] หมายถึงอะไร",
        "options": [
          "จำนวนบิตของ X",
          "ค่าที่เก็บใน memory ตำแหน่ง X",
          "ชื่อ opcode เสมอ",
          "address ของ IR เสมอ"
        ],
        "correct": 1,
        "explanation": "M[X] คือเนื้อหาในตำแหน่ง X ต่างจาก X ซึ่งใช้เป็น address",
        "to": 26,
        "level": "easy",
        "set": 2,
        "from": 25
      },
      {
        "id": "ca02:13",
        "prompt": "ตามตัวอย่างบิต SKIPCOND หน้า 24 เงื่อนไข AC > 0 ใช้บิต 11–10 เป็นค่าใด",
        "options": [
          "00",
          "01",
          "10",
          "11"
        ],
        "correct": 2,
        "explanation": "หน้า 24 ระบุ 10 สำหรับ AC>0; หน้า 27 มีตัวพิมพ์ผิดเป็น 11 จึงไม่ใช้ 11 เป็นคำตอบ",
        "to": 27,
        "level": "medium",
        "set": 2,
        "from": 24
      },
      {
        "id": "ca02:14",
        "prompt": "MARIE fetch SKIPCOND จาก address100 แล้ว PC เป็น 101 หากเข้าเงื่อนไขข้ามคำสั่ง คำสั่งถัดไปที่ fetch อยู่ที่ใด (ทุก address เป็นฐานสิบ)",
        "options": [
          "100",
          "101",
          "103",
          "102"
        ],
        "correct": 3,
        "explanation": "หลัง fetch PC ไป 101 แล้ว การ skip เพิ่ม PC อีก 1 จึงไป 102 ไม่ใช่เพิ่มสองจากค่าหลัง fetch",
        "to": 27,
        "level": "hard",
        "set": 2,
        "from": 13
      },
      {
        "id": "ca02:15",
        "prompt": "ISR ย่อมาจากอะไร",
        "options": [
          "Interrupt Service Routine",
          "Instruction Storage Register",
          "Input Sequence Reset",
          "Internal Software Rate"
        ],
        "correct": 0,
        "explanation": "ISR คือโปรแกรมจัดการ interrupt ไม่ใช่ register เก็บคำสั่ง",
        "to": 32,
        "level": "easy",
        "set": 2,
        "from": 31
      },
      {
        "id": "ca02:16",
        "prompt": "ก่อนโอนไป ISR เหตุใดต้องเก็บ register และสถานะที่จำเป็น",
        "options": [
          "เพื่อเปลี่ยน ISA ของ CPU",
          "เพื่อคืนสภาพงานเดิมและกลับมาทำต่อถูกจุด",
          "เพื่อไม่ต้องมี main memory อีก",
          "เพื่อให้ทุก interrupt เปลี่ยนผลลัพธ์เดิมเสมอ"
        ],
        "correct": 1,
        "explanation": "Handler อาจใช้ register เดียวกับโปรแกรม จึงต้องรักษาสถานะที่จำเป็นก่อนใช้และคืนตอนกลับ",
        "to": 39,
        "level": "medium",
        "set": 2,
        "from": 32
      },
      {
        "id": "ca02:17",
        "prompt": "CPU กำลังรอรับ input โดยตรวจ InREG ซ้ำ ๆ รูปแบบนี้มีข้อเสียใดเมื่อเทียบกับการไปทำงานอิสระระหว่างรอ",
        "options": [
          "ทุก byte จะกลายเป็น opcode เสมอ",
          "อุปกรณ์รับข้อมูลไม่ได้อีกเลย",
          "CPU ใช้เวลาในการ polling แม้ข้อมูลยังไม่พร้อม",
          "การ polling เพิ่มจำนวน physical cores"
        ],
        "correct": 2,
        "explanation": "Programmed I/O แบบ polling ให้ CPU ตรวจสถานะวนซ้ำ จึงกินเวลาที่อาจใช้ทำงานอื่นได้",
        "to": 41,
        "level": "hard",
        "set": 2,
        "from": 34
      },
      {
        "id": "ca02:18",
        "prompt": "เหตุการณ์จาก timer มีบทบาทใดตามบท",
        "options": [
          "บังคับให้ทุกคำสั่งเป็นบวกเลข",
          "เก็บข้อมูลถาวรแทน disk",
          "เพิ่ม address space โดยอัตโนมัติ",
          "เปิดโอกาสให้ OS ทำงานตามช่วงเวลา"
        ],
        "correct": 3,
        "explanation": "Timer interrupt ทำให้ระบบปฏิบัติการได้รับการควบคุมเป็นระยะ ไม่ใช่กลไกเพิ่มพื้นที่หรือความกว้างคำสั่ง",
        "to": 37,
        "level": "easy",
        "set": 3,
        "from": 37
      },
      {
        "id": "ca02:19",
        "prompt": "ข้อใดเป็นตัวอย่าง program interrupt ตามตารางในบท",
        "options": [
          "การหารด้วยศูนย์ขณะ execute คำสั่ง",
          "เครื่องพิมพ์แจ้งพิมพ์เสร็จ",
          "timer ครบเวลา",
          "ไฟเลี้ยงอุปกรณ์ล้มเหลว"
        ],
        "correct": 0,
        "explanation": "หารด้วยศูนย์เกิดจากการ execute คำสั่ง จัดเป็น program; อีกสามกรณีเป็น I/O, timer และ hardware failure",
        "to": 37,
        "level": "medium",
        "set": 3,
        "from": 37
      },
      {
        "id": "ca02:20",
        "prompt": "งานอิสระของ CPU ระหว่างรอ I/O ใช้ 2 ms แต่อุปกรณ์ต้องใช้ 5 ms แม้ใช้ interrupt แล้วเหตุใดยังอาจ idle3 ms (ไม่คิด overhead)",
        "options": [
          "Interrupt บังคับให้รอเพิ่ม 3 ms เสมอ",
          "งานอิสระหมดก่อนอุปกรณ์พร้อม จึงยังต้องรอส่วนที่เหลือ",
          "ISR ต้องใช้ 3 ms โดยนิยาม",
          "Interrupt เปลี่ยน I/O5 ms ให้เป็น 2 ms ไม่ได้จึงหยุด CPU ตลอด 5 ms"
        ],
        "correct": 1,
        "explanation": "Interrupt ช่วยซ้อนทับ 2 ms แรกกับ I/O แต่ไม่ลดเวลาอุปกรณ์; หลังงานอิสระหมดจึงยังรอ 5−2=3 ms",
        "to": 42,
        "level": "hard",
        "set": 3,
        "from": 38
      },
      {
        "id": "ca02:21",
        "prompt": "Maskable interrupt หมายถึงข้อใด",
        "options": [
          "Interrupt ที่ต้องทำให้เครื่องเสียเสมอ",
          "Interrupt ที่ไม่มี handler",
          "Interrupt ที่สามารถระงับด้วยกลไกควบคุมได้",
          "Interrupt ที่เกิดจากซอฟต์แวร์เท่านั้น"
        ],
        "correct": 2,
        "explanation": "Maskable อ้างถึงการ mask หรือระงับได้ ไม่ใช่แหล่งกำเนิด; nonmaskable ใช้กับเหตุสำคัญที่ต้องรับมือ",
        "to": 33,
        "level": "easy",
        "set": 3,
        "from": 33
      },
      {
        "id": "ca02:22",
        "prompt": "การมี interrupt-driven I/O ช่วยให้ CPU ทำงานอื่นระหว่างอุปกรณ์ทำงานได้ เพราะอะไร",
        "options": [
          "เพราะทุก I/O ใช้เวลา 0 วินาที",
          "เพราะไม่ต้องรักษาสถานะ CPU",
          "เพราะคำสั่งไม่ต้อง fetch อีกต่อไป",
          "อุปกรณ์ส่งสัญญาณเมื่อจำเป็น แทนการให้ CPU ตรวจรอตลอดเวลา"
        ],
        "correct": 3,
        "explanation": "Interrupt เปลี่ยนวิธีรับรู้ความพร้อม จึงเปิดโอกาสให้ใช้ CPU ทำงานอื่นระหว่างรอ โดยยังมี overhead ของ handler",
        "to": 42,
        "level": "medium",
        "set": 3,
        "from": 38
      },
      {
        "id": "ca02:23",
        "prompt": "ใน nested interrupt, handler Y แทรก X แล้ว Y เสร็จ หากยังมีงานใน X ควรกลับไปที่ใดก่อน",
        "options": [
          "กลับไปทำ X ต่อ แล้วจึงกลับ user program เมื่อ X เสร็จ",
          "ข้าม X กลับ user program ทันทีทุกกรณี",
          "เริ่ม user program ตั้งแต่คำสั่งแรก",
          "ลบสถานะของ X ก่อนคืนจาก Y"
        ],
        "correct": 0,
        "explanation": "การแทรกแบบซ้อนต้องคืนสถานะตามลำดับ Y→X→user program ไม่เช่นนั้นงานของ X จะขาดหาย",
        "to": 45,
        "level": "hard",
        "set": 3,
        "from": 44
      },
      {
        "id": "ca02:24",
        "prompt": "Sequential interrupt processing ต่างจาก nested อย่างไร",
        "options": [
          "ทุก handler ต้องรันพร้อมกันจริงใน ALU เดียว",
          "จัดการ handler หนึ่งจบก่อนเริ่ม handler ถัดไป",
          "ไม่เคยบันทึก PC",
          "ใช้ได้เฉพาะ interrupt จาก timer"
        ],
        "correct": 1,
        "explanation": "Sequential เป็นการต่อคิวจัดการ ส่วน nested ยอมให้ handler อื่นแทรกกลาง handler ปัจจุบันตามกติกา",
        "to": 45,
        "level": "easy",
        "set": 3,
        "from": 44
      },
      {
        "id": "ca02:25",
        "prompt": "เครื่องสมมติหน้า 14 ใช้ opcode0101 สำหรับ ADD แต่ MARIE หน้า 22 ใช้ 0011 ข้อใดควรทำเมื่ออ่านรหัส",
        "options": [
          "ถือว่า 0101 เป็น ADD ในทุก ISA",
          "ถือว่า 0011 เป็น ADD ในทุก ISA",
          "เลือกตาราง ISA ของเครื่องที่โจทย์ระบุ",
          "ดูเฉพาะความกว้างข้อมูลแล้วใช้ opcode แทนกัน"
        ],
        "correct": 2,
        "explanation": "Opcode เป็นข้อตกลงของแต่ละ ISA การใช้รหัสข้ามเครื่องทำให้ decode operation ผิด",
        "to": 22,
        "level": "medium",
        "set": 3,
        "from": 14
      },
      {
        "id": "ca02:26",
        "prompt": "ตารางตัวอย่าง MARIE เขียน Store106 แต่ให้รหัส 4106 ขณะที่ ISA ระบุ Store opcode2 ถ้าตั้งใจ Store106 ควรใช้รหัส hex ใด",
        "options": [
          "4106",
          "3106",
          "1106",
          "2106"
        ],
        "correct": 3,
        "explanation": "Opcode4 คือ Subt ในตาราง MARIE; Store ใช้ 2 จึงต้องเป็น 2106 เมื่อ address คือ 106hex ต้องตรวจ operation กับตาราง ISA ให้ตรงกัน",
        "to": 35,
        "level": "hard",
        "set": 3,
        "from": 22
      }
    ]
  },
  {
    "id": "ca03",
    "number": 3,
    "title": "แทนข้อมูลและอ่าน RISC-V",
    "english": "Data Representation, ISA & Assembly",
    "pdf": "materials/itds211/chapter03.pdf",
    "pages": 118,
    "sections": [
      {
        "title": "จำนวนบิตกับฐานตัวเลข",
        "body": "ข้อมูล n บิตมีรูปแบบได้ 2^n แบบ ถ้าอ่านเป็น unsigned จะมีช่วง 0 ถึง 2^n−1 ฐานสองใช้ 0–1 ฐานแปดใช้ 0–7 และฐานสิบหกใช้ 0–9 กับ A–F ค่าของ bit ต้องอ่านร่วมกับรูปแบบข้อมูล เพราะบิตชุดเดียวกันอาจแทนจำนวนบวก ลบ หรืออักขระได้",
        "to": 9,
        "from": 5
      },
      {
        "title": "Sign-magnitude และ Complement",
        "body": "Sign-magnitude แยก sign bit ออกจากขนาดและมีทั้ง+0 กับ−0 ส่วน one’s complement กลับทุกบิตและยังมีศูนย์สองแบบ Two’s complement กลับบิตแล้วบวก 1 จึงมีศูนย์เดียวและช่วง n บิตเป็น −2^(n−1) ถึง 2^(n−1)−1 การบวก one’s complement ต้องวน carry กลับเข้าบิตต่ำ ส่วน two’s complement เก็บผลในความกว้างเดิมโดยทิ้ง carry-out",
        "to": 22,
        "from": 10
      },
      {
        "title": "Bias และเศษส่วนฐานสอง",
        "body": "Bias notation อ่านค่าเป็น unsigned code − bias เช่น code128 กับ bias127 แทน+1 เศษส่วนฐานสองมีน้ำหนัก 1/2,1/4,1/8,… จึงแปลงโดยบวกค่าน้ำหนักของบิตที่เป็น 1 จำนวนเศษส่วนบางค่าแทนได้ไม่จบในบิตจำนวนจำกัด",
        "to": 30,
        "from": 23
      },
      {
        "title": "IEEE Floating Point",
        "body": "Single precision มี sign1 บิต exponent8 บิต และ fraction23 บิต; double มี 1/11/52 บิต สำหรับ single แบบ normalized ที่ 1≤E≤254 ใช้ค่า (−1)^s × (1.fraction) × 2^(E−127) โดย E คือ exponent ที่เก็บ สูตร 1.fraction ไม่ใช้ตรง ๆ กับ E=0 หรือ 255 ซึ่งเป็นกลุ่มศูนย์/subnormal และ infinity/NaN; ค่าสูงสุดแบบ finite จึงเป็น (2−2^-23)×2^127 ไม่ใช่ 2^128 พอดี",
        "to": 31,
        "from": 25
      },
      {
        "title": "อักขระไม่ใช่ค่าตัวเลข",
        "body": "ASCII มาตรฐานมี 128 รหัส ใช้ 7 บิต รวมอักขระแสดงผลและ control characters รหัสของ digit ไม่ใช่ค่าจำนวนนั้น เช่น ‘0’ คือ 48; ตัวพิมพ์ใหญ่กับเล็กคู่กันต่าง 0x20 Unicode รองรับอักขระได้กว้างกว่า ASCII ส่วน UTF-8/UTF-16 เป็นวิธี encode ที่มีความยาวแปรได้",
        "to": 37,
        "from": 32
      },
      {
        "title": "RISC-V และ Register Operands",
        "body": "ในตัวอย่าง RV64 มี 32 general-purpose registers x0–x31 ขนาด 64 บิต โดย x0 อ่านเป็น 0 เสมอ, x1 ใช้ return address และ x2 หรือ sp ใช้ stack pointer คำสั่ง add/sub ใช้ source สองตัวและ destination หนึ่งตัว โดยเขียน destination ก่อน Register เร็วและมีน้อย compiler จึงพยายามเก็บตัวแปรที่ใช้บ่อยไว้ใน register",
        "to": 47,
        "from": 41
      },
      {
        "title": "Memory, Endian และ Immediate",
        "body": "Memory อ้างเป็น byte: array index ต้องคูณขนาดสมาชิกเป็น byte ก่อนบวก base ในตัวอย่าง little-endian ไบต์สำคัญน้อยสุดอยู่ address ต่ำสุด และใช้ load เข้าสู่ register ก่อนคำนวณแล้ว store กลับ ค่าคงที่เล็กใส่ในคำสั่งได้ เช่น addi; ต้องระบุขนาดสมาชิกและสมมติฐาน endian ให้ชัดเมื่อคำนวณ address",
        "to": 53,
        "from": 48
      },
      {
        "title": "รูปแบบรหัสคำสั่ง",
        "body": "คำสั่ง base ที่บทสอนยาว 32 บิต R-format แบ่ง funct7/rs2/rs1/funct3/rd/opcode เป็น 7/5/5/3/5/7 บิต I-format ใช้ immediate12 บิตสำหรับค่าคงที่หรือ load ส่วน S-format แยก immediate ออกเป็นสองส่วนเพื่อรักษาตำแหน่ง source registers การใช้ format คล้ายกันช่วยให้ decode ง่าย แต่ไม่ได้แปลว่าแต่ละ field ใช้แทนกันได้",
        "to": 59,
        "from": 54
      },
      {
        "title": "Bitwise และ Shift",
        "body": "AND ใช้ mask บิตที่อยากเก็บ, OR ใช้ตั้งบางบิตเป็น 1 และ XOR ให้ 1 เมื่อบิตสองข้างต่างกัน XOR กับบิต 1 ทั้งหมดจึงกลับทุกบิตได้ Logical shift เติม 0; slli คูณด้วย 2^k เมื่อไม่เสียบิตล้น และ srli เทียบกับหาร unsigned ด้วย 2^k แบบทิ้งเศษ ไม่ควรใช้ logical right shift แทนการหาร signed ติดลบโดยตรง",
        "to": 64,
        "from": 60
      },
      {
        "title": "Branch, Loop และ Basic Block",
        "body": "beq/bne เปรียบเทียบเท่ากัน/ไม่เท่ากัน ส่วน blt/bge ใช้ signed และ bltu/bgeu ใช้ unsigned แปล if/loop โดยจัดทางไปต่อและทางออกให้ตรงเงื่อนไข; branch ที่ไม่เข้าเงื่อนไขจะทำคำสั่งถัดไป Basic block ไม่มี branch กลางบล็อกและไม่มีจุดกระโดดเข้ากลางบล็อก จึงเป็นหน่วยสำคัญของ optimization",
        "to": 70,
        "from": 65
      },
      {
        "title": "Procedure Call และ Stack",
        "body": "พารามิเตอร์ใช้ x10–x17 และค่าผลลัพธ์ใช้ register ตาม calling convention; jal x1,label เก็บ address คำสั่งถัดไปใน x1 แล้วกระโดด การกลับใช้ jalr x0,0(x1) เพื่อทิ้งค่าลิงก์ Non-leaf procedure ต้องรักษา return address ของตัวเองและค่าที่ยังต้องใช้หลัง call; saved registers ที่ callee ใช้ต้อง save/restore ส่วน temporaries ไม่รับประกันว่าจะคงเดิม",
        "to": 79,
        "from": 71
      },
      {
        "title": "Memory Layout และ Activation Record",
        "body": "Text เก็บโค้ด, static data เก็บข้อมูลอายุยาว, heap ใช้ข้อมูล dynamic และ stack ใช้การจัดเก็บอัตโนมัติ Procedure frame หรือ activation record รวบรวม local data และสถานะของการ call การจองพื้นที่ stack ในตัวอย่างทำ sp ลดลงและคืนพื้นที่เมื่อกลับ ต้องคืน register ด้วย load ไม่ใช่ store",
        "to": 81,
        "from": 75
      },
      {
        "title": "Byte, Word และ String",
        "body": "ใน RV64: lb/lh/lw โหลด 8/16/32 บิตแล้ว sign-extend ส่วน lbu/lhu/lwu ใช้ zero-extend คำสั่ง sb/sh/sw เก็บเฉพาะ 8/16/32 บิตด้านต่ำของ source และ ld/sd ใช้ doubleword64 บิต String ตัวอย่างจบด้วย byte0 และคัดลอกทีละ byte; source กับ destination ต้องใช้ base address คนละตัวที่ถูกต้อง",
        "to": 86,
        "from": 82
      },
      {
        "title": "ค่าคงที่กว้างและ Addressing",
        "body": "lui วาง immediate20 บิตในบิต 31–12 และทำ 12 บิตล่างเป็น 0; ใช้ร่วมกับ addi เพื่อสร้างค่าที่กว้างขึ้นได้ Branch อ้างเป้าหมายเทียบกับ PC และมีบิตต่ำเป็น 0: ถ้าพูดเป็น offset หน่วย byte ที่ถอดแล้ว ให้ใช้ target=PC+offset ถ้าพูดเป็นค่า encoded ที่นับหน่วย 2byte จึงคูณ 2 ก่อน; ห้ามคูณซ้ำ ส่วน jalr ใช้ base register กับ immediate",
        "to": 91,
        "from": 87
      },
      {
        "title": "Synchronization",
        "body": "เมื่อหลาย processor ใช้ memory ร่วมกัน ผลอาจขึ้นกับลำดับ access ถ้าไม่ synchronize Atomic operation ทำให้การอ่านและเขียนชุดสำคัญไม่ถูกแทรกแบบที่ทำให้ข้อมูลผิด lr.d อ่านและตั้ง reservation ส่วน sc.d พยายามเขียนและคืน status0 เมื่อสำเร็จ/nonzero เมื่อไม่สำเร็จ; โค้ดจึงตรวจ status และลองใหม่ โดยในระบบจริงการใช้ lock ยังต้องคำนึงถึงกติกา memory ordering",
        "to": 94,
        "from": 92
      },
      {
        "title": "จาก Source สู่โปรแกรมที่รันได้",
        "body": "Compiler/assembler สร้าง object module ซึ่งมีโค้ด ข้อมูล symbol table และ relocation information Linker รวม module แก้ symbol และ reference จนเป็น executable; loader สร้างพื้นที่ address นำส่วนต่าง ๆ เข้า memory ตั้ง register/arguments แล้วเริ่ม startup Dynamic linking ผูก library ภายหลัง ส่วน lazy linkage เลื่อนงานบางส่วนถึงการเรียกครั้งแรก; Java ใช้ bytecode บน JVM และอาจ JIT ส่วนที่รันบ่อย",
        "to": 101,
        "from": 95
      },
      {
        "title": "Swap, Sort และ Optimization",
        "body": "ตัวอย่าง swap คำนวณ address สมาชิก doubleword ด้วย index×8 โหลดสองค่าแล้วเก็บสลับตำแหน่ง ตัวอย่าง sort เชื่อม loop กับ procedure call และการรักษา register กราฟ optimization ชี้ว่า CPI หรือ instruction count เพียงตัวเดียวตัดสินความเร็วไม่ได้ ต้องดูเวลาหรือจำนวน cycle รวมร่วมกับ algorithm",
        "to": 110,
        "from": 102
      },
      {
        "title": "Array กับ Pointer",
        "body": "Array indexing คำนวณ base+index×element size ส่วน pointer เลื่อนไป address ของสมาชิกถัดไปได้โดยตรง Compiler อาจลด multiply เป็น shift หรือทำ induction-variable elimination ได้ จึงไม่ควรสรุปว่าเขียน pointer ด้วยมือต้องเร็วกว่าเสมอ ขนาดสมาชิกต้องตรงกันทั้งภาษาและ assembly ก่อนเปรียบเทียบ",
        "to": 113,
        "from": 111
      },
      {
        "title": "MIPS และส่วนขยาย RISC-V",
        "body": "MIPS เป็นอีก ISA หนึ่งที่มีแนวคิด load/store คล้ายกัน แต่ instruction encoding และบาง branch ต่างจาก RISC-V RV32I มี register32 บิต ส่วนตัวอย่าง RV64I มี 64 บิต; ส่วนขยาย M เพิ่ม multiply/divide, A เพิ่ม atomic, F/D เพิ่ม floating point และ C เพิ่มคำสั่ง compressed16 บิต ดังนั้นคำกล่าวว่า RISC-V ทุกคำสั่ง 32 บิตต้องจำกัดขอบเขตที่ base formats ในบท",
        "to": 117,
        "from": 114
      },
      {
        "title": "อ่านตัวอย่างที่มีจุดพิมพ์ผิด",
        "body": "ควรยึดความหมาย operation กับรูปแบบข้อมูลก่อนคัดลอกโค้ด: หน้า 44 ต้องใช้ sub สำหรับผลต่าง และหน้า 107 ช่วง restore ควรเป็น ld หน้า 86 ใช้ base เดียวทั้ง source/destination ของ strcpy และหน้า 112 ใช้ระยะ 8byte กับชนิด int ที่ไม่สอดคล้องคำอธิบาย word ส่วนหน้า 15 ใช้ชื่อ complement ฐานสิบคลาดเคลื่อนและหน้า 17 ยก 6 ใน signed3 บิตซึ่งเกินช่วง; แบบฝึกในหน้านี้กำหนดความกว้างและเงื่อนไขใหม่ให้สอดคล้อง",
        "to": 117,
        "from": 15
      }
    ],
    "takeaways": [
      "จำนวนบิตเดียวกันอ่านได้ต่างค่าตาม unsigned, sign-magnitude, complement หรือ bias",
      "Two’s complement n บิตมีช่วง −2^(n−1) ถึง 2^(n−1)−1 และมีศูนย์เดียว",
      "IEEE single normalized ใช้ sign1/exponent8/fraction23 และ bias127",
      "RV64 ในตัวอย่างมี 32 registers; word=32 บิต doubleword=64 บิต",
      "Address ของ array = base + index×ขนาดสมาชิกเป็น byte",
      "แยก signed/unsigned branch และ sign/zero extension ให้ถูก",
      "Call ที่ซ้อนกันต้องรักษา return address และค่าที่ยังต้องใช้",
      "Linker รวม/แก้ reference; loader จัดโปรแกรมเข้า memory เพื่อเริ่มรัน"
    ],
    "questions": [
      {
        "id": "ca03:0",
        "prompt": "Unsigned 8 บิตมีค่าสูงสุดเท่าไร",
        "options": [
          "127",
          "256",
          "255",
          "128"
        ],
        "correct": 2,
        "explanation": "Unsigned n บิตมีช่วง 0 ถึง 2^n−1 ดังนั้น 8 บิตมีค่าสูงสุด 255 ไม่ใช่ 256 ซึ่งเป็นจำนวนรูปแบบทั้งหมด",
        "to": 8,
        "level": "easy",
        "set": 1,
        "from": 5
      },
      {
        "id": "ca03:1",
        "prompt": "บิต 10000000 ใน 8 บิต sign-magnitude กับ two’s complement มีค่าอย่างไรตามลำดับ",
        "options": [
          "−128 และ −0",
          "−1 และ −1",
          "128 และ 128",
          "−0 และ −128"
        ],
        "correct": 3,
        "explanation": "Sign-magnitude ใช้บิตแรกเป็นเครื่องหมายและขนาดที่เหลือเป็น 0 แต่ two’s complement ใช้บิตสูงสุดน้ำหนัก−128",
        "to": 22,
        "level": "medium",
        "set": 1,
        "from": 10
      },
      {
        "id": "ca03:2",
        "prompt": "ต้องแทน−13 ด้วย two’s complement 8 บิต ควรได้รูปแบบใด",
        "options": [
          "11110011",
          "10001101",
          "11110010",
          "00001101"
        ],
        "correct": 0,
        "explanation": "13 คือ 00001101 กลับบิตเป็น 11110010 แล้วบวก 1 ได้ 11110011;10001101 เป็นแนว sign-magnitude",
        "to": 20,
        "level": "hard",
        "set": 1,
        "from": 18
      },
      {
        "id": "ca03:3",
        "prompt": "One’s complement สร้างค่าติดลบจากค่าบวกอย่างไรในความกว้างเดิม",
        "options": [
          "กลับทุกบิตแล้วบวก 1",
          "กลับทุกบิต",
          "เปลี่ยนเฉพาะ LSB",
          "เติมศูนย์ทางซ้ายเสมอ"
        ],
        "correct": 1,
        "explanation": "การกลับทุกบิตคือ one’s complement ส่วนการบวก 1 เพิ่มเป็นขั้นของ two’s complement",
        "to": 18,
        "level": "easy",
        "set": 1,
        "from": 16
      },
      {
        "id": "ca03:4",
        "prompt": "ใน two’s complement4 บิต คำนวณ 6+(−5)ได้บิตผลลัพธ์ใด",
        "options": [
          "10001",
          "1111",
          "0001",
          "1011"
        ],
        "correct": 2,
        "explanation": "0110+1011=10001 เก็บเฉพาะ 4 บิตได้ 0001 หรือ 1 ไม่วน carry กลับแบบ one’s complement",
        "to": 20,
        "level": "medium",
        "set": 1,
        "from": 18
      },
      {
        "id": "ca03:5",
        "prompt": "เพื่อนอ้างว่าใช้ one’s complement3 บิตแทน+6 และ−3 เพื่อบวกกัน ปัญหาหลักคืออะไร",
        "options": [
          "−3 ต้องใช้ 16 บิตเสมอ",
          "One’s complement ไม่มีจำนวนบวก",
          "3 บิตแทนค่า 0 ไม่ได้",
          "+6 อยู่นอกช่วง signed one’s complement3 บิตซึ่งมีค่า−3 ถึง+3"
        ],
        "correct": 3,
        "explanation": "3 บิตมี sign1 บิตและขนาดเทียบเท่า 2 บิต จึงบวกได้สูงสุด 3; ต้องเพิ่มความกว้างก่อนใช้งานตัวอย่างนี้",
        "to": 17,
        "level": "hard",
        "set": 1,
        "from": 16
      },
      {
        "id": "ca03:6",
        "prompt": "Bias notation แปลง code ที่เก็บเป็นค่าจริงด้วยวิธีใด",
        "options": [
          "อ่าน code เป็น unsigned แล้วลบ bias",
          "อ่าน code แล้วบวก bias ทุกครั้ง",
          "กลับทุกบิตโดยไม่ดู bias",
          "ใช้ MSB เป็นเครื่องหมายแยกเสมอ"
        ],
        "correct": 0,
        "explanation": "Bias เลื่อนช่วงของจำนวน ค่าที่แทนจึงเท่ากับ unsigned code−bias",
        "to": 24,
        "level": "easy",
        "set": 1,
        "from": 23
      },
      {
        "id": "ca03:7",
        "prompt": "รหัส 8 บิต 10000010 อ่านด้วย bias127 มีค่าจริงเท่าไร",
        "options": [
          "130",
          "3",
          "−125",
          "257"
        ],
        "correct": 1,
        "explanation": "10000010 เป็น unsigned130 แล้ว 130−127=3 การบวก bias ใช้ตอน encode ค่าจริงเป็น code",
        "to": 24,
        "level": "medium",
        "set": 1,
        "from": 23
      },
      {
        "id": "ca03:8",
        "prompt": "เลข normalized binary 1.101×2^3 ใน IEEE single มี sign และ exponent ที่เก็บเป็นเท่าไร",
        "options": [
          "sign1 และ E=130",
          "sign0 และ E=3",
          "sign0 และ E=130",
          "sign0 และ E=124"
        ],
        "correct": 2,
        "explanation": "เป็นค่าบวกจึง s=0; exponent จริง 3 ต้องบวก bias127 เป็น 130 ก่อนเก็บ",
        "to": 31,
        "level": "hard",
        "set": 1,
        "from": 26
      },
      {
        "id": "ca03:9",
        "prompt": "IEEE single precision แบ่งจำนวนบิตอย่างไร",
        "options": [
          "Sign1, exponent11, fraction52",
          "Sign8, exponent8, fraction16",
          "Sign1, exponent7, fraction24",
          "Sign1, exponent8, fraction23"
        ],
        "correct": 3,
        "explanation": "Single มี 32 บิตรวม 1+8+23 ส่วน 1+11+52 เป็น double64 บิต",
        "to": 28,
        "level": "easy",
        "set": 1,
        "from": 27
      },
      {
        "id": "ca03:10",
        "prompt": "เลขฐานสอง 101.101 มีค่าเท่าไรในฐานสิบ",
        "options": [
          "5.625",
          "5.125",
          "5.75",
          "6.5"
        ],
        "correct": 0,
        "explanation": "ส่วนจำนวนเต็มคือ 4+1=5 และเศษคือ 1/2+0/4+1/8=0.625 จึงรวม 5.625",
        "to": 30,
        "level": "medium",
        "set": 1,
        "from": 30
      },
      {
        "id": "ca03:11",
        "prompt": "ข้อใดอธิบายข้อจำกัดสูตร single แบบ normalized (−1)^s×1.f×2^(E−127)ได้ถูกต้อง",
        "options": [
          "ใช้กับ E ทุกค่าโดยไม่มีกรณีพิเศษ",
          "ใช้โดยตรงเมื่อ E อยู่ 1 ถึง 254; ต้องแยก E=0 และ 255",
          "ใช้ได้เฉพาะค่าติดลบ",
          "ต้องใช้ bias1023 กับ single เสมอ"
        ],
        "correct": 1,
        "explanation": "สูตร hidden leading1 ใช้กับ normalized;E=0 และ 255 มีความหมายพิเศษ จึงไม่ควรแทนสูตรเดียวกันตรง ๆ",
        "to": 29,
        "level": "hard",
        "set": 1,
        "from": 27
      },
      {
        "id": "ca03:12",
        "prompt": "ASCII มาตรฐานมีรหัสทั้งหมดกี่ค่า",
        "options": [
          "64",
          "256",
          "128",
          "65536"
        ],
        "correct": 2,
        "explanation": "ASCII มาตรฐานใช้ 7 บิตจึงมี 2^7=128 รหัส แม้อาจจัดเก็บใน byte8 บิตก็ตาม",
        "to": 35,
        "level": "easy",
        "set": 1,
        "from": 34
      },
      {
        "id": "ca03:13",
        "prompt": "กำหนด ASCII ของ‘0’=48 รหัสของ‘7’เป็นเท่าไร",
        "options": [
          "7",
          "48",
          "57",
          "55"
        ],
        "correct": 3,
        "explanation": "รหัสดิจิตเรียงต่อกันจึงเป็น 48+7=55 รหัสอักขระไม่ใช่ค่าจำนวน 7",
        "to": 37,
        "level": "medium",
        "set": 1,
        "from": 35
      },
      {
        "id": "ca03:14",
        "prompt": "โปรแกรมอ่าน byteASCII‘9’แล้วนำไปบวก 1 เชิงจำนวนทันที หากต้องการจำนวน 10 ควรแก้ขั้นใดก่อน",
        "options": [
          "แปลงรหัสเป็นค่าดิจิตโดยลบรหัส‘0’ก่อนบวก 1",
          "บวก 0x20 เพื่อเปลี่ยนตัวพิมพ์เล็ก",
          "ใช้รหัส 57 แทนจำนวน 9 โดยไม่แปลง",
          "กลับทุกบิตของรหัสก่อนเสมอ"
        ],
        "correct": 0,
        "explanation": "‘9’คือ 57 จึงต้อง 57−48=9 แล้วบวก 1 จึงได้ 10; บวกกับรหัสดิบจะได้ 58",
        "to": 37,
        "level": "hard",
        "set": 1,
        "from": 35
      },
      {
        "id": "ca03:15",
        "prompt": "RISC-V register ใดอ่านเป็นค่าคงที่ 0 เสมอ",
        "options": [
          "x1",
          "x0",
          "x2",
          "x10"
        ],
        "correct": 1,
        "explanation": "x0 เป็น zero register ส่วน x1 ใช้ return address และ x2 เป็น stack pointer ตาม calling convention ในบท",
        "to": 46,
        "level": "easy",
        "set": 2,
        "from": 45
      },
      {
        "id": "ca03:16",
        "prompt": "ถ้า x5 มี 20 คำสั่ง addi x6,x5,−3 ทำให้ x6 เป็นเท่าไร",
        "options": [
          "−3",
          "20",
          "17",
          "23"
        ],
        "correct": 2,
        "explanation": "addi นำค่า source register บวก immediate แบบ signed จึงเป็น 20+(−3)=17 โดย destination คือ x6",
        "to": 52,
        "level": "medium",
        "set": 2,
        "from": 43
      },
      {
        "id": "ca03:17",
        "prompt": "Array A มีสมาชิก 64 บิต เริ่มที่ byte address1000 ต้องโหลด A[5]ควรใช้ address ใด",
        "options": [
          "1005",
          "1020",
          "1080",
          "1040"
        ],
        "correct": 3,
        "explanation": "สมาชิก 64 บิตมี 8byte ดังนั้น base+5×8=1040 ต้องแยก index กับ byte offset",
        "to": 50,
        "level": "hard",
        "set": 2,
        "from": 49
      },
      {
        "id": "ca03:18",
        "prompt": "ใน R-format field rd หมายถึงอะไร",
        "options": [
          "หมายเลข destination register",
          "address ของ memory เสมอ",
          "opcode หลักทั้งหมด",
          "ค่าคงที่ 12 บิต"
        ],
        "correct": 0,
        "explanation": "rd ระบุ register รับผล ส่วน rs1 และ rs2 เป็น source และ opcode/funct ระบุ operation",
        "to": 56,
        "level": "easy",
        "set": 2,
        "from": 55
      },
      {
        "id": "ca03:19",
        "prompt": "RISC-V มี 32register เหตุใด field ระบุ register จึงใช้ 5 บิต",
        "options": [
          "register ทุกตัวกว้าง 5 บิต",
          "5 บิตแทนหมายเลขได้ 32 ค่า",
          "คำสั่งยาวเพียง 5 บิต",
          "ทุก register มี 32byte"
        ],
        "correct": 1,
        "explanation": "2^5=32 จึงพอเข้ารหัสหมายเลข 0–31 ความกว้าง field หมายเลขไม่ใช่ความกว้างข้อมูลใน register",
        "to": 55,
        "level": "medium",
        "set": 2,
        "from": 45
      },
      {
        "id": "ca03:20",
        "prompt": "ต้องการเก็บลง memory โดยมี source rs2 กับ base rs1 รูปแบบใดรองรับโดยแยก immediate แต่ไม่ต้องมี rd",
        "options": [
          "R-format ที่ไม่มี offset",
          "I-format ที่ไม่มี source register",
          "S-format",
          "ชื่อ format ใดก็ใช้ field แทนกันได้ทั้งหมด"
        ],
        "correct": 2,
        "explanation": "Store ไม่คืนค่าใน rd จึงใช้พื้นที่นั้นส่วนหนึ่งเก็บ offset และรักษาตำแหน่ง rs1/rs2 ไว้ตาม S-format",
        "to": 58,
        "level": "hard",
        "set": 2,
        "from": 57
      },
      {
        "id": "ca03:21",
        "prompt": "คำสั่ง bitwise ใดเหมาะกับการ mask เพื่อเก็บเฉพาะบิตที่เลือก",
        "options": [
          "OR",
          "ADD",
          "JAL",
          "AND"
        ],
        "correct": 3,
        "explanation": "AND กับ mask1 เก็บบิตเดิม และ mask0 ล้างบิต จึงเหมาะกับการเลือกบางบิต",
        "to": 62,
        "level": "easy",
        "set": 2,
        "from": 60
      },
      {
        "id": "ca03:22",
        "prompt": "บิต 1010 XOR 1100 ให้ผลใด",
        "options": [
          "0110",
          "1110",
          "1000",
          "0010"
        ],
        "correct": 0,
        "explanation": "XOR ให้ 1 เมื่อบิตต่างกัน:1^1=0,0^1=1,1^0=1,0^0=0 ต่างจาก OR และ AND",
        "to": 64,
        "level": "medium",
        "set": 2,
        "from": 60
      },
      {
        "id": "ca03:23",
        "prompt": "สมมติใช้ register8 บิตที่มี 10000000 หาก logical right shift1 ผลเป็นอะไร และเหตุใดจึงไม่เท่ากับหาร signed−128 ด้วย 2",
        "options": [
          "11000000 หรือ−64 เพราะ logical shift เติม sign bit",
          "01000000 หรือ unsigned64 เพราะเติม 0 ด้านซ้าย",
          "10000000 เพราะ shift ไม่เปลี่ยนบิตสูงสุด",
          "00000001 เพราะเลื่อนซ้าย 7 ตำแหน่ง"
        ],
        "correct": 1,
        "explanation": "Logical right shift เติม 0 จึงได้ 01000000 การคงเครื่องหมายของจำนวนลบต้องใช้กติกา arithmetic shift ซึ่งต่างกัน",
        "to": 61,
        "level": "hard",
        "set": 2,
        "from": 53
      },
      {
        "id": "ca03:24",
        "prompt": "beq rs1,rs2,L1 จะ branch เมื่อใด",
        "options": [
          "เมื่อค่าทั้งสองไม่เท่ากัน",
          "เมื่อ rs1 น้อยกว่า rs2 เสมอ",
          "เมื่อค่าทั้งสองเท่ากัน",
          "ทุกครั้งโดยไม่ดู register"
        ],
        "correct": 2,
        "explanation": "beq คือ branch if equal ส่วน bne ตรวจความไม่เท่ากัน",
        "to": 66,
        "level": "easy",
        "set": 2,
        "from": 65
      },
      {
        "id": "ca03:25",
        "prompt": "สมมติ register8 บิต A=11111111 และ B=00000001 การเปรียบเทียบ signed กับ unsigned ต่างกันอย่างไร",
        "options": [
          "ทั้งสองแบบได้ A<B",
          "ทั้งสองแบบได้ A=B",
          "Signed ได้ A>B แต่ unsigned ได้ A<B",
          "Signed ได้ A<B แต่ unsigned ได้ A>B"
        ],
        "correct": 3,
        "explanation": "Signed two’s complement อ่าน A เป็น−1 ส่วน unsigned อ่านเป็น 255 ขณะที่ B เป็น 1 ทั้งสองแบบ",
        "to": 70,
        "level": "medium",
        "set": 2,
        "from": 53
      },
      {
        "id": "ca03:26",
        "prompt": "Loop เริ่ม i=0 วนเพิ่ม i ขณะ save[i]==7 กำหนด save=[7,7,2,7]และไม่ออกนอก array เมื่อจบ i เท่าไร",
        "options": [
          "2",
          "1",
          "3",
          "4"
        ],
        "correct": 0,
        "explanation": "รอบ i0 และ 1 เจอ 7 จึงเพิ่ม i ที่ i2 พบ 2 ไม่เท่ากับ 7 จึงออกก่อนเพิ่มเป็น 3",
        "to": 67,
        "level": "hard",
        "set": 2,
        "from": 65
      },
      {
        "id": "ca03:27",
        "prompt": "jal x1,ProcedureLabel มีหน้าที่อะไร",
        "options": [
          "เก็บข้อมูล memory ทั้งหมดใน x1",
          "เก็บ address คำสั่งถัดไปใน x1 แล้วกระโดดไป procedure",
          "กลับจาก procedure โดยไม่ใช้ return address",
          "เพิ่ม x1 เป็น 1 โดยไม่เปลี่ยน PC"
        ],
        "correct": 1,
        "explanation": "Jump and link ทำทั้งการโอนควบคุมและเก็บจุดกลับ ส่วน jalr x0,0(x1)เป็นรูปแบบ return ในบท",
        "to": 72,
        "level": "easy",
        "set": 2,
        "from": 71
      },
      {
        "id": "ca03:28",
        "prompt": "ทำไม return จึงใช้ jalr x0,0(x1)โดยให้ rd เป็น x0",
        "options": [
          "เพื่อเขียน return address ทับ x0 ให้เปลี่ยนค่าได้",
          "เพราะ x1 เป็นศูนย์เสมอ",
          "เพื่อกระโดดไป return address และทิ้งค่าลิงก์ใหม่",
          "เพราะ x0 คือ stack pointer"
        ],
        "correct": 2,
        "explanation": "x0 เขียนแล้วค่าไม่เปลี่ยนจึงใช้ทิ้งผล link ได้ ส่วน address กระโดดได้จาก x1",
        "to": 72,
        "level": "medium",
        "set": 2,
        "from": 46
      },
      {
        "id": "ca03:29",
        "prompt": "ฟังก์ชัน F จะ call G แล้วกลับมาทำต่อ แต่ปล่อยให้ jal เขียน x1 ทับโดยไม่รักษาจุดกลับของ F ปัญหาใดเกิดขึ้นได้",
        "options": [
          "จำนวน physical registers เพิ่มขึ้น",
          "G กลายเป็น leaf โดยอัตโนมัติ",
          "คำสั่ง jal เปลี่ยนเป็น store โดยอัตโนมัติ",
          "F อาจสูญเสีย return address ของ caller เดิม"
        ],
        "correct": 3,
        "explanation": "Non-leaf ต้อง save return address ก่อน nested call และ restore ก่อน return ไม่เช่นนั้น x1 อาจชี้แค่ตำแหน่งหลัง call G",
        "to": 77,
        "level": "hard",
        "set": 2,
        "from": 72
      },
      {
        "id": "ca03:30",
        "prompt": "ใน RV64 lbu โหลด byte แล้วขยายค่าแบบใด",
        "options": [
          "Zero extension",
          "Sign extension",
          "กลับทุกบิต",
          "เลื่อนซ้าย 32 บิตทุกครั้ง"
        ],
        "correct": 0,
        "explanation": "lbu เติม 0 ด้านสูง ส่วน lb ทำ sign extension โดยคัดลอก sign bit",
        "to": 83,
        "level": "easy",
        "set": 3,
        "from": 82
      },
      {
        "id": "ca03:31",
        "prompt": "Memory มี byte0xFF เมื่อโหลดเข้า RV64 ด้วย lb กับ lbu จะอ่านค่าเชิงจำนวนอย่างไร",
        "options": [
          "lb ให้ 255 และ lbu ให้−1",
          "lb ให้−1 และ lbu ให้ 255",
          "ทั้งสองให้−1",
          "ทั้งสองให้ 0"
        ],
        "correct": 1,
        "explanation": "0xFF มี sign bit1;lb ขยาย 1 จนได้ two’s complement−1 ส่วน lbu เติม 0 จนได้ 255",
        "to": 83,
        "level": "medium",
        "set": 3,
        "from": 53
      },
      {
        "id": "ca03:32",
        "prompt": "กำหนดค่าบวกไม่ล้น: lui x5,1 แล้ว addi x5,x5,128 ค่าใน x5 เป็นเท่าไร",
        "options": [
          "4096 หรือ 0x1000",
          "128 หรือ 0x0080",
          "4224 หรือ 0x1080",
          "5376 หรือ 0x1500"
        ],
        "correct": 2,
        "explanation": "lui1 ให้ 1<<12=4096 แล้วบวก 128=4224;128 ฐานสิบคือ 0x80 ไม่ใช่ 0x500 ตาม comment คลาดเคลื่อนในตัวอย่าง",
        "to": 87,
        "level": "hard",
        "set": 3,
        "from": 87
      },
      {
        "id": "ca03:33",
        "prompt": "ส่วน memory ใดใช้เก็บ program code ตาม layout ในบท",
        "options": [
          "Heap เท่านั้น",
          "Stack เท่านั้น",
          "Interrupt flag เท่านั้น",
          "Text segment"
        ],
        "correct": 3,
        "explanation": "Text เป็นโค้ด ส่วน heap เป็น dynamic data และ stack เป็น automatic storage ของการทำงาน",
        "to": 81,
        "level": "easy",
        "set": 3,
        "from": 80
      },
      {
        "id": "ca03:34",
        "prompt": "เครื่องมือใดรวม object modules และแก้ external symbol references",
        "options": [
          "Linker",
          "Loader เพียงอย่างเดียว",
          "ALU",
          "TLB"
        ],
        "correct": 0,
        "explanation": "Linker รวม segments และแก้ labels/references ก่อน loader เตรียม address space และเริ่มโปรแกรม",
        "to": 98,
        "level": "medium",
        "set": 3,
        "from": 95
      },
      {
        "id": "ca03:35",
        "prompt": "มี object module A เรียกฟังก์ชัน foo ใน B แต่ยังไม่ทราบ address สุดท้าย ข้อมูลใดช่วยให้รวมโปรแกรมได้ภายหลัง",
        "options": [
          "ค่า clock rate ของ CPU อย่างเดียว",
          "Symbol table และ relocation information",
          "ภาพตัวอักษร ASCII อย่างเดียว",
          "จำนวน cache lines อย่างเดียว"
        ],
        "correct": 1,
        "explanation": "Symbol table ระบุ definitions/references ส่วน relocation บอกตำแหน่งที่ขึ้นกับที่อยู่จริง จึงใช้ตอน link/relocate",
        "to": 97,
        "level": "hard",
        "set": 3,
        "from": 96
      },
      {
        "id": "ca03:36",
        "prompt": "sc.d คืน status0 หมายถึงอะไรตามตัวอย่าง atomic ในบท",
        "options": [
          "Store conditional ล้มเหลวเสมอ",
          "ข้อมูลที่ต้องเขียนเป็น 0 เท่านั้น",
          "Store conditional สำเร็จ",
          "LR ไม่ได้อ่าน memory"
        ],
        "correct": 2,
        "explanation": "status เป็นผลสำเร็จของ conditional store ไม่ใช่ค่าข้อมูล;nonzero บอกว่าต้องรับมือหรือ retry",
        "to": 94,
        "level": "easy",
        "set": 3,
        "from": 92
      },
      {
        "id": "ca03:37",
        "prompt": "หลัง lr.d ถ้า sc.d คืน nonzero โค้ด atomic swap ในบททำอะไรต่อ",
        "options": [
          "ถือว่าเขียนสำเร็จแล้วออกทันที",
          "เปลี่ยน nonzero เป็นข้อมูลที่อ่านโดยไม่เขียน",
          "ลบ return address ก่อนเสมอ",
          "วนกลับไปลอง lr.d/sc.d ใหม่"
        ],
        "correct": 3,
        "explanation": "ตัวอย่างใช้ bne status,x0,again จึง retry เมื่อ store ไม่สำเร็จ การมอง nonzero เป็น success จะพลาดการอัปเดต",
        "to": 94,
        "level": "medium",
        "set": 3,
        "from": 93
      },
      {
        "id": "ca03:38",
        "prompt": "สอง processor อ่าน counter=10 พร้อมกัน ต่างคำนวณ+1 แล้วเขียน 11 โดยไม่ synchronize ผล 11 แทน 12 แสดงปัญหาใด",
        "options": [
          "Data race และการอัปเดตสูญหายจาก read-modify-write ที่ไม่ atomic",
          "ASCII แปลตัวเลขผิด",
          "Exponent bias ผิด",
          "Registerx0 เปลี่ยนเป็น 11"
        ],
        "correct": 0,
        "explanation": "แต่ละ processor ใช้ค่าเก่าเดียวกันก่อนเขียน จึงทับผลกัน ต้องทำส่วนสำคัญให้ atomic หรือใช้การ synchronize ที่ถูกต้อง",
        "to": 94,
        "level": "hard",
        "set": 3,
        "from": 92
      },
      {
        "id": "ca03:39",
        "prompt": "ส่วนขยาย M ของ RISC-V เพิ่มกลุ่มคำสั่งใด",
        "options": [
          "Compressed16 บิตอย่างเดียว",
          "Integer multiply, divide และ remainder",
          "Atomic memory อย่างเดียว",
          "Single-precision floating point อย่างเดียว"
        ],
        "correct": 1,
        "explanation": "M คือคูณหารจำนวนเต็ม ส่วน A คือ atomic, F คือ single floating point และ C คือ compressed",
        "to": 117,
        "level": "easy",
        "set": 3,
        "from": 116
      },
      {
        "id": "ca03:40",
        "prompt": "เมื่อตัวอย่าง MIPS ใช้ slt แล้ว beq เพื่อเปรียบเทียบน้อยกว่า ข้อใดถูกเกี่ยวกับ RISC-V",
        "options": [
          "RISC-V ไม่มี conditional branch เลย",
          "MIPS กับ RISC-V ใช้ encoding เดียวกันทุกบิต",
          "RISC-V มี blt/bge โดยตรงและยังมีคำสั่ง set-less-than บางแบบด้วย",
          "RISC-V ใช้ register ทั้งหมดชื่อ$t0 ถึง$t31"
        ],
        "correct": 2,
        "explanation": "เป็นคนละ ISA ที่มีแนวคิดคล้ายกัน RISC-V มี branch เปรียบเทียบโดยตรงตามบท จึงไม่คัดลอก MIPS โดยไม่แปล",
        "to": 116,
        "level": "medium",
        "set": 3,
        "from": 114
      },
      {
        "id": "ca03:41",
        "prompt": "Compiler ลด IC เหลือครึ่งหนึ่ง แต่ CPI เพิ่มจาก 1 เป็น 1.5 โดย clock เท่าเดิม เวลา CPU ใหม่เป็นกี่เท่าของเดิม",
        "options": [
          "0.5 เท่า",
          "1.5 เท่า",
          "3 เท่า",
          "0.75 เท่า"
        ],
        "correct": 3,
        "explanation": "เวลาแปรตาม IC×CPI เมื่อ clock เท่าเดิม จึงเป็น 0.5×1.5=0.75 ต้องใช้สองปัจจัยร่วมกัน",
        "to": 110,
        "level": "hard",
        "set": 3,
        "from": 108
      },
      {
        "id": "ca03:42",
        "prompt": "Basic block มีลักษณะใด",
        "options": [
          "ไม่มี branch กลางบล็อกและไม่มีเป้ากระโดดเข้ากลางบล็อก",
          "ทุกคำสั่งต้องเป็น load",
          "ต้องมี return ทุกคำสั่ง",
          "มี branch แทรกได้ทุกตำแหน่งโดยนิยาม"
        ],
        "correct": 0,
        "explanation": "Basic block มีทางไหลต่อเนื่อง เข้าได้ที่ต้นและออกที่ท้าย จึงเหมาะกับ compiler optimization",
        "to": 68,
        "level": "easy",
        "set": 3,
        "from": 68
      },
      {
        "id": "ca03:43",
        "prompt": "Array ของ doubleword64 บิต ถ้า pointer ชี้สมาชิกปัจจุบัน ต้องเพิ่มกี่ byte เพื่อไปสมาชิกถัดไป",
        "options": [
          "1byte",
          "8byte",
          "4byte",
          "64byte"
        ],
        "correct": 1,
        "explanation": "64 บิตเท่ากับ 8byte เช่นตัวอย่าง swap ใช้ offset0 และ 8 สำหรับสมาชิกติดกัน",
        "to": 103,
        "level": "medium",
        "set": 3,
        "from": 102
      },
      {
        "id": "ca03:44",
        "prompt": "Callee บันทึก saved register ด้วย sd x19,0(sp) ตอนท้ายต้องคืนค่าเดิม วิธีใดถูก",
        "options": [
          "sd x19,0(sp)ซ้ำอีกครั้งเพื่อ restore",
          "addi x19,x0,0 โดยไม่อ่าน stack",
          "ld x19,0(sp)ก่อนคืนพื้นที่ stack",
          "คืน sp ก่อนแล้วอ่าน 0(sp)โดยถือว่าตำแหน่งเดิมไม่เปลี่ยน"
        ],
        "correct": 2,
        "explanation": "Restore ต้อง load ค่าจากช่องที่ save ไว้ก่อนปรับ sp กลับ การใช้ sd ซ้ำเขียนทับช่องเดิมและไม่คืนค่า register",
        "to": 107,
        "level": "hard",
        "set": 3,
        "from": 76
      }
    ]
  },
  {
    "id": "ca04",
    "number": 4,
    "title": "Memory, Cache และ Virtual Memory",
    "english": "Memory Hierarchy & Cache",
    "pdf": "materials/itds211/chapter04.pdf",
    "pages": 112,
    "sections": [
      {
        "title": "Locality และลำดับชั้น",
        "body": "Temporal locality คือใช้ข้อมูลเดิมซ้ำในเวลาใกล้กัน ส่วน spatial locality คือเข้าถึงตำแหน่งใกล้กัน Memory hierarchy เก็บข้อมูลที่คาดว่าจะใช้ไว้ในระดับที่เล็กและเร็วใกล้ CPU แล้วคัดลอกเป็น block หรือ cache line จากระดับล่าง เมื่อพบข้อมูลเรียก hit; miss rate = 1−hit rate และ miss ต้องเสียเวลาเติม block",
        "to": 8,
        "from": 4
      },
      {
        "title": "SRAM, DRAM และ Bandwidth",
        "body": "Cache มักใช้ SRAM ซึ่งเร็วแต่ราคา/bit สูง ส่วน main memory ใช้ DRAM ที่เก็บประจุและต้อง refresh การเปิด row, burst transfer, DDR และการแบ่ง bank ช่วยเพิ่ม bandwidth ได้ แต่ latency กับ bandwidth เป็นคนละตัวชี้วัด ตารางราคาและรุ่น DRAM ในสไลด์เป็นข้อมูลประกอบในอดีต ไม่ใช่ราคาปัจจุบัน",
        "to": 14,
        "from": 9
      },
      {
        "title": "Flash และ Magnetic Disk",
        "body": "Flash เป็น nonvolatile: NOR เหมาะกับการเข้าถึงเพื่ออ่านคำสั่ง ส่วน NAND หนาแน่นกว่าและใช้เก็บข้อมูลเป็น block การเขียน/ลบทำให้เสื่อมจึงมี wear leveling กระจายการใช้งาน Magnetic disk มีเวลา seek, rotational latency, transfer, controller และอาจมี queue; ค่าเฉลี่ย rotation เท่ากับครึ่งรอบเมื่อสมมติจุดเริ่มกระจายสม่ำเสมอ",
        "to": 20,
        "from": 15
      },
      {
        "title": "Direct Mapped: ที่อยู่ไปช่องไหน",
        "body": "Direct-mapped ให้ memory block แต่ละก้อนลง cache ได้ช่องเดียว: block address = floor(byte address/block size) และ index = block address mod จำนวน lines แบ่ง address เป็น tag/index/offset; offset เลือก byte ใน block ส่วน tag บอกว่าเป็น block ใด Valid bit ต้องเป็น 1 และ tag ตรงกันจึง hit",
        "to": 32,
        "from": 21
      },
      {
        "title": "ขนาด Block ไม่ใช่ยิ่งใหญ่ยิ่งดี",
        "body": "Block ใหญ่ช่วย spatial locality เพราะดึงข้อมูลข้างเคียงมาด้วย แต่เมื่อ cache รวมเท่าเดิมจะเหลือจำนวน lines น้อยลง เกิดการแข่งขันหรือ pollution ได้และ miss penalty สูงขึ้น เมื่อ miss แบบ blocking CPU ต้องรอเติม block ก่อนทำ access ต่อ; early restart/critical-word-first ช่วยส่งค่าที่ต้องใช้ก่อนส่วนที่เหลือได้",
        "to": 34,
        "from": 33
      },
      {
        "title": "Write Hit และ Write Miss",
        "body": "Write-through เขียนทั้ง cache และระดับล่าง โดย write buffer ช่วยพักข้อมูลแต่เต็มแล้วก็ยัง stall ได้ Write-back เขียนเฉพาะ cache ก่อนและตั้ง dirty bit; เมื่อจะไล่ dirty block ออกจึงเขียนกลับ Write allocate คือ fetch block เมื่อ write miss ส่วน write around ไม่ดึง block เข้า cache; ต้องระบุ policy ก่อนวิเคราะห์ลำดับ access",
        "to": 37,
        "from": 35
      },
      {
        "title": "วัด Cache ด้วย CPI และ AMAT",
        "body": "ภายใต้แบบจำลองที่ stall ไม่ซ้อนทับกัน memory stall cycles = accesses×miss rate×miss penalty หรือ IC×misses/instruction×penalty Actual CPI = base CPI + stall cycles/instruction โดยแยก I-cache กับ D-cache ตามจำนวน access จริง AMAT = hit time + miss rate×miss penalty เมื่อ penalty หมายถึงเวลาที่เพิ่มจาก hit time และต้องใช้หน่วยเดียวกัน",
        "to": 44,
        "from": 40
      },
      {
        "title": "Associativity และ Replacement",
        "body": "Fully associative ลงได้ทุก entry แต่ต้องค้นหา tag หลายตัว ส่วน n-way set associative เลือก set ด้วย block number mod จำนวน sets แล้วค้นใน nways Direct-mapped คือ 1-way และไม่มีสิทธิ์เลือก victim; set-associative เลือกช่อง invalid ก่อนหรือใช้นโยบายเช่น LRU/Random LRU เลือก block ที่ถูกใช้นานที่สุดในอดีตและยังไม่ได้ใช้อีก ไม่ใช่ block ที่เพิ่งเข้ามาเสมอ",
        "to": 52,
        "from": 45
      },
      {
        "title": "Cache หลายระดับ",
        "body": "L1 เน้น hit time ต่ำ ส่วน L2 ใหญ่กว่าและรับ miss จาก L1 เพื่อลดการไป main memory Local miss rate ของ L2 คิดจาก access ที่มาถึง L2 แต่ global miss rate คิดจาก access ตั้งต้น จึงห้ามคูณอัตราซ้ำเมื่อเป็น global อยู่แล้ว ตัวอย่างหน้า 55 พิมพ์ extra penalty500cycles แต่ข้อมูล 100ns กับ 4GHz และสมการใช้ 400cycles; แบบฝึกยึดหน่วยเวลาที่ให้",
        "to": 56,
        "from": 53
      },
      {
        "title": "Software ช่วย Locality",
        "body": "Memory access pattern ขึ้นกับ algorithm และ compiler การทำ cache blocking แบ่ง matrix เป็นชิ้นย่อยเพื่อใช้ข้อมูลซ้ำให้มากก่อนถูกแทนที่ และสามารถรวมกับ vector/subword parallelism ได้ Out-of-order และ non-blocking cache อาจซ่อนการรอบางส่วนด้วยงานอิสระ จึงใช้ AMAT เพียงค่าเดียวทำนายเวลาทั้งโปรแกรมไม่ได้",
        "to": 62,
        "from": 57
      },
      {
        "title": "Dependability และ Availability",
        "body": "Fault ที่ component อาจนำไปสู่ service failure หรือถูกทนไว้ได้ MTTF คือเวลาเฉลี่ยก่อน failure ส่วน MTTR คือเวลาเฉลี่ยซ่อม; ในแบบจำลองบท MTBF=MTTF+MTTR และ availability=MTTF/(MTTF+MTTR) เพิ่มความพร้อมใช้งานได้ทั้งลดโอกาสล้มเหลวและลดเวลาซ่อม",
        "to": 64,
        "from": 63
      },
      {
        "title": "Hamming และ ECC",
        "body": "Hamming distance คือจำนวนบิตที่ต่างกัน; code ระยะต่ำสุด 2 ตรวจ single-bit error ได้ และระยะ 3 ใช้แก้ single-bit error ได้ ตำแหน่ง parity ของ Hamming เป็นกำลังของ 2 เช่น 1,2,4,8 โดย syndrome บอกตำแหน่ง error เมื่อมี single-bit error การเพิ่ม overall parity ให้ระยะ 4 รองรับ SECDED หรือแก้ 1 บิต/ตรวจ 2 บิต; สไลด์หน้า 68 ใช้ชื่อ SEC/DEC คลาดเคลื่อนและไม่ควรตีความว่าแก้ 2 บิตได้",
        "to": 68,
        "from": 65
      },
      {
        "title": "Virtual Machine และ VMM",
        "body": "Virtual machine ช่วยแบ่งทรัพยากรให้ guest หลายชุดพร้อม isolation โดย Virtual Machine Monitor (VMM)จับคู่ CPU, memory และ I/O เสมือนกับของจริง Guest OS อาจต่างจาก host และต้องอาศัยการจัดการ privileged operations VMM จัด physical timer และอาจสร้าง virtual timer interrupt ให้ guest; การ virtualize มี overhead และไม่เท่ากับไม่มีความเสี่ยงเลย",
        "to": 72,
        "from": 69
      },
      {
        "title": "Virtual Memory และ Page Table",
        "body": "Virtual memory ให้แต่ละ program มี virtual address space และแปลเป็น physical address ร่วมกับ OS หน่วยย้ายข้อมูลเรียก page; แบ่ง address เป็น virtual page number กับ page offset ซึ่งคงเดิมหลัง translation Page table มี PTE บอก physical page และสถานะ; เมื่อ page ที่ต้องใช้ไม่อยู่ main memory ตามแบบ demand paging ต้องเกิด page fault ให้ OS นำเข้ามา",
        "to": 78,
        "from": 73
      },
      {
        "title": "TLB Miss ต่างจาก Page Fault",
        "body": "TLB เป็น cache ของ address translations หรือ PTE ไม่ใช่ cache เก็บ data block ทั่วไป ถ้า TLB miss แต่ page อยู่ memory แล้ว เพียงหา PTE มาเติมและลองคำสั่งใหม่ ถ้า page ไม่อยู่ memory ต้องให้ OS จัดการ page fault อาจเขียน dirty victim กลับ disk ก่อนอ่าน page ใหม่ อัปเดต mapping และ restart คำสั่งเดิม",
        "to": 84,
        "from": 79
      },
      {
        "title": "Protection และ Address ของ Cache",
        "body": "Page table กับ privileged state ต้องถูกป้องกันจากโปรแกรมทั่วไป โดยใช้ supervisor/kernel mode และ exception เช่น ecall ถ้า cache ใช้ physical tag ต้องพิจารณา translation ก่อนตรวจ tag ส่วน virtual tag มีปัญหา aliasing เมื่อหลาย virtual addresses ชี้ physical address เดียวกัน แยก permission ในการเข้าถึงออกจากการมี page อยู่ใน memory",
        "to": 86,
        "from": 85
      },
      {
        "title": "กรอบร่วมและ Miss 3 ชนิด",
        "body": "ทุกระดับต้องตอบว่า block วางที่ไหน หาอย่างไร เปลี่ยนตัวใด และเขียนกลับเมื่อใด Compulsory miss คือครั้งแรกที่ใช้ block, capacity miss เกิดเมื่อพื้นที่รวมไม่พอ และ conflict miss เกิดจากแย่ง entry/set ซึ่งจะหายไปถ้าใช้ fully associative ขนาดรวมเท่ากัน การเพิ่มขนาด cache, associativity หรือ block size มีผลคนละด้านและอาจเพิ่ม hit time หรือ penalty",
        "to": 93,
        "from": 87
      },
      {
        "title": "Cache Controller เป็น FSM",
        "body": "ตัวอย่าง blocking direct-mapped write-back/write-allocate มี states Idle, Compare Tag, Write-Back และ Allocate เมื่อ miss และ victim สะอาดสามารถไป Allocate; ถ้า dirty ต้อง Write-Back ก่อน เมื่อ memory ไม่ Ready ต้องรอ state ที่เกี่ยวข้องจนสำเร็จ แล้วกลับตรวจ tag/ทำ access ตามลำดับ",
        "to": 97,
        "from": 94
      },
      {
        "title": "Coherence กับ Consistency",
        "body": "หลาย core อาจมีสำเนา X ใน cache คนละชุด แม้ write-through อัปเดต memory แล้ว สำเนาอีก core ก็อาจยังเก่า Coherence ดูความถูกต้องและลำดับ writes ของตำแหน่งเดียว ใช้ snooping หรือ directory และ invalidate สำเนาอื่นได้ ส่วน consistency กำหนดการเห็นลำดับ memory operations หลายตำแหน่ง; ข้อสรุปเรื่องเขียน X ก่อน Y ในบทต้องยึดสมมติฐาน ordering ที่กำหนด",
        "to": 102,
        "from": 98
      },
      {
        "title": "ตัวอย่างจริงและข้อควรระวัง",
        "body": "ตัวอย่าง Cortex-A53 กับ Core i7 แสดง split L1, cache หลายระดับและ TLB หลายระดับ แต่ค่าขนาดเป็นของรุ่นในสไลด์ Multi-bank, prefetch และ hit-under-miss ช่วยรองรับหลาย access; คำสั่ง system เช่น ecall, CSR และ fence จัดการสิทธิ์/สถานะ/ordering ตาม ISA ต้องแยก byte address จาก word address และระบุ address width ให้ตรง: หน้า 32 ภาพหัว 63 แต่จำนวน tag/index/offset รวม 32 บิต จึงห้ามใช้ป้ายคลาดเคลื่อนคำนวณ",
        "to": 111,
        "from": 103
      }
    ],
    "takeaways": [
      "Temporal=ใช้ซ้ำ; spatial=ใช้ข้อมูลใกล้กัน",
      "Block address=floor(byte address/block size); index หรือ set ใช้ mod จำนวนช่องที่เกี่ยวข้อง",
      "Hit ต้อง valid และ tag ตรงกัน; dirty หมายถึง cache มีข้อมูลที่ต้องเขียนกลับ",
      "AMAT=hit time+miss rate×miss penalty ในแบบจำลองที่ระบุ",
      "Associativity ช่วยลด conflict แต่เพิ่มต้นทุนและอาจเพิ่ม hit time",
      "TLB miss อาจไม่มี page fault; offset ไม่เปลี่ยนระหว่าง translation",
      "Write-through อย่างเดียวไม่รับประกัน coherence ของ cache หลาย core",
      "FSM, protection, ECC และ coherence เป็นส่วนของความถูกต้องควบคู่ความเร็ว"
    ],
    "questions": [
      {
        "id": "ca04:0",
        "prompt": "วนอ่านตัวแปรเดิมซ้ำในเวลาใกล้กัน เป็น locality แบบใด",
        "options": [
          "Spatial locality เท่านั้น",
          "Cache coherence",
          "Wear leveling",
          "Temporal locality"
        ],
        "correct": 3,
        "explanation": "Temporal อ้างการใช้รายการเดิมอีกเร็ว ๆ นี้ ส่วน spatial อ้างตำแหน่งข้างเคียง",
        "to": 5,
        "level": "easy",
        "set": 1,
        "from": 4
      },
      {
        "id": "ca04:1",
        "prompt": "อ่าน array ที่เรียงต่อกันทีละสมาชิก เหตุใด cache line ที่มีหลายสมาชิกจึงช่วยได้",
        "options": [
          "ใช้ประโยชน์จาก spatial locality ของข้อมูลใกล้กัน",
          "เพราะทุกสมาชิกกลายเป็น address เดียวกัน",
          "เพราะไม่ต้องใช้ tag อีกเลย",
          "เพราะเกิด page fault ทุกครั้งแล้วเร็วขึ้น"
        ],
        "correct": 0,
        "explanation": "การดึง block นำข้อมูลข้างเคียงมาด้วย จึงอาจพบสมาชิกถัดไปใน cache โดยไม่เติมใหม่",
        "to": 8,
        "level": "medium",
        "set": 1,
        "from": 4
      },
      {
        "id": "ca04:2",
        "prompt": "Hit time=2ns, miss rate=5%, miss penalty เพิ่มเติม=40ns ภายใต้แบบจำลองไม่ซ้อนทับ AMAT เท่าไร",
        "options": [
          "2.1ns",
          "4ns",
          "40ns",
          "42ns"
        ],
        "correct": 1,
        "explanation": "AMAT=2+0.05×40=4ns ต้องคูณ penalty ด้วยอัตรา miss ไม่ใช่บวก penalty ทุกครั้ง",
        "to": 43,
        "level": "hard",
        "set": 1,
        "from": 43
      },
      {
        "id": "ca04:3",
        "prompt": "Block หรือ cache line คืออะไร",
        "options": [
          "จำนวน physical cores",
          "ชื่อของ instruction register",
          "หน่วยข้อมูลที่คัดลอกระหว่างระดับของ memory hierarchy",
          "เวลาที่ OS ใช้ซ่อมเครื่อง"
        ],
        "correct": 2,
        "explanation": "Block เป็นหน่วยเติมข้อมูลและอาจมีหลาย word ไม่ใช่เวลาหรือส่วนควบคุม CPU",
        "to": 8,
        "level": "easy",
        "set": 1,
        "from": 7
      },
      {
        "id": "ca04:4",
        "prompt": "Direct-mapped cache มี 8lines และ 1word ต่อ line ถ้าโจทย์ให้ word address22 จะลง index ใด",
        "options": [
          "2",
          "3",
          "22",
          "6"
        ],
        "correct": 3,
        "explanation": "เมื่อ 1word/block block address เท่ากับ word address จึง 22 mod8=6 อย่าสับสนกับ byte address ที่ต้องหารขนาด block ก่อน",
        "to": 26,
        "level": "medium",
        "set": 1,
        "from": 23
      },
      {
        "id": "ca04:5",
        "prompt": "สมมติ byte address32 บิต cache direct-mapped16KiB และ block16byte ข้อมูลอย่างเดียวไม่รวม metadata ต้องมี tag/index/offset กี่บิต",
        "options": [
          "18 / 10 / 4",
          "22 / 6 / 4",
          "16 / 12 / 4",
          "20 / 10 / 2"
        ],
        "correct": 0,
        "explanation": "มี 16384/16=1024lines จึง index10 บิต;offsetlog2(16)=4;tag32−10−4=18",
        "to": 94,
        "level": "hard",
        "set": 1,
        "from": 94
      },
      {
        "id": "ca04:6",
        "prompt": "Valid bit=0 บอกอะไร",
        "options": [
          "ข้อมูลต้อง dirty เสมอ",
          "ช่องนั้นยังไม่มี block ที่ใช้เป็น hit ได้",
          "tag ตรงกับทุก address เสมอ",
          "ช่องนั้นเป็น fully associative"
        ],
        "correct": 1,
        "explanation": "แม้ tag ในช่องมีค่า แต่ valid0 ก็ยังใช้เป็น hit ไม่ได้ เช่น cache เริ่มต้นในตัวอย่าง",
        "to": 25,
        "level": "easy",
        "set": 1,
        "from": 24
      },
      {
        "id": "ca04:7",
        "prompt": "Cache direct-mapped มี 8lines ขณะหนึ่ง index2 เก็บ block26 อยู่ แล้วอ่าน block18 เหตุใดจึง miss",
        "options": [
          "เพราะ 18 mod8 เท่ากับ 0",
          "เพราะ valid1 แปลว่า tag ทุกค่าตรงกัน",
          "ทั้งคู่ใช้ index2 แต่ tag ต่างกัน",
          "เพราะ block18 ไม่สามารถอยู่ใน memory"
        ],
        "correct": 2,
        "explanation": "26 mod8 และ 18 mod8 เท่ากับ 2 แต่เป็นคนละ block จึงต้องแทนช่องเดียวกัน เป็นตัวอย่าง conflict",
        "to": 30,
        "level": "medium",
        "set": 1,
        "from": 27
      },
      {
        "id": "ca04:8",
        "prompt": "Cache direct-mapped4lines เริ่มว่าง เข้าถึง block0,8,0,6,8 ตามลำดับ จะ hit กี่ครั้ง",
        "options": [
          "1 ครั้ง",
          "2 ครั้ง",
          "3 ครั้ง",
          "0 ครั้ง"
        ],
        "correct": 3,
        "explanation": "0 กับ 8 แย่ง index0 กันทุกครั้งที่สลับ ส่วน 6 เข้าครั้งแรกที่ index2 จึง miss ครบ 5access",
        "to": 49,
        "level": "hard",
        "set": 1,
        "from": 48
      },
      {
        "id": "ca04:9",
        "prompt": "Write-through หมายถึงอะไรเมื่อ write hit",
        "options": [
          "เขียนทั้ง cache และระดับล่าง",
          "เขียนเฉพาะ tag",
          "เขียนเฉพาะ disk โดยข้าม cache เสมอ",
          "ไม่เขียนจนกว่า CPU ปิดเครื่อง"
        ],
        "correct": 0,
        "explanation": "Write-through ส่งการเปลี่ยนแปลงลงระดับล่างด้วย ต่างจาก write-back ซึ่งเลื่อนไปตอนแทน dirty block",
        "to": 36,
        "level": "easy",
        "set": 1,
        "from": 35
      },
      {
        "id": "ca04:10",
        "prompt": "Cache แบบ write-back มี dirty bit เพื่ออะไร",
        "options": [
          "บอกว่า tag ว่างเสมอ",
          "บอกว่า block ถูกแก้ไขและต้องเขียนกลับเมื่อแทนที่",
          "นับจำนวน page ทั้งหมด",
          "บอกว่าข้อมูลเป็น ASCII"
        ],
        "correct": 1,
        "explanation": "Dirty ไม่เท่ากับ invalid แต่หมายถึงสำเนาระดับบนเปลี่ยนไปและระดับล่างยังไม่ได้รับการอัปเดต",
        "to": 37,
        "level": "medium",
        "set": 1,
        "from": 36
      },
      {
        "id": "ca04:11",
        "prompt": "Base CPI=2, I-cache miss/instruction=2%, loads/stores=36%ของคำสั่ง, D-cache miss/access=4%, penalty100cycles (ไม่ซ้อนทับ) CPI รวมเท่าไร",
        "options": [
          "4.00",
          "8.00",
          "5.44",
          "3.44"
        ],
        "correct": 2,
        "explanation": "เพิ่ม I-stall0.02×100=2 และ D-stall0.36×0.04×100=1.44 จึง 2+2+1.44=5.44 ต้องไม่ลืม base CPI หรือสัดส่วน data accesses",
        "to": 42,
        "level": "hard",
        "set": 1,
        "from": 41
      },
      {
        "id": "ca04:12",
        "prompt": "Fully associative อนุญาตให้ block หนึ่งวางที่ใด",
        "options": [
          "index เดียวที่ mod กำหนดเสมอ",
          "เฉพาะ entry ที่ 0",
          "เฉพาะช่องที่ dirty อยู่",
          "entry ใดก็ได้ใน cache"
        ],
        "correct": 3,
        "explanation": "Fully associative มีอิสระทุก entry แต่ต้องค้นหลาย tag ขณะที่ direct-mapped มีช่องเดียว",
        "to": 47,
        "level": "easy",
        "set": 1,
        "from": 45
      },
      {
        "id": "ca04:13",
        "prompt": "Cache มี 16lines แบ่งเป็น 4-way set associative จะมีกี่ sets และ block10 ลง set ใด",
        "options": [
          "4sets และ set2",
          "4sets และ set10",
          "16sets และ set2",
          "64sets และ set10"
        ],
        "correct": 0,
        "explanation": "จำนวน sets=16/4=4 และ set=10 mod4=2;way คือจำนวน entry ต่อ set ไม่ใช่จำนวน sets",
        "to": 47,
        "level": "medium",
        "set": 1,
        "from": 45
      },
      {
        "id": "ca04:14",
        "prompt": "2-way set เดียวเริ่มว่าง ใช้ LRU เข้าถึง block0,8,0,6 แล้วต้องไล่ block ใดออกเมื่ออ่าน 6",
        "options": [
          "block0",
          "block8",
          "block6",
          "ทั้ง 0 และ 8 เสมอ"
        ],
        "correct": 1,
        "explanation": "หลังอ่าน 0 ซ้ำ block0 เป็น most recently used ดังนั้น 8 ซึ่งไม่ได้ใช้มานานกว่าคือ victim ตาม LRU",
        "to": 52,
        "level": "hard",
        "set": 1,
        "from": 49
      },
      {
        "id": "ca04:15",
        "prompt": "DRAM ต้องทำสิ่งใดเป็นระยะเพื่อรักษาค่า",
        "options": [
          "เขียนข้อมูลลง disk ทุก clock เสมอ",
          "เปลี่ยน opcode ของ CPU",
          "Refresh ประจุที่เก็บข้อมูล",
          "เพิ่มจำนวน bits ของทุก cell"
        ],
        "correct": 2,
        "explanation": "DRAM เก็บข้อมูลเป็นประจุที่ capacitor ซึ่งต้อง refresh ต่างจากการเก็บแบบ static",
        "to": 13,
        "level": "easy",
        "set": 2,
        "from": 10
      },
      {
        "id": "ca04:16",
        "prompt": "NAND flash มีการใช้งานเขียน/ลบไม่เท่ากันทุก block กลไกใดช่วยยืดอายุโดยกระจายภาระ",
        "options": [
          "Instruction decoding",
          "Logical left shift",
          "TLB miss",
          "Wear leveling"
        ],
        "correct": 3,
        "explanation": "Wear leveling ย้าย mapping ให้ใช้งาน block ที่สึกน้อยกว่าเพื่อลดการเขียนซ้ำที่เดิม",
        "to": 16,
        "level": "medium",
        "set": 2,
        "from": 15
      },
      {
        "id": "ca04:17",
        "prompt": "Disk7200rpm ไม่มี queue สมมติตำแหน่งหมุนเริ่มแบบสุ่มสม่ำเสมอ rotational latency เฉลี่ยประมาณเท่าไร",
        "options": [
          "4.17ms",
          "8.33ms",
          "0.12ms",
          "60ms"
        ],
        "correct": 0,
        "explanation": "หนึ่งรอบ=60/7200s=8.33ms เฉลี่ยรอครึ่งรอบจึง 4.17ms ยังไม่รวม seek และ transfer",
        "to": 19,
        "level": "hard",
        "set": 2,
        "from": 17
      },
      {
        "id": "ca04:18",
        "prompt": "หน่วยความจำที่บทใช้เป็นตัวอย่างสำหรับ cache โดยทั่วไปคือชนิดใด",
        "options": [
          "Magnetic tape",
          "SRAM",
          "Optical disk",
          "NAND อย่างเดียว"
        ],
        "correct": 1,
        "explanation": "SRAM เร็วแต่ขนาดเล็กและต้นทุนสูงกว่าจึงเหมาะกับ cache ส่วน DRAM เหมาะกับ main memory",
        "to": 10,
        "level": "easy",
        "set": 2,
        "from": 5
      },
      {
        "id": "ca04:19",
        "prompt": "DDR เพิ่มอัตราการถ่ายข้อมูลด้วยวิธีใดตามบท",
        "options": [
          "เพิ่มความกว้าง address เป็นสองเท่าทุก cycle",
          "อ่านทุกข้อมูลจาก disk แทน DRAM",
          "ถ่ายข้อมูลทั้งขอบขาขึ้นและขาลงของ clock",
          "ยกเลิก refresh ทั้งหมด"
        ],
        "correct": 2,
        "explanation": "Double data rate ใช้สองขอบ clock เพื่อ transfer แต่ไม่ได้แปลว่า latency ทุก access ลดครึ่งหนึ่ง",
        "to": 13,
        "level": "medium",
        "set": 2,
        "from": 11
      },
      {
        "id": "ca04:20",
        "prompt": "CPU4GHz มี base CPI1, L1miss/instruction2%, L2access5ns, global memory miss/instruction0.5%, memory penalty เพิ่มเติม 100ns สมมติ stall ไม่ซ้อน CPI รวมเท่าไร",
        "options": [
          "9.0",
          "1.5",
          "11.4",
          "3.4"
        ],
        "correct": 3,
        "explanation": "Cycle0.25ns จึง L2=20cycles และ memory=400cycles;CPI=1+0.02×20+0.005×400=3.4 ใช้ global rate0.005 ตรง ๆ",
        "to": 56,
        "level": "hard",
        "set": 2,
        "from": 54
      },
      {
        "id": "ca04:21",
        "prompt": "MTTR เป็นตัววัดใด",
        "options": [
          "เวลาเฉลี่ยที่ใช้ซ่อม/ฟื้นบริการ",
          "เวลาเฉลี่ยก่อนเกิด failure",
          "จำนวน cache misses ต่อคำสั่ง",
          "เวลาค้นหา TLB"
        ],
        "correct": 0,
        "explanation": "MTTR คือ Mean Time To Repair ส่วน MTTF คือ Mean Time To Failure จึงมีบทบาทคนละส่วนใน availability",
        "to": 64,
        "level": "easy",
        "set": 2,
        "from": 63
      },
      {
        "id": "ca04:22",
        "prompt": "MTTF=990 ชั่วโมงและ MTTR=10 ชั่วโมง availability ในแบบจำลองของบทเท่าไร",
        "options": [
          "1%",
          "99%",
          "90%",
          "100%"
        ],
        "correct": 1,
        "explanation": "Availability=990/(990+10)=0.99;MTTR ต่ำช่วยลดเวลาที่บริการขัดข้อง",
        "to": 64,
        "level": "medium",
        "set": 2,
        "from": 64
      },
      {
        "id": "ca04:23",
        "prompt": "Hamming SEC syndrome=1010₂ ภายใต้สมมติฐานว่ามี single-bit error และนับตำแหน่งแบบในบท ควรแก้บิตใด",
        "options": [
          "บิตตำแหน่ง 2",
          "บิตตำแหน่ง 5",
          "บิตตำแหน่ง 10",
          "ทุกบิตที่เป็น 1 ในข้อมูล"
        ],
        "correct": 2,
        "explanation": "Syndrome ตีความเป็นหมายเลขตำแหน่ง error:1010₂=10 การแก้ตามนี้ต้องอาศัยสมมติฐาน single-bit error",
        "to": 67,
        "level": "hard",
        "set": 2,
        "from": 66
      },
      {
        "id": "ca04:24",
        "prompt": "VMM ทำหน้าที่หลักใด",
        "options": [
          "เป็น cache เก็บเฉพาะ data bytes",
          "เป็นคำสั่งบวกเลขหนึ่งคำสั่ง",
          "เป็นชุดอักขระแทน ASCII",
          "จับคู่ virtual resources ของ guest กับ physical resources"
        ],
        "correct": 3,
        "explanation": "VMM ดูแล CPU memory และ I/O เสมือน รวมการ trap หรือ emulate งานที่ต้องควบคุมสิทธิ์",
        "to": 71,
        "level": "easy",
        "set": 2,
        "from": 69
      },
      {
        "id": "ca04:25",
        "prompt": "เหตุใด guest OS จึงไม่ควรแก้ physical interrupt controls ได้อิสระโดยไม่ผ่านกลไก virtualization",
        "options": [
          "อาจกระทบการแบ่งและการป้องกันทรัพยากรของ VM อื่น",
          "เพราะ guest OS ไม่มีโค้ดเลย",
          "เพราะ timer เป็นข้อมูล ASCII เสมอ",
          "เพราะทุกคำสั่งใน user mode ต้องเป็น NOP"
        ],
        "correct": 0,
        "explanation": "Privileged resources ต้องอยู่ภายใต้การควบคุมของระบบ/VMM เพื่อรักษา isolation และแบ่งทรัพยากรให้หลาย guest",
        "to": 72,
        "level": "medium",
        "set": 2,
        "from": 70
      },
      {
        "id": "ca04:26",
        "prompt": "Page ขนาด 4KiB แปล virtual page5 ไป physical frame9; virtual byte address5×4096+100 จะเป็น physical address ใด",
        "options": [
          "20580",
          "36964",
          "36864",
          "45156"
        ],
        "correct": 1,
        "explanation": "Offset100 ไม่เปลี่ยน จึง physical=9×4096+100=36964 ไม่ใช่ใช้เลข virtual page เดิม",
        "to": 77,
        "level": "hard",
        "set": 2,
        "from": 73
      },
      {
        "id": "ca04:27",
        "prompt": "TLB เก็บอะไรเป็นหลัก",
        "options": [
          "สำเนา data block ของทุก array ทั้งหมด",
          "รหัส ASCII ครบทุกภาษา",
          "ข้อมูลการแปล virtual page ไป physical page",
          "ข้อมูลจาก hard disk ทั้งลูก"
        ],
        "correct": 2,
        "explanation": "TLB เป็น cache ของ translations/PTE ส่วน data cache เก็บเนื้อหาข้อมูล เป็นคนละบทบาท",
        "to": 81,
        "level": "easy",
        "set": 2,
        "from": 80
      },
      {
        "id": "ca04:28",
        "prompt": "TLB miss แต่ PTE บอกว่า page อยู่ main memory แล้ว ข้อใดเหมาะสม",
        "options": [
          "ต้องเกิด disk I/O ทุก TLB miss",
          "ลบ program ออกจาก memory เสมอ",
          "เปลี่ยน page offset ให้เป็น 0 เสมอ",
          "เติม translation จาก page table แล้ว retry โดยไม่จำเป็นต้องอ่าน page จาก disk"
        ],
        "correct": 3,
        "explanation": "TLB miss หมายถึงไม่มี translation ใน TLB ไม่ได้ยืนยันว่า page หายจาก main memory",
        "to": 83,
        "level": "medium",
        "set": 2,
        "from": 82
      },
      {
        "id": "ca04:29",
        "prompt": "OS ต้องนำ page ใหม่เข้า memory และเลือก victim ที่ dirty ลำดับใดรักษาข้อมูลได้ถูกต้องตามแบบจำลองในบท",
        "options": [
          "เขียน dirty victim กลับก่อน แล้วอ่าน page ใหม่และปรับ mapping",
          "อ่าน page ใหม่ทับ victim ทันทีโดยทิ้งข้อมูลเดิม",
          "ตั้ง TLB hit โดยไม่แก้ page table",
          "restart คำสั่งโดยไม่ทำอะไรกับ page"
        ],
        "correct": 0,
        "explanation": "Dirty victim มีข้อมูลใหม่ที่ยังไม่ลง disk ต้องเก็บก่อนทับ จากนั้นอัปเดต page table และ restart คำสั่งที่ fault",
        "to": 84,
        "level": "hard",
        "set": 2,
        "from": 79
      },
      {
        "id": "ca04:30",
        "prompt": "Page offset เป็นอย่างไรเมื่อแปล virtual เป็น physical ด้วย page ขนาดเท่ากัน",
        "options": [
          "ต้องบวก bias127",
          "คงค่าเดิม",
          "ต้องกลับทุกบิต",
          "เปลี่ยนเป็น physical frame number"
        ],
        "correct": 1,
        "explanation": "การ translation แทน page number แต่ตำแหน่งภายใน page ยังเดิม จึงคง offset ไว้",
        "to": 77,
        "level": "easy",
        "set": 3,
        "from": 74
      },
      {
        "id": "ca04:31",
        "prompt": "Reference bit กับ dirty bit ใน PTE ต่างกันอย่างไร",
        "options": [
          "ทั้งคู่หมายถึง page อยู่ disk เท่านั้น",
          "Reference นับ bytes ส่วน dirty นับ clock",
          "Reference บอกการเข้าถึง ส่วน dirty บอกว่ามีการเขียนเปลี่ยนข้อมูล",
          "Dirty ใช้เลือก ASCII และ reference ใช้เลือก opcode"
        ],
        "correct": 2,
        "explanation": "Reference ช่วยประมาณความใหม่ของการใช้งาน ส่วน dirty ใช้ตัดสินว่าต้อง write-back ก่อนแทน page หรือไม่",
        "to": 79,
        "level": "medium",
        "set": 3,
        "from": 76
      },
      {
        "id": "ca04:32",
        "prompt": "นักศึกษาบอกว่า TLB miss คือ page fault ทุกครั้ง ข้อโต้แย้งใดตรงที่สุด",
        "options": [
          "TLB ไม่เกี่ยวกับ address translation",
          "Page fault ทุกครั้งเป็น cache hit แน่นอน",
          "RAM ไม่สามารถเก็บ page ได้",
          "Translation อาจหายจาก TLB แต่ page ยังอยู่ RAM จึงโหลด PTE ได้โดยไม่ดึง page จาก disk"
        ],
        "correct": 3,
        "explanation": "TLB กับ main memory เป็นคนละระดับของข้อมูล:translation อาจไม่อยู่ cache แม้ page จริงยังอยู่ memory",
        "to": 84,
        "level": "hard",
        "set": 3,
        "from": 80
      },
      {
        "id": "ca04:33",
        "prompt": "การเข้าถึง block หนึ่งเป็นครั้งแรกใน cache ที่เริ่มว่าง จัดเป็น miss ประเภทใด",
        "options": [
          "Compulsory miss",
          "Conflict miss เท่านั้น",
          "Coherence hit",
          "Dirty hit"
        ],
        "correct": 0,
        "explanation": "Compulsory หรือ cold-start เกิดเพราะยังไม่เคยนำ block นั้นเข้ามา การเพิ่ม associativity อย่างเดียวไม่ลบ first touch",
        "to": 93,
        "level": "easy",
        "set": 3,
        "from": 92
      },
      {
        "id": "ca04:34",
        "prompt": "ข้อมูลที่ต้องใช้ซ้ำมีจำนวนมากกว่าความจุ cache รวม แม้ใช้ fully associative ก็ยังไล่ข้อมูลกัน ปัญหาหลักคืออะไร",
        "options": [
          "Conflict misses จาก index อย่างเดียว",
          "Capacity misses",
          "ASCII overflow",
          "Translation aliasing เสมอ"
        ],
        "correct": 1,
        "explanation": "Capacity เกิดจากพื้นที่รวมไม่พอ ส่วน conflict อ้างการแข่งขันเฉพาะ entry/set ที่ยังเกิดเพราะข้อจำกัด placement",
        "to": 93,
        "level": "medium",
        "set": 3,
        "from": 92
      },
      {
        "id": "ca04:35",
        "prompt": "Cache ขนาดเดิมมีสอง block สลับใช้แต่ลง direct-mapped ช่องเดียวกัน หากเพิ่ม associativity ช่วยได้ การ miss นี้เข้าลักษณะใด",
        "options": [
          "Compulsory miss ของทุก access โดยนิยาม",
          "Capacity miss ที่ fully associative ขนาดเท่ากันแก้ไม่ได้",
          "Conflict miss",
          "Page fault จาก disk แน่นอน"
        ],
        "correct": 2,
        "explanation": "ถ้าพื้นที่รวมพอแต่ mapping ทำให้แย่งช่อง เป็น conflict การเปิดหลาย ways ใน set อาจให้ทั้งคู่คงอยู่ได้",
        "to": 93,
        "level": "hard",
        "set": 3,
        "from": 88
      },
      {
        "id": "ca04:36",
        "prompt": "FSM ย่อมาจากอะไรใน cache controller",
        "options": [
          "Fast Storage Memory",
          "Floating Sign Mantissa",
          "Full System Multithread",
          "Finite State Machine"
        ],
        "correct": 3,
        "explanation": "FSM ใช้ state ปัจจุบันและ inputs กำหนด state ถัดไปเพื่อควบคุมลำดับ access",
        "to": 97,
        "level": "easy",
        "set": 3,
        "from": 96
      },
      {
        "id": "ca04:37",
        "prompt": "Controller แบบ write-back พบ miss และ victim dirty ควรไป state ใดก่อน Allocate",
        "options": [
          "Write-Back",
          "Idle โดยแจ้ง hit ทันที",
          "Compare Tag แล้วลบทิ้งโดยไม่เขียน",
          "Return from ISR"
        ],
        "correct": 0,
        "explanation": "Dirty victim ต้องเขียนกลับเพื่อรักษาข้อมูลก่อนนำ block ใหม่มาแทน ส่วน clean victim ข้าม write-back ได้",
        "to": 97,
        "level": "medium",
        "set": 3,
        "from": 94
      },
      {
        "id": "ca04:38",
        "prompt": "ใน stateAllocate memory ยังไม่ Ready แต่ controller เดินต่อเสมือนเติมข้อมูลเสร็จ อาจผิดอย่างไร",
        "options": [
          "จำนวน address bits เพิ่มโดยอัตโนมัติ",
          "CPU อาจใช้ block ที่ยังไม่ได้รับข้อมูลครบ",
          "CPI จะเป็น 0 โดยนิยาม",
          "TLB เปลี่ยนเป็น fully associative ทันที"
        ],
        "correct": 1,
        "explanation": "FSM ต้องคงอยู่รอ memory พร้อมก่อนดำเนินต่อ จึงรักษาลำดับ request กับ response ให้ถูกต้อง",
        "to": 97,
        "level": "hard",
        "set": 3,
        "from": 95
      },
      {
        "id": "ca04:39",
        "prompt": "ปัญหา cache coherence เกิดได้ในสถานการณ์ใด",
        "options": [
          "มี register เพียงหนึ่งตัวเก็บค่า 0",
          "ASCII มีทั้งตัวพิมพ์ใหญ่และเล็ก",
          "หลาย core มีสำเนาตำแหน่งเดียวกันและสำเนาหนึ่งยังเก่าหลังอีก core เขียน",
          "DRAM มีจำนวน rows เป็นกำลังสอง"
        ],
        "correct": 2,
        "explanation": "Coherence จัดการความสอดคล้องของสำเนาข้อมูลที่ใช้ร่วมกัน การ write-through อัปเดต memory อย่างเดียวไม่อัปเดตสำเนาอื่น",
        "to": 99,
        "level": "easy",
        "set": 3,
        "from": 98
      },
      {
        "id": "ca04:40",
        "prompt": "CPU A จะเขียน X และส่ง invalidate ให้ cache ของ B ผลต่อการอ่าน X ครั้งถัดไปของ B ตามตัวอย่างเป็นอย่างไร",
        "options": [
          "B ใช้สำเนาเก่าเป็น hit ได้เสมอ",
          "B เปลี่ยน addressX เป็น Y โดยอัตโนมัติ",
          "B ต้องปิดเครื่องก่อนอ่าน",
          "Bmiss แล้วต้องรับค่าที่อัปเดตตาม protocol"
        ],
        "correct": 3,
        "explanation": "Invalidate ยกเลิกสำเนาเก่าของ B จึงต้องหาเวอร์ชันถูกต้องเมื่ออ่านใหม่",
        "to": 101,
        "level": "medium",
        "set": 3,
        "from": 100
      },
      {
        "id": "ca04:41",
        "prompt": "สมมติ writes ไม่ถูก reorder และ write เสร็จเมื่อทุก processor เห็นค่า P เขียน X=1 ก่อน Y=1 อีก core เห็น Y ใหม่แล้วควรอนุมานอะไรตามสมมติฐานบท",
        "options": [
          "ควรเห็น X ใหม่ด้วย; ถ้าไม่รับสมมติฐาน ordering นี้จะสรุปเช่นนี้ทันทีไม่ได้",
          "X ต้องเป็น 0 เสมอ",
          "Coherence ของ X ตัวเดียวพอพิสูจน์ทุก ordering โดยไม่มีสมมติฐาน",
          "Y ต้องกลับเป็น 0 ก่อนอ่าน X"
        ],
        "correct": 0,
        "explanation": "Consistency กำหนดลำดับการเห็น operations หลายตำแหน่ง ข้อสรุปนี้จึงผูกกับสมมติฐาน ordering ในหน้า 102 ไม่ใช่เพียง coherence",
        "to": 102,
        "level": "hard",
        "set": 3,
        "from": 99
      },
      {
        "id": "ca04:42",
        "prompt": "Cache blocking ใน matrix multiplication ตั้งใจปรับสิ่งใด",
        "options": [
          "เปลี่ยนทุก element เป็น 8 บิต",
          "ใช้ข้อมูลในชิ้นย่อยซ้ำให้มากก่อนถูกแทนจาก cache",
          "ทำให้ไม่ต้องใช้ main memory เลย",
          "เลิกทำ multiplication ทั้งหมด"
        ],
        "correct": 1,
        "explanation": "Blocking จัดลำดับ access เพื่อเพิ่ม locality ไม่ได้เปลี่ยนความหมายของ matrix operation",
        "to": 62,
        "level": "easy",
        "set": 3,
        "from": 59
      },
      {
        "id": "ca04:43",
        "prompt": "เหตุใด AMAT ค่าเดียวจึงอาจทำนายเวลาโปรแกรมบน out-of-order CPU ได้ไม่ครบ",
        "options": [
          "เพราะ out-of-order ไม่มี cache",
          "เพราะ miss penalty เป็น 0 เสมอ",
          "CPU อาจทำคำสั่งอิสระซ้อนกับ cache miss ทำให้ stall จริงขึ้นกับ data flow",
          "เพราะ CPI ไม่เกี่ยวกับคำสั่งใดเลย"
        ],
        "correct": 2,
        "explanation": "Independent instructions อาจดำเนินต่อระหว่าง miss จึงต้องพิจารณาการซ้อนทับและ dependency ไม่ใช่บวกเวลาทุก access ตรง ๆ",
        "to": 109,
        "level": "medium",
        "set": 3,
        "from": 57
      },
      {
        "id": "ca04:44",
        "prompt": "Cache32byte direct-mapped, block4byte, word4byte: byte address36 กับ word address36 ลง index ใดตามลำดับ",
        "options": [
          "1 และ 1",
          "4 และ 1",
          "0 และ 4",
          "1 และ 4"
        ],
        "correct": 3,
        "explanation": "มี 8lines:byte36 ให้ block9 และ index1;word36 เท่ากับ byte144 ให้ block36 และ index4 ต้องแปลงหน่วยก่อน mod",
        "to": 108,
        "level": "hard",
        "set": 3,
        "from": 108
      }
    ]
  }
]];
