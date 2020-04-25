let pokeContainer = document.querySelector('.pokeContainer')
let startButton = document.querySelector('#startButton')
startButton.addEventListener('click', () => {
  loadPage()
})

let newButton = document.querySelector('#newButton')
newButton.addEventListener('click', () => {
  const pokemonRect = addPokemon()
  console.log(pokemonRect)
  window.scrollTo({
    top: pokemonRect.top,
    left: pokemonRect.left,
    behavior: 'smooth'
  })
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

function loadPage(offset, limit) {
  getAPIData('https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=25').then(
    async (data) => {
      for (const pokemon of data.results) {
        await getAPIData(pokemon.url).then(
          (pokeData) => {
            populatePokeCard(pokeData)
            //console.log (pokeData)//
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
    return pokeScene.getBoundingClientRect()
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement('div')
  cardFront.className = 'card__face card__face--front'
  
  let frontImage = document.createElement('img')
  frontImage.src = `../images/pokemonImages/${getImageFileName(pokemon)}.png`
  console.log (getImageFileName(pokemon))
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
  } else if (pokemon.id > 99) { 
    return `${pokemon.id}`
  } else {return `pokeball`}
}

function populateCardBack(pokemon) {
  let cardBack = document.createElement('div')
  cardBack.className = 'card__face card__face--back'
  let abilityList = document.createElement('ul')
  abilityList.textContent = 'Abilities:'
  pokemon.abilities.forEach(ability => {
    let abilityName = document.createElement('li')
    abilityName.textContent = ability.ability.name
    abilityList.appendChild(abilityName)
  })
  let moveList = document.createElement('p')
  moveList.textContent = `Level 0 Moves: ${getPokemonMoves(pokemon, 0).length}`
  cardBack.appendChild(abilityList)
  cardBack.appendChild(moveList)
  return cardBack
}

function getPokemonMoves(pokemon, levelLearnedAt) {
  //console.log(`Name: ${pokemon.name} Number of Moves: ${pokemon.moves.length}`)
  return pokemon.moves.filter(move => {
    return move.version_group_details[0].level_learned_at === levelLearnedAt
  })
}



class Pokemon {
  constructor(height, weight, name, abilities, moves, type) {
    this.height = height
    this.weight = weight
    this.name = name
    this.abilities = abilities
    this.moves = moves
    this.type = type
    this.id = 900
  }
}

function addPokemon() {
  let newPokemon = new Pokemon(50, 25, 'Squirtle Squad', [
    {
      ability:
        { name: 'Swagger' }
    },
    {  ability:
        { name: 'Eating' }
    },
    {   ability: 
      { name: 'Shades on' }
    }
  ],
    [
      {
        move: {
          name: "Squad Goals"
        },
        version_group_details: [
          {
          level_learned_at: 0
          }
        ]
      }
    ])
  return populatePokeCard(newPokemon)
}