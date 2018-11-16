import Vue from 'vue';
import Vuex from 'vuex';

import dashboards from './modules/dashboards';
import graphs from './modules/graphs';
import graphStore from './modules/graphStore';
import graphStore2 from './modules/graphStore2';
import dataseries from './modules/dataseries';
import datapointStore from './modules/datapointStore';
import selectors from './modules/selectors';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    dashboards,
    graphs,
    graphStore,
    graphStore2,
    dataseries,
    datapointStore,
    selectors
  },
  strict: debug
});
