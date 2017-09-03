'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var notesSchema = new Schema ({
    notes: {
		type: [{
            jobReference: String,
            notes: [String]
        }],
    },
    user: {
        type: String
    }
})

let Notes = mongoose.model('Notes', notesSchema)

module.exports = Notes