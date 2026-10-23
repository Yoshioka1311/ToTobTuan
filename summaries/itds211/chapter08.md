# ITDS211 · บท 8: หน่วยประมวลผลขนาน

Parallel Processors from Client to Cloud

สรุปเรียบเรียงจากเอกสารที่ผู้ใช้ให้ เลขอ้างอิงคือหน้า PDF จากทั้งหมด 41 หน้า ไม่ใช่เลขหน้าหนังสือ โจทย์ในเว็บเขียนขึ้นเพื่อฝึก ไม่ใช่การคาดการณ์ข้อสอบจริง

## หลักที่ควรจำ
- เพิ่ม processor ต้องหักต้นทุนแบ่งงาน ประสานงาน และสื่อสาร
- SIMD เป็นรูปแบบ hardware; SPMD เป็นรูปแบบโปรแกรมที่ใช้บน MIMD ได้
- Vector ลด instruction-fetch/loop overhead เมื่อข้อมูลและ dependency เอื้อ
- Fine-grain สลับทุก cycle, coarse-grain เมื่อรอยาว, SMT ออกคำสั่งหลาย thread ใน cycle เดียว
- Shared address space ยังต้อง synchronization; NUMA ยังต้องคิด locality
- Reduction จับคู่ต้องรอผลระหว่างรอบ ไม่ใช่บวก shared sum พร้อมกันโดยไร้การควบคุม
- GPU เหมาะกับข้อมูลขนาน แต่ divergence และ memory traffic ยังเป็นต้นทุน
- ดูทั้ง latency, bandwidth, topology และ FLOPs/byte ก่อนอธิบายความเร็ว

## ขนานทั้งระบบและในโปรแกรม

หลาย core ช่วยเพิ่ม throughput ของงานอิสระหรือแบ่งโปรแกรมเดียวทำหลายส่วนได้ แต่ software ต้องจัดการการแบ่งงาน การประสาน และต้นทุนสื่อสาร. Concurrent software ไม่ได้แปลว่าต้องมี parallel hardware เสมอ และเพิ่ม processor ไม่รับประกันว่างานเดียวจะเร็วขึ้นตามจำนวน.

อ้างอิง PDF หน้า 5–8

## SISD, SIMD, MIMD และ SPMD

SISD มี instruction/data stream เดียว ส่วน SIMD ใช้ instruction stream เดียวกับหลายข้อมูล และ MIMD ใช้หลาย instruction stream กับหลายข้อมูล. SPMD เป็นรูปแบบโปรแกรมเดียวทำข้อมูลคนละส่วนบนระบบ MIMD โดยแต่ละ processor อาจเข้าคนละเงื่อนไข จึงไม่เหมือนบังคับ lockstep แบบ SIMD.

อ้างอิง PDF หน้า 9

## Vector และ DAXPY

Vector instruction สั่งงานหลาย element ผ่าน vector register ช่วยลดจำนวนคำสั่งที่ต้อง fetch และลด loop control. ตัวอย่าง DAXPY ทำ Y[i] = a×X[i] + Y[i] โดยโหลด vector คูณ scalar บวก vector แล้วเก็บกลับ; ประโยชน์ขึ้นกับ dependency และรูปแบบการเข้าถึงข้อมูล.

อ้างอิง PDF หน้า 10–12

## SIMD และ multimedia extension

SIMD เหมาะกับงานที่ทำ operation เดียวกันกับข้อมูลหลาย element เช่นประมวลผลภาพ. บทเปรียบเทียบ vector ที่ปรับความยาวและรองรับ stride กับ multimedia extension ตัวอย่างที่มีความกว้างคงที่; ความสม่ำเสมอของข้อมูลช่วยลดงานควบคุมและ synchronization.

อ้างอิง PDF หน้า 13–14

## Fine-grain กับ coarse-grain threading

Hardware multithreading เก็บบริบท เช่น PC และ register ของหลาย thread เพื่อสลับได้เร็ว. Fine-grain สลับ thread ทุก cycle เพื่อซ่อนช่วงรอ ส่วน coarse-grain สลับเมื่อมี stall ยาว เช่น cache miss จึงซ่อน stall สั้นได้ไม่ดีเท่า.

อ้างอิง PDF หน้า 15

## Simultaneous multithreading

SMT บน multiple-issue processor เลือกคำสั่งจากหลาย thread มาลง functional unit ที่ว่างใน cycle เดียวได้. Thread มี architectural state แยก แต่ใช้ execution resource และ cache ร่วม; จึงไม่เท่ากับมี core เต็มแยกให้ทุก thread และผลขึ้นกับการแย่งทรัพยากร.

อ้างอิง PDF หน้า 16–18

## Shared memory: UMA และ NUMA

Shared-memory multiprocessor ให้ processor เห็น physical address space เดียว และใช้ synchronization เช่น lock กับ shared variable. UMA มีเวลาถึง memory สม่ำเสมอ ส่วน NUMA ขึ้นกับตำแหน่ง memory ที่เข้าถึง; locality ของงานจึงสำคัญ แม้ address space ยังร่วมกัน.

อ้างอิง PDF หน้า 19

## Sum reduction และ synchronization

ตัวอย่างแบ่ง 64,000 จำนวนให้ 64 processor รวมคนละ 1,000 แล้วค่อยรวม partial sum แบบจับคู่. เมื่อจำนวน partial sum เป็นกำลังสอง ขั้นรวมใช้ log2(P) รอบ เช่น 64 ใช้ 6 รอบ โดยต้องรอผลรอบก่อนให้พร้อมและระวังกรณีจำนวนสมาชิกคี่.

อ้างอิง PDF หน้า 20–21

## GPU และระบบ CPU/GPU

GPU พัฒนาจากงานแสดงภาพสู่การประมวลผลข้อมูลขนาน ใช้หลาย thread เพื่อซ่อน memory latency และใช้ memory bandwidth สูง. ระบบ heterogeneous มักให้ CPU ดูแลงานลำดับหรือควบคุม และ GPU ดูแลงานขนาน; API/ภาษาตัวอย่างในบทมี CUDA และกราฟิก API.

อ้างอิง PDF หน้า 22–24

## ตัวอย่าง Fermi และโครงสร้าง memory

ตัวอย่าง Fermi ในบทมี SIMD processor 16 lanes จัดงาน 32-element thread group ผ่านสอง cycle พร้อม register ของ thread และพื้นที่ร่วมของ block. ภาพ memory แยก private ต่อ thread, พื้นที่ร่วมต่อ block และ GPU memory; เลข lane/register และตารางเทียบ CPU/GPU เป็นตัวอย่างรุ่นในบท ไม่ใช่ข้อกำหนด GPU ทุกยุค.

อ้างอิง PDF หน้า 25–30

## GPU กับ conditional execution

GPU ไม่เข้ากล่อง SIMD/MIMD ได้พอดี เพราะ thread มีเงื่อนไขเหมือนแยกกัน แต่ทำงานบนทรัพยากรแบบกลุ่ม. เมื่อ thread ในกลุ่มต้องไปคนละทาง ประสิทธิภาพอาจลด จึงควรออกแบบงานข้อมูลขนานและการเข้าถึง memory ให้เหมาะ แทนอนุมานว่าแต่ละ thread เป็น core อิสระ.

อ้างอิง PDF หน้า 28–30

## Message passing, cluster และ grid

Message passing ให้แต่ละ processor มี physical address space ส่วนตัวและแลกข้อมูลด้วย send/receive. Cluster รวมคอมพิวเตอร์ที่มี memory/OS ของตนผ่านเครือข่าย เหมาะกับงานแยกกันได้แต่มีต้นทุนดูแลและสื่อสาร; grid ขยายเป็นเครื่องห่างกันผ่าน long-haul network และอาจใช้เวลาว่างของเครื่อง.

อ้างอิง PDF หน้า 31–33

## Topology และ multistage network

Bus, ring, mesh, hypercube และ fully connected จัดการเชื่อม processor/switch/link ต่างกัน จึงแลกจำนวนสายกับระยะทางส่ง. ภาพ multistage เปรียบเทียบ crossbar และ omega network; การเลือกไม่ได้ดูจำนวน node อย่างเดียว แต่ต้องดูเส้นทาง ทรัพยากรที่ใช้ร่วมและการต่อสายจริง.

อ้างอิง PDF หน้า 34–35

## วัด network ให้ครบด้าน

Latency วัดเวลาข้อความ ส่วน throughput และ bandwidth วัดปริมาณงานต่อเวลา; bisection bandwidth คือแบนด์วิดท์รวมต่ำสุดผ่านแนวแบ่ง node เป็นสองกลุ่มขนาดเท่ากัน. Congestion ทำให้เวลาสูงกว่าค่า unloaded และยังต้องคำนึงต้นทุน พลังงาน และความยากในการวางสายบนชิป.

อ้างอิง PDF หน้า 36

## Benchmark และ arithmetic intensity

ตัวอย่าง benchmark มี Linpack สำหรับ linear algebra, SPECrate สำหรับหลายงานอิสระ และ SPLASH/NAS/PARSEC สำหรับงานขนานชนิดต่าง ๆ. Arithmetic intensity = FLOPs ต่อ byte ที่เข้าถึง memory; ใช้เทียบความต้องการคำนวณกับ memory bandwidth และ peak FLOP/s เพื่อเข้าใจคอขวด พร้อมดูประสิทธิภาพต่อราคาและพลังงาน.

อ้างอิง PDF หน้า 37–40
