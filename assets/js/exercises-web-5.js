/* ==========================================================================
   โจทย์เขียนโค้ด ITDS241 บทที่ 5 (กลุ่ม 9: JavaScript ตัวแปร / operator / control flow)
   mode "js": โค้ดผู้เรียนรันใน iframe sandbox (TotobWidgets.runJs) → checks ได้ r = { logs, errors, probe, ... }
   probe = โค้ดของผู้สร้างโจทย์ที่รันต่อจากโค้ดผู้เรียนใน sandbox เดียวกัน (เรียกฟังก์ชันที่ผู้เรียนเขียนด้วยค่าทดสอบอื่น)
   ========================================================================== */
(() => {
  const logsEqual = (r, expected) => Array.isArray(r.logs) && r.logs.length === expected.length && expected.every((v, i) => r.logs[i] === v);

  window.CODE_EXERCISE_SET = {
    id: "web-5",
    groups: [
      {
        title: "9. JavaScript ตัวแปร / operator / control flow",
        tasks: [
          {
            id: "9.1",
            title: "ตัวแปร let และ assignment",
            level: 1,
            mode: "js",
            prompt: "<p>จงเขียนโค้ด JS ที่ประกาศตัวแปรชื่อ <code>score</code> ด้วย <code>let</code> กำหนดค่าเริ่มต้นเป็น <strong>0</strong> แล้ว<strong>เพิ่มค่าอีก 5</strong> จากนั้น <code>console.log(score)</code> — ผลลัพธ์ที่ต้องได้คือ <strong>5</strong></p>",
            solution: `let score = 0;
score += 5;
console.log(score);`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "ยังไม่ได้ประกาศตัวแปร score ด้วย keyword ที่โจทย์กำหนด", test: (r, code, h) => /\blet\s+score\b/.test(h.jsCode(code)) },
              { hint: "ค่าเริ่มต้นของ score ต้องเป็น 0 ก่อนเพิ่มค่า", test: (r, code, h) => /\blet\s+score\s*=\s*0\s*[;\n]/.test(h.jsCode(code)) },
              { hint: "ผลลัพธ์ใน console ยังไม่ใช่ 5 (ต้อง log ออกมาครั้งเดียว)", test: (r) => logsEqual(r, ["5"]) },
            ],
          },
          {
            id: "9.2",
            title: "ฟังก์ชัน isEven ด้วย %",
            level: 1,
            mode: "js",
            prompt: "<p>จงเขียนฟังก์ชันชื่อ <code>isEven</code> รับ parameter หนึ่งตัวชื่อ <code>num</code> คืนค่า <strong>true</strong> ถ้า num เป็นเลขคู่ และ <strong>false</strong> ถ้าเป็นเลขคี่ (ใช้ <code>%</code> operator) แล้ว <code>console.log(isEven(4))</code> และ <code>console.log(isEven(7))</code></p>",
            solution: `function isEven(num) {
  return num % 2 === 0;
}
console.log(isEven(4));
console.log(isEven(7));`,
            probe: `return typeof isEven === "function" ? [isEven(10), isEven(3), isEven(0), isEven(-4)] : null;`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "ยังไม่พบฟังก์ชันชื่อ isEven", test: (r) => Array.isArray(r.probe) },
              { hint: "ลองใช้ operator หารเอาเศษตามโจทย์", test: (r, code, h) => /%/.test(h.jsCode(code)) },
              { hint: "ผลลัพธ์ใน console ต้องเป็น true แล้วตามด้วย false", test: (r) => logsEqual(r, ["true", "false"]) },
              { hint: "ฟังก์ชันยังคืนค่าไม่ถูกเมื่อทดสอบกับตัวเลขอื่น (ต้องคืนค่า boolean)", test: (r) => Array.isArray(r.probe) && r.probe.join() === "true,false,true,true" },
            ],
          },
          {
            id: "9.3",
            title: "for loop และผลรวม",
            level: 1,
            mode: "js",
            prompt: "<p>จงใช้ <strong>for loop</strong> พิมพ์ตัวเลข <strong>1 ถึง 5</strong> ทีละบรรทัดด้วย <code>console.log</code> และสะสมผลรวมไว้ในตัวแปร จากนั้นหลังจบลูปให้ <code>console.log</code> ผลรวมอีก 1 บรรทัด</p><p>ผลลัพธ์ที่ต้องได้: <code>1</code> <code>2</code> <code>3</code> <code>4</code> <code>5</code> <code>15</code></p>",
            solution: `let sum = 0;
for (let i = 1; i <= 5; i++) {
  console.log(i);
  sum += i;
}
console.log(sum);`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "โจทย์ต้องการให้ใช้ for loop", test: (r, code, h) => /\bfor\s*\(/.test(h.jsCode(code)) },
              { hint: "ตัวเลข 1 ถึง 5 ใน console ยังไม่ครบหรือไม่เรียงลำดับ", test: (r) => r.logs.slice(0, 5).join() === "1,2,3,4,5" },
              { hint: "บรรทัดสุดท้ายต้องเป็นผลรวม และไม่ควรมีผลลัพธ์อื่นเกินมา", test: (r) => logsEqual(r, ["1", "2", "3", "4", "5", "15"]) },
            ],
          },
          {
            id: "9.4",
            title: "if-else-if ตัดเกรด",
            level: 2,
            mode: "js",
            prompt: "<p>จงเขียนฟังก์ชัน <code>getGrade(score)</code> ที่ใช้ <strong>if-else-if</strong> คืนค่าเกรดเป็น string ตามเงื่อนไข</p><ul><li><code>score &gt;= 80</code> → <strong>\"A\"</strong></li><li><code>score &gt;= 70</code> → <strong>\"B\"</strong></li><li><code>score &gt;= 60</code> → <strong>\"C\"</strong></li><li>นอกนั้น → <strong>\"F\"</strong></li></ul><p>แล้ว <code>console.log(getGrade(75))</code></p>",
            solution: `function getGrade(score) {
  if (score >= 80) {
    return "A";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 60) {
    return "C";
  } else {
    return "F";
  }
}
console.log(getGrade(75));`,
            probe: `return typeof getGrade === "function" ? [90, 80, 79, 70, 69, 60, 59, 0].map(getGrade) : null;`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "ยังไม่พบฟังก์ชันชื่อ getGrade", test: (r) => Array.isArray(r.probe) },
              { hint: "โจทย์ต้องการโครงสร้าง if-else-if", test: (r, code, h) => /\belse\s+if\b/.test(h.jsCode(code)) },
              { hint: "ผลลัพธ์ของ getGrade(75) ใน console ยังไม่ถูกต้อง", test: (r) => logsEqual(r, ["B"]) },
              { hint: "ลองตรวจค่าที่ขอบเงื่อนไข เช่น 80, 70, 60 พอดี — ยังคืนเกรดไม่ถูกบางกรณี", test: (r) => Array.isArray(r.probe) && r.probe.join() === "A,A,B,B,C,C,F,F" },
            ],
          },
          {
            id: "9.5",
            title: "วนลูป array แล้วคัดคะแนนที่ผ่าน",
            level: 2,
            mode: "js",
            prompt: "<p>กำหนด array คะแนนไว้ให้แล้ว จงใช้<strong>ลูป</strong>ร่วมกับ <strong>if</strong> คัดเฉพาะคะแนนที่ <strong>ตั้งแต่ 50 ขึ้นไป</strong> ใส่ลงใน array ใหม่ชื่อ <code>passed</code> ด้วย <code>push()</code> แล้ว</p><ul><li><code>console.log(passed)</code></li><li><code>console.log(passed.length)</code></li></ul>",
            starter: `const scores = [45, 82, 67, 90, 38, 50];
const passed = [];

// เขียนลูปต่อจากนี้
`,
            solution: `const scores = [45, 82, 67, 90, 38, 50];
const passed = [];

for (let i = 0; i < scores.length; i++) {
  if (scores[i] >= 50) {
    passed.push(scores[i]);
  }
}
console.log(passed);
console.log(passed.length);`,
            checks: [
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "ยังไม่ได้ใช้ลูป (for / while) วนสมาชิกของ array", test: (r, code, h) => /\b(for|while)\s*\(|\.forEach\s*\(/.test(h.jsCode(code)) },
              { hint: "ยังไม่ได้เพิ่มสมาชิกลงใน passed ด้วย method ที่โจทย์กำหนด", test: (r, code, h) => /\bpassed\s*\.\s*push\s*\(/.test(h.jsCode(code)) },
              { hint: "ห้ามแก้ค่าใน array scores ที่กำหนดให้", test: (r, code, h) => /const\s+scores\s*=\s*\[\s*45\s*,\s*82\s*,\s*67\s*,\s*90\s*,\s*38\s*,\s*50\s*\]/.test(h.jsCode(code)) },
              { hint: "array passed ใน console ยังไม่ถูกต้อง — ตรวจเงื่อนไข \"ตั้งแต่ 50 ขึ้นไป\" อีกครั้ง", test: (r) => r.logs[0] === "[82, 67, 90, 50]" },
              { hint: "บรรทัดที่สองต้องเป็นจำนวนสมาชิกของ passed", test: (r) => logsEqual(r, ["[82, 67, 90, 50]", "4"]) },
            ],
          },
          {
            id: "9.6",
            title: "while กับ break และ continue",
            level: 3,
            mode: "js",
            prompt: "<p>จงใช้ <strong>while loop</strong> นับตัวเลขตั้งแต่ <strong>1</strong> ขึ้นไปเรื่อยๆ โดย</p><ul><li>ถ้าตัวเลข<strong>หาร 3 ลงตัว</strong> ให้<strong>ข้าม</strong>ไม่ต้องพิมพ์ (ใช้ <code>continue</code>)</li><li>ถ้าตัวเลข<strong>มากกว่า 10</strong> ให้<strong>หยุดลูป</strong> (ใช้ <code>break</code>)</li><li>นอกนั้นให้ <code>console.log</code> ตัวเลข</li></ul><p>ผลลัพธ์ที่ต้องได้: <code>1 2 4 5 7 8 10</code> (ทีละบรรทัด) · ระวังให้ตัวนับเพิ่มค่าก่อน continue ไม่อย่างนั้นจะวนไม่รู้จบ</p>",
            solution: `let n = 0;
while (true) {
  n++;
  if (n > 10) break;
  if (n % 3 === 0) continue;
  console.log(n);
}`,
            checks: [
              { hint: "ลูปวนไม่รู้จบหรือหมดเวลา — ตรวจว่าตัวนับเพิ่มค่าก่อนถึงคำสั่ง continue", test: (r) => !r.timeout && !r.loopLimit },
              { hint: "โค้ดยังมี error ตอนรัน", test: (r, code, h) => h.noErrors(r) },
              { hint: "โจทย์ต้องการให้ใช้ while loop", test: (r, code, h) => /\bwhile\s*\(/.test(h.jsCode(code)) },
              { hint: "ยังไม่ได้ใช้คำสั่งที่ข้ามรอบปัจจุบัน", test: (r, code, h) => /\bcontinue\b/.test(h.jsCode(code)) },
              { hint: "ยังไม่ได้ใช้คำสั่งที่หยุดลูป", test: (r, code, h) => /\bbreak\b/.test(h.jsCode(code)) },
              { hint: "ตัวเลขใน console ยังไม่ตรงกับผลลัพธ์ที่ต้องได้", test: (r) => logsEqual(r, ["1", "2", "4", "5", "7", "8", "10"]) },
            ],
          },
        ],
      },
    ],
  };
})();
