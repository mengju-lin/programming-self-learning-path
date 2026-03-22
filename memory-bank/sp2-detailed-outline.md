# SP2 詳細大綱（AI Meeting-Driven PM Assistant）

## 專案情境（Scenario）
你接手每週產品會議，需要在短時間內把會議紀錄轉成可執行任務、里程碑與追蹤清單，並理解 AI 工具如何嵌入 AI-supported PM workflow。

## 核心目標（Goals）
- 把會議文字轉為結構化資料（摘要、行動項目、負責人、截止日）。
- 建立可更新任務狀態的 API，讓執行面可追蹤。
- 輸出 GitHub Issue 樣板，支援團隊直接開工。

## Chapter 1：會議資料結構化
### 章節目標
把非結構化會議文字轉為可追蹤欄位。

### 語法與工具焦點
- `str` 清理、`list[dict]` 結構化
- 規則式抽取（Rule-based Extraction）
- JSON 輸出

### 步驟指引
1. 定義 `meeting_input` 與 `meeting_output` schema。
2. 將逐字稿切句並移除冗語。
3. 抽取決策句、行動句、負責人、截止日。
4. 匯出 `meeting_structured.json`。

### 練習例子（Examples）
- 例子 1：摘要抽取  
  Input 格式：`meeting_notes: str`（多行逐字稿）。  
  Logic：切句、去口語贅詞、保留決策句。  
  範例輸出：`{"summary": ["本週先上線 MVP", "下週補回歸測試"]}`。
- 例子 2：行動項目抽取  
  Input 格式：`sentences: list[str]`。  
  Logic：找出動詞開頭句，補齊 `owner` 與 `due_date`。  
  範例輸出：`{"action_items": [{"task":"更新 API 文件","owner":"Amy","due_date":"2026-03-25"}]}`。
- 例子 3：資料品質檢查  
  Input 格式：`action_items: list[dict]`。  
  Logic：檢查欄位缺漏，若缺漏標記 `needs_review=true`。  
  範例輸出：`{"task":"整理 dashboard","needs_review": true}`。

### 完成檢核
- 輸出至少含 `summary`、`action_items`、`owner`、`due_date`。
- 缺漏欄位可被標記，不會直接丟進後續流程。

## Chapter 2：任務拆解與里程碑
### 章節目標
把行動項目轉成可執行任務與每週里程碑。

### 語法與工具焦點
- 函式拆分（Function Decomposition）
- 排序與分組（Sorting / Grouping）
- `datetime` 日期處理

### 步驟指引
1. 建立 `build_tasks(action_items)`。
2. 每個 action item 拆 2-3 個子任務並補 `status="todo"`。
3. 依 `due_date` 排序後，按週分組為里程碑。
4. 輸出 `tasks.json` 與 `milestones.json`。

### 練習例子（Examples）
- 例子 1：任務拆解  
  Input 格式：`action_items: list[dict]`。  
  Logic：一筆 action item 轉多筆子任務，保留 `owner`。  
  範例輸出：`{"tasks": [{"task":"設計 API schema","owner":"Amy","status":"todo"}]}`。
- 例子 2：里程碑分組  
  Input 格式：`tasks: list[dict]`（含 `due_date`）。  
  Logic：排序後依週次分組並計算任務數。  
  範例輸出：`{"milestones": [{"week":"W1","tasks":4}]}`。
- 例子 3：逾期檢查  
  Input 格式：任務清單與今日日期。  
  Logic：若 `due_date < today` 且非 done，標記 `overdue`。  
  範例輸出：`{"task":"補單元測試","status":"doing","overdue": true}`。

### 完成檢核
- 任務都含 `task`、`owner`、`status`、`due_date`。
- 能產出每週里程碑與逾期任務清單。

## Chapter 3：Flask API 與狀態更新
### 章節目標
建立任務查詢與更新端點，支援協作追蹤。

### 語法與工具焦點
- Flask `GET/POST`
- request JSON 驗證
- 狀態機（todo/doing/done）

### 步驟指引
1. 建立 `GET /api/tasks`。
2. 建立 `POST /api/tasks/<id>/status`。
3. 驗證狀態值合法，非法回傳 400。
4. 更新資料後回傳最新任務。

### 練習例子（Examples）
- 例子 1：查詢任務 API  
  Input 格式：`GET /api/tasks`。  
  Logic：回傳標準任務清單 schema。  
  範例輸出：`{"tasks":[{"id":"t1","status":"doing"}]}`。
- 例子 2：更新狀態 API  
  Input 格式：`POST /api/tasks/t1/status` + `{"status":"done"}`。  
  Logic：驗證狀態後更新並回傳。  
  範例輸出：`{"id":"t1","status":"done"}`。
- 例子 3：錯誤處理  
  Input 格式：`{"status":"closed"}`。  
  Logic：狀態不在允許集合時回 400。  
  範例輸出：`{"error":"invalid status"}`。

### 完成檢核
- 前端可成功更新任務狀態。
- 非法狀態可被攔截且有清楚錯誤訊息。

## Chapter 4：GitHub Issue 樣板輸出
### 章節目標
把任務自動轉為可貼上 GitHub 的 issue 內容。

### 語法與工具焦點
- Markdown 模板字串
- 批次檔案輸出
- README 操作指引

### 步驟指引
1. 設計 issue 欄位（背景、目標、完成標準、owner、due date）。
2. 任務逐筆轉 markdown。
3. 批次輸出到 `issues/*.md`。
4. README 補上「輸入→輸出」操作說明。

### 練習例子（Examples）
- 例子 1：單筆模板轉換  
  Input 格式：單筆任務 dict。  
  Logic：映射標題、描述、負責人、截止日。  
  範例輸出：`## [Task] 更新 API 文件`。
- 例子 2：批次輸出  
  Input 格式：`tasks: list[dict]`。  
  Logic：逐筆寫入 `issues/{task_id}.md`。  
  範例輸出：`issues/t1.md`, `issues/t2.md`。
- 例子 3：完成標準自動補齊  
  Input 格式：缺少 done criteria 的任務。  
  Logic：套用預設完成標準模板。  
  範例輸出：`- [ ] API 文件含範例請求與回應`。

### 完成檢核
- 產出檔可直接貼到 GitHub Issue 使用。
- README 清楚描述資料流與重跑方式。

## 章節測驗規格（固定）
- 每章 5 題：3 題選擇題 + 2 題簡答題。
- 時間 10 分鐘內，錯題需對應複習連結。

## 最終完成檢核
- 會議逐字稿可穩定轉成摘要、行動項目與里程碑。
- API 可查詢、更新任務狀態，並處理錯誤輸入。
- 可輸出可直接使用的 GitHub Issue 樣板。
