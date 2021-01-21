import { ILG, ILGD } from '../types';

export default {
  type: ILGD,
  service: ILG.homePage.replace(/^https?:\/\//, ''),
  url: 'https://wallet.ilgoindev.e-diploma.org/rpc/eth/',
  port: 443,
  auth: false,
  username: '',
  password: ''
};
