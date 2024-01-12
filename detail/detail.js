// 모달 요소 가져오기
const modal = document.getElementById("myModal");
const editReviewButtons = document.querySelectorAll(".edit-review");
const deleteReviewButtons = document.querySelectorAll(".delete-review");
const closeButton = document.querySelector(".modal .close");
const editClose = document.querySelector("#edit-modal");
const reviewBox = document.querySelectorAll(".review-box");
const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

// console.log(poster);

// 포스터 이미지를 클릭하면 모달 열기
// poster.addEventListener("click", function () {
//   modal.style.display = "block";
// });

// 닫기 버튼을 클릭하면 모달 닫기
document.body.addEventListener("click", function (e) {
  if (e.target.id === "detail-close") {
    modal.style.display = "none";
  }
});

document.body.addEventListener("click", function (e) {
  if (e.target.id === "close-btn") {
    editClose.style.display = "none";
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

document.querySelector(".rating").addEventListener("mousemove", changeStarGold);

document
  .querySelector(".choose-rating")
  .addEventListener("mousemove", changeStarBlack);

// document
//   .querySelector(".rating")
//   .addEventListener("mousemove", changeStarBlack);

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
      document.querySelector("#starCountInput").value = i + 1;
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
const accessBtn = document.querySelector(".input-box");
//상세페이지에서 등록버튼 클릭 시 출력
accessBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  if (starCount + 1 <= 1) {
    alert("평점 매기세여");
    return false;
  }
  if (name.value === "") {
    alert("닉네임 쓰세연");
    return false;
  }
  if (password.value === "") {
    alert("비밀번호 쓰세연");
    return false;
  }
  if (text.value === "") {
    alert("리뷰글 쓰세연");
    return false;
  }

  let userInfo = {
    name: name.value,
    password: password.value,
    text: text.value,
    rating: starCount + 1,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  fetch("/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".modal-box3").insertAdjacentHTML(
        "beforeend",
        `<div class="review-box">
      <p>${name.value}</p>
      <p>평점 : ${starCount + 1}</p>
      <p>${text.value}</p>
      <button class="edit-review">수정</button>
      <button class="delete-review">삭제</button>
      <input class="edit-password" type="password" data-password="${
        password.value
      }">
      <input class="id" type="hidden" data-id=${data.id}>
    </div>`
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// if(document.querySelector('#edit-password').value ===)

editReviewButtons.forEach((button, index) => {
  //비밀번호가 일치하면 수정 모달창을 띄워주는 이벤트리스너
  button.addEventListener("click", async function (e) {
    const passwordInput = document.querySelectorAll(".edit-password")[index];
    const passwordValue = passwordInput.getAttribute("data-password");
    const editModalBox = document.querySelector("#edit-modal");
    const dataId = document.querySelectorAll(".id")[index];
    const id = dataId.getAttribute("data-id");
    if (passwordInput.value === passwordValue) {
      editModalBox.style.display = "flex";
      fetch(`/search/review?id=${id}`)
        .then((response) => response.json()) // 자바스크립트가 사용할수 있는 오브젝트로 바꿈
        .then((data) => {
          if (Object.keys(data).length === 0)
            throw Error("데이터가 비어있습니다.");
          console.log(`성공결과입니다`, data);
          document.querySelector("#edit-name").value = data.name;
          document.querySelector("#edit-text").value = data.text;
          document.querySelector("#edit-rating").value = data.rating;
          //수정하기 버튼을 눌렀을 때 db의 내용을 수정해주는 이벤트리스너
          document.querySelector("#edit-btn").addEventListener("click", (e) => {
            e.preventDefault();
            let userInfo = {
              name: document.querySelector("#edit-name").value,
              text: document.querySelector("#edit-text").value,
              rating: document.querySelector("#edit-rating").value,
              id: id,
            };
            console.log(userInfo);
            fetch("/review/edit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
        })
        .catch((e) => console.log("여기 캐치입니다", e));
    } else {
      alert("비밀번호가 틀렸습니다.");
    }

    // 비밀번호가 맞으면 추가 로직 수행...
  });
});

//수정하기 버튼을 눌렀을 때 최초 내용이 수정버튼을 눌렀던 내용인지 아는방법
//1.수정하기 버튼을 눌렀을 때 id값과 이름,평점,내용을 서버로 post요청을 한다.
//2.서버는 id값과 일치하는 데이터의 이름, 평점,내용의 밸류를 수정한다.

// deleteReviewButtons.forEach((button, index) => {
//   //해당 버튼의 id값을 찾아서
//   button.addEventListener("click", async function (e) {
//     const dataId = document.querySelectorAll(".id")[index];
//     const id = dataId.getAttribute("data-id");
//     const passwordInput = document.querySelectorAll(".edit-password")[index];
//     const passwordValue = passwordInput.getAttribute("data-password");
//     console.log(id);
//     if (passwordInput.value === passwordValue) {
//       fetch(`/review/delete?id=${id}`, {
//         method: "DELETE",
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//           if (data._id === id) {
//             reviewBox[index].style.display = "none";
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     } else {
//       alert(`비밀번호가 틀렸습니다.`);
//     }
//   });
// });
const deleteReview = (e) => {
  console.log(e.target);
  if (e.target.className === "delete-review") {
    console.log(`hi`);
  }
};

document.querySelector(".modal-box3").addEventListener("click", deleteReview);
