'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.getHomePage = (req, res) => {
    res.send("Welcome to the home page!!!");
};



