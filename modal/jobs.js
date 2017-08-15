'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var jobsSchema = new Schema ({
	title: {
		type: String,
		trim: true,
		require: true
	},
	company:{
		type: String,
		trim: true,
	},
	link: {
		type: String,
		require: true,
		unique: true	
	},
	location: {
		type: String,
		require: true
	},
	status: {
		type: String,
		require: true
	},
	notes: {
		type: [String],
	},
	date: {
		type: Date,
		default: Date.now
	}
})

var Jobs = mongoose.model('Jobs', jobsSchema)

module.exports = Jobs