import axios from 'axios';

export default {
  async getCounters() {
    const query = {
      'match': {
        'object.type': {
          'query': 'Bot',
          'operator': 'OR'
        }
      }
    };
    return axios.get('http://localhost:8080/api/counter?query=' + encodeURIComponent(JSON.stringify(query))).data;
  }
};
