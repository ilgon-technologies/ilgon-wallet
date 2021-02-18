<template>
  <div class="faqs">
    <div id="faqs" class="wrap">
      <div class="page-container">
        <div class="flex-col-vertical-bottom top-title">
          <div class="title">
            <h2>{{ $t('common.faqs') }}</h2>
          </div>
        </div>

        <div class="qa-cards">
          <ul class="qa__contents">
            <li v-for="prop in Object.keys(faqs)" :key="prop">
              <div class="qa__contents--title" @click="openFAQ(prop)">
                <h3>{{ $t(faqs[prop].title) }}</h3>
                <div class="show-more-buttons">
                  <div
                    :class="faqs[prop].open ? 'faq-open' : ''"
                    class="animated-button"
                  >
                    <div class="bar bar1"></div>
                    <div class="bar bar2"></div>
                  </div>
                </div>
              </div>
              <div
                :class="faqs[prop].open ? 'faq-open' : ''"
                class="qa__contents--content"
              >
                <div class="qa-text">
                  {{ $t(faqs[prop].content) }}
                  <a
                    :href="$t(faqs[prop].link)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ $t(faqs[prop].linkText) }}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      faqs: {
        faq2: {
          open: false,
          title: 'home.faqs.other-wallets.title',
          content: 'home.faqs.other-wallets.text'
        },
        faq3: {
          open: false,
          title: 'home.faqs.send-txs.title',
          content: 'home.faqs.send-txs.text'
        },
        faq4: {
          open: false,
          title: 'home.faqs.forgot-pwd.title',
          content: 'home.faqs.forgot-pwd.text'
        },
        faq5: {
          open: false,
          title: 'home.faqs.create-wallet.title',
          content: 'home.faqs.create-wallet.text'
        }
      }
    };
  },
  methods: {
    openFAQ: function (faqToOpen) {
      this.faqs[faqToOpen].open = !this.faqs[faqToOpen].open;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'FaqsContainer.scss';
</style>
