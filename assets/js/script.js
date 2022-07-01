import {search, button, btns, about, articles, image, idPokemon, namePokemon, type} from './variable.js'

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
        const { id, name, types } = info

        image.src =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        idPokemon.textContent = 'N° ' + id
        namePokemon.textContent = 'Name: ' + name
        type.textContent = 'Type: ' + types.map(typeInfo => typeInfo.type.name)
    },

    search: function() {
        this.fetchResults(search.value)
    }
}

button.addEventListener('click', search)
search.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        results.search()
        return
    }
})

results.fetchResults('bulbasaur')

about.addEventListener('click', function(e) {
    const id = e.target.dataset.id 
    if (id) {
        btns.forEach(function (btn) {
            btn.classList.remove('active') 
            e.target.classList.add('active')
        })
        articles.forEach(function(article) {
            article.classList.remove('active')
        })
        const element = document.getElementById(id)
        element.classList.add('active')
    }
})