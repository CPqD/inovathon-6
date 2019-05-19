'use strict';

module.exports = function(app){
    var inova = require('../controllers/InovaController');
    var productController = require('../controllers/ProductController');
    var userController = require('../controllers/UserController');
    var loginController = require('../controllers/LoginController');
    var inviteController = require('../controllers/InviteController');
    var updateController = require('../controllers/UpdateController');

    app.route('/home').get(inova.getHomePage);

    app.route('/user/:userId').get(userController.getUserInfo);
    app.route('/user').post(userController.addNewUser);

    app.route('/login').post(loginController.login);

    app.route('/product/:productId').get(productController.getProductInfo);
    app.route('/product').get(productController.getAllProducts);
    app.route('/product').post(productController.addNewProduct);

    app.route('/transferPart').post(productController.transferPart);

    app.route('/products/:userId').get(productController.getAllProductsFromUser);
    app.route('/allProductInfo/:productId').get(productController.getAllProductInfo);

    app.route('/invite').post(inviteController.addNewInvite);
    app.route('/invite/:inviteId').delete(inviteController.removeInvite);

    app.route('/invitesFrom/:userId').get(inviteController.getAllInvitesFromUser);
    app.route('/invitesTo/:userId').get(inviteController.getAllInvitesToUser);

    app.route('/update').post(updateController.addNewUpdate);
    app.route('/update/:updateId').delete(updateController.removeUpdate);
    app.route('/acceptUpdate/:updateId').post(updateController.acceptUpdate);

    app.route('/sentUpdate/:userId').get(updateController.getAllSentUpdatesFromUser);
    app.route('/receivedUpdate/:userId').get(updateController.getAllReceivedUpdatesFromUser);

    app.route('/acceptInvite/:inviteId').post(inviteController.acceptInvite);
};
