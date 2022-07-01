const search = document.querySelector('input')
const button = document.querySelector('.icon-search')

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

            document.querySelector('.image').src =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            document.querySelector('.id').textContent = 'N° ' + id
            document.querySelector('.name').textContent = name
            document.querySelector('.type').textContent = types.map(typeInfo => typeInfo.type.name)
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

results.fetchResults("bulbasaur")