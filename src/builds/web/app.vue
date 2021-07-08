<template>
  <div id="app">
    <logout-warning-modal ref="logoutWarningModal" />
    <header-container
      v-show="
        $route.fullPath !== '/getting-started' &&
        !$route.fullPath.includes('/dapp-submission')
      "
    />
    <router-view />
    <footer-container />
    <confirmation-container v-if="wallet !== null" />
  </div>
</template>

<script>
import FooterContainer from '@/containers/FooterContainer';
import HeaderContainer from '@/containers/HeaderContainer';
import ConfirmationContainer from '@/containers/ConfirmationContainer';
import { mapState, mapActions } from 'vuex';
import LogoutWarningModal from '@/components/LogoutWarningModal';

export default {
  name: 'App',
  components: {
    'header-container': HeaderContainer,
    'footer-container': FooterContainer,
    'confirmation-container': ConfirmationContainer,
    'logout-warning-modal': LogoutWarningModal
  },
  computed: {
    ...mapState('main', ['wallet', 'online'])
  },
  watch: {
    $route(to, from) {
      if (
        !from.meta.hasOwnProperty('requiresAuth') &&
        to.meta.hasOwnProperty('requiresAuth') &&
        this.wallet !== null
      ) {
        this.$refs.logoutWarningModal.$refs.logoutWarningModal.show();
      }
    }
  },
  created() {
    window.addEventListener('online', () => {
      this.checkIfOnline(true);
    });
    window.addEventListener('offline', () => {
      this.checkIfOnline(false);
    });
  },
  mounted() {
    this.checkIfOnline(navigator.onLine);

    this.$refs.logoutWarningModal.$refs.logoutWarningModal.$on('hidden', () => {
      window.scrollTo(0, 0);
    });
  },
  destroyed() {
    window.removeEventListener('offline');
    window.removeEventListener('online');
  },
  methods: {
    ...mapActions('main', ['checkIfOnline'])
  }
};
</script>

<style lang="scss">
@import '~@/scss/Global-desktop';
@import '~@/scss/Global-tablet';
@import '~@/scss/Global-mobile';

@import '~@/scss/CustomForms-desktop';
@import '~@/scss/CustomForms-tablet';
@import '~@/scss/CustomForms-mobile';

@import '~@/scss/CustomModal-desktop';
@import '~@/scss/CustomModal-tablet';
@import '~@/scss/CustomModal-mobile';
</style>
