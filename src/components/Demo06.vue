<template>
  <div class='echarts'>
    <h2>
      <router-link to="/">Go Back</router-link>
    </h2>
    <button id="show-modal" @click="showModal()">Show Modal</button>
    <p><code>noOfItems</code>: {{ noOfItems }}</p>

    <IEcharts
      :option='option'
      :resizable="true"
    />
    <line-chart :data="chartData"></line-chart>
    <modals-container
      v-on:evt_noOfItems="_onNoOfItems"
      v-on:evt_divident="_onDivident"
    />
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3/src/full.js';

  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Highcharts from 'highcharts';

  import VModal from 'vue-js-modal';
  import ModalOverlayComp from '@/components/ModalOverlayComp';

  Vue.use(VueChartkick, {adapter: Highcharts});

  const elasticsearch = require('elasticsearch');

  const client = new elasticsearch.Client({
    // this is proxied to elasticsearch
    hosts: [window.location.protocol + '//' + window.location.host + '/ES']
  });

  function checkStatus(client) {
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

    async function generateData(client) {
    const requestBody = {
      'actor': {
        'id': 'P:123',
        'type': 'Person'
      },
      'object': {
        'id': 'Bot:123',
        'type': 'Bot'
      },
      'type': 'Login',
      'published': ''// '2018-06-01T12:12:17'
    };

    for (let i = 0; i < 10000; i++) {
      const randomIntHour = getRandomInt(1, 23);
      const hour = randomIntHour < 10 ? '0' + randomIntHour : randomIntHour;

      const randomIntMinute = getRandomInt(1, 59);
      const minute = randomIntMinute < 10 ? '0' + randomIntMinute : randomIntMinute;

      const randomIntSecond = getRandomInt(1, 59);
      const second = randomIntSecond < 10 ? '0' + randomIntSecond : randomIntSecond;
      requestBody.published = '2018-06-01T' + hour + ':' + minute + ':' + second;
      await client.create({
        index: 'active-objects-current',
        id: i.toString(),
        type: 'doc',
        body: requestBody
      });
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function loadContent(scope, client, xName, yName) {
    const body = {
      'query': {
        'match': {
          'object.type': {
            'query': 'Bot',
            'operator': 'OR',
            'prefix_length': 0,
            'max_expansions': 50,
            'fuzzy_transpositions': true,
            'lenient': false,
            'zero_terms_query': 'NONE',
            'auto_generate_synonyms_phrase_query': true,
            'boost': 1.0
          }
        }
      },
      '_source': false,
      'aggregations': {
        'grouping': {
          'date_histogram': {
            'field': 'published',
            'interval': 3600000,
            'offset': 0,
            'order': {'_key': 'asc'},
            'keyed': false,
            'min_doc_count': 0
          }
        }
      }
    };

    client.search({index: 'active-objects-current', body})
      .then(results => {
        console.log(results);
        scope.$data.option.series[0].data = results.aggregations.grouping.buckets.map(obj => [
          (new Date(parseInt(obj['key']) * 1000)) / scope.$data.divident,
          parseInt(obj['doc_count'])
        ]);

        scope.$data.chartData = results.aggregations.grouping.buckets.map(obj => [
          obj['key_as_string'],
          parseInt(obj['doc_count'])
        ]);
        console.log('new content loaded');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const _data = {
    chartData: [],
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
          type: 'line',
          symbolSize: 20,
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
    data() {
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
    mounted() {
      checkStatus(client);
      // generateData(client);
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
