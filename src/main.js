import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

import Start from './components/Start'
import Message from './components/Message'
import Questions from './components/Questions'
import Complete from './components/Complete'
import ProgressesBar from './components/ProgressesBar'

Vue.config.productionTip = false
export const eventBus = new Vue()

Vue.component('Start', Start)
Vue.component('Message', Message)
Vue.component('Questions', Questions)
Vue.component('Complete', Complete)
Vue.component('ProgressesBar', ProgressesBar)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')