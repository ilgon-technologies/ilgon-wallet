<template>
  <div class="info-block-container">
    <interface-balance-modal ref="balance" :balance="balance" />
    <div class="info-block balance">
      <div class="block-image">
        <div class="icon-border">
          <img alt class="icon" src="~@/assets/images/icons/wallet.svg" />
        </div>
      </div>
      <div class="block-content">
        <div class="information-container">
          <h2>{{ $t('common.balance.string') }}</h2>
          <div class="balance-text-container">
            <div v-show="balance !== undefined" class="balance-text">
              <p>
                {{ balance }}
                <span>
                  {{ network.type.currencyName }}
                </span>
              </p>
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
            id="balanceCheck"
            class="custom-tooltip"
            @click="balanceModalOpen"
          >
            <img alt src="~@/assets/images/icons/more.svg" />
          </b-btn>
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
import InterfaceBalanceModal from '../InterfaceBalanceModal';
import { mapState } from 'vuex';
import BigNumber from 'bignumber.js';
export default {
  components: {
    'interface-balance-modal': InterfaceBalanceModal
  },
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
    balanceModalOpen() {
      this.$refs.balance.$refs.balance.show();
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
@import 'InterfaceBalance.scss';
</style>
