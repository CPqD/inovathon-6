app.controller('Login', function($scope, loginService, shareService, $state){

    $scope.login = _login;

    function _login(userData){
        loginService.authenticate(userData).then((data) => {
            if(!!data){
                shareService.setUser(data);
                $state.go('home');
            }else{
                alert('Wrong username');
            }
        }, (err) => {
            alert('some error occurred!');
        });
    }

});
