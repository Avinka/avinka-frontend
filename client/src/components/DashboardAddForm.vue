<template>
  <form novalidate>
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
      <md-button type="submit" class="md-primary" v-on:click="create()">Create Dashboard</md-button>
    </md-card-actions>
  </form>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'DashboardAddForm',
    data: function() {
      return {
        name: null,
        description: null
      };
    },
    methods: {
      create: async function() {
        const result = await axios.post('http://localhost:8080/api/dashboard/', {name: this.name});
        this.$router.push({name: 'DashboardDetail', params: {id: result.data._id}});

        console.log(result.data);
      }
    }
  };
</script>

<style scoped>

</style>
