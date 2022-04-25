const locations = document.getElementById("locations");
const dates = document.getElementById("dates");
let locationsToArray = locations.innerHTML.split(",");

const reverseGeoencode = async () => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=xml&lat=${locationsToArray[0]}&lon=${locationsToArray[1]}&zoom=18&addressdetails=1`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res;
    const dataJson = await data.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const datesToArray = dates.innerHTML.split(" ");
console.log(datesToArray);
reverseGeoencode();
dates.innerHTML = `${datesToArray[0]} ${datesToArray[1]} ${datesToArray[4]} ${datesToArray[3]} ${datesToArray[5]} at ${datesToArray[6]}`;

console.log(locationsToArray);
