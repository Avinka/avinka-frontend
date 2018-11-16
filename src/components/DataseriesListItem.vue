<template>
    <md-list>
      <md-list-item v-if="dataseries.selectors">
          <span>
            <md-button @click="deleteDataseries">
              <md-icon>delete</md-icon>
            </md-button>
            <md-button @click="showDataseriesEditor=!showDataseriesEditor">
              <md-icon v-if="!showDataseriesEditor">expand_more</md-icon>
              <md-icon v-if="showDataseriesEditor">expand_less</md-icon>
            </md-button>
          </span>
          <span v-for="selector in dataseries.selectors" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <md-chip md-deletable v-on:click="deleteSelector(dataseries._id, selector._id)">{{selector.key}}{{selector.operator}}{{selector.value}}</md-chip>
          </span>
      </md-list-item>
      <md-list-item v-if="showDataseriesEditor && (!dataseries.selectors || dataseries.selectors.length===0)">
        <div>
          Add a selector to create a new data series
        </div>
      </md-list-item>
      <md-list-item v-if="showDataseriesEditor">
        <selector-add-form v-on:selector-created="onSelectorCreated" :dataseriesId="dataseries._id"></selector-add-form>
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
    mounted() {
        console.log(this.dataseries);
    },
    methods: {
      deleteSelector(dataseriesId, selectorId) {
        this.$store.dispatch('graphStore2/deleteAndRemoveSelectorFromDataseries', {dataseriesId, selectorId});
        this.$emit('selector-deleted', selectorId);
        this.$emit('selector-change');
      },
      deleteDataseries() {
        this.$store.dispatch('graphStore2/deleteDataseries', {dataseriesId: this.dataseries._id});
        this.$emit('dataseries-deleted', {dataseriesId: this.dataseries._id});
      },
      onSelectorCreated(event) {
        this.$emit('selector-change');
      }
    }
  };
</script>

<style scoped>

</style>
