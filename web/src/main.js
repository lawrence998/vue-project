import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import VueResource from 'vue-resource'


import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../../web/node_modules/element-ui/lib/theme-chalk/index.css'
//vue滑块
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
