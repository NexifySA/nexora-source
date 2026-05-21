'use client';

import { FC } from 'react';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { BillingComponent } from '@gitroom/frontend/components/billing/billing.component';
import { DlocalBillingComponent } from '@gitroom/frontend/components/billing/dlocal.billing.component';

// Decide que vista de billing mostrar segun BILLING_PROVIDER configurado.
// 'dlocal_go' -> componente nuevo (sin Stripe portal).
// 'stripe' o 'none' -> componente Stripe legacy (intacto).
export const BillingSwitch: FC = () => {
  const { billingProvider } = useVariables();

  if (billingProvider === 'dlocal_go') {
    return <DlocalBillingComponent />;
  }

  return <BillingComponent />;
};
