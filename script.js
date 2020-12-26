function subOut(){
    let output;
    let chosenClass = document.getElementById("classOut").value;
    let chosenDate = document.getElementById("dateOut").value;
    if(chosenClass == "undefined"){
        output = "Please select a class";
    }else{
        output = getNote(chosenDate, chosenClass);
    }
    return output
}

function setDefaultDate(){
    let dateString = new Date()
    document.getElementById('dateIn').value = `${dateString.getFullYear()}-${dateString.getMonth()+1}-${dateString.getDate()}`
    document.getElementById('dateOut').value = `${dateString.getFullYear()}-${dateString.getMonth()+1}-${dateString.getDate()}`
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

function subIn(){
    let value1 = document.getElementById("dateIn").value;//day
    let value2 = document.getElementById("classIn").value;//class
    let note = document.getElementById("noteIn").value;//note
    if(value2 == "undefined"){
        document.getElementById("errorIn").innerHTML = "Please select a class."
    }else if(note == ""){
        document.getElementById("errorIn").innerHTML = "Please enter a note."
    }else if(checkData(note)){
        document.getElementById("errorIn").innerHTML = "That note already exists"
    }else{
        document.getElementById("errorIn").innerHTML = ""
        notes.push([value1, value2, note]);
    }
}
function checkData(checkString){
    for(let i=0; i < notes.length; i++){
        console.log(i)
        if(checkString == notes[i][2]){
            return true;
        }
    }
    return false;
}