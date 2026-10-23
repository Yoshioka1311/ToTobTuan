# ITDS211 · บท 7: หน่วยประมวลผลและ Pipeline

Computing Unit and Pipelining

สรุปเรียบเรียงจากเอกสารที่ผู้ใช้ให้ เลขอ้างอิงคือหน้า PDF จากทั้งหมด 53 หน้า ไม่ใช่เลขหน้าหนังสือ โจทย์ในเว็บเขียนขึ้นเพื่อฝึก ไม่ใช่การคาดการณ์ข้อสอบจริง

## หลักที่ควรจำ
- Pipeline เพิ่มอัตราจบคำสั่ง; latency ของคำสั่งเดียวอาจไม่ลด
- ไม่มี stall: cycles = N + K − 1; clock ขึ้นกับขั้นที่ช้าที่สุดและ overhead
- Structural แย่งทรัพยากร, data รอค่า, control รอทิศทางคำสั่ง
- Forwarding ไม่แก้ load-use ติดกันทุกกรณี; แบบในบทต้อง stall หนึ่ง cycle
- เลือกผลล่าสุดจาก EX/MEM ก่อน MEM/WB เมื่อทั้งคู่ตรงและผลพร้อม
- Pipeline ต้องส่งทั้งข้อมูล หมายเลข register และ control ให้ตรงคำสั่ง
- Stall ค้าง PC/IF-ID และใส่ bubble; flush ทิ้งงานที่ไม่ควรมีผล
- แก้ typo การตรวจ Rs2 หน้า 44 และเงื่อนไข priority หน้า 42 ตามความหมาย

## Pipeline เพิ่ม throughput

Pipeline ซ้อนงานคนละขั้นของหลายคำสั่ง เหมือนซัก ตาก และพับผ้าคนละชุดพร้อมกัน. ผลหลักคือจบคำสั่งได้ถี่ขึ้นเมื่อ pipeline เต็ม ไม่ได้รับประกันว่าคำสั่งเดียวมี latency สั้นลง; ต้องคิดช่วงเติมและระบาย pipeline เมื่อมีคำสั่งจำนวนน้อย.

อ้างอิง PDF หน้า 3–6

## ห้าขั้นของ RISC-V ในบท

IF ดึงคำสั่ง, ID ถอดรหัสและอ่าน register, EX คำนวณหรือหา address, MEM เข้าถึงข้อมูล และ WB เขียนผลกลับ register. Load ใช้ MEM อ่านข้อมูล ส่วน store เขียน memory และไม่เขียน register ใน WB; แบบฝึกใช้ pipeline ห้าขั้นตามสไลด์ ไม่เหมารวม RISC-V ทุก implementation.

อ้างอิง PDF หน้า 4–7

## Clock และเวลารวม

เมื่อไม่มี overhead, clock ของ pipeline ต้องยาวพอสำหรับขั้นที่ช้าที่สุด และคำสั่ง N คำสั่งใน K ขั้นแบบไม่มี stall ใช้ N+K−1 cycles. ตัวอย่างขั้น 200/100/200/200/100 ps ให้ pipeline clock 200 ps เทียบ single-cycle 800 ps; speedup ระยะยาวจึงใกล้ 4 ไม่ใช่ 5 เพราะขั้นไม่สมดุล.

อ้างอิง PDF หน้า 5–6

## ISA ช่วยออกแบบ Pipeline

ตัวอย่างใช้คำสั่งขนาดคงที่และรูปแบบสม่ำเสมอ ทำให้ fetch/decode และอ่าน register ได้ง่าย. Load/store แยกคำนวณ address ใน EX กับเข้าถึง memory ใน MEM; ข้อความคำสั่ง 32 บิตหมายถึงรูปแบบที่บทกำลังใช้ ไม่ได้ครอบคลุม extension ของ ISA ทุกแบบ.

อ้างอิง PDF หน้า 7

## Hazard สามชนิด

Structural hazard คือแย่งทรัพยากร เช่น IF กับ load/store ต้องใช้ memory เดียวกัน. Data hazard คือคำสั่งต้องใช้ข้อมูลที่คำสั่งก่อนหน้ายังส่งให้ไม่ได้ ส่วน control hazard คือยังไม่รู้คำสั่งถัดไปจาก branch; แต่ละชนิดจึงต้องเลือกกลไกแก้ที่ตรงสาเหตุ.

อ้างอิง PDF หน้า 8–10

## Forwarding ส่งผลที่พร้อมใช้

Forwarding หรือ bypassing ส่งผลจากขั้นหลังกลับไปยัง input ของ ALU โดยไม่รอเขียน register file. ต้องมีสายและ mux เพิ่ม และส่งได้เฉพาะผลที่เกิดแล้ว; จึงแก้ dependency ของ ALU หลายกรณีได้ แต่ไม่สามารถส่งข้อมูลย้อนเวลา.

อ้างอิง PDF หน้า 10–12

## Load-use และ code scheduling

ใน pipeline ห้าขั้นตามบท ข้อมูล load พร้อมหลัง MEM แต่คำสั่งติดกันต้องใช้ใน EX เร็วเกินไป จึงยังต้อง stall หนึ่ง cycle แม้มี forwarding. แทรกงานอิสระที่ปลอดภัยระหว่าง load กับผู้ใช้ช่วยลด stall ได้ แต่ต้องรักษา dependency และผลของการเข้าถึง memory.

อ้างอิง PDF หน้า 12–13

## Branch stall และ prediction

รอผล branch ก่อน fetch ต่อเป็นวิธีที่ถูกแต่เสีย cycle; prediction ให้เลือกทางล่วงหน้าแล้วแก้เมื่อทายผิด. Static ใช้กฎคงที่ เช่น backward taken ส่วน dynamic ใช้ประวัติจริง; ไม่ใช่ว่าทายถูกจะไม่มี latency อื่นหรือทายผิดแล้วทำงานทางผิดให้จบได้.

อ้างอิง PDF หน้า 14–18

## Pipeline register เก็บข้อมูลของแต่ละคำสั่ง

IF/ID, ID/EX, EX/MEM และ MEM/WB เก็บค่าข้าม cycle ให้ข้อมูลและ control เดินไปกับคำสั่งที่ถูกต้อง. Load ต้องส่งหมายเลข destination register ต่อไปจน WB ด้วย มิฉะนั้นอาจเอาหมายเลขจากคำสั่งที่กำลัง decode มาเขียนผิด register.

อ้างอิง PDF หน้า 19–27

## เส้นทาง load/store และ control

Load คำนวณ base+offset ใน EX อ่าน data memory ใน MEM แล้วเลือกข้อมูลนั้นเขียนกลับใน WB. Store คำนวณ address เช่นกัน แต่ต้องส่งค่าที่จะเขียนไปถึง MEM และปิด RegWrite; control เช่น MemRead, MemWrite และ RegWrite ต้องมาถึงขั้นที่ใช้พร้อมคำสั่งนั้น.

อ้างอิง PDF หน้า 22–34

## อ่านแผนภาพสองมุม

Multi-cycle diagram ติดตามหลายคำสั่งผ่านขั้นต่าง ๆ ตามแกนเวลา จึงใช้หาจำนวน cycle และจุด stall. Single-cycle diagram แสดงภาพระบบ ณ cycle หนึ่ง ซึ่งแต่ละขั้นอาจเป็นคนละคำสั่ง; คำว่า single-cycle ในชื่อรูปไม่ได้หมายถึง CPU แบบ single-cycle datapath.

อ้างอิง PDF หน้า 31–33

## ตรวจเงื่อนไข forwarding

เทียบ source register ใน ID/EX กับ destination ใน EX/MEM และ MEM/WB โดยผู้ส่งต้องมี RegWrite และ Rd ≠ x0. ตาราง mux ใช้ 00 = register file, 10 = EX/MEM และ 01 = MEM/WB; ต้องพิจารณาความพร้อมของข้อมูลด้วย ไม่ใช่ดูหมายเลข register อย่างเดียว.

อ้างอิง PDF หน้า 35–40

## สองผู้ส่งต้องเลือกค่าล่าสุด

ถ้า EX/MEM และ MEM/WB ต่างเขียน register ที่ผู้ใช้ต้องการ ให้เลือกผลล่าสุดจาก EX/MEM ก่อน เมื่อผลพร้อมใช้งาน. สูตรหน้า 42 มีเครื่องหมายในเงื่อนไขยกเว้นที่ไม่สอดคล้องแนวคิด: ต้องกัน MEM/WB เมื่อมี EX/MEM ที่เขียนและ Rd ตรงกับ source นั้น ไม่ใช่กันเมื่อ Rd ต่างกัน.

อ้างอิง PDF หน้า 41–43

## Hazard detection และการใส่ bubble

Load-use detector ตรวจ load ใน ID/EX กับ source ที่ใช้จริงของคำสั่งใน IF/ID ทั้ง Rs1 และ Rs2; หน้า 44 พิมพ์ Rs1 ซ้ำ จึงต้องแก้การตรวจตัวที่สองเป็น Rs2. เมื่อชนกัน ให้ค้าง PC และ IF/ID พร้อมใส่ control ศูนย์ใน ID/EX เป็น bubble เพื่อให้ load เดินหน้าจน forward ได้; ไม่ใช่หยุดทุกขั้น.

อ้างอิง PDF หน้า 44–48

## Branch resolution และ flush

ถ้าตัดสิน branch ใน MEM และ fetch ทางไม่ taken ไว้ จะมีคำสั่งอายุน้อยกว่าบนทางผิดที่ต้อง flush. ย้ายการเปรียบเทียบและคำนวณ target มาที่ ID ช่วยลดงานทางผิด แต่ต้องเพิ่ม hardware และจัดการ dependency ของ branch; penalty ต้องระบุ stage และสมมติฐานก่อนคำนวณ.

อ้างอิง PDF หน้า 49–52
