import type { Metadata } from 'next';
import { visualFonts } from '../visual-fonts';
import { DesignReview } from './review';
import './review.css';


export const metadata: Metadata = { title: 'Três caminhos visuais · 1994', robots: { index: false, follow: false } };

export default function DirectionsPage() {
  return <div className={visualFonts}><DesignReview /></div>;
}
