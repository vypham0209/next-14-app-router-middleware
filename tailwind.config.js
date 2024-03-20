// const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path');
const sharedConfig = require('../../packages/shared/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../../packages/shared/src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    // ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-outfit)', 'sans-serif'],
      ...sharedConfig.theme.fontFamily,
    },
    screens: sharedConfig.theme.screens,
    extend: {
      dropShadow: sharedConfig.theme.extend.dropShadow,
      boxShadow: sharedConfig.theme.extend.boxShadow,
      screens: sharedConfig.theme.extend.screens,
      fontSize: sharedConfig.theme.extend.fontSize,
      colors: sharedConfig.theme.extend.colors,
      flexBasis: sharedConfig.theme.extend.flexBasis,
      opacity: sharedConfig.theme.extend.opacity,
      minWidth: sharedConfig.theme.extend.minWidth,
      maxWidth: sharedConfig.theme.extend.maxWidth,
      zIndex: sharedConfig.theme.extend.zIndex,
      lineClamp: sharedConfig.theme.extend.lineClamp,
      backgroundImage: {
        'image-banner-for-desktop': "url('/img/banner/banner-desktop.webp')",
        'image-banner-for-big-desktop': "url('/img/banner/banner-big-desktop.webp')",
        'image-banner-for-mobile': "url('/img/banner/banner-mobile.webp')",
        'ordinary-mobile-image': "url('/img/inspiring/ordinary-mobile.webp')",
        'ordinary-image': "url('/img/inspiring/ordinary.webp')",
        'healthy-mobile-image': "url('/img/inspiring/healthy-mobile.webp')",
        'healthy-image': "url('/img/inspiring/healthy.webp')",
        'vegetarian-mobile-image': "url('/img/inspiring/vegetarian-mobile.webp')",
        'vegetarian-image': "url('/img/inspiring/vegetarian.webp')",
        'vegan-mobile-image': "url('/img/inspiring/vegan-mobile.webp')",
        'vegan-image': "url('/img/inspiring/vegan.webp')",
        founder: `url('/img/founder/image.webp')`,
        'founder-desktop': `url('/img/founder/image-desktop.webp')`,
        'download-app': `url('/img/download-app/image.webp')`,
        'download-app-desktop': `url('/img/download-app/image-desktop.webp')`,
        'download-app-overlay': `linear-gradient(360deg, rgba(0, 0, 0, 0.50) 55.70%, rgba(0, 0, 0, 0.19) 88.41%, rgba(0, 0, 0, 0.00) 100%)`,
        'download-app-overlay-desktop': `linear-gradient(90deg, rgba(0, 0, 0, 0.50) 55.70%, rgba(0, 0, 0, 0.19) 88.41%, rgba(0, 0, 0, 0.00) 100%)`,
        'download-app-overlay-desktop-rtl': `linear-gradient(270deg, rgba(0, 0, 0, 0.50) 55.70%, rgba(0, 0, 0, 0.19) 88.41%, rgba(0, 0, 0, 0.00) 100%)`,
        'subscribe-top-left': `url('/img/subscribe/top-left.webp')`,
        'subscribe-top-left-desktop': `url('/img/subscribe/top-left-desktop.webp')`,
        'subscribe-bottom-right': `url('/img/subscribe/bottom-right.webp')`,
        'subscribe-bottom-right-desktop': `url('/img/subscribe/bottom-right-desktop.webp')`,
        'background-slide-section-mobile': `url('/img/slide/background.webp')`,
        'background-slide-section-desktop': `url('/img/slide/background-desktop.webp')`,
        'slide-overlay': `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 11.14%, rgba(0, 0, 0, 0) 99.67%)`,
        'overlay-gradient-auth': `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 56.98%)`,
        'show-more': 'linear-gradient(270deg, #FAF4EF 72.2%, rgba(250, 244, 239, 0) 97.04%);',
        skeleton: 'linear-gradient(90.07deg, #F5EADF 74.98%, rgba(245, 234, 223, 0) 99.95%)',
      },
      animation: {
        ...sharedConfig.theme.extend.animation,
        'open-sidebar': 'open-sidebar 0.3s',
        // Toast
        'toast-hide': 'toast-hide 100ms ease-in forwards',
        'toast-slide-in-right': 'toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        //radix
        'slide-down': 'slide-down 200ms ease-out',
        'slide-up': 'slide-up 200ms ease-out',
      },
      keyframes: {
        ...sharedConfig.theme.extend.keyframes,
        //radix
        'slide-down': {
          '0%': {
            height: '0',
          },
          '100%': {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'slide-up': {
          '0%': {
            height: 'var(--radix-accordion-content-height)',
          },
          '100%': {
            height: '0',
          },
        },
        'open-sidebar': {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.9 },
        },
        'inspiring-hover': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            bottom: '50%',
          },
        },
        // Toast
        'toast-slide-in-right': {
          '0%': { transform: `translateX(calc(100% + 1rem))` },
          '100%': { transform: 'translateX(0)' },
        },
        'toast-hide': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [...sharedConfig.plugins],
};
