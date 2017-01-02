'use strict';

/**
 * @ngdoc function
 * @name ancoraApp.controller:CoverCtrl
 * @description
 * # CoverCtrl
 * Controller of the ancoraApp
 */
angular.module('ancoraApp')
  .controller('CoverCtrl', function ($scope, $routeParams, $sce, $window) {
    var ratio = $window.innerWidth/$window.innerHeight;
    var videoRatio = 16/9;

    $scope.videoClass=ratio<=videoRatio?'videoH':'videoW'

    $scope.area = $routeParams.area;
    $scope.mdUrl = 'texts/' + $routeParams.area + '.md';
    $scope.onPlayerReady = function(API) {
      $scope.videoAPI = API;
      $scope.videoAPI.setVolume(0);
    };

    $scope.videoconfig = {
      sources: [
        {src: $sce.trustAsResourceUrl("videos/"+$scope.area+".mp4"), type: "video/mp4"}
      ],
      plugins: {
        poster: "images/cover-" + $scope.area + ".png"
      }
    }

  });
