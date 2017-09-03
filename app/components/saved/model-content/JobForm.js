import React, {Component} from 'react';
import axios from 'axios';



export default class JobForm extends Component {
    constructor(){
        super();
        	this.state = {
                title: '',
                company: '',
                location: '',
                link: '',
                status: '',
                source: ''
	}
    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleChange = this.handleChange.bind(this);
    };

  handleChange(name , e){
       this.setState({[name]: e.target.value}) 
  }
  
  handleSubmission(e){
       e.preventDefault();
       let {title, company, location, link, status, source} = this.state;
       let data = {title, company, location, link, status, source}
        axios.post('/api/add-job', {params: data }).then((data) => {
            this.setState({})
            this.props.getJobs();
            this.setState({ 
                title: '',
                company: '',
                location: '',
                link: '',
                status: '',
                source: ''})
        });
    }
    render(){
        return (
           	<div>
			  <form onSubmit={(e) => this.handleSubmission(e)}>
                <input onChange={(e) => this.handleChange('title', e)}
                value={this.state.name} 
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
                <input onChange={(e) => this.handleChange('link', e)}
                value={this.state.link}
                type="text" name='link' placeholder='URL Link' required
                />	
                <input onChange={(e) => this.handleChange('status', e)}
                value={this.state.status}                
                type="text" name='status' placeholder='status' required
                />	
                <input onChange={(e) => this.handleChange('source', e)}
                value={this.state.source}                 
                type="text" name='source' placeholder='source' required
                />
				<input type='submit' />	
			  </form>
			</div>
        )
    }
}