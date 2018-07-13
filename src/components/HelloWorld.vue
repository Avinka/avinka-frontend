<template>
  <div class="hello">

    <h1>{{ msg }}</h1>
    <ul>
      <li><button id="show-modal" @click="showModal()">Show Modal</button></li>
      <li><router-link to="/demo06">Demo 06</router-link></li>
    </ul>

    <modals-container/>
  </div>
</template>

<script>
import VModal from 'vue-js-modal';
import ModalOverlayComp from '@/components/ModalOverlayComp';

const _data = {
  msg: 'Welcome to Your Vue.js App'
};

export default {
  name: 'HelloWorld',
  data () {
    return _data;
  },
  // add here, what Vue should load for us
  components: {
    // TODO andi: this does not work, we need to put it in `main.js`
    VModal
  },
  methods: {
    showModal() {
      // sweet, load our component in the managed overlay here
      this.$modal.show(ModalOverlayComp);
    }
  }
};
</script>

<style lang="scss">
  $modal_width: 450px;
  $modal_height: 350px;
  $modal_z_index: 10000;

  .v--modal-box {
    border-radius: 2px;
    box-shadow: 0 2px 18px rgba(188, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

</style>

<style scoped>
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


