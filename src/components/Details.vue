<template>
  <div class="container" v-if="pokemon">
    <a class="container__link" href="/">
      <img
        src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/969a6363-7f12-41d1-9e83-97ba6c3be8d2"
        alt="home"
      />
    </a>
    <div class="container__back">
      <h1 class="container__back-name">{{ pokemon.name }}</h1>
    </div>
    <div class="container__content">
      <img
        class="container__image"
        :src="imageUrl + (pokemon ? pokemon.id + '.png' : '')"
        :alt="pokemon ? pokemon.name : ''"
      />
      <div>
        <h2 class="container__card-title">{{ pokemon.name }}</h2>
        <div class="container__types">
          <div
            class="container__type"
            v-for="(value, index) in pokemon.types"
            :key="index"
          >
            <span :class="value.type.name">{{ value.type.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <Accordion :imageUrl="imageUrl" :pokemon="pokemon" :key="pokemon.id" />
  </div>
  <div v-else>
    <p>Carregando informações do Pokémon...</p>
  </div>
</template>

<script>
import Accordion from "./Accordion.vue"

export default {
  name: "Details",
  props: ["imageUrl", "id"],
  components: {
    Accordion,
  },
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
        this.types = pokemonData.types || []
        this.pokemon = pokemonData
        this.$emit("pokemon-loaded", pokemonData)
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