


export class Movie {
    constructor(movie){
        Object.assign(this, movie)
    }
    renderThisMovie(){
        const {Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID, Actors } = this
        // if(!isAddedToWatchlist){
        return `
        <div id='movie-post'>
            <div id='movie-poster'><img src='${Poster}'></div>
            <div id='movie-description'>
                <div id='top'>
                    <h3>${Title}</h3><p><img src = './images/staricon.svg'> ${imdbRating}</p>
                </div>
                <div id='middle'>
                    <p>${Runtime}</p><p>${Genre}</p>
                    ${!imdbID.includes('+')?`<button id='watchlist-btn' class = 'watchlist' data-movie = "${imdbID}"><img src='./images/addbtn.png'/> Watchlist</button>`:` <button id='remove-btn' class = 'watchlist' data-movie = "${imdbID}"><img src='./images/checkmark.png'/> Remove</button>`}
                </div>
                <div id='middle-bottom'><p>${Actors}</p></div>
                <p id='bottom'>${Plot}
                </p>
            </div>
        </div>
        `
    }
}
    