# SP2 詳細學習路徑：AI 會議任務轉換器（AI Meeting-to-Execution Converter）

## 專案情境（Scenario）
你是 Junior AI-supported PM，需要把會議內容快速轉成可執行任務，並讓團隊能在 GitHub 上直接開工。

## 專案目標（Goals）
1. 將會議逐字稿轉為結構化輸出。
2. 產生任務拆解、里程碑與狀態追蹤。
3. 建立可直接貼用的 GitHub Issue 樣板。

## 預期產出（Deliverables）
- `meeting_structured.json`
- `tasks.json`、`milestones.json`
- `/api/tasks`、`/api/tasks/<id>/status`
- `issues/*.md`

## 建議節奏（12 小時）
- Chapter 1：2.5h
- Chapter 2：3h
- Chapter 3：3h
- Chapter 4：3.5h

## 章節 I/O 實作合約（Implementation Contract）
### CH1：會議逐字稿結構化
- Input Schema：
```json
{
  "meeting_notes": "string",
  "meeting_meta": {"date": "2026-03-23", "participants": ["Amy", "Ken"]}
}
```
- Output Schema：
```json
{
  "summary": ["..."],
  "action_items": [{"task": "...", "owner": "Amy", "due_date": "2026-03-25"}],
  "needs_review": []
}
```
- Constraints：`due_date` 無法解析時不可硬補，必須放入 `needs_review`。

### CH2：任務拆解與里程碑
- Input Schema：
```json
{
  "action_items": [{"task": "...", "owner": "Amy", "due_date": "2026-03-25"}]
}
```
- Output Schema：
```json
{
  "tasks": [{"id": "t1", "task": "...", "owner": "Amy", "status": "todo", "due_date": "2026-03-25"}],
  "milestones": [{"week": "W1", "task_ids": ["t1", "t2"]}],
  "overdue_items": []
}
```
- Constraints：`status` 初始值固定 `todo`，`owner` 不得為空。

### CH3：任務狀態 API
- Input Schema：
```json
{
  "request": {"task_id": "t1", "status": "doing"}
}
```
- Output Schema：
```json
{
  "task": {"id": "t1", "status": "doing"},
  "error": null
}
```
- Error Schema：
```json
{
  "error": {"code": "INVALID_STATUS", "message": "status must be todo/doing/done"}
}
```

### CH4：GitHub Issue 樣板匯出
- Input Schema：
```json
{
  "tasks": [{"id": "t1", "task": "更新 API 文件", "owner": "Amy", "due_date": "2026-03-25"}]
}
```
- Output Schema：
```json
{
  "generated_files": ["issues/t1.md"],
  "count": 1
}
```
- Constraints：每個輸出檔需有 `背景`、`目標`、`完成標準` 三段。

---

## Chapter 1：會議逐字稿結構化（Meeting Structuring）
### 章節目標
把「不好追蹤」的長文字，變成「可執行」的欄位資料。

### Input / Output
- Input：`meeting_notes: str`
- Output：`summary`、`action_items`、`owner`、`due_date`、`needs_review`

### 學習步驟
1. 定義 `meeting_input` 與 `meeting_output` schema。
2. 切句、移除冗語、標記決策句。
3. 抽取行動項目並補齊 `owner` / `due_date`。
4. 缺值資料設為 `needs_review=true`。

### 自學提示
- 一開始先用規則式（Rule-based）比直接上模型更穩。
- 日期抓不到時不要亂猜，標記 review 即可。

### AI 半手動提示
```text
請把下面會議紀錄整理成 JSON：
- summary: 3 點內
- action_items: task/owner/due_date
- 若缺欄位，請加 needs_review=true
```

### 完成檢核
- 輸出 JSON 可直接被 Chapter 2 使用。
- 欄位缺漏都會被標記，不會默默遺失。

### 10 分鐘測驗（5 題）
1. MCQ：結構化最重要的價值？
2. MCQ：`needs_review` 何時要設 true？
3. MCQ：summary 建議幾點內？
4. SA：規則式 vs AI 先後順序。
5. SA：如何處理缺失 due_date？

錯題複習連結：
- `#chapter-1會議逐字稿結構化meeting-structuring`

---

## Chapter 2：任務拆解與里程碑（Task Breakdown and Milestones）
### 章節目標
把行動項目轉成每週可執行任務。

### Input / Output
- Input：`action_items: list[dict]`
- Output：`tasks.json`、`milestones.json`、`overdue_items`

### 學習步驟
1. 寫 `build_tasks(action_items)`。
2. 每筆 action item 拆 2~3 個子任務。
3. 依 `due_date` 排序並分組到週里程碑。
4. 產生逾期判斷欄位。

### 自學提示
- 任務拆太細會難維護，目標是「可執行」不是「完美拆解」。
- 子任務命名請用動詞開頭。

### AI 半手動提示
```text
請將以下 action items 拆解為可執行子任務，
每個任務需有 owner/due_date/status，
並依週次輸出 milestones。
```

### 完成檢核
- 每筆任務都有 `task`、`owner`、`due_date`、`status`。
- 可列出本週與逾期任務。

### 10 分鐘測驗（5 題）
1. MCQ：任務拆解的最小單位應該是？
2. MCQ：里程碑分組常用哪個欄位？
3. MCQ：逾期判斷基礎是？
4. SA：為什麼要先排序再分組？
5. SA：任務命名原則。

錯題複習連結：
- `#chapter-2任務拆解與里程碑task-breakdown-and-milestones`

---

## Chapter 3：任務狀態 API（Task Status API）
### 章節目標
讓團隊可以更新任務狀態，不再靠口頭同步。

### Input / Output
- Input：`GET /api/tasks`、`POST /api/tasks/<id>/status`
- Output：任務清單、更新結果、錯誤回應

### 學習步驟
1. 建立查詢與更新端點。
2. 定義允許狀態：`todo`/`doing`/`done`。
3. 非法輸入回 400 並附錯誤訊息。
4. 補最小測試（curl 或 Postman）。

### 自學提示
- API 成功與失敗都要有一致 schema。
- 先確保可更新，再加權限或進階邏輯。

### AI 半手動提示
```text
請產生 Flask API：
1) GET /api/tasks
2) POST /api/tasks/<id>/status
要求：驗證 status 合法，錯誤回 400 JSON。
```

### 完成檢核
- 狀態更新可重現。
- 非法值有清楚錯誤回應。

### 10 分鐘測驗（5 題）
1. MCQ：狀態更新用哪個 HTTP method？
2. MCQ：非法狀態建議回什麼碼？
3. MCQ：統一 schema 的好處？
4. SA：如何設計錯誤訊息讓前端好處理？
5. SA：為什麼要限制 status 值集合？

錯題複習連結：
- `#chapter-3任務狀態-apitask-status-api`

---

## Chapter 4：GitHub Issue 樣板匯出（Issue Export）
### 章節目標
把任務直接變成可貼到 GitHub 的執行單。

### Input / Output
- Input：`tasks: list[dict]`
- Output：`issues/*.md`（含背景、目標、完成標準）

### 學習步驟
1. 定義 issue 模板欄位。
2. 任務逐筆轉 markdown。
3. 批次輸出 `issues/*.md`。
4. README 補上操作指引。

### 自學提示
- 模板越固定，團隊協作越快。
- 每份 issue 最少要有完成標準（Done Criteria）。

### AI 半手動提示
```text
請把 tasks.json 轉成 GitHub issue markdown，
每一份需包含：背景、目標、步驟、完成標準、owner、due date。
```

### 完成檢核
- 至少產生 3 份可用 issue 檔。
- 任務資訊可追溯到原會議內容。

### 10 分鐘測驗（5 題）
1. MCQ：Issue 模板最必要欄位是？
2. MCQ：為什麼要批次輸出？
3. MCQ：done criteria 缺漏會造成什麼問題？
4. SA：你會如何讓 issue 更容易被執行？
5. SA：給一個「好任務標題」範例。

錯題複習連結：
- `#chapter-4github-issue-樣板匯出issue-export`

---

## SP2 最終驗收（Final Acceptance）
- 從會議文字到任務看板可一條龍完成。
- 任務狀態可更新、可查詢。
- GitHub Issue 可直接被團隊採用。
- 有一份「會議重點 Memo」做參與度強化。
