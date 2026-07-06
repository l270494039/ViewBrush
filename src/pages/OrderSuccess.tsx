import { motion } from 'motion/react';
import { ArrowRight, BadgeCheck, CheckCircle2, PackageCheck, Sparkles, Truck } from 'lucide-react';
import { getBadgeClasses, getButtonClasses, getHeadingFont } from '../utils/theme';
import type { CheckoutSubmission } from './Checkout';
import type { PaymentDetailsPayload } from './PaymentDetails';

export default function OrderSuccess({
  selection,
  order,
  onReturnHome,
  onCreateAnother,
}: {
  selection: PaymentDetailsPayload;
  order: CheckoutSubmission;
  onReturnHome: () => void;
  onCreateAnother: () => void;
}) {
  const orderNumber = `PK-${selection.conceptTitle.slice(0, 2).toUpperCase()}${order.total}${selection.size.replace(/\D/g, '').slice(0, 4)}`;

  return (
    <div className="min-h-screen w-full bg-[#f7f2ea] text-[#2d241b]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 pb-20 pt-10 md:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_420px]"
        >
          <div className="rounded-[2px] border border-[#dccfbc] bg-white p-8 shadow-sm md:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#efe5d8] text-[#5f564a]">
              <CheckCircle2 size={34} strokeWidth={2.3} />
            </div>
            <div className={getBadgeClasses('mt-4 border-[#E0D3C2] bg-[#EFE5D8]')}>
              <BadgeCheck size={12} />
              Payment confirmed
            </div>
            <h1 className={`mt-4 text-3xl leading-tight md:text-5xl ${getHeadingFont()}`}>
              Your portrait is officially in the studio queue.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#6e6254]">
              We received your order and locked the approved preview direction. The next update will arrive by email as soon as the first artist pass begins.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <SuccessCard icon={Sparkles} title="Order received" body={`Order ${orderNumber} is confirmed and secured.`} />
              <SuccessCard icon={PackageCheck} title="Studio prep next" body="Your approved preview is being prepared for the artist team." />
              <SuccessCard icon={Truck} title="Shipping later" body={`Delivery method locked: ${order.deliveryOption === 'express' ? 'Express' : 'Standard'}.`} />
            </div>

            <div className="mt-8 rounded-[2px] border border-[#e6dbcf] bg-[#fbf7f0] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">What happens next</p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <TimelineStep index="01" title="Confirmation email" body={`Sent to ${order.email || 'your inbox'} with the order summary.`} />
                <TimelineStep index="02" title="Artist preparation" body="The studio reviews the preview, note, frame, and size selections." />
                <TimelineStep index="03" title="Painting & delivery" body="We complete the artwork and send tracking once it ships." />
              </div>
            </div>
          </div>

          <aside className="xl:sticky xl:top-8 xl:self-start">
            <div className="rounded-[2px] border border-[#dccfbc] bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8f816c]">Order summary</p>
              <div className="mt-5 overflow-hidden rounded-[2px] border border-[#e6dbcf] bg-[#fbf7f0] p-4">
                <div className="flex items-center gap-4">
                  <img src={selection.conceptImage ?? selection.sourceImage} alt={selection.conceptTitle} className="h-24 w-24 border border-[#e6dbcf] object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold">{selection.conceptTitle}</p>
                    <p className="mt-1 text-sm text-[#6e6254]">{selection.size} · {selection.frameLabel}</p>
                    <p className="mt-1 text-sm text-[#6e6254]">{order.country}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <SummaryRow label="Order number" value={orderNumber} />
                <SummaryRow label="Payment method" value={formatPaymentMethod(order.paymentMethod)} />
                <SummaryRow label="Delivery" value={order.deliveryOption === 'express' ? 'Express' : 'Standard'} />
                <SummaryRow label="Total paid" value={`$${order.total}`} />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button onClick={onReturnHome} className={`${getButtonClasses('primary', 'w-full justify-center py-4 text-sm')} gap-2`}>
                  Return Home
                  <ArrowRight size={16} />
                </button>
                <button onClick={onCreateAnother} className={`${getButtonClasses('outline', 'w-full justify-center py-4 text-sm')}`}>
                  Start Another Portrait
                </button>
              </div>
            </div>
          </aside>
        </motion.section>
      </div>
    </div>
  );
}

function SuccessCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Sparkles;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[2px] border border-[#e6dbcf] bg-[#fbf7f0] p-5">
      <Icon size={32} className="text-[#7a6a57]" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#6e6254]">{body}</p>
    </div>
  );
}

function TimelineStep({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div className="border-t border-black/10 pt-4">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7dccd] text-xs font-bold text-[#4f4437]">{index}</span>
        <p className="text-base font-semibold">{title}</p>
      </div>
      <p className="mt-3 text-sm leading-7 text-[#6e6254]">{body}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#6e6254]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function formatPaymentMethod(method: CheckoutSubmission['paymentMethod']) {
  if (method === 'apple-pay') return 'Apple Pay';
  if (method === 'shop-pay') return 'Shop Pay';
  if (method === 'paypal') return 'PayPal';
  return 'Credit Card';
}
