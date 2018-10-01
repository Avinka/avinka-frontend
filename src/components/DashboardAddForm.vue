<template>
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
</template>

<script>
  export default {
    name: 'DashboardAddForm'
  };
</script>

<style scoped>

</style>
