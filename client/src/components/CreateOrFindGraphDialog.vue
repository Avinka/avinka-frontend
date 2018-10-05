<template>
  <div>
    <md-dialog :md-active.sync="showAddGraphDialogProp">
      <md-dialog-title>Add a graph</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Find">
        </md-tab>

        <md-tab md-label="Create">
          <graph-add-form></graph-add-form>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showAddGraphDialogProp=false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import GraphAddForm from '@/components/GraphAddForm';

  export default {
    name: 'CreateOrFindGraphDialog',
    props: ['showAddGraphDialogProp'],
    components: {
      GraphAddForm
    },
    computed: {
      showAddGraphDialog () {
        console.log('here');
        console.log(typeof this.showAddGraphDialogProp);
        if (this.showAddGraphDialogProp != null) {
          return this.showAddGraphDialogProp;
        }
        return false;
      }
    }
  };
</script>

<style scoped>

</style>
