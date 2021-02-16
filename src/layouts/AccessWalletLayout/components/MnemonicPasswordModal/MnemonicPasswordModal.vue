<template>
  <b-modal
    ref="password"
    :title="$t('accessWallet.password')"
    hide-footer
    class="bootstrap-modal modal-software nopadding"
    centered
    static
    lazy
    @shown="focusInput"
  >
    <div class="warning">
      <warning-message />
    </div>
    <div class="modal-content-block">
      <form class="password-form">
        <div class="input-container">
          <input
            ref="mnemonicPasswordInput"
            v-model="password"
            :type="show ? 'text' : 'password'"
            name="Password"
            autocomplete="off"
            placeholder="Enter password"
          />
          <img
            v-if="show"
            alt
            src="@/assets/images/icons/show-password.svg"
            @click.prevent="switchViewPassword"
          />
          <img
            v-if="!show"
            alt
            src="@/assets/images/icons/hide-password.svg"
            @click.prevent="switchViewPassword"
          />
        </div>
        <p v-show="error !== ''" class="error">{{ error }}</p>
        <button
          class="submit-button large-round-button-green-filled"
          type="submit"
          @click.prevent="unlockWallet"
        >
          <span v-show="!spinner"> {{ $t('common.continue') }} </span>
          <i v-show="spinner" class="fa fa-spin fa-spinner fa-lg" />
        </button>
      </form>
    </div>
  </b-modal>
</template>

<script>
import { MnemonicWallet } from '@/wallets';
import { Toast } from '@/helpers';
import WarningMessage from '@/components/WarningMessage';
export default {
  components: {
    'warning-message': WarningMessage
  },
  props: {
    hardwareWalletOpen: {
      type: Function,
      default: function () {}
    },
    phrase: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      password: '',
      error: '',
      spinner: false
    };
  },
  watch: {
    password() {
      this.error = '';
    }
  },
  methods: {
    unlockWallet() {
      this.spinner = true;
      MnemonicWallet(this.phrase, this.password)
        .then(wallet => {
          this.password = '';
          this.spinner = false;
          this.hardwareWalletOpen(wallet);
        })
        .catch(e => {
          this.password = '';
          this.spinner = false;
          this.error = e;
          Toast.responseHandler(e, Toast.ERROR);
        });
    },
    switchViewPassword() {
      this.show = !this.show;
    },
    focusInput() {
      this.$refs.mnemonicPasswordInput.focus();
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'MnemonicPasswordModal-desktop.scss';
@import 'MnemonicPasswordModal-tablet.scss';
@import 'MnemonicPasswordModal-mobile.scss';
</style>
