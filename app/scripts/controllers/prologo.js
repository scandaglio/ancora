'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:PrologoCtrl
 * @description
 * # PrologoCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('PrologoCtrl', function ($scope, melchiorre, isola, centro, darsena, naviglio) {
    $scope.geometries = {
    	'melchiorre': melchiorre,
    	'isola': isola,
    	'centro': centro,
    	'darsena': darsena,
    	'naviglio': naviglio
    }


  });
