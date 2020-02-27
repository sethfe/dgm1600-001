import { films } from '../data/films.js'
import { people } from '../data/people.js'

console.log("Hi There! My first JavaScript code!")

console.log(document.querySelector('.greeting'))

let greetingDiv = document.querySelector('.greeting')

let castList = document.createElement("ul")

let counter = 1

people.forEach(person => {
let nameItem = document.createElement("li")
nameItem.textContent = person.name
castList.appendChild(nameItem)

let personAnchor = document.createElement("a")
personAnchor.href = "#"

let personImg = document.createElement("img")
personImg.src = `https://starwars-visualguide.com/assets/img/characters/${counter}.jpg`

personImg.addEventListener('error' , (event) => {
personImg.hidden = true
//personImg.src = '../images/uvu.jpeg'

});


personImg.addEventListener("click", function( event ) {
    console.log('Thanks for clicking!')
})

personAnchor.appendChild(personImg)
greetingDiv.appendChild(personAnchor)
counter++
})



greetingDiv.appendChild(castList)