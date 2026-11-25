import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,
  duration: '1m',
  thresholds: {
    'http_req_duration{endpoint:cart}': ['p(95)<200'],
    'http_req_failed{endpoint:pay}': ['rate<0.08'],
    'checks': ['rate>0.90'],
  },
};

export default function () {
  const cart = http.post(
    'http://localhost:3000/cart/add',
    null,
    { tags: { endpoint: 'cart' } }
  );

  check(cart, {
    'cart status is 200': (r) => r.status === 200,
  });

  const pay = http.post(
    'http://localhost:3000/pay',
    null,
    { tags: { endpoint: 'pay' } }
  );

  check(pay, {
    'payment status is 200': (r) => r.status === 200,
  });

  const report = http.get(
    'http://localhost:3000/report',
    { tags: { endpoint: 'report' } }
  );

  check(report, {
    'report status is 200': (r) => r.status === 200,
  });

  sleep(1);
}