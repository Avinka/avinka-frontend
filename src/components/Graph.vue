<template>
  <div class="graph md-elevation-2">
    <md-subheader  class="md-primary">{{graph.title}} <md-icon>settings</md-icon></md-subheader>
    <br />
    <line-chart :data="chartData"></line-chart>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Highcharts from 'highcharts';
  import Graph from './Graph';
  const elasticsearch = require('elasticsearch');

  Vue.use(VueChartkick, {adapter: Highcharts});

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
    chartData: []
  };

  let _loadContentId = null;
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
    name: 'Graph',
    components: {
      Graph
    },
    props: {
      graph: {}
    },
    data() {
      return _data;
    },
    methods: {
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
      loadContent(this, client, xAxisProperty, yAxisProperty);
    }
  };
</script>
<style scoped>
  .graph {
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
