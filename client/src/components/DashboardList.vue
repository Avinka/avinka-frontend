<template>
  <div>
    <md-list class="md-triple-line">
      <dashboard-list-item v-for="dashboard in dashboards" :dashboard="dashboard"></dashboard-list-item>
    </md-list>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import DashboardListItem from './DashboardListItem';

  export default {
    name: 'DashboardList',
    components: {DashboardListItem},
    computed: mapState({
      dashboards: state => state.dashboards.all
    }),
    created() {
      this.$store.dispatch('dashboards/getAllDashboards');
    }
  };
</script>

<style scoped>

</style>
