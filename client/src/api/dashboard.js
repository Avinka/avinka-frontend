import axios from 'axios';
import Vue from 'vue';

// TODO error handling
export default {
  async getAllDashboards() {
    const result = await axios.get('http://localhost:8080/api/dashboard');
    Vue.$log.debug(result);
    return result.data;
  },
  async getDashboard(id) {
    const result = await axios.get('http://localhost:8080/api/dashboard/' + id);
    Vue.$log.debug(result);
    return result.data;
  },
  async deleteDashboard(dashboard) {
    const result = await axios.delete('http://localhost:8080/api/dashboard/' + dashboard._id);
    Vue.$log.debug(result);
  },
  async createDashboard(dashboard) {
    const result = await axios.post('http://localhost:8080/api/dashboard/', dashboard);
    Vue.$log.debug(result);
    return result.data;
  },
  async addGraphToDashboard(dashboardId, graphId) {
    const result = await axios.post('http://localhost:8080/api/dashboard/' + dashboardId + '/graph', {graphId});
    Vue.$log.debug(result);
    return result.data;
  }
};
