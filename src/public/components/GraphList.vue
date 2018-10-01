<template>
  <div>
    <graph v-for="graph in graphs" :graph="graph"></graph>
  </div>
</template>

<script>
  import Graph from './Graph';

  export default {
    name: 'GraphList',
    components: {
      Graph
    },
    data() {
      return {
        meta: {
          title: 'New hot graphs'
        },
        graphs: [
          {
            id: 1,
            title: 'User log in Application'
          },
          {
            id: 2,
            title: 'User follow User'
          },
          {
            id: 3,
            title: 'User removes Right User'
          }
        ]
      };
    },
    methods: {},
    watch: {},
    mounted() {
    }
  };
</script>

