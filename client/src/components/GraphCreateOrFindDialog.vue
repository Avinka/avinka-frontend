  <template>
  <div>
    <md-dialog :md-active.sync="showAddGraphDialogProp">
      <md-dialog-title>Add a graph</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Create">
          <graph-add-form v-on:graph-created="onGraphCreated"></graph-add-form>
        </md-tab>
        <md-tab md-label="Find">
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
    name: 'GraphCreateOrFindDialog',
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
    },
    methods: {
      onGraphCreated(event) {
        this.$log.debug('Got an event', event);
        this.$log.debug('Rethrowing to parent');
        this.$emit('graph-created', event);
        this.showAddGraphDialogProp = !this.showAddGraphDialogProp;
      }
    }
  };
</script>

<style scoped>

</style>
