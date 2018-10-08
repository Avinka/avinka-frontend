<template>
  <div class="graph md-elevation-2">
    <md-subheader class="md-primary">{{graph.title}}
      <md-icon>settings</md-icon>
    </md-subheader>
    <br/>
    <line-chart v-bind:data="myData"></line-chart>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Highcharts from 'highcharts';
  import Graph from './Graph';
  import counterService from '../api/counter.js';

  Vue.use(VueChartkick, {adapter: Highcharts});

  export default {
    name: 'Graph',
    components: {
      Graph
    },
    props: {
      graph: {}
    },
    data() {
      return {myData: {}};
    },
    created() {
      const _this = this;
      counterService.getCounters().then(result => {
        _this.myData = result.data;
      });
    }
  };
</script>
<style scoped>
  .graph {
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
