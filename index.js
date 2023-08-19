
let moviesId = []
let moviesArray = []
const myKey = '141dd68d'

document.getElementById('src-btn').addEventListener('click', async () => {
    const inputValue = document.getElementById('title-input').value
    const res = await fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=${myKey}`)
    const data = await res.json()
    data.Search.map(movie => 
        moviesId.push(movie.imdbID))
        getFullMovieData(moviesId)

    // document.getElementById('movies-list').innerHTML = moviesHtml
    })

function getFullMovieData(moviesId){
    moviesId.map(async (movie) => {
        const res = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${myKey}`)
        const data = await res.json()
        moviesArray.push(data)
    })
    // console.log(moviesArray)
    render(moviesArray)
}

function render(objArray){
    let html = ''
    
    objArray.map(movie => {
        const {Title, imdbRating, Runtime, Genre, Plot, Poster} = movie
        html += `
        <h1>${Title}</h1>
        <p>${imdbRating}</p><p>${Runtime}</p>
        <h3>${Genre}</h3>
        <p>${Plot}</p>
        <img src='${Poster}'>
        `
    })
    document.getElementById('movies-list').innerHTML = html
}