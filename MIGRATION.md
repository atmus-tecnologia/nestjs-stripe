# Migrating from 0.1.0 to 1.0.0

This is a breaking release. Upgrade Node.js to 22.12+ and NestJS to 11 or 12 before installing it. Keep @nestjs/common and @nestjs/core on the same major. CommonJS consumers can load the package on supported Node releases; ESM consumers can use named imports. TypeScript consumers should use a modern NodeNext or Node20 module configuration compatible with require(esm) when consuming NestJS 12.

`StripeModule.register({ apiKey, ...sdkOptions })` remains the configuration shape. Import `StripeModuleOptions` for that shape. The historical `StripeOptions` interface (`{ apiKey, config }`) is retained as a legacy type; it is not the register input.

stripe-node 12 → 23 includes breaking API and TypeScript changes. The SDK selects its bundled API version by default; this package does not pin the old version. Review all Stripe major migration guides and API changes before updating payment flows. Align your webhook endpoint's API version with the events your application expects. No Stripe account, price, subscription or webhook configuration is changed by installing this library.

Use `rawBody: true` when creating a Nest HTTP application, and verify the original Buffer using `webhooks.constructEvent`. Parsed/re-serialized JSON cannot replace the raw body. Test the integration in Stripe test mode before production.

See the [stripe-node migration guides](https://github.com/stripe/stripe-node/wiki).

Run your application's integration tests before rollout. This repository's tests use offline transports; they do not establish live-provider or production behavior.
