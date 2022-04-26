let searchanevent = document.getElementById("searchanevent");
let deleteevent = document.getElementById("deleteevent");
let searchauser = document.getElementById("searchauser");
let deleteuser = document.getElementById("deleteuser");
let eventstats = document.getElementById("eventstats");
let cards = document.getElementsByClassName("card");
const deleteUser = document.getElementById("deleteUser");
const userNameDelete = document.getElementById("username");
const searchUser = document.getElementById("searchUser");
const searchuserName = document.getElementById("searchUsername");
const delEventBtn = document.getElementById("delEventBtn");
const eventNameDelete = document.getElementById("eventname");
const userName = document.getElementById("username");
const addanadmin = document.getElementById("addanadmin");
const forms0 = document.getElementById("forms0");
const forms1 = document.getElementById("forms1");
const details = document.getElementById("details");
const back = document.getElementById("back");


cards = Array.from(cards);

const displayusers = async () => {
  try {
    const string = "http://localhost:3001/api/user/allUsers";
    const res = await fetch(string, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const information = await res.json();
    console.log(information);
    return information;
  } catch (err) {
    console.log(err);
  }
};

const update = async () => {
  try {
    const info = await displayusers();
    var Hobbies0 = "";
    var Hobbies1 = "";
    var Hobbies2 = "";
    var Hobbies3 = "";
    var Hobbies4 = "";
    var Hobbies5 = "";
    var Hobbies6 = "";
    var Hobbies7 = "";
    var Hobbies8 = "";
    var Hobbies9 = "";

    document.getElementById("tbody").innerHTML = "";
    for (var i = 0; i < info.data.users.length; i++) {
      const Name = info.data.users[i].username;
      const Email = info.data.users[i].email;
      if (info.data.users[i].hobbies[0]) {
        Hobbies0 = info.data.users[i].hobbies[0];
      } else {
        Hobbies0 = "";
      }
      if (info.data.users[i].hobbies[1]) {
        Hobbies1 = info.data.users[i].hobbies[1];
      } else {
        Hobbies1 = "";
      }
      if (info.data.users[i].hobbies[2]) {
        Hobbies2 = info.data.users[i].hobbies[2];
      } else {
        Hobbies2 = "";
      }

      if (info.data.users[i].hobbies[3]) {
        Hobbies3 = info.data.users[i].hobbies[3];
      } else {
        Hobbies3 = "";
      }

      if (info.data.users[i].hobbies[4]) {
        Hobbies4 = info.data.users[i].hobbies[4];
      } else {
        Hobbies4 = "";
      }

      if (info.data.users[i].hobbies[5]) {
        Hobbies5 = info.data.users[i].hobbies[5];
      } else {
        Hobbies5 = "";
      }

      if (info.data.users[i].hobbies[6]) {
        Hobbies6 = info.data.users[i].hobbies[6];
      } else {
        Hobbies6 = "";
      }

      if (info.data.users[i].hobbies[7]) {
        Hobbies7 = info.data.users[i].hobbies[7];
      } else {
        Hobbies7 = "";
      }

      if (info.data.users[i].hobbies[8]) {
        Hobbies8 = info.data.users[i].hobbies[8];
      } else {
        Hobbies8 = "";
      }

      if (info.data.users[i].hobbies[9]) {
        Hobbies9 = info.data.users[i].hobbies[9];
      } else {
        Hobbies9 = "";
      }

      console.log(info.data.users[i].Hobbies);
      document.getElementById("tbody").innerHTML += `<tr>
      <th scope="row">${i + 1}</th>
      <td> ${Name} </td>
      <td> ${Email} </td>
      <td> ${Hobbies0} ${Hobbies1} ${Hobbies2} ${Hobbies3} ${Hobbies4} ${Hobbies5} ${Hobbies6} ${Hobbies7} ${Hobbies8} ${Hobbies9} </td>
    </tr>`;
    }
  } catch (err) {
    console.log(err);
  }
};

update();

searchUser.addEventListener("click", () => {
  forms0.style.display = "none";
  forms1.style.display = "flex";

  });

back.addEventListener("click", () => {
  forms0.style.display = "flex";
  forms1.style.display = "none";
});


addanadmin.addEventListener("click", () => {
  let a = document.getElementById("card5");
  console.log(a);
  cards.forEach((element) => {
    element.style.display = "none";
  });
  a.style.display = "flex";
});

searchanevent.addEventListener("click", () => {
  let a = document.getElementById("card1");
  console.log(a);
  cards.forEach((element) => {
    element.style.display = "none";
  });
  a.style.display = "flex";
});

deleteevent.addEventListener("click", () => {
  let a = document.getElementById("card2");
  cards.forEach((element) => {
    element.style.display = "none";
  });
  a.style.display = "flex";
});

searchauser.addEventListener("click", () => {
  let a = document.getElementById("card3");
  cards.forEach((element) => {
    element.style.display = "none";
  });
  a.style.display = "flex";
});

deleteuser.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("delete user");
  let a = document.getElementById("card4");
  cards.forEach((element) => {
    element.style.display = "none";
  });
  a.style.display = "flex";
});

deleteUser.addEventListener("click", async () => {
  const userName = userNameDelete.value;
  const string = `http://localhost:3001/api/user/deleteUser/${userName}`;
  const res = await fetch(string, {
    method: "DELETE",
  });
});

searchUser.addEventListener("click", async () => {
  const userName = searchuserName.value;
  const string = `http://localhost:3001/api/user/getUser/${userName}`;
  const res = await fetch(string, {
    method: "GET",
  });
  const info = await res.json();
  console.log(info);
});

delEventBtn.addEventListener("click", async () => {
  const eventName = eventNameDelete.value;
  const string = `http://localhost:3001/api/event/deleteEvent/${eventName}`;
  const res = await fetch(string, {
    method: "DELETE",
  });
});
