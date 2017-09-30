import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRoute, Redirect} from 'react-router';
import Layout from './../components/Layout'
import SearchForm from './../components/homepage/SearchForm';
import SearchResults from './../components/listings/SearchResults';
import SavedJobs from './../components/saved/Index';


//TODO fix passport verification-Redirect to home page and not '/_=_';
module.exports = (
			<Route path='/' component={Layout } >
				<Route path='search' component={SearchForm} />
				<Route path='listings' component={SearchResults} />
				<Route path='applied' component={SavedJobs} />
				<Redirect from='/_=_' to='/' />
				<IndexRoute component={SearchForm}/>
			</Route>
);
