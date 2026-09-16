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

  /* ------------------------------------------------- CSS syntax highlight */
  // selector → tok-tag · property → tok-attr · value → tok-val · comment → tok-comment
  function highlightCss(src) {
    const re = /\/\*[\s\S]*?\*\/|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|[{};]|[^{};"'/]+|\//g;
    const parts = [];
    let m;
    while ((m = re.exec(src))) parts.push(m[0]);
    let out = "";
    let depth = 0;
    let inValue = false;
    const nextDelim = (i) => {
      for (let j = i + 1; j < parts.length; j++) if (/^[{};]$/.test(parts[j])) return parts[j];
      return "";
    };
    parts.forEach((p, i) => {
      if (p.startsWith("/*")) { out += tok("comment", p); return; }
      if (p === "{") { depth++; inValue = false; out += esc(p); return; }
      if (p === "}") { depth = Math.max(0, depth - 1); inValue = false; out += esc(p); return; }
      if (p === ";") { inValue = false; out += esc(p); return; }
      if (p[0] === '"' || p[0] === "'") { out += tok("val", p); return; }
      if (!p.trim()) { out += esc(p); return; }
      if (nextDelim(i) === "{" || depth === 0) {
        const lead = /^\s*/.exec(p)[0];
        const tail = /\s*$/.exec(p)[0];
        out += esc(lead) + tok(p.trim().startsWith("@") ? "doctype" : "tag", p.trim()) + esc(tail);
        return;
      }
      if (inValue) { out += tok("val", p); return; }
      const colon = p.indexOf(":");
      if (colon < 0) { out += tok("attr", p); return; }
      out += tok("attr", p.slice(0, colon)) + esc(":");
      const rest = p.slice(colon + 1);
      if (rest) out += tok("val", rest);
      inValue = true;
    });
    return out;
  }

  /* -------------------------------------------------- JS syntax highlight */
  const JS_KEYWORDS = new Set("var let const function return if else for while do switch case break continue default new class extends super this typeof instanceof in of try catch finally throw async await yield import export from static get set delete void".split(" "));
  const JS_LITERALS = new Set(["true", "false", "null", "undefined", "NaN", "Infinity"]);
  function highlightJs(src) {
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?n?\b)|([A-Za-z_$][\w$]*)(\s*\()?/g;
    let out = "";
    let last = 0;
    let m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      if (m[1]) out += tok("comment", m[1]);
      else if (m[2]) out += tok("val", m[2]);
      else if (m[3]) out += tok("entity", m[3]);
      else if (JS_KEYWORDS.has(m[4])) out += tok("tag", m[4]) + esc(m[5] || "");
      else if (JS_LITERALS.has(m[4])) out += tok("entity", m[4]) + esc(m[5] || "");
      else if (m[5]) out += tok("attr", m[4]) + esc(m[5]);
      else out += esc(m[4]);
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }

  document.querySelectorAll('pre.code-block[data-lang="css"]').forEach((pre) => {
    const code = pre.querySelector("code") || pre;
    code.innerHTML = highlightCss(code.textContent);
  });

  /* ---------------------------------------------------------------------
     JS sandbox — รันโค้ด JavaScript ของผู้ใช้/ตัวอย่างอย่างปลอดภัย
     - iframe sandbox="allow-scripts" (ไม่มี allow-same-origin) → origin เป็น opaque
       เข้าถึง DOM / localStorage / cookie ของหน้าเว็บหลักไม่ได้
     - CSP ใน srcdoc ปิด network ทั้งหมด (default-src 'none')
     - loop guard: แทรก __loopGuard() ในเงื่อนไข while / for / do-while → เกินจำนวนรอบ = throw
     - timeout ฝั่งหน้าหลัก: ไม่ได้ผลลัพธ์ภายในเวลาที่กำหนด → ทิ้ง iframe
     - สื่อสารกลับด้วย postMessage + token สุ่ม และตรวจ event.source ทุกครั้ง
     --------------------------------------------------------------------- */
  const LOOP_LIMIT = 100000;
  const REGEX_AFTER_WORD = new Set(["return", "typeof", "instanceof", "in", "of", "new", "delete", "void", "throw", "case", "do", "else", "yield", "await"]);

  // แยก token แบบหยาบพอสำหรับหา while/for ที่ไม่ได้อยู่ใน string, comment, template หรือ regex
  function lexJs(src) {
    const tokens = [];
    const n = src.length;
    let i = 0;
    let prevSig = null;
    const push = (type, start, end) => {
      const t = { type, start, end, value: src.slice(start, end) };
      tokens.push(t);
      if (type !== "space" && type !== "comment") prevSig = t;
    };
    const skipQuoted = (j) => {
      const q = src[j];
      j++;
      while (j < n) {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === q || src[j] === "\n") return j + 1;
        j++;
      }
      return n;
    };
    const skipTemplate = (j) => {
      j++;
      while (j < n) {
        const c = src[j];
        if (c === "\\") { j += 2; continue; }
        if (c === "`") return j + 1;
        if (c === "$" && src[j + 1] === "{") {
          j += 2;
          let depth = 1;
          while (j < n && depth > 0) {
            const d = src[j];
            if (d === "'" || d === '"') { j = skipQuoted(j); continue; }
            if (d === "`") { j = skipTemplate(j); continue; }
            if (d === "{") depth++;
            else if (d === "}") depth--;
            j++;
          }
          continue;
        }
        j++;
      }
      return n;
    };
    const regexAllowed = () => {
      if (!prevSig) return true;
      if (prevSig.type === "word") return REGEX_AFTER_WORD.has(prevSig.value);
      if (prevSig.type === "punct") return !/^[)\]}]$/.test(prevSig.value);
      return false;
    };
    while (i < n) {
      const c = src[i];
      const start = i;
      if (/\s/.test(c)) {
        while (i < n && /\s/.test(src[i])) i++;
        push("space", start, i);
      } else if (c === "/" && src[i + 1] === "/") {
        const nl = src.indexOf("\n", i);
        i = nl < 0 ? n : nl;
        push("comment", start, i);
      } else if (c === "/" && src[i + 1] === "*") {
        const endc = src.indexOf("*/", i + 2);
        i = endc < 0 ? n : endc + 2;
        push("comment", start, i);
      } else if (c === "'" || c === '"') {
        i = skipQuoted(i);
        push("string", start, i);
      } else if (c === "`") {
        i = skipTemplate(i);
        push("string", start, i);
      } else if (c === "/" && regexAllowed()) {
        let j = i + 1;
        let inClass = false;
        while (j < n && src[j] !== "\n") {
          const d = src[j];
          if (d === "\\") { j += 2; continue; }
          if (inClass) { if (d === "]") inClass = false; } else if (d === "[") inClass = true;
          else if (d === "/") { j++; while (j < n && /[a-z]/i.test(src[j])) j++; break; }
          j++;
        }
        i = j;
        push("regex", start, i);
      } else if (/[\w$-￿]/.test(c)) {
        while (i < n && /[\w$-￿]/.test(src[i])) i++;
        push("word", start, i);
      } else {
        i++;
        push("punct", start, i);
      }
    }
    return tokens;
  }

  function guardLoops(src) {
    const tokens = lexJs(src);
    const inserts = []; // [position, text]
    const sig = tokens.filter((t) => t.type !== "space" && t.type !== "comment");
    sig.forEach((t, k) => {
      if (t.type !== "word" || (t.value !== "while" && t.value !== "for")) return;
      if (k > 0 && sig[k - 1].value === ".") return;
      const open = sig[k + 1];
      if (!open || open.value !== "(") return;
      let depth = 0;
      const semis = [];
      let close = null;
      for (let j = k + 1; j < sig.length; j++) {
        const v = sig[j].value;
        if (sig[j].type !== "punct") continue;
        if (v === "(" || v === "[" || v === "{") depth++;
        else if (v === ")" || v === "]" || v === "}") {
          depth--;
          if (depth === 0) { close = sig[j]; break; }
        } else if (v === ";" && depth === 1) semis.push(sig[j]);
      }
      if (!close) return;
      if (t.value === "while") {
        inserts.push([open.end, "__loopGuard() && ("], [close.start, ")"]);
      } else if (semis.length === 2) {
        const cond = src.slice(semis[0].end, semis[1].start);
        if (cond.trim()) inserts.push([semis[0].end, " __loopGuard() && ("], [semis[1].start, ")"]);
        else inserts.push([semis[0].end, " __loopGuard()"]);
      }
    });
    inserts.sort((a, b) => b[0] - a[0]);
    let out = src;
    inserts.forEach(([pos, text]) => { out = out.slice(0, pos) + text + out.slice(pos); });
    return out;
  }

  const HARNESS = (token) => `(function(){
  var T=${JSON.stringify(token)},logs=[],errors=[],count=0,LIMIT=${LOOP_LIMIT},hit=false;
  function send(m){m.token=T;try{parent.postMessage(m,"*");}catch(e){}}
  function fmt(v,d){d=d||0;var t=typeof v;
    if(t==="string")return d?JSON.stringify(v):v;
    if(t==="bigint")return v+"n";
    if(t==="number"||t==="boolean"||t==="symbol")return String(v);
    if(v===undefined)return "undefined";if(v===null)return "null";
    if(t==="function")return "ƒ "+(v.name||"anonymous")+"()";
    try{
      if(v instanceof Error)return v.name+": "+v.message;
      if(typeof Node!=="undefined"&&v instanceof Node)return v.nodeType===1?"<"+v.tagName.toLowerCase()+">":v.nodeName;
      if(d>2)return Array.isArray(v)?"[…]":"{…}";
      if(Array.isArray(v))return "["+v.map(function(x){return fmt(x,d+1);}).join(", ")+"]";
      if(v instanceof Map)return "Map("+v.size+") {"+Array.from(v).map(function(e){return fmt(e[0],d+1)+" => "+fmt(e[1],d+1);}).join(", ")+"}";
      if(v instanceof Set)return "Set("+v.size+") {"+Array.from(v).map(function(x){return fmt(x,d+1);}).join(", ")+"}";
      if(v instanceof Date)return v.toString();
      if(typeof v.then==="function")return "Promise {…}";
      var name=v.constructor&&v.constructor.name&&v.constructor.name!=="Object"?v.constructor.name+" ":"";
      return name+"{"+Object.keys(v).map(function(k){return k+": "+fmt(v[k],d+1);}).join(", ")+"}";
    }catch(e){return String(v);}
  }
  function out(kind){return function(){var s=Array.prototype.map.call(arguments,function(a){return fmt(a,0);}).join(" ");if(logs.length<300){logs.push(s);send({type:"log",kind:kind,text:s});}};}
  console.log=out("log");console.info=out("log");console.table=out("log");console.warn=out("warn");console.error=out("error");
  window.alert=function(m){console.log("[alert] "+fmt(m,0));};window.confirm=function(){return false;};window.prompt=function(){return null;};
  window.__loopGuard=function(){if(++count>LIMIT){hit=true;throw new Error("หยุดการทำงาน: ลูปวนเกิน "+LIMIT+" รอบ (อาจเป็น infinite loop)");}return true;};
  function report(err,fallback){var s=err&&err.name?err.name+": "+err.message:String(fallback||err);if(errors.length<50){errors.push(s);send({type:"error",text:s});}}
  window.addEventListener("error",function(e){report(e.error,e.message);});
  window.addEventListener("unhandledrejection",function(e){report(e.reason,"Unhandled promise rejection");});
  window.__done=function(probe,probeError){var p;try{p=probe===undefined?undefined:JSON.parse(JSON.stringify(probe));}catch(e){p=String(probe);}
    send({type:"done",logs:logs.slice(),errors:errors.slice(),probe:p,probeError:probeError||null,loopLimit:hit,html:(function(){if(!document.body)return "";var b=document.body.cloneNode(true);Array.prototype.forEach.call(b.querySelectorAll("script"),function(x){x.remove();});return b.innerHTML.trim();})()});};
})();`;

  const safeScript = (s) => String(s).replace(/<\/(script)/gi, "<\\/$1").replace(/<!--/g, "<\\!--");
  const randomToken = () => Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(16).padStart(2, "0")).join("");

  function buildJsDoc({ code, fixture, probe, wait, token }) {
    // wait = 0 → รัน probe ทันทีหลังโค้ดผู้ใช้ (ไม่พึ่ง setTimeout เพราะ browser หน่วง timer ของ iframe ข้าม origin ที่เพิ่งใช้ CPU หนัก)
    const delay = Math.max(0, Number(wait) || 0);
    const probeScript = `(function(run){if(${delay}>0){setTimeout(run,${delay});}else{run();}})(function(){var p,pe=null;try{p=(function(){${safeScript(probe || "")}\n})();}catch(e){pe=(e&&e.name?e.name+": ":"")+(e&&e.message||e);}
if(p&&typeof p.then==="function"){p.then(function(v){__done(v,pe);},function(e){__done(undefined,String(e&&e.message||e));});}else{__done(p,pe);}});`;
    return `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:">
<meta name="color-scheme" content="light"><style>:root{background:Canvas;color:CanvasText;font-family:system-ui,sans-serif}</style>
<script>${HARNESS(token)}<\/script></head><body>
${fixture || ""}
<script>${safeScript(guardLoops(code || ""))}\n<\/script>
<script>${probeScript}<\/script>
</body></html>`;
  }

  // opts: { code, fixture, probe, wait, timeout, frame (iframe ที่จะใช้แสดงผล ถ้าไม่ใส่จะสร้าง iframe ซ่อน), onEvent }
  function runJs(opts = {}) {
    const { code = "", fixture = "", probe = "", wait = 0, timeout = 2500, frame = null, onEvent = null } = opts;
    return new Promise((resolve) => {
      const token = randomToken();
      const temp = !frame;
      const target = frame || document.createElement("iframe");
      if (target.__runnerListener) window.removeEventListener("message", target.__runnerListener);
      if (temp) {
        // ไม่ใช้ display:none — วางไว้นอกจอแทน เพื่อไม่ให้ browser หน่วง timer ของ iframe ที่ซ่อนอยู่
        target.style.cssText = "position:fixed;left:-10000px;top:0;width:480px;height:320px;border:0;opacity:0;pointer-events:none";
        target.setAttribute("aria-hidden", "true");
        target.tabIndex = -1;
        target.title = "sandbox";
      }
      target.setAttribute("sandbox", "allow-scripts");
      const logs = [];
      const errors = [];
      let settled = false;
      const cleanup = () => {
        window.removeEventListener("message", listener);
        target.__runnerListener = null;
        if (temp) target.remove();
      };
      const listener = (e) => {
        if (e.source !== target.contentWindow) return;
        const d = e.data;
        if (!d || typeof d !== "object" || d.token !== token) return;
        if (d.type === "log") { logs.push(d.text); if (onEvent) onEvent(d); }
        else if (d.type === "error") { errors.push(d.text); if (onEvent) onEvent(d); }
        else if (d.type === "done" && !settled) {
          settled = true;
          clearTimeout(timer);
          if (temp) cleanup();
          resolve({ logs: d.logs, errors: d.errors, probe: d.probe, probeError: d.probeError, loopLimit: d.loopLimit, html: d.html, timeout: false });
        }
      };
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        cleanup();
        if (!temp) target.srcdoc = "";
        const msg = "หมดเวลา: โค้ดทำงานนานเกินไป (อาจมี infinite loop หรือรอ event ที่ไม่เกิดขึ้น)";
        if (onEvent) onEvent({ type: "error", text: msg });
        resolve({ logs, errors: errors.concat(msg), probe: undefined, probeError: null, loopLimit: false, html: "", timeout: true });
      }, timeout + (Number(wait) || 0));
      window.addEventListener("message", listener);
      target.__runnerListener = listener;
      if (temp) document.body.append(target);
      target.srcdoc = buildJsDoc({ code, fixture, probe, wait, token });
    });
  }

  /* -------- โค้ดตัวอย่าง JS ที่กดรันได้: <pre class="code-block" data-lang="js" data-run [data-fixture="template-id"]> */
  function renderConsoleLine(list, kind, text) {
    const line = document.createElement("span");
    line.className = `run-line run-line--${kind}`;
    line.textContent = text;
    list.append(line);
  }
  document.querySelectorAll('pre.code-block[data-lang="js"]').forEach((pre) => {
    const code = pre.querySelector("code") || pre;
    const source = code.textContent;
    code.innerHTML = highlightJs(source);
    if (!pre.hasAttribute("data-run")) return;

    const box = document.createElement("div");
    box.className = "run-box";
    const head = document.createElement("div");
    head.className = "run-head";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn--ghost btn--sm";
    btn.textContent = "▶ รันโค้ดนี้";
    const note = document.createElement("span");
    note.className = "run-note";
    note.textContent = "รันใน sandbox แยกจากหน้าเว็บ · ผลจาก console.log แสดงด้านล่าง";
    head.append(btn, note);
    box.append(head);

    const fixtureTpl = pre.dataset.fixture ? document.getElementById(pre.dataset.fixture) : null;
    let frame = null;
    if (fixtureTpl) {
      frame = document.createElement("iframe");
      frame.className = "run-frame";
      frame.title = "ผลลัพธ์ของโค้ดตัวอย่าง";
      frame.style.height = `${Number(pre.dataset.runHeight) || 140}px`;
      frame.setAttribute("sandbox", "allow-scripts");
      frame.srcdoc = buildSrcdoc(fixtureTpl.innerHTML);
      box.append(frame);
    }
    const output = document.createElement("pre");
    output.className = "run-output";
    output.setAttribute("aria-live", "polite");
    output.dataset.empty = "กดปุ่ม ▶ เพื่อดูผลลัพธ์";
    box.append(output);
    pre.after(box);

    btn.addEventListener("click", async () => {
      output.textContent = "";
      btn.disabled = true;
      const result = await runJs({
        code: source,
        fixture: fixtureTpl ? fixtureTpl.innerHTML : "",
        frame,
        wait: Number(pre.dataset.wait) || 0,
        onEvent: (d) => renderConsoleLine(output, d.type === "error" ? "error" : d.kind || "log", d.text),
      });
      if (!result.logs.length && !result.errors.length) renderConsoleLine(output, "muted", "(ไม่มีผลลัพธ์ใน console)");
      btn.disabled = false;
      btn.textContent = "↻ รันอีกครั้ง";
    });
  });

  // ให้ไฟล์อื่น (code exercise) ใช้ซ้ำได้
  window.TotobWidgets = { highlightHtml, highlightCss, highlightJs, buildSrcdoc, runJs, guardLoops };

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

  /* ---------------------------------------- Selector lab (Web บทที่ 3) */
  // จับคู่ selector กับ HTML ใน <template> ด้วย querySelectorAll จริง แล้วไฮไลต์โหนดที่มี data-i ตรงกัน
  document.querySelectorAll('[data-widget="selector-lab"]').forEach((root) => {
    const tpl = root.querySelector("template.sel-source");
    const doc = new DOMParser().parseFromString(`<!DOCTYPE html><body>${tpl.innerHTML}</body>`, "text/html");
    const nodes = Array.from(root.querySelectorAll(".sel-node"));
    const status = root.querySelector(".demo-status");
    const buttons = Array.from(root.querySelectorAll("button[data-selector]"));
    const apply = (selector) => {
      const hits = new Set(Array.from(doc.querySelectorAll(selector)).map((n) => n.getAttribute("data-i")).filter(Boolean));
      nodes.forEach((n) => n.classList.toggle("is-match", hits.has(n.dataset.i)));
      const names = nodes.filter((n) => hits.has(n.dataset.i)).map((n) => n.querySelector("code").textContent);
      status.textContent = names.length
        ? `${selector} เลือก ${names.length} element: ${names.join(" · ")}`
        : `${selector} ไม่ตรงกับ element ใดเลย`;
    };
    buttons.forEach((b) => b.addEventListener("click", () => {
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      apply(b.dataset.selector);
    }));
    const start = buttons.find((b) => b.getAttribute("aria-pressed") === "true") || buttons[0];
    apply(start.dataset.selector);
  });

  /* --------------------------------------------- Flexbox lab (Web บทที่ 4) */
  document.querySelectorAll('[data-widget="flex-lab"]').forEach((root) => {
    const stage = root.querySelector(".flex-stage");
    const code = root.querySelector(".flex-code code");
    const buttons = Array.from(root.querySelectorAll("button[data-prop]"));
    const DEFAULTS = { "flex-direction": "row", "flex-wrap": "nowrap", "justify-content": "flex-start", "align-items": "flex-start" };
    const values = { ...DEFAULTS };
    const render = () => {
      Object.entries(values).forEach(([prop, value]) => stage.style.setProperty(prop, value));
      const lines = ["    display: flex;"].concat(Object.entries(values).map(([p, v]) => `    ${p}: ${v};`));
      code.innerHTML = highlightCss(`.container {\n${lines.join("\n")}\n}`);
    };
    buttons.forEach((b) => b.addEventListener("click", () => {
      values[b.dataset.prop] = b.dataset.value;
      buttons.filter((x) => x.dataset.prop === b.dataset.prop).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      render();
    }));
    render();
  });

  /* ---------------------------------------- Media query lab (Web บทที่ 4) */
  // ใช้ CSS ตัวอย่างในสไลด์จริงใน iframe แล้วเปลี่ยนความกว้างของ iframe = เปลี่ยนความกว้าง viewport ของเอกสารข้างใน
  document.querySelectorAll('[data-widget="mq-lab"]').forEach((root) => {
    const range = root.querySelector('input[type="range"]');
    const out = root.querySelector("output");
    const frame = root.querySelector(".mq-frame");
    const status = root.querySelector(".demo-status");
    frame.srcdoc = `<meta name="color-scheme" content="light"><style>
body { background-color: black; margin: 0; font: 600 18px/140px system-ui, sans-serif; text-align: center; color: white; }
@media screen and (max-width: 768px) { body { background-color: lightgreen; color: black; } }
@media screen and (min-width: 1000px) { body { background-color: red; } }
</style><body>viewport กว้างเท่ากับกรอบนี้</body>`;
    const update = () => {
      const w = Number(range.value);
      frame.style.width = `${w}px`;
      out.textContent = `${w}px`;
      if (w <= 768) status.textContent = `${w}px ≤ 768px → @media screen and (max-width: 768px) เป็นจริง → body สี lightgreen`;
      else if (w >= 1000) status.textContent = `${w}px ≥ 1000px → @media screen and (min-width: 1000px) เป็นจริง → body สี red`;
      else status.textContent = `${w}px อยู่ระหว่าง 769–999px → ไม่มี media query ใดเป็นจริง → ใช้ค่าเริ่มต้น body สี black`;
    };
    range.addEventListener("input", update);
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

  /* ------------------------ Transmission / propagation delay (บทที่ 1) */
  // d_trans = L/R, d_prop = d/s, d_nodal = d_proc + d_queue + d_trans + d_prop
  const fmtTime = (sec) => {
    if (!Number.isFinite(sec)) return "∞";
    if (sec === 0) return "0 s";
    if (sec >= 1) return `${fmt(sec, 3)} วินาที`;
    if (sec >= 1e-4) return `${fmt(sec * 1e3, 3)} ms`;
    return `${fmt(sec * 1e6, 3)} µs`;
  };
  const PRESETS = {
    q1: { l: 4000, lu: "bits", r: 2, d: 0, s: "2e8" },
    q2: { l: 5, lu: "MB", r: 10, d: 0, s: "2e8" },
    q3: { l: 1000, lu: "Bytes", r: 10, d: 2000, s: "2e8" },
  };
  document.querySelectorAll('[data-widget="delay-calc"]').forEach((root) => {
    const $ = (name) => root.querySelector(`[data-input="${name}"]`);
    const steps = root.querySelector(".calc-steps");
    const status = root.querySelector(".demo-status");
    function build() {
      const lVal = Math.max(0, num($("l")));
      const unit = $("lu").value;
      const bits = unit === "bits" ? lVal : unit === "Bytes" ? lVal * 8 : lVal * 1e6 * 8;
      const rMbps = Math.max(0, num($("r")));
      const bps = rMbps * 1e6;
      const km = Math.max(0, num($("d")));
      const m = km * 1e3;
      const s = Number($("s").value);
      const procMs = Math.max(0, num($("proc")));
      const queueMs = Math.max(0, num($("queue")));
      const trans = bps ? bits / bps : Infinity;
      const prop = m / s;
      const nodal = procMs / 1e3 + queueMs / 1e3 + trans + prop;
      steps.innerHTML = "";
      const convL = unit === "bits" ? `L = ${fmt(bits, 0)} bits` : unit === "Bytes" ? `L = ${fmt(lVal)} Bytes × 8 = ${fmt(bits, 0)} bits` : `L = ${fmt(lVal)} × 10<sup>6</sup> × 8 = ${fmt(bits, 0)} bits`;
      steps.append(
        li(`แปลงหน่วยให้เป็น bits, bps และเมตร<span class="calc-expr">${convL} · R = ${fmt(rMbps)} Mbps = ${fmt(bps, 0)} bps · d = ${fmt(km)} km = ${fmt(m, 0)} m</span>`),
        li(`Transmission delay: d<sub>trans</sub> = L / R<span class="calc-expr">${fmt(bits, 0)} / ${fmt(bps, 0)} = <strong>${fmtTime(trans)}</strong></span>`),
        li(`Propagation delay: d<sub>prop</sub> = d / s<span class="calc-expr">${fmt(m, 0)} m / ${s === 2e8 ? "2×10<sup>8</sup>" : "2.5×10<sup>8</sup>"} m/s = <strong>${fmtTime(prop)}</strong></span>`),
        li(`d<sub>nodal</sub> = d<sub>proc</sub> + d<sub>queue</sub> + d<sub>trans</sub> + d<sub>prop</sub><span class="calc-expr">${fmt(procMs)} ms + ${fmt(queueMs)} ms + ${fmtTime(trans)} + ${fmtTime(prop)} = <strong>${fmtTime(nodal)}</strong></span>`, "is-result"),
      );
      if (!bps) status.textContent = "R = 0 ส่งไม่ได้ (d_trans เป็นอนันต์)";
      else if (!m) status.textContent = "d = 0 จึงไม่มี propagation delay — เหลือแค่เวลาดันบิตลงสาย";
      else status.textContent = trans > prop ? `d_trans มากกว่า d_prop ประมาณ ${fmt(trans / prop, 1)} เท่า` : `d_prop มากกว่า d_trans ประมาณ ${fmt(prop / trans, 1)} เท่า`;
    }
    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-preset]");
      if (!btn) return;
      const p = PRESETS[btn.dataset.preset];
      $("l").value = p.l; $("lu").value = p.lu; $("r").value = p.r; $("d").value = p.d; $("s").value = p.s;
      $("proc").value = 0; $("queue").value = 0;
      build();
    });
    root.querySelectorAll("input, select").forEach((i) => i.addEventListener("input", build));
    build();
  });

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

  /* --------------------------- Binary exponential backoff (บทที่ 4) */
  // สูตรตามสไลด์: ชนครั้งที่ n → k = min(n, 10), r ∈ {0 … 2^k − 1}, T = r × Tslot, Tslot = 2 × Tprop,max
  // Kmax ปกติ = 15 (flowchart ALOHA / Traditional Ethernet) → ชนครั้งที่ 16 ให้ abort
  const K_MAX = 15;
  document.querySelectorAll('[data-widget="backoff-sim"]').forEach((root) => {
    const tpropIn = root.querySelector('[data-input="tprop"]');
    const log = root.querySelector(".calc-steps");
    const status = root.querySelector(".demo-status");
    const collideBtn = root.querySelector('[data-action="collide"]');
    let picks = []; // [{ r, fixed }]

    function track(k, r) {
      const slots = 2 ** k;
      if (slots <= 16) {
        const cellsHtml = range(0, slots).map((i) => `<i class="${i === r ? "is-pick" : ""}">${i}</i>`).join("");
        return `<span class="bo-track bo-track--cells" style="--slots:${slots}" aria-hidden="true">${cellsHtml}</span>`;
      }
      const left = (r / slots) * 100;
      return `<span class="bo-track" aria-hidden="true"><i class="bo-pick" style="left:${left}%"></i><span class="bo-scale"><span>0</span><span>${slots - 1}</span></span></span>`;
    }

    function render() {
      const tprop = Math.max(0, num(tpropIn));
      const slot = 2 * tprop;
      log.innerHTML = "";
      let total = 0;
      picks.forEach((p, i) => {
        const n = i + 1;
        if (n > K_MAX) {
          log.append(li(`collision ครั้งที่ ${n}: K = ${n} &gt; K<sub>max</sub> (ปกติ = ${K_MAX}) → <strong>Abort</strong> เลิกส่งเฟรมนี้`, "is-warn"));
          return;
        }
        const k = Math.min(n, 10);
        const t = p.r * slot;
        total += t;
        log.append(li(
          `collision ครั้งที่ ${n}${p.fixed ? " (ค่า r ตามตัวอย่างในสไลด์)" : ""}` +
          `<span class="calc-expr">k = min(${n}, 10) = ${k} → r ∈ {0, 1, …, 2<sup>${k}</sup> − 1} = {0 … ${2 ** k - 1}} → สุ่มได้ r = ${p.r}</span>` +
          track(k, p.r) +
          `<span class="calc-expr">T<sub>backoff</sub> = r × T<sub>slot</sub> = ${p.r} × ${fmt(slot, 2)} = <strong>${fmt(t, 2)} µs</strong></span>`,
          p.fixed ? "is-result" : "",
        ));
      });
      const n = picks.length;
      const aborted = n > K_MAX;
      collideBtn.disabled = aborted;
      if (!n) {
        status.textContent = `T_slot = 2 × T_prop,max = 2 × ${fmt(tprop, 2)} = ${fmt(slot, 2)} µs · กด "เกิด collision" เพื่อจำลอง`;
      } else if (aborted) {
        status.textContent = `ชนเกิน K_max = ${K_MAX} ครั้ง → Abort · เวลารอสะสมก่อน abort ${fmt(total, 2)} µs`;
      } else {
        const nextK = Math.min(n + 1, 10);
        status.textContent = `เวลารอ backoff สะสม ${fmt(total, 2)} µs · ถ้าชนอีกครั้ง ช่วงสุ่มจะเป็น {0 … ${2 ** nextK - 1}}${n >= 10 ? " (k หยุดที่ 10 แล้ว)" : ""}`;
      }
    }

    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === "collide" && picks.length <= K_MAX) {
        const k = Math.min(picks.length + 1, 10);
        picks.push({ r: Math.floor(Math.random() * 2 ** k), fixed: false });
      } else if (action === "example") {
        tpropIn.value = "25.6";
        picks = [
          { r: Math.floor(Math.random() * 2), fixed: false },
          { r: Math.floor(Math.random() * 4), fixed: false },
          { r: 5, fixed: true },
        ];
      } else if (action === "reset") {
        picks = [];
      }
      render();
    });
    tpropIn.addEventListener("input", render);
    render();
  });

  /* ------------------------- เส้นทางการสื่อสารในทีม (SE บทที่ 1, slide 1-35) */
  // วาดทุกคู่ของสมาชิก แล้วนับเส้น — ใช้เฉพาะจำนวนคนที่สไลด์ยกตัวอย่าง (2, 4, 6)
  document.querySelectorAll('[data-widget="comm-paths"]').forEach((root) => {
    const svg = root.querySelector("svg");
    const status = root.querySelector(".demo-status");
    const buttons = Array.from(root.querySelectorAll("button[data-people]"));
    const NS = "http://www.w3.org/2000/svg";
    const el = (name, attrs) => {
      const node = document.createElementNS(NS, name);
      Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
      return node;
    };
    function render(n) {
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.people) === n)));
      svg.replaceChildren();
      const cx = 130, cy = 110, r = 80;
      const pts = Array.from({ length: n }, (_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      });
      let paths = 0;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          svg.append(el("line", { class: "dg-line dg-line--accent", x1: pts[i][0], y1: pts[i][1], x2: pts[j][0], y2: pts[j][1] }));
          paths++;
        }
      }
      pts.forEach(([x, y], i) => {
        svg.append(el("circle", { class: "dg-box", cx: x, cy: y, r: 15 }));
        const t = el("text", { class: "dg-mono dg-mono--sm", x, y: y + 4, "text-anchor": "middle" });
        t.textContent = String(i + 1);
        svg.append(t);
      });
      svg.setAttribute("aria-label", `${n} คน เชื่อมกันได้ ${paths} เส้นทาง`);
      status.className = "demo-status is-ok";
      status.textContent = `${n} คน → ลากเส้นเชื่อมได้ ${paths} เส้นทาง (เส้นละ 1 คู่คน)`;
    }
    buttons.forEach((b) => b.addEventListener("click", () => render(Number(b.dataset.people))));
    render(Number((buttons.find((b) => b.getAttribute("aria-pressed") === "true") || buttons[0]).dataset.people));
  });

  /* ----------------------------- PSPEC: Analyze Triangle (SE บทที่ 5, slide 7-13) */
  // ทำตาม PDL ในสไลด์ทีละบรรทัด แล้วแสดงว่าผ่านบรรทัดไหนบ้าง
  document.querySelectorAll('[data-widget="triangle-pspec"]').forEach((root) => {
    const inputs = ["a", "b", "c"].map((k) => root.querySelector(`[data-input="${k}"]`));
    const out = root.querySelector(".calc-steps");
    const status = root.querySelector(".demo-status");
    function render() {
      const v = inputs.map((i) => Number(i.value));
      out.innerHTML = "";
      if (inputs.some((i) => i.value.trim() === "") || v.some((x) => !Number.isFinite(x))) {
        status.className = "demo-status is-bad";
        status.textContent = "ใส่ความยาวด้าน A, B, C ให้ครบเป็นตัวเลข";
        return;
      }
      out.append(li(`<code>read side dimensions;</code><span class="calc-expr">A = ${v[0]}, B = ${v[1]}, C = ${v[2]}</span>`));
      const neg = v.some((x) => x < 0);
      out.append(li(`<code>if any dimension is negative</code><span class="calc-expr">${neg ? "จริง → produce error message" : "ไม่จริง → ทำบรรทัดถัดไป"}</span>`, neg ? "is-warn" : ""));
      if (neg) {
        status.className = "demo-status is-bad";
        status.textContent = "output: error message (มีค่าติดลบ)";
        return;
      }
      const sorted = [...v].sort((x, y) => y - x);
      const ok = sorted[0] < sorted[1] + sorted[2];
      out.append(li(`<code>if the largest dimension is less than the sum of the others</code><span class="calc-expr">${sorted[0]} &lt; ${sorted[1]} + ${sorted[2]} = ${sorted[1] + sorted[2]} → ${ok ? "จริง" : "ไม่จริง"}</span>`, ok ? "" : "is-warn"));
      if (!ok) {
        out.append(li(`<code>else output type = 0</code><span class="calc-expr">ไม่มีสามเหลี่ยมนี้อยู่จริง</span>`, "is-result"));
        status.className = "demo-status is-bad";
        status.textContent = "output: triangle type = 0 (no triangle exists)";
        return;
      }
      const equal = v[0] === v[1] && v[1] === v[2] ? 3 : v[0] === v[1] || v[1] === v[2] || v[0] === v[2] ? 2 : 0;
      const type = equal === 3 ? "equilateral" : equal === 2 ? "isosceles" : "scalene";
      out.append(li(`<code>determine number of equal sides</code><span class="calc-expr">${equal === 0 ? "no sides are equal" : `${equal === 3 ? "three" : "two"} sides are equal`}</span>`));
      out.append(li(`<code>type is ${type}; output triangle type</code><span class="calc-expr">${type}</span>`, "is-result"));
      status.className = "demo-status is-ok";
      status.textContent = `output: triangle type = ${type}`;
    }
    inputs.forEach((i) => i.addEventListener("input", render));
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
