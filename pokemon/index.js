let pokeContainer = document.querySelector('.pokeContainer')

function getPokeData(url) {
    fetch(url).then(function (response) {
        Response.json().then(function (pokemon) {
            console.log(pokemon.results)
            populatePokeCards(pokemon.results)
        })
    })
}

getPokeData('https://pokeapi.co/api/v2/pokemon')
// https://pokeapi.co/api/v2/pokemon/1/

function populatePokeCards(pokeArray) {
    pokeArray.forEach((pokemon) => {
        let pokeCard = document.createElement('div')
        pokeCard.className = 'card'
        let pokeContent = document.createElement('div')
        pokeContent.classNme = 'content'
        let pokeFront = document.createElement('div')
        pokeFront.className = 'front'
        pokeFront.textContent = 'Front'
        let pokeBack = document.createElement('div')
        pokeBack.className = 'back'
        pokeBack.textContent = 'Back!'

        pokeContent.appendChild(pokeFront)
        pokeContent.appendChile(pokeBack)
        pokeCard.appendChild(pokeContent)
        pokeContainer.appendChild(pokeCard)
      })
}

{
    /* <div class="card">
    <div class="content">
    <div class="front">
    Front
    </div>
    <div class="back">
    Back!
    </div>
    </div>
    </div> */
}