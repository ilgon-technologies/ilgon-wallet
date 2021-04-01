<template>
  <b-modal
    ref="hardware"
    :title="$t('accessWallet.hardware.modal.title')"
    hide-footer
    class="modal-hardware nopadding"
    centered
    static
    lazy
    no-padding
    dialog-class="hardware-wallet-dialog"
  >
    <div class="modal-content-container">
      <div class="d-block text-center">
        <b-alert :show="mayNotBeAttached" fade variant="warning">
          {{ $t('accessWallet.hardware.warning.not-connected') }}
        </b-alert>
        <div class="button-options hardware-button-options">
          <wallet-option
            v-for="(item, idx) in items"
            :key="item.name + idx"
            :selected="selected === item.name"
            :regular-icon="item.imgPath"
            :text="item.text"
            :name="item.name"
            :disabled="item.disabled"
            :tooltip-msg="$t(item.msg)"
            :link="item.link"
            @updateSelected="updateSelected"
          />
        </div>
      </div>
      <div class="button-container">
        <div
          :class="[
            selected !== '' ? 'enabled' : 'disabled',
            'mid-round-button-green-filled'
          ]"
          @click="continueAccess"
        >
          {{ $t('accessWallet.hardware.modal.button-choose') }}
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ledger from '@/assets/images/icons/HardwareWallet/ledger.svg';
import trezor from '@/assets/images/icons/HardwareWallet/trezor.svg';
import WalletOption from '../WalletOption';
import { Toast } from '@/helpers';
import { isSupported, ensureSupport } from 'u2f-api';
import platform from 'platform';
import { TrezorWallet } from '@/wallets';
import {
  LEDGER as LEDGER_TYPE,
  TREZOR as TREZOR_TYPE,
  SECALOT as SECALOT_TYPE,
  KEEPKEY as KEEPKEY_TYPE
} from '@/wallets/bip44/walletTypes';
export default {
  components: {
    'wallet-option': WalletOption
  },
  props: {
    networkAndAddressOpen: {
      type: Function,
      default: () => {}
    },
    hardwareWalletOpen: {
      type: Function,
      default: () => {}
    },
    bitboxSelectOpen: {
      type: Function,
      default: function () {}
    },
    ledgerAppOpen: {
      type: Function,
      default: () => {}
    },
    openFinney: {
      type: Function,
      default: () => {}
    },
    openXwallet: {
      type: Function,
      default: () => {}
    },
    openBcVault: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      selected: '',
      mayNotBeAttached: false,
      isU2FSupported: false,
      items: [
        {
          name: LEDGER_TYPE,
          imgPath: ledger,
          text: 'Ledger',
          disabled: false,
          msg: '',
          link: 'https://www.ledger.com?r=dd50e17fad63'
        },
        {
          name: TREZOR_TYPE,
          imgPath: trezor,
          text: 'Trezor',
          disabled:
            platform.name.toLowerCase() !== 'chrome' &&
            platform.name.toLowerCase() !== 'firefox',
          msg:
            platform.name.toLowerCase() !== 'chrome' &&
            platform.name.toLowerCase() !== 'firefox'
              ? 'Browser not supported by Trezor'
              : '',
          link: 'https://trezor.io/?offer_id=12&aff_id=2029'
        }
      ]
    };
  },
  mounted() {
    ensureSupport()
      .then(() => {
        this.checkIfSupported();
      })
      .catch(() => {
        Toast.responseHandler(
          this.$t('errorsGlobal.u2f-not-supported'),
          Toast.ERROR
        );
      });
  },
  methods: {
    isMobile() {
      return (
        typeof window.orientation !== 'undefined' ||
        navigator.userAgent.indexOf('IEMobile') !== -1
      );
    },
    checkIfSupported() {
      try {
        const _self = this;
        isSupported().then(res => {
          _self.items.forEach(item => {
            const u2fhw = [SECALOT_TYPE, LEDGER_TYPE];
            const inMobile = [SECALOT_TYPE, KEEPKEY_TYPE];
            const webUsb = [KEEPKEY_TYPE, LEDGER_TYPE];

            if (webUsb.includes(item.name)) {
              const disable =
                window.location.protocol !== 'https:' ||
                !window ||
                !window.navigator ||
                !window.navigator.usb;
              item.disabled = disable;
              item.msg = disable ? 'errorsGlobal.browser-non-web-usb' : '';
            }
            if (u2fhw.includes(item.name)) {
              item.disabled = !res;
              item.msg = !res ? 'errorsGlobal.browser-non-u2f' : '';
            }
            if (_self.isMobile()) {
              const disable = !inMobile.includes(item.name);
              item.disabled = disable;
              item.msg = disable ? 'errorsGlobal.no-mobile-support' : '';
            }
          });
        });
        _self.$refs.hardware.$on('hidden', () => {
          _self.selected = '';
        });
      } catch (e) {
        Toast.responseHandler(e, Toast.ERROR);
      }
    },
    continueAccess() {
      const showPluggedInReminder = setTimeout(() => {
        this.mayNotBeAttached = true;
      }, 1000);
      switch (this.selected) {
        case LEDGER_TYPE:
          this.$refs.hardware.hide();
          this.ledgerAppOpen();
          break;
        case TREZOR_TYPE:
          TrezorWallet()
            .then(_newWallet => {
              clearTimeout(showPluggedInReminder);
              this.$emit('hardwareWalletOpen', _newWallet);
            })
            .catch(e => {
              this.mayNotBeAttached = true;
              TrezorWallet.errorHandler(e);
            });
          break;
        default:
          Toast.responseHandler(
            new Error(this.$t('errosGlobal.something-went-wrong')),
            Toast.ERROR
          );
          break;
      }
    },
    updateSelected(ref) {
      if (this.selected !== ref) {
        this.selected = ref;
      } else {
        this.selected = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'HardwareModal-desktop.scss';
@import 'HardwareModal-tablet.scss';
@import 'HardwareModal-mobile.scss';
</style>

<style>
.hardware-wallet-dialog {
  max-width: 700px !important;
}
</style>
