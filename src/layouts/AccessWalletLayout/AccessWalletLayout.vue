<template>
  <div>
    <div class="access-my-wallet-options">
      <ledger-app-modal
        ref="ledgerAppModal"
        :networks="Networks"
        @hardwareWalletOpen="hardwareWalletOpen"
      />

      <hardware-modal
        ref="hardwareModal"
        :ledger-app-open="ledgerAppModalOpen"
        :network-and-address-open="networkAndAddressOpen"
        :bitbox-select-open="bitboxSelectModalOpen"
        :open-finney="finneyModalOpen"
        :open-xwallet="xwalletModalOpen"
        :open-bc-vault="openBcVault"
        @hardwareRequiresPassword="hardwarePasswordModalOpen"
        @hardwareWalletOpen="hardwareWalletOpen"
      />

      <hardware-password-modal
        ref="hardwarePasswordModal"
        :wallet-constructor="walletConstructor"
        :hardware-brand="hardwareBrand"
        @hardwareWalletOpen="hardwareWalletOpen"
      />

      <network-and-address-modal
        ref="networkandaddressModal"
        :hardware-wallet="hardwareWallet"
      />

      <metamask-modal ref="metamaskModal" />

      <software-modal
        ref="softwareModal"
        :open-password="passwordOpen"
        :open-private-key-input="privateKeyOpen"
        :open-mnemonic-phrase-input="mnemonicphraseModalOpen"
        @file="fileUploaded"
      />

      <password-modal ref="passwordModal" :file="file" />

      <private-key-modal ref="privatekeyModal" />

      <mnemonic-modal
        ref="mnemonicPhraseModal"
        :hardware-wallet-open="hardwareWalletOpen"
      />

      <wallet-password-modal />
      <enter-pin-number-modal />

      <div class="wrap">
        <div class="page-container">
          <div class="title">
            <h2>{{ $t('common.wallet.access-my') }}</h2>
            <h5>
              {{ $t('common.wallet.do-not-have') }}
              <router-link :to="'/create-wallet'" class="nounderline">
                {{ $t('common.wallet.create-new') }}
              </router-link>
            </h5>
          </div>
          <div class="buttons-container">
            <access-wallet-button
              v-for="(button, index) in buttons"
              :key="button.title + index"
              :func="button.func"
              :img="button.img"
              :img-disabled="button.imgDisabled"
              :has-other-examples="button.showsOtherExamples"
              :title="$t(button.title)"
              :desc="$t(button.desc)"
              :recommend="$t(button.recommend)"
              :tooltip="$t(button.tooltip)"
              :disabled="
                button.classname === 'button-metamask'
                  ? !isMetaMask || !web3WalletExists
                  : button.disabled
              "
              :classname="button.classname"
            />
          </div>
        </div>
      </div>
    </div>
    <faqs />
  </div>
</template>

<script>
import FaqsContainer from '@/containers/FaqsContainer';
import AccessWalletButton from './components/AccessWalletButton';
import HardwareModal from './components/HardwareModal';
import HardwarePasswordModal from './components/HardwarePasswordModal';
import Web3WalletModal from './components/Web3WalletModal';
import NetworkAndAddressModal from './components/NetworkAndAddressModal';
import PasswordModal from './components/PasswordModal';
import PrivateKeyModal from './components/PrivateKeyModal';
import SoftwareModal from './components/SoftwareModal';
import MnemonicModal from './components/MnemonicModal';
import LedgerAppModal from './components/LedgerAppModal';
import WalletPasswordModal from '@/components/WalletPasswordModal';
import EnterPinNumberModal from '@/components/EnterPinNumberModal';

import mewConnectImg from '@/assets/images/icons/WalletConnect.svg';
import hardwareImg from '@/assets/images/icons/button-hardware.svg';
import metamaskImg from '@/assets/images/icons/button-metamask.svg';
import metamaskImgDisabled from '@/assets/images/icons/button-metamask-disabled.svg';
import softwareImg from '@/assets/images/icons/button-software.svg';

import hardwareImgDisabled from '@/assets/images/icons/button-hardware-disabled.svg';
import softwareImgDisabled from '@/assets/images/icons/button-software-disabled.svg';

import { mapState, mapActions } from 'vuex';
import { Toast } from '@/helpers';

import DetectRTC from 'detectrtc';

import { WalletConnectWallet } from '@/wallets';

export default {
  name: 'AccessWalletLayout',
  components: {
    faqs: FaqsContainer,
    'network-and-address-modal': NetworkAndAddressModal,
    'hardware-modal': HardwareModal,
    'hardware-password-modal': HardwarePasswordModal,
    'metamask-modal': Web3WalletModal,
    'software-modal': SoftwareModal,
    'password-modal': PasswordModal,
    'private-key-modal': PrivateKeyModal,
    'mnemonic-modal': MnemonicModal,
    'access-wallet-button': AccessWalletButton,
    'wallet-password-modal': WalletPasswordModal,
    'enter-pin-number-modal': EnterPinNumberModal,
    'ledger-app-modal': LedgerAppModal
  },
  data() {
    return {
      file: {},
      phrase: '',
      hardwareWallet: {},
      hardwareAddresses: [],
      modalCb: () => {},
      walletConstructor: function () {},
      hardwareBrand: '',
      device: {},
      buttons: [
        {
          func: this.mewConnectModalOpen,
          title: 'accessWallet.mobile-app.mew-wallet',
          recommend: '',
          tooltip: '',
          img: mewConnectImg,
          imgDisabled: mewConnectImg,
          disabled: false,
          classname: 'button-mewconnect'
        },
        {
          func: this.hardwareModalOpen,
          title: 'accessWallet.hardware.option-title',
          desc: 'accessWallet.hardware.examples',
          recommend: '',
          tooltip: '',
          img: hardwareImg,
          imgDisabled: hardwareImgDisabled,
          disabled: false,
          classname: 'button-hardware'
        },
        {
          func: this.web3WalletModal,
          title: 'accessWallet.metamask.option-title',
          recommend: '',
          tooltip: '',
          img: metamaskImg,
          imgDisabled: metamaskImgDisabled,
          disabled: false,
          classname: 'button-metamask'
        },
        {
          func: this.softwareModalOpen,
          title: 'accessWallet.software.option-title',
          desc: 'accessWallet.software.option-text',
          recommend: 'common.not-recommended.string',
          tooltip: '',
          img: softwareImg,
          imgDisabled: softwareImgDisabled,
          disabled: false,
          classname: 'button-software'
        }
      ],
      isMetaMask: false,
      web3WalletExists: false
    };
  },
  computed: {
    ...mapState('main', ['Networks', 'online'])
  },
  mounted() {
    this.$nextTick(() => {
      this.buttons.forEach(btn => {
        btn.disabled = this.isDisabled(btn.classname);
      });

      this.checkWeb3();
      this.checkIsMetamask();
    });

    this.$eventHub.$on('userAddresses', (addresses, cb) => {
      this.hardwareAddresses = addresses;
      this.modalCb = cb;
    });
  },
  methods: {
    ...mapActions('main', [
      'decryptWallet',
      'switchNetwork',
      'setWeb3Instance'
    ]),
    openWalletConnect() {
      const changeNetwork = chainId =>
        this.switchNetwork(
          Object.values(this.Networks)
            .flat()
            .find(n => n.type.chainID === chainId)
        );
      WalletConnectWallet(changeNetwork)
        .then(([_newWallet, chainId]) =>
          this.decryptWallet([_newWallet]).then(() => changeNetwork(chainId))
        )
        .then(() => this.setWeb3Instance())
        .then(() => this.$router.push({ path: 'interface' }))
        .catch(e => {
          WalletConnectWallet.errorHandler(e);
        });
    },
    openWalletLink() {
      this.$refs.mewconnectModal.$refs.mewConnect.hide();
    },
    checkIsMetamask() {
      this.isMetaMask = window.ethereum && window.ethereum.isMetaMask;
    },
    checkWeb3() {
      this.web3WalletExists =
        typeof window.ethereum !== 'undefined' ||
        typeof window.web3 !== 'undefined';
    },
    isDisabled(className) {
      switch (className) {
        case 'button-mewconnect':
          return !(this.online && DetectRTC.isWebRTCSupported);
        case 'button-hardware':
          return !this.online;
        default:
          return false;
      }
    },
    mewConnectModalOpen() {
      this.openWalletConnect();
    },
    ledgerAppModalOpen() {
      this.$refs.ledgerAppModal.$refs.ledgerApp.show();
    },
    networkAndAddressOpen() {
      this.$refs.networkandaddressModal.$refs.networkAndAddress.show();
    },
    hardwareModalOpen() {
      this.$refs.hardwareModal.$refs.hardware.show();
    },
    web3WalletModal() {
      this.checkWeb3();
      this.checkIsMetamask();
      this.$refs.metamaskModal.$refs.metamask.show();
    },
    softwareModalOpen() {
      this.$refs.softwareModal.$refs.software.show();
    },
    passwordOpen() {
      this.$refs.softwareModal.$refs.software.hide();
      this.$refs.passwordModal.$refs.password.show();
    },
    privateKeyOpen() {
      this.$refs.softwareModal.$refs.software.hide();
      this.$refs.privatekeyModal.$refs.privateKey.show();
    },
    installWeb3WalletModalOpen() {
      this.$refs.installWeb3WalletModal.$refs.installmetamask.show();
    },
    mnemonicphraseModalOpen() {
      this.$refs.mnemonicPhraseModal.$refs.mnemonicPhrase.show();
      this.$refs.softwareModal.$refs.software.hide();
    },
    openBcVault(arr, bcVaultInstance) {
      if (arr.length > 1) {
        this.$refs.hardwareModal.$refs.hardware.hide();
        this.$eventHub.$emit('userAddresses', arr, address => {
          const walletInstance = bcVaultInstance.getAccount(address);
          this.decryptWallet([walletInstance]).then(() => {
            this.$router.push({
              path: 'interface'
            });
          });
        });
      } else {
        const address = `${arr[0].extraData}${arr[0].address}`;
        const walletInstance = bcVaultInstance.getAccount(address);
        this.decryptWallet([walletInstance]).then(() => {
          this.$router.push({
            path: 'interface'
          });
        });
      }
    },
    fileUploaded(e) {
      this.file = e;
      this.passwordOpen();
    },
    hardwarePasswordModalOpen(hardwareNeedingPassword) {
      this.walletConstructor = hardwareNeedingPassword.walletConstructor;
      this.hardwareBrand = hardwareNeedingPassword.hardwareBrand;
      this.$refs.hardwareModal.$refs.hardware.hide();
      this.$refs.hardwarePasswordModal.$refs.password.show();
    },
    finneyModalOpen() {
      this.$refs.finney.$refs.finneyModal.show();
    },
    xwalletModalOpen() {
      this.$refs.xwallet.$refs.xwalletModal.show();
    },

    hardwareWalletOpen(wallet) {
      try {
        this.hardwareWallet = wallet;
        this.networkAndAddressOpen();
      } catch (e) {
        Toast.responseHandler(e, false);
      }
    },

    bitboxSelectModalOpen() {
      this.$refs.bitboxSelectModal.$refs.bitboxSelect.show();
    },

    bitbox02ModalOpen(bb02) {
      this.device = bb02;
      this.$refs.bitbox02Modal.$refs.bitbox02.show();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'AccessWalletLayout.scss';
</style>
