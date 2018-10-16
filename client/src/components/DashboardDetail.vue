<template>
  <div>
    <md-content>
      <md-toolbar md-elevation="1">
        <h3 class="md-title" style="flex: 1">{{dashboard.name}}</h3>
        <md-button class="md-primary md-raised" v-on:click="toggleForm()">Add graph</md-button>
      </md-toolbar>
      <p>
        {{dashboard.description}}
      </p>
      <graph-list v-on:graph-deleted="onGraphDeleted" :graphs="graphs"></graph-list>
    </md-content>
    <create-or-find-graph-dialog v-on:graph-created="onGraphCreated" v-bind:show-add-graph-dialog-prop="showAddGraphDialogProp"></create-or-find-graph-dialog>
  </div>

</template>

<script>
  import GraphList from './GraphList';
  import GraphAddForm from '@/components/GraphAddForm';
  import CreateOrFindGraphDialog from './GraphCreateOrFindDialog';

  export default {
    name: 'DashboardDetail',
    components: {
      CreateOrFindGraphDialog,
      GraphList,
      GraphAddForm
    },
    computed: {
      dashboard () {
        return this.$store.getters['dashboards/byId'](this.$route.params.id);
      },
      graphs() {
        const graphs = this.$store.getters['graphStore/allByIds'](this.dashboard.graphs);
        return graphs;
      }
    },
    created() {
      this.$store.dispatch('dashboards/getDashboard', this.$route.params.id);
      this.$store.dispatch('graphStore/getAllDashboardGraphs', this.$route.params.id);
    },
    data() {
      return {
        showAddGraphDialogProp: false
      };
    },
    methods: {
      toggleForm() {
        // FIXME this horrible hack is there because I needed a break
        this.showAddGraphDialogProp = false;
        this.showAddGraphDialogProp = true;
      },
      onGraphCreated(event) {
        this.$log.debug('Got an event', event);
        this.$store.dispatch('dashboards/addGraphToDashboard', {
          dashboardId: this.$route.params.id,
          graphId: event._id
        }, event);
      },
      onGraphDeleted(event) {
        this.$log.debug('Got an event', event);
        this.$log.debug('before remove', this.dashboard);
        this.$store.dispatch('dashboards/removeGraphFromDashboard', {
          dashboardId: this.$route.params.id,
          graphId: event._id
        }, event);
        this.$log.debug('after remove', this.dashboard);
      }
    }
  };
</script>

<style scoped>

</style>
