showNotes();


let addButton = document.getElementById('addBtn');
addButton.addEventListener("click", function(e){

	let addText = document.getElementById("addTxt");
	let notes = localStorage.getItem("notes");

	if(notes == null)
	{
		noteObject = [];
	}
	else
	{
		noteObject = JSON.parse(notes);
	}

	noteObject.push(addText.value);
	localStorage.setItem("notes",JSON.stringify(noteObject));
	addText.value = "";

	console.log(noteObject);

	showNotes();
})


// Show the notes 
function showNotes()
{
	let notes = localStorage.getItem("notes");

	if(notes == null)
	{
		noteObject = [];
	}
	else
	{
		noteObject = JSON.parse(notes);
	}

	let html = "";
	noteObject.forEach(function(noteContent,index){
		html+=`
			<div class="card col-6 col-md-4 my-2">
			<div class="noteCard">
		  <div class="card-body">
		    <h5 class="card-title">Note ${index + 1}</h5>
		    <p class="card-text">${noteContent}</p>
		    <button id="${index}" class="btn btn-danger" onClick="deleteNote(this.id)">Erase</button>
		  </div>
		</div>
		</div>`
	});

	let notesElement = document.getElementById("notes");
	if(noteObject ==0 ){

		notesElement.innerHTML = `<h4>No note to show.</h4>`;
	}
	else
	{
		notesElement.innerHTML = html;
	}

}

//Delete a note

function deleteNote(index)
{
	let notes = localStorage.getItem("notes");

	if(notes == null)
	{
		noteObject = [];
	}
	else
	{
		noteObject = JSON.parse(notes);
	}
	noteObject.splice(index,1);
	localStorage.setItem("notes",JSON.stringify(noteObject));
	showNotes();
}

//search a note
let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
	let searchVal = search.value.toLowerCase();
	let noteCards = document.getElementsByClassName("noteCard");

	Array.from(noteCards).forEach(function(element){
		let noteText = element.getElementsByTagName("p")[0].innerText;
		if(noteText.includes(searchVal))
		{
			element.style.display = "block";
		}
		else
		{
			element.style.display = "none";
		}
	})
})