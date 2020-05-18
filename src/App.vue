<template>
  <div id="app">
    <h1>Photo Search</h1>
    <Photos />
  </div>
</template>

<script>
import { Photos } from './containers';

export default {
  name: 'App',
  components: {
    Photos
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}
</style>
