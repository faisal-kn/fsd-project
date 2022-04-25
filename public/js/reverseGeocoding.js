const locations = document.getElementById("locations");
const dates = document.getElementById("dates");
let locationsToArray = locations.innerHTML.split(",");

const reverseGeoencode = async () => {
  try {
    const string = 'http://api.positionstack.com/v1/reverse?access_key=fc9a1ebd02ce67ca55a38e4143527ec3&query='+locationsToArray[0]+','+locationsToArray[1];
    const res = await fetch(
        string
        );
        const information = await res.json();
        console.log(information);
        return information;
    } catch (err) {
        console.log(err);
    }
};

const adddata = async () => {
    try{
        const info =await reverseGeoencode();
        const a = info.data[0].label;
        document.getElementById("locations").innerHTML = a;
       
    } catch (err) {
        console.log(err);
    }
}



adddata();
