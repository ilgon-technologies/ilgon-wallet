<template>
  <b-modal
    v-if="messages.length > 0"
    centered
    hide-footer
    hide-header
    class="bootstrap-modal"
    static
    lazy
    :visible="true"
    @hide="handleHide"
  >
    <div class="d-block text-center">
      <i class="check-icon fa fa-close" aria-hidden="true" />
      <h2 class="title">{{ $t('confirmation.error') }}</h2>
      <p v-for="(m, i) in messages" :key="i">{{ m }}</p>
    </div>
    <div class="button-container">
      <b-btn
        class="mid-round-button-lightgrey-filled close-button"
        @click="close"
      >
        {{ 'Close' }}
      </b-btn>
    </div>
  </b-modal>
</template>

<style lang="scss" scoped>
@import 'SimpleErrorModal';
</style>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { BvModalEvent } from 'bootstrap-vue';
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    messages: {
      type: Array as PropType<string[]>,
      required: true
    },
    close: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  methods: {
    handleHide(e: BvModalEvent): void {
      e.preventDefault();
      this.close();
    }
  }
});
</script>
