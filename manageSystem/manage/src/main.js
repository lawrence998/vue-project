import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Spinner from './components/spinner/spinner'

Vue.component('global-spinner',Spinner)
    

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
