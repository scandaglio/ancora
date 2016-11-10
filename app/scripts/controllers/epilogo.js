'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:EpilogoCtrl
 * @description
 * # EpilogoCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('EpilogoCtrl', function ($scope, $routeParams, $sce) {

    $scope.title = 'Milano scoperta:<br>riaprire i Navigli<br>per una città cartolina'
    $scope.onPlayerReady = function(API) {
      $scope.videoAPI = API;
      $scope.videoAPI.setVolume(0);
    };

    $scope.videoconfig = {
      sources: [
        {src: $sce.trustAsResourceUrl("videos/epilogo.mp4"), type: "video/mp4"}
      ]
    }
  });
