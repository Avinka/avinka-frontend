import graphApi from '../../api/graphApi';
import dataseriesApi from '../../api/dataseriesApi';
import selectorApi from '../../api/selectorApi';
import _ from 'lodash';
import Vue from 'vue';

const state = {
  graphs: {},
  counters: {}
};

const findGraphById = (id) => state.graphs[id];

// getters
const getters = {
  all: (state) => {
    return state.graphs;
  },
  allByIds: (state) => (graphIds) => {
    return Object.values(state.graphs).filter((graph) => {
      return graphIds.includes(graph._id);
    });
  },
  getByGraphById: (state) => findGraphById,
  getCountersByDataseriesId: (state) => (id) => {
    return state.counters[id];
  }
};

// actions
const actions = {
  async getAllGraphs({commit}) {
    const graphs = await graphApi.getAllGraphs();
    commit('addGraphs', graphs);
  },
  async getGraphById({commit}, graphId) {
    const graph = await graphApi.getGraphById(graphId);
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
  async deleteDataseries({state, commit}, {dataseriesId}) {
    await dataseriesApi.deleteDataseries(dataseriesId);
  },
  async updateGraphValue({commit}, {graphId, key, value}) {
    const graph = findGraphById(graphId);
    await graphApi.updateGraph(graph);
    commit('updateGraphValue', {graphId, key, value});
  },
  async patchGraph({commit}, graph) {
    await graphApi.patchGraph(graph);
    commit('patchGraph', graph);
  },
  async createGraphDataseries({commit}, {graphId, dataseries = {}}) {
    const newDataseries = await dataseriesApi.createDataseries(dataseries);
    const newGraphDataseriesMapping = await graphApi.addDataseriesToGraph(graphId, newDataseries._id);
    commit('createGraphDataseries', {graphId, newDataseries});
  },
  async removeDataseriesFromGraph({commit}, {graphId, dataseriesId}) {
    await graphApi.removeDataseriesFromGraph(graphId, dataseriesId);
    commit('removeDataseriesFromGraph', {graphId, dataseriesId});
  },
  async addSelectorToDataseries({commit}, {dataseriesId, selector}) {
    const newSelector = await selectorApi.createSelector(selector);
    const selectorDataseriesMapping = await dataseriesApi.addSelectorToDataseries(dataseriesId, newSelector._id);
    commit('addSelectorToDataseries', {dataseriesId, newSelector});
  },
  async deleteAndRemoveSelectorFromDataseries({commit}, {dataseriesId, selectorId}) {
    const selectorDataseriesMapping = await dataseriesApi.removeSelectorFromDataseries(dataseriesId, selectorId);
    const deleted = selectorApi.deleteSelector(selectorId);
    commit('removeSelectorFromDataseries', {dataseriesId, selectorId});
  }
};

const mutations = {
  updateGraphValue(state, {graphId, key, value}) {
    const graph = Vue.set(state.graphs[graphId], key, value);
  },
  addGraphs(state, graphs) {
    _.forEach(graphs, (graph) => {
      Vue.set(state.graphs, graph._id, graph);
    });
  },
  deleteGraph(state, graphId) {
    Vue.delete(state.graphs, graphId);
  },
  replaceOrAddGraph(state, graph) {
    Vue.set(state.graphs, graph._id, graph);
  },
  addGraph(state, graph) {
    Vue.set(state.graphs, graph._id, graph);
  },
  patchGraph(state, graph) {
    _.forOwn(graph, (value, key) => {
      Vue.set(state.graphs[graph._id], key, value);
    });
  },
  createGraphDataseries(state, {graphId, newDataseries}) {
    state.graphs[graphId].dataseries.push(newDataseries);
  },
  setGraphDataseries(state, graphId, dataseries) {
    _.forEach(dataseries, (dataserie) => {
      const index = state.graphs[graphId].dataseries.findIndex(x => x._id === dataserie._id);
      Vue.set(state.graphs[graphId], 'dataseries', state.graphs[graphId].dataseries.filter(x => x._id === dataserie._id));
      state.graphs[graphId].dataseries[index].push(dataserie);
    });
  },
  removeDataseriesFromGraph(state, {graphId, dataseriesId}) {
    const dataseriesIndex = state.graphs[graphId].dataseries.findIndex(x => x._id === dataseriesId);
    state.graphs[graphId].dataseries.splice(dataseriesIndex, 1);
  },
  addSelectorToDataseries(state, {dataseriesId, newSelector}) {
    _.forEach(state.graphs, (graph, graphId) => {
      _.forEach(graph.dataseries, (dataserie) => {
        if (dataserie._id === dataseriesId) {
          dataserie.selectors.push(newSelector);
        }
      });
    });
  },
  removeSelectorFromDataseries(state, {dataseriesId, selectorId}) {
    _.forEach(state.graphs, (graph, graphId) => {
      _.forEach(graph.dataseries, (dataserie) => {
        if (dataserie._id === dataseriesId) {
          const index = dataserie.selectors.findIndex((selector) => selector._id === selectorId);
          if (index !== -1) {
            dataserie.selectors.splice(index, 1);
          }
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
