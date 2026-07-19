import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BadgeCheck,
  Brush,
  Check,
  CreditCard,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { getPresentationSummary, type FinishType } from '../data/presentationOptions';
import { getBadgeClasses, getButtonClasses, getHeadingFont } from '../utils/theme';
import type { PaymentDetailsPayload } from './PaymentDetails';

const priceRows = [
  { label: 'Portrait package', value: '$279' },
  { label: 'Protected shipping', value: 'Included' },
];

const confidenceNotes = [
  'Preview-first approval',
  'Hand-painted by real artists',
  'Museum-quality canvas and finishing',
  'Protected delivery included',
];

export default function Cart({
  selection,
  onCreate,
  onEdit,
  onClear,
  onCheckout,
  onAccount,
  onHelp,
}: {
  selection: PaymentDetailsPayload | null;
  onCreate: () => void;
  onEdit: () => void;
  onClear: () => void;
  onCheckout: () => void;
  onAccount: () => void;
  onHelp: () => void;
}) {
  const [view, setView] = useState<'canvas' | 'room'>('canvas');

  if (!selection) {
    return <EmptyArtworkBag onCreate={onCreate} onAccount={onAccount} onHelp={onHelp} />;
  }

  return (
    <div className="flex w-full flex-col bg-[#F6F0E7] pt-16 text-[#2D241B]">
      <section className="border-b border-[#DCCFBC] bg-[#FBF8F3] px-6 py-6 md:px-8">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex h-7 items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F816C]">
              <span className="opacity-45">01 Create</span>
              <span className="mx-4 opacity-25">-</span>
              <span className="opacity-45">02 Preview</span>
              <span className="mx-4 opacity-25">-</span>
              <span className="text-[#2D241B]">03 Artwork Bag</span>
              <span className="mx-4 opacity-25">-</span>
              <span className="opacity-45">04 Checkout</span>
            </div>
            <h1 className={`mt-4 text-4xl leading-[1.05] md:text-5xl ${getHeadingFont()}`}>Your Artwork Bag</h1>
            <p className="mt-3 max-w-[56ch] text-base leading-7 text-[#5F564B]">
              Review your saved portrait before it enters the studio queue.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={getBadgeClasses()}>
              <BadgeCheck size={13} />
              Preview approved
            </span>
            <span className={getBadgeClasses()}>
              <Brush size={13} />
              Artist finished
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-6 md:px-8">
        <div className="mx-auto grid w-full max-w-[1600px] gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="overflow-hidden border border-[#DCCFBC] bg-[#FBF8F3] shadow-[0_18px_42px_rgba(43,31,21,0.07)]"
          >
            <div className="flex flex-col gap-4 border-b border-[#E6DCCD] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8F816C]">Saved preview</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#241C16]">{selection.conceptTitle}</h2>
              </div>
              <div className="inline-flex self-start rounded-[8px] border border-[#DCCFBC] bg-white/82 p-1 text-xs md:self-auto">
                <button
                  type="button"
                  onClick={() => setView('canvas')}
                  className={`rounded-[8px] px-4 py-2 transition ${view === 'canvas' ? 'bg-[#2D241B] font-semibold text-white' : 'text-[#6F6254]'}`}
                >
                  Canvas
                </button>
                <button
                  type="button"
                  onClick={() => setView('room')}
                  className={`rounded-[8px] px-4 py-2 transition ${view === 'room' ? 'bg-[#2D241B] font-semibold text-white' : 'text-[#6F6254]'}`}
                >
                  Room
                </button>
              </div>
            </div>

            <div
              className="relative flex min-h-[520px] items-center justify-center overflow-hidden p-5 md:min-h-[660px] md:p-10"
              style={{
                backgroundColor: '#f7efdf',
                backgroundImage: 'linear-gradient(180deg, #fcf7ee 0%, #f7ecd9 48%, #f0e0c2 100%)',
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,252,245,0.72),transparent_34%),radial-gradient(circle_at_74%_34%,rgba(233,209,163,0.18),transparent_40%)]" />

              {view === 'canvas' ? (
                <div className="relative w-full max-w-[470px]">
                  <ArtworkFrame src={selection.conceptImage} alt={selection.conceptTitle} finishType={selection.finishType} frameStyle={selection.frameStyle} />
                  <div className="absolute -bottom-5 -left-2 w-[38%] min-w-[128px] max-w-[172px] rounded-[8px] border border-white/80 bg-white p-2 shadow-[0_18px_32px_rgba(43,31,21,0.12)]">
                    <img src={selection.sourceImage} alt="Source upload" className="aspect-[4/3] w-full rounded-[4px] object-cover" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7E66]">Source photo</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0">
                  <img src={selection.roomImage} alt={selection.roomLabel} className="h-full w-full object-cover opacity-[0.92]" />
                  <div className="absolute left-1/2 top-[22%] w-[min(24%,320px)] min-w-[190px] -translate-x-1/2">
                    <ArtworkFrame src={selection.conceptImage} alt={`${selection.conceptTitle} in room`} finishType={selection.finishType} frameStyle={selection.frameStyle} compact />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="border border-[#DCCFBC] bg-white p-6 shadow-[0_18px_36px_rgba(42,31,22,0.08)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8F816C]">Artwork summary</p>
              <h2 className={`mt-2 text-3xl leading-tight ${getHeadingFont()}`}>Ready for final checkout.</h2>

              <div className="mt-6 grid gap-3">
                <SummaryRow label="Style" value={selection.conceptTitle} />
                <SummaryRow label="Tone" value={selection.conceptTone} />
                <SummaryRow label="Size" value={selection.size} />
                <SummaryRow label="Finish" value={selection.finishLabel} />
                {selection.finishType === 'framed' && selection.frameLabel && <SummaryRow label="Frame Style" value={selection.frameLabel} />}
                <SummaryRow label="Room mockup" value={selection.roomLabel} />
              </div>

              {selection.note.trim() && (
                <div className="mt-5 border border-[#E5DCCF] bg-[#FBF8F3] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Creative note</p>
                  <p className="mt-2 text-sm leading-6 text-[#5F564B]">{selection.note}</p>
                </div>
              )}

              <div className="mt-6 space-y-3 border-y border-[#ECE3D7] py-5 text-sm">
                {priceRows.map((row) => (
                  <div key={row.label}>
                    <SummaryRow label={row.label} value={row.value} subtle />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8F816C]">Total</p>
                  <p className="mt-1 text-4xl font-semibold">$279</p>
                </div>
                <div className="bg-[#F3EBDE] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F564A]">
                  No surprises
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button onClick={onCheckout} className={`${getButtonClasses('primary', 'w-full gap-2 py-4 text-sm')}`}>
                  <CreditCard size={16} />
                  Continue to Secure Checkout
                  <ArrowRight size={16} />
                </button>
                <button onClick={onEdit} className={getButtonClasses('outline', 'w-full gap-2 py-3 text-sm')}>
                  <RotateCcw size={15} />
                  Edit Artwork
                </button>
                <button
                  onClick={onClear}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-medium text-[#7B4A3D] transition hover:bg-[#F8ECE6]"
                >
                  <Trash2 size={15} />
                  Remove saved artwork
                </button>
              </div>

              <div className="mt-6 grid gap-3 border-t border-[#ECE3D7] pt-5">
                {confidenceNotes.map((note) => (
                  <div key={note} className="flex items-start gap-2 text-sm text-[#5F564B]">
                    <Check size={15} className="mt-0.5 flex-shrink-0 text-[#7D705F]" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

    </div>
  );
}

function EmptyArtworkBag({
  onCreate,
  onAccount,
  onHelp,
}: {
  onCreate: () => void;
  onAccount: () => void;
  onHelp: () => void;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FBFAF8] pt-16 text-[#2D241B]">
      <section className="flex min-h-[420px] flex-1 items-center justify-center px-6 py-14 md:min-h-[520px] md:px-10 md:py-18">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center"
        >
          <h1 className="max-w-[19ch] text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[#241C16] md:text-[3rem]">
            Your artwork bag is empty.
          </h1>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-6 text-[#4F463C] md:text-base md:leading-7">
            Sign in to see whether you have saved artwork, or continue creating a portrait.
          </p>
          <div className="mt-8 flex w-full max-w-[520px] flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onAccount}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[10px] bg-[#31271F] px-6 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16] sm:w-[250px]"
            >
              View Account
            </button>
            <button
              type="button"
              onClick={onCreate}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[10px] border border-[#31271F] bg-transparent px-6 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE] sm:w-[250px]"
            >
              Continue Creating
            </button>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-[#D8CDBB] bg-[#F6F0E7] px-6 py-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[760px] flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm leading-6 text-[#3F362D] md:text-[15px]">
          <span>Need more help?</span>
          <button
            type="button"
            onClick={onHelp}
            className="font-semibold text-[#2D241B] underline decoration-[#A58964] underline-offset-4 hover:text-[#6B563C]"
          >
            Read FAQ
          </button>
          <span>or email support before you start.</span>
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value, subtle = false }: { label: string; value: string; subtle?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={subtle ? 'text-[#6E6254]' : 'text-sm text-[#7A6D5E]'}>{label}</span>
      <span className="text-right text-sm font-medium text-[#2D241B]">{value}</span>
    </div>
  );
}

function ArtworkFrame({
  src,
  alt,
  finishType,
  frameStyle,
  compact = false,
}: {
  src: string | null;
  alt: string;
  finishType: FinishType;
  frameStyle: string | null;
  compact?: boolean;
}) {
  const artwork = (
    <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f2ea]">
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : <div className="absolute inset-0 bg-[#FBF8F3]" />}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(67,46,23,0.12),inset_0_16px_22px_rgba(255,255,255,0.04),inset_0_-10px_18px_rgba(0,0,0,0.04)]" />
    </div>
  );

  if (finishType === 'rolled-canvas') {
    return (
      <div className={`relative mx-auto w-full bg-[#f4eadb] p-[10px] shadow-[0_16px_32px_rgba(38,28,18,0.14)] ${compact ? 'max-w-[240px]' : 'max-w-[470px]'}`}>
        <div className="border border-[#d8cab6] bg-[#fffdfa] p-[12px]">{artwork}</div>
      </div>
    );
  }

  if (finishType === 'gallery-wrap') {
    return (
      <div className={`relative mx-auto w-full bg-[linear-gradient(135deg,#c9b391_0%,#9f8763_55%,#d6c1a0_100%)] p-[7px] shadow-[0_18px_36px_rgba(38,28,18,0.18)] ${compact ? 'max-w-[240px]' : 'max-w-[470px]'}`}>
        <div className={compact ? 'bg-[#efe3d2] p-[8px]' : 'bg-[#efe3d2] p-[10px]'}>{artwork}</div>
      </div>
    );
  }

  return (
    <div
      className={`relative mx-auto w-full p-[5px] shadow-[0_22px_44px_rgba(38,28,18,0.28),0_5px_12px_rgba(38,28,18,0.20)] ${compact ? 'max-w-[260px]' : 'max-w-[470px]'}`}
      style={{ backgroundImage: frameStyle ?? 'linear-gradient(135deg, #d9bc72 0%, #ac7d2f 52%, #edcf8d 100%)' }}
    >
      <div className="pointer-events-none absolute inset-[2px] bg-[linear-gradient(140deg,rgba(255,255,255,0.32),rgba(255,255,255,0.08)_18%,transparent_34%,rgba(38,27,18,0.18)_100%)]" />
      <div className="relative bg-[#22180f] p-[2px]">
        <div className="p-[8px]" style={{ backgroundImage: frameStyle ?? 'linear-gradient(135deg, #d9bc72 0%, #ac7d2f 52%, #edcf8d 100%)' }}>
          <div className={compact ? 'bg-[#efe6d7] p-[10px]' : 'bg-[#efe6d7] p-[18px]'}>
            {artwork}
          </div>
        </div>
      </div>
    </div>
  );
}
