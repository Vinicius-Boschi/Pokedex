<template>
  <header class="header">
    <img :src="imageHeader" :alt="logo" />
  </header>
  <div class="search">
    <form @submit.prevent="handleSearch">
      <input
        type="text"
        placeholder="Procure pelo nome ou número"
        v-model="searchValue"
      />
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["apiUrl"],
  emits: ["setPokemonUrl"],
  data() {
    return {
      searchValue: "",
      imageHeader:
        "https://user-images.githubusercontent.com/74377158/197866871-6c2d8d30-8043-4c80-881c-7ea9c7e7183c.png",
      logo: "Logo Pokémon",
    }
  },
  methods: {
    handleSearch() {
      if (this.searchValue.trim() !== "") {
        const apiUrlWithSearch = `${this.apiUrl}${this.searchValue.trim()}`
        this.$emit("setPokemonUrl", apiUrlWithSearch)
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