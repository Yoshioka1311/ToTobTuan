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
