import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BrushCleaning, CircleDollarSign, ShieldCheck, Sparkles } from 'lucide-react';

import imgHero from '../assets/images/hero_interior_painting_1780094551965.png';
import imgRoom from '../assets/images/room_gallery_clean_interior_20260611.png';
import imgMaterials from '../assets/images/materials_archival_packaging_20260530.png';

type InfoRoute = 'home' | 'create' | 'faq' | 'refund';

const supportEmail = '[your support email]';

const quickPolicies = [
  {
    title: 'Cancel before painting begins',
    body: 'Before the artist starts, the order can be canceled for a full refund.',
    Icon: CircleDollarSign,
  },
  {
    title: 'Free revisions before shipping',
    body: 'Reasonable refinements are included while the final artwork is still being reviewed.',
    Icon: BrushCleaning,
  },
  {
    title: '30-day protection for damage or defects',
    body: 'If the artwork arrives damaged or clearly defective, contact us within 30 days of delivery.',
    Icon: ShieldCheck,
  },
];

const policySections = [
  {
    eyebrow: 'Cancellation Before Painting Begins',
    title: 'Full refund before the artist starts.',
    paragraphs: [
      'You may cancel your order for a full refund before your artist starts working on the painting.',
      'Once the artist has started, the order is considered in production and can no longer be cancelled for a full refund.',
    ],
  },
  {
    eyebrow: 'Free Revisions Before Shipping',
    title: 'Refine the details while the piece is still in progress.',
    paragraphs: [
      'We offer free revisions before your painting is shipped.',
      'If we share a preview before shipping, you may request reasonable adjustments to help the artwork better match your original photo and order request.',
      'This may include details such as facial features, colors, background, or other small refinements.',
      'Major changes outside the original order request may require additional time and may not always be possible.',
    ],
  },
  {
    eyebrow: 'Damage or Defect Within 30 Days',
    title: 'A separate resolution path for verified issues.',
    paragraphs: [
      'If your painting arrives damaged or has a clear production defect, please contact us within 30 days of delivery.',
      'After reviewing the issue, we may offer a replacement, repair, or refund depending on the situation.',
      'Please include your order number and clear photos of the issue. If the package was damaged during shipping, please also include photos of the packaging.',
    ],
  },
];

const disclaimerNotes = [
  'Each painting is handmade, so small variations in brushwork, texture, and artistic interpretation are part of the custom artwork process. These natural differences are not considered defects.',
  'Color may also appear slightly different in person than on a screen due to display settings and lighting conditions.',
];

export default function RefundPolicy({ onNavigate }: { onNavigate: (route: InfoRoute) => void }) {
  return (
    <div className="flex w-full flex-col pt-16">
      <section className="relative min-h-[78vh] overflow-hidden border-b border-[#DCCFBC] bg-[#F6F0E7]">
        <div className="absolute inset-0">
          <img src={imgHero} alt="Finished framed portrait in a home" className="h-full w-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(246,240,231,0.98)_0%,rgba(246,240,231,0.9)_40%,rgba(246,240,231,0.28)_72%,rgba(246,240,231,0.12)_100%)]" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(78vh-4rem)] max-w-[1600px] items-center px-6 py-10 lg:px-10 lg:py-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[650px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#897A67]">Refund & Revision Policy</p>
            <h1 className="mt-4 max-w-[11ch] text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] md:text-7xl">
              Clear protection for a custom-made process.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#53493E] md:text-lg">
              Every painting is created to order by an artist using your photo and selected details. This policy explains what can be changed, canceled, revised, or refunded at each stage.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => onNavigate('create')}
                className="button-lift inline-flex items-center justify-center rounded-[8px] bg-[#31271F] px-8 py-4 text-sm font-semibold tracking-[0.02em] text-[#FBF8F3] transition hover:bg-[#241C16]"
              >
                Start Your Painting
              </button>
              <button
                onClick={() => onNavigate('faq')}
                className="button-lift inline-flex items-center justify-center rounded-[8px] border border-[#DCCFBC] bg-white/72 px-8 py-4 text-sm font-medium text-[#31271F] transition hover:bg-[#F3EBDE]"
              >
                Visit FAQ
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#DCCFBC] bg-[#EEE5D8] px-6 py-8 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-3">
          {quickPolicies.map(({ title, body, Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="border border-[#D8CBB8] bg-[#F8F3EB] p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#31271F] text-[#FBF8F3]">
                <Icon size={18} />
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#241C16]">{title}</h2>
              <p className="mt-2 max-w-[32ch] text-sm leading-6 text-[#5F564A]">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#FBF8F3] px-6 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[0.38fr_0.62fr]">
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">How The Policy Works</p>
              <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
                The outcome depends on where the order is in production.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#5C5247]">
                The earlier you contact us, the more flexibility we have. Once an artist is already producing the piece, the policy shifts from cancellation toward revision and issue resolution.
              </p>
            </div>

            <div className="overflow-hidden border border-[#E2D7C8] bg-white">
              <img src={imgRoom} alt="Framed artwork in a room" className="h-[240px] w-full object-cover" />
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Contact Us</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#241C16]">Need help with a change, issue, or refund request?</h3>
                <p className="mt-4 text-sm leading-7 text-[#5E554A]">
                  To request a cancellation, revision, replacement, or refund, please contact us at:
                </p>
                <div className="mt-4 border border-[#DDD0BE] bg-[#F7F1E8] px-4 py-3 text-sm font-medium text-[#31271F]">
                  {supportEmail}
                </div>
                <p className="mt-4 text-sm leading-7 text-[#5E554A]">Please include your order number so we can help you faster.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {policySections.map((section, index) => (
              <motion.article
                key={section.eyebrow}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="border border-[#E2D7C8] bg-white p-6 md:p-8"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">{section.eyebrow}</p>
                <h3 className="mt-3 max-w-[18ch] text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16]">{section.title}</h3>
                <div className="mt-5 max-w-[60ch] space-y-4 text-sm leading-7 text-[#60574C]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.article>
            ))}

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="overflow-hidden border border-[#E2D7C8] bg-[#F6F0E7]"
            >
              <div className="grid gap-0 lg:grid-cols-[0.54fr_0.46fr]">
                <div className="p-6 md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Handmade Artwork Disclaimer</p>
                  <h3 className="mt-3 max-w-[16ch] text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16]">
                    Handmade variation is part of the value, not a production flaw.
                  </h3>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-[#5E554A]">
                    {disclaimerNotes.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex items-start gap-3 border border-[#DDD0BE] bg-white/84 p-4 text-sm leading-6 text-[#5A5045]">
                    <Sparkles size={18} className="mt-1 shrink-0 text-[#7E6B54]" />
                    <p>
                      Small differences in texture, brush character, and screen-to-real color are normal in a handmade piece and are not considered defects on their own.
                    </p>
                  </div>
                </div>
                <div className="min-h-[280px] border-t border-[#E2D7C8] lg:border-l lg:border-t-0">
                  <img src={imgMaterials} alt="Packaging and finishing materials" className="h-full w-full object-cover" />
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </section>

      <section className="border-t border-[#DCCFBC] bg-[#F4EFE7] px-6 py-18 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">Next Step</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#241C16] md:text-5xl">
              Start the preview flow with the policy already clear.
            </h2>
            <p className="mt-4 max-w-[44ch] text-base leading-7 text-[#5C5247]">
              The smoother the expectations, the calmer the order feels. Explore directions first, then move forward knowing how revisions and refunds are handled.
            </p>
          </div>
          <button
            onClick={() => onNavigate('create')}
            className="button-lift inline-flex items-center gap-2 rounded-[8px] bg-[#31271F] px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-[#FBF8F3] transition hover:bg-[#241C16]"
          >
            Open The Gallery <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
