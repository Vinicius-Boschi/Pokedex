<template>
  <div class="search">
    <form @submit.prevent="handleSearch">
      <input
        type="text"
        placeholder="Qual Pokémon você procura?"
        v-model="searchValue"
      />
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