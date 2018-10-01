<template>
  <md-list-item :to="{name: 'DashboardDetail', params: { id: dashboard.id }}">
    <md-icon class="md-primary">{{dashboard.icon}}</md-icon>
    <div class="md-list-item-text">
      <span>{{dashboard.title}}</span>
      <p>
        {{dashboard.description}}
      </p>
    </div>
    <md-card-actions>
      <md-button class="md-icon-button">
        <md-icon>share</md-icon>
      </md-button>

      <md-button class="md-icon-button">
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
    }
  };
</script>

<style scoped>

</style>
