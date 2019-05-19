app.service('shareService', function($rootScope, $cookies){
	this.setUser = (user) => {
		$cookies.putObject('user', user);
	};

    this.getUser = () => $cookies.getObject('user');

	this.setProduct = (product) => {
		$cookies.putObject('product', product);
	};

    this.getProduct = () => $cookies.getObject('product');

    this.logout = () => {
        $cookies.remove('user');
    };
});
	


