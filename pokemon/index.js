let pokeContainer = document.querySelector('.pokeContainer')
let startButton = document.querySelector('#startButton')
startButton.addEventListener('click', () => {
  loadPage()
})

let newButton = document.querySelector('#newButton')
newButton.addEventListener('click', () => {
  addPokemon()
})

async function getAPIData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error(error)
  }
}

function loadPage() {
  getAPIData('https://pokeapi.co/api/v2/pokemon/?&limit=25').then(
    (data) => {
      for (const pokemon of data.results) {
        getAPIData(pokemon.url).then(
          (pokeData) => {
            populatePokeCard(pokeData)
          }
        )
      }
    }
  )
}

function populatePokeCard(singlePokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener( 'click', function() {
      pokeCard.classList.toggle('is-flipped')
    })
    let pokeFront = populateCardFront(singlePokemon)
    let pokeBack = populateCardBack(singlePokemon)

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    pokeContainer.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement('div')
  cardFront.className = 'card__face card__face--front'
  
  let frontImage = document.createElement('img')
  frontImage.src = `../images/${getImageFileName(pokemon)}.png`
  let frontLabel = document.createElement('p') 
  frontLabel.textContent = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`
  cardFront.appendChild(frontImage)
  cardFront.appendChild(frontLabel)
  return cardFront
}

function getImageFileName(pokemon) {
  if (pokemon.id < 10) {
    return `00${pokemon.id}`
  } else if (pokemon.id > 9 && pokemon.id < 100) {
    return `0${pokemon.id}`
  } else return `pokeball`
}

function populateCardBack(pokemon) {
  let cardBack = document.createElement('div')
  cardBack.className = 'card__face card__face--back'
  cardBack.textContent = pokemon.stats[0].stat.name
  return cardBack
}

class Pokemon {
  constructor(height, weight, name, stats) {
    this.height = height
    this.weight = weight
    this.name = name
    this.stats = stats
    this.id = 900
  }
}

function addPokemon() {
  let newPokemon = new Pokemon(50, 25, 'Thoremon', [
    {
      stat:
        { name: 'Thunder Belly' }
    }])
  populatePokeCard(newPokemon)
}
