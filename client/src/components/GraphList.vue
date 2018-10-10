<template>
  <div>
    <md-empty-state
      md-icon="devices_other"
      md-label="Add your first graph"
      md-description="Time to fill this dashboard with amazing graphs and visualizations"
      v-if="graphs.length === 0"
    >
    </md-empty-state>
    <div>
      <graph v-for="graph in graphs" :graph="graph"></graph>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Graph from './Graph';

  export default {
    name: 'GraphList',
    props: ['graphs'],
    components: {
      Graph
    },
    created() {
      console.log(this.graphs);
    }
  };
</script>

