<template>
  <div class='echarts'>
    <h2><router-link to="/">Go Back</router-link></h2>
    <button id="show-modal" @click="showModal()">Show Modal</button>
    <p><code>noOfItems</code>: {{ noOfItems }}</p>

    <IEcharts
      :option='option'
      :resizable="true"
    />
    <modals-container
      v-on:evt_noOfItems="_onNoOfItems"
      v-on:evt_divident="_onDivident"
    />
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/lite.js';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import VModal from 'vue-js-modal';
import ModalOverlayComp from '@/components/ModalOverlayComp';

const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  // this is proxied to elasticsearch
  hosts: [window.location.protocol + '//' + window.location.host + '/ES']
});

function checkStatus (client) {
  client.ping({
    requestTimeout: 5000
  }, (error) => {
    // at this point, eastic search is down, please check your Elasticsearch service
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('Everything is ok');
    }
  });
}

function loadContent (scope, client, xName, yName) {
  const body = {
    size: scope.$data.noOfItems,
    query: {
      match_all: {}
    },
    aggs: {
      // TODO andi: find out how this works
      // - https://gist.github.com/jpountz/cebb8452648c36099cee
      // - https://discuss.elastic.co/t/display-concurrency-in-data-on-kibana/26006/2
      // my_histo: {
      //   date_histogram: {
      //     script: "start = doc['start'].value; duration = doc['last_updated'].value * 1000; l = []; for (long i = 0; i < duration; i += interval) { l.add(start + i); }; return l;",
      //     params: {
      //       interval: 3600
      //     },
      //     interval: 'hour'
      //   }
      // }

      // this looks like:
      // ```
      // "aggregations": {
      //   "update_stats": {
      //     "count": 20097,
      //     "min": 1.528652066E+12,
      //     "max": 1.534153994E+12,
      //     "avg": 1531422662273.3245,
      //     "sum": 3.0777001243707E+16
      //   }
      // }
      // ```
      // update_stats: { stats: { field: 'last_updated' } }
    }
  };

  // assign the `y-property` name to collect stats to `<y-property>_stats`
  // TODO andi: make a second graph out of it, containing lines
  const _ass = {};
  _ass[yName + '_stats'] = { stats: { field: yName } };
  Object.assign(body['aggs'], _ass);

  client.search({index: 'actor', body})
    .then(results => {
      scope.$data.option.series[0].data = results.hits.hits.map(obj => [
        (new Date(parseInt(obj._source[xName]) * 1000)) / scope.$data.divident,
        parseInt(obj._source[yName])
      ]);
      console.log('new content loaded');
    })
    .catch(err => {
      console.log(err);
    });
}

const _data = {
  noOfItems: 5000,
  divident: 1,
  option: {
    title: {
      text: '大规模散点图'
    },
    tooltip: {
      trigger: 'axis',
      showDelay: 0,
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      },
      zlevel: 1
    },
    legend: {
      data: ['sin', 'cos']
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataZoom: {show: true},
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    xAxis: [
      {
        type: 'value',
        scale: true
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true
      }
    ],
    series: [
      {
        name: 'ES',
        type: 'scatter',
        large: true,
        symbolSize: 3,
        data: []
      }
    ]
  }
};

var _loadContentId = null;
const xAxisProperty = 'last_updated';
const yAxisProperty = 'age';

function loadWithDelay() {
  // avoid calling the backend once for the removed char and the added char
  if (!_loadContentId) {
    _loadContentId = window.setTimeout(() => {
      loadContent(this, client, xAxisProperty, yAxisProperty);
      _loadContentId = null;
    }, 200);
  }
}

export default {
  name: 'Demo06',
  components: {
    IEcharts,
    VModal
  },
  data () {
    return _data;
  },
  methods: {
    showModal() {
      // sweet, load our component in the managed overlay here
      this.$modal.show(ModalOverlayComp,
      this.$data,
      {
        draggable: true,
        resizable: true,
        height: 200
      });
    },
    _onNoOfItems(numOf) {
      this.$data.noOfItems = numOf;
    },
    _onDivident(numOf) {
      this.$data.divident = numOf;
    }

      // beforeMount () {
    //   const that = this
    // },
    // beforeDestroy () {
    //   const that = this
    // }
  },

  /**
   * this happens each time we render the component (e.g. enter the route)
   */
  watch: {
    // via: https://stackoverflow.com/a/51176290/2741111
    noOfItems: loadWithDelay,
    divident: loadWithDelay
  },
  mounted () {
    checkStatus(client);
    loadContent(this, client, xAxisProperty, yAxisProperty);
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .echarts {
    width: 80%;
    height: 800px;
    margin: 0 auto;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
