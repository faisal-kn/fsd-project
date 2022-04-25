let searchanevent =document.getElementById('searchanevent');
let deleteevent = document.getElementById('deleteevent');
let searchauser = document.getElementById('searchauser');
let deleteuser = document.getElementById('deleteuser');
let eventstats = document.getElementById('eventstats');
let cards = document.getElementsByClassName('card');
cards = Array.from(cards);

const displayusers = async () => {
    try {
      
      const string = 'http://localhost:3001/api/user/allUsers';
      const res = await fetch(
          string, {headers: {
            "Content-Type": "application/json",
          },}
          );
      const information = await res.json();
      console.log(information);
          return information;
      } catch (err) {
          console.log(err);
      }
  };

displayusers();

searchanevent.addEventListener('click', ()=>{
    let a = document.getElementById('card1');
    console.log(a)
    cards.forEach(element => {
        element.style.display = 'none'; 
    });
    a.style.display = "flex";
})

deleteevent.addEventListener('click', ()=>{
    let a = document.getElementById('card2');
    cards.forEach(element => {
        element.style.display = 'none'; 
    });
    a.style.display = 'flex';
})

searchauser.addEventListener('click', ()=>{
    let a = document.getElementById('card3');
    cards.forEach(element => {
        element.style.display = 'none'; 
    });
    a.style.display = 'flex';
})

deleteuser.addEventListener('click', ()=>{
    let a = document.getElementById('card4');
    cards.forEach(element => {
        element.style.display = 'none'; 
    });
    a.style.display = 'flex';
})
