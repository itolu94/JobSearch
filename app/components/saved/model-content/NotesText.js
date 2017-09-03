import React from 'react';


const NotesText = ({notes, index, deleteNote, noteIndex}) => {
	return (  
	<div>
	{console.log(noteIndex)}
		<p> {index}: {notes}. </p>  <button onClick={() => deleteNote(index, noteIndex)}> Delete </button>
	</div>
	)
}

export default NotesText;