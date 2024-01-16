// const form = document.getElementById("form");

// const removeAll = () => {
//   const movies = document.querySelectorAll(".box");

//   movies.forEach((movie) => {
//     movie.remove();
//   });
// };

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTIwODRmMTRjN2Q4YmVkYTUwN2Y2Y2JhOTAzY2JjMCIsInN1YiI6IjY1OTdhMzIyZDdhNzBhMTIyZTZhNWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ac_Stz4Gal2NG_KroSZ8NaNIQ-Y8pO-t-kF2A03CjLs",
  },
};

const findCard = ({ id, backdrop_path, title, overview, vote_average }) => {
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
  box.append(boxImg, h3, span, vote);
  container.append(box);
};

// const searchMovie = (event) => {
//   event.preventDefault();

//   const input = document.querySelector(".search-input");
//   const { value } = input;
//   const searchURL = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=8dc708411fa44904f55112b888e86bbd`;

//   if (value) {
//     removeAll();
//     fetch(searchURL)
// .then((respose) => respose.json())
// .then(({ results }) =>
//   results.forEach((movie) => {
//     findCard(movie);
//   })
//       );
//   }
// };

// form.addEventListener("submit", searchMovie);


const searchinput = localStorage.getItem('searchInput');
console.log(searchinput)
const searchWord = document.querySelector(".searchWord");

window.onload = function () {
  handleSearch(searchinput);
  if (searchWord) {
    searchWord.textContent = searchinput;
  }
}


function handleSearch(searchinput) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?language=ko-KR&page=1&query=${encodeURIComponent(searchinput.toLowerCase())}`;

  console.log(searchUrl);
  fetch(searchUrl, options)
    .then((response) => response.json())
    .then(({ results }) => {
      if (results.length > 0) {
        results.forEach((movie) => {
          findCard(movie);
        });
      } else {
        alert("검색 결과가 없습니다.");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}