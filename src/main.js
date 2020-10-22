import Vue from 'vue';
import * as Sentry from '@sentry/browser'; // https://docs.sentry.io/platforms/javascript/vue/
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line
import 'bootstrap-vue/dist/bootstrap-vue.css'; // eslint-disable-line
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'; // eslint-disable-line
import App from './App.vue';
import router from './router';
import store from './store';


Sentry.init({
  dsn: 'https://fa24905cafbf450193ab19955a6c2a24@o433473.ingest.sentry.io/5479191',
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
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
