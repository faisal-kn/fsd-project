"use Strict";

// import axios from "axios";

const next = document.getElementById("next");
const back = document.getElementById("back");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const form = document.getElementById("form-user--data");
const signupBtn = document.getElementById("signup-btn");

console.log(signupBtn);

next.addEventListener("click", () => {
  // console.log('clicked');
  let mainbox1 = document.getElementById("mainbox");
  mainbox1.style.display = "none";
  let altbox1 = document.getElementById("altbox");
  altbox1.style.display = "flex";
});

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

let hobbiesMap = new Map();
hobbiesMap.set("Games", 0);
hobbiesMap.set("Educational", 0);
hobbiesMap.set("coding meetups", 0);
hobbiesMap.set("Mixers", 0);
hobbiesMap.set("political gatherings", 0);
hobbiesMap.set("Major events", 0);
hobbiesMap.set("Educational", 0);
hobbiesMap.set("Friend meetups", 0);
hobbiesMap.set("Travelling", 0);
hobbiesMap.set("Random meetups", 0);
hobbiesMap.set("Hangouts", 0);

options.forEach((element) => {
  element.style.backgroundColor = "white";
  element.addEventListener("click", () => {
    if (element.style.backgroundColor == "white") {
      element.style.backgroundColor = "blue";
      hobbiesMap.set(element.innerText, 1);
    }
    if (element.style.backgroundColor == "blue" && change == 0) {
      element.style.backgroundColor = "white";
      hobbiesMap.set(element.innerText, 0);
    }
  });
});

let userNameValue = "";
let emailValue = "";
let passwordValue = "";
let confirmPasswordValue = "";

if (form) {
  next.addEventListener("click", (e) => {
    userNameValue = userName.value.trim();
    emailValue = email.value.trim();
    passwordValue = password.value.trim();
    confirmPasswordValue = confirmPassword.value.trim();
  });
}

signupBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(2);
  for (const [key, value] of hobbiesMap.entries()) {
    console.log(key, value);
  }
});

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
