'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('ContactCtrl', function ($location,$scope,$rootScope) {

    $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
      $scope.location = $location.path().split('/')[1];
    });

  });
