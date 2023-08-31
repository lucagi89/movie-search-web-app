
import { Movie } from './movie-class.js'

const moviesList = document.getElementById('movies-list')
const placeholderImg = document.getElementById('placeholder-img')

const placeholderGif = document.getElementById('placeholder-gif')
const btnsContainer = document.getElementById('btns-container')


// VARIABLES
// variable to store the html of the movies posts
const myKey = '141dd68d'
let page = 1
let movies = []
let watchlist = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : []
let totalResults = 0


// function to get the value of the input field(title)
function getInputValue(){
    return document.getElementById('title-input').value
}
// function to get the link for the api
function getLink(){
    return `http://www.omdbapi.com/?s=${getInputValue()}&apikey=${myKey}&page=${page}`
}

// event listener that listens for all the clicks on the page
document.addEventListener('click', (e) => {
    if(e.target.id === 'src-btn'){
        page = 1
        getData()
    } else if(e.target.id === 'title-input'){
        clearPage()
    } else if(e.target.id === 'next-page-btn'){
        page++
        if (document.getElementById('prev-page-btn').style.display = 'none'){
            document.getElementById('prev-page-btn').style.display = 'block'
        }
        getData()
    } else if(e.target.id === 'prev-page-btn'){
        page--
        getData()
    } else if(e.target.id === 'watchlist-btn'){
        addToWatchlist(e)
    }else if (e.target.id === 'remove-btn'){
        removeFromWatchlist(e)
    } 
})

function clearPage(){
    movies = []
    localStorage.clear('movies')
    render()
}

//function to add a movie to the watchlist
function addToWatchlist(e){
    const movieId = e.target.dataset.movie
    const movie = movies.find(movie => movie.imdbID === movieId)
    movie.imdbID += '+'
    watchlist.push(movie)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    render()
}

//function to remove a movie from the watchlist
function removeFromWatchlist(e){
    const movieId = e.target.dataset.movie
    const movie = movies.find(movie => movie.imdbID === movieId)
    const indexMovie = watchlist.indexOf(movie)
    movie.imdbID = movie.imdbID.slice(0, -1)
    watchlist.splice(indexMovie, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    render()
}

//function to get the movies page from the api
async function getData(){
    clearPage()
    try{
        const res = await fetch(getLink())
        const data = await res.json()
        totalResults = data.totalResults
        if(data.Error){
            moviesList.innerHTML = `<h1 class="error-msg">${"Sorry... " + data.Error}</h1>`
        }else{
            placeholderGif.classList.remove('hidden')
            moviesList.appendChild(placeholderGif)
        const moviesData = await Promise.all(data.Search.map(movie => 
             getEachMovieData(movie.imdbID)
          ))

        render()
        }
    } catch(error){ 
        console.log(error)
    }
}


//function to get more specific data of each movie
async function getEachMovieData(movieId){
    try{
    const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${myKey}`)
    const data = await response.json()
    movies.push(data)

    } catch(err){
        console.log(err)
    }
}

function render(){
    if(movies.length > 0){
        moviesList.innerHTML = ''
        btnsContainer.classList.remove('hidden')
        document.getElementById('page-counter').innerHTML = page + " of " + Math.ceil(totalResults / 10)
        movies.forEach(movie => {
            const movieClass = new Movie(movie)
            moviesList.innerHTML += movieClass.renderThisMovie()
        })
    }else{
        btnsContainer.classList.add('hidden')
        if (page === 1 ){
            document.getElementById('prev-page-btn').style.display = 'none'
        }
        moviesList.innerHTML = ''
    }
}


