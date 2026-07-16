import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Brush, Frame, Package, SwatchBook } from 'lucide-react';

import imgHeroBg from '../assets/images/hero_interior_painting_1780094551965.png';
import imgMaterialPaints from '../assets/images/materials_oil_paints_20260530.png';
import imgMaterialCanvas from '../assets/images/materials_cotton_canvas_20260530.png';
import imgMaterialFrame from '../assets/images/materials_wood_frame_20260530.png';
import imgMaterialPackaging from '../assets/images/materials_archival_packaging_20260530.png';

type MaterialsRoute = 'home' | 'create' | 'about' | 'how' | 'materials' | 'faq' | 'refund';

const materialStories = [
  {
    id: 'pigment',
    label: 'Pigment',
    title: 'Color that feels alive up close',
    body: 'We push for tonal depth, brush-preserving detail, and a finish that feels painterly rather than flat. The goal is not only likeness, but atmosphere.',
    image: imgMaterialPaints,
    Icon: Brush,
  },
  {
    id: 'canvas',
    label: 'Canvas',
    title: 'Texture that keeps the piece from feeling digital',
    body: 'Premium cotton-linen canvas gives the portrait enough grain and softness to hold light beautifully and read like a finished studio work.',
    image: imgMaterialCanvas,
    Icon: SwatchBook,
  },
  {
    id: 'frame',
    label: 'Frame',
    title: 'Frames that complete the mood',
    body: 'Warm woods, antique golds, and darker gallery finishes all change how the portrait lives in a room. We treat the frame as part of the composition.',
    image: imgMaterialFrame,
    Icon: Frame,
  },
  {
    id: 'delivery',
    label: 'Delivery',
    title: 'Packaging that still feels ceremonial',
    body: 'Protective wrapping, careful finishing, and giftable presentation make the arrival feel intentional, not transactional.',
    image: imgMaterialPackaging,
    Icon: Package,
  },
];

export default function Materials({ onNavigate }: { onNavigate: (route: MaterialsRoute) => void }) {
  return (
    <div className="flex w-full flex-col pt-16">
      <section className="relative min-h-[82vh] overflow-hidden border-b border-black/40 bg-[#15120F]">
        <div className="absolute inset-0">
          <img src={imgHeroBg} alt="Hand-painted portrait in a home" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(82vh-4rem)] max-w-[1600px] items-center px-6 py-14 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[760px]">
            <h1 className="max-w-[14ch] text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#FBF8F3] md:text-7xl">
              The digital preview sells the direction. The materials sell the permanence.
            </h1>
            <p className="mt-6 max-w-[44ch] text-base leading-7 text-white/80 md:text-lg">
              We want the final portrait to feel resolved in a room: not only beautiful on a screen, but substantial, tactile, and worth living with for years.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate('create')}
                className="button-lift inline-flex items-center justify-center rounded-[8px] bg-[#F6F0E7] px-8 py-4 text-sm font-semibold tracking-[0.02em] text-[#31271F] transition hover:bg-[#FBF8F3]"
              >
                Start Your Painting
              </button>
              <button
                type="button"
                onClick={() => onNavigate('how')}
                className="inline-flex items-center justify-center rounded-[8px] border border-white/55 bg-white/10 px-8 py-4 text-sm font-medium text-white transition hover:bg-white/20"
              >
                See The Process
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FCF8F4] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="max-w-[620px]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#897A67]">Built to last</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] md:text-5xl">
              Every detail earns its place in the finished work.
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {materialStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="overflow-hidden border border-[#E2D8C8] bg-white shadow-[0_20px_40px_rgba(46,34,21,0.08)]"
              >
                <img src={story.image} alt={story.title} className="h-60 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEE4D5] text-[#5B5146]">
                      <story.Icon size={18} />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8F816C]">{story.label}</p>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16]">{story.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#5F564B]">{story.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#DCCFBC] bg-[#F6F0E7] px-6 py-18 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">Made For Your Home</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#241C16] md:text-5xl">
              The final piece should feel crafted, not merely generated.
            </h2>
            <p className="mt-4 max-w-[44ch] text-base leading-7 text-[#5C5247]">
              Material decisions affect warmth, depth, light, and how the painting belongs in a real home. That is why we treat them as part of the artwork itself.
            </p>
          </motion.div>
          <button
            type="button"
            onClick={() => onNavigate('create')}
            className="button-lift inline-flex items-center gap-2 rounded-[8px] bg-[#31271F] px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-[#FBF8F3] transition hover:bg-[#241C16]"
          >
            Start Your Painting <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
