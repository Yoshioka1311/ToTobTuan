# ITDS211 · บท 3: แทนข้อมูลและอ่าน RISC-V

Data Representation, ISA & Assembly

สรุปเรียบเรียงจากเอกสารที่ผู้ใช้ให้ เลขอ้างอิงคือหน้า PDF จากทั้งหมด 118 หน้า ไม่ใช่เลขหน้าหนังสือ โจทย์ในเว็บเขียนขึ้นเพื่อฝึก ไม่ใช่การคาดการณ์ข้อสอบจริง

## หลักที่ควรจำ
- จำนวนบิตเดียวกันอ่านได้ต่างค่าตาม unsigned, sign-magnitude, complement หรือ bias
- Two’s complement n บิตมีช่วง −2^(n−1) ถึง 2^(n−1)−1 และมีศูนย์เดียว
- IEEE single normalized ใช้ sign1/exponent8/fraction23 และ bias127
- RV64 ในตัวอย่างมี 32 registers; word=32 บิต doubleword=64 บิต
- Address ของ array = base + index×ขนาดสมาชิกเป็น byte
- แยก signed/unsigned branch และ sign/zero extension ให้ถูก
- Call ที่ซ้อนกันต้องรักษา return address และค่าที่ยังต้องใช้
- Linker รวม/แก้ reference; loader จัดโปรแกรมเข้า memory เพื่อเริ่มรัน

## จำนวนบิตกับฐานตัวเลข

ข้อมูล n บิตมีรูปแบบได้ 2^n แบบ ถ้าอ่านเป็น unsigned จะมีช่วง 0 ถึง 2^n−1 ฐานสองใช้ 0–1 ฐานแปดใช้ 0–7 และฐานสิบหกใช้ 0–9 กับ A–F ค่าของ bit ต้องอ่านร่วมกับรูปแบบข้อมูล เพราะบิตชุดเดียวกันอาจแทนจำนวนบวก ลบ หรืออักขระได้

อ้างอิง PDF หน้า 5–9

## Sign-magnitude และ Complement

Sign-magnitude แยก sign bit ออกจากขนาดและมีทั้ง+0 กับ−0 ส่วน one’s complement กลับทุกบิตและยังมีศูนย์สองแบบ Two’s complement กลับบิตแล้วบวก 1 จึงมีศูนย์เดียวและช่วง n บิตเป็น −2^(n−1) ถึง 2^(n−1)−1 การบวก one’s complement ต้องวน carry กลับเข้าบิตต่ำ ส่วน two’s complement เก็บผลในความกว้างเดิมโดยทิ้ง carry-out

อ้างอิง PDF หน้า 10–22

## Bias และเศษส่วนฐานสอง

Bias notation อ่านค่าเป็น unsigned code − bias เช่น code128 กับ bias127 แทน+1 เศษส่วนฐานสองมีน้ำหนัก 1/2,1/4,1/8,… จึงแปลงโดยบวกค่าน้ำหนักของบิตที่เป็น 1 จำนวนเศษส่วนบางค่าแทนได้ไม่จบในบิตจำนวนจำกัด

อ้างอิง PDF หน้า 23–30

## IEEE Floating Point

Single precision มี sign1 บิต exponent8 บิต และ fraction23 บิต; double มี 1/11/52 บิต สำหรับ single แบบ normalized ที่ 1≤E≤254 ใช้ค่า (−1)^s × (1.fraction) × 2^(E−127) โดย E คือ exponent ที่เก็บ สูตร 1.fraction ไม่ใช้ตรง ๆ กับ E=0 หรือ 255 ซึ่งเป็นกลุ่มศูนย์/subnormal และ infinity/NaN; ค่าสูงสุดแบบ finite จึงเป็น (2−2^-23)×2^127 ไม่ใช่ 2^128 พอดี

อ้างอิง PDF หน้า 25–31

## อักขระไม่ใช่ค่าตัวเลข

ASCII มาตรฐานมี 128 รหัส ใช้ 7 บิต รวมอักขระแสดงผลและ control characters รหัสของ digit ไม่ใช่ค่าจำนวนนั้น เช่น ‘0’ คือ 48; ตัวพิมพ์ใหญ่กับเล็กคู่กันต่าง 0x20 Unicode รองรับอักขระได้กว้างกว่า ASCII ส่วน UTF-8/UTF-16 เป็นวิธี encode ที่มีความยาวแปรได้

อ้างอิง PDF หน้า 32–37

## RISC-V และ Register Operands

ในตัวอย่าง RV64 มี 32 general-purpose registers x0–x31 ขนาด 64 บิต โดย x0 อ่านเป็น 0 เสมอ, x1 ใช้ return address และ x2 หรือ sp ใช้ stack pointer คำสั่ง add/sub ใช้ source สองตัวและ destination หนึ่งตัว โดยเขียน destination ก่อน Register เร็วและมีน้อย compiler จึงพยายามเก็บตัวแปรที่ใช้บ่อยไว้ใน register

อ้างอิง PDF หน้า 41–47

## Memory, Endian และ Immediate

Memory อ้างเป็น byte: array index ต้องคูณขนาดสมาชิกเป็น byte ก่อนบวก base ในตัวอย่าง little-endian ไบต์สำคัญน้อยสุดอยู่ address ต่ำสุด และใช้ load เข้าสู่ register ก่อนคำนวณแล้ว store กลับ ค่าคงที่เล็กใส่ในคำสั่งได้ เช่น addi; ต้องระบุขนาดสมาชิกและสมมติฐาน endian ให้ชัดเมื่อคำนวณ address

อ้างอิง PDF หน้า 48–53

## รูปแบบรหัสคำสั่ง

คำสั่ง base ที่บทสอนยาว 32 บิต R-format แบ่ง funct7/rs2/rs1/funct3/rd/opcode เป็น 7/5/5/3/5/7 บิต I-format ใช้ immediate12 บิตสำหรับค่าคงที่หรือ load ส่วน S-format แยก immediate ออกเป็นสองส่วนเพื่อรักษาตำแหน่ง source registers การใช้ format คล้ายกันช่วยให้ decode ง่าย แต่ไม่ได้แปลว่าแต่ละ field ใช้แทนกันได้

อ้างอิง PDF หน้า 54–59

## Bitwise และ Shift

AND ใช้ mask บิตที่อยากเก็บ, OR ใช้ตั้งบางบิตเป็น 1 และ XOR ให้ 1 เมื่อบิตสองข้างต่างกัน XOR กับบิต 1 ทั้งหมดจึงกลับทุกบิตได้ Logical shift เติม 0; slli คูณด้วย 2^k เมื่อไม่เสียบิตล้น และ srli เทียบกับหาร unsigned ด้วย 2^k แบบทิ้งเศษ ไม่ควรใช้ logical right shift แทนการหาร signed ติดลบโดยตรง

อ้างอิง PDF หน้า 60–64

## Branch, Loop และ Basic Block

beq/bne เปรียบเทียบเท่ากัน/ไม่เท่ากัน ส่วน blt/bge ใช้ signed และ bltu/bgeu ใช้ unsigned แปล if/loop โดยจัดทางไปต่อและทางออกให้ตรงเงื่อนไข; branch ที่ไม่เข้าเงื่อนไขจะทำคำสั่งถัดไป Basic block ไม่มี branch กลางบล็อกและไม่มีจุดกระโดดเข้ากลางบล็อก จึงเป็นหน่วยสำคัญของ optimization

อ้างอิง PDF หน้า 65–70

## Procedure Call และ Stack

พารามิเตอร์ใช้ x10–x17 และค่าผลลัพธ์ใช้ register ตาม calling convention; jal x1,label เก็บ address คำสั่งถัดไปใน x1 แล้วกระโดด การกลับใช้ jalr x0,0(x1) เพื่อทิ้งค่าลิงก์ Non-leaf procedure ต้องรักษา return address ของตัวเองและค่าที่ยังต้องใช้หลัง call; saved registers ที่ callee ใช้ต้อง save/restore ส่วน temporaries ไม่รับประกันว่าจะคงเดิม

อ้างอิง PDF หน้า 71–79

## Memory Layout และ Activation Record

Text เก็บโค้ด, static data เก็บข้อมูลอายุยาว, heap ใช้ข้อมูล dynamic และ stack ใช้การจัดเก็บอัตโนมัติ Procedure frame หรือ activation record รวบรวม local data และสถานะของการ call การจองพื้นที่ stack ในตัวอย่างทำ sp ลดลงและคืนพื้นที่เมื่อกลับ ต้องคืน register ด้วย load ไม่ใช่ store

อ้างอิง PDF หน้า 75–81

## Byte, Word และ String

ใน RV64: lb/lh/lw โหลด 8/16/32 บิตแล้ว sign-extend ส่วน lbu/lhu/lwu ใช้ zero-extend คำสั่ง sb/sh/sw เก็บเฉพาะ 8/16/32 บิตด้านต่ำของ source และ ld/sd ใช้ doubleword64 บิต String ตัวอย่างจบด้วย byte0 และคัดลอกทีละ byte; source กับ destination ต้องใช้ base address คนละตัวที่ถูกต้อง

อ้างอิง PDF หน้า 82–86

## ค่าคงที่กว้างและ Addressing

lui วาง immediate20 บิตในบิต 31–12 และทำ 12 บิตล่างเป็น 0; ใช้ร่วมกับ addi เพื่อสร้างค่าที่กว้างขึ้นได้ Branch อ้างเป้าหมายเทียบกับ PC และมีบิตต่ำเป็น 0: ถ้าพูดเป็น offset หน่วย byte ที่ถอดแล้ว ให้ใช้ target=PC+offset ถ้าพูดเป็นค่า encoded ที่นับหน่วย 2byte จึงคูณ 2 ก่อน; ห้ามคูณซ้ำ ส่วน jalr ใช้ base register กับ immediate

อ้างอิง PDF หน้า 87–91

## Synchronization

เมื่อหลาย processor ใช้ memory ร่วมกัน ผลอาจขึ้นกับลำดับ access ถ้าไม่ synchronize Atomic operation ทำให้การอ่านและเขียนชุดสำคัญไม่ถูกแทรกแบบที่ทำให้ข้อมูลผิด lr.d อ่านและตั้ง reservation ส่วน sc.d พยายามเขียนและคืน status0 เมื่อสำเร็จ/nonzero เมื่อไม่สำเร็จ; โค้ดจึงตรวจ status และลองใหม่ โดยในระบบจริงการใช้ lock ยังต้องคำนึงถึงกติกา memory ordering

อ้างอิง PDF หน้า 92–94

## จาก Source สู่โปรแกรมที่รันได้

Compiler/assembler สร้าง object module ซึ่งมีโค้ด ข้อมูล symbol table และ relocation information Linker รวม module แก้ symbol และ reference จนเป็น executable; loader สร้างพื้นที่ address นำส่วนต่าง ๆ เข้า memory ตั้ง register/arguments แล้วเริ่ม startup Dynamic linking ผูก library ภายหลัง ส่วน lazy linkage เลื่อนงานบางส่วนถึงการเรียกครั้งแรก; Java ใช้ bytecode บน JVM และอาจ JIT ส่วนที่รันบ่อย

อ้างอิง PDF หน้า 95–101

## Swap, Sort และ Optimization

ตัวอย่าง swap คำนวณ address สมาชิก doubleword ด้วย index×8 โหลดสองค่าแล้วเก็บสลับตำแหน่ง ตัวอย่าง sort เชื่อม loop กับ procedure call และการรักษา register กราฟ optimization ชี้ว่า CPI หรือ instruction count เพียงตัวเดียวตัดสินความเร็วไม่ได้ ต้องดูเวลาหรือจำนวน cycle รวมร่วมกับ algorithm

อ้างอิง PDF หน้า 102–110

## Array กับ Pointer

Array indexing คำนวณ base+index×element size ส่วน pointer เลื่อนไป address ของสมาชิกถัดไปได้โดยตรง Compiler อาจลด multiply เป็น shift หรือทำ induction-variable elimination ได้ จึงไม่ควรสรุปว่าเขียน pointer ด้วยมือต้องเร็วกว่าเสมอ ขนาดสมาชิกต้องตรงกันทั้งภาษาและ assembly ก่อนเปรียบเทียบ

อ้างอิง PDF หน้า 111–113

## MIPS และส่วนขยาย RISC-V

MIPS เป็นอีก ISA หนึ่งที่มีแนวคิด load/store คล้ายกัน แต่ instruction encoding และบาง branch ต่างจาก RISC-V RV32I มี register32 บิต ส่วนตัวอย่าง RV64I มี 64 บิต; ส่วนขยาย M เพิ่ม multiply/divide, A เพิ่ม atomic, F/D เพิ่ม floating point และ C เพิ่มคำสั่ง compressed16 บิต ดังนั้นคำกล่าวว่า RISC-V ทุกคำสั่ง 32 บิตต้องจำกัดขอบเขตที่ base formats ในบท

อ้างอิง PDF หน้า 114–117

## อ่านตัวอย่างที่มีจุดพิมพ์ผิด

ควรยึดความหมาย operation กับรูปแบบข้อมูลก่อนคัดลอกโค้ด: หน้า 44 ต้องใช้ sub สำหรับผลต่าง และหน้า 107 ช่วง restore ควรเป็น ld หน้า 86 ใช้ base เดียวทั้ง source/destination ของ strcpy และหน้า 112 ใช้ระยะ 8byte กับชนิด int ที่ไม่สอดคล้องคำอธิบาย word ส่วนหน้า 15 ใช้ชื่อ complement ฐานสิบคลาดเคลื่อนและหน้า 17 ยก 6 ใน signed3 บิตซึ่งเกินช่วง; แบบฝึกในหน้านี้กำหนดความกว้างและเงื่อนไขใหม่ให้สอดคล้อง

อ้างอิง PDF หน้า 15–117
