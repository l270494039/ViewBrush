import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/branding/viewbrush-original-brush-extensions-v3');
fs.mkdirSync(outDir, { recursive: true });

const brushPath = path.resolve('output/branding/viewbrush-original-brush-extensions/original-stroke.png');
const brushBase64 = fs.readFileSync(brushPath).toString('base64');
const brushHref = `data:image/png;base64,${brushBase64}`;

const palette = {
  bg: '#f7f1e8',
  panel: '#fcf8f2',
  text: '#2b2019',
  line: '#d9ccb9',
  gold: '#cb9853',
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
  <g transform="translate(118 92)">
    <path d="M138 0H268V334L204 388L138 334V0Z" fill="none" stroke="${palette.text}" stroke-width="9" />
    <path d="M160 24H246V320L204 354L160 320V24Z" fill="none" stroke="${palette.line}" stroke-width="4" />
    <circle cx="204" cy="66" r="10" fill="none" stroke="${palette.line}" stroke-width="4" />
    <path d="M204 -20V22" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
    ${brushImage({ x: 142, y: 120, width: 126, height: 140, rotate: -5 })}
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">CURATOR TAG + ORIGINAL STROKE</text>
`;

const concept2Body = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(94 88)">
    <path d="M44 66H158" stroke="${palette.text}" stroke-width="10" stroke-linecap="round"/>
    <path d="M44 66V180" stroke="${palette.text}" stroke-width="10" stroke-linecap="round"/>
    <path d="M322 66H208" stroke="${palette.text}" stroke-width="10" stroke-linecap="round"/>
    <path d="M322 66V180" stroke="${palette.text}" stroke-width="10" stroke-linecap="round"/>
    <path d="M44 344H158" stroke="${palette.text}" stroke-width="10" stroke-linecap="round"/>
    <path d="M44 344V230" stroke="${palette.text}" stroke-width="10" stroke-linecap="round"/>
    <path d="M322 344H208" stroke="${palette.text}" stroke-width="10" stroke-linecap="round"/>
    <path d="M322 344V230" stroke="${palette.text}" stroke-width="10" stroke-linecap="round"/>
    <rect x="98" y="112" width="170" height="188" fill="none" stroke="${palette.line}" stroke-width="3" stroke-dasharray="8 10"/>
    ${brushImage({ x: 104, y: 116, width: 160, height: 176, rotate: -2 })}
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">EDITORIAL CROP + ORIGINAL STROKE</text>
`;

const concept1 = shell(concept1Body);
const concept2 = shell(concept2Body);

const board = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2200" height="1460" viewBox="0 0 2200 1460" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2200" height="1460" fill="${palette.bg}"/>
  <text x="108" y="150" fill="${palette.text}" font-family="${serif}" font-size="90" letter-spacing="-2">ViewBrush</text>
  <text x="114" y="220" fill="${palette.muted}" font-family="${sans}" font-size="28" letter-spacing="6">TWO FILTERED DIRECTIONS AROUND THE SAME STROKE</text>
  <rect x="76" y="314" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <rect x="76" y="920" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <text x="126" y="372" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">07</text>
  <text x="126" y="978" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">08</text>
  <g transform="translate(0 264)">${concept1Body}</g>
  <g transform="translate(0 870)">${concept2Body}</g>
</svg>`;

const notes = `# ViewBrush Original Stroke Extensions V3

这轮只保留两个更有延展潜力的方向，继续使用同一条原始笔触：

7. Curator Tag
   更偏品牌故事与作品陈列感，适合礼盒、证书、包装封签和品牌角标。

8. Editorial Crop
   更偏现代、克制、判断感，适合网站、社媒头像和轻量化品牌系统。
`;

const files = [
  ['07-curator-tag-original-stroke.svg', concept1],
  ['08-editorial-crop-original-stroke.svg', concept2],
  ['comparison-board.svg', board],
  ['README.md', notes],
];

for (const [file, content] of files) {
  fs.writeFileSync(path.join(outDir, file), content);
}

fs.copyFileSync(brushPath, path.join(outDir, 'original-stroke.png'));

console.log(`Generated ${files.length + 1} assets in ${outDir}`);
