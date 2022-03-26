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
const attendees = document.getElementById("attendees");
const host = document.getElementById("host");
const total = document.getElementById("total");
const form = document.getElementById("form-event--data");

let map;

const eventRequest = (marker, lat, lng) => {
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const eventNameValue = eventName.value.trim();
      const dateValue = date.value.trim();
      const attendeesValue = attendees.value.trim();
      const hostValue = host.value.trim();
      const totalValue = total.value.trim();
      console.log(dateValue);
      createEvent(
        eventNameValue,
        dateValue,
        attendeesValue,
        hostValue,
        totalValue,
        lat,
        lng,
        marker
      );
    });
  }
};

const createEvent = async (
  eventNameValue,
  dateValue,
  attendeesValue,
  hostValue,
  totalValue,
  lat,
  lng,
  marker
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
        attendees: attendeesValue,
        host: hostValue,
        totalSpot: totalValue,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      console.log(data);
      const popup = L.popup().setContent(
        `<a href="http://www.google.com">${data.data.newEvent.name}</a>`
      );
      marker.bindPopup(popup).openPopup();
      myModal.hide();
    } else {
      map.removeLayer(marker);
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

  const marker = new L.Marker([lat, lng]).addTo(map);

  eventRequest(marker, lat, lng);
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
