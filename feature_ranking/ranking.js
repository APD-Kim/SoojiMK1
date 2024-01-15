const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTIwODRmMTRjN2Q4YmVkYTUwN2Y2Y2JhOTAzY2JjMCIsInN1YiI6IjY1OTdhMzIyZDdhNzBhMTIyZTZhNWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ac_Stz4Gal2NG_KroSZ8NaNIQ-Y8pO-t-kF2A03CjLs",
  },
};

const createCard = ({ id, backdrop_path, title, overview, vote_average }) => {
  const container = document.querySelector(".movies-container");
  const box = document.createElement("div");
  const boxImg = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const span = document.createElement("span");
  const vote = document.createElement("div");

  box.className = "box";
  boxImg.className = "box-img";
  img.className = "img";
  h3.className = "h3";
  span.className = "span";
  vote.className = "div";

  box.id = id;
  img.src = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  h3.innerText = `${title}`;
  span.innerText =
    overview === "" ? `${title}` : `${overview.substring(0, 16)}...`;
  vote.innerText = `⭐️ 평점 ${Math.round(vote_average * 10) / 10}`;

  boxImg.append(img);
  box.append(boxImg, h3, vote, span);
  container.append(box);
};

let currentPage = 2;

const url1 = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage}`;
const url2 = `https://api.themoviedb.org/3/discover/movie?language=ko-KR&region=KR&with_original_language=ko&page=${currentPage}`;
const url3 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&sort_by=revenue.desc&with_genres=28&page=${currentPage}`;
const url4 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&sort_by=revenue.desc&with_genres=10749&page=${currentPage}`;
const url5 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&sort_by=revenue.desc&with_genres=14&page=${currentPage}`;
const url6 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&sort_by=revenue.desc&with_genres=16&page=${currentPage}`;

const buttonNumber = localStorage.getItem('buttonNumber');

window.onload = function () {
  if (buttonNumber === '1') {
    mainMovie(url1);
  } else if (buttonNumber === '2') {
    mainMovie(url2);
  } else if (buttonNumber === '3') {
    mainMovie(url3);
  } else if (buttonNumber === '4') {
    mainMovie(url4);
  } else if (buttonNumber === '5') {
    mainMovie(url5);
  } else if (buttonNumber === '6') {
    mainMovie(url6);
  }
};

function mainMovie(url) {
  fetch(url, options)
    .then((response) => response.json())
    .then(({ results }) => {
      results.forEach((movie) => {
        createCard(movie);
      });
      currentPage++;

      const moreMovies = document.querySelector(".more");
      moreMovies.addEventListener("click", loadMoreMovies);
    })
    .catch((err) => {
      console.error(err);
    });
}

for (let i = 1; i <= 6; i++) {
  const movieaddbtn = document.getElementById(`movieadd${i}`);
  movieaddbtn.addEventListener("click", function () {
    window.location.href = "http://localhost:5555/ranking";
    localStorage.setItem('buttonNumber', i.toString());
  });
}


function loadMoreMovies() {
  const updatedUrl = `${getBaseUrl(buttonNumber)}&page=${currentPage}`;
  mainMovie(updatedUrl);
}

function getBaseUrl(buttonNumber) {
  switch (buttonNumber) {
    case '1':
      return "https://api.themoviedb.org/3/movie/popular?language=ko-KR";
    case '2':
      return "https://api.themoviedb.org/3/discover/movie?language=ko-KR&region=KR&with_original_language=ko";
    case '3':
      return "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&sort_by=revenue.desc&with_genres=28";
    case '4':
      return "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&sort_by=revenue.desc&with_genres=10749";
    case '5':
      return "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&sort_by=revenue.desc&with_genres=14";
    case '6':
      return "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&sort_by=revenue.desc&with_genres=16";
    default:
      return "";
  }
}
