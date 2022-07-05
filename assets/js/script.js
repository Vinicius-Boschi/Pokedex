import { createPokemonCard } from './card.js'
import { variables } from './variable.js'

let pokemons = []
const pokemons_number = 1

const fetchPokemons = async() => {
	for (let i = 1; i <= pokemons_number; i++) {
  	await getAllPokemons(i)
  }
  pokemons.forEach((pokemon) => createPokemonCard(pokemon)) 
}

const getAllPokemons = async(id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const pokemon = await res.json()
  pokemons = [...pokemons,pokemon]
}

variables.button.addEventListener('click', searchPokemons)
variables.search.addEventListener('keyup', function (event) { 
  console.log(event.key) 
  if(event.keyCode == 13) { 
    searchPokemons()
    return
  }
})

async function searchPokemons() {
  const searchValue = search.value
  if (searchValue != '') { 
    const searchPokemon = await getAllPokemons(searchValue)
    searchPokemon.forEach((pokemon) => createPokemonCard(pokemon))  
  }
}

fetchPokemons()