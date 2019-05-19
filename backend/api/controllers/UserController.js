'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.getUserInfo = (req, res) => {
    User.findOne({_id: req.params.userId}, req.body, (err, user) => {
        if (err){
            res.send(err);
        }else{
            res.json(user);
        }
    });
};

exports.addNewUser = (req, res) => {
    var user = new User(req.body);
    user.save((err, task) => {
        if(err){
            res.send(err);
        }else{
            res.json(user);
        }
    });
};


