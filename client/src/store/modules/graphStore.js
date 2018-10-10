import graphService from '../../api/graphApi';
import dataseriesApi from '../../api/dataseriesApi';
import selectorApi from '../../api/selectorApi';

const state = {
  graphs: {},
  datapoints: {}
};

// getters
const getters = {
  all: (state) => {
    return state.graphs.values;
  },
  getByGraphById: (state) => (id) => {
    return state.graph[id];
  },
  getDataPointsByDataseriesId: (state) => (id) => {
    return state.datapoints[id];
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
  async createGraphDataseries ({ commit }, dataseries) {
    const newDataseries = await dataseriesApi.createDataseries(dataseries);
    // TODO create dataseries mapping
    commit('createDataseries', newDataseries);
  },
  async addSelectorToDataseries({ commit }, {dataseriesId, selector}) {
    // TODO create selector
    const newSelector = selectorApi.createSelector(selector);
    const selectorDataseriesMapping = await dataseriesApi.addSelectorToDataseries(dataseriesId, newSelector._id);
    commit('addSelectorToDataseries', selectorDataseriesMapping);
  },
  async removeSelectorFromDataseries({ commit }, {dataseriesId, selectorId}) {
    // TODO delete selector
    const selectorDataseriesMapping = await dataseriesApi.addSelectorToDataseries(dataseriesId, selectorId);
    commit('addSelectorToDataseries', selectorDataseriesMapping);
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
