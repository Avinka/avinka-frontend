<template>
  <div class='generate'>
    <h2>
      <router-link to="/">Go Back</router-link>
    </h2>
    <button v-on:click="generateData()">Generate Data</button>
  </div>
</template>

<script>
  const elasticsearch = require('elasticsearch');

  const client = new elasticsearch.Client({
    // this is proxied to elasticsearch
    hosts: [window.location.protocol + '//' + window.location.host + '/ES']
  });

  async function generateData(client) {
    const requestBody = {
      'actor': {
        'id': 'P:123',
        'type': 'Person'
      },
      'object': {
        'id': 'Bot:123',
        'type': 'Bot'
      },
      'type': 'Login',
      'published': ''// '2018-06-01T12:12:17'
    };

    for (let i = 0; i < 10000; i++) {
      const randomIntHour = getRandomInt(1, 23);
      const hour = randomIntHour < 10 ? '0' + randomIntHour : randomIntHour;

      const randomIntMinute = getRandomInt(1, 59);
      const minute = randomIntMinute < 10 ? '0' + randomIntMinute : randomIntMinute;

      const randomIntSecond = getRandomInt(1, 59);
      const second = randomIntSecond < 10 ? '0' + randomIntSecond : randomIntSecond;
      requestBody.published = '2018-06-01T' + hour + ':' + minute + ':' + second;
      await client.create({
        index: 'active-objects-current',
        id: new Date().getTime(),
        type: 'doc',
        body: requestBody
      });
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  export default {
    name: 'GenerateActiveObjects',
    components: {
    },
    data() {
      return {};
    },
    methods: {
      generateData() {
        generateData(client);
      }
    },

    /**
     * this happens each time we render the component (e.g. enter the route)
     */
    watch: {
    },
    mounted() {
      // generateData(client);
    }
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
