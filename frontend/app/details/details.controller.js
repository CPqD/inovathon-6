app.controller('detailsController', function($scope, shareService, productService, $state){
    $scope.product = shareService.getProduct(); 
    $scope.user = shareService.getUser(); 
    $scope.mData = {};

    productService.getAllProductInfo($scope.product).then((data) => {
        $scope.mData.states = data;
        $scope.$apply();
        console.log(data);
    }, (err) => {
        console.error(err);
    });

    $scope.goBackToList = function(){
        $state.go('home');
    };

    $scope.logout = function(){
        shareService.logout();
        $state.go('login');
    };

    $scope.viewDetails = function(product){
        shareService.setProduct(product);
        location.reload();
    }
});
