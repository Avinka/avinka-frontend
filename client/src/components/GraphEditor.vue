<template>
    <div>
      <md-list>
        <md-list-item>
          <div class="md-layout md-alignment-left">
            <span  v-if="selectors && selectors.length!==0">
              Dataseries:
            </span>
            <span v-if="!selectors || selectors.length===0">
              Add a selector to create a new data series
            </span>
          </div>
          <div class="md-layout md-gutter md-alignment-left">
            <span v-for="selector in selectors" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
              <md-icon>delete</md-icon>{{selector.key}}{{selector.operator}}{{selector.value}}
            </span>
          </div>
        </md-list-item>
        <md-list-item>
          <form class="md-layout" @submit.prevent="validateSelector">
            <md-card class="md-layout-item md-size-100 md-small-size-100">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <span class="md-layout-item md-small-size-33">
                    <md-field>
                      <label for="key">Selector key</label>
                      <md-input name="key" id="key" v-model="form.key" />
                    </md-field>
                  </span>
                  <span class="md-layout-item md-small-size-33">
                    <md-field>
                      <label for="operator">Operator</label>
                      <md-select name="operator" id="operator" v-model="form.operator" md-dense>
                        <md-option value="=">equals</md-option>
                        <md-option value="<">less than</md-option>
                        <md-option value=">">more than</md-option>
                      </md-select>
                    </md-field>
                  </span>
                  <span class="md-layout-item md-small-size-33">
                    <md-field>
                      <label for="value">Selector value</label>
                      <md-input name="value" id="value" v-model="form.value" />
                    </md-field>
                  </span>
                  <md-progress-bar md-mode="indeterminate" v-if="sending" />
                  <md-card-actions>
                    <md-button type="submit" :disabled="sending" class="md-primary">Create selector</md-button>
                  </md-card-actions>
                </div>
              </md-card-content>
            </md-card>
          </form>
        </md-list-item>
      </md-list>
      </div>
</template>

<script>
  export default {
    name: 'GraphEditor',
    props: ['graph'],
    data() {
      return {
        sending: false,
        form: {
        },
        selectors: [
        ]
      };
    },
    methods: {
      validateSelector() {
        this.saveSelector();
      },
      async saveSelector() {
        const selector = await this.$store.dispatch('selectors/createSelector', {
          key: this.selector.key,
          value: this.selector.value,
          operator: this.selector.operator
        });
        this.$log.debug('Got selector created data', selector);
        this.$emit('selector-created', selector);
      }
    },
    async created() {
      await this.$store.dispatch('graphs/getGraphSelectors', this.graph.id);
    }
  };
</script>

<style scoped>

</style>
