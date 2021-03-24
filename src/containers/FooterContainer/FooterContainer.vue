<template>
  <div>
    <cx-footer v-if="isMewCx" />
    <div v-if="!isMewCx" class="footer">
      <!-- Modal -->
      <div class="wrap">
        <div class="page-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import affiliates from './affiliates.js';
const version = VERSION;
import { Misc } from '@/helpers';
import CxFooter from '@/layouts/ExtensionBrowserAction/components/CxFooter';

export default {
  components: {
    'cx-footer': CxFooter
  },
  data() {
    const isMewCx = Misc.isMewCx();
    return {
      isMewCx: isMewCx,
      version: version,
      lowerLinks: [
        {
          title: 'footer.feedback',
          href: 'mailto:support@ilgonwallet.com'
        },
        {
          title: 'footer.privacy',
          to: '/privacy-policy'
        },
        {
          title: 'common.terms',
          to: '/terms-of-service'
        },
        {
          title: `v${version}`,
          href: `https://github.com/MyEtherWallet/MyEtherWallet/releases/tag/v${version}`
        }
      ],
      footerContent: [
        {
          class: 'e1',
          title: 'footer.title.discover',
          contents: [
            {
              text: 'convertUnits.page.title',
              to: '/convert-units'
            },
            // {
            //   text:'footer.advanced'),
            //   to: '/advanced-tools'
            // },
            {
              text: 'footer.mew-wallet',
              href: 'https://www.mewwallet.com/'
            },
            {
              text: 'footer.mew-connect-protocol',
              href: 'https://mewconnect.myetherwallet.com/#/'
            },
            {
              text: 'footer.extension',
              href: 'https://www.mewcx.com'
            },
            {
              text: 'footer.ethvm',
              href: 'https://www.ethvm.com/'
            },
            {
              text: 'buyHardwareWallet.page.title',
              to: '/hardware-wallet-affiliates'
            },
            {
              text: 'footer.send-offline',
              to: '/send-offline-helper'
            },
            {
              text: 'verifyMessage.title',
              to: '/verify-message'
            },
            {
              text: 'dappsSubmission.banner-submit.submit-dapp',
              to: '/dapp-submission'
            },
            {
              text: 'footer.press-kit.header',
              to: '/press-kit'
            },
            {
              text: 'footer.generate-eth2',
              to: '/generate-eth2-keystore'
            }
          ]
        },
        {
          class: 'e2',
          title: 'footer.title.affiliates',
          contents: affiliates
        },
        {
          class: 'e3',
          title: 'footer.title.mew',
          contents: [
            {
              text: 'footer.about',
              to: '/#about-mew'
            },
            {
              text: 'footer.team',
              to: '/team'
            },
            {
              text: 'common.faqs',
              to: '/#faqs'
            },
            {
              text: 'common.mewtopia',
              href: 'https://www.mewtopia.com'
            },
            {
              text: 'common.cstm-support',
              href: 'mailto:support@ilgonwallet.com'
            },
            {
              text: 'common.help-center',
              href: 'https://kb.myetherwallet.com'
            }
          ]
        }
      ],
      links: [
        {
          to: 'https://www.facebook.com/myetherwallet',
          class: 'fa-facebook'
        },
        {
          to: 'https://www.twitter.com/@myetherwallet',
          class: 'fa-twitter'
        },
        {
          to: 'https://www.instagram.com/myetherwallet',
          class: 'fa-instagram'
        },
        {
          to: 'https://www.linkedin.com/company/myetherwallet',
          class: 'fa-linkedin'
        },
        {
          to: 'https://www.github.com/myetherwallet',
          class: 'fa-github'
        },
        {
          to: 'https://www.reddit.com/r/myetherwallet',
          class: 'fa-reddit-alien'
        },
        {
          to: 'https://www.medium.com/@myetherwallet',
          class: 'fa-medium'
        },
        {
          to: 'https://vk.com/public190491855',
          class: 'fa-vk'
        },
        {
          to: 'https://t.me/myetherwallet',
          class: 'fa-telegram'
        }
      ]
    };
  },
  computed: {
    ...mapState('main', ['ethDonationAddress'])
  },
  mounted() {},
  methods: {
    openContent(element) {
      const openButton = document.querySelector('.' + element + ' .open');
      const closeButton = document.querySelector('.' + element + ' .close');
      const content = document.querySelector('.' + element + ' .content-links');
      openButton.style.display = 'none';
      closeButton.style.display = 'block';
      content.classList.remove('mobile-hide');
    },
    closeContent(element) {
      const openButton = document.querySelector('.' + element + ' .open');
      const closeButton = document.querySelector('.' + element + ' .close');
      const content = document.querySelector('.' + element + ' .content-links');
      openButton.style.display = 'block';
      closeButton.style.display = 'none';
      content.classList.add('mobile-hide');
    },
    toggler(ref) {
      const el = this.$refs[ref][0];
      el.classList.toggle('content-open');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'FooterContainer-desktop.scss';
@import 'FooterContainer-tablet.scss';
</style>
