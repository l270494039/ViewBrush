import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/branding/viewbrush-original-brush-extensions');
fs.mkdirSync(outDir, { recursive: true });

const brushPath = path.resolve('output/branding/reference-brush-isolated-final.png');
const brushBase64 = fs.readFileSync(brushPath).toString('base64');
const brushHref = `data:image/png;base64,${brushBase64}`;

const palette = {
  bg: '#f7f1e8',
  panel: '#fbf8f3',
  text: '#2b2019',
  line: '#d9ccb9',
  gold: '#c89956',
  darkGold: '#b8853c',
  muted: '#8a7966',
};

const serif = 'Didot, Bodoni 72, Iowan Old Style, Playfair Display, serif';
const sans = 'Inter, Helvetica, Arial, sans-serif';

function brushImage({ x, y, width, height, rotate = 0, opacity = 1 }) {
  return `<image href="${brushHref}" x="${x}" y="${y}" width="${width}" height="${height}" opacity="${opacity}" transform="rotate(${rotate} ${x + width / 2} ${y + height / 2})" />`;
}

function shell(body, width = 2200, height = 640) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="26" fill="${palette.bg}"/>
  ${body}
</svg>`;
}

const concept1Body = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(124 102)">
    <rect x="0" y="0" width="286" height="342" fill="none" stroke="${palette.text}" stroke-width="10"/>
    <rect x="22" y="22" width="242" height="298" fill="none" stroke="${palette.line}" stroke-width="4"/>
    ${brushImage({ x: 44, y: 56, width: 194, height: 214, rotate: -2 })}
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">GALLERY FRAME + ORIGINAL STROKE</text>
`;

const concept2Body = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(88 104)">
    <text x="0" y="278" fill="${palette.text}" font-family="${serif}" font-size="252" letter-spacing="-12">VB</text>
    ${brushImage({ x: 20, y: 120, width: 240, height: 265, rotate: 6 })}
    <path d="M40 360H320" stroke="${palette.line}" stroke-width="4"/>
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">VB MONOGRAM + ORIGINAL STROKE</text>
`;

const concept3Body = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(118 92)">
    <circle cx="154" cy="172" r="154" fill="none" stroke="${palette.gold}" stroke-width="8"/>
    <circle cx="154" cy="172" r="124" fill="none" stroke="${palette.line}" stroke-width="4" stroke-dasharray="4 12"/>
    <text x="34" y="212" fill="${palette.text}" font-family="${serif}" font-size="152" letter-spacing="-10">VB</text>
    ${brushImage({ x: 28, y: 150, width: 212, height: 234, rotate: 2 })}
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">COLLECTOR SEAL + ORIGINAL STROKE</text>
`;

const concept1 = shell(concept1Body);
const concept2 = shell(concept2Body);
const concept3 = shell(concept3Body);

const board = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2200" height="2060" viewBox="0 0 2200 2060" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2200" height="2060" fill="${palette.bg}"/>
  <text x="108" y="150" fill="${palette.text}" font-family="${serif}" font-size="90" letter-spacing="-2">ViewBrush</text>
  <text x="114" y="220" fill="${palette.muted}" font-family="${sans}" font-size="28" letter-spacing="6">KEEP THIS EXACT STROKE, EXPAND OTHER DIRECTIONS</text>
  <rect x="76" y="314" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <rect x="76" y="920" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <rect x="76" y="1526" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <text x="126" y="372" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">01</text>
  <text x="126" y="978" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">02</text>
  <text x="126" y="1584" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">03</text>
  <g transform="translate(0 264)">${concept1Body}</g>
  <g transform="translate(0 870)">${concept2Body}</g>
  <g transform="translate(0 1476)">${concept3Body}</g>
</svg>`;

const notes = `# ViewBrush Original Stroke Extensions

本轮的唯一硬约束是：保留窗户中那一笔的原始形态与质感。

因此这 3 个方向都直接复用了从参考图中拆出的同一笔触素材，只更换外围承载符号：

1. Gallery Frame
   用装裱画框替换窗户，保留上墙、陈列、作品感。

2. VB Monogram
   用品牌首字母承接识别，强化 favicon 与头像场景的辨识度。

3. Collector Seal
   用收藏章与工坊印记表达“人手完成”的可信度与仪式感。
`;

const files = [
  ['01-gallery-frame-original-stroke.svg', concept1],
  ['02-vb-monogram-original-stroke.svg', concept2],
  ['03-collector-seal-original-stroke.svg', concept3],
  ['comparison-board.svg', board],
  ['README.md', notes],
];

for (const [file, content] of files) {
  fs.writeFileSync(path.join(outDir, file), content);
}

fs.copyFileSync(brushPath, path.join(outDir, 'original-stroke.png'));

console.log(`Generated ${files.length + 1} assets in ${outDir}`);
