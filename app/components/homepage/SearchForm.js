import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import axios from 'axios';
import stateCities  from 'state-cities'; 


export default class SearchForm extends Component {
	constructor(){
		super();
	}
	handleSubmit(e){
		e.preventDefault();
		hashHistory.push('/listings')
	}

	render(){
		return(
				<div className="container">
			      <div className="row login">
			        <div className="col m6 offset-m3 center-align">
			          <form onSubmit={this.handleSubmit}>
									<input 
										onChange={(event) => this.props.handleDescriptionChange(event.target.value)} 
										type="text"
										name="title"
										required 
										placeholder='Job Title, Keyword, Description'
									/>
									<input 
										onChange={(event) => this.props.handleStateChange(event.target.value)}
										type="text" 
										name="state"
										placeholder="State"
									/>
									<input 
									  onChange={(event) => this.props.handleCityChange(event.target.value)}
									  type="text" 
									  name="city"
										placeholder="City" 
									/>
			            <input className='login-buttons' type="submit" />
			          </form>
			        </div>
			      </div>
			    </div>
			) 
	}
}

