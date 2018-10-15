import axios from 'axios';

export default {
  getDataPointsByDataseriesId(dataseriesId) {
    const result = axios.get('http://localhost:8080/api/dataseries/' + dataseriesId + '/datapoint');
    return result.data;
  }
};
