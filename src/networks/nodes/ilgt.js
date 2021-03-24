import { ILGT } from '../types';

export default {
  type: ILGT,
  service: ILGT.homePage.replace(/^https?:\/\//, ''),
  url: 'https://testnet-rpc.ilgonwallet.com/',
  port: 443,
  auth: false,
  username: '',
  password: ''
};
