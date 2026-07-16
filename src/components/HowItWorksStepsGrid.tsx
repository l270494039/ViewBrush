import React from 'react';
import { motion } from 'motion/react';

import { howItWorksStepCards, type HowItWorksStepCardItem } from '../data/howItWorksSteps';

export default function HowItWorksStepsGrid({
  steps = howItWorksStepCards,
  className = '',
}: {
  steps?: HowItWorksStepCardItem[];
  className?: string;
}) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 xl:grid-cols-4 ${className}`}>
      {steps.map((step, index) => (
        <motion.article
          key={step.number}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.48, delay: Math.min(index * 0.05, 0.18) }}
          className="group rounded-[12px] border border-[#DCCFBC] bg-white p-4"
        >
          <div className="overflow-hidden rounded-[8px]">
            <img
              src={step.image}
              alt={step.imageAlt}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
            />
          </div>
          <p className="mt-4 text-[2.45rem] font-semibold leading-none tracking-[-0.04em] text-[#B49D82]">{step.number}</p>
          <h3 className="mt-3 text-[24px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#241C16]">{step.title}</h3>
          <p className="mt-2.5 text-[14px] leading-[1.5] text-[#4F463A]">{step.body}</p>
        </motion.article>
      ))}
    </div>
  );
}
