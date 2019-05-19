app.service('updateService', function($http, configService){
	this.sendUpdate = (update) => {
        var updateUrl = configService.getBaseUrl() + "update/";

        return new Promise((resolve, reject) => {
            $http.post(updateUrl, update).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.getAllReceivedUpdatesFromUser = (user) => {
        var updateUrl = configService.getBaseUrl() + "receivedUpdate/" + user._id;

        return new Promise((resolve, reject) => {
            $http.get(updateUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.getAllSentUpdatesFromUser = (user) => {
        var updateUrl = configService.getBaseUrl() + "sentUpdate/" + user._id;

        return new Promise((resolve, reject) => {
            $http.get(updateUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.removeUpdate = (update) => {
        var updateUrl = configService.getBaseUrl() + "update/" + update._id;

        return new Promise((resolve, reject) => {
            $http.delete(updateUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.acceptUpdate = (update) => {
        var updateUrl = configService.getBaseUrl() + "acceptUpdate/" + update._id;

        return new Promise((resolve, reject) => {
            $http.post(updateUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};
});
	
