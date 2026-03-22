## 需求明確化（已確認）

- Side projects 數量：至少 6 個（可擴充）
- 角色優先順序：AI-supported PM > Data Engineer > DB Manager
- 大綱層級：同時提供「專案層」與「週次層」
- 技術堆疊：React + Flask + PostgreSQL + Python + uv + GitHub
- 每個專案都要可展示作品集（Portfolio）
- 每章固定 5 題週檢核測驗（10 分鐘內）
- 本階段先不提供評分規準（Rubric）

## 詳細 Outline 導覽

- SP1 詳細學習路徑：`sp1-detailed-learning-path.md`
- SP2 詳細大綱：`sp2-detailed-outline.md`
- SP3 詳細大綱：`sp3-detailed-outline.md`
- SP4 詳細大綱：`sp4-detailed-outline.md`
- SP5 詳細大綱：`sp5-detailed-outline.md`
- SP6 詳細大綱：`sp6-detailed-outline.md`

## 預計 Side Projects（第二版）

### SP1 - Python 基礎與專案啟動實戰（Python Foundations and Project Bootstrap）
- 角色對應：全路徑共同基礎
- 情境：你剛加入小型產品團隊，需要在一週內建立可維護的 Python 專案骨架，供後續專案直接沿用。
- 核心目標：熟悉基礎語法、函式（Functions）、類別（Class）、常用內建套件與第三方套件，並完成 uv 專案初始化與模組化。
- 作品集輸出：基礎練習程式集、`pyproject.toml`、專案結構 README

### SP2 - AI 會議驅動專案管理助手（AI Meeting-Driven PM Assistant）
- 角色對應：Junior AI-supported PM
- 情境：你接手每週產品會議，必須把會議紀錄快速轉成可執行任務，並追蹤執行進度。
- 核心目標：以原 SP2 為主，整合會議摘要、行動項目（Action Items）、任務拆解（Task Breakdown）與里程碑（Milestone），理解 AI 工具如何融入 AI-supported PM workflow。
- 作品集輸出：會議輸入範例、AI 產出頁面、任務追蹤看板、專案總結 README

### SP3 - 學習事件資料管線（Learning Event Data Pipeline）
- 角色對應：Junior Data Engineer
- 情境：產品團隊希望知道學生實際學習行為，你需要把零散事件資料轉成可分析格式。
- 核心目標：收集學習行為資料，進行清理（Cleaning）與轉換（Transformation）後入庫。
- 作品集輸出：ETL 流程圖、資料表樣本、資料品質檢查結果

### SP4 - 學習分析 API 與儀表板（Learning Analytics API and Dashboard）
- 角色對應：Junior Data Engineer
- 情境：教學團隊需要即時看到學習進度與弱點，以便調整內容與複習節奏。
- 核心目標：以 Flask 提供統計 API，React 呈現學習進度與章節弱點。
- 作品集輸出：API 文件、Dashboard 截圖、使用情境 Demo

### SP5 - 課程資料庫設計與管理（Curriculum Database Design and Management）
- 角色對應：Junior DB Manager
- 情境：後端查詢開始變慢且需求增加，你需要優化資料庫結構與查詢效率。
- 核心目標：完成 Schema 設計、正規化（Normalization）、索引（Index）與查詢最佳化（Query Optimization）。
- 作品集輸出：Schema SQL、索引策略說明、效能比較紀錄

### SP6 - 自適應學習路徑整合專案（Adaptive Learning Path Integrator）
- 角色對應：AI-supported PM + Data Engineer + DB Manager（整合）
- 情境：團隊要在展示日呈現端到端流程，你需要把前面模組整合成可操作產品。
- 核心目標：整合前述模組，提供學生個人化學習路徑與章節複習建議。
- 作品集輸出：端到端 Demo、系統架構圖、專案回顧（Retrospective）

## 專案層第一層大綱（Project-Level Outline）

### SP1 Python 基礎與專案啟動實戰
- 情境摘要：建立可重複使用的 Python 專案起手式
- 練習語法、資料結構、函式與例外處理
- 練習 class、模組拆分與匯入管理
- 使用內建套件（如 `pathlib`、`json`、`datetime`）處理常見任務
- 安裝與使用第三方套件，完成 uv 專案管理
- 作品集整理與說明

### SP2 AI 會議驅動專案管理助手
- 情境摘要：把會議紀錄轉為執行計畫並追蹤進度
- 匯入會議文字（Meeting Notes）
- AI 產出摘要、行動項目
- 自動整理任務拆解與里程碑建議
- 更新任務狀態並連結到下一週執行計畫
- 匯出 GitHub Issue 樣板與作品集說明

### SP3 學習事件資料管線
- 情境摘要：把原始事件資料變成可分析資料
- 定義事件格式（Event Schema）
- 建立資料收集與清理流程
- 寫入 PostgreSQL 並驗證品質
- 製作可重複執行的管線腳本
- 作品集整理與說明

### SP4 學習分析 API 與儀表板
- 情境摘要：提供教學團隊可即時判讀的學習數據
- 設計統計指標（完成率、錯題率、章節停留）
- 建立 Flask API（查詢與彙總）
- React Dashboard 呈現圖表與學習進度
- 章節弱點與複習建議連結
- 作品集整理與說明

### SP5 課程資料庫設計與管理
- 情境摘要：在需求擴張時維持查詢穩定與效能
- 設計關聯、鍵（Key）與索引策略
- 撰寫核心 SQL（查詢、彙總、報表）
- 進行效能檢查與查詢最佳化
- 調整 Schema 以支援分析與整合需求
- 作品集整理與說明

### SP6 自適應學習路徑整合專案
- 情境摘要：完成可展示的學習路徑產品原型
- 整合前端、後端、資料庫與 AI 模組
- 建立「難度適配」與「複習建議」規則
- 實作章節進度儀表板與提醒
- 測試主要使用流程（Happy Path）
- 作品集整理與說明

## 週次層第一層大綱（Week-Level Outline, 4 週 x 12 小時）

### Week 1（基礎打底 + AI PM 啟動）
- SP1 開發：Python 語法、functions、class 與套件使用
- SP1 開發：建立 uv 專案結構、模組化與基本測試
- SP2 啟動：會議摘要、行動項目 MVP
- 每章測驗機制骨架（固定 5 題）

### Week 2（AI PM 深化 + Data Engineer 啟動）
- SP2 擴充：任務拆解、里程碑、任務狀態追蹤
- SP3 開發：事件資料管線與入庫
- 串接 SP2 輸出的任務與進度資料
- 每章測驗：錯題回傳章節複習連結

### Week 3（資料服務 + DB 管理）
- SP4 開發：分析 API 與基礎 Dashboard
- SP5 開發：Schema、索引與核心 SQL（不含 ERD）
- 調整 SP3/SP4/SP5 的資料模型一致性
- 每章測驗：加入題目難度分層

### Week 4（整合與展示）
- SP6 整合：完成端到端主流程
- 補齊 Dashboard、複習建議、進度追蹤
- 整理 6 個專案作品集（README + 截圖 + Demo 指引）
- 最終驗收：一鍵啟動、可重現、可展示

## 測驗與學習回饋規格（固定採用）

- 每章固定 5 題（10 分鐘內完成）
- 題型配置：3 題選擇題 + 2 題簡答題
- 錯題回饋：每題提供對應章節複習連結
- 紀錄欄位：章節、答對率、耗時、錯誤概念標籤
- 儀表板顯示：完成章節數、錯題熱區、建議複習順序

## 可擴充專案（若時間有餘）

- SP7 - Prompt 版本管理器（Prompt Versioning Tracker）
- SP8 - SQL 練習自動出題器（SQL Quiz Generator）
- SP9 - 學習路徑 A/B 測試器（Learning Path A/B Tester）
