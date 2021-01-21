import { ILG, ILGD } from '../types';
import { removeProtocol } from '@/networks/nodes/index';

export default {
  type: ILGD,
  service: removeProtocol(ILG.homePage),
  url: 'https://wallet.ilgoindev.e-diploma.org/rpc/eth/',
  port: 443,
  auth: false,
  username: '',
  password: ''
};
