import React, {Component} from 'react';
import {hashHistory} from 'react-router';


class Layout extends Component {
	constructor(props){
		super(props);
		this.state = {
			jobDescription: 'javascript',
			state: 'GA',
			city: 'Atlanta',
			website: 'Dice'
		}
		// this.searchTerm = this.searchTerm.bind(this);
		this.handleCyberCoders = this.handleCyberCoders.bind(this);
		this.handleDice = this.handleDice.bind(this);
		this.handleMonster = this.handleMonster.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
	}
	handleApplied(){
		hashHistory.push('/applied');
	}	
	handleSearch(){
		hashHistory.push('/search');
	}
	handleResults(){
		hashHistory.push('/listings');
	}
	handleDescriptionChange(event) {
		this.setState({jobDescription: event});
	}
	handleCityChange(event) {
		this.setState({city: event});
	}
	handleStateChange(event) {
		this.setState({state: event});
	}
	handleDice(){
		this.setState({website: 'Dice'});
		hashHistory.push('/search');		
	}
	handleCyberCoders(){
		this.setState({website: 'CyberCoders'});
		hashHistory.push('/search');		
	}
	handleMonster(){
		this.setState({website: 'Monster'});
		hashHistory.push('/search');		
	}
	render() {
		return(
			<div>
				<nav>
			    <div className="nav-wrapper nav">
			      <a href='/' className="brand-logo center">JS</a>
			      <ul id="nav-mobile" className="left hide-on-med-and-down">
			        <li onClick={() => this.handleSearch()}><a>Search</a></li>
			        <li onClick={() => this.handleResults()}><a>Listings</a></li>
			        <li onClick={() => this.handleApplied()}><a>Applied</a></li>
			      </ul>      
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			        <li><a onClick={this.handleDice}>Dice </a></li>
			        <li><a onClick={this.handleCyberCoders}>CyberCoders</a></li>
			        <li><a>Monster (Future Feature)</a></li>
			      </ul>
			    </div>
			  </nav>
			  {
					React.cloneElement(this.props.children,  
			   { 
					 handleDescriptionChange: this.handleDescriptionChange,
					 handleCityChange: this.handleCityChange,
				 	 handleStateChange: this.handleStateChange,
				     job: this.state.jobDescription,	
					 state: this.state.state,
					 city: this.state.city,
					 website: this.state.website
				 })
			  }
			</div>
			   )
	}
}

export default Layout;
