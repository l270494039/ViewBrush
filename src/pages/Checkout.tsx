import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { getPresentationSummary } from '../data/presentationOptions';
import { getBackButtonClasses, getBadgeClasses, getButtonClasses, getHeadingFont, getInputClasses } from '../utils/theme';
import type { PaymentDetailsPayload, PaymentPlan } from './PaymentDetails';

export type CheckoutSubmission = {
  email: string;
  country: string;
  paymentMethod: 'card' | 'paypal' | 'apple-pay' | 'shop-pay';
  paymentPlan: PaymentPlan;
  deliveryOption: 'standard' | 'express';
  total: number;
  amountDueToday: number;
};

const basePrice = 279;
const expressSurcharge = 25;
const installmentCount = 4;
const installmentAmount = basePrice / installmentCount;

const paymentMethods: Array<{ id: CheckoutSubmission['paymentMethod']; label: string }> = [
  { id: 'card', label: 'Credit Card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'apple-pay', label: 'Apple Pay' },
  { id: 'shop-pay', label: 'Shop Pay' },
];

const securityBadges = [
  { label: 'SSL Encrypted', icon: LockKeyhole },
  { label: 'Stripe Secured', icon: CreditCard },
  { label: 'Norton Protected', icon: ShieldCheck },
];

export default function Checkout({
  selection,
  onBack,
  onComplete,
}: {
  selection: PaymentDetailsPayload;
  onBack: () => void;
  onComplete: (submission: CheckoutSubmission) => void;
}) {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [isMobileViewport, setIsMobileViewport] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const [paymentMethod, setPaymentMethod] = useState<CheckoutSubmission['paymentMethod']>('card');
  const [deliveryOption, setDeliveryOption] = useState<CheckoutSubmission['deliveryOption']>('standard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [giftCard, setGiftCard] = useState('');
  const presentationSummary = getPresentationSummary(selection.finishLabel, selection.finishType === 'framed' ? selection.frameLabel : null);
  const paymentPlan = selection.paymentPlan ?? 'full';
  const paymentPlanLabel = paymentPlan === 'installments' ? `${installmentCount} interest-free payments` : 'Pay in full';

  const total = useMemo(
    () => basePrice + (deliveryOption === 'express' ? expressSurcharge : 0),
    [deliveryOption]
  );
  const amountDueToday = paymentPlan === 'installments' ? installmentAmount + (deliveryOption === 'express' ? expressSurcharge : 0) : total;

  useEffect(() => {
    const updateViewport = () => setIsMobileViewport(window.innerWidth < 768);

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const cardComplete = cardNumber.trim().length >= 12 && expiry.trim().length >= 4 && cvv.trim().length >= 3;
  const canSubmit = email.trim() && country.trim() && (paymentMethod === 'card' ? cardComplete : true);

  return (
    <div className="min-h-screen w-full bg-[#f7f2ea] text-[#2d241b]">
      <div className="bg-[#f07a37] py-2 text-center text-[12px] font-semibold text-white">
        Free Shipping · 30-Day Guarantee · See It Before You Pay
      </div>

      <div className="border-b border-[#e7dccf] bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 px-6 py-3 md:relative md:h-[58px] md:flex-row md:items-center md:justify-center md:px-8 md:py-0">
          <button
            onClick={onBack}
            className={getBackButtonClasses('self-start md:absolute md:left-8 md:top-1/2 md:-translate-y-1/2')}
          >
            <ArrowLeft size={14} />
            <span className="text-[12px] font-medium">Back to Details</span>
          </button>
          <div className="flex h-7 items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="opacity-40">01 Create</span>
            <span className="mx-4 opacity-20">—</span>
            <span className="opacity-40">02 Preview</span>
            <span className="mx-4 opacity-20">—</span>
            <span className="opacity-40">03 Details</span>
            <span className="mx-4 opacity-20">—</span>
            <span className="text-current">04 Checkout</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 pb-32 pt-8 md:px-8 md:pb-20">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]"
        >
          <div className="rounded-[2px] border border-[#dccfbc] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Payment</p>
                <h1 className={`mt-2 text-4xl ${getHeadingFont()}`}>Review & pay with confidence.</h1>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#f3ebde] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f564a]">
                <BadgeCheck size={12} />
                Final price, no surprises
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-[12px] text-[#6f6254]">
              {securityBadges.map(({ label, icon: Icon }) => (
                <div key={label} className={getBadgeClasses('text-[11px] normal-case tracking-normal')}>
                  <Icon size={14} />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`rounded-[4px] border px-4 py-3 text-sm font-medium transition ${
                    paymentMethod === method.id
                      ? 'border-[#31271F] bg-[#f5eee3] text-[#2d241b]'
                      : 'border-[#e4d8ca] bg-white text-[#6f6254] hover:border-[#cbb79c]'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-[#ece3d7] pt-6">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Email</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className={getInputClasses()}
              />
            </div>

            {paymentMethod === 'card' ? (
              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Card Number</label>
                  <input
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                    placeholder="0000 0000 0000 0000"
                    className={getInputClasses()}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Expiry</label>
                    <input
                      value={expiry}
                      onChange={(event) => setExpiry(event.target.value)}
                      placeholder="MM/YY"
                      className={getInputClasses()}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">CVV</label>
                    <input
                      value={cvv}
                      onChange={(event) => setCvv(event.target.value)}
                      placeholder="123"
                      className={getInputClasses()}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 border border-[#dccfbc] bg-[#fbf7f0] p-5 text-sm leading-7 text-[#6e6254]">
                {paymentMethod === 'paypal' && 'You will be redirected to PayPal after clicking Complete Order.'}
                {paymentMethod === 'apple-pay' && 'Apple Pay will open securely on supported devices after you confirm the order.'}
                {paymentMethod === 'shop-pay' && 'Shop Pay will take over the final confirmation step for a faster checkout.'}
              </div>
            )}

            <div className="mt-6">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Delivery Options</label>
              <div className="grid gap-3">
                <button
                  onClick={() => setDeliveryOption('standard')}
                  className={`flex items-center justify-between rounded-[4px] border px-4 py-4 text-left transition ${
                    deliveryOption === 'standard' ? 'border-[#31271F] bg-[#fbf7f0]' : 'border-[#dccfbc] bg-white'
                  }`}
                >
                  <div>
                    <p className="text-base font-semibold">Standard — Free</p>
                    <p className="mt-1 text-sm text-[#6e6254]">Arrives in 7-10 business days</p>
                  </div>
                  <span className={`h-4 w-4 rounded-full border ${deliveryOption === 'standard' ? 'border-[#31271F] bg-[#31271F]' : 'border-[#b9ab98]'}`} />
                </button>
                <button
                  onClick={() => setDeliveryOption('express')}
                  className={`flex items-center justify-between rounded-[4px] border px-4 py-4 text-left transition ${
                    deliveryOption === 'express' ? 'border-[#31271F] bg-[#fbf7f0]' : 'border-[#dccfbc] bg-white'
                  }`}
                >
                  <div>
                    <p className="text-base font-semibold">Express — +$25</p>
                    <p className="mt-1 text-sm text-[#6e6254]">Arrives in 3-5 business days</p>
                  </div>
                  <span className={`h-4 w-4 rounded-full border ${deliveryOption === 'express' ? 'border-[#31271F] bg-[#31271F]' : 'border-[#b9ab98]'}`} />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Shipping Country</label>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className={getInputClasses()}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Germany</option>
              </select>
            </div>

            <p className="mt-6 text-sm text-[#7a6d5e]">&quot;Not happy? Full refund within 30 days. No questions asked.&quot;</p>
          </div>

          <aside className="xl:sticky xl:top-8 xl:self-start">
            <div className="rounded-[2px] border border-[#dccfbc] bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Review & Pay</p>
              <div className="mt-5 flex items-end justify-between border-b border-[#ece3d7] pb-5">
                <div>
                  <p className="text-sm text-[#6e6254]">Due Today</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#9b8c78]">{paymentPlan === 'installments' ? 'Installment plan' : 'Final price — no surprises'}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-semibold">{formatMoney(amountDueToday)}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <CheckoutRow label="Portrait package" value="$279" />
                <CheckoutRow label="Shipping" value={deliveryOption === 'express' ? '$25' : 'Free'} />
                <CheckoutRow label="Payment plan" value={paymentPlanLabel} />
                {paymentPlan === 'installments' && <CheckoutRow label="Order total" value={formatMoney(total)} />}
              </div>

              <div className="mt-5 border-t border-[#ece3d7] pt-5">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Gift card</label>
                <input
                value={giftCard}
                onChange={(event) => setGiftCard(event.target.value)}
                placeholder="Enter code"
                className={getInputClasses()}
              />
              </div>

              <div className="mt-6 border-t border-[#ece3d7] pt-5">
                <div className="flex items-center gap-3">
                  <img src={selection.sourceImage} alt="Source" className="h-16 w-16 border border-[#e6dbcf] object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold">{selection.conceptTitle}</p>
                    <p className="mt-1 text-sm text-[#6e6254]">{selection.size} · {presentationSummary}</p>
                  </div>
                </div>
              </div>

              {!isMobileViewport && (
                <>
                  <button
                    onClick={() =>
                      onComplete({
                        email,
                        country,
                        paymentMethod,
                        paymentPlan,
                        deliveryOption,
                        total,
                        amountDueToday,
                      })
                    }
                    disabled={!canSubmit}
                    className={`${getButtonClasses('primary', 'mt-5 w-full justify-center py-4 text-sm disabled:bg-[#b9afa3] disabled:text-[#f8f3ec] disabled:shadow-none')} gap-2`}
                  >
                    <Wallet size={16} />
                    Complete Order
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>
          </aside>
        </motion.section>
      </div>

      {isMobileViewport && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#DCCFBC] bg-[#FBF8F3]/96 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 shadow-[0_-18px_40px_rgba(36,28,20,0.12)] backdrop-blur-xl">
          <div className="mx-auto w-full max-w-[680px]">
            <button
              onClick={() =>
                onComplete({
                  email,
                  country,
                  paymentMethod,
                  paymentPlan,
                  deliveryOption,
                  total,
                  amountDueToday,
                })
              }
              disabled={!canSubmit}
              className={`${getButtonClasses('primary', 'flex w-full items-center justify-center gap-2 py-4 text-sm disabled:bg-[#b9afa3] disabled:text-[#f8f3ec] disabled:shadow-none')}`}
            >
              <Wallet size={16} />
              Complete Order
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckoutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#6e6254]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}
