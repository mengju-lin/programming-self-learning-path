# Side Projects 章節教學藍圖（SP1~SP6，重寫版）

## 文件定位（Purpose）
- 本文件是「章節級教學設計」版本，對齊 `human-raw-ideas.md` 與 `assistant-learning-path-plan.md`。
- 每章均提供：目標、輸入輸出（Input/Output）、步驟（Steps）、提示（Hints）、完成檢核（Done Check）、測驗規格（Quiz Spec）。
- 每章皆可手動完成，也可使用 AI 自動補全（AI Auto-completion）做半手動完成。

## 全域章節規範（Global Chapter Rules）
- 章節語言：繁體中文，重要詞附英文。
- 測驗規格：固定 10 分鐘、5 題（3 選擇 + 2 簡答）。
- 錯題回饋：每題需附對應複習連結（Review Link）。
- 品質要求：題目難度需與當前能力相符，不可突然跳級。
- 參與度設計：每個 SP 至少加入一個 Attention Hook（joke/memo/情境提示）。

---

## SP1 - Python 學習任務啟動器（Python Learning Task Starter）

### Chapter 1：資料型別與常見結構（Types and Core Structures）
- 章節目標：重新建立 Python 基礎穩定度，避免後續專案卡在語法。
- Input/Output：
1. Input：`scores: list[int]`、`student: dict`、`raw_name: str`
2. Output：型別正確的資料摘要（JSON 或字串）
- Steps：
1. 建立 `chapter1_basics.py`。
2. 完成型別宣告、格式化輸出（f-string）。
3. 做一題清單運算與一題字典查詢。
4. 將結果輸出為 `output/ch1_result.json`。
- Hints：
1. 先用 `type()` 驗證再往下做。
2. 使用 `dict.get()` 避免 KeyError。
- Done Check：可解釋 `list` 與 `dict` 使用時機，且輸出可執行。
- Quiz Spec：5 題，錯題連回本章資料型別與資料結構段落。

### Chapter 2：流程控制與例外處理（Control Flow and Exceptions）
- 章節目標：能寫出有防呆的條件與迴圈邏輯。
- Input/Output：
1. Input：分數清單、使用者輸入字串
2. Output：及格篩選結果、合法輸入確認結果
- Steps：
1. 實作成績分級（`if/elif/else`）。
2. 實作清單篩選（`for` + `continue`）。
3. 實作輸入重試（`while` + `try/except`）。
4. 記錄例外處理前後差異。
- Hints：先寫正常流程，再補錯誤處理。
- Done Check：程式遇到錯誤輸入不會直接崩潰。
- Quiz Spec：5 題，錯題連回流程圖與例外處理範例。

### Chapter 3：函式、類別與模組化（Functions, Classes, Modularization）
- 章節目標：把重複邏輯收斂成可重用元件。
- Input/Output：
1. Input：重複處理邏輯、任務資料
2. Output：可重用函式與 `Task` 類別物件
- Steps：
1. 把重複程式抽成 3 個函式。
2. 建立 `Task` 類別（`title`、`status`、`estimate_hours`）。
3. 增加 `mark_done()`、`to_dict()`。
4. 將函式與類別拆至模組檔案。
- Hints：每個函式只做一件事（Single Responsibility）。
- Done Check：可建立多個任務物件並輸出一致 JSON。
- Quiz Spec：5 題，錯題連回函式設計與 OOP 基礎段落。

### Chapter 4：`uv` 專案啟動與 Flask Checklist API
- 章節目標：建立可沿用到 SP2~SP6 的專案骨架。
- Input/Output：
1. Input：指令列操作（`uv init`、`uv add flask`）
2. Output：可啟動 Flask 服務與 checklist API
- Steps：
1. 初始化專案與依賴。
2. 建立 `GET /api/checklist`。
3. 讀取 `checklist.json` 並回傳。
4. 用 README 記錄啟動方式。
- Hints：先確保 API 回 200，再補資料格式優化。
- Done Check：`uv run flask --app app.py run` 可正常啟動。
- Quiz Spec：5 題，錯題連回 `uv`、Flask Route、API schema。

---

## SP2 - AI 會議任務轉換器（AI Meeting-to-Execution Converter）

### Chapter 1：會議逐字稿結構化（Meeting Structuring）
- 章節目標：把會議文字變成可追蹤資料。
- Input/Output：
1. Input：`meeting_notes: str`
2. Output：`summary`、`action_items`、`owner`、`due_date`
- Steps：
1. 切句並清理冗語。
2. 抽取決策句與行動句。
3. 補齊責任人與日期（可標記 `needs_review`）。
4. 輸出 `meeting_structured.json`。
- Hints：先規則式（Rule-based）做到穩定，再談 AI 優化。
- Done Check：輸出資料可直接給下章任務拆解使用。
- Quiz Spec：5 題，錯題連回 schema 與抽取規則。

### Chapter 2：任務拆解與里程碑（Task Breakdown and Milestones）
- 章節目標：將 action items 轉為週可執行任務。
- Input/Output：
1. Input：`action_items: list[dict]`
2. Output：`tasks.json`、`milestones.json`
- Steps：
1. 每個 action item 拆成 2~3 子任務。
2. 加入 `status="todo"`、`due_date`、`owner`。
3. 依週次分組成里程碑。
4. 產生逾期標記欄位。
- Hints：先求任務可追蹤，再追求拆解漂亮。
- Done Check：每筆任務都有欄位且能排序。
- Quiz Spec：5 題，錯題連回排序/分組/日期處理段落。

### Chapter 3：任務狀態 API（Task Status API）
- 章節目標：支援協作更新任務狀態。
- Input/Output：
1. Input：`GET /api/tasks`、`POST /api/tasks/<id>/status`
2. Output：最新任務清單與錯誤回應
- Steps：
1. 實作查詢端點。
2. 實作狀態更新端點。
3. 驗證狀態合法集合（todo/doing/done）。
4. 回傳統一錯誤格式。
- Hints：先定義 response schema，再寫邏輯。
- Done Check：非法狀態會回 400 且訊息清楚。
- Quiz Spec：5 題，錯題連回 API 設計與驗證規則。

### Chapter 4：GitHub Issue 樣板匯出（Issue Export）
- 章節目標：讓任務可直接貼到 GitHub 開工。
- Input/Output：
1. Input：`tasks: list[dict]`
2. Output：`issues/*.md`
- Steps：
1. 設計 issue 模板欄位。
2. 任務逐筆轉 markdown。
3. 批次輸出到 `issues/`。
4. README 增補使用流程。
- Hints：模板盡量固定，方便團隊一致執行。
- Done Check：任一 `issues/*.md` 可直接貼上使用。
- Quiz Spec：5 題，錯題連回模板欄位與輸出流程。
- Attention Hook：每份 issue 末尾可加一行「本週小提醒 Memo」。

---

## SP3 - 學習事件資料管線（Learning Event Data Pipeline）

### Chapter 1：Event Schema 與資料驗證
- 章節目標：阻擋髒資料進入管線。
- Input/Output：
1. Input：raw events（JSON 或 JSONL）
2. Output：`valid_events` + `invalid_events.jsonl`
- Steps：
1. 定義必要欄位：`student_id`、`chapter`、`event_type`、`ts`。
2. 建立 `validate_event()`。
3. 將無效事件寫入 invalid log。
4. 輸出驗證統計。
- Hints：錯誤原因要可讀（不是只寫 false）。
- Done Check：可說出每種 invalid 原因比例。
- Quiz Spec：5 題，錯題連回 schema 定義與驗證函式。

### Chapter 2：清理與轉換（Cleaning and Transformation）
- 章節目標：統一資料格式，確保可分析。
- Input/Output：
1. Input：valid events
2. Output：`clean_events.json`
- Steps：
1. 標準化欄位命名。
2. 時間格式轉 ISO8601。
3. 去重複與剔除空主鍵。
4. 產生清理摘要（保留/刪除數）。
- Hints：先定 deduplicate key，再執行去重。
- Done Check：clean 檔案欄位一致、無空主鍵。
- Quiz Spec：5 題，錯題連回時間格式與去重策略。

### Chapter 3：PostgreSQL 批次入庫（Batch Load）
- 章節目標：穩定寫入資料庫並可對帳。
- Input/Output：
1. Input：`clean_events`
2. Output：insert report + 對帳結果
- Steps：
1. 建立事件資料表。
2. 每批（例如 500 筆）入庫。
3. 失敗批次 rollback 並記錄。
4. 執行 source vs DB 筆數對帳。
- Hints：先讓交易（transaction）正確，再調 batch size。
- Done Check：可重跑寫入且資料筆數一致。
- Quiz Spec：5 題，錯題連回 transaction 與對帳概念。

### Chapter 4：CLI 重跑與摘要報告（Re-runnable Pipeline）
- 章節目標：讓資料管線可維運、可追蹤。
- Input/Output：
1. Input：`--date`、`--source`
2. Output：`pipeline_summary_YYYY-MM-DD.json`
- Steps：
1. 建立 `run_pipeline.py`。
2. 增加 extract/clean/load/report 日誌。
3. 輸出執行摘要檔。
4. 寫 README 重跑指引。
- Hints：用固定輸出欄位，方便每週比較。
- Done Check：同參數重跑，核心結果一致。
- Quiz Spec：5 題，錯題連回 CLI 參數與 logging。

---

## SP4 - 學習洞察 API 與儀表板（Learning Insights API and Dashboard）

### Chapter 1：指標定義與 SQL 聚合（Metrics and SQL）
- 章節目標：建立可解釋、可驗證的學習指標。
- Input/Output：
1. Input：學習事件與測驗資料表
2. Output：完成率、錯題率、停留時間查詢結果
- Steps：
1. 定義指標公式。
2. 撰寫 `metrics.sql`。
3. 以小樣本手算驗證結果。
4. 補指標欄位說明。
- Hints：先定義分母，避免比率失真。
- Done Check：SQL 結果可與手算對齊。
- Quiz Spec：5 題，錯題連回公式與 SQL 聚合段落。

### Chapter 2：Flask 分析 API（Analytics API）
- 章節目標：提供前端穩定可用的分析介面。
- Input/Output：
1. Input：`chapter`、`date_from` 等 query params
2. Output：固定 JSON schema
- Steps：
1. 建立 `/api/metrics/overview`。
2. 參數驗證與預設值處理。
3. 空資料返回空集合。
4. 非法參數回 400。
- Hints：先寫 schema 範例再寫程式。
- Done Check：前端可直接消費資料，無需猜欄位。
- Quiz Spec：5 題，錯題連回 API schema 與錯誤處理。

### Chapter 3：React 儀表板實作（Dashboard UI）
- 章節目標：讓使用者看懂現況與弱點。
- Input/Output：
1. Input：API JSON
2. Output：總覽卡、弱點區、建議區
- Steps：
1. 建三區塊 UI。
2. 用 `useEffect` 抓 API。
3. 支援章節切換重抓。
4. 補 loading/error 狀態。
- Hints：先做到正確顯示，再補視覺美化。
- Done Check：切換章節後資料同步刷新。
- Quiz Spec：5 題，錯題連回 state 管理與資料流。

### Chapter 4：複習連結與參與度文案（Review Links and Engagement Copy）
- 章節目標：把洞察轉成可行動建議，提升持續使用意願。
- Input/Output：
1. Input：`wrong_rate`、`completion_rate`、`stay_time`
2. Output：建議排序、複習連結、鼓勵文案（含 memo/joke）
- Steps：
1. 定義弱點閾值規則。
2. 生成複習順序。
3. 顯示「為何推薦這一步」理由。
4. 補一則輕量提醒文案（不影響專業性）。
- Hints：文案要短，資訊優先、娛樂其次。
- Done Check：使用者可一鍵進入對應複習章節。
- Quiz Spec：5 題，錯題連回規則引擎與推薦邏輯。

---

## SP5 - 課程資料庫調校專案（Curriculum DB Tuning Project）

### Chapter 1：Schema 與鍵值策略（Schema and Keys）
- 章節目標：建立可維護且查詢友善的結構。
- Input/Output：
1. Input：核心查詢需求清單
2. Output：`schema.sql`
- Steps：
1. 先列查詢，再設計欄位。
2. 定義主鍵/外鍵/唯一限制。
3. 補 `NOT NULL` 與預設值。
4. 建立 migration。
- Hints：從查詢反推 schema，少走回頭路。
- Done Check：核心查詢不需過多無效 join。
- Quiz Spec：5 題，錯題連回 key 與 constraint 概念。

### Chapter 2：索引設計與驗證（Index Strategy）
- 章節目標：降低高頻查詢延遲。
- Input/Output：
1. Input：高頻 where/join/order 條件
2. Output：`indexes.sql` + 量測結果
- Steps：
1. 盤點高頻查詢。
2. 設計單欄與複合索引。
3. 比對 before/after 查詢時間。
4. 記錄索引成本。
- Hints：不要一次加太多索引，逐步驗證收益。
- Done Check：至少兩個查詢有明顯改善。
- Quiz Spec：5 題，錯題連回複合索引判斷。

### Chapter 3：核心 SQL 與報表查詢（Core SQL for APIs）
- 章節目標：交付可直接給 API 使用的 SQL。
- Input/Output：
1. Input：`student_id`、`chapter_id`、`week_start`
2. Output：進度、錯題、週報查詢結果
- Steps：
1. 寫進度查詢。
2. 寫錯題彙總查詢。
3. 寫週報查詢。
4. 統一欄位命名。
- Hints：API 需要的是穩定欄位，不是炫技 SQL。
- Done Check：至少三支 SQL 可被 API 直接調用。
- Quiz Spec：5 題，錯題連回 JOIN/CTE/聚合應用。

### Chapter 4：`EXPLAIN` 與效能報告（Performance Report）
- 章節目標：給出可量化、可解釋的優化成果。
- Input/Output：
1. Input：慢查詢清單
2. Output：before/after 效能報告
- Steps：
1. 跑 `EXPLAIN` 看掃描策略。
2. 找瓶頸（Seq Scan、Join Cost）。
3. 改索引或 SQL 後重測。
4. 彙整平均耗時與 P95。
- Hints：只優化真正慢的查詢，不做無效微調。
- Done Check：至少兩支查詢完成量化改善。
- Quiz Spec：5 題，錯題連回 `EXPLAIN` 判讀。

---

## SP6 - 自適應學習整合系統（Adaptive Learning Integrator）

### Chapter 1：跨模組欄位對齊（Schema Alignment and Adapter）
- 章節目標：讓 SP2~SP5 資料流能無痛串接。
- Input/Output：
1. Input：多來源 JSON payload
2. Output：統一 schema payload
- Steps：
1. 列出欄位衝突（如 `studentId` vs `student_id`）。
2. 建立 adapter 轉換層。
3. 驗證型別一致性。
4. 寫 smoke test。
- Hints：先統一命名，再談商業邏輯。
- Done Check：不再需要手動修欄位即可串接。
- Quiz Spec：5 題，錯題連回 API contract 與 adapter。

### Chapter 2：難度適配與推薦規則（Difficulty and Recommendation Rules）
- 章節目標：依表現輸出可解釋下一步建議。
- Input/Output：
1. Input：`quiz_accuracy`、`wrong_rate`、`stay_time`
2. Output：`next_step`、`reason`、`review_link`
- Steps：
1. 設定分數區間。
2. 實作 `recommend_next()`。
3. 補推薦原因文字。
4. 測邊界值（0.6、0.8）。
- Hints：規則要可解釋，不要黑箱。
- Done Check：低中高表現都有穩定輸出。
- Quiz Spec：5 題，錯題連回規則與邊界值測試。

### Chapter 3：單頁整合看板（Unified Dashboard）
- 章節目標：在一頁看懂進度、弱點、建議。
- Input/Output：
1. Input：整合 API 回應
2. Output：三區塊整合畫面 + 更新時間
- Steps：
1. 統一狀態管理。
2. 串接整合 API。
3. 加「重新分析」按鈕。
4. 顯示推薦理由展開區。
- Hints：先確保資料一致，再優化互動細節。
- Done Check：重新分析後畫面可同步刷新。
- Quiz Spec：5 題，錯題連回整合資料流與 UI 狀態。

### Chapter 4：E2E 驗收與 Demo（End-to-End Demo）
- 章節目標：交付可展示、可重現、可交接成果。
- Input/Output：
1. Input：測試帳號、樣本資料、README 指令
2. Output：E2E 測試結果、5 分鐘 Demo Script
- Steps：
1. 定義主流程（登入 -> 學習 -> 分析 -> 推薦）。
2. 準備最小可重現資料。
3. 編寫展示腳本。
4. 請新成員依 README 重跑一次。
- Hints：Demo 先求穩，再求華麗。
- Done Check：新成員可在短時間重現成功。
- Quiz Spec：5 題，錯題連回 E2E 驗收流程。
- Attention Hook：Demo 結尾加入「本週成就 Memo」提高完成感。

---

## 每週檢核運行規則（Weekly Check Operation）
- 每章結束即執行 10 分鐘測驗。
- 錯題必須回寫到「錯誤概念標籤（Error Tags）」。
- 依錯題產生下一週優先複習順序。
- 儀表板最少更新一次：`completion_rate`、`quiz_accuracy`、`weak_topics`。

## 內容品質審查清單（Content QA Checklist）
- 是否貼近學生背景與常見工作情境。
- 是否清楚標示 Input/Output 與完成條件。
- 是否同時提供手動路線與 AI 半手動路線。
- 是否有週檢核與複習連結。
- 是否有一個提升參與度的文案或提示（joke/memo）。

## 本文件完成定義（Definition of Completion）
- 已覆蓋 SP1~SP6 全章節藍圖。
- 每章均具備目標、流程、驗收、測驗與回饋規格。
- 可直接作為後續生成教材、checklist、題庫與實作任務的母版。
