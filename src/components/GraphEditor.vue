<template>
    <div>
      <md-list>
        <md-list-item v-for="dataserie in graph.dataseries">
          <dataseries-list-item v-on:selector-change="triggerGraphPropertyChangeEvent" v-on:dataseries-deleted="onDataseriesDeleted" :dataseries="dataserie"></dataseries-list-item>
        </md-list-item>
        <md-list-item>
          <md-button v-on:click="addDataSeries">Add dataseries</md-button>
        </md-list-item>
      </md-list>
    </div>
</template>

<script>
  import SelectorAddForm from './SelectorAddForm';
  import DataseriesListItem from './DataseriesListItem';

  export default {
    name: 'GraphEditor',
    components: {SelectorAddForm, DataseriesListItem},
    props: ['graph'],
    comments: [
      SelectorAddForm
    ],
    data() {
      return {
        sending: false,
        form: {
        }
      };
    },
    methods: {
      async addDataSeries() {
        await this.$store.dispatch('graphStore2/createGraphDataseries', {graphId: this.graph._id});
        this.triggerGraphPropertyChangeEvent();
      },
      onDataseriesDeleted(event) {
        this.$log.debug('Received an event:', event);
        this.$store.dispatch('graphStore2/removeDataseriesFromGraph', {graphId: this.graph._id, dataseriesId: event.dataseriesId});
        this.triggerGraphPropertyChangeEvent();
      },
      triggerGraphPropertyChangeEvent() {
        this.$emit('graph-property-change');
      }
    }
  };
</script>

<style scoped>

</style>
