'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Products'),
    User = mongoose.model('Users'),
    Invite = mongoose.model('Invites');

var invoke = require('../inovathon/invoke.js');

exports.addNewInvite = (req, res) => {
    User.findOne({username: req.body.to}, [], (err, user) => {
        req.body.to = user._id;
        var invite = new Invite(req.body);
        invite.save((err, task) => {
            if(err){
                res.send(err);
            }else{
                res.json(invite);
            }
        });
    });
};

exports.getAllInvitesFromUser = (req, res) => {
    invoke.getAllParts(1, null, (items) => {
        items = JSON.parse(items);

        items = items.map((it) => it.Record).map((it) => {
            return {
                owner: it.ownerId,
                _id: it.partId,
                name: it.partName,
            };
        });

        var mp = {};

        items.forEach((it) => {
            mp[it._id] = it;
        });

        Invite.find({from: req.params.userId}, (err, invites) => {
            var _invites = [];

            invites.forEach((invite) => {
                _invites.push({
                    from: invite.from,
                    to: invite.to,
                    product: mp[invite.product],
                    _id: invite._id
                });
            });

            if(err){
                res.send(err);
            }else{
                res.json(_invites);
            }
        });
    });
}

exports.getAllInvitesToUser = (req, res) => {
    invoke.getAllParts(1, null, (items) => {
        items = JSON.parse(items);

        items = items.map((it) => it.Record).map((it) => {
            return {
                owner: it.ownerId,
                _id: it.partId,
                name: it.partName,
            };
        });

        var mp = {};

        items.forEach((it) => {
            mp[it._id] = it;
        });

        Invite.find({to: req.params.userId}, (err, invites) => {
            var _invites = [];

            invites.forEach((invite) => {
                _invites.push({
                    from: invite.from,
                    to: invite.to,
                    product: mp[invite.product],
                    _id: invite._id
                });
            });

            if(err){
                res.send(err);
            }else{
                res.json(_invites);
            }
        });
    });
}

exports.removeInvite = (req, res) => {
    Invite.remove({_id: req.params.inviteId}, (err, other) => {
        if(err){
            res.send(err);
        }else{
            res.json(null);
        }
    });
}

exports.acceptInvite = (req, res) => {
    console.log(req.params.inviteId);
    Invite.findOne({_id: req.params.inviteId}, req.body, (err, invite) => {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(invite);

            invoke.updateOwner(invite.product, invite.from._id, invite.to._id, (_) => {
                Invite.remove({_id: req.params.inviteId}, (err) => {
                    if(err)
                        res.send(err);

                    res.json(invite);
                });
            });
        }
    });
}
