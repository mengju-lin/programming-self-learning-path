# SP6 詳細大綱（Adaptive Learning Path Integrator）

## 專案情境（Scenario）
展示日前你需要整合 SP2-SP5，交付可操作的端到端學習路徑系統，讓使用者看到進度、弱點與下一步建議。

## 核心目標（Goals）
- 串接前端、後端、資料庫與 AI 產出流程。
- 建立可解釋的難度適配與複習推薦規則。
- 完成可重現的 Demo 流程與 README。

## Chapter 1：模組整合與資料流
### 章節目標
讓 SP2-SP5 資料在同一 schema 下可穩定流動。

### 語法與工具焦點
- API contract
- JSON schema 對齊
- adapter pattern

### 步驟指引
1. 列出 SP2-SP5 的輸入輸出欄位。
2. 定義統一欄位命名與型別。
3. 建 adapter 轉接層。
4. 寫整合 smoke test。

### 練習例子（Examples）
- 例子 1：欄位對齊  
  Input 格式：多服務 JSON。  
  Logic：把 `studentId`、`student_id` 統一為 `student_id`。  
  範例輸出：`{"student_id":"S01","chapter":"CH3","wrong_rate":0.27}`。
- 例子 2：型別修正  
  Input 格式：字串型分數 `"0.82"`。  
  Logic：轉 float 並驗證範圍 0~1。  
  範例輸出：`{"accuracy":0.82}`。
- 例子 3：轉接層驗證  
  Input 格式：異質回應 payload。  
  Logic：透過 adapter 產生統一 schema。  
  範例輸出：整合 API 可直接取值。

### 完成檢核
- 整合流程不再依賴手動欄位修正。
- smoke test 可通過核心資料流。

## Chapter 2：難度適配規則
### 章節目標
依學習表現自動給出下一步建議，且可解釋。

### 語法與工具焦點
- if-rule 規則引擎
- 分數區間映射
- 邊界值測試

### 步驟指引
1. 定義分數區間與建議動作。
2. 實作 `recommend_next(metrics)`。
3. 補上推薦原因文字。
4. 測試邊界值與異常輸入。

### 練習例子（Examples）
- 例子 1：分數分層推薦  
  Input 格式：`accuracy: float`。  
  Logic：低分複習、中分練習、高分進階。  
  範例輸出：`{"next_step":"review_basic"}`。
- 例子 2：邊界值測試  
  Input 格式：`accuracy=0.6 / 0.8`。  
  Logic：確保臨界值輸出一致。  
  範例輸出：`0.6 -> practice`, `0.8 -> advance`。
- 例子 3：推薦理由  
  Input 格式：`wrong_rate`、`stay_time`。  
  Logic：組合弱點原因到說明字串。  
  範例輸出：`{"reason":"CH3 錯題率偏高，先複習基礎題"}`。

### 完成檢核
- 不同輸入可得到穩定且可解釋建議。
- 邊界值與異常值都有測試覆蓋。

## Chapter 3：前端整合頁面
### 章節目標
讓使用者在單一頁面理解現況與下一步。

### 語法與工具焦點
- React 組件整合
- 狀態同步
- 重新分析互動

### 步驟指引
1. 建立進度、弱點、建議三區塊。
2. 串接整合 API 並統一狀態管理。
3. 加入「重新分析」按鈕。
4. 顯示最後更新時間與載入狀態。

### 練習例子（Examples）
- 例子 1：三區塊視圖  
  Input 格式：`progress/weakness/recommendation` JSON。  
  Logic：分區渲染並保持一致更新。  
  範例輸出：畫面同時顯示進度、弱點、下一步。
- 例子 2：重新計算建議  
  Input 格式：使用者點擊 `重新分析`。  
  Logic：重新呼叫 API 並替換建議區塊資料。  
  範例輸出：新推薦內容立即更新。
- 例子 3：推薦原因展開  
  Input 格式：`recommendation.reason`。  
  Logic：提供展開/收合讓使用者理解規則。  
  範例輸出：顯示 `為何建議先複習 CH3`。

### 完成檢核
- 使用者可理解「系統推薦什麼、為什麼」。
- 重新分析後畫面資料可同步刷新。

## Chapter 4：驗收與展示
### 章節目標
完成可重現、可展示、可交接的端到端成果。

### 語法與工具焦點
- E2E 測試腳本
- Demo script
- README 指南

### 步驟指引
1. 定義 E2E 主流程（登入→學習→分析→推薦）。
2. 準備最小可重現資料。
3. 撰寫 5 分鐘 demo script。
4. README 補一鍵啟動與常見問題。

### 練習例子（Examples）
- 例子 1：E2E 主流程測試  
  Input 格式：測試帳號與樣本資料。  
  Logic：跑完整主流程並記錄結果。  
  範例輸出：E2E 測試通過報告。
- 例子 2：Demo script  
  Input 格式：展示步驟清單。  
  Logic：固定敘事順序，確保每次可重現。  
  範例輸出：可在 5 分鐘內穩定展示。
- 例子 3：新成員重現  
  Input 格式：README 指令流程。  
  Logic：新成員照文件操作並紀錄阻塞點。  
  範例輸出：`首次重現成功，耗時 18 分鐘`。

### 完成檢核
- 主流程可端到端執行。
- README 可讓新成員快速重現。

## 章節測驗規格（固定）
- 每章 5 題：3 題選擇題 + 2 題簡答題。
- 時間 10 分鐘內，錯題需對應複習連結。

## 最終完成檢核
- 完成可展示的整合系統。
- 可清楚說明資料流、推薦規則與產品價值。
