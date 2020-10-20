import domainSale from '@/assets/images/icons/domain-sale.svg';
import domainSaleHov from '@/assets/images/icons/domain-sale-hov.svg';
import manageEns from '@/assets/images/icons/domain.svg';
import manageEnsHov from '@/assets/images/icons/domain-hov.svg';
import scheduleTransaction from '@/assets/images/icons/eac.svg';
import scheduleTransactionHov from '@/assets/images/icons/eac-hov.svg';
import makerdai from '@/assets/images/icons/dapps/makerdai.svg';
import makerdaiDisabled from '@/assets/images/icons/dapps/makerdai-disabled.svg';
import ambrpay from '@/assets/images/icons/dapps/ambrpay.png';
import ambrpayDisabled from '@/assets/images/icons/dapps/ambrpay-disabled.png';
import aave from '@/assets/images/icons/dapps/aave.svg';
import lendMigrator from '@/assets/images/icons/dapps/lend-migrator.svg';
import unstoppable from '@/assets/images/icons/dapps/unstoppable.png';
import { MYETH } from '@/networks/types';

const dapps = {
  unstoppable: {
    route: '/interface/dapps/unstoppable',
    icon: unstoppable,
    title: 'unstoppable.title',
    desc: 'unstoppable.dapp-desc',
    supportedNetworks: [MYETH.name],
    lastUpdated: '4/15/2020',
    releaseDate: '4/15/2020'
  },
  manageEns: {
    route: '/interface/dapps/manage-ens',
    icon: manageEns,
    iconDisabled: manageEnsHov,
    title: 'ens.title',
    desc: 'ens.dapp-desc',
    supportedNetworks: [MYETH.name],
    lastUpdated: '11/06/2019',
    releaseDate: '10/05/2018'
  },
  domainSale: {
    route: '/interface/dapps/name-wallet',
    icon: domainSale,
    iconDisabled: domainSaleHov,
    title: 'subDomain.title',
    desc: 'subDomain.dapp-desc',
    supportedNetworks: [MYETH.name],
    lastUpdated: '09/20/2019',
    releaseDate: '10/08/2018'
  },
  scheduleTransaction: {
    route: '/interface/dapps/schedule-transaction',
    icon: scheduleTransaction,
    iconDisabled: scheduleTransactionHov,
    title: 'scheduleTx.title',
    desc: 'scheduleTx.dapp-desc',
    supportedNetworks: [MYETH.name],
    lastUpdated: '10/28/2019',
    releaseDate: '02/21/2019'
  },
  maker: {
    route: '/interface/dapps/maker-dai',
    icon: makerdai,
    iconDisabled: makerdaiDisabled,
    title: 'dappsMaker.maker_title',
    desc: 'dappsMaker.maker_desc',
    supportedNetworks: [MYETH.name],
    lastUpdated: '08/14/2019',
    releaseDate: '06/14/2019'
  },
  ambrpay: {
    route: '/interface/dapps/ambrpay',
    icon: ambrpay,
    iconDisabled: ambrpayDisabled,
    title: 'dappsAmbrpay.title',
    desc: 'dappsAmbrpay.ambrpay-popover',
    supportedNetworks: [MYETH.name],
    lastUpdated: '11/05/2019',
    releaseDate: '11/05/2019'
  },
  aave: {
    route: '/interface/dapps/aave',
    icon: aave,
    // iconDisabled: aaveDisabled,
    title: 'dappsAave.title',
    desc: 'dappsAave.popover',
    supportedNetworks: [MYETH.name],
    lastUpdated: '2/26/2020',
    releaseDate: '2/26/2020'
  },
  lendMigrator: {
    route: '/interface/dapps/lend-migrator',
    icon: lendMigrator,
    title: 'dappsAave.lend-title',
    desc: 'dappsAave.lend-popover',
    supportedNetworks: [MYETH.name],
    lastUpdated: '10/2/2020',
    releaseDate: '10/2/2020'
  }
};

export default dapps;
