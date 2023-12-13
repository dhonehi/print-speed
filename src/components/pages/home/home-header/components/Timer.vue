<template>
  <div class="timer">
    <el-progress
        :show-text="false"
        type="circle"
        :percentage="progress"
    >
    </el-progress>

    <div class="timer__content">
      <span class="timer__time">{{ timerData.minutes }}</span>
      <span>:</span>
      <span class="timer__time">{{ timerData.seconds }}</span>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: "Timer",
  inject: ['stopTest'],
  data() {
    return {
      intervalId: null,
      startTime: null,
    }
  },
  computed: {
    ...mapState(['isStarted']),

    timerDuration: {
      get() {
        return this.$store.state.timerDuration
      },
      set(value) {
        this.$store.commit('setTimerDuration', value)
      }
    },

    timerData() {
      let seconds = Math.floor((this.timerDuration / 1000) % 60),
          minutes = Math.floor((this.timerDuration / (1000 * 60)) % 60)

      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return {
        minutes,
        seconds
      }
    },

    progress() {
      const coef = 60000 / this.timerDuration
      return 100 / coef
    }
  },
  methods: {
    ...mapMutations(['setEndOfTheTest', 'setIsStarted']),

    start() {
      this.startTime = Date.now()

      this.intervalId = setInterval(() => {
        this.timerDuration -= 1000


        if (this.timerDuration === 0) {
          clearInterval(this.intervalId)
          this.stopTest()
        }
      }, 1000)
    },
    stop() {
      clearInterval(this.intervalId)
    }
  },
  watch: {
    isStarted(value) {
      if (value) {
        this.start()
      } else {
        this.stop()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 20px;
  font-weight: 600;

  &__time {
    display: inline-block;
    width: 25px;
    text-align: center;
  }

  &__content {
    position: absolute;
  }

  ::v-deep .el-progress-circle {
    width: 70px !important;
    height: 70px !important;
  }
}
</style>