import React from 'react';
import { motion } from 'motion/react';

import imgHeroPainting from '../assets/images/hero_painting_gallery_1780095998664.png';
import imgMoment from '../assets/images/moments_home_1780095668097.png';
import imgPaints from '../assets/images/materials_oil_paints_20260530.png';
import imgHeroSource from '../assets/images/process_upload_golden_living_room_20260704.png';
import imgHeroRoom from '../assets/images/room_gallery_clean_interior_20260611.png';

type AboutProps = {
  onNavigate: (route: 'home' | 'create' | 'about' | 'faq' | 'refund') => void;
};

const openingParagraph =
  'The moments that matter most deserve more than a filter, or a file. They deserve to become something you can live with - on your wall, in your home, and in the everyday moments that follow.';

const whyExistsParagraph =
  'For years, custom art asked people to choose between two imperfect options. AI-generated images could be fast and beautiful, but often stopped at the screen. Traditional hand-painted portraits carried warmth and character, but left too much to imagination before the final piece arrived.';

const bridgeParagraph = 'ViewBrush was created to bring the best of both together.';

const positionParagraphs = [
  'We do not make bulk AI prints. And we do not believe custom art should feel like a blind order.',
  'At ViewBrush, AI helps you see what is possible. Human craftsmanship turns it into something you can touch, live with, and treasure for years to come.',
  'AI gives you clarity. Human hands give it soul.',
];

const processSteps = [
  {
    id: '01',
    text: 'You begin with a photo that means something to you: a wedding day, a family moment, a beloved pet, or someone you never want to forget.',
  },
  {
    id: '02',
    text: 'Our AI helps you explore the creative direction first, including style, composition, color, and detail, so you can see your vision clearly before a brush ever touches the canvas.',
  },
  {
    id: '03',
    lead: 'Once you approve the direction, the real art begins.',
    text: 'Our artists bring your piece to life by hand on canvas, using real brushes, professional oil paints, and premium canvas. They pay close attention to the details that make the image yours: the warmth in a smile, the texture of fur, or the light from a day worth remembering.',
  },
];

const artistParagraphs = [
  'ViewBrush works with partner studios and independent artists with 15 years of hand-painting experience. Our artists bring an average of 10+ years of oil painting experience and specialize in portraits of people, pets, families, and meaningful moments.',
  'Technology can help establish a clear creative direction, but the final character of a painting still comes from an artist\'s judgment and craft. The way light is built, color is layered, fur is given texture, and brushwork carries feeling all depend on human observation, experience, and patience.',
  'AI does not replace the artist. It helps you express what you want more clearly and helps the artist understand that vision before painting begins.',
];

const closingStatement =
  'Our goal is to make custom art feel more certain for every customer while creating more opportunities for skilled artists to bring meaningful stories into real homes.';

export default function About(_: AboutProps) {
  return (
    <div className="flex w-full flex-col pt-16">
      <section className="relative overflow-hidden border-b border-[#DCCFBC] bg-[#F6F0E7]">
        <div className="absolute inset-0">
          <img src={imgHeroRoom} alt="ViewBrush gallery wall" className="h-full w-full object-cover object-center opacity-42" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,233,0.97)_0%,rgba(247,241,233,0.92)_26%,rgba(247,241,233,0.84)_58%,rgba(247,241,233,0.95)_100%)]" />
          <div className="absolute left-1/2 top-[18%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[#E8D9C3]/65 blur-[110px]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem-280px)] max-w-[1600px] flex-col items-center px-6 py-12 text-center lg:px-10 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="max-w-[1120px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B7D69]">About ViewBrush</p>
            <h1 className="mt-5 text-[clamp(2.3rem,5.4vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#241C16] md:whitespace-nowrap">
              A Clear Vision. A Human Touch.
            </h1>
            <div className="mx-auto mt-8 max-w-[980px] px-4 md:px-12 lg:px-20">
              <p className="mx-auto max-w-[52ch] text-lg leading-8 text-[#5A5045] md:text-[1.18rem]">{openingParagraph}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="relative mt-12 w-full max-w-[980px]"
          >
            <div className="absolute inset-x-[14%] top-[8%] h-[68%] rounded-full bg-[#DDC9AC]/60 blur-[90px]" />
            <div className="relative rounded-[24px] border border-[#DDD1BF] bg-white/34 px-5 pb-6 pt-6 shadow-[0_24px_60px_rgba(67,48,31,0.08)] backdrop-blur-[2px] md:px-8 md:pb-8">
              <div className="grid gap-4 md:grid-cols-[0.24fr_0.52fr_0.24fr] md:items-end">
                <div className="order-2 mx-auto w-full max-w-[210px] overflow-hidden rounded-[20px] border border-[#D8CBB8] bg-white shadow-[0_18px_45px_rgba(63,45,29,0.12)] md:order-1 md:justify-self-start">
                  <img src={imgHeroSource} alt="Original photo in a warm room setting" className="aspect-[4/5] w-full object-cover" />
                </div>

                <div className="order-1 overflow-hidden rounded-[26px] border border-[#D8CBB8] bg-[#EDE1D0] shadow-[0_26px_70px_rgba(67,48,31,0.14)] md:order-2">
                  <img src={imgHeroPainting} alt="Framed oil portrait displayed on a gallery wall" className="w-full object-cover" />
                </div>

                <div className="order-3 flex justify-center md:justify-end">
                  <div className="max-w-[220px] rounded-[20px] border border-[#D8CBB8] bg-[#FBF7F0]/96 p-5 text-left shadow-[0_18px_45px_rgba(63,45,29,0.10)]">
                    <p className="text-[1.25rem] font-semibold leading-[1.18] tracking-[-0.035em] text-[#241C16] md:text-[1.45rem]">
                      {positionParagraphs[2]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#DCCFBC] bg-[#FBF8F3] px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[0.9fr_0.74fr_0.82fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8E816E]">01</p>
              <p className="mt-5 max-w-[13ch] text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-[#241C16] md:text-6xl">
                Custom art should not feel like a blind order.
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <p className="max-w-[34ch] text-lg leading-8 text-[#5B5146]">{whyExistsParagraph}</p>
              <p className="max-w-[20ch] text-[1.85rem] font-medium leading-[1.18] tracking-[-0.035em] text-[#241C16]">{bridgeParagraph}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="overflow-hidden rounded-[24px] border border-[#E1D6C6] bg-white shadow-[0_18px_40px_rgba(63,45,29,0.06)]"
          >
            <img src={imgMoment} alt="A meaningful memory translated into wall art" className="h-full min-h-[420px] w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="flex flex-col justify-between rounded-[24px] border border-[#E1D6C6] bg-[#F7F2EA] p-6 shadow-[0_18px_40px_rgba(63,45,29,0.05)] md:p-8"
          >
            <p className="text-[1.9rem] font-semibold leading-[1.18] tracking-[-0.04em] text-[#241C16] md:text-[2.25rem]">{positionParagraphs[0]}</p>
            <div className="mt-10 border-t border-[#D8CCB9] pt-6">
              <p className="text-lg leading-8 text-[#5A5146] md:text-[1.24rem]">{positionParagraphs[1]}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#DCCFBC] bg-[#F3EEE6] px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.56fr_1.44fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8E816E]">02</p>
            <p className="mt-5 max-w-[10ch] text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-[#241C16] md:text-6xl">
              {processSteps[2].lead}
            </p>
          </motion.div>

          <div className="grid gap-0 border-t border-[#D8CCB9]">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="grid gap-5 border-b border-[#D8CCB9] py-7 last:border-b-0 md:grid-cols-[92px_1fr]"
              >
                <p className="pt-1 text-[12px] font-bold uppercase tracking-[0.32em] text-[#968774]">{step.id}</p>
                <div className="max-w-[62ch]">
                  {step.lead ? (
                    <p className="text-[1.72rem] font-medium leading-[1.14] tracking-[-0.04em] text-[#241C16] md:text-[2.2rem]">{step.lead}</p>
                  ) : null}
                  <p className={`text-lg leading-8 text-[#5B5146] ${step.lead ? 'mt-4' : ''}`}>{step.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#DCCFBC] bg-[#FBF8F3] px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-[24px] border border-[#E1D6C6] bg-white shadow-[0_18px_40px_rgba(63,45,29,0.06)]"
          >
            <img src={imgPaints} alt="Professional oil paints and hand-painting materials" className="h-full min-h-[420px] w-full object-cover lg:min-h-[460px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-[24px] border border-[#E1D6C6] bg-[#F7F2EA] p-6 shadow-[0_18px_40px_rgba(63,45,29,0.05)] md:p-7 lg:p-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B7D69]">Made With Real Artists</p>
            <div className="mt-5 space-y-5">
              <p className="text-[1.45rem] font-medium leading-[1.26] tracking-[-0.035em] text-[#241C16] md:text-[1.8rem]">{artistParagraphs[0]}</p>
              <p className="text-[1rem] leading-7 text-[#5B5146] md:text-[1.02rem]">{artistParagraphs[1]}</p>
            </div>
            <div className="mt-7 border-t border-[#D8CCB9] pt-5">
              <p className="max-w-[40ch] text-[1rem] leading-7 text-[#5B5146] md:text-[1.02rem]">{artistParagraphs[2]}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#ECE3D7] px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="max-w-[320px]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B7D69]">Our Goal</p>
            <div className="mt-6 overflow-hidden rounded-[24px] border border-[#D9CCB8] bg-white shadow-[0_16px_34px_rgba(63,45,29,0.05)]">
              <img src={imgHeroRoom} alt="Warm gallery wall and sunlight" className="aspect-[5/6] w-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="relative overflow-hidden rounded-[30px] border border-[#D9CCB8] bg-[linear-gradient(180deg,#f7f1e8_0%,#f2eadf_100%)] p-6 shadow-[0_20px_46px_rgba(63,45,29,0.05)] md:p-10 lg:p-12"
          >
            <div className="absolute right-[-6%] top-[-10%] h-44 w-44 rounded-full bg-[#E5D3BA]/55 blur-[70px]" />
            <div className="absolute left-10 top-10 h-px w-20 bg-[#D7C8B5]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_180px] lg:items-end">
              <div>
                <p className="max-w-[20ch] text-4xl font-semibold leading-[1] tracking-[-0.06em] text-[#241C16] md:text-6xl">
                  {closingStatement}
                </p>
              </div>
              <div className="w-full max-w-[180px] overflow-hidden rounded-[20px] border border-[#D9CCB8] bg-white shadow-[0_16px_34px_rgba(63,45,29,0.08)]">
                <img src={imgHeroPainting} alt="Finished framed portrait" className="aspect-[4/5] w-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
