'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:PrologoCtrl
 * @description
 * # PrologoCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('PrologoCtrl', function ($scope,$sce, melchiorre, isola, centro, darsena, naviglio) {
    $scope.geometries = {
    	'melchiorre': melchiorre,
    	'isola': isola,
    	'centro': centro,
    	'darsena': darsena,
    	'naviglio': naviglio
    }

    // $scope.onPlayerReady = function(API) {
    //   $scope.videoAPI = API;
    //   $scope.videoAPI.setVolume(0);
    // };
    //
    // $scope.videoconfig = {
    //   sources: [
    //     {src: $sce.trustAsResourceUrl("videos/prologo.mp4"), type: "video/mp4"}
    //   ]
    // }

  });
