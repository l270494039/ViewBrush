import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CreditCard,
} from 'lucide-react';
import { getBackButtonClasses, getButtonClasses, getHeadingFont, getInputClasses } from '../utils/theme';

export type PaymentDetailsPayload = {
  conceptTitle: string;
  conceptTone: string;
  conceptImage: string | null;
  sourceImage: string;
  frameLabel: string;
  frameStyle: string;
  size: string;
  roomLabel: string;
  roomImage: string;
  note: string;
};

export default function PaymentDetails({
  selection,
  onBack,
  onContinueCheckout,
}: {
  selection: PaymentDetailsPayload;
  onBack: () => void;
  onContinueCheckout: () => void;
}) {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [isMobileViewport, setIsMobileViewport] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const palette = {
    page: 'bg-[#f4ede3] text-[#2d241b]',
    surface: 'bg-[#fbf7f0] border-[#dccfbc]',
    muted: 'text-[#6e6254]',
    soft: 'bg-[#efe5d8]',
    accentSoft: 'bg-[#e7dccd] text-[#4f4437]',
  };

  useEffect(() => {
    const updateViewport = () => setIsMobileViewport(window.innerWidth < 768);

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <div className={`min-h-screen w-full ${palette.page}`}>
      <div className={`border-b ${palette.surface} bg-white/70 backdrop-blur`}>
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 px-6 py-3 md:relative md:h-[58px] md:flex-row md:items-center md:justify-center md:px-8 md:py-0">
          <button
            onClick={onBack}
            className={getBackButtonClasses('self-start md:absolute md:left-8 md:top-1/2 md:-translate-y-1/2')}
          >
            <ArrowLeft size={14} />
            <span className="text-[12px] font-medium">Back to Preview</span>
          </button>
          <div className="flex h-7 items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="opacity-40">01 Create</span>
            <span className="mx-4 opacity-20">—</span>
            <span className="opacity-40">02 Preview</span>
            <span className="mx-4 opacity-20">—</span>
            <span className="text-current">03 Details</span>
            <span className="mx-4 opacity-20">—</span>
            <span className="opacity-40">04 Checkout</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-6 pb-32 pt-5 md:px-8 md:pb-20">
        <section className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={`overflow-hidden border p-6 md:p-8 ${palette.surface}`}
          >
            <div className="max-w-3xl">
              <div className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] ${palette.soft}`}>
                <BadgeCheck size={12} />
                Preview approved
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryChip label="Style" value={selection.conceptTitle} />
              <SummaryChip label="Tone" value={selection.conceptTone} />
              <SummaryChip label="Size" value={selection.size} />
              <SummaryChip label="Frame" value={selection.frameLabel} />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div className={`relative overflow-hidden border p-6 md:p-7 ${palette.surface}`}>
                <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.7),transparent_70%)]" />
                <p className="relative text-[10px] font-bold uppercase tracking-[0.24em] opacity-55">Approved artwork</p>
                <div className="relative mt-5">
                  <ArtworkFrame src={selection.conceptImage} alt={selection.conceptTitle} frameStyle={selection.frameStyle} />
                  <div className="absolute -bottom-4 -left-1 w-[34%] min-w-[120px] max-w-[150px] rounded-[8px] border border-black/8 bg-white p-2 shadow-[0_14px_24px_rgba(0,0,0,0.08)]">
                    <img src={selection.sourceImage} alt="Source upload" className="aspect-[4/3] w-full object-cover" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7d7264]">Source photo</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-4 border-t border-black/8 pt-4">
                    <span className="opacity-60">Format</span>
                    <span className="font-medium">Hand-painted portrait</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="opacity-60">Presentation</span>
                    <span className="font-medium">{selection.frameLabel}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="opacity-60">Scale</span>
                    <span className="font-medium">{selection.size}</span>
                  </div>
                </div>
              </div>
              <section className={`rounded-[2px] border p-6 shadow-[0_18px_36px_rgba(42,31,22,0.08)] ${palette.surface}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] opacity-55">Payment details</p>
                <h2 className={`mt-2 text-3xl ${getHeadingFont()}`}>Order summary</h2>

                <div className="mt-6 space-y-3 border-y border-black/8 py-5 text-sm">
                  <PriceRow label="Hand-painted portrait" value="$229" />
                  <PriceRow label="Frame finishing" value="$50" />
                  <PriceRow label="Protected shipping" value="Included" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] opacity-55">Total</p>
                    <p className="mt-1 text-4xl font-semibold">$279</p>
                  </div>
                  <div className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] ${palette.accentSoft}`}>
                    Secure checkout next
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] opacity-55">Email for order updates</label>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className={getInputClasses('bg-transparent')}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] opacity-55">Shipping country</label>
                    <select
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      className={getInputClasses('bg-transparent')}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>Germany</option>
                    </select>
                  </div>
                </div>

                {!isMobileViewport && (
                  <button onClick={onContinueCheckout} className={`${getButtonClasses('primary', 'w-full justify-center py-4 text-sm')} gap-2`}>
                    <CreditCard size={16} />
                    Continue to Secure Payment
                    <ArrowRight size={16} />
                  </button>
                )}
              </section>
            </div>
          </motion.div>
        </section>
      </div>

      {isMobileViewport && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#DCCFBC] bg-[#FBF8F3]/96 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 shadow-[0_-18px_40px_rgba(36,28,20,0.12)] backdrop-blur-xl">
          <div className="mx-auto w-full max-w-[680px]">
            <button onClick={onContinueCheckout} className={`${getButtonClasses('primary', 'flex w-full items-center justify-center gap-2 py-4 text-sm')}`}>
              <CreditCard size={16} />
              Continue to Secure Payment
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2px] border border-black/8 bg-white/75 px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b7e66]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[#2d241b]">{value}</p>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="opacity-70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ArtworkFrame({
  src,
  alt,
  frameStyle,
}: {
  src: string | null;
  alt: string;
  frameStyle: string;
}) {
  return (
    <div
      className="relative mx-auto w-full max-w-[360px] p-[4px] shadow-[0_18px_34px_rgba(38,28,18,0.24),0_3px_8px_rgba(38,28,18,0.18)]"
      style={{ backgroundImage: frameStyle }}
    >
      <div className="bg-[#22180f] p-[1px]">
        <div className="relative p-[4px]" style={{ backgroundImage: frameStyle }}>
          <div className="bg-[#efe6d7] p-[10px]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f2ea]">
              {src ? <img src={src} alt={alt} className="block h-full w-full object-cover" /> : <div className="absolute inset-0 bg-[#fbf8f3]" />}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(67,46,23,0.12)]" />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-[10px] right-[10px] top-[5px] h-px bg-white/25" />
      <div className="pointer-events-none absolute inset-x-[6px] bottom-[3px] h-5 bg-gradient-to-b from-transparent to-black/12" />
    </div>
  );
}
