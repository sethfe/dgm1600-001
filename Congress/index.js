import { senators } from '../data/senators.js'


const container = document.querySelector('.container')

const filterSenators = (prop, value) => {
    return senators.filter(senator => senator[prop] === value)
}

function simplifiedSenators(senatorArray) {
    return senatorArray.map(senator => {
        let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            seniority: parseInt(senator.seniority, 10),
            votesWithPartyPct: senator.votes_with_party_pct,
            party: senator.party,
            missed_votes_pct: senator.missed_votes_pct
        }
    })
}

function populateContainer(smallSenatorsArray) {
    return smallSenatorsArray.forEach(senator => {
        
        let senDiv = document.createElement('div')
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')

        if (senator.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (senator.party === 'R') partyIcon.className = 'fas fa-republican'
        if (senator.party === 'ID') partyIcon.className = 'fas fa-star'

        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        figCaption.appendChild(partyIcon)
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senDiv.appendChild(senFigure)
        senDiv.appendChild(progressBars(senator))
        container.appendChild(senDiv)
    })
}

function progressBars(senator) {
    let progressDiv = document.createElement('div')
    progressDiv.className = 'progressDiv'
    let seniorityLabel = document.createElement('label')
    seniorityLabel.for = 'seniority'
    seniorityLabel.textContent = 'Seniority'
    let seniorityBar = document.createElement('progress')
    seniorityBar.id = 'seniority'
    seniorityBar.max = 100
    seniorityBar.value = parseInt((senator.seniority / mostSeniority.seniority) * 100)

    progressDiv.appendChild(seniorityLabel)
    progressDiv.appendChild(seniorityBar)
    return progressDiv
}

const republicans = filterSenators('party', 'R')
const democrats = filterSenators('party', 'D')

const mostSeniority = simplifiedSenators(democrats).reduce(
    (acc, senator) => {
        return acc.seniority > senator.seniority ? acc : senator
    }
)

const mostMissedVotes = simplifiedSenators(senators).reduce((acc, senator) => {
    return acc.missed_votes_pct > senator.missed_votes_pct ? acc : senator
}
)


let loyalArray = []

 const mostLoyal = simplifiedSenators(senators).reduce((acc, senator) => {
    if (senator.votesWithPartyPct === 100) {
        loyalArray.push(senator)
    }
    return acc.votesWithPartyPct > senator.votesWithPartyPct ? acc : senator
})

console.log(mostSeniority)
//console.log(loyalArray)
//console.log(mostMissedVotes)

populateContainer(simplifiedSenators(senators))