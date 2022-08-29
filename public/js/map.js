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
const hobby = document.getElementById("hobbies-select");
const secondButton = document.getElementById("secondButton");

const updatePhotoBtn = document.getElementById("photo-form");
const photo = document.getElementById("photo");

let map;
let markerGroup = [];

class Event {
  constructor(name, date, host, total, description, hobbies) {
    this.name = name;
    this.date = date;
    this.host = host;
    this.total = total;
    this.description = description;
    this.hobbies = hobbies;
  }
}

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
      const newEvent = new Event(
        eventNameValue,
        dateValue,
        hostValue,
        totalValue,
        eventDescriptionValue,
        hobbiesValue,
      );
      createEvent(
        newEvent.name,
        newEvent.date,
        newEvent.hobbies,
        newEvent.host,
        newEvent.total,
        newEvent.description,
        lat,
        lng
      );
    });
  }
};

const createMarker = (ele) => {
  console.log(ele.location[0], ele.location[1]);
  const marker = new L.Marker([ele.location[0], ele.location[1]]);
  const popup = L.popup().setContent(
    `<a href=/events/${ele._id}>${ele.name}</a>`
  );
  marker.bindPopup(popup).openPopup();
  markerGroup.push(marker);
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
    const form = new FormData();
    console.log(photo);
    form.append("photo", photo.files[0]);
    form.append("name", eventNameValue);
    form.append("date", dateValue);
    form.append("location", [lat, lng]);
    form.append("hobby", hobbiesValue);
    form.append("host", hostValue);
    form.append("description", eventDescriptionValue);
    form.append("totalSpot", totalValue);
    console.log([lat, lng]);
    const res = await fetch("http://localhost:3001/api/event/create-event", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    flag = 1;
    console.log(data);
    if (data.status === "success") {
      createMarker(data.data.newEvent);
      myModal.hide();
    }
  } catch (err) {
    console.log(err);
  }
};

const markerHandler = (e) => {
  const { lat, lng } = e.latlng;

  eventRequest(lat, lng);
  map.off("click", markerHandler);
  myModal.show();
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
  L.Icon.Default.prototype.options = {
    iconUrl: "/assets/alt-icon.png",
    iconSize: [20, 70],
    iconAnchor: [10, 70],
  };
  getAllEvents();
};

const currentPage = (currentPage) => {
  page.innerHTML = currentPage;
};

if (secondButton) {
  secondButton.addEventListener("click", async () => {
    hobbyValue = hobby.value;
    console.log(hobbyValue);
    const res = await fetch(
      `http://localhost:3001/api/event/get-event-by-hobby/${hobbyValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    markerGroup.forEach((marker) => {
      map.removeLayer(marker);
    });
    data.data.eventByHobby.forEach((ele) => {
      createMarker(ele);
    });
    console.log(data);
  });
}

const forwardgeoencode = async (a) => {
  try {
    const string =
      "http://api.positionstack.com/v1/forward?access_key=fc9a1ebd02ce67ca55a38e4143527ec3&query=" +
      a;
    const res = await fetch(string);
    const information = await res.json();
    return information;
  } catch (err) {
    console.log(err);
  }
};

const addforwarddata = async (a) => {
  try {
    const info = await forwardgeoencode(a);
    const f = [];
    f[0] = info.data[0].latitude;
    f[1] = info.data[0].longitude;
    return f;
  } catch (err) {
    console.log(err);
  }
};

if (thirdButton) {
  thirdButton.addEventListener("click", async () => {
    const city = document.getElementById("lat").value;
    const loc = await addforwarddata(city);
    console.log(loc);
    var markerBounds = L.latLngBounds([loc]);
    map.fitBounds(markerBounds);
  });
}

const getAllEvent = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/event/all-events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.data.events;
  } catch (err) {
    console.log(err);
  }
};

const pagination = async (maxElement = 7, maxPerPage = 2) => {
  data = await getAllEvent();

  maxElement = data.length;
  console.log(maxElement);
  if (maxElement > maxPerPage) {
    const totalPage = Math.ceil(maxElement / maxPerPage);
    maxPage.innerHTML = totalPage;
    leftBtn.addEventListener("click", (e) => {
      if (page.innerHTML > 1) {
        page.innerHTML--;
      } else if (page.innerHTML == 1) {
        page.innerHTML = totalPage;
      }
      renderPopularEvents(
        maxElement,
        parseInt(page.innerHTML),
        maxPerPage,
        data
      );
    });

    rightBtn.addEventListener("click", (e) => {
      if (page.innerHTML < totalPage) {
        page.innerHTML++;
      } else if (page.innerHTML == totalPage) {
        page.innerHTML = 1;
      }
      renderPopularEvents(
        maxElement,
        parseInt(page.innerHTML),
        maxPerPage,
        data
      );
    });
  }
  renderPopularEvents(maxElement, 1, maxPerPage, data);
};

const reverseGeoencode = async (a, b) => {
  try {
    const string =
      "http://api.positionstack.com/v1/reverse?access_key=fc9a1ebd02ce67ca55a38e4143527ec3&query=" +
      a +
      "," +
      b;
    const res = await fetch(string);
    const information = await res.json();
    return information;
  } catch (err) {
    console.log(err);
  }
};

const adddata = async (a, b) => {
  try {
    const info = await reverseGeoencode(a, b);
    var a = info.data[0].label;
    console.log(a);
    return a;
  } catch (err) {
    console.log(err);
  }
};

const renderPopularEvents = async (
  maxElement,
  currentPage,
  maxPerPage,
  data = []
) => {
  const start = (currentPage - 1) * maxPerPage;
  let end = start + maxPerPage;
  if (end > maxElement) {
    end = maxElement;
  }

  popularEvents.innerHTML = "";
  for (let i = start; i < end; i++) {
    console.log(data[i]);
    let dates = data[i].date.substring(0, 10);
    const eventMarkup = `
    <div class="row">
      <div class="col d-flex align-items-center">
        <img src="uploads/${
          data[i].photo
        }" width="222" height="125" alt="" class="image1"/>
      </div> 
      <div class="col">
        <span>${dates}</span>
        <p style="font-size: 14px;">
          ${data[i].name}
        </p>
        <h5 style="font-size: 14px;">
        ${await adddata(data[i].location[0], data[i].location[1])}
        </h5>
        <p style="font-size: 14px;">
          1 attendee -<span style="color:rgb(224, 58, 58)"> ${
            data[i].totalSpot
          } spots left</span>
        </p>
        <a href=/events/${
          data[i]._id
        }><button class="btn btn-success" style="margin-bottom:10px;" id=${
      data[i]._id
    }> Get to know more</button></a>
    </div>
      <hr style="width:80%; margin:auto; margin-bottom:9px;"/>
    </div>
  `;
    popularEvents.innerHTML += eventMarkup;
  }
};

getPosition();
pagination();
