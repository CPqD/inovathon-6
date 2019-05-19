'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.login = (req, res) => {
    if(!!!req.body.username){
        res.send(null);
    }else{
        User.findOne(req.body, ['username', 'name', '_id', 'worker'], (err, user) => {
            if (err){
                res.send(err);
            }else{
                res.json(user);
            }
        });
    }
};
