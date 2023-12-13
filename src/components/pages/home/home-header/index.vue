<template>
  <div class="home-header">
    <indication :speed="speed.onSecond" title="Chars per second"></indication>

    <timer></timer>

    <indication :speed="speed.onMinute" title="Chars per minute"></indication>
  </div>
</template>

<script>
import {mapState} from "vuex";

import Indication from "@/components/pages/home/home-header/components/Indication.vue";
import Timer from "@/components/pages/home/home-header/components/Timer.vue";

export default {
  name: "index",
  components: {Timer, Indication},
  data() {
    return {
      currentLanguage: 'en',
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
    ...mapState(['speed'])
  }
}
</script>

<style scoped lang="scss">
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>