import type { Metadata } from 'next';
import { visualFonts } from '../visual-fonts';
import { IdentityPreview } from './preview';
import '../caderno/preview.css';
import './identities.css';

export const metadata: Metadata = { title: 'Cinco identidades · Adriano', robots: { index: false, follow: false } };
export default function IdentitiesPage() {
  return <div className={visualFonts}><IdentityPreview /></div>;
}
