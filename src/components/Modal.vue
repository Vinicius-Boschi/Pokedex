<template>
    <div class="detail">
        <div class="detail-view" v-if="showModal">
            <div class="image" v-if="pokemon">
                <img :src="imageUrl + pokemon.id + '.png'" :alt="pokemon.name">
            </div>
            <div class="data" v-if="pokemon">
                <h2 class="card-title">{{ pokemon.id }} - {{ pokemon.name }}</h2>
                <div class="property">
                    <span class="left">Altura</span>
                    <span class="right">{{ pokemon.height / 10 + ' m' }}</span>
                </div>
                <div class="property">
                    <span class="left">Peso</span>
                    <span class="right">{{ pokemon.weight / 10 + ' kg' }}</span>
                </div>
                <h2 class="card-title">Tipos</h2>
                <div class="types">
                    <div class="type" v-for="(value, index) in pokemon.types" :key="index">
                        <span :class="value.type.name">{{ value.type.name }}</span>   
                    </div>
                </div>
                <h2 class="card-title">Habilidades</h2>
                <div class="abilities">
                    <div class="ability" v-for="(value, index) in pokemon.abilities" :key="index">
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
    import Loading from './Loading.vue'

    export default {
        name: 'Modal',
        props: [
            "imageUrl", 
            "pokemonUrl"
        ],
        components: {
            Loading
        },
        data() {
            return {
                showModal: false,
                pokemon: {}
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
                this.$emit('closeModal')
            }
        },
        created() {
            this.fetchData()
        }
    }
</script>

<style lang="scss">
    @import '../assets/variables.scss';

    .detail {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: fixed;
        top: 0;
        left: 0;
        padding: 65px 10px 10px;
        width: 100%;
        height: 100vh;
        background: $black-two;    
        overflow: scroll;
    }

    .detail-view {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 54vw;
        position: relative;
        max-width: 510px;   
        background-color: $white;
        border-radius: 5px;
        box-shadow: 0 15px 30px $black-three, 0 10px 10px $black-three;;   
        
        @include phone {
            width: 90%;
        }
    }

    .image {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -60px;
        width: 120px;
        height: 120px;
        background-color: $blue;
        border-radius: 50%;
        box-shadow: 0 15px 30px $black-three, 0 10px 10px $black-three;

        img {
            width: 100%;
        }
    }

    .data {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    h2 {
        text-transform: capitalize;
    }

    .property, .status {
        width: 90%;
        max-width: 400px;
        border-bottom: 1px solid $light-gray-two;
        margin-bottom: 10px;
    }

    .left { 
        float: left; 
    }

    .right { 
        float: right; 
    }

    .types {
        .grass { background: $grass;}
        .poison { background: $poison;}
        .water { background: $water;}
        .dragon { background: $dragon;}
        .ice { background: $ice;}
        .flying { background: $flying;}
        .fire { background:$fire;}
        .ghost { background: $ghost;}
        .fighting { background: $fighting;}
        .normal { background: $normal;}
        .psychic { background: $psychic;}
        .bug { background: $bug;}
        .dark { background: $dark;}
        .steel { background: $steel;}
        .fairy { background: $fairy;}
        .electric { background: $electric;}
        .rock { background: $rock;}
        .ground { background: $ground;}
    }

    .types, .abilities {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
        max-width: 410px;
    }

    .type { 
        margin: 0 0 10px 0;
        padding: 5px 10px;
        font-weight: bold;
        font-size: 1rem;
        letter-spacing: 2px;
        text-transform: capitalize;
            
        span {
            color: $white;            
            padding: 10px 14px;
            border-radius: 29px;   
        }
    }
        
    .ability {
        color: $green;
        margin: 0 10px 10px 0;
        border-radius: 20px;
        padding: 5px 10px;
        font-weight: bold;
        font-size: 1rem;
        letter-spacing: 2px;
        text-transform: capitalize;
        word-wrap: none;
        word-break: keep-all;
        background-color: $white;
        border: 3px solid;
    }
      
    .close {
        outline: none;
        border: none;
        border-radius: 5px;
        background-color: $red;
        color: $white-two;
        padding: 10px 20px;
        margin-bottom: 20px;
        margin-top: 20px;
        font-size: 1.2rem;
        cursor: pointer;
    }

    i.fa-spinner {
        text-align: center;
    }

    i {
        font-size: 2rem;
        color: $white-two;
    }

</style>