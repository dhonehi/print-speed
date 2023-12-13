<template>
  <div class="indication">
    <div class="indication__header">
      <i class="el-icon-odometer"></i>
      <span class="indication__title">{{ title }}</span>
    </div>
    <strong class="indication__value">
      {{ speed.toFixed(2) }}
    </strong>
  </div>
</template>

<script>
export default {
  name: "Indication",
  props: {
    title: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.indication {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  &__header {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  i {
    font-size: 20px;
    width: 20px;
    height: 20px;
  }

  &--low {
    i {
      color: $red
    }
  }

  &--medium {
    i {
      color: $red;
    }
  }

  &--high {
    i {
      color: $green;
    }
  }

  @media screen and (max-width: 600px) {
    gap: 0;

    &__title {
      font-size: 12px;
    }
  }
}
</style>