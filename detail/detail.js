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
let starCount = 0;

function executeRating(stars, result) {
  const starClassActive = "rating__star fas fa-star";
  const starClassUnactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);
      console.log(i);
      starCount = i;

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

const name = document.querySelector("#nickname");
const password = document.querySelector("#password");
const text = document.querySelector("#review-text");
const accessBtn = document.querySelector("#access-btn");
//상세페이지에서 등록버튼 클릭 시 출력
accessBtn.addEventListener("click", (e) => {
  e.preventDefault;
  console.log(name.value);
  console.log(password.value);
  console.log(text.value);
  console.log(starCount + 1);
  name.value === "" ? alert(`닉네임 쓰세연`) : true;
  password.value === "" ? alert(`비밀번호 쓰세연`) : true;
  text.value === "" ? alert(`리뷰글 쓰세연`) : true;
  let userInfo = {
    name: name.value,
    password: password.value,
    text: text.value,
    rating: starCount + 1,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  document.querySelector(".modal-box3").insertAdjacentHTML(
    "beforeend",
    `<div class="review-box">
  <p>${name.value}</p>
  <p>평점 : ${starCount + 1}</p>
  <p>${text.value}</p>
  <button>수정</button>
  <button>삭제</button>
</div>
  `
  );
});
