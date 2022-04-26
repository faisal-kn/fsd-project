const joinBtn = document.getElementById("join-event-btn");

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

const getAllUserEvents = async () => {
  try {
    const res = await fetch(
      "http://localhost:3001/api/event/get-events-of-host",
      {
        method: "GET",
      }
    );
    const data = await res.json();
    console.log(data);
    const eventOfHost = data.data.eventsOfHost;
    eventOfHost.forEach((oneHost) => {
      console.log(oneHost);
    });
  } catch (err) {
    console.log(err);
  }
};

getAllUserEvents();
