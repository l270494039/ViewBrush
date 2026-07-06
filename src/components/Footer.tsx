import React from 'react';
import { getHeadingFont, getButtonClasses, getInputClasses } from '../utils/theme';
import BrandLogo from './BrandLogo';

type FooterRoute = 'home' | 'create' | 'details' | 'checkout' | 'success' | 'about' | 'how' | 'materials' | 'faq' | 'refund';

export default function Footer({
  onNavigate,
}: {
  onNavigate: (route: FooterRoute) => void;
}) {
  return (
    <footer className="w-full border-t border-[#DCCFBC] bg-[#FBF8F3] px-6 pb-12 pt-16 text-[#2D241B]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Brand */}
        <div className="lg:col-span-4">
          <BrandLogo variant="footer" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6A6155]">
            A clear vision. A human touch. Preview the direction first, then bring it to life as a finished piece for the wall it lives on.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="lg:col-span-2">
          <h3 className={`mb-6 font-semibold ${getHeadingFont()}`}>Company</h3>
          <ul className="space-y-4 text-sm opacity-60">
            <li><button type="button" onClick={() => onNavigate('about')} className="hover:opacity-100 transition-opacity">About Us</button></li>
            <li><button type="button" onClick={() => onNavigate('how')} className="hover:opacity-100 transition-opacity">How It Works</button></li>
            <li><button type="button" onClick={() => onNavigate('faq')} className="hover:opacity-100 transition-opacity">FAQ</button></li>
            <li><button type="button" onClick={() => onNavigate('refund')} className="hover:opacity-100 transition-opacity">Refund Policy</button></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="lg:col-span-2">
          <h3 className={`mb-6 font-semibold ${getHeadingFont()}`}>Support</h3>
          <ul className="space-y-4 text-sm opacity-60">
            <li><button type="button" onClick={() => onNavigate('refund')} className="hover:opacity-100 transition-opacity">Refund Policy</button></li>
            <li><button type="button" onClick={() => onNavigate('faq')} className="hover:opacity-100 transition-opacity">Shipping FAQ</button></li>
            <li><button type="button" onClick={() => onNavigate('refund')} className="hover:opacity-100 transition-opacity">Revisions & Returns</button></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-4 lg:pl-12">
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
      
      <div className="mx-auto mt-16 flex max-w-[1600px] border-t border-[#DCCFBC] pt-8 text-xs opacity-50">
        <p>&copy; {new Date().getFullYear()} ViewBrush. All rights reserved.</p>
      </div>
    </footer>
  );
}
