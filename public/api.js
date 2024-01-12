// -----TMDB api-----

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTIwODRmMTRjN2Q4YmVkYTUwN2Y2Y2JhOTAzY2JjMCIsInN1YiI6IjY1OTdhMzIyZDdhNzBhMTIyZTZhNWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ac_Stz4Gal2NG_KroSZ8NaNIQ-Y8pO-t-kF2A03CjLs'
    }
};



// ----center에 api 가져오기-----

const divCount = 5;
const usedIndices = [];

function getRandomIndex(data) {
    let index = Math.floor(Math.random() * data.results.length);

    while (usedIndices.includes(index)) {
        index = Math.floor(Math.random() * data.results.length);
    }

    usedIndices.push(index);
    return index;
}

for (let i = 1; i <= divCount; i++) {
    const mainDivId = `main${i}`;
    const moreDivId = `more${i}`;

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1', options)
        .then(response => response.json())
        .then(data => {
            const randomIndex = getRandomIndex(data);
            const movieData = data.results[randomIndex];

            const imageElement = document.createElement("img");
            imageElement.src = 'https://image.tmdb.org/t/p/original' + movieData.backdrop_path;

            const moreInfoDiv = document.getElementById(moreDivId);

            moreInfoDiv.querySelector(".title").textContent = movieData.title;
            moreInfoDiv.querySelector(".original_title").textContent = movieData.original_title;
            moreInfoDiv.querySelector(".release_date").textContent = `개봉 날짜: ${movieData.release_date}`;
            moreInfoDiv.querySelector(".vote_average").textContent = `⭐️ 평점: ${Math.round(movieData.vote_average * 10) / 10}`;
            moreInfoDiv.querySelector(".overview").textContent = movieData.overview;

            const mainDiv = document.getElementById(mainDivId);
            mainDiv.appendChild(imageElement);

            const posterElement = document.createElement("img");
            posterElement.src = 'https://image.tmdb.org/t/p/original' + movieData.poster_path;
            moreInfoDiv.querySelector(".poster_path").appendChild(posterElement);
        })
        .catch(err => console.error(err));

}



// -----live에 카드 생성-----

const lcContainer = document.getElementById('live');
let currentPage = 0;
let functionSelection = 0;

function fetchMoreMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage + 1}`;

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((movie, index) => {
                const movieCard = createMovieCard(index, movie.poster_path, movie.id);
                lcContainer.appendChild(movieCard);
            });

            currentPage += 1;
            functionSelection = 1;
        })
        .catch(err => { console.error(err); any = 1; });
}

document.addEventListener('DOMContentLoaded', fetchMoreMovies);

function createMovieCard(index, poster_path, id) {

    const movieContainer = (() => { const el = document.createElement('div'); el.className = 'lc'; return el; })();
    const imageElement = (() => { const el = document.createElement('img'); el.className = 'poster'; el.src = 'https://image.tmdb.org/t/p/original' + poster_path; return el; })();
    const rankElement = (() => {const el = document.createElement('h1'); el.className = 'rank'; el.textContent = index+1; return el;})();

    movieContainer.appendChild(imageElement);
    movieContainer.appendChild(rankElement);

    function handlePosterClick() {
        alert(`해당 영화의 ID : ${id}`);
    }

    imageElement.addEventListener('click', handlePosterClick);

    return movieContainer;
}



// -------------한국 영화-------------------------------------------

const koreanContainer = document.getElementById('live2');

function koreanMovie() {
    const url = 'https://api.themoviedb.org/3/discover/movie?language=ko-KR&region=KR&with_original_language=ko';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((movie, index) => {
                const movieCard = createMovieCard(index, movie.poster_path, movie.id);
                koreanContainer.appendChild(movieCard);
            });
        })
        .catch(err => { console.error(err);});
}

document.addEventListener('DOMContentLoaded', koreanMovie);



// -------------액션 영화-------------------------------------------

const actionContainer = document.getElementById('live3');

function actionMovie() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=28';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((movie, index) => {
                const movieCard = createMovieCard(index, movie.poster_path, movie.id);
                actionContainer.appendChild(movieCard);
            });
        })
        .catch(err => { console.error(err);});
}

document.addEventListener('DOMContentLoaded', actionMovie);



// -------------로맨스 영화-------------------------------------------

const romanceContainer = document.getElementById('live4');

function romanceMovie() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=10749';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((movie, index) => {
                const movieCard = createMovieCard(index, movie.poster_path, movie.id);
                romanceContainer.appendChild(movieCard);
            });
        })
        .catch(err => { console.error(err);});
}

document.addEventListener('DOMContentLoaded', romanceMovie);



// -------------애니메이션 영화-------------------------------------------

const animationContainer = document.getElementById('live6');

function animationMovie() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=16';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((movie, index) => {
                const movieCard = createMovieCard(index, movie.poster_path, movie.id);
                animationContainer.appendChild(movieCard);
            });
        })
        .catch(err => { console.error(err);});
}

document.addEventListener('DOMContentLoaded', animationMovie);



// -------------판타지 영화-------------------------------------------

const fantasyContainer = document.getElementById('live5');

function fantasynMovie() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=14';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((movie, index) => {
                const movieCard = createMovieCard(index, movie.poster_path, movie.id);
                fantasyContainer.appendChild(movieCard);
            });
        })
        .catch(err => { console.error(err);});
}

document.addEventListener('DOMContentLoaded', fantasynMovie);



//-----카테고리별 카드 생성-----

document.addEventListener('DOMContentLoaded', function () {
    let genreButtons = document.querySelectorAll('.cate_menu button');

    genreButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            lcContainer.innerHTML = '';
            let genreId = getGenreId(button.id);
            fetchMoviesByGenre(genreId);
            cateMenu.classList.remove('active');
        });
    });

    function getGenreId(buttonId) {
        switch (buttonId) {
            case 'drama':
                return 18;
            case 'romance':
                return 10749;
            case 'animation':
                return 16;
            case 'comedy':
                return 35;
            case 'thriller':
                return 53;
            case 'mystery':
                return 9648;
            case 'action':
                return 28;
            case 'fantasy':
                return 14;
            case 'horror':
                return 27;
            default:
                return null;
        }
    }


    function fetchMoviesByGenre(genreId) {
        const discoverUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${currentPage + 1}&sort_by=popularity.desc&with_genres=${genreId}`;

        fetch(discoverUrl, options)
            .then(response => response.json())
            .then(data => { renderMovies(data.results); any = 3; })
            .catch(err => { console.error(err); functionSelection = 3; });
    }
});



//-----검색 카드 생성-----

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', function () {
    lcContainer.innerHTML = '';
    handleSearch();
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        lcContainer.innerHTML = '';
        handleSearch();
    }
});

function handleSearch() {
    const query = searchInput.value;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?language=ko-KR&page=${currentPage + 1}&query=${encodeURIComponent(query.toLowerCase())}`;

    fetch(searchUrl, options)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                renderMovies(data.results);
                functionSelection = 2;
            } else {
                alert('검색 결과가 없습니다.');
            }
        })
        .catch(err => { console.error(err); any = 2; });
}

function renderMovies(movies) {
    movies.forEach((movie, index) => {
        const movieCard = createMovieCard(index + 1, movie.poster_path, movie.id);
        lcContainer.appendChild(movieCard);
    });

    currentPage += 1;

}



//-----영화 더 보기-----
const movieadd = document.getElementById('movieadd');
movieadd.addEventListener('click', function () {
    if (functionSelection === 1) {
        fetchMoreMovies();
    } else if (functionSelection === 2) {
        handleSearch();
    } else if (functionSelection === 3) {
        fetchMoviesByGenre(selectedGenreId);
    }
});