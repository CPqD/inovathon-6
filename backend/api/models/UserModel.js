'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter a name for the user.'
    },
    username: {
        type: String,
        required: 'Kindly enter a username for the user.'
    },
    worker: {
        type: Boolean,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);
