import React, {Component}  from 'react';
import NotesText from './NotesText';
import axios from 'axios';


export default class Notes extends Component {
	constructor(props){
		super(props)
		this.state = {
			index: ''
		}
	};
	renderNotes() {
		if(this.props.notes.length > 0){
			for(let i = 0; i < this.props.notes.length; i++) {
				// if (this.props.id === this.props.notes[i].jobReference){
					return this.props.notes.map((notes, index) => {
					 return <NotesText key={index} notes={notes} index={index} deleteNote={this.props.deleteNote}/>
				 	})
				// }
			}
		} else {
			return (
				<div>
					<p className='center-align'>No notes added</p>
				</div>)
		}
	}

render(){
	    return(
		  <div>
			  <div>
              {this.renderNotes()}
			  </div>
			  <form onSubmit={(event)  => this.props.addNote(event)}>
			  	<input onChange={(event) => this.props.noteText(event)}  
				id='notesInput'  
				value={this.props.value} 
				type='text' 
				name='newNote'/>
            <input id='newNoteSubmit' type='submit'/>
		  </form> 
		</div>
	  )
  }
}


