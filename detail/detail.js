import options from "./api.js";
import { fetchMoreMovies } from "./api.js";

// 모달 요소 가져오기
const modal = document.getElementById("myModal");
const editReviewButtons = document.querySelector(".edit-review");
const deleteReviewButtons = document.querySelectorAll(".delete-review");
const closeButton = document.querySelector(".modal .close-button");
const editClose = document.querySelector("#edit-modal");
const reviewBox = document.querySelectorAll(".review-box");
const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");
const editModalBox = document.querySelector("#edit-modal");
console.log(`hi`);

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
  if (e.target.id === "close-btn1") {
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

// printRatingResult(ratingResult);
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
        // printRatingResult(result, i + 1);
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        // printRatingResult(result, i);
        for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
      }
    };
  });
}

// function printRatingResult(result, num = 0) {
//   result.textContent = `${num}/5`;
// }

executeRating(ratingStars, ratingResult);

const name = document.querySelector("#nickname");
const password = document.querySelector("#password");
const text = document.querySelector("#review-text");
const accessBtn = document.querySelector(".input-box");
//상세페이지에서 등록버튼 클릭 시 출력
accessBtn.addEventListener("submit", async (e) => {
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
// const editReview = (e) => {
//   console.log(e.target);
//   const passwordInput = e.target.querySelector(".edit-review");
//   console.log(passwordInput);
//   const passwordValue = passwordInput.getAttribute("data-password");

//   const dataId = e.target.querySelector(".id");
//   const id = dataId.getAttribute("data-id");
//   if (passwordInput.value === passwordValue) {
//     editModalBox.style.display = "flex";
//     fetch(`/search/review?id=${id}`)
//       .then((response) => response.json()) // 자바스크립트가 사용할수 있는 오브젝트로 바꿈
//       .then((data) => {
//         if (Object.keys(data).length === 0)
//           throw Error("데이터가 비어있습니다.");
//         console.log(`성공결과입니다`, data);
//         document.querySelector("#edit-name").value = data.name;
//         document.querySelector("#edit-text").value = data.text;
//         document.querySelector("#edit-rating").value = data.rating;
//         //수정하기 버튼을 눌렀을 때 db의 내용을 수정해주는 이벤트리스너
//         document.querySelector("#edit-btn").addEventListener("click", (e) => {
//           e.preventDefault();
//           let userInfo = {
//             name: document.querySelector("#edit-name").value,
//             text: document.querySelector("#edit-text").value,
//             rating: document.querySelector("#edit-rating").value,
//             id: id,
//           };
//           console.log(userInfo);
//           fetch("/review/edit", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userInfo),
//           })
//             .then((response) => response.json())
//             .then((data) => {
//               console.log(data);
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//             });
//         });
//       })
//       .catch((e) => console.log("여기 캐치입니다", e));
//   } else {
//     alert("비밀번호가 틀렸습니다.");
//   }
//   // 비밀번호가 맞으면 추가 로직 수행...
// };

const UpdateReview = (data) => {
  const id = data.id;
  const reviewElement = document.querySelector(
    `[data-id="${id}"]`
  ).parentElement;
  console.log(reviewElement);
  console.log(reviewElement.children[0]);
  reviewElement.children[0].textContent = `${data.name}`;
  reviewElement.children[1].textContent = `평점 : ${data.rating}`;
  reviewElement.children[2].textContent = `${data.text}`;
  reviewElement.children[5].value = "";
};

document.querySelector(".modal-box3").addEventListener("click", (e) => {
  console.log(e.target);
  const password = e.target.parentElement.children[5];
  const id = e.target.parentElement.children[6].dataset.id;
  //이벤트 타겟의 부모의 자식요소
  const passwordValue = password.value;
  console.log(password.dataset.password);
  console.log(passwordValue);
  console.log(password.dataset.password === passwordValue);
  console.log(id);
  if (
    password.dataset.password === passwordValue &&
    e.target.matches("BUTTON")
  ) {
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
        document.querySelector("#edit-btn").addEventListener("click", (e) => {
          e.preventDefault();
          let userInfo = {
            name: document.querySelector("#edit-name").value,
            text: document.querySelector("#edit-text").value,
            rating: document.querySelector("#edit-rating").value,
            id: id,
          };
          if (userInfo.rating > 5) {
            alert("5점까지만 줄수있어요");
          } else {
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
                editModalBox.style.display = "none";
                UpdateReview(data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        });
      });
  } else if (
    password.dataset.password !== passwordValue &&
    e.target.matches("BUTTON")
  ) {
    alert("비번틀림");
  }
});

deleteReviewButtons.forEach((button, index) => {
  //해당 버튼의 id값을 찾아서
  button.addEventListener("click", async function (e) {
    const dataId = document.querySelectorAll(".id")[index];
    const id = dataId.getAttribute("data-id");
    const passwordInput = document.querySelectorAll(".edit-password")[index];
    const passwordValue = passwordInput.getAttribute("data-password");
    console.log(id);
    if (passwordInput.value === passwordValue) {
      fetch(`/review/delete?id=${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data._id === id) {
            reviewBox[index].style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert(`비밀번호가 틀렸습니다.`);
    }
  });
});
// const deleteReview = (e) => {
//   console.log(e.target);
//   if (e.target.className === "delete-review") {
//     console.log(`hi`);
//   }
// };

// document.querySelector(".modal-box3").addEventListener("click", deleteReview);
