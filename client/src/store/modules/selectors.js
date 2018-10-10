import selectorService from '../../api/selector';
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
  async getAllSelectors ({ commit }) {
    const graphs = await selectorService.getAllSelectors();
    commit('setSelectors', graphs);
  },
  async deleteSelector ({ state, commit }, selector) {
    await selectorService.deleteSelector(selector);
    commit('deleteSelector', selector);
  },
  async createSelector ({ commit }, selector) {
    const newSelector = await selectorService.createSelector(selector);
    commit('createSelector', newSelector);
    return newSelector;
  }
};

// mutations
const mutations = {
  setSelectors (state, graphs) {
    state.all = graphs;
  },
  deleteSelector (state, graphId) {
    state.all = state.all.filter(item => item._id !== graphId);
  },
  createSelector (state, graph) {
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
