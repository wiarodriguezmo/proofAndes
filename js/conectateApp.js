var app = angular.module('conectate', []);

app.controller('conectateCtrl', function ($http, $q) {
    var vm = this;

    $http({
        method: 'GET',
        url: 'structure-data.json',
        headers: {'Content-Type': 'application/json'}
      }).then(function successCallback(response) {
          vm.info = response.data;
          vm.auth();
        }, function errorCallback(response) {
          console.log(response)
    });

    vm.auth = () =>  {
        vm.user = vm.info.prueba;
        vm.user.mail = Object.keys(vm.info.prueba)[0] + "@uniandes.edu.co";
        console.log(vm.user);
    }
    vm.getNumber = function(num) {
        return new Array(num);   
    }
});