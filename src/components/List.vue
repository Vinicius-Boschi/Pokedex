<template>
  <div class="list">
    <article class="article" v-for="(pokemon, index) in pokemons" :key="'poke' + index" @click="setPokemonUrl(pokemon.url)">
        <img :src="imageUrl + pokemon.id + '.png'" :alt="pokemon.name">
        <h3>{{ pokemon.name }}</h3>
    </article>
    <div id="scroll-trigger" ref="infinitescrolltrigger">
      <Loading />
    </div>
  </div>
</template>

<script>
    import Loading from './Loading.vue'

    export default {
        name: 'List',
        props: [
            "imageUrl", 
            "apiUrl"
        ],
        components: {
            Loading
        },
        data() {
            return {
                pokemons: [],
                nextUrl: "",
                currentUrl: ""
            }
        },
        methods: {
            fetchData() {
                let req = new Request(this.currentUrl)
                fetch(req)
                    .then((resp) => {
                        return resp.json()
                    })
                    .then((data) => {
                        this.nextUrl = data.next
                        data.results.forEach(pokemon => {
                            pokemon.id = pokemon.url.split("/")
                            .filter(function(part) {
                                return !!part
                            }).pop()
                            this.pokemons.push(pokemon)
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            scrollTrigger() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio > 0 && this.nextUrl) {
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
            setPokemonUrl(url) {
                this.$emit("setPokemonUrl", url)
            },
        },
        created() {
            this.currentUrl = this.apiUrl
            this.fetchData()
        },
        mounted() {
            this.scrollTrigger()
        }
    }
</script>

<style lang="scss">
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background: #EFEFBB;
        background: linear-gradient(to right, rgb(197, 230, 236), rgb(239, 187, 230));

        article {
            width: 250px;
            height: 250px;
            margin: 10px;
            margin-top: 2rem;
            background-color: rgba(255, 255, 255, 0.722);
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            text-transform: capitalize;
            letter-spacing: 3px;

            img {
                width: 100px;
                height: 100px;
            }

            &:hover {
                animation: bounce 0.5s linear;
            }
        }
    }
</style>