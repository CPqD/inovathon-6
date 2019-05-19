app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('ngEsc', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 27) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

app.controller('homeController', function($scope, shareService, productService, $state, inviteService, $interval, updateService){
    var user = shareService.getUser();
    $scope.user = user;

    $scope.mData = {
        products: 
[{"owner":"5ce1632a80f553e1fda89bba","_id":"100","name":"Mustang GT","timestamp":"2019-05-19T14:08:25.755Z","color":"Amarelo","description":"O Ford Mustang é um automóvel desportivo produzido pela Ford Motor Company. O carro foi apresentado ao público em 17 de abril de 1964.","image":"https://img.olx.com.br/thumbs256x256/22/221906007621979.jpg","plate":"HVW-8876","parentPartId":"none","parts":[{"owner":"5ce1632a80f553e1fda89bba","_id":"200","name":"Retrovisor","timestamp":"2019-05-19T15:00:32.908Z","color":"Azul","description":"","image":"","plate":"","parentPartId":"100"}]},{"owner":"5ce1632a80f553e1fda89bba","_id":"101","name":"Tesla Model S","timestamp":"2019-05-19T14:08:28.367Z","color":"Azul","description":"O Model S é um sedan esportivo elétrico produzido pela Tesla Motors e foi lançado nos Estados Unidos em junho de 2012.","image":"http://s1.1zoom.me/b5050/722/Tesla_Motors_2015_Brabus_469564_2880x1800.jpg","plate":"ABC-7654","parentPartId":"none","parts":[{"owner":"5ce1632a80f553e1fda89bba","_id":"201","name":"Disco de Freio","timestamp":"2019-05-19T15:00:37.700Z","color":"","description":"","image":"","plate":"","parentPartId":"101"}]},{"owner":"5ce1632a80f553e1fda89bba","_id":"102","name":"Volkswagen UP","timestamp":"2019-05-19T14:08:33.424Z","color":"Branco","description":"O Volkswagen Up 2019 é uma das opções para quem deseja levar para a casa um carro de dimensões compactas, mas com motorização moderna e boa dose de equipamentos. Ele é atualmente o menor automóvel da marca alemã no Brasil.","image":"http://s2.glbimg.com/cLTt7HGaUl4FXQTPCPuAxNDmcBY=/620x413/e.glbimg.com/og/ed/f/original/2017/07/20/novo_up_pepper_8.jpg","plate":"HYT-7685","parentPartId":"none","parts":[{"owner":"5ce1632a80f553e1fda89bba","_id":"202","name":"Vela de Ignição","timestamp":"2019-05-19T15:00:40.074Z","color":"","description":"","image":"","plate":"","parentPartId":"102"},{"owner":"5ce1632a80f553e1fda89bba","_id":"204","name":"Vela de Ignição","timestamp":"2019-05-19T15:00:46.581Z","color":"","description":"","image":"","plate":"","parentPartId":"102"}]},{"owner":"5ce1632a80f553e1fda89bba","_id":"200","name":"Retrovisor","timestamp":"2019-05-19T15:00:32.908Z","color":"Azul","description":"","image":"","plate":"","parentPartId":"100","parts":[]},{"owner":"5ce1632a80f553e1fda89bba","_id":"201","name":"Disco de Freio","timestamp":"2019-05-19T15:00:37.700Z","color":"","description":"","image":"","plate":"","parentPartId":"101","parts":[]},{"owner":"5ce1632a80f553e1fda89bba","_id":"202","name":"Vela de Ignição","timestamp":"2019-05-19T15:00:40.074Z","color":"","description":"","image":"","plate":"","parentPartId":"102","parts":[]},{"owner":"5ce1632a80f553e1fda89bba","_id":"203","name":"Vela de Ignição","timestamp":"2019-05-19T15:00:44.730Z","color":"","description":"","image":"","plate":"","parentPartId":"103","parts":[]},{"owner":"5ce1632a80f553e1fda89bba","_id":"204","name":"Vela de Ignição","timestamp":"2019-05-19T15:00:46.581Z","color":"","description":"","image":"","plate":"","parentPartId":"102","parts":[]}]
    };

    //$interval(function(){
    //    _reloadData();
    //}, 1000);

    if(!!user){

        _reloadData();

        $scope.logout = _logout;
        $scope.transferProduct = _transferProduct;
        $scope.removeInvite = _removeInvite;
        $scope.acceptInvite = _acceptInvite;
        $scope.sendUpdate = _sendUpdate;
        $scope.removeUpdate = _removeUpdate;
        $scope.acceptUpdate = _acceptUpdate;
        $scope.viewDetails = _viewDetails;
        $scope.formatDescription = _formatDescription;
        $scope.transferPart = _transferPart;
    }else{
        console.log('no user logged');
    }

    function _reloadData(){
        $scope.mData.loading = true;
        var proms = [];

        var prom = productService.getProducts(user);
        prom.then((data) => {
            if($scope.mData.products != data)
                $scope.mData.products = data;
            $scope.$apply();
        }, (err) => {
            console.error(err);
        }); 

        proms.push(prom);

        var prom = productService.getReceivedInvites(user);
        prom.then((data) => {
            console.log(data);
            $scope.mData.receivedInvites = data;
            $scope.$apply();
        }, (err) => {
            console.error(err);
        }); 

        proms.push(prom);

        var prom = productService.getSentInvites(user);
        prom.then((data) => {
            console.log(data);
            $scope.mData.sentInvites = data;
            $scope.$apply();
        }, (err) => {
            console.error(err);
        }); 

        proms.push(prom);

        var prom = productService.getAllProducts(user);
        prom.then((data) => {
            if($scope.mData.allProducts != data)
                $scope.mData.allProducts = data;
            $scope.$apply();
        }, (err) => {
            console.error(err);
        }); 

        proms.push(prom);

        var prom = updateService.getAllSentUpdatesFromUser(user);
        prom.then((data) => {
            if($scope.mData.sentUpdates != data)
                $scope.mData.sentUpdates = data;
            $scope.$apply();
        }, (err) => {
            console.error(err);
        }); 

        proms.push(prom);

        var prom = updateService.getAllReceivedUpdatesFromUser(user);
        prom.then((data) => {
            if($scope.mData.receivedUpdates != data)
                $scope.mData.receivedUpdates = data;
            $scope.$apply();
        }, (err) => {
            console.error(err);
        }); 

        proms.push(prom);

        Promise.all(proms).then(() => {
            delete $scope.mData.loading;
            $scope.$apply();
        }, () => {
            delete $scope.mData.loading;
            $scope.$apply();
        });
    }

    function _transferProduct(product){
        var from = user._id;
        var to = product.to;
        var product = product._id;

        var invite = {
            from: from,
            to: to,
            product: product
        };

        inviteService.sendInvite(invite).then((data) => {
            console.log(data);
            _reloadData();
        }, (err) => {
            console.error(err);
        }); 

    }

    function _acceptInvite(invite){
        inviteService.acceptInvite(invite).then(() => {
            _reloadData();
        }, (err) => {
            console.error(err);
        });
    }

    function _sendUpdate(update, productId){
        updateService.sendUpdate({
            content: update.content,
            from: user._id,
            productId: productId
        }).then((item) => {
            console.log(item);
            _reloadData();
        }, (err) => {
            console.error(err);
        });
    }

    function _removeInvite(invite){
        inviteService.removeInvite(invite).then(() => {
            _reloadData();
        }, (err) => {
            console.error(err);
        });
    }

    function _removeUpdate(update){
        updateService.removeUpdate(update).then(() => {
            _reloadData();
        }, (err) => {
            console.error(err);
        });
    }

    function _acceptUpdate(update){
        updateService.acceptUpdate(update).then(() => {
            _reloadData();
        }, (err) => {
            console.error(err);
        });
    }

    function _viewDetails(product){
        shareService.setProduct(product);
        $state.go('details');
    }

    function _formatDescription(description){
        if(description.length > 100){
            return description.substr(0, 100);
        }

        return description;
    }

    function _transferPart(part, parent){
        productService.transferPart(part, parent, $scope.user).then(() => {
            _reloadData();
        }, (err) => {
            console.error(err);
        });
    }

    function _logout(){
        shareService.logout();
        $state.go('login');
    }
});
