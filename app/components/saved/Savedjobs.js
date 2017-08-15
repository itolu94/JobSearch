import React, {Component} from 'react';
import Modal from './Modal';
import Job from './Job';

class SavedJobs extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: '',
			}
	}
	makeComponentJob(){
		if(this.props.jobs != 'undefined'){
			return this.props.jobs.map((savedJob, index) => {
				return (<Job index={index} deleteJob={this.props.delete} savedJob={savedJob} openModal={this.props.openModal}/>)
			})
		}
	}
	render(){
		return(
				<div className='container'>
					{this.makeComponentJob()}
				}
				</div>
			)
	}
}

export default SavedJobs