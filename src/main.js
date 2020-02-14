import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(vueSwiper)
//安装toast插件
Vue.use(toast)
Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//解决移动端延迟300ms
FastClick.attach(document.body)
//图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/home/load.jpg')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
