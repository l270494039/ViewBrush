import { createPartFromBase64, GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs/promises';
import { createServer as createHttpServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(process.cwd());
dotenv.config({ path: path.resolve(appRoot, '.env.local') });
dotenv.config({ path: path.resolve(appRoot, '.env') });

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const host = process.env.HOST ?? (isProduction ? '0.0.0.0' : '127.0.0.1');
const port = Number(process.env.PORT ?? (isProduction ? 10000 : 3000));
const disableHmr = process.env.DISABLE_HMR === 'true';
const startedAt = new Date().toISOString();
const workspaceName = path.basename(appRoot);
const devServerMeta = {
  workspaceName,
  workspaceRoot: appRoot,
  host,
  port,
  pid: process.pid,
  startedAt,
  isProduction,
  disableHmr,
  hasApiKey: Boolean(getApiKey()),
};

const imageEditModel = process.env.GEMINI_IMAGE_EDIT_MODEL ?? 'gemini-2.5-flash-image';

const conceptPrompts: Record<string, string> = {
  classic:
    'Create an heirloom-style oil portrait of the same pet with rich brushwork, warm museum lighting, deep shadows, and a calm studio background.',
  impressionist:
    'Create a luminous impressionist portrait of the same pet with soft brushwork, glowing color transitions, and preserved facial likeness and expression.',
  acrylic:
    'Create a textured acrylic portrait of the same pet with layered painterly surface detail, collected contemporary styling, and preserved facial likeness and expression.',
  minimal:
    'Create a refined contemporary portrait of the same pet with cleaner shapes, restrained background detail, crisp contrast, and a premium editorial feel.',
  warm:
    'Create a warm painterly portrait of the same pet with golden light, richer texture, emotional softness, and a tasteful neutral backdrop.',
};

const negativePrompt =
  'Do not add extra animals or people. Do not change the pet identity, fur markings, eye color, pose, or expression. No text, watermark, signature, frame, or cluttered background.';

type GeneratePortraitBody = {
  conceptId?: string;
  imageDataUrl?: string;
  note?: string;
  sizeId?: string;
};

const mockPreviewAssetPaths: Record<string, string> = {
  classic: path.resolve(appRoot, 'src/assets/images/main_golden_oil_1780093879389.png'),
  impressionist: path.resolve(appRoot, 'src/assets/images/hero_impressionist_cavalier_stylized_20260703.png'),
  warm: path.resolve(appRoot, 'src/assets/images/hero_warm_bernese_stylized_20260703.png'),
  acrylic: path.resolve(appRoot, 'src/assets/images/hero_acrylic_shiba_stylized_20260703.png'),
  minimal: path.resolve(appRoot, 'src/assets/images/hero_painting_gallery_minimal_20260530.png'),
};

function getApiKey() {
  return process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
}

function getMockPreviewPath(conceptId: string) {
  return mockPreviewAssetPaths[conceptId] ?? mockPreviewAssetPaths.classic;
}

async function getMockPortrait(conceptId: string) {
  const imagePath = getMockPreviewPath(conceptId);
  const imageBuffer = await fs.readFile(imagePath);
  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = ext === '.webp' ? 'image/webp' : 'image/png';

  return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
}

function dataUrlToImage(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match) {
    throw new Error('The uploaded image format is invalid. Please try a PNG, JPG, or WebP file.');
  }

  return {
    mimeType: match[1],
    imageBytes: match[2],
  };
}

function buildPrompt(conceptId: string, note?: string) {
  const conceptPrompt = conceptPrompts[conceptId] ?? conceptPrompts.classic;
  const notePrompt = note?.trim()
    ? `Honor these customer-requested visual keywords while preserving the pet likeness, markings, and expression: ${note.trim()}`
    : 'Keep the composition focused on the pet, preserve the eyes carefully, and use a tasteful painterly background.';

  return `${conceptPrompt} ${notePrompt}`;
}

function getAspectRatio(sizeId?: string) {
  if (sizeId?.startsWith('landscape')) return '5:4';
  if (sizeId?.startsWith('square')) return '1:1';
  return '4:5';
}

async function generatePortrait(imageDataUrl: string, conceptId: string, note?: string, sizeId?: string) {
  const apiKey = getApiKey();

  if (!apiKey) {
    if (!isProduction) {
      return {
        imageDataUrl: await getMockPortrait(conceptId),
        model: 'mock-preview',
        isMock: true,
      };
    }

    throw new Error('Missing `GEMINI_API_KEY`. Add it to your `.env.local` before generating portraits.');
  }

  const image = dataUrlToImage(imageDataUrl);
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: imageEditModel,
    contents: [
      {
        text: `${buildPrompt(
          conceptId,
          note,
        )} Use the uploaded pet photo as the only visual reference. Preserve breed cues, markings, eye color, pose, and expression. ${negativePrompt}`,
      },
      createPartFromBase64(image.imageBytes, image.mimeType),
    ],
    config: {
      responseModalities: ['IMAGE'],
      imageConfig: {
        aspectRatio: getAspectRatio(sizeId),
        imageSize: '1K',
      },
    },
  });
  const generatedImage = response.candidates?.[0]?.content?.parts?.find((part) => part.inlineData?.data)?.inlineData;

  if (!generatedImage?.data) {
    const textResponse = response.text?.trim();
    throw new Error(textResponse || 'The model did not return an image.');
  }

  return {
    imageDataUrl: `data:${generatedImage.mimeType ?? 'image/png'};base64,${generatedImage.data}`,
    model: imageEditModel,
    isMock: false,
  };
}

app.use(express.json({ limit: '20mb' }));

app.post('/api/generate-portrait', async (req, res) => {
  try {
    const body = (req.body ?? {}) as GeneratePortraitBody;
    const conceptId = typeof body.conceptId === 'string' ? body.conceptId : 'classic';
    const imageDataUrl = typeof body.imageDataUrl === 'string' ? body.imageDataUrl : '';
    const note = typeof body.note === 'string' ? body.note : '';
    const sizeId = typeof body.sizeId === 'string' ? body.sizeId : undefined;

    if (!imageDataUrl) {
      res.status(400).json({ error: 'Upload a pet photo before generating a portrait.' });
      return;
    }

    const portrait = await generatePortrait(imageDataUrl, conceptId, note, sizeId);
    res.json(portrait);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate portrait.';
    console.error('[generate-portrait]', error);
    res.status(500).json({ error: message });
  }
});

app.all('/api/*', (_req, res) => {
  res.status(404).json({ error: 'API route not found.' });
});

app.get('/__dev-info', (_req, res) => {
  res.json(devServerMeta);
});

async function start() {
  const httpServer = createHttpServer(app);

  if (isProduction) {
    const distDir = path.resolve(appRoot, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      appType: 'custom',
      server: {
        middlewareMode: true,
        hmr: disableHmr
          ? false
          : {
              server: httpServer,
            },
      },
    });

    if (!disableHmr) {
      vite.watcher.on('change', (changedFile) => {
        if (changedFile.includes('/src/') || changedFile.endsWith('.css') || changedFile.endsWith('.html')) {
          vite.ws.send({ type: 'full-reload' });
        }
      });
    }

    app.use(vite.middlewares);
    app.get('*', async (req, res, next) => {
      try {
        const htmlPath = path.resolve(appRoot, 'index.html');
        const template = await fs.readFile(htmlPath, 'utf8');
        const rendered = await vite.transformIndexHtml(
          req.originalUrl,
          template.replace(
            '</head>',
            `<script>window.__PIKTURA_DEV_SERVER__=${JSON.stringify(devServerMeta)};</script></head>`,
          ),
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(rendered);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  }

  httpServer.listen(port, host, () => {
    console.log(`Piktura server running on http://${host}:${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
