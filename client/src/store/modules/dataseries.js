import dataseriesApi from '../../api/dataseriesApi';

// initial state
const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  async getDataseriesById({commit}, id) {
    const data = await dataseriesApi.getDataseriesById(id);
    commit('setDataseries', data);
    return data;
  },
  async getAllDataseries({commit}) {
    const data = await dataseriesApi.getAllDataseries();
    commit('setDataseries', data);
  },
  async deleteDataseries({state, commit}, dataseries) {
    await dataseriesApi.deleteDataseries(dataseries);
    commit('deleteDataseries', dataseries);
  },
  async createDataseries({commit}, dataseries) {
    const newDataseries = await dataseriesApi.createDataseries(dataseries);
    commit('createDataseries', newDataseries);
  },
  async addSelectorToDataseries({ commit }, {dataseriesId, selectorId}) {
    const selectorDataseriesMapping = await dataseriesApi.addSelectorToDataseries(dataseriesId, selectorId);
    commit('addSelectorToDataseries', selectorDataseriesMapping);
  }
};

// mutations
const mutations = {
  setDataseries(state, newDataseries) {
    state.all.push(newDataseries);
  },
  deleteDataseries(state, newDataseries) {
    state.all = state.all.filter(item => item._id !== newDataseries._id);
  },
  createDataseries(state, newDataseries) {
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
