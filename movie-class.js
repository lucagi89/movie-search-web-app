


export class Movie {
    constructor(movie){
        Object.assign(this, movie)
    }
    renderThisMovie(){
        const {Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID} = this
        return `
        <div id='movie-post' data-movie = "${imdbID}">
            <img src='${Poster}' id='movie-poster'>
            <div id='movie-description'>
                <div id='top'>
                    <h3>${Title}</h3><p><img src = './images/staricon.svg'> ${imdbRating}</p>
                </div>
                <div id='middle'>
                    <p>${Runtime}</p><p>${Genre}</p>
                    <button id='watchlist-btn' class = 'watchlist'><img src='./images/addbtn.png'/> Watchlist</button>
                </div>
                <p id='bottom'>${Plot}</p>
            </div>
        </div>
        `
    }
}