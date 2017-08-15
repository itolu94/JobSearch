import React, {Component}  from 'react';
import NotesText from './NotesText';
import axios from 'axios';



class Notes extends Component {
	constructor(props){
		super(props)
		this.state = {
			value: '',
			notes: ''
		}
	};



	renderNotes() {
		if(this.props.notes != 'Testing'){
			return this.props.notes[this.props.id].map((notes, index) => {
				return <NotesText notes={notes} index={index} deleteNote={this.props.deleteNote}/>
			})
		}
	}



render(){
	return(
		<div>
			<div>
					{this.renderNotes()}
			</div>
			<form onSubmit={(e)  => this.props.newNote(this.state.value, e)}>
				<input onChange={(event) => this.setState({value: event.target.value})} 
				value={this.state.value} 
				type='text' 
				name='newNote'/>
        <input type='submit'/>
			</form> 
		</div>
	)
}

}



export default Notes;