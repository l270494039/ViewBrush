import { useEffect, useState } from 'react';
import { getBgClasses } from './utils/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DevServerBadge from './components/DevServerBadge';
import Home from './pages/Home';
import Create from './pages/Create';
import PaymentDetails, { type PaymentDetailsPayload } from './pages/PaymentDetails';
import Checkout, { type CheckoutSubmission } from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Faq from './pages/Faq';
import RefundPolicy from './pages/RefundPolicy';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Materials from './pages/Materials';

type AppRoute = 'home' | 'create' | 'details' | 'checkout' | 'success' | 'about' | 'how' | 'materials' | 'faq' | 'refund';

const routeHashMap: Record<AppRoute, string> = {
  home: '',
  create: '#create',
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

function AppContent() {
  const [route, setRoute] = useState<AppRoute>('create');
  const [isRouteReady, setIsRouteReady] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsPayload | null>(null);
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
        {route === 'faq' && <Faq onNavigate={navigate} />}
        {route === 'refund' && <RefundPolicy onNavigate={navigate} />}
        {route === 'create' && (
          <Create
            onNavigate={navigate}
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
                setCheckoutOrder(submission);
                navigate('success');
              }}
            />
          ) : (
            <Create
              onNavigate={navigate}
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
