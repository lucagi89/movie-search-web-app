
import { Movie } from './movie-class.js'

const moviesList = document.getElementById('movies-list')
const placeholderImg = document.getElementById('placeholder-img')

let moviesHtml = ''
const myKey = '141dd68d'
let page = 1
let movies = []
export let watchlist = []

document.addEventListener('click', (e) => {
    if(e.target.id === 'src-btn'){
        moviesList.innerHTML = ''
        placeholderImg.src = './images/loading.gif'
        getData()
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
        addToChecklist()
    }else if (e.target.id === 'remove-btn'){
        removeFromChecklist()
    } 
})

function addToChecklist(){
    const movieId = e.target.parentElement.parentElement.parentElement.dataset.movie
    const movie = movies.find(movie => movie.imdbID === movieId)
    watchlist.push(movie)
    //localStorage.setItem('watchlist', JSON.stringify(watchlist))
    //e.target.innerHTML = '<img src="./images/checkmark.png"> Added'
        //e.target.disabled = true
}

function removeFromChecklist(){
    const movieId = e.target.parentElement.parentElement.parentElement.dataset.movie
        const movie = movies.find(movie => movie.imdbID === movieId)
        watchlist = watchlist.filter(movie => movie.imdbID !== movieId)
        //localStorage.setItem('watchlist', JSON.stringify(watchlist))
}



function getLink(){
    return `http://www.omdbapi.com/?s=${getInputValue()}&apikey=${myKey}&page=${page}`
}

function getInputValue(){
    return document.getElementById('title-input').value
}

async function getData(){
    const res = await fetch(getLink())
    const data = await res.json()
    data.Search.forEach(movie => {
        getMoviesData(movie.imdbID)
    })
    setTimeout( () => {
    placeholderImg.style.display = 'none'
    render()
    }, 1000)
}

function render(){
    moviesList.innerHTML = moviesHtml
    moviesHtml = ''
}



async function getMoviesData(movieId){
    const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${myKey}`)
    const data = await response.json()
    movies.push(data)
    moviesHtml += new Movie(data).renderThisMovie()
}

