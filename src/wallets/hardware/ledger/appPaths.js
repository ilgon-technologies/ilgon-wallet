import { networkTypes } from '@/networks/types';
import { ledgerEthereum, ledgerLiveEthereum } from '../../bip44/paths';
const appList = Object.values(networkTypes).map(network => ({
  network,
  prefixes: ["m/44'/60'"],
  paths: [ledgerEthereum, ledgerLiveEthereum]
}));
export default appList;
