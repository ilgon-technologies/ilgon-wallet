<template>
  <div class="dashboard-container">
    <div class="container--flex container--top">
      <div v-if="contract !== null" class="container--card block--swap">
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
              />
              <button
                :disabled="depositAmount === '' || depositAmount <= 0"
                @click="deposit"
              >
                Deposit
              </button>
            </div>
            <button @click="refresh">Refresh</button>
            <br />
            Show only:
            <input
              id="not-withdrawn"
              v-model="show"
              type="radio"
              :value="'not-withdrawn'"
              style="margin-left: 3%"
            />
            <label for="not-withdrawn">On stake</label>
            <input
              id="withdrawn"
              v-model="show"
              type="radio"
              :value="'withdrawn'"
              style="margin-left: 3%"
            />
            <label for="withdrawn">Withdrawn</label>
            <table style="width: 100%">
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
                  <th scope="col">Type</th>
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
                      (v.withdrawTime !== undefined) === (show === 'withdrawn')
                  )"
                  :key="d.id"
                >
                  <td>{{ d.label || '' }}</td>
                  <td>{{ d.depositTime.toLocaleString() }}</td>
                  <td>{{ web3.utils.fromWei(d.amount) }}</td>
                  <td style="font-family: monospace">{{ showInterest(d) }}</td>
                  <td>{{ percent(d) }}</td>
                  <td>{{ showDepositType(d) }}</td>
                  <template v-if="d.withdrawTime !== undefined">
                    <td>{{ d.withdrawTime.toLocaleString() }}</td>
                  </template>
                  <template v-else>
                    <td>
                      {{ web3.utils.fromWei(d.withdrawableAmount) }}
                    </td>
                    <td>
                      <input
                        v-if="d.depositType !== 'NORMAL'"
                        v-model="d.withdrawInput"
                        type="number"
                        aria-label="Withdraw amount"
                      />
                      <button @click="withdraw(d)">Withdraw</button>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else>Loading...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { ILG, ILGT } from '@/networks/types';

/**
 * @example
 * // returns [0, 1, 2, 3, 4]
 * range(5)
 */
const range = endExclusive => Array.from({ length: endExclusive }, (_, i) => i);

const toDepositType = n => {
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

function updateVaultsLoop() {
  this.contract.methods
    .getVaultsLength(this.account.address)
    .call()
    .then(range)
    .then(vaults =>
      Promise.all(
        vaults.map(id =>
          this.contract.methods
            .getVaultById(this.account.address, id)
            .call()
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
              }) => ({
                label,
                depositTime: new Date(depositTime * 1000),
                amount,
                withdrawnAmount,
                interest,
                withdrawTime: new Date(withdrawTime * 1000),
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
                const remaining = new BigNumber(amount).minus(withdrawnAmount);
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
      vaults =>
        (this.vaults = vaults.map((v, id) => ({
          ...v,
          withdrawInput:
            (this.vaults && this.vaults[id] && this.vaults[id].withdrawInput) ||
            ''
        })))
    )
    .finally(() => {
      this.polling = setTimeout(() => updateVaultsLoop.call(this), 10_000);
    });
}

function initContract({ network, web3 }) {
  if ([ILG, ILGT].includes(network.type)) {
    const contract = network.type.contracts[0];
    return new web3.eth.Contract(contract.abi, contract.address);
  }
  return null;
}

export default {
  data() {
    return {
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
  },

  computed: {
    ...mapState('main', ['account', 'web3', 'network'])
  },
  watch: {
    // depends on that web3 changes after the network
    web3(web3) {
      clearTimeout(this.polling);
      this.vaults = null;
      this.contract = initContract({ network: this.network, web3 });
      if (this.contract !== null) {
        updateVaultsLoop.call(this);
      }
    }
  },
  mounted() {
    if (this.contract !== null) {
      updateVaultsLoop.call(this);
    }
  },
  beforeDestroy() {
    clearTimeout(this.polling);
  },
  methods: {
    showDepositsAmount() {
      const weisStr = this.vaults
        .reduce(
          (acc, { amount, withdrawTime }) =>
            withdrawTime === undefined ? acc.plus(amount) : acc,
          new BigNumber(0)
        )
        .toFixed();
      const ethsStr = this.web3.utils.fromWei(weisStr);
      return parseFloat(ethsStr)
        .toFixed(8)
        .replace(/(\.\d)*0+$/, '$1');
    },
    showInterest(vault) {
      return new BigNumber(this.web3.utils.fromWei(vault.interest)).toFixed(8);
    },
    showDepositType(v) {
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
    deposit() {
      this.contract.methods.deposit().send({
        from: this.account.address,
        value: Web3.utils.toWei(this.depositAmount, 'ether')
      });
    },
    withdraw(d) {
      this.contract.methods
        .withdraw(
          d.id,
          d.depositType === 'NORMAL'
            ? d.amount
            : this.web3.utils.toWei(d.withdrawInput)
        )
        .send({ from: this.account.address });
    },
    refresh() {
      clearTimeout(this.polling);
      this.vaults = null;
      updateVaultsLoop.call(this);
    },
    percent({ amount, depositTime, interest, withdrawTime }) {
      const yearInMs = 31_556_926_000;
      const msSinceDeposit =
        (withdrawTime || new Date()).getTime() - depositTime.getTime();
      const percent = new BigNumber(interest)
        .dividedBy(amount)
        .multipliedBy(new BigNumber(yearInMs).dividedBy(msSinceDeposit))
        .multipliedBy(100);
      return percent.toFixed(2) + ' %';
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'DashboardContainer.scss';
</style>
