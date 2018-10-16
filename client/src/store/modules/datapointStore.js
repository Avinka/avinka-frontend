import datapointApi from '../../api/datapointApi';

const state = {
  datapoints: []
};

// getters
const getters = {
  getByDataseriesIds: (state) => (ids) => {
    return state.datapoints.filter((datapoint) => ids.includes(datapoint.dataseriesId));
  }
};

// actions
const actions = {
  async getDataPointsByDataseriesIds({commit}, dataseriesIds) {
    const datapoints = await datapointApi.getDataPointsByDataseriesIds(dataseriesIds);
    commit('addDatapoints', datapoints);
  }
};

const mutations = {
  addDatapoints(state, datapoints) {
    state.datapoints = Object.values(datapoints);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
