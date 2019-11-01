import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import AdaptivePlugin from './plugins/AdaptivePlugin'

Vue.use(AdaptivePlugin);

Vue.config.productionTip = false

window.Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
