<template>
  <div class="modal-container">
    <h2>Chart Configuration</h2>
    <div><code>noOfItems</code>: <input v-model="compNoOfItems" placeholder="1000"></div>
    <div><code>divident</code>: <input v-model="compDivident" placeholder="1"></div>

    <button class="modal-ok-button" @click="$emit('close')">Done</button>
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
      },
      divident: {
        required: false,
        default: 1
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
      },
      compDivident: {
        get() {
          return this.$props.divident;
        },
        set(value) {
          this.$emit('evt_divident', value);
        }
      }
    },

    methods: {},

    /**
     * VueJS managed function
     */
    mounted () {
      this.$log.debug('ModalOverlayComp mounted');
    }
  };
</script>
