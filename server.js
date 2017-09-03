const express = require('express');
const bodyParser = require  ('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const RedisStore =  require('connect-redis');
const session = require('express-session');
const path = require('path');

const PORT = process.env.PORT || 3013;
const app = express();


// express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))


app.use(session({
  secret: process.env.SECRET || 'abc123',
  // key: process.env.KEY || 'xyz',
  resave: false,
  saveUninitialized: false,
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// Load passport strategies
require('./controller/passport/passport.js')(passport);

require('./model/jobs');
require('./model/user');
require('./model/notes');



// establish db connection
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/newjobsReactDB');

db.on('error', function(err) {
    console.log('Connection error: ' + err);
});


require('./controller/routes.js')(app, passport);

db.once('open', function() {
	console.log('Housten, we have a connection!');
	app.listen(PORT, () => {
		console.log(`Listing on ${PORT}`);
	});
});


