<template>
  <div class="interface-layout">
    <!-- Modals ******************************************************** -->
    <!-- Modals ******************************************************** -->
    <!-- Modals ******************************************************** -->
    <wallet-password-modal />
    <enter-pin-number-modal />
    <ledger-app-modal
      ref="ledgerAppModal"
      :networks="Networks"
      @hardwareWalletOpen="toggleNetworkAddrModal"
    />
    <mnemonic-modal
      ref="mnemonicPhraseModal"
      :hardware-wallet-open="toggleNetworkAddrModal"
    />

    <mnemonic-password-modal
      ref="mnemonicPhrasePassword"
      :hardware-wallet-open="toggleNetworkAddrModal"
      :phrase="phrase"
    />
    <network-and-address-modal
      ref="networkAddress"
      :hardware-wallet="hwInstance"
    />
    <hardware-password-modal
      ref="hardwareModal"
      :wallet-constructor="walletConstructor"
      :hardware-brand="hardwareBrand"
      @hardwareWalletOpen="toggleNetworkAddrModal"
    />
    <print-modal
      ref="printModal"
      :priv-key="!wallet"
      :address="account.address"
    />
    <expired-names-modal ref="expiredNames" />
    <address-qrcode-modal ref="addressQrcodeModal" :address="account.address" />
    <!-- Modals ******************************************************** -->
    <!-- Modals ******************************************************** -->
    <!-- Modals ******************************************************** -->

    <div class="mobile-interface-address-block">
      <mobile-interface-address
        :address="address"
        :print="print"
        :switch-addr="switchAddress"
      />
      <mobile-interface-balance
        :balance="balance"
        :get-balance="getBalance"
        class="mt-2"
      />
      <mobile-interface-network :block-number="blockNumber" class="mt-2" />
    </div>
    <div class="wrap">
      <div class="sidemenu">
        <div
          :class="isSidemenuOpen && 'side-nav-open'"
          class="side-nav-background"
          @click="startToggleSideMenu;"
        />
        <div :class="isSidemenuOpen && 'side-nav-open'" class="side-nav">
          <interface-side-menu />
        </div>
      </div>
      <div class="contents">
        <div class="tx-contents">
          <div class="content-container mobile-hide">
            <interface-address
              v-if="wallet"
              :address="address"
              :print="print"
              :switch-addr="switchAddress"
              :display-addr="wallet.displayAddress"
              :qrcode="openAddressQrcode"
            />
          </div>
          <div class="content-container mobile-hide">
            <interface-balance :balance="balance" :get-balance="getBalance" />
          </div>
          <div class="content-container mobile-hide">
            <interface-network :block-number="blockNumber" />
          </div>
          <router-view
            :tokens-with-balance="tokensWithBalance"
            :get-balance="getBalance"
            :tokens="tokens"
            :highest-gas="highestGas"
            :nonce="nonce"
            :value="value"
            :data="data"
            :to="to"
            :gaslimit="gaslimit"
            :gas="gas"
            :tokensymbol="tokensymbol"
            :is-prefilled="prefilled"
            :clear-prefilled="clearPrefilled"
            :check-prefilled="checkPrefilled"
          />
          <div class="tokens">
            <interface-tokens
              v-if="$route.fullPath !== '/interface/dapps/aave/action'"
              :fetch-tokens="fetchSetTokens"
              :get-token-balance="getTokenBalance"
              :tokens="tokens"
              :received-tokens="receivedTokens"
              :reset-token-selection="setTokensWithBalance"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ENS from 'ethereum-ens';
import WalletPasswordModal from '@/components/WalletPasswordModal';
import EnterPinNumberModal from '@/components/EnterPinNumberModal';
import NetworkAndAddressModal from '@/layouts/AccessWalletLayout/components/NetworkAndAddressModal';
import HardwarePasswordModal from '@/layouts/AccessWalletLayout/components/HardwarePasswordModal';
import MnemonicPasswordModal from '@/layouts/AccessWalletLayout/components/MnemonicPasswordModal';
import MnemonicModal from '@/layouts/AccessWalletLayout/components/MnemonicModal';
import LedgerAppModal from '@/layouts/AccessWalletLayout/components/LedgerAppModal';
import InterfaceAddress from './components/InterfaceAddress';
import InterfaceBalance from './components/InterfaceBalance';
import InterfaceNetwork from './components/InterfaceNetwork';
import InterfaceSideMenu from './components/InterfaceSideMenu';
import InterfaceTokens from './components/InterfaceTokens';
import MobileInterfaceAddress from './components/MobileInterfaceAddress';
import MobileInterfaceBalance from './components/MobileInterfaceBalance';
import MobileInterfaceNetwork from './components/MobileInterfaceNetwork';
import ExpiredNamesModal from './components/ExpiredNamesModal';
import PrintModal from './components/PrintModal';
import { Web3Wallet } from '@/wallets/software';
import { Toast } from '@/helpers';
import { toChecksumAddress } from '@/helpers/addressUtils';
import { networkTypes } from '@/networks/types';
import { BigNumber } from 'bignumber.js';
import store from 'store';
import sortByBalance from '@/helpers/sortByBalance.js';
import AddressQrcodeModal from '@/components/AddressQrcodeModal';
import web3Utils from 'web3-utils';
import { isAddress } from '@/helpers/addressUtils';
import { ETH } from '@/networks/types';
import { LedgerWallet, TrezorWallet } from '@/wallets';
import {
  WEB3_WALLET as WEB3_TYPE,
  LEDGER as LEDGER_TYPE,
  TREZOR as TREZOR_TYPE,
  MNEMONIC as MNEMONIC_TYPE
} from '@/wallets/bip44/walletTypes';
import {
  getGasBasedOnType,
  getOther,
  getEconomy
} from '@/helpers/gasMultiplier.js';
import ExpiryAbi from './expiryAbi.js';
import { getAddressTokens } from './graphQLHelpers';

const ENS_TOKEN_ADDRESS = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';
const EXPIRY_CHECK_CONTRACT = '0x78e21d038fcbb6d56f825dc1e8d8acd965744adb';

export default {
  name: 'Interface',
  components: {
    'interface-side-menu': InterfaceSideMenu,
    'interface-address': InterfaceAddress,
    'interface-balance': InterfaceBalance,
    'interface-network': InterfaceNetwork,
    'interface-tokens': InterfaceTokens,
    'wallet-password-modal': WalletPasswordModal,
    'print-modal': PrintModal,
    'network-and-address-modal': NetworkAndAddressModal,
    'hardware-password-modal': HardwarePasswordModal,
    'mnemonic-modal': MnemonicModal,
    'mnemonic-password-modal': MnemonicPasswordModal,
    'enter-pin-number-modal': EnterPinNumberModal,
    'mobile-interface-address': MobileInterfaceAddress,
    'mobile-interface-balance': MobileInterfaceBalance,
    'mobile-interface-network': MobileInterfaceNetwork,
    'address-qrcode-modal': AddressQrcodeModal,
    'ledger-app-modal': LedgerAppModal,
    'expired-names-modal': ExpiredNamesModal
  },
  data() {
    return {
      balance: '0',
      blockNumber: 0,
      tokens: [],
      receivedTokens: false,
      tokensWithBalance: [],
      pollBlock: () => {},
      pollNetwork: () => {},
      pollddress: () => {},
      pollBalance: () => {},
      highestGas: '0',
      alert: {
        show: false,
        msg: ''
      },
      hws: {
        ledger: LedgerWallet,
        trezor: TrezorWallet
      },
      hwInstance: {},
      walletConstructor: () => {},
      hardwareBrand: '',
      phrase: '',
      nonce: '0',
      value: '0',
      data: '',
      to: '',
      gaslimit: '21000',
      gas: 0,
      tokensymbol: '',
      prefilled: false,
      bcVaultWallets: []
    };
  },
  computed: {
    isSidemenuOpen() {
      return this.sidemenuOpen;
    },
    address() {
      if (this.wallet !== null) {
        return toChecksumAddress(this.account.address);
      }
      return null;
    },
    ...mapState('main', [
      'network',
      'account',
      'online',
      'web3',
      'Networks',
      'sidemenuOpen',
      'wallet',
      'linkQuery'
    ])
  },
  watch: {
    web3() {
      this.setupOnlineEnvironment();
    },
    address(val) {
      if (val) this.setupOnlineEnvironment();
    },
    network() {
      this.clearIntervals();
      this.setupOnlineEnvironment();
    },
    receivedTokens(val) {
      if (val) this.setTokensWithBalance();
    }
  },
  mounted() {
    this.setupOnlineEnvironment();
  },
  destroyed() {
    this.clearIntervals();
  },
  methods: {
    ...mapActions('main', [
      'switchNetwork',
      'setWeb3Instance',
      'saveQueryVal',
      'updateBlockNumber',
      'setAccountBalance',
      'setENS',
      'decryptWallet',
      'toggleSideMenu',
      'setGasPrice',
      'setEthGasPrice'
    ]),
    fetchSetTokens() {
      this.setTokens().then(res => {
        this.tokens = res;
        this.receivedTokens = true;
      });
    },
    checkPrefilled() {
      const _self = this;
      const hasLinkQuery = Object.keys(_self.linkQuery).length;
      if (hasLinkQuery > 0) {
        _self.prefilled = true;
        const {
          value,
          data,
          to,
          gaslimit,
          gas,
          tokensymbol,
          network
        } = _self.linkQuery;
        _self.value =
          value && new BigNumber(value).gt(0)
            ? new BigNumber(value).toFixed()
            : '0';
        _self.data = data && web3Utils.isHexStrict(data) ? data : '';
        _self.to = to && isAddress(to) ? to : '';
        _self.gaslimit =
          gaslimit && new BigNumber(gaslimit).gt(0) ? gaslimit : '21000';
        _self.gas = gas && new BigNumber(gas).gt(0) ? new BigNumber(gas) : 0;
        _self.tokensymbol = tokensymbol ? tokensymbol : '';
        if (network) {
          const foundNetwork = _self.Networks[network.toUpperCase()];
          // eslint-disable-next-line
          if (!!foundNetwork) {
            _self.switchNetwork(foundNetwork[0]).then(() => {
              _self.setWeb3Instance();
            });
          }
        }
        _self.saveQueryVal({});
      }
    },
    clearPrefilled() {
      this.value = '0';
      this.data = '';
      this.to = '';
      this.gaslimit = '21000';
      this.gas = 0;
      this.tokensymbol = '';
      this.prefilled = false;
    },
    openAddressQrcode() {
      this.$refs.addressQrcodeModal.$refs.addressQrcode.show();
    },
    mnemonicphrasePasswordModalOpen(phrase) {
      this.phrase = phrase;
      this.$refs.mnemonicPhraseModal.$refs.mnemonicPhrase.hide();
      this.$refs.mnemonicPhrasePassword.$refs.password.show();
    },
    toggleNetworkAddrModal(walletInstance) {
      this.$refs.hardwareModal.$refs.password.hide();
      this.$refs.mnemonicPhrasePassword.$refs.password.hide();
      this.hwInstance = walletInstance;
      this.$refs.networkAddress.$refs.networkAndAddress.show();
    },
    togglePasswordModal(construct, brand) {
      this.walletConstructor = construct;
      this.hardwareBrand = brand;
      this.$refs.hardwareModal.$refs.password.show();
    },
    ledgerAppModalOpen() {
      this.$refs.ledgerAppModal.$refs.ledgerApp.show();
    },
    switchAddress() {
      switch (this.account.identifier) {
        case LEDGER_TYPE:
          this.ledgerAppModalOpen();
          break;
        case TREZOR_TYPE:
          TrezorWallet()
            .then(_newWallet => {
              this.toggleNetworkAddrModal(_newWallet);
            })
            .catch(TrezorWallet.errorHandler);
          break;
        case MNEMONIC_TYPE:
          this.$refs.mnemonicPhraseModal.$refs.mnemonicPhrase.show();
          break;
        default:
          Toast.responseHandler(
            new Error(
              `Wallet type ${this.account.identifier} can't switch addresses`
            ),
            false
          );
      }
    },
    print() {
      this.$refs.printModal.$refs.print.show();
    },
    startToggleSideMenu() {
      this.toggleSideMenu();
    },
    fetchNames() {
      const fetchName = fetch(
        `https://nft2.mewapi.io/tokens?owner=${this.account.address}&chain=mainnet`
      )
        .then(response => {
          return response.json();
        })
        .catch(() => {
          Toast.responseHandler('Something went wrong!', Toast.ERROR);
        });
      fetchName.then(response => {
        this.setExpiry(response);
      });
    },
    async setExpiry(param) {
      const names =
        param && param.hasOwnProperty(ENS_TOKEN_ADDRESS)
          ? param[ENS_TOKEN_ADDRESS].tokens
          : [];
      if (names.length > 0) {
        const hashes = names.map(item => {
          return item.id;
        });
        const contract = new this.web3.eth.Contract(
          ExpiryAbi,
          EXPIRY_CHECK_CONTRACT
        );
        const expiry = contract.methods
          .getExpirationDates(ENS_TOKEN_ADDRESS, hashes)
          .call()
          .then(response => {
            return response;
          })
          .catch(() => {
            Toast.responseHandler('Something went wrong!', Toast.ERROR);
          });
        expiry.then(response => {
          if (!response) return;
          response.forEach((item, idx) => {
            const expiryDate = item * 1000;
            const isExpired = expiryDate < new Date().getTime();
            const expiryDateFormat = new Date(expiryDate);
            names[idx].expired = isExpired;
            names[
              idx
            ].expiration = `${expiryDateFormat.toLocaleDateString()} ${expiryDateFormat.toLocaleTimeString()}`;
            names['registrant'] = this.account.address;
          });

          const found = names.find(item => {
            if (item.expired) return item;
          });

          if (found) this.notifyExpiredNames();
        });
      }
    },
    notifyExpiredNames() {
      this.$refs.expiredNames.$refs.expiredNames.show();
    },
    async setNonce() {
      store.set(this.web3.utils.sha3(this.account.address), {
        nonce: '0x00',
        timestamp: 0
      });
      const fetchedNonce = await this.web3.eth
        .getTransactionCount(this.account.address)
        .catch(e => {
          Toast.responseHandler(e, Toast.ERROR);
        });
      this.nonce = new BigNumber(fetchedNonce).toString();
    },
    async getTokenBalance(token) {
      try {
        const web3 = this.web3;
        const contractAbi = [
          {
            name: 'balanceOf',
            type: 'function',
            constant: true,
            inputs: [{ name: 'address', type: 'address' }],
            outputs: [{ name: 'out', type: 'uint256' }]
          }
        ];
        const contract = new web3.eth.Contract(contractAbi);
        if (this.account.address && this.account.address !== '') {
          const data = contract.methods
            .balanceOf(this.account.address)
            .encodeABI();
          const balance = await web3.eth
            .call({
              to: token.address,
              data: data
            })
            .then(res => {
              let tokenBalance;
              if (Number(res) === 0 || res === '0x') {
                tokenBalance = '0';
              } else {
                const denominator = new BigNumber(10).pow(token.decimals);
                tokenBalance = new BigNumber(res).div(denominator).toString();
              }
              return tokenBalance;
            })
            .catch(e => {
              Toast.responseHandler(e, false);
            });

          return balance;
        }
      } catch (e) {
        Toast.responseHandler(e, Toast.ERROR);
      }
    },
    setCustomTokenStore() {
      const customTokenStore = store.get('customTokens');
      Object.keys(networkTypes).forEach(network => {
        if (customTokenStore[networkTypes[network].name] === undefined) {
          customTokenStore[networkTypes[network].name] = [];
        }
      });
      store.set('customTokens', customTokenStore);
    },
    fetchTokens() {
      return new Promise(resolve => {
        if (parseInt(1)) {
          try {
            (this.network.type.chainID === 1
              ? getAddressTokens(this.account.address)
              : fetch(
                  this.network.type.homePage +
                    '/api?module=account&action=tokenlist&address=' +
                    this.account.address
                )
                  .then(r => r.json())
                  .then(({ result }) => {
                    return {
                      data: {
                        getOwnersERC20Tokens: {
                          owners: result.map(
                            ({
                              balance,
                              contractAddress,
                              decimals,
                              name,
                              symbol
                            }) => ({
                              balance,
                              tokenInfo: {
                                name,
                                symbol,
                                decimals,
                                contract: contractAddress
                              }
                            })
                          )
                        }
                      }
                    };
                  })
            ).then(res => {
              const tokens = [];
              const apiTokens = res.data.getOwnersERC20Tokens.owners;
              const parsedApiTokens = apiTokens.map(apiT => {
                const newT = Object.assign(
                  {},
                  { balance: apiT.balance },
                  { address: apiT.tokenInfo.contract },
                  apiT.tokenInfo
                );
                newT['balance'] = BigNumber(newT.balance)
                  .div(BigNumber(10).pow(newT.decimals))
                  .toFixed();
                delete newT['contract'];
                return newT;
              });

              parsedApiTokens.forEach(apiT => {
                const found = tokens.find(item => {
                  if (item.address === apiT.address) {
                    return item;
                  }
                });

                if (!found) {
                  tokens.push(apiT);
                }
              });

              resolve(tokens);
            });
          } catch (e) {
            resolve([]);
          }
        } else {
          resolve(this.network.type.tokens);
        }
      });
    },
    setTokens() {
      this.tokens = [];
      this.receivedTokens = false;
      return new Promise(resolve => {
        if (parseInt(1)) {
          this.fetchTokens().then(res => {
            let tokens = res;
            tokens = tokens
              .map(token => {
                const convertedToken = {
                  address: token.address,
                  balance: token.balance,
                  decimals: token.decimals,
                  email: token.email,
                  name: token.name,
                  symbol: token.symbol,
                  website: token.website
                };

                if (token.hasOwnProperty('logo')) {
                  convertedToken['logo'] = token.logo;
                }
                return convertedToken;
              })
              .sort((a, b) => {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                  return -1;
                } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
                  return 1;
                }
                return 0;
              });
            resolve(tokens.sort(sortByBalance));
          });
        } else {
          const tokens = this.network.type.tokens.map(item => {
            item.balance = 'Load';
            return item;
          });
          resolve(tokens);
        }
      });
    },
    setTokensWithBalance() {
      const customStore = store.get('customTokens');
      if (
        customStore !== undefined &&
        customStore[this.network.type.name] !== undefined &&
        customStore[this.network.type.name].length > 0
      ) {
        new Promise(resolve => {
          const newArr = customStore[this.network.type.name].map(
            async token => {
              token.balance = await this.getTokenBalance(token);
              return token;
            }
          );
          Promise.all(newArr).then(res => {
            customStore[this.network.type.name] = res;
            store.set('customTokens', customStore);
            resolve(res);
          });
        })
          .then(res => {
            const allTokens = this.tokens
              .filter(token => token.balance > 0)
              .concat(res.filter(token => token.balance > 0));
            this.tokensWithBalance = allTokens;
            this.receivedTokens = true;
          })
          .catch(e => {
            Toast.responseHandler(e, Toast.ERROR);
          });
      } else {
        this.receivedTokens = true;
        this.tokensWithBalance = this.tokens.filter(token => token.balance > 0);
      }
    },
    getBlock() {
      this.web3.eth
        .getBlockNumber()
        .then(res => {
          this.blockNumber = res;
          this.updateBlockNumber(res);
        })
        .catch(e => {
          Toast.responseHandler(e, Toast.ERROR);
        });
    },
    getBalance() {
      const web3 = this.web3;
      if (this.address) {
        web3.eth
          .getBalance(this.address.toLowerCase())
          .then(res => {
            this.balance = web3.utils.fromWei(res, 'ether');
            this.setAccountBalance(res);
          })
          .catch(e => {
            Toast.responseHandler(e, Toast.ERROR);
          });
      }
    },
    checkWeb3WalletAddrChange() {
      const web3 = this.web3;
      try {
        window.ethereum.on('accountsChanged', account => {
          if (account.length > 1) {
            const wallet = new Web3Wallet(account[0]);
            this.decryptWallet([wallet, web3]);
          }
        });
      } catch (e) {
        Toast.responseHandler(e, Toast.ERROR);
      }
    },
    checkAndSetNetwork(id) {
      if (this.network.type.chainID.toString() !== `${id}`) {
        Object.keys(networkTypes).some(net => {
          if (
            networkTypes[net].chainID.toString() === `${id}` &&
            this.Networks[net]
          ) {
            this.switchNetwork(this.Networks[net][0]);
            return true;
          }
        });
      }
    },
    matchWeb3WalletNetwork() {
      this.web3.eth.net.getId().then(id => {
        this.checkAndSetNetwork(id);
      });
      window.ethereum.on('networkChanged', netId => {
        this.setupOnlineEnvironment();
        this.checkAndSetNetwork(netId);
      });
    },
    setupOnlineEnvironment: web3Utils._.debounce(function () {
      this.clearIntervals();
      if (store.get('customTokens') === undefined) {
        store.set('customTokens', {});
        this.setCustomTokenStore();
      } else {
        this.setCustomTokenStore();
      }
      if (this.online) {
        if (this.account.address !== null) {
          if (this.account.identifier === WEB3_TYPE) {
            if (window.ethereum.isMetaMask || window.ethereum.isMew) {
              this.checkWeb3WalletAddrChange();
              this.matchWeb3WalletNetwork();
            } else {
              this.web3WalletPollNetwork();
              this.web3WalletPollAddress();
            }
          }
          this.callSetENS();
          if (this.network.type.name === ETH.name) this.fetchNames();
          this.getBlock();
          this.getBalance();
          this.setTokens().then(res => {
            this.tokens = res;
            this.receivedTokens = true;
          });
          this.setNonce();
          this.getHighestGas();
          this.getBlockUpdater().then(_sub => {
            this.pollBlock = _sub;
          });
        }
      } else {
        this.receivedTokens = true;
        this.tokens = [];
      }
    }),
    async getBlockUpdater() {
      return new Promise(resolve => {
        let subscription = this.web3.eth
          .subscribe('newBlockHeaders', err => {
            if (err) {
              subscription = setInterval(this.getBlock, 14000);
            }
            resolve(subscription);
          })
          .on('data', headers => {
            this.blockNumber = headers.number;
          });
      });
    },
    getHighestGas() {
      const gasType = store.get('gasPriceType') || 'economy';
      const getCustomGas = getOther();
      this.web3.eth
        .getGasPrice()
        .then(res => {
          const parsedGas = getEconomy(
            this.web3.utils.fromWei(res, 'gwei')
          ).toString();
          if (gasType === 'economy') {
            this.setGasPrice(parsedGas);
          } else if (gasType === 'other' && getCustomGas) {
            this.setGasPrice(getCustomGas);
          } else {
            this.setGasPrice(getGasBasedOnType(parsedGas));
          }
          this.highestGas = parsedGas;
          this.setEthGasPrice(this.highestGas);
        })
        .catch(e => {
          Toast.responseHandler(e, Toast.ERROR);
        });
    },
    callSetENS() {
      if (this.network.type.ens) {
        const newEns = new ENS(
          this.web3.currentProvider,
          this.network.type.ens.registry
        );
        this.setENS(newEns);
      } else {
        this.setENS(null);
      }
    },
    clearIntervals() {
      if (this.pollBlock.unsubscribe) this.pollBlock.unsubscribe();
      else clearInterval(this.pollBlock);
      clearInterval(this.pollNetwork);
      clearInterval(this.pollAddress);
      clearInterval(this.pollBalance);
    },
    web3WalletPollNetwork() {
      if (!window.web3.eth) {
        Toast.responseHandler(
          new Error(this.$t('interface.web3-not-found')),
          Toast.ERROR
        );
      }
      if (
        !window.web3.eth.net ||
        typeof window.web3.eth.net.getId !== 'function'
      )
        return;
      this.pollNetwork = setInterval(() => {
        window.web3.eth.net
          .getId()
          .then(id => {
            if (this.network.type.chainID.toString() !== id) {
              Object.keys(networkTypes).some(net => {
                if (networkTypes[net].chainID === id && this.Networks[net]) {
                  this.switchNetwork(this.Networks[net]);
                  clearInterval(this.pollNetwork);
                  return true;
                }
              });
            }
          })
          .catch(e => {
            Toast.responseHandler(e, false);
          });
      }, 500);
    },
    web3WalletPollAddress() {
      this.pollAddress = setInterval(() => {
        if (!window.web3.eth) {
          Toast.responseHandler(
            new Error(this.$t('interface.web3-not-found')),
            Toast.ERROR
          );
          clearInterval(this.pollAddress);
        }

        window.web3.eth.getAccounts((err, accounts) => {
          if (err) {
            Toast.responseHandler(err, false);
            clearInterval(this.pollAddress);
          }
          if (!accounts.length) {
            Toast.responseHandler(
              new Error('Please make sure that your Web3 Wallet is unlocked'),
              Toast.ERROR
            );
            clearInterval(this.pollAddress);
          }
          const address = accounts[0];

          if (
            this.account.address !== null &&
            address.toLowerCase() !== this.account.address.toLowerCase()
          ) {
            const wallet = new Web3Wallet(address);
            this.decryptWallet([wallet, window.web3.currentProvider]);
            clearInterval(this.pollAddress);
          }
        });
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'InterfaceLayout-desktop.scss';
@import 'InterfaceLayout-tablet.scss';
@import 'InterfaceLayout-mobile.scss';
</style>
