import { createPokemonCard } from './card.js'
import { variables } from './variable.js'

let pokemons = []

const fetchPokemons = async() => {
  await getAllPokemons(Math.round(Math.random() * 899))
  pokemons.forEach((pokemon) => createPokemonCard(pokemon)) 
}

const getAllPokemons = async(id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const pokemon = await res.json()
  pokemons = [...pokemons,pokemon]
  return pokemons
}

variables.search.addEventListener('keyup', function (event) { 
  if(event.keyCode == 13) { 
    searchPokemons()
    return
  }
})

async function searchPokemons() {
  const searchValue = variables.search.value
  if (searchValue != '') { 
    const searchPokemon = await getAllPokemons(searchValue)
    searchPokemon.forEach(pokemon => createPokemonCard(pokemon)) 
  }
}

fetchPokemons()