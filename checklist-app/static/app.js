const data = JSON.parse(document.getElementById("checklist-data").textContent);
const root = document.getElementById("chapters");
const overallBar = document.getElementById("overall-progress-bar");
const overallLabel = document.getElementById("overall-progress-label");

const storageKey = `learning-path-progress-${data.sp_id}`;
const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");

function persist(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function chapterProgress(chapter) {
  const done = chapter.tasks.filter((task) => saved[task.id]).length;
  const total = chapter.tasks.length;
  return { done, total, pct: Math.round((done / total) * 100) };
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

function updateOverallProgress() {
  const allTasks = data.chapters.flatMap((c) => c.tasks);
  const doneCount = allTasks.filter((t) => saved[t.id]).length;
  const pct = allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0;
  overallBar.style.width = `${pct}%`;
  overallLabel.textContent = `${pct}%`;
}

function render() {
  root.innerHTML = "";

  data.chapters.forEach((chapter) => {
    const progress = chapterProgress(chapter);
    const completed = progress.done === progress.total;

    const card = document.createElement("section");
    card.className = [
      "chapter-card rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300",
      completed ? "chapter-complete" : "border-slate-200"
    ].join(" ");

    const methods = chapter.learning_method.map((m) => `<li class=\"text-sm text-slate-600\">• ${m}</li>`).join("");
    const tasks = chapter.tasks
      .map(
        (task) => `
        <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
          <input type="checkbox" data-task-id="${task.id}" class="mt-1 h-4 w-4 rounded border-slate-400 text-sky-600 focus:ring-sky-500" ${saved[task.id] ? "checked" : ""} />
          <span>
            <span class="block text-sm font-medium text-slate-800">${task.text}</span>
            <span class="block text-xs text-slate-500">完成標準：${task.done_criteria}</span>
          </span>
        </label>
      `
      )
      .join("");

    const quizPreview = chapter.quiz
      .slice(0, 2)
      .map((q, i) => `<li class=\"text-xs text-slate-500\">Q${i + 1}：${q.question}</li>`)
      .join("");

    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold text-slate-900">${chapter.title}</h2>
          <p class="mt-1 text-xs text-slate-500">預估 ${chapter.estimated_hours} 小時</p>
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

      <div class="mt-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">學習方法</p>
        <ul class="mt-2 space-y-1">${methods}</ul>
      </div>

      <div class="mt-4 space-y-2">${tasks}</div>

      <details class="mt-4 rounded-lg bg-slate-50 p-3">
        <summary class="cursor-pointer text-sm font-medium text-slate-700">章節測驗預覽（5 題）</summary>
        <ul class="mt-2 space-y-1">${quizPreview}</ul>
      </details>
    `;

    root.appendChild(card);

    card.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const beforeCompleted = chapterProgress(chapter).done === chapter.tasks.length;
        saved[checkbox.dataset.taskId] = checkbox.checked;
        persist(saved);
        render();
        updateOverallProgress();

        const afterCard = [...root.children].find((el) =>
          el.querySelector("h2")?.textContent === chapter.title
        );
        const afterCompleted = chapterProgress(chapter).done === chapter.tasks.length;
        if (!beforeCompleted && afterCompleted && afterCard) {
          celebrate(afterCard);
        }
      });
    });
  });
}

render();
updateOverallProgress();
