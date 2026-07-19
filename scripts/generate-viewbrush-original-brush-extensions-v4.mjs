import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/branding/viewbrush-original-brush-extensions-v4');
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
  <g transform="translate(94 146)">
    <text x="0" y="178" fill="${palette.text}" font-family="${serif}" font-size="154" letter-spacing="-8">ViewBrush</text>
    ${brushImage({ x: 74, y: 178, width: 224, height: 248, rotate: 0 })}
    <path d="M82 290H292" stroke="${palette.line}" stroke-width="3" opacity="0.9"/>
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">SIGNATURE WORDMARK + ORIGINAL STROKE</text>
`;

const concept2Body = `
  <rect x="42" y="40" width="520" height="520" rx="26" fill="${palette.panel}" stroke="${palette.line}" stroke-width="5"/>
  <g transform="translate(112 96)">
    <path d="M34 14H244L302 72V350H34V14Z" fill="none" stroke="${palette.text}" stroke-width="9"/>
    <path d="M244 14V72H302" fill="none" stroke="${palette.text}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M56 36H234L280 82V328H56V36Z" fill="none" stroke="${palette.line}" stroke-width="4"/>
    <path d="M234 36V82H280" fill="none" stroke="${palette.line}" stroke-width="4" stroke-linejoin="round"/>
    ${brushImage({ x: 98, y: 118, width: 146, height: 162, rotate: -2 })}
  </g>
  <path d="M688 124V516" stroke="${palette.gold}" stroke-width="4" stroke-linecap="round"/>
  <text x="796" y="308" fill="${palette.text}" font-family="${serif}" font-size="162" letter-spacing="-4">ViewBrush</text>
  <text x="802" y="388" fill="${palette.muted}" font-family="${sans}" font-size="30" letter-spacing="6">ART PRINT SHEET + ORIGINAL STROKE</text>
`;

const concept1 = shell(concept1Body);
const concept2 = shell(concept2Body);

const board = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2200" height="1460" viewBox="0 0 2200 1460" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2200" height="1460" fill="${palette.bg}"/>
  <text x="108" y="150" fill="${palette.text}" font-family="${serif}" font-size="90" letter-spacing="-2">ViewBrush</text>
  <text x="114" y="220" fill="${palette.muted}" font-family="${sans}" font-size="28" letter-spacing="6">TWO ACTUALLY NEW DIRECTIONS AROUND THE SAME STROKE</text>
  <rect x="76" y="314" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <rect x="76" y="920" width="2048" height="540" rx="24" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  <text x="126" y="372" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">09</text>
  <text x="126" y="978" fill="${palette.muted}" font-family="${sans}" font-size="26" letter-spacing="5">10</text>
  <g transform="translate(0 264)">${concept1Body}</g>
  <g transform="translate(0 870)">${concept2Body}</g>
</svg>`;

const notes = `# ViewBrush Original Stroke Extensions V4

这轮是两个真正新的方向，不再复用前面出现过的框、章、标签、裁切角系统。

9. Signature Wordmark
   让品牌字标本身成为主角，把原始笔触当成签名式收笔和情绪记忆点。

10. Art Print Sheet
   用版画纸 / 艺术印刷张的折角结构承接“可上墙作品”的产品属性。
`;

const files = [
  ['09-signature-wordmark-original-stroke.svg', concept1],
  ['10-art-print-sheet-original-stroke.svg', concept2],
  ['comparison-board.svg', board],
  ['README.md', notes],
];

for (const [file, content] of files) {
  fs.writeFileSync(path.join(outDir, file), content);
}

fs.copyFileSync(brushPath, path.join(outDir, 'original-stroke.png'));

console.log(`Generated ${files.length + 1} assets in ${outDir}`);
