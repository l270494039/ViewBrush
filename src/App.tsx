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
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Materials from './pages/Materials';
import Cart from './pages/Cart';
import Account, { type AccountOrderSnapshot } from './pages/Account';

type AppRoute = 'home' | 'create' | 'cart' | 'account' | 'details' | 'checkout' | 'success' | 'about' | 'how' | 'materials' | 'faq' | 'refund';

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

function AppContent() {
  const [route, setRoute] = useState<AppRoute>('create');
  const [isRouteReady, setIsRouteReady] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsPayload | null>(null);
  const [cartSelection, setCartSelection] = useState<PaymentDetailsPayload | null>(() => getSavedCartSelection());
  const [latestOrder, setLatestOrder] = useState<AccountOrderSnapshot | null>(() => getSavedLatestOrder());
  const [checkoutOrder, setCheckoutOrder] = useState<CheckoutSubmission | null>(null);
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
      route === 'details' ||
      route === 'checkout' ||
      route === 'success'
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [isRouteReady, route]);

  const navigate = (nextRoute: AppRoute) => {
    setRoute(nextRoute);
  };

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

  if (!isRouteReady) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col ${getBgClasses('main')}`}>
      {!isStudioRoute && <Navbar currentRoute={route} onNavigate={navigate} />}
      <main className="flex-1 flex flex-col w-full relative">
        {route === 'home' && <Home onNavigate={navigate} />}
        {route === 'about' && <About onNavigate={navigate} />}
        {route === 'how' && <HowItWorks onNavigate={navigate} />}
        {route === 'materials' && <Materials onNavigate={navigate} />}
        {route === 'cart' && (
          <Cart
            selection={cartSelection}
            onCreate={() => navigate('create')}
            onEdit={() => navigate('create')}
            onClear={clearCartSelection}
            onCheckout={() => {
              if (!cartSelection) return;
              setPaymentDetails(cartSelection);
              navigate('checkout');
            }}
            onAccount={() => navigate('account')}
            onHelp={() => navigate('faq')}
          />
        )}
        {route === 'account' && (
          <Account
            savedSelection={cartSelection}
            latestOrder={latestOrder}
            onCreate={() => navigate('create')}
            onOpenCart={() => navigate('cart')}
          />
        )}
        {route === 'faq' && <Faq onNavigate={navigate} />}
        {route === 'refund' && <RefundPolicy onNavigate={navigate} />}
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
                setCheckoutOrder(submission);
                setLatestOrder(orderSnapshot);
                setCartSelection(null);
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
              onViewAccount={() => navigate('account')}
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
