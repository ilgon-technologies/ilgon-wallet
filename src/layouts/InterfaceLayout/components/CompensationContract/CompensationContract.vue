<template>
  <div>
    <ErrorModal
      :close="closeError"
      :messages="errorMessage === null ? [] : [errorMessage]"
    />
    <div
      v-if="contract !== null && vaults.length > 0"
      style="padding-top: 50px"
    >
      <div class="flex--row--align-center title">
        <h4>Compensation contract</h4>
      </div>
      <div class="swap-info">
        <table id="compensation-table" style="width: 100%">
          <caption>
            Deposits
            <span> (on stake total: {{ showDepositsAmount }}) </span>
          </caption>
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Deposit time</th>
              <th scope="col">Amount</th>
              <th scope="col">Expected earnings</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in vaults" :key="d.id">
              <td>{{ d.label }}</td>
              <td>
                {{ showDate(d.depositTime) }}
              </td>
              <td>{{ web3.utils.fromWei(d.amount) }}</td>
              <td>{{ percent(d) }}</td>
              <template v-if="d.status.t === 'withdrawn'">
                <td>Withdrawn at: {{ showDate(d.status.at) }}</td>
              </template>
              <template v-else-if="d.status.t === 'withdrawableAt'">
                <td>Withdrawable at: {{ showDate(d.status.at) }}</td>
              </template>
              <template v-else>
                <td>
                  <div style="display: flex">
                    <button
                      style="margin-left: auto; font-size: 14px"
                      @click="withdraw(d)"
                    >
                      Withdraw
                    </button>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';

// eslint-disable-next-line no-unused-vars
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
// eslint-disable-next-line no-unused-vars
import { Contract } from 'web3-eth-contract';
import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import { DateTimeFormatOptions } from 'vue-i18n';
import ErrorModal from '@/containers/ConfirmationContainer/components/ErrorModal/ErrorModal.vue';
import { COMPENSATION } from '@/networks/types';

/**
 * @example
 * // returns [0, 1, 2, 3, 4]
 * range(5)
 */
const range = (endExclusive: number) =>
  Array.from({ length: endExclusive }, (_, i) => i);
const withoutSeconds: DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

type Vault = {
  id: number;
  label: string;
  depositTime: Date;
  amount: string;
  premium: BigNumber;
  status:
    | {
        t: 'withdrawn' | 'withdrawableAt';
        at: Date;
      }
    | {
        t: 'withdrawable';
      };
};

function initContract({
  network,
  web3
}: {
  network: any;
  web3: Web3;
}): Contract | null {
  const contract = network.type.contracts.find(
    (c: any) => c.name === COMPENSATION
  );
  return contract
    ? ((new web3.eth.Contract(
        contract.abi,
        contract.address
      ) as unknown) as Contract)
    : null;
}

export default Vue.extend({
  components: {
    ErrorModal
  },
  data() {
    const newVar: {
      errorMessage: null | string;
      contract: Contract | null;
      vaults: Vault[];
      polling: null | NodeJS.Timeout;
    } = {
      errorMessage: null,
      vaults: [],
      // null if the network does not support staking
      contract: initContract({
        network: this.$store.state.main.network,
        web3: this.$store.state.main.web3
      }),
      polling: null
    };
    return newVar;
  },

  computed: {
    ...mapState('main', ['account', 'web3', 'network']),
    showDepositsAmount(): string {
      const weisStr = this.vaults!.reduce(
        (acc, vault) =>
          vault.status.t === 'withdrawn' ? acc : acc.plus(vault.amount),
        new BigNumber(0)
      ).toFixed();
      const ethsStr = this.web3.utils.fromWei(weisStr);
      return parseFloat(ethsStr)
        .toFixed(8)
        .replace(/(\.\d)*0+$/, '$1');
    }
  },
  watch: {
    // depends on that web3 changes after the network
    web3(web3) {
      if (this.polling !== null) {
        clearTimeout(this.polling);
      }
      this.contract = initContract({ network: this.network, web3 });
      if (this.contract !== null) {
        this.updateVaultsLoop();
      }
    }
  },
  mounted() {
    if (this.contract !== null) {
      this.updateVaultsLoop();
    }
  },
  beforeDestroy() {
    if (this.polling !== null) {
      clearTimeout(this.polling);
    }
  },
  methods: {
    closeError() {
      this.errorMessage = null;
    },
    showDate: (d: Date) => d.toLocaleString([], withoutSeconds),
    updateVaultsLoop() {
      if (this.polling !== null) {
        clearTimeout(this.polling);
      }
      const methods = this.contract!.methods;
      const address = this.account.address;
      const now = Math.floor(new Date().getTime() / 1000);
      type VaultResponse = {
        vault: {
          amount: string;
          depositTime: string;
          duration: string;
          label: string;
          owner: string;
          premium: string;
          withdrawTime: string;
        };
        withdrawableAmount: string;
      };
      Promise.all([
        methods.getVaultsLength(address).call() as Promise<number>,
        methods.interestStartTime().call() as Promise<string>
      ])
        .then(
          ([length, startTime]) =>
            [range(length), Number.parseInt(startTime)] as const
        )
        .then(([vaultIds, startTime]) =>
          Promise.all(
            vaultIds.map(id =>
              (methods
                .getVaultById(address, id)
                .call() as Promise<VaultResponse>).then(
                ({
                  vault: {
                    label,
                    depositTime,
                    amount,
                    premium,
                    withdrawTime,
                    duration
                  }
                }) => ({
                  id,
                  label,
                  depositTime: new Date(parseInt(depositTime) * 1000),
                  amount,
                  premium: new BigNumber(premium).div(10),
                  status:
                    withdrawTime !== '0'
                      ? {
                          t: 'withdrawn' as const,
                          at: new Date(parseInt(withdrawTime) * 1000)
                        }
                      : (() => {
                          const soonestWithdrawal = Math.ceil(
                            Math.max(parseInt(depositTime), startTime) +
                              parseInt(duration)
                          );
                          return now < soonestWithdrawal
                            ? {
                                t: 'withdrawableAt' as const,
                                at: new Date(soonestWithdrawal * 1000)
                              }
                            : { t: 'withdrawable' as const };
                        })()
                })
              )
            )
          )
        )
        .then((vaults: Vault[]) => (this.vaults = vaults))
        .finally(
          () =>
            (this.polling = setTimeout(() => this.updateVaultsLoop(), 10_000))
        );
    },
    withdraw(d: Vault) {
      this.contract!.methods.withdraw(d.id)
        .send({
          from: this.account.address
        })
        .then(() => this.updateVaultsLoop())
        .catch((e: any) => (this.errorMessage = e + ''));
    },
    percent: ({ premium }: Vault) => premium.toFixed(2) + ' %'
  }
});
</script>

<style lang="scss" scoped>
@import 'CompensationContract.scss';
</style>
