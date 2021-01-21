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
    })(),
    ETH
  ];
  return Object.fromEntries(usableNetworks.map(n => [n.name, n]));
})();

const ilgs = Object.values(networkTypes).filter(n => n !== ETH);

export { ILG, ILGT, ILGD, ETH, ilgs, networkTypes };
