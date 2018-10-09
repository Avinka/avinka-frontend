import graphService from '../../api/graphApi';
// initial state
const state = {
  all: []
};

// getters
const getters = {
  all: (state) => {
    return state.all;
  }
};

// actions
const actions = {
  async getAllGraphs ({ commit }) {
    const graphs = await graphService.getAllGraphs();
    commit('setGraphs', graphs);
  },
  async getAllDashboardGraphs ({ commit }, dashboardId) {
    const graphs = await graphService.getAllDashboardGraphs(dashboardId);
    commit('setGraphs', graphs);
  },
  async deleteGraph ({ state, commit }, graph) {
    await graphService.deleteGraph(graph);
    commit('deleteGraph', graph);
  },
  async createGraph ({ commit }, graphId) {
    const newGraph = await graphService.createGraph(graphId);
    commit('createGraph', newGraph);
    return newGraph;
  }
};

// mutations
const mutations = {
  setGraphs (state, graphs) {
    state.all = graphs;
  },
  deleteGraph (state, graphId) {
    state.all = state.all.filter(item => item._id !== graphId);
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
