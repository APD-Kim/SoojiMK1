// 모달 요소 가져오기
const modal = document.getElementById("myModal");

// 포스터 이미지 요소 가져오기
// const poster = document.getElementById("poster");

// 모달 닫기 버튼 가져오기
const closeButton = document.querySelector(".modal .close");

// console.log(poster);

// 포스터 이미지를 클릭하면 모달 열기
// poster.addEventListener("click", function () {
//   modal.style.display = "block";
// });

// 닫기 버튼을 클릭하면 모달 닫기
document.body.addEventListener("click", function (e) {
  if (e.target.className === "close") {
    modal.style.display = "none";
  }
});

// 모달 외부 영역을 클릭하면 모달 닫기
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

//live -> lc -> poster
import options from "./api.js";
import { fetchMoreMovies } from "./api.js";

console.log(options);
console.log(fetchMoreMovies);
console.log(document.querySelector(".rating").innerHTML.length);

const changeStarGold = (e) => {
  if (e.target.tagName === "SPAN") {
    let stars = document.querySelectorAll(".rating span");
    let clickedStarIndex = Array.prototype.indexOf.call(stars, e.target);

    stars.forEach((star, index) => {
      star.style.color = index <= clickedStarIndex ? "gold" : "black"; // 현재 클릭된 별과 그 이전 별들을 gold로, 나머지는 black으로 설정
    });
  }
};

const changeStarBlack = (e) => {
  if (e.target.tagName === "DIV") {
    let stars = document.querySelectorAll(".rating span");
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.color = "black";
    }
  }
};

const chooseRating = (e) => {};
// const changeStarBlack = (e) => {
//   if (e.target.tagName === "SPAN") {
//     let stars = document.querySelectorAll(".rating span");
//     let clickedStarIndex = Array.prototype.indexOf.call(stars, e.target);

//     stars.forEach((star, index) => {
//       star.style.color = index <= clickedStarIndex ? "black" : "gold"; // 현재 클릭된 별과 그 이전 별들을 gold로, 나머지는 black으로 설정
//     });
//   }
// };

document.querySelector(".rating").addEventListener("mousemove", changeStarGold);

document
  .querySelector(".choose-rating")
  .addEventListener("mousemove", changeStarBlack);

// document
//   .querySelector(".rating")
//   .addEventListener("mousemove", changeStarBlack);

const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

printRatingResult(ratingResult);

function executeRating(stars, result) {
  const starClassActive = "rating__star fas fa-star";
  const starClassUnactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className.indexOf(starClassUnactive) !== -1) {
        printRatingResult(result, i + 1);
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        printRatingResult(result, i);
        for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
      }
    };
  });
}

function printRatingResult(result, num = 0) {
  result.textContent = `${num}/5`;
}

executeRating(ratingStars, ratingResult);
