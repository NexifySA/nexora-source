import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { Fraunces } from 'next/font/google';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import Link from 'next/link';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));

const fraunces = Fraunces({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

// Nexpost auth layout — light, editorial.
// Reemplaza el split dark de Postiz upstream.
// El background y la composición están alineados con la landing comercial.
export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await getT();

  return (
    <div
      className="flex min-h-screen w-screen"
      style={{
        background: 'linear-gradient(135deg, #FDFBF7 0%, #EFF6FF 100%)',
        color: '#0F172A',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <ReturnUrlComponent />

      {/* Form panel — class "light" hace que los inputs Postiz usen tokens light (bg blanco, texto oscuro) */}
      <div
        className="light flex flex-col flex-1 lg:w-[540px] lg:flex-none"
        style={{
          padding: '40px 32px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          borderRight: '1px solid rgba(226, 232, 240, 0.7)',
        }}
      >
        <div className="w-full max-w-[440px] mx-auto justify-center gap-[24px] h-full flex flex-col">
          <Link
            href="/"
            className="flex items-center gap-[10px] mb-2"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <LogoTextComponent />
          </Link>
          <div className="flex">{children}</div>

          <div
            className="mt-auto pt-6 text-[12.5px]"
            style={{ color: '#64748B', borderTop: '1px solid #E2E8F0' }}
          >
            <Link
              href="/"
              style={{ color: '#475569', textDecoration: 'none', fontWeight: 500 }}
              className="hover:underline"
            >
              ← Volver a la home
            </Link>
            <span style={{ margin: '0 10px' }}>·</span>
            <span>Nexpost by Nexify</span>
          </div>
        </div>
      </div>

      {/* Editorial / atmosphere panel — solo desktop */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{ padding: '64px 56px' }}
      >
        {/* Mesh atmospheric */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(60% 50% at 22% 18%, rgba(37, 99, 235, 0.18) 0%, transparent 60%), radial-gradient(45% 45% at 78% 78%, rgba(6, 182, 212, 0.18) 0%, transparent 60%), radial-gradient(50% 40% at 50% 100%, rgba(253, 224, 71, 0.10) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Floating orbs */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '12%',
            right: '10%',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '14%',
            left: '8%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: 520,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.18)',
              color: '#1E40AF',
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: '0.02em',
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: '#2563EB',
                boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.22)',
              }}
            />
            Social media management · by Nexify
          </div>

          <h2
            className={fraunces.className}
            style={{
              fontSize: 44,
              fontWeight: 500,
              lineHeight: 1.1,
              color: '#0F172A',
              margin: '0 0 22px',
              letterSpacing: '-0.02em',
            }}
          >
            Diseñá. Programá.{' '}
            <em
              style={{
                fontStyle: 'italic',
                color: '#2563EB',
                fontWeight: 400,
              }}
            >
              Que el contenido trabaje por vos.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: '#475569',
              margin: '0 0 36px',
              maxWidth: 460,
            }}
          >
            Nexpost reúne calendario editorial, IA y publicación multi-canal en un solo
            panel. Cero saltos entre apps.
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {[
              'Calendario editorial visual',
              '16+ canales sociales',
              'IA copilot para texto, imagen y video',
              'API, webhooks y automatizaciones',
            ].map((feat) => (
              <li
                key={feat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 15,
                  color: '#0F172A',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: 'rgba(37, 99, 235, 0.12)',
                    color: '#2563EB',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✓
                </span>
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
