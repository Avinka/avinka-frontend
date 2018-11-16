import axios from 'axios';
import Vue from 'vue';

// TODO error handling
export default {
  async getAllSelectors() {
    const result = await axios.get('http://localhost:8080/api/selectors');
    Vue.$log.debug(result);
    return result.data;
  },
  async deleteSelector(id) {
    const result = await axios.delete('http://localhost:8080/api/selector/' + id);
    Vue.$log.debug(result);
  },
  async createSelector(selector) {
    const result = await axios.post('http://localhost:8080/api/selector/', selector);
    Vue.$log.debug(result);
    return result.data;
  }
};
