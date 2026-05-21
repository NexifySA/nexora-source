import type { Metadata } from 'next';
import { PricingPageClient } from '@gitroom/frontend/components/marketing/pricing.page.client';

// Forzar render dinamico: la pagina lee process.env.BILLING_PROVIDER que
// solo existe en runtime. Si se prerenderiza en build (default de Next.js
// para server components sin dependencias dinamicas), billingEnabled queda
// horneado como false porque el env no esta seteado durante el build.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Planes y Precios — Nexpost',
  description:
    'Planes de Nexpost para gestionar tus redes sociales. Trial gratis 14 días. Cobrado por dLocal Go.',
  alternates: { canonical: 'https://nexpost.com.ar/pricing' },
};

export default function PricingPage() {
  return (
    <PricingPageClient billingEnabled={!!process.env.BILLING_PROVIDER} />
  );
}
