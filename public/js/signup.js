"use Strict";

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
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      window.localStorage.setItem("token", JSON.stringify(data.token));
    }
  } catch (err) {
    console.log(err);
  }
};
