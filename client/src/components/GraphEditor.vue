<template>
    <div>
      <md-list>
        <md-list-item v-for="dataserie in graph.dataseries">
          <dataseries-list-item :dataseries="dataserie"></dataseries-list-item>
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
      deleteSelector(dataseriesId, selectorId) {
        this.$store.dispatch('graphStore/deleteAndRemoveSelectorFromDataseries', {dataseriesId, selectorId});
      },
      addDataSeries() {
        this.$store.dispatch('graphStore/createGraphDataseries', {graphId: this.graph._id});
      }
    }
  };
</script>

<style scoped>

</style>
