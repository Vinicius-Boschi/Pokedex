<template>
  <Preloader />
  <Pokemons />
</template>

<script>
  import Pokemons from './components/Pokemons.vue'
  import Preloader from './components/Preloader.vue'

  export default {
    name: 'App',
    components: {
      Pokemons,
      Preloader
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', serif;
  }

</style>