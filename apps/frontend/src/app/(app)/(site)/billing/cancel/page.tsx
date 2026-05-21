export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pago cancelado — Nexpost',
  description: '',
};

export default function Page() {
  return (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <div className="text-white max-w-2xl mx-auto py-12 flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">Pago cancelado</h1>
        <div className="p-6 rounded-xl border border-yellow-400/40 bg-yellow-400/10">
          <p className="text-yellow-200">
            No completaste el pago o lo cancelaste. Tu suscripción no
            cambió. Si necesitás ayuda, contactanos.
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <Link
            href="/pricing"
            className="px-4 py-2 rounded-md bg-white text-black font-medium"
          >
            Ver planes
          </Link>
          <Link
            href="/billing"
            className="px-4 py-2 rounded-md border border-white/20 text-white"
          >
            Volver a Billing
          </Link>
        </div>
      </div>
    </div>
  );
}
