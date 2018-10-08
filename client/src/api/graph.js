import axios from 'axios';
import Vue from 'vue';

// TODO error handling
export default {
  async getAllGraphs() {
    const result = await axios.get('http://localhost:8080/api/graph?full=true');
    Vue.$log.debug(result);
    return result.data;
  },
  async getAllDashboardGraphs(dashboardId) {
    const result = await axios.get('http://localhost:8080/api/dashboard/' + dashboardId + '/graph');
    Vue.$log.debug(result);
    return result.data;
  },
  async deleteGraph(id) {
    const result = await axios.delete('http://localhost:8080/api/graph/' + id);
    Vue.$log.debug(result);
  },
  async createGraph(graph) {
    const result = await axios.post('http://localhost:8080/api/graph/', graph);
    Vue.$log.debug(result);
    return result.data;
  }
};
