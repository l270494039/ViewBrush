import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Camera, Check, ChevronDown, MessageSquare, MoveRight, RotateCcw, ShoppingBag, WandSparkles, X } from 'lucide-react';
import { getBackButtonClasses, getButtonClasses, getCardClasses, getHeadingFont, getInputClasses, getLabelClasses } from '../utils/theme';
import { portraitStyles, type PortraitStyleId } from '../data/portraitStyles';
import { finishOptions, getFinishLabel, getPresentationSummary, type FinishType } from '../data/presentationOptions';
import type { PaymentDetailsPayload } from './PaymentDetails';

import imgOriginal from '../assets/images/main_golden_oil_1780093879389.png';
import imgHeroClassic from '../assets/images/hero_classic_italian_greyhound_stylized_20260704.png';
import imgHeroClassicOriginal from '../assets/images/hero_classic_italian_greyhound_original_20260704.png';
import imgHeroImpressionist from '../assets/images/hero_impressionist_cavalier_stylized_20260703.png';
import imgHeroImpressionistOriginal from '../assets/images/hero_impressionist_cavalier_original_20260703.png';
import imgHeroAcrylic from '../assets/images/hero_acrylic_shiba_stylized_20260703.png';
import imgHeroAcrylicOriginal from '../assets/images/hero_acrylic_shiba_original_20260703.png';
import imgHeroWarm from '../assets/images/hero_warm_bernese_stylized_20260703.png';
import imgHeroWarmOriginal from '../assets/images/hero_warm_bernese_original_20260703.png';
import imgDogSketch from '../assets/images/dog_sketch_1780093949213.png';
import imgDogMinimal from '../assets/images/dog_minimal_1780093914902.png';
import imgCatImpressionist from '../assets/images/cat_impressionist_1780093897711.png';
import imgCatWarm from '../assets/images/cat_warm_1780093929072.png';
import imgKittenWatercolor from '../assets/images/kitten_watercolor_1780093964432.png';
import imgCatInspiration from '../assets/images/cat_inspiration_1780094002138.png';
import imgMomentsDog from '../assets/images/moments_dog_1780095165768.png';
import imgMomentsCats from '../assets/images/moments_cats_1780095182921.png';
import imgRoomGalleryClean from '../assets/images/room_gallery_clean_interior_20260611.png';
import imgCreatePlaceholderOptionB from '../assets/images/create_placeholder_option_b_20260628.png';
import imgFrameGold from '../assets/images/frame_gold_20260628.webp';
import imgFrameAntiqueGold from '../assets/images/frame_antique_gold_20260628.webp';
import imgFrameWalnut from '../assets/images/frame_walnut_20260628.webp';
import imgFrameNaturalWood from '../assets/images/frame_natural_wood_20260628.webp';
import imgFrameBlack from '../assets/images/frame_black_20260628.webp';
import imgMaterialPackaging from '../assets/images/materials_archival_packaging_20260530.png';
import imgMaterialCanvas from '../assets/images/materials_cotton_canvas_20260530.png';
import imgMaterialFrame from '../assets/images/materials_wood_frame_20260530.png';
import generationMotionVideo from '../assets/videos/generation-motion-graphics.mp4';

type RouteSetter = (r: 'home' | 'create' | 'details') => void;

type Concept = {
  id: string;
  title: string;
  tone: string;
  note: string;
  image: string;
};

type GeneratedConcept = Concept & {
  isGenerated: boolean;
};

type StudioControls = {
  hasUpload: boolean;
  hasGeneratedPreview: boolean;
  isGenerating: boolean;
  generationProgress: number;
  generationPhase: string;
  generationError: string | null;
  generationLabel: string;
  sourceFileName: string;
  sourceImage: string;
  selectedConceptReady: boolean;
  onGenerate: () => Promise<void>;
  onUploadClick: () => void;
  onResetUpload: () => void;
};

type GeneratePortraitResponse = {
  imageDataUrl?: string;
  error?: string;
};

type CanvasOrientation = 'portrait' | 'landscape' | 'square';

type CommerceSizeOption = {
  id: string;
  metric: string;
  orientation: CanvasOrientation;
  ratioClassName: string;
  previewWidthPercent: number;
  previewMaxWidth: number;
  roomWidthPercent: number;
  roomMinWidth: number;
  roomMaxWidth: number;
  roomTopPercent: number;
};

type CommerceFrameOption = {
  id: string;
  label: string;
  color: string;
  image: string;
};

type StyleSampleImage = {
  src: string;
  alt: string;
};

const concepts: Concept[] = [
  ...portraitStyles.map((style) => ({
    id: style.id,
    title: style.title,
    tone: style.createTone,
    note: style.createNote,
    image: (
      {
        realism: imgHeroClassic,
        classic: imgHeroWarm,
        impressionist: imgHeroImpressionist,
        'bold-expressive': imgHeroAcrylic,
      } satisfies Record<PortraitStyleId, string>
    )[style.id],
  })),
];

const roomScenes = [
  { id: 'gallery', label: 'Gallery Wall', image: imgRoomGalleryClean },
  { id: 'soft', label: 'Soft Living Room', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200' },
  { id: 'moody', label: 'Moody Studio', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=1200' },
];

const commerceFrameOptions: CommerceFrameOption[] = [
  {
    id: 'gold',
    label: 'Gold',
    color: 'linear-gradient(135deg, #d9bc72 0%, #ac7d2f 52%, #edcf8d 100%)',
    image: imgFrameGold,
  },
  {
    id: 'antique-gold',
    label: 'Antique Gold',
    color: 'linear-gradient(135deg, #ccb07a 0%, #8f662f 55%, #dec392 100%)',
    image: imgFrameAntiqueGold,
  },
  {
    id: 'walnut',
    label: 'Walnut',
    color: 'linear-gradient(135deg, #7e5a3a 0%, #5d4028 55%, #9f7550 100%)',
    image: imgFrameWalnut,
  },
  {
    id: 'natural-wood',
    label: 'Natural Wood',
    color: 'linear-gradient(135deg, #d9c09a 0%, #b58d65 55%, #edd4b1 100%)',
    image: imgFrameNaturalWood,
  },
  {
    id: 'black',
    label: 'Black',
    color: 'linear-gradient(135deg, #242321 0%, #0e0d0c 55%, #4c4943 100%)',
    image: imgFrameBlack,
  },
];

const commerceSizeOptions: CommerceSizeOption[] = [
  {
    id: 'portrait-40x50',
    metric: 'Portrait · 16 x 20 in',
    orientation: 'portrait',
    ratioClassName: 'aspect-[4/5]',
    previewWidthPercent: 44,
    previewMaxWidth: 420,
    roomWidthPercent: 18,
    roomMinWidth: 170,
    roomMaxWidth: 250,
    roomTopPercent: 23,
  },
  {
    id: 'portrait-60x75',
    metric: 'Portrait · 24 x 30 in',
    orientation: 'portrait',
    ratioClassName: 'aspect-[4/5]',
    previewWidthPercent: 54,
    previewMaxWidth: 520,
    roomWidthPercent: 20,
    roomMinWidth: 200,
    roomMaxWidth: 300,
    roomTopPercent: 22,
  },
  {
    id: 'landscape-75x60',
    metric: 'Landscape · 30 x 24 in',
    orientation: 'landscape',
    ratioClassName: 'aspect-[5/4]',
    previewWidthPercent: 68,
    previewMaxWidth: 680,
    roomWidthPercent: 24,
    roomMinWidth: 220,
    roomMaxWidth: 360,
    roomTopPercent: 29,
  },
  {
    id: 'landscape-100x80',
    metric: 'Landscape · 40 x 32 in',
    orientation: 'landscape',
    ratioClassName: 'aspect-[5/4]',
    previewWidthPercent: 82,
    previewMaxWidth: 760,
    roomWidthPercent: 31,
    roomMinWidth: 280,
    roomMaxWidth: 470,
    roomTopPercent: 28,
  },
  {
    id: 'square-60x60',
    metric: 'Square · 24 x 24 in',
    orientation: 'square',
    ratioClassName: 'aspect-square',
    previewWidthPercent: 52,
    previewMaxWidth: 520,
    roomWidthPercent: 22,
    roomMinWidth: 210,
    roomMaxWidth: 320,
    roomTopPercent: 25,
  },
  {
    id: 'custom-size',
    metric: 'Custom Size',
    orientation: 'portrait',
    ratioClassName: 'aspect-[4/5]',
    previewWidthPercent: 58,
    previewMaxWidth: 560,
    roomWidthPercent: 22,
    roomMinWidth: 210,
    roomMaxWidth: 320,
    roomTopPercent: 22,
  },
];

const restrainedPreviewBackdrop = {
  id: 'restrained',
  label: 'Restrained',
  stageColor: '#f6f2ea',
  stageGradient: 'linear-gradient(180deg, #fcf9f3 0%, #f4efe5 46%, #ede5d8 100%)',
  stageOverlay:
    'radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.6),transparent_34%),radial-gradient(circle_at_76%_34%,rgba(225,205,178,0.12),transparent_40%),linear-gradient(180deg,rgba(255,252,247,0.14),rgba(215,197,171,0.08))',
  placeholderBackground: 'radial-gradient(circle_at_50%_20%,rgba(255,250,244,0.98),rgba(244,237,226,0.96)_42%,rgba(231,222,207,0.98)_100%)',
  placeholderOverlay:
    'radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.5),transparent_48%),linear-gradient(135deg,rgba(192,170,136,0.05),transparent_35%,rgba(170,146,113,0.05)_68%,transparent_100%)',
} as const satisfies {
  id: 'restrained';
  label: string;
  stageColor: string;
  stageGradient: string;
  stageOverlay: string;
  placeholderBackground: string;
  placeholderOverlay: string;
};

const styleSampleLibrary: Record<PortraitStyleId, { heading: string; description: string; images: StyleSampleImage[] }> = {
  realism: {
    heading: 'Realism samples',
    description: 'Closer likeness, softer realism, and photo-faithful pet portrait handling.',
    images: [
      { src: imgHeroClassic, alt: 'Realism sample portrait of an Italian greyhound' },
      { src: imgHeroClassicOriginal, alt: 'Realism source portrait sample of an Italian greyhound' },
      { src: imgOriginal, alt: 'Realism sample portrait of a golden retriever' },
      { src: imgDogMinimal, alt: 'Realism sample portrait of a dog on a pale blue backdrop' },
      { src: imgCatInspiration, alt: 'Realism sample portrait of a cat in warm neutral light' },
      { src: imgMomentsDog, alt: 'Realism sample portrait of a dog in a home moment' },
    ],
  },
  classic: {
    heading: 'Classic samples',
    description: 'Timeless portrait structure, warmer heirloom light, and a more collected wall presence.',
    images: [
      { src: imgHeroWarm, alt: 'Classic sample portrait of a Bernese mountain dog' },
      { src: imgHeroWarmOriginal, alt: 'Classic source portrait sample of a Bernese mountain dog' },
      { src: imgCatWarm, alt: 'Classic sample portrait of a cat in golden painterly light' },
      { src: imgOriginal, alt: 'Classic sample portrait of a golden retriever' },
      { src: imgHeroClassic, alt: 'Classic sample portrait in a formal interior setting' },
      { src: imgMomentsCats, alt: 'Classic sample portrait of two cats in warm studio light' },
    ],
  },
  impressionist: {
    heading: 'Impressionist samples',
    description: 'Luminous brushwork, softer edges, and a lighter atmospheric finish.',
    images: [
      { src: imgHeroImpressionist, alt: 'Impressionist sample portrait of a cavalier dog' },
      { src: imgHeroImpressionistOriginal, alt: 'Impressionist source portrait sample of a cavalier dog' },
      { src: imgCatImpressionist, alt: 'Impressionist sample portrait of a cat in floral light' },
      { src: imgKittenWatercolor, alt: 'Soft painterly kitten portrait sample' },
      { src: imgHeroWarm, alt: 'Painterly dog portrait sample with warm atmospheric light' },
      { src: imgMomentsCats, alt: 'Impressionist sample portrait of cats with soft painterly color' },
    ],
  },
  'bold-expressive': {
    heading: 'Bold & Expressive samples',
    description: 'Stronger color movement, more visible strokes, and a contemporary expressive finish.',
    images: [
      { src: imgHeroAcrylic, alt: 'Bold expressive sample portrait of a Shiba dog' },
      { src: imgHeroAcrylicOriginal, alt: 'Bold expressive source portrait sample of a Shiba dog' },
      { src: imgDogSketch, alt: 'Expressive sketch-like dog portrait sample' },
      { src: imgDogMinimal, alt: 'Contemporary expressive dog portrait sample' },
      { src: imgCatWarm, alt: 'Expressive cat portrait sample in warm painterly tones' },
      { src: imgCatInspiration, alt: 'Bold expressive cat portrait sample in neutral light' },
    ],
  },
};

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;
const MIN_GENERATION_DISPLAY_MS = 5000;
const GENERATED_PREVIEW_SCALE = 1.14;
const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL?.trim() ?? '';
const getViewportBoundArtworkStyle = (widthPercent: number, maxWidth: number): React.CSSProperties => ({
  width: `min(${widthPercent}%, ${maxWidth}px)`,
});

function buildFeedbackMailto({
  conceptTitle,
  sizeMetric,
  finishLabel,
  frameLabel,
  roomLabel,
  note,
}: {
  conceptTitle: string;
  sizeMetric: string;
  finishLabel: string;
  frameLabel: string | null;
  roomLabel: string;
  note: string;
}) {
  if (!supportEmail) return null;

  const subject = `Preview feedback: ${conceptTitle}`;
  const body = [
    'Hi ViewBrush team,',
    '',
    'I have feedback on my generated preview:',
    '',
    `Style: ${conceptTitle}`,
    `Size: ${sizeMetric}`,
    `Finish: ${finishLabel}`,
    ...(frameLabel ? [`Frame Style: ${frameLabel}`] : []),
    `Room mockup: ${roomLabel}`,
    '',
    'What I would like adjusted:',
    '',
    '',
    'Current keywords:',
    note || 'None',
  ].join('\n');

  return `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(new Error('Unable to read the selected image.'));
    reader.readAsDataURL(file);
  });
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Something went wrong while generating the portrait.';
}

function getGenerationPhase(progress: number) {
  if (progress < 0.34) return 'Sketching silhouette and expression';
  if (progress < 0.68) return 'Layering painterly light and brush texture';
  return 'Finishing emotional details and varnish glow';
}

function getMockConceptImage(conceptId: string) {
  return concepts.find((concept) => concept.id === conceptId)?.image ?? concepts[0].image;
}

function resetUploadedPhoto(setters: {
  setSourceImage: (value: string) => void;
  setSourceFileName: (value: string) => void;
  setHasUpload: (value: boolean) => void;
  setGeneratedImages: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setGenerationError: (value: string | null) => void;
  setGenerationProgress: (value: number) => void;
}) {
  setters.setSourceImage(imgOriginal);
  setters.setSourceFileName('demo-pet.png');
  setters.setHasUpload(false);
  setters.setGeneratedImages({});
  setters.setGenerationError(null);
  setters.setGenerationProgress(0);
}

function CreateBackButton({ onNavigate, className = '' }: { onNavigate: RouteSetter; className?: string }) {
  return (
    <button
      onClick={() => onNavigate('home')}
      className={getBackButtonClasses(className)}
    >
      <ArrowLeft size={14} />
      <span className="text-[12px] font-medium">Back to Home</span>
    </button>
  );
}

export default function Create({
  onNavigate,
  onOpenDetails,
  onSaveForLater,
}: {
  onNavigate: RouteSetter;
  onOpenDetails?: (details: PaymentDetailsPayload) => void;
  onSaveForLater?: (details: PaymentDetailsPayload) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const generationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [selectedConceptId, setSelectedConceptId] = useState(concepts[0].id);
  const [previewConceptId, setPreviewConceptId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState(roomScenes[0].id);
  const [selectedFinishType, setSelectedFinishType] = useState<FinishType>('gallery-wrap');
  const [selectedFrameId, setSelectedFrameId] = useState(commerceFrameOptions[0].id);
  const [selectedSize, setSelectedSize] = useState(commerceSizeOptions[0].id);
  const [note, setNote] = useState('');
  const [sourceImage, setSourceImage] = useState(imgOriginal);
  const [sourceFileName, setSourceFileName] = useState('demo-pet.png');
  const [hasUpload, setHasUpload] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  useEffect(() => {
    return () => {
      if (generationIntervalRef.current) {
        clearInterval(generationIntervalRef.current);
      }
    };
  }, []);

  const conceptsWithResults = useMemo<GeneratedConcept[]>(
    () =>
      concepts.map((concept) => ({
        ...concept,
        image: generatedImages[concept.id] ?? concept.image,
        isGenerated: Boolean(generatedImages[concept.id]),
      })),
    [generatedImages]
  );

  const selectedConcept = useMemo(
    () => conceptsWithResults.find((concept) => concept.id === selectedConceptId) ?? conceptsWithResults[0],
    [conceptsWithResults, selectedConceptId]
  );
  const previewConcept = useMemo(() => {
    const activeId = previewConceptId ?? selectedConceptId;
    return conceptsWithResults.find((concept) => concept.id === activeId) ?? conceptsWithResults[0];
  }, [conceptsWithResults, previewConceptId, selectedConceptId]);
  const selectedRoom = useMemo(
    () => roomScenes.find((scene) => scene.id === selectedRoomId) ?? roomScenes[0],
    [selectedRoomId]
  );
  const selectedFrame = useMemo(
    () => commerceFrameOptions.find((frame) => frame.id === selectedFrameId) ?? commerceFrameOptions[0],
    [selectedFrameId]
  );
  const selectedFinish = useMemo(
    () => finishOptions.find((finish) => finish.id === selectedFinishType) ?? finishOptions[0],
    [selectedFinishType]
  );
  const selectedSizeOption = useMemo(
    () => commerceSizeOptions.find((option) => option.id === selectedSize) ?? commerceSizeOptions[0],
    [selectedSize]
  );
  const selectedPreviewBackdrop = restrainedPreviewBackdrop;

  const selectedFrameLabel = selectedFinishType === 'framed' ? selectedFrame.label : null;
  const selectedFrameStyle = selectedFinishType === 'framed' ? selectedFrame.color : null;
  const selectedPresentationSummary = getPresentationSummary(selectedFinish.label, selectedFrameLabel);

  const generationLabel = Object.keys(generatedImages).length > 0 ? 'Regenerate Preview' : 'Generate Preview';
  const generationPhase = getGenerationPhase(generationProgress);
  const shouldUseLocalMockGeneration = import.meta.env.DEV && window.__VIEWBRUSH_DEV_SERVER__?.hasApiKey === false;

  async function handleGenerate() {
    if (!hasUpload) {
      setGenerationError('Upload a pet photo first so we can generate from your image.');
      return;
    }

    if (generationIntervalRef.current) {
      clearInterval(generationIntervalRef.current);
      generationIntervalRef.current = null;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationError(null);

    try {
      const startedAt = Date.now();
      generationIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startedAt;
        const progress = Math.min(0.08 + elapsed / MIN_GENERATION_DISPLAY_MS, 0.94);
        setGenerationProgress(progress);
      }, 120);

      const generationRequest = shouldUseLocalMockGeneration
        ? Promise.resolve<GeneratePortraitResponse>({
            imageDataUrl: getMockConceptImage(selectedConceptId),
          })
        : fetch('/api/generate-portrait', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              conceptId: selectedConceptId,
              imageDataUrl: sourceImage,
              sizeId: selectedSizeOption.id,
              note: note.trim(),
            }),
          }).then(async (response) => {
            const payload = (await response.json().catch(() => null)) as GeneratePortraitResponse | null;

            if (!response.ok) {
              throw new Error(payload?.error || 'Failed to generate portrait.');
            }

            if (!payload?.imageDataUrl) {
              throw new Error('The generation service did not return an image.');
            }

            return payload;
          });

      const minDisplayDelay = new Promise((resolve) => setTimeout(resolve, MIN_GENERATION_DISPLAY_MS));
      const [payload] = await Promise.all([generationRequest, minDisplayDelay]);

      if (generationIntervalRef.current) {
        clearInterval(generationIntervalRef.current);
        generationIntervalRef.current = null;
      }

      setGenerationProgress(1);
      setGeneratedImages((current) => ({ ...current, [selectedConceptId]: payload.imageDataUrl }));
      setPreviewConceptId(selectedConceptId);
    } catch (error) {
      if (generationIntervalRef.current) {
        clearInterval(generationIntervalRef.current);
        generationIntervalRef.current = null;
      }
      setGenerationError(getErrorMessage(error));
    } finally {
      setIsGenerating(false);
      setTimeout(() => setGenerationProgress(0), 400);
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (generationIntervalRef.current) {
        clearInterval(generationIntervalRef.current);
        generationIntervalRef.current = null;
      }

      setIsGenerating(false);
      setGenerationProgress(0);

      if (!file.type.startsWith('image/')) {
        throw new Error('Please choose a PNG, JPG, or WebP image.');
      }
      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        throw new Error('Please choose an image smaller than 10MB.');
      }

      const dataUrl = await readFileAsDataUrl(file);
      if (!dataUrl) throw new Error('The uploaded image could not be read.');

      setSourceImage(dataUrl);
      setSourceFileName(file.name);
      setHasUpload(true);
      setPreviewConceptId(null);
      setGeneratedImages({});
      setGenerationError(null);
      setGenerationProgress(0);
    } catch (error) {
      setGenerationError(getErrorMessage(error));
    } finally {
      event.target.value = '';
    }
  }

  const studioControls: StudioControls = {
    hasUpload,
    hasGeneratedPreview: Object.keys(generatedImages).length > 0,
    isGenerating,
    generationProgress,
    generationPhase,
    generationError,
    generationLabel,
    sourceFileName,
    sourceImage,
    selectedConceptReady: previewConcept.isGenerated,
    onGenerate: handleGenerate,
    onUploadClick: () => fileInputRef.current?.click(),
    onResetUpload: () => {
      if (generationIntervalRef.current) {
        clearInterval(generationIntervalRef.current);
        generationIntervalRef.current = null;
      }
      setIsGenerating(false);
      resetUploadedPhoto({
        setSourceImage,
        setSourceFileName,
        setHasUpload,
        setGeneratedImages,
        setGenerationError,
        setGenerationProgress,
      });
      setPreviewConceptId(null);
    },
  };

  const filePicker = (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/png,image/jpeg,image/webp"
      onChange={handleFileChange}
      className="sr-only"
    />
  );

  const detailsPayload: PaymentDetailsPayload = {
    conceptTitle: previewConcept.title,
    conceptTone: previewConcept.tone,
    conceptImage: previewConcept.image,
    sourceImage,
    finishType: selectedFinishType,
    finishLabel: selectedFinish.label,
    frameLabel: selectedFrameLabel,
    frameStyle: selectedFrameStyle,
    size: selectedSizeOption.metric,
    roomLabel: selectedRoom.label,
    roomImage: selectedRoom.image,
    note,
  };
  const feedbackHref = buildFeedbackMailto({
    conceptTitle: previewConcept.title,
    sizeMetric: selectedSizeOption.metric,
    finishLabel: selectedFinish.label,
    frameLabel: selectedFrameLabel,
    roomLabel: selectedRoom.label,
    note,
  });

  return (
    <>
      {filePicker}
      <CommerceCreate
        onNavigate={onNavigate}
        conceptOptions={conceptsWithResults}
        selectedConcept={selectedConcept}
        previewConcept={previewConcept}
        selectedConceptId={selectedConceptId}
        setSelectedConceptId={setSelectedConceptId}
        selectedRoom={selectedRoom}
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
        selectedFinish={selectedFinish}
        selectedFinishType={selectedFinishType}
        setSelectedFinishType={setSelectedFinishType}
        selectedPresentationSummary={selectedPresentationSummary}
        selectedFrame={selectedFrame}
        selectedFrameId={selectedFrameId}
        setSelectedFrameId={setSelectedFrameId}
        selectedSize={selectedSize}
        selectedSizeOption={selectedSizeOption}
        setSelectedSize={setSelectedSize}
        selectedPreviewBackdrop={selectedPreviewBackdrop}
        note={note}
        setNote={setNote}
        studio={studioControls}
        feedbackHref={feedbackHref}
        onOpenDetails={() => onOpenDetails?.(detailsPayload)}
        onSaveForLater={() => onSaveForLater?.(detailsPayload)}
      />
    </>
  );
}

function CommerceCreate({
  onNavigate,
  conceptOptions,
  selectedConcept,
  previewConcept,
  selectedConceptId,
  setSelectedConceptId,
  selectedRoom,
  selectedRoomId,
  setSelectedRoomId,
  selectedFinish,
  selectedFinishType,
  setSelectedFinishType,
  selectedPresentationSummary,
  selectedFrame,
  selectedFrameId,
  setSelectedFrameId,
  selectedSize,
  selectedSizeOption,
  setSelectedSize,
  selectedPreviewBackdrop,
  note,
  setNote,
  studio,
  feedbackHref,
  onOpenDetails,
  onSaveForLater,
}: {
  onNavigate: RouteSetter;
  conceptOptions: GeneratedConcept[];
  selectedConcept: GeneratedConcept;
  previewConcept: GeneratedConcept;
  selectedConceptId: string;
  setSelectedConceptId: (id: string) => void;
  selectedRoom: { id: string; label: string; image: string };
  selectedRoomId: string;
  setSelectedRoomId: (id: string) => void;
  selectedFinish: { id: FinishType; label: string; title: string; description: string };
  selectedFinishType: FinishType;
  setSelectedFinishType: (id: FinishType) => void;
  selectedPresentationSummary: string;
  selectedFrame: CommerceFrameOption;
  selectedFrameId: string;
  setSelectedFrameId: (id: string) => void;
  selectedSize: string;
  selectedSizeOption: CommerceSizeOption;
  setSelectedSize: (size: string) => void;
  selectedPreviewBackdrop: typeof restrainedPreviewBackdrop;
  note: string;
  setNote: (note: string) => void;
  studio: StudioControls;
  feedbackHref: string | null;
  onOpenDetails?: () => void;
  onSaveForLater?: () => void;
}) {
  const [view, setView] = useState<'canvas' | 'room'>('canvas');
  const [isSamplesModalOpen, setIsSamplesModalOpen] = useState(false);
  const [samplesConceptId, setSamplesConceptId] = useState<PortraitStyleId>(selectedConceptId as PortraitStyleId);
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const isPreviewStep = studio.hasGeneratedPreview;
  const canvasArtworkSrc = studio.selectedConceptReady ? previewConcept.image : studio.hasUpload ? studio.sourceImage : null;
  const isReferenceStage = studio.hasUpload && !studio.selectedConceptReady && !studio.isGenerating;
  const generatedPreviewScale = previewConcept.isGenerated ? GENERATED_PREVIEW_SCALE : 1;
  const samplesStyleId = (isSamplesModalOpen ? samplesConceptId : selectedConceptId) as PortraitStyleId;
  const selectedStyleSamples = styleSampleLibrary[samplesStyleId] ?? styleSampleLibrary.realism;
  const selectedStyleTitle =
    conceptOptions.find((style) => style.id === samplesStyleId)?.title ??
    conceptOptions.find((style) => style.id === selectedConceptId)?.title ??
    previewConcept.title;

  useEffect(() => {
    if (studio.isGenerating) {
      setView('canvas');
    }
  }, [studio.isGenerating]);

  useEffect(() => {
    if (!studio.selectedConceptReady) {
      setView('canvas');
    }
  }, [studio.selectedConceptReady]);

  useEffect(() => {
    setActiveSampleIndex(0);
  }, [selectedConceptId]);

  return (
    <>
      <div className="lg:hidden">
        <MobileCommerceCreate
          onNavigate={onNavigate}
          conceptOptions={conceptOptions}
          selectedConcept={selectedConcept}
          previewConcept={previewConcept}
          selectedConceptId={selectedConceptId}
          setSelectedConceptId={setSelectedConceptId}
          selectedRoom={selectedRoom}
          selectedRoomId={selectedRoomId}
          selectedFinish={selectedFinish}
          selectedFinishType={selectedFinishType}
          setSelectedFinishType={setSelectedFinishType}
          selectedPresentationSummary={selectedPresentationSummary}
          selectedFrame={selectedFrame}
          selectedFrameId={selectedFrameId}
          setSelectedFrameId={setSelectedFrameId}
          selectedSize={selectedSize}
          selectedSizeOption={selectedSizeOption}
          setSelectedSize={setSelectedSize}
          selectedPreviewBackdrop={selectedPreviewBackdrop}
          note={note}
          setNote={setNote}
          onOpenSamples={(styleId) => {
            setSamplesConceptId(styleId);
            setActiveSampleIndex(0);
            setIsSamplesModalOpen(true);
          }}
          studio={studio}
          feedbackHref={feedbackHref}
          onOpenDetails={onOpenDetails}
          onSaveForLater={onSaveForLater}
          view={view}
          setView={setView}
          isPreviewStep={isPreviewStep}
          canvasArtworkSrc={canvasArtworkSrc}
          isReferenceStage={isReferenceStage}
          generatedPreviewScale={generatedPreviewScale}
        />
      </div>
      <div className="hidden lg:block">
        <DesktopCommerceCreate
          onNavigate={onNavigate}
          conceptOptions={conceptOptions}
          previewConcept={previewConcept}
          selectedConceptId={selectedConceptId}
          setSelectedConceptId={setSelectedConceptId}
          selectedRoom={selectedRoom}
          selectedRoomId={selectedRoomId}
          selectedFinish={selectedFinish}
          selectedFinishType={selectedFinishType}
          setSelectedFinishType={setSelectedFinishType}
          selectedPresentationSummary={selectedPresentationSummary}
          selectedFrame={selectedFrame}
          selectedFrameId={selectedFrameId}
          setSelectedFrameId={setSelectedFrameId}
          selectedSize={selectedSize}
          selectedSizeOption={selectedSizeOption}
          setSelectedSize={setSelectedSize}
          selectedPreviewBackdrop={selectedPreviewBackdrop}
          note={note}
          setNote={setNote}
          onOpenSamples={(styleId) => {
            setSamplesConceptId(styleId);
            setActiveSampleIndex(0);
            setIsSamplesModalOpen(true);
          }}
          studio={studio}
          feedbackHref={feedbackHref}
          onOpenDetails={onOpenDetails}
          onSaveForLater={onSaveForLater}
          view={view}
          setView={setView}
          isPreviewStep={isPreviewStep}
          canvasArtworkSrc={canvasArtworkSrc}
          isReferenceStage={isReferenceStage}
          generatedPreviewScale={generatedPreviewScale}
        />
      </div>
      <StyleSamplesModal
        isOpen={isSamplesModalOpen}
        title={selectedStyleTitle}
        description={selectedStyleSamples.description}
        images={selectedStyleSamples.images}
        activeIndex={activeSampleIndex}
        setActiveIndex={setActiveSampleIndex}
        onClose={() => setIsSamplesModalOpen(false)}
      />
    </>
  );
}

type CommerceCreateLayoutProps = {
  onNavigate: RouteSetter;
  conceptOptions: GeneratedConcept[];
  selectedConcept?: GeneratedConcept;
  previewConcept: GeneratedConcept;
  selectedConceptId: string;
  setSelectedConceptId: (id: string) => void;
  selectedRoom: { id: string; label: string; image: string };
  selectedRoomId: string;
  selectedFinish: { id: FinishType; label: string; title: string; description: string };
  selectedFinishType: FinishType;
  setSelectedFinishType: (id: FinishType) => void;
  selectedPresentationSummary: string;
  selectedFrame: CommerceFrameOption;
  selectedFrameId: string;
  setSelectedFrameId: (id: string) => void;
  selectedSize: string;
  selectedSizeOption: CommerceSizeOption;
  setSelectedSize: (size: string) => void;
  selectedPreviewBackdrop: typeof restrainedPreviewBackdrop;
  note: string;
  setNote: (note: string) => void;
  onOpenSamples: (styleId: PortraitStyleId) => void;
  studio: StudioControls;
  feedbackHref: string | null;
  onOpenDetails?: () => void;
  onSaveForLater?: () => void;
  view: 'canvas' | 'room';
  setView: (view: 'canvas' | 'room') => void;
  isPreviewStep: boolean;
  canvasArtworkSrc: string | null;
  isReferenceStage: boolean;
  generatedPreviewScale: number;
};

function MobileCommerceCreate({
  onNavigate,
  conceptOptions,
  selectedConcept,
  previewConcept,
  selectedConceptId,
  setSelectedConceptId,
  selectedRoom,
  selectedFinish,
  selectedFinishType,
  setSelectedFinishType,
  selectedPresentationSummary,
  selectedFrame,
  selectedFrameId,
  setSelectedFrameId,
  selectedSize,
  selectedSizeOption,
  setSelectedSize,
  selectedPreviewBackdrop,
  note,
  setNote,
  onOpenSamples,
  studio,
  feedbackHref,
  onOpenDetails,
  onSaveForLater,
  view,
  setView,
  isPreviewStep,
  canvasArtworkSrc,
  isReferenceStage,
  generatedPreviewScale,
}: CommerceCreateLayoutProps) {
  const mobileProgressSteps = [
    { label: 'Create' },
    { label: 'Preview' },
    { label: 'Details' },
  ];
  const currentStepIndex = studio.selectedConceptReady ? 2 : studio.hasUpload ? 1 : 0;
  const selectedBarRef = useRef<HTMLDivElement | null>(null);
  const styleSectionRef = useRef<HTMLElement | null>(null);
  const sizeSectionRef = useRef<HTMLElement | null>(null);
  const finishSectionRef = useRef<HTMLElement | null>(null);
  const mobileFrameStylePanelRef = useRef<HTMLDivElement | null>(null);
  const [activeSelectionNav, setActiveSelectionNav] = useState<'style' | 'size' | 'finish'>('style');

  useEffect(() => {
    const updateActiveSelectionNav = () => {
      const sections = [
        { key: 'style' as const, node: styleSectionRef.current },
        { key: 'size' as const, node: sizeSectionRef.current },
        { key: 'finish' as const, node: finishSectionRef.current },
      ];
      const threshold = (selectedBarRef.current?.getBoundingClientRect().bottom ?? 0) + 24;
      const visibleSections = sections.filter((section) => section.node);

      if (visibleSections.length === 0) return;

      const passedSections = visibleSections.filter((section) => {
        const top = section.node!.getBoundingClientRect().top;
        return top <= threshold;
      });

      if (passedSections.length > 0) {
        setActiveSelectionNav(passedSections[passedSections.length - 1].key);
        return;
      }

      const nearestUpcoming = visibleSections.reduce((closest, section) => {
        const top = section.node!.getBoundingClientRect().top;
        if (closest == null) return { key: section.key, distance: top };
        return top < closest.distance ? { key: section.key, distance: top } : closest;
      }, null as { key: 'style' | 'size' | 'finish'; distance: number } | null);

      if (nearestUpcoming) {
        setActiveSelectionNav(nearestUpcoming.key);
      }
    };

    updateActiveSelectionNav();
    window.addEventListener('scroll', updateActiveSelectionNav, { passive: true });
    window.addEventListener('resize', updateActiveSelectionNav);

    return () => {
      window.removeEventListener('scroll', updateActiveSelectionNav);
      window.removeEventListener('resize', updateActiveSelectionNav);
    };
  }, []);

  useEffect(() => {
    if (selectedFinishType !== 'framed') return;

    window.requestAnimationFrame(() => {
      mobileFrameStylePanelRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }, [selectedFinishType]);

  const scrollToSelectionSection = (section: 'style' | 'size' | 'finish') => {
    const sectionMap = {
      style: styleSectionRef.current,
      size: sizeSectionRef.current,
      finish: finishSectionRef.current,
    };
    const target = sectionMap[section];
    if (!target) return;

    const stickyOffset = (selectedBarRef.current?.getBoundingClientRect().height ?? 0) + 16;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - stickyOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex w-full flex-col pb-36">
      <div className="border-b border-[#E5E1D8] bg-[#F6F0E7]">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <CreateBackButton onNavigate={onNavigate} />
            <div className="rounded-[8px] bg-white/88 p-1 text-xs shadow-[0_12px_24px_rgba(36,28,20,0.10)]">
              <button
                onClick={() => setView('canvas')}
                className={`rounded-[8px] px-4 py-2 transition-colors ${view === 'canvas' ? 'bg-black font-semibold text-white' : 'text-black/70'}`}
              >
                Canvas
              </button>
              <button
                onClick={() => setView('room')}
                disabled={studio.isGenerating || !studio.selectedConceptReady}
                className={`rounded-[8px] px-4 py-2 transition-colors ${view === 'room' ? 'bg-black font-semibold text-white' : 'text-black/70'} disabled:opacity-35`}
              >
                Room
              </button>
            </div>
          </div>
          <div className="rounded-[12px] border border-[#DED4C7] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(247,241,232,0.9))] px-3.5 py-3 shadow-[0_10px_24px_rgba(48,35,22,0.04)]">
            <div className="flex items-center">
              {mobileProgressSteps.map((step, index) => {
                const isDone = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <React.Fragment key={step.label}>
                    <div className="flex min-w-0 flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors ${
                          isDone
                            ? 'border-[#1F1A15] bg-[#1F1A15] text-white'
                            : isCurrent
                              ? 'border-[#B89C73] bg-[#FBF6EE] text-[#2D241B]'
                              : 'border-[#D9CDBE] bg-white/88 text-[#9A8C79]'
                        }`}
                      >
                        {isDone ? <Check size={13} strokeWidth={3} /> : `0${index + 1}`}
                      </div>
                    </div>
                    {index < mobileProgressSteps.length - 1 && (
                      <div className="mx-2 flex h-px flex-1 overflow-hidden rounded-full bg-[#DED4C7]">
                        <div
                          className={`h-full transition-all ${
                            index < currentStepIndex ? 'w-full bg-[#1F1A15]' : index === currentStepIndex ? 'w-1/2 bg-[#C0A07A]' : 'w-0'
                          }`}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {mobileProgressSteps.map((step, index) => {
                const isCurrent = index === currentStepIndex;
                const isDone = index < currentStepIndex;

                return (
                  <div key={step.label} className="min-w-0 text-center">
                    <div className={`text-[11px] font-semibold ${isCurrent || isDone ? 'text-[#241C16]' : 'text-[#7E7265]'}`}>{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-4">
        <section className="-mx-4 border-b border-[#E6DED2] px-4 pb-4 pt-2">
          <div
            className="relative overflow-hidden rounded-[12px] border border-[#DDD1BF] px-1.5 py-2 shadow-[0_18px_40px_rgba(53,39,24,0.10)]"
            style={{
              backgroundColor: selectedPreviewBackdrop.stageColor,
              backgroundImage: selectedPreviewBackdrop.stageGradient,
            }}
          >
            <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: selectedPreviewBackdrop.stageOverlay }} />
            <AnimatePresence mode="wait">
              {view === 'canvas' ? (
                <motion.div key="mobile-canvas" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="relative flex min-h-[43svh] items-center justify-center">
                  <FramedArtwork
                    src={canvasArtworkSrc}
                    alt={studio.selectedConceptReady ? 'Generated Canvas' : 'Uploaded reference photo'}
                    finishType={selectedFinishType}
                    frameStyle={selectedFrame.color}
                    frameTexture={selectedFrame.image}
                    className="mx-auto"
                    style={getViewportBoundArtworkStyle(
                      Math.min(selectedSizeOption.previewWidthPercent * generatedPreviewScale + 28, 98),
                      Math.min(selectedSizeOption.previewMaxWidth * generatedPreviewScale + 78, 498)
                    )}
                    ratioClassName={selectedSizeOption.ratioClassName}
                    isGenerating={studio.isGenerating}
                    generationProgress={studio.generationProgress}
                    generationPhase={studio.generationPhase}
                    imageClassName={isReferenceStage ? 'scale-[1.04] blur-[4px] saturate-[0.82] brightness-[1.04] contrast-[0.94]' : ''}
                    artworkOverlay={isReferenceStage ? <ReferenceArtworkOverlay sourceFileName={studio.sourceFileName} /> : null}
                    placeholder={
                      <CommerceCanvasPlaceholder
                        hasUpload={studio.hasUpload}
                        isGenerating={studio.isGenerating}
                        orientation={selectedSizeOption.orientation}
                        sizeId={selectedSizeOption.id}
                        viewport="mobile"
                        selectedPreviewBackdrop={selectedPreviewBackdrop}
                      />
                    }
                  />
                </motion.div>
              ) : (
                <motion.div key="mobile-room" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="relative min-h-[47svh] overflow-hidden rounded-[9px]">
                  <img src={selectedRoom.image} alt="Room background" className="absolute inset-0 h-full w-full object-cover opacity-92" />
                  <div
                    className={`absolute -translate-x-1/2 ${selectedRoom.id === 'gallery' ? 'left-[57%]' : 'left-1/2'}`}
                    style={{
                      top: `${selectedSizeOption.roomTopPercent}%`,
                      width: `${selectedSizeOption.roomWidthPercent * generatedPreviewScale}%`,
                      minWidth: `${selectedSizeOption.roomMinWidth * generatedPreviewScale}px`,
                      maxWidth: `${selectedSizeOption.roomMaxWidth * generatedPreviewScale}px`,
                    }}
                  >
                    <FramedArtwork
                      src={studio.selectedConceptReady ? previewConcept.image : null}
                      alt="Canvas in room"
                      finishType={selectedFinishType}
                      frameStyle={selectedFrame.color}
                      frameTexture={selectedFrame.image}
                      ratioClassName={selectedSizeOption.ratioClassName}
                      isGenerating={studio.isGenerating}
                      generationProgress={studio.generationProgress}
                      generationPhase={studio.generationPhase}
                      placeholder={<BlankArtworkPlaceholder />}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <div
          ref={selectedBarRef}
          className="sticky top-0 z-20 -mx-4 border-b border-[#E6DED2] bg-[#F6F0E7]/95 px-4 py-3 backdrop-blur-md"
        >
          <div className="flex flex-wrap items-center gap-2 text-sm leading-5 text-[#2D241B]">
            <div className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8E7C66]">Selected</div>
            <button
              type="button"
              onClick={() => scrollToSelectionSection('style')}
              className={`max-w-full rounded-[8px] px-2.5 py-1.5 text-left text-xs transition ${
                activeSelectionNav === 'style' ? 'bg-[#2D241B] font-semibold text-white' : 'bg-white/72 text-[#2D241B]'
              }`}
            >
              {selectedConcept?.title ?? previewConcept.title}
            </button>
            <button
              type="button"
              onClick={() => scrollToSelectionSection('size')}
              className={`max-w-full rounded-[8px] px-2.5 py-1.5 text-left text-xs transition ${
                activeSelectionNav === 'size' ? 'bg-[#2D241B] font-semibold text-white' : 'bg-white/72 text-[#6A5D50]'
              }`}
            >
              {selectedSizeOption.metric}
            </button>
            <button
              type="button"
              onClick={() => scrollToSelectionSection('finish')}
              className={`max-w-full rounded-[8px] px-2.5 py-1.5 text-left text-xs transition ${
                activeSelectionNav === 'finish' ? 'bg-[#2D241B] font-semibold text-white' : 'bg-white/72 text-[#6A5D50]'
              }`}
            >
              {selectedPresentationSummary}
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <section className={`${getCardClasses()} overflow-hidden`}>
            <div className="border-b border-black/6 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7E66]">1. Your Photo</p>
              <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A]">Start with a clear photo</h3>
            </div>
            <div className="p-4">
              {studio.hasUpload ? (
                <>
                  <div className="overflow-hidden rounded-[8px] border border-[#DED5C9] bg-white">
                    <div className="relative aspect-[1.5/1]">
                      <img src={studio.sourceImage} alt="Uploaded pet" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(30,24,20,0.18))]" />
                      <button
                        onClick={studio.onResetUpload}
                        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-[8px] border border-[#1A1A1A]/10 bg-white/92 px-3 py-2 text-xs font-semibold text-[#1A1A1A] shadow-[0_12px_20px_rgba(36,28,20,0.12)] backdrop-blur"
                      >
                        <RotateCcw size={14} className="text-[#6f6254]" />
                        Change Photo
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={studio.onUploadClick}
                    className="flex w-full flex-col items-center rounded-[8px] border border-[#DED5C9] bg-[#FBF8F2] px-6 py-8 text-center transition hover:border-[#cbbca8] hover:bg-[#fdfbf8]"
                  >
                    <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[#d8cec2] bg-white text-[#1a1a1a] shadow-[0_10px_28px_rgba(43,32,20,0.06)]">
                      <Camera size={28} strokeWidth={2.1} />
                    </div>
                    <div className="mt-4 text-lg font-semibold text-[#2D241B]">Upload Your Pet&apos;s Photo</div>
                  </button>
                </>
              )}
              {studio.generationError && <p className="mt-3 text-sm leading-6 text-[#a14e40]">{studio.generationError}</p>}
            </div>
          </section>

          <section ref={styleSectionRef} className={`${getCardClasses()} overflow-hidden`}>
            <div className="border-b border-black/6 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7E66]">2. Choose Style</p>
              <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A]">Choose the painterly direction</h3>
            </div>
            <div className="space-y-5 px-4 py-4">
              {[0, 2].map((startIndex) => {
                const rowStyles = conceptOptions.slice(startIndex, startIndex + 2);

                return (
                  <div key={startIndex} className="space-y-1.5">
                    <div className="grid grid-cols-2 gap-2">
                      {rowStyles.map((style) => {
                        const isActive = selectedConceptId === style.id;
                        return (
                          <motion.button
                            key={style.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            type="button"
                            onClick={() => setSelectedConceptId(style.id)}
                            className={`group w-full overflow-hidden rounded-[8px] border text-left transition ${
                              isActive ? 'border-[#1c1b19] bg-[#fcfaf6] shadow-[0_14px_24px_rgba(40,29,20,0.08)]' : 'border-[#e8dece] bg-[#faf7f2]'
                            }`}
                          >
                            <div className="relative overflow-hidden">
                              <img src={style.image} alt={style.title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/34 to-transparent" />
                              {isActive && (
                                <div className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-[0_8px_16px_rgba(33,88,54,0.22)]">
                                  <Check size={11} strokeWidth={3.3} />
                                </div>
                              )}
                            </div>
                            <div className="px-3 py-2.5">
                              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8F816C]">{style.tone}</div>
                              <h4 className="mt-1 text-[15px] font-semibold leading-[1.15] text-[#2d241b]">{style.title}</h4>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {rowStyles.map((style) => (
                        <div key={`${style.id}-samples`} className="text-center">
                          <button
                            type="button"
                            onClick={() => onOpenSamples(style.id as PortraitStyleId)}
                            className="inline-flex max-w-full whitespace-nowrap border-b border-[#111111] pb-[2px] text-[12px] font-normal leading-none tracking-normal text-[#111111] transition hover:opacity-70"
                            style={{ fontSize: 12, lineHeight: 1 }}
                          >
                            View More Samples
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-black/6 px-4 py-3 text-sm leading-6 text-[#62584D]">{selectedConcept?.note ?? previewConcept.note}</div>
          </section>

          <section className={`${getCardClasses()} overflow-hidden`}>
            <div className="border-b border-black/6 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7E66]">3. Custom Keywords</p>
              <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A]">Describe the effect you want</h3>
            </div>
            <div className="p-4">
              <CustomKeywordsField note={note} setNote={setNote} compact />
            </div>
          </section>

          <section ref={sizeSectionRef} className={`${getCardClasses()} overflow-hidden`}>
            <div className="border-b border-black/6 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7E66]">4. Size</p>
              <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A]">Pick the wall presence</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4 py-4">
              {commerceSizeOptions.map((option) => {
                const isActive = selectedSize === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedSize(option.id)}
                    className={`rounded-[8px] border px-3 py-3 text-left transition ${
                      option.id === 'custom-size' ? 'col-span-2' : ''
                    } ${
                      isActive ? 'border-[#1c1b19] bg-[#F7F2EA] shadow-[0_16px_30px_rgba(40,29,20,0.08)]' : 'border-[#E7DED1] bg-white'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E7C66]">
                      {option.orientation === 'portrait' ? 'Vertical' : option.orientation === 'landscape' ? 'Landscape' : 'Square'}
                    </div>
                    <div className="mt-2 text-[13px] font-semibold leading-5 text-[#2D241B]">{option.metric}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section ref={finishSectionRef} className={`${getCardClasses()} overflow-hidden`}>
            <div className="border-b border-black/6 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7E66]">5. Presentation</p>
              <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A]">Choose how the artwork arrives</h3>
            </div>
            <div className="space-y-4 px-4 py-4">
              <FinishOptionGrid selectedFinishType={selectedFinishType} setSelectedFinishType={setSelectedFinishType} />
              {selectedFinishType === 'framed' && (
                <div ref={mobileFrameStylePanelRef} className="rounded-[8px] border border-[#E7DED1] bg-[#FCFAF6] p-3">
                  <div className="mb-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E7C66]">Frame Style</div>
                    <div className="mt-1 text-[13px] leading-5 text-[#62584D]">Choose the outer frame finish after selecting framed presentation.</div>
                  </div>
                  <FrameOptionRail selectedFrameId={selectedFrameId} setSelectedFrameId={setSelectedFrameId} variant="compact-grid" />
                </div>
              )}
            </div>
          </section>

          {studio.selectedConceptReady && (
            <section className="rounded-[12px] border border-[#D9CCB8] bg-[linear-gradient(180deg,rgba(255,251,245,0.92),rgba(246,238,226,0.98))] p-5 shadow-[0_18px_40px_rgba(43,31,21,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B7E66]">Selection</p>
                  <h3 className={`mt-2 text-2xl leading-tight tracking-[-0.04em] text-[#241C16] ${getHeadingFont()}`}>Ready for details.</h3>
                </div>
                <div className="rounded-[8px] border border-white/80 bg-white/88 px-3 py-1.5 text-sm font-semibold text-[#2D241B]">$279</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-[8px] bg-white/72 px-3 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#94826D]">Style</div>
                  <div className="mt-1 font-medium text-[#2D241B]">{previewConcept.title}</div>
                </div>
                <div className="rounded-[8px] bg-white/72 px-3 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#94826D]">Size</div>
                  <div className="mt-1 font-medium text-[#2D241B]">{selectedSizeOption.metric}</div>
                </div>
                <div className="rounded-[8px] bg-white/72 px-3 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#94826D]">Finish</div>
                  <div className="mt-1 font-medium text-[#2D241B]">{selectedFinish.label}</div>
                </div>
                <div className="rounded-[8px] bg-white/72 px-3 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#94826D]">Room Mockup</div>
                  <div className="mt-1 font-medium text-[#2D241B]">{selectedRoom.label}</div>
                </div>
              </div>
              {selectedFinishType === 'framed' && (
                <div className="mt-3 rounded-[8px] bg-white/72 px-3 py-3 text-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#94826D]">Frame Style</div>
                  <div className="mt-1 font-medium text-[#2D241B]">{selectedFrame.label}</div>
                </div>
              )}
              <button
                type="button"
                onClick={onSaveForLater}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#2D241B]/12 bg-white/78 px-4 py-3 text-sm font-semibold text-[#2D241B] transition hover:bg-white"
              >
                <ShoppingBag size={15} />
                Add to Cart
              </button>
            </section>
          )}

          {studio.selectedConceptReady && feedbackHref && (
            <FeedbackEntry href={feedbackHref} />
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#DCCFBC] bg-[#FBF8F3]/96 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 shadow-[0_-18px_40px_rgba(36,28,20,0.12)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[680px] items-center gap-3">
          {studio.selectedConceptReady ? (
            <>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#94826D]">All-in Price</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-2xl font-semibold text-[#241C16]">$279</span>
                  <span className="text-xs text-[#786B5D]">Preview, painting, shipping</span>
                </div>
              </div>
              <button
                onClick={onOpenDetails}
                className={`${getButtonClasses('primary', 'shrink-0 px-5 py-4 text-sm')} flex items-center gap-2`}
              >
                Continue
                <MoveRight size={16} />
              </button>
            </>
          ) : studio.hasUpload ? (
            <button
              onClick={studio.onGenerate}
              disabled={studio.isGenerating}
              className={`flex w-full items-center justify-center gap-3 rounded-[8px] bg-[#1a1a1a] px-4 py-4 text-sm font-semibold text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-45 ${
                !studio.isGenerating ? 'gold-sheen-button' : ''
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-white">
                <WandSparkles size={15} strokeWidth={2.2} />
              </span>
              <span>{studio.isGenerating ? 'Generating portrait...' : studio.generationLabel}</span>
            </button>
          ) : (
            <button onClick={studio.onUploadClick} className={getButtonClasses('primary', 'w-full py-4 text-sm')}>
              Upload a photo to start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopCommerceCreate({
  onNavigate,
  conceptOptions,
  previewConcept,
  selectedConceptId,
  setSelectedConceptId,
  selectedRoom,
  selectedRoomId,
  selectedFinish,
  selectedFinishType,
  setSelectedFinishType,
  selectedFrame,
  selectedFrameId,
  setSelectedFrameId,
  selectedSize,
  selectedSizeOption,
  setSelectedSize,
  selectedPreviewBackdrop,
  note,
  setNote,
  onOpenSamples,
  studio,
  feedbackHref,
  onOpenDetails,
  onSaveForLater,
  view,
  setView,
  isPreviewStep,
  canvasArtworkSrc,
  isReferenceStage,
  generatedPreviewScale,
}: CommerceCreateLayoutProps) {
  const leftPanelScrollRef = useRef<HTMLDivElement | null>(null);
  const frameStylePanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedFinishType !== 'framed') return;

    window.requestAnimationFrame(() => {
      frameStylePanelRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  }, [selectedFinishType]);

  return (
    <div className="mx-auto flex w-full max-w-none flex-1 flex-col px-0 pb-28 pt-4 md:pb-32 md:pt-6">
      <div className="mb-5 border-b border-[#E5E1D8] bg-[#F6F0E7] md:mb-6">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 px-6 py-2 md:relative md:h-[52px] md:flex-row md:items-center md:justify-center md:px-8 md:py-0">
          <CreateBackButton onNavigate={onNavigate} className="self-start md:absolute md:left-8 md:top-1/2 md:-translate-y-[58%]" />
          <div className="flex h-7 items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className={isPreviewStep ? 'text-[#8B7E66]' : 'text-[#1A1A1A]'}>01 Create</span>
            <span className="mx-4 opacity-20">—</span>
            <span className={isPreviewStep ? 'text-[#1A1A1A]' : 'opacity-40'}>02 Preview</span>
            <span className="mx-4 opacity-20">—</span>
            <span className="opacity-40">03 Details</span>
            <span className="mx-4 opacity-20">—</span>
            <span className="opacity-40">04 Checkout</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col items-start gap-6 px-8 lg:flex-row lg:gap-8">
        <div className="w-full flex-shrink-0 lg:sticky lg:top-4 lg:w-[320px]">
          <div className={`${getCardClasses()} flex max-h-[min(70dvh,760px)] flex-col overflow-hidden p-5 lg:max-h-[calc(100dvh-8rem)]`}>
            <div ref={leftPanelScrollRef} className="flex-1 space-y-4 overflow-y-auto overscroll-contain pr-1">
              <div>
                <h3 className={getLabelClasses()}>1. Your Photo</h3>
                <div className="rounded-[4px] bg-[#faf7f1] p-4">
                  <p className="text-center text-[10px] font-bold uppercase tracking-[0.26em] text-[#8f816c]">Studio Upload</p>
                  <h4 className="mt-1 whitespace-nowrap text-center text-[1.05rem] font-semibold leading-tight tracking-tight text-[#1a1a1a] md:text-[1.12rem]">
                    Upload Your Pet&apos;s Photo
                  </h4>

                  {studio.hasUpload ? (
                    <>
                      <div className="mt-4 overflow-hidden rounded-[4px] border border-[#ded5c9] bg-white">
                        <div className="relative aspect-[4/3]">
                          <img src={studio.sourceImage} alt="Uploaded pet" className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(30,24,20,0.18))]" />
                        </div>
                      </div>
                      <button
                        onClick={studio.onGenerate}
                        disabled={studio.isGenerating}
                        className={`mt-4 flex w-full items-center justify-center gap-3 rounded-[8px] bg-[#1a1a1a] px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-black hover:shadow-[0_14px_24px_rgba(26,26,26,0.16)] disabled:cursor-not-allowed disabled:opacity-45 ${
                          !studio.isGenerating ? 'gold-sheen-button' : ''
                        }`}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-white">
                          <WandSparkles size={15} strokeWidth={2.2} />
                        </span>
                        <span>{studio.isGenerating ? 'Generating portrait...' : studio.generationLabel}</span>
                      </button>
                      <button
                        onClick={studio.onResetUpload}
                        className="mt-2.5 flex w-full items-center justify-center gap-3 rounded-[8px] border border-[#1a1a1a]/10 bg-white px-4 py-3 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#f6f2eb]"
                      >
                        <RotateCcw size={18} className="text-[#6f6254]" />
                        Change Photo
                      </button>
                      {studio.generationError && <p className="mt-3 text-sm leading-6 text-[#a14e40]">{studio.generationError}</p>}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={studio.onUploadClick}
                        className="mt-4 flex w-full flex-col items-center rounded-[8px] border border-[#ded5c9] bg-white px-6 py-6 text-center transition hover:border-[#cbbca8] hover:bg-[#fdfbf8]"
                      >
                        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#d8cec2] bg-[#f7f2eb] text-[#1a1a1a]">
                          <Camera size={28} strokeWidth={2.1} />
                        </div>
                        <div className="mt-4 whitespace-nowrap text-[13px] leading-6 text-[#6a6156]">Start with one clear pet photo.</div>
                      </button>
                      <button
                        onClick={studio.onUploadClick}
                        className="mt-3 w-full rounded-[8px] bg-[#1a1a1a] px-4 py-3 text-sm font-semibold normal-case tracking-normal text-white transition duration-200 hover:bg-black hover:shadow-[0_10px_18px_rgba(26,26,26,0.14)]"
                      >
                        browse files
                      </button>
                      {studio.generationError && <p className="mt-3 text-sm leading-6 text-[#a14e40]">{studio.generationError}</p>}
                    </>
                  )}
                </div>
              </div>

              <hr className="border-current opacity-10" />

              <div>
                <div className="mb-2">
                  <h3 className={getLabelClasses().replace('mb-4', '')}>2. Choose Style</h3>
                </div>
                <div className="space-y-6">
                  {[0, 2].map((startIndex) => {
                    const rowStyles = conceptOptions.slice(startIndex, startIndex + 2);

                    return (
                      <div key={startIndex} className="space-y-1.5">
                        <div className="grid grid-cols-2 gap-1.5">
                          {rowStyles.map((style) => {
                            const isActive = selectedConceptId === style.id;
                            return (
                              <motion.button
                                key={style.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                type="button"
                                onClick={() => setSelectedConceptId(style.id)}
                                className={`group w-full overflow-hidden rounded-[4px] border text-left transition ${
                                  isActive ? 'border-[#1c1b19] bg-[#fcfaf6] shadow-[0_18px_32px_rgba(40,29,20,0.08)]' : 'border-[#e8dece] bg-[#faf7f2] hover:border-[#cdbda5]'
                                }`}
                              >
                                <div className="relative overflow-hidden">
                                  <img src={style.image} alt={style.title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
                                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                                  {isActive && (
                                    <div className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center">
                                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-[0_8px_16px_rgba(33,88,54,0.22)]">
                                        <Check size={11} strokeWidth={3.3} />
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="px-3 py-2">
                                  <h4 className="truncate text-[15px] font-semibold leading-[1.15] text-[#2d241b]">{style.title}</h4>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {rowStyles.map((style) => (
                            <div key={`${style.id}-samples`} className="text-center">
                              <button
                                type="button"
                                onClick={() => onOpenSamples(style.id as PortraitStyleId)}
                                className="inline-flex max-w-full whitespace-nowrap border-b border-[#111111] pb-[2px] text-[12px] font-normal leading-none tracking-normal text-[#111111] transition hover:opacity-70"
                                style={{ fontSize: 12, lineHeight: 1 }}
                              >
                                View More Samples
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr className="border-current opacity-10" />

              <div>
                <div className="mb-2">
                  <h3 className={getLabelClasses().replace('mb-4', '')}>3. Custom Keywords</h3>
                </div>
                <CustomKeywordsField note={note} setNote={setNote} />
              </div>

              <hr className="border-current opacity-10" />

              <div>
                <div className="mb-2 w-full">
                  <h3 className={getLabelClasses().replace('mb-4', '')}>4. Size</h3>
                  <div className="relative mt-2">
                    <select
                      value={selectedSize}
                      onChange={(event) => setSelectedSize(event.target.value)}
                      className="w-full appearance-none rounded-[8px] border border-current/20 bg-transparent py-3 pl-3 pr-10 text-sm outline-none transition focus:border-current"
                    >
                      {commerceSizeOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.metric}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-65"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-current opacity-10" />

              <div>
                <div className="mb-2">
                  <h3 className={getLabelClasses().replace('mb-4', '')}>5. Presentation</h3>
                </div>
                <div className="space-y-4">
                  <FinishOptionGrid selectedFinishType={selectedFinishType} setSelectedFinishType={setSelectedFinishType} desktop />
                  {selectedFinishType === 'framed' && (
                    <div ref={frameStylePanelRef} className="rounded-[8px] border border-current/10 bg-current/5 p-3">
                      <div className="mb-3">
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E7C66]">Frame Style</div>
                        <div className="mt-1 text-[13px] leading-5 opacity-70">Choose the outer frame finish after selecting framed presentation.</div>
                      </div>
                      <FrameOptionRail selectedFrameId={selectedFrameId} setSelectedFrameId={setSelectedFrameId} variant="grid" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 lg:flex-1">
          <div
            className="relative flex h-[min(70dvh,760px)] w-full items-center justify-center overflow-hidden p-4 md:p-12 lg:h-[calc(100dvh-8rem)]"
            style={{
              backgroundColor: selectedPreviewBackdrop.stageColor,
              backgroundImage: selectedPreviewBackdrop.stageGradient,
            }}
          >
            <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: selectedPreviewBackdrop.stageOverlay }} />
            <AnimatePresence mode="wait">
              {view === 'canvas' ? (
                <motion.div key="canvas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-full justify-center">
                  <FramedArtwork
                    src={canvasArtworkSrc}
                    alt={studio.selectedConceptReady ? 'Generated Canvas' : 'Uploaded reference photo'}
                    finishType={selectedFinishType}
                    frameStyle={selectedFrame.color}
                    className="mx-auto"
                    style={getViewportBoundArtworkStyle(
                      Math.min(selectedSizeOption.previewWidthPercent * generatedPreviewScale + 8, 96),
                      selectedSizeOption.previewMaxWidth * generatedPreviewScale + 52
                    )}
                    ratioClassName={selectedSizeOption.ratioClassName}
                    isGenerating={studio.isGenerating}
                    generationProgress={studio.generationProgress}
                    generationPhase={studio.generationPhase}
                    imageClassName={isReferenceStage ? 'scale-[1.04] blur-[4px] saturate-[0.82] brightness-[1.04] contrast-[0.94]' : ''}
                    artworkOverlay={isReferenceStage ? <ReferenceArtworkOverlay sourceFileName={studio.sourceFileName} /> : null}
                    placeholder={
                      <CommerceCanvasPlaceholder
                        hasUpload={studio.hasUpload}
                        isGenerating={studio.isGenerating}
                        orientation={selectedSizeOption.orientation}
                        sizeId={selectedSizeOption.id}
                        viewport="desktop"
                        selectedPreviewBackdrop={selectedPreviewBackdrop}
                      />
                    }
                  />
                </motion.div>
              ) : (
                <motion.div key="room" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 h-full w-full">
                  <img src={selectedRoom.image} alt="Room background" className="h-full w-full object-cover opacity-90" />
                  <div
                    className={`absolute -translate-x-1/2 ${selectedRoomId === 'gallery' ? 'left-[57%]' : 'left-1/2'}`}
                    style={{
                      top: `${selectedSizeOption.roomTopPercent}%`,
                      width: `${selectedSizeOption.roomWidthPercent * generatedPreviewScale}%`,
                      minWidth: `${selectedSizeOption.roomMinWidth * generatedPreviewScale}px`,
                      maxWidth: `${selectedSizeOption.roomMaxWidth * generatedPreviewScale}px`,
                    }}
                  >
                    <FramedArtwork
                      src={studio.selectedConceptReady ? previewConcept.image : null}
                      alt="Canvas in room"
                      finishType={selectedFinishType}
                      frameStyle={selectedFrame.color}
                      ratioClassName={selectedSizeOption.ratioClassName}
                      isGenerating={studio.isGenerating}
                      generationProgress={studio.generationProgress}
                      generationPhase={studio.generationPhase}
                      placeholder={<BlankArtworkPlaceholder />}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {studio.hasGeneratedPreview && (
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 rounded-[8px] bg-white/92 p-1 text-xs shadow-[0_12px_30px_rgba(36,28,20,0.16)] backdrop-blur">
                <button
                  onClick={() => setView('canvas')}
                  className={`rounded-[8px] px-6 py-2.5 transition-colors ${view === 'canvas' ? 'bg-black font-semibold text-white' : 'text-black opacity-70 hover:opacity-100'}`}
                >
                  Canvas
                </button>
                <button
                  onClick={() => setView('room')}
                  disabled={studio.isGenerating || !studio.selectedConceptReady}
                  className={`flex items-center gap-1 rounded-[8px] px-6 py-2.5 transition-colors ${
                    view === 'room' ? 'bg-black font-semibold text-white' : 'text-black opacity-70 hover:opacity-100'
                  } disabled:cursor-not-allowed disabled:opacity-35`}
                >
                  Room
                </button>
              </div>
            )}
          </div>
        </div>

        {studio.selectedConceptReady && (
          <div className="w-full flex-shrink-0 lg:sticky lg:top-8 lg:w-[340px]">
            <div className={`${getCardClasses()} flex flex-col gap-6 p-6`}>
              <h3 className={`${getLabelClasses().replace('mb-4', '')} border-b border-current/10 pb-4`}>Your Selections</h3>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Style</span>
                  <span className="font-medium">{previewConcept.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Size</span>
                  <span className="font-medium">{selectedSizeOption.metric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Finish</span>
                  <span className="font-medium">{selectedFinish.label}</span>
                </div>
                {selectedFinishType === 'framed' && (
                  <div className="flex justify-between">
                    <span className="opacity-70">Frame Style</span>
                    <span className="font-medium">{selectedFrame.label}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="opacity-70">Preview</span>
                  <span className="font-medium">{studio.selectedConceptReady ? 'Generated' : 'Sample'}</span>
                </div>
              </div>

              <div className="flex items-end justify-between border-t border-current/10 pt-4">
                <span className="font-semibold">All-in Price</span>
                <div className="text-right">
                  <span className="text-3xl font-semibold">$279</span>
                </div>
              </div>
              <p className="mt-2 text-left text-xs opacity-60">Includes AI preview, painting, & shipping.</p>

              <div className="mt-2 flex flex-col gap-3">
                <button
                  onClick={onOpenDetails}
                  className={`${getButtonClasses('primary', 'w-full py-4 text-base shadow-[0_12px_24px_rgba(49,39,31,0.12)] hover:shadow-[0_16px_28px_rgba(49,39,31,0.18)]')} flex items-center justify-center gap-2`}
                >
                  Continue to Details
                  <ChevronDown className="-rotate-90 opacity-70" size={18} />
                </button>
                <button
                  type="button"
                  onClick={onSaveForLater}
                  className="w-full py-2 text-sm font-medium opacity-70 underline underline-offset-4 hover:opacity-100"
                >
                  Add to Cart
                </button>
              </div>

              {feedbackHref && <FeedbackEntry href={feedbackHref} compact />}

              <div className="mt-2 flex flex-col gap-3 bg-current/5 p-4 text-xs">
                <div className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 flex-shrink-0 opacity-70" />
                  <span className="font-medium opacity-90">Free AI preview & revisions</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 flex-shrink-0 opacity-70" />
                  <span className="font-medium opacity-90">Hand-painted by real artists</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 flex-shrink-0 opacity-70" />
                  <span className="font-medium opacity-90">Museum-quality materials</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 flex-shrink-0 opacity-70" />
                  <span className="font-medium opacity-90">100% satisfaction guarantee</span>
                </div>
              </div>

              <div className="mt-2 border-t border-current/10 pt-6 text-center">
                <div className="mb-2 flex items-center justify-center gap-2 whitespace-nowrap">
                  <ShoppingBag size={14} className="opacity-70" />
                  <h4 className={`${getHeadingFont()} whitespace-nowrap text-sm`}>Handcrafted with heart. Delivered with care.</h4>
                </div>
                <p className="text-xs leading-relaxed opacity-70">Each painting is carefully hand-crafted by our artists and packaged to arrive safely at your door.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomKeywordsField({
  note,
  setNote,
  compact = false,
}: {
  note: string;
  setNote: (note: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? 'space-y-3' : 'space-y-3.5'}>
      <p className="text-sm leading-[1.45] text-[#62584D]">
        Add mood, lighting, background, texture, or artistic details you want the final preview to emphasize.
      </p>
      <div className="relative">
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="e.g. warm sunset light, muted sage background, visible brush texture, elegant museum portrait"
          maxLength={240}
          rows={compact ? 4 : 5}
          className={getInputClasses(`min-h-[112px] resize-none pb-8 leading-6 ${compact ? 'bg-[#FFFDF9]' : 'bg-transparent'}`)}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-[#7A6D60]">{note.length}/240</span>
      </div>
    </div>
  );
}

function FeedbackEntry({ href, compact = false }: { href: string; compact?: boolean }) {
  return (
    <section
      className={`rounded-[12px] border border-[#D8CBB7] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(247,241,232,0.92))] ${
        compact ? 'p-4' : 'p-5'
      } shadow-[0_14px_32px_rgba(43,31,21,0.06)]`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2D241B] text-white">
          <MessageSquare size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B7E66]">Feedback</p>
          <h3 className="mt-1 text-base font-semibold text-[#241C16]">Want a small adjustment before checkout?</h3>
          <p className="mt-2 text-sm leading-6 text-[#5E554A]">
            Send the current preview details to support and describe what you want refined.
          </p>
        </div>
      </div>
      <a
        href={href}
        className="mt-4 inline-flex items-center gap-2 rounded-[8px] border border-[#2D241B]/12 bg-white px-4 py-3 text-sm font-semibold text-[#2D241B] transition hover:bg-[#f7f1e8]"
      >
        Share feedback
        <MoveRight size={16} />
      </a>
    </section>
  );
}

function FrameOptionRail({
  selectedFrameId,
  setSelectedFrameId,
  cardWidthClassName = 'min-w-[102px]',
  variant = 'rail',
}: {
  selectedFrameId: string;
  setSelectedFrameId: (id: string) => void;
  cardWidthClassName?: string;
  variant?: 'rail' | 'grid' | 'compact-grid';
}) {
  return (
    <div
      className={
        variant === 'grid'
          ? 'grid grid-cols-2 gap-1.5'
          : variant === 'compact-grid'
            ? 'grid grid-cols-2 gap-2'
            : 'hide-scrollbar flex gap-2 overflow-x-auto'
      }
    >
      {commerceFrameOptions.map((frame) => {
        const isActive = selectedFrameId === frame.id;
        return (
          <button
            key={frame.id}
            onClick={() => setSelectedFrameId(frame.id)}
            className={
              variant === 'grid'
                ? `group overflow-hidden rounded-[4px] border text-left transition ${
                    isActive ? 'border-[#1c1b19] bg-[#fcfaf6] shadow-[0_18px_32px_rgba(40,29,20,0.08)]' : 'border-[#e8dece] bg-[#faf7f2] hover:border-[#cdbda5]'
                  }`
                : variant === 'compact-grid'
                  ? `group overflow-hidden rounded-[8px] border text-left transition ${
                      isActive ? 'border-[#1c1b19] bg-[#fcfaf6] shadow-[0_14px_24px_rgba(40,29,20,0.08)]' : 'border-[#e8dece] bg-[#faf7f2] hover:border-[#cdbda5]'
                    }`
                : `${cardWidthClassName} group flex-shrink-0 rounded-[8px] border bg-[#fcfaf6] p-1.5 text-center transition ${
                    isActive
                      ? 'border-[#1c1b19] shadow-[0_14px_28px_rgba(40,29,20,0.10)]'
                      : 'border-[#e6dccf] hover:border-[#ccbba3]'
                  }`
            }
          >
            <div className={`relative overflow-hidden ${variant === 'grid' || variant === 'compact-grid' ? '' : 'rounded-[6px] bg-[#f5efe5]'}`}>
              <img
                src={frame.image}
                alt={frame.label}
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              {isActive && (
                variant === 'grid' ? (
                  <div className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-[0_8px_16px_rgba(33,88,54,0.22)]">
                      <Check size={11} strokeWidth={3.4} />
                    </div>
                  </div>
                ) : variant === 'compact-grid' ? (
                  <div className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-[0_8px_16px_rgba(33,88,54,0.22)]">
                    <Check size={10} strokeWidth={3.4} />
                  </div>
                ) : (
                  <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-[0_6px_12px_rgba(33,88,54,0.22)]">
                    <Check size={10} strokeWidth={3.4} />
                  </div>
                )
              )}
            </div>
            <div className={variant === 'grid' ? 'p-3' : variant === 'compact-grid' ? 'p-3' : 'px-1 pb-0.5 pt-2'}>
              <div
                className={
                  variant === 'grid'
                    ? 'truncate text-[15px] font-semibold text-[#2d241b]'
                    : variant === 'compact-grid'
                      ? 'truncate text-[13px] font-semibold leading-5 text-[#2d241b]'
                      : 'text-[11px] font-medium leading-none text-[#3a2e24]'
                }
              >
                {frame.label}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function FinishOptionGrid({
  selectedFinishType,
  setSelectedFinishType,
  desktop = false,
}: {
  selectedFinishType: FinishType;
  setSelectedFinishType: (id: FinishType) => void;
  desktop?: boolean;
}) {
  return (
    <div className={`grid gap-2 ${desktop ? 'grid-cols-1' : 'grid-cols-1'}`}>
      {finishOptions.map((finish) => {
        const isActive = selectedFinishType === finish.id;
        const finishImage =
          finish.id === 'rolled-canvas'
            ? imgMaterialPackaging
            : finish.id === 'gallery-wrap'
              ? imgMaterialCanvas
              : imgMaterialFrame;
        const cardHeight = desktop ? 96 : 76;
        const imageWidth = desktop ? 104 : 96;
        const textPadding = desktop ? '10px 16px' : '8px 14px';
        return (
          <button
            key={finish.id}
            type="button"
            onClick={() => setSelectedFinishType(finish.id)}
            className={`relative overflow-hidden rounded-[8px] border text-left transition ${
              isActive ? 'border-[#1c1b19] bg-[#F7F2EA] shadow-[0_14px_24px_rgba(40,29,20,0.08)]' : 'border-[#E7DED1] bg-white hover:border-[#ccbba3]'
            }`}
            style={{ height: cardHeight }}
          >
            <div className="flex h-full items-stretch pr-9">
              <div className="h-full flex-shrink-0 overflow-hidden border-r border-[#E3D9CB] bg-[#F6F0E7]" style={{ width: imageWidth }}>
                <img src={finishImage} alt={finish.label} className="h-full w-full object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center" style={{ padding: textPadding }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8E7C66]">{finish.label}</div>
                <div className="mt-1 text-[15px] font-semibold leading-5 text-[#2D241B]">{finish.title}</div>
              </div>
              {isActive && (
                <div className="absolute right-3 top-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white">
                  <Check size={11} strokeWidth={3.2} />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function FramedArtwork({
  src,
  alt,
  finishType,
  frameStyle,
  frameTexture,
  className = '',
  ratioClassName = 'aspect-[4/5]',
  isGenerating = false,
  generationProgress = 0,
  generationPhase = '',
  placeholder,
  style,
  imageClassName = '',
  artworkOverlay,
}: {
  src?: string | null;
  alt: string;
  finishType: FinishType;
  frameStyle: string;
  frameTexture?: string;
  className?: string;
  ratioClassName?: string;
  isGenerating?: boolean;
  generationProgress?: number;
  generationPhase?: string;
  placeholder?: React.ReactNode;
  style?: React.CSSProperties;
  imageClassName?: string;
  artworkOverlay?: React.ReactNode;
}) {
  const artwork = (
    <div className={`relative overflow-hidden bg-[#f7f2ea] ${ratioClassName}`}>
      {src ? <img src={src} alt={alt} className={`block h-full w-full object-cover transition duration-700 ${imageClassName}`} /> : placeholder ?? <BlankArtworkPlaceholder />}
      {artworkOverlay}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(67,46,23,0.12),inset_0_18px_24px_rgba(255,255,255,0.04),inset_0_-10px_18px_rgba(0,0,0,0.04)]" />
    </div>
  );

  if (finishType === 'rolled-canvas') {
    return (
      <div
        className={`relative w-full overflow-hidden bg-[#f4eadb] p-[10px] shadow-[0_18px_34px_rgba(38,28,18,0.16),0_4px_10px_rgba(38,28,18,0.08)] ${className}`}
        style={style}
      >
        <div className="border border-[#d8cab6] bg-[#fffdfa] p-[12px]">{artwork}</div>
        {isGenerating && <GenerationOverlay progress={generationProgress} phase={generationPhase} />}
      </div>
    );
  }

  if (finishType === 'gallery-wrap') {
    return (
      <div
        className={`relative w-full overflow-hidden bg-[linear-gradient(135deg,#c9b391_0%,#9f8763_55%,#d6c1a0_100%)] p-[7px] shadow-[0_22px_40px_rgba(38,28,18,0.18),0_5px_12px_rgba(38,28,18,0.12)] ${className}`}
        style={style}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_30%,rgba(73,54,34,0.12)_100%)]" />
        <div className="relative bg-[#efe3d2] p-[7px] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-2px_4px_rgba(85,62,39,0.10)]">
          {artwork}
        </div>
        {isGenerating && <GenerationOverlay progress={generationProgress} phase={generationPhase} />}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden p-[12px] shadow-[0_24px_46px_rgba(38,28,18,0.3),0_5px_12px_rgba(38,28,18,0.22)] ${className}`}
      style={{ ...style, backgroundImage: frameStyle }}
    >
      {frameTexture && (
        <div
          className="pointer-events-none absolute inset-[2px] bg-cover bg-center opacity-[0.92] mix-blend-multiply"
          style={{ backgroundImage: `url(${frameTexture})` }}
        />
      )}
      <div className="pointer-events-none absolute inset-[2px] bg-[linear-gradient(140deg,rgba(255,255,255,0.38),rgba(255,255,255,0.08)_18%,transparent_32%,transparent_58%,rgba(68,49,31,0.12)_76%,rgba(38,27,18,0.2)_100%)] opacity-90" />
      <div className="pointer-events-none absolute inset-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-2px_4px_rgba(58,41,25,0.14),inset_2px_0_3px_rgba(255,255,255,0.08),inset_-2px_0_4px_rgba(44,31,20,0.12)]" />
      <div className="bg-[#22180f] p-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_0_rgba(52,37,24,0.14)]">
        <div className="relative overflow-hidden p-[8px]" style={{ backgroundImage: frameStyle }}>
          {frameTexture && (
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.35] mix-blend-overlay"
              style={{ backgroundImage: `url(${frameTexture})` }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.28),transparent_18%,transparent_56%,rgba(82,58,32,0.1)_76%,rgba(35,25,17,0.14)_100%)]" />
          <div className="bg-[#efe6d7] p-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(154,125,88,0.18)]">
            {artwork}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-[22px] right-[22px] top-[11px] h-px bg-[linear-gradient(90deg,transparent,rgba(255,249,238,0.26),rgba(168,138,102,0.14),transparent)]" />
      <div className="pointer-events-none absolute inset-x-[14px] bottom-[8px] h-8 bg-gradient-to-b from-transparent via-[rgba(90,68,46,0.04)] to-[rgba(54,39,26,0.12)]" />
      {isGenerating && <GenerationOverlay progress={generationProgress} phase={generationPhase} />}
    </div>
  );
}

function ReferenceArtworkOverlay({ sourceFileName: _sourceFileName }: { sourceFileName: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-[linear-gradient(180deg,rgba(253,249,242,0.14),rgba(255,251,246,0.10)_42%,rgba(88,66,45,0.12)_100%)] backdrop-blur-[3px]">
      <div className="flex justify-center px-3 pt-3 md:px-4 md:pt-4">
        <div className="rounded-[8px] border border-white/70 bg-white/76 px-3.5 py-1.5 text-[10px] font-medium tracking-normal text-[#6f5f4d] shadow-[0_8px_18px_rgba(55,42,28,0.08)] backdrop-blur">
          Reference Loaded
        </div>
      </div>

      <div className="p-3 md:p-4">
        <div className="mx-auto max-w-[18rem] rounded-[12px] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(247,242,235,0.38))] px-4 py-3 text-center text-[#5f5245] shadow-[0_18px_36px_rgba(46,34,24,0.10)] backdrop-blur-lg">
          <div className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#8c7a67]">Next step</div>
          <div className="mt-1.5 text-[clamp(0.72rem,0.94vw,0.82rem)] font-medium leading-[1.45] text-[#5b4e40]">
            Choose a style, then generate your first preview.
          </div>
        </div>
      </div>
    </div>
  );
}

function BlankArtworkPlaceholder() {
  return <div className="absolute inset-0 bg-[#fbf8f3]" />;
}

function CommerceCanvasPlaceholder({
  hasUpload,
  isGenerating,
  orientation = 'portrait',
  sizeId,
  viewport = 'desktop',
  selectedPreviewBackdrop,
}: {
  hasUpload: boolean;
  isGenerating: boolean;
  orientation?: CanvasOrientation;
  sizeId?: string;
  viewport?: 'mobile' | 'desktop';
  selectedPreviewBackdrop: typeof restrainedPreviewBackdrop;
}) {
  const isLandscape = orientation === 'landscape';
  const isMobileViewport = viewport === 'mobile';
  const isLandscape75 = sizeId === 'landscape-75x60';
  const isLandscape100 = sizeId === 'landscape-100x80';
  const isSquare60 = sizeId === 'square-60x60';
  const isPortrait40 = sizeId === 'portrait-40x50';
  const isPortrait60 = sizeId === 'portrait-60x75';
  const useCompactPortraitTextLayout = isPortrait40 || isPortrait60;
  const useLandscapeMobileLayout = isMobileViewport && (isLandscape75 || isLandscape100);
  const useSquareMobileLayout = isMobileViewport && isSquare60;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundImage: selectedPreviewBackdrop.placeholderBackground }}>
      <div className="absolute inset-0" style={{ backgroundImage: selectedPreviewBackdrop.placeholderOverlay }} />
      {!hasUpload && !isGenerating && (
        useLandscapeMobileLayout ? (
          <div className={`absolute inset-0 text-center text-[#8f7f6c] ${isLandscape100 ? 'px-[5.5%] pt-[11%] pb-[3.5%]' : 'px-[7%] pt-[7.5%] pb-[4.5%]'}`}>
            <div className={`mx-auto flex flex-col items-center ${isLandscape100 ? 'gap-2.5' : 'gap-2'}`}>
              <div className="opacity-50">
                <QuietCanvasIllustration size={isLandscape100 ? 'landscape-compact' : 'landscape-compact'} />
              </div>
              <div className={`h-px bg-[linear-gradient(90deg,transparent,rgba(177,153,121,0.18),rgba(177,153,121,0.32),transparent)] ${isLandscape100 ? 'w-[34%]' : 'w-[32%]'}`} />
              <div className={`font-medium uppercase text-[#9a866f] ${isLandscape100 ? 'text-[9px] tracking-[0.14em]' : 'text-[9px] tracking-[0.14em]'}`}>
                Quiet Canvas State
              </div>
              <div className={`mx-auto w-full text-balance font-medium tracking-[-0.035em] text-[#5a4331] ${isLandscape100 ? 'max-w-[92%] text-[clamp(1rem,2.32vw,1.16rem)] leading-[1.06]' : 'max-w-[82%] text-[clamp(0.9rem,2.05vw,1.04rem)] leading-[1.04]'}`}>
                Awaiting the first brushstroke
              </div>
              <p className={`mx-auto w-full text-balance text-[#9a846f] ${isLandscape100 ? 'max-w-[96%] text-[clamp(0.68rem,1.12vw,0.76rem)] leading-[1.26]' : 'max-w-[86%] text-[clamp(0.62rem,1.02vw,0.7rem)] leading-[1.18]'}`}>
                The frame stays intentionally calm so the generation moment feels more dramatic.
              </p>
            </div>
          </div>
        ) : useSquareMobileLayout ? (
          <div className="absolute inset-0 flex items-center justify-center px-[9%] py-[8%]">
            <div className="w-full max-w-[24rem] text-center text-[#8f7f6c]">
              <QuietCanvasIllustration size="square" />
              <div className="mx-auto mt-2 h-px w-[34%] bg-[linear-gradient(90deg,transparent,rgba(177,153,121,0.18),rgba(177,153,121,0.32),transparent)]" />
              <div className="mt-2 text-[9px] font-medium uppercase tracking-[0.14em] text-[#9a866f]">
                Quiet Canvas State
              </div>
              <div className="mx-auto mt-3 w-full max-w-[76%] text-balance text-[clamp(0.96rem,3.2vw,1.14rem)] font-medium leading-[1.04] tracking-[-0.04em] text-[#5a4331]">
                Awaiting the first brushstroke
              </div>
              <p className="mx-auto mt-3 w-full max-w-[82%] text-balance text-[clamp(0.66rem,0.98vw,0.76rem)] leading-[1.24] text-[#9a846f]">
                The frame stays intentionally calm so the generation moment feels more dramatic.
              </p>
            </div>
          </div>
        ) : isLandscape ? (
          <div className="absolute inset-0 flex items-center justify-center px-[8%] py-[8%]">
            <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center gap-5 text-center text-[#8f7f6c] sm:flex-row sm:items-center sm:justify-center sm:gap-8 sm:text-left">
              <div className="flex-shrink-0 opacity-55">
                <QuietCanvasIllustration size="landscape" />
              </div>
              <div className="w-full max-w-[20rem]">
                <div className="h-px w-[10rem] max-w-[58%] bg-[linear-gradient(90deg,transparent,rgba(177,153,121,0.22),rgba(177,153,121,0.34),transparent)] sm:max-w-none sm:bg-[linear-gradient(90deg,rgba(177,153,121,0.08),rgba(177,153,121,0.34),transparent)]" />
                <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#9a866f]">
                  Quiet Canvas State
                </div>
                <div className="mt-3 text-balance text-[clamp(1.18rem,1.8vw,1.6rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[#5a4331]">
                  Awaiting the first brushstroke
                </div>
                <p className="mt-3 max-w-[28rem] text-balance text-[clamp(0.84rem,1.02vw,1rem)] leading-[1.45] text-[#9a846f]">
                  The frame stays intentionally calm so the generation moment feels more dramatic.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-7">
            <div className="w-full max-w-[26.5rem] text-center text-[#8f7f6c]">
              <QuietCanvasIllustration size="default" />
              <div className="mx-auto mt-3 h-px w-[46%] bg-[linear-gradient(90deg,transparent,rgba(177,153,121,0.22),rgba(177,153,121,0.34),transparent)]" />
              <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9a866f]">
                Quiet Canvas State
              </div>
              <div
                className={`mx-auto w-full text-balance text-[clamp(1.06rem,3.45vw,1.4rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[#5a4331] ${
                  useCompactPortraitTextLayout ? 'mt-3 max-w-[calc(100%-0.75rem)] px-0.5' : 'mt-4 max-w-[calc(100%-2.5rem)] px-2'
                }`}
              >
                Awaiting the first brushstroke
              </div>
              <p
                className={`mx-auto w-full text-balance text-[clamp(0.82rem,0.98vw,0.92rem)] leading-[1.42] text-[#9a846f] ${
                  useCompactPortraitTextLayout ? 'mt-3 max-w-[calc(100%-0.25rem)] px-0' : 'mt-4 max-w-[calc(100%-0.1rem)] px-0'
                }`}
              >
                The frame stays intentionally calm so the generation moment feels more dramatic.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

function QuietCanvasIllustration({ size = 'default' }: { size?: 'default' | 'landscape' | 'landscape-compact' | 'square' }) {
  const isLandscape = size === 'landscape' || size === 'landscape-compact';
  const isCompactLandscape = size === 'landscape-compact';
  const isSquare = size === 'square';

  return (
    <div className={`mx-auto ${isSquare ? 'w-[96px] max-w-[28%]' : isCompactLandscape ? 'w-[clamp(4.4rem,9vw,5.8rem)] max-w-[16vw]' : isLandscape ? 'w-[clamp(8rem,12vw,10.5rem)] max-w-[28vw]' : 'w-[152px] max-w-[44%]'}`}>
      <img src={imgCreatePlaceholderOptionB} alt="Quiet canvas placeholder illustration" className="block h-auto w-full" />
    </div>
  );
}

function StyleSamplesModal({
  isOpen,
  title,
  description,
  images,
  activeIndex,
  setActiveIndex,
  onClose,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  images: StyleSampleImage[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || images.length === 0) return null;

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const activeImage = images[safeIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] overflow-y-auto bg-[#241C16]/58 px-4 py-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="mx-auto flex min-h-full w-full max-w-[1080px] items-center"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="max-h-[calc(100dvh-40px)] w-full overflow-hidden rounded-[8px] border border-[#DCCFBC] bg-[#FBF8F3] shadow-[0_30px_80px_rgba(20,14,10,0.35)]">
            <div className="flex items-center justify-between border-b border-[#DCCFBC] px-5 py-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8F816C]">Style Samples</p>
                <h2 className="mt-1 text-lg font-semibold text-[#241C16]">{title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[8px] p-2 text-[#31271F] transition hover:bg-[#F3EBDE]"
                aria-label="Close style samples"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-4 lg:p-5">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_230px] lg:items-stretch">
                <div className="h-auto overflow-hidden rounded-[8px] border border-[#E2D7C8] bg-white shadow-[0_20px_50px_rgba(43,31,21,0.08)] lg:h-[min(66vh,620px)]">
                  <img src={activeImage.src} alt={activeImage.alt} className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" />
                </div>

                <div className="relative min-h-0 lg:h-[min(66vh,620px)] lg:overflow-hidden">
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:flex lg:h-full lg:flex-col lg:overflow-y-auto lg:pr-1">
                    {images.map((image, index) => {
                      const isActive = index === safeIndex;

                      return (
                        <button
                          key={`${image.src}-${index}`}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          className={`overflow-hidden rounded-[8px] border bg-white text-left transition lg:h-[124px] lg:flex-none ${
                            isActive ? 'border-[#111111] shadow-[0_10px_24px_rgba(43,31,21,0.10)]' : 'border-[#DDD1BF] hover:border-[#B8A78E]'
                          }`}
                        >
                          <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover lg:h-full lg:aspect-auto" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="mt-3 max-w-[54rem] text-[13px] leading-6 text-[#5F564B]">{description}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GenerationOverlay({ progress, phase }: { progress: number; phase: string }) {
  const percent = Math.max(3, Math.min(100, Math.round(progress * 100)));

  return (
    <div className="pointer-events-none absolute inset-[19px] overflow-hidden">
      <video
        src={generationMotionVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-[0.94]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,248,232,0.10),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(189,154,104,0.08),transparent_24%),linear-gradient(180deg,rgba(255,248,236,0.02),rgba(70,52,34,0.06)_72%,rgba(35,27,21,0.12)_100%)] backdrop-blur-[1px]" />

      <div className="absolute inset-x-[8%] bottom-[10%] rounded-[12px] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(247,242,234,0.64))] px-4 py-3 text-[#4f4438] shadow-[0_16px_34px_rgba(45,32,20,0.12)] backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#998876]">Generation Progress</div>
          </div>
          <div className="flex h-7 w-[3.25rem] flex-shrink-0 items-center justify-center self-start rounded-[8px] border border-[#ffffff]/80 bg-white/70 text-[11px] font-semibold tracking-[0.02em] text-[#6f604f] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:w-[3.4rem]">
            {percent}%
          </div>
        </div>
        <div className="mt-2 text-[clamp(1.04rem,1.7vw,1.55rem)] font-sans font-semibold leading-[1.08] tracking-[-0.04em] text-[#43372c]">
          Your portrait is taking shape.
        </div>
        <div className="mt-1.5 max-w-[32ch] truncate text-[12px] leading-4.5 text-[#7a6d60]">
          {phase}
        </div>

        <div className="mt-3">
          <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.22em] text-[#a08f7d]">
            <span>Studio in progress</span>
          </div>
          <div className="relative h-[5px] overflow-hidden rounded-full bg-[#cdbca8]/28">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#b88942_0%,#f1d8ad_46%,#c79d5a_100%)] shadow-[0_2px_10px_rgba(188,145,80,0.28)]"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-y-0 w-20 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)]"
              animate={{ x: ['-120%', '420%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-[22%] bottom-[6%] h-14 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_72%)] blur-2xl" />
    </div>
  );
}
