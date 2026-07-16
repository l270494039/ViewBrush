import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/branding/viewbrush-refinement-round2');
fs.mkdirSync(outDir, { recursive: true });

const palette = {
  bg: '#f6f0e7',
  text: '#2a211a',
  muted: '#7b6c5b',
  gold: '#b98d5a',
  goldSoft: '#d9bc97',
  line: '#d8cab5',
};

const fontStack = 'Didot, Bodoni 72, Iowan Old Style, Playfair Display, serif';

function wrapSvg(body, { width = 2200, height = 700 } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="warmStroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.goldSoft}"/>
      <stop offset="100%" stop-color="${palette.gold}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="24" fill="${palette.bg}"/>
  ${body}
</svg>`;
}

const conceptBody1 = `
  <g transform="translate(122 110)">
    <path d="M20 40H230" stroke="url(#warmStroke)" stroke-width="10" stroke-linecap="round"/>
    <path d="M20 40V214" stroke="url(#warmStroke)" stroke-width="10" stroke-linecap="round"/>
    <path d="M278 388H68" stroke="url(#warmStroke)" stroke-width="10" stroke-linecap="round"/>
    <path d="M278 388V214" stroke="url(#warmStroke)" stroke-width="10" stroke-linecap="round"/>
    <text x="76" y="300" fill="${palette.text}" font-family="${fontStack}" font-size="206" letter-spacing="-10">VB</text>
    <path d="M176 252C214 228 252 232 278 260C306 291 337 304 376 291" stroke="url(#warmStroke)" stroke-width="18" stroke-linecap="round"/>
    <path d="M370 286C378 289 390 300 396 314" stroke="url(#warmStroke)" stroke-width="9" stroke-linecap="round"/>
  </g>
  <path d="M616 142V552" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="724" y="368" fill="${palette.text}" font-family="${fontStack}" font-size="156" letter-spacing="-4">ViewBrush</text>
  <text x="730" y="444" fill="${palette.muted}" font-family="Inter, sans-serif" font-size="30" letter-spacing="6">GALLERY CORNERS + BRUSH STROKE</text>
`;
const concept1 = wrapSvg(conceptBody1, { width: 2200, height: 620 });

const conceptBody2 = `
  <g transform="translate(116 112)">
    <text x="0" y="292" fill="${palette.text}" font-family="${fontStack}" font-size="230" letter-spacing="-12">VB</text>
    <path d="M164 316C217 271 291 266 353 296C401 318 451 320 495 292" stroke="url(#warmStroke)" stroke-width="18" stroke-linecap="round"/>
    <path d="M492 292C503 293 518 306 521 322" stroke="url(#warmStroke)" stroke-width="9" stroke-linecap="round"/>
    <path d="M44 364H370" stroke="${palette.line}" stroke-width="4"/>
  </g>
  <path d="M618 140V550" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="726" y="358" fill="${palette.text}" font-family="${fontStack}" font-size="164" letter-spacing="-5">ViewBrush</text>
  <path d="M1298 392C1365 430 1474 436 1569 417C1650 401 1729 362 1786 310" stroke="url(#warmStroke)" stroke-width="11" stroke-linecap="round"/>
  <path d="M1782 308C1794 312 1806 325 1810 338" stroke="url(#warmStroke)" stroke-width="6" stroke-linecap="round"/>
  <text x="730" y="446" fill="${palette.muted}" font-family="Inter, sans-serif" font-size="30" letter-spacing="6">EDITORIAL WORDMARK + SIGNATURE SWEEP</text>
`;
const concept2 = wrapSvg(conceptBody2, { width: 2200, height: 620 });

const conceptBody3 = `
  <g transform="translate(120 108)">
    <rect x="0" y="16" width="308" height="308" rx="154" stroke="url(#warmStroke)" stroke-width="7"/>
    <circle cx="154" cy="170" r="123" stroke="${palette.line}" stroke-width="3" stroke-dasharray="4 10"/>
    <text x="59" y="214" fill="${palette.text}" font-family="${fontStack}" font-size="150" letter-spacing="-10">VB</text>
    <path d="M80 247C127 212 186 214 230 237C259 252 287 253 321 236" stroke="url(#warmStroke)" stroke-width="16" stroke-linecap="round"/>
    <path d="M316 236C323 237 334 248 338 259" stroke="url(#warmStroke)" stroke-width="8" stroke-linecap="round"/>
  </g>
  <path d="M612 138V548" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="722" y="362" fill="${palette.text}" font-family="${fontStack}" font-size="160" letter-spacing="-4">ViewBrush</text>
  <text x="728" y="440" fill="${palette.muted}" font-family="Inter, sans-serif" font-size="30" letter-spacing="6">COLLECTOR SEAL + HUMAN BRUSH MARK</text>
`;
const concept3 = wrapSvg(conceptBody3, { width: 2200, height: 620 });

const board = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2200" height="1960" viewBox="0 0 2200 1960" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="warmStroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.goldSoft}"/>
      <stop offset="100%" stop-color="${palette.gold}"/>
    </linearGradient>
  </defs>
  <rect width="2200" height="1960" fill="${palette.bg}"/>
  <text x="122" y="136" fill="${palette.text}" font-family="${fontStack}" font-size="86" letter-spacing="-2">ViewBrush</text>
  <text x="126" y="198" fill="${palette.muted}" font-family="Inter, sans-serif" font-size="28" letter-spacing="6">ROUND 2  REFINEMENT  KEEP THE BRUSH, REMOVE THE WINDOW</text>
  <rect x="78" y="266" width="2044" height="492" rx="18" fill="#fbf7f2" stroke="${palette.line}" stroke-width="3"/>
  <rect x="78" y="830" width="2044" height="492" rx="18" fill="#fbf7f2" stroke="${palette.line}" stroke-width="3"/>
  <rect x="78" y="1394" width="2044" height="492" rx="18" fill="#fbf7f2" stroke="${palette.line}" stroke-width="3"/>
  <g transform="translate(40 246) scale(0.9)">${conceptBody1}</g>
  <g transform="translate(40 810) scale(0.9)">${conceptBody2}</g>
  <g transform="translate(40 1374) scale(0.9)">${conceptBody3}</g>
  <text x="160" y="318" fill="${palette.muted}" font-family="Inter, sans-serif" font-size="24" letter-spacing="5">01</text>
  <text x="160" y="882" fill="${palette.muted}" font-family="Inter, sans-serif" font-size="24" letter-spacing="5">02</text>
  <text x="160" y="1446" fill="${palette.muted}" font-family="Inter, sans-serif" font-size="24" letter-spacing="5">03</text>
</svg>`;

const files = [
  ['01-gallery-corners-brush.svg', concept1],
  ['02-editorial-sweep-brush.svg', concept2],
  ['03-collector-seal-brush.svg', concept3],
  ['comparison-board.svg', board],
];

for (const [filename, contents] of files) {
  fs.writeFileSync(path.join(outDir, filename), contents);
}

const notes = `# ViewBrush Logo Refinement Round 2

这轮保留了领导偏喜欢的“单笔画笔触”语言，但把方案 5 中较具争议的“窗户 / 视窗”元素完全移除，改为测试 3 组更贴近品牌气质的组合：

1. Gallery Corners + Brush Stroke
   用策展框角替代完整视窗，保留“被挑选、被陈列”的感觉，但不再像窗户。

2. Editorial Wordmark + Signature Sweep
   用笔触作为收笔和签名感，强调高级、文艺、可出版的字标气质。

3. Collector Seal + Human Brush Mark
   用收藏章 / 工坊印记承接“手工完成”的可信度，更适合后续包装、证书和角标系统。
`;

fs.writeFileSync(path.join(outDir, 'README.md'), notes);
console.log(`Generated ${files.length} files in ${outDir}`);
