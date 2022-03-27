"use Strict";

// import axios from "axios";

let next = document.getElementById("next");
next.addEventListener("click", () => {
  // console.log('clicked');
  let mainbox1 = document.getElementById("mainbox");
  mainbox1.style.display = "none";
  let altbox1 = document.getElementById("altbox");
  altbox1.style.display = "flex";
});

let back = document.getElementById("back");
back.addEventListener("click", () => {
  // console.log('clicked');
  let altbox2 = document.getElementById("altbox");
  altbox2.style.display = "none";
  let mainbox2 = document.getElementById("mainbox");
  mainbox2.style.display = "flex";
});

let options = document.getElementsByClassName("options");
let change = 0;
options = Array.from(options);
options.forEach((element) => {
  element.style.backgroundColor = "white";
  element.addEventListener("click", () => {
    console.log(element.style.backgroundColor);
    if (element.style.backgroundColor == "white") {
      element.style.backgroundColor = "blue";
      console.log(element.style.backgroundColor);
      change = 1;
    }
    if (element.style.backgroundColor == "blue" && change == 0) {
      element.style.backgroundColor = "white";
    }

    change = 0;
  });
});

const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const form = document.getElementById("form-user--data");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userNameValue = userName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    console.log(userNameValue, emailValue, passwordValue, confirmPasswordValue);
    signup(userNameValue, emailValue, passwordValue, confirmPasswordValue);
  });
}

const signup = async (
  userNameValue,
  emailValue,
  passwordValue,
  confirmPasswordValue
) => {
  try {
    const res = await fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userNameValue,
        email: emailValue,
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
