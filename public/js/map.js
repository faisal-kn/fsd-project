"use Strict";

const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const maxPage = document.getElementById("max-page");
const page = document.getElementById("page");
const popularEvents = document.getElementById("popular-events");
const addNewEventBtn = document.getElementById("add-new-event");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const modal = document.getElementById("myModal");
const eventName = document.getElementById("name");
const date = document.getElementById("date");
const hobbies = document.getElementById("hobbies");
const host = document.getElementById("host");
const total = document.getElementById("total");
const form = document.getElementById("form-event--data");
const eventDescription = document.getElementById("event-description");

let map;

const eventRequest = (lat, lng) => {
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const eventNameValue = eventName.value.trim();
      const dateValue = date.value.trim();
      const hobbiesValue = hobbies.value.trim();
      const hostValue = host.value.trim();
      const totalValue = total.value.trim();
      const eventDescriptionValue = eventDescription.value.trim();
      createEvent(
        eventNameValue,
        dateValue,
        hobbiesValue,
        hostValue,
        totalValue,
        eventDescriptionValue,
        lat,
        lng
      );
    });
  }
};

const createMarker = (ele) => {
  const marker = new L.Marker([ele.location[0], ele.location[1]]);
  const popup = L.popup().setContent(
    `<a href="http://www.google.com">${ele.name}</a>`
  );
  marker.bindPopup(popup).openPopup();
  marker.addTo(map);
};

const getAllEvents = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/event/all-events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "success") {
      data.data.events.forEach((ele) => {
        createMarker(ele);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createEvent = async (
  eventNameValue,
  dateValue,
  hobbiesValue,
  hostValue,
  totalValue,
  eventDescriptionValue,
  lat,
  lng
) => {
  try {
    const res = await fetch("http://localhost:3001/api/event/create-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventNameValue,
        date: dateValue,
        location: [lat, lng],
        hobby: hobbiesValue,
        host: hostValue,
        description: eventDescriptionValue,
        totalSpot: totalValue,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      createMarker(data.data.newEvent);
      myModal.hide();
    }
  } catch (err) {
    console.log(err);
  }
};

const getHobbies = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/user/hobbies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
  } catch (err) {
    console.log(err);
  }
};

const markerHandler = (e) => {
  const { lat, lng } = e.latlng;

  eventRequest(lat, lng);
  map.off("click", markerHandler);
  myModal.show();
  // modal.addEventListener("hide.bs.modal", (e) => {
  //   map.removeLayer(marker);
  // });
};

addNewEventBtn.addEventListener("click", (e) => {
  map.on("click", markerHandler);
});

const getPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(loadMap, function () {
      alert("Could not get your location");
    });
  }
};

const loadMap = (position) => {
  const { latitude } = position.coords;
  const { longitude } = position.coords;

  const coords = [latitude, longitude];
  map = L.map("map", {
    center: coords,
    zoom: 13,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  getAllEvents();
};

const currentPage = (currentPage) => {
  page.innerHTML = currentPage;
};

const pagination = () => {
  const maxElement = 7;
  const maxPerPage = 2;
  if (maxElement > maxPerPage) {
    const totalPage = Math.ceil(maxElement / maxPerPage);
    maxPage.innerHTML = totalPage;

    leftBtn.addEventListener("click", (e) => {
      if (page.innerHTML > 1) {
        page.innerHTML--;
      } else if (page.innerHTML == 1) {
        page.innerHTML = totalPage;
      }
      renderPopularEvents(maxElement, page.innerHTML, maxPerPage);
    });

    rightBtn.addEventListener("click", (e) => {
      if (page.innerHTML < totalPage) {
        page.innerHTML++;
      } else if (page.innerHTML == totalPage) {
        page.innerHTML = 1;
      }
      renderPopularEvents(maxElement, page.innerHTML, maxPerPage);
    });
  }
  renderPopularEvents(maxElement, 1, maxPerPage);
};

const renderPopularEvents = (maxElement, currentPage, maxPerPage) => {
  const start = (currentPage - 1) * maxPerPage;
  let end = start + maxPerPage;
  if (end > maxElement) {
    end = maxElement;
  }
  console.log(start, end);
  popularEvents.innerHTML = "";
  for (let i = start; i < end; i++) {
    const eventMarkup = `
    <div class="row">
      <div class="col">
        <img src="https://secure-content.meetupstatic.com/images/classic-events/470917220/222x125.jpg" width="222" height="125" alt="" class="image1"/>
      </div> 
      <div class="col">
        <span>THU, MAR 24 @ 5:30 AM IST</span>
        <p style="font: size 20px;">
          Tennis Tournament
        </p>
        <h5>
          New York , NY
        </h5>
        <p>
          1 attendee -<span style="color:rgb(224, 58, 58)"> 3 spots left</span>
        </p>
    </div>
      <hr style="width:80%; margin:auto; margin-bottom:9px;"/>
    </div>
  `;
    popularEvents.innerHTML += eventMarkup;
  }
};

getPosition();
pagination();
