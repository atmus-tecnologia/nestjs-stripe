import { ModuleMetadata } from '@nestjs/common';
import Stripe from 'stripe';

export type StripeModuleOptions = {
  apiKey: string;
} & Stripe.StripeConfig;
export interface StripeModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<StripeModuleOptions> | StripeModuleOptions;
  inject?: any[];
}
