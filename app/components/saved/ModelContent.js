import React, {Component}  from 'react';
import axios from 'axios';
import Notes from './Notes';
import JobForm from './JobForm';



export default class ModalContent extends Component {
	constructor(props){
		super(props)

	}

render(){
	if(this.props.content ===  'notes'){
	    return(
				<Notes
				 value={this.props.value}
        noteText={this.props.noteText} 
        newNote={this.props.addNote} 
        deleteNote={this.props.deleteNote} 
        id={this.props.id} 
				notes={this.props.notes}
				/>
	  )
	} 
		return (
			<div> 
				 <JobForm 
						getJobs={this.props.getJobs}	
				 />
			</div>
			
		)
	
  }
}


