import { SNC } from '../types';
const url =
  (process.env.NODE_ENV === 'production'
    ? window.location.origin
    : 'http://18.193.173.193') + '/rpc/eth/';
const port = url.startsWith('http://') ? 80 : 443;
export default {
  type: SNC,
  service: 'snc.com',
  url,
  port,
  auth: false,
  username: '',
  password: ''
};
