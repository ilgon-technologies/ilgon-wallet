import { ILG } from '../types';
import { removeProtocol } from '@/networks/nodes/index';

export default {
  type: ILG,
  service: removeProtocol(ILG.homePage),
  url: 'https://mainnet-rpc.ilgonwallet.com',
  port: 443,
  auth: false,
  username: '',
  password: ''
};
