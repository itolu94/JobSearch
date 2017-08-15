import React, {Component} from 'react';
import Posting from './Posting';
import axios from 'axios';


class SearchResults extends Component {
	constructor(props){
		super(props)
		this.state = {'job': ['nothing']}
		this.makeComponent = () => {
			if (this.state.job[0] !== 'nothing')  {
				return this.state.job[0].map((post) => {
					return <Posting post={post} applyToJob={this.applyToJob}/>
				});
			}
		}
		this.applyToJob = (listing) => {
			axios.post('/api', listing).then((data) =>{console.log(data)})
		}
	};

  componentWillMount() {
	const url =`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${this.props.job}&pgcnt=7&page=1&state=GA&sort=4`
	axios.get(url).then((response) => {
		this.setState({'job': [response.data.resultItemList] });
	})
  };


	render(){
		return (
			<div className='container'>
				{this.makeComponent()}
			</div>
			);
	};
};

export default SearchResults;