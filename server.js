const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { MongoClient, Timestamp, ObjectId } = require("mongodb");
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

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTIwODRmMTRjN2Q4YmVkYTUwN2Y2Y2JhOTAzY2JjMCIsInN1YiI6IjY1OTdhMzIyZDdhNzBhMTIyZTZhNWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ac_Stz4Gal2NG_KroSZ8NaNIQ-Y8pO-t-kF2A03CjLs",
  },
};

const axiosGet = async (url) => {
  try {
    const data = await fetch(url, options);
    const response = await data.json();
    return response.results;
  } catch (e) {
    console.error(e);
  }
};

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
    usersCollection = client.db("forum").collection("users");
    app.listen(5555, () => {
      console.log("http://localhost:5555 에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/detail/:category", async (req, res) => {
  const category = req.params.category;
  const categoryUrls = {
    popular: "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    korea:
      "https://api.themoviedb.org/3/discover/movie?language=ko-KR&region=KR&with_original_language=ko",
    action:
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc&with_genres=28",
    romance:
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc&with_genres=10749",
    fantasy:
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc&with_genres=14",
    animation:
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=revenue.desc&with_genres=16",
  };
  console.log(category);
  const categoryUrl = categoryUrls[category];
  const korea = await axiosGet(categoryUrl);
  console.log(korea);
  res.json(korea);
});

app.get("/", async (req, res) => {
  let result = await reviewDb.find().toArray();
  res.render("layout", {
    title: "EJS 템플릿 엔진 적용하기",
    review: result,
  });
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
// app.get("/ranking", (req, res) => {
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTIwODRmMTRjN2Q4YmVkYTUwN2Y2Y2JhOTAzY2JjMCIsInN1YiI6IjY1OTdhMzIyZDdhNzBhMTIyZTZhNWJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ac_Stz4Gal2NG_KroSZ8NaNIQ-Y8pO-t-kF2A03CjLs",
//     },
//   };
//   const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
//   fetch(url, options)
//     .then((response) => response.json())
//     .then(({ results }) => res.render("ranking.ejs", { results: results }))
//     .catch((err) => console.error(err));
// });
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
    // console.log(result);
    res.json(req.body);
    if (result.modifiedCount === 0) {
      throw Error("업데이트 실패: 문서가 안보임");
    }
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
  let land = await landingdb.insertOne({
    name: req.body.name,
    id: req.body.id,
    pw: req.body.pw,
    pw_check: req.body.pw_check,
  });
  console.log(land);
});
// const insertedID = land.insertedID;
// const user = await usersCollection.findOne({ _id: insertedID });
// if (!user) {
//   return res.status(404).json({ error: "사용자를 찾을 수 없습니다" });
// }
// res.status(200).json({ user });
app.post("/findPassword", async (req, res) => {
  const { name, id } = req.body;
  try {
    const user = await usersCollection.findOne({ name, id });
    if (!user) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다" });
    }
    res.status(200).json({ id, name, pw: user.pw });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류" });
  }
});
app.use(
  express({
    secret: "your-secrect-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.post("/login", async (req, res) => {
  const user = { id: "사용자 ID", name: "사용자 이름" };
  req.express.user = user;
  res.status(200).json({ success: true });
});

app.get("/movie", async (req, res) => {
  try {
    console.log(`hi`);
  } catch (e) {
    console.log(e);
    res.status(500).send("server Error :" + error.message);
  }
});
