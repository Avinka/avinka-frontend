import graphService from '../../api/graphApi';
// initial state
const state = {
  all: {}
};

// getters
const getters = {
  all: (state) => {
    return state.all;
  },
  getGraphById: (state) => (id) => {
    return state[id];
  }
};

// actions
const actions = {
  async getAllGraphs({commit}) {
    const graphs = await graphService.getAllGraphs();
    commit('setGraphs', graphs);
  },
  async getAllDashboardGraphs({commit}, dashboardId) {
    const graphs = await graphService.getAllDashboardGraphs(dashboardId);
    commit('setGraphs', graphs);
  },
  async deleteGraph({state, commit}, graphId) {
    await graphService.deleteGraph(graphId);
    commit('deleteGraph', graphId);
  },
  async createGraph({commit}, graphId) {
    const newGraph = await graphService.createGraph(graphId);
    commit('createGraph', newGraph);
    return newGraph;
  }
};

// mutations
const mutations = {
  setGraphs(state, graphs) {
    graphs.map((x) => { state.all[x._id] = x });
  },
  deleteGraph(state, graphId) {
    delete state.all[graphId];
  },
  createGraph(state, graph) {
    state.all[graph._id] = graph;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
