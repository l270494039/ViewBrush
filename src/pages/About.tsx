import React from 'react';
import { ArrowDown, Brush, Camera, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import imgSourcePhoto from '../assets/images/process_upload_golden_living_room_20260704.png';
import imgPaintedPortrait from '../assets/images/hero_painting_gallery_1780095998664.png';
import imgCanvasDetail from '../assets/images/materials_cotton_canvas_20260530.png';
import imgOilPaints from '../assets/images/materials_oil_paints_20260530.png';
import imgGalleryWall from '../assets/images/room_gallery_clean_interior_20260611.png';
import imgDogPainting from '../assets/images/main_golden_oil_1780093879389.png';
import imgCatPainting from '../assets/images/cat_impressionist_1780093897711.png';
import imgBernesePortrait from '../assets/images/hero_warm_bernese_original_20260703.png';

type AboutProps = {
  onNavigate: (route: 'home' | 'create' | 'about' | 'how' | 'faq' | 'refund') => void;
};

const storyCopy = {
  opening:
    'The moments that matter most deserve more than a filter, or a file. They deserve to become something you can live with - on your wall, in your home, and in the everyday moments that follow.',
  origin:
    'For years, custom art asked people to choose between two imperfect options. Digital images could be fast and beautiful, but often stopped at the screen. Traditional hand-painted portraits carried warmth and character, but left too much to imagination before the final piece arrived.',
  bridge: 'ViewBrush was created to bring the best of both together.',
  photo:
    'You begin with a photo that means something to you: a wedding day, a family moment, a beloved pet, or someone you never want to forget.',
  preview:
    'Our technology helps you explore creative direction first, so you can see your vision clearly before a brush ever touches the canvas.',
  handoff: 'Once you approve the direction, the real art begins.',
  craft:
    'Our artists bring your piece to life by hand on canvas, using real brushes, professional oil paints, and premium canvas. They pay close attention to the details that make the image yours: the warmth in a smile, the texture of fur, or the light from a day worth remembering.',
  noPrint:
    'We are not here to turn your photo into a quick print. And we do not believe custom art should leave you guessing until the final piece arrives.',
  position:
    'At ViewBrush, technology helps you see what is possible. Human craftsmanship turns it into something you can touch, live with, and treasure for years to come.',
  artists:
    'ViewBrush works with partner studios and independent artists with 15 years of hand-painting experience. Our artists bring an average of 10+ years of oil painting experience and specialize in portraits of people, pets, families, and meaningful moments.',
  judgment:
    "Technology can help establish a clear creative direction, but the final character of a painting still comes from an artist's judgment and craft. The way light is built, color is layered, fur is given texture, and brushwork carries feeling all depend on human observation, experience, and patience.",
  previewProcess:
    'Our preview process helps clarify the creative direction before painting begins. It helps you see what you want, and helps the artist understand how to bring it to life. Every final portrait is painted by hand.',
  goal:
    'Our goal is to make custom art feel more certain for every customer while creating more opportunities for skilled artists to bring meaningful stories into real homes.',
};

const heroGalleryCards = [
  { src: imgDogPainting, alt: 'Golden dog oil portrait', className: 'hidden sm:block', offset: 70 },
  { src: imgCatPainting, alt: 'Cat portrait in an impressionist style', className: '', offset: 34 },
  { src: imgSourcePhoto, alt: 'A meaningful original photo', className: '', offset: 0 },
  { src: imgPaintedPortrait, alt: 'Finished framed oil portrait', className: '', offset: 0 },
  { src: imgBernesePortrait, alt: 'Bernese mountain dog portrait', className: 'hidden sm:block', offset: 34 },
  { src: imgCanvasDetail, alt: 'Brush painting a portrait on canvas', className: 'hidden lg:block', offset: 70 },
];

const originColumns = [
  {
    title: 'Two imperfect options.',
    text: 'For years, custom art asked people to choose between two imperfect options.',
  },
  {
    title: 'Fast and beautiful.',
    text: 'Digital images could be fast and beautiful, but often stopped at the screen.',
  },
  {
    title: 'Warmth and character.',
    text: 'Traditional hand-painted portraits carried warmth and character, but left too much to imagination before the final piece arrived.',
  },
];

const creationStories = [
  {
    label: 'Your photo',
    title: 'You begin with a photo that means something to you.',
    text: 'A wedding day, a family moment, a beloved pet, or someone you never want to forget.',
    image: imgSourcePhoto,
    alt: 'A meaningful pet photo at home',
    Icon: Camera,
  },
  {
    label: 'Creative direction',
    title: 'Our AI helps you explore the creative direction first.',
    text: 'Including style, composition, color, and detail, so you can see your vision clearly before a brush ever touches the canvas.',
    image: imgCatPainting,
    alt: 'A creative portrait direction in an impressionist style',
    Icon: Sparkles,
  },
  {
    label: 'Painted by hand',
    title: 'Our artists bring your piece to life by hand on canvas.',
    text: 'Using real brushes, professional oil paints, and premium canvas.',
    image: imgCanvasDetail,
    alt: 'An artist hand-painting a portrait on canvas',
    Icon: Brush,
  },
];

function SectionReveal({ children, className = '' }: React.PropsWithChildren<{ className?: string }> & React.Attributes) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About({ onNavigate }: AboutProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full overflow-hidden bg-[#f8f3ea] pt-16 text-[#201c17]">
      <section className="relative overflow-hidden border-b border-[#ded4c3] bg-[#f8f3ea] px-5 pb-0 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[14ch] text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] md:text-7xl"
          >
            A Clear Vision. <br />A Human Touch.
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-[56ch] text-[1rem] leading-7 text-[#645b50] sm:text-[1.12rem] sm:leading-8 lg:max-w-[56rem]"
          >
            {storyCopy.opening}
          </motion.p>
          <motion.button
            type="button"
            aria-label="Explore the ViewBrush story"
            onClick={() => document.getElementById('your-vision')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cfc2ae] text-[#312a22] transition hover:border-[#312a22] hover:bg-[#312a22] hover:text-[#f8f3ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#312a22]"
          >
            <ArrowDown size={17} strokeWidth={1.5} />
          </motion.button>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 46 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="about-gallery relative z-10 mx-auto mt-12 h-[225px] w-full max-w-[1480px] overflow-hidden sm:h-[300px] lg:-mt-[60px] lg:h-[460px]"
        >
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-3 sm:gap-3 sm:px-6 lg:gap-4">
            {heroGalleryCards.map((image) => (
              <div key={image.alt} className={`about-gallery-card-hit relative aspect-[3/4] w-[31vw] min-w-[104px] max-w-[196px] sm:w-[17vw] sm:min-w-[122px] sm:max-w-[220px] lg:w-[15vw] lg:max-w-[258px] ${image.className}`}>
                <div
                  style={{ transform: `translateY(${image.offset}px)` }}
                  className="about-gallery-card absolute inset-x-0 bottom-0 h-full overflow-hidden rounded-t-[16px] border-x border-t border-[#d4c6b3] bg-[#e9dece] shadow-[0_-18px_42px_rgba(74,53,34,0.09)] will-change-transform"
                >
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-[-32px] left-1/2 z-10 h-[80px] w-[132%] -translate-x-1/2 rounded-t-[50%] bg-[#f8f3ea] sm:bottom-[-40px] sm:h-[120px] lg:bottom-[-50px] lg:h-[150px]" />
        </motion.div>
        <div className="mx-auto grid max-w-[1100px] divide-y divide-[#ded3c2] border-t border-[#ded3c2] px-1 py-9 text-center md:grid-cols-3 md:divide-x md:divide-y-0 md:py-11">
          {originColumns.map((column) => (
            <article key={column.title} className="px-5 py-6 first:pt-0 last:pb-0 md:px-8 md:py-0">
              <h2 className="text-[1.1rem] font-semibold tracking-[-0.03em] text-[#241C16] md:text-[1.2rem]">{column.title}</h2>
              <p className="mx-auto mt-3 max-w-[29ch] text-[0.9rem] leading-6 text-[#6a6053]">{column.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="your-vision" className="border-b border-[#DCCFBC] bg-[#F6F0E7] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1360px]">
          <SectionReveal className="mx-auto max-w-[1120px] text-center">
            <h2 className="mx-auto max-w-[22ch] font-sans text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
              From vision to canvas.
            </h2>
            <div className="mx-auto mt-5 max-w-[68ch] space-y-3 font-sans text-base leading-7 text-[#5C5247]">
              <p>{storyCopy.bridge}</p>
            </div>
          </SectionReveal>

          <div className="mx-auto mt-12 grid max-w-[1360px] gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {creationStories.map((scene) => (
              <SectionReveal key={scene.title} className="h-full">
                <article className="group h-full overflow-hidden border border-[#E2D8C8] bg-white shadow-[0_20px_40px_rgba(46,34,21,0.08)]">
                  <div className="overflow-hidden">
                    <img src={scene.image} alt={scene.alt} className="h-60 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEE4D5] text-[#5B5146]">
                        <scene.Icon size={18} />
                      </div>
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8F816C]">{scene.label}</p>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16]">
                      {scene.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#5F564B]">{scene.text}</p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCCFBC] bg-[#FBF8F3] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1360px]">
          <SectionReveal className="mx-auto max-w-[1120px] text-center">
            <h2 className="mx-auto max-w-[22ch] font-sans text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
              Where the real art begins.
            </h2>
            <div className="mx-auto mt-5 max-w-[68ch] space-y-3 font-sans text-base leading-7 text-[#5C5247]">
              <p>{storyCopy.handoff}</p>
            </div>
          </SectionReveal>

          <div className="mx-auto mt-12 grid max-w-[1360px] gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <SectionReveal className="overflow-hidden border border-[#DDD0BE] bg-[#F4ECE1]">
              <div className="overflow-hidden border-b border-[#DDD0BE]">
                <img src={imgCanvasDetail} alt="An artist applying detail to a portrait on canvas" className="aspect-[16/10] w-full object-cover" />
              </div>
              <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-8">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8F816C]">Painted by hand</p>
                <p className="max-w-[38ch] font-sans text-[1.02rem] leading-8 text-[#5C5247]">{storyCopy.craft}</p>
              </div>
            </SectionReveal>

            <div className="grid gap-6">
              <SectionReveal className="overflow-hidden border border-[#DDD0BE] bg-[#F8F2E8]">
                <div className="grid gap-0 md:grid-cols-[0.56fr_0.44fr]">
                  <div className="flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8F816C]">Not a quick print</p>
                      <p className="mt-5 max-w-[16ch] font-sans text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#241C16]">
                        We are not here to turn your photo into a quick print.
                      </p>
                    </div>
                    <div className="mt-8 border-t border-[#DDD0BE] pt-5">
                      <p className="max-w-[34ch] font-sans text-[1rem] leading-7 text-[#5C5247]">
                        And we do not believe custom art should leave you guessing until the final piece arrives.
                      </p>
                    </div>
                  </div>
                  <div className="overflow-hidden border-t border-[#DDD0BE] md:border-l md:border-t-0">
                    <img
                      src={imgPaintedPortrait}
                      alt="A finished hand-painted portrait in its frame"
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal className="overflow-hidden border border-[#DDD0BE] bg-white">
                <div className="grid gap-0 md:grid-cols-[0.46fr_0.54fr]">
                  <div className="overflow-hidden">
                    <img src={imgGalleryWall} alt="A ViewBrush portrait displayed in a warm home" className="aspect-[4/3] h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between p-6 md:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8F816C]">Something you can live with</p>
                    <div className="mt-6">
                      <p className="max-w-[20ch] font-sans text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#241C16]">
                        At ViewBrush, technology helps you see what is possible.
                      </p>
                      <p className="mt-5 max-w-[30ch] font-sans text-[1rem] leading-7 text-[#5C5247] md:text-[1.05rem] md:leading-8">
                        Human craftsmanship turns it into something you can touch, live with, and treasure for years to come.
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCCFBC] bg-[#F6F0E7] px-6 py-14 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-[1360px]">
          <SectionReveal className="mx-auto max-w-[1120px] text-center">
            <h2 className="mx-auto font-sans text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">Made With Real Artists</h2>
            <p className="mx-auto mt-5 max-w-[68ch] font-sans text-base leading-7 text-[#5C5247]">{storyCopy.artists}</p>
          </SectionReveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <SectionReveal className="h-full overflow-hidden rounded-[18px] border border-[#D8CCB9] bg-white shadow-[0_16px_34px_rgba(74,53,34,0.08)]">
              <article className="flex h-full flex-col">
                <figure className="overflow-hidden border-b border-[#d9cebd]">
                  <img src={imgCanvasDetail} alt="A painter applying detail to a golden dog portrait" className="aspect-[16/10] w-full object-cover object-center" />
                </figure>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8F816C]">Experience</p>
                  <p className="mt-4 font-sans text-[24px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#30281f]">
                    15 years of hand-painting experience.
                  </p>
                  <p className="mt-6 border-t border-[#d9cebd] pt-5 font-sans text-[0.98rem] leading-7 text-[#62584c]">{storyCopy.judgment}</p>
                </div>
              </article>
            </SectionReveal>

            <SectionReveal className="h-full overflow-hidden rounded-[18px] border border-[#D8CCB9] bg-[#F3EBDE] shadow-[0_16px_34px_rgba(74,53,34,0.06)]">
              <article className="flex h-full flex-col">
                <figure className="overflow-hidden border-b border-[#d9cebd]">
                  <img src={imgOilPaints} alt="Professional oil paints and palette knife" className="aspect-[16/10] w-full object-cover" />
                </figure>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8F816C]">Preview process</p>
                  <p className="mt-4 font-sans text-[0.98rem] leading-7 text-[#62584c]">{storyCopy.previewProcess}</p>
                  <p className="mt-6 border-t border-[#d9cebd] pt-5 font-sans text-[24px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#2b251f]">
                    Every final portrait is painted by hand.
                  </p>
                </div>
              </article>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="bg-[#FBF8F3] px-6 py-12 lg:px-10 lg:py-16">
        <SectionReveal className="group relative mx-auto min-h-[420px] max-w-[1360px] overflow-hidden rounded-[12px] border border-[#DCCFBC] bg-[#d5c8b7]">
          <img
            src={imgGalleryWall}
            alt="A ViewBrush portrait in a warm home"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          />
          <div className="relative z-10 flex min-h-[420px] w-full flex-col justify-between bg-[#FBF8F3]/[0.94] px-6 py-8 sm:px-10 lg:w-[56%] lg:px-14 lg:py-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">OUR GOAL</p>
            <div className="mt-8">
              <h2 className="max-w-[16ch] font-sans text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#241C16] md:text-5xl">
                Custom art, made more certain.
              </h2>
              <p className="mt-5 max-w-[42ch] font-sans text-lg leading-8 text-[#5C5247]">
                {storyCopy.goal}
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate('create')}
                className="button-lift inline-flex items-center justify-center rounded-[8px] bg-[#31271F] px-8 py-4 text-sm font-semibold tracking-[0.02em] text-[#FBF8F3] transition hover:bg-[#241C16]"
              >
                Create Your Painting
              </button>
              <button
                type="button"
                onClick={() => onNavigate('how')}
                className="inline-flex items-center justify-center rounded-[8px] border border-[#DCCFBC] bg-white/72 px-8 py-4 text-sm font-medium text-[#31271F] transition hover:bg-[#F3EBDE]"
              >
                See How It Works
              </button>
            </div>
          </div>
          <figure className="absolute bottom-0 right-[8%] hidden aspect-[4/5] h-[88%] border-[10px] border-[#7b5d37] bg-[#9a7a4f] shadow-[0_24px_40px_rgba(62,44,26,0.32)] lg:block">
            <img src={imgPaintedPortrait} alt="A ViewBrush portrait displayed at home" className="h-full w-full object-cover" />
          </figure>
        </SectionReveal>
      </section>
    </div>
  );
}
