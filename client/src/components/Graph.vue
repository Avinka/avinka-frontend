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

    <div v-if="myData" style="padding-top: 1em">
      <line-chart v-bind:data="myData"></line-chart>
    </div>
    <md-list>
      <md-list-item v-if="!graph.dataseries || graph.dataseries.length===0">
        <graph-editor :graph="graph"></graph-editor>
      </md-list-item>
      <md-list-item v-for="dataseries in graph.dataseries">
        <div>
          <md-button @click="showGraphEditor=!showGraphEditor">
            Dataseries (color)
          </md-button>
        </div>
        <div v-show="showGraphEditor">
          <graph-editor :graph="graph"></graph-editor>
        </div>
      </md-list-item>
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
      dashboard () {
        return this.$store.getters['dataseries/byId'](this.$route.params.id);
      },
    },
    created() {
      this.$store.dispatch('dataseries/getDataseriesByGraphId', this.graph._id);
    },
    methods: {
      async deleteGraph() {
        await this.$store.dispatch('graphStore/deleteGraph', this.graph._id);
        this.$log.debug('Throwing event graph-deleted');
        this.$emit('deleted', {_id: this.graph._id});
      }
    }
  };
</script>
<style scoped>
</style>
