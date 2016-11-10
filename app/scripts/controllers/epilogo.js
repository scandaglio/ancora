'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:EpilogoCtrl
 * @description
 * # EpilogoCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('EpilogoCtrl', function ($scope, $routeParams, $sce, $window) {

    var ratio = $window.innerWidth/$window.innerHeight;
    var videoRatio = 16/9;

    $scope.videoClass=ratio<=videoRatio?'videoH':'videoW'

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
