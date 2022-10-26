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
        background: rgba(10, 7, 0, 0.562);    
    }

    .detail-view {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 50px 0 0;
        position: relative;
        max-width: 510px;   
        background-color: #FFF;
        border-radius: 5px;
        box-shadow: 0 15px 30px rgba(0,0,0,.2), 0 10px 10px rgba(0,0,0,.2);      
    }

    .image {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -60px;
        width: 120px;
        height: 120px;
        background-color: #0073BC;
        border-radius: 50%;
        box-shadow: 0 15px 30px rgba(0,0,0,.2), 0 10px 10px rgba(0,0,0,.2);

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
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
    }

    .left { 
        float: left; 
    }

    .right { 
        float: right; 
    }

    .types {
        .grass { background: hsl(142, 59%, 55%);}
        .poison { background: rgb(92, 39, 157);}
        .water { background: rgb(70, 70, 235);}
        .dragon { background:rgb(27, 2, 68);}
        .ice { background:rgb(78, 199, 255);}
        .flying { background:rgb(145, 215, 255);}
        .fire { background:#ee8711;}
        .ghost { background:rgb(74, 52, 87);}
        .fighting { background:rgb(122, 0, 0);}
        .normal { background:rgb(104, 104, 104);}
        .psychic { background:rgb(195, 0, 255);}
        .bug { background:rgb(52, 87, 6);}
        .dark { background:rgb(43, 43, 43);}
        .steel { background:rgb(116, 116, 116);}
        .fairy { background:rgb(248, 165, 237);}
        .electric { background:rgb(255, 217, 1);}
        .rock { background:rgb(88, 95, 100);}
        .ground { background:rgb(92, 70, 70);}
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
            color: #FFF;            
            padding: 10px 14px;
            border-radius: 29px;   
        }
    }
        
    .ability {
        color: rgb(10, 119, 10);
        margin: 0 10px 10px 0;
        border-radius: 20px;
        padding: 5px 10px;
        font-weight: bold;
        font-size: 1rem;
        letter-spacing: 2px;
        text-transform: capitalize;
        word-wrap: none;
        word-break: keep-all;
        background-color: #FFF;
        border: 3px solid;
    }
      
    .close {
        outline: none;
        border: none;
        border-radius: 5px;
        background-color: #C73015;
        color: #efefef;
        padding: 10px 20px;
        margin-bottom: 20px;
        font-size: 1.2rem;
        cursor: pointer;
    }

    i.fa-spinner {
        text-align: center;
    }

    i {
        font-size: 2rem;
        color: #efefef;
    }

</style>