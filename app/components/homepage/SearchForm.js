import React, {Component} from 'react';
import {hashHistory} from 'react-router';


class SearchForm extends Component {
	constructor(props){
		super(props);
		this.handleChangeb = (event) => {
			console.log(event)
			this.setState({value: event.target.value});
		}
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
			          <h2>Start The Search!</h2>
			          <form onSubmit={this.handleSubmit}>
			            <input onChange={(event) => this.props.search(event.target.value) } type="text" name="title" required="" />
			            <input 
			             type="text" name="location" placeholder="city" />
			            <input type="submit" onSubmit />
			          </form>
			        </div>
			      </div>
			    </div>
			) 
	}
}

export default SearchForm;