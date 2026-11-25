
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '2m',
  thresholds: {
    'checks': ['rate>0.90'],
  },
};

export default function () {
  const res = http.post('http://localhost:3000/cart/add');

  check(res, {
    'server responds successfully': (r) => r.status === 200,
  });

  sleep(1);
}
