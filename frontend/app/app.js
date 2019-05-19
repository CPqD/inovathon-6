var app = angular.module('inovapp', ['ui.router', 'ngCookies']);


app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('about');

	$stateProvider.state('about', {
		templateUrl: "about.html",
		url: "/about"
	});

	$stateProvider.state('login', {
		templateUrl: "login/login.html",
		controller: "Login",
		url: "/login"
	});
	
		$stateProvider.state('home', {
		templateUrl: "home/home.html",
		controller: "homeController",
		url: "/home"
	});
	
		$stateProvider.state('details', {
		templateUrl: "details/details.html",
		controller: "detailsController",
		url: "/details"
	});
	
		//END SCOPES
});
	
