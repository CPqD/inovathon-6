app.service('productService', function(configService, $http){
	this.getProducts = (user) => {
        var productsUrl = configService.getBaseUrl() + "products/" + user._id;

        return new Promise((resolve, reject) => {
            $http.get(productsUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.getAllProductInfo = (product) => {
        var productsUrl = configService.getBaseUrl() + "allProductInfo/" + product._id;

        return new Promise((resolve, reject) => {
            $http.get(productsUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.getReceivedInvites = (user) => {
        var invitesToUrl = configService.getBaseUrl() + "invitesTo/" + user._id;

        return new Promise((resolve, reject) => {
            $http.get(invitesToUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.getSentInvites = (user) => {
        var invitesFromUrl = configService.getBaseUrl() + "invitesFrom/" + user._id;

        return new Promise((resolve, reject) => {
            $http.get(invitesFromUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.getAllProducts = (user) => {
        var productsUrl = configService.getBaseUrl() + "product";

        return new Promise((resolve, reject) => {
            $http.get(productsUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.transferPart = (part, parent, user) => {
        var transferPartUrl = configService.getBaseUrl() + "transferPart";

        return new Promise((resolve, reject) => {
            $http.post(transferPartUrl, {
                idPart: part._id,
                idParent: parent._id,
                owner: user._id
            }).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

});
	
