app.service('loginService', function($http, configService){
    this.authenticate = (user) => {
        var loginUrl = configService.getBaseUrl() + "login";

        return new Promise((resolve, reject) => {
            $http.post(loginUrl, user).then((response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            });
        });
    };
});

