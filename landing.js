function login() {
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");
  if (id.value == "" || pw.value == "") {
    alert("아이디와 비밀번호를 확인해주세요.");
    id.focus();
  } else {
    location.href = "login.html";
  }
}
function back() {
  history.go(-1);
}
function create_id() {
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");
  const pw_check = document.querySelector("#pw_check");
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
      name.value = name;
      id.value = id;
      pw.value = pw;
      location.href = "join.html";
    }
  }
}
function pw_find() {
  const name = document.querySelector("#name");
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");

  if (name.value == "" || id.value == "") {
    alert("이름과 id를 확인해주세요");
    name.focus();
  } else {
    alert(`비밀번호는 ${pw}입니다`);
    location.herf = "login.html";
  }
}
function checkpw(cid, cpw) {
  if (!/^[a-zA-Z0-9]{8,20}$/.test(cpw)) {
    alert("비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다");
    return false;
  }

  const chk_num = cpw.search(/[0-9]/g);
  const chk_eng = cpw.search(/[a-z]/gi);
  if (chk_num < 0 || chk_eng < 0) {
    alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다");
    return false;
  }
  if (/(\w)\1\1\1/.test(cpw)) {
    alert("비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다");
    return false;
  }
  if (upw.search(cid) > -1) {
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
  return create_id();
}
