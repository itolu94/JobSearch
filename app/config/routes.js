import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Layout from './../components/Layout'
import SearchForm from './../components/homepage/SearchForm';
import SearchResults from './../components/listings/SearchResults';
import Modal from './../components/saved/Modal';

module.exports = (
			<Route path='/' component={Layout } >
				<Route path='search' component={SearchForm} />
				<Route path='listings' component={SearchResults} />
				<Route path='applied' component={Modal} />
				<IndexRoute component={SearchForm}/>
			</Route>
);
