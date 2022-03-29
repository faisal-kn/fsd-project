// "use Strict";
const next = document.getElementById("next");
const back = document.getElementById("back");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const form = document.getElementById("form-user--data");
const signupBtn = document.getElementById("signup-btn");
const mainbox1 = document.getElementById("mainbox");
const altbox1 = document.getElementById("altbox");

let userNameValue = "";
let emailValue = "";
let passwordValue = "";
let confirmPasswordValue = "";
let hobbies = [];

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg, time = 5) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};

next.addEventListener("click", () => {
  userNameValue = userName.value.trim();
  emailValue = email.value.trim();
  passwordValue = password.value.trim();
  confirmPasswordValue = confirmPassword.value.trim();

  if (passwordValue.length < 8) {
    showAlert("error", "Password must be at least 8 characters long");
    return;
  }
  if (passwordValue != confirmPasswordValue) {
    showAlert("error", "Confirm password do not match");
    return;
  }
  if (userNameValue && emailValue && passwordValue && confirmPasswordValue) {
    mainbox1.style.display = "none";
    altbox1.style.display = "flex";
  } else {
    // console.log(userNameValue, emailValue, passwordValue, confirmPasswordValue);
    showAlert("error", "Please fill all the fields");
  }
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
      element.style.backgroundColor = "aqua";
      change = 1;
      hobbiesMap.set(element.innerText, 1);
    }
    if (element.style.backgroundColor == "aqua" && change == 0) {
      element.style.backgroundColor = "white";
      hobbiesMap.set(element.innerText, 0);
    }
    change = 0;
  });
});

if (form) {
  next.addEventListener("click", (e) => {});
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
