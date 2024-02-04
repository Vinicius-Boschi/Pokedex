<template>
  <div class="container" v-if="pokemon">
    <div class="back">
      <h1 class="back-name">{{ pokemon.name }}</h1>
    </div>
    <div class="content">
      <img
        class="image"
        :src="imageUrl + (pokemon ? pokemon.id + '.png' : '')"
        :alt="pokemon ? pokemon.name : ''"
      />
      <div>
        <h2 class="card-title">{{ pokemon.name }}</h2>
        <div class="types">
          <div
            class="type"
            v-for="(value, index) in pokemon.types"
            :key="index"
          >
            <span :class="value.type.name">{{ value.type.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Carregando informações do Pokémon...</p>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: ["imageUrl", "id"],
  data() {
    return {
      pokemon: null,
    };
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
        this.types = pokemonData.types || []
        this.pokemon = pokemonData
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error)
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";
@import "../assets/scss/styles/details.scss";
</style>