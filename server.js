const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/detail"));
app.use(express.static(__dirname + "/img"));
app.use(express.static(__dirname + "/landing"));
// app.set("views", path.join(__dirname + "/views"));
app.use(express.static(__dirname + "/feature_ranking"));
app.use(express.static(__dirname + "/search"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { MongoClient, Timestamp, ObjectId } = require("mongodb");
let db;
let reviewDb;
let landingdb;
const url =
  "mongodb+srv://admin:black12456@cluster0.2samj3t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    landingdb = client.db("forum").collection("landing");
    reviewDb = client.db("forum").collection("review");
    app.listen(5555, () => {
      console.log("http://localhost:5555 에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", async (req, res) => {
  let result = await reviewDb.find().toArray();
  res.render("layout", { title: "EJS 템플릿 엔진 적용하기", review: result });
});
app.post("/review", async (req, res) => {
  let body = req.body;
  console.log(body);
  try {
    const result = await reviewDb.insertOne({
      name: body.name,
      password: body.password,
      text: body.text,
      rating: body.rating,
    });
    console.log(result);
    res.json({ id: result.insertedId });
  } catch (e) {
    res.status(500).send("server error");
  }
});
app.get("/search", (req, res) => {
  res.render("search.ejs");
});
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
app.get("/ranking", (req, res) => {
  res.render("ranking.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/passwordcheck", (req, res) => {
  res.render("pwcheck.ejs");
});
app.get("/landing", (req, res) => {
  res.render("join.ejs");
});
app.get("/search/review", async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    let reviewData = await reviewDb.findOne({ _id: new ObjectId(`${id}`) });
    console.log(reviewData);
    if (reviewData) {
      res.json(reviewData);
    } else {
      res.status(404).send("해당 리뷰가 없습니다");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});
app.post("/review/edit", async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, text, rating } = req.body;
    let reviewData = await reviewDb.findOne({ _id: new ObjectId(`${id}`) });
    const result = await reviewDb.updateOne(
      { _id: new ObjectId(`${id}`) },
      { $set: { name: name, text: text, rating: rating } }
    );
    if (result.modifiedCount === 0) {
      throw Error("업데이트 실패: 문서가 안보임");
    }
    // res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
app.delete("/review/delete", async (req, res) => {
  try {
    console.log(req.query.id);
    const id = req.query.id;
    let reviewData = await reviewDb.findOne({ _id: new ObjectId(`${id}`) });
    const result = await reviewDb.deleteOne({ _id: new ObjectId(`${id}`) });
    console.log(reviewData);
    res.json(reviewData);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
app.get("/join", async (req, res) => {
  res.render("join.ejs");
});
app.post("/add", async (req, res) => {
  console.log(req.body);
  let land = landingdb.insertOne({
    name: req.body.name,
    id: req.body.id,
    pw: req.body.pw,
    pw_check: req.body.pw_check,
  });
  console.log(land);
});
