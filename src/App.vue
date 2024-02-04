<template>
  <Preloader />
  <Pokemons />
</template>

<script>
import Pokemons from "./components/Pokemons.vue";
import Preloader from "./components/Preloader.vue";

export default {
  name: "App",
  components: {
    Pokemons,
    Preloader,
  },
}
</script>

<style lang="scss">
@import "./assets/variables.scss";
@import "./assets/scss/styles/app.scss";
</style>