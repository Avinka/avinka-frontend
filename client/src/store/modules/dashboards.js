// initial state
const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  getAllDashboards ({ commit }) {
  }
};

// mutations
const mutations = {
  setDashboards (state, dashboards) {
    state.all = dashboards;
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id);
    product.inventory--;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
