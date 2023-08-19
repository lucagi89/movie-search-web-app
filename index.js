

const myKey = '141dd68d'

document.getElementById('src-btn').addEventListener('click', async () => {
    const inputValue = document.getElementById('title-input').value
    const res = await fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=${myKey}`)
    const data = await res.json()
    console.log(data)
    const moviesHtml = data.Search.map(movie => 
        `<h3>${movie.Title}</h3>
        <img src='${movie.Poster}'>`)

    document.getElementById('movies-list').innerHTML = moviesHtml
    })

