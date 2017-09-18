'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var notesSchema = new Schema ({
    notes: [String],
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    }
})

let Notes = mongoose.model('Notes', notesSchema)

module.exports = Notes