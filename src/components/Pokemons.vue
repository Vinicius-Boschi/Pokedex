<template>
  <div class="container" id="home">
    <Search :apiUrl="apiUrl" @setPokemonUrl="setPokemonUrl" />
    <router-view :imageUrl="imageUrl" :apiUrl="apiUrl" :types="types" />
  </div>
</template>

<script>
import List from "./List.vue"
import Details from "./Details.vue"
import Search from "./Search.vue"

export default {
  name: "Pokemons",
  components: {
    Search,
    List,
    Details,
  },
  data() {
    return {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      types: [],
    }
  },
  methods: {
    setPokemonUrl(url) {
      const id = url.split("/").filter(Boolean).pop()
      this.$router.push({ path: `/details/${id}` })
    },
  },
}
</script>