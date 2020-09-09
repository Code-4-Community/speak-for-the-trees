import Vue from 'vue';
import * as Sentry from '@sentry/browser'; // https://docs.sentry.io/platforms/javascript/vue/
import { Vue as VueIntegration } from '@sentry/integrations';
import 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line
import 'bootstrap-vue/dist/bootstrap-vue.css'; // eslint-disable-line
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'; // eslint-disable-line
import App from './App.vue';
import router from './router';
import store from './store';


Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new VueIntegration({ Vue, attachProps: true })],
});

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
