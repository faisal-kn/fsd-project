let userid = document.getElementById("useridlink");
userid.addEventListener("click", () => {
  let body = document.getElementById("body");
  body.animate(
    {
      scrollTop: document.getElementById("userid").offset().top,
    },
    "slow"
  );
});

const updatePhotoBtn = document.getElementById("photo-form");
const photo = document.getElementById("photo");

updatePhotoBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append("photo", photo.files[0]);
  form.append("userId", "hello");
  console.log(form);
  try {
    const res = await fetch("http://localhost:3001/api/user/updatePhoto", {
      method: "PATCH",
      body: form,
    });
  } catch (err) {
    console.log(err);
  }
});
