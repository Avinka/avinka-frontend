<template>
  <div class='echarts'>
    <h2><router-link to="/">Go Back</router-link></h2>
    <button id="show-modal" @click="showModal()">Show Modal</button>
    <p><code>noOfItems</code>: {{ noOfItems }}</p>

    <IEcharts
      :option='option'
    />
    <modals-container
      v-on:evt_noOfItems="_onNoOfItems" />
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

function loadContent (scope, client) {
  const body = {
    size: _data.noOfItems,
    query: {
      match_all: {}
    }
  };

  client.search({index: 'actor', body})
    .then(results => {
      scope.$data.option.series[0].data = results.hits.hits.map(obj => [
        parseInt(obj._source['last_updated']),
        parseInt(obj._source['age'])
      ]);
      console.log('new content loaded');
    })
    .catch(err => {
      console.log(err);
    });
}

const _data = {
  noOfItems: 5000,
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
        draggable: true
      });
    },
    _onNoOfItems(numOf) {
      console.log('_onNoOfItems: %o', numOf);
      this.$data.noOfItems = numOf;
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
  mounted () {
    checkStatus(client);
    loadContent(this, client);
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .echarts {
    width: 800px;
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
