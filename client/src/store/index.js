import Vue from 'vue';
import Vuex from 'vuex';

import dashboards from './modules/dashboards';
import graphs from './modules/graphs';
import dataseries from './modules/dataseries';
import selectors from './modules/selectors';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    dashboards,
    graphs,
    dataseries,
    selectors
  },
  strict: debug
});
