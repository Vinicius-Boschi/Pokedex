<template>
  <div class="detail">
    <div class="detail-view" v-if="showModal">
      <div class="image" v-if="pokemon">
        <img :src="imageUrl + pokemon.id + '.png'" :alt="pokemon.name" />
      </div>
      <div class="data" v-if="pokemon">
        <h2 class="card-title">{{ pokemon.id }} - {{ pokemon.name }}</h2>
        <div class="property">
          <span class="left">Altura</span>
          <span class="right">{{ pokemon.height / 10 + " m" }}</span>
        </div>
        <div class="property">
          <span class="left">Peso</span>
          <span class="right">{{ pokemon.weight / 10 + " kg" }}</span>
        </div>
        <h2 class="card-title">Tipos</h2>
        <div class="types">
          <div
            class="type"
            v-for="(value, index) in pokemon.types"
            :key="index"
          >
            <span :class="value.type.name">{{ value.type.name }}</span>
          </div>
        </div>
        <h2 class="card-title">Habilidades</h2>
        <div class="abilities">
          <div
            class="ability"
            v-for="(value, index) in pokemon.abilities"
            :key="index"
          >
            {{ value.ability.name }}
          </div>
        </div>
        <h2 class="card-title">Status</h2>
        <div class="status">
          <span class="left">HP</span>
          <span class="right">{{ pokemon.stats[0].base_stat }}</span>
        </div>
        <div class="status">
          <span class="left">Ataque</span>
          <span class="right">{{ pokemon.stats[1].base_stat }}</span>
        </div>
        <div class="status">
          <span class="left">Defesa</span>
          <span class="right">{{ pokemon.stats[2].base_stat }}</span>
        </div>
        <div class="status">
          <span class="left">Ataque Especial</span>
          <span class="right">{{ pokemon.stats[3].base_stat }}</span>
        </div>
        <div class="status">
          <span class="left">Defesa Especial</span>
          <span class="right">{{ pokemon.stats[4].base_stat }}</span>
        </div>
        <div class="status">
          <span class="left">Velocidade</span>
          <span class="right">{{ pokemon.stats[5].base_stat }}</span>
        </div>
      </div>
      <h2 v-else>O pokémon não foi encontrado</h2>
      <button class="close" @click="closeModal">Fechar</button>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import Loading from "./Loading.vue"

export default {
  name: "Modal",
  props: ["imageUrl", "pokemonUrl"],
  components: {
    Loading,
  },
  data() {
    return {
      showModal: false,
      pokemon: {},
    }
  },
  methods: {
    fetchData() {
      let req = new Request(this.pokemonUrl)
      fetch(req)
        .then((resp) => {
          return resp.json()
        })
        .then((data) => {
          this.pokemon = data
          this.showModal = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeModal() {
      this.$emit("closeModal")
    },
  },
  created() {
    this.fetchData()
  },
}
</script>

<style lang="scss">
@import "../assets/variables.scss";
@import "../assets/scss/styles/modal.scss";
</style>