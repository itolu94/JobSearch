import React, {Component}  from 'react';
import axios from 'axios';
import Notes from './Notes';
import JobForm from './JobForm';
import EditJob from './EditJob';



export default class ModalContent extends Component {
	constructor(props){
		super(props)

	}

render(){
	let content = this.props.content;
	if(content ===  'notes'){
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
	} else if(content === 'edit') {
		return(<EditJob currentJob={this.props.currentJob}/>)
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

