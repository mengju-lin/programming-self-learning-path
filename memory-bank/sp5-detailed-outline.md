# SP5 詳細學習路徑：課程資料庫調校專案（Curriculum DB Tuning Project）

## 專案情境（Scenario）
你是 Junior DB Manager。系統查詢變慢、需求變多，但本專案不要求畫 ERD。目標是用 schema、索引、SQL 與效能檢查把資料層穩定下來。

## 專案目標（Goals）
1. 建立可維護 schema 與鍵值策略。
2. 針對高頻查詢設計有效索引。
3. 交付可量化的效能改善報告。

## 預期產出（Deliverables）
- `schema.sql`
- `indexes.sql`
- `queries.sql`
- `performance_report.md`

## 建議節奏（12 小時）
- Chapter 1：3h
- Chapter 2：3h
- Chapter 3：3h
- Chapter 4：3h

## 章節 I/O 實作合約（Implementation Contract）
### CH1：Schema 與鍵值策略
- Input Schema：
```json
{"queries":["progress by student","wrong summary by chapter","weekly report"],"entities":["students","chapters","learning_progress"]}
```
- Output Schema：
```json
{"schema_sql":"CREATE TABLE ...","constraints":["PK","FK","UNIQUE","NOT NULL","DEFAULT"]}
```
- Constraints：`UNIQUE(student_id, chapter_id)` 必須存在。

### CH2：索引設計與驗證
- Input Schema：
```json
{"slow_queries":[{"name":"q_progress","where":["student_id","chapter_id"]}],"baseline":{"avg_ms":120,"p95_ms":180}}
```
- Output Schema：
```json
{"indexes":["idx_progress_student_chapter"],"after":{"avg_ms":28,"p95_ms":45},"improvement_pct":76.7}
```
- Constraints：至少 2 支高頻查詢需有可量化改善。

### CH3：核心 SQL 與報表查詢
- Input Schema：
```json
{"params":{"student_id":"S01","chapter_id":"CH3","week_start":"2026-03-18"}}
```
- Output Schema：
```json
{
  "progress_query_result":{"student_id":"S01","completion_rate":0.78},
  "wrong_summary_result":{"chapter":"CH3","wrong_count":42},
  "weekly_report_result":{"week":"2026-W12","active_students":86,"avg_accuracy":0.74}
}
```
- Constraints：輸出欄位命名需固定，以供 API 直接映射。

### CH4：EXPLAIN 與效能報告
- Input Schema：
```json
{"query_name":"q_progress","before_plan":"Seq Scan ...","after_plan":"Index Scan ...","metrics":{"before_avg":120,"after_avg":28}}
```
- Output Schema：
```json
{"report":{"query_name":"q_progress","plan_change":"Seq->Index","before_avg_ms":120,"after_avg_ms":28,"p95_before_ms":180,"p95_after_ms":45,"improvement_pct":76.7}}
```
- Constraints：報告需同時含 `avg` 與 `p95`，不可只給單次結果。

---

## Chapter 1：Schema 與鍵值策略（Schema and Keys）
### 章節目標
在不畫 ERD 的限制下，仍建立可擴充結構。

### Input / Output
- Input：核心查詢需求（進度、錯題、週報）
- Output：`schema.sql`（含 PK/FK/UNIQUE/NOT NULL）

### 學習步驟
1. 列 3 類核心查詢。
2. 由查詢反推欄位設計。
3. 設定主鍵、外鍵、唯一限制。
4. 加入預設值與必要約束。

### 自學提示
- schema 不是「把欄位排好」而已，核心是支援查詢。
- 先定資料責任邊界，再定欄位細節。

### AI 半手動提示
```text
請根據以下查詢需求設計 schema.sql，
需包含 students/chapters/learning_progress，
並加入 PK/FK/UNIQUE/NOT NULL/DEFAULT。
```

### 完成檢核
- 可說明每個 key 的用途。
- 核心查詢不需不必要的多層 join。

### 10 分鐘測驗（5 題）
1. MCQ：PK 的主要作用？
2. MCQ：FK 的主要作用？
3. MCQ：UNIQUE 常用來避免什麼？
4. SA：為何「從查詢反推 schema」較實用？
5. SA：給一個適合加 DEFAULT 的欄位。

錯題複習連結：
- `#chapter-1schema-與鍵值策略schema-and-keys`

---

## Chapter 2：索引設計與驗證（Index Strategy）
### 章節目標
用最少索引換取最有效查詢改善。

### Input / Output
- Input：高頻 where/join/order 條件
- Output：`indexes.sql` + before/after 量測

### 學習步驟
1. 找出前 3 名慢查詢。
2. 建立單欄與複合索引。
3. 量測平均耗時與 P95。
4. 記錄索引收益與寫入成本。

### 自學提示
- 索引不是越多越好，過多會拖慢寫入。
- 每個索引都要有存在理由。

### AI 半手動提示
```text
請根據這些慢查詢設計索引，
輸出 CREATE INDEX 語句與預期改善原因，
並附量測欄位（avg_ms, p95_ms）。
```

### 完成檢核
- 至少 2 支查詢有可量化改善。
- 能解釋每個索引的 trade-off。

### 10 分鐘測驗（5 題）
1. MCQ：複合索引適合哪種情境？
2. MCQ：索引過多常見副作用？
3. MCQ：效能比較至少要看哪兩個指標？
4. SA：你會如何決定索引優先順序？
5. SA：何時應該移除索引？

錯題複習連結：
- `#chapter-2索引設計與驗證index-strategy`

---

## Chapter 3：核心 SQL 與報表查詢（Core SQL for APIs）
### 章節目標
交付可被 API 直接使用的穩定 SQL。

### Input / Output
- Input：`student_id`、`chapter_id`、`week_start`
- Output：進度查詢、錯題彙總、週報查詢

### 學習步驟
1. 寫進度查詢 SQL。
2. 寫錯題彙總 SQL。
3. 寫週報 SQL。
4. 統一欄位命名與參數化查詢。

### 自學提示
- 優先可讀性與穩定性，不追求花俏語法。
- API 最怕欄位名字每週變一次。

### AI 半手動提示
```text
請幫我產生三支 SQL：
1) 學習進度
2) 錯題彙總
3) 週報表
要求：欄位命名一致，可參數化執行。
```

### 完成檢核
- 至少 3 支 SQL 可直接供 API 使用。
- SQL 結果欄位命名一致。

### 10 分鐘測驗（5 題）
1. MCQ：CTE 常見用途？
2. MCQ：報表查詢通常會用到什麼聚合？
3. MCQ：參數化查詢主要價值？
4. SA：你會如何命名 completion rate 欄位？
5. SA：為何欄位一致性很重要？

錯題複習連結：
- `#chapter-3核心-sql-與報表查詢core-sql-for-apis`

---

## Chapter 4：`EXPLAIN` 與效能報告（Performance Report）
### 章節目標
用可量化證據證明優化成果。

### Input / Output
- Input：慢查詢 SQL、索引策略
- Output：`performance_report.md`（before/after + 說明）

### 學習步驟
1. 跑 `EXPLAIN` 判讀掃描策略。
2. 找瓶頸（Seq Scan、Join Cost）。
3. 調整索引或 SQL 後重測。
4. 產出報告（avg/p95/改善率）。

### 自學提示
- 不要只看單次結果，要看多次平均。
- 報告要寫「做了什麼、為何有效、限制是什麼」。

### AI 半手動提示
```text
請幫我整理效能報告模板：
- 查詢名稱
- before/after avg、p95
- EXPLAIN 差異
- 改善率與風險
```

### 完成檢核
- 至少 2 支查詢有量化提升。
- 報告可讓非 DBA 也看懂。

### 10 分鐘測驗（5 題）
1. MCQ：`EXPLAIN` 用途？
2. MCQ：Seq Scan 通常代表什麼？
3. MCQ：效能報告最必要欄位？
4. SA：如何判斷優化是否值得上線？
5. SA：你會如何向 PM 解釋改善成果？

錯題複習連結：
- `#chapter-4explain-與效能報告performance-report`

---

## SP5 最終驗收（Final Acceptance）
- Schema、索引、SQL、效能報告齊備。
- 查詢效能改善可量化、可重現、可解釋。
- 可直接支援 SP6 整合。
