import type { Metadata } from 'next';
import { PublicationAbout } from '../../publication';

export const metadata: Metadata = {
  title: 'About me — Inference Notes',
  description: 'Adriano: statistics, machine learning, and a notebook of ideas to test.',
};

export default function AboutPage() { return <PublicationAbout locale="en"/>; }
