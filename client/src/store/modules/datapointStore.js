import datapointApi from '../../api/datapointApi';
import _ from 'lodash';
import Vue from 'vue';

const state = {
  datapoints: {}
};

// getters
const getters = {
  getByDataseriesIds: (state) => (ids) => {
    const datapointSeries = [];
    _.forEach(ids, (id) => {
      if (state.datapoints[id]) {
        datapointSeries.push(state.datapoints[id]);
      }
    });
    return datapointSeries;
  }
};

// actions
const actions = {
  async getDataPointsByDataseriesIds({commit}, {dataseriesIds, since, until, window, aggInterval}) {
    const datapoints = await datapointApi.getDataPointsByDataseriesIds(dataseriesIds, since, until, window, aggInterval);
    commit('addDatapoints', datapoints);
  }
};

const mutations = {
  addDatapoints(state, datapoints) {
    _.forEach(datapoints, (newDatapointObj, id) => {
      Vue.set(state.datapoints, id, newDatapointObj);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
