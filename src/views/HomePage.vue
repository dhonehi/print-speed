<template>
  <div class="home-page">
    <div class="home-page__content">
      <home-header @change-lang="loadQuote"></home-header>

      <transition name="fade">
        <result-card
            v-if="endOfTheTest"
            class="card"
            :quote-text-tokens="quoteTextTokens"
        >
        </result-card>
      </transition>

      <target-text-card
          class="card"
          :quote-text-tokens="quoteTextTokens"
          :quote-author="quoteAuthor"
      >
      </target-text-card>

      <input-text-card
          class="card"
          @input="checkPosition"
          @refresh="refresh"
      >
      </input-text-card>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

import HomeHeader from "@/components/pages/home/home-header/index.vue";
import TargetTextCard from "@/components/pages/home/TargetTextCard.vue";
import InputTextCard from "@/components/pages/home/InputTextCard.vue";
import ResultCard from "@/components/pages/home/ResultCard.vue";

export default {
  name: 'IndexPage',
  components: {ResultCard, HomeHeader, InputTextCard, TargetTextCard},
  provide() {
    return {
      stopTest: this.stopTest
    }
  },
  data() {
    return {
      quote: null,
      quoteTextTokens: [],

      charIndex: 0,

      count: 0
    }
  },
  computed: {
    ...mapState(['quoteTextLang']),

    loadingQuote: {
      get() {
        return this.$store.state.loadingQuote
      },
      set(value) {
        this.$store.commit('setLoadingQuote', value)
      }
    },

    isStarted: {
      get() {
        return this.$store.state.isStarted
      },
      set(value) {
        this.$store.commit('setIsStarted', value)
      }
    },

    endOfTheTest: {
      get() {
        return this.$store.state.endOfTheTest
      },
      set(value) {
        this.$store.commit('setEndOfTheTest', value)
      }
    },

    quoteAuthor() {
      return this.quote?.quoteAuthor || ''
    },
    quoteText() {
      return this.quote?.quoteText || ''
    }
  },
  created() {
    this.loadQuote()
  },
  methods: {
    ...mapMutations(['refreshTestData']),

    async loadQuote() {
      this.loadingQuote = true

      try {
        this.quote = await this.$api.forismatic.getQuote(this.quoteTextLang)

        // Иногда forismatic возвращает невалидный json, поэтому запрос кидается еще раз
        if (typeof this.quote === "string") {
          setTimeout(this.loadQuote)
          return
        }

        this.createQuoteTokens()
        this.checkResult(true)
      } catch (e) {
        console.log(e)
      } finally {
        this.loadingQuote = false
      }
    },
    createQuoteTokens() {
      this.quoteTextTokens = this.quoteText
          .trim()
          .split('')
          .map((char) => ({
            char,
            current: false,
            success: undefined,
          }))
    },
    refresh() {
      this.endOfTheTest = false
      this.charIndex = 0
      this.refreshTestData()
      this.loadQuote()
    },
    stopTest() {
      this.isStarted = false
      this.endOfTheTest = true
    },
    checkPosition(text) {
      if (this.charIndex === this.quoteTextTokens.length - 1) {
        this.stopTest()
      }

      this.checkResult(false, text)
    },
    checkResult(isStart, text) {
      if (isStart) {
        this.quoteTextTokens[this.charIndex].current = true
      } else {
        const isValid = this.quoteTextTokens[this.charIndex].char === text[this.charIndex]

        this.quoteTextTokens[this.charIndex].current = false
        this.quoteTextTokens[this.charIndex].success = isValid

        if (this.isStarted) {
          this.quoteTextTokens[++this.charIndex].current = true
        }
      }
    }
  },
  watch: {
    quoteTextLang() {
      if (this.endOfTheTest) {
        this.refresh()
      } else {
        this.loadQuote()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 50%;
  }

  @media screen and (max-width: 1200px) {
    &__content {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
    }
  }
}

.card {
  margin-top: 20px;
  width: 100%;
}
</style>