<template>
  <b-modal
    ref="metamask"
    :title="$t('accessWallet.metamask.modal.title')"
    hide-footer
    static
    lazy
    class="bootstrap-modal nopadding modal-metamask"
    centered
  >
    <div class="modal-content">
      <div v-if="isSafari" class="browser-catch">
        <h4>{{ $t('accessWallet.metamask.warning.safari') }}</h4>
        <div class="browser-logo-container">
          <a
            v-for="browser in browsers"
            :key="browser.name"
            :href="browser.link"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img :src="browser.logo" alt />
          </a>
        </div>
      </div>
      <div v-else>
        <div class="modal-multi-icons">
          <img
            :src="require('@/assets/images/icons/button-metamask.svg')"
            :class="['metamask', 'icon']"
            alt
          />
          <img alt class="icon" src="~@/assets/images/icons/clip.svg" />
          <img
            alt
            class="icon logo-small"
            src="~@/assets/images/logo-small.png"
          />
        </div>
        <div class="d-block content-container text-center">
          <h4 v-show="!unlockWeb3Wallet">
            {{ $t('accessWallet.metamask.modal.text') }}
          </h4>
          <h4 v-show="unlockWeb3Wallet">
            {{ $t('accessWallet.unlock-web3-wallet') }}
          </h4>
        </div>
        <div class="accept-terms">
          <label class="checkbox-container">
            <i18n path="accessWallet.metamask.modal.terms" tag="label">
              <router-link slot="terms" to="/terms-of-service">
                {{ $t('common.terms') }} </router-link
              >.
            </i18n>
            <input
              type="checkbox"
              @click="accessMyWalletBtnDisabled = !accessMyWalletBtnDisabled"
            />
            <span class="checkmark" />
          </label>
        </div>
        <div class="button-container">
          <b-btn
            v-show="!unlockWeb3Wallet"
            :disabled="accessMyWalletBtnDisabled"
            class="mid-round-button-green-filled close-button"
            @click="getWeb3Wallet"
            >{{ $t('common.wallet.access-my') }}</b-btn
          >
          <b-btn
            v-show="unlockWeb3Wallet"
            class="mid-round-button-green-filled close-button"
            @click="getWeb3Wallet"
            >{{ $t('accessWallet.try-again') }}</b-btn
          >
        </div>
      </div>
    </div>
    <!-- .modal-content -->
  </b-modal>
</template>

<script>
import { Web3Wallet } from '@/wallets/software';
import { Toast } from '@/helpers';
import Web3 from 'web3';
import { mapState, mapActions } from 'vuex';
import platform from 'platform';
import brave from '@/assets/images/browser/brave.png';
import chrome from '@/assets/images/browser/chrome.png';
import firefox from '@/assets/images/browser/firefox.png';
import opera from '@/assets/images/browser/opera.png';

export default {
  components: {},
  props: {
    networkAndAddressOpen: {
      type: Function,
      default: function () {}
    }
  },
  data() {
    return {
      accessMyWalletBtnDisabled: true,
      unlockWeb3Wallet: false,
      isSafari: false,
      browsers: [
        {
          logo: brave,
          link: 'https://brave.com/',
          name: 'brave'
        },
        {
          logo: firefox,
          link: 'https://www.mozilla.org/en-US/firefox/?v=b',
          name: 'firefox'
        },
        {
          logo: opera,
          link: 'https://www.opera.com/',
          name: 'opera'
        },
        {
          logo: chrome,
          link: 'https://www.google.com/chrome/',
          name: 'chrome'
        }
      ]
    };
  },
  computed: {
    ...mapState('main', ['path', 'Networks'])
  },
  mounted() {
    this.$refs.metamask.$on('hidden', () => {
      this.accessMyWalletBtnDisabled = true;
      this.unlockWeb3Wallet = false;
      this.isSafari = false;
    });
    this.$refs.metamask.$on('shown', () => {
      this.isSafari = platform.name.toLowerCase() === 'safari';
    });
  },
  methods: {
    ...mapActions('main', ['decryptWallet', 'switchNetwork']),
    reload() {
      window.location.reload();
    },
    async getWeb3Wallet() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (e) {
          Toast.responseHandler(e, Toast.WARN);
          if (
            e.stack &&
            e.stack.includes('Error: User denied account authorization')
          ) {
            return (this.unlockWeb3Wallet = true);
          }

          return;
        }
        this.signIn(web3, 'ethereum');
      } else if (window.web3) {
        this.signIn(window.web3);
      }
    },
    changeNetwork(chainId) {
      const network = Object.values(this.Networks)
        .flat()
        .find(n => n.type.chainID === chainId);
      if (network === undefined) {
        throw new Error('IW does not support network with chain id' + chainId);
      }
      this.switchNetwork(network);
    },
    async signIn(web3, type) {
      try {
        const acc = await web3.eth.getAccounts();
        if (type === 'ethereum') {
          window.ethereum.autoRefreshOnNetworkChange = false;
        }
        if (!acc.length) return (this.unlockWeb3Wallet = true);
        const wallet = new Web3Wallet(acc[0]);
        this.decryptWallet([wallet, web3.currentProvider]);
        const chainId = await web3.eth.getChainId();
        this.changeNetwork(chainId);
        this.$router.push({
          path: 'interface'
        });
      } catch (e) {
        if (
          e.stack &&
          e.stack.includes('Error: User denied account authorization')
        ) {
          Toast.responseHandler(e.stack, Toast.ERROR);
          return (this.unlockWeb3Wallet = true);
        }
        Toast.responseHandler(e, Toast.ERROR);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'Web3WalletModal.scss';
</style>
