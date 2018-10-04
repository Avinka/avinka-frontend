<template>
  <md-list class="md-triple-line">
    <dashboard-list-item v-for="dashboard in dashboards" :dashboard="dashboard"></dashboard-list-item>
  </md-list>
</template>

<script>
  import axios from 'axios';
  import { mapState, mapActions } from 'vuex';
  import DashboardListItem from './DashboardListItem';

  export default {
    name: 'DashboardList',
    components: {DashboardListItem},
    computed: mapState({
      products: state => state.products.all
    }),
    methods: mapActions('cart', [
      'addProductToCart'
    ]),
    async created() {
      this.$store.dispatch('dashboards/getAllDashboards');

      const result = await axios.get('http://localhost:8080/api/dashboard');
      this.$log.debug(result);
      this.dashboards = result.data;
    },
    data() {
      return {
        dashboards: [
        ]
      };
    }
  };
</script>

<style scoped>

</style>
