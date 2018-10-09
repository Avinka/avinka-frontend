import dashboardService from '../../api/dashboardApi';
// initial state
const state = {
  all: []
};

// getters
const getters = {
  byId: (state) => (id) => {
    return state.all.find(dashboard => dashboard._id === id) || {name: 'loading', description: 'loading'};
  }
};

// actions
const actions = {
  async getAllDashboards ({ commit }) {
    const dashboards = await dashboardService.getAllDashboards();
    commit('setDashboards', dashboards);
  },
  async getDashboard ({ commit }, id) {
    const dashboard = await dashboardService.getDashboard(id);
    commit('setDashboard', dashboard);
  },
  async deleteDashboard ({ state, commit }, dashboard) {
    await dashboardService.deleteDashboard(dashboard);
    commit('deleteDashboard', dashboard);
  },
  async createDashboard ({ commit }, dashboard) {
    const newDashboard = await dashboardService.createDashboard(dashboard);
    commit('createDashboard', newDashboard);
  },
  async addGraphToDashboard({ commit }, {dashboardId, graphId}) {
    const graphDashboardMapping = await dashboardService.addGraphToDashboard(dashboardId, graphId);
    commit('createGraphDashboardMapping', graphDashboardMapping);
  }
};

// mutations
const mutations = {
  setDashboards (state, dashboards) {
    state.all = dashboards;
  },
  setDashboard (state, dashboard) {
    state.all = state.all.filter(item => item._id !== dashboard._id);
    state.all.push(dashboard);
  },
  deleteDashboard (state, dashboard) {
    state.all = state.all.filter(item => item._id !== dashboard._id);
  },
  createDashboard (state, dashboard) {
    state.all.push(dashboard);
  },
  createGraphDashboardMapping(state, graphDashboardMapping) {
    // TODO fill with logic
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
