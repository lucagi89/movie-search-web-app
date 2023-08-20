
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
        <div id='movie-post'>
            <img src='${Poster}' id='movie-poster'>
            <div id='movie-description'>
                <div id='top'><h3>${Title}</h3><p><img src = './images/staricon.svg'> ${imdbRating}</p></div>
                <div id='middle'><p>${Runtime}</p><p>${Genre}</p><button><img src='./images/addbtn.png'> Watchlist</button></div>
                <p id='bottom'>${Plot}</p>
            </div>
        </div>
        `
    })
    console.log(html)
    document.getElementById('movies-list').innerHTML = html
}