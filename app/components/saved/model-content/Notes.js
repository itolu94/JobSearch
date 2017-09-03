import React, {Component}  from 'react';
import NotesText from './NotesText';
import axios from 'axios';

let noteIndex;

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
				if (this.props.id === this.props.notes[i].jobReference){
					noteIndex = i;
					return this.props.notes[i].notes.map((notes, index) => {
					 return <NotesText key={index} notes={notes} noteIndex={noteIndex} index={index} deleteNote={this.props.deleteNote}/>
				 	})
				}
			}
			console.log('Notes Lenght was long');
			return ('No notes added')
		} else {
			console.log('Notes Lenght was recgonized as 0');			
			return ('No notes added')
		}
	}

render(){
	    return(
		  <div>
			  <div>
              {this.renderNotes()}
			  </div>
			  <form onSubmit={(event)  => this.props.addNote(event, noteIndex)}>
			  	<input onChange={(event) => this.props.noteText(event)}  
			  	value={this.props.value} 
				type='text' 
				name='newNote'/>
            <input type='submit'/>
		  </form> 
		</div>
	  )
  }
}


