from __future__ import annotations

import html
import re
from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "design-spec.md"
OUTPUT = ROOT / "output" / "pdf" / "viewbrush-design-spec.pdf"

FONT_PATHS = [
    Path("/Library/Fonts/Arial Unicode.ttf"),
    Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf"),
]


def register_font() -> str:
    for path in FONT_PATHS:
        if path.exists():
            font_name = "ArialUnicodeViewBrush"
            pdfmetrics.registerFont(TTFont(font_name, str(path)))
            return font_name
    raise FileNotFoundError("No compatible Unicode font found for PDF generation.")


def inline_markup(text: str) -> str:
    escaped = html.escape(text.strip())
    escaped = re.sub(
        r"`([^`]+)`",
        r'<font backColor="#EEE5D8" textColor="#31271F">\1</font>',
        escaped,
    )
    return escaped


def page_chrome(canvas, doc) -> None:
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#F6F0E7"))
    canvas.rect(0, 0, width, height, fill=1, stroke=0)

    canvas.setStrokeColor(colors.HexColor("#DCCFBC"))
    canvas.setLineWidth(0.8)
    canvas.line(doc.leftMargin, height - 20 * mm, width - doc.rightMargin, height - 20 * mm)
    canvas.line(doc.leftMargin, 16 * mm, width - doc.rightMargin, 16 * mm)

    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.HexColor("#8F816C"))
    canvas.drawString(doc.leftMargin, 11 * mm, "ViewBrush Design Spec")
    canvas.drawRightString(width - doc.rightMargin, 11 * mm, str(canvas.getPageNumber()))
    canvas.restoreState()


def build_styles(font_name: str):
    styles = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=styles["Title"],
            fontName=font_name,
            fontSize=26,
            leading=32,
            textColor=colors.HexColor("#241C16"),
            spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=styles["BodyText"],
            fontName=font_name,
            fontSize=11,
            leading=16,
            textColor=colors.HexColor("#6A6155"),
            spaceAfter=4,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=styles["Heading1"],
            fontName=font_name,
            fontSize=18,
            leading=24,
            textColor=colors.HexColor("#241C16"),
            spaceBefore=12,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=styles["Heading2"],
            fontName=font_name,
            fontSize=14,
            leading=19,
            textColor=colors.HexColor("#2D241B"),
            spaceBefore=8,
            spaceAfter=6,
        ),
        "h3": ParagraphStyle(
            "H3",
            parent=styles["Heading3"],
            fontName=font_name,
            fontSize=11.5,
            leading=16,
            textColor=colors.HexColor("#5F564A"),
            spaceBefore=6,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=styles["BodyText"],
            fontName=font_name,
            fontSize=10.5,
            leading=17,
            textColor=colors.HexColor("#53493E"),
            spaceAfter=5,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=styles["BodyText"],
            fontName=font_name,
            fontSize=10.5,
            leading=17,
            leftIndent=12,
            firstLineIndent=-10,
            bulletIndent=0,
            textColor=colors.HexColor("#53493E"),
            spaceAfter=4,
        ),
        "number": ParagraphStyle(
            "Number",
            parent=styles["BodyText"],
            fontName=font_name,
            fontSize=10.5,
            leading=17,
            leftIndent=14,
            firstLineIndent=-12,
            textColor=colors.HexColor("#53493E"),
            spaceAfter=4,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=styles["BodyText"],
            fontName=font_name,
            fontSize=9,
            leading=14,
            textColor=colors.HexColor("#8F816C"),
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
    }


def build_story(styles: dict[str, ParagraphStyle]):
    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    story = [
        Spacer(1, 24),
        Paragraph("ViewBrush Design Spec", styles["title"]),
        Paragraph("Design System and Visual Direction", styles["subtitle"]),
        Paragraph(f"Generated from {SOURCE.name}", styles["meta"]),
        Paragraph(f"Export date: {date.today().isoformat()}", styles["meta"]),
        Spacer(1, 18),
    ]

    for raw in lines:
        line = raw.rstrip()
        if not line.strip():
            story.append(Spacer(1, 4))
            continue

        if line.startswith("# "):
            continue
        if line.startswith("## "):
            story.append(Spacer(1, 6))
            story.append(Paragraph(inline_markup(line[3:]), styles["h1"]))
            continue
        if line.startswith("### "):
            story.append(Paragraph(inline_markup(line[4:]), styles["h2"]))
            continue
        if re.match(r"^\d+\.\s+", line):
            story.append(Paragraph(inline_markup(line), styles["number"]))
            continue
        if line.startswith("- "):
            story.append(Paragraph(f"• {inline_markup(line[2:])}", styles["bullet"]))
            continue
        if line.endswith("：") or line.endswith(":"):
            story.append(Paragraph(inline_markup(line), styles["h3"]))
            continue

        story.append(Paragraph(inline_markup(line), styles["body"]))

    return story


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    font_name = register_font()
    styles = build_styles(font_name)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=28 * mm,
        bottomMargin=22 * mm,
        title="ViewBrush Design Spec",
        author="OpenAI Codex",
    )
    story = build_story(styles)
    doc.build(story, onFirstPage=page_chrome, onLaterPages=page_chrome)


if __name__ == "__main__":
    main()
