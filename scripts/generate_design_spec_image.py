from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import re

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "design-spec.md"
OUTPUT = ROOT / "output" / "image" / "piktura-design-spec.png"

FONT_CANDIDATES = [
    Path("/System/Library/Fonts/Hiragino Sans GB.ttc"),
    Path("/Library/Fonts/Arial Unicode.ttf"),
    Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf"),
]

WIDTH = 1600
SIDE_PADDING = 118
TOP_PADDING = 104
BOTTOM_PADDING = 88
CONTENT_WIDTH = WIDTH - SIDE_PADDING * 2

BG = "#F6F0E7"
TEXT = "#241C16"
BODY = "#53493E"
MUTED = "#8F816C"
LINE = "#DCCFBC"
ACCENT = "#31271F"


@dataclass
class BlockStyle:
    font: ImageFont.FreeTypeFont
    color: str
    line_height: int
    spacing_after: int
    indent: int = 0
    bullet: str | None = None


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    raise FileNotFoundError("No usable font found for image generation.")


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    if not text:
        return [""]

    lines: list[str] = []
    current = ""

    for char in text:
        if char == "\n":
            lines.append(current.rstrip())
            current = ""
            continue

        candidate = current + char
        bbox = draw.textbbox((0, 0), candidate, font=font)
        if bbox[2] - bbox[0] <= max_width or not current:
            current = candidate
        else:
            lines.append(current.rstrip())
            current = char

    if current:
        lines.append(current.rstrip())

    return lines


def parse_blocks() -> list[tuple[str, str]]:
    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    blocks: list[tuple[str, str]] = [("cover_title", "Piktura Design Spec"), ("cover_subtitle", "Design System and Visual Direction")]

    for line in lines:
        stripped = line.rstrip()
        if not stripped:
            blocks.append(("spacer", ""))
            continue
        if stripped.startswith("# "):
            continue
        if stripped.startswith("## "):
            blocks.append(("h1", stripped[3:]))
            continue
        if stripped.startswith("### "):
            blocks.append(("h2", stripped[4:]))
            continue
        if re.match(r"^\d+\.\s+", stripped):
            blocks.append(("number", stripped))
            continue
        if stripped.startswith("- "):
            blocks.append(("bullet", stripped[2:]))
            continue
        if stripped.endswith("：") or stripped.endswith(":"):
            blocks.append(("label", stripped))
            continue
        blocks.append(("body", stripped))

    return blocks


def build_styles() -> dict[str, BlockStyle]:
    return {
        "cover_title": BlockStyle(load_font(64), TEXT, 82, 20),
        "cover_subtitle": BlockStyle(load_font(24), BODY, 36, 56),
        "h1": BlockStyle(load_font(42), TEXT, 58, 22),
        "h2": BlockStyle(load_font(28), ACCENT, 40, 14),
        "label": BlockStyle(load_font(20), BODY, 32, 8),
        "body": BlockStyle(load_font(22), BODY, 38, 12),
        "bullet": BlockStyle(load_font(22), BODY, 38, 8, indent=26, bullet="•"),
        "number": BlockStyle(load_font(22), BODY, 38, 8, indent=14),
    }


def render() -> Path:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    styles = build_styles()
    blocks = parse_blocks()
    temp_image = Image.new("RGB", (WIDTH, 100), BG)
    temp_draw = ImageDraw.Draw(temp_image)

    layout: list[tuple[str, BlockStyle, list[str]]] = []
    total_height = TOP_PADDING + 180

    for kind, text in blocks:
        if kind == "spacer":
            total_height += 20
            continue

        style = styles[kind]
        content_width = CONTENT_WIDTH - style.indent - (28 if style.bullet else 0)
        lines = wrap_text(temp_draw, text, style.font, content_width)
        layout.append((kind, style, lines))
        total_height += len(lines) * style.line_height + style.spacing_after

    total_height += BOTTOM_PADDING

    image = Image.new("RGB", (WIDTH, total_height), BG)
    draw = ImageDraw.Draw(image)

    y = TOP_PADDING
    draw.line((SIDE_PADDING, y, WIDTH - SIDE_PADDING, y), fill=LINE, width=2)
    y += 72

    cover_title = styles["cover_title"]
    title_text = "Piktura Design Spec"
    title_width = draw.textbbox((0, 0), title_text, font=cover_title.font)[2]
    draw.text(((WIDTH - title_width) / 2, y), title_text, fill=cover_title.color, font=cover_title.font)
    y += cover_title.line_height

    cover_subtitle = styles["cover_subtitle"]
    subtitle_text = "Design System and Visual Direction"
    subtitle_width = draw.textbbox((0, 0), subtitle_text, font=cover_subtitle.font)[2]
    draw.text(((WIDTH - subtitle_width) / 2, y), subtitle_text, fill=cover_subtitle.color, font=cover_subtitle.font)
    y += 54

    meta_font = load_font(18)
    meta_1 = "Generated from design-spec.md"
    meta_2 = "Image export"
    for meta in (meta_1, meta_2):
      meta_width = draw.textbbox((0, 0), meta, font=meta_font)[2]
      draw.text(((WIDTH - meta_width) / 2, y), meta, fill=MUTED, font=meta_font)
      y += 30

    y += 46

    for kind, style, lines in layout:
        if kind == "cover_title" or kind == "cover_subtitle":
            continue

        x = SIDE_PADDING
        if kind == "h1":
            y += 14

        for index, line in enumerate(lines):
            line_x = x
            if style.bullet:
                if index == 0:
                    draw.text((x, y), style.bullet, fill=style.color, font=style.font)
                line_x = x + 28
            elif kind == "number":
                line_x = x + style.indent

            draw.text((line_x, y), line, fill=style.color, font=style.font)
            y += style.line_height

        y += style.spacing_after

    draw.line((SIDE_PADDING, total_height - 54, WIDTH - SIDE_PADDING, total_height - 54), fill=LINE, width=2)
    footer_font = load_font(18)
    draw.text((SIDE_PADDING, total_height - 36), "Piktura Design Spec", fill=MUTED, font=footer_font)

    image.save(OUTPUT, format="PNG", optimize=True)
    return OUTPUT


if __name__ == "__main__":
    result = render()
    print(result)
