import React, {Component} from 'react';
import Job from './Job';

export default class SavedJobs extends Component {
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
			return (
				<div className="row job">
					<div className="cl l12">
				  		<div className="jobPosting center-align">
							<p>No Saved Jobs</p>
				  		</div>
			  		</div>
				</div>
			);
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
