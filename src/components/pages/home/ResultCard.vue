<template>
  <el-card class="result-card">
    <div class="result-card__column">
      <div class="result-card__item">
        <div>Avg of chars per second</div>
        <strong> {{ averageCharsPerSecond.toFixed(2) }}</strong>
      </div>
      <div class="result-card__item">
        <div>Avg of chars per minute</div>
        <strong> {{ averageCharsPerMinute.toFixed(2) }}</strong>
      </div>
    </div>

    <div class="result-card__column result-card__column--center">
      <div class="result-card__item">
        <el-progress
            type="circle"
            :percentage="accuracy"
            :color="accuracyColor"
        >
        </el-progress>
        <span>Accuracy</span>
      </div>
    </div>

    <div class="result-card__column">
      <div class="result-card__item">
        <div>Correct chars</div>
        <strong> {{ countOfSuccessAndErrorChars.countOfSuccess }}</strong>
      </div>
      <div class="result-card__item">
        <div>Invalid chars</div>
        <strong> {{ countOfSuccessAndErrorChars.countOfError }}</strong>
      </div>
    </div>
  </el-card>
</template>

<script>
import {mapState} from "vuex";
import average from "@/utils/average";

export default {
  name: "ResultCard",
  props: {
    quoteTextTokens: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['statistics']),

    averageCharsPerSecond() {
      return average(this.statistics.charsPerSecond)
    },

    averageCharsPerMinute() {
      return average(this.statistics.charsPerMinute)
    },

    countOfSuccessAndErrorChars() {
      let countOfSuccess = 0
      let countOfError = 0

      this.quoteTextTokens.forEach(token => {
        if (token.success !== undefined) {
          if (token.success) {
            countOfSuccess += 1
          } else {
            countOfError += 1
          }
        }
      })

      return {
        countOfSuccess,
        countOfError
      }
    },

    accuracy() {
      const coef = this.quoteTextTokens.length / this.countOfSuccessAndErrorChars.countOfSuccess
      return Math.floor(100 / coef)
    },

    accuracyColor() {
      if (this.accuracy <= 50) {
        return null
      } else {
        return '#2ab574'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.result-card {
  ::v-deep .el-card__body {
    display: flex;
  }

  &__column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    &--center {
      justify-content: center;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    ::v-deep .el-progress-circle {
      width: 100px !important;
      height: 100px !important;
    }
  }

  @media screen and (max-width: 700px) {
    ::v-deep .el-card__body {
      flex-direction: column;
    }

    &__column {
      flex-direction: row;
    }
  }

  @media screen and (max-width: 600px) {
    ::v-deep .el-card__body {
      gap: 10px;
    }

    &__item {
      font-size: 12px;
    }

    &__column {
      justify-content: space-around;
    }

    &__column:nth-child(2)  {
      order: -1;
    }
  }
}
</style>