<template>
    <header class="header">
        <img :src="imageHeader" :alt="logo">
    </header>
    <div class="search">
        <form @submit.prevent="setPokemonUrl">
            <input type="text" placeholder="Procure pelo nome ou número" v-model="searchValue">
            <button @click="setPokemonUrl">Search</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        props: [
            'apiUrl'
        ],
        data() {
            return {
                searchValue: '',
                imageHeader: 'https://user-images.githubusercontent.com/74377158/197866871-6c2d8d30-8043-4c80-881c-7ea9c7e7183c.png',
                logo: 'Logo Pokémon'
            }
        },
        methods: {
            setPokemonUrl() {
                if (this.searchValue !== '') {
                    this.$emit('setPokemonUrl', this.apiUrl + this.searchValue)
                    this.searchValue = ''
                }
            }
        }
    }
</script>

<style lang="scss">
    .header, form {
        text-align: center;
        background: linear-gradient(to right, rgb(197, 229, 236), rgb(236, 119, 119));

        img {
            width: 15%;
        }

        input {
            margin-bottom: 2rem;
            margin-right: 1rem;
            border: none;
            width: 15rem;
            height: 1rem;
            padding: .5rem;
        }

        button {
            border: none;
            background-color: #0073BC;
            color: #FFF;
            padding: .5rem;
            border-radius: 5px;
            cursor: pointer;
        }
    }
</style>