angular.module('coffee-finder', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    });
})
.controller('MainController', ['$scope', '$http', function($scope, $http) {
  $scope.clicked = false;
  $scope.coffeeShops = [];
  $scope.markers = [];

  $scope.favoriteMarker = function(name) {
  	if ($scope.markers[name].icon === 'http://maps.google.com/mapfiles/ms/icons/red-dot.png') {
      $scope.markers[name].setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
    } else {
      $scope.markers[name].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    }
  };

  $scope.getCoffee = function() {
  	$scope.clicked = true;

  	if (navigator.geolocation) {
  	  navigator.geolocation.getCurrentPosition(displayPosition, errorFunction);
  	} else {
  	  alert ('Geolocation not enabled.');
  	}

  	function displayPosition(pos) {
  	  var lat = pos.coords.latitude;
  	  var long = pos.coords.longitude;
  	  var latlng = new google.maps.LatLng(lat, long);
  	  var options = {
  	    zoom: 15,
  	    center: latlng
  	  };

  	  var map = new google.maps.Map(document.getElementById('results'), options);

  	  var request = {
  	    location: latlng,
  	    radius: 1000,
  	    type: ['cafe']
  	  };

  	  var service = new google.maps.places.PlacesService(map);
  	  service.search(request, callback);

  	  function callback(results, status) {
  	    if (status == google.maps.places.PlacesServiceStatus.OK) {
  	      $scope.$apply(function(){
  	      	$scope.coffeeShops = results;
  	      	console.log($scope.coffeeShops);
  	      });
  	      for (var i = 0; i < results.length; i++) {
  	        createMarker(results[i]);
  	      }
  	    }
  	  };

  	  function createMarker(place) {
  	    $scope.markers[place.name] = new google.maps.Marker({
  	      map: map,
  	      position: place.geometry.location,
  	      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  	    });
        var infoWindow = new google.maps.InfoWindow({
          content: place.name
        });
  	    $scope.markers[place.name].addListener('mouseover', function() {
  	      infoWindow.open(map, $scope.markers[place.name]);
  	    });
  	    $scope.markers[place.name].addListener('mouseout', function() {
  	      infoWindow.close(map, $scope.markers[place.name]);
  	    });
  	  };
  	};

  	function errorFunction(pos) {
  	  alert('Geolocation access blocked!');
  	};

  };

}]);
