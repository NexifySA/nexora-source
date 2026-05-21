import { Injectable, Logger, Optional } from '@nestjs/common';
import {
  BillingProvider,
  BillingProviderName,
} from '@gitroom/nestjs-libraries/billing/billing.provider.interface';

// Factory que decide que provider usar en runtime segun BILLING_PROVIDER env.
// Se inyectan ambos servicios (Stripe + dLocal Go); si alguno no esta
// disponible (no provisto en el modulo), simplemente se ignora.
@Injectable()
export class BillingProviderFactory {
  private readonly logger = new Logger(BillingProviderFactory.name);

  constructor(
    @Optional() private readonly _dlocalGo?: BillingProvider,
    @Optional() private readonly _stripeProvider?: BillingProvider
  ) {}

  resolve(): BillingProvider | null {
    const configured = (process.env.BILLING_PROVIDER ||
      (process.env.STRIPE_PUBLISHABLE_KEY
        ? 'stripe'
        : 'none')) as BillingProviderName;

    switch (configured) {
      case 'dlocal_go':
        if (!this._dlocalGo) {
          this.logger.error(
            'BILLING_PROVIDER=dlocal_go pero el servicio no esta instanciado'
          );
          return null;
        }
        return this._dlocalGo;
      case 'stripe':
        if (!this._stripeProvider) {
          this.logger.warn(
            'BILLING_PROVIDER=stripe pero el adapter de Stripe no esta cargado'
          );
          return null;
        }
        return this._stripeProvider;
      case 'none':
      default:
        return null;
    }
  }

  /** Forzar un provider especifico (uso interno: webhook router). */
  resolveByName(name: BillingProviderName): BillingProvider | null {
    if (name === 'dlocal_go') return this._dlocalGo || null;
    if (name === 'stripe') return this._stripeProvider || null;
    return null;
  }
}
