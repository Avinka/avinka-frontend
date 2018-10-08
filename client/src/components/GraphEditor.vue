<template>
    <div>
      Graph Editor here - EZ - edit {{graph.name}}
      <div>
        <md-list class="md-double-line" style="display: inline;">
          <md-subheader>Selectors:</md-subheader>
          <md-list-item v-for="selector in selectors">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">{{selector.key}}{{selector.operator}}{{selector.value}}</span>
          </md-list-item>
        </md-list>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'GraphEditor',
    props: ['graph'],
    data() {
      return {
        selectors: [
          {
            key: 'actor.type',
            value: 'Person',
            operator: '='
          },
          {
            key: 'actor.age',
            value: '45',
            operator: '>='
          }
        ]
      };
    }
  };
</script>

<style scoped>

</style>
