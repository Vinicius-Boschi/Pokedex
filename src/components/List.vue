<template>
  <div class="list">
    <article
      class="list__article"
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      @click="setPokemonUrl(pokemon.id)"
    >
      <img :src="imageUrl + pokemon.id + '.png'" :alt="pokemon.name" />
      <h3>{{ pokemon.name }}</h3>
    </article>
    <div id="scroll-trigger" ref="infinitescrolltrigger">
      <Loading />
    </div>
  </div>
</template>

<script>
import Loading from "./Loading.vue"

export default {
  name: "List",
  props: ["imageUrl", "apiUrl"],
  components: {
    Loading,
  },
  data() {
    return {
      pokemons: [],
      nextUrl: "",
      currentUrl: "",
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(this.currentUrl)

        if (!response.ok) {
          throw new Error(
            `Erro na solicitação: ${response.status} ${response.statusText}`
          )
        }

        const { next, results } = await response.json()
        this.nextUrl = next

        results.forEach((pokemon) => {
          pokemon.id = pokemon.url.split("/").filter(Boolean).pop()
          this.pokemons.push(pokemon)
        })
      } catch (error) {
        console.error(error)
      }
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ intersectionRatio }) => {
          if (intersectionRatio > 0 && this.nextUrl) {
            this.next()
          }
        })
      })
      observer.observe(this.$refs.infinitescrolltrigger)
    },
    next() {
      this.currentUrl = this.nextUrl
      this.fetchData()
    },
    setPokemonUrl(id) {
      this.$router.push({ name: "Details", params: { id } })
    },
  },
  created() {
    this.currentUrl = this.apiUrl
    this.fetchData()
  },
  mounted() {
    this.scrollTrigger()
  },
}
</script>

<style lang="scss">
@import "../assets/variables.scss";
@import "../assets/scss/styles/list.scss";
</style>