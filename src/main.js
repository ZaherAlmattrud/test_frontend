import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

// Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  
  vuetify,

   router,



  render: h => h(App)
}).$mount('#app')
