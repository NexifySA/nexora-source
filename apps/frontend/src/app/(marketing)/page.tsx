import Link from 'next/link';

// Nexpost landing — refinada con principios del skill creative-design/frontend-design.
// Paleta: cream + slate-50 + white + accent blue/cyan. NO fondos negros.
// Tipografía: Fraunces (display, editorial) + Plus Jakarta (body).
// Atmósfera: gradient mesh + grain + orbs flotantes + stagger reveal.

const CHANNELS = [
  'LinkedIn', 'Instagram', 'Facebook', 'X / Twitter', 'YouTube', 'TikTok',
  'Pinterest', 'Reddit', 'Discord', 'Slack', 'Mastodon', 'GitHub',
  'WordPress', 'Medium', 'Dev.to', 'Bluesky',
];

const PLANS = [
  {
    name: 'Standard', price: 29, audience: 'Para creadores de contenido',
    popular: false,
    features: [
      '5 canales', '400 posts por mes', 'Editor avanzado de imágenes',
      'AI copilot', '3 videos IA por mes', 'Integraciones personalizadas',
      'API y webhooks', 'Comentarios en posts', 'Posts repetidos y delays',
      'Cualquier canal disponible', 'Smart Agent + Cross posting',
      'Plugs internos / globales', 'Analytics, vista calendario',
      'Dark / Light mode', 'RSS auto-post, sets, firmas',
    ],
  },
  {
    name: 'Team', price: 39, audience: 'Para marcas pequeñas',
    popular: false,
    features: [
      '10 canales', 'Posts ilimitados', 'Miembros de equipo ilimitados',
      '100 imágenes IA por mes', '10 videos IA por mes', 'Todo lo de Standard',
    ],
  },
  {
    name: 'Pro', price: 49, audience: 'Para empresas en crecimiento',
    popular: false,
    features: [
      '30 canales', 'Posts ilimitados', 'Miembros ilimitados',
      '300 imágenes IA por mes', '30 videos IA por mes', 'Todo lo de Team',
    ],
  },
  {
    name: 'Ultimate', price: 99, audience: 'Para agencias',
    popular: true,
    features: [
      '100 canales', 'Posts ilimitados', 'Miembros ilimitados',
      '500 imágenes IA por mes', '60 videos IA por mes', 'Todo lo de Pro',
    ],
  },
];

const FEATURES = [
  {
    n: '01',
    t: 'Calendario editorial',
    d: 'Vista calendario con drag & drop. Coordiná campañas semanales y mensuales sin hojas de cálculo.',
  },
  {
    n: '02',
    t: 'Un solo panel, todas las redes',
    d: 'LinkedIn, Instagram, Facebook, X, YouTube, TikTok y más. Publicación cruzada automática donde corresponda.',
  },
  {
    n: '03',
    t: 'IA que acompaña',
    d: 'Copilot para texto, generación de imagen y video corto. Cupos mensuales según plan.',
  },
  {
    n: '04',
    t: 'Analytics útiles',
    d: 'Métricas reales por canal y por post. Reportes exportables, sin ruido.',
  },
  {
    n: '05',
    t: 'Colaboración sin fricción',
    d: 'Roles, aprobaciones, grupos de clientes para agencias. Dark/Light mode.',
  },
  {
    n: '06',
    t: 'API, webhooks y automatización',
    d: 'Integrá Nexpost con tu stack. Triggers programáticos, webhooks salientes y API documentada.',
  },
];

const STEPS = [
  { n: 1, t: 'Conectás tus redes', d: 'En minutos, con login OAuth de cada plataforma.' },
  { n: 2, t: 'Planificás contenido', d: 'Editor, sets, firmas, biblioteca de medios, IA.' },
  { n: 3, t: 'Programás publicaciones', d: 'Calendario visual, repetición, delays, cross-posting.' },
  { n: 4, t: 'Medís resultados', d: 'Analytics por canal y post. Decisiones basadas en datos.' },
];

const FAQS = [
  {
    q: '¿Nexpost publica usando mis redes?',
    a: 'Cada usuario conecta sus propias cuentas de redes sociales mediante OAuth y autoriza el permiso de publicación. Nexpost coordina la programación y el envío en tu nombre.',
  },
  {
    q: '¿Tengo que cargar mis credenciales de desarrollador?',
    a: 'No. Nexpost opera apps OAuth globales registradas por la plataforma. Vos solo conectás tu cuenta personal o profesional de cada red.',
  },
  {
    q: '¿Qué son las credenciales OAuth globales?',
    a: 'Son las apps que Nexify registra en cada red social (LinkedIn, X, Meta, etc.) para que sus usuarios puedan autorizar publicación. Permiten que el flujo "conectar cuenta" funcione sin que cada usuario registre una app propia.',
  },
  {
    q: '¿Puedo conectar cuentas de clientes?',
    a: 'Sí. Los planes Team, Pro y Ultimate incluyen miembros de equipo ilimitados y hasta 100 canales. Ideal para agencias que gestionan múltiples marcas.',
  },
  {
    q: '¿Qué redes soporta?',
    a: 'LinkedIn, Instagram, Facebook, X (Twitter), YouTube, TikTok, Pinterest, Reddit, Discord, Slack, Mastodon, GitHub, WordPress, Medium, Dev.to, Bluesky y más. La disponibilidad puede depender de aprobaciones del proveedor.',
  },
  {
    q: '¿Incluye IA?',
    a: 'Sí. AI copilot para textos en todos los planes; generación de imágenes y videos IA en planes pagos según los cupos mensuales.',
  },
  {
    q: '¿Puedo trabajar con equipo?',
    a: 'Desde el plan Team incluye miembros ilimitados, roles y workflow colaborativo. Pro y Ultimate suman más canales y cupos de IA.',
  },
  {
    q: '¿Puedo usarlo para agencia?',
    a: 'Ultimate está pensado para agencias: hasta 100 canales, miembros ilimitados, cupos de IA generosos, grupos de clientes y soporte multi-marca.',
  },
  {
    q: '¿Qué pasa si una red requiere aprobación?',
    a: 'Algunas redes (Meta, TikTok) requieren App Review antes de habilitar publicación en producción. Mientras dure, esa red puede no estar disponible para nuevas conexiones. Te avisamos en cada caso.',
  },
  {
    q: '¿Puedo pedir una implementación personalizada?',
    a: 'Sí. Escribinos a contacto@nexify.com.ar para implementaciones a medida, white-label completo, integraciones específicas u on-premise.',
  },
];

function LogoMark({ size = 36, dark = false }: Readonly<{ size?: number; dark?: boolean }>) {
  const rectFill = dark ? 'rgba(15,23,42,0.04)' : '#0F172A';
  const gradId = dark ? 'nx-g-d' : 'nx-g-l';
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={dark ? '#60A5FA' : '#2563EB'} />
          <stop offset="1" stopColor={dark ? '#22D3EE' : '#06B6D4'} />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="52" height="52" rx="13" fill={rectFill} />
      <path d="M17 44 V18 L34 39 V18 H44 V44 H34 L17 23 V44 Z" fill={`url(#${gradId})`} />
    </svg>
  );
}

function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(253, 251, 247, 0.78)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '18px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <LogoMark size={34} />
          <span className="nx-wordmark">
            <span className="nx-wordmark-main">Nexpost</span>
            <span className="nx-wordmark-sub">BY NEXIFY</span>
          </span>
        </Link>

        <nav className="nx-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#producto" className="nx-navlink">Producto</a>
          <a href="#canales" className="nx-navlink">Canales</a>
          <a href="#pricing" className="nx-navlink">Precios</a>
          <a href="#faq" className="nx-navlink">FAQ</a>
          <Link href="/auth/login" className="nx-navlink" style={{ color: 'var(--nx-text)', fontWeight: 600 }}>
            Ingresar
          </Link>
          <Link href="/auth" className="nx-btn-primary" style={{ padding: '11px 20px', fontSize: 14 }}>
            Empezar ahora
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="nx-mesh" />
      <div
        style={{
          position: 'relative',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '112px 32px 128px',
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            className="nx-display nx-rise nx-hero-title"
            style={{
              animationDelay: '0.05s',
              fontSize: 68,
              lineHeight: 1.02,
              fontWeight: 500,
              color: 'var(--nx-text)',
              margin: '0 0 24px',
              maxWidth: 620,
            }}
          >
            Contenido que se <em style={{ fontStyle: 'italic', color: 'var(--nx-accent)' }}>programa solo</em>.
            Resultados diseñados para viralizarse.
          </h1>
          <p
            className="nx-rise"
            style={{
              animationDelay: '0.25s',
              fontSize: 19,
              lineHeight: 1.6,
              color: 'var(--nx-muted)',
              margin: '0 0 36px',
              maxWidth: 560,
            }}
          >
            Nexpost es la plataforma donde diseñás, planificás, publicás y medís el contenido de
            todas tus redes sociales — sin saltar entre 8 herramientas.
          </p>
          <div
            className="nx-rise"
            style={{ animationDelay: '0.35s', display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <Link href="/auth" className="nx-btn-primary">
              Empezar ahora →
            </Link>
            <a href="#pricing" className="nx-btn-ghost">
              Ver planes
            </a>
          </div>

          <div
            className="nx-rise"
            style={{
              animationDelay: '0.5s',
              marginTop: 52,
              display: 'flex',
              gap: 28,
              flexWrap: 'wrap',
              color: 'var(--nx-subtle)',
              fontSize: 14,
            }}
          >
            <span>◦ 16+ canales</span>
            <span>◦ IA incluida</span>
            <span>◦ API & webhooks</span>
            <span>◦ Para agencias</span>
          </div>
        </div>

        {/* Visual derecho: card mockup flotando con stack de canales */}
        <div
          className="nx-rise"
          style={{ animationDelay: '0.4s', position: 'relative', height: 440 }}
        >
          {/* Orbes atmosféricos */}
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 240,
              height: 240,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.28) 0%, transparent 70%)',
              filter: 'blur(10px)',
              animation: 'nx-float 7s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -30,
              left: -20,
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.24) 0%, transparent 70%)',
              filter: 'blur(10px)',
              animation: 'nx-float 9s ease-in-out infinite reverse',
            }}
          />

          {/* Mockup principal — "calendar glimpse" */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#fff',
              borderRadius: 24,
              border: '1px solid var(--nx-border)',
              boxShadow: '0 40px 80px -40px rgba(15, 23, 42, 0.25), 0 4px 12px rgba(15,23,42,0.04)',
              padding: 28,
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: '#FCA5A5' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: '#FCD34D' }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: '#86EFAC' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--nx-subtle)', marginBottom: 8 }}>
              Semana del 21
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: -0.5, marginBottom: 20 }}>
              Calendario editorial
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { day: 'Lun', hour: '09:30', title: 'Caso de éxito', net: 'LinkedIn', tint: 'rgba(37,99,235,0.12)' },
                { day: 'Mar', hour: '12:00', title: 'Teaser video', net: 'Instagram + Threads', tint: 'rgba(236,72,153,0.12)' },
                { day: 'Mié', hour: '18:45', title: 'Thread semanal', net: 'X / Twitter', tint: 'rgba(6,182,212,0.14)' },
                { day: 'Vie', hour: '10:00', title: 'Newsletter drop', net: 'Beehiiv', tint: 'rgba(234,179,8,0.14)' },
              ].map((it) => (
                <div
                  key={it.title}
                  style={{
                    background: it.tint,
                    padding: '10px 14px',
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 13.5,
                  }}
                >
                  <span style={{ color: 'var(--nx-text)', fontWeight: 600 }}>
                    <span style={{ color: 'var(--nx-subtle)', marginRight: 10 }}>{it.day} · {it.hour}</span>
                    {it.title}
                  </span>
                  <span style={{ color: 'var(--nx-muted)', fontWeight: 500 }}>{it.net}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="producto" style={{ background: 'var(--nx-surface)', padding: '112px 32px', position: 'relative' }}>
      <div className="nx-grain" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <div className="nx-section-mark">Producto</div>
          <h2
            className="nx-display nx-section-title"
            style={{
              fontSize: 48,
              fontWeight: 500,
              lineHeight: 1.08,
              color: 'var(--nx-text)',
              margin: 0,
            }}
          >
            Todo lo que necesitás para escalar,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--nx-accent)' }}>sin saltar de app</em>.
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((f) => (
            <div key={f.n} className="nx-card">
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 48,
                  fontWeight: 300,
                  color: 'var(--nx-accent)',
                  lineHeight: 1,
                  marginBottom: 14,
                  letterSpacing: -0.5,
                }}
              >
                {f.n}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 10px', color: 'var(--nx-text)' }}>
                {f.t}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--nx-muted)', margin: 0 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ background: 'var(--nx-cream)', padding: '112px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <div className="nx-section-mark">Flujo</div>
          <h2 className="nx-display nx-section-title" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1.08, margin: 0 }}>
            Cuatro pasos, del caos al calendario.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                background: 'var(--nx-surface)',
                borderRadius: 22,
                padding: 32,
                border: '1px solid var(--nx-border)',
                position: 'relative',
              }}
            >
              <div className="nx-step-pill" style={{ marginBottom: 20 }}>{s.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: 'var(--nx-text)' }}>{s.t}</h3>
              <p style={{ fontSize: 15, color: 'var(--nx-muted)', margin: 0, lineHeight: 1.55 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Channels() {
  return (
    <section id="canales" style={{ background: 'var(--nx-surface)', padding: '112px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 40 }}>
          <div className="nx-section-mark">Canales</div>
          <h2 className="nx-display nx-section-title" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1.08, margin: 0 }}>
            Una conexión, <em style={{ fontStyle: 'italic', color: 'var(--nx-accent)' }}>una vez</em>.
            Después publicás desde el mismo flujo.
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 980 }}>
          {CHANNELS.map((c) => (
            <span key={c} className="nx-chip">{c}</span>
          ))}
        </div>
        <p style={{ marginTop: 28, color: 'var(--nx-subtle)', fontSize: 13.5, fontStyle: 'italic', maxWidth: 680 }}>
          La disponibilidad de algunos canales puede depender de la aprobación de cada proveedor.
        </p>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        position: 'relative',
        padding: '120px 32px',
        background: 'linear-gradient(180deg, var(--nx-cream) 0%, #EFF6FF 100%)',
        overflow: 'hidden',
      }}
    >
      <div className="nx-grain" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="nx-section-mark" style={{ justifyContent: 'center' }}>Precios</div>
          <h2
            className="nx-display nx-section-title"
            style={{
              fontSize: 52,
              fontWeight: 500,
              lineHeight: 1.08,
              margin: '0 auto',
              maxWidth: 760,
            }}
          >
            Simple, escalable, <em style={{ fontStyle: 'italic', color: 'var(--nx-accent)' }}>sin sorpresas</em>.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--nx-muted)', margin: '20px auto 0', maxWidth: 560 }}>
            Empezá hoy, escalá cuando crezcas. Pagás sólo lo que usás.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            alignItems: 'stretch',
          }}
        >
          {PLANS.map((p) => (
            <div key={p.name} className={`nx-plan ${p.popular ? 'nx-plan--popular' : ''}`}>
              {p.popular && <span className="nx-plan-badge">POPULAR</span>}
              <h3
                className="nx-display"
                style={{ fontSize: 28, fontWeight: 600, margin: '0 0 6px', letterSpacing: -0.5 }}
              >
                {p.name}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--nx-subtle)', margin: '0 0 22px' }}>{p.audience}</p>
              <div style={{ marginBottom: 24, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  className="nx-display"
                  style={{ fontSize: 54, fontWeight: 500, color: 'var(--nx-text)', lineHeight: 1, letterSpacing: -1 }}
                >
                  ${p.price}
                </span>
                <span style={{ fontSize: 14, color: 'var(--nx-muted)' }}>USD / mes</span>
              </div>
              <Link
                href="/auth"
                className="nx-btn-primary"
                style={{
                  justifyContent: 'center',
                  marginBottom: 24,
                  background: p.popular ? 'var(--nx-accent)' : 'var(--nx-text)',
                  borderColor: p.popular ? 'var(--nx-accent)' : 'var(--nx-text)',
                }}
              >
                Empezar ahora
              </Link>
              <ul
                style={{
                  listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: 10,
                }}
              >
                {p.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 14,
                      color: 'var(--nx-muted)',
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-start',
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        background: 'rgba(37, 99, 235, 0.12)',
                        color: 'var(--nx-accent)',
                        fontSize: 11,
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: 'center',
            fontSize: 13.5,
            color: 'var(--nx-subtle)',
            marginTop: 40,
            maxWidth: 720,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontStyle: 'italic',
          }}
        >
          Los precios pueden ajustarse según implementación, soporte, configuración de canales y
          aprobaciones de proveedores. Para necesidades específicas o agencias con requisitos
          custom, escribinos.
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" style={{ background: 'var(--nx-surface)', padding: '120px 32px' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div className="nx-section-mark">FAQ</div>
          <h2
            className="nx-display nx-section-title"
            style={{ fontSize: 48, fontWeight: 500, lineHeight: 1.08, margin: 0, maxWidth: 620 }}
          >
            Las preguntas que todos hacen, respondidas.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQS.map((f) => (
            <details key={f.q} className="nx-faq">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #FDFBF7 100%)',
        padding: '120px 32px',
      }}
    >
      <div className="nx-mesh" />
      <div
        style={{
          position: 'relative',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          className="nx-display"
          style={{
            fontSize: 56,
            fontWeight: 500,
            lineHeight: 1.05,
            color: 'var(--nx-text)',
            margin: '0 0 24px',
          }}
        >
          Empezá hoy.{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--nx-accent)' }}>Cambiá de plan</em>{' '}
          cuando crezcas.
        </h2>
        <p style={{ fontSize: 18, color: 'var(--nx-muted)', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.6 }}>
          Onboarding en minutos. Sin tarjeta al inicio. Cancelás cuando quieras.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth" className="nx-btn-primary">Crear cuenta →</Link>
          <Link href="/auth/login" className="nx-btn-ghost">Iniciar sesión</Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, var(--nx-cream) 0%, #F1F5F9 100%)',
        borderTop: '1px solid var(--nx-border)',
        padding: '64px 32px 40px',
        color: 'var(--nx-muted)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}
      >
        <div>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
            <LogoMark size={32} />
            <span className="nx-wordmark">
              <span className="nx-wordmark-main">Nexpost</span>
              <span className="nx-wordmark-sub">BY NEXIFY</span>
            </span>
          </Link>
          <p style={{ fontSize: 13.5, color: 'var(--nx-subtle)', margin: 0, lineHeight: 1.6, maxWidth: 260 }}>
            Social media management.<br/>
            Hecho con atención al detalle.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'var(--nx-text)', fontSize: 12, fontWeight: 700, letterSpacing: 0.2, textTransform: 'uppercase', margin: '0 0 16px' }}>
            Producto
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <li><a href="#producto" className="nx-navlink">Funcionalidades</a></li>
            <li><a href="#canales" className="nx-navlink">Canales</a></li>
            <li><a href="#pricing" className="nx-navlink">Precios</a></li>
            <li><a href="#faq" className="nx-navlink">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--nx-text)', fontSize: 12, fontWeight: 700, letterSpacing: 0.2, textTransform: 'uppercase', margin: '0 0 16px' }}>
            Cuenta
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <li><Link href="/auth/login" className="nx-navlink">Iniciar sesión</Link></li>
            <li><Link href="/auth" className="nx-navlink">Crear cuenta</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--nx-text)', fontSize: 12, fontWeight: 700, letterSpacing: 0.2, textTransform: 'uppercase', margin: '0 0 16px' }}>
            Legal
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <li><Link href="/terms" className="nx-navlink">Términos</Link></li>
            <li><Link href="/privacy" className="nx-navlink">Privacidad</Link></li>
          </ul>
        </div>

      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 28,
          borderTop: '1px solid var(--nx-border)',
          fontSize: 12,
          color: 'var(--nx-subtle)',
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        © {new Date().getFullYear()} Nexify · AGPL-3.0 ·{' '}
        <a
          href="https://github.com/NexifySA/nexora-source"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--nx-subtle)', textDecoration: 'underline' }}
        >
          Source
        </a>
      </div>
    </footer>
  );
}

export default function NexpostLanding() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Channels />
      <Pricing />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
