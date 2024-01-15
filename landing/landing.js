const { MongoClient } = require("mongodb");
const { json } = require("stream/consumers");

function login() {
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");
  if (id.value == "" || pw.value == "") {
    alert("아이디와 비밀번호를 확인해주세요.");
    id.focus();
  } else {
    const userInfo = { id: "사용자 ID", name: "사용자 이름" };
    localStorage.setItem("user", JSON.stringify(userInfo));
    //location.href = "login.ejs";
  }
}
//로그아웃 아직 따로 구현 안함
function logout() {
  localStorage.removeItem("user");
  //location.href = "login.ejs";
}
document.addEventListener("DOMContentLoaded", function () {
  const userInfoString = localStorage.getItem("user");
  if (userInfoString) {
    const userInfo = json.parse(userInfoString);
    console.log("로그인 상태:", userInfo);
  } else {
    console.log("로그인 상태 아님");
  }
});
function back() {
  history.go(-1);
}
function create_id() {
  let db;
  MongoClient.connect(
    "mongodb+srv://admin:black12456@cluster0.yh43doi.mongodb.net/?retryWrites=true&w=majority",
    function (err, client) {
      if (err) {
        return console.log(err);
      }
      db = client.db("forum");
      app.listen(8080, function () {
        console.log("listening on 8000");
      });
    }
  );
  const name = document.querySelector("#name");
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");
  const pw_check = document.querySelector("#pw_check");
  app.post("/add", async (req, res) => {
    console.log(req.body);
  });

  if (
    name.value == "" ||
    id.value == "" ||
    pw.value == "" ||
    pw_check.value == ""
  ) {
    alert("이름과 id, 비밀번호를 입력해주세요");
  } else {
    if (pw.value !== pw_check.value) {
      alert("비밀번호를 확인해주세요");
    } else {
      alert("회원가입이 완료되었습니다");
      /*
      app.post("/add", function (req, res) {
        db.collection("landing").insertOne(
          { name: name, id: id, pw: pw, pw_check: pw_check },
          function (err, result) {
            console.log("저장 완료");
          }
        );
        res.send("전송완료");
      });*/
      /*// mongoose사용 시 사용 가능 db로 데이터 보내기
      const movieSchema = new mongoose.Schema({
        name: String,
        id: String,
        pw: String,
        pw_check: String,
      });
      const Movie = mongoose.model("Movie", movieSchema);
      const amadeus = new Movie({
        name: "name",
        id: "id",
        pw: "pw",
        pw_check: "pw_check",
      });*/
      location.href = "login.ejs";
    }
  }
}
async function pw_find() {
  const name = document.querySelector("#name");
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");
  const response = await fetch("/findPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, id }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log(data);
  } else {
    console.error(data.error);
  }

  if (name.value == "" || id.value == "") {
    alert("이름과 id를 확인해주세요");
    name.focus();
  } else {
    alert(`비밀번호는 ${pw}입니다`);
    location.href = "login.ejs";
  }
}
function checkname() {
  const name = document.querySelector("#name");
  if (name.value == "") {
    alert("이름을 입력해주세요");
    name.focus();
  } else {
    return checkid();
  }
}

function checkid() {
  const id = document.querySelector("#id");
  if (id.length < 6) {
    alert("아이디는 최소 6자리 이상입니다");
    id.focus();
    return false;
  } else if (id.value == "") {
    //search(/\s/) !== -1
    alert("아이디를 입력해주세요");
    id.focus();
    return false;
  } else {
    /*this.$axios;
      .post("", id) //axios로 백엔드와 통신하고 나중에 db사용하여 중복되는 아이디가 있는지 결과를 통신
      .then((res) => {
        if (res.data === true) {
          console.log("중복");
          return false;
        } else if (res.data === false) {
          console.log("사용가능"); 
          return checkpw();
        }
      });*/
    return checkpw();
  }
}

function checkpw(cid, cpw1) {
  if (!/^[a-zA-Z0-9]{8,20}$/.test(cpw1)) {
    alert("비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다");
    return false;
  }

  const chk_num = cpw1.search(/[0-9]/g);
  const chk_eng = cpw1.search(/[a-z]/gi);
  if (chk_num < 0 || chk_eng < 0) {
    alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다");
    return false;
  }
  if (/(\w)\1\1\1/.test(cpw1)) {
    alert("비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다");
    return false;
  }
  if (cpw1.search(cid) > -1) {
    alert("ID가 포함된 비밀번호는 사용하실 수 없습니다");
    return false;
  }
  return true;
}
function checkpw() {
  const cid = document.getElementById("id");
  const cpw1 = document.getElementById("pw");
  const cpw2 = document.getElementById("pw_check");

  if (!/^[a-zA-Z0-9]{6,20}$/.test(cpw1.value)) {
    alert("비밀번호는 숫자와 영문자 조합으로 6~20자리를 사용해야 합니다");
    cpw1.value = "";
    cpw2.value = "";
    cpw1.focus();
    return false;
  }
  const chk_num = cpw1.value.search(/[0-9]/g);
  const chk_eng = cpw1.value.search(/[a-z]/gi);
  if (chk_num < 0 || chk_eng < 0) {
    alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다");
    cpw1.value = "";
    cpw2.value = "";
    cpw1.focus();
    return false;
  }
  if (/(\w)\1\1\1/.test(cpw1.value)) {
    alert("비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다");
    cpw1.value = "";
    cpw2.value = "";
    cpw1.focus();
    return false;
  }
  if (cpw1.value.search(cid.value) > -1) {
    alert("ID가 포함된 비밀번호는 사용하실 수 없습니다");
    return false;
  }
  if (cpw1.value != cpw2.value) {
    alert("비밀번호를 확인해주세요");
    pw.focus();
    return false;
  }
  return create_id();
}
