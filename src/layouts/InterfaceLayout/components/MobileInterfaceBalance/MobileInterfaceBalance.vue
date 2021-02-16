<template>
  <div>
    <div class="info-block">
      <div class="block-image">
        <img alt class="icon" src="~@/assets/images/icons/wallet.svg" />
      </div>
      <div class="block-content">
        <div class="balance-contents">
          <div class="title-block">
            {{ $t('common.balance.string') }}
          </div>
          <div class="balance-text-container">
            <div v-show="balance !== undefined" class="balance-data">
              <div class="balance-value">
                {{ showWholes()
                }}<span style="font-size: 75%; margin: 0">{{
                  showDecimals()
                }}</span>
              </div>
              <div class="currency">
                {{ network.type.currencyName }}
              </div>
            </div>
            <i v-show="balance === undefined" class="fa fa-spin fa-spinner" />
            <input
              ref="mobileCopyBalance"
              :value="balance"
              class="mobile-hidden-input"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="icon-container">
          <b-btn class="custom-tooltip" @click="copy">
            <img alt src="~@/assets/images/icons/copy.svg" />
          </b-btn>
          <b-btn
            v-if="false"
            id="refreshBalance"
            class="custom-tooltip"
            @click="fetchBalance"
          >
            <img
              v-show="!fetchingBalance"
              alt
              src="~@/assets/images/icons/change.svg"
            />
            <i v-show="fetchingBalance" class="fa fa-lg fa-spinner fa-spin" />
          </b-btn>
          <b-popover
            :content="$t('interface.check-balance.string')"
            target="balanceCheck"
            placement="top"
            triggers="hover"
            title
          />
          <b-popover
            :content="$t('interface.check-balance.refresh')"
            target="refreshBalance"
            placement="top"
            triggers="hover"
            title
          />
        </div>
        <!-- .icon-container -->
      </div>
      <!-- .block-content -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { showWholes, showDecimals } from '../InterfaceBalance';
import { Toast } from '@/helpers';

export default {
  components: {},
  props: {
    balance: {
      type: String,
      default: '0'
    },
    getBalance: {
      type: Function,
      default: function () {}
    }
  },
  data() {
    return {
      fetchingBalance: false
    };
  },
  computed: {
    ...mapState('main', ['network'])
  },
  watch: {
    balance() {
      this.fetchingBalance = false;
    }
  },
  methods: {
    copy() {
      this.$refs.mobileCopyBalance.select();
      document.execCommand('copy');
      Toast.responseHandler(this.$t('common.copied'), Toast.INFO);
    },
    balanceModalOpen() {
      this.$refs.balance.$refs.balance.show();
    },
    showWholes() {
      return showWholes(this.balance);
    },
    showDecimals() {
      return showDecimals(this.balance);
    },
    fetchBalance() {
      this.fetchingBalance = true;
      setTimeout(() => {
        this.getBalance();
        this.fetchingBalance = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'MobileInterfaceBalance.scss';
</style>
