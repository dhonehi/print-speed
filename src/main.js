import Vue from 'vue'
import App from './App.vue'

import plugins from "@/plugins";
import '@/globals'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    ...plugins,
}).$mount('#app')
