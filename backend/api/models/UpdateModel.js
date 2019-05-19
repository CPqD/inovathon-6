'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var Product = mongoose.model('Products'),
    User = mongoose.model('Users');

var UpdateSchema = new Schema({
    product: { type: String },
    from: { type: Schema.Types.ObjectId, ref: User, },
    to: { type: Schema.Types.ObjectId, ref: User, },
    content: { type: String },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

//UpdateSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Updates', UpdateSchema);
