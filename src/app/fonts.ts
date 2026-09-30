import localFont from 'next/font/local';
import { Manrope, Outfit } from 'next/font/google';

export const nohemi = localFont({
  src: [
    {
      path: '../../public/fonts/Nohemi-Regular-BF6a4e01a26b011.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nohemi-Medium-BF6a4e01a26b011.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-nohemi',
  display: 'swap',
});

export const oakesGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/Oakes Grotesk Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Oakes Grotesk Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Oakes Grotesk Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Oakes Grotesk SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Oakes Grotesk Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-oakes-grotesk',
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});
