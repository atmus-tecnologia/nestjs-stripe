import { StripeModule, type StripeModuleOptions, StripeService } from '@atmus/nestjs-stripe';
const options: StripeModuleOptions = { apiKey: 'test-key' };
StripeModule.register(options);
declare const client: StripeService;
void client.customers.list({limit: 1});
