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
                Vaults
              </caption>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Deposit time</th>
                  <th scope="col">Percent</th>
                  <th scope="col">Earnings</th>
                  <th scope="col">
                    {{ show === 'withdrawn' ? 'Withdraw time' : '' }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="d in vaults.filter(
                    v =>
                      (v.withdrawTime.getTime() !== 0) ===
                      (show === 'withdrawn')
                  )"
                  :key="d.id"
                >
                  <td>{{ d.id }}</td>
                  <td>{{ d.amount }}</td>
                  <td>{{ d.depositTime.toLocaleString() }}</td>
                  <td>{{ percent(d) }}</td>
                  <td style="font-family: monospace">
                    {{ d.earnings.toFormat(8) }}
                  </td>
                  <td>
                    <span v-if="d.withdrawTime.getTime() !== 0">
                      {{ d.withdrawTime.toLocaleString() }}
                    </span>
                    <button v-else @click="withdraw(d.id)">Withdraw</button>
                  </td>
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

function updateVaultsLoop() {
  this.contract.methods
    .getMyVaultIds()
    .call({ from: this.account.address })
    .then(vaults =>
      Promise.all(
        vaults.map(id =>
          this.contract.methods
            .getVaultById(id)
            .call({ from: this.account.address })
            .then(({ amount, depositTime, interest, withdrawTime }) => {
              return {
                id,
                amount: this.web3.utils.fromWei(amount, 'ether'),
                depositTime: new Date(depositTime * 1000),
                earnings: new BigNumber(
                  this.web3.utils.fromWei(interest, 'ether')
                ),
                withdrawTime: new Date(withdrawTime * 1000)
              };
            })
        )
      )
    )
    .then(vaults => (this.vaults = vaults))
    .finally(() => {
      this.polling = setTimeout(() => updateVaultsLoop.call(this), 10_000);
    });
}

function initContract({ network, web3 }) {
  if ([ILG.name, ILGT.name].includes(network.type.name)) {
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
    deposit() {
      this.contract.methods.deposit().send({
        from: this.account.address,
        value: Web3.utils.toWei(this.depositAmount, 'ether')
      });
    },
    withdraw(id) {
      this.contract.methods.withdraw(id).send({ from: this.account.address });
    },
    refresh() {
      clearTimeout(this.polling);
      this.vaults = null;
      updateVaultsLoop.call(this);
    },
    percent({ amount, depositTime, earnings }) {
      const yearInMs = 31_556_926_000;
      const msSinceDeposit = new Date().getTime() - depositTime.getTime();
      const percent = (earnings / amount) * (yearInMs / msSinceDeposit) * 100;
      return percent.toFixed(2) + ' %';
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'DashboardContainer.scss';
</style>
