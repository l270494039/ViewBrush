import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import { getButtonClasses } from '../utils/theme';
import HowItWorksStepsGrid from '../components/HowItWorksStepsGrid';
import imgHeroBg from '../assets/images/hero_painting_gallery_minimal_20260530.png';
import imgSourcePhoto from '../assets/images/moments_girl_dog_1780095649363.png';
import imgPreviewRoom from '../assets/images/hero_interior_painting_1780094551965.png';
import imgFinishedPainting from '../assets/images/main_golden_oil_1780093879389.png';

type InfoRoute = 'home' | 'create' | 'how' | 'about' | 'faq' | 'refund';

type Step = {
  number: string;
  title: string;
  paragraphs: string[];
};

const craftSteps: Step[] = [
  {
    number: '05',
    title: 'Prepare the Canvas',
    paragraphs: [
      'Once your direction is approved, your artist begins with premium cotton-linen canvas, selected for its natural texture, strength, and ability to hold the character of oil paint.',
      'The canvas is carefully prepared to create a stable foundation for rich color, expressive brushwork, and lasting detail.',
    ],
  },
  {
    number: '06',
    title: 'Map the Composition by Hand',
    paragraphs: [
      'Using your approved preview as a creative guide, the artist maps the composition by hand.',
      'Proportion, expression, light, and the small details that make the image personal are carefully considered before the painting begins to take shape.',
    ],
  },
  {
    number: '07',
    title: 'Build Color and Depth in Layers',
    paragraphs: [
      'Oil painting is developed gradually, not created in a single pass.',
      'Color, light, and form are built layer by layer, creating depth, dimension, and the sense of presence that makes a hand-painted portrait feel alive.',
    ],
  },
  {
    number: '08',
    title: 'Bring the Details to Life',
    paragraphs: [
      "The final character of each painting lives in the details - the direction of a pet's fur, the warmth in a smile, the movement of fabric, or the light in a familiar face.",
      'Your artist returns to these details with patience and careful brushwork, giving every piece its own texture, expression, and character.',
    ],
  },
  {
    number: '09',
    title: 'Finish for Your Home',
    paragraphs: [
      'When the painting is complete, it is carefully reviewed, finished, and prepared in the size and frame you selected.',
      'What began as a photo becomes a one-of-a-kind painting made to live with - on your wall, in your home, and in the everyday moments that follow.',
    ],
  },
];

const processNotes = [
  'Preview-first direction',
  'Hand-painted by a real artist',
  'Made to feel resolved in your home',
];

export default function HowItWorks({ onNavigate }: { onNavigate: (route: InfoRoute) => void }) {
  return (
    <div className="flex w-full flex-col pt-16">
      <section className="relative min-h-[72vh] overflow-hidden border-b border-[#DCCFBC] bg-[#F6F0E7]">
        <div className="relative mx-auto grid min-h-[calc(72vh-4rem)] max-w-[1600px] items-center gap-10 px-6 py-10 lg:grid-cols-[0.96fr_1.04fr] lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[760px]">
            <h1 className="max-w-[14ch] text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] md:text-7xl">
              From a photo you love to a painting made by hand.
            </h1>
            <p className="mt-6 max-w-[46ch] text-base leading-7 text-[#53493E] md:text-lg">
              See the direction before the painting begins. Then watch it come to life, layer by layer.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate('create')}
                className="button-lift inline-flex items-center justify-center rounded-[8px] bg-[#31271F] px-8 py-4 text-sm font-semibold tracking-[0.02em] text-[#FBF8F3] transition hover:bg-[#241C16]"
              >
                Start Your Painting
              </button>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="inline-flex items-center justify-center rounded-[8px] border border-[#DCCFBC] bg-white/72 px-8 py-4 text-sm font-medium text-[#31271F] transition hover:bg-[#F3EBDE]"
              >
                Read FAQ
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#64594C]">
              {processNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="relative lg:pl-4"
          >
            <div className="relative mx-auto max-w-[680px]">
              <div className="absolute left-[4%] top-[6%] z-20 w-28 rounded-[10px] border border-white/75 bg-white/88 p-2 shadow-[0_18px_30px_rgba(43,31,21,0.12)] backdrop-blur md:w-36">
                <img src={imgSourcePhoto} alt="Source portrait" className="aspect-[4/5] w-full rounded-[8px] object-cover" />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7D6A]">Source Photo</p>
              </div>

              <div className="overflow-hidden border border-[#E0D3C2] bg-[#ECE2D5] p-3 shadow-[0_28px_70px_rgba(42,31,22,0.14)]">
                <img src={imgPreviewRoom} alt="Painting preview in a room" className="h-[340px] w-full object-cover md:h-[440px]" />
              </div>

              <div className="absolute -bottom-6 right-[4%] z-20 w-44 rounded-[10px] border border-[#E0D4C5] bg-[#FBF8F3]/92 p-3 shadow-[0_18px_36px_rgba(43,31,21,0.12)] backdrop-blur md:w-56">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B7D6A]">
                  <span>Approved Direction</span>
                  <span>04</span>
                </div>
                <img src={imgFinishedPainting} alt="Finished hand-painted portrait" className="mt-3 aspect-[4/5] w-full object-cover" />
                <p className="mt-3 text-sm leading-6 text-[#5B5044]">Room view, frame choice, and creative direction all align before painting begins.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#DCCFBC] bg-[#FBF8F3] px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1480px]">
          <div className="mx-auto max-w-[1120px] pb-8 text-center">
            <h2 className="mx-auto text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
              Your Vision
            </h2>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-[#5C5247]">
              This stage helps you move from an important photo to a direction that already feels right in your home and in your hands.
            </p>
          </div>

          <HowItWorksStepsGrid className="mt-8" />
        </div>
      </section>

      <section className="bg-[#F6F0E7] px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1480px]">
          <div className="mx-auto max-w-[1120px] text-center">
            <h2 className="mx-auto text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
              Crafted From the Canvas Up
            </h2>
            <p className="mx-auto mt-5 max-w-[72ch] text-base leading-7 text-[#5C5247]">
              The second half of the process is slower and more tactile: surface, structure, color, detail, and the final finish all build toward a portrait meant to live on your wall.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-7 top-0 h-full w-px bg-[linear-gradient(180deg,rgba(205,190,170,0)_0%,rgba(205,190,170,0.92)_10%,rgba(205,190,170,0.92)_90%,rgba(205,190,170,0)_100%)] md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-4 md:space-y-0">
              {craftSteps.map((step, index) => (
                <CraftTimelineStep key={step.number} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[#DCCFBC] bg-[#FBF8F3] px-6 py-18 lg:px-10 lg:py-22">
        <div className="relative mx-auto max-w-[980px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">Preview + Painting</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#241C16] md:text-5xl">
            AI gives you clarity. Human hands give it soul.
          </h2>
          <p className="mx-auto mt-5 max-w-[64ch] text-base leading-7 text-[#5C5247]">
            Our previews use AI-assisted tools to help you explore and confirm the creative direction. Every final portrait is hand-painted by a real artist.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate('create')}
              className={getButtonClasses('primary', 'gap-2 px-7 py-4 text-sm uppercase tracking-[0.16em]')}
            >
              Start Your Painting <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StepBlock({ step, index }: { step: Step; index: number; key?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.48, delay: Math.min(index * 0.05, 0.18) }}
      className="grid gap-4 border-t border-[#DDD0BE] py-8 md:grid-cols-[108px_minmax(0,1fr)] md:gap-8 xl:grid-cols-[116px_minmax(0,1fr)]"
    >
      <div className="text-[1.9rem] font-semibold leading-none tracking-[-0.06em] text-[#B49C83] md:pt-0.5 md:text-[2.2rem]">
        {step.number}
      </div>
      <div>
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#241C16] md:text-[2rem]">{step.title}</h3>
        <div className="mt-3 space-y-3">
          {step.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-[48ch] text-base leading-7 text-[#5C5247]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function CraftTimelineStep({ step, index }: { step: Step; index: number; key?: string }) {
  const isRight = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.48, delay: Math.min(index * 0.05, 0.18) }}
      className="relative grid gap-4 pl-18 py-8 md:min-h-[220px] md:grid-cols-2 md:gap-x-0 md:pl-0"
    >
      <div className="hidden md:block">
        {!isRight && <TimelineCopy step={step} align="right" className="ml-auto w-[29rem] pr-12 lg:w-[32rem] lg:pr-16" />}
      </div>

      <div className="absolute left-0 top-5 z-10 md:left-1/2 md:-translate-x-1/2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D8CBB8] bg-[#FBF8F3] text-[1.45rem] font-semibold leading-none tracking-[-0.06em] text-[#B49D82] shadow-[0_10px_22px_rgba(84,63,43,0.04)] lg:h-16 lg:w-16 lg:text-[1.6rem]">
          {step.number}
        </div>
      </div>

      <div className="md:hidden">
        <TimelineCopy step={step} align="left" />
      </div>

      <div className="hidden md:block">
        {isRight && <TimelineCopy step={step} align="left" className="w-[29rem] pl-12 lg:w-[32rem] lg:pl-16" />}
      </div>
    </motion.article>
  );
}

function TimelineCopy({
  step,
  align,
  className = '',
}: {
  step: Step;
  align: 'left' | 'right';
  className?: string;
}) {
  return (
    <div className={`${align === 'right' ? 'text-left md:text-right' : 'text-left'} ${className}`}>
      <h3 className="text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[#241C16] lg:text-[2.05rem]">
        {step.title}
      </h3>
      <div className="mt-3 space-y-3">
        {step.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-7 text-[#5C5247]">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
