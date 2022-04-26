const joinBtn = document.getElementById("join-event-btn");

const updatePhotoBtn = document.getElementById("photo-form");
const photo = document.getElementById("photo");
const personal = document.getElementById("personal-1")

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
    console.log(eventOfHost);
    for(i=0; i<2; i++)
    {
      console.log(eventOfHost[i].name, eventOfHost[i].date);
      const string1 = eventOfHost[i].date.substring(0,10);
      const String = `<div>${eventOfHost[i].name}, ${string1}</div>`;
      personal.innerHTML += String;
    }
  } catch (err) {
    console.log(err);
  }
};

getAllUserEvents();
