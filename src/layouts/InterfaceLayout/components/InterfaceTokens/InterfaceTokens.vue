<template>
  <div class="transaction-tokens">
    <div class="wrap">
      <div class="tokens-container">
        <div class="token-search">
          <div class="block-title">
            <div class="title-container">
              <h4>{{ $tc('common.token', 2) }}</h4>
              <img
                alt
                src="~@/assets/images/icons/change.svg"
                @click="fetchTokens"
              />
            </div>
          </div>
          <div class="search-block">
            <input v-model="search" placeholder="Search" autocomplete="off" />
            <i class="fa fa-search" aria-hidden="true" />
          </div>
        </div>
        <div v-show="!online" class="cant-load">
          {{ $t('interface.tokens.warning-offline') }}
        </div>
        <div class="token-table-container">
          <table v-show="localTokens.length > 0 && receivedTokens">
            <tr
              v-for="(token, index) in localTokens"
              :key="token.symbol + index"
            >
              <td class="name-and-icon-container">
                <figure v-lazy-load class="token-icon">
                  <img :data-url="iconFetch(token)" @error="iconFallback" />
                </figure>
                <a
                  :href="
                    network.type.blockExplorerAddr.replace(
                      '[[address]]',
                      token.address
                    )
                  "
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{{
                    token.symbol.length > 10
                      ? `${token.symbol.substr(0, 15)}...`
                      : token.symbol
                  }}</span></a
                >
              </td>
              <td>
                {{ showBalance(token) }}
              </td>
            </tr>
          </table>

          <div
            v-show="
              search === '' &&
              localTokens &&
              localTokens.length === 0 &&
              !receivedTokens
            "
            class="spinner-container"
          >
            <i class="fa fa-spinner fa-spin" />
          </div>
          <div
            v-show="search !== '' && localTokens && localTokens.length === 0"
            class="spinner-container"
          >
            {{ $t('interface.tokens.no-tokens') }}
          </div>
        </div>
      </div>
      <interface-ads></interface-ads>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { toChecksumAddress } from '@/helpers/addressUtils';
import InterfaceAds from '../InterfaceAds';
import sortByBalance from '@/helpers/sortByBalance.js';
import utils from 'web3-utils';
import masterFile from '@/_generated/master-file.json';

export default {
  components: {
    'interface-ads': InterfaceAds
  },
  props: {
    tokens: {
      type: Array,
      default: function () {
        return [];
      }
    },
    receivedTokens: {
      type: Boolean,
      default: false
    },
    fetchTokens: {
      type: Function,
      default: function () {}
    }
  },
  data() {
    return {
      search: '',
      localTokens: [],
      util: utils,
      tokenExists: false
    };
  },
  computed: {
    ...mapState('main', ['network', 'web3', 'online']),
    networkTokens() {
      const newTokenObj = {};
      const matchedNetwork = masterFile.filter(item => {
        return (
          item.network.toLowerCase() === this.network.type.name.toLowerCase()
        );
      });
      matchedNetwork.forEach(item => {
        newTokenObj[toChecksumAddress(item.contract_address)] = item;
      });

      return newTokenObj;
    }
  },
  watch: {
    tokens(newVal) {
      this.assignTokens(newVal, this.search);
    },
    search(newVal) {
      this.assignTokens(this.tokens, newVal);
    }
  },
  methods: {
    showBalance(token) {
      // 1000000 -> 1 000 000
      // https://stackoverflow.com/a/2901298
      // eslint-disable-next-line security/detect-unsafe-regex
      return token.balance.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');
    },
    iconFetch(tok) {
      const token = this.networkTokens[toChecksumAddress(tok.address)];
      if (token) {
        const tokenSrc =
          token.icon_png !== ''
            ? `https://img.mewapi.io/?image=${token.icon_png}&width=50&height=50&fit=scale-down`
            : token.icon !== ''
            ? `https://img.mewapi.io/?image=${token.icon}&width=50&height=50&fit=scale-down`
            : tok.logo && tok.logo.src && tok.logo.src !== ''
            ? `https://img.mewapi.io/?image=${tok.logo.src}&width=50&height=50&fit=scale-down`
            : this.network.type.icon;
        return tokenSrc;
      } else if (tok.logo && tok.logo.src && tok.logo.src !== '') {
        return `https://img.mewapi.io/?image=${tok.logo.src}&width=50&height=50&fit=scale-down`;
      }

      return this.network.type.icon;
    },
    iconFallback(evt) {
      evt.target.src = this.network.type.icon;
    },
    assignTokens(arr, query) {
      if (query !== '') {
        this.localTokens = this.tokens
          .filter(token => {
            if (token.symbol.toLowerCase().includes(query.toLowerCase())) {
              return token;
            }
          })
          .sort(sortByBalance);
      } else {
        this.localTokens = arr;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'InterfaceTokens.scss';
</style>
