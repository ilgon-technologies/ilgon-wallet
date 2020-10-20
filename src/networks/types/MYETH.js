import tokens from '@/_generated/tokens/tokens-eth.json';
import contracts from '@/_generated/contracts/contract-abi-eth.json';
import eth from '@/assets/images/networks/myeth.svg';

export default {
  name: 'MYETH',
  name_long: 'MyEthereum',
  homePage: 'https://meth.org',
  blockExplorerTX: 'https://etherscan.io/tx/[[txHash]]',
  blockExplorerAddr: 'https://etherscan.io/address/[[address]]',
  chainID: 1,
  tokens: tokens,
  contracts: contracts,
  ens: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    registrarTLD: 'eth',
    registrarType: 'permanent',
    supportedTld: ['eth', 'xyz']
  },
  icon: eth,
  currencyName: 'MYETH'
};
