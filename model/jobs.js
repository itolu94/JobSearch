const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobsSchema = new Schema ({
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
	date: {
		type: Date,
		default: Date.now
	},
	source: {
		type: String,
		// required: true
	},
	users: {
		type: [String]
	},
	canEdit: {
		type: Boolean,
		default: false
	}
})

const Jobs = mongoose.model('Jobs', JobsSchema)
module.exports = Jobs