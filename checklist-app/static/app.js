const rawData = JSON.parse(document.getElementById("checklist-data").textContent);
const spListEl = document.getElementById("sp-list");
const chapterListEl = document.getElementById("chapter-list");
const chapterDetailEl = document.getElementById("chapter-detail");
const overallBar = document.getElementById("overall-progress-bar");
const overallLabel = document.getElementById("overall-progress-label");

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
          syntax_focus: ch.syntax_focus || [],
          steps: ch.steps || [],
          example_code: ch.example_code || ""
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
  const done = chapter.tasks.filter((task) => saved[taskKey(sp.sp_id, task.id)]).length;
  const total = chapter.tasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

function spProgress(sp) {
  const allTasks = sp.chapters.flatMap((ch) => ch.tasks.map((t) => taskKey(sp.sp_id, t.id)));
  const done = allTasks.filter((key) => saved[key]).length;
  const total = allTasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

function updateOverallProgress() {
  const allTaskKeys = data.sps.flatMap((sp) =>
    sp.chapters.flatMap((ch) => ch.tasks.map((t) => taskKey(sp.sp_id, t.id)))
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

function celebrate(card) {
  for (let i = 0; i < 16; i += 1) {
    setTimeout(() => makeSpark(card), i * 20);
  }
}

function renderSpList() {
  spListEl.innerHTML = "";

  data.sps.forEach((sp) => {
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
        <span class="text-sm font-semibold text-slate-800">${sp.sp_id}</span>
        <span class="text-xs text-slate-500">${progress.pct}%</span>
      </div>
      <p class="mt-1 text-xs text-slate-600">${sp.title}</p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full rounded-full bg-sky-500" style="width: ${progress.pct}%"></div>
      </div>
    `;

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

  sp.chapters.forEach((chapter) => {
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
        <span class="text-sm font-medium text-slate-800">${chapter.title}</span>
        <span class="text-xs text-slate-500">${progress.pct}%</span>
      </div>
      <p class="mt-1 text-xs text-slate-500">${progress.done}/${progress.total} 任務</p>
    `;

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

  const syntaxHtml = (chapter.syntax_focus || [])
    .map((item) => `<li class="text-sm text-slate-700">• ${item}</li>`)
    .join("");

  const stepsHtml = (chapter.steps || [])
    .map((item, idx) => `<li class="text-sm text-slate-700">${idx + 1}. ${item}</li>`)
    .join("");

  const methodsHtml = (chapter.learning_method || [])
    .map((m) => `<li class="text-sm text-slate-600">• ${m}</li>`)
    .join("");

  const tasksHtml = chapter.tasks
    .map((task) => {
      const key = taskKey(sp.sp_id, task.id);
      const checked = saved[key] ? "checked" : "";
      return `
        <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
          <input type="checkbox" data-task-id="${task.id}" class="task-checkbox mt-1 h-4 w-4 rounded border-slate-400 text-sky-600 focus:ring-sky-500" ${checked} />
          <span>
            <span class="block text-sm font-medium text-slate-800">${task.text}</span>
            <span class="block text-xs text-slate-500">完成標準：${task.done_criteria}</span>
          </span>
        </label>
      `;
    })
    .join("");

  const quizHtml = (chapter.quiz || [])
    .slice(0, 3)
    .map((q, idx) => `<li class="text-xs text-slate-500">Q${idx + 1}：${q.question}</li>`)
    .join("");

  chapterDetailEl.innerHTML = `
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${sp.sp_id}</p>
        <h2 class="text-xl font-bold text-slate-900">${chapter.title}</h2>
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

    <section class="mt-4 rounded-xl bg-slate-900 p-3 text-slate-100">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-300">範例語法</p>
      <pre class="mt-2 overflow-x-auto text-xs leading-relaxed"><code>${chapter.example_code || "# 尚未提供範例語法"}</code></pre>
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
      const beforeCompleted = chapterProgress(sp, chapter).done === chapter.tasks.length;
      const key = taskKey(sp.sp_id, checkbox.dataset.taskId);
      saved[key] = checkbox.checked;
      persist();
      render();
      updateOverallProgress();

      const afterCompleted = chapterProgress(sp, chapter).done === chapter.tasks.length;
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
