export const dynamic = 'force-dynamic';
import { BillingSwitch } from '@gitroom/frontend/components/billing/billing.switch';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Nexpost' : 'Nexpost'} Billing`,
  description: '',
};
export default async function Page() {
  return (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <BillingSwitch />
    </div>
  );
}
