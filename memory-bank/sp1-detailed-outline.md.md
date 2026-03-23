# SP1 詳細學習路徑：Python 學習任務啟動器（Python Learning Task Starter）

## 專案情境（Scenario）
你剛加入一個教育產品團隊，第一週任務不是做大功能，而是先建立一套可重複使用的 Python 專案骨架。這套骨架會直接被 SP2~SP6 沿用。

## 專案目標（Goals）
1. 補齊 Python 核心語法與錯誤處理能力。
2. 建立可維護的函式/類別/模組結構。
3. 用 `uv` + Flask 做出可執行的 checklist API。

## 預期產出（Deliverables）
- `pyproject.toml`
- `app.py`（可啟動）
- `GET /api/checklist`（可回應）
- SP1 README（啟動方式 + 章節心得）

## 建議節奏（12 小時）
- Chapter 1：2.5h
- Chapter 2：2.5h
- Chapter 3：3h
- Chapter 4：4h

## 章節 I/O 實作合約（Implementation Contract）
### CH1：資料型別與常見結構
- Input Schema：
```json
{
  "scores": [78, 85, 92],
  "student": {"name": "Amy", "score": 90},
  "raw_name": "  amy  chen  "
}
```
- Input Constraints：
1. `scores` 長度至少 1，元素必須是數字。
2. `student.name` 必須可轉字串，`student.score` 必須可轉數字。
3. `raw_name` 允許多餘空白，但不得為空字串。
- Output Schema：
```json
{
  "avg_score": 85.0,
  "normalized_name": "Amy Chen",
  "student_line": "Amy score=90",
  "valid": true,
  "errors": []
}
```

### CH2：流程控制與例外處理
- Input Schema：
```json
{
  "scores": [55, 68, 90],
  "raw_input": ["abc", "88"]
}
```
- Input Constraints：
1. `scores` 可含非數字，需在流程中濾除或報錯。
2. `raw_input` 為模擬使用者輸入序列，直到出現合法數字即停止。
- Output Schema：
```json
{
  "passed_scores": [68, 90],
  "grade_map": [{"score": 90, "grade": "A"}],
  "accepted_input": 88,
  "error_count": 1
}
```

### CH3：函式、類別與模組化
- Input Schema：
```json
{
  "tasks": [{"title": "Write API", "estimate_hours": 3}],
  "module_config": {"use_utils": true}
}
```
- Input Constraints：
1. 每個 task 至少有 `title`。
2. `estimate_hours` 若缺值，預設為 1。
- Output Schema：
```json
{
  "task_objects": [{"title": "Write API", "status": "todo", "estimate_hours": 3}],
  "reusable_functions": ["normalize_name", "calc_avg_score", "format_student_line"],
  "module_ready": true
}
```

### CH4：uv + Flask Checklist API
- Input Schema：
```json
{
  "checklist_file": "checklist.json",
  "run_command": "uv run flask --app app.py run"
}
```
- Input Constraints：
1. `checklist_file` 必須存在且為合法 JSON。
2. API 必須回傳 `application/json`。
- Output Schema：
```json
{
  "health": "ok",
  "api_status": 200,
  "routes": ["/", "/api/checklist"],
  "checklist_loaded": true
}
```

---

## Chapter 1：資料型別與常見結構（Types and Core Structures）
### 章節目標
能把原始資料整理成可讀、可驗證、可重用的輸出。

### Input / Output
- Input：`scores: list[int]`、`student: dict`、`raw_name: str`
- Output：
1. 成績摘要（dict）
2. 清理後姓名（str）
3. 人類可讀狀態訊息（str）

### 學習步驟
1. 建立 `chapter1_basics.py`。
2. 寫 3 個函式：`calc_avg_score`、`normalize_name`、`format_student_line`。
3. 用 `type()` 驗證輸入型別，避免錯誤一路傳遞。
4. 輸出 `output/ch1_result.json`。

### 自學提示（Self-learning Hints）
- 先讓資料「正確」，再讓輸出「好看」。
- `dict.get()` 比直接索引更安全。
- 看到重複程式碼就先標記，留待 Chapter 3 模組化。

### AI 半手動提示（AI Auto-completion Prompt）
```text
請幫我把以下需求轉成 Python 函式：
1) scores 計算平均
2) raw_name 清理空白並 title case
3) student dict 轉可讀字串
請加上 type hints、錯誤處理、簡短 docstring。
```

### 完成檢核（Done Check）
- 可解釋 `list` 與 `dict` 的差異與適用情境。
- 程式在錯誤輸入時會回傳可理解訊息，不是直接崩潰。

### 10 分鐘測驗（5 題）
1. MCQ：哪個型別適合儲存 `name+score`？
2. MCQ：f-string 的主要用途？
3. MCQ：哪個型別是 mutable？
4. SA：`list` vs `dict` 差異與時機。
5. SA：舉一個型別轉換案例。

錯題複習連結：
- `#chapter-1資料型別與常見結構types-and-core-structures`

---

## Chapter 2：流程控制與例外處理（Control Flow and Exceptions）
### 章節目標
能在不確定輸入品質下寫出穩定邏輯。

### Input / Output
- Input：成績清單、字串輸入
- Output：及格清單、合法輸入結果、錯誤提示

### 學習步驟
1. 完成分級函式（`if/elif/else`）。
2. 完成篩選函式（`for` + `continue`）。
3. 完成重試輸入（`while` + `try/except`）。
4. 將錯誤類型記錄成簡短 log（例如 ValueError）。

### 自學提示
- 不要一開始就追求漂亮程式碼，先確保每條分支可跑。
- `break` 與 `continue` 常被混用，請各寫一題驗證。

### AI 半手動提示
```text
請幫我檢查以下 Python 迴圈程式，指出 break/continue 是否用對，
並補上 try/except 避免使用者輸入非數字時崩潰。
```

### 完成檢核
- 錯誤輸入可被攔截。
- 可清楚說明 `while` 何時比 `for` 合適。

### 10 分鐘測驗（5 題）
1. MCQ：哪個關鍵字會直接離開迴圈？
2. MCQ：`finally` 何時執行？
3. MCQ：何時用 `while`？
4. SA：`try/except` 的價值。
5. SA：給一個 `continue` 實例。

錯題複習連結：
- `#chapter-2流程控制與例外處理control-flow-and-exceptions`

---

## Chapter 3：函式、類別與模組化（Functions, Classes, Modularization）
### 章節目標
把重複邏輯收斂成可以在 SP2~SP6 重用的基礎元件。

### Input / Output
- Input：重複程式碼片段、任務資料
- Output：`utils/` 模組、`Task` 類別、可重用函式

### 學習步驟
1. 把重複邏輯拆成 3~5 個函式。
2. 建立 `Task` 類別並實作 `mark_done()`、`to_dict()`。
3. 把工具函式放進 `utils/`。
4. 寫最小測試腳本驗證各模組可獨立運作。

### 自學提示
- 函式命名請用「動詞 + 名詞」。
- 每個函式最好只負責一種輸出型態。
- 類別先處理狀態（state），再處理行為（behavior）。

### AI 半手動提示
```text
請協助我重構以下重複邏輯，輸出：
1) utils 模組
2) Task 類別
3) 主程式呼叫範例
要求：type hints、不超過 25 行/函式。
```

### 完成檢核
- 至少 3 個函式可跨檔案匯入。
- `Task` 物件狀態更新後可正確序列化成 dict。

### 10 分鐘測驗（5 題）
1. MCQ：`return` 的目的？
2. MCQ：何時應考慮 class？
3. MCQ：模組化最大好處？
4. SA：單一職責（Single Responsibility）是什麼？
5. SA：你會如何命名「清理輸入」函式？

錯題複習連結：
- `#chapter-3函式類別與模組化functions-classes-modularization`

---

## Chapter 4：`uv` 專案啟動與 Flask Checklist API
### 章節目標
完成可執行、可示範、可沿用的 SP1 結案版本。

### Input / Output
- Input：`uv init`、`uv add flask`、`checklist.json`
- Output：
1. 可啟動 Flask 服務
2. `GET /api/checklist` 回傳資料
3. README 啟動指南

### 學習步驟
1. 用 `uv` 初始化專案並安裝 Flask。
2. 建立 `app.py` 與 `/api/checklist`。
3. 載入 JSON 並回傳標準格式。
4. 補 README：啟動、測試、常見錯誤。

### 自學提示
- 先回傳固定字串測通路由，再接資料。
- API schema 固定化，後續 SP2~SP6 才能直接接。

### AI 半手動提示
```text
請產生一個 Flask app，包含 GET /api/checklist，
從本地 checklist.json 讀資料並回傳 JSON，
另外給我最短 README 啟動指令。
```

### 完成檢核
- `uv run flask --app app.py run` 成功。
- `GET /api/checklist` 回傳 200 且資料格式正確。

### 10 分鐘測驗（5 題）
1. MCQ：`uv` 在本專案的用途？
2. MCQ：`@app.route` 的作用？
3. MCQ：依賴設定通常在哪個檔案？
4. SA：從 `uv init` 到 API 啟動流程。
5. SA：你會如何提升 checklist 可用性？

錯題複習連結：
- `#chapter-4uv-專案啟動與-flask-checklist-api`

---

## SP1 最終驗收（Final Acceptance）
- 程式碼可執行。
- 每章任務可勾選並完成。
- 每章有測驗題與錯題回補路徑。
- 可直接作為 SP2 的起始專案。
