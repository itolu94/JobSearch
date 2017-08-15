import React from 'react';


const NotesText = ({notes, index, deleteNote}) => {
	return (  
	<div>
		<p> {index}: {notes}. </p>  <button onClick={() => deleteNote({index})}> Delete </button>
	</div>
	)
}

export default NotesText;