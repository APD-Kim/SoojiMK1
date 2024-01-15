const form = document.getElementById("form");

const removeAll = () => {
  const movies = document.querySelectorAll(".box");

  movies.forEach((movie) => {
    movie.remove();
  });
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
  vote.innerText = `⭐️ ${vote_average}`;

  boxImg.append(img);
  box.append(boxImg, h3, span, vote);
  container.append(box);
};

const searchMovie = (event) => {
  event.preventDefault();

  const input = document.querySelector(".search-input");
  const { value } = input;
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=8dc708411fa44904f55112b888e86bbd`;

  if (value) {
    removeAll();
    fetch(searchURL)
      .then((respose) => respose.json())
      .then(({ results }) =>
        results.forEach((movie) => {
          findCard(movie);
        })
      );
  }
};

form.addEventListener("submit", searchMovie);
