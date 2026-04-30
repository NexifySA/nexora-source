import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import '../global.scss';
import './landing.css';

// Layout standalone para landing comercial Nexpost.
// NO importa providers internos (LayoutContext, sentry, etc.) — la landing es
// estática/pública. Tipografía: Fraunces (display, editorial) + PJS (body, moderno).

const jakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const fraunces = Fraunces({
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nexpost — Social media management by Nexify',
  description:
    'Planificá, publicá y analizá contenido en múltiples redes sociales con Nexpost, la plataforma de social media management by Nexify.',
  metadataBase: new URL('https://nexpost.com.ar'),
  openGraph: {
    title: 'Nexpost — Social media management by Nexify',
    description: 'Social media management by Nexify',
    url: 'https://nexpost.com.ar',
    siteName: 'Nexpost',
    images: ['/og-image.svg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexpost',
    description: 'Social media management by Nexify',
    images: ['/og-image.svg'],
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="nx-landing-body">{children}</body>
    </html>
  );
}
