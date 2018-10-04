<template>
  <div>
    <!--<md-button class="md-icon-button" @click="formVisible=!formVisible">
      <md-icon>add</md-icon>
    </md-button>-->
    <form v-if="formVisible" novalidate>
      <md-card-content>
        <md-field>
          <label>Name</label>
          <md-input v-model="name"></md-input>
        </md-field>
        <md-field>
          <label>Description</label>
          <md-textarea v-model="description"></md-textarea>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button type="submit" class="md-primary" v-on:click="create()">Create Graph</md-button>
      </md-card-actions>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'GraphAddForm',
    data() {
      return {
        name: null,
        description: null,
        formVisible: false
      };
    },
    methods: {
      async create() {
        const result = await axios.post('http://localhost:8080/api/graph/', {
          name: this.name,
          description: this.description
        });
        // TODO error handling
      }
    }
  };
</script>

<style scoped>

</style>
