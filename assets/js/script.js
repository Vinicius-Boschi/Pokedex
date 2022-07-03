import {search, button, image, idPokemon, namePokemon, type, heightPokemon, weightPokemon, abilities, hpPokemon, attackPokemon, defensePokemon, spAttackPokemon, spDefensePokemon, speedPokemon} from './variable.js'
import { changeColors } from './changeColors.js'
import { aboutContent } from './content.js'

let results = {
    fetchResults: function(name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
            if (!response.ok) {
                alert("Nenhum pokemón encontrado!")
                throw new Error("Nenhum pokemón encontrado!")
            }
            return response.json()
        })
        .then((pokemon) => this.displayResults(pokemon))
    },

    displayResults: function(info) {
        const { id, name, types, height, weight } =  info
        const { ability }  = info.abilities[0]
        const typesArray = []
        const hp = info.stats[0].base_stat
        const attack = info.stats[1].base_stat
        const defense = info.stats[2].base_stat
        const spAttack = info.stats[3].base_stat
        const spDefense = info.stats[4].base_stat
        const speed = info.stats[5].base_stat
        
        types.forEach((type) => {
            typesArray.push(type.type.name)
        })
        changeColors(typesArray[0])
        const typesText = typesArray.join(" / ")

        image.src =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        idPokemon.textContent = 'N° Pokedéx ' + '#0' + id
        namePokemon.textContent = 'Name: ' + name
        type.textContent = 'Type: ' + typesText
        heightPokemon.textContent = 'Height: ' + '0.' + height + ' m'
        weightPokemon.textContent = 'Weight: ' + weight + ' kg'
        abilities.textContent = 'Abilities: ' + ability.name
        hpPokemon.textContent = 'HP: ' + hp
        attackPokemon.textContent = 'Attack: ' + attack
        defensePokemon.textContent = 'Defense: ' + defense
        spAttackPokemon.textContent = 'Special Attack: ' + spAttack
        spDefensePokemon.textContent = 'Special Defense: ' + spDefense
        speedPokemon.textContent = 'Speed: ' + speed
    },

    search: function() {
        this.fetchResults(search.value)
    }
}

results.fetchResults('bulbasaur')

button.addEventListener('click', search)
search.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        results.search()
        return
    }
})