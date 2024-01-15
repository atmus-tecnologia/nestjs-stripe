import { Provider } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeOptions } from '../interfaces/stripe-options.interface';

export const createStripeProvider = (options: StripeOptions | any): Provider<Stripe> => ({
  provide: 'STRIPE_TOKEN',
  useValue: new Stripe(options.apiKey, options.options),
});
