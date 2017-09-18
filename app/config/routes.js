import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Layout from './../components/Layout'
import SearchForm from './../components/homepage/SearchForm';
import SearchResults from './../components/listings/SearchResults';
import SavedJobs from './../components/saved/Index';

module.exports = (
			<Route path='/' component={Layout } >
				<Route path='search' component={SearchForm} />
				<Route path='listings' component={SearchResults} />
				<Route path='applied' component={SavedJobs} />
				<IndexRoute component={SearchForm}/>
			</Route>
);
