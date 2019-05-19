app.service('inviteService', function(configService, $http){
    this.sendInvite = (invite) => {
        var inviteUrl = configService.getBaseUrl() + "invite";

        return new Promise((resolve, reject) => {
            $http.post(inviteUrl, invite).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
    };

	this.removeInvite = (invite) => {
        var inviteUrl = configService.getBaseUrl() + "invite/" + invite._id;

        return new Promise((resolve, reject) => {
            $http.delete(inviteUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};

	this.acceptInvite = (invite) => {
        var inviteUrl = configService.getBaseUrl() + "acceptInvite/" + invite._id;

        return new Promise((resolve, reject) => {
            $http.post(inviteUrl).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
	};
});
	
