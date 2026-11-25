import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    'http_req_duration{endpoint:report}': ['p(95)<100'],
  },
};

export default function () {
  const report = http.get('http://localhost:3000/report', {
    tags: { endpoint: 'report' },
  });

  check(report, {
    'report status is 200': (r) => r.status === 200,
  });

  sleep(1);
}