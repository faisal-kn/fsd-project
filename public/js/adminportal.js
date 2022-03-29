let searchanevent =document.getElementById('searchanevent');
let deleteevent = document.getElementById('deleteevent');
let searchauser = document.getElementById('searchauser');
let deleteuser = document.getElementById('deleteuser');
let temporaryban = document.getElementById('temporaryban');
let warning = document.getElementById('warning');
let eventstats = document.getElementById('eventstats');
let cards = document.getElementsByClassName('card');
cards = Array.from(cards);



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

temporaryban.addEventListener('click', ()=>{
    let a = document.getElementById('card5');
    cards.forEach(element => {
        element.style.display = 'none'; 
    });
    a.style.display = 'flex';
})

warning.addEventListener('click', ()=>{
    let a = document.getElementById('card6');
    cards.forEach(element => {
        element.style.display = 'none'; 
    });
    a.style.display = 'flex';
})

eventstats.addEventListener('click', ()=>{
    let a = document.getElementById('card7');
    cards.forEach(element => {
        element.style.display = 'none'; 
    });
    a.style.display = 'flex';
})