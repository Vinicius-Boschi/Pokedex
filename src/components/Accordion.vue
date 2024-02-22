<template>
  <section class="accordion">
    <div class="accordion__about-center">
      <article class="accordion__about">
        <div class="accordion__btn-container">
          <button
            class="accordion__tab-btn"
            :class="{ active: activeTab === 'about' }"
            @click="activeTab = 'about'"
          >
            about
          </button>
          <button
            class="accordion__tab-btn"
            :class="{ active: activeTab === 'stats' }"
            @click="activeTab = 'stats'"
          >
            stats
          </button>
          <button
            class="accordion__tab-btn"
            :class="{ active: activeTab === 'evolution' }"
            @click="activeTab = 'evolution'"
          >
            evolution
          </button>
        </div>
      </article>
      <article class="accordion__about-content">
        <div
          class="accordion__content"
          id="about"
          v-show="activeTab === 'about'"
        >
          <div>
            <h1>abilities:</h1>
            <p v-for="(ability, index) in pokemon.abilities" :key="index">
              {{ ability.ability.name }}
            </p>
          </div>
          <div>
            <h1>height:</h1>
            <p>{{ pokemon.height / 10 }} m</p>
          </div>
          <div>
            <h1>weight:</h1>
            <p>{{ pokemon.weight / 10 }} kg</p>
          </div>
          <div>
            <h1>experience:</h1>
            <p>{{ pokemon.base_experience }}</p>
          </div>
          <div>
            <h1>species:</h1>
            <p>{{ pokemon.species.name }}</p>
          </div>
          <div>
            <h1>weakness:</h1>
            <div class="accordion__weakness">
              <div
                class="accordion__weak"
                v-for="(weakness, index) in weaknesses"
                :key="index"
              >
                <span :class="weakness">{{ weakness }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="accordion__content stats"
          id="stats"
          v-show="activeTab === 'stats'"
        >
          <div v-for="(stat, index) in pokemon.stats" :key="index">
            <h1>{{ stat.stat.name }}:</h1>
            <p>{{ stat.base_stat }}</p>
          </div>
        </div>
        <div id="evolution" v-show="activeTab === 'evolution'">
          <Evolution :pokemon="pokemon" />
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import Evolution from "./Evolution.vue"

export default {
  name: "Accordion",
  props: ["imageUrl", "pokemon"],
  components: {
    Evolution,
  },
  data() {
    return {
      activeTab: "about",
      weaknesses: [],
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
    async onMounted() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.pokemon.id}`
        )
        const pokemonData = await response.json()
        const types = pokemonData.types.map((type) => type.type.name)
        const weaknesses = await Promise.all(
          types.map(async (type) => {
            const response = await fetch(
              `https://pokeapi.co/api/v2/type/${type}`
            )
            const typeData = await response.json()
            return typeData.damage_relations.double_damage_from.map(
              (weakness) => weakness.name
            )
          })
        )
        this.weaknesses = weaknesses.flat()
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error)
      }
    },
  },
  mounted() {
    this.onMounted()
  },
}
</script>

<style lang="scss">
@import "../assets/variables.scss";
@import "../assets/scss/styles/accordion.scss";
</style>