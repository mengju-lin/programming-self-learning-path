# Side Projects 章節級語法教學（SP1-SP6）

## 使用方式
- 本文件是「怎麼做」版本：每個 SP 都有章節、語法焦點（Syntax Focus）、步驟（Steps）、完成檢核（Done Check）。
- 章節設計為小步驟，可直接轉成學習單或 checklist。
- 重要名詞以繁中為主，附英文（English）方便查文件。

---

## SP1 - Python 基礎與專案啟動實戰

### Chapter 1：變數、型別、基本輸出
- 語法焦點：`int`、`float`、`str`、`bool`、`list`、`dict`、`f-string`
- 步驟：
1. 建立 `chapter1_basics.py`。
2. 宣告 6 種型別變數並印出型別：`print(type(x))`。
3. 用 `f-string` 組合學習者名稱與分數。
4. 寫 1 個字典（`dict`）與 1 個串列（`list`）的查詢範例。
- 範例語法：
```python
student = {"name": "Amy", "score": 90}
msg = f"{student['name']} score={student['score']}"
print(msg)
```
- 完成檢核：可解釋 `list`（索引）與 `dict`（鍵值）差異。

### Chapter 2：條件與迴圈
- 語法焦點：`if/elif/else`、`for`、`while`、`break`、`continue`
- 步驟：
1. 寫成績等級判斷函式。
2. 用 `for` 走訪成績清單，過濾低分。
3. 用 `while` 反覆要求輸入，直到合法。
4. 在迴圈中示範 `break` 與 `continue`。
- 範例語法：
```python
for score in scores:
    if score < 60:
        continue
    passed.append(score)
```
- 完成檢核：可指出何時適合 `while`（次數不固定）。

### Chapter 3：函式、參數、回傳值
- 語法焦點：`def`、預設參數（Default Params）、關鍵字參數（Keyword Args）、`return`
- 步驟：
1. 把重複邏輯抽成 3 個函式。
2. 每個函式補上 docstring。
3. 加入型別註解（Type Hints）。
4. 以測試輸入驗證回傳值。
- 範例語法：
```python
def normalize_name(name: str, strip_space: bool = True) -> str:
    return name.strip().title() if strip_space else name.title()
```
- 完成檢核：函式職責單一，可被其他檔案重用。

### Chapter 4：Class 與物件
- 語法焦點：`class`、`__init__`、instance method、狀態更新
- 步驟：
1. 建立 `Task` 類別（`title`、`status`、`estimate_hours`）。
2. 實作 `mark_done()` 更新狀態。
3. 實作 `to_dict()` 供 JSON 輸出。
4. 建立 3 個物件測試彼此獨立。
- 範例語法：
```python
class Task:
    def __init__(self, title: str, estimate_hours: int):
        self.title = title
        self.estimate_hours = estimate_hours
        self.status = "todo"
```
- 完成檢核：可說明何時用函式、何時用 class。

### Chapter 5：內建套件與 I/O
- 語法焦點：`pathlib`、`json`、`datetime`
- 步驟：
1. 用 `Path` 建立 `output/`。
2. 把學習進度寫入 JSON。
3. 加入時間戳（timestamp）。
4. 重新讀取 JSON，驗證欄位格式。
- 範例語法：
```python
from pathlib import Path
import json
from datetime import datetime

payload = {"updated_at": datetime.now().isoformat(), "progress": 40}
Path("output").mkdir(exist_ok=True)
Path("output/summary.json").write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
```
- 完成檢核：成功完成 JSON round-trip（寫入再讀回）。

### Chapter 6：uv、第三方套件、Flask 啟動
- 語法焦點：`uv init`、`uv add flask`、`@app.route`
- 步驟：
1. `uv init` 建專案。
2. `uv add flask` 安裝 Flask。
3. 建立 `app.py`，回傳首頁文字。
4. `uv run flask --app app.py run` 啟動。
- 範例語法：
```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Checklist Ready"
```
- 完成檢核：首頁可開啟，狀態碼 200。

---

## SP2 - AI 會議驅動專案管理助手

### Chapter 1：會議資料結構化
- 語法焦點：字串處理（String Parsing）、`dict` schema、list comprehension
- 步驟：
1. 定義會議輸入欄位：`date`、`participants`、`notes`。
2. 先做規則式切句（句號/換行）。
3. 把句子分類成「摘要」與「行動項目（Action Items）」。
4. 輸出成 `meeting_structured.json`。
- 範例語法：
```python
actions = [s for s in sentences if s.startswith("[Action]")]
```
- 完成檢核：輸出 JSON 至少含 `summary`、`action_items`、`owner`。

### Chapter 2：任務拆解與里程碑
- 語法焦點：函式拆分、排序（sorting）、日期處理（datetime）
- 步驟：
1. 建立 `build_tasks()` 將 action item 拆為任務。
2. 依截止日排序。
3. 以每週切分里程碑（Milestone）。
4. 產生 `tasks.md` 與 `milestones.json`。
- 範例語法：
```python
tasks.sort(key=lambda x: x["due_date"])
```
- 完成檢核：任務皆含 `owner`、`due_date`、`status`。

### Chapter 3：Flask API 與任務狀態更新
- 語法焦點：Flask `GET/POST`、request JSON、狀態更新
- 步驟：
1. 建立 `/api/tasks`（GET）。
2. 建立 `/api/tasks/<id>/status`（POST）。
3. 驗證傳入狀態值是否合法。
4. 回傳更新後任務。
- 範例語法：
```python
status = request.json.get("status")
if status not in {"todo", "doing", "done"}:
    return {"error": "invalid status"}, 400
```
- 完成檢核：前端可更新任務狀態且重整後一致。

### Chapter 4：輸出 GitHub Issue 樣板
- 語法焦點：模板字串（Template String）、檔案輸出
- 步驟：
1. 設計 issue 樣板欄位。
2. 任務逐筆轉換成 markdown。
3. 輸出 `issues/` 多個 `.md`。
4. README 記錄使用流程。
- 完成檢核：可直接複製貼上到 GitHub Issue。

---

## SP3 - 學習事件資料管線

### Chapter 1：事件 Schema 定義
- 語法焦點：Typed Dict（或 dataclass）、欄位驗證
- 步驟：
1. 定義事件欄位：`student_id`、`chapter`、`event_type`、`ts`。
2. 建立 `validate_event()`。
3. 對遺漏欄位做錯誤處理。
4. 建立測試樣本檔。
- 完成檢核：無效事件可被攔截並記錄。

### Chapter 2：清理與轉換
- 語法焦點：pandas 基本操作（若使用）、或純 Python map/filter
- 步驟：
1. 讀取 raw events。
2. 標準化欄位命名與時間格式。
3. 去重複資料（deduplicate）。
4. 產出 clean events。
- 範例語法：
```python
clean = [e for e in events if e.get("student_id")]
```
- 完成檢核：clean 檔案欄位一致、無空主鍵。

### Chapter 3：入庫 PostgreSQL
- 語法焦點：SQL `INSERT`、批次寫入、交易（transaction）
- 步驟：
1. 建立資料表。
2. 用批次寫入提升效率。
3. 錯誤時 rollback。
4. 寫入後查筆數對帳。
- 完成檢核：source 與 DB 筆數可對上。

### Chapter 4：可重複執行管線
- 語法焦點：CLI 參數（argparse）、logging
- 步驟：
1. 建立 `run_pipeline.py --date 2026-03-22`。
2. 每步驟加 log。
3. 輸出執行摘要。
4. README 寫重跑規則。
- 完成檢核：同參數重跑結果一致。

---

## SP4 - 學習分析 API 與儀表板

### Chapter 1：指標定義與 SQL 聚合
- 語法焦點：`GROUP BY`、`COUNT`、`AVG`
- 步驟：
1. 定義 3 指標：完成率、錯題率、停留時間。
2. 撰寫對應 SQL。
3. 以小樣本驗證計算正確。
4. 整理 `metrics.sql`。
- 完成檢核：每個指標都有明確 SQL 與欄位說明。

### Chapter 2：Flask 分析 API
- 語法焦點：Blueprint、查詢參數（query params）
- 步驟：
1. 建 `/api/metrics/overview`。
2. 接收 `chapter`、`date_from`。
3. 回傳固定 JSON schema。
4. 處理空資料情境。
- 完成檢核：前端可穩定解析 API。

### Chapter 3：React Dashboard 呈現
- 語法焦點：`useEffect`、`fetch`、state 管理
- 步驟：
1. 建立指標卡片。
2. 顯示章節弱點列表。
3. 讓篩選條件可重抓 API。
4. 加入載入與錯誤狀態。
- 完成檢核：切換章節可即時更新資料。

### Chapter 4：複習建議連結
- 語法焦點：條件渲染（Conditional Rendering）
- 步驟：
1. 設計錯題率閾值規則。
2. 命中閾值時顯示複習連結。
3. 連結到對應教材段落。
4. 測試三種情境（高/中/低）。
- 完成檢核：弱點章節可直接點擊複習。

---

## SP5 - 課程資料庫設計與管理（不含 ERD）

### Chapter 1：Schema 與鍵值策略
- 語法焦點：`PRIMARY KEY`、`FOREIGN KEY`、`UNIQUE`
- 步驟：
1. 依查詢需求先列欄位。
2. 設定主鍵與外鍵。
3. 定義必要唯一限制。
4. 建立 migration SQL。
- 完成檢核：核心查詢不需多餘 join 才能取資料。

### Chapter 2：索引設計
- 語法焦點：`CREATE INDEX`、複合索引（Composite Index）
- 步驟：
1. 先找高頻查詢欄位。
2. 為 where/join 條件建索引。
3. 對比建索引前後查詢時間。
4. 記錄索引成本。
- 完成檢核：至少 2 個查詢有明顯改善。

### Chapter 3：核心 SQL 撰寫
- 語法焦點：`JOIN`、`CTE`、window function（可選）
- 步驟：
1. 寫學習進度查詢。
2. 寫章節錯題彙總。
3. 寫週報表 SQL。
4. 加入參數化查詢。
- 完成檢核：3 支 SQL 可直接供 API 使用。

### Chapter 4：效能檢查與最佳化
- 語法焦點：`EXPLAIN`、慢查詢分析
- 步驟：
1. 執行 `EXPLAIN` 看掃描策略。
2. 找 full scan 根因。
3. 調整索引或 SQL 結構。
4. 記錄 before/after 指標。
- 完成檢核：有量化效能改善紀錄。

---

## SP6 - 自適應學習路徑整合專案

### Chapter 1：模組整合與資料流
- 語法焦點：API contract、JSON schema 對齊
- 步驟：
1. 列出 SP2-SP5 輸入輸出。
2. 定義統一欄位命名。
3. 做轉接層（adapter）。
4. 寫整合 smoke test。
- 完成檢核：端到端流程可跑通一次。

### Chapter 2：難度適配規則
- 語法焦點：規則引擎（if-rule）、分數區間映射
- 步驟：
1. 定義能力分數區間。
2. 對應推薦難度與下一章。
3. 寫 `recommend_next()`。
4. 驗證邊界值。
- 範例語法：
```python
if accuracy < 0.6:
    return "review_basic"
elif accuracy < 0.8:
    return "practice"
return "advance"
```
- 完成檢核：不同分數輸入有穩定推薦輸出。

### Chapter 3：前端整合頁面
- 語法焦點：多區塊 UI 組合、狀態同步
- 步驟：
1. 顯示進度、弱點、推薦下一步。
2. 串接整合 API。
3. 支援重新計算建議。
4. 顯示最後更新時間。
- 完成檢核：使用者可看懂「為何推薦這一步」。

### Chapter 4：驗收與展示
- 語法焦點：E2E 測試腳本、README 結構
- 步驟：
1. 定義展示腳本（Demo Script）。
2. 準備最小可重現資料。
3. 一鍵啟動流程說明。
4. 補上回顧（Retrospective）。
- 完成檢核：新成員可依 README 在短時間內重現。

---

## 建議搭配輸出
- 每個 SP 章節都可拆成 `checklist.json` 的 `tasks`。
- 每章至少保留：語法焦點、步驟、完成檢核。
- 若時間不足，優先完成「可執行 + 可驗證 + 可展示」三件事。
