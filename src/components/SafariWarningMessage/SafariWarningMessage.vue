<template>
  <div class="warning-message">
    <div class="left">⚠️</div>
    <div class="right">
      <p class="title">Keystore file is not supported on Safari</p>
      <p class="message">
        Consider using
        <a href="https://www.google.com/chrome/">Chrome</a>
        or
        <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>
        instead.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import 'SafariWarningMessage.scss';
</style>
