const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/detail"));
app.use(express.static(__dirname + "/img"));

app.set("view engine", "ejs");

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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

app.get("/search", (req, res) => {
  const imagePath = "/js.png";
  res.render("search.ejs", { imagePath: imagePath });
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
