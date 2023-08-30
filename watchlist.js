// import { watchlist } from "./index.js"
import { Movie } from './movie-class.js'

const moviesList = document.getElementById('movies-list')
const placeholderDiv = document.getElementById('placeholder-div')
const watchlist = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : []
const initialHtml = moviesList.innerHTML

document.addEventListener('click', (e) => {
    if (e.target.id === 'remove-btn'){
        removeFromWatchlist(e)
    } 
})

function removeFromWatchlist(e){
    const movieId = e.target.dataset.movie
    const movie = watchlist.find(movie => movie.imdbID === movieId)
    movie.imdbID = movie.imdbID.slice(0, -1)
    const index = watchlist.indexOf(movie)
    watchlist.splice(index, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    renderWatchlist()
}

function renderWatchlist(){
    if(watchlist.length === 0){
        moviesList.innerHTML = initialHtml
    } else {
        moviesList.innerHTML = ''
    }
    watchlist.forEach(movie => {
        const movieObj = new Movie(movie)
        moviesList.innerHTML += movieObj.renderThisMovie()
    })
}

renderWatchlist()
