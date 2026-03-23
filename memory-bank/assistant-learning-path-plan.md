# Learning Path 內部執行手冊（給 Assistant）

## 文件定位（Document Purpose）
- 本文件是我產出學習路徑時的唯一內部作業標準（Operating Standard）。
- 主要來源以 `human-raw-ideas.md` 為最高優先（Source of Truth），其餘文件用來補足實作細節與章節顆粒度。
- 目標是穩定產出「可自學、可執行、可展示、可追蹤」的 4 週學習路徑（Learning Path）。

## 一、來源優先順序（Source Priority）
1. `memory-bank/human-raw-ideas.md`
2. `memory-bank/side-projects-outline.md`
3. `memory-bank/sp1-detailed-outline.md` ~ `memory-bank/sp6-detailed-outline.md`
4. `memory-bank/side-projects-chapter-tutorials.md`
5. `checklist-app/README.md`（落地展示與驗收方式）

若文件之間衝突，優先採用：
- 人類需求 > 已寫大綱 > 既有模板。

## 二、北極星目標（North Star Goals）
1. 提升學習參與度（Engagement）
- 內容要有吸引力，允許加入笑話（Jokes）、備忘錄（Memos）、生活化情境。
- 任務難度維持「有挑戰但可完成」。

2. 建立即時學習洞察（Real-time Insights）
- 每章必須可追蹤完成率、錯題熱區、技能缺口（Skill Gaps）。
- 儀表板（Dashboard）欄位需一致可比較。

3. 形成可解釋的自適應學習（Adaptive Learning）
- 依章節測驗結果回推複習順序。
- 錯題必有對應複習超連結（Review Link）。

4. 在 4 週內完成 6 個可展示 Side Projects
- 含 SP1~SP6 與最終整合展示（End-to-End Demo）。

## 三、不可違反原則（Non-Negotiables）
- 語言：全程台灣繁體中文，重要名詞附英文括註。
- 技術棧（Tech Stack）：Python + Flask + React + PostgreSQL。
- 專案工具（Tooling）：`uv` + `GitHub`。
- 學習設定：4 週、每週 12 小時（總計約 48 小時）。
- 學習者背景：資管系畢業，具備 C/C++、資料結構、HTML/CSS、R、SQL、Python 基礎。
- 角色優先：AI-supported PM > Data Engineer > DB Manager。
- SP2 不納入 risk log；SP5 不要求 ERD。
- 每章固定 5 題測驗（3 選擇 + 2 簡答），10 分鐘內完成。

## 四、執行流程（Operating Workflow）

### Phase A：需求吸收（Intake）
- 先確認目標角色、可用時間、現有能力、輸出形式。
- 抽出「必做」與「可擴充」項目，避免範圍膨脹（Scope Creep）。

### Phase B：路徑編排（Path Design）
- 先排專案層（Project-level），再排週次層（Week-level），最後排章節層（Chapter-level）。
- 先定依賴順序：SP1 -> SP2 -> SP3 -> SP4 -> SP5 -> SP6。
- 確保每個 SP 都對應至少一個職涯能力（Job-ready Skill）。

### Phase C：章節產文（Content Authoring）
- 每章都必須同時提供：
1. 題目背景（Scenario）
2. 明確目標（Objective）
3. 輸入/輸出界定（Input/Output Contract）
4. 解題提示（Hints）
5. 可執行程式碼（Runnable Snippet）
6. 完成檢核（Definition of Done）
7. 章節測驗（5 題）
8. 錯題複習連結（Review Links）

### Phase D：品質檢核（Quality Gate）
- 難度校準：不可超出「已有基礎 + 當週 12h 可吸收」上限。
- 可執行性：範例程式碼需能合理運行，避免只給概念。
- 可展示性：每個 SP 要有可放入作品集（Portfolio）的交付物。
- 一致性：術語、欄位命名、章節格式保持一致。

### Phase E：回饋閉環（Feedback Loop）
- 依測驗結果更新複習順序與下一步建議。
- 若錯題集中，優先回補先備知識，不盲目前進。
- 每週維護進度儀表板（Dashboard Snapshot）。

## 五、4 週排程與里程碑（Milestones）

### Week 1（基礎 + PM 啟動）
- SP1 完整基礎（語法、函式、類別、內建模組、uv、Flask）。
- SP2 MVP：會議摘要 + 行動項目（Action Items）。
- 里程碑：可執行 checklist 與第一版任務流。

### Week 2（PM 深化 + Data Pipeline）
- SP2 任務拆解、里程碑、狀態追蹤 API。
- SP3：raw -> clean -> DB 的資料管線初版。
- 里程碑：可重跑（Re-runnable）且可對帳（Reconciliation）。

### Week 3（Analytics + DB Optimization）
- SP4：分析 API + React Dashboard。
- SP5：Schema、索引（Index）、核心 SQL、效能優化。
- 里程碑：看板與資料層指標一致、查詢效能有量化改善。

### Week 4（整合 + 展示）
- SP6：整合 SP2~SP5，完成推薦邏輯與前端整合頁。
- 準備 Demo script、README、截圖、展示路徑。
- 里程碑：新成員可依文件重現端到端流程。

## 六、固定驗收指標（Definition of Success）
- 進度：每週主要里程碑是否完成（On Track）。
- 品質：章節測驗平均正確率與錯題分布。
- 洞察：是否能指出弱點章節與建議複習順序。
- 成果：每個 SP 皆有可展示輸出（程式碼、README、截圖或 API 範例）。

## 七、難度調節規則（Difficulty Calibration）
- `accuracy < 0.60`：先複習基礎（review_basic）。
- `0.60 <= accuracy < 0.80`：維持當前章節強化練習（practice_more）。
- `accuracy >= 0.80`：進入下一章或進階任務（advance）。
- 若連續兩章低於 0.60：強制插入補強章節（Remedial Chapter）。

## 八、每章輸出最小標準（Minimum Shippable Learning Unit）
- 至少 1 個可執行程式片段。
- 至少 1 組清楚輸入輸出範例。
- 至少 1 個錯誤處理情境（Error Handling）。
- 至少 1 組可追蹤欄位（例如完成率、耗時、錯誤概念標籤）。
- 測驗與複習連結完整。

## 九、與 Checklist App 的對齊方式
- 預設以 `checklist-app` 做學習進度展示載體。
- 每個章節任務可映射到 checklist task。
- 進度追蹤以：
1. 任務勾選狀態（localStorage）
2. 每章完成徽章
3. 每章 5 題測驗預覽
- 若新增 SP 或章節，優先更新 checklist JSON，確保教學內容可視化。

## 十、何時需要向人類提問（Ask-When Rules）
僅在以下高風險情境提問，其他情況直接執行：
1. 目標角色優先順序被要求改動（影響整體章節依賴）。
2. 每週時數或總週數變更（影響整體路徑配置）。
3. 指定技術棧與既有限制衝突（例如移除 Flask 或 PostgreSQL）。
4. 評量規格改動（例如 5 題改為自適應題數）。

## 十一、標準產文模板（Reusable Template）
```md
## 專案名稱（Project Name）
- 情境（Scenario）：
- 角色能力對應（Role Mapping）：
- 核心目標（Objectives）：
- 主要任務（Tasks）：
- 作品集輸出（Portfolio Deliverables）：
- 驗收重點（Definition of Done）：

## 章節（Chapter）
- Input/Output：
- Steps：
- Hints：
- Runnable Snippet：
- Done Check：
- Quiz（5 題）：
- Review Links：

## 週次安排（Week Plan）
- Week 1：
- Week 2：
- Week 3：
- Week 4：

## 追蹤欄位（Tracking Fields）
- completion_rate
- quiz_accuracy
- weak_topics
- suggested_review_order
```

## 十二、執行心法（Execution Principles）
- 先可用，再完整；先可學，再優化。
- 每章都要讓學習者「知道做什麼、為什麼做、怎麼驗收」。
- 每週都要留下可見成果，維持成就感與完成動機。
