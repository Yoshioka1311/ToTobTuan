// Notes composed from the supplied ITDS211 slides and the review of the user's
// four-page revision sheet. Examples are newly worked applications of the slides.
// References use one-based PDF pages. Original source files remain local.
window.STUDY_READING_NOTES = {
 ca01: [
  {title:'สูตร CPU และ CPI เฉลี่ย',from:35,to:42,
   body:'IC คือจำนวนคำสั่งที่รันจริง ส่วน CPI คือจำนวน cycle เฉลี่ยต่อคำสั่ง สัดส่วนคำสั่งต้องรวมเป็น 1 เมื่อเปรียบเทียบเครื่อง ให้ใช้โปรแกรมและงานเดียวกัน การใช้ ISA เดียวกันอย่างเดียวไม่ได้รับประกันว่า IC เท่ากัน',
   formulas:['CPU time = IC × CPI ÷ Clock rate','Cycle time = 1 ÷ Clock rate','CPI เฉลี่ย = Σ(สัดส่วนคำสั่งแต่ละชนิด × CPI ของชนิดนั้น)','Speedup = เวลาเดิม ÷ เวลาใหม่'],
   example:'ตัวอย่างฝึก: คำสั่ง 60% ใช้ 1 cycle และอีก 40% ใช้ 3 cycles → CPI เฉลี่ย = 0.6×1 + 0.4×3 = 1.8 ไม่ใช่ (1+3)÷2'},
  {title:'RISC ไม่ได้แปลว่าทุกคำสั่งเสร็จใน 1 cycle',from:27,to:27,
   body:'RISC เน้นรูปแบบคำสั่งเรียบง่ายและสม่ำเสมอ จำนวน cycle ที่ใช้จริงขึ้นกับคำสั่งและการออกแบบ CPU ส่วน Pipeline ที่จบได้ประมาณหนึ่งคำสั่งต่อ cycle เมื่อเต็มแล้ว เป็นเรื่อง throughput ไม่ใช่เวลาที่คำสั่งหนึ่งใช้ทั้งหมด'}
 ],
 ca02: [
  {title:'บิตของ address และตาราง opcode',from:14,to:29,
   body:'Address 12 บิตอ้างได้ 2¹² = 4,096 ตำแหน่ง ต้องดูว่าแต่ละตำแหน่งเก็บกี่บิตก่อนคิดเป็น byte เครื่องสมมติหน้า 14 ใช้ Add เป็น opcode 5 แต่ MARIE ใช้ Add เป็น opcode 3 จึงต้องเลือกตารางให้ตรงกับเครื่องในโจทย์'},
  {title:'Interrupt ลดการวนรอ แต่ไม่ได้เร่งอุปกรณ์',from:38,to:43,
   body:'CPU ใช้ช่วงที่อุปกรณ์ทำงานไปทำงานอื่นได้ ถ้ามีงานอิสระให้ทำ แต่ถ้างานอื่นหมดก่อน I/O เสร็จ ก็ยังต้องรออยู่ Interrupt ไม่ได้ทำให้ความเร็วของอุปกรณ์เพิ่มขึ้น'}
 ],
 ca03: [
  {title:'บวก Complement โดยกำหนดจำนวนบิตก่อน',from:16,to:22,
   body:'1’s complement ต้องนำ carry ที่ล้นซ้ายกลับมาบวกบิตขวาสุด ส่วน 2’s complement ทิ้ง carry ที่เกินความกว้างเดิม การทิ้ง carry ไม่ได้แปลว่าผลจะอยู่ในช่วงที่แทนได้เสมอ ต้องตรวจช่วงค่าด้วย',
   example:'ตัวอย่างฝึก 4 บิต: 1’s complement ของ −3 คือ 1100 → 0110 + 1100 = 1 0010 → วน carry กลับได้ 0011 หรือ 3 ส่วน 2’s complement ของ −3 คือ 1101 → 0110 + 1101 = 1 0011 → ทิ้ง carry ได้ 0011 เช่นกัน'},
  {title:'IEEE Single: ดู exponent และ fraction คู่กัน',from:25,to:31,
   body:'สูตรที่มีเลขนำหน้า 1.f ใช้กับ normalized เท่านั้น ถ้าโจทย์ให้แปลงค่าจนได้ครบ 32 บิต ต้องทำ fraction ให้ครบและพิจารณาการปัดเศษ ไม่หยุดที่เครื่องหมาย …',
   rows:[['Exponent ที่เก็บ','Fraction','ความหมาย'],['1–254','ค่าใดก็ได้','Normalized: (−1)^s × 1.f × 2^(E−127)'],['0','0','ศูนย์ มีเครื่องหมายตาม sign bit'],['0','ไม่เป็น 0','Subnormal: (−1)^s × 0.f × 2^−126'],['255','0','Infinity มีเครื่องหมายตาม sign bit'],['255','ไม่เป็น 0','NaN']]},
  {title:'Branch: อย่าคูณ offset ซ้ำ',from:87,to:89,
   body:'Target = PC + offset หน่วย byte ถ้าโจทย์ให้ encoded immediate ที่นับทีละ 2 byte จึงคูณ 2 ก่อน แต่ถ้าถอดเป็น byte offset มาแล้วให้บวกตรง ๆ',
   example:'ตัวอย่างฝึก: PC = 100 และ byte offset = 16 → target = 116 ถ้าโจทย์ให้ encoded value = 8 หน่วยละ 2 byte → offset = 8×2 = 16 จึงได้ target เดียวกัน'}
 ],
 ca04: [
  {title:'สูตรแบ่งช่อง Cache',from:21,to:32,
   body:'ใช้ความจุส่วนข้อมูลของ cache ไม่รวม tag และบิตสถานะ สูตรแบ่งบิตด้านล่างสมมติ byte addressing และขนาดเป็นกำลังของ 2 สำหรับ set-associative ให้ใช้จำนวน sets หา index ไม่ใช่จำนวน lines ทั้งหมด',
   formulas:['จำนวน lines = ความจุข้อมูลของ cache ÷ Block size','จำนวน sets = จำนวน lines ÷ จำนวน ways','Block number = floor(Byte address ÷ Block size)','Set index = Block number mod จำนวน sets','Offset bits = log₂(Block size เป็น byte)','Index bits = log₂(จำนวน sets)','Tag bits = Address bits − Index bits − Offset bits'],
   example:'ตัวอย่างฝึก: cache 4 KiB, block 16 B, 4-way, address 32 บิต → 256 lines → 64 sets → offset 4 บิต, index 6 บิต, tag 22 บิต',extraFrom:45,extraTo:52},
  {title:'Miss rate และเวลา ต้องใช้ฐานกับหน่วยให้ตรง',from:40,to:56,
   body:'AMAT = Hit time + Miss rate × Miss penalty โดย penalty คือเวลาที่เพิ่มจาก hit time อัตรา miss ให้ใช้ทศนิยม เช่น 5% = 0.05 Local miss rate ของ L2 คิดเฉพาะคำขอที่มาถึง L2 ส่วน global คิดจากคำขอตั้งต้น จึงห้ามนำ global ไปคูณ L1 miss rate ซ้ำ',
   formulas:['Actual CPI = Base CPI + Memory stall cycles ÷ IC','จำนวน cycles = เวลาเป็นวินาที × Clock rate เป็น Hz']},
  {title:'Hamming: ตำแหน่ง parity และ syndrome',from:65,to:68,
   body:'วาง parity ที่ตำแหน่ง 1, 2, 4, 8,… แล้วใช้ผลตรวจ parity สร้าง syndrome ตามลำดับบิตที่กำหนดในโจทย์ ถ้าผิดเพียงหนึ่งบิต syndrome บอกตำแหน่งที่ต้องกลับบิต เช่น 1010₂ = 10 หมายถึงบิตที่ 10 ผิด การเพิ่ม overall parity ใช้กับ SECDED คือแก้หนึ่งบิตและตรวจสองบิต ไม่ใช่แก้สองบิต'},
  {title:'Page offset ไม่เปลี่ยนหลังแปล address',from:73,to:78,
   body:'Page table เปลี่ยน virtual page number เป็น physical page number แต่ตำแหน่งภายใน page ยังคงเดิม ถ้า page ขนาด 4 KiB = 2¹² byte จะใช้ page offset 12 บิต',
   formulas:['Page offset bits = log₂(Page size เป็น byte)']}
 ],
 ca05: [
  {title:'8255A: พอร์ตและ Control word',from:21,to:23,
   body:'8255A เป็น programmable peripheral interface มี Port A, B และ C โดย Port C แบ่งส่วนบนกับล่างได้ Control word เลือกโหมดและทิศทาง I/O ใน mode-set word บิตกำหนดทิศทางใช้ 1 = input และ 0 = output ส่วน D7 = 1 เลือกการตั้งโหมด อย่าสับสน control word กับข้อมูลที่ส่งให้อุปกรณ์',
   example:'ตัวอย่างฝึก: 10011011₂ เลือก mode set โดย Group A/B เป็น Mode 0 และ A, B, C บน/ล่างเป็น input ทั้งหมด อ่านจากตำแหน่งบิตในแผนภาพ ไม่ใช่จำเลขอย่างเดียว'},
  {title:'8237A: DMA controller',from:25,to:30,
   body:'8237A มี 4 DMA channels ตัวควบคุมติดตาม address และจำนวนข้อมูล ส่วน command, status, mode และ mask registers ใช้กำหนดงาน ดูสถานะ และเปิดหรือระงับคำขอของ channel โหมดมี demand, single, block และ cascade แบบ fly-by ให้ข้อมูลเดินระหว่าง I/O กับ memory โดยไม่พักในตัวชิป DMA'},
  {title:'DMA, DCA และ DDIO ต่างกันตรงไหน',from:24,to:37,
   body:'DMA ลดงานคัดลอกของ CPU แต่ยังต้องขอใช้ bus จึงทำให้ CPU รอทรัพยากรได้ DCA แบบต้นแบบในบทส่ง prefetch hint ให้ core ดึงข้อมูลจาก memory เข้า cache ล่วงหน้า ส่วน cache injection/DDIO ให้ I/O ติดต่อ last-level cache อย่าเหมารวม DCA ทุกแบบว่าเขียน cache โดยตรง'}
 ],
 ca06: [
  {title:'สูตรเวลา HDD',from:13,to:15,
   body:'ค่าเฉลี่ยการรอหมุนครึ่งรอบใช้เมื่อสมมติตำแหน่งเริ่มรอสุ่ม Access time ตามนิยามในบทคือ seek + rotational delay เวลางานรวมยังต้องบวก transfer และเวลาคิวหรือ controller ถ้าโจทย์ระบุ',
   formulas:['เวลาหมุนหนึ่งรอบ = 60,000 ÷ RPM ms','เวลารอหมุนเฉลี่ย = 30,000 ÷ RPM ms','Transfer time = ขนาดข้อมูล ÷ อัตราถ่ายโอน'],
   example:'ตัวอย่างฝึก: 7,200 RPM → รอหมุนเฉลี่ย 30,000÷7,200 ≈ 4.17 ms แปลงขนาดข้อมูลกับอัตราถ่ายโอนให้เป็น bit หรือ byte แบบเดียวกันก่อนหาร'},
  {title:'RAID: ความจุและการทนดิสก์เสีย',from:18,to:28,
   body:'ตารางนี้ให้ N เป็นจำนวนดิสก์ทั้งหมด ทุกลูกจุ C เท่ากัน และยังไม่หัก overhead ส่วน RAID 1 จัดเป็นคู่ mirror เลข level ไม่ใช่อันดับความเร็ว RAID 1 ใช้สำเนา ไม่ใช้ parity และยังต้องเขียนสำเนาด้วย',
   rows:[['แบบ','ความจุใช้ได้','การทนดิสก์เสีย'],['RAID 0','N×C','ไม่มี redundancy'],['RAID 1 แบบคู่ mirror','(N÷2)×C','เสียหนึ่งลูกในแต่ละคู่ได้ แต่ห้ามเสียทั้งคู่'],['RAID 5','(N−1)×C','เสียได้ 1 ลูก'],['RAID 6','(N−2)×C','เสียได้ 2 ลูก']],
   example:'ตัวอย่างฝึก: ดิสก์ 4 ลูก ลูกละ 2 TB → RAID 0 ได้ 8 TB, mirror เป็นคู่ได้ 4 TB, RAID 5 ได้ 6 TB และ RAID 6 ได้ 4 TB ตามสมมติฐานข้างต้น'}
 ],
 ca07: [
  {title:'นับ Cycles และเวลาของ Pipeline',from:3,to:13,
   body:'ให้ N เป็นจำนวนคำสั่งและ K เป็นจำนวนขั้น สูตรเริ่มจาก pipeline ว่าง แต่ละคำสั่งผ่าน K ขั้น และเริ่มคำสั่งใหม่ได้หนึ่งคำสั่งต่อ cycle แล้วบวก cycles ที่เสียเพิ่มจริงจาก stall หรือ branch ตามแบบเครื่องในโจทย์',
   formulas:['Cycles เมื่อไม่มี stall = N + K − 1','Cycles รวม = N + K − 1 + Cycles ที่เสียเพิ่ม','เวลารวม = Cycles รวม × Clock cycle time','Clock cycle time ≥ เวลาขั้นที่ช้าที่สุด + Overhead ที่โจทย์ระบุ','Speedup = เวลาแบบเดิม ÷ เวลาแบบ Pipeline'],
   example:'ตัวอย่างฝึก: 7 คำสั่งใน 5 ขั้น ไม่มี stall → 7+5−1 = 11 cycles ถ้าเสียเพิ่ม 2 cycles → รวม 13 cycles'},
  {title:'Throughput ต่างจาก Latency',from:5,to:6,
   body:'Pipeline ทำให้คำสั่งเสร็จถี่ขึ้นเมื่อเต็มแล้ว แต่คำสั่งเดียวไม่ได้เสร็จเร็วขึ้นเสมอ ตัวอย่างขั้น 200/100/200/200/100 ps ใช้ clock 200 ps จึงผ่าน 5 ขั้นใน 1,000 ps เทียบ single-cycle 800 ps ส่วนอัตราจบคำสั่งระยะยาวดีขึ้นใกล้ 4 เท่าเมื่อไม่มี stall และ overhead'},
  {title:'Branch penalty ขึ้นกับเครื่องตัวอย่าง',from:14,to:18,
   body:'การเดา not taken เป็นวิธีของเครื่องตัวอย่าง ไม่ใช่ข้อบังคับของ RISC-V ทุก CPU จำนวนคำสั่งที่ต้อง flush ขึ้นกับขั้นที่ตัดสิน branch และสิ่งที่ fetch ไว้ก่อนรู้ผล ต้องอ่านเงื่อนไขก่อนนับ cycles เสมอ',extraFrom:49,extraTo:52}
 ],
 ca08: [
  {title:'แบ่งงานและรวมผล',from:20,to:21,
   body:'เมื่อแบ่งเท่ากันได้ งานต่อ processor = งานทั้งหมด ÷ จำนวน processor ส่วน pairwise reduction ของ P ผล ใช้ log₂(P) รอบเมื่อ P เป็นกำลังของ 2 ต้องประสานให้ผลรอบก่อนพร้อมก่อนอ่าน และจัดการตัวที่เหลือเมื่อจำนวนผลเป็นเลขคี่'},
  {title:'Bisection bandwidth',from:34,to:36,
   body:'แบ่ง node เป็นสองกลุ่มขนาดเท่ากัน พิจารณาแบนด์วิดท์รวมของ link ที่ข้ามแนวแบ่งแต่ละแบบ แล้วเลือกค่าต่ำสุด การรวม link ของแนวแบ่งหนึ่งเส้นอย่างเดียวยังไม่พอ ต้องทราบด้วยว่าแนวนั้นให้ค่าต่ำสุดหรือไม่'},
  {title:'Roofline: หาเพดาน ไม่ใช่รับประกันความเร็วจริง',from:39,to:39,
   body:'Arithmetic intensity คือจำนวน FLOPs ต่อ byte ที่เข้าถึง memory คูณกับ bandwidth เป็น byte/s เพื่อได้ FLOP/s แล้วเทียบกับ peak compute เลือกค่าต่ำกว่าเป็นเพดานตามแบบจำลอง',
   formulas:['Arithmetic intensity = FLOPs ÷ Bytes ที่เข้าถึง memory','เพดาน FLOP/s = min(Peak compute, Memory bandwidth × Intensity)'],
   example:'ตัวอย่างฝึก: bandwidth 20 GB/s, intensity 4 FLOPs/byte, peak compute 200 GFLOP/s → min(200,20×4) = 80 GFLOP/s จึงติดเพดานฝั่ง memory ตามแบบจำลอง'},
  {title:'ตัวเลข GPU และ Vector เป็นของตัวอย่างในบท',from:10,to:30,
   body:'จำนวน vector elements, lanes ของ Fermi และตารางเปรียบเทียบ CPU/GPU เป็นค่าของแบบที่สไลด์ยกมา ไม่ใช่ข้อกำหนดของ GPU หรือ RISC-V ทุกแบบ เพิ่ม processor หรือ thread ก็ไม่ได้รับประกันว่าจะเร็วขึ้นตามจำนวน เพราะยังมีงานที่แบ่งไม่ได้ การประสานงาน และการแย่งทรัพยากร'}
 ]
};
