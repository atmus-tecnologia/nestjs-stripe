require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Module } = require('@nestjs/common');
const { Test } = require('@nestjs/testing');
const { StripeModule, StripeService } = require('../dist');
const options = { apiKey: 'sk_test_placeholder', maxNetworkRetries: 0 };

test('synchronous and async factory registration resolve the injectable service', async () => {
  class Config { getOptions() { return options; } }
  class ConfigModule {}
  Module({ providers: [Config], exports: [Config] })(ConfigModule);
  for (const definition of [
    StripeModule.register(options),
    StripeModule.registerAsync({ imports: [ConfigModule], inject: [Config], useFactory: async config => config.getOptions() }),
  ]) {
    const context = await Test.createTestingModule({ imports: [definition] }).compile();
    try { assert.equal(typeof context.get(StripeService).customers.list, 'function'); }
    finally { await context.close(); }
  }
});

test('empty async options fail with a useful message', () => {
  assert.throws(() => StripeModule.registerAsync({}), /requires useFactory/);
});
