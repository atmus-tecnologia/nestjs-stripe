require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('node:http');
const { once } = require('node:events');
const { StripeService } = require('../dist');

test('SDK resources pass options and credentials to an offline HTTP server', async t => {
  let request;
  const server = createServer((req, res) => {
    request = { url: req.url, auth: req.headers.authorization };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ object: 'list', data: [{ id: 'cus_test' }], has_more: false }));
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const stripe = new StripeService({ apiKey: 'sk_test_placeholder', host: '127.0.0.1', port: server.address().port, protocol: 'http', maxNetworkRetries: 0 });
  const customers = await stripe.customers.list({ limit: 1 });
  assert.equal(customers.data[0].id, 'cus_test');
  assert.match(request.url, /customers\?limit=1/);
  assert.equal(request.auth, 'Bearer sk_test_placeholder');
});

test('webhooks verify raw body signatures and reject modified payloads', () => {
  const stripe = new StripeService({ apiKey: 'sk_test_placeholder' });
  const payload = JSON.stringify({ id: 'evt_test', object: 'event', type: 'customer.created' });
  const secret = 'whsec_test';
  const header = stripe.webhooks.generateTestHeaderString({ payload, secret });
  assert.equal(stripe.webhooks.constructEvent(Buffer.from(payload), header, secret).id, 'evt_test');
  assert.throws(() => stripe.webhooks.constructEvent(payload + ' ', header, secret));
});
