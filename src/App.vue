<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";

export default {
  name: 'App',
  components: {AppHeader},
}
</script>

<style>
#app {
}
</style>
