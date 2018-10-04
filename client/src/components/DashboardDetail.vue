<template>
  <div>
    <md-content>
      <md-toolbar class="md-accent" md-elevation="1">
        <h3 class="md-title" style="flex: 1">{{dashboard.name}}</h3>
        <md-button class="md-primary md-raised" @click="showAddGraphDialog=true">Add graph</md-button>
      </md-toolbar>
      <p>
        {{dashboard.description}}
      </p>
      <graph-add-form></graph-add-form>
      <graph-list></graph-list>

    </md-content>
    <div>
      <md-dialog :md-active.sync="showAddGraphDialog">
        <md-dialog-title>Preferences</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-label="Find">
          </md-tab>

          <md-tab md-label="Create">
          </md-tab>
        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showAddGraphDialog = false">Close</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
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
      this.dashboard = result.data;
    },
    data() {
      return {
        showAddGraphDialog: false,
        dashboard: null
      };
    }
  };
</script>

<style scoped>

</style>
