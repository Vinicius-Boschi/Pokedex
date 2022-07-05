import { variables } from './variable.js'
import { changeColors } from './changeColors.js'
import { aboutContent } from './content.js'

function createPokemonCard(pokemon) {
	const {id, name, types, height, weight } = pokemon
  const { ability }  = pokemon.abilities[0]
 	const typesArray = []
  types.forEach((type) => {
    typesArray.push(type.type.name)
  })
  const typesText = typesArray.join(" / ")
  changeColors(typesArray[0])

  const hp = pokemon.stats[0].base_stat
  const attack = pokemon.stats[1].base_stat
  const defense = pokemon.stats[2].base_stat
  const spAttack = pokemon.stats[3].base_stat
  const spDefense = pokemon.stats[4].base_stat
  const speed = pokemon.stats[5].base_stat

  variables.image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  variables.idPokemon.innerText = 'N° Pokedéx ' + id
  variables.namePokemon.innerText = 'Name: ' + name
  variables.type.innerText = 'Type: ' + typesText
  variables.heightPokemon.innerText = 'Height: ' + height + ' m'
  variables.weightPokemon.innerText = 'Weight: ' + weight + ' kg'
  variables.abilities.innerText = 'Abilities: ' + ability.name
  variables.hpPokemon.innerText = 'HP: ' + hp
  variables.attackPokemon.innerText = 'Attack: ' + attack
  variables.defensePokemon.innerText = 'Defense: ' + defense
  variables.spAttackPokemon.innerText = 'Special Attack: ' + spAttack
  variables.spDefensePokemon.innerText = 'Special Defense: ' + spDefense
  variables.speedPokemon.innerText = 'Speed: ' + speed
}

export { createPokemonCard }