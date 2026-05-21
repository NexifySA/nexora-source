'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { pricing } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/pricing';

interface Status {
  status: string;
  planId?: string;
  period?: 'MONTHLY' | 'YEARLY';
  trialEndsAt?: string | null;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  lastPaymentStatus?: string | null;
  provider?: string;
}

const STATUS_LABEL: Record<string, string> = {
  trialing: 'Trial activo',
  active: 'Activo',
  past_due: 'Pago pendiente',
  cancelled: 'Cancelado',
  expired: 'Vencido',
  payment_failed: 'Pago rechazado',
};

const PLAN_OPTIONS = ['STANDARD', 'TEAM', 'PRO', 'ULTIMATE'] as const;

const PLAN_FEATURES: Record<(typeof PLAN_OPTIONS)[number], string[]> = {
  STANDARD: [
    '5 canales',
    '400 posts por mes',
    'Calendario de contenidos',
    'Editor avanzado de imágenes',
    'API pública',
    'Webhooks básicos',
    'Modo claro / oscuro',
  ],
  TEAM: [
    '10 canales',
    'Posts ilimitados',
    'Miembros de equipo',
    'RSS auto-post',
    'Community features',
    'Más webhooks',
    'Todo lo de Standard',
  ],
  PRO: [
    '30 canales',
    'Posts ilimitados',
    'Miembros de equipo',
    'Webhooks ampliados',
    'Funciones avanzadas para empresas',
    'Todo lo de Team',
  ],
  ULTIMATE: [
    '100 canales',
    'Posts ilimitados',
    'Miembros de equipo',
    'Alto volumen de webhooks',
    'Pensado para agencias',
    'Todo lo de Pro',
  ],
};

const PLAN_AUDIENCE: Record<(typeof PLAN_OPTIONS)[number], string> = {
  STANDARD: 'Para creadores de contenido',
  TEAM: 'Para marcas pequeñas',
  PRO: 'Para empresas en crecimiento',
  ULTIMATE: 'Para agencias',
};

export const DlocalBillingComponent: FC = () => {
  const fetch = useFetch();
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = useCallback(async () => {
    try {
      const r = await fetch('/dlocal/subscription/status');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data: Status = await r.json();
      setStatus(data);
    } catch (e: any) {
      setError(e?.message || 'No se pudo cargar estado');
    } finally {
      setLoading(false);
    }
  }, [fetch]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const checkout = useCallback(
    async (planId: string, period: 'MONTHLY' | 'YEARLY') => {
      setSubmitting(planId);
      setError(null);
      try {
        const r = await fetch('/dlocal/checkout', {
          method: 'POST',
          body: JSON.stringify({ planId, period }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data: { checkoutUrl: string } = await r.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          throw new Error('Sin checkoutUrl en respuesta');
        }
      } catch (e: any) {
        setError(e?.message || 'No se pudo iniciar el pago');
        setSubmitting(null);
      }
    },
    [fetch]
  );

  const cancel = useCallback(async () => {
    if (
      !confirm('¿Cancelar tu suscripción al final del período actual?')
    ) {
      return;
    }
    try {
      const r = await fetch('/dlocal/subscription/cancel', { method: 'POST' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      await loadStatus();
    } catch (e: any) {
      setError(e?.message || 'No se pudo cancelar');
    }
  }, [fetch, loadStatus]);

  if (loading) {
    return <div className="text-customColor18">Cargando estado…</div>;
  }

  const isExpired = status?.status === 'expired';
  const isTrial = status?.status === 'trialing';
  const trialDaysLeft =
    status?.trialEndsAt
      ? Math.max(
          0,
          Math.ceil(
            (new Date(status.trialEndsAt).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : null;

  return (
    <div className="text-textColor flex flex-col gap-6">
      {isExpired && (
        <div className="p-4 rounded-xl border border-red-500/50 bg-red-500/10 text-red-500">
          <strong>Tu suscripción venció.</strong> Funcionalidades premium
          bloqueadas. Elegí un plan abajo para reactivar la cuenta.
        </div>
      )}
      {isTrial && trialDaysLeft !== null && (
        <div className="p-4 rounded-xl border border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-300">
          <strong>Trial activo:</strong> te quedan {trialDaysLeft}{' '}
          {trialDaysLeft === 1 ? 'día' : 'días'}. Sin tarjeta. Suscribite
          cuando quieras para mantener el acceso.
        </div>
      )}

      <section className="p-6 rounded-xl border border-newBorder bg-newBgColorInner">
        <h2 className="text-xl font-semibold mb-3 text-textColor">
          Tu suscripción
        </h2>
        {status ? (
          <div className="flex flex-col gap-2 text-sm text-textColor">
            <div>
              <span className="text-customColor18">Plan:</span>{' '}
              <strong>{status.planId || 'FREE'}</strong>
            </div>
            <div>
              <span className="text-customColor18">Estado:</span>{' '}
              <strong>
                {STATUS_LABEL[status.status] || status.status}
              </strong>
            </div>
            {status.trialEndsAt && isTrial && (
              <div>
                <span className="text-customColor18">Trial vence:</span>{' '}
                {new Date(status.trialEndsAt).toLocaleDateString()}
              </div>
            )}
            {status.currentPeriodEnd && !isTrial && (
              <div>
                <span className="text-customColor18">
                  Próximo vencimiento:
                </span>{' '}
                {new Date(status.currentPeriodEnd).toLocaleDateString()}
              </div>
            )}
            {status.cancelAtPeriodEnd && (
              <div className="text-yellow-600 dark:text-yellow-400">
                Programada para cancelarse al fin del período.
              </div>
            )}
            {status.lastPaymentStatus && (
              <div className="text-xs text-customColor18">
                Último pago: {status.lastPaymentStatus}
              </div>
            )}
          </div>
        ) : (
          <div className="text-customColor18">Sin suscripción activa.</div>
        )}

        {status?.status === 'active' && !status.cancelAtPeriodEnd && (
          <button
            onClick={cancel}
            className="mt-4 px-4 py-2 rounded-md border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
          >
            Cancelar suscripción
          </button>
        )}
      </section>

      <section className="p-6 rounded-xl border border-newBorder bg-newBgColorInner">
        <h2 className="text-xl font-semibold mb-4 text-textColor">
          Cambiar de plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {PLAN_OPTIONS.map((planId) => {
            const p = pricing[planId];
            const isCurrent = status?.planId === planId;
            return (
              <div
                key={planId}
                className={`p-5 rounded-xl border flex flex-col gap-3 ${
                  isCurrent
                    ? 'border-[#612BD3] bg-[#612BD3]/10'
                    : 'border-newBorder bg-newBgColorInnerInner'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-lg tracking-wide text-textColor">
                      {planId}
                    </strong>
                    {isCurrent && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-[2px] rounded-full bg-[#612BD3] text-white font-semibold">
                        Tu plan
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-customColor18">
                    {PLAN_AUDIENCE[planId]}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold leading-none text-textColor">
                    US${p.month_price}
                  </span>
                  <span className="text-sm text-customColor18">/ mes</span>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-textColor flex-1 mt-1">
                  {PLAN_FEATURES[planId].map((feat) => (
                    <li key={feat} className="flex gap-2 items-start">
                      <span className="mt-[5px] inline-block w-[6px] h-[6px] rounded-full bg-[#612BD3] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => checkout(planId, 'MONTHLY')}
                  disabled={submitting === planId || isCurrent}
                  className="mt-2 px-3 py-2 rounded-md bg-[#612BD3] hover:bg-[#5520CB] text-white font-medium disabled:opacity-50 disabled:hover:bg-[#612BD3] transition-colors"
                >
                  {isCurrent
                    ? 'Plan actual'
                    : submitting === planId
                    ? 'Redirigiendo…'
                    : 'Suscribirme'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {error && (
        <div className="p-3 rounded-md border border-red-500/50 bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
