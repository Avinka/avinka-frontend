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
      <graph-add-form></graph-add-form>
      <graph-list></graph-list>

    </md-content>
  </div>

</template>

<script>
  import GraphList from './GraphList';
  import GraphAddForm from '@/components/GraphAddForm';

  import axios from 'axios';

  export default {
    name: 'DashboardDetail',
    components: {
      GraphList,
      GraphAddForm
    },
    async beforeMount() {
      this.$log.debug(this.$route.params);
      const result = await axios.get('http://localhost:8080/api/dashboard/' + this.$route.params.id + '?full=true');
      // TODO handle 404 etc
      this.$log.debug(result);
      this.dashboards = result.data;
    },
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
