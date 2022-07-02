const changeBg = document.querySelector('.about-img')

const colors = {
    steel: '#F4F4F4',
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ice: '#DEF3FD',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#C4ADD6',
    bug: '#F8D5A3',
    dragon: '#97B3E6',
    psychic: '#EAEDA1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    ghost: '#EBC2C2'
}

export const changeColors = (types) => {
    changeBg.style.backgroundColor = colors[types]
}