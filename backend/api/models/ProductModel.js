'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter a name for the product.'
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Products', ProductSchema);
