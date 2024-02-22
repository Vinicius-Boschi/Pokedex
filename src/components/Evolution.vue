<template>
  <div class="evolution">
    <div
      class="evolution__item"
      v-for="(evolution, index) in evolutionChain"
      :key="index"
    >
      <div class="evolution__pokemon-info">
        <img
          class="evolution__pokemon"
          :src="evolution.sprites.front_default"
          :alt="evolution.species.name"
        />
        <h1>{{ evolution.species.name }}</h1>
      </div>
      <div v-if="index !== evolutionChain.length - 1">
        <img
          class="evolution__arrow"
          src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/761f79bf-9286-40b1-9260-cf318464caf4"
          alt="arrow"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pokemon"],
  data() {
    return {
      evolutionChain: [],
    }
  },
  async mounted() {
    await this.fetchEvolutionChain(this.pokemon)
  },
  methods: {
    async fetchEvolutionChain(pokemon) {
      if (!pokemon) {
        return
      }
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`
        )
        const data = await response.json()
        const evolutionChainURL = data.evolution_chain.url

        const evolutionChainResponse = await fetch(evolutionChainURL)
        const evolutionChainData = await evolutionChainResponse.json()

        this.evolutionChain = this.parseEvolutionChain(
          evolutionChainData.chain
        )
      } catch (error) {
        console.error("Error fetching evolution chain: ", error)
      }
    },
    parseEvolutionChain(chain) {
      const evolutionChain = []
      let currentEvolution = chain

      while (currentEvolution) {
        evolutionChain.push({
          species: {
            name: currentEvolution.species.name,
            id: currentEvolution.species.url.split("/").slice(-2, -1)[0],
          },
          sprites: {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              currentEvolution.species.url.split("/").slice(-2, -1)[0]
            }.png`,
          },
        })

        currentEvolution = currentEvolution.evolves_to[0]
      }
      return evolutionChain
    },
  },
}
</script>

<style lang="scss">
@import "../assets/variables.scss";
@import "../assets/scss/styles/evolution.scss";
</style>