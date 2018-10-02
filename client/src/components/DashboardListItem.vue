<template>
  <md-list-item :to="{name: 'DashboardDetail', params: { id: dashboard._id }}">
    <md-icon class="md-primary">timeline</md-icon>
    <div class="md-list-item-text">
      <span>{{dashboard.name}}</span>
      <p>
        {{dashboard.description}}
      </p>
    </div>
    <md-card-actions>
      <md-button class="md-icon-button">
        <md-icon>share</md-icon>
      </md-button>

      <md-button class="md-icon-button" v-on:click="deleteDashboard(dashboard._id, $event);">
        <md-icon>delete</md-icon>
      </md-button>
    </md-card-actions>
  </md-list-item>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'DashboardListItem',
    props: {
      dashboard: {}
    },
    methods: {
      deleteDashboard: function (id, event) {
        if (event) event.preventDefault();
        axios.delete('http://localhost:8080/api/dashboard/' + id);
        // TODO emit event after successful delete
        return false;
      }
    }
  };
</script>

<style scoped>

</style>
