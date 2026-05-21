export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { BillingSuccessClient } from '@gitroom/frontend/components/billing/billing.success.client';

export const metadata: Metadata = {
  title: 'Pago recibido — Nexpost',
  description: '',
};

export default function Page({
  searchParams,
}: {
  searchParams?: { orgId?: string; plan?: string };
}) {
  return (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <BillingSuccessClient
        orgId={searchParams?.orgId}
        plan={searchParams?.plan}
      />
    </div>
  );
}
