'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:PrologoCtrl
 * @description
 * # PrologoCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('PrologoCtrl', function ($scope, area1, area2, area3, area4, naviglio) {
    $scope.geometries = {
    	'area1': area1,
    	'area2': area2,
    	'area3': area3,
    	'area4': area4,
    	'naviglio': naviglio,
    }


  });
