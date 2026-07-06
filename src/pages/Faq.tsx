import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown, Lock, PackageCheck, PenSquare } from 'lucide-react';

import imgHeroBg from '../assets/images/hero_painting_gallery_minimal_20260530.png';

type InfoRoute = 'home' | 'create' | 'faq' | 'refund';

type FaqEntry = {
  id: string;
  question: string;
  paragraphs: string[];
  bullets?: string[];
};

type FaqGroup = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  items: FaqEntry[];
};

const highlightNotes = [
  {
    title: 'Preview before shipping',
    body: 'You can review the finished creation before it is packed and sent out.',
    Icon: PenSquare,
  },
  {
    title: 'Reasonable revisions included',
    body: 'Small refinements based on your original photo and approved direction are part of the process.',
    Icon: PackageCheck,
  },
  {
    title: 'Your original photo stays private',
    body: 'We never publish your source photo. Finished artwork is only shared with your permission.',
    Icon: Lock,
  },
];

const faqGroups: FaqGroup[] = [
  {
    id: 'privacy',
    eyebrow: 'Photos & Privacy',
    title: 'Your source photo stays private from the start.',
    summary: 'We use your upload only to create the custom artwork. Public sharing happens only if you approve it.',
    items: [
      {
        id: 'privacy-public',
        question: 'Will my photo or final artwork be used publicly?',
        paragraphs: [
          'Your original photo is used only to create your custom artwork. We will never use your original photo publicly.',
          'If we would like to feature the finished artwork in our portfolio, website, social media, or marketing materials, we will ask for your approval first.',
          'Saying no is completely fine and will not affect your order.',
        ],
      },
    ],
  },
  {
    id: 'preview',
    eyebrow: 'Preview & Approval',
    title: 'The preview guides the direction. The handmade finish brings it to life.',
    summary: 'The preview is there to build confidence and alignment, not to promise a pixel-identical printout.',
    items: [
      {
        id: 'preview-same',
        question: 'Is the preview exactly the same as the final painting?',
        paragraphs: [
          'No. The preview is meant to show the creative direction, not an exact pixel-for-pixel final result.',
          'Because your artwork is handmade, natural differences in brushwork, texture, color, and artistic interpretation are part of the process.',
        ],
      },
      {
        id: 'preview-review',
        question: 'Will I be able to review the final artwork before it ships?',
        paragraphs: [
          'Yes. Before your artwork is shipped, you will have a chance to review the final creation and approve it.',
        ],
      },
    ],
  },
  {
    id: 'revisions',
    eyebrow: 'Revisions & Changes',
    title: 'We keep the process flexible while the work is still in progress.',
    summary: 'Reasonable changes are welcome before shipping, especially when they help the artwork better reflect the original photo and approved direction.',
    items: [
      {
        id: 'revisions-request',
        question: 'Can I request changes to the final artwork before shipping?',
        paragraphs: [
          'Yes. If needed, you may request reasonable revisions before shipping.',
          'We want you to feel confident about the final artwork before it is sent out.',
        ],
      },
      {
        id: 'revisions-kind',
        question: 'What kind of changes can I request?',
        paragraphs: [
          'Reasonable changes may include adjustments to details such as facial features, color tone, background elements, or other parts of the artwork based on your original photo and approved direction.',
        ],
      },
      {
        id: 'revisions-order-details',
        question: 'Can I change the photo, style, size, or shipping address after ordering?',
        paragraphs: [
          'Please contact us as soon as possible. If production or shipping has not started, we will do our best to help.',
          'Once production has started, changes to the photo, style, size, or other order details may not always be possible.',
          'Once an order has shipped, the shipping address can no longer be changed by us.',
        ],
      },
      {
        id: 'revisions-approval',
        question: 'What happens after I approve the final artwork?',
        paragraphs: [
          'Once you approve the final artwork, we will prepare it for shipment.',
          'After approval, the order moves into the final shipping stage and can no longer be changed, canceled, or refunded for general preference reasons.',
        ],
      },
    ],
  },
  {
    id: 'refunds',
    eyebrow: 'Cancellations & Refunds',
    title: 'Before painting starts, cancellation is simple. After production starts, it depends on work completed.',
    summary: 'Custom work behaves differently from off-the-shelf products, so the refund policy follows the production timeline.',
    items: [
      {
        id: 'refunds-cancel',
        question: 'Can I cancel my order?',
        paragraphs: [
          'Yes. You may cancel your order for a full refund before the artist has started working on your painting.',
        ],
      },
      {
        id: 'refunds-started',
        question: 'What if the artist has already started?',
        paragraphs: [
          'Once the artist has started, your order is considered in production.',
          'At that point, the order may only be eligible for a partial refund depending on how much work has already been completed.',
          'Damage, loss, or verified production defects are handled separately.',
        ],
      },
      {
        id: 'refunds-timing',
        question: 'How long does it take to receive a refund?',
        paragraphs: [
          'Approved refunds are usually processed within 5–10 business days. Your bank or payment provider may take additional time to post the funds.',
        ],
      },
      {
        id: 'refunds-style',
        question: 'What if I simply do not like the style after receiving it?',
        paragraphs: [
          'Because each portrait is custom-made based on your approved direction, we cannot accept returns or refunds for general taste, style preference, or change-of-mind reasons.',
        ],
      },
    ],
  },
  {
    id: 'quality',
    eyebrow: 'Damage, Defects & Quality Issues',
    title: 'Verified problems are handled separately from style preference.',
    summary: 'When something arrives damaged, lost, or clearly produced incorrectly, we step in with a concrete resolution path.',
    items: [
      {
        id: 'quality-damaged',
        question: 'What if my painting arrives damaged?',
        paragraphs: [
          'Please contact us within 30 days of delivery and include photos of the artwork, packaging, and shipping box.',
          'Depending on the situation, we may offer a repair, replacement, remake, or refund.',
        ],
      },
      {
        id: 'quality-defect',
        question: 'What counts as a defect?',
        paragraphs: ['A defect may include:'],
        bullets: ['Wrong item sent', 'Incorrect size or option', 'Severe damage to the canvas, frame, or painting surface'],
      },
      {
        id: 'quality-not-defect',
        question: 'What is not considered a defect?',
        paragraphs: ['Because every artwork is handmade, the following are not usually considered defects:'],
        bullets: [
          'Small differences in brushwork or texture',
          'Slight color differences between screen preview and finished artwork',
          'Natural artist-made variation',
          'Minor differences caused by lighting, display settings, or material texture',
          'General style preference after the approved direction has been followed',
        ],
      },
    ],
  },
  {
    id: 'shipping',
    eyebrow: 'Shipping & Delivery',
    title: 'We help resolve true shipping issues, but delays are not the same as loss.',
    summary: 'If a carrier loses the package, we act. If the shipment is merely slow, we help track and escalate.',
    items: [
      {
        id: 'shipping-lost',
        question: 'What if my package is lost?',
        paragraphs: [
          'If the carrier confirms your package is lost, we will send a replacement or provide a refund.',
        ],
      },
      {
        id: 'shipping-delayed',
        question: 'What if shipping is delayed?',
        paragraphs: [
          'Shipping delays do not automatically qualify for a refund, but we will help track the package and step in if it becomes unusually delayed or confirmed lost.',
        ],
      },
      {
        id: 'shipping-address',
        question: 'What if I entered the wrong shipping address?',
        paragraphs: [
          'Please make sure your shipping address is correct before placing your order.',
          'We are not responsible for delays, returns, extra shipping costs, or missed delivery caused by an incorrect address, refusal, or failed delivery attempt.',
        ],
      },
    ],
  },
  {
    id: 'appearance',
    eyebrow: 'Materials & Final Appearance',
    title: 'Screen color and real-world materials will never be perfectly identical.',
    summary: 'We want expectations to feel honest before you order and before the finished portrait arrives.',
    items: [
      {
        id: 'appearance-colors',
        question: 'Will the final colors look exactly like my screen?',
        paragraphs: [
          'Colors may vary slightly between your screen and the finished artwork.',
          'Screen brightness, display settings, lighting, paint texture, and framing materials can all affect how the final piece looks in person.',
        ],
      },
    ],
  },
];

export default function Faq({ onNavigate }: { onNavigate: (route: InfoRoute) => void }) {
  const [openItemId, setOpenItemId] = useState(faqGroups[0].items[0]?.id ?? '');

  return (
    <div className="flex w-full flex-col pt-16">
      <section className="relative min-h-[78vh] overflow-hidden border-b border-[#DCCFBC] bg-[#F6F0E7]">
        <div className="absolute inset-0">
          <img src={imgHeroBg} alt="Curated gallery interior" className="h-full w-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(246,240,231,0.98)_0%,rgba(246,240,231,0.92)_36%,rgba(246,240,231,0.3)_72%,rgba(246,240,231,0.14)_100%)]" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(78vh-4rem)] max-w-[1600px] items-center px-6 py-10 lg:px-10 lg:py-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[640px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#897A67]">Frequently Asked Questions</p>
            <h1 className="mt-4 max-w-[11ch] text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] md:text-7xl">
              Questions answered before the brush dries.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#53493E] md:text-lg">
              Everything here is written to make the process feel straightforward: privacy, previews, revisions, refunds, shipping, and what to expect from handmade work.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => onNavigate('create')}
                className="button-lift inline-flex items-center justify-center rounded-[8px] bg-[#31271F] px-8 py-4 text-sm font-semibold tracking-[0.02em] text-[#FBF8F3] transition hover:bg-[#241C16]"
              >
                Start Your Painting
              </button>
              <button
                onClick={() => onNavigate('refund')}
                className="button-lift inline-flex items-center justify-center rounded-[8px] border border-[#DCCFBC] bg-white/72 px-8 py-4 text-sm font-medium text-[#31271F] transition hover:bg-[#F3EBDE]"
              >
                Read Refund Policy
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#DCCFBC] bg-[#EEE5D8] px-6 py-8 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-3">
          {highlightNotes.map(({ title, body, Icon }, index) => (
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
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">At A Glance</p>
            <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16] md:text-5xl">
              Clear answers for every step of the order.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[#5C5247]">
              Scan the section that matches your question, or read through the whole flow from upload to delivery.
            </p>
            <div className="mt-8 space-y-3 border-t border-[#E3D8C9] pt-6">
              {faqGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    const target = document.getElementById(group.id);
                    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="flex w-full items-center justify-between border-b border-[#E9E0D3] py-3 text-left text-sm text-[#4F463A] transition hover:text-[#241C16]"
                >
                  <span>{group.eyebrow}</span>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {faqGroups.map((group, groupIndex) => (
              <motion.section
                id={group.id}
                key={group.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: groupIndex * 0.03 }}
                className="border border-[#E4DACC] bg-[#FFFDF9]"
              >
                <div className="p-6 md:p-8">
                  <div className="max-w-3xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">{group.eyebrow}</p>
                    <h3 className="mt-3 max-w-[18ch] text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#241C16]">
                      {group.title}
                    </h3>
                    <p className="mt-4 max-w-[60ch] text-sm leading-7 text-[#62584D]">{group.summary}</p>
                  </div>

                  <div className="mt-8 border-t border-[#E7DDCE]">
                    {group.items.map((item) => {
                      const isOpen = openItemId === item.id;

                      return (
                        <div key={item.id} className="border-b border-[#E7DDCE]">
                          <button
                            onClick={() => setOpenItemId(isOpen ? '' : item.id)}
                            className="flex w-full items-start justify-between gap-4 py-5 text-left"
                            aria-expanded={isOpen}
                          >
                            <span className="max-w-[52ch] text-lg font-medium leading-7 text-[#241C16]">{item.question}</span>
                            <ChevronDown size={18} className={`mt-1 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.22, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <div className="pb-5 text-sm leading-7 text-[#5E554A]">
                                  {item.paragraphs.map((paragraph) => (
                                    <p key={paragraph} className="mb-3 last:mb-0">
                                      {paragraph}
                                    </p>
                                  ))}
                                  {item.bullets && (
                                    <ul className="mt-3 space-y-2 text-[#4F463A]">
                                      {item.bullets.map((bullet) => (
                                        <li key={bullet} className="flex gap-3">
                                          <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-[#7A6953]" />
                                          <span>{bullet}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#DCCFBC] bg-[#F4EFE7] px-6 py-18 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8D816F]">Still Deciding</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#241C16] md:text-5xl">
              See your photo as a painting before you commit.
            </h2>
            <p className="mt-4 max-w-[44ch] text-base leading-7 text-[#5C5247]">
              The easiest way to understand the process is to step through it. Upload a photo, explore directions, and judge the result with more confidence.
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
