<template>
  <div class="container" id="details">
    <div v-if="pokemon">
      <img :src="imageUrl + pokemon.id + '.png'" :alt="pokemon.name" />
      <h3>{{ pokemon.name }}</h3>
    </div>
    <div v-else>
      <p>Carregando informações do Pokémon...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: ["imageUrl", "id"],
  data() {
    return {
      pokemon: null,
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId !== undefined) {
          this.fetchPokemonDetails(newId)
        }
      },
    },
  },
  methods: {
    async fetchPokemonDetails(id) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!response.ok) {
          throw new Error(
            `Erro na solicitação: ${response.status} ${response.statusText}`
          )
        }
        const pokemonData = await response.json()
        this.pokemon = pokemonData
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/variables.scss";
@import "../assets/scss/styles/details.scss";
</style>