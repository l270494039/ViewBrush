type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type BgVariant = 'main' | 'subtle' | 'inverted' | 'accent';

const buttonVariants = new Set<ButtonVariant>(['primary', 'secondary', 'outline', 'ghost']);
const bgVariants = new Set<BgVariant>(['main', 'subtle', 'inverted', 'accent']);

export const getHeadingFont = (_theme?: string) => 'font-sans font-semibold tracking-[-0.03em]';

export const getLabelClasses = (_theme?: string) => 'mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F816C]';

export const getInputClasses = (className = '') =>
  `w-full rounded-[4px] border border-[#DCCFBC] bg-[#FFFDF9] px-4 py-3 text-sm text-[#2D241B] outline-none transition-colors duration-200 focus:border-[#31271F] ${className}`;

export const getBackButtonClasses = (className = '') =>
  `button-lift inline-flex items-center gap-1.5 rounded-[8px] border border-[#DCCFBC] bg-white/92 px-3.5 py-2 text-[#2D241B] shadow-[0_8px_18px_rgba(42,31,22,0.06)] backdrop-blur transition-colors duration-200 hover:bg-white ${className}`;

export const getBadgeClasses = (className = '') =>
  `inline-flex items-center gap-2 rounded-[8px] border border-[#E4D8CA] bg-[#FBF7F0] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5F564A] ${className}`;

export const getButtonClasses = (
  themeOrVariant?: string,
  variantOrClassName: ButtonVariant | string = 'primary',
  classNameMaybe = ''
) => {
  const base = 'button-lift inline-flex items-center justify-center rounded-[8px] font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-50';
  const variant = buttonVariants.has(themeOrVariant as ButtonVariant)
    ? (themeOrVariant as ButtonVariant)
    : buttonVariants.has(variantOrClassName as ButtonVariant)
      ? (variantOrClassName as ButtonVariant)
      : 'primary';
  const className = buttonVariants.has(themeOrVariant as ButtonVariant) ? (variantOrClassName as string) : classNameMaybe;

  if (variant === 'primary') return `${base} bg-[#31271F] px-6 py-3 text-[#FBF8F3] hover:bg-[#241C16] ${className}`;
  if (variant === 'secondary') return `${base} bg-[#EDE3D5] px-6 py-3 text-[#2D241B] hover:bg-[#E4D7C6] ${className}`;
  if (variant === 'outline') return `${base} border border-[#DCCFBC] bg-white/72 px-6 py-3 text-[#2D241B] hover:bg-[#F3EBDE] ${className}`;
  return `${base} px-4 py-2 text-[#5F5549] hover:bg-[#EDE3D5] ${className}`;
};

export const getCardClasses = (_theme?: string) => 'rounded-[2px] border border-[#DCCFBC] bg-white shadow-[0_10px_24px_rgba(56,42,29,0.05)]';

export const getBgClasses = (themeOrVariant?: string, variantMaybe: BgVariant = 'main') => {
  const variant = bgVariants.has(themeOrVariant as BgVariant) ? (themeOrVariant as BgVariant) : variantMaybe;

  if (variant === 'main') return 'bg-[#F6F0E7] text-[#2D241B] font-sans';
  if (variant === 'subtle') return 'bg-[#EEE5D8] text-[#2D241B] font-sans';
  if (variant === 'inverted') return 'bg-[#2D241B] text-[#FBF8F3] font-sans';
  return 'bg-[#A58964] text-white font-sans';
};
