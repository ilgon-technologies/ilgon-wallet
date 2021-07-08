<template>
  <div class="info-block-container">
    <div class="info-block balance">
      <div class="block-image">
        <input
          ref="copyBalance"
          :value="balance"
          class="hidden-input"
          autocomplete="off"
        />
        <div class="icon-border">
          <img alt class="icon" src="~@/assets/images/icons/wallet.svg" />
        </div>
      </div>
      <div class="block-content" style="overflow: hidden">
        <div class="information-container" style="overflow: hidden">
          <h2>{{ $t('common.balance.string') }}</h2>
          <div class="balance-text-container">
            <div v-show="balance !== undefined" class="balance-text">
              <div class="balance">
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
          </div>
          <p v-if="usdPrice.t !== 'HIDDEN'">
            <template v-if="usdPrice.t === 'LOADING'">
              $... USD ($.../ILG)
            </template>
            <template v-else-if="usdPrice.t === 'LOADED'">
              <template v-if="usdPrice.result.t === 'ERROR'">
                $N/A USD ($N/A/ILG)
              </template>
              <template v-else-if="usdPrice.result.t === 'SUCCESS'">
                {{ successfullyLoadedUsdPrice }}
              </template>
            </template>
          </p>
        </div>
        <div class="icon-container">
          <b-btn
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
          <b-btn
            id="popover-ref-copy-balance"
            class="custom-tooltip"
            @click="copy"
          >
            <img alt src="~@/assets/images/icons/copy.svg" />
          </b-btn>
          <b-popover
            :content="$t('interface.check-balance.refresh')"
            target="refreshBalance"
            placement="top"
            triggers="hover"
            title
          />
          <b-popover
            :content="$t('common.copy')"
            target="popover-ref-copy-balance"
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
import BigNumber from 'bignumber.js';
import { Toast } from '@/helpers';

export function showWholes(balance) {
  const [wholes, decimals] = balance.split('.');
  // 1000000 -> 1 000 000
  // eslint-disable-next-line security/detect-unsafe-regex
  const seperated = wholes.trim().replace(/(\d)(?=(?:\d{3})+$)/g, '$1 ');
  return seperated + (decimals !== undefined ? '.' : '');
}

export const showDecimals = balance => balance.split('.')[1] || '';

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
    ...mapState('main', ['network', 'usdPrice']),
    successfullyLoadedUsdPrice() {
      const usdPrice = this.usdPrice.result.value;
      const balanceInUsd = new BigNumber(this.balance)
        .multipliedBy(usdPrice)
        .decimalPlaces(2)
        .toString()
        // 1000 -> 1,000
        // eslint-disable-next-line security/detect-unsafe-regex
        .replace(/(\d)(?=(?:\d{3})+?(\.\d?\d)$)/g, '$1,');
      const shownUsdPrice = new BigNumber(usdPrice).decimalPlaces(6).toString();
      return `$${balanceInUsd} USD ($${shownUsdPrice}/ILG)`;
    }
  },
  watch: {
    balance() {
      this.fetchingBalance = false;
    }
  },
  methods: {
    showWholes() {
      return showWholes(this.balance);
    },
    showDecimals: function () {
      return showDecimals(this.balance);
    },
    balanceModalOpen() {
      this.$refs.balance.$refs.balance.show();
    },
    fetchBalance() {
      this.fetchingBalance = true;
      setTimeout(() => {
        this.getBalance();
        this.fetchingBalance = false;
      }, 1000);
    },
    copy() {
      this.$refs.copyBalance.select();
      document.execCommand('copy');
      Toast.responseHandler(this.$t('common.copied'), Toast.INFO);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'InterfaceBalance.scss';
</style>
