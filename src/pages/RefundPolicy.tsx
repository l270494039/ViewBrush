import React from 'react';
import { motion } from 'motion/react';
import { Brush, CircleDollarSign, FileText, RotateCcw, ShieldCheck } from 'lucide-react';

type InfoRoute = 'home' | 'create' | 'faq' | 'refund';

type PolicySection = {
  title: string;
  Icon: typeof CircleDollarSign;
  paragraphs: React.ReactNode[];
};

const policySections: PolicySection[] = [
  {
    title: 'Cancellation Before Painting Begins',
    Icon: CircleDollarSign,
    paragraphs: [
      <>
        You may cancel your order for a <strong>full refund before your artist starts working on the painting</strong>.
      </>,
      'Once the artist has started, the order is considered in production and can no longer be cancelled for a full refund.',
    ],
  },
  {
    title: 'Free Revisions Before Shipping',
    Icon: RotateCcw,
    paragraphs: [
      <>
        We offer <strong>free revisions before your painting is shipped</strong>.
      </>,
      'If we share a preview before shipping, you may request reasonable adjustments to help the artwork better match your original photo and order request. This may include details such as facial features, colors, background, or other small refinements.',
      'Major changes outside the original order request may require additional time and may not always be possible.',
    ],
  },
  {
    title: 'Damage or Defect Within 30 Days',
    Icon: ShieldCheck,
    paragraphs: [
      <>
        If your painting arrives damaged or has a clear production defect, please contact us within <strong>30 days of delivery</strong>.
      </>,
      'After reviewing the issue, we may offer a replacement, repair, or refund depending on the situation.',
      'Please include your order number and clear photos of the issue. If the package was damaged during shipping, please also include photos of the packaging.',
    ],
  },
  {
    title: 'Handmade Artwork Disclaimer',
    Icon: Brush,
    paragraphs: [
      'Each painting is handmade, so small variations in brushwork, texture, and artistic interpretation are part of the custom artwork process. These natural differences are not considered defects.',
      'Color may also appear slightly different in person than on a screen due to display settings and lighting conditions.',
    ],
  },
];

const heroDecorations = [
  { Icon: CircleDollarSign, className: 'left-[7%] top-[18%] h-20 w-20 md:h-28 md:w-28' },
  { Icon: RotateCcw, className: 'bottom-[12%] left-[21%] h-14 w-14 md:h-20 md:w-20' },
  { Icon: ShieldCheck, className: 'right-[8%] top-[16%] h-16 w-16 md:h-24 md:w-24' },
  { Icon: Brush, className: 'bottom-[10%] right-[23%] h-14 w-14 md:h-20 md:w-20' },
  { Icon: FileText, className: 'right-[43%] top-[8%] hidden h-12 w-12 md:block md:h-16 md:w-16' },
  { Icon: Brush, className: 'bottom-[6%] left-[43%] hidden h-12 w-12 md:block md:h-16 md:w-16' },
];

export default function RefundPolicy({ onNavigate: _onNavigate }: { onNavigate: (route: InfoRoute) => void }) {
  return (
    <div className="flex w-full flex-col pt-16">
      <section className="relative min-h-[280px] overflow-hidden border-b border-[#D7C7B8] bg-[#F1E8DC] md:min-h-[340px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden text-[#A58F78]">
          {heroDecorations.map(({ Icon, className }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.2, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 * index }}
              className={`absolute ${className}`}
            >
              <Icon className="h-full w-full" strokeWidth={1.15} />
            </motion.div>
          ))}
        </div>
        <div className="relative mx-auto flex min-h-[280px] max-w-[1600px] items-center justify-center px-6 py-10 text-center md:min-h-[340px] lg:px-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <h1 className="mx-auto max-w-[12ch] text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] sm:max-w-none sm:text-5xl md:text-6xl lg:text-[72px]">
              Refund & Revision Policy
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FBF8F3] px-6 py-14 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[980px]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45 }}
            className="max-w-[62ch] text-xl font-medium leading-9 tracking-[-0.02em] text-[#2C231B] md:text-2xl md:leading-10"
          >
            Every painting we create is custom-made by an artist based on your photo and order details. We want the process to feel clear, fair, and worry-free.
          </motion.p>

          <div className="mt-14 border-t border-[#D7C7B8]">
            {policySections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="grid gap-5 border-b border-[#D7C7B8] py-9 md:grid-cols-[0.34fr_0.66fr] md:gap-10 md:py-12"
              >
                <div className="flex items-center gap-4 self-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#241C16] text-[#FBF8F3] md:h-12 md:w-12">
                    <section.Icon size={21} strokeWidth={1.65} />
                  </div>
                  <h2 className="text-xl font-semibold leading-7 tracking-[-0.02em] text-[#241C16] md:text-[22px]">{section.title}</h2>
                </div>
                <div className="max-w-[64ch] space-y-4 text-base leading-8 text-[#5E554A]">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="[&_strong]:font-semibold [&_strong]:text-[#241C16]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
