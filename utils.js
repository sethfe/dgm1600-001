export function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

export function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if (url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)


    export function addStarField(element, numStars) {
        element.style.setProperty('background-color', 'black')
        for (let i = 0; i < numStars; i++)
            let star = document.createElement('div')
        star.style.setProperty('position', 'absolute')
        star.style.setProperty('woidth', '15px')
        star.style.setProperty('height', '15px')
        star.style.setProperty('background-color', 'white')
        star.style = `100px`
        star.style = `100px`
        element.appendChild(star)
    }
}
