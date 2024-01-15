import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeModuleOptions } from './module-options.interface';

@Injectable()
export class StripeService extends Stripe {
  constructor(@Inject('STRIPE_CONFIG_OPTIONS') { apiKey, ...options }: StripeModuleOptions) {
    super(apiKey, options);
  }
}
