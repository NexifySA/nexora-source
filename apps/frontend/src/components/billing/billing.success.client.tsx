'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import Link from 'next/link';

type Status = {
  status: string;
  planId?: string;
  currentPeriodEnd?: string | null;
};

const LABEL: Record<string, string> = {
  trialing: 'Trial activo',
  active: 'Pago confirmado',
  past_due: 'Pago en proceso',
  payment_failed: 'Pago rechazado',
  cancelled: 'Cancelado',
  expired: 'Vencido',
};

export const BillingSuccessClient: FC<{ orgId?: string; plan?: string }> = ({
  orgId,
  plan,
}) => {
  const fetch = useFetch();
  const [status, setStatus] = useState<Status | null>(null);
  const [retries, setRetries] = useState(0);

  const load = useCallback(async () => {
    try {
      const r = await fetch('/dlocal/subscription/status');
      if (r.ok) {
        const data = (await r.json()) as Status;
        setStatus(data);
      }
    } catch {
      // silencio
    }
  }, [fetch]);

  // Polling cada 3s hasta 6 intentos (18s) por si el webhook todavia no llego.
  useEffect(() => {
    load();
    if (retries >= 6) return;
    const t = setTimeout(() => {
      if (status?.status !== 'active') {
        setRetries((r) => r + 1);
        load();
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [load, retries, status?.status]);

  const isActive = status?.status === 'active';
  const isPending = !status || status.status === 'past_due';

  return (
    <div className="text-white max-w-2xl mx-auto py-12 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">
        {isActive ? 'Pago confirmado' : 'Verificando tu pago…'}
      </h1>

      {isActive && (
        <div className="p-6 rounded-xl border border-green-400/40 bg-green-400/10">
          <p className="text-green-200 mb-2">
            Tu plan <strong>{status?.planId || plan}</strong> está activo.
          </p>
          {status?.currentPeriodEnd && (
            <p className="text-sm opacity-70">
              Próximo vencimiento:{' '}
              {new Date(status.currentPeriodEnd).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {isPending && (
        <div className="p-6 rounded-xl border border-yellow-400/40 bg-yellow-400/10">
          <p className="text-yellow-200">
            Estamos esperando confirmación de dLocal Go. Esto suele tomar
            entre 5 y 30 segundos. Si pasaron más de 2 minutos, refrescá
            esta página o contactanos.
          </p>
          <p className="text-xs opacity-60 mt-2">
            Intento {retries + 1} / 7
          </p>
        </div>
      )}

      {status?.status === 'payment_failed' && (
        <div className="p-6 rounded-xl border border-red-400/40 bg-red-400/10">
          <p className="text-red-200">
            El pago fue rechazado. Probá con otro medio de pago.
          </p>
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <Link
          href="/billing"
          className="px-4 py-2 rounded-md bg-white text-black font-medium"
        >
          Ir a Billing
        </Link>
        <Link
          href="/launches"
          className="px-4 py-2 rounded-md border border-white/20 text-white"
        >
          Volver al dashboard
        </Link>
      </div>

      {orgId && (
        <div className="text-xs opacity-40 mt-2">
          Org: {orgId} {plan && `· Plan: ${plan}`}
        </div>
      )}
    </div>
  );
};
