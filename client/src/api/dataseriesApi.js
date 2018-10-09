import axios from 'axios';
import Vue from 'vue';

// TODO error handling
export default {
  async getAllDataserieses() {
    const result = await axios.get('http://localhost:8080/api/dataseries?full=true');
    Vue.$log.debug(result);
    return result.data;
  },
  async deleteDataseries(dataseries) {
    const result = await axios.delete('http://localhost:8080/api/dataseries/' + dataseries._id);
    Vue.$log.debug(result);
  },
  async createDataseries(dataseries) {
    const result = await axios.post('http://localhost:8080/api/dataseries/', dataseries);
    Vue.$log.debug(result);
    return result.data;
  },
  async addSelectorToDataseries(dataseriesId, selectorId) {
    const result = await axios.post('http://localhost:8080/api/dataseries/' + dataseriesId + '/selector', {_id: selectorId});
    Vue.$log.debug(result);
    return result.data;
  }
};
