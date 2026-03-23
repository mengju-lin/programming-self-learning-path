# Side Projects 全新總綱（4 週版）

## 0. 規劃依據（Planning Basis）
- 主要依據：`memory-bank/human-raw-ideas.md`
- 內部執行基準：`memory-bank/assistant-learning-path-plan.md`
- 補充參考：既有 SP1-SP6 詳綱（只保留可用結構，不受舊內容限制）

## 1. 學習路徑總目標（Program Goals）
- 提升學習參與度（Engagement）：每章都要有可做、可看到成果、可回饋的任務。
- 建立即時洞察（Real-time Insights）：可追蹤章節進度、錯題熱區、技能缺口（Skill Gaps）。
- 難度適配（Adaptive Difficulty）：依測驗結果調整下一步，避免過難或過簡單。
- 4 週完成可展示作品集（Portfolio）：至少 6 個 Side Projects（SP1~SP6）。

## 2. 學習者設定（Learner Profile）
- 背景：資管系畢業，具備 C/C++、資料結構（Data Structures）、HTML/CSS、R、SQL、Python 基礎。
- 目標職能：Junior AI-supported PM、Junior Data Engineer、Junior DB Manager。
- 時間：4 週，每週約 12 小時（總計約 48 小時）。

## 3. 全域規格（Global Constraints）
- 語言：台灣繁體中文為主，重要名詞附英文。
- 技術棧（Tech Stack）：Python、Flask、React、PostgreSQL。
- 工具鏈（Toolchain）：`uv`、`GitHub`。
- 每章固定 10 分鐘週檢核（Weekly 10-min Check）：
1. 5 題（3 題選擇 + 2 題簡答）
2. 錯題需附章節複習超連結（Review Link）
- 每個 SP 都要可手動完成，也要支援半手動（AI Auto-completion）完成。

## 4. 教學設計原則（Design Principles）
- 先做出最小可運作成果（Minimum Runnable Outcome），再擴充。
- 每章都寫清楚輸入（Input）/輸出（Output）界定。
- 每章至少提供一個解題提示（Hint）與一個可執行片段（Runnable Snippet）。
- 內容吸引力：每個 SP 至少一個 Attention Hook（例如情境梗、短笑話、提醒 Memo）。
- 品質控管：內容需符合學習標準（Standards）且貼近學生經驗（Student Experience）。

## 5. Side Projects 全覽（SP1~SP6）

### SP1 - Python 學習任務啟動器（Python Learning Task Starter）
- 角色對應：全角色共同基礎
- 專案目標：
1. 完成 Python 基礎與模組化能力重整。
2. 建立可重複沿用的 `uv` 專案骨架。
3. 做出可勾選章節任務的 Flask 小工具。
- 章節大綱：
1. 型別與資料結構（Types and Data Structures）
2. 流程控制與例外（Control Flow and Exceptions）
3. 函式與類別（Functions and Classes）
4. `uv` + Flask 啟動與 checklist API
- 交付物（Deliverables）：
1. 可執行 Python 練習集
2. `pyproject.toml` 與模組化目錄
3. 基礎 checklist 服務（Flask）

### SP2 - AI 會議任務轉換器（AI Meeting-to-Execution Converter）
- 角色對應：Junior AI-supported PM
- 專案目標：
1. 將會議文字轉為摘要、行動項目（Action Items）與里程碑（Milestones）。
2. 建立任務追蹤 API 與 GitHub Issue 樣板輸出。
3. 加入一個「會議重點 Memo 區」提高可讀性與參與感。
- 章節大綱：
1. 會議資料結構化（Structuring Notes）
2. 任務拆解與里程碑規劃（Task Breakdown）
3. 任務狀態 API（Task Status API）
4. GitHub Issue 匯出（Issue Export）
- 交付物：
1. `meeting_structured.json`
2. `tasks.json`、`milestones.json`
3. `issues/*.md`

### SP3 - 學習事件資料管線（Learning Event Data Pipeline）
- 角色對應：Junior Data Engineer
- 專案目標：
1. 建立學習事件（Learning Events）Schema 與驗證流程。
2. 完成清理（Cleaning）/轉換（Transformation）/入庫（Load）。
3. 讓管線可參數化重跑且可對帳。
- 章節大綱：
1. Event Schema 與驗證
2. 清理與轉換規則
3. PostgreSQL 批次入庫
4. CLI 重跑與摘要報告
- 交付物：
1. `invalid_events.jsonl`
2. `clean_events.json`
3. `pipeline_summary_YYYY-MM-DD.json`

### SP4 - 學習洞察 API 與儀表板（Learning Insights API and Dashboard）
- 角色對應：Junior Data Engineer（偏產品應用）
- 專案目標：
1. 產出完成率、錯題率、停留時間三大指標。
2. 提供 Flask API 供前端查詢。
3. 以 React Dashboard 顯示進度、弱點、複習入口。
- 章節大綱：
1. 指標定義與 SQL 聚合
2. 分析 API 設計
3. React Dashboard 呈現
4. 複習連結與提醒卡（含 humor/memo 文案）
- 交付物：
1. `metrics.sql`
2. `/api/metrics/*` 文件
3. Dashboard 截圖與示範流程

### SP5 - 課程資料庫調校專案（Curriculum DB Tuning Project）
- 角色對應：Junior DB Manager
- 專案目標：
1. 在不畫 ERD 前提下完成可維護 Schema。
2. 建立索引（Index）策略改善高頻查詢。
3. 交付可量化效能報告。
- 章節大綱：
1. Schema 與鍵值策略（Keys and Constraints）
2. 索引設計與驗證
3. 核心 SQL（進度、錯題、週報）
4. `EXPLAIN` 與效能報告
- 交付物：
1. `schema.sql`
2. `indexes.sql`
3. 效能比較報告（before/after）

### SP6 - 自適應學習整合系統（Adaptive Learning Integrator）
- 角色對應：AI-supported PM + Data Engineer + DB Manager（整合）
- 專案目標：
1. 串接 SP2~SP5 資料與服務。
2. 建立可解釋推薦規則（Recommendation Rules）。
3. 完成端到端展示（End-to-End Demo）。
- 章節大綱：
1. 模組介面對齊與 adapter
2. 難度適配規則（Difficulty Rules）
3. 單頁整合看板（Unified Dashboard）
4. E2E 驗收與展示腳本
- 交付物：
1. 整合 API
2. 推薦邏輯文件
3. Demo Script + README

## 6. 四週排程（4-Week Execution Plan）

### Week 1（12h）
- SP1 全部完成。
- SP2 Chapter 1~2 完成（從會議到可追蹤任務）。
- 週里程碑：可展示「輸入會議紀錄 -> 產生任務草案」。

### Week 2（12h）
- SP2 Chapter 3~4 完成。
- SP3 Chapter 1~2 完成。
- 週里程碑：任務狀態可更新，資料清理流程可執行。

### Week 3（12h）
- SP3 Chapter 3~4 完成。
- SP4 Chapter 1~3 完成。
- SP5 Chapter 1 啟動。
- 週里程碑：有可查詢 API 與初版 Dashboard。

### Week 4（12h）
- SP5 完成（Chapter 2~4）。
- SP6 全部完成。
- 週里程碑：完成整合展示與作品集整理。

## 7. 共通章節規格（Chapter Standard）
每章都必須包含：
1. 章節目標（Objective）
2. 題目說明（Problem Statement）
3. 輸入/輸出界定（Input/Output Definition）
4. 解題提示（Hints）
5. 可執行程式碼（Runnable Snippet）
6. 10 分鐘 5 題檢核（含錯題複習連結）
7. 驗收條件（Definition of Done）

## 8. 進度儀表板規格（Progress Dashboard Spec）
- 必要欄位：
1. `completed_topics`
2. `completion_rate`
3. `quiz_accuracy`
4. `weak_topics`
5. `suggested_review_order`
6. `last_updated_at`
- 顯示要求：
1. 章節完成狀態
2. 錯題熱區
3. 下一步建議與原因

## 9. 驗收與作品集要求（Portfolio and Acceptance）
- 每個 SP 必備：
1. README（情境、啟動方式、成果說明）
2. 程式碼可執行
3. 至少 1 張操作截圖或 API 範例
4. 章節測驗結果摘要
- 最終（SP6）必備：
1. 5 分鐘 Demo Script
2. 新成員重現步驟
3. 三角色能力對照說明（PM / DE / DBM）

## 10. 風險與備援（Risks and Fallback）
- 若時間不足：優先保留「可執行 + 可驗證 + 可展示」。
- 若 API 與資料欄位不一致：先做 adapter，不直接改全系統。
- 若測驗正確率連兩章低於 60%：插入補強章節再往下走。

## 11. 本版完成定義（Definition of Completion for This Outline）
- 已提供完整 SP1~SP6 規劃、目標與章節大綱。
- 已定義 4 週節奏、統一章節規格、測驗規格與儀表板欄位。
- 已對齊 `human-raw-ideas.md` 與 `assistant-learning-path-plan.md`。
