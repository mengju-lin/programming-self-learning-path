# SP4 詳細大綱（Detail Outline）

## 專案定位
- 專案：學習分析 API 與儀表板（Learning Analytics API and Dashboard）
- 角色：Junior Data Engineer
- 目標：提供可讀、可查詢、可視覺化的學習分析結果。
- 最終輸出：指標 SQL、分析 API、React Dashboard、複習建議連結。

## 開發引導（先做後做）
1. 先定義分析指標與計算方式。
2. 再建立 Flask API 封裝查詢。
3. 再做 Dashboard 視覺呈現。
4. 最後加入弱點章節複習導引。

## 章節大綱

### Chapter 1 指標定義與 SQL 聚合
- 做什麼：定義完成率、錯題率、停留時間。
- 怎麼做：撰寫 `GROUP BY`、`COUNT`、`AVG` 聚合 SQL。
- 產出：`metrics.sql`、欄位定義文件。
- 完成檢核：每個指標有可重現 SQL 與驗證範例。

### Chapter 2 Flask 分析 API
- 做什麼：提供可查詢分析資料的 API。
- 怎麼做：建立 `/api/metrics/*`，支援章節與日期參數。
- 產出：API 程式碼與回應 schema。
- 完成檢核：空資料、錯誤參數、正常查詢都可處理。

### Chapter 3 React Dashboard 呈現
- 做什麼：把 API 資料視覺化呈現給使用者。
- 怎麼做：建立卡片、圖表、弱點列表與篩選條件。
- 產出：Dashboard 頁面與互動畫面。
- 完成檢核：切換條件後資料可即時更新。

### Chapter 4 複習建議連結
- 做什麼：將弱點分析連到複習內容。
- 怎麼做：設定閾值規則，命中後顯示教材連結。
- 產出：規則模組與複習導引 UI。
- 完成檢核：弱點章節可一鍵導向對應內容。

## 作品集整理建議
- 展示 1：指標計算 SQL 與輸出結果。
- 展示 2：API 文件與實測回應。
- 展示 3：Dashboard 互動示範與複習連結流程。
