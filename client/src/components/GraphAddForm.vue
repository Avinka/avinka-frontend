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
        await this.$store.dispatch('graphs/createGraph', {
          name: this.name,
          description: this.description
        });
      }
    }
  };
</script>

<style scoped>

</style>
