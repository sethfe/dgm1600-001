import { starships } from '../data/starships.js'
import { removeChildren, getLastNumber } from '../utils.js' 

const nav = document.querySelector('.nav')

const navList = document.querySelector('.navList')

const shipView = document.querySelector('#main')

const modalDialog = document.querySelector('.modal')
const modalButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')
const modalMessage = document.querySelector('.dialogMessage')

modalButton.addEventListener('click', () => {
  modalDialog.classList.toggle("is-active")
})

modalBackground.addEventListener('click', () => {
  modalDialog.classList.toggle("is-active")
})

function populateNav(starships) {
    starships.forEach(starship => {
      let shipAnchor = document.createElement('a')
      shipAnchor.href = '#' 
      let listItem = document.createElement('li')
      listItem.textContent = starship.name

      shipAnchor.addEventListener('click', event => {
        //store the name of the item clicked on 
          let shipName = event.target.textContent
          const foundShip = starships.find(ship =>
            ship.name === shipName )
            console.log(foundShip)
          populateShipView(foundShip)
      })


      shipAnchor.appendChild(listItem)
      navList.appendChild(shipAnchor)

    })
    nav.appendChild(navList)
}

function populateShipView(shipData) {
    removeChildren(shipView)
    let imageNum = getLastNumber(shipData.url)
    let shipImage = document.createElement('img')
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${imageNum}.jpg`
    
    shipImage.addEventListener('error', event => {
      shipImage.hidden = true
      modalDialog.classList.toggle("is-active")
      modalMessage.textContent = `Sorry, could not find an image for ${shipData.name}.`
    })

    shipView.appendChild(shipImage)
}

populateNav(starships)
    