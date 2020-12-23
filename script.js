
function changeText(newString){document.getElementById("text").innerHTML = newString}
function sub(){
    let output
    let chosenClass = document.getElementById("class").value;
    let chosenDate = document.getElementById("date").value;
    if(chosenClass == "undefined"){
        output = "Please select a class";
    }else{
        output = getNote(chosenDate, chosenClass);
    }
    return output
}
function setDefaultDate(){
    let dateString = new Date()
    document.getElementById('date').value = `${dateString.getFullYear()}-${dateString.getMonth()+1}-${dateString.getDate()}`
}

function getNote(findDate, findClass){
    let output = "";
    let numOfReturns = 1;
    for(let i=0; i < notes.length; i++){
        if(findDate == notes[i][0]){
            if(findClass == notes[i][1]){
                output =  output  + "<br>" + numOfReturns + ". " + notes[i][2];
                numOfReturns++
            }
        }
    }
    if (output == "") {output = "No notes for that class date pair &#128078"};
    return output;
}