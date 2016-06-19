
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

    $scope.formData = {};

    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    geolocation.getLocation().then(function(data){
        coords = {lat: data.coords.latitude, long: data.coords.longitude}

        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        $scope.formData.htmlverified = "Yep (Thanks for giving me real data)";

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
    })

    $rootScope.$on("clicked", function(){
        $scope.$apply(function(){
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
        });
    });

    $scope.createUser = function(user) {

        
        var userData = {
            username: user.username,
            gender: user.gender,
            age: user.age,
            favlang: user.favlang,
            location: [user.longitude, user.latitude],
            htmlverified: user.htmlverified
        };

        
        $http.post('/users', userData)
            .success(function (data) {

                
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";

                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});