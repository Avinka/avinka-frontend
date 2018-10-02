<template>
  <md-list class="md-triple-line">
    <dashboard-list-item v-for="dashboard in dashboards"
                         :dashboard="dashboard"></dashboard-list-item>
  </md-list>
</template>

<script>
  import DashboardListItem from './DashboardListItem';
  import axios from 'axios';
  export default {
    name: 'DashboardList',
    components: {DashboardListItem},
    data() {
      return {
        dashboards: [
        ]
      };
    },
    created: async function () {
      const result = await axios.get('http://localhost:8080/api/dashboard');
      console.log(result);
      this.dashboards = result.data;
    }
  };
</script>

<style scoped>

</style>
