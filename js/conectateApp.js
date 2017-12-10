var app = angular.module('conectate', []);

app.controller('conectateCtrl', function ($http, $q) {
    var vm = this;

    $http({
        method: 'GET',
        url: 'structure-data.json',
        headers: {'Content-Type': 'application/json'}
      }).then(function successCallback(response) {
          vm.info = response.data;
        }, function errorCallback(response) {
          console.log(response)
    });

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

    vm.signIn = function() {
        vm.user = vm.info[vm.userAccount];
        if(vm.user && vm.user.pass == vm.userPass){
            vm.user.mail = vm.userAccount + "@uniandes.edu.co";
            vm.isAuth = true;   
            vm.calculateScales();
        } else vm.hasError=true;
    }
});