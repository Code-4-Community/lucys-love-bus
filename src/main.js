// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: (h) => h(App),
});
