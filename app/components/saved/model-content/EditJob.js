import React, {Component} from 'react';
import axios from 'axios';



export default class EditJob extends Component {
    constructor(){
        super();
        	this.state = {
                title: '',
                company: '',
                location: '',
                link: '',
                status: '',
	}
    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleChange = this.handleChange.bind(this);
    };

  handleChange(name , e){
       this.setState({[name]: e.target.value}) 
  }
  
  handleSubmission(e){
       e.preventDefault();
       let {title, company, location, status, link} = this.state;
       let data = {title, company, location,status, link}
        axios.put('/api/edit-job', data).then((data) => {
            this.props.updateJob();
        });
    }
    componentWillMount(){
        let currentJob = this.props.currentJob;
        this.setState({
            title: currentJob.title,
            company: currentJob.company,
            location: currentJob.location,
            link: currentJob.link,
            status: currentJob.status,
        });
    }
    render(){
        return (
               <div>
              <form 
                id='editJob' 
                onSubmit={(e) => this.handleSubmission(e)}>
                <input onChange={(e) => this.handleChange('title', e)}
                value={this.state.title} 
                 type="text" name='title' placeholder='Title' required
                 />	
                <input onChange={(e) => this.handleChange('company', e)} 
                value={this.state.company}
                type="text" name='company' placeholder='Company' required
                />	
                <input onChange={(e) => this.handleChange('location', e)}
                value={this.state.location}
                type="text" name='Location' placeholder='City, State' required
                />	
                {
                //     <input onChange={(e) => this.handleChange('status', e)}
                // value={this.state.status}                
                // type="text" name='status' placeholder='status' required
                // />	
                }
                <select 
                value={this.state.status}
                onChange={(e) => this.handleChange('status', e)} 
                name="status"
                id='jobStatus'
                >
                    <option value="Applied"> Applied</option>
                    <option value="Interested"> Interested</option>
                    <option value="Waiting"> Waiting</option>
                    <option value="Accepted"> Accepted</option>
                </select>
				<input type='submit' />	
			  </form>
			</div>
        )
    }
}