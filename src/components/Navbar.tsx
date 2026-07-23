import React, { useEffect, useState } from 'react';
import { getButtonClasses } from '../utils/theme';
import { Menu, ShoppingBag, User, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

type NavRoute = 'home' | 'create' | 'cart' | 'account' | 'details' | 'checkout' | 'success' | 'about' | 'how' | 'faq' | 'refund';

type NavItem = { label: string; route: NavRoute | 'materials' };

const navItems: NavItem[] = [
  { label: 'Home', route: 'home' },
  { label: 'How It Works', route: 'how' },
  { label: 'FAQ', route: 'faq' },
  { label: 'About ViewBrush', route: 'about' },
];

const utilityItems = [
  { label: 'Account', Icon: User },
  { label: 'Cart', Icon: ShoppingBag },
];

export default function Navbar({
  currentRoute,
  hasCartItems,
  onNavigate,
}: {
  currentRoute: NavRoute | 'materials';
  hasCartItems: boolean;
  onNavigate: (r: NavRoute | 'materials') => void;
}) {
  const ctaLabel = 'Create Artwork';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavItemSelect = (item: NavItem) => {
    onNavigate(item.route);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 z-40 w-full border-b border-[#D8CDBB] bg-[#F6F0E7]/92 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:px-10">
          <div className="flex min-w-0 items-center">
            <button
              type="button"
              aria-label="Go to ViewBrush home"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center rounded-[2px] transition-opacity hover:opacity-95"
            >
              <span className="sr-only">ViewBrush</span>
              <BrandLogo variant="nav" decorative />
            </button>
          </div>

          <ul className="ml-auto hidden items-center justify-end gap-8 pr-8 text-[16px] font-medium lg:flex xl:pr-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => handleNavItemSelect(item)}
                  className={`whitespace-nowrap transition-colors ${
                    'route' in item && item.route === currentRoute
                      ? 'text-[#31271F]'
                      : 'route' in item
                        ? 'text-[#6B6155]/82 hover:text-[#31271F]'
                        : 'text-[#6B6155]/82 hover:text-[#31271F]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3 md:gap-4 lg:gap-5">
            <button
              type="button"
              aria-label="Account"
              onClick={() => onNavigate('account')}
              className={`hidden transition-colors lg:inline-flex ${
                currentRoute === 'account'
                  ? 'text-[#31271F]'
                  : 'text-[#5F564A]/88 hover:text-[#31271F]'
              }`}
            >
              <User size={18} />
            </button>
            <button
              type="button"
              aria-label="Cart"
              onClick={() => onNavigate('cart')}
              className={`relative hidden transition-colors lg:inline-flex ${
                currentRoute === 'cart'
                  ? 'text-[#31271F]'
                  : 'text-[#5F564A]/88 hover:text-[#31271F]'
              }`}
            >
              <ShoppingBag size={18} />
              {hasCartItems && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#D12B2B]" />}
            </button>
            <button
              onClick={() => onNavigate('create')}
              className={`${getButtonClasses('primary', 'px-3.5 py-2 text-[12px] font-semibold whitespace-nowrap sm:px-5 sm:text-sm')} max-w-[9.75rem]`}
            >
              {ctaLabel}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#DCCFBC] bg-white/78 text-[#5F564A] transition hover:bg-white lg:hidden"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-[#2D241B]/30 backdrop-blur-[2px]"
          />
          <div className="absolute inset-x-4 top-20 overflow-hidden rounded-[12px] border border-[#DCCFBC] bg-[#FBF8F3] shadow-[0_28px_60px_rgba(43,31,21,0.18)]">
            <div className="border-b border-[#E8DECF] px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8F816C]">Menu</p>
            </div>
            <div className="flex flex-col p-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavItemSelect(item)}
                  className={`flex items-center justify-between rounded-[8px] px-4 py-3 text-left text-sm transition ${
                    item.route === currentRoute
                      ? 'bg-[#31271F] text-[#FBF8F3]'
                      : 'text-[#2D241B] hover:bg-[#F3EBDE]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-[#E8DECF] p-2">
              {utilityItems.map(({ label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (label === 'Account') {
                      onNavigate('account');
                      setIsMobileMenuOpen(false);
                    }
                    if (label === 'Cart') {
                      onNavigate('cart');
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="flex w-full items-center gap-3 rounded-[8px] px-4 py-3 text-left text-sm text-[#2D241B] transition hover:bg-[#F3EBDE]"
                >
                  <span className="relative inline-flex items-center gap-3">
                    <Icon size={16} className="text-[#6B6155]" />
                    <span>{label}</span>
                    {label === 'Cart' && hasCartItems && <span className="h-2 w-2 rounded-full bg-[#D12B2B]" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
