import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import {
  Check,
  Gift,
  ImageIcon,
  LogOut,
  Mail,
  Paintbrush,
  Phone,
  PlayCircle,
  Plus,
  Truck,
  X,
  ZoomIn,
} from 'lucide-react';
import { getPresentationSummary } from '../data/presentationOptions';
import { getButtonClasses, getInputClasses } from '../utils/theme';
import { getMockCustomerName, type MockCustomer } from '../data/mockAccount';
import generationMotionVideo from '../assets/videos/generation-motion-graphics.mp4';
import type { CheckoutSubmission } from './Checkout';
import type { PaymentDetailsPayload } from './PaymentDetails';

type AccountView = 'account' | 'orders' | 'gift-card' | 'payment-methods' | 'support';
type AccountPanel = 'overview' | 'profile-edit' | 'subscription-edit' | 'address-book' | 'billing-address' | 'shipping-address';
type AddressKind = 'billing' | 'shipping';
type ReviewPreviewMode = 'artwork' | 'detail' | 'video';
export type OrderStage = 'review' | 'revision' | 'framing' | 'shipping' | 'complete';

export type AccountOrderSnapshot = {
  selection: PaymentDetailsPayload;
  order: CheckoutSubmission;
  createdAt?: string;
  orderStage?: OrderStage;
};

type GiftMessage = {
  title: string;
  sender: string;
  recipient: string;
  message: string;
};

type AddressRecord = {
  fullName: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

type PaymentMethod = {
  id: string;
  name: string;
  brand: string;
  last4: string;
  expiry: string;
};

type SupportTicket = {
  id: string;
  subject: string;
  message: string;
  orderNumber: string | null;
  status: string;
};

const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL?.trim() || 'support@viewbrush.com';
const supportPhone = import.meta.env.VITE_SUPPORT_PHONE?.trim() || '+1 (888) 406-3555';

function buildOrderNumber(snapshot: AccountOrderSnapshot | null, index = 0) {
  if (!snapshot) return '';

  const { selection, order } = snapshot;
  const timestamp = snapshot.createdAt ? new Date(snapshot.createdAt).getTime().toString().slice(-6) : String(index + 1).padStart(3, '0');
  return `VB-${selection.conceptTitle.slice(0, 2).toUpperCase()}${order.total}${selection.size.replace(/\D/g, '').slice(0, 4)}${timestamp}`;
}

function getArtworkImage(selection: PaymentDetailsPayload) {
  return selection.conceptImage || selection.sourceImage;
}

function getOrderStatusBadgeClasses(orderStage: OrderStage) {
  const baseClasses = 'mt-4 inline-flex rounded-[8px] border px-3 py-2 text-xs font-semibold';

  if (orderStage === 'framing' || orderStage === 'shipping' || orderStage === 'complete') {
    return `${baseClasses} border-[#9AC6A7] bg-[#EAF6ED] text-[#2F6B3B]`;
  }

  return `${baseClasses} border-[#DCCFBC] bg-[#F7F0E6] text-[#5F564B]`;
}

export default function Account({
  customer,
  savedSelection,
  accountOrders,
  initialView = 'account',
  onCreate,
  onOpenCart,
  onSignOut,
  onUpdateOrderStage,
}: {
  customer: MockCustomer;
  savedSelection: PaymentDetailsPayload | null;
  accountOrders: AccountOrderSnapshot[];
  initialView?: AccountView;
  onCreate: () => void;
  onOpenCart: () => void;
  onSignOut: () => void;
  onUpdateOrderStage: (orderIndex: number, stage: OrderStage) => void;
}) {
  const [activeView, setActiveView] = useState<AccountView>(initialView);
  const [accountPanel, setAccountPanel] = useState<AccountPanel>('overview');
  const [profile, setProfile] = useState<MockCustomer>(customer);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [addresses, setAddresses] = useState<Partial<Record<AddressKind, AddressRecord>>>({});
  const [giftCardBalance, setGiftCardBalance] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const latestOrder = accountOrders[0] ?? null;
  const latestOrderNumber = useMemo(() => buildOrderNumber(latestOrder), [latestOrder]);
  const openView = (view: AccountView) => {
    setActiveView(view);
    if (view !== 'account') setAccountPanel('overview');
  };

  useEffect(() => {
    openView(initialView);
  }, [initialView]);

  const openOrders = () => openView('orders');

  return (
    <div className="min-h-screen bg-[#FBF8F3] pt-16 text-[#2D241B]">
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-[120px] pt-8 sm:px-6 lg:px-10 lg:pt-12">
        <AccountHero
          customer={profile}
          savedSelection={savedSelection}
          orderCount={accountOrders.length}
          onCreate={onCreate}
          onOpenCart={onOpenCart}
          onOpenOrders={openOrders}
          onSignOut={onSignOut}
        />

        <div className="mt-8">
          <AccountViewSwitch activeView={activeView} onSelect={openView} />

          <section className="mt-8 min-w-0">
            {activeView === 'account' &&
              (accountPanel === 'overview' ? (
                <AccountOverview
                  customer={profile}
                  isSubscribed={isSubscribed}
                  addresses={addresses}
                  onEditProfile={() => setAccountPanel('profile-edit')}
                  onEditSubscription={() => setAccountPanel('subscription-edit')}
                  onManageAddresses={() => setAccountPanel('address-book')}
                  onEditAddress={(kind) => setAccountPanel(kind === 'billing' ? 'billing-address' : 'shipping-address')}
                />
              ) : accountPanel === 'profile-edit' ? (
                <AccountInformationEdit customer={profile} onCancel={() => setAccountPanel('overview')} onSave={(updatedCustomer) => {
                  setProfile(updatedCustomer);
                  setAccountPanel('overview');
                }} />
              ) : accountPanel === 'subscription-edit' ? (
                <EmailSubscriptionEdit isSubscribed={isSubscribed} onCancel={() => setAccountPanel('overview')} onSave={(nextValue) => {
                  setIsSubscribed(nextValue);
                  setAccountPanel('overview');
                }} />
              ) : accountPanel === 'address-book' ? (
                <AddressBookManager
                  addresses={addresses}
                  onBack={() => setAccountPanel('overview')}
                  onEditAddress={(kind) => setAccountPanel(kind === 'billing' ? 'billing-address' : 'shipping-address')}
                />
              ) : (
                <AddressForm
                  kind={accountPanel === 'billing-address' ? 'billing' : 'shipping'}
                  address={addresses[accountPanel === 'billing-address' ? 'billing' : 'shipping']}
                  customer={profile}
                  onCancel={() => setAccountPanel('address-book')}
                  onSave={(kind, address) => {
                    setAddresses((current) => ({ ...current, [kind]: address }));
                    setAccountPanel('address-book');
                  }}
                />
              ))}
            {activeView === 'orders' && (
              <Orders accountOrders={accountOrders} onCreate={onCreate} onUpdateOrderStage={onUpdateOrderStage} />
            )}
            {activeView === 'gift-card' && <GiftCardPanel balance={giftCardBalance} onApplyCode={(amount) => setGiftCardBalance((current) => current + amount)} />}
            {activeView === 'payment-methods' && <PaymentMethodsPanel paymentMethods={paymentMethods} onAddPaymentMethod={(method) => setPaymentMethods((current) => [...current, method])} onRemovePaymentMethod={(id) => setPaymentMethods((current) => current.filter((method) => method.id !== id))} />}
            {activeView === 'support' && <SupportPanel latestOrder={latestOrder} orderNumber={latestOrderNumber} tickets={supportTickets} onCreate={onCreate} onSubmitTicket={(ticket) => setSupportTickets((current) => [ticket, ...current])} />}
          </section>
        </div>
      </main>
    </div>
  );
}

function AccountHero({
  customer,
  savedSelection,
  orderCount,
  onCreate,
  onOpenCart,
  onOpenOrders,
  onSignOut,
}: {
  customer: MockCustomer;
  savedSelection: PaymentDetailsPayload | null;
  orderCount: number;
  onCreate: () => void;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onSignOut: () => void;
}) {
  const hasOrder = orderCount > 0;
  const stats = [
    { label: 'Saved Artwork', value: savedSelection ? '1' : '0', onClick: onOpenCart },
    { label: 'Orders', value: String(orderCount), onClick: onOpenOrders },
    { label: 'Completed Orders', value: String(orderCount), onClick: onOpenOrders },
  ];

  return (
    <section className="pb-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[42px] font-semibold leading-[1.08] text-[#241C16]">Welcome back, {customer.firstName}</h1>
          <p className="mt-4 max-w-[58ch] text-base leading-7 text-[#5F564B]">
            {hasOrder
              ? `Your order workspace is saved under ${customer.email}. Track artwork progress, approval, shipping, and support from here.`
              : 'Manage your artwork bag, account details, order history, and support requests from one place.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#5F564B]">
            <span className="font-semibold text-[#241C16]">{getMockCustomerName(customer)}</span>
            <span>{customer.email}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onCreate} className={getButtonClasses('primary', 'gap-2 px-5 py-3 text-sm')}>
            <Paintbrush size={16} />
            Create Artwork
          </button>
          <button type="button" onClick={onSignOut} className={getButtonClasses('outline', 'gap-2 px-5 py-3 text-sm')}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={stat.onClick}
            disabled={!stat.onClick}
            className="rounded-[8px] border border-[#D8C7B8] bg-white/72 px-5 py-4 text-left transition enabled:hover:border-[#A58964] enabled:hover:bg-[#F7F0E6] disabled:cursor-default"
          >
            <p className="text-xs font-semibold text-[#6E6254]">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[#241C16]">{stat.value}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function AccountViewSwitch({
  activeView,
  onSelect,
}: {
  activeView: AccountView;
  onSelect: (view: AccountView) => void;
}) {
  const tabs: Array<{ view: AccountView; label: string }> = [
    { view: 'account', label: 'My Account' },
    { view: 'orders', label: 'My Orders' },
    { view: 'gift-card', label: 'My Gift Card' },
    { view: 'payment-methods', label: 'Payment Methods' },
    { view: 'support', label: 'Support' },
  ];

  return (
    <div className="border-b border-[#DCCFBC]">
      <div className="flex gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.view}
            type="button"
            onClick={() => onSelect(tab.view)}
            style={{ fontWeight: activeView === tab.view ? 900 : 400 }}
            className={`relative min-w-max pb-4 text-left transition after:absolute after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:transition ${
              activeView === tab.view
                ? 'text-[18px] text-[#241C16] after:bg-[#31271F]'
                : 'text-[17px] text-[#6B6155] after:bg-transparent hover:text-[#2D241B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AccountOverview({
  customer,
  isSubscribed,
  addresses,
  onEditProfile,
  onEditSubscription,
  onManageAddresses,
  onEditAddress,
}: {
  customer: MockCustomer;
  isSubscribed: boolean;
  addresses: Partial<Record<AddressKind, AddressRecord>>;
  onEditProfile: () => void;
  onEditSubscription: () => void;
  onManageAddresses: () => void;
  onEditAddress: (kind: AddressKind) => void;
}) {
  return (
    <div className="space-y-10">
      <AccountInformationSummary
        customer={customer}
        isSubscribed={isSubscribed}
        addresses={addresses}
        onEditProfile={onEditProfile}
        onEditSubscription={onEditSubscription}
        onManageAddresses={onManageAddresses}
        onEditAddress={onEditAddress}
      />
    </div>
  );
}

function GiftCardPanel({ balance, onApplyCode }: { balance: number; onApplyCode: (amount: number) => void }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const applyCode = () => {
    const normalizedCode = code.trim().toUpperCase();
    if (!normalizedCode) {
      setMessage('Enter a gift card code to apply.');
      return;
    }
    onApplyCode(normalizedCode === 'VIEWBRUSH50' ? 50 : 25);
    setMessage(`${normalizedCode} has been applied to this account.`);
    setCode('');
  };

  return (
    <section>
      <SectionTitle title="My Gift Card" />
      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Credit</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#241C16]">${balance}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5F564B]">
            {balance > 0 ? 'Available credit will be applied to your next ViewBrush order.' : 'No gift card balance is connected to this account yet.'}
          </p>
        </div>
        <div className="rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Apply Code</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input value={code} onChange={(event) => setCode(event.target.value)} className={getInputClasses('bg-white')} placeholder="Gift card code" />
            <button type="button" onClick={applyCode} className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
              Apply
            </button>
          </div>
          {message && <p className="mt-4 text-sm font-semibold text-[#5F564B]">{message}</p>}
        </div>
      </div>
    </section>
  );
}

function PaymentMethodsPanel({
  paymentMethods,
  onAddPaymentMethod,
  onRemovePaymentMethod,
}: {
  paymentMethods: PaymentMethod[];
  onAddPaymentMethod: (method: PaymentMethod) => void;
  onRemovePaymentMethod: (id: string) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return <PaymentMethodForm onCancel={() => setIsAdding(false)} onSave={(method) => {
      onAddPaymentMethod(method);
      setIsAdding(false);
    }} />;
  }

  return (
    <section>
      <SectionTitle title="Payment Methods" />
      <div className="mt-6 rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Billing</p>
        <h2 className="mt-4 text-xl font-semibold text-[#241C16]">{paymentMethods.length ? 'Saved payment methods' : 'No saved payment methods'}</h2>
        {paymentMethods.length ? (
          <div className="mt-5 grid gap-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex flex-col gap-3 rounded-[8px] border border-[#E5DCCF] bg-[#FBF8F3] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#241C16]">{method.brand} ending in {method.last4}</p>
                  <p className="mt-1 text-sm text-[#6E6254]">{method.name} · Expires {method.expiry}</p>
                </div>
                <button type="button" onClick={() => onRemovePaymentMethod(method.id)} className="text-left text-sm font-semibold text-[#6E6254] underline underline-offset-4 transition hover:text-[#31271F]">
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-7 text-[#5F564B]">You do not have any saved payment methods.</p>
        )}
        <button type="button" onClick={() => setIsAdding(true)} className="mt-5 inline-flex items-center gap-2 rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
          <Plus size={16} />
          Add Payment Method
        </button>
      </div>
    </section>
  );
}

function SupportPanel({
  latestOrder,
  orderNumber,
  tickets,
  onCreate,
  onSubmitTicket,
}: {
  latestOrder: AccountOrderSnapshot | null;
  orderNumber: string;
  tickets: SupportTicket[];
  onCreate: () => void;
  onSubmitTicket: (ticket: SupportTicket) => void;
}) {
  const [subject, setSubject] = useState(latestOrder ? 'Order question' : 'Account question');
  const [message, setMessage] = useState('');
  const canSubmit = subject.trim() && message.trim();

  const submitTicket = () => {
    if (!canSubmit) return;
    onSubmitTicket({
      id: `SUP-${Date.now().toString().slice(-6)}`,
      subject: subject.trim(),
      message: message.trim(),
      orderNumber: latestOrder ? orderNumber : null,
      status: 'Open',
    });
    setMessage('');
  };

  return (
    <section>
      <SectionTitle title="Support" />
      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">New Request</p>
          <h2 className="mt-4 text-xl font-semibold text-[#241C16]">{latestOrder ? 'Support for your active order' : 'Account support'}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5F564B]">
            {latestOrder ? `This request will be linked to order ${orderNumber}.` : 'General account support is available before your first order.'}
          </p>
          <div className="mt-5 space-y-4">
            <FieldInput label="Subject" value={subject} onChange={setSubject} />
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2D241B]">Message</label>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} className={getInputClasses('min-h-[140px] resize-y bg-white')} placeholder="Tell us what you need help with." />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={submitTicket} disabled={!canSubmit} className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16] disabled:cursor-not-allowed disabled:bg-[#B9AB99]">
              Submit Request
            </button>
            {!latestOrder && (
              <button type="button" onClick={onCreate} className="rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
                Start Your Painting
              </button>
            )}
          </div>
        </div>
        <div className="rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Requests</p>
          {tickets.length ? (
            <div className="mt-4 space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="rounded-[8px] border border-[#E5DCCF] bg-[#FBF8F3] p-4">
                  <p className="text-sm font-semibold text-[#241C16]">{ticket.subject}</p>
                  <p className="mt-1 text-xs font-semibold text-[#8F816C]">{ticket.id} · {ticket.status}</p>
                  {ticket.orderNumber && <p className="mt-2 text-xs text-[#6E6254]">Linked to {ticket.orderNumber}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-[#5F564B]">You have no support requests yet.</p>
          )}
          <div className="mt-6 border-t border-[#E5DCCF] pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Contact</p>
            <div className="mt-4 space-y-3 text-sm font-semibold text-[#31271F]">
              <a href={`mailto:${supportEmail}`} className="flex items-center gap-3 transition hover:text-[#6E6254]">
                <Mail size={16} className="text-[#8F816C]" />
                <span className="break-all">{supportEmail}</span>
              </a>
              <a href={`tel:${supportPhone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 transition hover:text-[#6E6254]">
                <Phone size={16} className="text-[#8F816C]" />
                <span>{supportPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentMethodForm({ onCancel, onSave }: { onCancel: () => void; onSave: (method: PaymentMethod) => void }) {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const canSave = name.trim() && cardNumber.replace(/\D/g, '').length >= 4 && expiry.trim();

  const saveMethod = () => {
    const digits = cardNumber.replace(/\D/g, '');
    if (!canSave) return;
    onSave({
      id: `PM-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      brand: digits.startsWith('4') ? 'Visa' : digits.startsWith('5') ? 'Mastercard' : 'Card',
      last4: digits.slice(-4),
      expiry: expiry.trim(),
    });
  };

  return (
    <section className="max-w-[720px]">
      <SectionTitle title="Add Payment Method" />
      <div className="mt-6 space-y-5 rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
        <FieldInput label="Name on card" value={name} onChange={setName} />
        <FieldInput label="Card number" value={cardNumber} onChange={setCardNumber} placeholder="4242 4242 4242 4242" />
        <FieldInput label="Expiration" value={expiry} onChange={setExpiry} placeholder="MM / YY" />
        <div className="flex flex-wrap gap-3 pt-2">
          <button type="button" onClick={saveMethod} disabled={!canSave} className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16] disabled:cursor-not-allowed disabled:bg-[#B9AB99]">
            Save Payment Method
          </button>
          <button type="button" onClick={onCancel} className="rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  title,
  action,
  actionFontSizePx = 11,
  gapClassName = 'gap-x-6',
  onAction,
}: {
  title: string;
  action?: string;
  actionFontSizePx?: number;
  gapClassName?: string;
  onAction?: () => void;
}) {
  return (
    <div>
      <div className={`flex flex-wrap items-baseline ${gapClassName} gap-y-2`}>
        <h1 className="text-lg font-semibold leading-tight text-[#241C16] md:text-xl">{title}</h1>
        {action && (
          <button type="button" onClick={onAction} style={{ fontSize: actionFontSizePx }} className="font-semibold text-[#6E6254] underline underline-offset-4 transition hover:text-[#31271F]">
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

function AccountInformationSummary({
  customer,
  isSubscribed,
  addresses,
  onEditProfile,
  onEditSubscription,
  onManageAddresses,
  onEditAddress,
}: {
  customer: MockCustomer;
  isSubscribed: boolean;
  addresses: Partial<Record<AddressKind, AddressRecord>>;
  onEditProfile: () => void;
  onEditSubscription: () => void;
  onManageAddresses: () => void;
  onEditAddress: (kind: AddressKind) => void;
}) {
  return (
    <div className="space-y-14">
      <section>
        <SectionTitle title="Account Information" />
        <div className="grid gap-4 pt-6 lg:grid-cols-2">
          <div className="min-h-[184px] rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Contact Information</p>
            <div className="mt-5 space-y-3 text-base font-semibold text-[#241C16]">
              <p>{getMockCustomerName(customer)}</p>
              <p>{customer.email}</p>
            </div>
            <div className="mt-5 flex items-center gap-4 text-sm font-semibold">
              <button type="button" onClick={onEditProfile} className="text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
                Edit
              </button>
              <span className="h-4 w-px bg-[#DCCFBC]" />
              <button type="button" onClick={onEditProfile} className="text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
                Change Password
              </button>
            </div>
          </div>

          <div className="min-h-[184px] rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Email Subscription</p>
            <p className="mt-5 text-base font-semibold text-[#241C16]">
              {isSubscribed ? 'You are subscribed to email updates.' : "You aren't subscribed to email updates."}
            </p>
            <button type="button" onClick={onEditSubscription} className="mt-5 text-sm font-semibold text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
              Edit
            </button>
          </div>
        </div>
      </section>

      <AddressBook addresses={addresses} onManageAddresses={onManageAddresses} onEditAddress={onEditAddress} />
    </div>
  );
}

function AccountInformationEdit({ customer, onCancel, onSave }: { customer: MockCustomer; onCancel: () => void; onSave: (customer: MockCustomer) => void }) {
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [email, setEmail] = useState(customer.email);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remoteAssistance, setRemoteAssistance] = useState(false);
  const canSave = firstName.trim() && lastName.trim() && (!changeEmail || email.trim().includes('@')) && (!changePassword || (newPassword.length >= 6 && newPassword === confirmPassword));

  return (
    <section className="max-w-[680px]">
      <SectionTitle title="Account Information" />
      <div className="mt-6 space-y-6 rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
        <FieldInput label="First Name *" value={firstName} onChange={setFirstName} />
        <FieldInput label="Last Name *" value={lastName} onChange={setLastName} />

        <CheckboxRow label="Change Email" checked={changeEmail} onChange={setChangeEmail} />
        {changeEmail && <FieldInput label="Email *" value={email} onChange={setEmail} />}
        <CheckboxRow label="Change Password" checked={changePassword} onChange={setChangePassword} />
        {changePassword && (
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput label="New password" value={newPassword} onChange={setNewPassword} placeholder="At least 6 characters" />
            <FieldInput label="Confirm password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Repeat password" />
          </div>
        )}
        <CheckboxRow label="Allow remote shopping assistance" checked={remoteAssistance} onChange={setRemoteAssistance} helper />

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="button" disabled={!canSave} onClick={() => onSave({ ...customer, firstName: firstName.trim(), lastName: lastName.trim(), email: changeEmail ? email.trim() : customer.email })} className="rounded-[8px] bg-[#31271F] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#FBF8F3] transition hover:bg-[#241C16] disabled:cursor-not-allowed disabled:bg-[#B9AB99]">
            Save
          </button>
          <button type="button" onClick={onCancel} className="rounded-[8px] border border-[#D8CBB8] bg-white/72 px-8 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

function EmailSubscriptionEdit({ isSubscribed, onCancel, onSave }: { isSubscribed: boolean; onCancel: () => void; onSave: (isSubscribed: boolean) => void }) {
  const [nextValue, setNextValue] = useState(isSubscribed);

  return (
    <section className="max-w-[680px]">
      <SectionTitle title="Email Subscription" />
      <div className="mt-6 rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Preferences</p>
        <label className="mt-5 flex items-start gap-3 text-sm font-semibold text-[#4F4437]">
          <input type="checkbox" checked={nextValue} onChange={(event) => setNextValue(event.target.checked)} className="mt-0.5 h-4 w-4 rounded-[3px] border border-[#DCCFBC] accent-[#31271F]" />
          <span>Subscribe to ViewBrush email updates.</span>
        </label>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => onSave(nextValue)} className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
            Save Subscription
          </button>
          <button type="button" onClick={onCancel} className="rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

function AddressBook({ addresses, onManageAddresses, onEditAddress }: { addresses: Partial<Record<AddressKind, AddressRecord>>; onManageAddresses: () => void; onEditAddress: (kind: AddressKind) => void }) {
  return (
    <section>
      <SectionTitle title="Address Book" action="Manage Addresses" actionFontSizePx={14} gapClassName="gap-x-3" onAction={onManageAddresses} />
      <div className="grid gap-4 pt-6 lg:grid-cols-2">
        <div className="min-h-[156px] rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Default Billing Address</p>
          <AddressDisplay address={addresses.billing} emptyText="You have not set a default billing address." />
          <button type="button" onClick={() => onEditAddress('billing')} className="mt-5 text-sm font-semibold text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
            Edit Address
          </button>
        </div>

        <div className="min-h-[156px] rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Default Shipping Address</p>
          <AddressDisplay address={addresses.shipping} emptyText="You have not set a default shipping address." />
          <button type="button" onClick={() => onEditAddress('shipping')} className="mt-5 text-sm font-semibold text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
            Edit Address
          </button>
        </div>
      </div>
    </section>
  );
}

function AddressDisplay({ address, emptyText }: { address?: AddressRecord; emptyText: string }) {
  if (!address) {
    return <p className="mt-5 text-sm leading-7 text-[#5F564B]">{emptyText}</p>;
  }

  return (
    <div className="mt-5 space-y-1 text-sm leading-6 text-[#5F564B]">
      <p className="font-semibold text-[#241C16]">{address.fullName}</p>
      <p>{address.street}</p>
      <p>{address.city}, {address.region} {address.postalCode}</p>
      <p>{address.country}</p>
    </div>
  );
}

function AddressBookManager({
  addresses,
  onBack,
  onEditAddress,
}: {
  addresses: Partial<Record<AddressKind, AddressRecord>>;
  onBack: () => void;
  onEditAddress: (kind: AddressKind) => void;
}) {
  return (
    <section>
      <SectionTitle title="Manage Addresses" />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {(['billing', 'shipping'] as AddressKind[]).map((kind) => (
          <div key={kind} className="rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">{kind === 'billing' ? 'Default Billing Address' : 'Default Shipping Address'}</p>
            <AddressDisplay address={addresses[kind]} emptyText={`You have not set a default ${kind} address.`} />
            <button type="button" onClick={() => onEditAddress(kind)} className="mt-5 rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
              {addresses[kind] ? 'Edit Address' : 'Add Address'}
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={onBack} className="mt-6 text-sm font-semibold text-[#6E6254] underline underline-offset-4 transition hover:text-[#31271F]">
        Back to Account Information
      </button>
    </section>
  );
}

function AddressForm({
  kind,
  address,
  customer,
  onCancel,
  onSave,
}: {
  kind: AddressKind;
  address?: AddressRecord;
  customer: MockCustomer;
  onCancel: () => void;
  onSave: (kind: AddressKind, address: AddressRecord) => void;
}) {
  const [fullName, setFullName] = useState(address?.fullName ?? getMockCustomerName(customer));
  const [street, setStreet] = useState(address?.street ?? '');
  const [city, setCity] = useState(address?.city ?? '');
  const [region, setRegion] = useState(address?.region ?? '');
  const [postalCode, setPostalCode] = useState(address?.postalCode ?? '');
  const [country, setCountry] = useState(address?.country ?? 'United States');
  const canSave = fullName.trim() && street.trim() && city.trim() && region.trim() && postalCode.trim() && country.trim();

  return (
    <section className="max-w-[820px]">
      <SectionTitle title={kind === 'billing' ? 'Billing Address' : 'Shipping Address'} />
      <div className="mt-6 space-y-5 rounded-[8px] border border-[#DCCFBC] bg-white/82 p-5 shadow-[0_12px_28px_rgba(43,31,21,0.04)] md:p-6">
        <FieldInput label="Full name" value={fullName} onChange={setFullName} />
        <FieldInput label="Street address" value={street} onChange={setStreet} placeholder="Street and apartment" />
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldInput label="City" value={city} onChange={setCity} />
          <FieldInput label="State / Region" value={region} onChange={setRegion} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldInput label="ZIP / Postal code" value={postalCode} onChange={setPostalCode} />
          <FieldInput label="Country" value={country} onChange={setCountry} />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            disabled={!canSave}
            onClick={() => onSave(kind, { fullName: fullName.trim(), street: street.trim(), city: city.trim(), region: region.trim(), postalCode: postalCode.trim(), country: country.trim() })}
            className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16] disabled:cursor-not-allowed disabled:bg-[#B9AB99]"
          >
            Save Address
          </button>
          <button type="button" onClick={onCancel} className="rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

function Orders({
  accountOrders,
  onCreate,
  onUpdateOrderStage,
}: {
  accountOrders: AccountOrderSnapshot[];
  onCreate: () => void;
  onUpdateOrderStage: (orderIndex: number, stage: OrderStage) => void;
}) {
  if (!accountOrders.length) {
    return (
      <section className="rounded-[8px] border border-[#DCCFBC] bg-white/82 p-8 shadow-[0_18px_38px_rgba(43,31,21,0.05)]">
        <div className="max-w-[560px]">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">My Orders</p>
          <h1 className="mt-3 text-[26px] font-semibold leading-tight text-[#241C16] md:text-[30px]">No orders yet</h1>
          <p className="mt-4 text-sm leading-7 text-[#5F564B]">Start your first ViewBrush portrait and track every studio step here.</p>
          <button type="button" onClick={onCreate} className={getButtonClasses('primary', 'mt-7 px-5 py-3 text-sm')}>
            Start Your Painting
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">ViewBrush Orders</p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight text-[#241C16] md:text-[30px]">My Orders</h1>
        <p className="mt-3 text-sm leading-7 text-[#5F564B]">
          {accountOrders.length} {accountOrders.length === 1 ? 'order is' : 'orders are'} saved to this workspace. The newest order appears first.
        </p>
      </div>

      <div className="space-y-5">
        {accountOrders.map((accountOrder, index) => (
          <div key={accountOrder.createdAt ?? buildOrderNumber(accountOrder, index)}>
            <OrderCard
              accountOrder={accountOrder}
              orderIndex={index}
              orderNumber={buildOrderNumber(accountOrder, index)}
              presentationSummary={getPresentationSummary(
                accountOrder.selection.finishLabel,
                accountOrder.selection.finishType === 'framed' ? accountOrder.selection.frameLabel : null
              )}
              onUpdateOrderStage={onUpdateOrderStage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function OrderCard({
  accountOrder,
  orderIndex,
  orderNumber,
  presentationSummary,
  onUpdateOrderStage,
}: {
  accountOrder: AccountOrderSnapshot;
  orderIndex: number;
  orderNumber: string;
  presentationSummary: string;
  onUpdateOrderStage: (orderIndex: number, stage: OrderStage) => void;
}) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [giftMessage, setGiftMessage] = useState<GiftMessage | null>(null);
  const [isGiftOrder, setIsGiftOrder] = useState(false);
  const [isFramingOpen, setIsFramingOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<AddressRecord | null>(null);
  const orderStage = accountOrder.orderStage ?? 'review';
  const { selection, order } = accountOrder;
  const artworkImage = getArtworkImage(selection);
  const currentStatus = getOrderStageCopy(orderStage).current;
  const nextStatus = getOrderStageCopy(orderStage).next;
  const paymentStatus = 'Paid in full';

  return (
    <>
      <article className="grid gap-5 rounded-[8px] border border-[#DCCFBC] bg-white/86 p-5 shadow-[0_18px_38px_rgba(43,31,21,0.05)] xl:grid-cols-[148px_minmax(0,1fr)_260px] xl:p-6">
        <div className="overflow-hidden rounded-[8px] border border-[#DCCFBC] bg-[#F3EBDE]">
          {artworkImage ? (
            <img src={artworkImage} alt={selection.conceptTitle} className="aspect-square w-full object-cover" />
          ) : (
            <div className="flex aspect-square items-center justify-center text-[#8F816C]">
              <ImageIcon size={28} />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">
            {selection.finishLabel}, {selection.size}, {order.deliveryOption === 'express' ? 'Express service' : 'Standard service'}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#241C16]">{selection.conceptTitle}</h2>
          <span className={getOrderStatusBadgeClasses(orderStage)}>{currentStatus}</span>

          <OrderProgress orderStage={orderStage} />

          <div className="grid gap-4 border-t border-[#E5DCCF] pt-5 lg:grid-cols-2">
            <StatusBlock label="Current Status" value={currentStatus} description={getOrderStageCopy(orderStage).currentDescription} />
            <StatusBlock label="Next Status" value={nextStatus} description={getOrderStageCopy(orderStage).nextDescription} />
          </div>

          <div className="mt-5 grid gap-4 border-t border-[#E5DCCF] pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <OrderMeta label="Order #" value={orderNumber} />
            <OrderMeta label="Payment" value={paymentStatus} />
            <OrderMeta label="Delivery" value={order.deliveryOption === 'express' ? 'Express' : 'Standard'} />
            <OrderMeta label="Total" value={`$${order.total}`} />
          </div>
          <div className="mt-4 rounded-[8px] border border-[#E5DCCF] bg-[#FBF8F3] px-4 py-3 text-sm leading-6 text-[#5F564B]">
            Order access is linked to <span className="font-semibold text-[#241C16]">{order.email}</span>.
          </div>
        </div>

        <aside className="grid content-start gap-3">
          <button type="button" onClick={() => setIsReviewOpen(true)} className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
            {orderStage === 'review' || orderStage === 'revision' ? 'Review Portrait' : 'View Portrait'}
          </button>
          {(orderStage === 'framing' || orderStage === 'shipping' || orderStage === 'complete') && (
            <button type="button" onClick={() => setIsFramingOpen(true)} className="rounded-[8px] border border-[#D8CBB8] bg-[#FBF8F3] px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
              {orderStage === 'framing' ? 'Confirm Framing' : 'View Framing'}
            </button>
          )}
          <label className="mt-2 flex items-start gap-3 text-sm font-semibold text-[#4F4437]">
            <input
              type="checkbox"
              checked={isGiftOrder}
              onChange={(event) => {
                setIsGiftOrder(event.target.checked);
                if (event.target.checked) {
                  setIsGiftOpen(true);
                } else {
                  setGiftMessage(null);
                }
              }}
              className="mt-0.5 h-4 w-4 rounded-[3px] border border-[#DCCFBC] accent-[#31271F]"
            />
            <span>This is a gift.</span>
          </label>
          <button
            type="button"
            onClick={() => {
              setIsGiftOrder(true);
              setIsGiftOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]"
          >
            <Gift size={16} />
            {giftMessage ? 'Edit Gift Message' : 'Add Gift Message'}
          </button>
          {giftMessage && <p className="text-xs font-semibold text-[#5F564B]">Gift message added for {giftMessage.recipient}.</p>}
          <button type="button" onClick={() => setIsShippingOpen(true)} className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#31271F] underline underline-offset-4 transition hover:text-[#6E6254]">
            <Truck size={16} />
            View / Update Shipping
          </button>
          {shippingAddress && <p className="text-xs leading-5 text-[#5F564B]">Shipping to {shippingAddress.city}, {shippingAddress.region}.</p>}
        </aside>
      </article>

      {isReviewOpen && (
        <ReviewPortraitModal
          selection={selection}
          presentationSummary={presentationSummary}
          onClose={() => setIsReviewOpen(false)}
          onApprove={() => {
            onUpdateOrderStage(orderIndex, 'framing');
            setIsFramingOpen(true);
            setIsReviewOpen(false);
          }}
          onRequestModification={() => {
            onUpdateOrderStage(orderIndex, 'revision');
            setIsReviewOpen(false);
          }}
        />
      )}

      {isFramingOpen && (
        <FramingConfirmationModal
          selection={selection}
          presentationSummary={presentationSummary}
          orderStage={orderStage}
          onClose={() => setIsFramingOpen(false)}
          onConfirm={() => {
            onUpdateOrderStage(orderIndex, shippingAddress ? 'complete' : 'shipping');
            setIsFramingOpen(false);
          }}
        />
      )}

      {isGiftOpen && (
        <GiftMessageModal
          initialMessage={giftMessage}
          onClose={() => {
            setIsGiftOpen(false);
            if (!giftMessage) setIsGiftOrder(false);
          }}
          onSave={(message) => {
            setGiftMessage(message);
            setIsGiftOrder(true);
            setIsGiftOpen(false);
          }}
        />
      )}

      {isShippingOpen && (
        <ShippingAddressModal
          address={shippingAddress}
          onClose={() => setIsShippingOpen(false)}
          onSave={(address) => {
            setShippingAddress(address);
            if (orderStage === 'shipping') onUpdateOrderStage(orderIndex, 'complete');
            setIsShippingOpen(false);
          }}
        />
      )}
    </>
  );
}

function getOrderStageCopy(stage: OrderStage) {
  const copy: Record<OrderStage, { current: string; next: string; currentDescription: string; nextDescription: string }> = {
    review: {
      current: 'Painting Ready For Review',
      next: 'Painting Approval',
      currentDescription: 'Review the finished artwork before the studio moves to framing.',
      nextDescription: 'Approve the portrait or request a modification.',
    },
    revision: {
      current: 'Modifications Requested',
      next: 'Artist Revision',
      currentDescription: 'Your artist has the modification request and will prepare an updated review.',
      nextDescription: 'You will be notified when the revised artwork is ready.',
    },
    framing: {
      current: 'Painting Approved',
      next: 'Framing Confirmation',
      currentDescription: 'The artwork is approved. Your payment is already complete.',
      nextDescription: 'Confirm the selected presentation so the studio can prepare the final piece.',
    },
    shipping: {
      current: 'Framing Confirmed',
      next: 'Shipping Details',
      currentDescription: 'The selected presentation is confirmed and the studio is preparing fulfillment.',
      nextDescription: 'Confirm the shipping address before dispatch.',
    },
    complete: {
      current: 'Order Complete',
      next: 'Shipment In Progress',
      currentDescription: 'The portrait, presentation, payment, and shipping details are confirmed.',
      nextDescription: 'The studio will send tracking as soon as the package ships.',
    },
  };

  return copy[stage];
}

function OrderProgress({ orderStage }: { orderStage: OrderStage }) {
  const completedStepMap: Record<OrderStage, number> = {
    review: 3,
    revision: 3,
    framing: 4,
    shipping: 5,
    complete: 5,
  };
  const currentStepMap: Record<OrderStage, string> = {
    review: 'Portrait Review',
    revision: 'Revision',
    framing: 'Framing',
    shipping: 'Shipping',
    complete: 'Shipping',
  };
  const steps = [
    { label: 'Upload Photo', index: 1 },
    { label: 'Artist Review', index: 2 },
    { label: orderStage === 'revision' ? 'Revision' : 'Portrait Review', index: 3 },
    { label: 'Framing', index: 4 },
    { label: 'Shipping', index: 5 },
  ];
  const completedStep = completedStepMap[orderStage];
  const currentStep = currentStepMap[orderStage];

  return (
    <div className="my-6 grid gap-2 sm:grid-cols-5">
      {steps.map((step) => (
        <div key={step.label}>
          <div className={`h-1.5 rounded-full ${step.index <= completedStep ? 'bg-[#31271F]' : 'bg-[#E5DCCF]'}`} />
          <p className={`mt-2 text-xs font-semibold ${step.label === currentStep ? 'text-[#241C16]' : 'text-[#8F816C]'}`}>{step.label}</p>
        </div>
      ))}
    </div>
  );
}

function StatusBlock({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[#241C16]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-[#5F564B]">{description}</p>
    </div>
  );
}

function OrderMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#8F816C]">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[#241C16]">{value}</p>
    </div>
  );
}

function ReviewPortraitModal({
  selection,
  presentationSummary,
  onClose,
  onApprove,
  onRequestModification,
}: {
  selection: PaymentDetailsPayload;
  presentationSummary: string;
  onClose: () => void;
  onApprove: () => void;
  onRequestModification: () => void;
}) {
  const artworkImage = getArtworkImage(selection);
  const [previewMode, setPreviewMode] = useState<ReviewPreviewMode>('artwork');
  const previewImage = previewMode === 'detail' ? selection.sourceImage : artworkImage;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241C16]/58 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto max-w-[1160px] overflow-hidden rounded-[8px] border border-[#DCCFBC] bg-[#FBF8F3] shadow-[0_30px_80px_rgba(20,14,10,0.35)]">
        <div className="flex items-center justify-between border-b border-[#DCCFBC] px-5 py-4">
          <h2 className="text-xl font-semibold text-[#241C16]">Review Portrait</h2>
          <button type="button" onClick={onClose} className="rounded-[8px] p-2 text-[#31271F] transition hover:bg-[#F3EBDE]" aria-label="Close review portrait">
            <X size={24} />
          </button>
        </div>
        <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1.25fr)_380px] lg:p-8">
          <div>
            <ZoomableReviewPreview
              alt={selection.conceptTitle}
              image={previewImage}
              isVideo={previewMode === 'video'}
              videoSrc={generationMotionVideo}
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <ReviewThumb label="Artwork Photo" icon={<ZoomIn size={24} />} image={artworkImage} isSelected={previewMode === 'artwork'} onSelect={() => setPreviewMode('artwork')} />
              <ReviewThumb label="Detail View" icon={<ZoomIn size={24} />} image={selection.sourceImage} isSelected={previewMode === 'detail'} onSelect={() => setPreviewMode('detail')} />
              <ReviewThumb label="Studio Video" icon={<PlayCircle size={28} />} image={artworkImage} isSelected={previewMode === 'video'} onSelect={() => setPreviewMode('video')} />
            </div>
          </div>
          <aside className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Artwork Review</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#241C16]">Your portrait is ready.</h3>
              <p className="mt-4 text-sm leading-7 text-[#5F564B]">Review the finished artwork and approve it for framing, or ask the artist for a modification before the studio moves forward. Your order is already paid in full.</p>
            </div>
            <div className="space-y-3 border-y border-[#DCCFBC] py-5">
              <InfoRow label="Style" value={selection.conceptTitle} />
              <InfoRow label="Size" value={selection.size} />
              <InfoRow label="Presentation" value={presentationSummary} />
            </div>
            <button type="button" onClick={onApprove} className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16]">
              <Check size={17} />
              Approve Portrait
            </button>
            <button type="button" onClick={onRequestModification} className="w-full rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
              Ask for Modification
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ZoomableReviewPreview({
  alt,
  image,
  isVideo,
  videoSrc,
}: {
  alt: string;
  image: string | null;
  isVideo: boolean;
  videoSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [zoomPoint, setZoomPoint] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const updateZoomPoint = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
    const y = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));
    setZoomPoint({ x, y });
  };

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const mediaStyle = {
    transform: isZooming ? 'scale(2)' : 'scale(1)',
    transformOrigin: `${zoomPoint.x}% ${zoomPoint.y}%`,
  };

  return (
    <div
      className="relative flex min-h-[360px] cursor-crosshair items-center justify-center overflow-hidden rounded-[8px] bg-[#EFE8DD] p-5"
      onPointerEnter={() => setIsZooming(true)}
      onPointerLeave={() => setIsZooming(false)}
      onPointerMove={updateZoomPoint}
    >
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            poster={image ?? undefined}
            muted
            loop
            playsInline
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            className="max-h-[520px] w-full max-w-[520px] object-contain shadow-[0_20px_40px_rgba(43,31,21,0.12)] transition-transform duration-150 ease-out"
            style={mediaStyle}
          />
          <button
            type="button"
            onClick={toggleVideo}
            className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-[8px] bg-[#241C16]/88 px-4 py-2 text-xs font-semibold text-[#FBF8F3] shadow-[0_10px_24px_rgba(20,14,10,0.24)] transition hover:bg-[#241C16]"
          >
            <PlayCircle size={15} />
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </>
      ) : image ? (
        <img
          src={image}
          alt={alt}
          className="max-h-[520px] w-full max-w-[520px] object-contain shadow-[0_20px_40px_rgba(43,31,21,0.12)] transition-transform duration-150 ease-out"
          style={mediaStyle}
        />
      ) : (
        <ImageIcon size={34} className="text-[#8F816C]" />
      )}
    </div>
  );
}

function FramingConfirmationModal({
  selection,
  presentationSummary,
  orderStage,
  onClose,
  onConfirm,
}: {
  selection: PaymentDetailsPayload;
  presentationSummary: string;
  orderStage: OrderStage;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const isConfirmed = orderStage === 'shipping' || orderStage === 'complete';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241C16]/58 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto max-w-[760px] overflow-hidden rounded-[8px] border border-[#DCCFBC] bg-[#FBF8F3] shadow-[0_30px_80px_rgba(20,14,10,0.35)]">
        <div className="flex items-center justify-between border-b border-[#DCCFBC] px-5 py-4">
          <h2 className="text-xl font-semibold text-[#241C16]">Confirm Framing</h2>
          <button type="button" onClick={onClose} className="rounded-[8px] p-2 text-[#31271F] transition hover:bg-[#F3EBDE]" aria-label="Close framing confirmation">
            <X size={24} />
          </button>
        </div>
        <div className="p-5 lg:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8F816C]">Presentation</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#241C16]">{presentationSummary}</h3>
          <p className="mt-4 text-sm leading-7 text-[#5F564B]">
            This step confirms the presentation selected during checkout. No extra payment is needed because this order was paid in full.
          </p>

          <div className="mt-6 grid gap-3 rounded-[8px] border border-[#E5DCCF] bg-white/72 p-5 text-sm">
            <InfoRow label="Artwork" value={selection.conceptTitle} />
            <InfoRow label="Size" value={selection.size} />
            <InfoRow label="Finish" value={selection.finishLabel} />
            {selection.frameLabel && <InfoRow label="Frame" value={selection.frameLabel} />}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isConfirmed}
              className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16] disabled:cursor-not-allowed disabled:bg-[#B9AB99]"
            >
              {isConfirmed ? 'Framing Confirmed' : 'Confirm Framing'}
            </button>
            <button type="button" onClick={onClose} className="rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewThumb({ label, icon, image, isSelected, onSelect }: { label: string; icon: ReactNode; image: string | null; isSelected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className={`group relative overflow-hidden rounded-[8px] border bg-[#F3EBDE] text-left transition ${isSelected ? 'border-[#31271F]' : 'border-[#DCCFBC] hover:border-[#A58964]'}`}>
      {image ? <img src={image} alt={label} className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]" /> : <div className="flex aspect-[4/3] items-center justify-center text-[#8F816C]"><ImageIcon size={24} /></div>}
      <span className="absolute inset-0 flex items-center justify-center bg-[#241C16]/18 text-white opacity-0 transition group-hover:opacity-100">{icon}</span>
      <span className="block px-3 py-2 text-xs font-semibold text-[#5F564B]">{label}</span>
    </button>
  );
}

function GiftMessageModal({ initialMessage, onClose, onSave }: { initialMessage: GiftMessage | null; onClose: () => void; onSave: (message: GiftMessage) => void }) {
  const [title, setTitle] = useState(initialMessage?.title ?? 'Your Title Here');
  const [sender, setSender] = useState(initialMessage?.sender ?? '');
  const [recipient, setRecipient] = useState(initialMessage?.recipient ?? '');
  const [message, setMessage] = useState(initialMessage?.message ?? '');
  const [previewNotice, setPreviewNotice] = useState('');
  const canSave = title.trim() && sender.trim() && recipient.trim() && message.trim();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241C16]/58 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto max-w-[980px] overflow-hidden rounded-[8px] border border-[#DCCFBC] bg-[#FBF8F3] shadow-[0_30px_80px_rgba(20,14,10,0.35)]">
        <div className="flex items-center justify-between border-b border-[#DCCFBC] px-5 py-4">
          <h2 className="text-xl font-semibold text-[#241C16]">Gift Message</h2>
          <button type="button" onClick={onClose} className="rounded-[8px] p-2 text-[#31271F] transition hover:bg-[#F3EBDE]" aria-label="Close gift message">
            <X size={24} />
          </button>
        </div>
        <div className="grid gap-6 p-5 lg:grid-cols-[360px_minmax(0,1fr)] lg:p-8">
          <div className="rounded-[8px] border border-[#DCCFBC] bg-white p-6 shadow-[0_16px_34px_rgba(43,31,21,0.06)]">
            <div className="min-h-[430px] rounded-[8px] border border-[#EFE4D6] bg-[#FBF8F3] p-7 text-center">
              <div className="mx-auto h-16 w-28 rounded-full border-t-4 border-[#D7A77C]" />
              <p className="mt-10 text-2xl font-semibold text-[#7A4A68]">{title || 'Your Title Here'}</p>
              <div className="mt-5 space-y-1 text-sm font-semibold text-[#4F4437]">
                <p>To: {recipient || 'Someone you love'}</p>
                <p>From: {sender || 'Someone I love'}</p>
              </div>
              <p className="mx-auto mt-8 max-w-[24ch] whitespace-pre-line text-sm leading-7 text-[#5F564B]">{message || 'This hand-painted portrait was created with love just for you.'}</p>
              <p className="mt-10 text-lg font-semibold text-[#7A4A68]">ViewBrush</p>
            </div>
          </div>
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (!canSave) return;
              onSave({ title: title.trim(), sender: sender.trim(), recipient: recipient.trim(), message: message.trim() });
            }}
          >
            <FieldInput label="Title *" value={title} onChange={setTitle} />
            <FieldInput label="Your name *" value={sender} onChange={setSender} placeholder="Ryan Liu" />
            <FieldInput label="Recipient name *" value={recipient} onChange={setRecipient} />
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2D241B]">Your message *</label>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} className={getInputClasses('min-h-[132px] resize-y bg-white')} placeholder="Write the note that will be printed with the portrait." />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="button" onClick={() => setPreviewNotice('Card preview is updated on the left.')} className="rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
                Card Preview
              </button>
              <button type="submit" disabled={!canSave} className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16] disabled:cursor-not-allowed disabled:bg-[#B9AB99]">
                Add Gift Message
              </button>
            </div>
            {previewNotice && <p className="text-sm font-semibold text-[#5F564B]">{previewNotice}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

function ShippingAddressModal({ address, onClose, onSave }: { address: AddressRecord | null; onClose: () => void; onSave: (address: AddressRecord) => void }) {
  const [fullName, setFullName] = useState(address?.fullName ?? '');
  const [street, setStreet] = useState(address?.street ?? '');
  const [city, setCity] = useState(address?.city ?? '');
  const [region, setRegion] = useState(address?.region ?? '');
  const [postalCode, setPostalCode] = useState(address?.postalCode ?? '');
  const [country, setCountry] = useState(address?.country ?? 'United States');
  const canSave = fullName.trim() && street.trim() && city.trim() && region.trim() && postalCode.trim() && country.trim();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241C16]/58 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto max-w-[720px] overflow-hidden rounded-[8px] border border-[#DCCFBC] bg-[#FBF8F3] shadow-[0_30px_80px_rgba(20,14,10,0.35)]">
        <div className="flex items-center justify-between border-b border-[#DCCFBC] px-5 py-4">
          <h2 className="text-xl font-semibold text-[#241C16]">Update Shipping</h2>
          <button type="button" onClick={onClose} className="rounded-[8px] p-2 text-[#31271F] transition hover:bg-[#F3EBDE]" aria-label="Close shipping address">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-5 p-5 lg:p-8">
          <FieldInput label="Full name" value={fullName} onChange={setFullName} />
          <FieldInput label="Street address" value={street} onChange={setStreet} />
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput label="City" value={city} onChange={setCity} />
            <FieldInput label="State / Region" value={region} onChange={setRegion} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput label="ZIP / Postal code" value={postalCode} onChange={setPostalCode} />
            <FieldInput label="Country" value={country} onChange={setCountry} />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              disabled={!canSave}
              onClick={() => onSave({ fullName: fullName.trim(), street: street.trim(), city: city.trim(), region: region.trim(), postalCode: postalCode.trim(), country: country.trim() })}
              className="rounded-[8px] bg-[#31271F] px-5 py-3 text-sm font-semibold text-[#FBF8F3] transition hover:bg-[#241C16] disabled:cursor-not-allowed disabled:bg-[#B9AB99]"
            >
              Save Shipping
            </button>
            <button type="button" onClick={onClose} className="rounded-[8px] border border-[#D8CBB8] bg-white/72 px-5 py-3 text-sm font-semibold text-[#31271F] transition hover:bg-[#F3EBDE]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#2D241B]">{label}</label>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={getInputClasses('bg-white')} />
    </div>
  );
}

function CheckboxRow({ label, checked, onChange, helper = false }: { label: string; checked: boolean; onChange: (checked: boolean) => void; helper?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[#5F564B]">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 rounded-[3px] border border-[#DCCFBC] bg-white accent-[#31271F]" />
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
