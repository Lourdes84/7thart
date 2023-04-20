
const API_KEY = config.MY_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w300'
const searchURL = BASE_URL + '/search/movie?' +API_KEY

const main = document.getElementById('main')
const form = document.getElementById('form')
const searchButton = document.getElementById('searchButton')


getMovies = (url) =>{
    fetch(url).then(res => res.json()).then(data =>{

        showMovies(data.results)
    })
}

showMovies = (data) =>{
    main.innerHTML = ''

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie')
        movieContainer.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="sinopsis">
                <h3>Sinopsis</h3>
                ${overview}
                <hr>
                <small>Fecha de estreno: ${release_date}</small>
            </div>
        `
        main.appendChild(movieContainer)
    })
}

getColor = (vote) =>{
    if(vote >= 8){
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

getMovies(API_URL)


form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const searchMovie = searchButton.value

    if(searchMovie) {
        getMovies(searchURL+'&query='+searchMovie)
    } else {
        getMovies(API_URL)
    }
})

