<template>
  <div class="home">
    <home-modal v-if="on" ref="home" @turnOff="turnOff" />
    <img v-if="on" class="img-1" :src="img" @click="showModal" />
    <top-banner v-if="!on" />
    <about v-if="!on" />
    <faqs v-if="!on" />
  </div>
</template>

<script>
import AboutContainer from '@/containers/AboutContainer';
import FaqsContainer from '@/containers/FaqsContainer';
import TopBanner from './components/TopBanner';
import img from '@/assets/images/ads/1.png';
import HomeModal from './components/HomeModal';
import { mapState } from 'vuex';

export default {
  name: 'HomeContainer',
  components: {
    HomeModal,
    'top-banner': TopBanner,
    about: AboutContainer,
    faqs: FaqsContainer
  },
  data() {
    return {
      address: '',
      resolvedAddress: '',
      on: false,
      img: img
    };
  },
  computed: {
    ...mapState('main', ['online'])
  },
  methods: {
    showModal() {
      this.$refs.home.$refs.modal.show();
    },
    turnOff() {
      this.on = false;
      if (window) window.dispatchEvent(new Event('TURN_OFF'));
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
  max-width: 100%;
}
@import 'HomeLayout.scss';
</style>
