/* ==========================================================================
   widgets.js — ใช้ร่วมกันทุกหน้าบท (โหลดก่อน network.js)
   - course nav: สลับวิชา (Network / Web) แล้วแสดงบทของวิชานั้น
   - code block: ระบายสี HTML + สร้าง preview ผลลัพธ์จริงด้วย iframe sandbox
   - widget เล็กๆ ที่ประกาศด้วย data-widget="..." (ไม่มี JS ก็ยังอ่านเนื้อหาได้ครบ)
   ========================================================================== */
(() => {
  "use strict";

  /* ------------------------------------------------------------ Course nav */
  document.querySelectorAll(".course-nav").forEach((nav) => {
    const buttons = Array.from(nav.querySelectorAll(".subject-btn"));
    const groups = Array.from(nav.querySelectorAll(".chapter-nav[data-subject]"));
    const currentLink = nav.querySelector('.chapter-link[aria-current="page"]');
    const initial = (currentLink && currentLink.closest(".chapter-nav").dataset.subject) || groups[0].dataset.subject;

    const show = (subject) => {
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.subject === subject)));
      groups.forEach((g) => { g.hidden = g.dataset.subject !== subject; });
    };
    buttons.forEach((b) => b.addEventListener("click", () => show(b.dataset.subject)));
    show(initial);
  });

  /* ------------------------------------------------- HTML syntax highlight */
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const tok = (cls, s) => `<span class="tok-${cls}">${esc(s)}</span>`;

  function highlightTag(raw) {
    const m = /^(<\/?)([a-zA-Z][\w-]*)([\s\S]*?)(\/?>)$/.exec(raw);
    if (!m) return esc(raw);
    let attrs = "";
    const re = /(\s+)|([^\s=/>]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?|([\s\S])/g;
    let a;
    while ((a = re.exec(m[3]))) {
      if (a[1]) attrs += a[1];
      else if (a[2]) attrs += tok("attr", a[2]) + (a[3] ? esc(a[3]) + tok("val", a[4]) : "");
      else attrs += esc(a[5]);
    }
    return tok("tag", m[1] + m[2]) + attrs + tok("tag", m[4]);
  }

  function highlightHtml(src) {
    const re = /(<!--[\s\S]*?-->)|(<!doctype[^>]*>)|(<\/?[a-zA-Z][^<>]*>)|(&#?[a-zA-Z0-9]+;)/gi;
    let out = "";
    let last = 0;
    let m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      if (m[1]) out += tok("comment", m[1]);
      else if (m[2]) out += tok("doctype", m[2]);
      else if (m[3]) out += highlightTag(m[3]);
      else out += tok("entity", m[4]);
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }

  // iframe srcdoc: บังคับพื้นหลังสว่างแบบ browser ปกติ แต่คง <!DOCTYPE> ไว้บรรทัดแรก
  function buildSrcdoc(code) {
    const base = '<meta name="color-scheme" content="light"><style>:root{background:Canvas;color:CanvasText}</style>';
    const m = /^\s*<!doctype[^>]*>/i.exec(code);
    return m ? m[0] + base + code.slice(m[0].length) : base + code;
  }

  function makePreview(code, height, title) {
    const fig = document.createElement("figure");
    fig.className = "render-preview";
    const cap = document.createElement("figcaption");
    cap.textContent = "ผลลัพธ์ใน browser";
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "");
    frame.setAttribute("title", title || "ผลลัพธ์ของโค้ดตัวอย่าง");
    frame.style.height = `${height}px`;
    frame.srcdoc = buildSrcdoc(code);
    fig.append(cap, frame);
    return fig;
  }

  document.querySelectorAll('pre.code-block[data-lang="html"]').forEach((pre) => {
    const code = pre.querySelector("code") || pre;
    const source = code.textContent;
    code.innerHTML = highlightHtml(source);
    if (pre.hasAttribute("data-render")) {
      pre.after(makePreview(source, Number(pre.dataset.render) || 160, pre.dataset.renderTitle));
    }
  });

  // ให้ไฟล์อื่น (code exercise) ใช้ซ้ำได้
  window.TotobWidgets = { highlightHtml, buildSrcdoc };

  /* ------------------------------------------------------- URL anatomy */
  document.querySelectorAll('[data-widget="url-anatomy"]').forEach((root) => {
    const parts = Array.from(root.querySelectorAll(".url-part"));
    const rows = Array.from(root.querySelectorAll(".url-legend > [data-part]"));
    const select = (name) => {
      const already = parts.some((p) => p.dataset.part === name && p.getAttribute("aria-pressed") === "true");
      const target = already ? null : name;
      parts.forEach((p) => p.setAttribute("aria-pressed", String(p.dataset.part === target)));
      rows.forEach((r) => r.classList.toggle("is-active", r.dataset.part === target));
      root.classList.toggle("has-selection", target !== null);
    };
    parts.forEach((p) => {
      p.setAttribute("aria-pressed", "false");
      p.addEventListener("click", () => select(p.dataset.part));
    });
  });

  /* --------------------------------------------------- Layout preview */
  document.querySelectorAll('[data-widget="layout-demo"]').forEach((root) => {
    const preview = root.querySelector(".layout-preview");
    const caption = root.querySelector(".layout-caption");
    const buttons = Array.from(root.querySelectorAll("button[data-cols]"));
    buttons.forEach((b) => b.addEventListener("click", () => {
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      preview.dataset.cols = b.dataset.cols;
      if (caption) caption.textContent = b.dataset.caption || "";
    }));
  });

  /* ------------------------------------------------ Pattern tester */
  document.querySelectorAll('[data-widget="pattern-tester"]').forEach((root) => {
    const input = root.querySelector("input");
    const status = root.querySelector(".demo-status");
    const examples = root.querySelector("[data-examples]");
    const buttons = Array.from(root.querySelectorAll("button[data-pattern]"));

    const update = () => {
      status.classList.remove("is-ok", "is-bad");
      if (!input.value) {
        status.textContent = "ลองพิมพ์ค่าลงในช่องเพื่อทดสอบ";
      } else if (input.validity.patternMismatch) {
        status.textContent = `✗ "${input.value}" ไม่ตรงกับ pattern ${input.getAttribute("pattern")}`;
        status.classList.add("is-bad");
      } else {
        status.textContent = `✓ "${input.value}" ตรงกับ pattern ${input.getAttribute("pattern")}`;
        status.classList.add("is-ok");
      }
    };
    buttons.forEach((b) => b.addEventListener("click", () => {
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      input.setAttribute("pattern", b.dataset.pattern);
      if (examples) examples.textContent = b.dataset.examples;
      update();
    }));
    input.addEventListener("input", update);
    update();
  });

  /* ------------------------------------------------ Number helpers */
  const num = (input) => {
    const v = parseFloat(String(input.value).replace(",", "."));
    return Number.isFinite(v) ? v : 0;
  };
  // ตัดศูนย์ท้ายทศนิยม: fmt(0.0650, 3) → "0.065"
  const fmt = (v, digits = 3) => {
    if (!Number.isFinite(v)) return "∞";
    return Number(v.toFixed(digits)).toLocaleString("en-US", { maximumFractionDigits: digits });
  };
  const li = (html, cls) => {
    const node = document.createElement("li");
    if (cls) node.className = cls;
    node.innerHTML = html;
    return node;
  };

  /* ------------------------------------- HTTP RTT timeline (บทที่ 2) */
  document.querySelectorAll('[data-widget="http-timeline"]').forEach((root) => {
    const nInput = root.querySelector("[data-input=objects]");
    const rttInput = root.querySelector("[data-input=rtt]");
    const txInput = root.querySelector("[data-input=tx]");
    const rows = { non: root.querySelector('[data-row="non"]'), per: root.querySelector('[data-row="per"]') };
    const buttons = Array.from(root.querySelectorAll("button[data-mode]"));
    const status = root.querySelector(".demo-status");
    let mode = "both";

    const seg = (cls, ms, title) => ({ cls, ms, title });
    function build() {
      const n = Math.max(0, Math.min(30, Math.round(num(nInput))));
      const rtt = Math.max(0, num(rttInput));
      const tx = Math.max(0, num(txInput));
      const non = [];
      for (let i = 0; i <= n; i++) {
        const name = i === 0 ? "base HTML" : `object ${i}`;
        non.push(seg("tcp", rtt, `1 RTT: เปิด TCP connection (${name})`), seg("req", rtt, `1 RTT: ส่ง request + รับ byte แรก (${name})`), seg("tx", tx, `file transmission time (${name})`));
      }
      const per = [seg("tcp", rtt, "1 RTT: เปิด TCP connection ครั้งเดียว"), seg("req", rtt, "1 RTT: request base HTML"), seg("tx", tx, "file transmission time (base HTML)")];
      if (n > 0) {
        per.push(seg("req", rtt, `1 RTT: request object ที่อ้างอิงทั้ง ${n} ชิ้นผ่าน connection เดิม`));
        for (let i = 1; i <= n; i++) per.push(seg("tx", tx, `file transmission time (object ${i})`));
      }
      const total = (list) => list.reduce((s, x) => s + x.ms, 0);
      const totals = { non: total(non), per: total(per) };
      const visible = mode === "both" ? ["non", "per"] : [mode];
      const scale = Math.max(...visible.map((k) => totals[k]), 1);

      Object.entries({ non, per }).forEach(([key, list]) => {
        const row = rows[key];
        row.hidden = !visible.includes(key);
        const track = row.querySelector(".rtt-track");
        track.innerHTML = "";
        list.forEach((s) => {
          if (!s.ms) return;
          const d = document.createElement("span");
          d.className = `rtt-seg rtt-seg--${s.cls}`;
          d.style.width = `${(s.ms / scale) * 100}%`;
          d.title = `${s.title} · ${fmt(s.ms, 1)} ms`;
          track.append(d);
        });
        row.querySelector(".rtt-total").textContent = `${fmt(totals[key], 1)} ms`;
      });

      const rttCount = { non: 2 * (n + 1), per: n > 0 ? 3 : 2 };
      status.textContent = `Non-persistent ใช้ ${rttCount.non} RTT + transmission ${n + 1} object = ${fmt(totals.non, 1)} ms · Persistent ใช้อย่างน้อย ${rttCount.per} RTT + transmission ${n + 1} object = ${fmt(totals.per, 1)} ms`;
    }
    buttons.forEach((b) => b.addEventListener("click", () => {
      mode = b.dataset.mode;
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      build();
    }));
    [nInput, rttInput, txInput].forEach((i) => i.addEventListener("input", build));
    build();
  });

  /* ------------------------------------ Web cache calculator (บทที่ 2) */
  document.querySelectorAll('[data-widget="cache-calc"]').forEach((root) => {
    const $ = (name) => root.querySelector(`[data-input=${name}]`);
    const hitOut = root.querySelector("[data-output=hit]");
    const steps = root.querySelector(".calc-steps");
    function build() {
      const link = num($("link"));
      const rate = num($("rate"));
      const rtt = num($("rtt"));
      const size = num($("size"));
      const hit = Math.max(0, Math.min(100, num($("hit")))) / 100;
      const miss = 1 - hit;
      hitOut.textContent = `${Math.round(hit * 100)}%`;
      const utilNoCache = link ? rate / link : Infinity;
      const trans = link ? (size * 1e3) / (link * 1e6) : Infinity;
      const delayMiss = rtt + trans;
      const rateWithCache = rate * miss;
      const intensity = link ? rateWithCache / link : Infinity;
      const avg = hit * 0 + miss * delayMiss;
      steps.innerHTML = "";
      steps.append(
        li(`ไม่มี cache: access link utilization = avg data rate ÷ access link rate<span class="calc-expr">${fmt(rate)} Mbps ÷ ${fmt(link)} Mbps ≈ <strong>${fmt(utilNoCache, 2)}</strong></span>`, utilNoCache >= 0.9 ? "is-warn" : ""),
        li(`Transmission delay ของ object 1 ชิ้น = ขนาด object ÷ access link rate<span class="calc-expr">${fmt(size)}K bits ÷ ${fmt(link)} Mbps ≈ <strong>${fmt(trans, 3)} วินาที</strong></span>`),
        li(`cache miss ต้องออกไป origin server: Delay<sub>Miss</sub> = RTT + transmission delay<span class="calc-expr">${fmt(rtt)} + ${fmt(trans, 3)} = <strong>${fmt(delayMiss, 3)} วินาที</strong></span>`),
        li(`มี cache: traffic ที่วิ่งผ่าน access link เหลือ ${fmt(miss * 100, 1)}% → traffic intensity<span class="calc-expr">(${fmt(rate)} × ${fmt(miss, 2)}) ÷ ${fmt(link)} = ${fmt(rateWithCache, 3)} ÷ ${fmt(link)} ≈ <strong>${fmt(intensity, 2)}</strong></span>`, intensity >= 0.9 ? "is-warn" : ""),
        li(`Average delay = Hit rate × Delay<sub>Hit</sub> + Miss rate × Delay<sub>Miss</sub> (Delay<sub>Hit</sub> ≈ 0)<span class="calc-expr">${fmt(hit, 2)} × 0 + ${fmt(miss, 2)} × ${fmt(delayMiss, 3)} ≈ <strong>${fmt(avg, 2)} วินาที</strong></span>`, "is-result"),
      );
      if (intensity >= 0.9) {
        steps.append(li("traffic intensity ยังสูงใกล้ 1 → queueing delay ที่ access link จะมาก (กรณีไม่มี cache ในสไลด์ใช้เวลาระดับนาที) สูตรเฉลี่ยข้างบนที่ตัด queueing delay ออกจึงใช้ไม่ได้", "is-warn"));
      }
    }
    root.querySelectorAll("input").forEach((i) => i.addEventListener("input", build));
    build();
  });

  /* ------------------------- ARQ sliding window: GBN vs SR (บทที่ 3) */
  // สถานการณ์เดียวกับสไลด์: m = 3, ส่ง Frame 0–3 แล้ว Frame 1 หาย
  const range = (a, b) => Array.from({ length: b - a }, (_, i) => a + i);
  const cells = (list) => Object.fromEntries(list);
  const ARQ = {
    gbn: {
      name: "Go-Back-N",
      steps: [
        { c: "เริ่มต้น (m = 3 → sequence number 0–7): sender window ขนาดได้สูงสุด 2<sup>m</sup> − 1 = 7 · receiver window = 1 เสมอ (รอเฉพาะ Rn = 0)", s: [0, 7, {}], r: [0, 1, {}] },
        { c: "sender ส่ง Frame 0, 1, 2, 3 ต่อเนื่องโดยไม่รอ ACK ทีละเฟรม (pipelining) และเริ่ม timer ของ outstanding frame ที่เก่าที่สุด — <strong>Frame 1 หายระหว่างทาง</strong>", s: [0, 7, cells([[0, "out"], [1, "lost"], [2, "out"], [3, "out"]])], r: [0, 1, {}] },
        { c: "receiver ได้ Frame 0 ตรงกับ Rn → รับ เลื่อน Rn = 1 และส่ง ACK 1 · Frame 2 และ 3 มาไม่เรียงลำดับ (Rn ยังรอ Frame 1) → <strong>ทิ้ง ไม่เก็บ buffer</strong>", s: [0, 7, cells([[0, "out"], [1, "lost"], [2, "out"], [3, "out"]])], r: [1, 1, cells([[0, "ok"], [2, "drop"], [3, "drop"]])] },
        { c: "ACK 1 มาถึง sender → Frame 0 ได้รับการยืนยัน เลื่อน send window ให้ Sf = 1", s: [1, 7, cells([[0, "acked"], [1, "lost"], [2, "out"], [3, "out"]])], r: [1, 1, cells([[0, "ok"]])] },
        { c: "timer ของ outstanding frame ที่เก่าที่สุดหมดเวลา → <strong>go back:</strong> ส่ง Frame 1 และทุกเฟรมหลังจากนั้น (2, 3) ใหม่ทั้งหมด แม้ 2 กับ 3 จะเคยไปถึงแล้ว", s: [1, 7, cells([[0, "acked"], [1, "resend"], [2, "resend"], [3, "resend"]])], r: [1, 1, cells([[0, "ok"]])] },
        { c: "receiver รับ Frame 1, 2, 3 ตามลำดับ → Rn = 4 ส่ง cumulative ACK 4 (ยืนยันทุกเฟรมก่อนหน้า 4) → sender เลื่อน window ไปที่ Sf = 4", s: [4, 7, cells(range(0, 4).map((i) => [i, "acked"]))], r: [4, 1, cells(range(0, 4).map((i) => [i, "ok"]))] },
      ],
    },
    sr: {
      name: "Selective Repeat",
      steps: [
        { c: "เริ่มต้น (m = 3): sender และ receiver window ขนาดเท่ากัน ไม่เกิน 2<sup>m−1</sup> = 4 — receiver รับได้ทั้งช่วง 0–3", s: [0, 4, {}], r: [0, 4, {}] },
        { c: "sender ส่ง Frame 0, 1, 2, 3 (แต่ละเฟรมมี timer ของตัวเอง) — <strong>Frame 1 หายระหว่างทาง</strong>", s: [0, 4, cells([[0, "out"], [1, "lost"], [2, "out"], [3, "out"]])], r: [0, 4, {}] },
        { c: "receiver ได้ Frame 0 → ส่งขึ้นชั้นบน เลื่อน window (Rn = 1) ส่ง ACK 1 · Frame 2 และ 3 อยู่ใน receive window → <strong>เก็บใน buffer</strong> และส่ง NAK 1 ขอ Frame 1", s: [0, 4, cells([[0, "out"], [1, "lost"], [2, "out"], [3, "out"]])], r: [1, 4, cells([[0, "ok"], [2, "buf"], [3, "buf"]])] },
        { c: "ACK 1 มาถึง → Sf = 1 · NAK 1 มาถึง → <strong>ส่งใหม่เฉพาะ Frame 1</strong> (Frame 2, 3 ไม่ต้องส่งซ้ำ)", s: [1, 4, cells([[0, "acked"], [1, "resend"], [2, "out"], [3, "out"]])], r: [1, 4, cells([[0, "ok"], [2, "buf"], [3, "buf"]])] },
        { c: "receiver ได้ Frame 1 → ส่ง Frame 1, 2, 3 ขึ้นชั้นบนพร้อมกัน Rn = 4 ส่ง ACK 4 → sender เลื่อน window ไปที่ Sf = 4", s: [4, 4, cells(range(0, 4).map((i) => [i, "acked"]))], r: [4, 4, cells(range(0, 4).map((i) => [i, "ok"]))] },
      ],
    },
  };
  document.querySelectorAll('[data-widget="arq-window"]').forEach((root) => {
    const strips = { s: root.querySelector('[data-strip="s"]'), r: root.querySelector('[data-strip="r"]') };
    const caption = root.querySelector(".arq-caption");
    const stepLabel = root.querySelector(".arq-step");
    const prev = root.querySelector('[data-step="prev"]');
    const next = root.querySelector('[data-step="next"]');
    const buttons = Array.from(root.querySelectorAll("button[data-proto]"));
    let proto = "gbn";
    let step = 0;
    const paint = (strip, [start, size, states]) => {
      strip.innerHTML = "";
      for (let i = 0; i < 12; i++) {
        const cell = document.createElement("span");
        cell.className = "arq-cell";
        cell.textContent = i % 8;
        const inWin = i >= start && i < start + size;
        if (inWin) cell.classList.add("in-win");
        if (i === start) cell.classList.add("win-start");
        if (i === start + size - 1) cell.classList.add("win-end");
        if (states[i]) cell.dataset.state = states[i];
        strip.append(cell);
      }
    };
    function render() {
      const data = ARQ[proto];
      const st = data.steps[step];
      paint(strips.s, st.s);
      paint(strips.r, st.r);
      caption.innerHTML = st.c;
      stepLabel.textContent = `${data.name} · ขั้นที่ ${step + 1} / ${data.steps.length}`;
      prev.disabled = step === 0;
      next.disabled = step === data.steps.length - 1;
    }
    prev.addEventListener("click", () => { step = Math.max(0, step - 1); render(); });
    next.addEventListener("click", () => { step = Math.min(ARQ[proto].steps.length - 1, step + 1); render(); });
    buttons.forEach((b) => b.addEventListener("click", () => {
      proto = b.dataset.proto;
      step = 0;
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      render();
    }));
    render();
  });

  /* --------------------------------------------- Hamming code (บทที่ 3) */
  document.querySelectorAll('[data-widget="hamming"]').forEach((root) => {
    const input = root.querySelector("input");
    const row = root.querySelector(".bit-row");
    const out = root.querySelector(".calc-steps");
    const status = root.querySelector(".demo-status");
    const DATA_POS = [3, 5, 6, 7, 9, 10, 11]; // d1..d7
    const GROUP = { 1: [1, 3, 5, 7, 9, 11], 2: [2, 3, 6, 7, 10, 11], 4: [4, 5, 6, 7], 8: [8, 9, 10, 11] };
    const NAMES = {};
    DATA_POS.forEach((p, i) => { NAMES[p] = `d${i + 1}`; });
    [1, 2, 4, 8].forEach((p) => { NAMES[p] = `r${p}`; });
    let flipped = null;

    function encode(bits7) {
      // input เขียนแบบ d7 d6 … d1 (ซ้าย → ขวา) ตามสไลด์
      const code = {};
      bits7.split("").reverse().forEach((b, i) => { code[DATA_POS[i]] = Number(b); });
      [1, 2, 4, 8].forEach((r) => {
        code[r] = GROUP[r].filter((p) => p !== r).reduce((x, p) => x ^ code[p], 0);
      });
      return code;
    }
    function render() {
      const raw = input.value.replace(/[^01]/g, "").slice(0, 7);
      if (raw.length !== 7) {
        status.textContent = "ใส่ dataword ให้ครบ 7 บิต (0 หรือ 1)";
        status.className = "demo-status is-bad";
        row.innerHTML = "";
        out.innerHTML = "";
        return;
      }
      const sent = encode(raw);
      const recv = { ...sent };
      if (flipped) recv[flipped] ^= 1;
      const str = (c) => range(0, 11).map((i) => c[11 - i]).join("");
      const checks = [1, 2, 4, 8].map((r) => ({ r, bits: GROUP[r].map((p) => recv[p]), v: GROUP[r].reduce((x, p) => x ^ recv[p], 0) }));
      const location = checks.reduce((s, c) => s + c.v * c.r, 0);

      row.innerHTML = "";
      for (let p = 11; p >= 1; p--) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "bit-cell";
        if ([1, 2, 4, 8].includes(p)) b.classList.add("is-parity");
        if (flipped === p) b.classList.add("is-flipped");
        if (flipped && location === p) b.classList.add("is-found");
        b.setAttribute("aria-label", `ตำแหน่ง ${p} (${NAMES[p]}) ค่า ${recv[p]} — คลิกเพื่อจำลองบิตผิด`);
        b.innerHTML = `<span class="bit-pos">${p}</span><span class="bit-val">${recv[p]}</span><span class="bit-name">${NAMES[p]}</span>`;
        b.addEventListener("click", () => { flipped = flipped === p ? null : p; render(); });
        row.append(b);
      }
      out.innerHTML = "";
      out.append(li(`codeword ที่ส่ง (ตำแหน่ง 11 → 1)<span class="calc-expr">${str(sent)}</span>`));
      out.append(li(`codeword ที่รับ${flipped ? ` (จำลองบิตตำแหน่ง ${flipped} ผิด)` : ""}<span class="calc-expr">${str(recv)}</span>`));
      checks.forEach((c) => out.append(li(`Check r${c.r} = XOR ของบิตตำแหน่ง {${GROUP[c.r].join(",")}}<span class="calc-expr">${c.bits.join(" ⊕ ")} = <strong>${c.v}</strong></span>`)));
      out.append(li(`ตำแหน่งบิตผิด = (r8 r4 r2 r1)<sub>2</sub><span class="calc-expr">(${checks[3].v}${checks[2].v}${checks[1].v}${checks[0].v})<sub>2</sub> = <strong>${location}</strong></span>`, location ? "is-warn" : "is-result"));
      status.className = `demo-status ${location ? "is-bad" : "is-ok"}`;
      status.textContent = location ? `พบบิตผิดที่ตำแหน่ง ${location} → กลับค่าบิตนั้นเพื่อแก้ไข` : "ผลตรวจทุก check = 0 → ไม่พบบิตผิด";
    }
    input.addEventListener("input", () => { flipped = null; render(); });
    render();
  });

  /* ------------------------------------ CRC modulo-2 division (บทที่ 3) */
  document.querySelectorAll('[data-widget="crc-calc"]').forEach((root) => {
    const dataIn = root.querySelector('[data-input="data"]');
    const divIn = root.querySelector('[data-input="divisor"]');
    const pre = root.querySelector(".long-division");
    const out = root.querySelector(".calc-steps");
    const bits = (el) => el.value.replace(/[^01]/g, "");
    function render() {
      const data = bits(dataIn);
      const div = bits(divIn).replace(/^0+/, "");
      out.innerHTML = "";
      if (!data || div.length < 2) {
        pre.textContent = "ใส่ dataword และ divisor (ขึ้นต้นด้วย 1 อย่างน้อย 2 บิต) เป็นเลข 0/1";
        return;
      }
      const n = div.length - 1;
      const dividend = data + "0".repeat(n);
      const arr = dividend.split("").map(Number);
      const lines = [];
      const pad = (s, at) => " ".repeat(at) + s;
      const col0 = div.length + 3; // ความกว้างของ "divisor ) "
      let quotient = "";
      for (let i = 0; i + div.length <= arr.length; i++) {
        if (i > 0) lines.push(pad(arr.slice(i, i + div.length).join(""), col0 + i));
        const lead = arr[i];
        const sub = lead ? div : "0".repeat(div.length);
        quotient += lead;
        lines.push(`<span class="ld-sub">${pad(sub, col0 + i)}</span>${lead ? "" : "   ← บิตซ้ายสุดเป็น 0 ใช้ 0…0 แทน divisor"}`);
        for (let j = 0; j < div.length; j++) arr[i + j] ^= Number(sub[j]);
        lines.push(pad("-".repeat(div.length), col0 + i));
      }
      const rem = arr.slice(arr.length - n).join("");
      lines.push(`<span class="ld-rem">${pad(rem, col0 + arr.length - n)}</span>   ← remainder = CRC`);
      pre.innerHTML = [
        pad(quotient, col0 + div.length - 1) + "   ← quotient",
        `${div} ) ${dividend}   ← dataword + ${n} zeros`,
        ...lines,
      ].join("\n");
      out.append(
        li(`CRC มีขนาดน้อยกว่า divisor 1 บิต: divisor ${div.length} บิต → CRC ${n} บิต<span class="calc-expr">quotient = ${quotient}</span>`),
        li(`นำ CRC ต่อท้าย dataword ได้ codeword ที่ส่ง<span class="calc-expr">${data} + ${rem} = <strong>${data}${rem}</strong></span>`, "is-result"),
      );
    }
    [dataIn, divIn].forEach((i) => i.addEventListener("input", render));
    render();
  });

  /* -------------------------------------------- Form validation demo */
  document.querySelectorAll('form[data-widget="validation-demo"]').forEach((form) => {
    const status = form.querySelector(".demo-status");
    const labelOf = (el) => {
      const label = el.id && form.querySelector(`label[for="${el.id}"]`);
      return label ? label.textContent.trim() : el.name;
    };
    let reported = false;
    form.addEventListener("invalid", (e) => {
      if (reported) return;
      reported = true;
      status.classList.remove("is-ok");
      status.classList.add("is-bad");
      status.textContent = `✗ ไม่ผ่าน validation ที่ช่อง "${labelOf(e.target)}": ${e.target.validationMessage}`;
    }, true);
    form.querySelector('[type="submit"]').addEventListener("click", () => { reported = false; });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.classList.remove("is-bad");
      status.classList.add("is-ok");
      status.textContent = "✓ ผ่าน validation ครบทุกช่อง — ถ้าเป็น form จริง browser จะส่งข้อมูลไปยังปลายทางใน action ต่อ";
    });
  });
})();
