import tokens from '@/_generated/tokens/tokens-eth.json';
import icon from '@/assets/images/networks/snc.png';
import contracts from '@/networks/types/contracts';

const blockExplorerUrl = 'http://52.58.73.61:4000/';

export default {
  name: 'SNC',
  name_long: 'SystemNativeCoin',
  homePage: 'https://snc.com',
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
  currencyName: 'SNC'
};
