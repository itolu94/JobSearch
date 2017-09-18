import React, {Component} from 'react';
import Job from './Job';

class SavedJobs extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: '',
			}
	}
	makeComponentJob(){
		if(this.props.jobs.length > 0){
			return this.props.jobs.map((savedJob, index) => {
				return (<Job 
						editJob={this.props.editJob} 
						key={savedJob._id}
						index={index}
						deleteJob={this.props.delete}
						savedJob={savedJob}
						openModal={this.props.openModal}
						/>
					)
			})
		}else {
			return (<h2 className='center-align'> No Saved Jobs</h2>);
		}
	}
	render(){
		return(
				<div className='container'>
					{this.makeComponentJob()}
				
				</div>
			)
	}
}

export default SavedJobs