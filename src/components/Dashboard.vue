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
            <md-list class="md-triple-line">
              <md-list-item>
                <md-icon class="md-primary">timeline</md-icon>
                <div class="md-list-item-text">
                  <span>Investor Summary User Growth</span>
                  <p>
                    A bunch of user growth related graphs
                  </p>
                </div>
                <md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon>share</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon>delete</md-icon>
                  </md-button>
                </md-card-actions>
              </md-list-item>

              <md-divider></md-divider>

              <md-list-item>
                <md-icon class="md-primary">attach_money</md-icon>
                <div class="md-list-item-text">
                  <span>Revenue up</span>
                  <p>Revenue is going through the roof ... hopefully</p>
                </div>
                <md-card-actions>
                  <md-button class="md-icon-button">
                    <md-icon>share</md-icon>
                  </md-button>

                  <md-button class="md-icon-button">
                    <md-icon>delete</md-icon>
                  </md-button>
                </md-card-actions>
              </md-list-item>


            </md-list>
          </md-card-content>
        </md-card>

        <md-card>
          <form novalidate>
            <md-card-content>
              <md-field>
                <label>Name</label>
                <md-input v-model="initial"></md-input>
              </md-field>
              <md-field>
                <label>Description</label>
                <md-textarea v-model="textarea"></md-textarea>
              </md-field>
            </md-card-content>

            <md-card-actions>
              <md-button type="submit" class="md-primary" :disabled="sending">Create Dashboard</md-button>
            </md-card-actions>
          </form>

        </md-card>
      </div>

      <div class="md-layout-item">
        <md-toolbar :md-elevation="1">
          <span class="md-title">New hot graphs</span>
        </md-toolbar>
        <md-subheader>Person login App</md-subheader>
        <line-chart :data="chartData"></line-chart>
        <md-subheader>Person create Dashboard</md-subheader>
        <line-chart :data="chartData"></line-chart>
      </div>
    </div>
    <md-list>


    </md-list>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Highcharts from 'highcharts';
  import VModal from 'vue-js-modal';
  import ModalOverlayComp from '@/components/ModalOverlayComp';

  Vue.use(VueChartkick, {adapter: Highcharts});

  const elasticsearch = require('elasticsearch');

  const client = new elasticsearch.Client({
    // this is proxied to elasticsearch
    hosts: [window.location.protocol + '//' + window.location.host + '/ES']
  });

  function checkStatus(client) {
    client.ping({
      requestTimeout: 5000
    }, (error) => {
      // at this point, eastic search is down, please check your Elasticsearch service
      if (error) {
        console.error('elasticsearch cluster is down!');
      } else {
        console.log('Everything is ok');
      }
    });
  }

  function loadContent(scope, client, xName, yName) {
    const body = {
      'query': {
        'match': {
          'object.type': {
            'query': 'Bot',
            'operator': 'OR',
            'prefix_length': 0,
            'max_expansions': 50,
            'fuzzy_transpositions': true,
            'lenient': false,
            'zero_terms_query': 'NONE',
            'auto_generate_synonyms_phrase_query': true,
            'boost': 1.0
          }
        }
      },
      '_source': false,
      'aggregations': {
        'grouping': {
          'date_histogram': {
            'field': 'published',
            'interval': 3600000,
            'offset': 0,
            'order': {'_key': 'asc'},
            'keyed': false,
            'min_doc_count': 0
          }
        }
      }
    };

    client.search({index: 'active-objects-current', body})
      .then(results => {
        console.log(results);

        scope.$data.chartData = results.aggregations.grouping.buckets.map(obj => [
          obj['key_as_string'],
          parseInt(obj['doc_count'])
        ]);
        console.log('new content loaded');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const _data = {
    chartData: []
  };

  var _loadContentId = null;
  const xAxisProperty = 'last_updated';
  const yAxisProperty = 'age';

  function loadWithDelay() {
    // avoid calling the backend once for the removed char and the added char
    if (!_loadContentId) {
      _loadContentId = window.setTimeout(() => {
        loadContent(this, client, xAxisProperty, yAxisProperty);
        _loadContentId = null;
      }, 200);
    }
  }

  export default {
    name: 'Dashboard',
    components: {
      VModal
    },
    data() {
      return _data;
    },
    methods: {
      showModal() {
        // sweet, load our component in the managed overlay here
        this.$modal.show(ModalOverlayComp,
          this.$data,
          {
            draggable: true,
            resizable: true,
            height: 200
          });
      }
      // beforeMount () {
      //   const that = this
      // },
      // beforeDestroy () {
      //   const that = this
      // }
    },

    /**
     * this happens each time we render the component (e.g. enter the route)
     */
    watch: {
      // via: https://stackoverflow.com/a/51176290/2741111
      noOfItems: loadWithDelay,
      divident: loadWithDelay
    },
    mounted() {
      checkStatus(client);
      // generateData(client);
      loadContent(this, client, xAxisProperty, yAxisProperty);
    }
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
