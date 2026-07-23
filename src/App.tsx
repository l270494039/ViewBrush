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
import Account, { type AccountOrderSnapshot } from './pages/Account';
import { defaultMockCustomer, mockAccountStorageKey, type MockCustomer } from './data/mockAccount';

type AppRoute = 'home' | 'create' | 'cart' | 'account' | 'details' | 'checkout' | 'success' | 'about' | 'how' | 'materials' | 'faq' | 'refund' | 'contact';
type AccountEntryView = 'account' | 'orders';

const cartStorageKey = 'viewbrush-saved-artwork';
const accountOrderStorageKey = 'viewbrush-latest-order';

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

function getSavedLatestOrder(): AccountOrderSnapshot | null {
  if (typeof window === 'undefined') return null;

  try {
    const savedOrder = window.localStorage.getItem(accountOrderStorageKey);
    if (!savedOrder) return null;
    const parsed = JSON.parse(savedOrder) as { selection?: unknown; order?: CheckoutSubmission } | null;
    const selection = normalizePaymentDetailsPayload(parsed?.selection);
    if (!selection || !parsed?.order) return null;
    return { selection, order: parsed.order };
  } catch {
    return null;
  }
}

function getSavedMockCustomer(): MockCustomer | null {
  if (typeof window === 'undefined') return null;

  try {
    const savedCustomer = window.localStorage.getItem(mockAccountStorageKey);
    return savedCustomer ? { ...defaultMockCustomer, ...JSON.parse(savedCustomer) } : null;
  } catch {
    return null;
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
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsPayload | null>(null);
  const [cartSelection, setCartSelection] = useState<PaymentDetailsPayload | null>(() => getSavedCartSelection());
  const [latestOrder, setLatestOrder] = useState<AccountOrderSnapshot | null>(() => getSavedLatestOrder());
  const [checkoutOrder, setCheckoutOrder] = useState<CheckoutSubmission | null>(null);
  const [cartResetKey, setCartResetKey] = useState(0);
  const [mockCustomer, setMockCustomer] = useState<MockCustomer | null>(() => getSavedMockCustomer());
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

  const handleNavigate = (nextRoute: AppRoute) => {
    if (nextRoute === 'account') {
      navigateToAccount('account');
      return;
    }
    navigate(nextRoute);
  };

  useEffect(() => {
    if (!isRouteReady || route !== 'account' || mockCustomer) return;

    if (latestOrder) {
      const recoveredCustomer = createMockCustomerFromEmail(latestOrder.order.email);
      setMockCustomer(recoveredCustomer);
      window.localStorage.setItem(mockAccountStorageKey, JSON.stringify(recoveredCustomer));
      return;
    }

  }, [isRouteReady, latestOrder, mockCustomer, route]);

  const saveCartSelection = (selection: PaymentDetailsPayload) => {
    setPaymentDetails(selection);
    setCartSelection(selection);
    window.localStorage.setItem(cartStorageKey, JSON.stringify(selection));
    navigate('cart');
  };

  const clearCartSelection = () => {
    setCartSelection(null);
    window.localStorage.removeItem(cartStorageKey);
  };

  const handleMockSignIn = (customer: MockCustomer) => {
    setAccountEntryView('account');
    setMockCustomer(customer);
    window.localStorage.setItem(mockAccountStorageKey, JSON.stringify(customer));
    navigate('account');
  };

  const handleMockSignOut = () => {
    setMockCustomer(null);
    window.localStorage.removeItem(mockAccountStorageKey);
    navigate('cart');
  };

  if (!isRouteReady) {
    return null;
  }

  const isCartRoute = route === 'cart';

  return (
    <div className={`transition-colors duration-500 flex flex-col ${isCartRoute ? 'min-h-screen bg-[#FBF8F3]' : `min-h-screen ${getBgClasses('main')}`}`}>
      {!isStudioRoute && <Navbar currentRoute={route} hasCartItems={Boolean(cartSelection)} onNavigate={handleNavigate} />}
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
            latestOrder={latestOrder}
            initialView={accountEntryView}
            onCreate={() => navigate('create')}
            onOpenCart={() => navigate('cart')}
            onSignOut={handleMockSignOut}
          />
        )}
        {route === 'account' && !mockCustomer && !latestOrder && (
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
          (paymentDetails ? (
            <PaymentDetails selection={paymentDetails} onBack={() => navigate('create')} onContinueCheckout={() => navigate('checkout')} />
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
          (paymentDetails ? (
            <Checkout
              selection={paymentDetails}
              onBack={() => navigate('details')}
              onComplete={(submission) => {
                const orderSnapshot = { selection: paymentDetails, order: submission };
                const nextCustomer = mockCustomer ?? createMockCustomerFromEmail(submission.email);
                setCheckoutOrder(submission);
                setLatestOrder(orderSnapshot);
                setMockCustomer(nextCustomer);
                setAccountEntryView('orders');
                setCartSelection(null);
                window.localStorage.setItem(mockAccountStorageKey, JSON.stringify(nextCustomer));
                window.localStorage.setItem(accountOrderStorageKey, JSON.stringify(orderSnapshot));
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
          paymentDetails &&
          checkoutOrder && (
            <OrderSuccess
              selection={paymentDetails}
              order={checkoutOrder}
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
      {route === 'home' && (
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
