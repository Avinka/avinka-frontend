<template>
  <div class='dashboard'>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">

        <md-card style="padding-top: 10px">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Your Dashboards</div>
            </md-card-header-text>
          </md-card-header>
          <md-card-content>
            <dashboard-list></dashboard-list>
          </md-card-content>
        </md-card>
        <md-card>
          <dashboard-add-form></dashboard-add-form>
        </md-card>
      </div>

      <div class="md-layout-item">
        <md-toolbar>
          <h3 class="md-title">
            New hot graphs
          </h3>
        </md-toolbar>
        <graph-list></graph-list>
      </div>
    </div>
  </div>
</template>

<script>
  import VModal from 'vue-js-modal';
  import DashboardList from '@/components/DashboardList';
  import DashboardAddForm from '@/components/DashboardAddForm';
  import GraphList from '@/components/GraphList';

  export default {
    name: 'DashboardOverview',
    components: {
      GraphList,
      DashboardAddForm,
      DashboardList,
      VModal
    },
    data() {
      return {};
    },
    methods: {
    },

    watch: {
    },
    mounted() {
    }
  };
</script>

<style scoped>

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

<style lang="scss" scoped>

  .md-layout-item {
    height: 40px;

    &:nth-child(1) {
      background: md-get-palette-color(grey, 300);
    }

    &:nth-child(2) {
      background: md-get-palette-color(grey, 400);
    }

    &:nth-child(3) {
      background: md-get-palette-color(grey, 500);
    }
  }
</style>
