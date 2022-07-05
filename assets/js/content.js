import { variables } from './variable.js'

let aboutContent = document.querySelector('.about')

aboutContent.addEventListener('click', function(e) {
    const id = e.target.dataset.id 
    if (id) {
        variables.btns.forEach(function (btn) {
            btn.classList.remove('active') 
            e.target.classList.add('active')
        })
        variables.articles.forEach(function(article) {
            article.classList.remove('active')
        })
        const element = document.getElementById(id)
        element.classList.add('active')
    }
})

export { aboutContent }