# SP2 詳細大綱（Detail Outline）

## 專案定位
- 專案：AI 會議驅動專案管理助手（AI Meeting-Driven PM Assistant）
- 角色：Junior AI-supported PM
- 目標：把會議紀錄轉成可執行任務與里程碑，並持續追蹤任務狀態。
- 最終輸出：會議結構化 JSON、任務管理 API、GitHub Issue 樣板、README。

## 開發引導（先做後做）
1. 先把輸入格式標準化（會議文字 -> 結構化資料）。
2. 再把資料轉成任務與里程碑。
3. 再提供可更新狀態的 API。
4. 最後輸出可展示的 Issue 樣板與文件。

## 章節大綱

### Chapter 1 會議資料結構化
- 做什麼：把會議內容整理成 `summary` 與 `action_items`。
- 怎麼做：切句、標註 owner、補 due_date、輸出 JSON schema。
- 產出：`meeting_structured.json`。
- 完成檢核：每個 action item 都有 `owner`、`task`、`due_date`。

### Chapter 2 任務拆解與里程碑
- 做什麼：將行動項目拆成可執行任務並分配週次。
- 怎麼做：依日期排序、按週切 Milestone、加上 `status` 欄位。
- 產出：`tasks.json`、`milestones.json`。
- 完成檢核：任務可被追蹤，且能對應到明確里程碑。

### Chapter 3 Flask API 與任務狀態更新
- 做什麼：提供前端可查詢/更新任務狀態的 API。
- 怎麼做：建立 `GET /api/tasks` 與 `POST /api/tasks/<id>/status`。
- 產出：`app.py` API 模組與測試範例。
- 完成檢核：狀態更新後重新查詢結果一致，錯誤狀態有 400 回應。

### Chapter 4 輸出 GitHub Issue 樣板
- 做什麼：把任務資料轉成可貼到 GitHub 的 issue 內容。
- 怎麼做：用模板字串批次輸出 `.md`。
- 產出：`issues/*.md`、使用說明 README。
- 完成檢核：隨機抽 3 筆 issue，內容欄位完整且格式一致。

## 作品集整理建議
- 展示 1：會議輸入與結構化輸出的前後對比。
- 展示 2：任務狀態更新 API 操作畫面。
- 展示 3：Issue 樣板檔案與實際貼上結果。
