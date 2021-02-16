<template>
  <div>
    <confirm-modal
      v-if="fromAddress !== null"
      ref="confirmModal"
      :confirm-send-tx="sendTx"
      :signed-tx="signedTx"
      :fee="transactionFee"
      :is-hardware-wallet="isHardwareWallet"
      :gas-price="gasPrice"
      :from="fromAddress"
      :to="toAddress"
      :value="amount"
      :gas="gasLimit"
      :data="data"
      :nonce="nonce"
      :show-gas-warning="showGasWarning"
      :show-low-gas-warning="showLowGasWarning"
    />
    <confirm-collection-modal
      v-if="fromAddress !== null"
      ref="confirmCollectionModal"
      :send-batch-transactions="sendBatchTransactions"
      :is-hardware-wallet="isHardwareWallet"
      :signed-array="signedArray"
      :un-signed-array="unSignedArray"
      :sending="sending"
      :show-gas-warning="showCollectionGasWarning"
      :show-collection-low-gas-warning="showCollectionLowGasWarning"
    />
    <confirm-modal
      v-if="fromAddress !== null"
      ref="offlineGenerateConfirmModal"
      :confirm-send-tx="generateTx"
      :signed-tx="signedTx"
      :fee="transactionFee"
      :is-hardware-wallet="isHardwareWallet"
      :gas-price="gasPrice"
      :from="fromAddress"
      :to="toAddress"
      :value="amount"
      :gas="gasLimit"
      :data="data"
      :nonce="nonce"
    />
    <confirm-sign-modal
      v-if="fromAddress !== null"
      ref="signConfirmModal"
      :confirm-sign-message="messageReturn"
      :message-to-sign="messageToSign"
      :signed-message="signedMessage"
      :is-hardware-wallet="isHardwareWallet"
      :from="fromAddress"
    />
    <success-modal
      ref="successModal"
      :message="successMessage"
      :link-message="linkMessage"
      :link-to="linkTo"
      :tx-hash-exlporrer="txHashExlporrer"
    />
    <error-modal
      :close="closeError"
      :messages="errorMessage === null ? [] : [errorMessage]"
    />
  </div>
</template>

<script>
import * as unit from 'ethjs-unit';
import BigNumber from 'bignumber.js';
import ConfirmModal from './components/ConfirmModal';
import ConfirmCollectionModal from './components/ConfirmCollectionModal';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';
import ConfirmSignModal from './components/ConfirmSignModal';
import { mapState, mapActions } from 'vuex';
import { type as noticeTypes } from '@/helpers/notificationFormatters';
import { WEB3_WALLET, KEEPKEY } from '@/wallets/bip44/walletTypes';
import { Toast, Misc } from '@/helpers';
import locStore from 'store';
import parseTokensData from '@/helpers/parseTokensData.js';

const events = {
  showSuccessModal: 'showSuccessModal',
  showTxConfirmModal: 'showTxConfirmModal',
  showWeb3Wallet: 'showWeb3Wallet',
  showTxCollectionConfirmModal: 'showTxCollectionConfirmModal',
  showMessageConfirmModal: 'showMessageConfirmModal'
};

export default {
  components: {
    'confirm-modal': ConfirmModal,
    'confirm-collection-modal': ConfirmCollectionModal,
    'success-modal': SuccessModal,
    'error-modal': ErrorModal,
    'confirm-sign-modal': ConfirmSignModal
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    rawTx: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      errorMessage: null,
      isHardwareWallet: false,
      responseFunction: null,
      addressValid: true,
      amount: '',
      nonce: '',
      gasLimit: '21000',
      data: '0x',
      gasPrice: '0',
      toAddress: '',
      transactionFee: '',
      raw: {},
      lastRaw: {},
      ens: {},
      signer: {},
      signedTxObject: {},
      signedTx: '',
      messageToSign: '',
      signedMessage: '',
      successMessage: '',
      linkMessage: '',
      linkTo: '/',
      txHashExlporrer: '',
      dismissed: true,
      signedArray: [],
      sending: false,
      unSignedArray: [],
      signCallback: {},
      swapWigetData: {
        destAddress: '',
        fromCurrency: {
          symbol: 'ETH',
          name: ''
        },
        toCurrency: {
          symbol: 'ETH',
          name: ''
        },
        fromValue: undefined,
        toValue: undefined
      }
    };
  },
  computed: {
    ...mapState('main', [
      'wallet',
      'web3',
      'account',
      'network',
      'gasLimitWarning',
      'ethGasPrice'
    ]),
    fromAddress() {
      if (this.account) {
        return this.account.address;
      }
      return null;
    },
    showCollectionGasWarning() {
      const foundGasAboveLimit = this.unSignedArray.find(item => {
        const parsedGasPrice = this.web3.utils.fromWei(item.gasPrice, 'gwei');
        return BigNumber(parsedGasPrice).gte(this.gasLimitWarning);
      });
      return foundGasAboveLimit ? true : false;
    },
    showGasWarning() {
      return this.gasPrice >= this.gasLimitWarning;
    },
    showLowGasWarning() {
      return Math.floor(this.ethGasPrice * 0.75) >= this.gasPrice;
    },
    showCollectionLowGasWarning() {
      const foundGasAboveLimit = this.unSignedArray.find(item => {
        return BigNumber(Math.floor(this.ethGasPrice * 0.75)).gte(
          item.gasPrice
        );
      });
      return foundGasAboveLimit ? true : false;
    }
  },
  watch: {
    wallet(newVal) {
      if (newVal !== null) {
        if (this.$refs.hasOwnProperty('confirmModal')) {
          this.$refs.confirmModal.$refs.confirmation.$on('hidden', () => {
            if (this.dismissed) {
              this.reset();
            }
          });
        }
        if (this.$refs.hasOwnProperty('signConfirmModal')) {
          this.$refs.signConfirmModal.$refs.signConfirmation.$on(
            'hidden',
            () => {
              this.signedMessage = '';
            }
          );
        }
        return this.account.address;
      }

      return null;
    }
  },
  beforeDestroy() {
    Object.values(events).forEach(evt => {
      this.$eventHub.$off(evt);
    });
  },
  created() {
    this.$eventHub.$on(events.showSuccessModal, this.showSuccessModal);

    this.$eventHub.$on(events.showTxConfirmModal, (tx, resolve) => {
      this.parseRawTx(tx);
      if (tx.hasOwnProperty('ensObj')) {
        delete tx['ensObj'];
      }
      this.isHardwareWallet = this.account.isHardware;
      this.responseFunction = resolve;

      const signPromise = this.wallet.signTransaction(tx);

      signPromise
        .then(_response => {
          if (_response) {
            this.signedTxObject = _response;
            this.signedTx = this.signedTxObject.rawTransaction;
          }
        })
        .catch(this.wallet.errorHandler);
      if (this.account.identifier === KEEPKEY) {
        signPromise.then(() => {
          this.confirmationModalOpen();
        });
      } else {
        this.confirmationModalOpen();
      }
    });

    this.$eventHub.$on('showWeb3Wallet', (tx, resolve) => {
      this.parseRawTx(tx);
      const promiObject = this.wallet.signTransaction(tx);
      resolve(promiObject);
      this.showSuccessModal(
        'Continue transaction with Web3 Wallet Provider.',
        'Close'
      );
    });

    this.$eventHub.$on(
      'showTxCollectionConfirmModal',
      async (tx, signCallback, isHardware) => {
        this.isHardwareWallet = isHardware;
        this.unSignedArray = [];
        this.unSignedArray = tx;
        const signed = [];
        if (!signCallback) signCallback = () => {};
        this.signCallback = signCallback;

        this.confirmationCollectionModalOpen();
        if (this.account.identifier !== WEB3_WALLET) {
          for (let i = 0; i < tx.length; i++) {
            try {
              const _signedTx = await this.wallet.signTransaction(tx[i]);
              signed.push(_signedTx);
            } catch (err) {
              this.wallet.errorHandler(err);
            }
          }
          this.signedArray = signed;
        } else {
          this.signedArray = this.unSignedArray.map(_tx => {
            return { tx: _tx, rawTransaction: _tx };
          });
        }
      }
    );

    this.$eventHub.$on('showMessageConfirmModal', (data, resolve) => {
      this.responseFunction = resolve;
      this.messageToSign = data;
      this.signedMessage = '';
      const signPromise = this.wallet
        .signMessage(data)
        .then(_response => {
          this.signedMessage = '0x' + _response.toString('hex');
        })
        .catch(err => {
          this.wallet.errorHandler(err);
        });
      if (this.account.identifier === KEEPKEY) {
        signPromise.then(() => {
          this.signConfirmationModalOpen();
        });
      } else {
        this.signConfirmationModalOpen();
      }
    });

    this.$eventHub.$on(
      'showSwapWidget',
      (destAddress, toCurrency, fromCurrency, fromValue) => {
        this.swapWidgetModalOpen(
          destAddress,
          toCurrency,
          fromCurrency,
          fromValue
        );
      }
    );

    this.$eventHub.$on(
      'showSwapWidgetTo',
      (destAddress, toCurrency, fromCurrency, toValue) => {
        this.swapWidgetModalOpen(
          destAddress,
          toCurrency,
          fromCurrency,
          undefined,
          toValue
        );
      }
    );
  },
  mounted() {
    if (this.$refs.hasOwnProperty('confirmModal')) {
      this.$refs.confirmModal.$refs.confirmation.$on('hidden', () => {
        if (this.dismissed) {
          this.$eventHub.$emit('emptyPendingToken');
        }
      });
    }
  },
  methods: {
    ...mapActions('main', ['addNotification']),
    closeError() {
      this.errorMessage = null;
    },
    swapWidgetModalOpen(
      destAddress,
      fromCurrency,
      toCurrency,
      fromValue,
      toValue
    ) {
      if (typeof toCurrency === 'string') {
        this.$set(this.swapWigetData.toCurrency, 'symbol', toCurrency);
      } else if (typeof toCurrency === 'object') {
        this.$set(this.swapWigetData, 'toCurrency', toCurrency);
      } else {
        throw Error(
          'swap widget requires requires toCurrency to be a string or object'
        );
      }

      if (typeof fromCurrency === 'string') {
        this.$set(this.swapWigetData.fromCurrency, 'symbol', fromCurrency);
      } else if (typeof toCurrency === 'object') {
        this.$set(this.swapWigetData, 'fromCurrency', fromCurrency);
      } else {
        throw Error(
          'swap widget requires requires fromCurrency to be a string or object'
        );
      }

      this.swapWigetData = {
        destAddress: destAddress,
        fromCurrency: this.swapWigetData.fromCurrency,
        toCurrency: this.swapWigetData.toCurrency,
        fromValue: fromValue,
        toValue: toValue
      };

      this.$nextTick(() => {
        if (this.$refs.swapWidget) {
          this.$refs.swapWidget.$refs.modal.show();
          this.$refs.swapWidget.$refs.modal.$on('hidden', () => {
            this.swapWigetData = {
              destAddress: '',
              fromCurrency: {
                symbol: 'ETH',
                name: ''
              },
              toCurrency: {
                symbol: 'ETH',
                name: ''
              },
              fromValue: 0
            };
          });
        }
      });
    },
    confirmationModalOpen() {
      window.scrollTo(0, 0);
      this.$refs.confirmModal.$refs.confirmation.show();
    },
    confirmationCollectionModalOpen() {
      window.scrollTo(0, 0);
      this.$refs.confirmCollectionModal.$refs.confirmCollection.show();
    },
    signConfirmationModalOpen() {
      window.scrollTo(0, 0);
      this.$refs.signConfirmModal.$refs.signConfirmation.show();
    },
    showSuccessModal(message, linkMessage, txHashExlporrer) {
      this.reset();
      this.successMessage = message;
      this.linkMessage = linkMessage || '';
      this.txHashExlporrer = txHashExlporrer || '';
      this.$refs.successModal.$refs.success.show();
    },
    parseRawTx(tx) {
      let tokenData = '';
      if (tx.to && tx.data) {
        tokenData = parseTokensData(
          tx.data,
          tx.to,
          this.web3,
          this.network.type.tokens,
          this.network.type.name
        );
        tx.tokenTransferTo = tokenData.tokenTransferTo;
        tx.tokenTransferVal = tokenData.tokenTransferVal;
        tx.tokenSymbol = tokenData.tokenSymbol;
      }

      this.raw = tx;
      this.nonce = tx.nonce === '0x' ? 0 : new BigNumber(tx.nonce).toFixed();
      this.data = tx.data;
      this.gasLimit = new BigNumber(tx.gas).toFixed();
      this.gasPrice = unit.fromWei(
        new BigNumber(tx.gasPrice).toFixed(),
        'gwei'
      );
      this.toAddress = tx.to;
      this.amount = tx.value === '0x' ? '0' : new BigNumber(tx.value).toFixed();
      this.transactionFee = unit
        .fromWei(new BigNumber(tx.gas).times(tx.gasPrice).toFixed(), 'ether')
        .toString();
      this.ens = {};
      if (tx.hasOwnProperty('ensObj')) {
        this.ens = Object.assign({}, tx.ensObj);
      }
      this.lastRaw = tx;
    },
    messageReturn() {
      this.dismissed = false;
      this.responseFunction(this.signedMessage);
      this.$refs.signConfirmModal.$refs.signConfirmation.hide();
    },
    generateTx() {
      this.dismissed = false;
      this.responseFunction(this.signedTxObject);
      this.$refs.confirmModal.$refs.confirmation.hide();
    },
    async doBatchTransactions() {
      const web3 = this.web3;
      const _method =
        this.account.identifier === WEB3_WALLET
          ? 'sendTransaction'
          : 'sendSignedTransaction';
      const _arr = this.signedArray;
      const promises = _arr.map(tx => {
        const _tx = tx.tx;
        _tx.from = this.account.address;
        const _rawTx = tx.rawTransaction;
        const onError = err => {
          this.addNotification([
            noticeTypes.TRANSACTION_ERROR,
            _tx.from,
            this.unSignedArray.find(entry =>
              new BigNumber(_tx.nonce).eq(entry.nonce)
            ) || _tx,
            err
          ]);
          Toast.responseHandler(err, Toast.ERROR);
        };
        const promiEvent = web3.eth[_method](_rawTx);
        promiEvent.catch(onError);
        promiEvent.on('error', onError);
        promiEvent.once('transactionHash', hash => {
          this.showSuccessModal(
            `${this.$t('sendTx.success.sub-title')}`,
            'Okay',
            this.network.type.blockExplorerTX.replace('[[txHash]]', hash)
          );
          this.addNotification([
            noticeTypes.TRANSACTION_HASH,
            _tx.from,
            this.unSignedArray.find(entry =>
              new BigNumber(_tx.nonce).eq(entry.nonce)
            ),
            hash
          ]);
          const localStoredObj = locStore.get(
            web3.utils.sha3(this.account.address)
          );
          locStore.set(web3.utils.sha3(this.account.address), {
            nonce: Misc.sanitizeHex(
              new BigNumber(localStoredObj.nonce).plus(1).toString(16)
            ),
            timestamp: localStoredObj.timestamp
          });
        });
        promiEvent.then(receipt => {
          this.addNotification([
            noticeTypes.TRANSACTION_RECEIPT,
            _tx.from,
            this.unSignedArray.find(entry =>
              new BigNumber(_tx.nonce).eq(entry.nonce)
            ),
            receipt
          ]);
        });
        return promiEvent;
      });
      this.signCallback(promises);
      this.sending = true;
    },
    sendBatchTransactions() {
      this.$refs.confirmCollectionModal.$refs.confirmCollection.hide();
      this.doBatchTransactions();
    },
    sendTx() {
      this.dismissed = false;
      const promise = this.responseFunction(this.signedTxObject);
      this.$refs.confirmModal.$refs.confirmation.hide();
      if (!this.raw.generateOnly) {
        promise
          .once('transactionHash', () =>
            this.showSuccessModal(
              `${this.$t('sendTx.success.sub-title')}`,
              `${this.$t('common.okay')}`,
              this.network.type.blockExplorerTX.replace(
                '[[txHash]]',
                this.signedTxObject.tx.hash
              )
            )
          )
          .on('error', e => {
            this.reset();
            this.errorMessage = e.message;
          });
      }
    },
    reset() {
      this.responseFunction = null;
      this.addressValid = true;
      this.amount = '';
      this.nonce = '';
      this.gasLimit = '21000';
      this.data = '0x';
      this.gasPrice = '0';
      this.toAddress = '';
      this.transactionFee = '';
      this.raw = {};
      this.signedTx = '';
      this.messageToSign = '';
      this.signedMessage = '';
      this.signedArray = [];
      this.sending = false;
      this.signCallback = {};
      this.swapWigetData = {
        destAddress: '',
        fromCurrency: {
          symbol: 'ETH',
          name: ''
        },
        toCurrency: {
          symbol: 'ETH',
          name: ''
        },
        fromValue: 0
      };
    }
  }
};
</script>
