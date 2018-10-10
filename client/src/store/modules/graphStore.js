import graphService from '../../api/graphApi';
import dataseriesApi from '../../api/dataseriesApi';
import selectorApi from '../../api/selectorApi';

const state = {
  graphs: [],
  counters: []
};

// getters
const getters = {
  all: (state) => {
    return state.graphs;
  },
  getByGraphById: (state) => (id) => {
    return state.graph.find((graph) => graph._id === id);
  },
  getCountersByDataseriesId: (state) => (id) => {
    return state.counters.find((counter) => counter._id === id);
  }
};

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
  async getGraphDataseries ({ commit }, graphId) {
    const data = await dataseriesApi.getGraphDataseries(graphId);
    commit('setGraphDataseries', data);
  },
  async deleteGraphDataseries ({ state, commit }, dataseriesId) {
    await dataseriesApi.deleteDataseries(dataseriesId);
    // TODO delete dataseries mapping
    commit('deleteDataseries', dataseriesId);
  },
  async createGraphDataseries ({ commit }, {graphId, dataseries}) {
    const newDataseries = await dataseriesApi.createDataseries(dataseries);
    const newGraphDataseriesMapping = await graphService.addDataseriesToGraph(graphId, dataseries);
    commit('createGraphDataseries', {graphId, newDataseries});
  },
  async addSelectorToDataseries({ commit }, {dataseriesId, selector}) {
    const newSelector = selectorApi.createSelector(selector);
    const selectorDataseriesMapping = await dataseriesApi.addSelectorToDataseries(dataseriesId, newSelector._id);
    commit('addSelectorToDataseries', {dataseriesId, newSelector});
  },
  async removeSelectorFromDataseries({ commit }, {dataseriesId, selectorId}) {
    const selectorDataseriesMapping = await dataseriesApi.removeSelectorFromDataseries(dataseriesId, selectorId);
    const deleted = selectorApi.deleteSelector(selectorId);
    commit('addSelectorToDataseries', selectorDataseriesMapping);
  }
};

const mutations = {
  addGraphs(state, graphs) {
    state.graphs = graphs;
  },
  deleteGraph(state, graphId) {
    state.graphs.splice(state.graph.find((graph) => graph._id === graphId));
  },
  addGraph(state, graph) {
    state.graphs.push(graph);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
