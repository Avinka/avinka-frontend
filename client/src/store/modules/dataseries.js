import graphService from '../../api/graph';
import Vue from 'vue';
// initial state
const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  async getAllDashboards ({ commit }) {
    const graphs = await graphService.getAllDashboards();
    commit('setGraphs', graphs);
  },
  async deleteDashboard ({ state, commit }, dashboard) {
    await graphService.deleteDashboard(dashboard);
    commit('deleteGraph', dashboard);
  },
  async createDashboard ({ commit }, dashboard) {
    const newGraph = await graphService.createGraph(dashboard);
    commit('createGraph', newGraph);
  }
};

// mutations
const mutations = {
  setGraphs (state, graphs) {
    state.all = graphs;
  },
  deleteGraph (state, graph) {
    state.all = state.all.filter(item => item._id !== graph._id);
  },
  createGraph (state, graph) {
    state.all.push(graph);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
