import React from 'react';
import { getHeadingFont, getButtonClasses, getInputClasses } from '../utils/theme';
import BrandLogo from './BrandLogo';

type FooterRoute = 'home' | 'create' | 'details' | 'checkout' | 'success' | 'about' | 'how' | 'materials' | 'faq' | 'refund' | 'contact';

export default function Footer({
  onNavigate,
}: {
  onNavigate: (route: FooterRoute) => void;
}) {
  const footerLinkClass = 'text-[#6B6155]/82 transition-colors hover:text-[#31271F]';

  return (
    <footer className="w-full border-t border-[#DCCFBC] bg-[#FBF8F3] pb-12 pt-16 text-[#2D241B]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:px-10">
        
        {/* Brand */}
        <div className="lg:col-span-4">
          <button
            type="button"
            aria-label="Go to ViewBrush home"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center rounded-[2px] transition-opacity hover:opacity-95"
          >
            <BrandLogo variant="footer" decorative />
          </button>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6A6155]">
            A clear vision. A human touch. Preview the direction first, then bring it to life as a finished piece for the wall it lives on.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="lg:col-span-2">
          <h3 className={`mb-6 font-semibold ${getHeadingFont()}`}>Company</h3>
          <ul className="space-y-4 text-sm">
            <li><button type="button" onClick={() => onNavigate('about')} className={footerLinkClass}>About Us</button></li>
            <li><button type="button" onClick={() => onNavigate('how')} className={footerLinkClass}>How It Works</button></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="lg:col-span-2">
          <h3 className={`mb-6 font-semibold ${getHeadingFont()}`}>Support</h3>
          <ul className="space-y-4 text-sm">
            <li><button type="button" onClick={() => onNavigate('contact')} className={footerLinkClass}>Contact Us</button></li>
            <li><button type="button" onClick={() => onNavigate('faq')} className={footerLinkClass}>FAQ</button></li>
            <li><button type="button" onClick={() => onNavigate('refund')} className={footerLinkClass}>Refund Policy</button></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-4">
          <h3 className={`mb-4 font-semibold ${getHeadingFont()}`}>$10 off your first order</h3>
          <p className="opacity-60 text-sm mb-6 max-w-sm leading-relaxed">
            Join our family of pet lovers and get exclusive offers.
          </p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className={getInputClasses('flex-1 bg-[#F4ECDD]')}
              required
            />
            <button type="submit" className={getButtonClasses('primary', 'whitespace-nowrap px-6 py-3')}>
              Join
            </button>
          </form>
        </div>

      </div>

      <div className="mx-auto mt-16 flex w-full max-w-[1600px] border-t border-[#DCCFBC] px-6 pt-8 text-xs opacity-50 lg:px-10">
        <p>&copy; {new Date().getFullYear()} ViewBrush. All rights reserved.</p>
      </div>
    </footer>
  );
}
