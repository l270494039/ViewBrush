import imgHowItWorksStep01 from '../assets/images/how-it-works-step-01.webp';
import imgHowItWorksStep02 from '../assets/images/how-it-works-step-02.webp';
import imgHowItWorksStep03 from '../assets/images/how-it-works-step-03.webp';
import imgHowItWorksStep04 from '../assets/images/how-it-works-step-04.webp';

export type HowItWorksStepCardItem = {
  number: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export const howItWorksStepCards: HowItWorksStepCardItem[] = [
  {
    number: '01',
    title: 'Upload Your Photo',
    body: 'Start with a photo that matters to you - a wedding day, a beloved pet, a family moment, or someone you want to keep close.',
    image: imgHowItWorksStep01,
    imageAlt: 'Upload your photo',
  },
  {
    number: '02',
    title: 'Shape Your Vision',
    body: 'Explore the painterly direction that feels right for you.',
    image: imgHowItWorksStep02,
    imageAlt: 'Shape your vision',
  },
  {
    number: '03',
    title: 'See It in Your Space',
    body: 'Visualize how your chosen painting may look in your home before it is brought to life on canvas.',
    image: imgHowItWorksStep03,
    imageAlt: 'See it in your space',
  },
  {
    number: '04',
    title: 'Choose Your Size, Frame, and Approve',
    body: 'Select the canvas size and frame that fit your space. Make any final adjustments, then approve the creative direction before your artist begins painting.',
    image: imgHowItWorksStep04,
    imageAlt: 'Frame and finishing details for approval',
  },
];
