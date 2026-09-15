import { DM_Sans, Instrument_Serif, Manrope, Source_Serif_4 } from 'next/font/google';

const source = Source_Serif_4({ subsets: ['latin'], variable: '--review-source', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--review-instrument', display: 'swap' });
const dm = DM_Sans({ subsets: ['latin'], variable: '--review-dm', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--review-manrope', display: 'swap' });
export const visualFonts = `${source.variable} ${instrument.variable} ${dm.variable} ${manrope.variable}`;
