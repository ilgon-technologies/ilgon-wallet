<template>
  <div class="dashboard-container">
    <div class="container--flex container--top">
      <div class="container--card block--swap">
        <div class="flex--row--align-center title">
          <h4>Stacking contract</h4>
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
            />
            <label for="not-withdrawn">Not withdrawn</label>
            <input
              id="withdrawn"
              v-model="show"
              type="radio"
              :value="'withdrawn'"
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
                  <th scope="col"></th>
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
                  <td>{{ d.depositTime }}</td>
                  <td>{{ '%' }}</td>
                  <td>{{ d.earnings }}</td>
                  <td>
                    <button @click="withdraw(d.id)">Withdraw</button>
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

import contracts from '@/networks/types/contracts';
import Web3 from 'web3';

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
            .then(vault => ({
              id,
              amount: this.web3.utils.fromWei(vault.amount, 'ether'),
              depositTime: new Date(vault.depositTime * 1000).toLocaleString(),
              earnings: this.web3.utils.fromWei(vault.interest, 'ether')
            }))
        )
      )
    )
    .then(vaults => (this.vaults = vaults))
    .finally(() => {
      this.polling = setTimeout(() => updateVaultsLoop.call(this), 1000);
    });
}

export default {
  data() {
    return {
      depositAmount: '',
      vaults: null,
      contract: new this.$store.state.main.web3.eth.Contract(
        contracts[0].abi,
        contracts[0].address
      ),
      polling: null,
      // 'not-withdrawn' | 'withdrawn'
      show: 'not-withdrawn'
    };
  },

  computed: {
    ...mapState('main', ['web3', 'account'])
  },
  watch: {
    // todo network
  },
  mounted() {
    updateVaultsLoop.call(this);
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'DashboardContainer.scss';
</style>
