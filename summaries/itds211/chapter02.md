# ITDS211 · บท 2: วงรอบคำสั่งและ Interrupt

Computer Functions & Processor Structure

สรุปเรียบเรียงจากเอกสารที่ผู้ใช้ให้ เลขอ้างอิงคือหน้า PDF จากทั้งหมด 46 หน้า ไม่ใช่เลขหน้าหนังสือ โจทย์ในเว็บเขียนขึ้นเพื่อฝึก ไม่ใช่การคาดการณ์ข้อสอบจริง

## หลักที่ควรจำ
- Von Neumann ใช้หน่วยความจำคำสั่ง/ข้อมูลร่วม; Harvard แยกช่องทาง
- Data bus ส่งค่า, address bus ระบุตำแหน่ง, control bus ควบคุมจังหวะ
- PC ไม่ใช่ IR; MAR ไม่ใช่ MBR
- MARIE: คำสั่ง 16 บิต = opcode 4 + address 12; อย่าปน opcode กับเครื่องตัวอย่างอื่น
- Interrupt ต้องรักษาสถานะก่อนเข้า ISR และคืนสถานะเมื่อกลับ
- Interrupt ช่วยซ้อนทับงาน CPU กับ I/O แต่ไม่ได้ลดเวลาของอุปกรณ์โดยตรง

## Von Neumann และ Harvard

Von Neumann ใช้แนวคิด stored program โดยคำสั่งและข้อมูลอยู่ในหน่วยความจำร่วมกันและอ้างด้วย address Harvard แยกหน่วยความจำกับ bus สำหรับคำสั่งและข้อมูล จึงลดการแข่งขันช่องทางแต่เพิ่มความซับซ้อน บางระบบผสมทั้งสอง เช่น แยกที่ L1 แต่ใช้ main memory ร่วม

อ้างอิง PDF หน้า 3–4

## Bus และการแย่งสิทธิ์

Bus ประกอบด้วย data lines ส่งข้อมูล, address lines ระบุตำแหน่ง และ control lines ควบคุมทิศทางกับจังหวะ Multipoint bus เป็นทรัพยากรร่วมจึงต้องมี arbitration เมื่อมีหลาย master วิธีในบทมี daisy chain, centralized parallel, distributed self-detection และ collision-detection

อ้างอิง PDF หน้า 5–7

## Hardware ทำตาม Software

Software คือชุดคำสั่งที่ฮาร์ดแวร์แปลเป็น control signals เพื่อใช้งานหน่วยคำนวณทั่วไป การเปลี่ยนโปรแกรมจึงเปลี่ยนลำดับรหัสได้โดยไม่ต้องเดินวงจรใหม่ CPU, memory และ I/O เชื่อมกันผ่านระบบ bus

อ้างอิง PDF หน้า 8–11

## Register ที่ต้องแยกหน้าที่

PC ถือ address ของคำสั่งที่จะ fetch และ IR ถือคำสั่งที่อ่านมาแล้ว MAR ระบุ address สำหรับอ่านหรือเขียน memory ส่วน MBR ถือข้อมูลที่รับหรือส่ง I/OAR ระบุอุปกรณ์และ I/OBR เป็น buffer แลกข้อมูลกับ I/O

อ้างอิง PDF หน้า 10–13

## Fetch, Decode, Execute

เริ่มจากนำ PC ไปใช้หา address ของคำสั่ง อ่านคำสั่งเข้า IR แล้วขยับ PC ไปคำสั่งลำดับถัดไป Decode ระบุ operation และ operand; ถ้าต้องอ่าน operand จาก memory จึงค่อยนำเข้ามา การ execute อาจคำนวณ เก็บผล หรือเปลี่ยนเส้นทางควบคุม จึงไม่ใช่ทุกคำสั่งต้องผ่านการอ่านข้อมูลแบบเดียวกัน

อ้างอิง PDF หน้า 12–15

## MARIE เป็นเครื่องตัวอย่าง

MARIE มี AC และ MBR 16 บิต, MAR และ PC 12 บิต รวมถึง InREG/OutREG 8 บิต Address 12 บิตอ้างได้ 4096 ตำแหน่ง คำสั่ง 16 บิตแบ่ง opcode 4 บิตและ address 12 บิต; ต้องใช้ opcode ของ MARIE แยกจากเครื่องสมมติในหน้า 14

อ้างอิง PDF หน้า 17–24

## RTL และ Microoperations

คำสั่งหนึ่งประกอบด้วย microoperations หลายขั้นซึ่งเขียนด้วย register transfer language ได้ M[X] หมายถึงข้อมูลใน memory address X และลูกศร ← หมายถึงการย้ายค่า LOAD X ทำ MAR ← X, MBR ← M[MAR], AC ← MBR; ADD X ต่างที่ขั้นสุดท้ายเป็น AC ← AC + MBR

อ้างอิง PDF หน้า 25–29

## SKIPCOND และจุดพิมพ์ผิด

SKIPCOND ตรวจค่า AC แล้วอาจข้ามคำสั่งถัดไป โดยเพิ่ม PC อีก 1 ตำแหน่งจากค่าหลัง fetch ตัวอย่างหน้า 24 ใช้บิตเงื่อนไข 10 สำหรับ AC > 0 แต่ RTL หน้า 27 พิมพ์เป็น 11 จึงใช้ค่า 10 ตามตัวอย่างบิต ในตารางหน้า 35 คำว่า Store 106 ไม่สอดคล้องกับรหัส 4106; ตาราง ISA หน้า 22 กำหนด Store เป็น opcode 2

อ้างอิง PDF หน้า 22–35

## Interrupt และ ISR

Interrupt เปิดทางให้ CPU หยุดลำดับงานชั่วคราวไปจัดการเหตุการณ์ เช่น I/O, timer หรือข้อผิดพลาด CPU เก็บสถานะที่จำเป็น หา address ของ Interrupt Service Routine (ISR) แล้วโอนการควบคุมไป เมื่อทำเสร็จต้องคืนสถานะและกลับไปทำงานเดิมให้ถูกจุด

อ้างอิง PDF หน้า 30–33

## Maskable และ Programmed I/O

Maskable interrupt สามารถระงับด้วยกลไกควบคุม interrupt ได้ ส่วน nonmaskable ใช้กับเหตุการณ์สำคัญที่ต้องรับมือ ในแบบ MARIE อย่างง่าย CPU polling InREG จนมีข้อมูลแล้วคัดลอกเข้า AC และส่ง output ผ่าน OutREG การ polling กับ interrupt-driven I/O จึงใช้เวลาของ CPU ต่างกัน

อ้างอิง PDF หน้า 33–37

## Interrupt ลดการรออย่างไร

ขณะอุปกรณ์ I/O ทำงาน CPU อาจกลับไปทำส่วนอื่นของโปรแกรม แล้วค่อยรับ interrupt เมื่ออุปกรณ์เสร็จ ถ้างานอิสระหมดก่อน I/O เสร็จ CPU ก็ยังต้องรอได้ จึงไม่ควรสรุปว่า interrupt ทำให้ I/O เร็วขึ้นหรือทำให้เวลา idle หายไปทุกกรณี

อ้างอิง PDF หน้า 38–43

## หลาย Interrupt

Sequential interrupt processing จัดการ handler หนึ่งให้จบก่อนรับตัวถัดไป ส่วน nested processing ยอมให้ handler ที่เหมาะสม เช่น priority สูงกว่า แทรก handler ที่กำลังทำงานได้ ต้องเก็บและคืนสถานะเป็นลำดับเพื่อกลับไปทำ handler เดิมก่อนกลับ user program

อ้างอิง PDF หน้า 44–45
