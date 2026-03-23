# SP3 詳細學習路徑：學習事件資料管線（Learning Event Data Pipeline）

## 專案情境（Scenario）
你是 Junior Data Engineer。產品已累積大量學習事件資料，但格式混亂、品質不一。你的任務是建立可重跑、可對帳、可查錯的資料管線。

## 專案目標（Goals）
1. 定義事件格式並攔截髒資料。
2. 完成清理、轉換、入庫全流程。
3. 產出可維運的 pipeline 摘要報告。

## 預期產出（Deliverables）
- `invalid_events.jsonl`
- `clean_events.json`
- PostgreSQL 寫入腳本
- `pipeline_summary_YYYY-MM-DD.json`

## 建議節奏（12 小時）
- Chapter 1：2.5h
- Chapter 2：3h
- Chapter 3：3h
- Chapter 4：3.5h

## 章節 I/O 實作合約（Implementation Contract）
### CH1：Event Schema 與資料驗證
- Input Schema：
```json
{"event_id":"e1","student_id":"S01","chapter":"CH3","event_type":"quiz_submit","ts":"2026-03-22T10:30:00+08:00"}
```
- Output Schema：
```json
{"valid": true, "error_reason": null}
```
- Invalid Output：
```json
{"valid": false, "error_reason": "missing chapter"}
```

### CH2：清理與轉換
- Input Schema：
```json
{"events":[{"student_id":"S01","chapter":"CH3","event_type":"quiz_submit","ts":"2026/03/22 10:30"}]}
```
- Output Schema：
```json
{
  "clean_events": [{"student_id":"S01","chapter":"CH3","event_type":"quiz_submit","ts":"2026-03-22T10:30:00+08:00"}],
  "summary": {"raw": 1, "clean": 1, "removed": 0}
}
```
- Constraints：去重 key 固定 `student_id+chapter+ts+event_type`。

### CH3：PostgreSQL 批次入庫
- Input Schema：
```json
{"clean_events":[{"student_id":"S01","chapter":"CH3","event_type":"quiz_submit","ts":"2026-03-22T10:30:00+08:00"}], "batch_size": 500}
```
- Output Schema：
```json
{"inserted": 1134, "failed_batches": 0, "source_count": 1134, "db_count": 1134, "diff": 0}
```
- Constraints：任一批次失敗需 rollback，且記錄 batch id。

### CH4：CLI 重跑與摘要報告
- Input Schema：
```json
{"date":"2026-03-22","source":"events.json","timezone":"Asia/Taipei"}
```
- Output Schema：
```json
{"status":"success","inserted":1134,"invalid":22,"duration_sec":18.2,"same_result_on_rerun":true}
```
- Constraints：同參數重跑時 `inserted/invalid` 不得漂移。

---

## Chapter 1：Event Schema 與資料驗證
### 章節目標
讓資料在進入管線前先被驗證，避免垃圾進垃圾出（GIGO）。

### Input / Output
- Input：raw events（JSON / JSONL）
- Output：`valid_events`、`invalid_events.jsonl`

### 學習步驟
1. 定義必要欄位：`student_id`、`chapter`、`event_type`、`ts`。
2. 寫 `validate_event(event)`。
3. 驗證失敗事件落檔（含錯誤原因）。
4. 產出驗證統計摘要。

### 自學提示
- 欄位驗證至少包含：存在、型別、格式。
- 錯誤訊息要給人看得懂，才方便排查。

### AI 半手動提示
```text
請幫我寫 validate_event(event) 函式，
要檢查必填欄位、timestamp 格式，
並回傳 {valid, error_reason}。
```

### 完成檢核
- 所有缺欄位/格式錯誤事件都能被擋下。
- invalid log 至少記錄 event_id 與 error_reason。

### 10 分鐘測驗（5 題）
1. MCQ：Schema 驗證的主要目的？
2. MCQ：timestamp 格式錯誤應怎麼處理？
3. MCQ：invalid log 必要欄位是？
4. SA：為何不能直接把 raw data 入庫？
5. SA：你會如何命名錯誤碼？

錯題複習連結：
- `#chapter-1event-schema-與資料驗證`

---

## Chapter 2：清理與轉換（Cleaning and Transformation）
### 章節目標
把可用資料統一成分析友善格式。

### Input / Output
- Input：`valid_events`
- Output：`clean_events.json` + 清理摘要

### 學習步驟
1. 標準化欄位命名（snake_case）。
2. 統一時間格式（ISO8601 + timezone）。
3. 去重複（deduplication）。
4. 清除空主鍵資料並統計刪除數。

### 自學提示
- 先定 dedupe key，再寫 dedupe 程式。
- 清理結果要可回推：知道刪了什麼、為什麼刪。

### AI 半手動提示
```text
請把 events 清理成乾淨資料：
1) 欄位命名統一
2) 時間轉 ISO8601
3) 依 student_id+chapter+ts+event_type 去重
4) 輸出 clean 與 summary
```

### 完成檢核
- clean 檔欄位一致，無空主鍵。
- summary 可清楚說明保留/刪除比率。

### 10 分鐘測驗（5 題）
1. MCQ：dedupe key 常見組合？
2. MCQ：ISO8601 的主要好處？
3. MCQ：空主鍵資料是否保留？
4. SA：清理摘要應包含哪些指標？
5. SA：為何時間一定要帶時區？

錯題複習連結：
- `#chapter-2清理與轉換cleaning-and-transformation`

---

## Chapter 3：PostgreSQL 批次入庫（Batch Load）
### 章節目標
把 clean events 穩定寫入資料庫且可對帳。

### Input / Output
- Input：`clean_events`
- Output：insert report + reconciliation report

### 學習步驟
1. 建立 target table。
2. 批次寫入（例如每批 500）。
3. 失敗批次 rollback 並記錄。
4. 對比 source vs DB 筆數。

### 自學提示
- 先正確再快，先 commit/rollback 正常再調效能。
- 對帳要自動化，不要靠肉眼比對。

### AI 半手動提示
```text
請產生 PostgreSQL 批次寫入腳本，
要求 transaction 保護、失敗 rollback、
最後輸出 source_count/db_count/diff。
```

### 完成檢核
- 批次入庫失敗可追蹤。
- 對帳結果可重現且 diff 可解釋。

### 10 分鐘測驗（5 題）
1. MCQ：transaction 的核心價值？
2. MCQ：rollback 應在何時觸發？
3. MCQ：入庫後第一個檢查項目？
4. SA：batch size 會影響什麼？
5. SA：如何處理重試仍失敗批次？

錯題複習連結：
- `#chapter-3postgresql-批次入庫batch-load`

---

## Chapter 4：CLI 重跑與摘要報告（Re-runnable Pipeline）
### 章節目標
讓管線可重跑、可比較、可維運。

### Input / Output
- Input：`--date`、`--source`
- Output：`pipeline_summary_YYYY-MM-DD.json`

### 學習步驟
1. 寫 `run_pipeline.py`（extract -> clean -> load -> report）。
2. 補 logging（每步驟開始/結束/耗時）。
3. 產生 summary 檔。
4. 補 README：重跑與排錯流程。

### 自學提示
- 每次執行都輸出一致欄位，才可做長期追蹤。
- summary 是給人快速讀，不要太冗長。

### AI 半手動提示
```text
請產生 run_pipeline.py，支援 --date --source，
輸出 summary JSON（inserted/invalid/duration/status），
並加上清楚 logging。
```

### 完成檢核
- 同參數重跑結果一致。
- 新成員可看 README 重跑成功。

### 10 分鐘測驗（5 題）
1. MCQ：為何要支援 CLI 參數？
2. MCQ：pipeline summary 最必要欄位？
3. MCQ：logging 的最小粒度？
4. SA：如何驗證「可重跑」？
5. SA：你會怎麼設計排錯順序？

錯題複習連結：
- `#chapter-4cli-重跑與摘要報告re-runnable-pipeline`

---

## SP3 最終驗收（Final Acceptance）
- raw -> clean -> DB -> summary 全流程可執行。
- 失敗資料可追蹤，成功資料可對帳。
- 管線可被重跑且結果可比較。
