const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/detail"));
app.use(express.static(__dirname + "/img"));
app.use(express.static(__dirname + "/feature_ranking"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

const { MongoClient, Timestamp } = require("mongodb");
let db;
const url =
  "mongodb+srv://admin:lol940620@cluster0.yh43doi.mongodb.net/?retryWrites=true&w=majority";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");
    app.listen(5555, () => {
      console.log("http://localhost:5555 에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTIwODRmMTRjN2Q4YmVkYTUwN2Y2Y2JhOTAzY2JjMCIsInN1YiI6IjY1OTdhMzIyZDdhNzBhMTIyZTZhNWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ac_Stz4Gal2NG_KroSZ8NaNIQ-Y8pO-t-kF2A03CjLs",
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

app.get("/search", (req, res) => {
  res.render("search.ejs");
});

app.get("/ranking", (req, res) => {
  let currentPage = 0;
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${
    currentPage + 1
  }`;
  fetch(url, options)
    .then((response) => response.json())
    .then(({ results }) => {
      res.render("ranking.ejs", { results: results });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/", (req, res) => {
  res.render("layout", { title: "EJS 템플릿 엔진 적용하기" });
});
