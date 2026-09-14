/* ==========================================================================
   network.html — tabs, accordion, quiz
   ไม่มี dependency · หน้าอ่านได้ครบแม้ปิด JS (แสดงทุกแท็บ/เปิดทุก accordion)
   ========================================================================== */
(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollBehavior = () => (reducedMotion.matches ? "auto" : "smooth");

  /* ------------------------------------------------------------------ Tabs */
  const tablist = document.querySelector('[role="tablist"]');
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  const indicator = tablist.querySelector(".tab-indicator");
  const hero = document.querySelector(".course-hero");

  function moveIndicator(tab) {
    indicator.style.setProperty("--x", `${tab.offsetLeft}px`);
    indicator.style.setProperty("--w", `${tab.offsetWidth}px`);
  }

  function selectTab(tab, { focus = false, updateHash = true, scroll = true } = {}) {
    const index = tabs.indexOf(tab);
    const alreadyActive = tab.getAttribute("aria-selected") === "true" && !panels[index].hidden;

    tabs.forEach((t, i) => {
      const active = i === index;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
    });
    moveIndicator(tab);
    if (focus) tab.focus();

    if (!alreadyActive) {
      const panel = panels[index];
      panel.classList.remove("is-entering");
      void panel.offsetWidth; // restart animation
      panel.classList.add("is-entering");
    }

    if (updateHash) history.replaceState(null, "", `#${panels[index].id}`);

    // ถ้าเลื่อนลงมาจนแถบแท็บติดขอบบนแล้ว ให้เนื้อหาใหม่เริ่มที่ต้นแท็บ
    const stickTop = hero.offsetTop + hero.offsetHeight;
    if (scroll && window.scrollY > stickTop) {
      window.scrollTo({ top: stickTop, behavior: scrollBehavior() });
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => selectTab(tab));
  });

  tablist.addEventListener("keydown", (e) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    let next = null;
    if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    selectTab(tabs[next], { focus: true });
  });

  window.addEventListener("resize", () => {
    const active = tabs.find((t) => t.getAttribute("aria-selected") === "true");
    if (active) moveIndicator(active);
  });

  /* ------------------------------------------------------------- Accordion */
  const accItems = Array.from(document.querySelectorAll(".acc-item"));

  function setAcc(item, open) {
    item.classList.toggle("is-open", open);
    item.querySelector(".acc-trigger").setAttribute("aria-expanded", String(open));
  }

  accItems.forEach((item) => {
    item.querySelector(".acc-trigger").addEventListener("click", () => {
      setAcc(item, !item.classList.contains("is-open"));
    });
  });

  document.querySelectorAll("[data-acc-all]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.dataset.accAll === "open";
      accItems.forEach((item) => setAcc(item, open));
    });
  });

  /* ------------------------------------------------------------ Deep links */
  function applyHash({ scroll }) {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);
    const panelIndex = target ? panels.findIndex((p) => p === target || p.contains(target)) : -1;

    if (panelIndex === -1) {
      selectTab(tabs[0], { updateHash: false, scroll: false });
      return;
    }
    selectTab(tabs[panelIndex], { updateHash: false, scroll: false });

    // ลิงก์ไปยังหัวข้อย่อยใน accordion ที่ปิดอยู่ → เปิดก่อนแล้วค่อยเลื่อนไป
    if (target !== panels[panelIndex]) {
      const item = target.closest(".acc-item");
      if (item) setAcc(item, true);
      if (scroll) requestAnimationFrame(() => target.scrollIntoView({ behavior: scrollBehavior() }));
    }
  }

  window.addEventListener("hashchange", () => applyHash({ scroll: true }));
  applyHash({ scroll: true });
  panels.forEach((p) => p.classList.remove("is-entering")); // ไม่ต้อง animate ตอนโหลดหน้า
  requestAnimationFrame(() => requestAnimationFrame(() => tablist.classList.add("is-ready")));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      const active = tabs.find((t) => t.getAttribute("aria-selected") === "true");
      if (active) moveIndicator(active);
    });
  }

  /* ------------------------------------------------------------------ Quiz */
  const form = document.getElementById("quiz-form");
  const questions = Array.from(form.querySelectorAll(".q"));
  const total = questions.length;
  const answeredEl = document.getElementById("answered");
  const progressFill = document.getElementById("progress-fill");
  const hint = document.getElementById("quiz-hint");
  const submitBtn = document.getElementById("quiz-submit");
  const result = document.getElementById("quiz-result");
  const scoreNum = document.getElementById("score-num");
  const scorePct = document.getElementById("score-pct");
  const scoreMsg = document.getElementById("score-msg");
  const toggleWrong = document.getElementById("toggle-wrong");

  const ICON_RIGHT = '<svg viewBox="0 0 20 20" aria-hidden="true"><path class="draw" pathLength="1" d="M4.5 10.5l3.5 3.5 7.5-8" /></svg>';
  const ICON_WRONG = '<svg viewBox="0 0 20 20" aria-hidden="true"><path class="draw" pathLength="1" d="M5.5 5.5l9 9M14.5 5.5l-9 9" /></svg>';

  let checked = false;
  let warnedMissing = false;

  const selected = (q) => q.querySelector("input:checked");
  const keyOf = (value) => value.toUpperCase();

  function updateProgress() {
    const count = questions.filter(selected).length;
    answeredEl.textContent = count;
    progressFill.style.setProperty("--p", count / total);
    return count;
  }

  form.addEventListener("change", (e) => {
    if (checked) return;
    const q = e.target.closest(".q");
    if (q) q.classList.remove("is-missing");
    const count = updateProgress();
    if (warnedMissing) {
      const left = total - count;
      if (left === 0) {
        warnedMissing = false;
        hint.textContent = "";
        submitBtn.textContent = "ตรวจคำตอบ";
      } else {
        hint.textContent = `ยังเหลือ ${left} ข้อที่ยังไม่ได้ตอบ`;
      }
    }
  });

  function scoreMessage(score) {
    if (score === total) return "เต็ม! พร้อมสอบแล้ว";
    if (score >= 17) return "ดีมาก เหลือทบทวนอีกนิดเดียว";
    if (score >= 12) return "ผ่าน แต่ลองกลับไปอ่านหัวข้อของข้อที่ผิดในแท็บเนื้อหา";
    return "ลองอ่านเนื้อหาและ cheat sheet อีกรอบ แล้วกลับมาทำใหม่";
  }

  function check() {
    let score = 0;
    questions.forEach((q) => {
      const answer = q.dataset.answer;
      const pick = selected(q);
      const verdict = q.querySelector(".q-verdict");

      q.querySelectorAll(".opt").forEach((opt) => {
        const input = opt.querySelector("input");
        input.disabled = true;
        if (input.value === answer) opt.classList.add("is-correct");
        else if (input.checked) opt.classList.add("is-wrong");
      });

      q.classList.remove("is-missing");
      if (pick && pick.value === answer) {
        score += 1;
        q.classList.add("is-right");
        verdict.innerHTML = `${ICON_RIGHT}<span>ถูกต้อง</span>`;
      } else if (pick) {
        q.classList.add("is-wrong");
        verdict.innerHTML = `${ICON_WRONG}<span>ยังไม่ถูก — คำตอบที่ถูกคือ ${keyOf(answer)}</span>`;
      } else {
        q.classList.add("is-skipped");
        verdict.innerHTML = `${ICON_WRONG}<span>ไม่ได้ตอบ — คำตอบที่ถูกคือ ${keyOf(answer)}</span>`;
      }
      q.classList.add("is-revealed");
    });

    checked = true;
    form.classList.add("is-checked");
    hint.textContent = "";
    submitBtn.textContent = "ตรวจแล้ว";
    submitBtn.disabled = true;
    showResult(score);
  }

  function showResult(score) {
    const pct = Math.round((score / total) * 100);
    result.hidden = false;
    result.classList.remove("is-entering");
    void result.offsetWidth;
    result.classList.add("is-entering");
    scoreMsg.textContent = scoreMessage(score);
    toggleWrong.hidden = score === total;
    renderScore(score, pct);
    result.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    result.focus({ preventScroll: true });
  }

  // นับคะแนนขึ้นพร้อมวงแหวน = ให้เวลาสายตาจับ "ผลลัพธ์" · ลดการเคลื่อนไหว → แสดงทันที
  function renderScore(score, pct) {
    const paint = (s, p) => {
      scoreNum.textContent = s;
      scorePct.textContent = p;
      result.style.setProperty("--pct", p);
    };
    if (reducedMotion.matches) {
      paint(score, pct);
      return;
    }
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      paint(Math.round(score * eased), Math.round(pct * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    paint(0, 0);
    requestAnimationFrame(step);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (checked) return;

    const missing = questions.filter((q) => !selected(q));
    if (missing.length && !warnedMissing) {
      warnedMissing = true;
      missing.forEach((q) => {
        q.classList.remove("is-missing");
        void q.offsetWidth;
        q.classList.add("is-missing");
      });
      const nums = missing.map((q) => Number(q.querySelector(".q-num").textContent)).join(", ");
      hint.textContent = `ยังไม่ได้ตอบ ${missing.length} ข้อ (ข้อ ${nums}) — กด "ตรวจเลย" อีกครั้งถ้าจะส่งทั้งอย่างนี้`;
      submitBtn.textContent = "ตรวจเลย";
      missing[0].scrollIntoView({ behavior: scrollBehavior(), block: "center" });
      return;
    }
    check();
  });

  form.addEventListener("reset", () => {
    // รอให้ browser ล้างค่า radio ก่อน
    requestAnimationFrame(() => {
      checked = false;
      warnedMissing = false;
      form.classList.remove("is-checked", "show-wrong-only");
      questions.forEach((q) => {
        q.classList.remove("is-right", "is-wrong", "is-skipped", "is-revealed", "is-missing");
        q.querySelector(".q-verdict").textContent = "";
        q.querySelectorAll(".opt").forEach((opt) => {
          opt.classList.remove("is-correct", "is-wrong");
          opt.querySelector("input").disabled = false;
        });
      });
      result.hidden = true;
      toggleWrong.setAttribute("aria-pressed", "false");
      toggleWrong.textContent = "ดูเฉพาะข้อที่ผิด";
      hint.textContent = "";
      submitBtn.textContent = "ตรวจคำตอบ";
      submitBtn.disabled = false;
      updateProgress();
      const panel = document.getElementById("quiz");
      const top = panel.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: scrollBehavior() });
    });
  });

  toggleWrong.addEventListener("click", () => {
    const on = toggleWrong.getAttribute("aria-pressed") !== "true";
    toggleWrong.setAttribute("aria-pressed", String(on));
    toggleWrong.textContent = on ? "แสดงทุกข้อ" : "ดูเฉพาะข้อที่ผิด";
    form.classList.toggle("show-wrong-only", on);
  });

  updateProgress();
})();
