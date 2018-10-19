import axios from 'axios';
import Vue from 'vue';

export default {
  async updateGraph(graph) {
    const result = await axios.put('http://localhost:8080/api/graph/' + graph._id, graph);
    return result.data;
  },
  async getAllGraphs() {
    const result = await axios.get('http://localhost:8080/api/graph?full=true');
    Vue.$log.debug(result);
    return result.data;
  },
  async getGraphById(graphId) {
    const result = await axios.get('http://localhost:8080/api/graph/' + graphId);
    Vue.$log.debug(result);
    return result.data;
  },
  // TODO move to dashboard
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
  },
  async addDataseriesToGraph(graphId, dataseriesId) {
    const result = await axios.post('http://localhost:8080/api/graph/' + graphId + '/dataseries', {_id: dataseriesId});
    Vue.$log.debug(result);
    return result.data;
  },
  async removeDataseriesFromGraph(graphId, dataseriesId) {
    const result = await axios.delete('http://localhost:8080/api/graph/' + graphId + '/dataseries/' + dataseriesId);
    Vue.$log.debug(result);
    return result.data;
  },
  async getGraphDataseries(graphId) {
    const result = await axios.get('http://localhost:8080/api/graph/' + graphId + '/dataseries');
    Vue.$log.debug(result);
    return result.data;
  }
};
