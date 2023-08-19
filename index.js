

const myKey = '141dd68d'

document.getElementById('src-btn').addEventListener('click', () => {
    const inputValue = document.getElementById('title-input').value
    fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=141dd68d`)
    .then(res => res.json())
    .then(data => console.log(data))
})

