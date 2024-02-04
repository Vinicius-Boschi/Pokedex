<template>
  <div class="container" id="home">
    <Search :apiUrl="apiUrl" @setPokemonUrl="setPokemonUrl" />
    <List
      :imageUrl="imageUrl"
      :apiUrl="apiUrl"
      @setPokemonUrl="setPokemonUrl"
    />
    <Modal
      v-if="showModal"
      :imageUrl="imageUrl"
      :pokemonUrl="pokemonUrl"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import List from "./List.vue"
import Modal from "./Modal.vue"
import Search from "./Search.vue"

export default {
  name: "Pokemons",
  components: {
    Search,
    List,
    Modal,
  },
  data() {
    return {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonUrl: "",
      showModal: false,
    }
  },
  methods: {
    setPokemonUrl(url) {
      this.pokemonUrl = url
      this.showModal = true
    },
    closeModal() {
      this.pokemonUrl = ""
      this.showModal = false
    },
  },
}
</script>