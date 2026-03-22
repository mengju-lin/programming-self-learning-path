# Learning Path Checklist App

簡易的 Flask + Tailwind checklist 應用，可追蹤任一 SP 的章節任務完成狀態。

## 功能
- 顯示目前 checklist 檔案中的章節與每章任務。
- 可勾選每個任務，並即時計算章節與整體進度。
- 每章完成時顯示完成徽章與小動畫。
- 測驗題目預覽（每章 5 題）。
- 使用 `localStorage` 保存勾選狀態（瀏覽器端）。

## 技術
- Python + Flask
- `uv` 管理環境與依賴
- Tailwind CSS（CDN）

## 啟動方式
```bash
cd checklist-app
uv sync
uv run flask --app app.py --debug run
```

啟動後開啟：`http://127.0.0.1:5000`

## API
- `GET /api/checklist`：回傳 checklist JSON。

## 資料來源
- 只使用一份：`checklist-app/data/checklist.json`

若要切換到其他 SP，直接覆蓋 `checklist-app/data/checklist.json`，不需維護第二份副本。

## 可選設定
- `CHECKLIST_FILE`：預設為 `checklist.json`。
- 範例：`CHECKLIST_FILE=sp2-checklist.json uv run flask --app app.py --debug run`
