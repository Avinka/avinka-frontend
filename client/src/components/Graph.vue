<template>
  <div class="graph md-elevation-2">
    <md-subheader class="md-primary">{{graph.title}}
      <md-icon>settings</md-icon>
    </md-subheader>
    <br/>
    <line-chart :data="chartData"></line-chart>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Highcharts from 'highcharts';
  import Graph from './Graph';
  import counterService from '../api/counter.js';

  Vue.use(VueChartkick, {adapter: Highcharts});

  function loadContent(scope) {
    scope.$data.chartData = counterService.getCounters();
    Vue.$log.debug('new content loaded');
  }

  const _data = {
    chartData: []
  };

  let _loadContentId = null;
  const xAxisProperty = 'last_updated';
  const yAxisProperty = 'age';

  function loadWithDelay() {
    // avoid calling the server once for the removed char and the added char
    if (!_loadContentId) {
      _loadContentId = window.setTimeout(() => {
        loadContent(this);
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
    methods: {},

    /**
     * this happens each time we render the component (e.g. enter the route)
     */
    watch: {
      // via: https://stackoverflow.com/a/51176290/2741111
      noOfItems: loadWithDelay,
      divident: loadWithDelay
    },
    mounted() {
      loadContent(this, client);
    }
  };
</script>
<style scoped>
  .graph {
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
