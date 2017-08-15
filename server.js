const express = require('express');
const bodyParser = require  ('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 3013;
const app = express();
const routes = ('./routes.js');

// express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))

// establish db connection
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/newjobsReactDB');

db.on('error', function(err) {
    console.log('Connection error: ' + err);
});


require('./routes.js')(app);

db.once('open', function() {
	console.log('Housten, we have a connection!');
	app.listen(PORT, () => {
		console.log(`Listing on ${PORT}`);
	});
});


