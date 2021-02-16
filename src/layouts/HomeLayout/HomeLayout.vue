<template>
  <div class="home">
    <top-banner />
    <about />
    <faqs />
  </div>
</template>

<script>
import AboutContainer from '@/containers/AboutContainer';
import FaqsContainer from '@/containers/FaqsContainer';
import TopBanner from './components/TopBanner';
import { mapState } from 'vuex';

export default {
  name: 'HomeContainer',
  components: {
    'top-banner': TopBanner,
    about: AboutContainer,
    faqs: FaqsContainer
  },
  data() {
    return {
      address: '',
      resolvedAddress: ''
    };
  },
  computed: {
    ...mapState('main', ['online'])
  }
};
</script>

<style lang="scss" scoped>
@import 'HomeLayout.scss';
</style>
