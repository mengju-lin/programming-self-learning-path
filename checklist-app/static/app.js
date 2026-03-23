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
  if (!Array.isArray(data.sps)) {
    return {
      learning_path_title: data.title || "Learning Path Checklist",
      language: data.language || "zh-TW",
      quiz_rule: data.quiz_rule || {
        per_chapter_questions: 5,
        format: "3 mcq + 2 short_answer",
        duration_minutes: 10
      },
      sps: []
    };
  }

  return {
    learning_path_title: data.learning_path_title || "Learning Path Checklist",
    language: data.language || "zh-TW",
    quiz_rule: data.quiz_rule || {
      per_chapter_questions: 5,
      format: "3 mcq + 2 short_answer",
      duration_minutes: 10
    },
    sps: data.sps.map((sp) => ({
      sp_id: sp.sp_id,
      title: sp.title || sp.sp_id,
      estimated_total_hours: sp.estimated_total_hours || 0,
      sp_doc_url: sp.sp_doc_url || "",
      sp_doc_label: sp.sp_doc_label || "查看專案詳細文件",
      chapters: (sp.chapters || []).map((ch) => ({
        id: ch.id,
        title: ch.title || ch.id,
        estimated_hours: ch.estimated_hours || 0,
        chapter_summary: ch.chapter_summary || "",
        detail_doc_url: ch.detail_doc_url || sp.sp_doc_url || "",
        detail_doc_label: ch.detail_doc_label || "查看本章詳細說明",
        detail_doc_hint: ch.detail_doc_hint || "",
        input_contract: ch.input_contract || [],
        output_contract: ch.output_contract || [],
        constraints: ch.constraints || [],
        learning_method: ch.learning_method || [],
        steps: ch.steps || [],
        example_code: ch.example_code || "",
        tasks: ch.tasks || [],
        quiz: ch.quiz || [],
        io_logic_note: ch.io_logic_note || ""
      }))
    }))
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
  return data.sps.find((sp) => sp.sp_id === state.selectedSpId) || data.sps[0] || null;
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
  const keys = sp.chapters.flatMap((ch) => (ch.tasks || []).map((t) => taskKey(sp.sp_id, t.id)));
  const done = keys.filter((k) => saved[k]).length;
  const total = keys.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

function updateOverallProgress() {
  const keys = data.sps.flatMap((sp) =>
    sp.chapters.flatMap((ch) => (ch.tasks || []).map((t) => taskKey(sp.sp_id, t.id)))
  );
  const done = keys.filter((k) => saved[k]).length;
  const total = keys.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  overallBar.style.width = `${pct}%`;
  overallLabel.textContent = `${pct}%`;
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
        <span class="text-sm font-semibold text-slate-800">${escapeHtml(sp.sp_id)}</span>
        <span class="text-xs text-slate-500">${progress.pct}%</span>
      </div>
      <p class="mt-1 text-xs text-slate-600">${escapeHtml(sp.title)}</p>
      <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full rounded-full bg-sky-500" style="width:${progress.pct}%"></div>
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
        <span class="text-sm font-medium text-slate-800">${escapeHtml(chapter.title)}</span>
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

function renderList(items) {
  if (!items || !items.length) return '<li class="text-sm text-slate-400">尚未提供</li>';
  return items.map((item) => `<li class="text-sm text-slate-700">• ${escapeHtml(item)}</li>`).join("");
}

function renderChapterDetail(sp, chapter) {
  if (!chapter) {
    chapterDetailEl.innerHTML = '<p class="text-sm text-slate-500">請先選擇章節。</p>';
    return;
  }

  const progress = chapterProgress(sp, chapter);
  const tasksHtml = (chapter.tasks || [])
    .map((task) => {
      const key = taskKey(sp.sp_id, task.id);
      const checked = saved[key] ? "checked" : "";
      return `
        <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
          <input type="checkbox" data-task-id="${task.id}" class="task-checkbox mt-1 h-4 w-4 rounded border-slate-400 text-sky-600 focus:ring-sky-500" ${checked} />
          <span>
            <span class="block text-sm font-medium text-slate-800">${escapeHtml(task.text)}</span>
            <span class="block text-xs text-slate-500">完成標準：${escapeHtml(task.done_criteria || "未提供")}</span>
          </span>
        </label>
      `;
    })
    .join("");

  const quizHtml = (chapter.quiz || [])
    .slice(0, 5)
    .map((q, idx) => `<li class="text-xs text-slate-600">Q${idx + 1}（${escapeHtml(q.type || "quiz")}）：${escapeHtml(q.question)}</li>`)
    .join("");

  chapterDetailEl.innerHTML = `
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${escapeHtml(sp.sp_id)}</p>
        <h2 class="text-xl font-bold text-slate-900">${escapeHtml(chapter.title)}</h2>
        <p class="mt-1 text-xs text-slate-500">預估 ${escapeHtml(chapter.estimated_hours)} 小時</p>
      </div>
    </div>

    <section class="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-sky-700">章節導讀</p>
      <p class="mt-2 text-sm text-slate-700">${escapeHtml(chapter.chapter_summary || "尚未提供章節摘要")}</p>
      ${chapter.detail_doc_url ? `<a class="mt-3 inline-flex items-center rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700" href="${escapeHtml(chapter.detail_doc_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(chapter.detail_doc_label || "查看本章詳細說明")}</a>` : ""}
      ${chapter.detail_doc_hint ? `<p class="mt-2 text-xs text-slate-500">${escapeHtml(chapter.detail_doc_hint)}</p>` : ""}
    </section>

    <div class="mt-4">
      <div class="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span>章節進度</span>
        <span>${progress.pct}% (${progress.done}/${progress.total})</span>
      </div>
      <div class="h-2 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full rounded-full bg-sky-500 transition-all duration-300" style="width:${progress.pct}%"></div>
      </div>
    </div>

    <div class="mt-5 grid gap-4 md:grid-cols-3">
      <section class="rounded-xl bg-slate-50 p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Input 合約</p>
        <ul class="mt-2 space-y-1">${renderList(chapter.input_contract)}</ul>
      </section>
      <section class="rounded-xl bg-slate-50 p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Output 合約</p>
        <ul class="mt-2 space-y-1">${renderList(chapter.output_contract)}</ul>
      </section>
      <section class="rounded-xl bg-slate-50 p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">約束與錯誤處理</p>
        <ul class="mt-2 space-y-1">${renderList(chapter.constraints)}</ul>
      </section>
    </div>

    <section class="mt-4 rounded-xl bg-slate-50 p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">自學提示</p>
      <ul class="mt-2 space-y-1">${renderList(chapter.learning_method)}</ul>
    </section>

    <section class="mt-4 rounded-xl bg-slate-50 p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">步驟</p>
      <ol class="mt-2 space-y-1">${(chapter.steps || []).map((s, i) => `<li class="text-sm text-slate-700">${i + 1}. ${escapeHtml(s)}</li>`).join("") || '<li class="text-sm text-slate-400">尚未提供</li>'}</ol>
    </section>

    <section class="mt-4 rounded-xl bg-slate-50 p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">I/O 邏輯說明</p>
      <p class="mt-2 text-sm text-slate-700">${escapeHtml(chapter.io_logic_note || "尚未提供")}</p>
    </section>

    <section class="mt-4 rounded-xl bg-slate-900 p-3 text-slate-100">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-300">範例語法</p>
      <pre class="mt-2 overflow-x-auto text-xs leading-relaxed"><code>${escapeHtml(chapter.example_code || "# 尚未提供")}</code></pre>
    </section>

    <section class="mt-4 space-y-2">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Checklist</p>
      ${tasksHtml || '<p class="text-sm text-slate-400">尚未提供</p>'}
    </section>

    <details class="mt-4 rounded-lg bg-slate-50 p-3">
      <summary class="cursor-pointer text-sm font-medium text-slate-700">章節測驗預覽（5 題）</summary>
      <ul class="mt-2 space-y-1">${quizHtml || '<li class="text-xs text-slate-400">尚未提供</li>'}</ul>
    </details>
  `;

  chapterDetailEl.querySelectorAll(".task-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      saved[taskKey(sp.sp_id, checkbox.dataset.taskId)] = checkbox.checked;
      persist();
      render();
      updateOverallProgress();
    });
  });
}

function render() {
  const sp = getSelectedSp();
  const chapter = getSelectedChapter(sp);
  renderSpList();
  if (sp) renderChapterList(sp);
  renderChapterDetail(sp, chapter);
  updateOverallProgress();
}

render();
