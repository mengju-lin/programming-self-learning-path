# SP6 詳細學習路徑：自適應學習整合系統（Adaptive Learning Integrator）

## 專案情境（Scenario）
你要在展示日前把 SP2~SP5 串起來，交付一個可操作、可解釋、可展示的端到端學習系統。

## 專案目標（Goals）
1. 對齊跨模組資料格式與 API contract。
2. 建立可解釋的難度適配與推薦規則。
3. 完成可重現的 E2E Demo。

## 預期產出（Deliverables）
- 整合 API
- 推薦規則文件
- 單頁整合 Dashboard
- 5 分鐘 Demo Script + 最終 README

## 建議節奏（12 小時）
- Chapter 1：3h
- Chapter 2：3h
- Chapter 3：3h
- Chapter 4：3h

## 章節 I/O 實作合約（Implementation Contract）
### CH1：跨模組欄位對齊
- Input Schema：
```json
{"sp2":{"studentId":"S01","taskStatus":"done"},"sp3":{"student_id":"S01","chapter":"CH3"},"sp4":{"wrong_rate":0.27},"sp5":{"completion_rate":0.78}}
```
- Output Schema：
```json
{"student_id":"S01","chapter":"CH3","task_status":"done","wrong_rate":0.27,"completion_rate":0.78}
```
- Constraints：命名統一用 `snake_case`，缺欄位需回錯誤而非靜默忽略。

### CH2：難度適配與推薦規則
- Input Schema：
```json
{"quiz_accuracy":0.58,"wrong_rate":0.31,"stay_time_sec":640}
```
- Output Schema：
```json
{"next_step":"review_basic","reason":"錯題率高且停留時間長","review_link":"/course/ch3/review"}
```
- Constraints：`quiz_accuracy` 必須在 `0~1`；邊界 `0.6/0.8` 行為需固定。

### CH3：單頁整合看板
- Input Schema：
```json
{"progress":{"completion_rate":0.62},"weakness":{"top":["CH3","CH2"]},"recommendation":{"next_step":"review_basic","reason":"CH3 錯題率高"},"last_updated_at":"2026-03-23T14:30:00+08:00"}
```
- Output Schema：
```json
{"ui":{"progress_block":true,"weakness_block":true,"recommendation_block":true,"refresh_button":true}}
```
- Constraints：點擊「重新分析」後，三區塊必須同步刷新。

### CH4：E2E 驗收與 Demo
- Input Schema：
```json
{"test_account":"demo_user","dataset":"demo_seed.json","script":"demo_script.md"}
```
- Output Schema：
```json
{"e2e_status":"pass","flow":["login","learn","analyze","recommend"],"demo_duration_min":5,"reproducible":true}
```
- Constraints：需提供可重現步驟與阻塞排查指引，讓新成員可獨立完成重跑。

---

## Chapter 1：跨模組欄位對齊（Schema Alignment and Adapter）
### 章節目標
把 SP2~SP5 的資料格式整成同一種語言。

### Input / Output
- Input：多來源 payload（SP2~SP5）
- Output：統一 schema payload

### 學習步驟
1. 列出欄位衝突表（name/type/source）。
2. 建 adapter 層處理欄位轉換。
3. 檢查型別與必要欄位。
4. 補 smoke test。

### 自學提示
- 先解決 naming conflict，再處理商業規則。
- adapter 要小且可測，避免混進商業邏輯。

### AI 半手動提示
```text
請幫我設計 adapter，將 SP2~SP5 payload 統一成：
student_id/chapter/quiz_accuracy/wrong_rate/completion_rate/suggested_next_step
並附上驗證規則。
```

### 完成檢核
- 整合流程不需手動改欄位。
- smoke test 通過。

### 10 分鐘測驗（5 題）
1. MCQ：adapter 的主要目的？
2. MCQ：欄位衝突最先處理什麼？
3. MCQ：為什麼要做 smoke test？
4. SA：你會如何設計欄位衝突表？
5. SA：adapter 與商業邏輯應如何分離？

錯題複習連結：
- `#chapter-1跨模組欄位對齊schema-alignment-and-adapter`

---

## Chapter 2：難度適配與推薦規則（Difficulty and Recommendation Rules）
### 章節目標
依學習表現產生可解釋下一步建議。

### Input / Output
- Input：`quiz_accuracy`、`wrong_rate`、`stay_time`
- Output：`next_step`、`reason`、`review_link`

### 學習步驟
1. 定義分數區間：<0.6、0.6~0.8、>=0.8。
2. 實作 `recommend_next(metrics)`。
3. 為每個建議補 `reason`。
4. 做邊界值測試（0.6/0.8）。

### 自學提示
- 推薦結果要能說服人，不是只回一個代碼。
- 邊界值最容易出 bug，務必先測。

### AI 半手動提示
```text
請根據 accuracy/wrong_rate/stay_time 產生推薦規則：
- review_basic / practice_more / advance
輸出需包含 reason 與 review_link。
```

### 完成檢核
- 不同區間輸入都有穩定輸出。
- `reason` 文字可被學生理解。

### 10 分鐘測驗（5 題）
1. MCQ：<0.6 建議類型？
2. MCQ：為何需要 reason 欄位？
3. MCQ：邊界值測試重點？
4. SA：規則可解釋性為何重要？
5. SA：給一個推薦理由範例。

錯題複習連結：
- `#chapter-2難度適配與推薦規則difficulty-and-recommendation-rules`

---

## Chapter 3：單頁整合看板（Unified Dashboard）
### 章節目標
在一頁呈現進度、弱點、推薦與理由。

### Input / Output
- Input：整合 API 回應
- Output：統一視圖（progress/weakness/recommendation）

### 學習步驟
1. 設計三區塊資料模型。
2. 串接整合 API。
3. 提供「重新分析」按鈕。
4. 顯示 `last_updated_at` 與推薦理由。

### 自學提示
- 先確保資料一致刷新，再加互動動畫。
- 每個區塊都要有「可行動下一步」。

### AI 半手動提示
```text
請設計一個整合 dashboard：
- Progress
- Weak Topics
- Recommendation + Reason
並支援一鍵重新分析。
```

### 完成檢核
- 使用者可理解「現在在哪、下一步做什麼」。
- 重新分析後內容會更新。

### 10 分鐘測驗（5 題）
1. MCQ：整合頁最核心三區塊？
2. MCQ：為何要顯示 last_updated_at？
3. MCQ：推薦區至少要有哪兩欄？
4. SA：如何避免重新分析造成畫面閃爍？
5. SA：你會如何排序弱點章節？

錯題複習連結：
- `#chapter-3單頁整合看板unified-dashboard`

---

## Chapter 4：E2E 驗收與 Demo（End-to-End Demo）
### 章節目標
把專案變成可展示、可交接成果。

### Input / Output
- Input：測試帳號、最小樣本資料、README
- Output：E2E report、Demo Script、重現紀錄

### 學習步驟
1. 定義主流程：登入 -> 學習 -> 分析 -> 推薦。
2. 準備最小可重現資料。
3. 寫 5 分鐘 Demo Script。
4. 讓新成員照 README 跑一次。

### 自學提示
- Demo 成功率比炫技更重要。
- 每一步都要有「預期畫面/預期輸出」。

### AI 半手動提示
```text
請幫我整理 5 分鐘 Demo Script：
- 開場（問題）
- 展示（流程）
- 收尾（價值）
每段給 2~3 句講稿。
```

### 完成檢核
- 新成員可在短時間內重現。
- Demo 有穩定腳本，不靠臨場記憶。

### 10 分鐘測驗（5 題）
1. MCQ：E2E 驗收首要目的？
2. MCQ：最小可重現資料的重要性？
3. MCQ：Demo script 必含哪三段？
4. SA：如何確保 demo 不翻車？
5. SA：你會怎麼向面試官說這個專案價值？

錯題複習連結：
- `#chapter-4e2e-驗收與-demoend-to-end-demo`

---

## SP6 最終驗收（Final Acceptance）
- SP2~SP5 完整串接成功。
- 推薦規則可解釋且可重現。
- 完成可展示、可交接的 E2E 成果。
