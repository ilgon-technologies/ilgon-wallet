import icon from '@/assets/images/networks/ilg.png';

const blockExplorerUrl = 'http://explorer.ilgoindev.e-diploma.org:44000/';

export default {
  name: 'ILGT',
  name_long: 'ILGoin Test',
  homePage: 'https://ilg.com',
  blockExplorerTX: blockExplorerUrl + 'tx/[[txHash]]',
  blockExplorerAddr: blockExplorerUrl + 'address/[[address]]',
  chainID: 0x696c6774,
  tokens: [],
  contracts: [],
  ens: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    registrarTLD: 'eth',
    registrarType: 'permanent',
    supportedTld: ['eth', 'xyz']
  },
  icon: icon,
  currencyName: 'ILG'
};
