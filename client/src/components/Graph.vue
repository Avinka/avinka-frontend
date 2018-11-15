<template>
  <div style="padding-bottom: 1em" class="md-elevation-1">
    <md-toolbar md-elevation="0" class="md-dense md-primary">
      <h3 class="md-title">
        <span v-if="!updateGraphName" v-on:click="updateGraphName=true">{{graph.name}}</span>
        <input class="md-title" style="background-color:#448aff" @keydown.enter="saveGraphName" v-on:blur="saveGraphName" v-if="updateGraphName" type="text"
               name="graphName" :value="graph.name"/>
      </h3>
      <md-button class="md-icon-button md-alignment-top-right" v-on:click="showDatePickComponent=!showDatePickComponent" >
        <md-icon class="md-icon-image" v-once>
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </md-icon>
      </md-button>
      <md-button class="md-icon-button md-alignment-top-right" @click="showGraphEditor=!showGraphEditor">
        <md-icon class="md-alignment-top-right">settings</md-icon>
      </md-button>
      <md-button class="md-icon-button md-alignment-top-right" @click="deleteGraph()">
        <md-icon>clear</md-icon>
      </md-button>
    </md-toolbar>
    <div v-if="showDatePickComponent">
      <form novalidate class="md-layout">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-20 md-small-size-50">
                <md-radio v-model="graph.mode" value="window">Moving window <small>(d/h/m/s/w)</small></md-radio>
              </div>
              <div class="md-layout-item md-size-15 md-small-size-50">
                <md-radio v-model="graph.mode" value="frame">Time frame</md-radio>
              </div>
              <div class="md-layout-item md-size-20 md-small-size-50">
                <md-button @click="showDatePickComponent=false">Close</md-button>
              </div>
            </div>
            <div v-if="graph.mode==='window'" class="md-layout md-gutter">
              <div class="md-layout-item md-size-50 md-small-size-50">
                <md-field>
                  <label>Window</label>
                  <md-input v-model.lazy="graph.windowSize"></md-input>
                </md-field>
              </div>
            </div>
            <div v-if="graph.mode==='frame'" class="md-layout md-gutter md-layout-item md-size-100">
              <div class="md-layout-item md-size-40 md-small-size-50">
                <md-datepicker v-model="graph.since" md-immediately />
              </div>
              <div class="md-layout-item  md-size-10 md-small-size-20">
                <md-field>
                  <md-select v-model="sinceHour" name="hour" id="hour" md-dense >
                    <md-option v-for="num in daily_hours" v-bind:value="num">{{num}}</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item  md-size-10 md-small-size-20">
                <md-field>
                  <md-select v-model="sinceMinute" name="hour" id="hour" md-dense >
                    <md-option v-for="num in daily_hours" v-bind:value="num">{{num}}</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <div v-if="graph.mode==='frame'" class="md-layout md-gutter md-layout-item md-size-100">
              <div class="md-layout-item md-size-40 md-small-size-50">
                  <md-datepicker v-model="graph.until" md-immediately />
                </div>
                <div class="md-layout-item  md-size-10 md-small-size-20">
                  <md-field>
                    <md-select v-model="untilHour" name="hour" id="hour" md-dense >
                      <md-option v-for="num in daily_hours" v-bind:value="num">{{num}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item  md-size-10 md-small-size-20">
                  <md-field>
                    <md-select v-model="untilMinute" name="hour" id="hour" md-dense >
                      <md-option v-for="num in daily_hours" v-bind:value="num">{{num}}</md-option>
                    </md-select>
                  </md-field>
                </div>
            </div>
          </md-card-content>
        </md-card>

      </form>
    </div>
    <br/>
    <line-chart :data="datapoints"></line-chart>
    <graph-editor v-on:graph-property-change="refreshData" v-if="showGraphEditor" :graph="graph"></graph-editor>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueChartkick from 'vue-chartkick';
  import Highcharts from 'highcharts';
  import GraphEditor from './GraphEditor';

  Vue.use(VueChartkick, {adapter: Highcharts});
  export default {
    name: 'Graph',
    components: {
      GraphEditor
    },
    props: {
      graphId: null
    },
    data() {
      return {
        updateGraphName: false,
        showGraphEditor: false,
        showDatePickComponent: false,
        radio: 'window',
        windowSize: '24h',
        aggInterval: '10min',
        graph: null,
        sinceHour: '00',
        untilHour: '00',
        sinceMinute: '00',
        untilMinute: '00',
        queryObject: null,
        hour: 0,
        daily_hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        daily_min_: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
      };
    },
    watch: {
      graph: {
        handler(val) {
         this.onDateComponentChange();
        },
        deep: true
      },
      sinceMinute: {
        handler(val) {
          this.onDateComponentChange();
        }
      },
      sinceHour: {
        handler(val) {
          this.onDateComponentChange();
        }
      },
      untilMinute: {
        handler(val) {
          this.onDateComponentChange();
        }
      },
      untilHour: {
        handler(val) {
          this.onDateComponentChange();
        }
      }
    },
    computed: {
      datapoints() {
        return this.$store.getters['datapointStore/getByDataseriesIds'](this.graph.dataseries.map(x => x._id));
      }
    },
    created() {
      this.graph = JSON.parse(JSON.stringify(this.$store.getters['graphStore2/getByGraphById'](this.graphId)));
      const graphSince = new Date(Date.parse(this.graph.since));
      const graphUntil = new Date(Date.parse(this.graph.until));

      this.sinceMinute = '0' + graphSince.getMinutes();
      this.sinceHour = '0' + graphSince.getHours();
      this.untilMinute = '0' + graphUntil.getMinutes();
      this.untilHour = '0' + graphUntil.getHours();
      this.refreshData();
    },
    methods: {
      saveGraphName(event) {
        this.updateGraphName = false;
        this.$store.dispatch('graphStore2/updateGraphValue', {graphId: this.graph._id, key: 'name', value: event.target.value});
      },
      deleteGraph() {
        this.$store.dispatch('graphStore2/deleteGraph', this.graph._id);
        this.$log.debug('Throwing event graph-deleted');
        this.$emit('deleted', {_id: this.graph._id});
      },
      onDateComponentChange() {
        // FIXME not quite elegant
        const tmpQueryState = this.buildQueryObjectForGraph(this.graph);
        if (this.queryObject && JSON.stringify(this.queryObject) === JSON.stringify(tmpQueryState)) {
          return;
        }
        this.queryObject = tmpQueryState;
        this.refreshData();
      },
      refreshData() {
        this.$log.debug('Refreshing data');
        const queryObject = this.buildQueryObjectForGraph(this.graph);
        if (this.graph.mode !== 'window') {
          this.graph.since = queryObject.since.toISOString();
          this.graph.until = queryObject.until.toISOString();
        }
        this.$store.dispatch('graphStore2/patchGraph', {
          _id: this.graph._id,
          since: this.graph.since,
          until: this.graph.until,
          mode: this.graph.mode,
          windowSize: this.graph.windowSize
        });
        this.$store.dispatch('datapointStore/getDataPointsByDataseriesIds', queryObject);
      },
      buildQueryObjectForGraph(graph) {
        const queryObject = {
          dataseriesIds: graph.dataseries.map(x => x._id)
        };
        if (graph.mode === 'window') {
          queryObject.window = this.graph.windowSize;
        } else {
          if (!this.graph.since) {
            queryObject.since = new Date(Date.now() - 1000 * 60 * 60 * 24);
          } else {
            queryObject.since = new Date(Date.parse(this.graph.since));
          }
          if (!this.graph.until) {
            queryObject.until = new Date();
          } else {
            queryObject.until = new Date(Date.parse(this.graph.until));
          }
          queryObject.since.setHours(parseInt(this.sinceHour));
          queryObject.since.setMinutes(parseInt(this.sinceMinute));
          queryObject.until.setHours(parseInt(this.untilHour));
          queryObject.until.setMinutes(parseInt(this.untilMinute));
        }
        queryObject.aggInterval = this.aggInterval;
        return queryObject;
      }
    }
  };
</script>
<style scoped>
</style>
