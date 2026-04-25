import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Nexpost',
  description:
    'Términos y Condiciones del servicio Nexpost, operado por Nexify SA.',
  alternates: { canonical: 'https://nexpost.com.ar/terms' },
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

export default function TermsPage() {
  return (
    <main>
      {/* Header simple */}
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
          Términos y Condiciones de Servicio
        </h1>
        <p style={{ ...PARA, marginBottom: 28 }}>
          <em>Última actualización: 24 de abril de 2026</em>
        </p>

        <p style={PARA}>
          Bienvenido a <strong style={STRONG}>Nexpost</strong> (el “Servicio”), una plataforma
          de planificación, publicación, análisis y colaboración para redes sociales,
          disponible en <a href="https://nexpost.com.ar" style={{ color: 'var(--nx-accent)' }}>https://nexpost.com.ar</a>{' '}
          y subdominios relacionados (en conjunto, el “Sitio”). Estos Términos y Condiciones
          de Servicio (los “Términos”) regulan el acceso y uso del Sitio y del Servicio. Al
          crear una cuenta o acceder al Servicio, usted acepta quedar obligado por estos
          Términos. Si no está de acuerdo, no utilice el Servicio.
        </p>

        <h2 style={SECTION_TITLE}>1. Empresa operadora</h2>
        <p style={PARA}>
          El Servicio es operado por <strong style={STRONG}>NEXIFY S.A.</strong> (en
          adelante “Nexify”, “nosotros” o “nuestro”), sociedad anónima constituida bajo
          las leyes de la República Argentina.
        </p>
        <ul style={UL}>
          <li><strong style={STRONG}>Razón social:</strong> NEXIFY S.A.</li>
          <li><strong style={STRONG}>CUIT:</strong> 30-71888381-0</li>
          <li><strong style={STRONG}>Condición frente al IVA:</strong> Responsable Inscripto</li>
          <li><strong style={STRONG}>Contacto:</strong> <a href="mailto:contacto@nexify.com.ar" style={{ color: 'var(--nx-accent)' }}>contacto@nexify.com.ar</a></li>
        </ul>
        <p style={PARA}>
          Nexify es la entidad contratante para todas las suscripciones del Servicio, la
          parte responsable de la facturación, reembolsos y emisión de comprobantes
          fiscales argentinos, y la titular registral de las aplicaciones OAuth y
          desarrolladores frente a las plataformas de terceros que el Servicio integra.
        </p>

        <h2 style={SECTION_TITLE}>2. Capacidad y cuentas</h2>
        <p style={PARA}>
          Usted debe tener al menos 18 años, o la mayoría de edad en su jurisdicción, y
          capacidad para celebrar contratos vinculantes para utilizar el Servicio. Si
          utiliza el Servicio en nombre de una organización, declara tener autoridad
          suficiente para obligar a dicha organización, y “usted” en estos Términos se
          refiere tanto a usted como individuo como a esa organización.
        </p>
        <p style={PARA}>
          Es responsable de mantener la confidencialidad de las credenciales de su cuenta,
          de toda la actividad que ocurra bajo su cuenta y de mantener su información de
          contacto actualizada. Debe notificarnos sin demora a{' '}
          <a href="mailto:contacto@nexify.com.ar" style={{ color: 'var(--nx-accent)' }}>contacto@nexify.com.ar</a>{' '}
          ante cualquier uso no autorizado de su cuenta.
        </p>

        <h2 style={SECTION_TITLE}>3. El Servicio</h2>
        <p style={PARA}>
          Nexpost provee herramientas para planificar, publicar, analizar, gestionar y
          colaborar sobre contenido distribuido a múltiples canales sociales y de
          mensajería. Esto incluye, sin limitación: calendario y motor de programación,
          biblioteca de medios, analíticas, generación asistida por IA, gestión de equipos
          y workspaces, e integraciones con plataformas de terceros. Las funcionalidades,
          canales y límites específicos dependen del plan contratado y pueden modificarse.
        </p>
        <p style={PARA}>
          Podemos agregar, quitar, modificar, suspender o discontinuar cualquier
          funcionalidad, integración o canal en cualquier momento, incluyendo cuando una
          plataforma de terceros modifica o revoca su acceso por API. Haremos esfuerzos
          comerciales razonables para notificar cambios materiales que afecten
          adversamente a suscriptores pagos.
        </p>

        <h2 style={SECTION_TITLE}>4. Suscripciones, precios y facturación</h2>
        <p style={PARA}>
          Los planes pagos son comercializados por Nexify S.A. Al contratar una
          suscripción, usted autoriza a Nexify (y a sus procesadores de pago) a debitar
          los montos correspondientes en el medio de pago elegido, en el ciclo recurrente
          que seleccione (mensual, anual u otro). Las suscripciones se renuevan
          automáticamente al final de cada período al precio vigente, salvo cancelación
          previa.
        </p>
        <p style={PARA}>
          Salvo que la ley aplicable o una política de reembolsos publicada en el Sitio
          dispongan lo contrario, todos los pagos son no reembolsables, incluyendo por
          períodos parcialmente utilizados. Cancelar la suscripción detiene futuras
          renovaciones; no genera derecho a reembolso proporcional del período en curso.
        </p>
        <p style={PARA}>
          Los precios no incluyen IVA, percepciones, retenciones u otros tributos
          aplicables, los cuales serán adicionados conforme la normativa argentina y
          son a su cargo. Nexify emitirá comprobantes electrónicos válidos según
          AFIP/ARCA.
        </p>
        <p style={PARA}>
          Podemos modificar los precios para nuevos períodos de facturación con al menos
          30 días de aviso por email o notificación en el producto. El uso continuado del
          Servicio después de la entrada en vigencia constituye aceptación del nuevo
          precio.
        </p>

        <h2 style={SECTION_TITLE}>5. Planes gratuitos, trials y funcionalidades beta</h2>
        <p style={PARA}>
          Podemos ofrecer planes gratuitos, períodos de prueba o funcionalidades marcadas
          como “beta”, “preview” o similares. Estas se proveen “tal cual están”, pueden
          tener límites adicionales y pueden modificarse o discontinuarse en cualquier
          momento sin aviso. No otorgamos garantías de ningún tipo respecto de
          funcionalidades gratuitas o beta.
        </p>

        <h2 style={SECTION_TITLE}>6. Su contenido</h2>
        <p style={PARA}>
          “Su Contenido” significa todo texto, imágenes, video, audio, enlaces, metadata,
          calendarios, prompts, configuraciones y demás materiales que cargue, genere o
          transmita a través del Servicio. Entre usted y Nexpost, usted retiene la
          totalidad de los derechos de propiedad intelectual sobre Su Contenido.
        </p>
        <p style={PARA}>
          Usted otorga a Nexpost una licencia mundial, no exclusiva y libre de regalías
          para alojar, almacenar, reproducir, transmitir, mostrar, adaptar y distribuir
          Su Contenido únicamente con el fin de operar, proveer, asegurar y mejorar el
          Servicio, incluyendo la transmisión de Su Contenido a las plataformas de
          terceros que usted haya conectado, y la generación de analíticas, previsualizaciones
          y outputs relacionados.
        </p>
        <p style={PARA}>
          Usted declara y garantiza que es titular o cuenta con todos los derechos,
          licencias y permisos necesarios sobre Su Contenido; que Su Contenido y su
          publicación a través de plataformas conectadas no infringe derechos de terceros;
          y que Su Contenido cumple con estos Términos, la ley aplicable y los términos de
          cada plataforma de terceros donde sea publicado.
        </p>

        <h2 style={SECTION_TITLE}>7. Uso aceptable</h2>
        <p style={PARA}>
          Usted se compromete a no utilizar el Servicio, ni permitir a terceros utilizarlo,
          para:
        </p>
        <ul style={UL}>
          <li>publicar, distribuir o almacenar contenido ilícito, difamatorio, acosador, de odio, amenazante, sexualmente explotativo de menores, o que infrinja derechos de propiedad intelectual, privacidad o imagen;</li>
          <li>enviar spam, ejecutar comportamientos coordinados inauténticos, operar bots no declarados, generar engagement falso masivo o violar las normas de cualquier red conectada;</li>
          <li>burlar límites de tasa, restricciones técnicas o controles de acceso del Servicio o de cualquier plataforma de terceros;</li>
          <li>realizar ingeniería inversa, descompilar, scrapear o intentar derivar el código fuente del Servicio, salvo en la medida expresamente permitida por la ley aplicable o por una licencia open source aplicable a componentes específicos;</li>
          <li>revender, sublicenciar, white-labelear o comercializar de cualquier modo el Servicio sin acuerdo escrito previo de Nexify;</li>
          <li>cargar malware, intentar acceso no autorizado al Servicio o interferir con su integridad o desempeño.</li>
        </ul>
        <p style={PARA}>
          Podemos suspender o terminar cuentas que infrinjan esta sección, con o sin
          aviso, y podemos remover el contenido infractor. También podemos estar obligados
          a comunicar las infracciones a las plataformas de terceros afectadas.
        </p>

        <h2 style={SECTION_TITLE}>8. Plataformas de terceros e integraciones</h2>
        <p style={PARA}>
          La función central del Servicio es publicar Su Contenido en plataformas de
          terceros (incluyendo, sin limitación: X / Twitter, Meta Platforms — Facebook,
          Instagram, Threads —, LinkedIn, YouTube, TikTok, Pinterest, Reddit, Bluesky,
          Mastodon, Discord, Slack, Telegram y otras). Para hacerlo, usted autentica sus
          cuentas en dichas plataformas y autoriza a Nexpost a actuar en su nombre.
        </p>
        <p style={PARA}>
          Las aplicaciones OAuth y los acuerdos de desarrollador que habilitan estas
          integraciones son propiedad de Nexify S.A. El uso que usted haga de cualquier
          plataforma de terceros mediante el Servicio también se rige por los términos y
          la política de privacidad de esa plataforma, incluyendo a modo de ejemplo:
        </p>
        <ul style={UL}>
          <li><strong style={STRONG}>YouTube</strong> — al conectar una cuenta de YouTube usted acepta los términos de YouTube en <a href="https://www.youtube.com/t/terms" style={{ color: 'var(--nx-accent)' }}>youtube.com/t/terms</a> y reconoce la Política de Privacidad de Google en <a href="https://policies.google.com/privacy" style={{ color: 'var(--nx-accent)' }}>policies.google.com/privacy</a>. Nexpost utiliza YouTube API Services.</li>
          <li><strong style={STRONG}>X / Twitter</strong> — Términos de X en <a href="https://x.com/en/tos" style={{ color: 'var(--nx-accent)' }}>x.com/en/tos</a>.</li>
          <li><strong style={STRONG}>Meta Platforms</strong> — Términos de Meta en <a href="https://www.facebook.com/legal/terms" style={{ color: 'var(--nx-accent)' }}>facebook.com/legal/terms</a>.</li>
          <li><strong style={STRONG}>LinkedIn</strong> — User Agreement en <a href="https://www.linkedin.com/legal/user-agreement" style={{ color: 'var(--nx-accent)' }}>linkedin.com/legal/user-agreement</a>.</li>
          <li><strong style={STRONG}>TikTok</strong> — Términos en <a href="https://www.tiktok.com/legal/terms-of-service" style={{ color: 'var(--nx-accent)' }}>tiktok.com/legal/terms-of-service</a>.</li>
        </ul>
        <p style={PARA}>
          Puede revocar el acceso de Nexpost a cualquier plataforma conectada en cualquier
          momento desde la configuración de su cuenta o directamente desde la página de
          permisos de esa plataforma. Revocar el acceso detiene futuras publicaciones
          programadas hacia esa plataforma.
        </p>
        <p style={PARA}>
          Nexpost no es responsable de la disponibilidad, comportamiento, políticas,
          tarifas, decisiones de moderación, suspensiones de cuenta, cambios de límites
          o eliminación de funcionalidades de cualquier plataforma de terceros. Cuando una
          plataforma cambia su API, finaliza su programa de desarrolladores o modifica sus
          términos de manera que afecte al Servicio, podemos modificar o discontinuar la
          integración afectada sin responsabilidad.
        </p>

        <h2 style={SECTION_TITLE}>9. Funcionalidades de IA</h2>
        <p style={PARA}>
          El Servicio puede ofrecer funciones asistidas por IA que generan texto,
          imágenes, video, captions, hashtags, resúmenes o analíticas (el “Output IA”). El
          Output IA se genera de manera probabilística y puede ser inexacto, incompleto o
          no apto para su propósito. Usted es el único responsable de revisar el Output
          IA antes de publicarlo, asegurar que cumpla con la ley aplicable, las normas de
          las plataformas de terceros y los derechos de las personas representadas, y de
          informar el uso de IA cuando sea requerido.
        </p>
        <p style={PARA}>
          Para proveer las funciones de IA podemos transmitir sus prompts e inputs
          seleccionados a proveedores de modelos de terceros. No autorizamos a dichos
          proveedores a entrenar sus modelos con sus inputs, salvo cuando usted opte
          explícitamente o cuando la política por defecto del proveedor lo requiera (en
          cuyo caso lo documentaremos en la Política de Privacidad).
        </p>

        <h2 style={SECTION_TITLE}>10. Propiedad intelectual de Nexpost</h2>
        <p style={PARA}>
          El Servicio, el Sitio y todo el software, diseño, texto, gráficos, logotipos,
          marcas y demás materiales puestos a disposición por Nexpost (excluyendo Su
          Contenido y los componentes distribuidos bajo licencias open source propias) son
          propiedad de Nexify S.A. o de sus licenciantes y están protegidos por leyes de
          propiedad intelectual. Sujeto al cumplimiento de estos Términos, le otorgamos
          una licencia limitada, no exclusiva, intransferible y revocable para acceder y
          utilizar el Servicio para su propósito durante la vigencia de su suscripción.
        </p>
        <p style={PARA}>
          Los componentes open source incluidos en Nexpost se rigen por las licencias con
          las que son distribuidos; nada en estos Términos restringe los derechos del
          usuario bajo dichas licencias respecto de los componentes correspondientes.
          Nexpost se basa en software open source distribuido bajo GNU AGPLv3; el código
          fuente correspondiente a esta versión está disponible en{' '}
          <a href="https://github.com/NexifySA/nexora-source" style={{ color: 'var(--nx-accent)' }} target="_blank" rel="noreferrer">github.com/NexifySA/nexora-source</a>.
        </p>

        <h2 style={SECTION_TITLE}>11. Feedback</h2>
        <p style={PARA}>
          Si nos provee comentarios, sugerencias o ideas sobre el Servicio, otorga a
          Nexpost una licencia perpetua, irrevocable, mundial y libre de regalías para
          utilizarlos con cualquier propósito, sin obligación ni compensación a su favor.
        </p>

        <h2 style={SECTION_TITLE}>12. Privacidad y protección de datos</h2>
        <p style={PARA}>
          El tratamiento de datos personales en relación con el Servicio se describe en
          nuestra Política de Privacidad, la cual se incorpora por referencia a estos
          Términos. Cuando tratemos datos personales por su cuenta respecto de sus
          usuarios finales (por ejemplo, analíticas de audiencia), lo haremos en carácter
          de encargado de tratamiento conforme a la Ley 25.326 de Protección de los Datos
          Personales (Argentina) y, cuando corresponda, los términos de un Acuerdo de
          Tratamiento de Datos.
        </p>

        <h2 style={SECTION_TITLE}>13. Suspensión y terminación</h2>
        <p style={PARA}>
          Usted puede dar de baja su cuenta en cualquier momento desde la configuración
          de su cuenta. Podemos suspender o terminar su acceso al Servicio inmediatamente
          si infringe estos Términos, no abona los honorarios cuando vencen, utiliza el
          Servicio de modo que exponga a Nexify o a cualquier plataforma de terceros a
          riesgo legal, de seguridad o reputacional, o cuando lo exija la ley.
        </p>
        <p style={PARA}>
          A la terminación, su derecho a acceder al Servicio cesa. Podemos eliminar Su
          Contenido y los datos de su cuenta luego de un período razonable de retención,
          según lo descrito en la Política de Privacidad. Las disposiciones que por su
          naturaleza deban subsistir (incluyendo licencia sobre Su Contenido, propiedad
          intelectual, honorarios devengados, descargos, limitación de responsabilidad,
          indemnidad, ley aplicable y resolución de controversias) sobrevivirán.
        </p>

        <h2 style={SECTION_TITLE}>14. Descargos de responsabilidad</h2>
        <p style={PARA}>
          En la máxima medida permitida por la ley, el Servicio y el Sitio se proveen
          “tal cual están” y “según disponibilidad”, sin garantías de ninguna clase,
          expresas, implícitas o legales, incluyendo garantías de comerciabilidad, aptitud
          para un propósito determinado, no infracción, exactitud y operación
          ininterrumpida o libre de errores. No garantizamos que las publicaciones
          programadas siempre se entregarán en hora, que las plataformas conectadas las
          aceptarán, ni que las analíticas devueltas por terceros sean exactas o
          completas.
        </p>

        <h2 style={SECTION_TITLE}>15. Limitación de responsabilidad</h2>
        <p style={PARA}>
          En la máxima medida permitida por la ley, en ningún caso Nexify S.A., sus
          afiliadas, directivos, empleados, agentes o licenciantes serán responsables por
          daños indirectos, incidentales, especiales, consecuentes, ejemplares o
          punitivos, ni por pérdida de ganancias, ingresos, datos, fondo de comercio,
          oportunidad de negocio o ahorros previstos, derivados o relacionados con estos
          Términos, el Sitio o el Servicio, sea por contrato, ilícito (incluyendo
          negligencia), responsabilidad objetiva u otra teoría, incluso si fueron
          advertidos de la posibilidad de tales daños.
        </p>
        <p style={PARA}>
          La responsabilidad agregada de Nexpost derivada o relacionada con estos
          Términos, el Sitio o el Servicio no excederá la mayor de: (a) los honorarios
          totales efectivamente pagados por usted a Nexify por el Servicio en los doce
          (12) meses inmediatamente anteriores al hecho que dé origen al reclamo, y
          (b) USD 100.
        </p>

        <h2 style={SECTION_TITLE}>16. Indemnidad</h2>
        <p style={PARA}>
          Usted se compromete a indemnizar, defender y mantener indemne a Nexify S.A. y
          a sus respectivas afiliadas, directivos, empleados, agentes y licenciantes
          frente a cualquier reclamo, responsabilidad, daño, pérdida y gasto (incluyendo
          honorarios legales razonables) derivados o relacionados con: (a) Su Contenido;
          (b) su uso del Servicio; (c) su incumplimiento de estos Términos; (d) su
          violación de cualquier ley aplicable o derecho de terceros (incluyendo los
          términos de cualquier plataforma de terceros); o (e) cualquier disputa entre
          usted y un tercero relacionada con contenido publicado mediante el Servicio.
        </p>

        <h2 style={SECTION_TITLE}>17. Newsletter y comunicaciones de marketing</h2>
        <p style={PARA}>
          Si se suscribe a nuestro newsletter o consiente recibir comunicaciones de
          marketing, acepta recibir emails de producto, promocionales y educativos de
          Nexpost. Puede darse de baja en cualquier momento desde el link “unsubscribe”
          en cualquiera de esos emails. Las comunicaciones transaccionales y de cuenta
          (por ejemplo facturas, alertas de seguridad y avisos del servicio) no son
          opcionales mientras su cuenta esté activa.
        </p>

        <h2 style={SECTION_TITLE}>18. Cookies</h2>
        <p style={PARA}>
          Utilizamos cookies y tecnologías similares en el Sitio para autenticación,
          preferencias, seguridad, analíticas y marketing, según lo descrito en nuestra
          Política de Privacidad. Al utilizar el Sitio usted consiente nuestro uso de
          cookies conforme a esa política y a las preferencias de cookies que haya
          configurado.
        </p>

        <h2 style={SECTION_TITLE}>19. Cambios en los Términos</h2>
        <p style={PARA}>
          Podemos actualizar estos Términos cada cierto tiempo. Cuando un cambio sea
          material, daremos aviso razonable previo por email o notificación en el
          producto. Los cambios entran en vigencia en la fecha indicada al inicio de los
          Términos actualizados; el uso continuado del Servicio luego de esa fecha
          constituye aceptación.
        </p>

        <h2 style={SECTION_TITLE}>20. Ley aplicable y jurisdicción</h2>
        <p style={PARA}>
          Estos Términos y toda obligación no contractual derivada o vinculada con ellos
          se rigen por las leyes de la <strong style={STRONG}>República Argentina</strong>,
          sin atención a sus normas de conflicto. Las partes se someten a la jurisdicción
          exclusiva de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires
          para toda controversia derivada de estos Términos o del Servicio, salvo que
          Nexpost pueda iniciar acciones en cualquier jurisdicción donde usted se
          encuentre o donde esté ocurriendo la infracción de su propiedad intelectual.
        </p>
        <p style={PARA}>
          Nada en esta sección limita los derechos no renunciables que usted pueda tener
          como consumidor bajo las normas imperativas de su país de residencia,
          particularmente la Ley 24.240 de Defensa del Consumidor cuando resulte aplicable.
        </p>

        <h2 style={SECTION_TITLE}>21. Disposiciones generales</h2>
        <p style={PARA}>
          Estos Términos, junto con la Política de Privacidad, el Acuerdo de Tratamiento
          de Datos (cuando corresponda) y cualquier orden de compra o términos
          específicos del plan que usted acepte, constituyen el acuerdo íntegro entre
          usted y Nexify respecto del Servicio. Si alguna disposición fuera declarada
          inválida o inaplicable, las restantes mantendrán plena vigencia. La falta de
          ejercicio de cualquier derecho o disposición no constituye renuncia. Usted no
          podrá ceder estos Términos sin nuestro consentimiento previo por escrito;
          nosotros podremos cederlos a una afiliada o en relación con una fusión,
          adquisición o venta de activos.
        </p>

        <h2 style={SECTION_TITLE}>22. Contacto</h2>
        <p style={PARA}>
          Para cualquier consulta sobre estos Términos, puede comunicarse con nosotros a
          través de:
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
