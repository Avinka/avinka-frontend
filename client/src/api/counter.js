import axios from 'axios';

export default {
  async getCounters() {
    const query = {
      'query': {
        'match': {
          'object.type': {
            'query': 'Bot',
            'operator': 'OR'
          }
        }
      }
    };
    return axios.get({
        url: 'http://localhost:8080/api/counter',
        data: query
      }
    ).data;
  }
};
