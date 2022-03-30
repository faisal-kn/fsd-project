const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form-user--data");
const loginBtn = document.getElementById("login-btn");

console.log(form, loginBtn);

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

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    if(emailValue && passwordValue)
    {
      login(emailValue, passwordValue);
    }
    else
    {
      showAlert('error','please fill all the fields');
    }
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
