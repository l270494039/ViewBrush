import React from 'react';

import lockup from '../assets/branding/viewbrush-lockup-temp.png';

type BrandLogoVariant = 'nav' | 'footer';

export default function BrandLogo({
  variant = 'nav',
  decorative = false,
}: {
  variant?: BrandLogoVariant;
  decorative?: boolean;
}) {
  const logoAlt = decorative ? '' : 'ViewBrush';

  if (variant === 'footer') {
    return (
      <img
        src={lockup}
        alt={logoAlt}
        aria-hidden={decorative ? 'true' : undefined}
        className="h-[36px] w-auto object-contain"
      />
    );
  }

  return (
    <img
      src={lockup}
      alt={logoAlt}
      aria-hidden={decorative ? 'true' : undefined}
      className="h-[33px] w-auto object-contain md:h-[36px]"
    />
  );
}
