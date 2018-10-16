import axios from 'axios';

export default {
  async getDataPointsByDataseriesIds(dataseriesIds) {
    const x = await axios.get('http://localhost:8080/api/datapoints/' + dataseriesIds.join(','));
    return x;
  }
}
