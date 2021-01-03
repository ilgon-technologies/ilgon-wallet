import tokens from './tokens-ilg.json';
import icon from '@/assets/images/networks/ilg.png';
import contracts from '@/networks/types/contracts';

const blockExplorerUrl = 'https://explorer.ilgoindev.e-diploma.org/';

export default {
  name: 'ILG',
  name_long: 'ILGON',
  homePage: 'https://ilg.com',
  blockExplorerTX: blockExplorerUrl + 'tx/[[txHash]]',
  blockExplorerAddr: blockExplorerUrl + 'address/[[address]]',
  chainID: 0x696c6374,
  tokens: tokens,
  contracts: contracts,
  ens: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    registrarTLD: 'eth',
    registrarType: 'permanent',
    supportedTld: ['eth', 'xyz']
  },
  icon: icon,
  currencyName: 'ILG'
};
