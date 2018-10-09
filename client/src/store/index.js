import Vue from 'vue';
import Vuex from 'vuex';

import dashboards from './modules/dashboards';
import graphs from './modules/graphs';
import dataserieses from './modules/dataseries';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    dashboards,
    graphs,
    dataserieses
  },
  strict: debug
});
