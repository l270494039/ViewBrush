import React from 'react';

import lockup from '../assets/branding/viewbrush-logo-full-20260713.webp';

type BrandLogoVariant = 'nav' | 'footer';

export default function BrandLogo({
  variant = 'nav',
  decorative = false,
  className = '',
}: {
  variant?: BrandLogoVariant;
  decorative?: boolean;
  className?: string;
}) {
  const logoAlt = decorative ? '' : 'ViewBrush';

  if (variant === 'footer') {
    return (
      <img
        src={lockup}
        alt={logoAlt}
        aria-hidden={decorative ? 'true' : undefined}
        className={`h-[34px] w-auto object-contain md:h-[40px] ${className}`}
      />
    );
  }

  return (
    <img
      src={lockup}
      alt={logoAlt}
      aria-hidden={decorative ? 'true' : undefined}
      className={`h-[28px] w-auto object-contain md:h-[32px] ${className}`}
    />
  );
}
