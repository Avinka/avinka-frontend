<template>
    <md-list>
      <md-list-item v-if="dataseries.selectors">
        <div class="md-layout md-gutter md-alignment-left">
          <md-button @click="showDataseriesEditor=!showDataseriesEditor">
            <md-icon v-if="!showDataseriesEditor">expand_more</md-icon>
            <md-icon v-if="showDataseriesEditor">expand_less</md-icon>
          </md-button>
          <span v-for="selector in dataseries.selectors" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-button v-on:click="deleteSelector(dataseries._id, selector._id)" class="md-icon-button">
              <md-icon>delete</md-icon>
            </md-button>
            {{selector.key}}{{selector.operator}}{{selector.value}}
          </span>
        </div>
      </md-list-item>
      <md-list-item v-if="showDataseriesEditor && (!dataseries.selectors || dataseries.selectors.length===0)">
        <div>
          Add a selector to create a new data series
        </div>
      </md-list-item>
      <md-list-item v-if="showDataseriesEditor">
        <selector-add-form :dataseriesId="dataseries._id"></selector-add-form>
      </md-list-item>
    </md-list>
</template>

<script>
  import SelectorAddForm from './SelectorAddForm';

  export default {
    name: 'DataseriesListItem',
    components: {SelectorAddForm},
    props: ['dataseries'],
    data() {
      return {
        sending: false,
        form: {
        },
        showDataseriesEditor: false
      };
    },
    methods: {
      deleteSelector(dataseriesId, selectorId) {
        this.$store.dispatch('graphStore/deleteAndRemoveSelectorFromDataseries', {dataseriesId, selectorId});
      }
    }
  };
</script>

<style scoped>

</style>
