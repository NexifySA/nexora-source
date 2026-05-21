'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import { pricing } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/pricing';

type Period = 'MONTHLY' | 'YEARLY';

interface PlanCfg {
  id: string;
  badge?: string;
  cta: string;
  ctaHref?: string;
  highlight?: boolean;
}

const VISIBLE_PLANS: PlanCfg[] = [
  {
    id: 'FREE',
    badge: 'Trial 14 días',
    cta: 'Empezar gratis',
    ctaHref: '/auth',
  },
  { id: 'STANDARD', cta: 'Suscribirme' },
  { id: 'TEAM', cta: 'Suscribirme', highlight: true },
  { id: 'PRO', cta: 'Suscribirme' },
  { id: 'ULTIMATE', cta: 'Suscribirme' },
];

const CARD: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  padding: 28,
  background: 'rgba(255,255,255,0.02)',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  minHeight: 420,
};

const FEATURE: React.CSSProperties = {
  fontSize: 14,
  color: 'rgba(255,255,255,0.75)',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

function planFeatures(plan: (typeof pricing)[string]) {
  const out: string[] = [];
  if (plan.channel) out.push(`${plan.channel} canales sociales`);
  if (plan.posts_per_month >= 1000000) out.push('Posts ilimitados');
  else if (plan.posts_per_month) out.push(`${plan.posts_per_month} posts/mes`);
  if (plan.team_members) out.push('Equipos');
  if (plan.public_api) out.push('API pública');
  if (plan.webhooks) out.push(`${plan.webhooks} webhooks`);
  if (plan.autoPost) out.push('Auto-post');
  return out;
}

export const PricingPageClient: FC<{ billingEnabled: boolean }> = ({
  billingEnabled,
}) => {
  const [period, setPeriod] = useState<Period>('MONTHLY');

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '60px 24px 80px',
        color: 'var(--nx-text, #fff)',
      }}
    >
      <h1
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 48,
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        Planes simples para crecer
      </h1>
      <p
        style={{
          fontSize: 18,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: 24,
          maxWidth: 640,
        }}
      >
        Empezá gratis con un canal por 14 días. Cuando estés listo, elegí el
        plan que mejor encaja con tu volumen. Cobro vía dLocal Go (acepta
        tarjetas argentinas en pesos).
      </p>

      {/* Toggle MONTHLY / YEARLY */}
      <div
        role="tablist"
        aria-label="Periodo de facturación"
        style={{
          display: 'inline-flex',
          padding: 4,
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
          marginBottom: 32,
          gap: 4,
        }}
      >
        {(['MONTHLY', 'YEARLY'] as const).map((p) => {
          const active = period === p;
          return (
            <button
              key={p}
              role="tab"
              aria-selected={active}
              onClick={() => setPeriod(p)}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                background: active ? '#fff' : 'transparent',
                color: active ? '#000' : 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {p === 'MONTHLY' ? 'Mensual' : 'Anual'}
              {p === 'YEARLY' && (
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 11,
                    padding: '2px 6px',
                    borderRadius: 99,
                    background: active
                      ? 'rgba(34,197,94,0.2)'
                      : 'rgba(34,197,94,0.15)',
                    color: '#22c55e',
                  }}
                >
                  ~2 meses gratis
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}
      >
        {VISIBLE_PLANS.map((cfg) => {
          const plan = pricing[cfg.id];
          if (!plan) return null;
          const isFree = plan.month_price === 0;
          const price =
            period === 'YEARLY' ? plan.year_price : plan.month_price;
          const buttonDisabled = !isFree && !billingEnabled;
          const buttonHref = isFree
            ? cfg.ctaHref || '/auth'
            : `/billing?plan=${cfg.id}&period=${period}`;

          return (
            <div
              key={cfg.id}
              style={{
                ...CARD,
                border: cfg.highlight
                  ? '1px solid rgba(99,102,241,0.6)'
                  : CARD.border,
                background: cfg.highlight
                  ? 'rgba(99,102,241,0.08)'
                  : CARD.background,
              }}
            >
              {cfg.badge && (
                <span
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: 12,
                    padding: '4px 10px',
                    borderRadius: 99,
                    background: 'rgba(34,197,94,0.15)',
                    color: '#22c55e',
                  }}
                >
                  {cfg.badge}
                </span>
              )}
              <h2 style={{ fontSize: 22, fontWeight: 600 }}>{cfg.id}</h2>
              <div>
                <span style={{ fontSize: 36, fontWeight: 700 }}>
                  US$ {price}
                </span>
                <span
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}
                >
                  {' '}
                  {isFree
                    ? ''
                    : period === 'YEARLY'
                    ? '/año'
                    : '/mes'}
                </span>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  flex: 1,
                }}
              >
                {planFeatures(plan).map((f) => (
                  <li key={f} style={FEATURE}>
                    <span>✓</span> {f}
                  </li>
                ))}
              </ul>
              {buttonDisabled ? (
                <button
                  disabled
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.4)',
                    cursor: 'not-allowed',
                    border: 'none',
                  }}
                  title="Billing aún no habilitado"
                >
                  Próximamente
                </button>
              ) : (
                <Link
                  href={buttonHref}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: cfg.highlight ? '#6366f1' : '#fff',
                    color: cfg.highlight ? '#fff' : '#000',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  {cfg.cta}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <p
        style={{
          marginTop: 40,
          fontSize: 13,
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        Precios mostrados en USD. dLocal Go convierte automáticamente al
        método de pago local. IVA y percepciones según corresponda en tu país.
      </p>
    </main>
  );
};
