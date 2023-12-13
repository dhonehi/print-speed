<template>
  <app-select
      v-model="quoteTextLang"
      :options="languages"
      :disabled="isStarted || loadingQuote"
      placeholder="Quote lang"
      size="mini"
  >
  </app-select>
</template>

<script>
import {mapState} from "vuex";

import AppSelect from "@/components/common/AppSelect.vue";

export default {
  name: "QuoteLangSelect",
  components: {AppSelect},
  data() {
    return {
      languages: [
        {
          label: 'EN',
          value: 'en'
        },
        {
          label: 'RU',
          value: 'ru'
        }
      ],
    }
  },
  computed: {
    ...mapState(['isStarted', 'loadingQuote']),

    quoteTextLang: {
      get() {
        return this.$store.state.quoteTextLang
      },
      set(value) {
        this.$store.commit('setQuoteTextLang', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>