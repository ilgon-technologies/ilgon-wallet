import {ILG} from '../types';

export default {
  type: ILG,
  service: ILG.homePage.replace(/^https?:\/\//, ''),
  url: 'https://mainnet-rpc.ilgonwallet.com',
  port: 443,
  auth: false,
  username: '',
  password: ''
};
