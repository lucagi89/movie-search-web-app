
import { Movie } from './movie-class.js'

const moviesList = document.getElementById('movies-list')
const placeholderImg = document.getElementById('placeholder-img')
const btnsContainer = document.getElementById('btns-container')

// VARIABLES
// variable to store the html of the movies posts
const myKey = '141dd68d'
let page = 1
let movies = []
let watchlist = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : []
let moviesHtml = localStorage.getItem('moviesHtml') ? JSON.parse(localStorage.getItem('moviesHtml')) : ''


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
        getData()
    } else if(e.target.id === 'title-input'){
        localStorage.clear(moviesHtml)
        moviesList.innerHTML = ''
    } else if(e.target.id === 'next-page-btn'){
        page++
        getData()
    } else if(e.target.id === 'prev-page-btn'){
        page--
        if (page === 1 ){
            document.getElementById('prev-page-btn').style.display = 'none'
        }
        getData()
    } else if(e.target.id === 'watchlist-btn'){
        addToWatchlist(e)
    }else if (e.target.id === 'remove-btn'){
        removeFromWatchlist(e)
    } 
})

//function to add a movie to the watchlist
function addToWatchlist(e){
    const movieId = e.target.dataset.movie
    const movie = movies.find(movie => movie.imdbID === movieId)
    movie.imdbID += '+'
    console.log(movie.imdbID)
    watchlist.push(movie)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    console.log(watchlist)
    render()
}

//function to remove a movie from the watchlist
function removeFromWatchlist(e){
    const movieId = e.target.dataset.movie
    const movie = movies.find(movie => movie.imdbID === movieId)
    const indexMovie = watchlist.indexOf(movie)
    // movies.splice(indexMovie, 1)
    movie.imdbID = movie.imdbID.slice(0, -1)
   
    
    watchlist.splice(indexMovie, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    console.log(watchlist)
    render()
}

//function to get the movies page from the api
async function getData(){
    try{
        const res = await fetch(getLink())
        const data = await res.json()
        const moviesData = await Promise.all(data.Search.map(movie => {
            return getEachMovieData(movie.imdbID);
          }));

        render()
    } catch(err){
        console.log(err)
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
    moviesList.innerHTML = ''
    movies.forEach(movie => {
        const movieClass = new Movie(movie)
        moviesList.innerHTML += movieClass.renderThisMovie()
    })
    moviesHtml = moviesList.innerHTML
    localStorage.setItem('moviesHtml', JSON.stringify(moviesHtml))
    
}

//localStorage.clear()