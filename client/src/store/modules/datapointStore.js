import graphApi from "../../api/graphApi";
import dataseriesApi from "../../api/dataseriesApi";
import selectorApi from "../../api/selectorApi";

const state = {
  datapoints: []
};

// getters
const getters = {
  getByDataseriesIds: (state) => (ids) => {
    return state.datapoints.find((datapoint) => datapoint.data.find);
  }
};

// actions
const actions = {
  async getAllGraphs({commit}) {
    const graphs = await graphApi.getAllGraphs();
    commit('addGraphs', graphs);
  }

};

const mutations = {
  addGraphs(state, graphs) {
    state.graphs = graphs;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
