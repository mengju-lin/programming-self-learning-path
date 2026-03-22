# SP5 詳細大綱（Curriculum Database Design and Management）

## 專案情境（Scenario）
後端查詢變慢且需求擴張，你要在不畫 ERD 的前提下，重整 schema、索引與 SQL，讓系統能穩定支援分析與產品查詢。

## 核心目標（Goals）
- 完成可維護 schema 與鍵值策略。
- 以索引與 SQL 最佳化降低查詢延遲。
- 交付可量化的效能改善報告。

## Chapter 1：Schema 與鍵值策略（不含 ERD）
### 章節目標
建立可擴充且查詢友善的資料表結構。

### 語法與工具焦點
- `PRIMARY KEY` / `FOREIGN KEY`
- `UNIQUE` / `NOT NULL`
- migration SQL

### 步驟指引
1. 先列核心查詢與必要欄位。
2. 定義主鍵、外鍵與唯一限制。
3. 補上必要約束與預設值。
4. 輸出 `schema.sql` 與 migration 檔。

### 練習例子（Examples）
- 例子 1：主外鍵設計  
  Input 格式：`students`、`chapters`、`learning_progress` 欄位清單。  
  Logic：設定 `learning_progress.student_id -> students.id` 外鍵。  
  範例輸出：`CREATE TABLE learning_progress (...)`。
- 例子 2：唯一限制  
  Input 格式：可能重複的關鍵欄位。  
  Logic：對 `student_id, chapter_id` 建立複合唯一限制。  
  範例輸出：`UNIQUE(student_id, chapter_id)`。
- 例子 3：預設值策略  
  Input 格式：`status` 欄位需求。  
  Logic：預設 `status='not_started'` 避免 null。  
  範例輸出：`status TEXT NOT NULL DEFAULT 'not_started'`。

### 完成檢核
- 核心查詢不需多餘 join 才能取到關鍵資料。
- schema 可清楚說明每個鍵值用途。

## Chapter 2：索引設計
### 章節目標
針對高頻查詢建立有效索引並量化改善。

### 語法與工具焦點
- `CREATE INDEX`
- 複合索引（Composite Index）
- 查詢時間比對

### 步驟指引
1. 盤點高頻 where / join 條件。
2. 建立單欄或複合索引。
3. 比對建索引前後查詢時間。
4. 記錄索引收益與成本。

### 練習例子（Examples）
- 例子 1：高頻查詢索引  
  Input 格式：`WHERE student_id=? AND chapter_id=?`。  
  Logic：建立 `(student_id, chapter_id)` 複合索引。  
  範例輸出：`CREATE INDEX idx_progress_student_chapter ...`。
- 例子 2：排序查詢索引  
  Input 格式：`ORDER BY updated_at DESC`。  
  Logic：建立 `updated_at` 索引降低排序成本。  
  範例輸出：`CREATE INDEX idx_progress_updated_at ...`。
- 例子 3：效能前後對比  
  Input 格式：同一查詢 before/after。  
  Logic：量測平均耗時與 P95。  
  範例輸出：`120ms -> 28ms`。

### 完成檢核
- 至少 2 個高頻查詢有明顯改善。
- 可說明每個索引為何存在。

## Chapter 3：核心 SQL 撰寫
### 章節目標
完成可直接供 API 使用的查詢與彙總語句。

### 語法與工具焦點
- `JOIN`、`CTE`
- 聚合（Aggregation）
- 參數化查詢

### 步驟指引
1. 寫學習進度查詢 SQL。
2. 寫章節錯題彙總 SQL。
3. 寫週報表彙整 SQL。
4. 以參數化方式執行並驗證輸出。

### 練習例子（Examples）
- 例子 1：進度查詢  
  Input 格式：`student_id`。  
  Logic：JOIN 進度與章節表計算完成率。  
  範例輸出：`{"student_id":"S01","completion_rate":0.78}`。
- 例子 2：錯題彙總  
  Input 格式：`chapter_id`。  
  Logic：GROUP BY 題目計算錯誤次數。  
  範例輸出：`{"chapter":"CH3","wrong_count":42}`。
- 例子 3：週報表  
  Input 格式：`week_start`。  
  Logic：彙整本週活躍學習者與平均作答率。  
  範例輸出：`{"week":"2026-W12","active_students":86,"avg_accuracy":0.74}`。

### 完成檢核
- 至少 3 支 SQL 可直接被 API 調用。
- 輸出欄位命名一致且可讀。

## Chapter 4：效能檢查與最佳化
### 章節目標
用 `EXPLAIN` 找出瓶頸並提出可驗證的最佳化方案。

### 語法與工具焦點
- `EXPLAIN`
- Seq Scan / Index Scan 判讀
- before/after 報告

### 步驟指引
1. 針對慢查詢執行 `EXPLAIN`。
2. 找出 full scan 根因。
3. 調整索引或 SQL 結構後重測。
4. 交付效能最佳化報告。

### 練習例子（Examples）
- 例子 1：掃描策略分析  
  Input 格式：慢查詢 SQL。  
  Logic：比較 `Seq Scan` 與 `Index Scan`。  
  範例輸出：`Seq Scan -> Index Scan`。
- 例子 2：查詢改寫  
  Input 格式：多層子查詢 SQL。  
  Logic：改為 CTE 或先聚合再 join。  
  範例輸出：`總耗時 95ms -> 41ms`。
- 例子 3：最佳化報告  
  Input 格式：多次壓測結果。  
  Logic：彙整平均耗時、P95、CPU 使用率。  
  範例輸出：`效能提升 63%`。

### 完成檢核
- 至少 2 支查詢有量化改善。
- 交付 schema、索引策略、核心 SQL、效能報告。

## 章節測驗規格（固定）
- 每章 5 題：3 題選擇題 + 2 題簡答題。
- 時間 10 分鐘內，錯題需對應複習連結。

## 最終完成檢核
- DB 設計可支援產品需求與分析需求。
- 查詢效能可被量化、可重現、可解釋。
