import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue';
import router from "./router";
import Vuex from 'vuex';
import store from './store/store'

Vue.use( ElementUI, {locale});
Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
