import ILG from './ILG.js';
import ILGT from './ILGT.js';
import ILGD from './ILGD.js';
import ETH from './ETH.js';

const networkTypes = (() => {
  const usableNetworks = [
    ...(() => {
      switch (process.env.VUE_APP_MODE) {
        case 'prod':
          return [ILG, ILGT];
        case 'test':
          return [ILGT, ILGD];
      }
      throw new TypeError('env variable VUE_APP_MODE should be prod or test');
    })()
  ];
  return Object.fromEntries(usableNetworks.map(n => [n.name, n]));
})();

const ilgs = Object.values(networkTypes).filter(n => n !== ETH);

const networkTypeEq = t1 => t2 => t1.name === t2.name;

export { ILG, ILGT, ILGD, ETH, ilgs, networkTypes, networkTypeEq };
