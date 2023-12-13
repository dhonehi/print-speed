<template>
  <header class="app-header">
    <span class="app-header__description">
      The printing speed test. To start, tap enter the text that is displayed on the screen!
    </span>
    <quote-lang-select class="app-header__select"></quote-lang-select>
  </header>
</template>

<script>
import QuoteLangSelect from "@/components/common/QuoteLangSelect.vue";

export default {
  name: "AppHeader",
  components: {QuoteLangSelect}
}
</script>

<style scoped lang="scss">
.app-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding-left: 10px;
  padding-right: 10px;

  &__description {
    opacity: 0.9;
    font-size: 16px;
    margin: 0 auto;
  }

  &__select {
    position: absolute;
    right: 10px;
  }

  @media screen and (max-width: 850px) {
    &__description {
      margin-left: 0;
      margin-right: auto;
      font-size: 14px;
      max-width: 300px;
    }
  }

  @media screen and (max-width: 600px) {
    &__description {
      max-width: 200px;
      font-size: 12px;
    }
  }
}
</style>