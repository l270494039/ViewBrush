import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BadgeQuestionMark,
  ChevronDown,
  CircleQuestionMark,
  FileQuestionMark,
  MessageCircleQuestionMark,
  MessageSquareText,
  Search,
} from 'lucide-react';

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
  items: FaqEntry[];
};

const faqGroups: FaqGroup[] = [
  {
    id: 'privacy',
    eyebrow: 'Photos & Privacy',
    items: [
      {
        id: 'privacy-public',
        question: 'Will my photo or final artwork be used publicly?',
        paragraphs: [
          'Your original photo is used only to create your custom artwork. We will never use your original photo publicly. We will ask for your approval to feature the finished artwork in our portfolio, website, social media, or marketing materials. We will only share it publicly if you give us permission. Saying no is completely fine and will not affect your order.',
        ],
      },
    ],
  },
  {
    id: 'preview',
    eyebrow: 'Preview & Approval',
    items: [
      {
        id: 'preview-same',
        question: 'Is the preview exactly the same as the final painting?',
        paragraphs: [
          'No. The preview is meant to show the creative direction, not an exact pixel-for-pixel final result. Because your artwork is handmade, natural differences in brushwork, texture, color, and artistic interpretation are part of the process.',
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
    items: [
      {
        id: 'revisions-request',
        question: 'Can I request changes to the final artwork before shipping?',
        paragraphs: [
          'Yes. If needed, you may request reasonable revisions before shipping. We want you to feel confident about the final artwork before it is sent out.',
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
          'Please contact us as soon as possible. If production or shipping has not started, we will do our best to help. Once production has started, changes to the photo, style, size, or other order details may not always be possible. Once an order has shipped, the shipping address can no longer be changed by us.',
        ],
      },
      {
        id: 'revisions-approval',
        question: 'What happens after I approve the final artwork?',
        paragraphs: [
          'Once you approve the final artwork, we will prepare it for shipment. After approval, the order moves into the final shipping stage and can no longer be changed, canceled, or refunded for general preference reasons.',
        ],
      },
    ],
  },
  {
    id: 'refunds',
    eyebrow: 'Cancellations & Refunds',
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
          'Once the artist has started, your order is considered in production. At that point, the order may only be eligible for a partial refund depending on how much work has already been completed.',
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
    id: 'appearance',
    eyebrow: 'Materials & Final Appearance',
    items: [
      {
        id: 'appearance-colors',
        question: 'Will the final colors look exactly like my screen?',
        paragraphs: [
          'Colors may vary slightly between your screen and the finished artwork. Screen brightness, display settings, lighting, paint texture, and framing materials can all affect how the final piece looks in person.',
        ],
      },
    ],
  },
];

const heroDecorations = [
  { Icon: MessageCircleQuestionMark, className: 'left-[6%] top-[18%] h-20 w-20 md:h-28 md:w-28' },
  { Icon: Search, className: 'bottom-[12%] left-[20%] h-14 w-14 md:h-20 md:w-20' },
  { Icon: FileQuestionMark, className: 'right-[8%] top-[16%] h-16 w-16 md:h-24 md:w-24' },
  { Icon: MessageSquareText, className: 'bottom-[10%] right-[23%] h-14 w-14 md:h-20 md:w-20' },
  { Icon: CircleQuestionMark, className: 'right-[42%] top-[8%] hidden h-12 w-12 md:block md:h-16 md:w-16' },
  { Icon: BadgeQuestionMark, className: 'bottom-[6%] left-[43%] hidden h-12 w-12 md:block md:h-16 md:w-16' },
];

export default function Faq({ onNavigate: _onNavigate }: { onNavigate: (route: InfoRoute) => void }) {
  const [openItemId, setOpenItemId] = useState(faqGroups[0].items[0]?.id ?? '');
  const [activeGroupId, setActiveGroupId] = useState(faqGroups[0]?.id ?? '');

  useEffect(() => {
    let frameId = 0;

    const updateActiveGroup = () => {
      const triggerY = Math.min(220, window.innerHeight * 0.28);
      let nextGroupId = faqGroups[0]?.id ?? '';

      for (const group of faqGroups) {
        const section = document.getElementById(group.id);
        if (section && section.getBoundingClientRect().top <= triggerY) {
          nextGroupId = group.id;
        }
      }

      setActiveGroupId((current) => (current === nextGroupId ? current : nextGroupId));
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveGroup);
    };

    updateActiveGroup();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateToGroup = (groupId: string) => {
    setActiveGroupId(groupId);
    document.getElementById(groupId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
            <h1 className="mx-auto whitespace-nowrap text-2xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241C16] sm:text-4xl md:text-5xl lg:text-[64px]">
              Frequently Asked Questions
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FBF8F3] px-6 py-14 lg:px-10 lg:py-24">
        <div className="mx-auto grid min-w-0 max-w-[1600px] gap-10 lg:grid-cols-3 lg:gap-6">
          <nav aria-label="FAQ categories" className="min-w-0 lg:sticky lg:top-24 lg:max-w-[340px] lg:self-start">
            <div className="hide-scrollbar flex w-full min-w-0 overflow-x-auto border-b border-[#D7C7B8] lg:flex-col lg:gap-1 lg:border-b-0 lg:pr-8">
              {faqGroups.map((group) => {
                const isActive = activeGroupId === group.id;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => navigateToGroup(group.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`shrink-0 border-b-2 px-3 py-3 text-left text-sm font-medium transition-colors lg:w-full lg:border-b-0 lg:border-l-2 lg:px-5 lg:py-3.5 ${
                      isActive
                        ? 'border-[#8B6F58] bg-[#F1E7DC] text-[#241C16]'
                        : 'border-transparent text-[#786C5D] hover:bg-[#F5EEE6] hover:text-[#241C16]'
                    }`}
                  >
                    {group.eyebrow}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="min-w-0 lg:col-span-2">
            {faqGroups.map((group, groupIndex) => (
              <motion.section
                id={group.id}
                key={group.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: groupIndex * 0.03 }}
                className="scroll-mt-28 pb-20 last:pb-0 md:pb-24"
              >
                <div>
                  <h2 className="border-b border-[#D7C7B8] pb-5 text-xl font-semibold leading-7 text-[#241C16] md:text-[22px]">
                    {group.eyebrow}
                  </h2>

                  <div>
                    {group.items.map((item) => {
                      const isOpen = openItemId === item.id;

                      return (
                        <div key={item.id} className="border-b border-[#D7C7B8]">
                          <button
                            onClick={() => {
                              setOpenItemId(isOpen ? '' : item.id);
                              setActiveGroupId(group.id);
                            }}
                            className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                            aria-expanded={isOpen}
                          >
                            <span className="max-w-[52ch] text-base font-medium leading-7 text-[#241C16] md:text-lg">{item.question}</span>
                            <ChevronDown size={18} className={`mt-1 shrink-0 text-[#6D6255] transition-transform duration-200 group-hover:text-[#241C16] ${isOpen ? 'rotate-180' : ''}`} />
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
                                <div className="max-w-[62ch] pb-6 pr-10 text-sm leading-7 text-[#5E554A] md:text-base">
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
    </div>
  );
}
