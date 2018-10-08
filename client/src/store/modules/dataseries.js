import dataseriesService from '../../api/dataseries';
// initial state
const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  async getAllDashboards ({ commit }) {
    const graphs = await dataseriesService.getAllDataserieses();
    commit('setDataseries', graphs);
  },
  async deleteDashboard ({ state, commit }, dataseries) {
    await dataseriesService.deleteDataseries(dataseries);
    commit('deleteDataseries', dataseries);
  },
  async createDashboard ({ commit }, dataseries) {
    const newDataseries = await dataseriesService.createDataseries(dataseries);
    commit('createDataseries', newDataseries);
  }
};

// mutations
const mutations = {
  setDataseries (state, newDataseries) {
    state.all = newDataserieses;
  },
  deleteDataseries (state, newDataseries) {
    state.all = state.all.filter(item => item._id !== newDataseries._id);
  },
  createDataseries (state, newDataseries) {
    state.all.push(newDataseries);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
