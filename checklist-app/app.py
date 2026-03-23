from __future__ import annotations

import html
import json
import os
from pathlib import Path
from typing import Any

from flask import Flask, abort, jsonify, render_template
from markupsafe import Markup

try:
    import markdown as markdown_lib
except ModuleNotFoundError:
    markdown_lib = None

BASE_DIR = Path(__file__).resolve().parent
CHECKLIST_FILE = os.getenv("CHECKLIST_FILE", "checklist.json")
DATA_PATH = BASE_DIR / "data" / CHECKLIST_FILE
MEMORY_BANK_DIR = BASE_DIR.parent / "memory-bank"
ALLOWED_DOCS = {
    "sp1-detailed-outline.md",
    "sp2-detailed-outline.md",
    "sp3-detailed-outline.md",
    "sp4-detailed-outline.md",
    "sp5-detailed-outline.md",
    "sp6-detailed-outline.md",
}
DOC_ALIASES = {
    "sp1-detailed-outline": "sp1-detailed-outline.md",
    "sp1-detailed-outline.md": "sp1-detailed-outline.md",
    "sp2-detailed-outline": "sp2-detailed-outline.md",
    "sp3-detailed-outline": "sp3-detailed-outline.md",
    "sp4-detailed-outline": "sp4-detailed-outline.md",
    "sp5-detailed-outline": "sp5-detailed-outline.md",
    "sp6-detailed-outline": "sp6-detailed-outline.md",
}

app = Flask(__name__)


def load_checklist() -> dict[str, Any]:
    with DATA_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


def render_markdown_content(markdown_text: str) -> str:
    if markdown_lib is None:
        escaped = html.escape(markdown_text)
        return f"<pre>{escaped}</pre>"

    return markdown_lib.markdown(
        markdown_text,
        extensions=["fenced_code", "tables", "sane_lists", "toc"],
        output_format="html5",
    )


@app.route("/")
def index() -> str:
    checklist = load_checklist()
    return render_template("index.html", checklist=checklist)


@app.route("/api/checklist")
def checklist_api() -> Any:
    return jsonify(load_checklist())


@app.route("/docs/<path:doc_name>")
def serve_doc(doc_name: str) -> Any:
    safe_name = Path(doc_name).name
    if safe_name != doc_name:
        abort(404)
    target_name = DOC_ALIASES.get(safe_name, safe_name)
    if target_name not in ALLOWED_DOCS:
        abort(404)
    doc_path = MEMORY_BANK_DIR / target_name
    if not doc_path.is_file():
        abort(404)
    markdown_text = doc_path.read_text(encoding="utf-8")
    rendered_doc = render_markdown_content(markdown_text)
    doc_title = target_name.removesuffix(".md")
    return render_template(
        "doc.html",
        doc_title=doc_title,
        doc_filename=target_name,
        rendered_doc=Markup(rendered_doc),
    )


if __name__ == "__main__":
    app.run(debug=True)
