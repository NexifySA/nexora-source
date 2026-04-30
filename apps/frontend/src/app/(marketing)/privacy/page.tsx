import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — Nexpost',
  description:
    'Política de Privacidad del servicio Nexpost, operado por Nexify SA.',
  alternates: { canonical: 'https://nexpost.com.ar/privacy' },
};

const SECTION_TITLE: React.CSSProperties = {
  fontFamily: "'Fraunces', Georgia, serif",
  fontSize: 26,
  fontWeight: 600,
  color: 'var(--nx-text)',
  margin: '40px 0 14px',
  letterSpacing: '-0.01em',
};
const PARA: React.CSSProperties = {
  fontSize: 15.5,
  lineHeight: 1.75,
  color: 'var(--nx-muted)',
  margin: '0 0 14px',
};
const STRONG: React.CSSProperties = { color: 'var(--nx-text)', fontWeight: 600 };
const UL: React.CSSProperties = {
  paddingLeft: 22,
  margin: '8px 0 16px',
  color: 'var(--nx-muted)',
  fontSize: 15.5,
  lineHeight: 1.7,
};

export default function PrivacyPage() {
  return (
    <main>
      <header
        style={{
          background: 'rgba(253, 251, 247, 0.85)',
          borderBottom: '1px solid var(--nx-border)',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--nx-text)', fontWeight: 700, fontFamily: "'Fraunces', Georgia, serif", fontSize: 22 }}>
            Nexpost
          </Link>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--nx-muted)', fontSize: 14 }}>
            ← Volver a la home
          </Link>
        </div>
      </header>

      <article
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '64px 24px 96px',
          color: 'var(--nx-text)',
        }}
      >
        <h1
          className="nx-display"
          style={{
            fontSize: 44,
            fontWeight: 600,
            lineHeight: 1.1,
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
          }}
        >
          Política de Privacidad
        </h1>
        <p style={{ ...PARA, marginBottom: 28 }}>
          <em>Última actualización: 24 de abril de 2026</em>
        </p>

        <p style={PARA}>
          Esta Política de Privacidad explica cómo <strong style={STRONG}>Nexpost</strong>{' '}
          (“Nexpost”, “nosotros”, “nos” o “nuestro”) recolecta, utiliza, comparte y protege
          datos personales en relación con la plataforma de planificación, publicación,
          analíticas y colaboración para redes sociales (el “Servicio”) y los sitios web en{' '}
          <a href="https://nexpost.com.ar" style={{ color: 'var(--nx-accent)' }}>nexpost.com.ar</a>{' '}
          y subdominios relacionados (el “Sitio”). Aplica a visitantes del Sitio,
          titulares de cuenta, miembros de workspaces de clientes, prospectos, asistentes
          a eventos y cualquier persona que interactúe con nosotros. Al utilizar el Sitio
          o el Servicio usted toma conocimiento de esta Política. Para nuestras condiciones
          contractuales, ver los <Link href="/terms" style={{ color: 'var(--nx-accent)' }}>Términos y Condiciones</Link>.
        </p>

        <h2 style={SECTION_TITLE}>1. Quiénes somos (Responsable del Tratamiento)</h2>
        <p style={PARA}>
          El Servicio es operado por <strong style={STRONG}>NEXIFY S.A.</strong>, sociedad
          anónima constituida en la República Argentina:
        </p>
        <ul style={UL}>
          <li><strong style={STRONG}>Razón social:</strong> NEXIFY S.A.</li>
          <li><strong style={STRONG}>CUIT:</strong> 30-71888381-0</li>
          <li><strong style={STRONG}>Condición frente al IVA:</strong> Responsable Inscripto</li>
          <li><strong style={STRONG}>Contacto privacidad:</strong> <a href="mailto:contacto@nexify.com.ar" style={{ color: 'var(--nx-accent)' }}>contacto@nexify.com.ar</a></li>
        </ul>
        <p style={PARA}>
          Nexify es la responsable del tratamiento (data controller) para los datos de
          cuenta, facturación, soporte, marketing y uso del Servicio. También es la
          titular de las cuentas de desarrollador y aplicaciones OAuth registradas frente
          a las plataformas sociales y de mensajería que el Servicio integra (X / Twitter,
          Meta, LinkedIn, YouTube, TikTok, Pinterest, Reddit, Threads, Bluesky, Mastodon,
          Discord, Slack, Telegram y otras), y procesa las credenciales OAuth, scopes y
          metadata necesarios para publicar en su nombre.
        </p>

        <h2 style={SECTION_TITLE}>2. El Servicio en breve</h2>
        <p style={PARA}>
          Nexpost permite conectar canales sociales y de mensajería para programar,
          publicar, analizar y colaborar centralmente sobre contenido. Incluye calendario
          editorial, biblioteca de medios, cola de publicación, analíticas, generación
          asistida por IA, gestión de equipos y workspaces, e integraciones con
          plataformas de terceros. Algunas funcionalidades dependen del plan contratado y
          de las plataformas que elija conectar.
        </p>

        <h2 style={SECTION_TITLE}>3. Datos que recolectamos</h2>

        <h3 style={{ ...SECTION_TITLE, fontSize: 20, margin: '24px 0 8px' }}>3.1 Datos de cuenta e identidad</h3>
        <ul style={UL}>
          <li>Nombre, email, password (almacenado como hash con sal), foto de perfil, organización, rol, idioma y zona horaria.</li>
          <li>Si inicia sesión vía un proveedor social (por ejemplo Google), los campos básicos de perfil y email que ese proveedor devuelve.</li>
          <li>Membresías a workspaces y equipos, invitaciones enviadas y aceptadas, y permisos otorgados dentro de cada workspace.</li>
        </ul>

        <h3 style={{ ...SECTION_TITLE, fontSize: 20, margin: '24px 0 8px' }}>3.2 Datos de plataformas conectadas</h3>
        <p style={PARA}>
          Cuando conecta una cuenta social o de mensajería de terceros a Nexpost,
          recibimos y almacenamos, vía la API de esa plataforma:
        </p>
        <ul style={UL}>
          <li>Tokens OAuth de acceso y refresh (cifrados en reposo), los scopes otorgados, el username y el identificador de plataforma, y metadata a nivel cuenta (foto de perfil, cantidad de seguidores, IDs de páginas, IDs de canales).</li>
          <li>Contenido y datos de engagement necesarios para proveer el Servicio: posts creados o programados, posts ya publicados, comentarios, respuestas, mensajes directos cuando habilite expresamente esa funcionalidad, analíticas a nivel post (impresiones, clics, alcance, retención de video, etc.), y agregados de audiencia que la plataforma exponga.</li>
        </ul>
        <p style={PARA}>
          Para YouTube específicamente, el Servicio utiliza{' '}
          <strong style={STRONG}>YouTube API Services</strong>. Su uso de esas funciones
          también está sujeto a los <a href="https://www.youtube.com/t/terms" style={{ color: 'var(--nx-accent)' }}>Términos de YouTube</a>{' '}
          y a la <a href="https://policies.google.com/privacy" style={{ color: 'var(--nx-accent)' }}>Política de Privacidad de Google</a>.
          Puede revocar el acceso de Nexpost a sus datos de Google en cualquier momento en{' '}
          <a href="https://security.google.com/settings/security/permissions" style={{ color: 'var(--nx-accent)' }}>security.google.com/settings/security/permissions</a>.
        </p>

        <h3 style={{ ...SECTION_TITLE, fontSize: 20, margin: '24px 0 8px' }}>3.3 Contenido que usted carga</h3>
        <p style={PARA}>
          Texto, imágenes, video, audio, captions, enlaces, hashtags, calendarios,
          prompts, comentarios, notas de aprobación, metadata de calendario y cualquier
          otro contenido que cargue o genere dentro del Servicio.
        </p>

        <h3 style={{ ...SECTION_TITLE, fontSize: 20, margin: '24px 0 8px' }}>3.4 Datos de facturación</h3>
        <p style={PARA}>
          Plan contratado, estado de la suscripción, historial de comprobantes, email de
          facturación, domicilio fiscal, CUIT/CUIL/identificadores tributarios. Los datos
          de tarjeta y cuenta bancaria son recolectados y almacenados directamente por
          nuestros procesadores de pago (por ejemplo Stripe, Mercado Pago, Paddle); Nexpost
          sólo recibe una referencia tokenizada, los últimos cuatro dígitos, la marca y el
          mes/año de vencimiento.
        </p>

        <h3 style={{ ...SECTION_TITLE, fontSize: 20, margin: '24px 0 8px' }}>3.5 Logs, uso y datos del dispositivo</h3>
        <ul style={UL}>
          <li>Dirección IP, user-agent, tipo y versión de navegador, sistema operativo, identificadores de dispositivo, URL de referencia, preferencia de idioma, ubicación aproximada derivada de IP (país/región).</li>
          <li>Telemetría de la aplicación: páginas visitadas, funciones usadas, posts creados/publicados/fallidos, llamados API realizados, reportes de error, métricas de performance y datos de crash.</li>
          <li>Datos de sesión y autenticación, incluyendo timestamps de login, tokens de sesión y eventos de seguridad (cambios de password, alta de MFA).</li>
        </ul>

        <h3 style={{ ...SECTION_TITLE, fontSize: 20, margin: '24px 0 8px' }}>3.6 Comunicaciones y soporte</h3>
        <p style={PARA}>
          Mensajes que nos envía por email, chat in-app, tickets de soporte o canales
          comunitarios; encuestas, NPS, feedback y pedidos de funcionalidad; métricas de
          engagement de los emails de marketing que reciba (apertura, clics, link
          clickeado).
        </p>

        <h3 style={{ ...SECTION_TITLE, fontSize: 20, margin: '24px 0 8px' }}>3.7 Cookies y tecnologías similares</h3>
        <p style={PARA}>
          Utilizamos cookies, local storage, pixels y SDKs para autenticación, seguridad,
          preferencias, analíticas y (en el Sitio) atribución de marketing. Las categorías
          incluyen estrictamente necesarias, funcionales, analíticas y de marketing.
          Puede gestionar cookies no esenciales mediante el banner de consentimiento o la
          configuración de su navegador; deshabilitar las cookies estrictamente necesarias
          rompe partes del Servicio.
        </p>

        <h2 style={SECTION_TITLE}>4. Cómo usamos los datos y bases legales</h2>
        <p style={PARA}>
          Tratamos los datos descriptos arriba con los siguientes fines. Cuando sea
          aplicable la Ley 25.326 de Protección de los Datos Personales (Argentina), el
          GDPR (UE) o el UK GDPR, la base legal de cada finalidad se indica entre
          paréntesis.
        </p>
        <ul style={UL}>
          <li><strong style={STRONG}>Proveer el Servicio</strong> — autenticar usuarios, crear y gestionar su cuenta y workspaces, almacenar y publicar su contenido en plataformas conectadas, devolver analíticas y proveer soporte. <em>(Ejecución del contrato.)</em></li>
          <li><strong style={STRONG}>Facturar y cobrar</strong> — emitir comprobantes, gestionar suscripciones, prevenir fraude de pagos, cumplir obligaciones impositivas. <em>(Ejecución del contrato; obligación legal.)</em></li>
          <li><strong style={STRONG}>Asegurar el Servicio</strong> — detectar y prevenir abuso, fraude, account takeover, ataques de fuerza bruta, spam y ataques a la infraestructura; investigar incidentes; hacer cumplir los Términos. <em>(Interés legítimo en mantener el Servicio seguro; obligación legal.)</em></li>
          <li><strong style={STRONG}>Operar, mantener y mejorar el Servicio</strong> — debug, monitoreo, performance, A/B tests, analíticas agregadas. <em>(Interés legítimo en operar y mejorar un servicio confiable.)</em></li>
          <li><strong style={STRONG}>Comunicarnos con usted</strong> — enviar mensajes relacionados con el servicio (recibos, alertas de seguridad, avisos de falla de post, confirmaciones de programación) y, donde haya optado o esté permitido, comunicaciones de marketing. <em>(Ejecución del contrato; consentimiento o interés legítimo, según mensaje y jurisdicción.)</em></li>
          <li><strong style={STRONG}>Cumplir con la ley</strong> — responder requerimientos legales, ejercer nuestros derechos, defender reclamos. <em>(Obligación legal; interés legítimo.)</em></li>
        </ul>
        <p style={PARA}>
          <strong style={STRONG}>No utilizamos</strong> el contenido de sus posts
          programados, su contenido en plataformas conectadas o sus mensajes privados para
          enviarle publicidad, y <strong style={STRONG}>no vendemos</strong> esos datos.
        </p>

        <h2 style={SECTION_TITLE}>5. Funcionalidades de IA</h2>
        <p style={PARA}>
          El Servicio ofrece funciones opcionales de IA que generan o reescriben captions,
          hashtags, prompts de imagen, scripts de video y resúmenes analíticos. Para
          proveerlas, transmitimos sus prompts y los inputs que elija incluir a
          proveedores de modelos terceros (por ejemplo Anthropic, OpenAI y similares),
          actuando como nuestros sub-encargados. Instruimos a esos proveedores a no
          utilizar sus inputs ni outputs para entrenar sus modelos. Los outputs de IA se
          generan probabilísticamente y pueden ser inexactos; usted es responsable de
          revisarlos antes de publicar.
        </p>

        <h2 style={SECTION_TITLE}>6. Nexpost como Responsable vs como Encargado</h2>
        <p style={PARA}>
          Para los datos de cuenta, facturación, analíticas del Sitio, marketing y
          seguridad, Nexify actúa como <strong style={STRONG}>responsable del tratamiento</strong>{' '}
          (data controller).
        </p>
        <p style={PARA}>
          Para el contenido que publique a través del Servicio y los datos personales de
          su audiencia, seguidores, clientes y contactos de mensajería que fluyen por
          Nexpost siguiendo sus instrucciones, Nexify actúa como{' '}
          <strong style={STRONG}>encargado del tratamiento</strong> (data processor) en su
          nombre, y usted es el responsable. Usted es responsable de tener una base legal
          para ese tratamiento, de proveer las notificaciones y obtener los consentimientos
          de sus usuarios finales, y de honrar sus derechos. A pedido, firmaremos nuestro
          Acuerdo de Tratamiento de Datos (DPA) estándar, que incorpora las Cláusulas
          Contractuales Tipo de la UE (y la Adenda del Reino Unido) cuando sea aplicable;
          escribir a <a href="mailto:contacto@nexify.com.ar" style={{ color: 'var(--nx-accent)' }}>contacto@nexify.com.ar</a>.
        </p>

        <h2 style={SECTION_TITLE}>7. Con quién compartimos los datos</h2>
        <p style={PARA}>
          No vendemos datos personales ni los alquilamos a terceros. Los compartimos
          únicamente con:
        </p>
        <ul style={UL}>
          <li><strong style={STRONG}>Sub-encargados y proveedores de infraestructura</strong> — incluyendo cloud hosting y storage, CDNs, bases de datos, monitoreo de errores y observabilidad, plataformas de soporte, proveedores de email transaccional, plataformas analíticas, procesadores de pago y proveedores de modelos IA. Les exigimos seguridad adecuada y que traten los datos sólo bajo nuestras instrucciones.</li>
          <li><strong style={STRONG}>Plataformas de terceros conectadas</strong> — cuando programa o publica contenido, lo transmitimos a la plataforma elegida; cuando solicita analíticas, las recibimos de esa plataforma. Cada política de privacidad rige lo que la plataforma haga después.</li>
          <li><strong style={STRONG}>Otros miembros de su workspace</strong> — el contenido, calendarios, comentarios y actividad de aprobación son visibles para las demás personas en los workspaces a los que pertenezca, según el rol y permisos asignados.</li>
          <li><strong style={STRONG}>Asesores profesionales</strong> — contadores, auditores, abogados, aseguradoras y similares, bajo confidencialidad.</li>
          <li><strong style={STRONG}>Autoridades</strong> — cuando estamos legalmente obligados a divulgar datos (orden judicial, requerimiento válido de fuerzas de seguridad, requerimiento regulatorio) o cuando la divulgación sea necesaria para investigar o prevenir fraude, abuso, amenazas a la seguridad o daños a personas. Cuando sea legalmente posible intentaremos redirigir el requerimiento a usted primero.</li>
          <li><strong style={STRONG}>Sucesores</strong> — en caso de fusión, adquisición, financiamiento, reorganización o venta de activos, en cuyo caso requeriremos al destinatario honrar esta Política o avisar de cualquier nueva.</li>
        </ul>

        <h2 style={SECTION_TITLE}>8. Transferencias internacionales de datos</h2>
        <p style={PARA}>
          Operamos desde Argentina y utilizamos sub-encargados en Estados Unidos, la
          Unión Europea, Reino Unido y otras jurisdicciones. Como resultado, los datos
          personales que tratamos pueden ser transferidos y almacenados en países
          distintos al suyo, incluyendo países que pueden no haber sido reconocidos como
          provistos de un “nivel adecuado de protección” por los reguladores
          correspondientes.
        </p>
        <p style={PARA}>
          Cuando los datos sujetos al GDPR o UK GDPR se transfieran a un país sin
          decisión de adecuación, nos basamos en las Cláusulas Contractuales Tipo de la
          Comisión Europea (y la Adenda del Reino Unido cuando aplique), complementadas
          con medidas técnicas y organizativas adicionales (cifrado en tránsito y en
          reposo, controles de acceso, restricciones contractuales sobre el uso por
          sub-encargados). Para los datos sujetos a la Ley 25.326 (Argentina), aplicamos
          los principios de la AAIP. Puede solicitar copia de las salvaguardas relevantes
          escribiendo a <a href="mailto:contacto@nexify.com.ar" style={{ color: 'var(--nx-accent)' }}>contacto@nexify.com.ar</a>.
        </p>

        <h2 style={SECTION_TITLE}>9. Conservación de los datos</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Datos de cuenta</strong> — conservados mientras la cuenta esté activa. Después del cierre de cuenta, retenidos hasta 90 días para permitir recuperación, luego eliminados o anonimizados, salvo que se requiera retención mayor (ver abajo).</li>
          <li><strong style={STRONG}>Contenido programado no publicado</strong> — conservado hasta su publicación o eliminación.</li>
          <li><strong style={STRONG}>Registros de posts publicados y analíticas</strong> — conservados mientras la cuenta esté activa, para que las analíticas históricas permanezcan disponibles.</li>
          <li><strong style={STRONG}>Tokens OAuth</strong> — conservados mientras la conexión esté activa; los tokens revocados se eliminan prontamente. Puede desconectar una plataforma en cualquier momento desde la configuración de su cuenta.</li>
          <li><strong style={STRONG}>Registros contables y fiscales</strong> — conservados por el período exigido por la normativa impositiva argentina (típicamente 10 años conforme al Código Civil y Comercial / RG AFIP).</li>
          <li><strong style={STRONG}>Logs</strong> — operacionales y de seguridad, típicamente hasta 12 meses.</li>
          <li><strong style={STRONG}>Backups</strong> — backups cifrados rotan según su ciclo normal (típicamente entre 30 y 90 días) después de la eliminación del sistema en vivo.</li>
        </ul>
        <p style={PARA}>
          Cuando se requiera retención por motivos legales, regulatorios, de resolución
          de disputas o prevención de fraude, podemos conservar los datos por períodos
          más largos.
        </p>

        <h2 style={SECTION_TITLE}>10. Seguridad</h2>
        <p style={PARA}>
          Mantenemos salvaguardas administrativas, técnicas y físicas diseñadas para
          proteger los datos personales contra destrucción, pérdida, alteración,
          divulgación o acceso no autorizado o ilícito. Esto incluye: cifrado de datos en
          tránsito (TLS) y de datos sensibles en reposo; cifrado de tokens OAuth; hashing
          de passwords con algoritmo moderno; controles de acceso basados en roles y
          principio de menor privilegio; logging de auditoría; autenticación multifactor
          para acceso del personal a sistemas productivos; revisiones de seguridad de
          proveedores y compromisos contractuales de protección de datos; y
          procedimientos de respuesta a incidentes. Ningún sistema es totalmente seguro y
          no podemos garantizar seguridad absoluta.
        </p>

        <h2 style={SECTION_TITLE}>11. Sus derechos</h2>
        <p style={PARA}>
          Según la jurisdicción donde resida, usted puede tener derecho a:
        </p>
        <ul style={UL}>
          <li>acceder a los datos personales que tenemos sobre usted y recibir una copia en formato portable;</li>
          <li>solicitar la rectificación de datos inexactos o incompletos;</li>
          <li>solicitar la supresión de sus datos, sujeto a las obligaciones de retención;</li>
          <li>oponerse o restringir ciertos tratamientos, incluyendo marketing directo;</li>
          <li>retirar el consentimiento cuando el tratamiento se base en consentimiento (sin afectar la licitud del tratamiento ya efectuado);</li>
          <li>oponerse a la “venta” o “compartición” de información personal para publicidad conductual cross-context — Nexpost no vende datos personales y no los comparte para publicidad conductual cross-context conforme las Leyes de Privacidad de California;</li>
          <li>presentar una denuncia ante la autoridad de control de su jurisdicción. En Argentina, la Agencia de Acceso a la Información Pública (AAIP). En la UE/UK, la autoridad de protección de datos correspondiente.</li>
        </ul>
        <p style={PARA}>
          La mayoría de los cambios de cuenta se pueden realizar iniciando sesión y
          editando el perfil, la facturación o la configuración del workspace, o
          desconectando una plataforma desde la página de integraciones. Para ejercer
          derechos que no se puedan gestionar desde el producto, escribir a{' '}
          <a href="mailto:contacto@nexify.com.ar" style={{ color: 'var(--nx-accent)' }}>contacto@nexify.com.ar</a>.
          Responderemos dentro del plazo requerido por la ley aplicable (típicamente 10
          días hábiles para Argentina conforme la Ley 25.326, 30 días para GDPR,
          extensible para pedidos complejos). Podemos necesitar verificar su identidad
          antes de actuar. No discriminaremos por el ejercicio de sus derechos.
        </p>

        <h2 style={SECTION_TITLE}>12. Argentina — Ley 25.326</h2>
        <p style={PARA}>
          Para titulares de datos en Argentina, NEXIFY S.A. cumple con la{' '}
          <strong style={STRONG}>Ley 25.326 de Protección de los Datos Personales</strong>{' '}
          y normativa complementaria. Usted tiene derecho de acceso, rectificación,
          actualización y supresión de sus datos personales conforme dicha ley. La
          autoridad de control en Argentina es la Agencia de Acceso a la Información
          Pública (AAIP) — <a href="https://www.argentina.gob.ar/aaip" style={{ color: 'var(--nx-accent)' }}>www.argentina.gob.ar/aaip</a>.
        </p>

        <h2 style={SECTION_TITLE}>13. California — Privacy Rights</h2>
        <p style={PARA}>
          Si usted reside en California, las leyes de privacidad de California (CCPA
          modificada por CPRA, las “Leyes de Privacidad de California”) le otorgan los
          derechos resumidos en la Sección 11, incluyendo el derecho a saber qué
          categorías de información personal recolectamos sobre usted y los fines (descritos
          en las Secciones 3 y 4), el derecho a eliminar, el derecho a corregir, el
          derecho a limitar el uso de información personal sensible y el derecho a no
          ser discriminado por ejercer sus derechos. Nexpost no vende información
          personal y no la comparte para publicidad conductual cross-context. Para
          ejercer derechos de California, escribir a{' '}
          <a href="mailto:contacto@nexify.com.ar" style={{ color: 'var(--nx-accent)' }}>contacto@nexify.com.ar</a>.
        </p>

        <h2 style={SECTION_TITLE}>14. Menores</h2>
        <p style={PARA}>
          El Servicio está pensado para uso comercial y no está dirigido a menores de 18
          años. No recolectamos a sabiendas datos personales de menores de 18. Si cree
          que un menor nos ha provisto datos personales, contáctenos y los eliminaremos.
        </p>

        <h2 style={SECTION_TITLE}>15. Marketing y elecciones de cookies</h2>
        <p style={PARA}>
          Puede darse de baja de los emails de marketing en cualquier momento usando el
          link “unsubscribe” en cualquiera de esos emails. Darse de baja del marketing no
          detiene los emails transaccionales y de cuenta, que son necesarios mientras la
          cuenta esté activa. Puede gestionar las preferencias de cookies vía el banner
          de consentimiento del Sitio (donde se muestre) o la configuración del navegador.
        </p>

        <h2 style={SECTION_TITLE}>16. Sitios y servicios de terceros</h2>
        <p style={PARA}>
          El Sitio y el Servicio se vinculan e integran con servicios de terceros. Su
          tratamiento de los datos se rige por sus propias políticas de privacidad, no
          por esta. Recomendamos revisar la política de privacidad de cada plataforma que
          conecte a Nexpost, incluyendo la{' '}
          <a href="http://www.google.com/policies/privacy" style={{ color: 'var(--nx-accent)' }}>Política de Privacidad de Google</a>{' '}
          para integraciones con YouTube.
        </p>

        <h2 style={SECTION_TITLE}>17. Cambios en esta Política</h2>
        <p style={PARA}>
          Podemos actualizar esta Política periódicamente. Cuando un cambio sea material,
          daremos aviso razonable (por ejemplo por email o notificación en el producto)
          antes de su entrada en vigencia. La fecha de la última actualización se muestra
          al inicio de esta página; recomendamos revisarla periódicamente.
        </p>

        <h2 style={SECTION_TITLE}>18. Contacto</h2>
        <p style={PARA}>
          Para consultas, pedidos o reclamos sobre privacidad, contactar:
        </p>
        <ul style={UL}>
          <li><strong style={STRONG}>Email:</strong> <a href="mailto:contacto@nexify.com.ar" style={{ color: 'var(--nx-accent)' }}>contacto@nexify.com.ar</a></li>
          <li><strong style={STRONG}>Razón social:</strong> NEXIFY S.A.</li>
          <li><strong style={STRONG}>CUIT:</strong> 30-71888381-0</li>
          <li><strong style={STRONG}>Condición frente al IVA:</strong> Responsable Inscripto</li>
        </ul>

        <hr
          style={{
            margin: '64px 0 32px',
            border: 'none',
            borderTop: '1px solid var(--nx-border)',
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 13,
            color: 'var(--nx-subtle)',
          }}
        >
          <Link href="/" style={{ color: 'var(--nx-muted)', textDecoration: 'none' }}>
            ← Volver a la home
          </Link>
          <span>© {new Date().getFullYear()} Nexify · AGPL-3.0</span>
        </div>
      </article>
    </main>
  );
}
