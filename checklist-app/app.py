from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, render_template

BASE_DIR = Path(__file__).resolve().parent
CHECKLIST_FILE = os.getenv("CHECKLIST_FILE", "checklist.json")
DATA_PATH = BASE_DIR / "data" / CHECKLIST_FILE

app = Flask(__name__)


def load_checklist() -> dict[str, Any]:
    with DATA_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


@app.route("/")
def index() -> str:
    checklist = load_checklist()
    return render_template("index.html", checklist=checklist)


@app.route("/api/checklist")
def checklist_api() -> Any:
    return jsonify(load_checklist())


if __name__ == "__main__":
    app.run(debug=True)
