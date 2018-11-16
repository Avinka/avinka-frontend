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

      <md-button class="md-icon-button" v-on:click="deleteDashboard(dashboard, $event);">
        <md-icon>delete</md-icon>
      </md-button>
    </md-card-actions>
  </md-list-item>
</template>

<script>
  export default {
    name: 'DashboardListItem',
    props: {
      dashboard: {}
    },
    methods: {
      async deleteDashboard(dashboard, event) {
        if (event) event.preventDefault();
        await this.$store.dispatch('dashboards/deleteDashboard', dashboard);
      }
    }
  };
</script>

<style scoped>

</style>
