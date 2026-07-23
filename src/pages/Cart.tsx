import { useEffect, useState } from 'react';
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
import { defaultMockCustomer, type MockCustomer } from '../data/mockAccount';
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
  resetKey,
  emptyContext = 'bag',
  customer,
  onCreate,
  onEdit,
  onClear,
  onCheckout,
  onAccount,
  onHelp,
}: {
  selection: PaymentDetailsPayload | null;
  resetKey?: number;
  emptyContext?: 'bag' | 'account';
  customer: MockCustomer | null;
  onCreate: () => void;
  onEdit: () => void;
  onClear: () => void;
  onCheckout: () => void;
  onAccount: (customer: MockCustomer) => void;
  onHelp: () => void;
}) {
  const [view, setView] = useState<'canvas' | 'room'>('canvas');
  const [emptyStateView, setEmptyStateView] = useState<'bag' | 'login' | 'create-account' | 'forgot-password'>('bag');

  useEffect(() => {
    if (!selection) {
      setEmptyStateView('bag');
    }
  }, [emptyContext, resetKey, selection]);

  useEffect(() => {
    if (!selection) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [emptyStateView, selection]);

  if (!selection) {
    if (emptyStateView === 'login') {
      return (
        <CustomerLogin
          customer={customer}
          onAccount={onAccount}
          onCreateAccount={() => setEmptyStateView('create-account')}
          onForgotPassword={() => setEmptyStateView('forgot-password')}
        />
      );
    }

    if (emptyStateView === 'create-account') {
      return <CreateCustomerAccount onAccount={onAccount} />;
    }

    if (emptyStateView === 'forgot-password') {
      return <PasswordRecovery onBackToSignIn={() => setEmptyStateView('login')} />;
    }

    return (
      <EmptyArtworkBag
        context={emptyContext}
        customer={customer}
        onCreate={onCreate}
        onCreateAccount={() => setEmptyStateView('create-account')}
        onSignIn={() => setEmptyStateView('login')}
        onViewAccount={() => customer && onAccount(customer)}
        onHelp={onHelp}
      />
    );
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
  context,
  customer,
  onCreate,
  onCreateAccount,
  onSignIn,
  onViewAccount,
  onHelp,
}: {
  context: 'bag' | 'account';
  customer: MockCustomer | null;
  onCreate: () => void;
  onCreateAccount: () => void;
  onSignIn: () => void;
  onViewAccount: () => void;
  onHelp: () => void;
}) {
  const isSignedIn = Boolean(customer);
  const isAccountContext = context === 'account';
  const title = isAccountContext ? 'Sign in to your personal center.' : 'Your artwork bag is empty.';
  const body = isAccountContext
    ? 'Sign in to manage your orders, saved artwork, account details, payment methods, and support requests.'
    : isSignedIn
      ? 'You do not have any saved artwork yet. Continue creating a portrait or review your account.'
      : 'Sign in to see whether you have saved artwork, or continue creating a portrait.';

  return (
    <div className="flex min-h-full w-full flex-1 flex-col bg-[#FBF8F3] pt-16 text-[#2D241B]">
      <section className="flex flex-1 items-center justify-center px-6 py-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center"
        >
          <h1 className="max-w-[19ch] text-[2.15rem] font-semibold leading-[1.08] text-[#241C16] md:text-[3rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-6 text-[#4F463C] md:text-base md:leading-7">
            {body}
          </p>
          <div className="mt-8 flex w-full max-w-[520px] flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={isSignedIn ? onCreate : onSignIn}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[10px] bg-[#31271F] px-6 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16] sm:w-[250px]"
            >
              {isSignedIn ? 'Continue Creating' : 'Sign in'}
            </button>
            <button
              type="button"
              onClick={isSignedIn ? onViewAccount : isAccountContext ? onCreateAccount : onCreate}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[10px] border border-[#31271F] bg-transparent px-6 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE] sm:w-[250px]"
            >
              {isSignedIn ? 'View Account' : isAccountContext ? 'Create Account' : 'Continue Creating'}
            </button>
          </div>
        </motion.div>
      </section>

      <section className="border-t border-[#D8CDBB] bg-[#FBF8F3] px-6 py-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[760px] flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm leading-6 text-[#3F362D] md:text-[15px]">
          <span>Need more help?</span>
          <button
            type="button"
            onClick={onHelp}
            className="font-semibold text-[#2D241B] underline decoration-[#2D241B] decoration-[1px] underline-offset-4 hover:text-[#6B563C] hover:decoration-[#6B563C]"
          >
            Read FAQ
          </button>
          <span>or email support before you start.</span>
        </div>
      </section>
    </div>
  );
}

function CustomerLogin({
  customer,
  onAccount,
  onCreateAccount,
  onForgotPassword,
}: {
  customer: MockCustomer | null;
  onAccount: (customer: MockCustomer) => void;
  onCreateAccount: () => void;
  onForgotPassword: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(customer?.email ?? defaultMockCustomer.email);

  return (
    <div className="flex min-h-full w-full flex-1 overflow-x-hidden bg-[#FBF8F3] pt-16 text-[#2D241B]">
      <section className="flex w-full flex-1 items-center justify-center px-6 py-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[620px]"
        >
          <div className="text-center">
            <h1 className="text-[42px] font-semibold leading-[1.08] text-[#241C16]">
              Customer Login
            </h1>
            <h2 className="mt-9 text-[22px] font-semibold text-[#241C16]">
              Registered Customers
            </h2>
            <div className="mx-auto mt-6 h-px w-full max-w-[520px] bg-[#D8C7B8]" />
            <p className="mx-auto mt-7 max-w-[48ch] text-base leading-7 text-[#2D241B] md:text-lg">
              If you have an account, sign in with your email address.
            </p>
          </div>

          <form
            className="mx-auto mt-8 max-w-[520px]"
            onSubmit={(event) => {
              event.preventDefault();
              onAccount({ ...defaultMockCustomer, email: email.trim() || defaultMockCustomer.email });
            }}
          >
            <label className="block text-left text-lg font-semibold text-[#241C16]">
              Email <span className="text-[#8F816C]">*</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-3 h-[52px] w-full rounded-[10px] border border-[#CFC4B5] bg-white/80 px-4 text-base text-[#241C16] outline-none transition focus:border-[#31271F] focus:bg-white"
              />
            </label>

            <label className="mt-7 block text-left text-lg font-semibold text-[#241C16]">
              Password <span className="text-[#8F816C]">*</span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                className="mt-3 h-[52px] w-full rounded-[10px] border border-[#CFC4B5] bg-white/80 px-4 text-base text-[#241C16] outline-none transition focus:border-[#31271F] focus:bg-white"
              />
            </label>

            <label className="mt-6 flex items-center gap-2 text-left text-base font-medium text-[#2D241B]">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
                className="h-5 w-5 rounded-[5px] border border-[#8B8174] accent-[#31271F]"
              />
              Show Password
            </label>

            <button
              type="submit"
              className="mt-8 inline-flex min-h-[54px] w-full items-center justify-center rounded-[10px] bg-[#31271F] px-6 py-3 text-base font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]"
            >
              Sign In
            </button>
          </form>

          <div className="mx-auto mt-8 flex max-w-[620px] flex-col items-center justify-center gap-3 text-center text-base leading-7 text-[#2D241B]">
            <button type="button" onClick={onForgotPassword} className="font-medium text-[#1267C7] transition hover:text-[#0A4E9A]">
              Forgot password? ↗
            </button>
            <p>
              Don&apos;t have an account?{' '}
              <button type="button" onClick={onCreateAccount} className="font-medium text-[#1267C7] transition hover:text-[#0A4E9A]">
                Create Your ViewBrush Account ↗
              </button>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function CreateCustomerAccount({ onAccount }: { onAccount: (customer: MockCustomer) => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-full w-full flex-1 overflow-x-hidden bg-[#FBF8F3] pt-16 text-[#2D241B]">
      <section className="flex w-full flex-1 items-center justify-center px-6 py-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[1120px]"
        >
          <h1 className="text-center text-[42px] font-semibold leading-[1.08] text-[#241C16]">
            Create New Customer Account
          </h1>

          <form
            className="mx-auto mt-12 w-full max-w-[760px]"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const firstName = String(formData.get('firstName') || defaultMockCustomer.firstName).trim();
              const lastName = String(formData.get('lastName') || defaultMockCustomer.lastName).trim();
              const email = String(formData.get('email') || defaultMockCustomer.email).trim();
              onAccount({
                firstName: firstName || defaultMockCustomer.firstName,
                lastName: lastName || defaultMockCustomer.lastName,
                email: email || defaultMockCustomer.email,
                memberSince: defaultMockCustomer.memberSince,
              });
            }}
          >
            <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2">
              <RoundedInput label="First Name" name="firstName" required autoComplete="given-name" />
              <RoundedInput label="Last Name" name="lastName" required autoComplete="family-name" />
              <RoundedInput label="Email" name="email" required type="email" autoComplete="email" className="sm:col-span-2" />
              <RoundedInput
                label="Password"
                name="password"
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
              />
              <RoundedInput
                label="Confirm Password"
                name="confirmPassword"
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
              />
              <div className="sm:col-span-2">
                <AccountCheckbox
                  label="Show Password"
                  checked={showPassword}
                  onChange={(checked) => setShowPassword(checked)}
                />
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                className="inline-flex min-h-[54px] w-full items-center justify-center rounded-[10px] bg-[#31271F] px-6 py-3 text-base font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]"
              >
                Create an Account
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

function PasswordRecovery({ onBackToSignIn }: { onBackToSignIn: () => void }) {
  const [email, setEmail] = useState(defaultMockCustomer.email);
  const [isSent, setIsSent] = useState(false);

  return (
    <div className="flex min-h-full w-full flex-1 overflow-x-hidden bg-[#FBF8F3] pt-16 text-[#2D241B]">
      <section className="flex w-full flex-1 items-center justify-center px-6 py-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[620px]"
        >
          <div className="text-center">
            <h1 className="text-[42px] font-semibold leading-[1.08] text-[#241C16]">Forgot Password</h1>
            <h2 className="mt-9 text-[22px] font-semibold text-[#241C16]">Reset your password</h2>
            <div className="mx-auto mt-6 h-px w-full max-w-[520px] bg-[#D8C7B8]" />
            <p className="mx-auto mt-7 max-w-[48ch] text-base leading-7 text-[#2D241B] md:text-lg">
              Enter your email address and we&apos;ll send a password reset link.
            </p>
          </div>

          {isSent ? (
            <div className="mx-auto mt-8 max-w-[520px] rounded-[10px] border border-[#D8C7B8] bg-white/70 px-5 py-5 text-center">
              <p className="text-base font-semibold text-[#241C16]">Reset link sent</p>
              <p className="mt-2 text-sm leading-6 text-[#5F564B]">
                We sent a demo reset link to {email.trim() || defaultMockCustomer.email}.
              </p>
              <button
                type="button"
                onClick={onBackToSignIn}
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-[10px] bg-[#31271F] px-6 py-3 text-base font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form
              className="mx-auto mt-8 max-w-[520px]"
              onSubmit={(event) => {
                event.preventDefault();
                setIsSent(true);
              }}
            >
              <label className="block text-left text-lg font-semibold text-[#241C16]">
                Email <span className="text-[#8F816C]">*</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-3 h-[52px] w-full rounded-[10px] border border-[#CFC4B5] bg-white/80 px-4 text-base text-[#241C16] outline-none transition focus:border-[#31271F] focus:bg-white"
                />
              </label>
              <button
                type="submit"
                className="mt-8 inline-flex min-h-[54px] w-full items-center justify-center rounded-[10px] bg-[#31271F] px-6 py-3 text-base font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={onBackToSignIn}
                className="mt-6 w-full text-center text-base font-medium text-[#1267C7] transition hover:text-[#0A4E9A]"
              >
                Back to Sign In ↗
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}

function RoundedInput({
  label,
  name,
  required = false,
  type = 'text',
  autoComplete,
  className = '',
}: {
  label: string;
  name?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block text-left ${className}`}>
      <span className="text-lg font-semibold text-[#241C16]">
        {label} {required && <span className="text-[#8F816C]">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-3 h-[52px] w-full rounded-[10px] border border-[#CFC4B5] bg-white/80 px-4 text-base text-[#241C16] outline-none transition focus:border-[#31271F] focus:bg-white"
      />
    </label>
  );
}

function AccountCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-left text-base font-medium text-[#2D241B]">
      <input
        type="checkbox"
        {...(checked === undefined ? {} : { checked })}
        onChange={(event) => onChange?.(event.target.checked)}
        className="h-5 w-5 rounded-[5px] border border-[#8B8174] accent-[#31271F]"
      />
      <span>{label}</span>
    </label>
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
