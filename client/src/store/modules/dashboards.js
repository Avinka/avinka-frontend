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
  },
  async deleteDashboard ({ state, commit }, dashboard) {
    await dashboardService.deleteDashboard(dashboard);
    commit('deleteDashboard', dashboard);
  },
  async createDashboard ({ commit }, dashboard) {
    const newDashboard = await dashboardService.createDashboard(dashboard);
    commit('createDashboard', newDashboard);
  }
};

// mutations
const mutations = {
  setDashboards (state, dashboards) {
    state.all = dashboards;
  },
  deleteDashboard (state, dashboard) {
    state.all = state.all.filter(item => item._id !== dashboard._id);
  },
  createDashboard (state, dashboard) {
    state.all.push(dashboard);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
