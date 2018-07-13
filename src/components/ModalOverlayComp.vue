<template>
  <div class="modal-container">
    <h2>Hello Overlay</h2>
    <input v-model="compNoOfItems" placeholder="0">
    <p><code>noOfItems</code>: {{ compNoOfItems }}</p>

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

    props: {
      noOfItems: {
        required: true
      }
    },

    components: {},

    computed: {
      compNoOfItems: {
        get() {
          return this.$props.noOfItems;
        },
        set(value) {
          // see: https://stackoverflow.com/a/42161533/2741111
          this.$emit('evt_noOfItems', value);
        }
      }
    },

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
