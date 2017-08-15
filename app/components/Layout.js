import React, {Component} from 'react';
import {Link} from 'react-dom';
import {hashHistory} from 'react-router';


class Layout extends Component {
	constructor(props){
		super(props);
		this.state = {jobDescription: 'javascript'}
		// this.searchTerm = (term) => {
		// 	this.setState({jobDescription: term})
		// }
			this.searchTerm = this.searchTerm.bind(this);
	}

	searchTerm(term) {
		this.setState({jobDescription: term})
	}
	// handleApplied(){
	// 	hashHistory.push('/applied')
	// }	
	// handleSearch(){
	// 	hashHistory.push('/jobs')
	// }
	// handleResults(){
	// 	hashHistory.push('/listings')
	// }

	render() {
		return(
			<div>
			{console.log(this.props.testing)}
				<nav>
			    <div className="nav-wrapper">
			      <a href='/' className="brand-logo center">JS</a>
			      <ul id="nav-mobile" className="left hide-on-med-and-down">
			        <li></li>
			        <li></li>
			        <li></li>
			      </ul>      
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			        <li><a href="badges.html">Dice (Future Feature)</a></li>
			        <li><a href="sass.html">CyberCoders (Future Feature)</a></li>
			        <li><a href="collapsible.html">Monster (Future Feature)</a></li>
			      </ul>
			    </div>
			  </nav>
			  {React.cloneElement(this.props.children,  
			  {search: this.searchTerm, job: this.state.jobDescription})}
			</div>
			   )
	}
}

export default Layout;
