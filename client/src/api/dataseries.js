import axios from 'axios';
import Vue from 'vue';

// TODO error handling
export default {
  async getAllGraphs() {
    const result = await axios.get('http://localhost:8080/api/graph');
    Vue.$log.debug(result);
    return result.data;
  },
  async deleteGraph(dashboard) {
    const result = await axios.delete('http://localhost:8080/api/graph/' + dashboard._id);
    Vue.$log.debug(result);
  },
  async createGraph(dashboard) {
    const result = await axios.post('http://localhost:8080/api/graph/', dashboard);
    Vue.$log.debug(result);
    return result.data;
  }
};
