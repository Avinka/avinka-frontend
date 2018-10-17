import graphApi from '../../api/graphApi';
import dataseriesApi from '../../api/dataseriesApi';
import selectorApi from '../../api/selectorApi';
import _ from 'lodash';

const state = {
  graphs: [],
  counters: []
};

const findGraphById = (id) => state.graphs.find((graph) => graph._id === id);

// getters
const getters = {
  all: (state) => {
    return state.graphs;
  },
  allByIds: (state) => (graphIds) => {
    return state.graphs.filter((graph) => {
      return graphIds.includes(graph._id)
    });
  },
  getByGraphById: (state) => findGraphById,
  getCountersByDataseriesId: (state) => (id) => {
    return state.counters.find((counter) => counter._id === id);
  }
};

// actions
const actions = {
  async getAllGraphs({commit}) {
    const graphs = await graphApi.getAllGraphs();
    commit('addGraphs', graphs);
  },
  async getGraphById({commit}, graphId) {
    const graph = await graphApi.getGraphById();
    commit('addGraph', graph);
  },
  async getAllDashboardGraphs({commit}, dashboardId) {
    const graphs = await graphApi.getAllDashboardGraphs(dashboardId);
    commit('addGraphs', graphs);
  },
  async deleteGraph({state, commit}, graphId) {
    const deleteResult = await graphApi.deleteGraph(graphId);
    commit('deleteGraph', graphId);
    return deleteResult;
  },
  async createGraph({commit}, graphId) {
    const newGraph = await graphApi.createGraph(graphId);
    commit('addGraph', newGraph);
    return newGraph;
  },
  async deleteGraphDataseries({state, commit}, dataseriesId) {
    await dataseriesApi.deleteDataseries(dataseriesId);
    // TODO delete dataseries mapping
    commit('deleteDataseries', dataseriesId);
  },
  async updateGraphValue({commit}, {graphId, key, value}) {
    const graph = findGraphById(graphId);
    await graphApi.updateGraph(graph);
    commit('updateGraphValue', {graphId, key, value});
  },
  async createGraphDataseries({commit}, {graphId, dataseries}) {
    const newDataseries = await dataseriesApi.createDataseries(dataseries);
    commit('createGraphDataseries', {graphId, newDataseries});
  },
  async addSelectorToDataseries({commit}, {dataseriesId, selector}) {
    const newSelector = await selectorApi.createSelector(selector);
    const selectorDataseriesMapping = await dataseriesApi.addSelectorToDataseries(dataseriesId, newSelector._id);
    commit('addSelectorToDataseries', {dataseriesId, newSelector});
  },
  async removeSelectorFromDataseries({commit}, {dataseriesId, selectorId}) {
    const selectorDataseriesMapping = await dataseriesApi.removeSelectorFromDataseries(dataseriesId, selectorId);
    const deleted = selectorApi.deleteSelector(selectorId);
    commit('addSelectorToDataseries', selectorDataseriesMapping);
  }
};

const mutations = {
  updateGraphValue(state, {graphId, key, value}) {
    console.log(graphId + ' ' + key + ' ' + value);
    const graph = state.graphs.find(x => x._id === graphId);
    graph[key] = value;
  },
  addGraphs(state, graphs) {
    state.graphs = graphs;
  },
  deleteGraph(state, graphId) {
    const start = state.graphs.findIndex((graph) => {
      return graph._id === graphId;
    });
    state.graphs.splice(
      start, 1
    );
  },
  replaceOrAddGraph(state, graph) {
    const existingGraphIndex = state.graphs.findIndex(x => x._id === graph._id);
    if (existingGraphIndex === -1) {
      state.graphs.push(graph);
    } else {
      state.graphs[existingGraphIndex] = graph;
    }
  },
  addGraph(state, graph) {
    state.graphs.push(graph);
  },
  setGraphDataseries(state, graphid, dataseries) {
    const graph = state.graphs.find(x => x._id === graphid);
    _.forEach(dataseries, (dataserie) => {
      const index = graph.dataseries.findIndex(x => x._id === dataserie._id);
      graph.dataseries[index] = dataserie;
    });
  },
  addSelectorToDataseries(state, {dataseriesId, newSelector}) {
    _.forEach(state.graphs, (graph) => {
      _.forEach(graph.dataseries, (dataserie) => {
        if (dataserie._id === dataseriesId) {
          dataserie.selectors.push(newSelector);
        }
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
