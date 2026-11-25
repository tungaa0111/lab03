
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
};

export default function () {
  const res = http.post('http://localhost:3000/cart/add');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
