//리뷰 삭제버튼 onClick

async function deleteReview(e) {
  const deleteButton = e.target;
  const id = deleteButton.dataset.id;
  const password = deleteButton.dataset.password;
  const passwordValue = e.target.parentElement.children[5].value;
  if (
    deleteButton.classList.contains("delete-review") &&
    password == passwordValue
  ) {
    deleteButton.parentElement.style.display = "none";
    const response = await fetch("/review/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    alert("삭제완료");
  } else if (
    deleteButton.classList.contains("delete-review") &&
    password != passwordValue
  ) {
    alert("비밀번호 틀림");
  }
}
