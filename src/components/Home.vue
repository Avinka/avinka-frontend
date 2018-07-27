<template>
  <div class="home">

    <h1>{{ msg }}</h1>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
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

            <md-card-actions>
              <md-button class="md-icon-button">
                <md-icon>favorite</md-icon>
              </md-button>

              <md-button class="md-icon-button">
                <md-icon>bookmark</md-icon>
              </md-button>

              <md-button class="md-icon-button">
                <md-icon>share</md-icon>
              </md-button>
            </md-card-actions>
          </md-card-media-actions>
        </md-card>
      </div>
    </div>

    <modals-container/>
  </div>
</template>

<script>
import VModal from 'vue-js-modal';

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
    // TODO andi: this does not work, we need to put it in `main.js`
    VModal
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
</style>


