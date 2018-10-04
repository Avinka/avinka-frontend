// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VModal from 'vue-js-modal';
import VueMaterial from 'vue-material';
import VueLogger from 'vuejs-logger';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VModal, { dynamic: true });
Vue.use(VueMaterial);
const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, options);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
