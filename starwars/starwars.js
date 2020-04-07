import { films } from '../data/films.js'
import { people } from '../data/people.js'
import { removeChildren, getLastNumber } from '../utils.js'

let gallery = document.querySelector('.gallery')

const maleCharacters = people.filter(person => person.gender === 'male')

const femaleCharacters = people.filter(person => person.gender === 'female')

const otherCharacters = people.filter(
  person =>
    person.gender === 'n/a' ||
    person.gender === 'none' ||
    person.gender === 'hermaphrodite',
)

let maleButton = document.querySelector('#maleButton')
let femaleButton = document.querySelector('#femaleButton')
let otherButton = document.querySelector('#otherButton')

maleButton.addEventListener('click', function(event) {
  populateDOM(maleCharacters)
})

femaleButton.addEventListener('click', function(event) {
  populateDOM(femaleCharacters)
})

otherButton.addEventListener('click', function(event) {
  populateDOM(otherCharacters)
})

function populateDOM(characters) {
  removeChildren(gallery)
  characters.forEach(person => {
    let imageNum = getLastNumber(person.url)
    let personAnchor = document.createElement('a')
    personAnchor.href = '#'
    let personImg = document.createElement('img')
    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${imageNum}.jpg`

    personImg.addEventListener('error', event => {
      personImg.hidden = true
      //personImg.src = '../images/uvu.jpeg'
    })

    personImg.addEventListener('click', function(event) {
      console.log('Thanks for clicking!')
    })

    personAnchor.appendChild(personImg)
    gallery.appendChild(personAnchor)
  })
}

populateDOM(people)



