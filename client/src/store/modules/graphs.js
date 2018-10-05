import graphService from '../../api/graph';
// initial state
const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  async getAllGraphs ({ commit }) {
    const graphs = await graphService.getAllGraphs();
    commit('setGraphs', graphs);
  },
  async deleteGraph ({ state, commit }, graph) {
    await graphService.deleteGraph(graph);
    commit('deleteGraph', graph);
  },
  async createGraph ({ commit }, dashboard) {
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
