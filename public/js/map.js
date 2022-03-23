"use Strict";

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
  console.log(latitude, longitude);
  const coords = [latitude, longitude];
  const map = L.map("map", {
    center: coords,
    zoom: 13,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

const modes = ["SEARCHBYFRIEND", "SEARCHBYPLACE", "SEARCHBYLATLONG"];

const getDisplayName = (val) => {
  if (val === modes[0]) return "Search by friend";
  else if (val === modes[1]) return "Search by place";
  else if (val === modes[2]) return "Search by Latitude and Longitude";
};



getPosition();
