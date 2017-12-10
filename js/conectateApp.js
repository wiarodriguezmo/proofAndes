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
        vm.user.mail = Object.keys(vm.info.prueba)[0] + "@uniandes.edu.co"; //pendiente
        vm.calculateScales();
    };

    vm.calculateScales = function() {
        vm.dom = {
            programming: "scales" + Math.floor(vm.user.points.skill.programming/16),
            abstraction: "scales" + Math.floor(vm.user.points.skill.abstraction/16),
            paloLeft: "paloLeft" + Math.floor(vm.user.points.skill.abstraction/16),
            paloRight: "paloRight" + Math.floor(vm.user.points.skill.programming/16)
        };
    };
    vm.getNumber = function(num) {
        return new Array(num);   
    };
    
    vm.abstraction = function() {
        if(vm.user.points.skill.abstraction>100){
            vm.user.points.skill.abstraction=100;
            vm.user.points.skill.programming=0;
        } else if(vm.user.points.skill.abstraction<0){
            vm.user.points.skill.abstraction=0;
            vm.user.points.skill.programming=100;
        } else vm.user.points.skill.programming=100-vm.user.points.skill.abstraction;
        vm.calculateScales();
    };
    vm.programming = function() {
        if(vm.user.points.skill.programming>100){
            vm.user.points.skill.programming=100;
            vm.user.points.skill.abstraction=0;
        } else if(vm.user.points.skill.programming<0){
            vm.user.points.skill.programming=0;
            vm.user.points.skill.abstraction=100;
        } else vm.user.points.skill.abstraction=100-vm.user.points.skill.programming;
        vm.calculateScales();
    }
});