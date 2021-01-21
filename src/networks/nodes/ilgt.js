import { ILGT } from '../types';
import { removeProtocol } from '@/networks/nodes/index';

export default {
  type: ILGT,
  service: removeProtocol(ILGT.homePage),
  url: 'https://wallet.ilgointest.e-diploma.org/rpc/ilgtest/',
  port: 443,
  auth: false,
  username: '',
  password: ''
};
