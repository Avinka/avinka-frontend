<template>
  <div>
    <!--<md-button class="md-icon-button" @click="formVisible=!formVisible">
      <md-icon>add</md-icon>
    </md-button>-->
    <form v-if="formVisible" novalidate>
      <md-card-content>
        <md-field>
          <label>Name</label>
          <md-input v-model="graph.name"></md-input>
        </md-field>
        <md-field>
          <label>Description</label>
          <md-textarea v-model="graph.description"></md-textarea>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button type="submit" class="md-primary" v-on:click="create()">Create Graph</md-button>
      </md-card-actions>
    </form>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'GraphAddForm',
    data() {
      return {
        graph: {
          name: '',
          description: ''
        },
        formVisible: true
      };
    },
    methods: {
      async create() {
        const graph = await this.$store.dispatch('graphStore/createGraph', {
          name: this.graph.name,
          description: this.graph.description
        });
        this.$log.debug('Got graph created data', graph);
        this.$emit('graph-created', graph);
      }
    }
  };
</script>

<style scoped>

</style>
