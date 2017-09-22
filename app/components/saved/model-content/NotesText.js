import React from 'react';


const NotesText = ({notes, index, deleteNote}) => {
	return (  
		<div className='noteDiv'>
			<div className='note'>
				<p> {notes}</p> 
			</div>
			<div className='deleteNoteButton'>
			<button onClick={() => deleteNote(index)}
			className='delete-icon'
			>
			<i className="material-icons">delete</i> <span> Delete </span>
			</button>
			</div>
		</div>
	)
}

export default NotesText;