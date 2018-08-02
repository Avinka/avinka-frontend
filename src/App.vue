<template>
  <div id="App" class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Active Graph</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible"  md-persistent="mini" md-fixed="true">
        <md-toolbar class="md-transparent" md-elevation="0">Take the tour</md-toolbar>

        <md-list>
          <md-list-item to="/analytics/">
            <md-icon class="md-primary">visibility</md-icon>
            <span class="md-list-item-text">Overview</span>
          </md-list-item>

          <md-list-item to="/analytics/dashboard-overview">
            <md-icon class="md-primary">dashboard</md-icon>
            <span class="md-list-item-text">Dashboards</span>
          </md-list-item>

          <md-list-item to="/analytics/objects">
            <md-icon class="md-primary">extension</md-icon>
            <span class="md-list-item-text">Objects</span>
          </md-list-item>

          <md-list-item>
            <md-icon class="md-primary"><i class="md-svg-loader md-icon md-icon-image md-bottom-bar-icon md-theme-demo-light"><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></i></md-icon>
            <span class="md-list-item-text">Predictive shit</span>
          </md-list-item>

          <md-list-item to="/analytics/data-admin">
            <md-icon class="md-primary">build</md-icon>
            <span class="md-list-item-text">Data admin</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content style="height: 100em">
        <router-view/>
      </md-app-content>
    </md-app>

    <div id="Bottom-Bar">
      <md-bottom-bar class="md-accent" md-sync-route>
        <md-bottom-bar-item to="/" md-label="Home" md-icon="home"></md-bottom-bar-item>
        <md-bottom-bar-item to="/analytics" md-label="Analytics" md-icon="timeline" class="md-primary"></md-bottom-bar-item>
        <md-bottom-bar-item to="/ab-testing" md-label="AB Testing" md-icon="web" class="md-primary"></md-bottom-bar-item>
        <md-bottom-bar-item to="/notifications" md-label="Notifications" md-icon="alarm" class="md-primary"></md-bottom-bar-item>
        <md-bottom-bar-item to="/administration" md-label="Administration" md-icon="settings" class="md-primary"></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-light.css';
import 'material-icons';

export default {
  name: 'App',
  data: () => ({
    menuVisible: false
  })
};
Vue.use(VueMaterial);
</script>

<style>
#App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html, body { height: 100%}
</style>

<style lang="scss" scoped>
  #Bottom-Bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
  }
</style>
