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
  console.log(e.target);
  if (e.target && e.target.matches("span")) {
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
