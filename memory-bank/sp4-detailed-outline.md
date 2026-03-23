# SP4 詳細學習路徑：學習洞察 API 與儀表板（Learning Insights API and Dashboard）

## 專案情境（Scenario）
教學團隊希望「快速看懂」學生進度與弱點。你需要把資料變成 API，再用 Dashboard 呈現可行動的洞察。

## 專案目標（Goals）
1. 定義可解釋學習指標。
2. 建立穩定可查詢 API。
3. 讓學生與老師都看得懂的 Dashboard。

## 預期產出（Deliverables）
- `metrics.sql`
- `/api/metrics/overview`
- React Dashboard（總覽/弱點/建議）
- 複習連結推薦規則

## 建議節奏（12 小時）
- Chapter 1：3h
- Chapter 2：3h
- Chapter 3：3h
- Chapter 4：3h

## 章節 I/O 實作合約（Implementation Contract）
### CH1：指標定義與 SQL 聚合
- Input Schema：
```json
{"learning_events_table":"learning_events","quiz_results_table":"quiz_results","chapter":"CH3"}
```
- Output Schema：
```json
{"chapter":"CH3","completion_rate":0.82,"wrong_rate":0.27,"avg_stay_sec":523}
```
- Constraints：`completion_rate`、`wrong_rate` 範圍需在 `0.0~1.0`。

### CH2：Flask 分析 API
- Input Schema：
```json
{"query":{"chapter":"CH3","date_from":"2026-03-01"}}
```
- Success Output：
```json
{"data":{"chapter":"CH3","completion_rate":0.82,"wrong_rate":0.27,"avg_stay_sec":523},"meta":{"records":412}}
```
- Error Output：
```json
{"error":{"code":"INVALID_CHAPTER","message":"chapter not found"}}
```

### CH3：React 儀表板實作
- Input Schema：
```json
{"api_response":{"data":{"chapter":"CH3","completion_rate":0.82,"wrong_rate":0.27,"avg_stay_sec":523}}}
```
- Output Schema：
```json
{"ui":{"overview_cards":3,"weak_topics":["CH3"],"recommendation_panel":true},"state":{"loading":false,"error":null}}
```
- Constraints：chapter 切換後 1 次請求對應 1 次 state 更新，避免舊資料殘留。

### CH4：複習連結與參與度文案
- Input Schema：
```json
{"chapter":"CH3","wrong_rate":0.31,"completion_rate":0.58,"stay_time_sec":640}
```
- Output Schema：
```json
{"need_review":true,"review_link":"/course/ch3/review","reason":"錯題率偏高","memo":"先救 CH3，今天會更穩！"}
```
- Constraints：`memo` 不超過 20 字、不可覆蓋核心學習資訊。

---

## Chapter 1：指標定義與 SQL 聚合（Metrics and SQL）
### 章節目標
讓每個指標可被公式、SQL、手算三方驗證。

### Input / Output
- Input：`learning_events`、`quiz_results`
- Output：完成率、錯題率、停留時間

### 學習步驟
1. 定義指標公式（含分子分母）。
2. 撰寫對應 SQL。
3. 用小樣本手算比對。
4. 輸出欄位說明文件。

### 自學提示
- 沒有明確分母的指標通常不可信。
- 先追求可解釋，再追求複雜度。

### AI 半手動提示
```text
請根據 learning_events 與 quiz_results，
寫出 completion_rate / wrong_rate / avg_stay_time 的 SQL，
並附每個欄位解釋。
```

### 完成檢核
- 每個指標都能說明「怎麼算、為何這樣算」。
- SQL 結果與手算差異可解釋。

### 10 分鐘測驗（5 題）
1. MCQ：完成率分母通常是？
2. MCQ：錯題率核心資料來源？
3. MCQ：停留時間怎麼算？
4. SA：為何要做手算比對？
5. SA：指標設計常見誤區。

錯題複習連結：
- `#chapter-1指標定義與-sql-聚合metrics-and-sql`

---

## Chapter 2：Flask 分析 API（Analytics API）
### 章節目標
輸出讓前端穩定使用的查詢服務。

### Input / Output
- Input：`chapter`、`date_from`
- Output：固定 JSON schema（含 metrics 與 metadata）

### 學習步驟
1. 建 `/api/metrics/overview`。
2. 驗證查詢參數。
3. 查無資料時回空集合而非錯誤。
4. 錯誤情境回一致格式。

### 自學提示
- API 的穩定度比單次速度更重要。
- 前端最怕欄位名稱漂移。

### AI 半手動提示
```text
請幫我設計 Flask API /api/metrics/overview，
支援 chapter/date_from 參數，
回傳固定 schema，非法參數回 400。
```

### 完成檢核
- 前端不用猜欄位即可渲染。
- 錯誤與正常回應格式一致。

### 10 分鐘測驗（5 題）
1. MCQ：API schema 固定的價值？
2. MCQ：非法參數應回？
3. MCQ：空資料應如何回應？
4. SA：為何要先驗證參數？
5. SA：你會如何設計 error code？

錯題複習連結：
- `#chapter-2flask-分析-apianalytics-api`

---

## Chapter 3：React 儀表板實作（Dashboard UI）
### 章節目標
讓使用者 30 秒內看懂學習狀態。

### Input / Output
- Input：metrics API JSON
- Output：總覽卡片、弱點清單、建議區塊

### 學習步驟
1. 建立三區塊版型。
2. 串 API 並管理 state。
3. 支援 chapter filter 重抓。
4. 補 loading/error/retry。

### 自學提示
- 先保證資料正確顯示，再做視覺優化。
- 章節切換時要避免舊資料殘留。

### AI 半手動提示
```text
請幫我做 React dashboard：
- overview cards
- weak topics list
- recommendation panel
需有 loading/error，且 chapter 切換會重抓。
```

### 完成檢核
- 切換章節後資料同步更新。
- 錯誤情境有可理解提示。

### 10 分鐘測驗（5 題）
1. MCQ：監聽章節變化常用哪個 hook？
2. MCQ：為什麼需要 loading state？
3. MCQ：error state 最少要提供什麼？
4. SA：避免 UI 顯示舊資料的方法。
5. SA：你會如何安排三區塊資訊優先順序？

錯題複習連結：
- `#chapter-3react-儀表板實作dashboard-ui`

---

## Chapter 4：複習連結與參與度文案（Review Links and Engagement Copy）
### 章節目標
把指標轉成可行動建議，提升持續學習意願。

### Input / Output
- Input：`wrong_rate`、`completion_rate`、`stay_time`
- Output：`need_review`、`review_link`、`reason`、`memo`

### 學習步驟
1. 定義弱點閾值（例如 `wrong_rate > 0.25`）。
2. 產生章節複習排序。
3. 顯示「為何推薦」說明。
4. 加一則輕量 memo/joke（資訊優先）。

### 自學提示
- 建議要能被解釋，不能像黑箱。
- 文案要短，避免喧賓奪主。

### AI 半手動提示
```text
請根據 wrong_rate/completion_rate/stay_time，
輸出 review 建議與原因，
並附一則簡短鼓勵 memo（20 字內）。
```

### 完成檢核
- 使用者可一鍵跳到對應複習章節。
- 推薦規則可被口頭解釋。

### 10 分鐘測驗（5 題）
1. MCQ：推薦規則第一步應做什麼？
2. MCQ：`need_review=true` 常見條件？
3. MCQ：為何要給 `reason` 欄位？
4. SA：資訊與趣味內容如何平衡？
5. SA：舉一則不干擾學習的鼓勵 memo。

錯題複習連結：
- `#chapter-4複習連結與參與度文案review-links-and-engagement-copy`

---

## SP4 最終驗收（Final Acceptance）
- API 與 dashboard 數據一致。
- 使用者可快速辨識弱點與下一步。
- 每章都有可追蹤進度與複習入口。
