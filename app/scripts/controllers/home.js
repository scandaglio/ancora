'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('HomeCtrl', function ($scope, $sce, $window) {

    var ratio = $window.innerWidth/$window.innerHeight;
    var videoRatio = 16/9;

    $scope.videoClass=ratio<=videoRatio?'videoH':'videoW'

    $scope.title = 'La scoperta del Naviglio';
    $scope.onPlayerReady = function(API) {
      $scope.videoAPI = API;
      $scope.videoAPI.setVolume(0);
    };

    $scope.videoconfig = {
      sources: [
        {src: $sce.trustAsResourceUrl("videos/home.mp4"), type: "video/mp4"}
      ],
      plugins: {
        poster: "images/home.png"
      }
    }

  });
