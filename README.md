# @atmus/nestjs-stripe

Inject the official Stripe Node SDK into NestJS applications for customers, Checkout, subscriptions and webhook verification.

## Installation

```sh
npm install @atmus/nestjs-stripe @nestjs/common reflect-metadata rxjs
```

Use the same Nest major as your application. Upgrading from a previous release? Read [MIGRATION.md](MIGRATION.md) first.

## Configuration

```ts
import { Module } from '@nestjs/common';
import { StripeModule } from '@atmus/nestjs-stripe';

@Module({
  imports: [StripeModule.register({ apiKey: process.env.STRIPE_SECRET_KEY! })],
})
export class AppModule {}
```

Load STRIPE_SECRET_KEY before registering the module. Never commit API keys or passwords.
For asynchronous configuration:

```ts
StripeModule.registerAsync({
  useFactory: async () => ({ apiKey: process.env.STRIPE_SECRET_KEY! }),
})
```

`registerAsync` requires `useFactory`; `imports` and `inject` let you use your own configuration providers.

## Usage and API

```ts
import { Injectable } from '@nestjs/common';
import { StripeService } from '@atmus/nestjs-stripe';

@Injectable()
export class BillingService {
  constructor(private readonly stripe: StripeService) {}

  listCustomers() {
    return this.stripe.customers.list({ limit: 10 });
  }
}
```

StripeService extends the official Stripe client: SDK resources, errors, retries and request options are available directly. Pass SDK configuration beside apiKey, for example `{ apiKey, maxNetworkRetries: 2, timeout: 30000 }`. The SDK's bundled API version is used unless configured explicitly; see the migration guide before upgrading existing billing flows.

### Webhook verification

Enable raw-body capture at application bootstrap:

```ts
const app = await NestFactory.create(AppModule, { rawBody: true });
```

Inside your webhook handler, pass the original `request.rawBody` Buffer, the `stripe-signature` header and your endpoint secret to:

```ts
const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
```

Reject invalid signatures before handling events. Use idempotent event handling in your application. This package does not install a webhook route or perform any charges automatically.

Public exports include StripeModule, StripeService, StripeModuleOptions and StripeModuleAsyncOptions. The legacy StripeOptions type remains exported; register uses the flat StripeModuleOptions shape.


## Compatibility and development

Requires **Node.js 22.12+**, **NestJS 11 or 12**, RxJS 7.8+ and reflect-metadata 0.2.2+.
The package ships CommonJS JavaScript, TypeScript declarations and source maps. Modern Node supports loading NestJS 12's ESM dependencies; use a compatible NodeNext/Node20 TypeScript configuration in consuming applications.

```sh
npm ci
npm run check
```

Checks include offline regression tests and installation of the actual npm archive in an isolated consumer. CI covers Node 22/24 and Nest 11/12. No real API credentials are used by the test suite. Live provider behavior must be validated in your application.

See [CHANGELOG.md](CHANGELOG.md), [MIGRATION.md](MIGRATION.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for release history, breaking changes and publication instructions. Licensed under [MIT](LICENSE).
