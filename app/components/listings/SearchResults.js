import React, {Component} from 'react';
import Posting from './Posting';
import axios from 'axios';


class SearchResults extends Component {
	constructor(props){
		super(props)
		this.state = {
			job: '',
			page: 1
		}
		this.makeComponent = this.makeComponent.bind(this);
		this.applyToJob = this.applyToJob.bind(this);
		this.getDice = this.getDice.bind(this);
		this.changePage = this.changePage.bind(this);
	};
  makeComponent()  {
		if (this.state.job !== '')  {
	 		return this.state.job.map((post) => {
				return <Posting key={post.detailUrl} website={this.props.website} post={post} applyToJob={this.applyToJob}/>
			});
		} 
	}
	applyToJob(listing) {
		listing.source = this.props.website;
		console.log(listing);
		axios.post('/api', listing).then((data) =>{
			console.log(data)})
	}
	getDice(){
		axios.get(`api/dice/${this.props.job}/${this.props.city}/${this.props.state}/${this.state.page}`).then((resp) => {
		  this.setState({
				job: resp.data,
			});
  	})
	}
	getCyberCoders(){
		axios.get(`api/cyber-coders/${this.props.job}/${this.props.city}/${this.props.state}/${this.state.page}`).then((resp) => {
		  this.setState({
				job: resp.data,
			});
  	})
	}
	changePage(page) {
	  if(page > 0) {
			this.setState({page: page});
		if(this.props.website === 'Dice') {
			this.getDice();

		} else if (this.props.website === 'CyberCoders') {
			this.getCyberCoders();
		}
	  }
	}
  componentWillMount() {
		if(this.props.website === 'Dice') {
			this.getDice();
		} else if (this.props.website === 'CyberCoders') {
			this.getCyberCoders();
		}
  };


	render(){
		let currentPage = this.state.page;
		let nextPage = currentPage + 1;
		let previousPage = currentPage - 1;
		return (
			<div className='container'>
			  <div>
				<h1 className='center-align page-title'>Listings</h1>
				<ul className="pagination center-align">
					<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>				
				  <li className="active"><a>{currentPage}</a></li>					
					<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
			  </ul>
				{this.makeComponent()}
				</div>
			</div>
			);
	};
};

export default SearchResults;