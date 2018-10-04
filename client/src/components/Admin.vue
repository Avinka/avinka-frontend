<template>
  <div class='admin'>
    <button v-on:click="generateData()">Generate Data</button>
    <button v-on:click="deleteData()">Delete Data</button>
    <button v-on:click="deleteIndex()">Delete Index</button>
  </div>
</template>

<script>
  import adminService from '../api/admin.js';

  export default {
    name: 'Admin',
    components: {},
    data() {
      return {};
    },
    methods: {
      generateData() {
        adminService.generateData();
      },
      deleteData() {
        adminService.deleteData();
      },
      deleteIndex() {
        adminService.deleteIndex();
      }
    },

  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .echarts {
    width: 80%;
    height: 800px;
    margin: 0 auto;
  }

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
