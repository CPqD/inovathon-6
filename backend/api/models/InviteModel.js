'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var Product = mongoose.model('Products'),
    User = mongoose.model('Users');

var InviteSchema = new Schema({
    product: { type: String },
    from: { type: Schema.Types.ObjectId, ref: User, autopopulate: true },
    to: { type: Schema.Types.ObjectId, ref: User, autopopulate: true },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

InviteSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Invites', InviteSchema);
