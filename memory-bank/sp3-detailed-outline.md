# SP3 詳細大綱（Detail Outline）

## 專案定位
- 專案：學習事件資料管線（Learning Event Data Pipeline）
- 角色：Junior Data Engineer
- 目標：把原始事件資料清理、轉換、入庫，建立可重複執行管線。
- 最終輸出：事件 schema、clean data、入庫腳本、pipeline CLI、執行報告。

## 開發引導（先做後做）
1. 先定義事件 schema 與驗證規則。
2. 再做清理與轉換。
3. 再寫入 PostgreSQL 並對帳。
4. 最後封裝成可重跑 CLI。

## 章節大綱

### Chapter 1 事件 Schema 定義
- 做什麼：定義欄位與合法格式。
- 怎麼做：建立 `validate_event()`，對缺漏欄位與格式錯誤回報。
- 產出：`event_schema.md`、驗證腳本。
- 完成檢核：無效資料可被攔截並寫入錯誤日誌。

### Chapter 2 清理與轉換
- 做什麼：把 raw events 轉成分析可用資料。
- 怎麼做：欄位標準化、時間統一、去重複、補缺值策略。
- 產出：`clean_events.json` 或 `clean_events.csv`。
- 完成檢核：clean 檔欄位一致、主鍵無空值。

### Chapter 3 入庫 PostgreSQL
- 做什麼：把 clean data 寫入資料庫並驗證數量。
- 怎麼做：批次 insert、交易保護、source/target 對帳。
- 產出：`load_to_postgres.py`、資料表初始化 SQL。
- 完成檢核：寫入筆數與來源一致，失敗時可 rollback。

### Chapter 4 可重複執行管線
- 做什麼：讓資料流程可參數化重跑。
- 怎麼做：建立 CLI（日期/檔案參數）與 logging。
- 產出：`run_pipeline.py`、執行摘要報表。
- 完成檢核：同參數重跑結果一致，流程可重現。

## 作品集整理建議
- 展示 1：raw -> clean 的欄位轉換對照表。
- 展示 2：入庫成功與筆數對帳截圖。
- 展示 3：CLI 一鍵重跑示範。
