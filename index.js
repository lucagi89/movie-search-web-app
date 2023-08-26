
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const moviesList = document.getElementById('movies-list')
const placeholderImg = document.getElementById('placeholder-img')

let moviesHtml = ''
const myKey = '141dd68d'
let page = 1


document.getElementById('src-btn').addEventListener('click', getData)
document.getElementById('btns-container').addEventListener('click', (e) => {
    moviesList.innerHTML = ''
    placeholderImg.style.display = 'block'
    if(e.target.id === 'next-page-btn'){
        page++
        getData()
    } else if(e.target.id === 'prev-page-btn'){
        page--
        if (page === 1 ){
            document.getElementById('prev-page-btn').style.display = 'none'
        }
        getData()
    }
})

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
    moviesHtml += new Movie(data).renderThisMovie()
}


class Movie {
    constructor(movie){
        Object.assign(this, movie)
        this.id = uuidv4()
    }
    renderThisMovie(){
        const {Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID} = this
        return `
        <div id='movie-post'>
            <img src='${Poster}' id='movie-poster'>
            <div id='movie-description'>
                <div id='top'><h3>${Title}</h3><p><img src = './images/staricon.svg'> ${imdbRating}</p></div>
                <div id='middle'><p>${Runtime}</p><p>${Genre}</p><button id='${imdbID}'><img src='./images/addbtn.png'> Watchlist</button></div>
                <p id='bottom'>${Plot}</p>
            </div>
        </div>
        `
    }
}



    //  <div id='movie-post'>
    //          <img src='https://m.media-amazon.com/images/M/MV5BMjI2MzU2NzEzN15BMl5BanBnXkFtZTcwMzI5NTU3Nw@@._V1_SX300.jpg' id='movie-poster'>
    //          <div id='movie-description'>
    //              <div id='top'><h3>Titanic: Blood and Steel</h3><p><img src = './images/staricon.svg'> 7.2</p></div>
    //              <div id='middle'><p>1 min</p><p>Drama</p><button><img src='./images/addbtn.png'> Watchlist</button></div>
    //              <p id='bottom'>The construction of the R.M.S. Titanic at the Harland and Wolff shipyard in Belfast against the background of union riots, political and religious conflicts, and a romance between a young ambitious engineer and an Italian immigrant.</p>
    //          </div> 