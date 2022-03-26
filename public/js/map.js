"use Strict";

const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const maxPage = document.getElementById("max-page");
const page = document.getElementById("page");
const popularEvents = document.getElementById("popular-events");
// const addEventBtn = document.getElementById("add-event");
const addNewEventBtn = document.getElementById("add-new-event");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const modal = document.getElementById("myModal");

let map;

const markerHandler = (e) => {
  const { lat, lng } = e.latlng;
  const popup = L.popup().setContent("I am a standalone popup.");

  const marker = new L.Marker([lat, lng]).addTo(map);
  marker.bindPopup(popup).openPopup();
  map.off("click", markerHandler);
  myModal.show();
  modal.addEventListener("hide.bs.modal", (e) => {
    map.removeLayer(marker);
  });
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
  const maxElement = 8;
  const maxPerPage = 3;
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
