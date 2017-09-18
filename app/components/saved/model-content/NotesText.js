import React from 'react';


const NotesText = ({notes, index, deleteNote}) => {
	return (  
	<div className='note'>
		<p> {index}: {notes}. </p> 
		<button onClick={() => deleteNote(index)}
		className='delete-icon'
		>
		  <i className="material-icons">delete</i> <span> Delete </span>
 		</button>
	</div>
	)
}

export default NotesText;