# SP1 詳細學習路徑（Python Foundations and Project Bootstrap）

## 專案情境（Scenario）
你是剛加入小型產品團隊的新進工程師，任務是在一週內建立可重複使用的 Python 專案骨架，並交付可驗證的練習成果，供後續 SP2-SP6 直接沿用。

## 學習目標（Goals）
- 熟悉 Python 基礎語法（Syntax）、資料結構（Data Structures）、流程控制（Control Flow）。
- 能獨立撰寫函式（Functions）、模組（Modules）、類別（Class）。
- 能使用常用內建套件（Built-in Modules）與第三方套件（Third-party Packages）。
- 能用 `uv` 建立專案、管理依賴（Dependencies）、啟動 Flask 基礎服務。

## 章節規劃總覽（6 章）
- Chapter 1：語法與資料型別（2h）
- Chapter 2：流程控制與例外處理（2h）
- Chapter 3：函式與模組化（2h）
- Chapter 4：類別與物件導向（2h）
- Chapter 5：內建套件與資料處理（2h）
- Chapter 6：第三方套件、uv 與 Flask 專案啟動（2h）

---

## Chapter 1：語法與資料型別（Syntax and Data Types）
### 章節進度
- 0-30%：熟悉 `int`、`float`、`str`、`bool`、`list`、`dict`。
- 30-70%：完成變數命名、字串格式化（f-string）、基本輸入輸出。
- 70-100%：完成小練習並能解釋不同資料型別使用情境。

### 指引（Guide）
- 建立 `chapter1_basics.py`，練習宣告與型別轉換。
- 寫 3 個小練習：成績平均、字串清洗、字典查詢。
- 所有輸出加上清楚訊息，讓初學者可看懂。

### 練習例子（Examples）
- 例子 1：成績平均
  Input 格式：`scores: list[int]`，例如 `[78, 85, 92, 66]`。  
  Logic：先檢查清單不可為空，再用 `sum(scores) / len(scores)` 計算，最後四捨五入到小數點 2 位。  
  範例輸出：`{"avg_score": 80.25, "count": 4}`。
- 例子 2：字串清洗
  Input 格式：`raw_name: str`，例如 `"  amy  chen  "`。  
  Logic：`strip()` 去前後空白，將多重空白合併成單一空白，再轉 `title()`。  
  範例輸出：`"Amy Chen"`。
- 例子 3：字典查詢
  Input 格式：`student: dict`，例如 `{"name":"Amy","score":90}`。  
  Logic：用 `get()` 安全讀取欄位，缺值時回傳預設訊息，再組字串輸出。  
  範例輸出：`"Amy score=90"`。

### 學習方法（Learning Method）
- 先看範例再改寫（Example → Rewrite）。
- 每段程式先口述邏輯，再執行。
- 每 20 分鐘做一次快速回顧（寫下 3 個重點）。

### 完成檢驗（Definition of Done）
- 能正確使用至少 6 種資料型別。
- 小練習可執行且輸出合理結果。
- 能回答「list 與 dict 差異」與「何時做型別轉換」。

### 章節測驗（5 題）
1. 選擇題：哪個型別最適合儲存 `{"name": "Amy", "score": 90}`？
- A. list
- B. dict
- C. tuple
- D. set

2. 選擇題：`f"{name}-{score}"` 屬於哪種語法？
- A. 字串切片
- B. f-string
- C. 正規表達式
- D. 型別註解

3. 選擇題：以下何者可變（mutable）？
- A. tuple
- B. str
- C. list
- D. int

4. 簡答題：說明 `list` 與 `dict` 的主要差異與使用時機。

5. 簡答題：舉一個需要型別轉換（type casting）的實際情境。

---

## Chapter 2：流程控制與例外處理（Control Flow and Exceptions）
### 章節進度
- 0-30%：掌握 `if/elif/else`。
- 30-70%：掌握 `for`、`while`、`break`、`continue`。
- 70-100%：完成 `try/except/finally` 練習。

### 指引（Guide）
- 建立 `chapter2_flow.py`。
- 練習：分數等級判斷、清單篩選、重試輸入。
- 加入例外處理，避免程式因錯誤輸入中斷。

### 練習例子（Examples）
- 例子 1：分數等級判斷
  Input 格式：`score: int`（0~100）。  
  Logic：`if/elif/else` 切分 A/B/C/D，超出範圍標記 `invalid`。  
  範例輸出：`{"score": 85, "grade": "B"}`。
- 例子 2：及格清單篩選
  Input 格式：`scores: list[int]`。  
  Logic：用 `for` 走訪，`continue` 略過不及格，保留及格分數。  
  範例輸出：`{"passed": [78, 85, 92], "count": 3}`。
- 例子 3：安全輸入重試
  Input 格式：使用者輸入字串。  
  Logic：`while` + `try/except`，轉型失敗就提示重試，成功後 `break`。  
  範例輸出：`{"input_score": 88, "status": "accepted"}`。

### 學習方法（Learning Method）
- 每個流程圖先畫出來再寫程式。
- 對同一題寫兩種版本（例如 `for` 與 `while`）。
- 錯誤訊息先讀完，再修正。

### 完成檢驗（Definition of Done）
- 可以正確寫出條件分支與迴圈。
- 至少一題實作含 `try/except` 且能處理錯誤輸入。
- 能解釋 `break` 與 `continue` 差異。

### 章節測驗（5 題）
1. 選擇題：哪個關鍵字可直接跳出目前迴圈？
- A. pass
- B. skip
- C. break
- D. next

2. 選擇題：`finally` 的用途是什麼？
- A. 只在沒錯誤時執行
- B. 無論是否錯誤都會執行
- C. 只在 except 執行後執行
- D. 用來宣告變數

3. 選擇題：哪個情境最適合用 `while`？
- A. 已知次數的固定迴圈
- B. 逐一走訪清單
- C. 不確定次數直到條件成立
- D. 只執行一次

4. 簡答題：請說明 `try/except` 在輸入驗證中的作用。

5. 簡答題：請舉例 `continue` 適合的使用情境。

---

## Chapter 3：函式與模組化（Functions and Modularization）
### 章節進度
- 0-30%：理解函式定義、參數、回傳值。
- 30-70%：練習預設參數、關鍵字參數、型別註解。
- 70-100%：拆分檔案成模組並成功匯入。

### 指引（Guide）
- 建立 `chapter3_functions.py` 與 `utils/text_tools.py`。
- 把重複邏輯改成函式（至少 3 個）。
- 每個函式都寫 docstring，說明輸入與輸出。

### 練習例子（Examples）
- 例子 1：函式抽取
  Input 格式：重複文字清理流程。  
  Logic：抽成 `normalize_name(name: str) -> str`，保留單一職責。  
  範例輸出：`"Amy Chen"`。
- 例子 2：參數化函式
  Input 格式：`scores: list[int]`, `pass_score: int = 60`。  
  Logic：以 `pass_score` 計算及格數與比例，避免硬編碼。  
  範例輸出：`{"passed": 3, "pass_rate": 0.75}`。
- 例子 3：模組匯入
  Input 格式：`utils/text_tools.py` 的函式。  
  Logic：主程式 `import` 並呼叫，避免循環引用。  
  範例輸出：主程式可正確印出清理後內容。

### 學習方法（Learning Method）
- 小步重構（Refactor）而非一次重寫。
- 先寫測試案例，再補函式內容。
- 以「單一職責（Single Responsibility）」檢查函式是否過大。

### 完成檢驗（Definition of Done）
- 至少完成 5 個函式且可重複使用。
- 模組匯入成功，沒有循環引用（Circular Import）。
- 任一函式可用型別註解清楚描述輸入輸出。

### 章節測驗（5 題）
1. 選擇題：函式 `return` 的主要用途是？
- A. 印出訊息
- B. 結束程式
- C. 回傳結果給呼叫端
- D. 建立模組

2. 選擇題：哪種參數可以提高呼叫時可讀性？
- A. 位置參數
- B. 關鍵字參數
- C. 全域變數
- D. 魔法變數

3. 選擇題：模組化的主要好處是？
- A. 檔案變大
- B. 降低可讀性
- C. 提升重用與維護性
- D. 移除函式

4. 簡答題：什麼是「單一職責」？請用函式舉例。

5. 簡答題：你會如何命名一個用來清理使用者輸入的函式？

---

## Chapter 4：類別與物件導向（Classes and OOP Basics）
### 章節進度
- 0-30%：理解 class、object、attribute。
- 30-70%：實作 `__init__`、instance method。
- 70-100%：完成一個小型類別設計練習。

### 指引（Guide）
- 建立 `chapter4_oop.py`。
- 實作 `Task` 類別：`title`、`status`、`estimate_hours`。
- 加入方法：`mark_done()`、`to_dict()`。

### 練習例子（Examples）
- 例子 1：建立類別
  Input 格式：`title: str`, `estimate_hours: int`。  
  Logic：在 `__init__` 初始化欄位與 `status="todo"`。  
  範例輸出：`Task(title="Write API", status="todo")`。
- 例子 2：狀態更新
  Input 格式：`Task` 物件。  
  Logic：`mark_done()` 只更新狀態，不改其他欄位。  
  範例輸出：`{"title":"Write API","status":"done"}`。
- 例子 3：序列化
  Input 格式：`Task` 物件。  
  Logic：`to_dict()` 回傳可被 JSON 寫入的乾淨欄位。  
  範例輸出：`{"title":"Write API","status":"done","estimate_hours":3}`。

### 學習方法（Learning Method）
- 先寫資料欄位，再補行為方法。
- 用真實情境命名類別，避免抽象命名。
- 每次新增方法都立刻做一次呼叫測試。

### 完成檢驗（Definition of Done）
- 類別可成功建立多個物件。
- 物件狀態可被方法更新且邏輯正確。
- 能解釋何時用函式、何時用類別。

### 章節測驗（5 題）
1. 選擇題：`__init__` 的作用是？
- A. 刪除物件
- B. 建立物件時初始化屬性
- C. 匯入模組
- D. 讓函式回傳值

2. 選擇題：下列何者通常屬於 class 的「行為」？
- A. `title`
- B. `status`
- C. `mark_done()`
- D. `estimate_hours`

3. 選擇題：當資料與行為需要綁在一起時，優先考慮？
- A. 只用全域變數
- B. 類別（class）
- C. 只用 print
- D. 不需要結構

4. 簡答題：請描述 `Task` 類別至少三個欄位與用途。

5. 簡答題：說明物件（object）與類別（class）的關係。

---

## Chapter 5：內建套件與資料處理（Built-in Modules for Practical Tasks）
### 章節進度
- 0-30%：`pathlib` 檔案路徑操作。
- 30-70%：`json` 讀寫與資料交換。
- 70-100%：`datetime` 產生時間戳與簡易報表。

### 指引（Guide）
- 建立 `chapter5_builtin_modules.py`。
- 練習讀取 JSON、處理日期、輸出統計摘要。
- 產出 `output/summary.json`。

### 練習例子（Examples）
- 例子 1：路徑建立
  Input 格式：目標路徑字串，如 `"output/summary.json"`。  
  Logic：以 `Path` 建立資料夾，避免硬編碼系統路徑。  
  範例輸出：`output/` 建立成功。
- 例子 2：JSON 寫入
  Input 格式：`dict`（進度、時間、章節）。  
  Logic：`json.dumps(..., ensure_ascii=False)` 並以 UTF-8 存檔。  
  範例輸出：`{"chapter":"CH1","progress":40,"updated_at":"2026-03-22T18:30:00"}`。
- 例子 3：JSON 驗證
  Input 格式：已寫入的 `summary.json`。  
  Logic：讀回後檢查必要欄位，不足則回報缺漏。  
  範例輸出：`{"valid": true, "missing_fields": []}`。

### 學習方法（Learning Method）
- 每學一個模組就做一個實用任務。
- 優先看官方文件範例（官方 API 命名最準確）。
- 對 I/O 行為做「輸入-輸出對照表」。

### 完成檢驗（Definition of Done）
- 成功用 `pathlib` 建立資料夾與路徑。
- 能讀寫 JSON 檔且欄位正確。
- 可以輸出包含日期資訊的摘要結果。

### 章節測驗（5 題）
1. 選擇題：`Path("data") / "input.json"` 的用途是？
- A. 字串相加
- B. 路徑拼接
- C. 排序陣列
- D. 轉換型別

2. 選擇題：JSON 最常對應到 Python 哪個型別？
- A. dict
- B. set
- C. bytes
- D. complex

3. 選擇題：要取得目前時間常用哪個模組？
- A. random
- B. pathlib
- C. datetime
- D. typing

4. 簡答題：`pathlib` 比字串路徑處理好在哪裡？

5. 簡答題：請描述一個用 `json` 儲存學習紀錄的欄位設計。

---

## Chapter 6：第三方套件、uv 與 Flask 專案啟動（Third-party Packages, uv, and Flask Bootstrap）
### 章節進度
- 0-30%：用 `uv init` 建立專案。
- 30-70%：加入 Flask 與基本路由（Route）。
- 70-100%：完成一頁式進度檢核頁（Checklist Page）。

### 指引（Guide）
- 建立專案目錄與 `pyproject.toml`。
- 安裝 Flask、建立 `app.py`、設定首頁路由。
- 將 checklist JSON 資料顯示在頁面上。

### 練習例子（Examples）
- 例子 1：專案初始化
  Input 格式：命令列 `uv init` / `uv add flask`。  
  Logic：建立虛擬環境與依賴，確認 `pyproject.toml` 正確。  
  範例輸出：專案可成功 `uv sync`。
- 例子 2：路由建立
  Input 格式：HTTP `GET /`。  
  Logic：定義 `@app.route("/")`，回傳固定文字或 JSON。  
  範例輸出：`{"message":"Checklist Ready"}`。
- 例子 3：checklist 渲染
  Input 格式：`checklist.json`。  
  Logic：後端讀檔，前端渲染章節與任務清單。  
  範例輸出：畫面可看到章節、任務、進度條。

### 學習方法（Learning Method）
- 一次只新增一個功能並立即測試。
- 先讓功能可用，再做小幅美化。
- 用 commit 切小步驟（初始化、資料讀取、UI、動畫）。

### 完成檢驗（Definition of Done）
- 可用 `uv run flask --app app.py run` 啟動。
- 頁面可顯示章節與任務勾選。
- 完成任一章節時有完成提示或動畫。

### 章節測驗（5 題）
1. 選擇題：`uv` 在本專案主要用途是？
- A. 畫圖
- B. 套件與環境管理
- C. 資料庫管理
- D. CSS 編譯

2. 選擇題：Flask `@app.route("/")` 代表？
- A. 匯入外部 API
- B. 定義首頁路由
- C. 啟動資料庫
- D. 產生動畫

3. 選擇題：哪個檔案通常用來定義 Python 依賴？
- A. README.md
- B. index.html
- C. pyproject.toml
- D. .gitignore

4. 簡答題：請描述從 `uv init` 到啟動 Flask 的最短流程。

5. 簡答題：若你要提升 checklist 使用意願，會加哪 2 個 UI/UX 元素？

---

## SP1 總驗收（Final Check）
- 已完成 6 章練習程式與學習筆記。
- 每章測驗均完成並可自我訂正。
- Flask checklist app 可啟動，可操作，可顯示進度。
- 交付內容齊全：`README`、程式碼、測驗紀錄、操作截圖。
