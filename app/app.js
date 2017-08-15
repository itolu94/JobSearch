import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import router from './config/routes'





ReactDOM.render(<Router history={hashHistory} routes={router}> </Router>,document.getElementById('app'));
