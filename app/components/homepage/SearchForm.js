import React, {Component} from 'react';
import {hashHistory} from 'react-router';


class SearchForm extends Component {
	constructor(props){
		super(props);


	}

	handleSubmit(e){
		e.preventDefault();
		hashHistory.push('/listings')
	}
	render(){
		return(
				<div className="container home">
			      <div className="row ">
			        <div className="cl l11 center-align">
			          <h2>Start Your Search!</h2>
			          <form onSubmit={this.handleSubmit}>
									<input 
										onChange={(event) => this.props.handleDescriptionChange(event.target.value) } 
										type="text"
										name="title"
										required 
										placeholder='Job title or keywords'/>
									<input 
									  onChange={(event) => this.props.handleCityChange(event.target.value)}
									  type="text" 
									  name="city"
										placeholder="city" 
									/>
									<input 
									 onChange={(event) => this.props.handleStateChange(event.target.value)}
									 type="text" 
									 name="state"
									 placeholder="state" />
			            <input type="submit" />
			          </form>
			        </div>
			      </div>
			    </div>
			) 
	}
}

export default SearchForm;