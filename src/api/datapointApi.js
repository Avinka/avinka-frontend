import axios from 'axios';
import moment from 'moment';

export default {
  async getDataPointsByDataseriesIds(dataseriesIds, since, until, window, aggInterval) {
    let url = 'http://localhost:8080/api/datapoints/?dataseriesIds=' + dataseriesIds.join(',');
    if (window) {
      // FIXME move&test
      const regex = /(\d+)(\S+)/gi;
      const parsedWindow = regex.exec(window);
      url += '&window=' + window + '&since=' + encodeURIComponent(moment().subtract(parsedWindow[1], parsedWindow[2]).toISOString()) + '&until=' + encodeURIComponent(new Date().toISOString()) + '&agg_interval=' + aggInterval;
    } else if (since && until) {
      url += '&since=' + encodeURIComponent(since.toISOString()) + '&until=' + encodeURIComponent(until.toISOString()) + '&agg_interval=' + aggInterval;
    }
    const x = await axios.get(url);
    return x.data;
  }
};
