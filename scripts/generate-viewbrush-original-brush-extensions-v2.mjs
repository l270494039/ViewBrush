import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/branding/viewbrush-original-brush-extensions-v2');
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
  <g transform="translate(126 106)">
    <path d="M120 0H248V284L183 336L120 284V0Z" fill="none" stroke="${palette.text}" stroke-width="9" />
    <path d="M142 22H226V272L183 304L142 272V22Z" fill="none" stroke="${palette.line}" stroke-width="4" />
    <circle cx="183" cy="58" r="10" fill="none" stroke="${palette.line}" stroke-width="4" />
    <path d="M183 -18V22" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
    ${brushImage({ x: 120, y: 88, width: 124, height: 138, rotate: -3 })}
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">CURATOR TAG + ORIGINAL STROKE</text>
`;

const concept2Body = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(110 102)">
    <path d="M36 34H124" stroke="${palette.text}" stroke-width="9" stroke-linecap="round"/>
    <path d="M36 34V126" stroke="${palette.text}" stroke-width="9" stroke-linecap="round"/>
    <path d="M270 34H182" stroke="${palette.text}" stroke-width="9" stroke-linecap="round"/>
    <path d="M270 34V126" stroke="${palette.text}" stroke-width="9" stroke-linecap="round"/>
    <path d="M36 310H124" stroke="${palette.text}" stroke-width="9" stroke-linecap="round"/>
    <path d="M36 310V218" stroke="${palette.text}" stroke-width="9" stroke-linecap="round"/>
    <path d="M270 310H182" stroke="${palette.text}" stroke-width="9" stroke-linecap="round"/>
    <path d="M270 310V218" stroke="${palette.text}" stroke-width="9" stroke-linecap="round"/>
    <rect x="74" y="72" width="158" height="200" fill="none" stroke="${palette.line}" stroke-width="3" stroke-dasharray="8 10"/>
    ${brushImage({ x: 74, y: 72, width: 158, height: 200, rotate: -1 })}
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">EDITORIAL CROP + ORIGINAL STROKE</text>
`;

const concept3Body = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(88 130)">
    <path d="M0 36C0 16 16 0 36 0H286C306 0 322 16 322 36V182C322 202 306 218 286 218H36C16 218 0 202 0 182V36Z" fill="none" stroke="${palette.text}" stroke-width="9"/>
    <path d="M22 58C22 40 36 26 54 26H268C286 26 300 40 300 58V160C300 178 286 192 268 192H54C36 192 22 178 22 160V58Z" fill="none" stroke="${palette.line}" stroke-width="4"/>
    <path d="M54 218H268" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
    ${brushImage({ x: 114, y: 42, width: 104, height: 114, rotate: 0 })}
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">GALLERY PLAQUE + ORIGINAL STROKE</text>
`;

const concept1 = shell(concept1Body);
const concept2 = shell(concept2Body);
const concept3 = shell(concept3Body);

const board = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2200" height="2060" viewBox="0 0 2200 2060" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2200" height="2060" fill="${palette.bg}"/>
  <text x="108" y="150" fill="${palette.text}" font-family="${serif}" font-size="90" letter-spacing="-2">ViewBrush</text>
  <text x="114" y="220" fill="${palette.muted}" font-family="${sans}" font-size="28" letter-spacing="6">ROUND 2  NEW SYSTEMS AROUND THE SAME STROKE</text>
  <rect x="76" y="314" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <rect x="76" y="920" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <rect x="76" y="1526" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <text x="126" y="372" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">04</text>
  <text x="126" y="978" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">05</text>
  <text x="126" y="1584" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">06</text>
  <g transform="translate(0 264)">${concept1Body}</g>
  <g transform="translate(0 870)">${concept2Body}</g>
  <g transform="translate(0 1476)">${concept3Body}</g>
</svg>`;

const notes = `# ViewBrush Original Stroke Extensions V2

这轮继续使用同一条原始笔触，只把外围识别系统换成更不同的品牌语言：

4. Curator Tag
   更像画廊作品标签、挂签、作品信息牌，策展属性更明显。

5. Editorial Crop
   用裁切角和虚线框承接“View”的判断感，比窗户更轻、更现代。

6. Gallery Plaque
   像展墙上的品牌匾和铭牌，更稳、更像正式品牌落款。
`;

const files = [
  ['04-curator-tag-original-stroke.svg', concept1],
  ['05-editorial-crop-original-stroke.svg', concept2],
  ['06-gallery-plaque-original-stroke.svg', concept3],
  ['comparison-board.svg', board],
  ['README.md', notes],
];

for (const [file, content] of files) {
  fs.writeFileSync(path.join(outDir, file), content);
}

fs.copyFileSync(brushPath, path.join(outDir, 'original-stroke.png'));

console.log(`Generated ${files.length + 1} assets in ${outDir}`);
