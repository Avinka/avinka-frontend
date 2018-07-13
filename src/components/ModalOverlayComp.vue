<template>
  <!--
   template for the modal component
   see: https://vuejs.org/v2/examples/modal.html
   -->
  <transition name="modal" appear v-if="overlayIsOn">
    <div class="modal-container">
      Hello Overlay
    </div>
  </transition>
</template>

<script>
  const _data = {
    'overlayIsOn': false,
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

      const _this = this;
      _this.$nextTick(() => {
        // Code that will run only after the
        // entire view has been rendered

        setTimeout(() => {
          console.log('ModalOverlayComp turned ON');
          _this.overlayIsOn = true;
        }, 200);
      });
    }

  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $modal_width: 450px;
  $modal_height: 350px;
  $modal_z_index: 10000;

  .modal-container {
    width: $modal_width;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
