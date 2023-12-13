<template>
  <el-card class="target-text-card">
    <div slot="header" class="target-text-card__header">
      <span>Input this text</span>
      <span>Author: {{ quoteAuthor }}</span>
    </div>
    <el-skeleton :loading="loadingQuote" animated>
      <template #template>
        <el-skeleton-item variant="caption"></el-skeleton-item>
        <el-skeleton-item variant="caption"></el-skeleton-item>
      </template>

      <p class="target-text-card__text">
          <span
              v-for="(token, i) in quoteTextTokens"
              :key="i"
              class="target-text-card__char"
              :class="{
                'target-text-card__char--current': token.current,
                'target-text-card__char--success': token.success === true,
                'target-text-card__char--error': token.success === false
              }"
          >{{ token.char }}</span>
      </p>
    </el-skeleton>
  </el-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TargetTextCard",
  props: {
    quoteTextTokens: {
      type: Array,
      required: true
    },
    quoteAuthor: {
      type: String
    }
  },
  computed: {
    ...mapState(['loadingQuote'])
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.target-text-card {
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__text {
    text-align: center;
    word-break: break-word;
    font-weight: 500;
    font-size: 20px;
  }

  &__char {
    border-radius: 4px;
    box-sizing: border-box;
    line-height: 20px;

    &--current {
      background-color: $green;
      color: white;
      padding: 2px;
    }

    &--success {
      color: $green;
    }

    &--error {
      color: $red;
    }
  }

  @media screen and (max-width: 600px) {
    &__text {
      font-size: 16px;
    }

    &__header {
      font-size: 12px;
    }
  }
}
</style>