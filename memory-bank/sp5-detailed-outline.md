# SP5 詳細大綱（Detail Outline）

## 專案定位
- 專案：課程資料庫設計與管理（Curriculum Database Design and Management）
- 角色：Junior DB Manager
- 目標：在不畫 ERD 的前提下，完成可維護 schema 與查詢效能優化。
- 最終輸出：Schema SQL、索引策略、核心 SQL、效能對比報告。

## 開發引導（先做後做）
1. 先定 schema 與鍵值策略。
2. 再依查詢需求設計索引。
3. 再完成核心查詢 SQL。
4. 最後做 EXPLAIN 與優化紀錄。

## 章節大綱

### Chapter 1 Schema 與鍵值策略
- 做什麼：建立資料表與鍵值約束。
- 怎麼做：設定 PK/FK/UNIQUE，確保查詢結構可維護。
- 產出：`schema.sql`。
- 完成檢核：核心資料關聯可被正確查詢。

### Chapter 2 索引設計
- 做什麼：改善高頻查詢效能。
- 怎麼做：依 where/join 條件建立單欄與複合索引。
- 產出：`index_strategy.md`、索引 SQL。
- 完成檢核：至少 2 支查詢有量化改善。

### Chapter 3 核心 SQL 撰寫
- 做什麼：完成 API/報表需要的主要查詢。
- 怎麼做：使用 JOIN、CTE、彙總函式完成 3 類查詢。
- 產出：`core_queries.sql`。
- 完成檢核：查詢可直接被應用層使用。

### Chapter 4 效能檢查與最佳化
- 做什麼：找出慢查詢並優化。
- 怎麼做：用 EXPLAIN 檢查掃描策略，調整 SQL 或索引。
- 產出：`performance-report.md`。
- 完成檢核：報告含 before/after 執行時間與結論。

## 作品集整理建議
- 展示 1：Schema 與欄位設計理由。
- 展示 2：索引前後查詢時間對比。
- 展示 3：核心 SQL 範例與應用情境。
