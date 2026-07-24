import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Brush, Frame, Package, Star, SwatchBook } from 'lucide-react';
import { portraitStyles, type PortraitStyleId } from '../data/portraitStyles';

import imgHero from '../assets/images/main_golden_oil_1780093879389.png';
import imgHeroClassicOriginal from '../assets/images/landing-hero-20260715/landing-hero0-1-min.webp';
import imgHeroClassic from '../assets/images/landing-hero-20260715/landing-hero0-2-min.webp';
import imgHeroImpressionistOriginal from '../assets/images/landing-hero-20260715/landing-hero1-1-min.webp';
import imgHeroImpressionist from '../assets/images/landing-hero-20260715/landing-hero1-2-min.webp';
import imgHeroAcrylicOriginal from '../assets/images/landing-hero-20260715/landing-hero2-1-min.webp';
import imgHeroAcrylic from '../assets/images/landing-hero-20260715/landing-hero2-2-min.webp';
import imgHeroWarmOriginal from '../assets/images/landing-hero-20260715/landing-hero3-1-min.webp';
import imgHeroWarm from '../assets/images/landing-hero-20260715/landing-hero3-2-min.webp';
import imgHeroBg from '../assets/images/hero_painting_gallery_minimal_20260530.png';
import imgMomentsGirlDog from '../assets/images/moments_girl_dog_1780095649363.png';
import imgMaterialPaints from '../assets/images/materials_oil_paints_20260530.png';
import imgMaterialCanvas from '../assets/images/materials_cotton_canvas_20260530.png';
import imgMaterialFrame from '../assets/images/materials_wood_frame_20260530.png';
import imgMaterialPackaging from '../assets/images/materials_archival_packaging_20260530.png';
import HowItWorksStepsGrid from '../components/HowItWorksStepsGrid';

type RouteSetter = (r: 'home' | 'create' | 'how') => void;

type StyleDemo = {
  id: string;
  label: string;
  mood: string;
  note: string;
  original: string;
  transformed: string;
};

const styleDemos: StyleDemo[] = [
  ...portraitStyles.map((style) => ({
    id: style.id,
    label: style.title,
    mood: style.landingMood,
    note: style.landingNote,
    ...(
      {
        realism: {
          original: imgHeroClassicOriginal,
          transformed: imgHeroClassic,
        },
        classic: {
          original: imgHeroWarmOriginal,
          transformed: imgHeroWarm,
        },
        impressionist: {
          original: imgHeroImpressionistOriginal,
          transformed: imgHeroImpressionist,
        },
        'bold-expressive': {
          original: imgHeroAcrylicOriginal,
          transformed: imgHeroAcrylic,
        },
      } satisfies Record<PortraitStyleId, Pick<StyleDemo, 'original' | 'transformed'>>
    )[style.id],
  })),
];

const materialStories = [
  {
    id: 'pigment',
    label: 'Pigment',
    title: 'Color that feels alive up close',
    body: 'We lean into tonal depth and brush-preserving print detail so the preview still feels tactile, not flat.',
    image: imgMaterialPaints,
    Icon: Brush,
  },
  {
    id: 'canvas',
    label: 'Canvas',
    title: 'Texture that keeps the piece from feeling digital',
    body: 'Premium canvas gives the final portrait enough grain and softness to read like a studio finish.',
    image: imgMaterialCanvas,
    Icon: SwatchBook,
  },
  {
    id: 'frame',
    label: 'Frame',
    title: 'Frames that complete the mood',
    body: 'Warm woods and soft metallics make the portrait feel curated for a room, not merely delivered.',
    image: imgMaterialFrame,
    Icon: Frame,
  },
  {
    id: 'delivery',
    label: 'Delivery',
    title: 'Presentation that still feels ceremonial',
    body: 'Protective packaging, gifting polish, and careful finishing keep the unboxing part of the story.',
    image: imgMaterialPackaging,
    Icon: Package,
  },
];

const galleryReviews = [
  {
    title: 'Absolutely stunning.',
    quote:
      '"I was nervous ordering art online, but the AI preview feature gave me confidence. When the actual painting arrived, it was even better than the preview."',
    name: 'Sarah Jenkins',
    order: 'Ordered the Realism style',
    initials: 'SJ',
    avatar: 'from-[#b7d0de] to-[#6f8491]',
  },
  {
    title: 'Worth every penny.',
    quote:
      '"The quality of the canvas and the antique frame are top-notch. You can see the actual brushstrokes. It feels like a true heirloom piece."',
    name: 'James Mitchell',
    order: 'Ordered the Impressionist style',
    initials: 'JM',
    avatar: 'from-[#b8c4cf] to-[#61707b]',
  },
  {
    title: 'A wonderful gift.',
    quote:
      '"We used the preview flow before ordering and it made the decision easy. The final framed portrait arrived feeling completely resolved."',
    name: 'Emma Rodriguez',
    order: 'Ordered the Classic style',
    initials: 'ER',
    avatar: 'from-[#8fa18f] to-[#455647]',
  },
  {
    title: 'The preview sold us.',
    quote:
      '"Seeing the portrait mocked up in a room made the choice feel obvious. It already looked like it belonged in our home."',
    name: 'Noah Parker',
    order: 'Ordered the Bold & Expressive style',
    initials: 'NP',
    avatar: 'from-[#d9b79a] to-[#8a6248]',
  },
  {
    title: 'It felt right before checkout.',
    quote:
      '"The preview and style flow gave us confidence before ordering. By the time we approved the frame and size, it already felt like our piece."',
    name: 'Olivia Chen',
    order: 'Ordered the Realism style',
    initials: 'OC',
    avatar: 'from-[#d7c1a8] to-[#8b6549]',
  },
  {
    title: 'The quality reads as art, not decor.',
    quote:
      '"We expected something sweet, but what arrived felt genuinely considered. The texture, framing, and finish made it feel collected."',
    name: 'Daniel Foster',
    order: 'Ordered the Classic style',
    initials: 'DF',
    avatar: 'from-[#b7c5b0] to-[#5e7057]',
  },
  {
    title: 'The room preview made the decision easy.',
    quote:
      '"Seeing it in a believable room was the turning point. It stopped feeling abstract and started feeling like something we could actually live with."',
    name: 'Priya Shah',
    order: 'Ordered the Impressionist style',
    initials: 'PS',
    avatar: 'from-[#c9b8d8] to-[#7e678f]',
  },
];

const HERO_STYLE_AUTOPLAY_MS = 4000;
const HERO_MORPH_MS = 2500;

export default function Home({ onNavigate }: { onNavigate: RouteSetter }) {
  useEffect(() => {
    const pendingSection = window.sessionStorage.getItem('viewbrush-pending-home-section');
    if (!pendingSection) return;

    window.sessionStorage.removeItem('viewbrush-pending-home-section');
    window.requestAnimationFrame(() => {
      document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <div className="flex w-full flex-col pt-16">
      <GalleryHeroSection onNavigate={onNavigate} />
      <GalleryStyleSection onNavigate={onNavigate} />
      <GalleryProcessSection onNavigate={onNavigate} />
      <MaterialDeskSection />
      <GalleryProofSection onNavigate={onNavigate} />
    </div>
  );
}

function GalleryHeroSection({ onNavigate }: { onNavigate: RouteSetter }) {
  const [activeId, setActiveId] = useState(styleDemos[0].id);
  const [isFrameHovered, setIsFrameHovered] = useState(false);
  const [isTagHovered, setIsTagHovered] = useState(false);
  const activeStyle = useMemo(() => styleDemos.find((style) => style.id === activeId) ?? styleDemos[0], [activeId]);
  const activeStyleIndex = useMemo(() => styleDemos.findIndex((style) => style.id === activeId), [activeId]);
  const isAutoplayPaused = isFrameHovered || isTagHovered;

  const selectStyle = (styleId: string) => setActiveId(styleId);

  useEffect(() => {
    if (isAutoplayPaused) return;

    const timeoutId = window.setTimeout(() => {
      setActiveId((currentId) => {
        const currentIndex = styleDemos.findIndex((style) => style.id === currentId);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % styleDemos.length : 0;
        return styleDemos[nextIndex].id;
      });
    }, HERO_STYLE_AUTOPLAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeId, isAutoplayPaused]);

  return (
    <section className="relative min-h-[88vh] overflow-hidden border-b border-[#DCCFBC] bg-[#F6F0E7]">
      <div className="absolute inset-0">
        <img src={imgHeroBg} alt="Curated interior" className="h-full w-full object-cover object-right opacity-95" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,240,231,0.98)_0%,rgba(246,240,231,0.88)_38%,rgba(246,240,231,0.22)_72%,rgba(246,240,231,0.08)_100%)]" />
      </div>
      <div className="relative mx-auto grid min-h-[calc(88vh-4rem)] max-w-[1600px] items-center gap-8 px-6 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[520px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#897A67]">AI Preview. Artist Finished.</p>
          <h1 className="mt-4 max-w-[14ch] font-sans text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] md:text-7xl">
            Your memory, curated for the wall it lives on.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#53493E] md:text-lg">
            Start with a beloved photo, review several painterly directions, then refine the frame and room setting before committing to the final piece.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate('create')}
              className="button-lift inline-flex items-center justify-center rounded-[8px] bg-[#31271F] px-8 py-4 text-sm font-semibold tracking-[0.02em] text-[#FBF8F3] transition hover:bg-[#241C16]"
            >
              Start Your Painting
            </button>
            <button className="button-lift inline-flex items-center justify-center rounded-[8px] border border-[#DCCFBC] bg-white/70 px-8 py-4 text-sm font-medium text-[#31271F] transition hover:bg-[#F3EBDE]">
              View Styles
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#64594C]">
            <span>4.9 average from 1,000+ reviews</span>
            <span>Preview before you pay</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative lg:hidden"
        >
          <div className="mx-auto w-full max-w-[26rem]">
            <div className="absolute right-3 top-3 z-10 rounded-[8px] border border-white/70 bg-white/84 px-3 py-1.5 text-[11px] font-medium text-[#5D5246] backdrop-blur">
              {activeStyle.label}
            </div>
            <FramedArtwork alt={activeStyle.label}>
              <HeroArtworkMorph
                key={`mobile-${activeStyle.id}`}
                originalSrc={activeStyle.original}
                paintedSrc={activeStyle.transformed}
                alt={activeStyle.label}
                revealDirection={activeStyleIndex % 2 === 1 ? 'rtl' : 'ltr'}
              />
            </FramedArtwork>
            <div className="mt-3 flex flex-wrap gap-2">
              {styleDemos.map((style) => (
                <button
                  key={style.id}
                  onClick={() => selectStyle(style.id)}
                  className={`rounded-[8px] px-3 py-2 text-[11px] font-semibold transition ${style.id === activeId ? 'bg-[#31271F] text-[#FBF8F3]' : 'bg-white/82 text-[#5D5246] hover:bg-white'}`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }} className="relative hidden lg:block">
          <div className="absolute right-[8%] top-[8%] rounded-[8px] border border-white/70 bg-white/80 px-4 py-2 text-xs font-medium text-[#5D5246] backdrop-blur">
            {activeStyle.label}
          </div>
          <div className="absolute bottom-[12%] left-[5%] w-48 rounded-[8px] bg-white/88 p-3 shadow-[0_24px_40px_rgba(43,31,21,0.14)] backdrop-blur">
            <img src={activeStyle.original} alt="Source reference" className="aspect-[4/5] w-full rounded-[4px] object-cover" />
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Source photo</p>
          </div>
          <div className="ml-auto w-full max-w-[560px]">
            <FramedArtwork alt={activeStyle.label}>
              <HeroArtworkMorph
                key={`desktop-${activeStyle.id}`}
                originalSrc={activeStyle.original}
                paintedSrc={activeStyle.transformed}
                alt={activeStyle.label}
                revealDirection={activeStyleIndex % 2 === 1 ? 'rtl' : 'ltr'}
                enableManualCompare
                onFrameHoverChange={setIsFrameHovered}
              />
            </FramedArtwork>
            <div
              className="mt-5 flex flex-wrap gap-2"
              onMouseEnter={() => setIsTagHovered(true)}
              onMouseLeave={() => setIsTagHovered(false)}
            >
              {styleDemos.map((style) => (
                <button
                  key={style.id}
                  onMouseEnter={() => selectStyle(style.id)}
                  onFocus={() => selectStyle(style.id)}
                  onClick={() => selectStyle(style.id)}
                  className={`px-3 py-2 text-[10px] font-semibold transition ${style.id === activeId ? 'bg-[#31271F] text-[#FBF8F3]' : 'bg-white/85 text-[#5D5246] hover:bg-white'}`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroArtworkMorph({
  originalSrc,
  paintedSrc,
  alt,
  revealDirection,
  enableManualCompare = false,
  onFrameHoverChange,
}: {
  originalSrc: string;
  paintedSrc: string;
  alt: string;
  key?: string;
  revealDirection: 'ltr' | 'rtl';
  enableManualCompare?: boolean;
  onFrameHoverChange?: (isHovered: boolean) => void;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const paintedLayerRef = useRef<HTMLDivElement | null>(null);
  const overlayLayerRef = useRef<HTMLDivElement | null>(null);
  const autoMorphTimeoutRef = useRef<number | null>(null);
  const autoMorphRafRef = useRef<number | null>(null);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const revealProgressRef = useRef(0);
  const pointerRevealTargetRef = useRef(0);
  const pointerRafRef = useRef<number | null>(null);

  useEffect(() => {
    setIsPointerInside(false);
    revealProgressRef.current = 0;
    pointerRevealTargetRef.current = 0;
    if (pointerRafRef.current !== null) {
      window.cancelAnimationFrame(pointerRafRef.current);
      pointerRafRef.current = null;
    }
    applyReveal(0, false);

    autoMorphRafRef.current = window.requestAnimationFrame(() => {
      autoMorphTimeoutRef.current = window.setTimeout(() => {
        applyReveal(1, false);
        autoMorphTimeoutRef.current = null;
      }, 60);
    });

    return () => {
      if (autoMorphRafRef.current !== null) {
        window.cancelAnimationFrame(autoMorphRafRef.current);
        autoMorphRafRef.current = null;
      }
      if (autoMorphTimeoutRef.current !== null) {
        window.clearTimeout(autoMorphTimeoutRef.current);
        autoMorphTimeoutRef.current = null;
      }
      if (pointerRafRef.current !== null) {
        window.cancelAnimationFrame(pointerRafRef.current);
        pointerRafRef.current = null;
      }
    };
  }, [paintedSrc]);

  useEffect(() => {
    onFrameHoverChange?.(isPointerInside);
  }, [isPointerInside, onFrameHoverChange]);

  function applyReveal(nextProgress: number, manualMode: boolean) {
    const clamped = Math.max(0, Math.min(1, nextProgress));
    revealProgressRef.current = clamped;

    const revealPercent = clamped * 100;
    const paintedClip = manualMode
      ? `inset(0 ${100 - revealPercent}% 0 0)`
      : revealDirection === 'rtl'
        ? `inset(0 0 0 ${100 - revealPercent}%)`
        : `inset(0 ${100 - revealPercent}% 0 0)`;

    if (paintedLayerRef.current) {
      paintedLayerRef.current.style.clipPath = paintedClip;
      paintedLayerRef.current.style.transition = manualMode
        ? 'none'
        : `clip-path ${HERO_MORPH_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out`;
    }

    if (overlayLayerRef.current) {
      overlayLayerRef.current.style.opacity = manualMode ? '0.14' : `${0.08 + clamped * 0.2}`;
      overlayLayerRef.current.style.transition = manualMode ? 'opacity 80ms linear' : 'opacity 0.9s ease-out';
    }
  }

  function updateRevealFromClientX(clientX: number) {
    if (!frameRef.current) return;
    const bounds = frameRef.current.getBoundingClientRect();
    const next = (clientX - bounds.left) / bounds.width;
    pointerRevealTargetRef.current = Math.max(0, Math.min(1, next));

    if (pointerRafRef.current !== null) return;

    pointerRafRef.current = window.requestAnimationFrame(() => {
      pointerRafRef.current = null;
      applyReveal(pointerRevealTargetRef.current, true);
    });
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!enableManualCompare) return;
    updateRevealFromClientX(event.clientX);
  }

  function handlePointerEnter() {
    if (!enableManualCompare) return;
    if (autoMorphTimeoutRef.current !== null) {
      window.clearTimeout(autoMorphTimeoutRef.current);
      autoMorphTimeoutRef.current = null;
    }
    setIsPointerInside(true);
  }

  function handlePointerLeave() {
    if (!enableManualCompare) return;
    setIsPointerInside(false);
    if (pointerRafRef.current !== null) {
      window.cancelAnimationFrame(pointerRafRef.current);
      pointerRafRef.current = null;
    }
    applyReveal(1, false);
  }

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="hero-art-morph-root group relative h-full w-full overflow-hidden bg-[#f7f2ea]"
    >
      <img
        src={originalSrc}
        alt={`${alt} source`}
        className="block h-full w-full scale-[1.015] object-cover saturate-[0.84] sepia-[0.06] brightness-[1.03]"
      />

      <div
        ref={paintedLayerRef}
        className="absolute inset-0"
        style={{ opacity: 1 }}
      >
        <img src={paintedSrc} alt={alt} className="block h-full w-full scale-[1.01] object-cover" />
      </div>

      <div
        ref={overlayLayerRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,249,240,0.16),transparent_36%),linear-gradient(180deg,rgba(255,250,242,0.08),rgba(70,52,35,0.08))]"
      />

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(67,46,23,0.12)]" />
    </div>
  );
}

function GalleryStyleSection({ onNavigate }: { onNavigate: RouteSetter }) {
  const [activeId, setActiveId] = useState(styleDemos[1].id);
  const activeStyle = useMemo(() => styleDemos.find((style) => style.id === activeId) ?? styleDemos[1], [activeId]);

  return (
    <section className="bg-[#FBF8F3] py-24">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
        <div className="max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">Gallery Curator</p>
          <h2 className="mt-4 font-sans text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
            Browse styles like a private viewing, not a product grid.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#5C5247]">
            Review directions side by side and let the room-sized result answer whether the piece feels timeless, intimate, or contemporary.
          </p>
          <button
            onClick={() => onNavigate('create')}
            className="group mt-8 inline-flex items-center gap-2 border-b border-[#31271F] pb-2 text-sm font-medium text-[#31271F]"
          >
            Start with this collection <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="min-w-0 space-y-6">
          <div className="min-w-0 lg:hidden">
            <motion.div
              key={`mobile-${activeStyle.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2px] border border-[#DDCFBC] bg-[#F6F0E7] p-4 shadow-[0_18px_36px_rgba(46,34,21,0.06)]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Selected direction</p>
              <div className="mt-3 grid grid-cols-[0.28fr_0.72fr] items-start gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8F816C]">Source photo</p>
                  <img
                    src={activeStyle.original}
                    alt={`${activeStyle.label} original`}
                    className="mt-2 aspect-[4/5] w-full rounded-[2px] object-cover shadow-[0_8px_20px_rgba(56,42,29,0.08)]"
                  />
                </div>
                <div className="min-w-0">
                  <FramedArtwork src={activeStyle.transformed} alt={activeStyle.label} />
                </div>
              </div>
              <div className="mt-4 border-t border-[#DCCFBC] pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">{activeStyle.mood}</p>
                <h3 className="mt-2 text-[1.65rem] font-semibold leading-tight text-[#2D241B]">{activeStyle.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#62584D]">{activeStyle.note}</p>
                <p className="mt-3 text-sm leading-6 text-[#5D5448]">
                  Best for customers who want the final piece to feel already resolved in a living room.
                </p>
              </div>
            </motion.div>

            <div className="mt-4 w-full min-w-0">
              <div className="-mx-1 w-full overflow-x-auto pb-1 hide-scrollbar">
                <div className="flex w-max gap-2 px-1">
                  {styleDemos.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setActiveId(style.id)}
                      className={`rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition ${
                        style.id === activeId
                          ? 'border-[#31271F] bg-[#31271F] text-[#FBF8F3]'
                          : 'border-[#DCCFBC] bg-white/88 text-[#5D5246]'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden gap-6 lg:grid lg:grid-cols-[0.62fr_1.38fr]">
            <div className="space-y-3">
              {styleDemos.map((style) => (
                <button
                  key={style.id}
                  onMouseEnter={() => setActiveId(style.id)}
                  onFocus={() => setActiveId(style.id)}
                  onClick={() => setActiveId(style.id)}
                  className={`w-full border-b px-0 py-4 text-left transition ${style.id === activeId ? 'border-[#31271F] opacity-100' : 'border-[#E8DDCD] opacity-65 hover:opacity-100'}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">{style.mood}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#2D241B]">{style.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#62584D]">{style.note}</p>
                </button>
              ))}
            </div>

            <motion.div
              key={`desktop-${activeStyle.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid gap-5 rounded-[2px] border border-[#DDCFBC] bg-[#F6F0E7] p-5 md:grid-cols-[0.82fr_1.18fr]"
            >
              <img src={activeStyle.original} alt={`${activeStyle.label} original`} className="aspect-[4/5] w-full object-cover" />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Selected direction</p>
                  <div className="mt-4 max-w-[380px]">
                    <FramedArtwork src={activeStyle.transformed} alt={activeStyle.label} />
                  </div>
                </div>
                <div className="mt-5 border-t border-[#DCCFBC] pt-4 text-sm leading-6 text-[#5D5448]">
                  Best for customers who want the final piece to feel already resolved in a living room.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryProcessSection({ onNavigate }: { onNavigate: RouteSetter }) {
  return (
    <section id="how-it-works" className="border-y border-[#DCCFBC] bg-[#EEE5D8] py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">How it works</p>
            <h2 className="mt-4 font-sans text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
              A calmer path from photo to finished portrait.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('how')}
            className="inline-flex items-center self-start text-[13px] font-medium text-[#31271F] underline underline-offset-4 transition hover:text-[#241C16] md:self-auto"
          >
            See the full walkthrough
          </button>
        </div>
        <HowItWorksStepsGrid />
      </div>
    </section>
  );
}

function MaterialDeskSection() {
  const [activeId, setActiveId] = useState(materialStories[0].id);
  const activeStory = materialStories.find((story) => story.id === activeId) ?? materialStories[0];

  return (
    <section id="materials" className="bg-[#F6F0E7] py-20 md:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
        <div className="max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8d816f]">Material desk</p>
          <h2 className="mt-4 font-sans text-4xl font-semibold tracking-[-0.04em] text-[#241C16] md:text-5xl">The tactile part still matters.</h2>
          <p className="mt-5 text-base leading-7 text-[#5f564b]">
            The digital preview sells the direction. The materials sell the permanence. We want the final piece to feel intentional in a room.
          </p>
          <div className="mt-8 space-y-3">
            {materialStories.map((story) => {
              const { Icon } = story;
              return (
                <button
                  key={story.id}
                  onMouseEnter={() => setActiveId(story.id)}
                  onFocus={() => setActiveId(story.id)}
                  onClick={() => setActiveId(story.id)}
                  className={`flex w-full items-center gap-4 rounded-[8px] border px-4 py-4 text-left transition ${
                    story.id === activeId ? 'border-[#1c1b19] bg-white' : 'border-[#e4dacb] bg-transparent hover:bg-white/65'
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${story.id === activeId ? 'bg-[#1c1b19] text-white' : 'bg-[#ece2d3] text-[#5a5146]'}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">{story.label}</p>
                    <p className="mt-1 text-base font-semibold text-[#2d241b]">{story.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={activeStory.id}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[12px] border border-[#e2d8c8] bg-white shadow-[0_20px_40px_rgba(46,34,21,0.08)] lg:h-[630px]"
        >
          <div className="grid h-full md:grid-cols-[1.15fr_0.85fr]">
            <img src={activeStory.image} alt={activeStory.title} className="h-[320px] w-full object-cover md:h-full md:min-h-[340px]" />
            <div className="flex flex-col justify-between p-5 md:p-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Studio note</p>
                <h3 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-[#241C16]">{activeStory.title}</h3>
                <p className="mt-5 text-sm leading-7 text-[#60574c]">{activeStory.body}</p>
              </div>
              <div className="mt-5 rounded-[8px] bg-[#f7f1e8] p-4 text-sm leading-6 text-[#5d5449]">
                Customers should feel the object is as considered as the image. That is where premium trust actually lands.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GalleryProofSection({ onNavigate }: { onNavigate: RouteSetter }) {
  return (
    <section className="bg-[#F4EFE7] px-6 py-20 text-[#241C16] lg:px-10">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-sans text-3xl font-semibold leading-none tracking-[-0.03em] md:text-4xl">Customer Reviews</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[#5C5348]">
              <div className="flex items-center gap-1 text-[#1F1B17]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} className="fill-current" />
                ))}
              </div>
              <p className="text-base">4.9 average • 1,000+ verified reviews</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('create')}
            className="inline-flex items-center self-start text-[13px] font-medium text-[#31271F] underline underline-offset-4 transition hover:text-[#241C16] md:self-auto"
          >
            Read All Reviews
          </button>
        </div>

        <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {galleryReviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex min-h-[330px] w-[86vw] min-w-[86vw] snap-start flex-col rounded-[12px] border border-[#E0D5C6] bg-white p-7 shadow-[0_10px_24px_rgba(56,42,29,0.04)] md:w-[320px] md:min-w-[320px]"
            >
              <div className="flex items-center gap-1 text-[#1F1B17]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={15} className="fill-current" />
                ))}
              </div>
              <h3
                title={review.title}
                className="review-title-clamp mt-6 text-[1.55rem] leading-tight text-[#241C16] font-sans font-semibold tracking-tight"
              >
                {review.title}
              </h3>
              <div className="mt-4">
                <p className="review-body-scroll hide-scrollbar max-w-[28ch] text-[0.95rem] leading-7 text-[#6A6155]">
                  {review.quote}
                </p>
              </div>
              <div className="mt-auto border-t border-[#E5DCCF] pt-6">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${review.avatar} text-xs font-semibold text-white`}>
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#241C16]">{review.name}</p>
                    <p className="mt-1 text-sm text-[#8A8175]">{review.order}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FramedArtwork({
  src,
  alt,
  className = '',
  children,
}: {
  src?: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative w-full bg-[#5b4325] p-[4px] shadow-[0_20px_40px_rgba(38,28,18,0.24),0_3px_10px_rgba(38,28,18,0.18)] ${className}`}
      style={{ backgroundImage: 'linear-gradient(135deg, #8f6a3a 0%, #5c4326 38%, #b89158 60%, #3e2d1a 100%)' }}
    >
      <div className="bg-[#22180f] p-[1px]">
        <div className="relative p-[4px]" style={{ backgroundImage: 'linear-gradient(135deg, #caa566 0%, #8a6530 45%, #d7bb80 68%, #6d4f25 100%)' }}>
          <div className="bg-[#efe6d7] p-[10px]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f2ea]">
              {children ?? <img src={src} alt={alt} className="block h-full w-full object-cover" />}
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-[10px] right-[10px] top-[5px] h-px bg-white/25" />
      <div className="pointer-events-none absolute inset-x-[6px] bottom-[3px] h-5 bg-gradient-to-b from-transparent to-black/12" />
    </div>
  );
}
