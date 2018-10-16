<template>
  <form class="md-layout" @submit.prevent="validateSelector">
    <md-card class="md-layout-item md-size-100 md-small-size-100">
      <md-card-content>
        <div class="md-layout md-gutter">
          <span class="md-layout-item md-small-size-33">
            <md-field>
              <label for="key">Selector key</label>
              <md-input name="key" id="key" v-model="form.key"/>
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
              <md-input name="value" id="value" v-model="form.value"/>
            </md-field>
          </span>
          <md-progress-bar md-mode="indeterminate" v-if="sending"/>
          <md-card-actions>
            <md-button type="submit" :disabled="sending" class="md-primary">Create selector</md-button>
          </md-card-actions>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
  export default {
    name: 'SelectorAddForm',
    props: ['dataseries'],
    data() {
      return {
        sending: false,
        form: {}
      };
    },
    methods: {
      async validateSelector() {
        await this.saveSelector();
      },
      async saveSelector() {
        const newSelector = await this.$store.dispatch('graphStore/addSelectorToDataseries', {
          selector: {
            key: this.form.key,
            value: this.form.value,
            operator: this.form.operator
          },
          dataseriesId: this.dataseries._id
        });
      }
    }
  };
</script>

<style scoped>

</style>
