import 'babel-polyfill'
import Promise from 'promise-polyfill'
import { Pagination } from 'element-ui'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import PHeader from '@/components/p-header/p-header'
import '@/common/stylus/index.styl'

if (!window.Promise) {
    window.Promise = Promise
}

Vue.config.productionTip = false
Vue.component('p-header', PHeader);
Vue.component(Pagination.name, Pagination);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
