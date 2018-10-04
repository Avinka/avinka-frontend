import Vue from 'vue';
import Vuex from 'vuex';

import dashboards from './modules/dashboards';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    dashboards
  },
  strict: debug
});
