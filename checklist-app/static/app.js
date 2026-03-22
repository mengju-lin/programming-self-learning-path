const rawData = JSON.parse(document.getElementById("checklist-data").textContent);
const spListEl = document.getElementById("sp-list");
const chapterListEl = document.getElementById("chapter-list");
const chapterDetailEl = document.getElementById("chapter-detail");
const overallBar = document.getElementById("overall-progress-bar");
const overallLabel = document.getElementById("overall-progress-label");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeData(data) {
  if (Array.isArray(data.sps)) return data;

  return {
    learning_path_title: data.title || "Learning Path Checklist",
    language: data.language || "zh-TW",
    quiz_rule: data.quiz_rule || {
      per_chapter_questions: 5,
      format: "3 mcq + 2 short_answer",
      duration_minutes: 10
    },
    sps: [
      {
        sp_id: data.sp_id || "SP1",
        title: data.title || "Checklist",
        estimated_total_hours: data.estimated_total_hours || 0,
        chapters: (data.chapters || []).map((ch) => ({
          ...ch,
          learning_method: ch.learning_method || [],
          syntax_focus: ch.syntax_focus || [],
          steps: ch.steps || [],
          example_code: ch.example_code || "",
          tasks: ch.tasks || [],
          quiz: ch.quiz || [],
          io_logic_note: ch.io_logic_note || "",
          practice_examples: ch.practice_examples || [],
          examples: ch.examples || []
        }))
      }
    ]
  };
}

const data = normalizeData(rawData);
const storageKey = `learning-path-progress-${data.learning_path_title}`;
const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");

const state = {
  selectedSpId: data.sps[0]?.sp_id || null,
  selectedChapterId: data.sps[0]?.chapters?.[0]?.id || null
};

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(saved));
}

function taskKey(spId, taskId) {
  return `${spId}:${taskId}`;
}

function getSelectedSp() {
  return data.sps.find((sp) => sp.sp_id === state.selectedSpId) || data.sps[0];
}

function getSelectedChapter(sp) {
  if (!sp) return null;
  return sp.chapters.find((ch) => ch.id === state.selectedChapterId) || sp.chapters[0] || null;
}

function chapterProgress(sp, chapter) {
  const tasks = chapter.tasks || [];
  const done = tasks.filter((task) => saved[taskKey(sp.sp_id, task.id)]).length;
  const total = tasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

function spProgress(sp) {
  const allTasks = sp.chapters.flatMap((ch) => (ch.tasks || []).map((t) => taskKey(sp.sp_id, t.id)));
  const done = allTasks.filter((key) => saved[key]).length;
  const total = allTasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

function updateOverallProgress() {
  const allTaskKeys = data.sps.flatMap((sp) =>
    sp.chapters.flatMap((ch) => (ch.tasks || []).map((t) => taskKey(sp.sp_id, t.id)))
  );
  const doneCount = allTaskKeys.filter((key) => saved[key]).length;
  const total = allTaskKeys.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  overallBar.style.width = `${pct}%`;
  overallLabel.textContent = `${pct}%`;
}

function makeSpark(card) {
  const spark = document.createElement("span");
  spark.className = "spark";
  spark.style.left = `${30 + Math.random() * 40}%`;
  spark.style.top = `${38 + Math.random() * 24}%`;
  spark.style.setProperty("--dx", `${-70 + Math.random() * 140}px`);
  spark.style.setProperty("--dy", `${-90 + Math.random() * 40}px`);
  spark.style.background = ["#0ea5e9", "#38bdf8", "#10b981", "#f59e0b"][Math.floor(Math.random() * 4)];
  card.appendChild(spark);
  setTimeout(() => spark.remove(), 700);
}

let moneyLayerEl = null;

function moneyLayer() {
  if (!moneyLayerEl) {
    moneyLayerEl = document.createElement("div");
    moneyLayerEl.className = "money-layer";
    document.body.appendChild(moneyLayerEl);
  }
  return moneyLayerEl;
}

function makeMoney() {
  const layer = moneyLayer();
  const money = document.createElement("span");
  const symbols = ["$", "$$", "$$$", "$$$$", "NT$", "USD$"];
  money.className = "money-pop";
  money.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  money.style.left = `${Math.random() * 100}vw`;
  money.style.top = `${62 + Math.random() * 34}vh`;
  money.style.setProperty("--mx", `${-280 + Math.random() * 560}px`);
  money.style.setProperty("--my", `${-220 - Math.random() * 680}px`);
  money.style.setProperty("--ms", `${1.3 + Math.random() * 2.2}`);
  money.style.setProperty("--rot", `${-26 + Math.random() * 52}deg`);
  money.style.fontSize = `${1.6 + Math.random() * 2.8}rem`;
  layer.appendChild(money);
  setTimeout(() => money.remove(), 1450);
}

function rainMoney(_card, count = 180) {
  for (let i = 0; i < count; i += 1) {
    setTimeout(() => makeMoney(), i * 7);
  }
}

function celebrate(card) {
  for (let i = 0; i < 16; i += 1) {
    setTimeout(() => makeSpark(card), i * 20);
  }
  rainMoney(card, 260);
}

function renderSpList() {
  spListEl.innerHTML = "";

  data.sps.forEach((sp, idx) => {
    const progress = spProgress(sp);
    const active = sp.sp_id === state.selectedSpId;

    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "w-full rounded-xl border p-3 text-left transition",
      active ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:bg-slate-50"
    ].join(" ");

    button.innerHTML = `
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm font-semibold text-slate-800">${escapeHtml(sp.sp_id)}</span>
        <span class="text-xs text-slate-500">${progress.pct}%</span>
      </div>
      <p class="mt-1 text-xs text-slate-600">${escapeHtml(sp.title)}</p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full rounded-full bg-sky-500" style="width: ${progress.pct}%"></div>
      </div>
    `;
    button.style.animation = `slide-up 380ms ease-out ${idx * 45}ms both`;

    button.addEventListener("click", () => {
      state.selectedSpId = sp.sp_id;
      state.selectedChapterId = sp.chapters[0]?.id || null;
      render();
    });

    spListEl.appendChild(button);
  });
}

function renderChapterList(sp) {
  chapterListEl.innerHTML = "";

  sp.chapters.forEach((chapter, idx) => {
    const progress = chapterProgress(sp, chapter);
    const active = chapter.id === state.selectedChapterId;

    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "w-full rounded-xl border p-3 text-left transition",
      active ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:bg-slate-50"
    ].join(" ");

    button.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <span class="text-sm font-medium text-slate-800">${escapeHtml(chapter.title)}</span>
        <span class="text-xs text-slate-500">${progress.pct}%</span>
      </div>
      <p class="mt-1 text-xs text-slate-500">${progress.done}/${progress.total} 任務</p>
    `;
    button.style.animation = `slide-up 420ms ease-out ${idx * 55}ms both`;

    button.addEventListener("click", () => {
      state.selectedChapterId = chapter.id;
      render();
    });

    chapterListEl.appendChild(button);
  });
}

function renderChapterDetail(sp, chapter) {
  if (!chapter) {
    chapterDetailEl.innerHTML = '<p class="text-sm text-slate-500">請先選擇章節。</p>';
    return;
  }

  const progress = chapterProgress(sp, chapter);
  const completed = progress.total > 0 && progress.done === progress.total;

  chapterDetailEl.classList.toggle("chapter-complete", completed);
  chapterDetailEl.classList.add("chapter-enter");
  setTimeout(() => chapterDetailEl.classList.remove("chapter-enter"), 360);

  const syntaxHtml = (chapter.syntax_focus || [])
    .map((item) => `<li class="text-sm text-slate-700">• ${escapeHtml(item)}</li>`)
    .join("");

  const stepsHtml = (chapter.steps || [])
    .map((item, idx) => `<li class="text-sm text-slate-700">${idx + 1}. ${escapeHtml(item)}</li>`)
    .join("");

  const methodsHtml = (chapter.learning_method || [])
    .map((m) => `<li class="text-sm text-slate-600">• ${escapeHtml(m)}</li>`)
    .join("");

  const practiceExamplesHtml = (chapter.practice_examples || [])
    .map((example) => `<li class="text-sm text-slate-700">• ${escapeHtml(example)}</li>`)
    .join("");

  const detailedExamplesHtml = (chapter.examples || [])
    .map(
      (example) => `
      <article class="rounded-lg border border-slate-200 bg-white p-3">
        <p class="text-sm font-semibold text-slate-800">${escapeHtml(example.title || "Example")}</p>
        <p class="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Input</p>
        <p class="mt-1 text-sm text-slate-700">${escapeHtml(example.input_format || "-")}</p>
        <p class="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Logic</p>
        <p class="mt-1 text-sm text-slate-700">${escapeHtml(example.logic || "-")}</p>
        <p class="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Output</p>
        <p class="mt-1 text-sm text-slate-700">${escapeHtml(example.example_output || "-")}</p>
      </article>
    `
    )
    .join("");

  const tasksHtml = (chapter.tasks || [])
    .map((task) => {
      const key = taskKey(sp.sp_id, task.id);
      const checked = saved[key] ? "checked" : "";
      return `
        <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
          <input type="checkbox" data-task-id="${task.id}" class="task-checkbox mt-1 h-4 w-4 rounded border-slate-400 text-sky-600 focus:ring-sky-500" ${checked} />
          <span>
            <span class="block text-sm font-medium text-slate-800">${escapeHtml(task.text)}</span>
            <span class="block text-xs text-slate-500">完成標準：${escapeHtml(task.done_criteria)}</span>
          </span>
        </label>
      `;
    })
    .join("");

  const quizHtml = (chapter.quiz || [])
    .slice(0, 3)
    .map((q, idx) => `<li class="text-xs text-slate-500">Q${idx + 1}：${escapeHtml(q.question)}</li>`)
    .join("");

  chapterDetailEl.innerHTML = `
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${escapeHtml(sp.sp_id)}</p>
        <h2 class="text-xl font-bold text-slate-900">${escapeHtml(chapter.title)}</h2>
        <p class="mt-1 text-xs text-slate-500">預估 ${chapter.estimated_hours || "-"} 小時</p>
      </div>
      ${completed ? '<span class="complete-badge rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">已完成</span>' : ""}
    </div>

    <div class="mt-4">
      <div class="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span>章節進度</span>
        <span>${progress.pct}% (${progress.done}/${progress.total})</span>
      </div>
      <div class="h-2 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full rounded-full bg-sky-500 transition-all duration-500" style="width: ${progress.pct}%"></div>
      </div>
    </div>

    <div class="mt-5 grid gap-4 md:grid-cols-2">
      <section class="rounded-xl bg-slate-50 p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">語法焦點</p>
        <ul class="mt-2 space-y-1">${syntaxHtml || '<li class="text-sm text-slate-400">尚未提供</li>'}</ul>
      </section>

      <section class="rounded-xl bg-slate-50 p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">學習方法</p>
        <ul class="mt-2 space-y-1">${methodsHtml || '<li class="text-sm text-slate-400">尚未提供</li>'}</ul>
      </section>
    </div>

    <section class="mt-4 rounded-xl bg-slate-50 p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">步驟</p>
      <ol class="mt-2 space-y-1">${stepsHtml || '<li class="text-sm text-slate-400">尚未提供</li>'}</ol>
    </section>

    <section class="mt-4 rounded-xl bg-slate-50 p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">I/O 與邏輯焦點</p>
      <p class="mt-2 text-sm text-slate-700">${escapeHtml(chapter.io_logic_note || "尚未提供")}</p>
    </section>

    <section class="mt-4 rounded-xl bg-slate-50 p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">練習例子摘要</p>
      <ul class="mt-2 space-y-1">${practiceExamplesHtml || '<li class="text-sm text-slate-400">尚未提供</li>'}</ul>
    </section>

    <section class="mt-4 rounded-xl bg-slate-50 p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">詳細 Examples（Input / Logic / Output）</p>
      <div class="mt-2 grid gap-2">${detailedExamplesHtml || '<p class="text-sm text-slate-400">尚未提供</p>'}</div>
    </section>

    <section class="mt-4 rounded-xl bg-slate-900 p-3 text-slate-100">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-300">範例語法</p>
      <pre class="mt-2 overflow-x-auto text-xs leading-relaxed"><code>${escapeHtml(chapter.example_code || "# 尚未提供範例語法")}</code></pre>
    </section>

    <section class="mt-4 space-y-2">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Checklist</p>
      ${tasksHtml}
    </section>

    <details class="mt-4 rounded-lg bg-slate-50 p-3">
      <summary class="cursor-pointer text-sm font-medium text-slate-700">章節測驗預覽（5 題）</summary>
      <ul class="mt-2 space-y-1">${quizHtml || '<li class="text-xs text-slate-400">尚未提供</li>'}</ul>
    </details>
  `;

  chapterDetailEl.querySelectorAll(".task-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const chapterTasksLength = (chapter.tasks || []).length;
      const beforeCompleted = chapterProgress(sp, chapter).done === chapterTasksLength;
      const currentTaskId = checkbox.dataset.taskId;
      const wasCheckedNow = checkbox.checked;
      const key = taskKey(sp.sp_id, checkbox.dataset.taskId);
      saved[key] = checkbox.checked;
      persist();
      render();
      updateOverallProgress();

      if (wasCheckedNow) {
        rainMoney(chapterDetailEl, 180);
        const refreshedRow = chapterDetailEl
          .querySelector(`input[data-task-id="${currentTaskId}"]`)
          ?.closest("label");
        if (refreshedRow) {
          refreshedRow.classList.remove("task-hit");
          refreshedRow.offsetWidth;
          refreshedRow.classList.add("task-hit");
        }
      }

      const afterCompleted = chapterProgress(sp, chapter).done === chapterTasksLength;
      if (!beforeCompleted && afterCompleted) {
        celebrate(chapterDetailEl);
      }
    });
  });
}

function render() {
  const sp = getSelectedSp();
  const chapter = getSelectedChapter(sp);

  renderSpList();
  if (sp) {
    renderChapterList(sp);
  }
  renderChapterDetail(sp, chapter);
  updateOverallProgress();
}

render();
