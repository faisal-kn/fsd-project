const locations = document.getElementById("locations");
const dates = document.getElementById("dates");
let locationsToArray = locations.innerHTML.split(",");


// const reverseGeoencode = async () => {
//   try {
//     const res = await fetch(
//       `http://www.geoplugin.net/extras/location.gp?lat=${locationsToArray[0]}&long=${locationsToArray[1]}&format=json`
//     );
//     const data = await res.json();
//     console.log(data);
  
//   } catch (err) {
//     console.log(err);
//   }
// };

// const datesToArray = dates.innerHTML.split(" ");
// console.log(datesToArray);

// dates.innerHTML = `${datesToArray[0]} ${datesToArray[1]} ${datesToArray[4]} ${datesToArray[3]} ${datesToArray[5]} at ${datesToArray[6]}`;

// console.log(locationsToArray);
