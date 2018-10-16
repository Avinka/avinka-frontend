<template>
    <div>
      <div v-if="!graph.dataseries || !graph.dataseries.selectors || graph.dataseries.selectors.length===0">
        Add a selector to create a new data series
      </div>
      <div v-if="!graph.dataseries || !graph.dataseries.selectors || graph.dataseries.selectors.length===0">
        <selector-add-form></selector-add-form>
      </div>
      <md-list v-for="dataserie in graph.dataseries">
        <md-list-item>
          <div class="md-layout md-alignment-left">
            <span  v-if="dataserie.selectors && dataserie.selectors.length!==0">
              Dataseries:
            </span>
            <span v-if="!dataserie.selectors || dataserie.selectors.length===0">
              Add a selectorApi to create a new data series
            </span>
          </div>
          <div class="md-layout md-gutter md-alignment-left">
            <span v-for="selector in dataserie.selectors" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
              <md-icon>delete</md-icon>{{selector.key}}{{selector.operator}}{{selector.value}}
            </span>
          </div>
        </md-list-item>
        <md-list-item>
          <selector-add-form></selector-add-form>
        </md-list-item>
      </md-list>
      </div>
</template>

<script>
  import SelectorAddForm from './SelectorAddForm';

  export default {
    name: 'GraphEditor',
    components: {SelectorAddForm},
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
    created() {
      // this.$store.dispatch('graphStore/getGraphDataseries', this.graph._id);
    }
  };
</script>

<style scoped>

</style>
