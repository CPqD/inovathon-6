'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Products'),
    User = mongoose.model('Users');

var invoke = require('../inovathon/invoke.js');

exports.getProductInfo = (req, res) => {
    invoke.getAllParts(1, null, (parts) => {
        parts = JSON.parse(parts);
        parts = parts.map((it) => it.Record).map((it) => {
            return {
                owner: it.ownerId,
                _id: it.partId,
                name: it.partName,
                timestamp: it.timestamp,
                color: it.color,
                description: it.description,
                image: it.image,
                plate: it.plate,
                parentPartId: it.parentPartId
            };
        });

        console.log(parts);

        invoke.getAllParts(2, req.params.productId, (item) => {
            res.json({
                owner: item.ownerId,
                _id: item.partId,
                name: item.partName,
                timestamp: item.timestamp,
                color: item.color,
                description: item.description,
                image: item.image,
                plate: item.plate,
                parts: parts.filter((it) => {
                    return it.parentPartId == item.partId;
                })
            });
        });
    });
};

exports.addNewProduct = (req, res) => {
    var product = new Product(req.body);
    product.save((err, task) => {
        if(err){
            res.send(err);
        }else{
            res.json(product);
        }
    });
};

exports.getAllProductsFromUser = (req, res) => {
    invoke.getAllParts(1, null, (parts) => {
        parts = JSON.parse(parts);
        parts = parts.map((it) => it.Record).map((it) => {
            return {
                owner: it.ownerId,
                _id: it.partId,
                name: it.partName,
                timestamp: it.timestamp,
                color: it.color,
                description: it.description,
                image: it.image,
                plate: it.plate,
                parentPartId: it.parentPartId
            };
        });

        console.log(parts);
        invoke.getAllParts(1, null, (items) => {
            items = JSON.parse(items);

            items = items.map((it) => it.Record).map((it) => {
                return {
                    owner: it.ownerId,
                    _id: it.partId,
                    name: it.partName,
                    timestamp: it.timestamp,
                    color: it.color,
                    description: it.description,
                    image: it.image,
                    plate: it.plate,
                    parentPartId: it.parentPartId,
                    parts: parts.filter((part) => {
                        return part.parentPartId == it.partId;
                    })
                };
            });

            items = items.filter((it) => it.owner == req.params.userId);

            res.json(items);
        });
    });
}

exports.getAllProducts = (req, res) => {
    invoke.getAllParts(1, null, (items) => {
        items = JSON.parse(items);

        items = items.map((it) => it.Record).map((it) => {
            return {
                owner: it.ownerId,
                _id: it.partId,
                name: it.partName,
                timestamp: it.timestamp,
                color: it.color,
                description: it.description,
                image: it.image,
                plate: it.plate
            };
        });

        res.json(items);
    });
}

exports.transferPart = (req, res) => {
    invoke.getAllParts(7, req.body, (err) => {
        if(err){
            res.send(err);
        }else{
            res.json({});
        }
    });
}

exports.getAllProductInfo = (req, res) => {
    User.find({}, (err, users) => {
        var mu = {};

        users.forEach((user) => {
            mu[user._id] = user;
        });

        invoke.getAllParts(1, null, (parts) => {
            parts = JSON.parse(parts);
            parts = parts.map((it) => it.Record).map((it) => {
                return {
                    owner: it.ownerId,
                    _id: it.partId,
                    name: it.partName,
                    timestamp: it.timestamp,
                    color: it.color,
                    description: it.description,
                    image: it.image,
                    plate: it.plate,
                    parentPartId: it.parentPartId
                };
            });

            console.log(parts);

            invoke.getAllParts(3, req.params.productId, (_items) => {
                _items = JSON.parse(_items);
                var items = [];

                _items.forEach((item) => {
                    items.push({
                        owner: mu[item.ownerId],
                        _id: item.partId,
                        name: item.partName,
                        timestamp: item.timestamp,
                        color: item.color,
                        description: item.description,
                        image: item.image,
                        plate: item.plate,
                        parts: parts.filter((it) => {
                            return it.parentPartId == item.partId;
                        })
                    });
                });

                res.json(items);
            });
        });
    });
};
