/* ==========================================================================
   code-exercise.js — แบบฝึกหัดเขียนโค้ด HTML + ตรวจอัตโนมัติ (vanilla JS, ไม่มี server)

   ใช้คู่กับไฟล์ข้อมูลที่ประกาศ window.CODE_EXERCISE_SET ก่อนหน้า (เช่น exercises-web-1.js)
   รูปแบบข้อมูล:
     { id: "web-1",                       // ใช้เป็นส่วนหนึ่งของ localStorage key
       groups: [{ title, tasks: [{
         id: "1.1", title, level: 1|2|3,  // 1 ง่าย · 2 กลาง · 3 ยาก
         prompt: "<p>HTML ของคำสั่งงาน</p>",
         starter: "",                     // โค้ดตั้งต้น (ไม่บังคับ)
         solution: "เฉลย",
         checks: [{ hint: "ยังไม่พบ ...", test: (doc, code, h) => boolean }]
       }] }] }

   validate: parse โค้ดด้วย DOMParser แล้วรัน checks ตามลำดับ
             ผ่าน = ทุก check คืน true · ไม่ผ่าน = แสดง hint ของ check แรกที่ตก + จำนวนที่เหลือ
   state:    localStorage["totobtuan:code-exercise:v1:<set id>"] =
             { current: "1.1", tasks: { "1.1": { code, status: "pass"|"fail" } } }
   ========================================================================== */
(() => {
  "use strict";

  const root = document.getElementById("code-exercise");
  const SET = window.CODE_EXERCISE_SET;
  if (!root || !SET) return;

  const W = window.TotobWidgets || {};
  const STORE_KEY = `totobtuan:code-exercise:v1:${SET.id}`;
  const LEVELS = { 1: "ง่าย", 2: "กลาง", 3: "ยาก" };
  const PRAISE = ["ผ่านแล้ว! เยี่ยมมาก", "ถูกต้องครบทุกเงื่อนไข ไปข้อต่อไปได้เลย", "เก่งมาก โครงสร้างถูกต้องทั้งหมด"];

  const tasks = SET.groups.flatMap((g, gi) => g.tasks.map((t) => Object.assign({ group: gi }, t)));
  const byId = new Map(tasks.map((t) => [t.id, t]));

  /* ------------------------------------------------------------- State */
  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw && typeof raw === "object" && raw.tasks) return raw;
    } catch (e) { /* storage ใช้ไม่ได้ → เริ่มใหม่ */ }
    return { current: tasks[0].id, tasks: {} };
  }
  let state = load();
  const save = () => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* private mode ฯลฯ */ }
  };
  const entry = (id) => (state.tasks[id] = state.tasks[id] || {});

  /* ----------------------------------------------- Helpers ให้ checks ใช้ */
  const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();
  const stripComments = (code) => code.replace(/<!--[\s\S]*?-->/g, "");
  const h = {
    norm,
    text: (el) => (el ? norm(el.textContent) : ""),
    // tag นี้ถูกเขียนไว้ในซอร์สจริงไหม (DOMParser สร้าง html/head/body ให้เองเสมอ จึงต้องเช็คจาก raw code)
    tagInSource: (code, tag) => new RegExp(`<${tag}(\\s|>|/)`, "i").test(stripComments(code)),
    doctypeFirst: (code) => /^﻿?\s*<!doctype\s+html\s*>/i.test(code),
    comments: (doc) => {
      const out = [];
      const walker = doc.createTreeWalker(doc, NodeFilter.SHOW_COMMENT);
      while (walker.nextNode()) out.push(norm(walker.currentNode.nodeValue));
      return out;
    },
    commentNodes: (doc) => {
      const out = [];
      const walker = doc.createTreeWalker(doc, NodeFilter.SHOW_COMMENT);
      while (walker.nextNode()) out.push(walker.currentNode);
      return out;
    },
    before: (a, b) => Boolean(a && b && a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING),
    ownText: (el) => (el ? norm(Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join(" ")) : ""),
    outsideForm: (doc) => Array.from(doc.querySelectorAll("input, select, textarea, button")).filter((el) => !el.closest("form")),
    labelFor: (doc, input) => (input && input.id ? doc.querySelector(`label[for="${CSS.escape(input.id)}"]`) : null),
    attr: (el, name) => (el ? (el.getAttribute(name) || "").trim() : ""),
  };

  function validate(task, code) {
    const doc = new DOMParser().parseFromString(code, "text/html");
    const failed = [];
    task.checks.forEach((check) => {
      let ok = false;
      try { ok = Boolean(check.test(doc, code, h)); } catch (e) { ok = false; }
      if (!ok) failed.push(check.hint);
    });
    return { pass: failed.length === 0, failed };
  }

  /* ------------------------------------------------------------ Render */
  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "text") node.textContent = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    [].concat(children).forEach((c) => c && node.append(c));
    return node;
  };

  root.innerHTML = "";

  // sidebar
  const passCount = el("strong", { text: "0" });
  const progressFill = el("span", { class: "progress-fill" });
  const resetAll = el("button", { class: "btn btn--ghost btn--sm cx-reset-all", type: "button", text: "ล้างความคืบหน้าทั้งหมด" });
  const sidebar = el("aside", { class: "cx-sidebar", "aria-label": "รายการโจทย์และความคืบหน้า" }, [
    el("div", { class: "cx-progress" }, [
      el("p", { class: "cx-progress-line" }, [el("span", { text: "ผ่านแล้ว" }), el("span", {}, [passCount, ` / ${tasks.length} ข้อ`])]),
      el("span", { class: "progress", "aria-hidden": "true" }, progressFill),
      resetAll,
    ]),
  ]);
  const taskButtons = new Map();
  const groupCounts = [];
  SET.groups.forEach((group, gi) => {
    const count = el("span", { class: "cx-group-count" });
    groupCounts[gi] = count;
    const list = el("ul", { class: "cx-tasklist" });
    group.tasks.forEach((t) => {
      const dot = el("span", { class: "cx-dot", "aria-hidden": "true" });
      const sr = el("span", { class: "visually-hidden" });
      const btn = el("button", { class: "cx-task", type: "button", "data-id": t.id }, [
        dot,
        el("span", {}, [el("span", { class: "cx-task-id", text: t.id }), t.title, sr]),
      ]);
      btn.addEventListener("click", () => select(t.id, { scroll: true }));
      taskButtons.set(t.id, { btn, dot, sr });
      list.append(el("li", {}, btn));
    });
    sidebar.append(el("div", { class: "cx-group" }, [el("h3", { class: "cx-group-title" }, [el("span", { text: group.title }), count]), list]));
  });

  // workspace
  const meta = el("div", { class: "cx-meta" });
  const title = el("h3", { class: "cx-title" });
  const prompt = el("div", { class: "cx-prompt" });
  const card = el("div", { class: "cx-card", tabindex: "-1" }, [meta, title, prompt]);

  const editorId = `cx-editor-${SET.id}`;
  const editor = el("textarea", {
    class: "cx-editor", id: editorId, spellcheck: "false", autocapitalize: "off", autocomplete: "off",
    wrap: "off", placeholder: "พิมพ์โค้ด HTML ที่นี่…",
  });
  const runBtn = el("button", { class: "btn btn--ghost", type: "button", text: "รันโค้ด" });
  const checkBtn = el("button", { class: "btn btn--primary", type: "button", text: "ตรวจคำตอบ" });
  const solutionBtn = el("button", { class: "btn btn--ghost", type: "button", "aria-expanded": "false", text: "ดูเฉลย" });
  const resetBtn = el("button", { class: "btn btn--ghost", type: "button", text: "รีเซ็ตโค้ด" });
  const feedback = el("div", { class: "cx-feedback", role: "status", "aria-live": "polite" });
  const editorCard = el("div", { class: "cx-card" }, [
    el("div", { class: "cx-editor-head" }, [
      el("label", { for: editorId, text: "โค้ดของคุณ" }),
      el("span", { class: "cx-hint", text: "Tab = เว้น 2 ช่อง · กด Esc แล้ว Tab เพื่อออกจากช่องโค้ด" }),
    ]),
    editor,
    el("div", { class: "cx-actions" }, [checkBtn, runBtn, solutionBtn, resetBtn]),
  ]);

  const liveToggle = el("input", { type: "checkbox" });
  liveToggle.checked = state.live !== false;
  const frame = el("iframe", { sandbox: "", title: "ผลลัพธ์ของโค้ดที่เขียน" });
  const previewCard = el("div", { class: "cx-card cx-preview" }, [
    el("div", { class: "cx-preview-head" }, [
      el("h4", { text: "ผลลัพธ์ใน browser" }),
      el("label", { class: "cx-live" }, [liveToggle, "อัปเดตอัตโนมัติขณะพิมพ์"]),
    ]),
    frame,
  ]);

  const solutionCode = el("code");
  const solutionBox = el("div", { class: "cx-card cx-solution", hidden: "" }, [
    el("p", { class: "cx-solution-note", text: "เฉลยเป็นเพียงคำตอบหนึ่งที่ผ่าน — เขียนต่างจากนี้ก็ผ่านได้ถ้าครบทุกเงื่อนไข" }),
    el("pre", { class: "code-block", "data-lang": "html" }, solutionCode),
  ]);

  const prevBtn = el("button", { class: "btn btn--ghost btn--sm", type: "button", text: "← ข้อก่อนหน้า" });
  const nextBtn = el("button", { class: "btn btn--ghost btn--sm", type: "button", text: "ข้อถัดไป →" });
  const work = el("div", { class: "cx-work" }, [card, editorCard, feedback, previewCard, solutionBox, el("div", { class: "cx-pager" }, [prevBtn, nextBtn])]);

  root.append(el("div", { class: "cx-layout" }, [sidebar, work]));

  /* ----------------------------------------------------------- Behaviour */
  let current = byId.has(state.current) ? byId.get(state.current) : tasks[0];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const renderPreview = () => {
    frame.srcdoc = W.buildSrcdoc ? W.buildSrcdoc(editor.value) : editor.value;
  };

  function updateStatusUI() {
    let passed = 0;
    tasks.forEach((t) => {
      const status = (state.tasks[t.id] || {}).status;
      const { dot, sr } = taskButtons.get(t.id);
      dot.dataset.status = status || "todo";
      dot.textContent = status === "pass" ? "✓" : status === "fail" ? "✗" : "";
      sr.textContent = status === "pass" ? " (ผ่านแล้ว)" : status === "fail" ? " (ยังไม่ผ่าน)" : " (ยังไม่ได้ตรวจ)";
      if (status === "pass") passed += 1;
    });
    passCount.textContent = passed;
    progressFill.style.setProperty("--p", passed / tasks.length);
    SET.groups.forEach((g, gi) => {
      const n = g.tasks.filter((t) => (state.tasks[t.id] || {}).status === "pass").length;
      groupCounts[gi].textContent = `${n}/${g.tasks.length}`;
    });
  }

  function showFeedback(kind, titleText, lines = []) {
    feedback.className = `cx-feedback is-${kind}`;
    feedback.innerHTML = "";
    const icon = kind === "pass" ? "✓" : kind === "fail" ? "✗" : "•";
    feedback.append(el("p", { class: "cx-feedback-title" }, [el("span", { "aria-hidden": "true", text: icon }), titleText]));
    lines.forEach((line) => feedback.append(el("p", { html: line.html || "", class: line.class || "" })));
    feedback.classList.remove("is-entering");
    void feedback.offsetWidth;
    feedback.classList.add("is-entering");
  }

  function setSolution(open) {
    solutionBox.hidden = !open;
    solutionBtn.setAttribute("aria-expanded", String(open));
    solutionBtn.textContent = open ? "ซ่อนเฉลย" : "ดูเฉลย";
  }

  // เลื่อนเฉพาะในรายการโจทย์ (ไม่เลื่อนทั้งหน้า) ให้ข้อปัจจุบันมองเห็นเสมอ
  function revealActiveTask() {
    const { btn } = taskButtons.get(current.id);
    const sideRect = sidebar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    if (!sideRect.height) return; // แท็บยังซ่อนอยู่
    if (btnRect.top < sideRect.top || btnRect.bottom > sideRect.bottom) {
      sidebar.scrollTop += btnRect.top - sideRect.top - sideRect.height / 2 + btnRect.height / 2;
    }
  }
  const codeTab = document.getElementById("tab-code");
  if (codeTab) codeTab.addEventListener("click", () => requestAnimationFrame(revealActiveTask));

  function select(id, { scroll = false, focus = false } = {}) {
    current = byId.get(id);
    state.current = id;
    save();

    taskButtons.forEach(({ btn }, tid) => btn.setAttribute("aria-current", String(tid === id)));
    revealActiveTask();
    const group = SET.groups[current.group];
    meta.innerHTML = "";
    meta.append(
      el("span", { class: "chip chip--accent", text: `โจทย์ ${current.id}` }),
      el("span", { class: "chip", text: `ระดับ${LEVELS[current.level] || ""}` }),
      el("span", { class: "chip", text: group.title }),
    );
    title.textContent = current.title;
    prompt.innerHTML = current.prompt;

    const saved = state.tasks[id];
    editor.value = saved && typeof saved.code === "string" ? saved.code : current.starter || "";
    solutionCode.innerHTML = W.highlightHtml ? W.highlightHtml(current.solution) : current.solution.replace(/</g, "&lt;");
    setSolution(false);
    feedback.className = "cx-feedback";
    feedback.innerHTML = "";
    if (saved && saved.status === "pass") showFeedback("info", "ข้อนี้คุณเคยตรวจผ่านแล้ว — แก้โค้ดแล้วตรวจซ้ำได้ตลอด");
    renderPreview();

    const index = tasks.indexOf(current);
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === tasks.length - 1;

    if (scroll && card.getBoundingClientRect().top < 70) {
      const top = work.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: reducedMotion.matches ? "auto" : "smooth" });
    }
    if (focus) card.focus({ preventScroll: true });
  }

  function check() {
    const code = editor.value;
    const e = entry(current.id);
    e.code = code;
    if (!code.trim()) {
      showFeedback("fail", "ยังไม่มีโค้ดให้ตรวจ", [{ html: "ลองเขียนโค้ดตามคำสั่งงานด้านบนก่อน แล้วกดตรวจอีกครั้ง" }]);
      return;
    }
    const { pass, failed } = validate(current, code);
    e.status = pass ? "pass" : "fail";
    save();
    updateStatusUI();
    renderPreview();
    if (pass) {
      showFeedback("pass", PRAISE[Math.floor(Math.random() * PRAISE.length)], [
        { html: tasks.indexOf(current) < tasks.length - 1 ? "กด “ข้อถัดไป” ด้านล่างเพื่อทำโจทย์ต่อ" : "ครบทุกข้อในชุดนี้แล้ว" },
      ]);
    } else {
      const lines = [{ html: escapeHtml(failed[0]) }];
      if (failed.length > 1) lines.push({ html: `และยังมีอีก ${failed.length - 1} จุดที่ต้องตรวจสอบ`, class: "cx-more" });
      showFeedback("fail", "ยังไม่ผ่าน", lines);
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/`([^`]+)`/g, "<code>$1</code>"); // hint ใช้ `...` แทนโค้ด
  }

  // ---- editor: บันทึก + live preview (หน่วงเวลา) + Tab / Enter เยื้องบรรทัด
  let saveTimer = 0;
  let previewTimer = 0;
  editor.addEventListener("input", () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { entry(current.id).code = editor.value; save(); }, 300);
    if (liveToggle.checked) {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(renderPreview, 450);
    }
  });

  const insertText = (text) => {
    // execCommand รักษา undo stack ของ browser ได้ · ถ้าไม่รองรับใช้ setRangeText แทน
    if (!document.execCommand || !document.execCommand("insertText", false, text)) {
      editor.setRangeText(text, editor.selectionStart, editor.selectionEnd, "end");
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  let tabEscape = false;
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { tabEscape = true; return; }
    const plain = !e.ctrlKey && !e.altKey && !e.metaKey;
    if (e.key === "Tab" && plain && !e.shiftKey && !tabEscape) {
      e.preventDefault();
      insertText("  ");
    } else if (e.key === "Enter" && plain && !e.shiftKey && !e.isComposing) {
      const pos = editor.selectionStart;
      const lineStart = editor.value.lastIndexOf("\n", pos - 1) + 1;
      const indent = /^[ \t]*/.exec(editor.value.slice(lineStart, pos))[0];
      if (indent) {
        e.preventDefault();
        insertText(`\n${indent}`);
      }
    }
    if (e.key !== "Tab") tabEscape = false;
  });
  editor.addEventListener("blur", () => { tabEscape = false; });

  liveToggle.addEventListener("change", () => {
    state.live = liveToggle.checked;
    save();
    if (liveToggle.checked) renderPreview();
  });

  runBtn.addEventListener("click", renderPreview);
  checkBtn.addEventListener("click", check);
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); check(); }
  });
  solutionBtn.addEventListener("click", () => setSolution(solutionBox.hidden));
  resetBtn.addEventListener("click", () => {
    editor.value = current.starter || "";
    entry(current.id).code = editor.value;
    save();
    renderPreview();
    editor.focus();
  });
  prevBtn.addEventListener("click", () => {
    const i = tasks.indexOf(current);
    if (i > 0) select(tasks[i - 1].id, { scroll: true, focus: true });
  });
  nextBtn.addEventListener("click", () => {
    const i = tasks.indexOf(current);
    if (i < tasks.length - 1) select(tasks[i + 1].id, { scroll: true, focus: true });
  });

  let confirmTimer = 0;
  resetAll.addEventListener("click", () => {
    if (resetAll.dataset.confirm !== "1") {
      resetAll.dataset.confirm = "1";
      resetAll.textContent = "กดอีกครั้งเพื่อยืนยันการล้าง";
      clearTimeout(confirmTimer);
      confirmTimer = setTimeout(() => { resetAll.dataset.confirm = ""; resetAll.textContent = "ล้างความคืบหน้าทั้งหมด"; }, 4000);
      return;
    }
    clearTimeout(confirmTimer);
    resetAll.dataset.confirm = "";
    resetAll.textContent = "ล้างความคืบหน้าทั้งหมด";
    state = { current: tasks[0].id, tasks: {}, live: liveToggle.checked };
    save();
    updateStatusUI();
    select(tasks[0].id);
  });

  updateStatusUI();
  select(current.id);

  // เปิดให้ทดสอบ/debug ได้จาก console
  window.TotobCodeExercise = { validate: (id, code) => validate(byId.get(id), code), tasks, storageKey: STORE_KEY };
})();
