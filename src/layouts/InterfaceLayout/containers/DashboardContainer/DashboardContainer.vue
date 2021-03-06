<template>
  <div class="dashboard-container">
    <ErrorModal
      :close="closeError"
      :messages="errorMessage === null ? [] : [errorMessage]"
    />
    <div class="container--flex container--top">
      <div class="container--card block--swap">
        <div v-if="contract !== null">
          <div class="flex--row--align-center title">
            <h4>Staking contract</h4>
          </div>
          <div class="swap-info">
            <div v-if="vaults !== null">
              <div>
                <input
                  v-model="depositAmount"
                  type="number"
                  aria-label="Deposit amount"
                  style="width: 7.5em"
                  step="0.000000000000000001"
                />
                <button
                  :disabled="depositAmount === '' || depositAmount <= 0"
                  style="margin-left: 0.5em"
                  @click="deposit"
                >
                  Deposit
                </button>
                <span style="margin-left: 1em"
                  ><strong>Show only:</strong></span
                >
                <div style="display: inline-block">
                  <input
                    id="not-withdrawn"
                    v-model="show"
                    type="radio"
                    :value="'not-withdrawn'"
                    style="margin-left: 1.4em"
                  />
                  <label for="not-withdrawn" style="margin-left: 0.3em">
                    On stake
                  </label>
                </div>
                <div style="display: inline-block">
                  <input
                    id="withdrawn"
                    v-model="show"
                    type="radio"
                    :value="'withdrawn'"
                    style="margin-left: 1.3em"
                  />
                  <label for="withdrawn" style="margin-left: 0.3em">
                    Withdrawn
                  </label>
                </div>
              </div>
              <button style="margin-top: 0.25em" @click="refresh">
                Refresh
              </button>
              <br />

              <table id="staking-table" style="width: 100%">
                <caption>
                  Deposits
                  <span v-if="show === 'not-withdrawn'">
                    (on stake total: {{ showDepositsAmount() }})
                  </span>
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Deposit time</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Earnings</th>
                    <th scope="col">Percent</th>
                    <th v-if="shouldShowDepositTypeColumn()" scope="col">
                      Type
                    </th>
                    <template v-if="show === 'withdrawn'">
                      <th scope="col">Withdraw time</th>
                    </template>
                    <template v-else>
                      <th scope="col">Max withdrawable</th>
                      <th scope="col" />
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="d in vaults.filter(
                      v =>
                        (v.withdrawTime !== undefined) ===
                        (show === 'withdrawn')
                    )"
                    :key="d.id"
                  >
                    <td>{{ d.label || '' }}</td>
                    <td>{{ showDate(d.depositTime) }}</td>
                    <td>{{ web3.utils.fromWei(d.amount) }}</td>
                    <td style="font-family: monospace">
                      {{ showInterest(d) }}
                    </td>
                    <td>{{ percent(d) }}</td>
                    <td v-if="shouldShowDepositTypeColumn()">
                      {{ showDepositType(d) }}
                    </td>
                    <template v-if="d.withdrawTime !== undefined">
                      <td>
                        {{ showDate(d.withdrawTime) }}
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        {{ web3.utils.fromWei(d.withdrawableAmount) }}
                      </td>
                      <td>
                        <div style="display: flex">
                          <input
                            v-if="d.depositType !== 'NORMAL'"
                            v-model="d.withdrawInput"
                            type="number"
                            aria-label="Withdraw amount"
                            style="width: 7.5em; margin-right: 0.5em"
                          />
                          <button
                            style="margin-left: auto"
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

            <div v-else>Loading...</div>
          </div>
        </div>
        <CompensationContract />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';

import Web3 from 'web3';
import BigNumber from 'bignumber.js';
// eslint-disable-next-line no-unused-vars
import { Contract } from 'web3-eth-contract';
import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import { DateTimeFormatOptions } from 'vue-i18n';
import ErrorModal from '@/containers/ConfirmationContainer/components/ErrorModal/ErrorModal.vue';
import { STAKING } from '@/networks/types';
import CompensationContract from '@/layouts/InterfaceLayout/components/CompensationContract/CompensationContract.vue';

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

const toDepositType = (n: string) => {
  switch (n) {
    case '0':
      return 'NORMAL';
    case '1':
      return 'COMPENSATION';
    case '2':
      return 'PACKAGE';
    default:
      throw new Error('Invalid deposit enum: ' + n);
  }
};

type Vault = {
  id: number;
  label: string;
  depositTime: Date;
  amount: string;
  interest: string;
  depositType: 'NORMAL' | 'COMPENSATION' | 'PACKAGE';
  withdrawInput: string;
} & ({ withdrawTime: Date } | { withdrawableAmount: string });

function initContract({
  network,
  web3
}: {
  network: any;
  web3: Web3;
}): Contract | null {
  const contract = network.type.contracts.find((c: any) => c.name === STAKING);
  return contract !== undefined
    ? ((new web3.eth.Contract(
        contract.abi,
        contract.address
      ) as unknown) as Contract)
    : null;
}

const try_ = <T>(fn: () => T) => {
  try {
    return fn();
  } catch (e) {
    return e instanceof Error ? e : new Error(e + '');
  }
};

export default Vue.extend({
  components: {
    CompensationContract,
    ErrorModal
  },
  data() {
    const newVar: {
      errorMessage: null | string;
      depositAmount: string;
      contract: Contract | null;
      vaults: null | Vault[];
      show: 'not-withdrawn' | 'withdrawn';
      polling: null | NodeJS.Timeout;
    } = {
      errorMessage: null,
      depositAmount: '',
      vaults: null,
      // null if the network does not support staking
      contract: initContract({
        network: this.$store.state.main.network,
        web3: this.$store.state.main.web3
      }),
      polling: null,
      // 'not-withdrawn' | 'withdrawn'
      show: 'not-withdrawn'
    };
    return newVar;
  },

  computed: {
    ...mapState('main', ['account', 'web3', 'network'])
  },
  watch: {
    // depends on that web3 changes after the network
    web3(web3) {
      if (this.polling !== null) {
        clearTimeout(this.polling);
      }
      this.vaults = null;
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
      this.contract!.methods.getVaultsLength(this.account.address)
        .call()
        .then(range)
        .then((vaults: number[]) =>
          Promise.all(
            vaults.map(id =>
              (this.contract!.methods.getVaultById(
                this.account.address,
                id
              ).call() as Promise<{
                vault: {
                  owner: string;
                  depositTime: string;
                  withdrawTime: string;
                  amount: string;
                  label: string;
                  withdrawnAmount: string;
                  depositType: string;
                  withdrawLimit: string;
                  firstWithdrawTime: string;
                  stakingBonus: string;
                };
                interest: string;
                withdrawableAmount: string;
              }>)
                .then(
                  ({
                    vault: {
                      label,
                      depositTime,
                      amount,
                      withdrawnAmount,
                      withdrawTime,
                      depositType
                    },
                    interest,
                    withdrawableAmount
                  }) => ({
                    label,
                    depositTime: new Date(parseInt(depositTime) * 1000),
                    amount,
                    withdrawnAmount,
                    interest,
                    withdrawTime: new Date(parseInt(withdrawTime) * 1000),
                    withdrawableAmount,
                    depositType: toDepositType(depositType)
                  })
                )
                .then(
                  ({
                    label,
                    depositTime,
                    amount,
                    withdrawnAmount,
                    interest,
                    withdrawTime,
                    withdrawableAmount,
                    depositType
                  }) => {
                    const remaining = new BigNumber(amount).minus(
                      withdrawnAmount
                    );
                    return {
                      id,
                      label,
                      depositTime,
                      ...(remaining.isEqualTo(0)
                        ? { amount, withdrawTime }
                        : { amount: remaining.toFixed(), withdrawableAmount }),
                      interest,
                      depositType
                    };
                  }
                )
            )
          )
        )
        .then(
          (vaults: any[]) =>
            (this.vaults = vaults.map((v, id) => ({
              ...v,
              withdrawInput:
                (this.vaults &&
                  this.vaults[id] &&
                  this.vaults[id].withdrawInput) ||
                ''
            })))
        )
        .finally(
          () =>
            (this.polling = setTimeout(() => this.updateVaultsLoop(), 10_000))
        );
    },
    shouldShowDepositTypeColumn() {
      return this.vaults!.filter(
        v => 'withdrawTime' in v === (this.show === 'withdrawn')
      ).some(v => v.depositType !== 'NORMAL');
    },
    showDepositsAmount() {
      const weisStr = this.vaults!.reduce(
        (acc, vault) =>
          'withdrawTime' in vault ? acc : acc.plus(vault.amount),
        new BigNumber(0)
      ).toFixed();
      const ethsStr = this.web3.utils.fromWei(weisStr);
      return parseFloat(ethsStr)
        .toFixed(8)
        .replace(/(\.\d)*0+$/, '$1');
    },
    showInterest(vault: Vault) {
      return new BigNumber(this.web3.utils.fromWei(vault.interest)).toFixed(8);
    },
    showDepositType(v: Vault) {
      switch (v.depositType) {
        case 'NORMAL':
          return 'Normal';
        case 'COMPENSATION':
          return 'Compensation';
        case 'PACKAGE':
          return 'Pacakge';
        default:
          throw new Error('Invalid deposit enum: ' + v.depositType);
      }
    },
    async deposit() {
      const weiOrFailure = try_(() =>
        Web3.utils.toWei(this.depositAmount, 'ether')
      );
      if (weiOrFailure instanceof Error) {
        this.errorMessage = weiOrFailure.message;
      } else {
        const value = weiOrFailure;
        const minDeposit = await this.contract!.methods.getMinDeposit().call();
        if (new BigNumber(value).lt(minDeposit)) {
          this.errorMessage =
            'Amount to be deposited is less than the minimum allowed deposit (' +
            Web3.utils.fromWei(minDeposit) +
            ')';
        } else {
          this.contract!.methods.deposit().send({
            from: this.account.address,
            value
          });
        }
      }
    },
    withdraw(d: Vault) {
      this.contract!.methods.withdraw(
        d.id,
        d.depositType === 'NORMAL'
          ? d.amount
          : this.web3.utils.toWei(d.withdrawInput)
      ).send({ from: this.account.address });
    },
    refresh() {
      clearTimeout(this.polling!);
      this.vaults = null;
      this.updateVaultsLoop();
    },
    percent(v: Vault) {
      const yearInMs = 31_556_926_000;
      const msSinceDeposit =
        ('withdrawTime' in v ? v.withdrawTime : new Date()).getTime() -
        v.depositTime.getTime();
      const percent = new BigNumber(v.interest)
        .dividedBy(v.amount)
        .multipliedBy(new BigNumber(yearInMs).dividedBy(msSinceDeposit))
        .multipliedBy(100);
      return percent.toFixed(2) + ' %';
    }
  }
});
</script>

<style lang="scss" scoped>
@import 'DashboardContainer.scss';
</style>
