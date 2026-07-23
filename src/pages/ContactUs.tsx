import React, { FormEvent, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ClipboardList, Mail, Send } from 'lucide-react';

const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL?.trim() || 'support@example.com';

type FormState = {
  orderNumber: string;
  email: string;
  message: string;
};

const initialFormState: FormState = {
  orderNumber: '',
  email: '',
  message: '',
};

export default function ContactUs() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState('');
  const canUseMailto = supportEmail.includes('@') && !supportEmail.includes('[');

  const mailtoHref = useMemo(() => {
    if (!canUseMailto) return '';

    const subject = `Support request${form.orderNumber ? ` - Order ${form.orderNumber}` : ''}`;
    const body = [
      'Hi ViewBrush team,',
      '',
      `Order number: ${form.orderNumber || 'Not provided'}`,
      `Customer email: ${form.email || 'Not provided'}`,
      '',
      'Message:',
      form.message || 'Not provided',
    ].join('\n');

    return `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [canUseMailto, form.email, form.message, form.orderNumber]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canUseMailto) {
      setStatus('Please contact us using the support email shown on this page.');
      return;
    }

    window.location.href = mailtoHref;
    setStatus('Your email app is opening with your request details.');
  };

  return (
    <div className="flex w-full flex-col bg-[#FBF8F3] pt-16 text-[#241C16]">
      <section className="bg-[#FBF8F3] px-6 pb-8 pt-16 text-center lg:px-10 lg:pb-10 lg:pt-20">
        <div className="mx-auto max-w-[760px]">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#171717] md:text-6xl"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-[620px] text-lg leading-8 text-[#5E5E5E]"
          >
            Need help with your order? Our support team is here to assist you with any questions or concerns you may have.
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-12 pt-4 lg:px-10 lg:pb-16 lg:pt-4">
        <div className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(360px,0.38fr)] lg:items-start">
          <motion.form
            onSubmit={handleSubmit}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border border-[#DCCFBC] bg-white p-5 text-left shadow-[0_18px_42px_rgba(58,43,28,0.07)] md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#31271F]">Order number</span>
                <input
                  value={form.orderNumber}
                  onChange={(event) => updateField('orderNumber', event.target.value)}
                  placeholder="Order number"
                  className="mt-2 h-12 w-full border border-[#D6C7B6] bg-white px-3 text-sm text-[#2D241B] outline-none transition placeholder:text-[#9A8D7B] focus:border-[#31271F]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#31271F]">Email address</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="Email address"
                  className="mt-2 h-12 w-full border border-[#D6C7B6] bg-white px-3 text-sm text-[#2D241B] outline-none transition placeholder:text-[#9A8D7B] focus:border-[#31271F]"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-[#31271F]">Message</span>
              <textarea
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                placeholder="Tell us how we can help."
                rows={6}
                className="mt-2 min-h-[156px] w-full resize-y border border-[#D6C7B6] bg-white px-3 py-3 text-sm leading-6 text-[#2D241B] outline-none transition placeholder:text-[#9A8D7B] focus:border-[#31271F]"
              />
            </label>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <button
                type="submit"
                className="button-lift inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#31271F] px-6 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]"
              >
                <Send size={16} />
                Send Request
              </button>
              {status && <p className="text-sm leading-6 text-[#6A6155]">{status}</p>}
            </div>
          </motion.form>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <section className="border border-[#DCCFBC] bg-[#F4EFE7] p-6 text-left md:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#31271F] text-[#FBF8F3]">
                  <Mail size={18} />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#241C16]">Order support</h2>
              </div>
              <p className="mt-5 text-base leading-7 text-[#5C5247]">
                To request a cancellation, revision, replacement, or refund, please contact us at:
              </p>
              <a
                href={canUseMailto ? `mailto:${supportEmail}` : undefined}
                className="mt-4 inline-flex max-w-full items-center justify-center gap-3 border border-[#D6C7B6] bg-[#FBF8F3] px-4 py-3 text-base font-semibold text-[#31271F] shadow-[0_12px_26px_rgba(55,40,26,0.06)] transition hover:border-[#A99378] sm:px-5 sm:text-lg"
              >
                <Mail size={18} className="shrink-0 text-[#7C6B58]" />
                <span className="break-all">{supportEmail}</span>
              </a>
            </section>

            <section className="border border-[#DCCFBC] bg-white p-6 text-left md:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6D8C6] text-[#5B4B3C]">
                  <ClipboardList size={18} />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#241C16]">Order number</h2>
              </div>
              <p className="mt-5 text-base leading-7 text-[#5C5247]">Please include your order number so we can help you faster.</p>
            </section>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
