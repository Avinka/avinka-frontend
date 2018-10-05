<template>
  <div>
    <md-content>
      <md-toolbar class="md-accent" md-elevation="1">
        <h3 class="md-title" style="flex: 1">{{dashboard.name}}</h3>
        <md-button class="md-primary md-raised" v-on:click="toggleForm()">Add graph</md-button>
      </md-toolbar>
      <p>
        {{dashboard.description}}
      </p>
      <graph-list></graph-list>
    </md-content>
    <create-or-find-graph-dialog v-bind:show-add-graph-dialog-prop="showAddGraphDialogProp"></create-or-find-graph-dialog>
  </div>

</template>

<script>
  import GraphList from './GraphList';
  import GraphAddForm from '@/components/GraphAddForm';
  import CreateOrFindGraphDialog from './CreateOrFindGraphDialog';

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
      }
    },
    created() {
      this.$store.dispatch('dashboards/getDashboard', this.$route.params.id);
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
      }
    }
  };
</script>

<style scoped>

</style>
