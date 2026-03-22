# SP3 詳細大綱（Learning Event Data Pipeline）

## 專案情境（Scenario）
教學產品累積大量學習事件（Learning Events），你需要把零散原始資料轉成可分析、可重跑、可追蹤品質的資料管線。

## 核心目標（Goals）
- 定義一致事件格式（Event Schema）並擋下無效資料。
- 完成清理（Cleaning）、轉換（Transformation）、入庫（Load）。
- 提供可重複執行與可驗證的管線摘要。

## Chapter 1：事件 Schema 定義
### 章節目標
建立欄位規則與驗證機制，避免髒資料進入流程。

### 語法與工具焦點
- `dict` schema / dataclass
- 欄位型別驗證
- invalid log 記錄

### 步驟指引
1. 定義必要欄位：`student_id`、`chapter`、`event_type`、`ts`。
2. 建立 `validate_event(event)`。
3. 失敗事件輸出錯誤原因。
4. 產生小型測試資料集。

### 練習例子（Examples）
- 例子 1：欄位驗證  
  Input 格式：`event: dict`。  
  Logic：檢查必要欄位存在與型別正確。  
  範例輸出：`{"valid": false, "missing": ["student_id"]}`。
- 例子 2：時間格式驗證  
  Input 格式：`ts: str`。  
  Logic：嘗試 parse，失敗時標記 invalid。  
  範例輸出：`{"valid": false, "error": "invalid timestamp"}`。
- 例子 3：錯誤事件落檔  
  Input 格式：驗證失敗事件。  
  Logic：保存 `event_id` + `error_reason` 到 `invalid_events.jsonl`。  
  範例輸出：`{"event_id":"e17","error":"missing chapter"}`。

### 完成檢核
- 必要欄位缺漏可被攔截。
- invalid log 至少記錄事件 ID 與錯誤原因。

## Chapter 2：清理與轉換
### 章節目標
把原始事件統一格式，確保後續可直接分析。

### 語法與工具焦點
- map/filter
- 時間標準化（ISO8601）
- 去重複（Deduplication）

### 步驟指引
1. 載入 raw events。
2. 標準化欄位命名與時間格式。
3. 去掉重複與空主鍵資料。
4. 匯出 `clean_events.json`。

### 練習例子（Examples）
- 例子 1：時間標準化  
  Input 格式：多種時間字串。  
  Logic：轉換為 ISO8601 含時區。  
  範例輸出：`{"ts":"2026-03-22T10:30:00+08:00"}`。
- 例子 2：去重複  
  Input 格式：`events: list[dict]`。  
  Logic：用 `student_id + chapter + ts + event_type` 當鍵去重。  
  範例輸出：`{"raw":1200,"clean":1134,"removed":66}`。
- 例子 3：空值清理  
  Input 格式：包含空 `student_id` 的事件。  
  Logic：剔除不可用紀錄並統計刪除數。  
  範例輸出：`{"dropped_null_student":12}`。

### 完成檢核
- clean 檔欄位一致，且無空主鍵。
- 清理摘要可說明刪除與保留數量。

## Chapter 3：入庫 PostgreSQL
### 章節目標
將 clean events 穩定寫入資料庫並可對帳。

### 語法與工具焦點
- SQL `INSERT`
- 批次寫入（Batch Insert）
- transaction / rollback

### 步驟指引
1. 建立目標資料表。
2. 以批次（如 500 筆）寫入。
3. 錯誤時 rollback 並記錄失敗批次。
4. 寫入後做 source vs DB 筆數對帳。

### 練習例子（Examples）
- 例子 1：批次寫入  
  Input 格式：`clean_events: list[dict]`。  
  Logic：每批 500 筆寫入，成功才 commit。  
  範例輸出：`{"inserted":1134,"failed":0}`。
- 例子 2：對帳報告  
  Input 格式：source count、DB count。  
  Logic：計算差異並輸出 warning。  
  範例輸出：`{"source":1134,"db":1134,"diff":0}`。
- 例子 3：錯誤重試  
  Input 格式：失敗批次清單。  
  Logic：最多重試 2 次，仍失敗則進 error queue。  
  範例輸出：`{"retry_success":8,"retry_failed":1}`。

### 完成檢核
- 寫入後資料筆數可對帳。
- 失敗批次有明確處理路徑。

## Chapter 4：可重複執行管線
### 章節目標
讓管線可參數化重跑，且每次產生可比較摘要。

### 語法與工具焦點
- `argparse`
- logging
- pipeline summary

### 步驟指引
1. 建立 `run_pipeline.py --date --source`。
2. 每步驟加上 log（extract/clean/load/report）。
3. 輸出 `pipeline_summary_YYYY-MM-DD.json`。
4. README 補上重跑與排錯指引。

### 練習例子（Examples）
- 例子 1：CLI 重跑  
  Input 格式：`--date 2026-03-22 --source events.json`。  
  Logic：依參數執行完整流程。  
  範例輸出：`{"status":"success","date":"2026-03-22"}`。
- 例子 2：摘要輸出  
  Input 格式：流程執行紀錄。  
  Logic：彙整成功/失敗/耗時。  
  範例輸出：`{"inserted":1134,"invalid":22,"duration_sec":18.2}`。
- 例子 3：一致性檢查  
  Input 格式：同參數兩次執行結果。  
  Logic：比對核心指標是否一致。  
  範例輸出：`{"same_result": true}`。

### 完成檢核
- 同參數可重跑且結果一致。
- 有完整 invalid log 與 summary 報告。

## 章節測驗規格（固定）
- 每章 5 題：3 題選擇題 + 2 題簡答題。
- 時間 10 分鐘內，錯題需對應複習連結。

## 最終完成檢核
- 管線可從 raw -> clean -> DB -> summary 完整執行。
- 能快速定位資料品質問題並回報。
