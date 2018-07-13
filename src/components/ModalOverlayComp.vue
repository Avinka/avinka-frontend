<template>
  <div class="modal-container">
    <h2>Hello Overlay</h2>
    <button class="modal-default-button" @click="$emit('close')">
      OK
    </button>
  </div>
</template>

<script>
  const _data = {
    base: process.env.ASSETS_PUBLIC_PATH
  };

  export default {
    name: 'ModalOverlayComp',

    data () {
      return _data;
    },

    components: {},

    methods: {},

    /**
     * VueJS managed function
     */
    mounted () {
      console.log('ModalOverlayComp mounted');
    }
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .modal-container {
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
