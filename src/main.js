import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line
import 'bootstrap-vue/dist/bootstrap-vue.css'; // eslint-disable-line
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'; // eslint-disable-line

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
