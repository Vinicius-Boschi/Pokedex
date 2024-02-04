<template>
  <header class="header">
    <img :src="imageHeader" :alt="logo" />
  </header>
  <div class="search">
    <form @submit.prevent="setPokemonUrl">
      <input
        type="text"
        placeholder="Procure pelo nome ou número"
        v-model="searchValue"
      />
      <button @click="setPokemonUrl">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["apiUrl"],
  data() {
    return {
      searchValue: "",
      imageHeader:
        "https://user-images.githubusercontent.com/74377158/197866871-6c2d8d30-8043-4c80-881c-7ea9c7e7183c.png",
      logo: "Logo Pokémon",
    }
  },
  methods: {
    setPokemonUrl() {
      if (this.searchValue !== "") {
        this.$emit("setPokemonUrl", this.apiUrl + this.searchValue)
        this.searchValue = ""
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/variables.scss";
@import "../assets/scss/styles/search.scss";
</style>