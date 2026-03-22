# Learning Path 內部執行計畫（給 Assistant）

## 文件目的
- 將 `human-raw-ideas.md` 轉為可執行的工作基準。
- 用同一套規格，持續產出「清楚、簡潔、好學易懂」的 learning path 文件。

## 1) 明確目標（Goals）
- 提升學生參與度（Engagement）：內容難度需適中，避免過難或過簡單。
- 提供即時學習洞察（Real-time Insights）：可觀察進度、弱點、技能缺口。
- 達成動態調整（Adaptive Learning）：依章節表現提供複習與下一步建議。
- 在 4 週內完成可展示的 side projects 組合（至少 6 個，含整合專案）。

## 2) 執行方法（Execution Method）
1. 先對齊輸入
- 讀取 `human-raw-ideas.md` 與 `side-projects-outline.md`。
- 鎖定學生背景、時間限制、技術棧、角色優先順序。

2. 先定框架，再填內容
- 先寫專案層（Project-level）：每個 SP 的情境、目標、輸出。
- 再寫週次層（Week-level）：每週重點、交付物、檢核。
- 每個 SP 情境僅 1-2 句，避免冗長敘事。

3. 每個 SP 都用固定骨架
- 情境（Scenario）
- 核心目標（Objective）
- 主要任務（Tasks）
- 作品集輸出（Portfolio Deliverables）
- 驗收重點（Definition of Done）

4. 保持教學友善
- 用「先做什麼、再做什麼、最後得到什麼」的順序寫。
- 段落短、句子短、避免過多抽象詞。
- 若有專有名詞，優先使用台灣常見用法並附英文。

## 3) 需要記住（Must Remember）
- 語言規則：全程台灣繁體中文，重要名詞加英文括註。
- 預設工具：`uv` + `GitHub`。
- 技術棧：React + Flask + PostgreSQL + Python。
- 學生背景：資管系畢業，已有 C/C++、資料結構、HTML/CSS、R、SQL、Python 基礎。
- 學習節奏：4 週，每週約 12 小時，小型專案、可分段完成。
- 測驗規格：每章 5 題、10 分鐘內、錯題需有對應複習連結。
- 角色優先：AI-supported PM > Data Engineer > DB Manager。
- SP2 已簡化：不包含 risk log。
- SP5 規格：不要求 ERD。

## 4) 里程碑（Milestones）
- M0（起始對齊）
- 完成需求確認、專案清單、學習者設定。

- M1（Week 1）
- 完成 SP1（Python 基礎與專案啟動）+ SP2 MVP（會議摘要/行動項目）。

- M2（Week 2）
- 完成 SP2 擴充（任務拆解/里程碑/任務追蹤）+ SP3 資料管線初版。

- M3（Week 3）
- 完成 SP4（API + Dashboard）+ SP5（Schema/索引/SQL/效能調整）。

- M4（Week 4）
- 完成 SP6 整合、端到端展示、作品集整理（README + 截圖 + Demo 指引）。

## 5) 後續產文模板（每次可直接套用）
```md
## 專案名稱（Project Name）
- 情境（Scenario）：
- 核心目標（Objective）：
- 主要任務（Tasks）：
- 作品集輸出（Portfolio Deliverables）：
- 驗收重點（Definition of Done）：

## 週次安排（Week Plan）
- Week 1：
- Week 2：
- Week 3：
- Week 4：

## 學習檢核（Learning Check）
- 每章 5 題（3 選擇 + 2 簡答）
- 錯題對應複習連結
- 進度儀表板欄位：完成率、錯題熱區、建議複習順序
```
