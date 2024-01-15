function deleteReview(e) {
  console.log(e.target);
  if (e.target.className === "delete-review") {
    console.log(`hi`);
  }
  e.target.parentElement.style.display = "none";
}
