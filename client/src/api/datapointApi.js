import axios from 'axios';

export default {
  async getDataPointsByDataseriesIds(dataseriesIds, since, until, window, aggInterval) {
    let url = 'http://localhost:8080/api/datapoints/?dataseriesIds=' + dataseriesIds.join(',');
    if (window) {
      url += '&window=' + window + '&until=' + encodeURIComponent(new Date().toISOString()) + '&agg_interval=' + aggInterval;
    } else if (since && until) {
      url += '&since=' + encodeURIComponent(since.toISOString()) + '&until=' + encodeURIComponent(until.toISOString()) + '&agg_interval=' + aggInterval;
    }
    const x = await axios.get(url);
    return x.data;
  }
};
