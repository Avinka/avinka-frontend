import dashboardService from '../../api/dashboard';
// initial state
const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  async getAllDashboards ({ commit }) {
    const dashboards = await dashboardService.getAllDashboards();
    commit('setDashboards', dashboards);
  }
};

// mutations
const mutations = {
  setDashboards (state, dashboards) {
    state.all = dashboards;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
