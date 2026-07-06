import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import imgHeroBg from '../assets/images/hero_painting_gallery_minimal_20260530.png';
import imgSourcePhoto from '../assets/images/moments_girl_dog_1780095649363.png';
import imgPreviewRoom from '../assets/images/hero_interior_painting_1780094551965.png';
import imgFinishedPainting from '../assets/images/main_golden_oil_1780093879389.png';
import imgRoomGallery from '../assets/images/room_gallery_clean_interior_20260611.png';
import imgCanvas from '../assets/images/materials_cotton_canvas_20260530.png';
import imgPaints from '../assets/images/materials_oil_paints_20260530.png';
import imgFrame from '../assets/images/materials_wood_frame_20260530.png';
import imgStyledVision from '../assets/images/hero_warm_bernese_stylized_20260703.png';

type InfoRoute = 'home' | 'create' | 'how' | 'about' | 'faq' | 'refund';

type Step = {
  number: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
};

const visionSteps: Step[] = [
  {
    number: '01',
    title: 'Upload Your Photo',
    paragraphs: ['Start with a photo that matters to you - a wedding day, a beloved pet, a family moment, or someone you want to keep close.'],
    image: imgSourcePhoto,
    imageAlt: 'Source photo ready for upload',
  },
  {
    number: '02',
    title: 'Shape Your Vision',
    paragraphs: ['Explore the painterly direction that feels right for you.'],
    image: imgStyledVision,
    imageAlt: 'Painterly portrait direction preview',
  },
  {
    number: '03',
    title: 'See It in Your Space',
    paragraphs: ['Visualize how your chosen painting may look in your home before it is brought to life on canvas.'],
    image: imgPreviewRoom,
    imageAlt: 'Painting preview shown in a room',
  },
  {
    number: '04',
    title: 'Choose Your Size, Frame, and Approve',
    paragraphs: [
      'Select the canvas size and frame that fit your space.',
      'Make any final adjustments, then approve the creative direction before your artist begins painting.',
    ],
    image: imgFrame,
    imageAlt: 'Frame and finishing details for approval',
  },
];

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
      <section className="relative min-h-[84vh] overflow-hidden border-b border-[#DCCFBC] bg-[#F6F0E7]">
        <div className="absolute inset-0">
          <img src={imgHeroBg} alt="Piktura gallery setting" className="h-full w-full object-cover object-center opacity-94" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(246,240,231,0.98)_0%,rgba(246,240,231,0.92)_40%,rgba(246,240,231,0.36)_70%,rgba(246,240,231,0.14)_100%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(84vh-4rem)] max-w-[1600px] items-center gap-10 px-6 py-14 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[620px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#897A67]">How It Works</p>
            <h1 className="mt-4 max-w-[11ch] text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] md:text-7xl">
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
            className="relative lg:pl-8"
          >
            <div className="relative mx-auto max-w-[760px]">
              <div className="absolute left-[4%] top-[6%] z-20 w-28 rounded-[10px] border border-white/75 bg-white/88 p-2 shadow-[0_18px_30px_rgba(43,31,21,0.12)] backdrop-blur md:w-36">
                <img src={imgSourcePhoto} alt="Source portrait" className="aspect-[4/5] w-full rounded-[8px] object-cover" />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7D6A]">Source Photo</p>
              </div>

              <div className="overflow-hidden border border-[#E0D3C2] bg-[#ECE2D5] p-3 shadow-[0_28px_70px_rgba(42,31,22,0.14)]">
                <img src={imgPreviewRoom} alt="Painting preview in a room" className="h-[420px] w-full object-cover md:h-[560px]" />
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
          <div className="grid gap-8 border-b border-[#DDD0BE] pb-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="max-w-[760px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">Your Vision</p>
              <h2 className="mt-4 max-w-[16ch] text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
                Confidence before the first brushstroke.
              </h2>
              <p className="mt-5 max-w-[56ch] text-base leading-7 text-[#5C5247]">
                This stage helps you move from an important photo to a direction that already feels right in your home and in your hands.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className="overflow-hidden border border-[#E2D7C8] bg-white lg:ml-auto lg:w-full lg:max-w-[520px]"
            >
              <img src={imgRoomGallery} alt="Finished painting styled inside a room" className="h-[240px] w-full object-cover" />
            </motion.div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {visionSteps.map((step, index) => (
              <VisionCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#DCCFBC] bg-[#F3ECE2] px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="max-w-4xl text-2xl font-medium leading-relaxed tracking-[-0.03em] text-[#2D241B] md:text-3xl">
            Nothing moves to canvas until the direction feels resolved.
          </p>
        </div>
      </section>

      <section className="bg-[#F6F0E7] px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.22fr_0.78fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">Crafted From the Canvas Up</p>
            <h2 className="mt-4 max-w-[13ch] text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
              Then the work becomes physical.
            </h2>
            <p className="mt-5 max-w-[44ch] text-base leading-7 text-[#5C5247]">
              The second half of the process is slower and more tactile: surface, structure, color, detail, and the final finish all build toward a portrait meant to live on your wall.
            </p>

            <div className="mt-10">
              {craftSteps.map((step, index) => (
                <StepBlock key={step.number} step={step} index={index} />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="grid gap-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden border border-[#E0D3C2] bg-white"
              >
                <img src={imgCanvas} alt="Prepared cotton-linen canvas" className="h-[240px] w-full object-cover" />
                <div className="border-t border-[#E8DDCF] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Foundation</p>
                  <p className="mt-3 text-sm leading-7 text-[#5F564A]">A stable canvas gives the painting its texture, resilience, and presence from the start.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="overflow-hidden border border-[#E0D3C2] bg-white"
              >
                <img src={imgPaints} alt="Oil paints and pigment materials" className="h-[220px] w-full object-cover" />
                <div className="border-t border-[#E8DDCF] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Layering</p>
                  <p className="mt-3 text-sm leading-7 text-[#5F564A]">Color and depth arrive gradually, building a portrait that feels dimensional rather than flat.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="overflow-hidden border border-[#E0D3C2] bg-white"
              >
                <img src={imgFrame} alt="Frame craftsmanship and finishing details" className="h-[220px] w-full object-cover" />
                <div className="border-t border-[#E8DDCF] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Ready for Home</p>
                  <p className="mt-3 text-sm leading-7 text-[#5F564A]">The final size, frame, and finish are prepared to feel complete in the space you chose.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#DCCFBC] bg-[#FBF8F3] px-6 py-18 lg:px-10 lg:py-22">
        <div className="mx-auto max-w-[980px] text-center">
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
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#31271F] px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-[#FBF8F3] transition hover:bg-[#241C16]"
            >
              Start Your Painting <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center justify-center rounded-[8px] border border-[#DCCFBC] bg-white/72 px-7 py-4 text-sm font-medium text-[#31271F] transition hover:bg-[#F3EBDE]"
            >
              About Piktura
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
      className={`grid gap-4 border-t border-[#DDD0BE] py-8 md:gap-8 ${step.image ? 'md:grid-cols-[108px_minmax(0,1fr)_240px] xl:grid-cols-[116px_minmax(0,1fr)_280px]' : 'md:grid-cols-[108px_minmax(0,1fr)] xl:grid-cols-[116px_minmax(0,1fr)]'}`}
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
      {step.image && (
        <div className="overflow-hidden border border-[#E2D7C8] bg-white shadow-[0_10px_24px_rgba(56,42,29,0.05)]">
          <img src={step.image} alt={step.imageAlt ?? step.title} className="aspect-[4/5] w-full object-cover md:aspect-[3/4]" />
        </div>
      )}
    </motion.article>
  );
}

function VisionCard({ step, index }: { step: Step; index: number; key?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.48, delay: Math.min(index * 0.05, 0.18) }}
      className="flex h-full flex-col overflow-hidden border border-[#E2D7C8] bg-white"
    >
      {step.image && (
        <div className="overflow-hidden border-b border-[#E7DCCD] bg-[#F7F1E8]">
          <img src={step.image} alt={step.imageAlt ?? step.title} className="aspect-[1.45/1] w-full object-cover" />
        </div>
      )}
      <div className="flex h-full flex-col p-4">
        <div className="text-[1.9rem] font-semibold leading-none tracking-[-0.06em] text-[#B49C83] md:text-[2.2rem]">{step.number}</div>
        <h3 className="mt-2 max-w-[14ch] text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[#241C16] md:text-[1.7rem]">
          {step.title}
        </h3>
        <div className="mt-2.5 space-y-2.5">
          {step.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-6 text-[#5C5247]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
