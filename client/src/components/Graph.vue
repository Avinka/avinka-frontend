<template>
  <div style="padding-bottom: 1em" class="md-elevation-1">
    <md-toolbar md-elevation="0" class="md-dense md-primary">
      <h3 class="md-title">{{graph.name}}</h3>
      <md-button class="md-icon-button md-alignment-top-right" @click="showGraphEditor=!showGraphEditor">
        <md-icon class="md-alignment-top-right">settings</md-icon>
      </md-button>
      <md-button class="md-icon-button md-alignment-top-right" @click="deleteGraph()">
        <md-icon>delete</md-icon>
      </md-button>
    </md-toolbar>
    <div v-show="showGraphEditor">
      <graph-editor :graph="graph"></graph-editor>
    </div>
    <div style="padding-top: 1em">
      <line-chart v-bind:data="myData"></line-chart>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Highcharts from 'highcharts';
  import counterService from '../api/counter.js';
  import GraphEditor from './GraphEditor';

  Vue.use(VueChartkick, {adapter: Highcharts});

  export default {
    name: 'Graph',
    components: {
      GraphEditor
    },
    props: {
      graph: {}
    },
    data() {
      return {
        myData: {},
        showGraphEditor: false
      };
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
</style>
