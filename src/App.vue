<template>
  <div id="App" class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <span to="/" md-label="Home" class="md-title">Active Graph</span>
      </md-app-toolbar>
      <md-app-content style="height:100em">
        <router-view/>
      </md-app-content>
    </md-app>

    <div id="Bottom-Bar">
      <md-bottom-bar class="md-accent" md-sync-route>
        <md-bottom-bar-item to="/analytics" md-label="Analytics" md-icon="timeline" class="md-primary"></md-bottom-bar-item>
        <md-bottom-bar-item to="/ab-testing" md-label="AB Testing" md-icon="web" class="md-primary"></md-bottom-bar-item>
        <md-bottom-bar-item to="/notifications" md-label="Notifications" md-icon="alarm" class="md-primary"></md-bottom-bar-item>
        <md-bottom-bar-item to="/admin" md-label="Administration" md-icon="settings" class="md-primary"></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>

</template>

<script>
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'; // This line here
import 'material-icons';

export default {
  name: 'App',
  data: () => ({
    menuVisible: false
  })
};
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
