<template>
  <div class="home">

    <h1>{{ msg }}</h1>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-50">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              Analytics
            </md-card-header-text>
          </md-card-header>
          <md-card-media-actions>
            <md-card-media>
              <img src="/static/graph_medium.png">
            </md-card-media>
          </md-card-media-actions>
        </md-card>
      </div>
      <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-50">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              A/B Testing
            </md-card-header-text>
          </md-card-header>
          <md-card-media-actions>
            <md-card-media>
              <img src="/static/graph_medium.png">
            </md-card-media>
          </md-card-media-actions>
        </md-card>
      </div>
      <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-50">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              Notifications
            </md-card-header-text>
          </md-card-header>
          <md-card-media-actions>
            <md-card-media>
              <img src="/static/graph_medium.png">
            </md-card-media>
          </md-card-media-actions>
        </md-card>
      </div>
      <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-50">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              Administration
            </md-card-header-text>
          </md-card-header>
          <md-card-media-actions>
            <md-card-media>
              <img src="/static/graph_medium.png">
            </md-card-media>
          </md-card-media-actions>
        </md-card>
      </div>
    </div>

    <modals-container/>
  </div>
</template>

<script>

const _data = {
  msg: 'Welcome to Active Graph'
};

export default {
  name: 'Home',
  data () {
    return _data;
  },
  // add here, what Vue should load for us
  components: {
  },
  methods: {
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
  .md-layout-item{
    padding-top: 2em;
  }
</style>


