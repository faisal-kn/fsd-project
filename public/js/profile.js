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
