const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cfcdbf66916818b6c971aa3726a970c2&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=cfcdbf66916818b6c971aa3726a970c2&query="';

const main = document.getElementById('main');

const form = document.getElementById('form');

const button = document.getElementById('button');

const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  //console.log(data.results);
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');

    movieEl.classList.add('movie');

    movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          onerror="this.src='https://plus.unsplash.com/premium_photo-1709842822358-006f08261139?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; this.onerror=null;" 
          alt="No Paster Found"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote > 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('click', (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});

button.addEventListener('submit', (e) => {
  form.dispatchEvent(new Event('submit'));
});
