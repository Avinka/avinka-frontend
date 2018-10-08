<template>
    <div>
      <md-list>
        <md-list-item>
          <span>
            Selectors:
          </span>
        <span>
            <md-button><md-icon>add</md-icon></md-button>
          </span>
        </md-list-item>
        <md-list-item>
          <form class="md-layout">
            <md-card class="md-layout-item md-size-100 md-small-size-100">
              <md-card-content>
                <div class="md-layout md-gutter">
                  <span class="md-layout-item md-small-size-33">
                    <md-field>
                      <label for="key">Selector key</label>
                      <md-input name="key" id="key" v-model="form.key" :disabled="sending" />
                    </md-field>
                  </span>
                  <span class="md-layout-item md-small-size-33">
                    <md-field>
                      <label for="operator">Operator</label>
                      <md-select name="operator" id="operator" v-model="form.operator" md-dense>
                        <md-option value="=">=</md-option>
                        <md-option value="<">less than</md-option>
                        <md-option value=">">more than</md-option>
                      </md-select>
                    </md-field>
                  </span>
                  <span class="md-layout-item md-small-size-33">
                    <md-field>
                      <label for="value">Selector value</label>
                      <md-input name="value" id="value" v-model="form.value" :disabled="sending" />
                    </md-field>
                  </span>
                  <md-card-actions>
                    <md-button type="submit" class="md-primary">Create selector</md-button>
                  </md-card-actions>
                </div>
              </md-card-content>
            </md-card>
          </form>
        </md-list-item>
        <md-list-item>
          <div class="md-layout md-gutter md-alignment-left">
            <span v-for="selector in selectors" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
              <md-icon>delete</md-icon>{{selector.key}}{{selector.operator}}{{selector.value}}
            </span>
          </div>
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
        form: {

        },
        selectors: [
          {
            key: 'actor.type',
            value: 'Person',
            operator: '='
          },
          {
            key: 'actor.age',
            value: '45',
            operator: '>='
          },
          {
            key: 'object.age',
            value: '45',
            operator: '>='
          },
          {
            key: 'object.type',
            value: 'Person',
            operator: '='
          }
        ]
      };
    }
  };
</script>

<style scoped>

</style>
