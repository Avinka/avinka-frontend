import graphService from '../../api/graphApi';

const state = {
  graphs: {},
  counters: {}
};

// getters
const getters = {
  all: (state) => {
    return state.graphs.values;
  },
  getByGraphById: (state) => (id) => {
    return state.graph[id];
  },
  getCountersByDataseriesId: (state) => (id) => {
    return state.counter[id];
  }
}
// actions
const actions = {
  async getAllGraphs({commit}) {
    const graphs = await graphService.getAllGraphs();
    commit('addGraphs', graphs);
  },
  async getAllDashboardGraphs({commit}, dashboardId) {
    const graphs = await graphService.getAllDashboardGraphs(dashboardId);
    commit('addGraphs', graphs);
  },
  async deleteGraph({state, commit}, graphId) {
    await graphService.deleteGraph(graphId);
    commit('deleteGraph', graphId);
  },
  async createGraph({commit}, graphId) {
    const newGraph = await graphService.createGraph(graphId);
    commit('addGraph', newGraph);
    return newGraph;
  },
  async addDataseries({commit}, graphId, dataseries) {

  },
  async deleteDataseries({commit}, graphId, dataseries) {

  }
};

const mutations = {
  addGraphs(state, graphs) {
    graphs.map((x) => { state.graphs[x._id] = x });
  },
  deleteGraph(state, graphId) {
    delete state.graphs[graphId];
  },
  addGraph(state, graph) {
    state.graphs[graph._id] = graph;
  }
};
