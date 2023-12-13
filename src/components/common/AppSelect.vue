<template>
  <div class="app-select">
    <span>{{ placeholder }}</span>
    <el-select
        v-model="currentValue"
        :size="size"
        :disabled="disabled"
        @change="$emit('change', $event)"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "AppSelect",
  props: {
    value: {
      required: true
    },
    options: {
      required: true
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    size: {
      type: String
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.app-select {
  display: flex;
  flex-direction: column;
  width: 100px;
  font-size: 12px;

  span {
    opacity: 0.9;
  }
}
</style>