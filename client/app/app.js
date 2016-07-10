angular.module('coffee-finder', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing.html',
      controller: 'MainController'
    });
});