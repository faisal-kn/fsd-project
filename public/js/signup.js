"use Strict";

const next = document.getElementById("next");
const back = document.getElementById("back");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const form = document.getElementById("form-user--data");
const signupBtn = document.getElementById("signup-btn");

next.addEventListener("click", () => {
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
    console.log(element.style.backgroundColor);
    if (element.style.backgroundColor == "white") {
      element.style.backgroundColor = "blue";
      change = 1;
      hobbiesMap.set(element.innerText, 1);
    }
    if (element.style.backgroundColor == "blue" && change == 0) {
      element.style.backgroundColor = "white";
      hobbiesMap.set(element.innerText, 0);
    }
    change = 0;
  });
});

let userNameValue = "";
let emailValue = "";
let passwordValue = "";
let confirmPasswordValue = "";
let hobbies = [];

if (form) {
  next.addEventListener("click", (e) => {
    userNameValue = userName.value.trim();
    emailValue = email.value.trim();
    passwordValue = password.value.trim();
    confirmPasswordValue = confirmPassword.value.trim();
  });
}

signupBtn.addEventListener("click", () => {
  for (const [key, value] of hobbiesMap.entries()) {
    if (value === 1) {
      hobbies.push(key);
    }
  }

  signup(
    userNameValue,
    emailValue,
    passwordValue,
    confirmPasswordValue,
    hobbies
  );
});

const signup = async (
  userNameValue,
  emailValue,
  passwordValue,
  confirmPasswordValue,
  hobbies
) => {
  try {
    console.log(
      userNameValue,
      emailValue,
      passwordValue,
      confirmPasswordValue,
      hobbies
    );
    const res = await fetch("http://localhost:3001/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userNameValue,
        email: emailValue,
        password: passwordValue,
        confirmPassword: confirmPasswordValue,
        hobbies: hobbies,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      window.location.href = "http://localhost:3001/events";
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
