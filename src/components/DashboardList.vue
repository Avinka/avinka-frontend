<template>
  <md-list class="md-triple-line">
    <dashboard-list-item v-for="dashboard in dashboards"
                         :dashboard="dashboard"></dashboard-list-item>
    <md-divider></md-divider>
  </md-list>
</template>

<script>
  import DashboardListItem from './DashboardListItem';

  export default {
    name: 'DashboardList',
    components: {DashboardListItem},
    data() {
      return {
        dashboards: [
          {
            id: 1,
            title: 'Investor Summary User Growth',
            icon: 'monetization_on',
            description: 'A bunch of user growth related graphs'
          },
          {
            id: 2,
            title: 'So much growth!11',
            icon: 'timeline',
            description: 'Exponential shit'
          },
          {
            id: 3,
            title: 'Winning',
            icon: 'done',
            description: 'whoop whoop unicorns pooping rainbows'
          }
        ]
      };
    }
  };
</script>

<style scoped>

</style>
