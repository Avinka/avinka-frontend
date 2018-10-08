<template>
  <div class="graph md-elevation-2">
    <div class="md-layout md-gutter  md-alignment-top-right">
      <div class="md-layout-item">
        <span class="md-title">{{graph.name}}</span></div>
      <div class="md-layout-item ">
        <md-button class="md-icon-button md-alignment-top-right" @click="deleteGraph()">
          <md-icon class="md-alignment-top-right">settings</md-icon>
        </md-button>
        <md-button class="md-icon-button md-alignment-top-right" @click="deleteGraph()">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </div>


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
      counterService.getCounters().then((result) => {
        _this.myData = result.data;
      });
    },
    methods: {
      deleteGraph() {
        this.$store.dispatch('graphs/deleteGraph', this.graph._id);
      }
    }
  };
</script>
<style scoped>
  .graph {
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
