import tokens from './tokens-ilgt.json';
import icon from '@/assets/images/networks/ilg-test.png';
import contracts from '@/networks/types/contracts-test';

const blockExplorerUrl = 'https://explorer.ilgointest.e-diploma.org';

export default {
  name: 'ILGT',
  name_long: 'ILGON Test',
  homePage: blockExplorerUrl,
  blockExplorerTX: blockExplorerUrl + '/tx/[[txHash]]',
  blockExplorerAddr: blockExplorerUrl + '/address/[[address]]',
  chainID: 0x696c6774,
  tokens,
  contracts,
  ens: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    registrarTLD: 'eth',
    registrarType: 'permanent',
    supportedTld: ['eth', 'xyz']
  },
  icon: icon,
  currencyName: 'ILG'
};
