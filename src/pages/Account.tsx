import { useMemo, useState } from 'react';
import { AlertTriangle, HelpCircle, Plus } from 'lucide-react';
import { getPresentationSummary } from '../data/presentationOptions';
import { getButtonClasses, getInputClasses } from '../utils/theme';
import type { CheckoutSubmission } from './Checkout';
import type { PaymentDetailsPayload } from './PaymentDetails';

export type AccountOrderSnapshot = {
  selection: PaymentDetailsPayload;
  order: CheckoutSubmission;
};

type AccountSection =
  | 'account-information'
  | 'address-book'
  | 'stored-payment-methods'
  | 'billing-agreements'
  | 'gift-card'
  | 'deposit-payment-orders'
  | 'my-payment-methods'
  | 'support'
  | 'orders';

type AccountMenuItem = {
  id: AccountSection;
  label: string;
};

const accountMenuItems: AccountMenuItem[] = [
  { id: 'account-information', label: 'Account Information' },
  { id: 'address-book', label: 'Address Book' },
  { id: 'stored-payment-methods', label: 'Stored Payment Methods' },
  { id: 'billing-agreements', label: 'Billing Agreements' },
  { id: 'gift-card', label: 'My Gift Card' },
  { id: 'deposit-payment-orders', label: 'Deposit Payment Orders' },
  { id: 'my-payment-methods', label: 'My Payment Methods' },
  { id: 'support', label: 'Support' },
];

const supportTopics = [
  'Request a revision before shipping',
  'Cancel an order before the artist starts',
  'Report damage or a production defect',
  'Ask about shipping or studio timing',
];

function buildOrderNumber(snapshot: AccountOrderSnapshot | null) {
  if (!snapshot) return '';

  const { selection, order } = snapshot;
  return `VB-${selection.conceptTitle.slice(0, 2).toUpperCase()}${order.total}${selection.size.replace(/\D/g, '').slice(0, 4)}`;
}

function formatPaymentMethod(method: CheckoutSubmission['paymentMethod']) {
  if (method === 'apple-pay') return 'Apple Pay';
  if (method === 'shop-pay') return 'Shop Pay';
  if (method === 'paypal') return 'PayPal';
  return 'Credit Card';
}

export default function Account({
  latestOrder,
  onCreate,
}: {
  savedSelection: PaymentDetailsPayload | null;
  latestOrder: AccountOrderSnapshot | null;
  onCreate: () => void;
  onOpenCart: () => void;
}) {
  const [activeSection, setActiveSection] = useState<AccountSection>('account-information');
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const orderNumber = useMemo(() => buildOrderNumber(latestOrder), [latestOrder]);
  const latestOrderPresentation = useMemo(
    () =>
      latestOrder
        ? getPresentationSummary(
            latestOrder.selection.finishLabel,
            latestOrder.selection.finishType === 'framed' ? latestOrder.selection.frameLabel : null
          )
        : '',
    [latestOrder]
  );
  const accountTabActive = activeSection !== 'orders';

  const openSection = (section: AccountSection) => {
    setActiveSection(section);
    if (section !== 'account-information') {
      setIsEditingAccount(false);
    }
  };

  const openOrders = () => {
    setActiveSection('orders');
    setIsEditingAccount(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F0E7] pt-16 text-[#2D241B]">
      <main className="mx-auto grid w-full max-w-[1500px] gap-6 px-4 py-8 sm:px-6 md:grid-cols-[300px_minmax(0,1fr)] lg:gap-10 lg:px-10 lg:py-14">
        <AccountSidebar
          activeSection={activeSection}
          accountTabActive={accountTabActive}
          onOpenAccount={() => openSection('account-information')}
          onOpenOrders={openOrders}
          onOpenSection={openSection}
        />

        <section className="min-w-0 md:pt-1">
          {activeSection === 'account-information' && (
            isEditingAccount ? (
              <AccountInformationEdit onSave={() => setIsEditingAccount(false)} />
            ) : (
              <AccountInformationSummary onEdit={() => setIsEditingAccount(true)} />
            )
          )}
          {activeSection === 'address-book' && <AddressBook />}
          {activeSection === 'stored-payment-methods' && <StoredPaymentMethods />}
          {activeSection === 'billing-agreements' && <BillingAgreements />}
          {activeSection === 'gift-card' && <GiftCard />}
          {activeSection === 'deposit-payment-orders' && <DepositPaymentOrders />}
          {activeSection === 'my-payment-methods' && <MyPaymentMethods />}
          {activeSection === 'support' && <Support latestOrder={latestOrder} orderNumber={orderNumber} onCreate={onCreate} />}
          {activeSection === 'orders' && (
            <Orders latestOrder={latestOrder} orderNumber={orderNumber} presentationSummary={latestOrderPresentation} onCreate={onCreate} />
          )}
        </section>
      </main>
    </div>
  );
}

function AccountSidebar({
  activeSection,
  accountTabActive,
  onOpenAccount,
  onOpenOrders,
  onOpenSection,
}: {
  activeSection: AccountSection;
  accountTabActive: boolean;
  onOpenAccount: () => void;
  onOpenOrders: () => void;
  onOpenSection: (section: AccountSection) => void;
}) {
  return (
    <aside className="h-fit overflow-hidden rounded-[8px] border border-[#DCCFBC] bg-[#EEE5D8] p-3 text-[#2D241B] shadow-[0_16px_34px_rgba(43,31,21,0.06)] md:sticky md:top-24">
      <div className="mb-3 grid grid-cols-2 gap-1 border border-[#D8CBB8] bg-[#FBF8F3] p-1 text-sm">
        <button
          type="button"
          onClick={onOpenAccount}
          className={`rounded-[6px] px-3 py-2.5 text-left transition ${accountTabActive ? 'bg-[#31271F] font-semibold text-[#FBF8F3]' : 'font-medium text-[#6B6155] hover:bg-[#F3EBDE] hover:text-[#2D241B]'}`}
        >
          My Account
        </button>
        <button
          type="button"
          onClick={onOpenOrders}
          className={`rounded-[6px] px-3 py-2.5 text-left transition ${activeSection === 'orders' ? 'bg-[#31271F] font-semibold text-[#FBF8F3]' : 'font-medium text-[#6B6155] hover:bg-[#F3EBDE] hover:text-[#2D241B]'}`}
        >
          My Orders
        </button>
      </div>

      <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:block md:space-y-1 md:overflow-visible md:px-1">
        {accountMenuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenSection(item.id)}
            className={`relative shrink-0 rounded-full px-4 py-2.5 text-left text-sm transition md:block md:w-full md:rounded-[8px] md:px-3 ${
              activeSection === item.id
                ? 'border border-[#D8CBB8] bg-[#FBF8F3] font-semibold text-[#2D241B] shadow-[0_8px_18px_rgba(43,31,21,0.05)]'
                : 'border border-transparent font-medium text-[#6B6155] hover:bg-[#F3EBDE] hover:text-[#2D241B]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="border-b border-[#DCCFBC] pb-4">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <h1 className="text-2xl font-semibold text-[#241C16] md:text-4xl md:tracking-[-0.04em]">{title}</h1>
        {action && (
          <button type="button" onClick={onAction} className="text-sm font-semibold text-[#6E6254] underline underline-offset-4 transition hover:text-[#31271F]">
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

function AccountInformationSummary({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="space-y-8">
      <section>
        <SectionTitle title="Account Information" />
        <div className="grid gap-4 pt-6 lg:grid-cols-2">
          <div className="min-h-[184px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Contact Information</p>
            <div className="mt-5 space-y-3 text-base font-semibold text-[#241C16]">
              <p>Ryan Liu</p>
              <p>l270494039@gmail.com</p>
            </div>
            <div className="mt-5 flex items-center gap-4 text-sm font-semibold">
              <button type="button" onClick={onEdit} className="text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
                Edit
              </button>
              <span className="h-4 w-px bg-[#DCCFBC]" />
              <button type="button" onClick={onEdit} className="text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
                Change Password
              </button>
            </div>
          </div>

          <div className="min-h-[184px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Email Subscription</p>
            <p className="mt-5 text-base font-semibold text-[#241C16]">You aren't subscribed to email updates.</p>
            <button type="button" className="mt-5 text-sm font-semibold text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
              Edit
            </button>
          </div>
        </div>
      </section>

      <AddressBook />
    </div>
  );
}

function AccountInformationEdit({ onSave }: { onSave: () => void }) {
  return (
    <section className="max-w-[680px]">
      <SectionTitle title="Account Information" />
      <div className="mt-6 space-y-6 border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
        <Field label="First Name *" defaultValue="Ryan" />
        <Field label="Last Name *" defaultValue="Liu" />

        <CheckboxRow label="Change Email" />
        <CheckboxRow label="Change Password" />
        <CheckboxRow label="Allow remote shopping assistance" helper />

        <button type="button" onClick={onSave} className="mt-8 rounded-[8px] bg-[#31271F] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#FBF8F3] transition hover:bg-[#241C16]">
          Save
        </button>
      </div>
    </section>
  );
}

function AddressBook() {
  return (
    <section>
      <SectionTitle title="Address Book" action="Manage Addresses" />
      <div className="grid gap-4 pt-6 lg:grid-cols-2">
        <div className="min-h-[156px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Default Billing Address</p>
          <p className="mt-5 text-sm leading-7 text-[#5F564B]">You have not set a default billing address.</p>
          <button type="button" className="mt-5 text-sm font-semibold text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
            Edit Address
          </button>
        </div>

        <div className="min-h-[156px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Default Shipping Address</p>
          <p className="mt-5 text-sm leading-7 text-[#5F564B]">You have not set a default shipping address.</p>
          <button type="button" className="mt-5 text-sm font-semibold text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
            Edit Address
          </button>
        </div>
      </div>
    </section>
  );
}

function StoredPaymentMethods() {
  return <AlertBanner message="You have no stored payment methods." />;
}

function BillingAgreements() {
  return (
    <section className="space-y-6">
      <AlertBanner message="There are no billing agreements yet." />
      <SectionTitle title="New Billing Agreement" />
      <p className="text-sm font-semibold leading-7 text-[#5F564B]">You will be redirected to the payment system website.</p>
      <select className="block w-full rounded-[4px] border border-[#DCCFBC] bg-white px-4 py-3 text-sm text-[#2D241B] outline-none focus:border-[#31271F] md:w-1/2">
        <option>-- Please Select --</option>
        <option>PayPal Billing Agreement</option>
      </select>
      <button type="button" className="w-fit rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
        Create Billing Agreement
      </button>
    </section>
  );
}

function GiftCard() {
  return (
    <section>
      <SectionTitle title="My Gift Card" />
    </section>
  );
}

function DepositPaymentOrders() {
  return <AlertBanner message="You have no partially paid orders." />;
}

function MyPaymentMethods() {
  return (
    <section className="space-y-8">
      <AlertBanner message="You do not have any saved payment methods." />
      <SectionTitle title="Add a new payment method" />
      <button type="button" className="inline-flex items-center gap-2 rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
        <Plus size={18} strokeWidth={2} />
        Add Payment Method
      </button>
    </section>
  );
}

function Support({
  latestOrder,
  orderNumber,
  onCreate,
}: {
  latestOrder: AccountOrderSnapshot | null;
  orderNumber: string;
  onCreate: () => void;
}) {
  return (
    <section className="space-y-10">
      <SectionTitle title="Support" />
      {!latestOrder && <AlertBanner message="You do not have a paid order yet. General account support is still available." />}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Contact ViewBrush</p>
          <p className="mt-5 max-w-[44ch] text-sm leading-7 text-[#5F564B]">
            Need help with an order, revision, cancellation, delivery question, or artwork issue? Send a support request and include your order number if you have one.
          </p>
          {latestOrder ? (
            <div className="mt-6 space-y-3 text-base">
              <InfoRow label="Linked order" value={orderNumber} />
              <InfoRow label="Current status" value="Studio review" />
              <InfoRow label="Email" value={latestOrder.order.email || 'Not provided'} />
            </div>
          ) : (
            <button type="button" onClick={onCreate} className={getButtonClasses('primary', 'mt-6 px-5 py-3 text-sm')}>
              Start Your Painting
            </button>
          )}
        </div>

        <div className="border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Support Topics</p>
          <div className="mt-5 space-y-4">
            {supportTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                className="flex w-full items-center justify-between border-b border-[#E5DCCF] py-3 text-left text-sm font-semibold text-[#31271F] transition hover:text-[#6E6254]"
              >
                {topic}
                <HelpCircle size={17} className="text-[#8F816C]" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <form className="max-w-[760px] space-y-5 border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
        <Field label="Subject" placeholder="What can we help with?" />
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#2D241B]">Message</label>
          <textarea
            className={`${getInputClasses('min-h-[140px] resize-y bg-white')}`}
            placeholder="Tell us what happened or what you would like adjusted."
          />
        </div>
        <button type="button" className="rounded-[8px] bg-[#31271F] px-6 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
          Submit Request
        </button>
      </form>
    </section>
  );
}

function Orders({
  latestOrder,
  orderNumber,
  presentationSummary,
  onCreate,
}: {
  latestOrder: AccountOrderSnapshot | null;
  orderNumber: string;
  presentationSummary: string;
  onCreate: () => void;
}) {
  if (!latestOrder) {
    return (
      <section className="space-y-8">
        <AlertBanner message="You have placed no orders." />
        <button type="button" onClick={onCreate} className={getButtonClasses('primary', 'px-5 py-3 text-sm')}>
          Start Your Painting
        </button>
      </section>
    );
  }

  return (
    <section>
      <SectionTitle title="My Orders" />
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse border border-[#DCCFBC] bg-white/82 text-left text-sm">
          <thead>
            <tr className="border-b border-[#DCCFBC] text-[10px] uppercase tracking-[0.18em] text-[#8F816C]">
              <th className="px-5 py-4 font-semibold">Order</th>
              <th className="px-5 py-4 font-semibold">Artwork</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Total</th>
              <th className="px-5 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#E5DCCF] text-[#2D241B]">
              <td className="px-5 py-5 font-semibold">{orderNumber}</td>
              <td className="px-5 py-5">{latestOrder.selection.conceptTitle}</td>
              <td className="px-5 py-5">Studio review</td>
              <td className="px-5 py-5">${latestOrder.order.total}</td>
              <td className="px-5 py-5">
                <button type="button" className="font-semibold underline underline-offset-4 transition hover:text-[#6E6254]">
                  View Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Order Summary</p>
          <div className="mt-5 space-y-3">
            <InfoRow label="Payment" value={formatPaymentMethod(latestOrder.order.paymentMethod)} />
            <InfoRow label="Delivery" value={latestOrder.order.deliveryOption === 'express' ? 'Express' : 'Standard'} />
            <InfoRow label="Country" value={latestOrder.order.country} />
          </div>
        </div>
        <div className="border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]">Artwork Details</p>
          <div className="mt-5 space-y-3">
            <InfoRow label="Size" value={latestOrder.selection.size} />
            <InfoRow label="Presentation" value={presentationSummary} />
            <InfoRow label="Room Mockup" value={latestOrder.selection.roomLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AlertBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 border border-[#E8D4A8] bg-[#FFF1D2] px-4 py-4 text-[#7A4A08] md:gap-4 md:px-5">
      <AlertTriangle size={24} strokeWidth={2} className="shrink-0 text-[#C77805]" />
      <p className="text-base font-medium">{message}</p>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#2D241B]">{label}</label>
      <input defaultValue={defaultValue} placeholder={placeholder} className={getInputClasses('bg-white')} />
    </div>
  );
}

function CheckboxRow({ label, helper = false }: { label: string; helper?: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium text-[#5F564B]">
      <input type="checkbox" className="h-5 w-5 rounded-[3px] border border-[#DCCFBC] bg-white accent-[#31271F]" />
      <span>{label}</span>
      {helper && (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#DCCFBC] text-xs font-semibold text-[#8F816C]">
          ?
        </span>
      )}
    </label>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 text-sm">
      <span className="text-[#6E6254]">{label}</span>
      <span className="text-right font-semibold text-[#2D241B]">{value}</span>
    </div>
  );
}
