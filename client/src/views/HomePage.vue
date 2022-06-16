<template>
  <div class="background">
    <DishesList></DishesList>
  </div>
</template>

<script>
import DishesList from '../components/DishesList.vue'

export default {
  name: 'HomePage',
  components: {
    DishesList
  },
}
</script>

<style scoped>
  .background {
      background: transparent;
  }
</style>
