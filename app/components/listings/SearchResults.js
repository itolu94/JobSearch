import React, {Component} from 'react';
import Posting from './Posting';
import axios from 'axios';


export default class SearchResults extends Component {
	constructor(props){
		super(props)
		this.state = {
			job: '',
			page: 1,
			loading: true
		}
		this.makeComponent = this.makeComponent.bind(this);
		this.applyToJob = this.applyToJob.bind(this);
		this.getDice = this.getDice.bind(this);
		this.changePage = this.changePage.bind(this);
		this.getZipRecruiter = this.getZipRecruiter.bind(this);
	};
  makeComponent()  {
		if (this.state.job !== '')  {
	 		return this.state.job.map((post) => {
				return <Posting key={post.detailUrl} website={this.props.website} post={post} applyToJob={this.applyToJob}/>
			});
		} 
	}
	applyToJob(listing, status) {
		listing.source = this.props.website;
		listing.status = status
		// console.log(listing);
		axios.post('/api/add-job', listing).then((data) =>{
			console.log(data)})
	}
	getDice(){
	  axios.get('api/dice',
	   {params:
			{
				title: this.props.job,
				city: this.props.city,
				state: this.props.state,
				page: this.state.page
	   		}
	   }).then((resp)=> {
			this.setState({
				job: resp.data,
				loading: false
			});
	   })
	}
	getCyberCoders(){
		  axios.get(`api/cyber-coders`, 
		  {params: 
			{
				title:this.props.job,
				city: this.props.city,
				state: this.props.state,
				page: this.state.page
		  }
		})
		.then((resp) => {
			this.setState({
					job: resp.data,
					loading: false
				});
				// console.log(this.state.job);
		   });
	}
	getZipRecruiter(){
		axios.get(`api/zip-recruiter`, 
		{params: 
		  {
			  title: this.props.job,
			  city: this.props.city,
			  state: this.props.state,
			  page: this.state.page
		}
	  })
	  .then((resp) => {
		  this.setState({
				  job: resp.data,
				  loading: false
			  });
			  // console.log(this.state.job);
		 });
  }
	changePage(page) {

	  if(page > 0) {
			this.setState({
				page,
				loading: true
			});
			switch(this.props.website){
				case 'Dice':
					this.getDice();
					break;
				case 'CyberCoders':
					this.getCyberCoders();
					break;
				case 'ZipRecruiter': 
					this.getZipRecruiter();
			}
	  }
	}
  componentWillMount() {
		if(this.props.website === 'Dice') {
			this.getDice();
		} else if (this.props.website === 'CyberCoders') {
			this.getCyberCoders();
		} else if (this.props.website === 'ZipRecruiter'){
			this.getZipRecruiter();
		}
	};
	
	render(){
			let loading = this.state.loading;
			let currentPage = this.state.page;
			let savedJobs = this.state.job;
			let nextPage = currentPage + 1;
			let previousPage = currentPage - 1;
			// {console.log(`currentPage ${currentPage}  nextPage ${nextPage}, previousePage ${previousPage}`)}
			{/*TODO handle these if else cases in seperate component*/}
			if(loading){
				return (
					<div className='container'>
						<div>
							<h1 className='center-align page-title'>Listings</h1>
							<div className='center-align'> 
								<img src="images/loading.gif" alt="loading"/>
							</div>
						</div>
					</div>
				)
			}

			else {
				if(this.props.website === 'CyberCoders'){
					if (currentPage == 1  && savedJobs.length == 21 ){
						return( 
							<div className='container'>
								<div>
									<h1 className='center-align page-title'>Listings</h1>
									<ul className="pagination center-align">
										<li className="active"><a>{currentPage}</a></li>					
										<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
									</ul>
									{this.makeComponent()}
									<ul className="pagination center-align">
										<li className="active"><a>{currentPage}</a></li>					
										<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
									</ul>
								</div>
							</div>
						)	
					} else if (currentPage == 1  && savedJobs.length < 21 ){
						return (
							<div className='container'>
							<div>
								<h1 className='center-align page-title'>Listings</h1>
								<ul className="pagination center-align">
									<li className="active"><a>{currentPage}</a></li>					
								</ul>
								{this.makeComponent()}
								<ul className="pagination center-align">
									<li className="active"><a>{currentPage}</a></li>					
								</ul>
							</div>
						</div>
						)
					} else if (savedJobs.length < 21) {
					return (
							<div className='container'>
								<div>
									<h1 className='center-align page-title'>Listings</h1>
									<ul className="pagination center-align">
										<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>									
										<li className="active"><a>{currentPage}</a></li>					
									</ul>
									{this.makeComponent()}
									<ul className="pagination center-align">
										<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>																		
										<li className="active"><a>{currentPage}</a></li>					
									</ul>
								</div>
						</div>
						)
					}
					else {
						return(
						<div className='container'>
							<div>
							<h1 className='center-align page-title'>Listings</h1>
							<ul className="pagination center-align">
								<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>				
								<li className="active"><a>{currentPage}</a></li>					
								<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
							</ul>
							{this.makeComponent()}
							<ul className="pagination center-align">
								<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>				
								<li className="active"><a>{currentPage}</a></li>					
								<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
							</ul>
							</div>
						</div>
						)
					}
				} 
				else if(this.props.website === 'ZipRecruiter'){
					if (currentPage == 1  && savedJobs.length == 20 ){
						return( 
							<div className='container'>
								<div>
									<h1 className='center-align page-title'>Listings</h1>
									<ul className="pagination center-align">
										<li className="active"><a>{currentPage}</a></li>					
										<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
									</ul>
									{this.makeComponent()}
									<ul className="pagination center-align">
										<li className="active"><a>{currentPage}</a></li>					
										<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
									</ul>
								</div>
							</div>
						)	
					} else if (currentPage == 1  && savedJobs.length < 20 ){
						return (
							<div className='container'>
							<div>
								<h1 className='center-align page-title'>Listings</h1>
								<ul className="pagination center-align">
									<li className="active"><a>{currentPage}</a></li>					
								</ul>
								{this.makeComponent()}
								<ul className="pagination center-align">
									<li className="active"><a>{currentPage}</a></li>					
								</ul>
							</div>
						</div>
						)
					} else if (savedJobs.length < 20) {
					return (
							<div className='container'>
								<div>
									<h1 className='center-align page-title'>Listings</h1>
									<ul className="pagination center-align">
										<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>									
										<li className="active"><a>{currentPage}</a></li>					
									</ul>
									{this.makeComponent()}
									<ul className="pagination center-align">
										<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>																		
										<li className="active"><a>{currentPage}</a></li>					
									</ul>
								</div>
						</div>
						)
					}
					else {
						return(
						<div className='container'>
							<div>
							<h1 className='center-align page-title'>Listings</h1>
							<ul className="pagination center-align">
								<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>				
								<li className="active"><a>{currentPage}</a></li>					
								<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
							</ul>
							{this.makeComponent()}
							<ul className="pagination center-align">
								<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>				
								<li className="active"><a>{currentPage}</a></li>					
								<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
							</ul>
							</div>
						</div>
						)
					}
				} 
				else {
				if (currentPage == 1  && savedJobs.length == 7){
				return( <div className='container'>
						<div>
							<h1 className='center-align page-title'>Listings</h1>
							<ul className="pagination center-align">
								<li className="active"><a>{currentPage}</a></li>					
								<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
							</ul>
							{this.makeComponent()}
							<ul className="pagination center-align">
								<li className="active"><a>{currentPage}</a></li>					
								<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
							</ul>
						</div>
					</div>
				)
				}else if (currentPage == 1 && savedJobs.length < 7 ) {
					return (
						<div className='container'>
						<div>
							<h1 className='center-align page-title'>Listings</h1>
							<ul className="pagination center-align">
								<li className="active"><a>{currentPage}</a></li>					
							</ul>
							{this.makeComponent()}
							<ul className="pagination center-align">
								<li className="active"><a>{currentPage}</a></li>					
							</ul>
						</div>
					</div>
					)
				} else if (savedJobs.length < 7 ) {
					return (
						<div className='container'>
						<div>
							<h1 className='center-align page-title'>Listings</h1>
							<ul className="pagination center-align">
								<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>									
								<li className="active"><a>{currentPage}</a></li>					
							</ul>
							{this.makeComponent()}
							<ul className="pagination center-align">
								<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>									
								<li className="active"><a>{currentPage}</a></li>					
							</ul>
						</div>
					</div>
					)
				} else {
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
						<ul className="pagination center-align">
							<li className="waves-effect"><a onClick={() => this.changePage(previousPage)}>{previousPage}</a></li>				
							<li className="active"><a>{currentPage}</a></li>					
							<li className="waves-effect"><a onClick={() => this.changePage(nextPage)}>{nextPage}</a></li>
						</ul>
						</div>
					</div>
					);
				}
			}
		}
	}
}
