<template>
  <div class="sign-message-container">
    <interface-container-title :title="$t('verifyMessage.title')" />
    <verify-message-input />
  </div>
</template>

<script>
import InterfaceContainerTitle from '../../components/InterfaceContainerTitle';
import VerifyMessageInput from '@/components/VerifyMessageInput';

export default {
  name: 'VerifyMessage',
  components: {
    'interface-container-title': InterfaceContainerTitle,
    'verify-message-input': VerifyMessageInput
  }
};
</script>

<style lang="scss" scoped>
@import 'VerifyMessageContainer.scss';
</style>
