<template>
  <div>
    <md-empty-state
      md-icon="devices_other"
      md-label="Add your first graph"
      md-description="Time to fill this dashboard with amazing graphs and visualizations"
      v-if="graphs.length === 0"
    >
      <md-button class="md-primary md-raised">Create new Graph</md-button>

    </md-empty-state>
    <div>
      <graph v-on:deleted="onGraphDeleted" v-for="graph in graphs" :graphId="graph._id"></graph>
    </div>
  </div>
</template>

<script>
  import Graph from './Graph';

  export default {
    name: 'GraphList',
    props: ['graphs'],
    components: {
      Graph
    },
    methods: {
      onGraphDeleted(event) {
        this.$log.debug('Got an event', event);
        this.$log.debug('Rethrowing to parent');
        this.$emit('graph-deleted', event);
      }
    }
  };
</script>

