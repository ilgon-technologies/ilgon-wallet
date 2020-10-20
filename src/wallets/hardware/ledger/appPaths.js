import { MYETH } from '@/networks/types';
import { ledgerEthereum, ledgerLiveEthereum } from '../../bip44/paths';
const appList = [
  {
    network: MYETH,
    prefixes: ["m/44'/60'"],
    paths: [ledgerEthereum, ledgerLiveEthereum]
  }
];
export default appList;
