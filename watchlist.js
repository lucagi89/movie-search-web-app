// import { watchlist } from "./index.js"
import { Movie } from './movie-class.js'

const moviesList = document.getElementById('movies-list')


const watchlist = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : []

function renderWatchlist(){
    moviesList.innerHTML = ''
    watchlist.forEach(movie => {
        const movieObj = new Movie(movie)
        moviesList.innerHTML += movieObj.renderThisMovie()
    })
}

renderWatchlist()