<template>
  <div id="app">
    <my-add></my-add>
    <p>-------------------</p>
    <my-sub></my-sub>
  </div>
</template>

<script>
import Add from './components/Add.vue'
import Sub from './components/Sub.vue'
export default {
  name: 'App',
  components: {
    'my-add': Add,
    'my-sub': Sub
  }
}
</script>

<style>
</style>
