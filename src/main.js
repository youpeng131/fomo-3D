import 'babel-polyfill'
import Promise from 'promise-polyfill'
import { Pagination, Message } from 'element-ui'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import PHeader from '@/components/p-header/p-header'
import PFooter from '@/components/p-footer/p-footer'
import '@/common/stylus/index.styl'

if (!window.Promise) {
    window.Promise = Promise
}

Vue.config.productionTip = false
Vue.component('p-header', PHeader);
Vue.component('p-footer', PFooter);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$message = Message;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
