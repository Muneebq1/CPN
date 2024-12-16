import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      subscriptionRed: '#C41208',
      grayText: '#C4C4C4',
      offWhite: '#E5E5E5',
      lightGray: '#6C6C6C',
      grayBackground: '#141414',
      grayNormal: '#444444',
      darkGrayText: '#8D8D92',
      blueIcon: '#0087FF',
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
    },
    backgroundImage: {
      footerGradient:
        'linear-gradient(180deg, rgba(20, 20, 20, 0.2) 15.49%, rgba(196, 18, 8, 0.4) 130.99%)',
      // background: linear-gradient(180deg, rgba(20, 20, 20, 0.5) 15.49%, rgba(196, 18, 8, 0.07) 130.99%);

      heroMobile: 'url("src/assets/jpgs/mobileScreenBg.png")',
    },
  },
};
