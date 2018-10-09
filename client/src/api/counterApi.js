import axios from 'axios';

export default {
  getCounters() {
    const query = {
      'match': {
        'object.type': {
          'query': 'Bot',
          'operator': 'OR'
        }
      }
    };
    const result = axios.get('http://localhost:8080/api/counter?query=' + encodeURIComponent(JSON.stringify(query)));
    return result;
  }
};
