// -----TMDB api-----

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTIwODRmMTRjN2Q4YmVkYTUwN2Y2Y2JhOTAzY2JjMCIsInN1YiI6IjY1OTdhMzIyZDdhNzBhMTIyZTZhNWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ac_Stz4Gal2NG_KroSZ8NaNIQ-Y8pO-t-kF2A03CjLs",
  },
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

  fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = getRandomIndex(data);
      const movieData = data.results[randomIndex];

      const imageElement = document.createElement("img");
      imageElement.src =
        "https://image.tmdb.org/t/p/original" + movieData.backdrop_path;

      const moreInfoDiv = document.getElementById(moreDivId);

      moreInfoDiv.querySelector(".title").textContent = movieData.title;
      moreInfoDiv.querySelector(".original_title").textContent =
        movieData.original_title;
      moreInfoDiv.querySelector(
        ".release_date"
      ).textContent = `개봉 날짜: ${movieData.release_date}`;
      moreInfoDiv.querySelector(".vote_average").textContent = `⭐️ 평점: ${Math.round(movieData.vote_average * 10) / 10
        }`;
      moreInfoDiv.querySelector(".overview").textContent = movieData.overview;

      const mainDiv = document.getElementById(mainDivId);
      mainDiv.appendChild(imageElement);

      const posterElement = document.createElement("img");
      posterElement.src =
        "https://image.tmdb.org/t/p/original" + movieData.poster_path;
      moreInfoDiv.querySelector(".poster_path").appendChild(posterElement);
    })
    .catch((err) => console.error(err));
}

// -----live에 카드 생성-----

const lcContainer = document.getElementById("live1");

let currentPage = 0;
let functionSelection = 0;

function fetchMoreMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage + 1
    }`;
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((movie, index) => {
        const movieCard = createMovieCard(
          index,
          movie.poster_path,
          movie.id,
          movie.title,
          movie.original_title,
          movie.overview,
          movie.vote_average
        );
        lcContainer.appendChild(movieCard);

        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=ko-KR`,
          options
        )
          .then((creditsResponse) => creditsResponse.json())
          .then((creditsData) => {
            // 여기에서 크레딧 데이터를 사용한 추가적인 로직 구현
          })
          .catch((err) =>
            console.error(
              `영화 ID ${movie.id}의 크레딧 정보를 가져오는 데 실패했습니다:`,
              err
            )
          );
      });

      currentPage += 1;
      functionSelection = 1;
    })
    .catch((err) => {
      console.error(err);
      any = 1;
    });
}

document.addEventListener("DOMContentLoaded", fetchMoreMovies);

function createMovieCard(
  index,
  poster_path,
  id,
  title,
  otitle,
  overview,
  vote
) {
  const movieContainer = (() => {
    const el = document.createElement("div");
    el.className = "lc";

    return el;
  })();
  const imageElement = (() => {
    const el = document.createElement("img");
    el.className = "poster";
    el.src = "https://image.tmdb.org/t/p/original" + poster_path;
    el.setAttribute("data-index", index);
    return el;
  })();
  const rankElement = (() => {
    const el = document.createElement("h1");
    el.className = "rank";
    el.textContent = index + 1;
    return el;
  })();

  movieContainer.appendChild(imageElement);
  movieContainer.appendChild(rankElement);

  function handlePosterClick() {
    // const modal = document.getElementById("myModal");
    // modal.style.display = "block";
    // document.querySelector(".modal-image").innerHTML = `
    // <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="${title}">
    // <button class="heart"><i class="fa-solid fa-heart"></i></button>
    // <button class="trailer"> 예고편 보기 </button>
    // <span class="close-button2 close" id="detail-close">&times;</span>`;
    // document.querySelector(".modal-content").innerHTML = `<h2>${title}</h2>
    // <p>⭐️ 평점 : ${vote}
    // <h3>줄거리</h3>
    // <p>${overview}</p>
    // <p>🤍</p>`;
    // document.querySelector(".modal-content").innerHTML = `
    // <h2 class="movietitle">${title}</h2>
    // <p class="movieotitle">(${otitle})</p>
    // <p class="movierating">⭐️ 평점: ${Math.round(vote * 10) / 10}</p>
    // <hr>
    // <p class="movieoverview">${overview}</p>`;
  };

  
  imageElement.addEventListener("click", handlePosterClick);
  return movieContainer;
}


///////////////////////////영화 생성///////////////////////////////////////

function mainMovie(liveId, url) {
  const fullUrl = `${url}`;

  fetch(fullUrl, options)
    .then((response) => response.json())
    .then((data) => {
      for (let index = 0; index < 15; index++) {
        const movie = data.results[index];
        if (movie) {
          const movieCard = createMovieCard(index, movie.poster_path, movie.id);
          document.getElementById(liveId).appendChild(movieCard);
        } else {
          console.error(`No data for index ${index} in ${fullUrl}`);
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

const url2 =
  "https://api.themoviedb.org/3/discover/movie?language=ko-KR&region=KR&with_original_language=ko";
const url3 =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc&with_genres=28";
const url4 =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc&with_genres=10749";
const url5 =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc&with_genres=14";
const url6 =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc&with_genres=16";

mainMovie("live2", url2);
mainMovie("live3", url3);
mainMovie("live4", url4);
mainMovie("live5", url5);
mainMovie("live6", url6);


//-----카테고리별 카드 생성-----

document.addEventListener("DOMContentLoaded", function () {
  let genreButtons = document.querySelectorAll(".cate_menu button");
  const cateMenu = document.getElementById("cate_menu");

  genreButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      catecard.innerHTML = "";
      document.querySelector(".Container").style.display = "none";
      let genreId = getGenreId(button.id);
      fetchMoviesByGenre(genreId);
      cateMenu.classList.remove("active");
    });
  });

  function getGenreId(buttonId) {
    switch (buttonId) {
      case "drama":
        return 18;
      case "romance":
        return 10749;
      case "animation":
        return 16;
      case "comedy":
        return 35;
      case "thriller":
        return 53;
      case "mystery":
        return 9648;
      case "action":
        return 28;
      case "fantasy":
        return 14;
      case "horror":
        return 27;
      default:
        return null;
    }
  }

  function fetchMoviesByGenre(genreId) {
    const discoverUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${currentPage + 1
      }&sort_by=popularity.desc&with_genres=${genreId}`;

    fetch(discoverUrl, options)
      .then((response) => response.json())
      .then((data) => {
        renderMovies(data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

//-----검색 카드 생성-----

// const searchBtn = document.getElementById("searchBtn");
// searchBtn.addEventListener("click", function () {
//   lcContainer.innerHTML = "";
//   handleSearch();
// });

// const searchInput = document.getElementById("searchInput");
// searchInput.addEventListener("keyup", function (event) {
//   if (event.key === "Enter") {
//     lcContainer.innerHTML = "";
//     handleSearch();
//   }
// });

function handleSearch() {
  const query = searchInput.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?language=ko-KR&page=${currentPage + 1
    }&query=${encodeURIComponent(query.toLowerCase())}`;

  fetch(searchUrl, options)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        renderMovies(data.results);
        functionSelection = 2;
      } else {
        alert("검색 결과가 없습니다.");
      }
    })
    .catch((err) => {
      console.error(err);
      any = 2;
    });
}

function renderMovies(movies) {
  movies.forEach((movie, index) => {
    const movieCard = createMovieCard(index, movie.poster_path, movie.id);
    document.getElementById("catecard").appendChild(movieCard);
  });
  currentPage += 1;
}

//-----영화 더 보기-----
const movieadd = document.getElementById("movieadd");
// movieadd.addEventListener("click", function () {
//   if (functionSelection === 1) {
//     fetchMoreMovies();
//   } else if (functionSelection === 2) {
//     handleSearch();
//   } else if (functionSelection === 3) {
//     fetchMoviesByGenre(selectedGenreId);
//   }
// });

const movieContent = async (e, category) => {
  console.log(e.target);
  if (e.target.matches("IMG")) {
    try {
      
      const youtubeApiKey = "AIzaSyDpuO0gd_mqWCqqHsaLwRWHMhCrZ4xLKfU";
      const youtubeApiUrl = "https://www.googleapis.com/youtube/v3/search";

      const dataIndex = e.target.dataset.index;
      const response = await fetch(`http://localhost:5555/detail/${category}`);
      console.log(response);
      const movieData = await response.json();
      console.log(movieData);
      const clickedDataIndex = movieData[dataIndex];

      const youtubeResponse = await fetch(
        `${youtubeApiUrl}?part=snippet&q=${clickedDataIndex.original_title} trailer&type=video&key=${youtubeApiKey}`
      );
      const data = await youtubeResponse.json();
      const videoId = data.items[0].id.videoId;

      console.log(clickedDataIndex);
      console.log(clickedDataIndex.title);
      console.log(clickedDataIndex.original_title);
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
      document.querySelector(".modal-image").innerHTML = `
    <iframe style="width: 100%; height: 700px;" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
    <button class="heart"><i class="fa-solid fa-heart"></i></button>
    <span class="close-button2 close" id="detail-close">&times;</span>`;
      document.querySelector(".modal-content").innerHTML = `
    <h2 class="movietitle">${clickedDataIndex.title}</h2>
    <p class="movieotitle">(${clickedDataIndex.original_title})</p>
    <p class="movierating">⭐️ 평점: ${Math.round(clickedDataIndex.vote_average * 10) / 10
        }</p>
    <hr>
    <p class="movieoverview">${clickedDataIndex.overview}</p>`;
    } catch (e) {
      console.error("에러남 :" + e.messsage);
    }
  }
};

const urls = ["popular", "korea", "action", "romance", "fantasy", "animation"];

for (let i = 0; i < urls.length; i++) {
  document
    .querySelector(`#live${1 + i}`)
    .addEventListener("click", (e) => movieContent(e, urls[i]));
}

export default options;
export { fetchMoreMovies };
