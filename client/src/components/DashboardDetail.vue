<template>

  <div>
    <md-content>
      <md-toolbar>
        <h3 class="md-title">
          {{detail.title}}
        </h3>
      </md-toolbar>
      <p>
        {{detail.description}}
      </p>
      <graph-list></graph-list>

    </md-content>
  </div>

</template>

<script>
  import GraphList from './GraphList';
  export default {
    name: 'DashboardDetail',
    components: {GraphList},
    data() {
      return {
        detail: {
          id: 1,
          title: 'Investor Summary User Growth',
          icon: 'monetization_on',
          description: 'A bunch of user growth related graphs'
        }
      };
    }
  };
</script>

<style scoped>

</style>
