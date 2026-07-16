import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/branding/viewbrush-brush-preserve-round3');
fs.mkdirSync(outDir, { recursive: true });

const palette = {
  bg: '#f6f0e7',
  panel: '#fbf8f3',
  text: '#2b2119',
  muted: '#867664',
  line: '#d8cab7',
  gold: '#d1a15e',
  goldLight: '#ead0a2',
  goldDeep: '#bc8a47',
};

const serif = 'Didot, Bodoni 72, Iowan Old Style, Playfair Display, serif';
const sans = 'Inter, Helvetica, Arial, sans-serif';

function brushMark({ x = 0, y = 0, scale = 1, rotate = 0 } = {}) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale}) rotate(${rotate})">
      <path d="M34 170C67 149 101 129 129 106C153 87 171 67 191 42" stroke="${palette.gold}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M36 170C68 149 100 129 128 107C152 88 170 68 189 44" stroke="${palette.goldLight}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>
      <path d="M69 147C100 126 125 109 148 90C166 75 180 61 193 44" stroke="${palette.goldDeep}" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <path d="M78 155C109 134 134 116 155 98C171 84 184 70 196 53" stroke="${palette.goldDeep}" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
      <path d="M91 160C118 143 143 125 165 107C181 94 193 80 205 63" stroke="${palette.goldDeep}" stroke-width="3.2" stroke-linecap="round" opacity="0.72"/>
      <path d="M110 165C139 148 160 132 181 115C197 103 210 90 221 75" stroke="${palette.goldDeep}" stroke-width="2.8" stroke-linecap="round" opacity="0.68"/>
      <path d="M138 95C157 81 173 65 187 48" stroke="${palette.goldLight}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
      <path d="M150 86C169 72 184 57 198 40" stroke="${palette.goldLight}" stroke-width="3.8" stroke-linecap="round" opacity="0.8"/>
      <path d="M160 81C178 66 194 50 207 32" stroke="${palette.goldLight}" stroke-width="2.8" stroke-linecap="round" opacity="0.75"/>
      <path d="M171 77C187 61 201 44 212 27" stroke="${palette.goldLight}" stroke-width="2.3" stroke-linecap="round" opacity="0.75"/>
      <path d="M16 180C29 175 38 172 50 166" stroke="${palette.goldDeep}" stroke-width="3.2" stroke-linecap="round" opacity="0.72"/>
      <path d="M22 186C35 181 45 178 58 172" stroke="${palette.goldLight}" stroke-width="2.2" stroke-linecap="round" opacity="0.68"/>
    </g>
  `;
}

function wrap(body, width = 2200, height = 640) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="28" fill="${palette.bg}"/>
  ${body}
</svg>`;
}

const frameBody = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(110 112)">
    <rect x="0" y="0" width="250" height="310" fill="none" stroke="${palette.text}" stroke-width="10"/>
    <rect x="20" y="20" width="210" height="270" fill="none" stroke="${palette.line}" stroke-width="3.5"/>
    ${brushMark({ x: 18, y: 64, scale: 1.04, rotate: -2 })}
  </g>
  <path d="M688 120V514" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="798" y="314" fill="${palette.text}" font-family="${serif}" font-size="160" letter-spacing="-4">ViewBrush</text>
  <text x="804" y="390" fill="${palette.muted}" font-family="${sans}" font-size="31" letter-spacing="6">GALLERY FRAME + ORIGINAL BRUSH</text>
`;

const monogramBody = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(102 96)">
    <text x="0" y="272" fill="${palette.text}" font-family="${serif}" font-size="258" letter-spacing="-12">VB</text>
    ${brushMark({ x: 8, y: 92, scale: 1.15, rotate: 2 })}
    <path d="M42 350H306" stroke="${palette.line}" stroke-width="4"/>
  </g>
  <path d="M688 120V514" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="798" y="314" fill="${palette.text}" font-family="${serif}" font-size="160" letter-spacing="-4">ViewBrush</text>
  <text x="804" y="390" fill="${palette.muted}" font-family="${sans}" font-size="31" letter-spacing="6">VB MONOGRAM + ORIGINAL BRUSH</text>
`;

const sealBody = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(110 94)">
    <circle cx="150" cy="164" r="150" fill="none" stroke="${palette.gold}" stroke-width="8"/>
    <circle cx="150" cy="164" r="118" fill="none" stroke="${palette.line}" stroke-width="4" stroke-dasharray="4 12"/>
    <text x="34" y="204" fill="${palette.text}" font-family="${serif}" font-size="156" letter-spacing="-10">VB</text>
    ${brushMark({ x: 10, y: 132, scale: 1.0, rotate: 0 })}
  </g>
  <path d="M688 120V514" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="798" y="314" fill="${palette.text}" font-family="${serif}" font-size="160" letter-spacing="-4">ViewBrush</text>
  <text x="804" y="390" fill="${palette.muted}" font-family="${sans}" font-size="31" letter-spacing="6">COLLECTOR SEAL + ORIGINAL BRUSH</text>
`;

const concept1 = wrap(frameBody);
const concept2 = wrap(monogramBody);
const concept3 = wrap(sealBody);

const board = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2200" height="2050" viewBox="0 0 2200 2050" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2200" height="2050" fill="${palette.bg}"/>
  <text x="110" y="150" fill="${palette.text}" font-family="${serif}" font-size="90" letter-spacing="-2">ViewBrush</text>
  <text x="116" y="220" fill="${palette.muted}" font-family="${sans}" font-size="28" letter-spacing="6">KEEP THE ORIGINAL BRUSH, REPLACE THE WINDOW</text>
  <rect x="76" y="314" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <rect x="76" y="920" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <rect x="76" y="1526" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <text x="126" y="372" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">01</text>
  <text x="126" y="978" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">02</text>
  <text x="126" y="1584" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">03</text>
  <g transform="translate(0 264)">${frameBody}</g>
  <g transform="translate(0 870)">${monogramBody}</g>
  <g transform="translate(0 1476)">${sealBody}</g>
</svg>`;

const notes = `# ViewBrush Round 3

这轮只保留一个核心前提：原来那条金色斜向笔触必须保住。

因此这次不再去重画新的平滑笔触，而是继续沿用同一类“带刷毛、带层次、由粗到细收尾”的单笔语言，只替换外部承载元素：

1. Gallery Frame
   用画框代替窗户，更接近“作品被装裱、可上墙”的品牌语义。

2. VB Monogram
   用字母承接品牌识别，把笔触作为最强记忆点。

3. Collector Seal
   用收藏章 / 工坊章表达手工完成与可信背书。
`;

for (const [file, content] of [
  ['01-gallery-frame-original-brush.svg', concept1],
  ['02-vb-monogram-original-brush.svg', concept2],
  ['03-collector-seal-original-brush.svg', concept3],
  ['comparison-board.svg', board],
  ['README.md', notes],
]) {
  fs.writeFileSync(path.join(outDir, file), content);
}

console.log(`Generated assets in ${outDir}`);
