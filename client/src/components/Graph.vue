<template>
  <div style="padding-bottom: 1em" class="md-elevation-1">
    <md-toolbar md-elevation="0" class="md-dense md-primary">
      <h3 class="md-title">{{graph.name}}</h3>
      <md-button class="md-icon-button md-alignment-top-right" @click="showGraphEditor=!showGraphEditor">
        <md-icon class="md-alignment-top-right">settings</md-icon>
      </md-button>
      <md-button class="md-icon-button md-alignment-top-right" @click="deleteGraph()">
        <md-icon>clear</md-icon>
      </md-button>
    </md-toolbar>
    <md-list>
      <line-chart :data="datapoints"></line-chart>
      <graph-editor v-if="showGraphEditor" :graph="graph"></graph-editor>
    </md-list>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Highcharts from 'highcharts';
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
        myData: null,
        showGraphEditor: false
      };
    },
    computed: {
      datapoints () {
        return this.$store.getters['datapointStore/getByDataseriesIds'](this.graph.dataseries.map(x => x._id));
      }
    },
    created() {
       this.$store.dispatch('datapointStore/getDataPointsByDataseriesIds', this.graph.dataseries.map(x => x._id));
    },
    methods: {
      deleteGraph() {
        this.$store.dispatch('graphStore/deleteGraph', this.graph._id);
        this.$log.debug('Throwing event graph-deleted');
        this.$emit('deleted', {_id: this.graph._id});
      }
    }
  };
</script>
<style scoped>
</style>
