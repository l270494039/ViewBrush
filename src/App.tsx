import { useEffect, useState } from 'react';
import { getBgClasses } from './utils/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DevServerBadge from './components/DevServerBadge';
import Home from './pages/Home';
import Create from './pages/Create';
import PaymentDetails, { normalizePaymentDetailsPayload, type PaymentDetailsPayload } from './pages/PaymentDetails';
import Checkout, { type CheckoutSubmission } from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Faq from './pages/Faq';
import RefundPolicy from './pages/RefundPolicy';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Materials from './pages/Materials';
import Cart from './pages/Cart';
import Account, { type AccountOrderSnapshot, type OrderStage } from './pages/Account';
import { defaultMockCustomer, mockAccountStorageKey, type MockCustomer } from './data/mockAccount';
import imgCreatePlaceholderOptionB from './assets/images/create_placeholder_option_b_20260628.png';

type AppRoute = 'home' | 'create' | 'cart' | 'account' | 'details' | 'checkout' | 'success' | 'about' | 'how' | 'materials' | 'faq' | 'refund' | 'contact';
type AccountEntryView = 'account' | 'orders';

const cartStorageKey = 'viewbrush-saved-artwork';
const accountOrderStorageKey = 'viewbrush-latest-order';
const accountOrdersStorageKey = 'viewbrush-orders';
const mockAccountSignedOutStorageKey = 'viewbrush-mock-account-signed-out';
const maxStoredImageLength = 120_000;

const routeHashMap: Record<AppRoute, string> = {
  home: '',
  create: '#create',
  cart: '#cart',
  account: '#account',
  details: '#details',
  checkout: '#checkout',
  success: '#success',
  about: '#about-us',
  how: '#how-it-works',
  materials: '#materials',
  faq: '#faq',
  refund: '#refund-policy',
  contact: '#contact-us',
};

function getRouteFromHash(hash: string): AppRoute {
  switch (hash.replace(/^#/, '')) {
    case '':
    case 'home':
      return 'home';
    case 'create':
      return 'create';
    case 'cart':
      return 'cart';
    case 'account':
      return 'account';
    case 'details':
      return 'details';
    case 'checkout':
      return 'checkout';
    case 'success':
      return 'success';
    case 'about':
    case 'about-us':
      return 'about';
    case 'how':
    case 'how-it-works':
      return 'how';
    case 'materials':
      return 'materials';
    case 'faq':
      return 'faq';
    case 'refund':
    case 'refund-policy':
      return 'refund';
    case 'contact':
    case 'contact-us':
      return 'contact';
    default:
      return 'home';
  }
}

function getSavedCartSelection(): PaymentDetailsPayload | null {
  if (typeof window === 'undefined') return null;

  try {
    const savedSelection = window.localStorage.getItem(cartStorageKey);
    return savedSelection ? normalizePaymentDetailsPayload(JSON.parse(savedSelection)) : null;
  } catch {
    return null;
  }
}

function normalizeAccountOrderSnapshot(raw: unknown): AccountOrderSnapshot | null {
  if (!raw || typeof raw !== 'object') return null;

  const parsed = raw as { selection?: unknown; order?: CheckoutSubmission; createdAt?: unknown; orderStage?: unknown };
  const selection = normalizePaymentDetailsPayload(parsed.selection);
  if (!selection || !parsed.order) return null;
  const orderStage =
    parsed.orderStage === 'review' ||
    parsed.orderStage === 'revision' ||
    parsed.orderStage === 'framing' ||
    parsed.orderStage === 'shipping' ||
    parsed.orderStage === 'complete'
      ? parsed.orderStage
      : 'review';

  return {
    selection,
    order: parsed.order,
    createdAt: typeof parsed.createdAt === 'string' ? parsed.createdAt : undefined,
    orderStage,
  };
}

function getSavedAccountOrders(): AccountOrderSnapshot[] {
  if (typeof window === 'undefined') return [];

  try {
    const savedOrders = window.localStorage.getItem(accountOrdersStorageKey);
    if (savedOrders) {
      const parsed = JSON.parse(savedOrders);
      if (Array.isArray(parsed)) return parsed.flatMap((item) => {
        const order = normalizeAccountOrderSnapshot(item);
        return order ? [order] : [];
      });
    }

    const savedOrder = window.localStorage.getItem(accountOrderStorageKey);
    const legacyOrder = savedOrder ? normalizeAccountOrderSnapshot(JSON.parse(savedOrder)) : null;
    return legacyOrder ? [legacyOrder] : [];
  } catch {
    return [];
  }
}

function getSavedMockCustomer(): MockCustomer | null {
  if (typeof window === 'undefined') return null;

  try {
    if (window.localStorage.getItem(mockAccountSignedOutStorageKey) === 'true') return null;
    const savedCustomer = window.localStorage.getItem(mockAccountStorageKey);
    return savedCustomer ? { ...defaultMockCustomer, ...JSON.parse(savedCustomer) } : null;
  } catch {
    return null;
  }
}

function getSavedMockAccountSignedOut() {
  if (typeof window === 'undefined') return false;

  try {
    return window.localStorage.getItem(mockAccountSignedOutStorageKey) === 'true';
  } catch {
    return false;
  }
}

function getStorageSafeImage(value: string | null, fallback: string | null): string | null {
  if (!value) return fallback;
  if (value.startsWith('data:') || value.startsWith('blob:') || value.length > maxStoredImageLength) return fallback;
  return value;
}

function getStorageSafeSelection(selection: PaymentDetailsPayload): PaymentDetailsPayload {
  const conceptImage = getStorageSafeImage(selection.conceptImage, null);
  const sourceImage = getStorageSafeImage(selection.sourceImage, conceptImage ?? imgCreatePlaceholderOptionB) ?? imgCreatePlaceholderOptionB;
  const roomImage = getStorageSafeImage(selection.roomImage, imgCreatePlaceholderOptionB) ?? imgCreatePlaceholderOptionB;

  return {
    ...selection,
    conceptImage,
    sourceImage,
    roomImage,
  };
}

function getStorageSafeOrderSnapshot(snapshot: AccountOrderSnapshot): AccountOrderSnapshot {
  return {
    ...snapshot,
    selection: getStorageSafeSelection(snapshot.selection),
  };
}

function setLocalStorageItem(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Unable to persist ${key}.`, error);
  }
}

function createMockCustomerFromEmail(email: string): MockCustomer {
  const normalizedEmail = email.trim() || defaultMockCustomer.email;
  const localPart = normalizedEmail.split('@')[0] || 'viewbrush customer';
  const nameParts = localPart
    .split(/[._-]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const firstName = nameParts[0] ? nameParts[0][0].toUpperCase() + nameParts[0].slice(1) : defaultMockCustomer.firstName;
  const lastName = nameParts[1] ? nameParts[1][0].toUpperCase() + nameParts[1].slice(1) : defaultMockCustomer.lastName;

  return {
    firstName,
    lastName,
    email: normalizedEmail,
    memberSince: defaultMockCustomer.memberSince,
  };
}

function AppContent() {
  const [route, setRoute] = useState<AppRoute>('create');
  const [isRouteReady, setIsRouteReady] = useState(false);
  const [accountOrders, setAccountOrders] = useState<AccountOrderSnapshot[]>(() => getSavedAccountOrders());
  const latestOrder = accountOrders[0] ?? null;
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsPayload | null>(() => getSavedCartSelection() ?? getSavedAccountOrders()[0]?.selection ?? null);
  const [cartSelection, setCartSelection] = useState<PaymentDetailsPayload | null>(() => getSavedCartSelection());
  const [checkoutOrder, setCheckoutOrder] = useState<CheckoutSubmission | null>(() => getSavedAccountOrders()[0]?.order ?? null);
  const [cartResetKey, setCartResetKey] = useState(0);
  const [mockCustomer, setMockCustomer] = useState<MockCustomer | null>(() => getSavedMockCustomer());
  const [hasSignedOut, setHasSignedOut] = useState(() => getSavedMockAccountSignedOut());
  const [accountEntryView, setAccountEntryView] = useState<AccountEntryView>('account');
  const isStudioRoute = route === 'create' || route === 'details' || route === 'checkout' || route === 'success';

  useEffect(() => {
    setRoute(getRouteFromHash(window.location.hash));
    setIsRouteReady(true);

    const handleHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!isRouteReady) return;
    const nextHash = routeHashMap[route];
    if (window.location.hash !== nextHash) {
      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      window.history.replaceState(null, '', nextUrl);
    }
  }, [isRouteReady, route]);

  useEffect(() => {
    if (!isRouteReady) return;
    if (
      route === 'faq' ||
      route === 'home' ||
      route === 'about' ||
      route === 'how' ||
      route === 'materials' ||
      route === 'cart' ||
      route === 'account' ||
      route === 'refund' ||
      route === 'contact' ||
      route === 'details' ||
      route === 'checkout' ||
      route === 'success'
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [isRouteReady, route]);

  const navigate = (nextRoute: AppRoute) => {
    if (nextRoute === 'cart') {
      setCartResetKey((current) => current + 1);
    }
    setRoute(nextRoute);
  };

  const navigateToAccount = (entryView: AccountEntryView = 'account') => {
    setAccountEntryView(entryView);
    navigate('account');
  };

  const detailsSelection = paymentDetails ?? cartSelection ?? null;
  const checkoutSelection = paymentDetails ?? cartSelection ?? latestOrder?.selection ?? null;
  const successSelection = paymentDetails ?? latestOrder?.selection ?? null;
  const successOrder = checkoutOrder ?? latestOrder?.order ?? null;
  const hasAccountActionRequired = accountOrders.some(({ orderStage }) => {
    const stage = orderStage ?? 'review';
    return stage === 'review' || stage === 'shipping';
  });

  const handleNavigate = (nextRoute: AppRoute) => {
    if (nextRoute === 'account') {
      navigateToAccount('account');
      return;
    }
    navigate(nextRoute);
  };

  useEffect(() => {
    if (!isRouteReady || route !== 'account' || mockCustomer || hasSignedOut) return;

    if (latestOrder) {
      const recoveredCustomer = createMockCustomerFromEmail(latestOrder.order.email);
      setHasSignedOut(false);
      setMockCustomer(recoveredCustomer);
      window.localStorage.removeItem(mockAccountSignedOutStorageKey);
      window.localStorage.setItem(mockAccountStorageKey, JSON.stringify(recoveredCustomer));
      return;
    }

  }, [hasSignedOut, isRouteReady, latestOrder, mockCustomer, route]);

  const saveCartSelection = (selection: PaymentDetailsPayload) => {
    setPaymentDetails(selection);
    setCartSelection(selection);
    setLocalStorageItem(cartStorageKey, JSON.stringify(getStorageSafeSelection(selection)));
    navigate('cart');
  };

  const clearCartSelection = () => {
    setCartSelection(null);
    window.localStorage.removeItem(cartStorageKey);
  };

  const persistAccountOrders = (orders: AccountOrderSnapshot[]) => {
    setLocalStorageItem(accountOrdersStorageKey, JSON.stringify(orders.map(getStorageSafeOrderSnapshot)));
    if (orders[0]) {
      setLocalStorageItem(accountOrderStorageKey, JSON.stringify(getStorageSafeOrderSnapshot(orders[0])));
    }
  };

  const updateOrderStage = (orderIndex: number, orderStage: OrderStage) => {
    setAccountOrders((currentOrders) => {
      const nextOrders = currentOrders.map((accountOrder, index) =>
        index === orderIndex ? { ...accountOrder, orderStage } : accountOrder
      );
      persistAccountOrders(nextOrders);
      return nextOrders;
    });
  };

  const handleMockSignIn = (customer: MockCustomer) => {
    setAccountEntryView('account');
    setHasSignedOut(false);
    setMockCustomer(customer);
    window.localStorage.removeItem(mockAccountSignedOutStorageKey);
    window.localStorage.setItem(mockAccountStorageKey, JSON.stringify(customer));
    navigate('account');
  };

  const handleMockSignOut = () => {
    setAccountEntryView('account');
    setHasSignedOut(true);
    setMockCustomer(null);
    window.localStorage.setItem(mockAccountSignedOutStorageKey, 'true');
    window.localStorage.removeItem(mockAccountStorageKey);
    navigate('cart');
  };

  if (!isRouteReady) {
    return null;
  }

  const isCartRoute = route === 'cart';

  return (
    <div className={`transition-colors duration-500 flex flex-col ${isCartRoute ? 'min-h-screen bg-[#FBF8F3]' : `min-h-screen ${getBgClasses('main')}`}`}>
      {!isStudioRoute && (
        <Navbar
          currentRoute={route}
          hasCartItems={Boolean(cartSelection)}
          hasAccountNotifications={hasAccountActionRequired && !hasSignedOut}
          onNavigate={handleNavigate}
        />
      )}
      <main className="relative flex w-full flex-1 flex-col">
        {route === 'home' && <Home onNavigate={navigate} />}
        {route === 'about' && <About onNavigate={navigate} />}
        {route === 'how' && <HowItWorks onNavigate={navigate} />}
        {route === 'materials' && <Materials onNavigate={navigate} />}
        {route === 'cart' && (
          <Cart
            selection={cartSelection}
            resetKey={cartResetKey}
            customer={mockCustomer}
            onCreate={() => navigate('create')}
            onEdit={() => navigate('create')}
            onClear={clearCartSelection}
            onCheckout={() => {
              if (!cartSelection) return;
              setPaymentDetails(cartSelection);
              navigate('checkout');
            }}
            onAccount={handleMockSignIn}
            onHelp={() => navigate('faq')}
          />
        )}
        {route === 'account' && mockCustomer && (
          <Account
            customer={mockCustomer}
            savedSelection={cartSelection}
            accountOrders={accountOrders}
            initialView={accountEntryView}
            onCreate={() => navigate('create')}
            onOpenCart={() => navigate('cart')}
            onSignOut={handleMockSignOut}
            onUpdateOrderStage={updateOrderStage}
          />
        )}
        {route === 'account' && !mockCustomer && (
          <Cart
            selection={null}
            resetKey={cartResetKey}
            emptyContext="account"
            customer={mockCustomer}
            onCreate={() => navigate('create')}
            onEdit={() => navigate('create')}
            onClear={clearCartSelection}
            onCheckout={() => undefined}
            onAccount={handleMockSignIn}
            onHelp={() => navigate('faq')}
          />
        )}
        {route === 'faq' && <Faq onNavigate={navigate} />}
        {route === 'refund' && <RefundPolicy onNavigate={navigate} />}
        {route === 'contact' && <ContactUs />}
        {route === 'create' && (
          <Create
            onNavigate={navigate}
            onSaveForLater={saveCartSelection}
            onOpenDetails={(details) => {
              setPaymentDetails(details);
              navigate('details');
            }}
          />
        )}
        {route === 'details' &&
          (detailsSelection ? (
            <PaymentDetails selection={detailsSelection} onBack={() => navigate('create')} onContinueCheckout={() => navigate('checkout')} />
          ) : (
            <Create
              onNavigate={navigate}
              onSaveForLater={saveCartSelection}
              onOpenDetails={(details) => {
                setPaymentDetails(details);
                navigate('details');
              }}
            />
          ))}
        {route === 'checkout' &&
          (checkoutSelection ? (
            <Checkout
              selection={checkoutSelection}
              onBack={() => navigate('details')}
              onComplete={(submission) => {
                const orderSnapshot = { selection: checkoutSelection, order: submission, createdAt: new Date().toISOString(), orderStage: 'review' as const };
                const nextAccountOrders = [orderSnapshot, ...accountOrders];
                const nextCustomer = mockCustomer ?? createMockCustomerFromEmail(submission.email);
                setPaymentDetails(orderSnapshot.selection);
                setCheckoutOrder(submission);
                setAccountOrders(nextAccountOrders);
                setHasSignedOut(false);
                setMockCustomer(nextCustomer);
                setAccountEntryView('orders');
                setCartSelection(null);
                window.localStorage.removeItem(mockAccountSignedOutStorageKey);
                setLocalStorageItem(mockAccountStorageKey, JSON.stringify(nextCustomer));
                persistAccountOrders(nextAccountOrders);
                window.localStorage.removeItem(cartStorageKey);
                navigate('success');
              }}
            />
          ) : (
            <Create
              onNavigate={navigate}
              onSaveForLater={saveCartSelection}
              onOpenDetails={(details) => {
                setPaymentDetails(details);
                navigate('details');
              }}
            />
          ))}
        {route === 'success' &&
          successSelection &&
          successOrder && (
            <OrderSuccess
              selection={successSelection}
              order={successOrder}
              createdAt={latestOrder?.createdAt}
              onReturnHome={() => {
                setCheckoutOrder(null);
                setPaymentDetails(null);
                navigate('home');
              }}
              onCreateAnother={() => {
                setCheckoutOrder(null);
                navigate('create');
              }}
              onViewAccount={() => navigateToAccount('orders')}
            />
          )}
      </main>
      {!isStudioRoute && (
        <div className="md:hidden">
          <Footer onNavigate={navigate} />
        </div>
      )}
      <div className="hidden md:block">
        <Footer onNavigate={navigate} />
      </div>
      <DevServerBadge />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
