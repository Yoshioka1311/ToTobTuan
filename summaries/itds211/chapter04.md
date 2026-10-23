# ITDS211 · บท 4: Memory, Cache และ Virtual Memory

Memory Hierarchy & Cache

สรุปเรียบเรียงจากเอกสารที่ผู้ใช้ให้ เลขอ้างอิงคือหน้า PDF จากทั้งหมด 112 หน้า ไม่ใช่เลขหน้าหนังสือ โจทย์ในเว็บเขียนขึ้นเพื่อฝึก ไม่ใช่การคาดการณ์ข้อสอบจริง

## หลักที่ควรจำ
- Temporal=ใช้ซ้ำ; spatial=ใช้ข้อมูลใกล้กัน
- Block address=floor(byte address/block size); index หรือ set ใช้ mod จำนวนช่องที่เกี่ยวข้อง
- Hit ต้อง valid และ tag ตรงกัน; dirty หมายถึง cache มีข้อมูลที่ต้องเขียนกลับ
- AMAT=hit time+miss rate×miss penalty ในแบบจำลองที่ระบุ
- Associativity ช่วยลด conflict แต่เพิ่มต้นทุนและอาจเพิ่ม hit time
- TLB miss อาจไม่มี page fault; offset ไม่เปลี่ยนระหว่าง translation
- Write-through อย่างเดียวไม่รับประกัน coherence ของ cache หลาย core
- FSM, protection, ECC และ coherence เป็นส่วนของความถูกต้องควบคู่ความเร็ว

## Locality และลำดับชั้น

Temporal locality คือใช้ข้อมูลเดิมซ้ำในเวลาใกล้กัน ส่วน spatial locality คือเข้าถึงตำแหน่งใกล้กัน Memory hierarchy เก็บข้อมูลที่คาดว่าจะใช้ไว้ในระดับที่เล็กและเร็วใกล้ CPU แล้วคัดลอกเป็น block หรือ cache line จากระดับล่าง เมื่อพบข้อมูลเรียก hit; miss rate = 1−hit rate และ miss ต้องเสียเวลาเติม block

อ้างอิง PDF หน้า 4–8

## SRAM, DRAM และ Bandwidth

Cache มักใช้ SRAM ซึ่งเร็วแต่ราคา/bit สูง ส่วน main memory ใช้ DRAM ที่เก็บประจุและต้อง refresh การเปิด row, burst transfer, DDR และการแบ่ง bank ช่วยเพิ่ม bandwidth ได้ แต่ latency กับ bandwidth เป็นคนละตัวชี้วัด ตารางราคาและรุ่น DRAM ในสไลด์เป็นข้อมูลประกอบในอดีต ไม่ใช่ราคาปัจจุบัน

อ้างอิง PDF หน้า 9–14

## Flash และ Magnetic Disk

Flash เป็น nonvolatile: NOR เหมาะกับการเข้าถึงเพื่ออ่านคำสั่ง ส่วน NAND หนาแน่นกว่าและใช้เก็บข้อมูลเป็น block การเขียน/ลบทำให้เสื่อมจึงมี wear leveling กระจายการใช้งาน Magnetic disk มีเวลา seek, rotational latency, transfer, controller และอาจมี queue; ค่าเฉลี่ย rotation เท่ากับครึ่งรอบเมื่อสมมติจุดเริ่มกระจายสม่ำเสมอ

อ้างอิง PDF หน้า 15–20

## Direct Mapped: ที่อยู่ไปช่องไหน

Direct-mapped ให้ memory block แต่ละก้อนลง cache ได้ช่องเดียว: block address = floor(byte address/block size) และ index = block address mod จำนวน lines แบ่ง address เป็น tag/index/offset; offset เลือก byte ใน block ส่วน tag บอกว่าเป็น block ใด Valid bit ต้องเป็น 1 และ tag ตรงกันจึง hit

อ้างอิง PDF หน้า 21–32

## ขนาด Block ไม่ใช่ยิ่งใหญ่ยิ่งดี

Block ใหญ่ช่วย spatial locality เพราะดึงข้อมูลข้างเคียงมาด้วย แต่เมื่อ cache รวมเท่าเดิมจะเหลือจำนวน lines น้อยลง เกิดการแข่งขันหรือ pollution ได้และ miss penalty สูงขึ้น เมื่อ miss แบบ blocking CPU ต้องรอเติม block ก่อนทำ access ต่อ; early restart/critical-word-first ช่วยส่งค่าที่ต้องใช้ก่อนส่วนที่เหลือได้

อ้างอิง PDF หน้า 33–34

## Write Hit และ Write Miss

Write-through เขียนทั้ง cache และระดับล่าง โดย write buffer ช่วยพักข้อมูลแต่เต็มแล้วก็ยัง stall ได้ Write-back เขียนเฉพาะ cache ก่อนและตั้ง dirty bit; เมื่อจะไล่ dirty block ออกจึงเขียนกลับ Write allocate คือ fetch block เมื่อ write miss ส่วน write around ไม่ดึง block เข้า cache; ต้องระบุ policy ก่อนวิเคราะห์ลำดับ access

อ้างอิง PDF หน้า 35–37

## วัด Cache ด้วย CPI และ AMAT

ภายใต้แบบจำลองที่ stall ไม่ซ้อนทับกัน memory stall cycles = accesses×miss rate×miss penalty หรือ IC×misses/instruction×penalty Actual CPI = base CPI + stall cycles/instruction โดยแยก I-cache กับ D-cache ตามจำนวน access จริง AMAT = hit time + miss rate×miss penalty เมื่อ penalty หมายถึงเวลาที่เพิ่มจาก hit time และต้องใช้หน่วยเดียวกัน

อ้างอิง PDF หน้า 40–44

## Associativity และ Replacement

Fully associative ลงได้ทุก entry แต่ต้องค้นหา tag หลายตัว ส่วน n-way set associative เลือก set ด้วย block number mod จำนวน sets แล้วค้นใน nways Direct-mapped คือ 1-way และไม่มีสิทธิ์เลือก victim; set-associative เลือกช่อง invalid ก่อนหรือใช้นโยบายเช่น LRU/Random LRU เลือก block ที่ถูกใช้นานที่สุดในอดีตและยังไม่ได้ใช้อีก ไม่ใช่ block ที่เพิ่งเข้ามาเสมอ

อ้างอิง PDF หน้า 45–52

## Cache หลายระดับ

L1 เน้น hit time ต่ำ ส่วน L2 ใหญ่กว่าและรับ miss จาก L1 เพื่อลดการไป main memory Local miss rate ของ L2 คิดจาก access ที่มาถึง L2 แต่ global miss rate คิดจาก access ตั้งต้น จึงห้ามคูณอัตราซ้ำเมื่อเป็น global อยู่แล้ว ตัวอย่างหน้า 55 พิมพ์ extra penalty500cycles แต่ข้อมูล 100ns กับ 4GHz และสมการใช้ 400cycles; แบบฝึกยึดหน่วยเวลาที่ให้

อ้างอิง PDF หน้า 53–56

## Software ช่วย Locality

Memory access pattern ขึ้นกับ algorithm และ compiler การทำ cache blocking แบ่ง matrix เป็นชิ้นย่อยเพื่อใช้ข้อมูลซ้ำให้มากก่อนถูกแทนที่ และสามารถรวมกับ vector/subword parallelism ได้ Out-of-order และ non-blocking cache อาจซ่อนการรอบางส่วนด้วยงานอิสระ จึงใช้ AMAT เพียงค่าเดียวทำนายเวลาทั้งโปรแกรมไม่ได้

อ้างอิง PDF หน้า 57–62

## Dependability และ Availability

Fault ที่ component อาจนำไปสู่ service failure หรือถูกทนไว้ได้ MTTF คือเวลาเฉลี่ยก่อน failure ส่วน MTTR คือเวลาเฉลี่ยซ่อม; ในแบบจำลองบท MTBF=MTTF+MTTR และ availability=MTTF/(MTTF+MTTR) เพิ่มความพร้อมใช้งานได้ทั้งลดโอกาสล้มเหลวและลดเวลาซ่อม

อ้างอิง PDF หน้า 63–64

## Hamming และ ECC

Hamming distance คือจำนวนบิตที่ต่างกัน; code ระยะต่ำสุด 2 ตรวจ single-bit error ได้ และระยะ 3 ใช้แก้ single-bit error ได้ ตำแหน่ง parity ของ Hamming เป็นกำลังของ 2 เช่น 1,2,4,8 โดย syndrome บอกตำแหน่ง error เมื่อมี single-bit error การเพิ่ม overall parity ให้ระยะ 4 รองรับ SECDED หรือแก้ 1 บิต/ตรวจ 2 บิต; สไลด์หน้า 68 ใช้ชื่อ SEC/DEC คลาดเคลื่อนและไม่ควรตีความว่าแก้ 2 บิตได้

อ้างอิง PDF หน้า 65–68

## Virtual Machine และ VMM

Virtual machine ช่วยแบ่งทรัพยากรให้ guest หลายชุดพร้อม isolation โดย Virtual Machine Monitor (VMM)จับคู่ CPU, memory และ I/O เสมือนกับของจริง Guest OS อาจต่างจาก host และต้องอาศัยการจัดการ privileged operations VMM จัด physical timer และอาจสร้าง virtual timer interrupt ให้ guest; การ virtualize มี overhead และไม่เท่ากับไม่มีความเสี่ยงเลย

อ้างอิง PDF หน้า 69–72

## Virtual Memory และ Page Table

Virtual memory ให้แต่ละ program มี virtual address space และแปลเป็น physical address ร่วมกับ OS หน่วยย้ายข้อมูลเรียก page; แบ่ง address เป็น virtual page number กับ page offset ซึ่งคงเดิมหลัง translation Page table มี PTE บอก physical page และสถานะ; เมื่อ page ที่ต้องใช้ไม่อยู่ main memory ตามแบบ demand paging ต้องเกิด page fault ให้ OS นำเข้ามา

อ้างอิง PDF หน้า 73–78

## TLB Miss ต่างจาก Page Fault

TLB เป็น cache ของ address translations หรือ PTE ไม่ใช่ cache เก็บ data block ทั่วไป ถ้า TLB miss แต่ page อยู่ memory แล้ว เพียงหา PTE มาเติมและลองคำสั่งใหม่ ถ้า page ไม่อยู่ memory ต้องให้ OS จัดการ page fault อาจเขียน dirty victim กลับ disk ก่อนอ่าน page ใหม่ อัปเดต mapping และ restart คำสั่งเดิม

อ้างอิง PDF หน้า 79–84

## Protection และ Address ของ Cache

Page table กับ privileged state ต้องถูกป้องกันจากโปรแกรมทั่วไป โดยใช้ supervisor/kernel mode และ exception เช่น ecall ถ้า cache ใช้ physical tag ต้องพิจารณา translation ก่อนตรวจ tag ส่วน virtual tag มีปัญหา aliasing เมื่อหลาย virtual addresses ชี้ physical address เดียวกัน แยก permission ในการเข้าถึงออกจากการมี page อยู่ใน memory

อ้างอิง PDF หน้า 85–86

## กรอบร่วมและ Miss 3 ชนิด

ทุกระดับต้องตอบว่า block วางที่ไหน หาอย่างไร เปลี่ยนตัวใด และเขียนกลับเมื่อใด Compulsory miss คือครั้งแรกที่ใช้ block, capacity miss เกิดเมื่อพื้นที่รวมไม่พอ และ conflict miss เกิดจากแย่ง entry/set ซึ่งจะหายไปถ้าใช้ fully associative ขนาดรวมเท่ากัน การเพิ่มขนาด cache, associativity หรือ block size มีผลคนละด้านและอาจเพิ่ม hit time หรือ penalty

อ้างอิง PDF หน้า 87–93

## Cache Controller เป็น FSM

ตัวอย่าง blocking direct-mapped write-back/write-allocate มี states Idle, Compare Tag, Write-Back และ Allocate เมื่อ miss และ victim สะอาดสามารถไป Allocate; ถ้า dirty ต้อง Write-Back ก่อน เมื่อ memory ไม่ Ready ต้องรอ state ที่เกี่ยวข้องจนสำเร็จ แล้วกลับตรวจ tag/ทำ access ตามลำดับ

อ้างอิง PDF หน้า 94–97

## Coherence กับ Consistency

หลาย core อาจมีสำเนา X ใน cache คนละชุด แม้ write-through อัปเดต memory แล้ว สำเนาอีก core ก็อาจยังเก่า Coherence ดูความถูกต้องและลำดับ writes ของตำแหน่งเดียว ใช้ snooping หรือ directory และ invalidate สำเนาอื่นได้ ส่วน consistency กำหนดการเห็นลำดับ memory operations หลายตำแหน่ง; ข้อสรุปเรื่องเขียน X ก่อน Y ในบทต้องยึดสมมติฐาน ordering ที่กำหนด

อ้างอิง PDF หน้า 98–102

## ตัวอย่างจริงและข้อควรระวัง

ตัวอย่าง Cortex-A53 กับ Core i7 แสดง split L1, cache หลายระดับและ TLB หลายระดับ แต่ค่าขนาดเป็นของรุ่นในสไลด์ Multi-bank, prefetch และ hit-under-miss ช่วยรองรับหลาย access; คำสั่ง system เช่น ecall, CSR และ fence จัดการสิทธิ์/สถานะ/ordering ตาม ISA ต้องแยก byte address จาก word address และระบุ address width ให้ตรง: หน้า 32 ภาพหัว 63 แต่จำนวน tag/index/offset รวม 32 บิต จึงห้ามใช้ป้ายคลาดเคลื่อนคำนวณ

อ้างอิง PDF หน้า 103–111
