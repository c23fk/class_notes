
const form = document.querySelector('.new-note');
const submitBtn = document.querySelector('.new-note button');
const list = document.querySelector('ul');
const dateInput = document.querySelector('.new-note .date')
const classInput = document.querySelector('.new-note .class')
const noteInput = document.querySelector('.new-note .note')
let db

window.onload = function() {
    let request = window.indexedDB.open('notes_db', 1);

    request.onerror = function() {
        console.log('Database error');
    };

    request.onsuccess = function() {
        console.log('database opened');
        db = request.result;
        displayData();
    };

    request.onupgradeneeded = function(e){
        let db = e.target.result;
        let objectStore = db.createObjectStore("notes_os", {keyPath: 'id', autoIncrement:true});
        objectStore.createIndex('date', 'date', {unique:false});
        objectStore.createIndex('cls', 'cls', {unique:false});
        objectStore.createIndex('body', 'body', {unique:false})
        console.log('setup complete')
    };

    form.onsubmit = addData;
    function addData(e){
        e.preventDefault()
        let newItem = {date: dateInput.value, cls:classInput.value, note: noteInput.value}
        let transaction = db.transaction(['notes_os'], 'readwrite');
        let objectStore = transaction.objectStore('notes_os');
        let request = objectStore.add(newItem);
        request.onsuccess = function(){
            noteInput.value = '';
        }
        transaction.oncomplete = function() {
            console.log('database updated.');
            displayData();
        }
        transaction.onerror = function() {
            console.log('error updating database');
        }
    }

    function displayData(){
        while(list.firstChild){
            list.removeChild(list.firstChild);
        }
        
        let objectStore = db.transaction('notes_os').objectStore('notes_os');
        objectStore.openCursor().onsuccess=function(e){
            let cursor = e.target.result;
            if(cursor){
                //create elements
                const listItem = document.createElement('li')
                const head = document.createElement('h3')
                const note = document.createElement('p')
                //link the elements togeather
                listItem.appendChild(head)
                listItem.appendChild(note)
                //put block into list
                list.appendChild(listItem)
                //setup text for the blocks
                head.textContent = cursor.value.date + " "+ cursor.value.cls;
                note.textContent = cursor.value.note;
                //create an ID atribute
                listItem.setAttribute('data-note-id', cursor.value.id);
                //create a delete button
                const deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent= "Delete this note"
                deleteBtn.onclick = deleteItem
                //continue
                cursor.continue()
            }else{
                if(!list.firstChild){
                    const listItem = document.createElement('li');
                    listItem.textContent = 'No Notes.';
                    list.appendChild(listItem);
                }
                console.log('all notes displayed')
            }
        }
    }

    function deleteItem(e) {
        let noteID = Number(e.target.parentNode.getAttribute('data-note-id'));
        let transaction = db.transaction(['notes_os'], 'readwrite');
        let objectStore = transaction.objectStore('notes_os');
        let request = objectStore.delete(noteID)
        transaction.oncomplete = function() {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode)
            console.log(`Note ${noteID} removed`); 
        }
        if(!list.firstChild){
            const listItem = document.createElement('li');
            listItem.textContent = 'No Notes.';
            list.appendChild(listItem);
        }
    }
};

function setDefaultDate(){
    let dateString = new Date()
    document.getElementById('dateIn').value = `${dateString.getFullYear()}-${dateString.getMonth()+1}-${dateString.getDate()}`
    document.getElementById('dateOut').value = `${dateString.getFullYear()}-${dateString.getMonth()+1}-${dateString.getDate()}`
}