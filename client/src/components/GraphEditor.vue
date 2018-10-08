<template>
    <div>
      <div>
        <md-list>
          <md-list-item>
            Selectors:
          </md-list-item>
          <md-list-item>
            <div class="md-layout md-gutter md-alignment-left">
              <div v-for="selector in selectors" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <md-icon>delete</md-icon>{{selector.key}}{{selector.operator}}{{selector.value}}
              </div>
            </div>
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
          },
          {
            key: 'object.age',
            value: '45',
            operator: '>='
          },
          {
            key: 'object.type',
            value: 'Person',
            operator: '='
          }
        ]
      };
    }
  };
</script>

<style scoped>

</style>
