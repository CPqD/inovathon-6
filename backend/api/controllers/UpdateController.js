'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Products'),
    User = mongoose.model('Users'),
    Update = mongoose.model('Updates');

exports.addNewUpdate = (req, res) => {

    Product.findOne({_id: req.body.productId}, [], (err, product) => {
        if(err)
            res.send(err);

        var update = new Update({
            product: product._id,
            from: req.body.from,
            to: product.owner._id,
            content: req.body.content
        });

        update.save((err, update) => {
            if(err){
                res.send(err);
            }else{
                res.json(update);
            }
        });
    });
};

exports.getAllSentUpdatesFromUser = (req, res) => {
    Update.find({from: req.params.userId}, (err, updates) => {
        if(err)
            res.send(err);

        res.json(updates);
    });
};

exports.getAllReceivedUpdatesFromUser = (req, res) => {
    Update.find({to: req.params.userId}, (err, updates) => {
        if(err)
            res.send(err);

        res.json(updates);
    });
};

exports.removeUpdate = (req, res) => {
    Update.remove({_id: req.params.updateId}, (err, other) => {
        if(err){
            res.send(err);
        }else{
            res.json(null);
        }
    });
}

exports.acceptUpdate = (req, res) => {
    Update.remove({_id: req.params.updateId}, (err, other) => {
        if(err){
            res.send(err);
        }else{
            res.json(null);
        }
    });
}
