<template>
  <div>
    <md-empty-state
      md-icon="devices_other"
      md-label="Add your first graph"
      md-description="To to fill this dashboard with amazing graphs an visualizations"
      v-if="graphs.length === 0"
    >
    </md-empty-state>
    <div>
      <graph v-for="graph in graphs" :graph="graph"></graph>
    </div>
  </div>
</template>

<script>
  import Graph from './Graph';

  export default {
    name: 'GraphList',
    components: {
      Graph
    },
    data() {
      return {
        graphs: [
        ]
      };
    }
  };
</script>

