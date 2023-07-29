var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var pass = document.getElementById("pass");
var insertText = document.getElementById("insertText");
// ===========================================
var signUpBtn = document.getElementById("signUpBtn");
var signInBtn = document.getElementById("signInBtn");
// prag and links elemets
var signUpLink = document.getElementById("signUpLink");
var signInLink = document.getElementById("signInLink");
var signUpPrag = document.getElementById("signUpPrag");
var signInPrag = document.getElementById("signInPrag");
var TermsBox = document.getElementById("TermsBox");
// ===========================================
signUpLink.addEventListener("click", function (e) {
  e.preventDefault();
  userName.classList.replace("d-none", "d-block");
  signUpPrag.classList.replace("d-block", "d-none");
  signInPrag.classList.replace("d-none", "d-block");
  signInBtn.classList.replace("d-block", "d-none");
  signUpBtn.classList.replace("d-none", "d-block");
  TermsBox.classList.replace("d-none", "d-block");
  insertText.innerHTML = ``;
});
// ===========================================
signInLink.addEventListener("click", function (e) {
  e.preventDefault();
  userName.classList.replace("d-block", "d-none");
  signUpPrag.classList.replace("d-none", "d-block");
  signInPrag.classList.replace("d-block", "d-none");
  signInBtn.classList.replace("d-none", "d-block");
  signUpBtn.classList.replace("d-block", "d-none");
  TermsBox.classList.replace("d-block", "d-none");
  insertText.innerHTML = ``;
});
// chack if input are empty in sign up
function chackEmptyAllInput() {
  if (userName.value == "" || userEmail.value == "" || pass.value == "") {
    return false;
  } else {
    return true;
  }
}
function isEmptySignUp() {
  if (
    chackEmptyAllInput() &&
    isNameValid() &&
    isEmailValid() &&
    isPassValid()
  ) {
    return true;
  } else {
    insertText.innerHTML = `<p class="text-danger fw-semibold ">All inputs is required</p>`;
    return false;
  }
}
// chack if input are empty in sign in

function chackEmptyPassEmail() {
  if (userEmail.value == "" || pass.value == "") {
    return false;
  } else {
    return true;
  }
}

function isEmptySignIn() {
  if (chackEmptyPassEmail() && isEmailValid() && isPassValid()) {
    return true;
  } else {
    insertText.innerHTML = `<p class="text-danger fw-semibold ">All inputs is required</p>`;
    return false;
  }
}
// add user to local**************************************************************************
var usersList;
if (localStorage.getItem("users")) {
  usersList = JSON.parse(localStorage.getItem("users"));
} else {
  usersList = [];
}
// **********************************///////////////////////////////////***********************************/*/*/*/// */
signUpBtn.addEventListener("click", function () {
  if (!isEmptySignUp()) {
    return false;
  }
  if (localStorage.getItem("users") == null) {
    // empty for first time
    saveUser();
    insertText.innerHTML = `<p class="text-success fw-semibold ">Success</p>`;
    location = "./home.html";
    return true;
  }
  if (checkExistEmail()) {
    insertText.innerHTML = `<p class="text-danger fw-semibold ">email already exists</p>`;
  } else {
    saveUser();
    location = "./home.html";
    insertText.innerHTML = `<p class="text-success fw-semibold ">Success</p>`;
  }
  clear();
});
function saveUser() {
  var user = {
    name: userName.value,
    email: userEmail.value,
    password: pass.value,
  };
  usersList.push(user);
  localStorage.setItem("users", JSON.stringify(usersList));
  localStorage.setItem("homeUserName", userName.value);
}
// =================================================================******************************
function checkExistEmail() {
  for (var i = 0; i < usersList.length; i++) {
    if (userEmail.value == usersList[i].email) {
      return true;
    } else {
      return false;
    }
  }
}
// /********************************************************************** */
signInBtn.addEventListener("click", function () {
  if (!isEmptySignIn()) {
    return false;
  }
  if (searchStorage()) {
    location = "./home.html";
  }
});

function searchStorage() {
  for (var i = 0; i < usersList.length; i++) {
    if (
      userEmail.value == usersList[i].email &&
      pass.value == usersList[i].password
    ) {
      localStorage.setItem("homeUserName", usersList[i].name);
      return true;
    } else {
      insertText.innerHTML = `<p class="text-danger fw-semibold ">incorrect email or password</p>`;
      return false;
    }
  }
}
// validtion sec===============================
var userNameRegex = /^[A-Z]\w+( )?\w*$/;
var userEmailRegex = /^[a-z0-9]+@(gmail|outlook)(\.com)$/;
var userPassRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/;
console.log(userPassRegex.test("1234AAa@qdsad"));
function isNameValid() {
  if (userNameRegex.test(userName.value)) {
    return true;
  } else {
    return false;
  }
}
function isEmailValid() {
  if (userEmailRegex.test(userEmail.value)) {
    return true;
  } else {
    return false;
  }
}
function isPassValid() {
  if (userPassRegex.test(pass.value)) {
    return true;
  } else {
    return false;
  }
}

userName.addEventListener("input", function () {
  validation(userName, userNameRegex);
});

userEmail.addEventListener("input", function () {
  validation(userEmail, userEmailRegex);
});

pass.addEventListener("input", function () {
  validation(pass, userPassRegex);
});

function validation(input, regexType) {
  if (regexType.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}

function clear() {
  userName.value = "";
  userEmail.value = "";
  pass.value = "";
  userName.classList.remove("is-valid");
  userEmail.classList.remove("is-valid");
  pass.classList.remove("is-valid");
}
