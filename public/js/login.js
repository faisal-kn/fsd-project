const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form-user--data");
const loginBtn = document.getElementById("login-btn");

class LoginForm {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginFormObj = new LoginForm(
      email.value.trim(),
      password.value.trim()
    );
    console.log(loginFormObj.email, loginFormObj.password);
    login(loginFormObj.email, loginFormObj.password);
  });
}

const login = async (emailValue, passwordValue) => {
  try {
    console.log(emailValue, passwordValue);
    const res = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      window.location.href = "http://localhost:3001/events";
    }
  } catch (err) {
    console.log(err);
  }
};
