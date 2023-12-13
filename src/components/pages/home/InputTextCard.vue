<template>
  <el-card class="input-text-card">
    <div class="input-text-card__input-area">
      <el-input
          placeholder="Please input"
          v-model="text"
          :readonly="endOfTheTest"
          :disabled="loadingQuote"
          @input.native="inputHandler"
          @keydown.native="keydownHandler"
      >
      </el-input>
    </div>

    <el-button v-if="endOfTheTest" @click="$emit('refresh')">Refresh</el-button>
  </el-card>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: "InputTextCard",
  data() {
    return {
      intervalId: null,
      text: '',

      startTimeForSeconds: null,
      startTimeForMinutes: null,

      countOfSymbolsInSeconds: 0,
      countOfSymbolsInMinutes: 0,

      speedOnMinute: 0,
      speedOnSecond: 0
    }
  },
  computed: {
    ...mapState(['endOfTheTest', 'loadingQuote']),

    isStarted: {
      get() {
        return this.$store.state.isStarted
      },
      set(value) {
        this.$store.commit('setIsStarted', value)
      }
    }
  },
  methods: {
    ...mapMutations(['setSpeed']),

    inputHandler() {
      ++this.countOfSymbolsInSeconds
      ++this.countOfSymbolsInMinutes

      if (!this.isStarted) {
        this.isStarted = true
        this.startTimeForSeconds = Date.now()
        this.startTimeForMinutes = Date.now()

        this.intervalId = setInterval(this.updateSpeed, 1000)
      }

      this.$emit('input', this.text)
    },
    keydownHandler(e) {
      if (e.key === 'Backspace') {
        e.preventDefault()
      }
    },
    updateSpeed() {
      if (!this.isStarted) {
        clearInterval(this.intervalId)
        return
      }

      const currentTime = Date.now()
      const timeSpanForSeconds = (currentTime - this.startTimeForSeconds) / 1000
      const timeSpanForMinutes = (currentTime - this.startTimeForMinutes) / 1000

      const speedOnSecond = this.countOfSymbolsInSeconds / timeSpanForSeconds
      const speedOnMinute = this.countOfSymbolsInMinutes / (timeSpanForMinutes / 60)

      this.setSpeed({
        onSecond: speedOnSecond,
        onMinute: speedOnMinute
      })

      this.countOfSymbolsInSeconds = 0
      this.startTimeForSeconds = currentTime

      if (timeSpanForMinutes >= 60) {
        this.countOfSymbolsInMinutes = 0
        this.startTimeForMinutes = currentTime
      }
    },
    clear() {
      this.text = ''
      this.countOfSymbolsInSeconds = 0
      this.countOfSymbolsInMinutes = 0
    }
  },
  watch: {
    endOfTheTest(endOfTheTest) {
      if (!endOfTheTest) {
        this.clear()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.input-text-card {
  ::v-deep .el-card__body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__input-area {
    flex: 1
  }
}
</style>