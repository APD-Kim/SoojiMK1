const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTIwODRmMTRjN2Q4YmVkYTUwN2Y2Y2JhOTAzY2JjMCIsInN1YiI6IjY1OTdhMzIyZDdhNzBhMTIyZTZhNWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ac_Stz4Gal2NG_KroSZ8NaNIQ-Y8pO-t-kF2A03CjLs",
  },
};

const createCard = ({ id, backdrop_path, title, overview, vote_average }) => {
  const container = document.querySelector(".movies-container2");
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
  vote.innerText = `⭐️ ${vote_average}`;

  boxImg.append(img);
  box.append(boxImg, h3, span, vote);
  container.append(box);
};

let currentPage = 2;
const moreMovies = document.querySelector(".more");
moreMovies.addEventListener("click", function () {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-US&page=${currentPage}`;

  fetch(url, options)
    .then((response) => response.json())
    .then(({ results }) => {
      results.forEach((movie) => {
        createCard(movie);
      });
      currentPage++;
    })
    .catch((err) => console.error(err));
});
