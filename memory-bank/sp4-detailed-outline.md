# SP4 詳細大綱（Learning Analytics API and Dashboard）

## 專案情境（Scenario）
教學團隊需要即時看到學習進度與弱點，你需要把資料轉成可查詢 API，並在前端清楚呈現可行動洞察。

## 核心目標（Goals）
- 定義可落地的學習指標（完成率、錯題率、停留時間）。
- 建立穩定的 Flask 分析 API。
- 用 React Dashboard 呈現弱點與複習建議。

## Chapter 1：指標定義與 SQL 聚合
### 章節目標
把學習事件轉成可解讀指標，且 SQL 可驗證。

### 語法與工具焦點
- SQL `GROUP BY`、`COUNT`、`AVG`
- 指標定義文件化
- 小樣本比對

### 步驟指引
1. 定義每項指標公式與欄位來源。
2. 撰寫對應 SQL 聚合查詢。
3. 用小樣本手算驗證 SQL 結果。
4. 輸出 `metrics.sql` 與欄位說明。

### 練習例子（Examples）
- 例子 1：完成率  
  Input 格式：`learning_events`。  
  Logic：`completed / assigned` 聚合。  
  範例輸出：`{"chapter":"CH3","completion_rate":0.82}`。
- 例子 2：錯題率  
  Input 格式：`quiz_results`。  
  Logic：`wrong_answers / total_answers`。  
  範例輸出：`{"chapter":"CH3","wrong_rate":0.27}`。
- 例子 3：停留時間  
  Input 格式：事件起訖時間。  
  Logic：計算每章平均停留秒數。  
  範例輸出：`{"chapter":"CH3","avg_stay_sec":523}`。

### 完成檢核
- 每項指標都有 SQL 與欄位說明。
- 可用小樣本交叉驗證計算正確性。

## Chapter 2：Flask 分析 API
### 章節目標
提供前端可直接消費且格式一致的分析 API。

### 語法與工具焦點
- Flask Blueprint
- query params 驗證
- 統一回應 schema

### 步驟指引
1. 建立 `/api/metrics/overview`。
2. 接收 `chapter`、`date_from` 等查詢參數。
3. 回傳固定 JSON schema。
4. 非法參數回 400，空資料回空集合。

### 練習例子（Examples）
- 例子 1：總覽 API  
  Input 格式：`GET /api/metrics/overview?chapter=CH3`。  
  Logic：查詢三項指標並組裝回應。  
  範例輸出：`{"chapter":"CH3","completion_rate":0.82,"wrong_rate":0.27}`。
- 例子 2：日期篩選  
  Input 格式：`date_from=2026-03-01`。  
  Logic：只統計日期區間內資料。  
  範例輸出：`{"records": 412}`。
- 例子 3：錯誤處理  
  Input 格式：`chapter=BAD_ID`。  
  Logic：參數驗證失敗回 400。  
  範例輸出：`{"error":"invalid chapter"}`。

### 完成檢核
- 前端可穩定解析 API。
- API 對非法參數有一致錯誤回應。

## Chapter 3：React Dashboard 呈現
### 章節目標
讓使用者一眼看懂進度、弱點與優先複習章節。

### 語法與工具焦點
- `useEffect`、`fetch`
- state 管理
- loading/error UI

### 步驟指引
1. 建立三個區塊：總覽、弱點、複習建議。
2. 串接 API 並映射到卡片/圖表。
3. 支援 chapter filter 重新抓資料。
4. 加入 loading 與 error 顯示。

### 練習例子（Examples）
- 例子 1：指標卡片渲染  
  Input 格式：API JSON。  
  Logic：將指標值映射成卡片內容。  
  範例輸出：畫面顯示 `82%`、`27%`。
- 例子 2：條件切換重抓  
  Input 格式：使用者切換章節。  
  Logic：更新 query params 並重新 fetch。  
  範例輸出：切換 CH4 後顯示 CH4 指標。
- 例子 3：錯誤提示  
  Input 格式：API 500。  
  Logic：顯示錯誤訊息與重試按鈕。  
  範例輸出：`資料載入失敗，請重試`。

### 完成檢核
- 篩選切換時資料可同步更新。
- 使用者可辨識載入中與錯誤狀態。

## Chapter 4：複習建議連結
### 章節目標
把分析結果轉成可行動的複習建議。

### 語法與工具焦點
- if-rule 規則
- Conditional Rendering
- 深連結（Deep Link）

### 步驟指引
1. 定義弱點閾值（例如 `wrong_rate > 0.25`）。
2. 生成建議項目（章節、原因、連結）。
3. 在 UI 條件顯示複習按鈕。
4. 驗證高/中/低三種情境。

### 練習例子（Examples）
- 例子 1：閾值規則  
  Input 格式：`wrong_rate: float`。  
  Logic：高於閾值就回傳複習建議。  
  範例輸出：`{"need_review":true,"link":"/course/ch3/review"}`。
- 例子 2：建議排序  
  Input 格式：多章錯題率。  
  Logic：依錯題率降序排列優先順序。  
  範例輸出：`["CH3", "CH2", "CH5"]`。
- 例子 3：UI 導引  
  Input 格式：規則判斷結果。  
  Logic：條件渲染「前往複習」按鈕。  
  範例輸出：顯示 `前往 CH3 複習`。

### 完成檢核
- 弱點章節可一鍵導向複習內容。
- 建議規則可被解釋且可重現。

## 章節測驗規格（固定）
- 每章 5 題：3 題選擇題 + 2 題簡答題。
- 時間 10 分鐘內，錯題需對應複習連結。

## 最終完成檢核
- API 與 dashboard 指標一致。
- 使用者可依建議立即採取複習行動。
