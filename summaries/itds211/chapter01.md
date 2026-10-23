# ITDS211 · บท 1: รู้จักคอมพิวเตอร์และวัดความเร็ว

Computer Components & Architecture

สรุปเรียบเรียงจากเอกสารที่ผู้ใช้ให้ เลขอ้างอิงคือหน้า PDF จากทั้งหมด 43 หน้า ไม่ใช่เลขหน้าหนังสือ โจทย์ในเว็บเขียนขึ้นเพื่อฝึก ไม่ใช่การคาดการณ์ข้อสอบจริง

## หลักที่ควรจำ
- Architecture คือข้อกำหนดที่โปรแกรมเห็น; Organization คือวิธีสร้างให้ทำงานจริง
- CPU มี control unit, ALU และ registers; PC กับ IR มีหน้าที่ต่างกัน
- Cache ใช้ความใกล้และความเร็วช่วยลดเวลาเข้าถึงข้อมูล
- Multicore และ multithreading เป็นคนละแนวคิด
- SIMD ใช้ instruction stream เดียวกับข้อมูลหลาย stream; MIMD ใช้หลายทั้งคู่
- CPU time = IC × CPI / clock rate; เปรียบเทียบงานและสมมติฐานให้เหมือนกัน

## Architecture กับ Organization

Architecture คือสิ่งที่โปรแกรมเมอร์มองเห็น เช่น ชุดคำสั่ง ชนิดข้อมูล และ addressing modes ส่วน Organization คือวิธีทำให้สิ่งเหล่านั้นเกิดขึ้นจริง เช่น cache, pipeline และการเชื่อมวงจร การออกแบบต้องพิจารณาประสิทธิภาพร่วมกับราคา พลังงาน และความพร้อมใช้งาน

อ้างอิง PDF หน้า 3–4

## ประเภทเครื่องและบริการ Cloud

Supercomputer เน้นงานคำนวณวิทยาศาสตร์ขนาดใหญ่ ส่วน embedded computer เป็นส่วนหนึ่งของผลิตภัณฑ์และมีข้อจำกัดด้านพลังงาน ราคา หรือเวลา Cloud เปิดให้ใช้ทรัพยากรร่วมผ่านเครือข่าย: IaaS ให้โครงสร้างพื้นฐาน, PaaS ให้แพลตฟอร์มรันแอป และ SaaS ให้ซอฟต์แวร์สำเร็จรูป

อ้างอิง PDF หน้า 5–8

## จากโปรแกรมสู่ฮาร์ดแวร์

ภาษา high-level ช่วยสื่อปัญหาและพัฒนาโปรแกรม ส่วน assembly เป็นข้อความแทนคำสั่งเครื่อง Compiler แปลภาษาระดับสูง และ assembler แปลง assembly เป็นรหัสเครื่อง ระบบปฏิบัติการดูแล I/O หน่วยความจำ การจัดเก็บ และการแบ่งใช้ทรัพยากร

อ้างอิง PDF หน้า 9–12

## CPU และวงรอบคำสั่ง

ระบบมี input, output, CPU, หน่วยความจำ และที่เก็บข้อมูล ภายใน CPU มี control unit ควบคุมงาน, ALU คำนวณ และ registers เก็บข้อมูลใกล้หน่วยคำนวณ วงรอบพื้นฐานคือ fetch → decode → execute → store; PC ใช้ติดตามตำแหน่งคำสั่ง ส่วน IR ถือคำสั่งที่นำมาแล้ว

อ้างอิง PDF หน้า 13–16

## Cache, Core และ Thread

Cache เล็กและเร็วกว่า main memory โดย L1 อยู่ใกล้ core ที่สุด และมี L2/L3 ช่วยรองรับข้อมูลถัดไป Multicore เพิ่มหน่วยประมวลผลทางกายภาพ ส่วน hardware multithreading ช่วยให้ core เดียวจัดการหลาย thread จึงไม่ควรนับ thread เพิ่มเป็น core ทางกายภาพ

อ้างอิง PDF หน้า 17–23

## จาก Silicon สู่ชิป

กระบวนการผลิตเริ่มจาก silicon ingot ตัดเป็น wafer สร้างลวดลายวงจร ทดสอบ ตัดเป็น die และบรรจุแพ็กเกจ Yield คือสัดส่วน die ที่ทำงานได้บน wafer กราฟในบทแสดงแนวโน้มประสิทธิภาพ single processor ในอดีต ไม่ใช่การรับประกันว่า clock หรือความเร็วจะเพิ่มในอัตราคงที่ตลอดไป

อ้างอิง PDF หน้า 24–26

## RISC, CISC และ Embedded

RISC ย่อจาก Reduced Instruction Set Computing และ CISC ย่อจาก Complex Instruction Set Computing ARM เป็นตัวอย่างตระกูลที่ใช้แนวคิด RISC และพบในระบบ embedded ระบบ embedded มักผูกกับสภาพแวดล้อมและอาจต้องตอบสนองภายในข้อจำกัด real-time; Cortex-M เป็นตัวอย่างที่เน้นพลังงานต่ำและการจัดการ interrupt

อ้างอิง PDF หน้า 27–31

## Parallelism และ Flynn

Data-level parallelism ทำงานแบบเดียวกันกับข้อมูลหลายชิ้น ส่วน task-level parallelism ทำหลายงานที่แยกกัน สถาปัตยกรรมรองรับได้ด้วย ILP, vector/GPU, thread และ request parallelism Flynn แบ่งตาม instruction stream และ data stream: SISD, SIMD, MISD และ MIMD

อ้างอิง PDF หน้า 32–33

## แนวคิดออกแบบและรูปแบบระบบ

แนวคิดสำคัญรวม abstraction, ทำกรณีที่พบบ่อยให้เร็ว, parallelism, pipelining, prediction, memory hierarchy และ redundancy รูปแบบระดับระบบมี monolithic, client-server และ distributed systems ส่วน microservices คือการแยกบริการที่นำไปติดตั้งได้อิสระเป็นหลักในระดับซอฟต์แวร์

อ้างอิง PDF หน้า 10–34

## วัดความเร็วด้วยเวลา

สำหรับงานเดียวกัน Performance = 1 / execution time ถ้า X เร็วกว่า Y เป็น n เท่า จะได้ n = timeY / timeX Elapsed time รวมการรอ I/O และงานระบบ ส่วน CPU time นับเวลาที่ CPU ประมวลผลงานนั้น จึงต้องเลือกเวลาให้ตรงกับสิ่งที่ต้องการเปรียบเทียบ

อ้างอิง PDF หน้า 35–37

## Clock และ CPU Time

Clock rate มีหน่วย cycles/s หรือ Hz ส่วน cycle time เป็นวินาทีต่อ cycle และเท่ากับ 1 / clock rate CPU time = clock cycles / clock rate = clock cycles × cycle time การเพิ่ม GHz อาจมาพร้อมจำนวน cycle ที่มากขึ้น จึงต้องพิจารณาทั้งคู่

อ้างอิง PDF หน้า 38–40

## Instruction Count และ CPI

CPU time = instruction count × CPI / clock rate โดย CPI คือจำนวน cycle เฉลี่ยต่อคำสั่ง ถ้ามีหลายกลุ่มคำสั่ง ให้เฉลี่ย CPI ตามสัดส่วนคำสั่งจริง เปรียบเทียบจาก CPI หรือ GHz เพียงค่าเดียวไม่ได้ และตัวอย่างที่ตัด instruction count ออกต้องสมมติให้จำนวนคำสั่งเท่ากัน

อ้างอิง PDF หน้า 41–42
